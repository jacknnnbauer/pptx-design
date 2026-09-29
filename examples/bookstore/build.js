// 示例：云栖书店 · 滨江旗舰店开业筹备方案汇报（虚构项目，数字均为示意）
// node build.js [输出路径]
const path = require("path");
const { createKit } = require("../../lib/kit");

const IMG = (n) => path.join(__dirname, "img", n);
const OUT = process.argv[2] || path.join(__dirname, "云栖书店_旗舰店开业方案汇报.pptx");

const K = createKit({
  title: "云栖书店 滨江旗舰店开业筹备方案汇报",
  author: "云栖书店 开业筹备组",
  footerText: "云栖书店 · 滨江旗舰店开业筹备方案",
});
const { pres, C, F, NUM } = K;

// ═════════ 1 封面 ═════════
{
  const s = K.addSlide();
  s.background = { color: "FBF8F1" };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 7.5, fill: { color: C.amber }, line: { color: C.amber } });
  s.addImage({ path: IMG("cover_outline.png"), x: 5.55, y: 3.75, w: 7.3, h: 7.3 * 940 / 2300 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y: 1.35, w: 0.9, h: 0.08, fill: { color: C.amber }, line: { color: C.amber } });
  s.addText("云栖书店 · 滨江旗舰店（YQ-01）", { x: 0.75, y: 1.6, w: 9, h: 0.45, fontFace: F,
    fontSize: 18, color: C.amberT, bold: true, margin: 0 });
  s.addText("开业筹备方案汇报", { x: 0.75, y: 2.12, w: 9, h: 1.0, fontFace: F, fontSize: 46, bold: true,
    color: C.navy, margin: 0 });
  s.addText("空间布局 · 书架陈列 · 物流配送 · 会员运营 · 开业计划", { x: 0.75, y: 3.2, w: 9, h: 0.4,
    fontFace: F, fontSize: 15, color: C.mute, margin: 0 });
  s.addText([
    { text: "云栖文化有限公司", options: { breakLine: true, bold: true, color: C.navy } },
    { text: "滨江旗舰店开业筹备组", options: { breakLine: true } },
    { text: "2027 年 3 月" },
  ], { x: 0.75, y: 5.3, w: 4.6, h: 1.1, fontFace: F, fontSize: 13, color: C.mute, margin: 0, paraSpaceAfter: 4 });
  s.addNotes("开场：本次汇报旗舰店开业筹备方案，重点讲四块——空间怎么分、书架怎么摆、货怎么进、会员怎么留，最后是开业节点和需要总部决策的事项。右下角橙色轮廓是门店外墙，蓝框是三层功能组团。");
}

// ═════════ 2 提纲 ═════════
{
  const s = K.addSlide();
  K.header(s, "CONTENTS", "汇报提纲", "汇报内容");
  const items = [
    ["01", "选址概况", "实测尺寸、出入口与周边"],
    ["02", "空间总体布局", "功能分区与面积分配"],
    ["03", "陈列与书架配置", "三层组团、书架数量与分批"],
    ["04", "物流与配送", "中央仓供货、配送线路与频次"],
    ["05", "会员运营与保障", "会员旅程、库存回流、安全措施"],
    ["06", "开业计划与待决事项", "关键节点、需总部决策"],
  ];
  items.forEach((it, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.5 + col * 4.15, y = 1.75 + row * 2.45, w = 3.85, h = 2.1;
    K.card(s, x, y, w, h);
    K.bar(s, x, y, h, i < 3 ? C.amber : C.steel);
    s.addText(it[0], { x: x + 0.35, y: y + 0.25, w: 1.4, h: 0.7, fontFace: NUM, fontSize: 36, bold: true,
      color: i < 3 ? C.amber : C.steel, margin: 0 });
    s.addText(it[1], { x: x + 0.35, y: y + 1.0, w: w - 0.5, h: 0.45, fontFace: F, fontSize: 18, bold: true, color: C.navy, margin: 0 });
    s.addText(it[2], { x: x + 0.35, y: y + 1.48, w: w - 0.5, h: 0.4, fontFace: F, fontSize: 12, color: C.mute, margin: 0 });
  });
  K.footer(s);
  s.addNotes("汇报分六部分。前三部分讲“空间怎么用”，后三部分讲“货怎么进、人怎么留、什么时候开、需要总部定什么”。");
}

// ═════════ 3 选址概况：图 + 大数字 + 关键点位 + 尺寸链 ═════════
{
  const s = K.addSlide();
  K.header(s, "01", "选址概况", "门店实测：86 m × 32 m，地上三层");
  const im = K.framedImage(s, IMG("site.png"), 0.5, 1.5, { w: 8.45, ratio: 2400 / 1060 });
  s.addText("依现场复测按比例绘制；沿街立面尺寸逐段校核一致", { x: 0.5, y: im.bottom + 0.1, w: 8.45, h: 0.3,
    fontFace: F, fontSize: 10.5, color: C.mute, italic: true, margin: 0 });
  const X = 9.55;
  K.stat(s, X, 1.5, 3.3, "6,420", "㎡", "三层合计建筑面积", C.navy);
  K.stat(s, X, 2.55, 3.4, "86 × 32", "m", "沿街面宽 × 进深", C.navy);
  s.addShape(pres.shapes.LINE, { x: X, y: 3.62, w: 3.35, h: 0, line: { color: C.line, width: 1 } });
  const pts = [
    ["主入口", "西北角，正对文华路"],
    ["次入口", "南侧，连通滨江步道"],
    ["货运口", "东侧独立出入\n避开顾客动线"],
    ["地铁口", "C 口距主入口约 120 m\n步行 2 分钟"],
    ["口袋公园", "东侧相邻，可办户外活动"],
  ];
  const ys = [3.8, 4.28, 4.76, 5.46, 6.16];
  pts.forEach((p, i) => {
    s.addText(p[0], { x: X, y: ys[i], w: 0.95, h: 0.34, fontFace: F, fontSize: 12, bold: true, color: C.amberT, margin: 0, valign: "top" });
    s.addText(p[1], { x: X + 1.0, y: ys[i], w: 2.4, h: 0.66, fontFace: F, fontSize: 12, color: C.ink, margin: 0, valign: "top" });
  });
  K.card(s, 0.5, 5.95, 8.65, 0.85, C.pale, C.pale);
  s.addText([
    { text: "沿街立面尺寸链（自西向东，m）  ", options: { bold: true, color: C.navy, fontFace: F } },
    { text: "12 · 8 · 24 · 30 · 12 ＝ 86", options: { fontFace: NUM, color: C.ink } },
  ], { x: 0.7, y: 5.95, w: 8.25, h: 0.85, fontSize: 13, margin: 0, valign: "middle" });
  K.footer(s);
  s.addNotes("门店已完成现场复测，沿街五段相加正好 86 米。四个关键点：主入口在西北角正对主路；次入口在南侧连通滨江步道；货运口单独设在东侧；地铁 C 口步行两分钟。");
}

// ═════════ 4 全宽平面图 + 自动排布图例 ═════════
{
  const s = K.addSlide();
  K.header(s, "02", "空间总体布局", "一层功能分区总平面");
  s.addImage({ path: IMG("plan.png"), x: 0.5, y: 1.42, w: 12.3, h: 12.3 * 1334 / 3200 });
  K.legend(s, [
    ["C8DCF5", "新书与畅销"], ["D9E7D6", "文学与人文"], ["F0E4C8", "童书绘本"], ["DDEBDC", "咖啡轻食"],
    ["F2E3C4", "活动剧场"], ["F6EFD9", "文创杂志"], ["CFD6DE", "后仓收货"], ["E8B84B", "主通道"],
    ["1E6FD9", "物流动线"], ["E8A33D", "出入口"], ["C0392B", "监控点位"], ["FFD966", "收银台"],
  ], 0.5, 6.56, 12.3);
  K.footer(s);
  s.addNotes("这是一层全平面。北侧三块是书区：新书畅销、文学人文、童书；南侧是咖啡、活动剧场和文创杂志；东侧整条是后仓，物流动线沿北墙和东墙走，不穿过顾客区。黄色为主通道，红点为监控。");
}

// ═════════ 5 条形图 + 分区说明卡 ═════════
{
  const s = K.addSlide();
  K.header(s, "02", "空间总体布局", "功能分区与面积分配");
  const labels = ["新书与畅销", "文学与人文", "阅读馆（3F）", "专业书（2F）", "活动剧场", "童书绘本",
    "后仓与收货", "咖啡轻食", "文创杂志"];
  const vals = [980, 860, 820, 760, 620, 540, 480, 420, 360];
  K.card(s, 0.5, 1.5, 6.3, 5.3);
  s.addText("主要功能区面积（㎡）", { x: 0.75, y: 1.62, w: 5, h: 0.35, fontFace: F, fontSize: 13, bold: true, color: C.navy, margin: 0 });
  K.hbar(s, 0.6, 2.0, 6.1, 4.7, labels, vals, C.amber);
  const R = 7.1, W = 5.73;
  const zones = [
    ["新书与畅销 · 首层黄金位", "正对主入口，按周更新陈列；畅销榜单墙与新书平台合计约 980 ㎡", C.amber],
    ["活动剧场 · 可容纳 120 人", "作者签售、读书会、亲子故事会；非活动时段作为开放阅读座", "8B3A1A"],
    ["阅读馆 · 三层整层", "会员专属安静区，长桌 + 单人卡座，靠窗面向江景", C.sage],
    ["后仓 · 东侧独立", "收货、拆包、周转、退货暂存集中布置，经货梯直达各层", C.steel],
  ];
  zones.forEach((z, i) => K.noteCard(s, R, 1.5 + i * 1.3833, W, 1.15, z[0], z[1], z[2]));
  K.footer(s);
  s.addNotes("面积最大的是首层新书畅销区和文学人文区，这两块是客流入口。活动剧场非活动时段也作为阅读座使用，不浪费面积。后仓集中在东侧，经货梯直达各层。");
}

// ═════════ 6 竖长图 + 五个编号要点 ═════════
{
  const s = K.addSlide();
  K.header(s, "03", "陈列与书架配置", "竖向组织：三层各有主题，动线单向上行");
  K.framedImage(s, IMG("section.png"), 0.5, 1.45, { h: 5.25, ratio: 1160 / 2048 });
  const X = 4.25, W = 8.55;
  const rows = [
    ["三层分主题，自下而上由“逛”到“读”", "1F 新书 · 咖啡 · 剧场（高频、短停留）→ 2F 专业书 · 童书（目的性）→ 3F 阅读馆（长停留、会员）"],
    ["扶梯单向上行，楼梯下行", "顾客自然走完三层；每层扶梯口正对该层主推陈列"],
    ["货梯独立，与顾客动线完全分开", "后仓经东侧货梯直达各层补货口，营业时段补货不穿过卖场"],
    ["三层屋顶露台夏季开放", "露台 380 ㎡，设遮阳与户外座，雨天自动收起"],
    ["每层设服务台与自助查询", "服务台位于扶梯口旁；自助查询机每层 2 台，可查库存与所在书架"],
  ];
  rows.forEach((r, i) => K.pointRow(s, X, 1.55 + i * 1.07, W, i + 1, r[0], r[1], i === 2 ? C.sage : C.navy, 0.62));
  K.footer(s);
  s.addNotes("三层按停留时长分主题：一层高频短停留，二层目的性购买，三层长时间阅读。扶梯只上行，让顾客自然走完三层。货梯和顾客动线完全分开，营业时段补货不打扰顾客。");
}

// ═════════ 7 图 + 超大数字 + 堆叠条 + 要点 ═════════
{
  const s = K.addSlide();
  K.header(s, "03", "陈列与书架配置", "书架布局 · 一层");
  K.framedImage(s, IMG("floor1.png"), 0.5, 1.45, { h: 5.1, ratio: 2320 / 2000 });
  const X = 7.05, W = 5.78;
  K.bigNumber(s, X, 1.45, 3, "128", "组", C.steel, 44);
  s.addText("一层书架全部（随批次一）", { x: X, y: 2.27, w: W, h: 0.3, fontFace: F, fontSize: 12, color: C.mute, margin: 0 });
  const parts = [["新书与畅销", 70], ["文学与人文", 34], ["童书", 16], ["杂志文创", 8]];
  const tot = parts.reduce((a, p) => a + p[1], 0);
  const cols = [C.steel, "5B8DB0", "8FB2CB", C.amber];
  let cx = X;
  parts.forEach((p, i) => {
    const w = W * p[1] / tot;
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 2.72, w, h: 0.42, fill: { color: cols[i] }, line: { color: "FFFFFF", width: 1 } });
    cx += w;
  });
  parts.forEach((p, i) => {
    const x = X + (i % 2) * 2.9, y = 3.3 + Math.floor(i / 2) * 0.42;
    s.addShape(pres.shapes.RECTANGLE, { x, y: y + 0.09, w: 0.18, h: 0.18, fill: { color: cols[i] }, line: { color: cols[i] } });
    s.addText(`${p[0]}  ${p[1]} 组`, { x: x + 0.28, y, w: 2.6, h: 0.36, fontFace: F, fontSize: 12, color: C.ink, margin: 0 });
  });
  K.bullets(s, [
    "新书平台 + 畅销榜单墙，正对主入口",
    "文学与人文按“作者 → 主题”两级分类，方便检索",
    "童书区地面软包、书架高度 ≤ 1.2 m",
    "收银与包装台靠近货运侧，兼作线上订单自提点",
  ], { x: X, y: 4.3, w: W, h: 2.35, fontSize: 12.5, paraSpaceAfter: 10 }, { indent: 14 });
  K.footer(s);
  s.addNotes("一层共 128 组书架：新书畅销 70、文学人文 34、童书 16、杂志文创 8。全部随第一批到货，保证试营业。");
}

// ═════════ 8 图 + 两张数量卡 + 规格条 ═════════
{
  const s = K.addSlide();
  K.header(s, "03", "陈列与书架配置", "书架布局 · 二层与三层");
  K.framedImage(s, IMG("floor23.png"), 0.5, 1.45, { h: 5.1, ratio: 1840 / 2000 });
  const X = 5.75, W = 3.4;
  const blocks = [
    ["二层 专业书与童书", "88", [["专业书架", 52], ["童书矮架", 18], ["展示平台", 10], ["亲子阅读座", 8]],
      ["按学科分 12 个主题区", "童书区独立出入，设家长等候座", "专业书支持预订调货"], C.sage],
    ["三层 阅读馆", "76", [["靠墙书架", 40], ["长桌配套架", 16], ["会员寄存柜", 12], ["期刊架", 8]],
      ["共享长桌 4 张（64 座）", "单人卡座 24 个，可预约", "会员专属，凭卡进入"], "9A6414"],
  ];
  blocks.forEach((b, i) => {
    const x = X + i * 3.68, y = 1.45, h = 4.05;
    K.card(s, x, y, W, h); K.bar(s, x, y, h, b[4]);
    s.addText(b[0], { x: x + 0.25, y: y + 0.15, w: W - 0.35, h: 0.38, fontFace: F, fontSize: 14, bold: true, color: C.navy, margin: 0 });
    s.addText([{ text: b[1], options: { fontFace: NUM, fontSize: 38, bold: true, color: b[4] } },
               { text: " 组", options: { fontFace: F, fontSize: 14, color: b[4] } }],
      { x: x + 0.25, y: y + 0.55, w: 2.5, h: 0.72, margin: 0, valign: "bottom" });
    b[2].forEach((p, j) => {
      s.addText(p[0], { x: x + 0.25, y: y + 1.4 + j * 0.34, w: 1.9, h: 0.32, fontFace: F, fontSize: 11.5, color: C.ink, margin: 0 });
      s.addText(String(p[1]), { x: x + 2.05, y: y + 1.4 + j * 0.34, w: 1.0, h: 0.32, fontFace: NUM, fontSize: 13, bold: true, color: C.ink, align: "right", margin: 0 });
    });
    s.addShape(pres.shapes.LINE, { x: x + 0.25, y: y + 2.86, w: W - 0.45, h: 0, line: { color: C.line, width: 0.75 } });
    K.bullets(s, b[3], { x: x + 0.25, y: y + 2.96, w: W - 0.4, h: 1.02, fontSize: 10.5, paraSpaceAfter: 3 }, { indent: 12 });
  });
  K.card(s, X, 5.75, 7.08, 0.9, C.pale, C.pale);
  s.addText([
    { text: "书架规格  ", options: { bold: true, color: C.navy } },
    { text: "标准架 1200 × 400 × 2100 mm；矮架 1200 × 400 × 1200 mm", options: { breakLine: true } },
    { text: "“组”按标准架计；靠墙书架与长桌配套架已按实际长度折算" },
  ], { x: X + 0.2, y: 5.77, w: 6.75, h: 0.86, fontFace: F, fontSize: 10, color: C.ink, margin: 0, valign: "middle" });
  K.footer(s);
  s.addNotes("二层专业书和童书共 88 组，童书区独立出入；三层阅读馆 76 组，以靠墙书架为主，中间是共享长桌和单人卡座。");
}

// ═════════ 9 局部放大图 + 三个要点 + 小表 ═════════
{
  const s = K.addSlide();
  K.header(s, "03", "陈列与书架配置", "阅读馆：座位配置与服务设施");
  const im = K.framedImage(s, IMG("detail.png"), 0.5, 1.45, { w: 6.95, ratio: 2040 / 1452 });
  s.addText("图示：三层阅读馆西半区（卡座内交叉线表示可预约座位）", { x: 0.5, y: im.bottom + 0.02, w: 7.15, h: 0.28,
    fontFace: F, fontSize: 10, color: C.mute, italic: true, margin: 0 });
  const X = 8.0, W = 4.83;
  K.pointRow(s, X, 1.5, W, 1, "共享长桌", "4 张长桌共 64 座，每座配阅读灯与电源", C.navy, 0.55);
  K.pointRow(s, X, 2.45, W, 2, "单人卡座", "24 个，小程序预约，每次 2 小时", C.steel, 0.55);
  K.pointRow(s, X, 3.4, W, 3, "分时段开放", "工作日：会员专属\n周末：10:00 前对所有读者开放", C.sage, 0.62);
  K.table(s, [
    ["配套设施（每层）", "2F", "3F"],
    ["自助查询机", "2", "2"], ["饮水点", "1", "2"], ["无障碍座位", "4", "6"], ["储物柜（格）", "—", "48"], ["服务台", "1", "1"],
  ], { x: X, y: 4.62, w: W, colW: [2.23, 1.3, 1.3], rowH: 0.36, fontSize: 11.5, align: ["left", "center", "center"], numCols: [1, 2] });
  K.footer(s);
  s.addNotes("三层阅读馆是会员留存的关键。长桌 64 座不需预约，卡座 24 个需预约。工作日会员专属，周末上午对所有读者开放，用来拉新。");
}

// ═════════ 10 超大总数 + 分批 + 两条时间线 ═════════
{
  const s = K.addSlide();
  K.header(s, "03", "陈列与书架配置", "全店 292 组书架，分两批到货");
  K.card(s, 0.5, 1.5, 4.2, 5.3);
  K.bigNumber(s, 0.8, 1.65, 3.6, "292", "组", C.navy, 60);
  s.addText("按最新平面核算，含三层寄存柜 12 组", { x: 0.8, y: 2.68, w: 3.6, h: 0.3, fontFace: F, fontSize: 12, color: C.mute, margin: 0 });
  const bat = [
    ["批次一", "170", "一层全部 128 ＋ 二层童书 42\n（矮架 18 · 展台 10 · 其他 14）", C.amber],
    ["批次二", "122", "二层专业书 46 ＋ 三层阅读馆 76\n箱数按首月客流复核", C.steel],
  ];
  bat.forEach((b, i) => {
    const y = 3.2 + i * 1.75;
    K.bar(s, 0.8, y, 1.2, b[3]);
    s.addText(b[0], { x: 1.05, y, w: 1.5, h: 0.36, fontFace: F, fontSize: 13, bold: true, color: i === 0 ? C.amberT : b[3], margin: 0 });
    s.addText([{ text: b[1], options: { fontFace: NUM, fontSize: 30, bold: true, color: C.ink } },
               { text: " 组", options: { fontFace: F, fontSize: 12, color: C.ink } }],
      { x: 2.55, y: y - 0.12, w: 1.9, h: 0.5, margin: 0, valign: "bottom", align: "right" });
    s.addText(b[2], { x: 1.05, y: y + 0.45, w: 3.45, h: 1.0, fontFace: F, fontSize: 10.5, color: C.mute, margin: 0, valign: "top" });
  });
  const TX = 5.1, TW = 7.7;
  s.addText("生产与安装节点（计划）", { x: TX, y: 1.5, w: TW, h: 0.4, fontFace: F, fontSize: 15, bold: true, color: C.navy, margin: 0 });
  const lines = [
    ["批次一 · 170 组", C.amber, [["下单", "03-20"], ["出厂", "04-15"], ["到店", "04-22"], ["安装完成", "05-06"]]],
    ["批次二 · 122 组", C.steel, [["下单", "04-10"], ["出厂", "05-12"], ["到店", "05-19"], ["全店完成", "06-02"]]],
  ];
  lines.forEach((L, i) => {
    const y = 2.25 + i * 1.65;
    s.addText(L[0], { x: TX, y, w: 3, h: 0.34, fontFace: F, fontSize: 12.5, bold: true, color: i === 0 ? C.amberT : L[1], margin: 0 });
    const y0 = y + 1.0;
    s.addShape(pres.shapes.LINE, { x: TX + 0.15, y: y0, w: TW - 0.3, h: 0, line: { color: L[1], width: 3 } });
    L[2].forEach((m, j) => {
      const x = TX + 0.15 + j * (TW - 0.3) / 3;
      s.addShape(pres.shapes.OVAL, { x: x - 0.11, y: y0 - 0.11, w: 0.22, h: 0.22, fill: { color: j === 3 ? L[1] : "FFFFFF" }, line: { color: L[1], width: 2 } });
      const al = j === 0 ? "left" : j === 3 ? "right" : "center";
      const tx = j === 0 ? x - 0.05 : j === 3 ? x - 1.55 : x - 0.8;
      s.addText(m[1], { x: tx, y: y0 - 0.55, w: 1.6, h: 0.34, fontFace: NUM, fontSize: 15, bold: true, color: C.ink, align: al, margin: 0 });
      s.addText(m[0], { x: tx, y: y0 + 0.17, w: 1.6, h: 0.3, fontFace: F, fontSize: 11, color: C.mute, align: al, margin: 0 });
    });
  });
  K.card(s, TX, 5.55, TW, 1.25, C.pale, C.pale);
  s.addText([
    { text: "分批依据：", options: { bold: true, color: C.navy } },
    { text: "批次一覆盖试营业所需全部区域（一层、二层童书及收银）；批次二对应专业书和阅读馆，数量按试营业首月客流复核。地面、灯光、电源点位按 292 组一次做到位，避免二次开槽。" },
  ], { x: TX + 0.2, y: 5.6, w: TW - 0.4, h: 1.15, fontFace: F, fontSize: 11, color: C.ink, margin: 0, valign: "middle" });
  K.footer(s);
  s.addNotes("全店 292 组书架分两批。第一批 170 组保证 5 月试营业；第二批 122 组对应专业书和阅读馆，按首月客流复核后再定。地面和灯光电源按满配一次做到位。");
}

// ═════════ 11 拓扑图：源 → 中心 → 五个分支 ═════════
{
  const s = K.addSlide();
  K.header(s, "04", "物流与配送", "配送网络：中央仓统配 + 城市分拨中心");
  K.flowBox(s, 0.5, 1.72, 2.4, 1.45, "上游供货", ["出版社 · 发行商", "约 1,200 家"], C.red);
  K.arrow(s, 2.9, 2.44, 3.7, 2.44, C.red, 2.5);
  K.card(s, 0.5, 3.4, 2.4, 1.05, "FFFFFF", C.red);
  s.addText([{ text: "干线运输 约 60 km", options: { bold: true, color: C.red, breakLine: true } },
             { text: "中央仓每日 2 班发往分拨中心", options: { color: C.ink } }],
    { x: 0.62, y: 3.44, w: 2.16, h: 0.97, fontFace: F, fontSize: 10.5, margin: 0, valign: "middle" });
  K.card(s, 3.5, 1.5, 4.85, 5.3, "FBF6EA", "E2C98F");
  s.addText("城市分拨中心（滨江物流园）", { x: 3.65, y: 1.58, w: 4.6, h: 0.36, fontFace: F, fontSize: 12.5, bold: true, color: "8A6400", margin: 0 });
  const box = (x, y, w, h, t1, t2, col) => {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: "FFFFFF" }, line: { color: col, width: 1.25 } });
    s.addText([{ text: t1, options: { bold: true, breakLine: true, color: C.ink } }, { text: t2, options: { color: C.mute, fontSize: 9.5 } }],
      { x: x + 0.08, y, w: w - 0.16, h, fontFace: F, fontSize: 11.5, align: "center", valign: "middle", margin: 0 });
  };
  box(3.7, 2.05, 4.45, 0.78, "收货验收 × 3 道", "扫码 · 抽检 · 入库（2 条收货线）", C.red);
  box(3.7, 3.15, 2.12, 1.05, "A 区 新书", "日均 6,000 册", "B8860B");
  box(6.03, 3.15, 2.12, 1.05, "B 区 常销", "日均 4,500 册", "B8860B");
  box(3.7, 4.52, 4.45, 0.78, "分拣线 × 9 格口", "按门店 × 楼层分拣（两区互为备份）", C.navy);
  box(3.7, 5.62, 4.45, 0.78, "退货回流 每日约 800 册", "滞销、破损统一回收到 B 区", C.sage);
  K.arrow(s, 4.76, 2.83, 4.76, 3.15); K.arrow(s, 7.09, 2.83, 7.09, 3.15);
  K.arrow(s, 4.76, 4.2, 4.76, 4.52); K.arrow(s, 7.09, 4.2, 7.09, 4.52);
  s.addShape(pres.shapes.LINE, { x: 5.93, y: 5.3, w: 0, h: 0.32, line: { color: C.sage, width: 1.5 } });
  const als = [
    ["YQ1", "滨江旗舰店（本店）", "每日 2 次 · A 区", C.steel],
    ["YQ2", "大学城店 + 校园快闪点", "每日 1 次 · A 区", C.steel],
    ["YQ3", "机场店（安检内）", "每日 1 次 · B 区", "B8860B"],
    ["YQ4", "万象城店 + 社区店", "隔日 1 次 · B 区", "B8860B"],
    ["YQ5", "线上订单前置仓", "每日 3 次 · B 区", "B8860B"],
  ];
  s.addShape(pres.shapes.LINE, { x: 8.75, y: 1.97, w: 0, h: 4.16, line: { color: C.navy, width: 2 } });
  K.arrow(s, 8.15, 4.91, 8.75, 4.91, C.navy, 2);
  als.forEach((a, i) => {
    const y = 1.55 + i * 1.04;
    s.addShape(pres.shapes.LINE, { x: 8.75, y: y + 0.42, w: 0.35, h: 0, line: { color: C.navy, width: 1.5 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 9.1, y, w: 3.73, h: 0.84, fill: { color: "FFFFFF" }, line: { color: a[3], width: 1.25 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 9.1, y, w: 0.78, h: 0.84, fill: { color: a[3] }, line: { color: a[3] } });
    s.addText(a[0], { x: 9.1, y, w: 0.78, h: 0.84, fontFace: NUM, fontSize: 15, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
    s.addText([{ text: a[1], options: { bold: true, breakLine: true, color: C.ink } }, { text: a[2], options: { color: C.mute, fontSize: 9.5 } }],
      { x: 9.98, y, w: 2.8, h: 0.84, fontFace: F, fontSize: 10.5, valign: "middle", margin: 0 });
  });
  K.card(s, 0.5, 4.7, 2.4, 2.1, C.pale, C.pale);
  s.addText([
    { text: "配送原则", options: { bold: true, color: C.navy, breakLine: true } },
    { text: "新书 T+1 上架", options: { bullet: { indent: 12 }, breakLine: true } },
    { text: "按楼层分拣、到店免二次分拣", options: { bullet: { indent: 12 }, breakLine: true } },
    { text: "周转箱循环使用", options: { bullet: { indent: 12 }, breakLine: true } },
    { text: "A、B 两区互为备份", options: { bullet: { indent: 12 } } },
  ], { x: 0.65, y: 4.8, w: 2.15, h: 1.9, fontFace: F, fontSize: 10.5, color: C.ink, margin: 0, valign: "top", paraSpaceAfter: 4 });
  K.footer(s);
  s.addNotes("配送走“中央仓统配、城市分拨”：上游约 1200 家供货商进中央仓，干线每日两班到城市分拨中心；分拨中心按门店和楼层分拣，本店每日两次到货，新书做到次日上架。");
}

// ═════════ 12 条形图 + 四张指标卡 ═════════
{
  const s = K.addSlide();
  K.header(s, "04", "物流与配送", "首年销售预测与库存周转");
  const L = ["新书与畅销", "童书绘本", "文学与人文", "咖啡轻食", "专业书", "文创", "活动票务", "杂志", "会员年费"];
  const V = [1360.0, 912.4, 776.0, 702.8, 488.6, 396.0, 124.5, 71.2, 58.0];
  K.card(s, 0.5, 1.5, 7.1, 5.3);
  s.addText("各品类首年销售额预测（万元）", { x: 0.75, y: 1.62, w: 5, h: 0.35, fontFace: F, fontSize: 13, bold: true, color: C.navy, margin: 0 });
  K.hbar(s, 0.6, 2.0, 6.9, 4.7, L, V, C.navy, "#,##0.0");
  const st = [
    ["4,890", "万元", "首年销售额合计（不含线上）", C.navy],
    ["1,850", "人次", "工作日日均客流预测", C.navy],
    ["42", "天", "图书平均库存周转天数", C.sage],
    ["≈ 38", "%", "会员消费占比目标（首年末）", "9A6414"],
  ];
  st.forEach((t, i) => {
    const y = 1.5 + i * 1.3933;
    K.card(s, 8.0, y, 4.83, 1.12); K.bar(s, 8.0, y, 1.12, t[3]);
    K.stat(s, 8.3, y + 0.1, 4.4, t[0], t[1], t[2], t[3]);
  });
  K.footer(s);
  s.addNotes("首年销售额预测约 4890 万元，新书畅销、童书、文学三类占六成。图书平均周转 42 天，会员消费占比首年末目标 38%。");
}

// ═════════ 13 图 + 三行标签说明 + 表 ═════════
{
  const s = K.addSlide();
  K.header(s, "04", "物流与配送", "后仓作业：收货到上架不超过 4 小时");
  const im = K.framedImage(s, IMG("backroom.png"), 0.5, 1.5, { w: 6.6, ratio: 2400 / 1346 });
  s.addText("东侧后仓：卸货平台 → 收货验收 → 拆包上架准备 → 货梯直达各层", { x: 0.5, y: im.bottom + 0.08, w: 6.8, h: 0.3,
    fontFace: F, fontSize: 10, color: C.mute, italic: true, margin: 0 });
  const pts = [
    ["时段", "到货集中在 07:00–09:30 开门前完成；营业时段仅线上前置仓补货"],
    ["流程", "扫码收货 → 差异当场登记 → 按楼层装入周转车 → 货梯送至各层补货口；上架前拍照留档"],
    ["隔离", "后仓与卖场之间只设两个补货口，顾客动线与物流动线不交叉"],
  ];
  pts.forEach((p, i) => {
    const y = 1.55 + i * 0.98;
    s.addText(p[0], { x: 7.55, y, w: 0.8, h: 0.36, fontFace: F, fontSize: 13.5, bold: true, color: C.red, margin: 0 });
    s.addText(p[1], { x: 8.35, y, w: 4.48, h: 0.9, fontFace: F, fontSize: 11, color: C.ink, margin: 0, valign: "top" });
  });
  K.table(s, [
    ["批次", "内容", "车型", "时长"],
    ["早-1", "新书（A 区）", "4.2 m 厢货", "40 min"],
    ["早-2", "常销补货（B 区）", "4.2 m 厢货", "35 min"],
    ["午", "线上订单前置", "电动三轮", "15 min"],
    ["晚", "退货回收", "4.2 m 厢货", "25 min"],
    ["周三", "文创与杂志", "面包车", "20 min"],
    ["周五", "活动物料", "面包车", "20 min"],
  ], { x: 7.55, y: 4.55, w: 5.28, colW: [0.62, 1.78, 2.2, 0.68], rowH: 0.3, fontSize: 9.5, align: ["left", "left", "left", "right"] });
  s.addText("单日后仓作业总时长 ≤ 4 小时，不占用营业高峰", { x: 0.5, y: 5.72, w: 6.8, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: C.sage, margin: 0 });
  K.footer(s);
  s.addNotes("后仓作业集中在开门前完成，营业时段只做线上订单补货。后仓和卖场之间只有两个补货口，顾客和物流不交叉。");
}

// ═════════ 14 五步横向流程 + 三个指标 + 说明框 ═════════
{
  const s = K.addSlide();
  K.header(s, "05", "会员运营与保障", "会员旅程：从到店到复购");
  K.flowRow(s, 0.5, 1.55, 12.3, 1.75, [
    ["① 到店", ["地铁 / 步道引流", "门口新书墙吸引驻足"]],
    ["② 注册", ["扫码 30 秒完成", "首单 9 折", "赠三层阅读馆体验券"]],
    ["③ 体验", ["阅读馆预约座位", "咖啡会员价"]],
    ["④ 活动", ["每周 3 场读书会", "作者签售优先报名", "积分兑换入场"]],
    ["⑤ 复购", ["新书到货推送", "按阅读偏好推荐", "生日月双倍积分"]],
  ], C.steel);
  const sts = [["1,850", "人次", "工作日日均客流\n工作日 1,850 · 周末 3,600"],
               ["18.5", "%", "到店注册转化率目标\n首月 12 · 第三月 18.5"],
               ["2.4", "次/月", "活跃会员月均到店\n阅读馆会员 3.1"]];
  sts.forEach((t, i) => {
    const y = 3.62 + i * 1.1333;
    K.card(s, 0.5, y, 5.4, 0.84); K.bar(s, 0.5, y, 0.84, C.steel);
    s.addText([{ text: t[0], options: { fontFace: NUM, fontSize: 26, bold: true, color: C.steel } },
               { text: " " + t[1], options: { fontFace: F, fontSize: 12, color: C.steel } }],
      { x: 0.75, y, w: 1.9, h: 0.84, margin: 0, valign: "middle" });
    s.addText(t[2], { x: 2.6, y, w: 3.2, h: 0.84, fontFace: F, fontSize: 10.5, color: C.ink, margin: 0, valign: "middle" });
  });
  K.card(s, 6.2, 3.62, 6.6, 3.1, C.pale, C.pale);
  s.addText("运营做法", { x: 6.45, y: 3.72, w: 3, h: 0.36, fontFace: F, fontSize: 13.5, bold: true, color: C.navy, margin: 0 });
  K.bullets(s, [
    "会员体系与集团其他门店打通，积分通用、等级互认",
    "店员每人每月维护 150 名会员，节假日前定向邀约",
    "阅读馆座位优先会员，非会员周末上午可体验",
    "活动报名、座位预约、线上下单统一在小程序完成",
  ], { x: 6.45, y: 4.15, w: 6.2, h: 2.5, fontSize: 11.5, paraSpaceAfter: 9 });
  K.footer(s);
  s.addNotes("会员旅程五步：到店、注册、体验、活动、复购。注册环节用三层阅读馆体验券做钩子；活动和新书推送负责复购。");
}

// ═════════ 15 横向流程 + 支线汇入 + 三张分类卡 ═════════
{
  const s = K.addSlide();
  K.header(s, "05", "会员运营与保障", "库存回流：滞销及时下架，不压货");
  const y0 = 2.55;
  const bw = K.flowRow(s, 0.5, y0, 12.3, 1.45, [
    ["销售数据", ["POS 与线上订单", "按日汇总"]],
    ["滞销预警", ["上架 60 天", "销量 < 3 册"]],
    ["下架复核", ["店长 → 品类经理", "→ 确认退货"]],
    ["退货打包", ["周转箱装箱", "晚班车回收"]],
    ["回流处理", ["退供应商 70%", "调拨其他门店 30%"], C.sage],
  ], "8B6B3E");
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 2.2, h: 0.62, fill: { color: "FFFFFF" }, line: { color: "8B6B3E", width: 1 } });
  s.addText("会员反馈 → 补货建议", { x: 0.55, y: 1.5, w: 2.1, h: 0.62, fontFace: F, fontSize: 10.5, bold: true, color: C.ink, align: "center", valign: "middle", margin: 0 });
  K.arrow(s, 2.7, 1.81, 0.5 + bw + 0.325 + 0.6, y0, "8B6B3E", 1.5);
  [["破损图书", "收货时发现的当场拒收；卖场破损的按月集中报损，拍照留档", C.steel],
   ["预售与签名本", "不参与自动下架，由品类经理单独管理", C.red],
   ["季节性图书", "教辅、年历等提前 30 天设定下架日期，到期自动进入复核", C.sage],
  ].forEach((o, i) => K.noteCard(s, 0.5 + i * 4.2, 4.4, 3.9, 1.4, o[0], o[1], o[2]));
  s.addText("下架规则按品类可配置；童书与文学经典默认不做自动下架，只做库存上限预警", {
    x: 0.5, y: 6.05, w: 12.3, h: 0.5, fontFace: F, fontSize: 11, color: C.mute, margin: 0, valign: "middle" });
  K.footer(s);
  s.addNotes("库存回流按数据驱动：上架 60 天销量不足 3 册自动预警，经店长和品类经理复核后退货。七成退供应商，三成调拨给其他门店。");
}

// ═════════ 16 三列并排卡片 ═════════
{
  const s = K.addSlide();
  K.header(s, "05", "会员运营与保障", "消防安全、服务保障与滨江环境措施");
  const cols = [
    ["消防与安全", C.red, [
      "每层 2 条疏散通道，宽度 ≥ 1.8 m",
      "书架与顶棚净距 ≥ 0.5 m",
      "咖啡区设独立排烟与灭火毯",
      "活动剧场满员 120 人即停止入场",
      "监控覆盖出入口、收银与后仓",
      "每月一次消防演练，新员工入职必训"]],
    ["服务保障", "9A6414", [
      "营业时间 09:00–22:00，全年无休",
      "高峰时段每层至少 2 名店员",
      "无障碍卫生间与母婴室每层各 1",
      "失物招领与寄存统一在一层服务台",
      "投诉 24 小时内回复"]],
    ["滨江环境适应", C.sage, [
      "临江一侧书架距外墙 ≥ 0.6 m 防潮",
      "梅雨季恒湿 50%–60%，每日记录",
      "台风预警时关闭露台、加固外摆",
      "一层入口设挡水板，高 0.4 m",
      "纸品库位离地 ≥ 15 cm"]],
  ];
  cols.forEach((c, i) => {
    const x = 0.5 + i * 4.21, y = 1.55, w = 3.91, h = 5.2;
    K.card(s, x, y, w, h);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.6, fill: { color: c[1] }, line: { color: c[1] } });
    s.addText(c[0], { x: x + 0.25, y, w: w - 0.4, h: 0.6, fontFace: F, fontSize: 15, bold: true, color: "FFFFFF", valign: "middle", margin: 0 });
    K.bullets(s, c[2], { x: x + 0.25, y: y + 0.85, w: w - 0.45, h: h - 1.0, fontSize: 13, paraSpaceAfter: 12 });
  });
  K.footer(s);
  s.addNotes("三方面保障：消防按商业建筑标准执行；服务保障重点是高峰人手；滨江环境重点是防潮和汛期应对。");
}

// ═════════ 17 里程碑时间线 + 三张说明卡 ═════════
{
  const s = K.addSlide();
  K.header(s, "06", "开业计划与待决事项", "关键节点（计划）");
  const ms = [
    ["03-15", "方案定稿\n启动招采", C.navy], ["03-31", "装修进场\n隔墙、水电", C.navy], ["04-18", "天花地面\n完成", C.navy],
    ["04-28", "灯光软装\n收银系统", C.navy], ["05-06", "批次一\n书架安装完成", C.amber], ["05-12", "首批图书\n上架", C.amber],
    ["05-20", "试营业", C.amber], ["06-02", "批次二\n书架完成", C.steel], ["06-18", "正式开业", C.steel],
  ];
  const x0 = 0.85, x1 = 12.5, y = 3.55;
  s.addShape(pres.shapes.LINE, { x: x0, y, w: x1 - x0, h: 0, line: { color: C.line, width: 4 } });
  ms.forEach((m, i) => {
    const x = x0 + i * (x1 - x0) / (ms.length - 1);
    const big = m[0] === "05-20" || m[0] === "06-18";
    const d = big ? 0.36 : 0.26;
    s.addShape(pres.shapes.OVAL, { x: x - d / 2, y: y - d / 2, w: d, h: d, fill: { color: big ? m[2] : "FFFFFF" }, line: { color: m[2], width: 2.5 } });
    const up = i % 2 === 0;
    const dc = m[2] === C.amber ? C.amberT : m[2];
    s.addText(m[0], { x: x - 0.7, y: up ? y - 1.2 : y + 0.32, w: 1.4, h: 0.4, fontFace: NUM, fontSize: big ? 18 : 15, bold: true, color: dc, align: "center", margin: 0 });
    s.addText(m[1], { x: x - 0.75, y: up ? y - 0.8 : y + 0.72, w: 1.5, h: 0.5, fontFace: F, fontSize: 10.5, color: C.ink, align: "center", margin: 0, valign: up ? "bottom" : "top" });
  });
  const xm = x0 + 5.5 * (x1 - x0) / (ms.length - 1);
  s.addShape(pres.shapes.LINE, { x: xm, y: 1.95, w: 0, h: 2.85, line: { color: C.mute, width: 1, dashType: "dash" } });
  s.addText("筹建期", { x: xm - 1.45, y: 1.62, w: 1.35, h: 0.34, fontFace: F, fontSize: 12, bold: true, color: C.mute, align: "right", margin: 0 });
  s.addText("营业期", { x: xm + 0.1, y: 1.62, w: 1.35, h: 0.34, fontFace: F, fontSize: 12, bold: true, color: C.mute, margin: 0 });
  [["装修与书架并行", "书架在工厂生产期间现场同步做装修，书架到店即可安装，不等工序", C.navy],
   ["图书上架", "首批 8 万册分 3 天上架，按楼层从上到下，避免上架时二次搬运", C.amber],
   ["开业目标", "05-20 试营业，覆盖一层与二层童书；06-18 全店正式开业", C.steel],
  ].forEach((t, i) => K.noteCard(s, 0.5 + i * 4.21, 5.0, 3.91, 1.6, t[0], t[1], t[2]));
  K.footer(s);
  s.addNotes("核心是两条线并行：书架在工厂生产，现场同步做装修，书架到店即可安装。5 月 20 日试营业，6 月 18 日正式开业。");
}

// ═════════ 18 两张大行动卡 ═════════
{
  const s = K.addSlide();
  K.header(s, "06", "开业计划与待决事项", "需总部决策的事项");
  const items = [
    ["1", "阅读馆会员定价", "请确定三层阅读馆的会员年费档位，以及是否对学生提供折扣",
      "决定阅读馆的座位预约规则与首年会员收入测算", "03-25", C.steel],
    ["2", "开业活动预算", "请确定开业首月活动预算上限，以及签售作者邀约的审批流程",
      "关系到活动剧场排期与宣传物料下单时间", "04-05", C.amberT],
  ];
  items.forEach((it, i) => {
    const x = 0.5 + i * 6.265, y = 1.65, w = 6.065, h = 4.6;
    K.card(s, x, y, w, h); K.bar(s, x, y, h, it[5]);
    K.numDot(s, x + 0.4, y + 0.4, it[0], it[5], 0.62);
    s.addText(it[1], { x: x + 1.25, y: y + 0.42, w: w - 1.5, h: 0.58, fontFace: F, fontSize: 24, bold: true, color: C.navy, margin: 0, valign: "middle" });
    s.addText("需决策内容", { x: x + 0.4, y: y + 1.45, w: 3, h: 0.32, fontFace: F, fontSize: 11.5, bold: true, color: C.mute, margin: 0 });
    s.addText(it[2], { x: x + 0.4, y: y + 1.8, w: w - 0.75, h: 0.95, fontFace: F, fontSize: 15, color: C.ink, margin: 0, valign: "top" });
    s.addText("用途", { x: x + 0.4, y: y + 2.85, w: 3, h: 0.32, fontFace: F, fontSize: 11.5, bold: true, color: C.mute, margin: 0 });
    s.addText(it[3], { x: x + 0.4, y: y + 3.2, w: w - 0.75, h: 0.5, fontFace: F, fontSize: 13, color: C.ink, margin: 0, valign: "top" });
    s.addShape(pres.shapes.LINE, { x: x + 0.4, y: y + 3.88, w: w - 0.8, h: 0, line: { color: C.line, width: 0.75 } });
    s.addText("建议时间", { x: x + 0.4, y: y + 4.0, w: 2, h: 0.45, fontFace: F, fontSize: 12, color: C.mute, margin: 0, valign: "middle" });
    s.addText(it[4], { x: x + w - 2.4, y: y + 3.96, w: 2.0, h: 0.52, fontFace: NUM, fontSize: 24, bold: true, color: it[5], align: "right", margin: 0, valign: "middle" });
  });
  K.footer(s);
  s.addNotes("需要总部决策的有两件：一是 3 月 25 日前定阅读馆会员年费；二是 4 月 5 日前定开业活动预算和签售审批流程。");
}

// ═════════ 19 结束页 ═════════
{
  const s = K.addSlide();
  s.background = { color: "FBF8F1" };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 7.5, fill: { color: C.amber }, line: { color: C.amber } });
  s.addImage({ path: IMG("cover_outline.png"), x: 2.9, y: 3.65, w: 7.6, h: 7.6 * 940 / 2300, transparency: 35 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.22, y: 1.75, w: 0.9, h: 0.08, fill: { color: C.amber }, line: { color: C.amber } });
  s.addText("谢谢", { x: 0.5, y: 2.0, w: 12.33, h: 1.0, fontFace: F, fontSize: 44, bold: true, color: C.navy, align: "center", margin: 0 });
  s.addText("请各位领导批评指正", { x: 0.5, y: 3.0, w: 12.33, h: 0.5, fontFace: F, fontSize: 18, color: C.mute, align: "center", margin: 0 });
  s.addText("云栖文化有限公司 · 滨江旗舰店开业筹备组", { x: 0.5, y: 6.75, w: 12.33, h: 0.4, fontFace: F, fontSize: 12, color: C.mute, align: "center", margin: 0 });
}

K.save(OUT);
