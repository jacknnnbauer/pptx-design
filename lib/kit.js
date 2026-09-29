// pptx-design · 设计系统与通用部件
// 16:9 宽屏（13.333 × 7.5 in），暖灰底 + 藏青标题 + 琥珀/钢蓝/鼠尾草绿三色分组。
const pptxgen = require("pptxgenjs");

const DEFAULT_COLORS = {
  navy: "1B2733",   // 标题、主数字
  amber: "E8A33D",  // 第一强调色（色块、图形）
  amberT: "9A6414", // 琥珀色压在浅底上的文字版（对比度够）
  steel: "2E6F95",  // 第二强调色
  sage: "5F7F4E",   // 第三强调色（绿色系、"通过/保留"）
  red: "9E1B1E",    // 风险、警示
  bg: "F6F4EF",     // 正文页底色
  card: "FFFFFF",
  line: "D9D4C7",   // 卡片描边、分隔线
  ink: "1F2933",    // 正文
  mute: "6B7280",   // 次要文字
  pale: "EFEBE2",   // 注释条、结论条底色
};

/**
 * 建一份演示文稿。
 * @param {object} o
 * @param {string} o.title       文件属性里的标题
 * @param {string} o.author      文件属性里的作者
 * @param {string} o.footerText  每页左下角的页脚文字
 * @param {object} [o.colors]    覆盖默认配色（只写要改的键）
 * @param {string} [o.font]      正文字体，默认微软雅黑
 * @param {string} [o.numFont]   数字字体，默认 Bahnschrift
 */
function createKit(o = {}) {
  const C = { ...DEFAULT_COLORS, ...(o.colors || {}) };
  const F = o.font || "Microsoft YaHei";
  const NUM = o.numFont || "Bahnschrift";
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  if (o.author) pres.author = o.author;
  if (o.title) pres.title = o.title;

  // 页脚延后到 save() 时统一画，页码"n / 总页数"自动算，增删页不用手改
  const numbered = [];
  let slideCount = 0;

  function addSlide() {
    slideCount += 1;
    const s = pres.addSlide();
    s._kitIndex = slideCount;
    return s;
  }
  function footer(s) { numbered.push(s); }

  function header(s, sec, secName, title) {
    s.background = { color: C.bg };
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.42, w: 0.16, h: 0.16, fill: { color: C.amber }, line: { color: C.amber } });
    s.addText(`${sec}  ${secName}`, { x: 0.75, y: 0.33, w: 8, h: 0.34, fontFace: F, fontSize: 11,
      color: C.mute, bold: true, charSpacing: 2, margin: 0 });
    s.addText(title, { x: 0.5, y: 0.68, w: 12.3, h: 0.62, fontFace: F, fontSize: 28, bold: true,
      color: C.navy, margin: 0 });
  }
  function card(s, x, y, w, h, fill = C.card, border = C.line) {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: border, width: 0.75 } });
  }
  // 卡片左侧竖色条
  function bar(s, x, y, h, color) {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h, fill: { color }, line: { color } });
  }
  // 大数字 + 单位 + 说明
  function stat(s, x, y, w, big, unit, label, color = C.navy) {
    s.addText([
      { text: big, options: { fontFace: NUM, fontSize: 30, bold: true, color } },
      { text: unit ? " " + unit : "", options: { fontFace: F, fontSize: 13, color } },
    ], { x, y, w, h: 0.55, margin: 0, valign: "bottom" });
    s.addText(label, { x, y: y + 0.58, w, h: 0.32, fontFace: F, fontSize: 11, color: C.mute, margin: 0 });
  }
  // 超大数字（页面主角），如"292 组"
  function bigNumber(s, x, y, w, big, unit, color = C.navy, size = 60) {
    s.addText([{ text: big, options: { fontFace: NUM, fontSize: size, bold: true, color } },
               { text: " " + unit, options: { fontFace: F, fontSize: Math.round(size * 0.3), color } }],
      { x, y, w, h: size / 60, margin: 0, valign: "bottom" });
  }
  function numDot(s, x, y, n, color = C.navy, d = 0.42) {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color } });
    s.addText(String(n), { x, y, w: d, h: d, fontFace: NUM, fontSize: 14, bold: true, color: "FFFFFF",
      align: "center", valign: "middle", margin: 0 });
  }
  // 要点行：编号圆 + 粗体标题 + 说明
  function pointRow(s, x, y, w, n, head, body, color = C.navy, bodyH = 0.5) {
    numDot(s, x, y + 0.02, n, color);
    s.addText(head, { x: x + 0.58, y, w: w - 0.58, h: 0.36, fontFace: F, fontSize: 14.5, bold: true, color: C.ink, margin: 0 });
    s.addText(body, { x: x + 0.58, y: y + 0.37, w: w - 0.58, h: bodyH, fontFace: F, fontSize: 11.5,
      color: C.mute, margin: 0, valign: "top", paraSpaceAfter: 2 });
  }
  // 任意方向带箭头直线（pptxgenjs 的 LINE 需要用 flipH/flipV 表达方向）
  function arrow(s, x1, y1, x2, y2, color = C.mute, width = 1.5) {
    s.addShape(pres.shapes.LINE, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
      flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: "triangle" } });
  }
  // 流程框：色头标题 + 多行说明
  function flowBox(s, x, y, w, h, title, lines, color) {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.card }, line: { color, width: 1.25 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.44, fill: { color }, line: { color } });
    s.addText(title, { x: x + 0.1, y, w: w - 0.2, h: 0.44, fontFace: F, fontSize: 12.5, bold: true, color: "FFFFFF",
      valign: "middle", margin: 0 });
    s.addText(lines.map((t, i) => ({ text: t, options: { breakLine: i < lines.length - 1 } })), {
      x: x + 0.12, y: y + 0.52, w: w - 0.24, h: h - 0.6, fontFace: F, fontSize: 10.5, color: C.ink,
      valign: "top", margin: 0, paraSpaceAfter: 3 });
  }
  // 一行横排流程：n 个流程框 + 框间箭头，铺满 x..x+totalW
  function flowRow(s, x, y, totalW, h, steps, color, gap = 0.325) {
    const bw = (totalW - gap * (steps.length - 1)) / steps.length;
    steps.forEach((st, i) => {
      const bx = x + i * (bw + gap);
      flowBox(s, bx, y, bw, h, st[0], st[1], st[2] || color);
      if (i < steps.length - 1) arrow(s, bx + bw + 0.03, y + h / 2, bx + bw + gap - 0.03, y + h / 2, color, 2);
    });
    return bw;
  }
  // 带色条的标题卡：标题 + 正文
  function noteCard(s, x, y, w, h, title, body, color, bodySize = 10.5) {
    card(s, x, y, w, h); bar(s, x, y, h, color);
    s.addText(title, { x: x + 0.25, y: y + 0.12, w: w - 0.4, h: 0.36, fontFace: F, fontSize: 13.5, bold: true, color: C.navy, margin: 0 });
    s.addText(body, { x: x + 0.25, y: y + 0.52, w: w - 0.4, h: h - 0.62, fontFace: F, fontSize: bodySize, color: C.ink, margin: 0, valign: "top" });
  }
  // 图片放进白底卡片，按图片原始宽高比缩放；给宽或给高其一
  function framedImage(s, file, x, y, { w, h, ratio, pad = 0.1, fill = C.card }) {
    if (w == null) w = h * ratio; else h = w / ratio;
    card(s, x, y, w + 2 * pad, h + 2 * pad, fill);
    s.addImage({ path: file, x: x + pad, y: y + pad, w, h });
    return { w, h, bottom: y + h + 2 * pad, right: x + w + 2 * pad };
  }
  // 图例：色块 + 文字，按字宽自动均分一整行
  function legend(s, items, x, y, totalW, fontSize = 9) {
    const tw = (t) => [...t].reduce((a, ch) => a + (/[\x00-\x7F]/.test(ch) ? 0.078 : 0.125), 0) * fontSize / 9;
    const tot = items.reduce((a, l) => a + 0.28 + tw(l[1]), 0);
    const gap = (totalW - tot) / Math.max(1, items.length - 1);
    let lx = x;
    items.forEach((l) => {
      s.addShape(pres.shapes.RECTANGLE, { x: lx, y: y + 0.08, w: 0.2, h: 0.14, fill: { color: l[0] }, line: { color: "8B939D", width: 0.5 } });
      s.addText(l[1], { x: lx + 0.26, y, w: tw(l[1]) + 0.2, h: 0.3, fontFace: F, fontSize, color: C.ink, margin: 0 });
      lx += 0.28 + tw(l[1]) + gap;
    });
  }
  // 横向条形图（已按"最大在上"排好）
  function hbar(s, x, y, w, h, labels, values, color, fmt = "#,##0") {
    s.addChart(pres.charts.BAR, [{ name: "v", labels: labels.slice().reverse(), values: values.slice().reverse() }], {
      x, y, w, h, barDir: "bar", chartColors: [color],
      catAxisLabelColor: C.ink, catAxisLabelFontFace: F, catAxisLabelFontSize: 10.5,
      valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ink, dataLabelFontSize: 10,
      dataLabelFontFace: NUM, dataLabelFormatCode: fmt, barGapWidthPct: 45, showLegend: false,
    });
  }
  // 斑马纹表格；首行为表头
  function table(s, rows, opt) {
    const { align = [], numCols = [], fontSize = 11, ...rest } = opt;
    const H = (t, j) => ({ text: t, options: { bold: true, color: "FFFFFF", fill: { color: C.navy }, align: align[j] || "left" } });
    const body = rows.map((r, i) => r.map((c, j) => i === 0 ? H(c, j) : ({ text: String(c), options: {
      align: align[j] || "left", fontFace: numCols.includes(j) ? NUM : F, bold: numCols.includes(j),
      fill: { color: i % 2 ? "FFFFFF" : "F3F0E8" } } })));
    s.addTable(body, { fontFace: F, fontSize, color: C.ink, border: { type: "solid", pt: 0.5, color: C.line },
      margin: [0.03, 0.08, 0.03, 0.08], valign: "middle", ...rest });
  }
  function bullets(s, items, box, bulletOpt = true) {
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: bulletOpt, breakLine: i < items.length - 1 } })),
      { fontFace: F, color: C.ink, margin: 0, valign: "top", ...box });
  }

  async function save(file) {
    const total = slideCount;
    for (const s of numbered) {
      s.addText(o.footerText || "", { x: 0.5, y: 7.05, w: 9, h: 0.3, fontFace: F, fontSize: 9, color: C.mute, margin: 0 });
      s.addText(`${s._kitIndex} / ${total}`, { x: 11.83, y: 7.05, w: 1.0, h: 0.3, fontFace: NUM, fontSize: 10,
        color: C.mute, align: "right", margin: 0 });
    }
    const f = await pres.writeFile({ fileName: file });
    console.log("written:", f, `(${total} slides)`);
    return f;
  }

  return { pres, C, F, NUM, addSlide, footer, header, card, bar, stat, bigNumber, numDot, pointRow, arrow,
    flowBox, flowRow, noteCard, framedImage, legend, hbar, table, bullets, save };
}

module.exports = { createKit, DEFAULT_COLORS };
