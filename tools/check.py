# -*- coding: utf-8 -*-
"""出片自检：python tools/check.py deck.pptx [--ban 敏感词.txt] [--no-notes-ok]

检查项（分"错误 / 提示"两级，有错误时退出码为 1）：
  1. 残留标记：TODO / XXX / {{ }} / 待补 / 待定 / ??（错误）
  2. 敏感词：--ban 文件里每行一个词，中英文都查，正文和演讲备注都查（错误）
  3. 页码：页脚 "n / N" 是否与实际页序、总页数一致（错误）
  4. 越界：任何元素超出 13.333 × 7.5 in 画布（错误）
  5. 文字可能溢出：按字宽粗估行数 × 行高 > 文本框高度（提示，需看图确认）
  6. 缺演讲备注：除首尾页外没有备注的页（提示）

粗估规则：中文字宽 = 字号，西文 ≈ 0.55 × 字号，行高 1.2 × 字号。
它查不了：配色对比度、元素相互遮挡、图文是否对得上——这些要导出 PNG 看图。
"""
import argparse, math, re, sys
from pptx import Presentation
from pptx.util import Emu

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
EMU_IN = 914400
RESIDUE = [r"TODO", r"XXX", r"\{\{", r"\}\}", r"待补", r"待定", r"\?\?", r"@@"]


def inch(v):
    return (v or 0) / EMU_IN


def char_w(ch, size):
    if ord(ch) < 0x2E80:  # 拉丁、数字、半角标点
        return 0.55 * size
    return size


def est_height(tf, box_w):
    """粗估文本框内容高度（英寸）"""
    total = 0.0
    for p in tf.paragraphs:
        sizes = [r.font.size.pt for r in p.runs if r.font.size] or [18]
        size = max(sizes)
        text = "".join(r.text for r in p.runs)
        width_pt = sum(char_w(c, size) for c in text)
        lines = max(1, math.ceil(width_pt / 72 / max(box_w, 0.1)))
        # 软换行 \v 也算一行
        lines += text.count("\v")
        total += lines * size * 1.2 / 72
    return total


def slide_text(sl):
    out = []
    for sh in sl.shapes:
        if sh.has_text_frame:
            out.append(sh.text_frame.text)
        if getattr(sh, "has_table", False) and sh.has_table:
            out += [c.text for r in sh.table.rows for c in r.cells]
        if getattr(sh, "has_chart", False) and sh.has_chart:
            try:
                ch = sh.chart
                out += [str(c) for c in ch.plots[0].categories]
            except Exception:
                pass
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pptx")
    ap.add_argument("--ban", help="敏感词文件，每行一个词，# 开头为注释")
    ap.add_argument("--no-notes-ok", action="store_true", help="不提示缺演讲备注")
    a = ap.parse_args()

    prs = Presentation(a.pptx)
    W, H = inch(prs.slide_width), inch(prs.slide_height)
    n = len(prs.slides)
    errs, warns = [], []
    ban = []
    if a.ban:
        for ln in open(a.ban, encoding="utf-8-sig"):  # 记事本/PowerShell 存的文件带 BOM
            ln = ln.strip()
            if ln and not ln.startswith("#"):
                ban.append(ln)

    for i, sl in enumerate(prs.slides, 1):
        body = slide_text(sl)
        notes = sl.notes_slide.notes_text_frame.text if sl.has_notes_slide else ""
        for where, txt in (("正文", body), ("备注", notes)):
            for pat in RESIDUE:
                for m in re.finditer(pat, txt):
                    errs.append(f"第 {i} 页 {where} 残留标记 “{m.group(0)}”")
            low = txt.lower()
            for w in ban:
                if w.lower() in low:
                    errs.append(f"第 {i} 页 {where} 命中敏感词 “{w}”")
        # 页码
        m = re.search(r"(?m)^\s*(\d+)\s*/\s*(\d+)\s*$", body)
        if m and (int(m.group(1)) != i or int(m.group(2)) != n):
            errs.append(f"第 {i} 页 页码写成 {m.group(1)} / {m.group(2)}，应为 {i} / {n}")
        # 越界与溢出
        for sh in sl.shapes:
            x, y, w, h = inch(sh.left), inch(sh.top), inch(sh.width), inch(sh.height)
            if x < -0.01 or y < -0.01 or x + w > W + 0.01 or y + h > H + 0.01:
                errs.append(f"第 {i} 页 元素“{sh.name}”超出画布（x={x:.2f} y={y:.2f} w={w:.2f} h={h:.2f}）")
            if sh.has_text_frame and sh.text_frame.text.strip() and h > 0:
                need = est_height(sh.text_frame, w)
                if need > h * 1.15 and need - h > 0.12:
                    snippet = sh.text_frame.text.strip().replace("\n", " ")[:24]
                    warns.append(f"第 {i} 页 文字可能溢出（估 {need:.2f} in > 框 {h:.2f} in）：{snippet}…")
        if not a.no_notes_ok and 1 < i < n and not notes.strip():
            warns.append(f"第 {i} 页 没有演讲备注")

    print(f"{a.pptx}：{n} 页")
    for e in errs:
        print("  [错误]", e)
    for w in warns:
        print("  [提示]", w)
    if not errs and not warns:
        print("  自检通过")
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    main()
