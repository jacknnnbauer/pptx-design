# -*- coding: utf-8 -*-
"""生成示例 deck 用的示意图（虚构的书店平面）。python figs.py → ./img/*.png"""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, FancyBboxPatch

plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", "SimHei", "DejaVu Sans"]
plt.rcParams["axes.unicode_minus"] = False
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "img")
os.makedirs(OUT, exist_ok=True)

NAVY, AMBER, STEEL, SAGE, RED, INK, MUTE = "#1B2733", "#E8A33D", "#2E6F95", "#5F7F4E", "#9E1B1E", "#1F2933", "#6B7280"
Z = {  # 分区配色，与 build.js 的图例一致
    "new": "#C8DCF5", "lit": "#D9E7D6", "kids": "#F0E4C8", "cafe": "#DDEBDC",
    "event": "#F2E3C4", "back": "#CFD6DE", "aisle": "#F6EFD9",
}


def canvas(w, h, xlim, ylim, transparent=False):
    fig = plt.figure(figsize=(w, h), dpi=200)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(*xlim); ax.set_ylim(*ylim); ax.set_aspect("equal"); ax.axis("off")
    if transparent:
        fig.patch.set_alpha(0)
    return fig, ax


def box(ax, x, y, w, h, fc, ec="#8B939D", lw=1.0, label=None, fs=9, color=INK, **kw):
    ax.add_patch(Rectangle((x, y), w, h, facecolor=fc, edgecolor=ec, linewidth=lw, **kw))
    if label:
        ax.text(x + w / 2, y + h / 2, label, ha="center", va="center", fontsize=fs, color=color)


def save(fig, name):
    p = os.path.join(OUT, name)
    fig.savefig(p, transparent=fig.patch.get_alpha() == 0)
    plt.close(fig)
    print("fig", name)


def shelves(ax, x, y, w, h, rows, cols, fc="#FFFFFF", ec="#7A8691"):
    """在矩形内画一排排书架（小矩形阵列）"""
    gx, gy = w / cols, h / rows
    for i in range(cols):
        for j in range(rows):
            ax.add_patch(Rectangle((x + i * gx + gx * 0.12, y + j * gy + gy * 0.3), gx * 0.76, gy * 0.4,
                                   facecolor=fc, edgecolor=ec, linewidth=0.6))


# 1 封面线稿（透明底）：建筑外轮廓 + 三层分区
def cover():
    fig, ax = canvas(11.5, 4.7, (0, 115), (0, 47), transparent=True)
    ax.add_patch(Rectangle((4, 4), 86, 32, fill=False, edgecolor="#D08A28", linewidth=3.2))
    for x, w in [(8, 24), (36, 30), (70, 16)]:
        ax.add_patch(Rectangle((x, 9), w, 22, facecolor="#DCE8F2", edgecolor=STEEL, linewidth=1.8))
    ax.plot([90, 110], [20, 20], color="#D08A28", linewidth=1.5, linestyle=(0, (4, 3)))
    ax.plot([90, 110], [14, 14], color="#D08A28", linewidth=1.5, linestyle=(0, (4, 3)))
    for k in range(6):
        ax.add_patch(Rectangle((94 + k * 3, 24), 1.4, 8, facecolor="none", edgecolor="#D08A28", linewidth=1))
    save(fig, "cover_outline.png")


# 2 选址：街区与门店外轮廓 + 尺寸
def site():
    fig, ax = canvas(12, 5.3, (-6, 124), (-14, 44))
    ax.add_patch(Rectangle((-6, -14), 130, 58, facecolor="#FBF8F1", edgecolor="none"))
    ax.add_patch(Rectangle((-6, -14), 130, 9, facecolor="#E3EEF6", edgecolor="none"))  # 滨江
    ax.text(58, -9.5, "滨 江 步 道", ha="center", va="center", fontsize=11, color=STEEL)
    ax.add_patch(Rectangle((-6, 38), 130, 6, facecolor="#EEE7D6", edgecolor="none"))
    ax.text(58, 41, "文 华 路", ha="center", va="center", fontsize=11, color=MUTE)
    ax.add_patch(Rectangle((0, 0), 86, 32, facecolor="#FFFFFF", edgecolor=RED, linewidth=2.2))
    ax.text(43, 16, "云栖书店 · 滨江旗舰店", ha="center", va="center", fontsize=15, color=NAVY, weight="bold")
    ax.text(43, 11, "地上三层 · 6,420 ㎡", ha="center", va="center", fontsize=10.5, color=MUTE)
    # 尺寸链（沿街立面）
    xs = [0, 12, 20, 44, 74, 86]
    for a, b in zip(xs, xs[1:]):
        ax.annotate("", xy=(a, 35), xytext=(b, 35), arrowprops=dict(arrowstyle="<->", color=INK, lw=0.8))
        ax.text((a + b) / 2, 35.8, str(b - a), ha="center", va="bottom", fontsize=8.5, color=INK)
    ax.annotate("", xy=(-3, 0), xytext=(-3, 32), arrowprops=dict(arrowstyle="<->", color=INK, lw=0.8))
    ax.text(-4.2, 16, "32", ha="right", va="center", fontsize=9, color=INK)
    pins = [(6, 32, "主入口", AMBER), (60, 0, "次入口", AMBER), (86, 24, "货运口", STEEL), (104, 30, "地铁 C 口", SAGE)]
    for x, y, t, c in pins:
        ax.plot(x, y, "o", markersize=11, color=c, markeredgecolor="white", markeredgewidth=1.5)
        ax.text(x + 2.2, y + 1.6, t, fontsize=10, color=c, weight="bold")
    ax.add_patch(Rectangle((96, 4), 22, 22, facecolor="#E8EFE3", edgecolor=SAGE, linewidth=1, linestyle="--"))
    ax.text(107, 15, "口袋公园", ha="center", va="center", fontsize=9.5, color=SAGE)
    save(fig, "site.png")


# 3 一层总平面（全宽）
def plan():
    fig, ax = canvas(16, 6.67, (-2, 118), (-2, 48))
    ax.add_patch(Rectangle((0, 0), 116, 46, facecolor="#FFFFFF", edgecolor=RED, linewidth=2))
    zones = [
        (2, 26, 34, 18, "new", "新书与畅销区"), (38, 26, 30, 18, "lit", "文学与人文区"),
        (70, 26, 20, 18, "kids", "童书绘本区"), (2, 2, 26, 20, "cafe", "咖啡与轻食"),
        (30, 2, 30, 20, "event", "活动剧场"), (62, 2, 28, 20, "aisle", "文创与杂志"),
        (92, 2, 22, 42, "back", "后仓与收货"),
    ]
    for x, y, w, h, k, t in zones:
        box(ax, x, y, w, h, Z[k], ec="#8B939D", lw=0.8)
        ax.text(x + 1, y + h - 1.2, t, ha="left", va="top", fontsize=10, color=INK, weight="bold")
    shelves(ax, 3, 27, 32, 13, 3, 8); shelves(ax, 39, 27, 28, 13, 3, 7); shelves(ax, 71, 27, 18, 13, 2, 4)
    for i in range(5):
        for j in range(3):
            ax.add_patch(plt.Circle((5 + i * 4.6, 5 + j * 5), 1.1, facecolor="white", edgecolor="#7A8691", lw=0.6))
    for i in range(6):
        ax.add_patch(Rectangle((33 + i * 4.2, 4), 3.4, 1.2, facecolor="white", edgecolor="#7A8691", lw=0.6))
        ax.add_patch(Rectangle((33 + i * 4.2, 7), 3.4, 1.2, facecolor="white", edgecolor="#7A8691", lw=0.6))
    ax.add_patch(Rectangle((40, 14), 14, 5, facecolor="#E8C58A", edgecolor="#8B6B3E", lw=0.8))
    ax.text(47, 16.5, "舞台", ha="center", va="center", fontsize=8.5, color=INK)
    ax.plot([0, 116], [24, 24], color="#E8B84B", lw=5, solid_capstyle="butt")  # 主通道
    ax.plot([91, 91], [0, 46], color="#E8B84B", lw=4, solid_capstyle="butt")
    ax.plot([2, 114], [45, 45], color="#1E6FD9", lw=1.4)  # 物流动线
    ax.plot([114, 114], [45, 3], color="#1E6FD9", lw=1.4)
    for x, y in [(1, 24), (60, 0.8), (115, 30)]:
        ax.plot(x, y, "o", markersize=9, color=AMBER, markeredgecolor="white")
    for x, y in [(0, 0), (116, 0), (0, 46), (116, 46), (58, 46)]:
        ax.plot(x, y, "s", markersize=5, color="#C0392B")
    box(ax, 104, 36, 8, 6, "#FFD966", ec="#B8860B", label="收银", fs=8)
    save(fig, "plan.png")


# 4 三层剖面（竖长图）
def section():
    fig, ax = canvas(5.8, 10.24, (0, 58), (0, 102.4))
    levels = [("3F", "阅读馆 · 会员空间", Z["lit"], 70), ("2F", "专业书 · 童书", Z["kids"], 40), ("1F", "新书 · 咖啡 · 剧场", Z["new"], 10)]
    for k, (lv, t, c, y) in enumerate(levels):
        ax.add_patch(Rectangle((8, y), 42, 26, facecolor=c, edgecolor=NAVY, linewidth=1.4))
        ax.text(10, y + 23, lv, fontsize=16, color=NAVY, weight="bold", va="top")
        ax.text(29, y + 11, t, fontsize=11, color=INK, ha="center")
        shelves(ax, 11, y + 2, 36, 7, 1, 7)
    ax.add_patch(Rectangle((45, 10), 4, 86, facecolor="#FFFFFF", edgecolor=STEEL, linewidth=1.2))
    ax.text(47, 98, "货梯", fontsize=9, color=STEEL, ha="center")
    for y in (36, 66):
        ax.plot([12, 20], [y, y + 4], color=AMBER, lw=2.5)
    ax.text(16, 40.5, "扶梯", fontsize=8.5, color="#9A6414", ha="center")
    ax.plot([4, 54], [10, 10], color=INK, lw=2)
    ax.text(29, 5, "±0.00 · 滨江步道标高", fontsize=9, color=MUTE, ha="center")
    ax.add_patch(Rectangle((8, 96), 42, 2, facecolor="#E8EFE3", edgecolor=SAGE))
    ax.text(29, 100.5, "屋顶露台（夏季开放）", fontsize=9, color=SAGE, ha="center")
    save(fig, "section.png")


# 5 一层书架布置
def floor1():
    fig, ax = canvas(11.6, 10, (0, 116), (0, 100))
    ax.add_patch(Rectangle((2, 2), 112, 96, facecolor="#FFFFFF", edgecolor=NAVY, linewidth=1.5))
    blocks = [(6, 52, 48, 42, Z["new"], "新书与畅销", 5, 6), (60, 52, 50, 42, Z["lit"], "文学与人文", 5, 6),
              (6, 6, 34, 40, Z["kids"], "童书", 4, 4), (46, 6, 30, 40, Z["aisle"], "杂志 · 文创", 4, 3)]
    for x, y, w, h, c, t, r, cc in blocks:
        box(ax, x, y, w, h, c, ec="#8B939D", lw=0.8)
        ax.text(x + 1.5, y + h - 1.5, t, fontsize=12, weight="bold", color=INK, va="top")
        shelves(ax, x + 1, y + 1, w - 2, h - 9, r, cc)
    box(ax, 82, 6, 28, 40, "#FFFFFF", ec=STEEL, lw=1.2)
    ax.text(96, 26, "收银\n+\n包装台", ha="center", va="center", fontsize=11, color=STEEL)
    save(fig, "floor1.png")


# 6 二、三层（并排）
def floor23():
    fig, ax = canvas(9.2, 10, (0, 92), (0, 100))
    for k, (y, lv, c) in enumerate([(52, "3F 阅读馆", Z["lit"]), (4, "2F 专业书与童书", Z["kids"])]):
        ax.add_patch(Rectangle((2, y), 88, 44, facecolor="#FFFFFF", edgecolor=NAVY, linewidth=1.4))
        ax.text(4, y + 42, lv, fontsize=13, weight="bold", color=NAVY, va="top")
        box(ax, 4, y + 3, 52, 32, c, ec="#8B939D", lw=0.8)
        shelves(ax, 5, y + 4, 50, 30, 4, 6)
        box(ax, 60, y + 3, 28, 32, "#F3F0E8", ec="#8B939D", lw=0.8)
        for i in range(3):
            for j in range(4):
                ax.add_patch(Rectangle((62 + i * 8.6, y + 5 + j * 7.4), 6.8, 3.2, facecolor="white", edgecolor="#7A8691", lw=0.6))
        ax.text(74, y + 37, "阅读座" if k == 0 else "亲子阅读", ha="center", fontsize=10, color=INK)
    save(fig, "floor23.png")


# 7 阅读区局部放大
def detail():
    fig, ax = canvas(10.2, 7.26, (0, 102), (0, 72.6))
    ax.add_patch(Rectangle((2, 2), 98, 68, facecolor="#FFFFFF", edgecolor=NAVY, linewidth=1.5))
    for i in range(4):  # 长桌
        ax.add_patch(Rectangle((8, 8 + i * 14), 40, 4, facecolor="#EFE3CC", edgecolor="#8B6B3E", lw=0.9))
        for k in range(8):
            ax.add_patch(plt.Circle((10.5 + k * 5, 6 + i * 14), 1.1, facecolor="white", edgecolor="#7A8691", lw=0.7))
            ax.add_patch(plt.Circle((10.5 + k * 5, 14 + i * 14), 1.1, facecolor="white", edgecolor="#7A8691", lw=0.7))
    for j in range(6):  # 单人卡座
        ax.add_patch(Rectangle((58, 6 + j * 10.5), 14, 7, facecolor=Z["lit"], edgecolor=SAGE, lw=0.9))
        ax.plot([58, 72], [6 + j * 10.5, 13 + j * 10.5], color=SAGE, lw=0.5)
        ax.plot([58, 72], [13 + j * 10.5, 6 + j * 10.5], color=SAGE, lw=0.5)
    shelves(ax, 78, 4, 20, 64, 8, 1)
    ax.text(28, 66, "共享长桌", ha="center", fontsize=11, color=INK, weight="bold")
    ax.text(65, 70.8, "单人卡座", ha="center", va="top", fontsize=11, color=SAGE, weight="bold")
    ax.text(88, 70.8, "靠墙书架", ha="center", va="top", fontsize=11, color=INK, weight="bold")
    save(fig, "detail.png")


# 8 后仓与收货区
def backroom():
    fig, ax = canvas(12, 6.73, (0, 120), (0, 67.3))
    ax.add_patch(Rectangle((2, 2), 116, 63, facecolor="#FFFFFF", edgecolor=NAVY, linewidth=1.5))
    box(ax, 4, 40, 30, 22, "#E3EEF6", ec=STEEL, lw=1.2, label="卸货平台\n（2 个车位）", fs=11, color=STEEL)
    box(ax, 38, 40, 34, 22, Z["back"], ec="#8B939D", label="收货 · 验收", fs=11)
    box(ax, 76, 40, 40, 22, Z["back"], ec="#8B939D", label="拆包 · 上架准备", fs=11)
    box(ax, 4, 4, 52, 32, "#F3F0E8", ec="#8B939D")
    shelves(ax, 5, 5, 50, 26, 4, 6)
    ax.text(30, 33.5, "周转库位", ha="center", fontsize=11, color=INK, weight="bold")
    box(ax, 60, 4, 26, 32, "#FBE9E7", ec=RED, label="退货暂存", fs=11, color=RED)
    box(ax, 90, 4, 26, 32, "#FFFFFF", ec=STEEL, lw=1.2, label="货梯", fs=11, color=STEEL)
    for a, b in [((34, 51), (38, 51)), ((72, 51), (76, 51)), ((96, 40), (103, 36))]:
        ax.annotate("", xy=b, xytext=a, arrowprops=dict(arrowstyle="-|>", color=AMBER, lw=2))
    save(fig, "backroom.png")


if __name__ == "__main__":
    cover(); site(); plan(); section(); floor1(); floor23(); detail(); backroom()
