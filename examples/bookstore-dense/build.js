// 示例（详版）：云栖书店 · 滨江旗舰店开业筹备方案汇报
// 面向正式场合的文字密排版：标题即结论、核心观点条、（一）（二）引领句段落、表格为主、页底小结。
// 虚构项目，数字均为示意；测算数字全部由下方数据推算，不手填。
// node build.js [输出路径]
const path = require("path");
const { createKit } = require("../../lib/kit");

const IMG = (n) => path.join(__dirname, "..", "bookstore", "img", n);
const OUT = process.argv[2] || path.join(__dirname, "云栖书店_旗舰店开业方案汇报_详版.pptx");

const K = createKit({
  title: "云栖书店 滨江旗舰店开业筹备方案汇报（详版）",
  author: "云栖书店 开业筹备组",
  footerText: "云栖书店 · 滨江旗舰店开业筹备方案汇报",
});
const { pres, C, F, NUM } = K;
const T = 24; // 密排版标题字号

// ───────── 数据与测算（改这里，全文联动） ─────────
const fmt = (v, d = 1) => v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const sum = (a) => a.reduce((x, y) => x + y, 0);
const pct = (v, t) => (v / t * 100).toFixed(1) + "%";

const AREA = 6420;
const zones = [ // 区域, 面积 ㎡, 功能与配置要点
  ["新书与畅销", 980, "正对主入口；新书平台、畅销榜单墙，按周更新"],
  ["文学与人文", 860, "按“作者—主题”两级分类，设作家专架"],
  ["阅读馆（3F）", 820, "会员专属；长桌 64 座、单人卡座 24 个"],
  ["专业书（2F）", 760, "按学科分 12 个主题区，支持预订调货"],
  ["活动剧场", 620, "可容纳 120 人；非活动时段作开放阅读座"],
  ["童书绘本", 540, "独立出入，地面软包，书架高度 ≤ 1.2 m"],
  ["后仓与收货", 480, "东侧独立，经货梯直达各层补货口"],
  ["咖啡轻食", 420, "对外独立营业，闭店后可延时至 23:00"],
  ["文创杂志", 360, "与收银台相邻，承担连带销售"],
];
zones.push(["公共通道与服务", AREA - sum(zones.map((z) => z[1])), "扶梯、货梯、卫生间、母婴室、服务台"]);

const shelves = [ // 楼层, 区域, 组数, 陈列方式, 批次(1/2)
  ["1F", "新书与畅销", 70, "平台 + 高架，面朝入口", 1], ["1F", "文学与人文", 34, "高架，侧向主通道", 1],
  ["1F", "童书", 16, "矮架，靠窗", 1], ["1F", "杂志文创", 8, "期刊架 + 展台", 1],
  ["2F", "童书与亲子", 42, "矮架、展台、亲子座", 1], ["2F", "专业书", 46, "高架，按学科分区", 2],
  ["3F", "阅读馆靠墙书架", 40, "通高书墙", 2], ["3F", "长桌配套架", 16, "桌端矮架", 2],
  ["3F", "寄存柜与期刊架", 20, "会员寄存 + 期刊", 2],
];
const shelfTotal = sum(shelves.map((r) => r[2]));
const batch = (b) => sum(shelves.filter((r) => r[4] === b).map((r) => r[2]));

const goods = [ // 品类, SKU, 首批册数, 平均定价(元), 主要渠道
  ["新书与畅销", 6800, 22000, 58, "总部集采"], ["文学与人文", 9500, 18000, 52, "总部集采"],
  ["童书绘本", 7200, 16000, 46, "总部集采 + 门店自采"], ["专业书", 8600, 12000, 86, "门店自采"],
  ["社科艺术", 4200, 7000, 72, "总部集采"], ["外文原版", 1800, 3000, 138, "进口代理"],
  ["杂志期刊", 300, 2000, 30, "邮发 + 代理"],
];
const books = sum(goods.map((g) => g[2]));
const skus = sum(goods.map((g) => g[1]));
const stockValue = sum(goods.map((g) => g[2] * g[3])) * 0.62 / 1e4; // 进货折扣 0.62，万元

const invest = [ // 项目, 万元, 说明
  ["装修工程", 2600, "三层装修、机电改造、外立面招牌"],
  ["书架及陈列设备", 480, `${shelfTotal} 组书架、展台、灯光`],
  ["信息系统与设备", 260, "收银、库存、会员、自助查询、监控"],
  ["咖啡设备", 120, "咖啡机、冷柜、操作台"],
  ["首批图书", +stockValue.toFixed(1), `${fmt(books / 1e4, 0)} 万册，按码洋 × 0.62 计`],
  ["开办费", 180, "招聘培训、开业营销、证照"],
];
const investSub = sum(invest.map((r) => r[1]));
invest.push(["预备费", +(investSub * 0.05).toFixed(1), "按以上合计的 5% 计"]);
const investTotal = sum(invest.map((r) => r[1]));

const sales = [ // 品类, 首年销售额(万元), 毛利率
  ["新书与畅销", 1360.0, 0.30], ["童书绘本", 912.4, 0.35], ["文学与人文", 776.0, 0.32],
  ["咖啡轻食", 702.8, 0.62], ["专业书", 488.6, 0.28], ["文创", 396.0, 0.45],
  ["活动票务", 124.5, 0.70], ["杂志", 71.2, 0.25], ["会员年费", 58.0, 1.00],
];
const sales1 = sum(sales.map((r) => r[1]));
const gp1 = sum(sales.map((r) => r[1] * r[2]));
const gpRate = gp1 / sales1;
const GROWTH = 0.18, STAFF = 68;
const dep = (2600 + 480 + 260 + 120) / 5; // 设备与装修按 5 年摊销
function year(n) { // 第 n 年经营测算（万元）
  const s = sales1 * Math.pow(1 + GROWTH, n - 1), gp = s * gpRate;
  const cost = {
    "租金": AREA * 3.2 * 365 / 1e4 * (n <= 2 ? 0.85 : 1),
    "人工": STAFF * 7.2 * Math.pow(1.05, n - 1),
    "水电物业": 180, "营销推广": 150, "折旧摊销": dep, "物流配送": s * 0.02, "其他": 60,
  };
  const c = sum(Object.values(cost));
  return { s, gp, cost, c, p: gp - c };
}
const Y = [1, 2, 3].map(year);
const breakEven = Y.findIndex((y) => y.p > 0) + 1;
if (!breakEven) throw new Error("测算里三年都没有盈利，检查参数");

// ═════════ 1 封面 ═════════
{
  const s = K.addSlide();
  s.background = { color: "FBF8F1" };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 7.5, fill: { color: C.amber }, line: { color: C.amber } });
  s.addImage({ path: IMG("cover_outline.png"), x: 5.55, y: 3.75, w: 7.3, h: 7.3 * 940 / 2300 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y: 1.35, w: 0.9, h: 0.08, fill: { color: C.amber }, line: { color: C.amber } });
  s.addText("云栖书店 · 滨江旗舰店（YQ-01）", { x: 0.75, y: 1.6, w: 9, h: 0.45, fontFace: F, fontSize: 18, color: C.amberT, bold: true, margin: 0 });
  s.addText("开业筹备方案汇报", { x: 0.75, y: 2.12, w: 9, h: 1.0, fontFace: F, fontSize: 46, bold: true, color: C.navy, margin: 0 });
  s.addText("总体情况 · 空间与陈列 · 商品与供应链 · 经营测算 · 会员运营 · 风险应对 · 实施计划 · 需决策事项", {
    x: 0.75, y: 3.2, w: 11.5, h: 0.4, fontFace: F, fontSize: 14, color: C.mute, margin: 0 });
  s.addText([
    { text: "汇报单位：", options: { bold: true, color: C.navy } }, { text: "云栖文化有限公司 滨江旗舰店开业筹备组", options: { breakLine: true } },
    { text: "汇报日期：", options: { bold: true, color: C.navy } }, { text: "2027 年 3 月" },
  ], { x: 0.75, y: 5.45, w: 5.2, h: 0.8, fontFace: F, fontSize: 13, color: C.mute, margin: 0, paraSpaceAfter: 6 });
  s.addNotes("本次汇报为详版，共八个部分，重点是经营测算和三项需决策事项。");
}

// ═════════ 2 目录：八部分 + 要点 ═════════
{
  const s = K.addSlide();
  K.header(s, "CONTENTS", "目录", "汇报内容");
  const parts = [
    ["一", "总体情况", "项目概况 · 选址依据 · 筹备进展"],
    ["二", "空间与陈列方案", "功能分区 · 面积指标 · 书架配置"],
    ["三", "商品与供应链", "商品结构 · 采购策略 · 物流配送"],
    ["四", "经营测算", "投资估算 · 收入预测 · 盈亏平衡"],
    ["五", "会员运营", "会员旅程 · 运营举措 · 关键指标"],
    ["六", "风险分析与应对", "六类主要风险及应对措施"],
    ["七", "实施计划与组织保障", "进度安排 · 组织分工 · 工作机制"],
    ["八", "需决策事项", "三项请示及建议方案"],
  ];
  parts.forEach((p, i) => {
    const col = Math.floor(i / 4), row = i % 4;
    const x = 0.5 + col * 6.265, y = 1.55 + row * 1.22, w = 6.065, h = 1.02;
    K.card(s, x, y, w, h); K.bar(s, x, y, h, col ? C.steel : C.amber);
    s.addText(p[0], { x: x + 0.3, y, w: 0.8, h, fontFace: F, fontSize: 30, bold: true, color: col ? C.steel : C.amber, margin: 0, valign: "middle" });
    s.addText(p[1], { x: x + 1.2, y: y + 0.14, w: w - 1.4, h: 0.42, fontFace: F, fontSize: 17, bold: true, color: C.navy, margin: 0 });
    s.addText(p[2], { x: x + 1.2, y: y + 0.56, w: w - 1.4, h: 0.34, fontFace: F, fontSize: 12, color: C.mute, margin: 0 });
  });
  K.footer(s);
  s.addNotes("汇报分八部分：前三部分讲方案本身，第四部分讲账，第五到第七部分讲怎么落地，最后是三项需要决策的事项。");
}

// ═════════ 3 汇报摘要：五个数 + 四段结论 ═════════
{
  const s = K.addSlide();
  K.header(s, "SUMMARY", "汇报摘要", "筹备总体按计划推进，具备 5 月 20 日试营业条件", T);
  K.lead(s, `旗舰店建筑面积 ${fmt(AREA, 0)} ㎡，总投资 ${fmt(investTotal)} 万元；首年预计销售 ${fmt(sales1, 0)} 万元，第 ${breakEven} 年实现盈利。`);
  const st = [[fmt(AREA, 0), "㎡", "建筑面积（地上三层）"], [String(shelfTotal), "组", "书架（分两批安装）"],
    [fmt(books / 1e4, 0), "万册", `首批图书 · ${fmt(skus, 0)} 个 SKU`], [fmt(investTotal, 0), "万元", "总投资"],
    [fmt(sales1, 0), "万元", "首年销售预测"]];
  st.forEach((t, i) => {
    const x = 0.5 + i * 2.49, w = 2.33;
    K.card(s, x, 2.2, w, 1.05); K.bar(s, x, 2.2, 1.05, i < 2 ? C.amber : C.steel);
    K.stat(s, x + 0.22, 2.27, w - 0.3, t[0], t[1], t[2], i < 2 ? C.navy : C.steel);
  });
  const blocks = [
    ["项目定位", [["城市文化地标型旗舰店", "以“逛—选—读—聚”为主线，服务滨江片区约 42 万常住人口及地铁通勤客流，兼顾品牌展示与会员沉淀"]]],
    ["筹备进展", [["四项前置工作已完成", "租赁合同已签订、装修单位已确定、书架完成打样、首批选品清单完成 85%；装修 3 月 31 日进场"]]],
    ["经营预期", [[`首年亏损 ${fmt(-Y[0].p, 0)} 万元，第 ${breakEven} 年盈利 ${fmt(Y[breakEven - 1].p, 0)} 万元`, `首年综合毛利率 ${(gpRate * 100).toFixed(1)}%；亏损主要来自装修与设备摊销（每年 ${fmt(dep, 0)} 万元）`]]],
    ["需决策事项", [["共 3 项，请于 4 月 5 日前明确", "阅读馆会员定价、开业活动预算上限、二批书架是否与一批合并招标"]]],
  ];
  blocks.forEach((b, i) => {
    const x = 0.5 + (i % 2) * 6.265, y = 3.5 + Math.floor(i / 2) * 1.62, w = 6.065;
    const yy = K.subhead(s, x, y, w, b[0], i === 3 ? C.red : C.navy);
    K.paras(s, b[1], { x, y: yy, w, h: 1.0 }, { num: null, size: 13 });
  });
  K.summary(s, "筹备工作总体可控，两项高等级风险已有专项预案，建议按既定节点推进。", 6.35, 0.55, "结论");
  K.footer(s);
  s.addNotes("先说结论：筹备按计划推进，5 月 20 日可以试营业。首年因为装修摊销会有亏损，第三年转为盈利。今天需要领导决策三件事。");
}

// ═════════ 4 一、项目概况一览 + 选址依据 + 比选 ═════════
{
  const s = K.addSlide();
  K.header(s, "一", "总体情况", "选址滨江文化休闲带，客流基础与品牌定位高度匹配", T);
  K.lead(s, "三处候选点综合比选，滨江点位在客流、区位、租赁条件三项均居首位，综合评分 92 分。");
  K.kvTable(s, [
    ["项目名称", "云栖书店滨江旗舰店（YQ-01）"],
    ["项目地址", "滨江区文华路与滨江步道交汇处"],
    ["建筑面积", `${fmt(AREA, 0)} ㎡（地上三层，面宽 86 m、进深 32 m）`],
    ["功能定位", "图书零售 + 阅读空间 + 文化活动 + 轻餐饮"],
    ["书架规模", `${shelfTotal} 组，首批上架约 ${fmt(books / 1e4, 0)} 万册`],
    ["总投资", `${fmt(investTotal)} 万元`],
    ["人员配置", `${STAFF} 人（管理 8、店员 42、咖啡 10、后仓 8）`],
    ["营业时间", "09:00–22:00，全年无休"],
    ["开业安排", "05-20 试营业，06-18 正式开业"],
    ["租期", "首期 10 年，前 2 年租金减免 15%"],
  ], { x: 0.5, y: 2.2, w: 6.4, labelW: 1.25, fontSize: 11, rowH: 0.4 });
  let y = K.subhead(s, 7.2, 2.2, 5.63, "选址依据");
  K.paras(s, [
    ["客流基础好", "地铁 C 口步行 2 分钟，工作日通勤客流约 3.2 万人次；周边 1 公里内有 6 所学校、3 个大型社区"],
    ["区位契合定位", "滨江步道为城市文化休闲带，周末客流是工作日的 2.1 倍，契合书店周末深度消费的特点"],
    ["租赁条件可控", "出租方承担外立面改造，前 2 年租金减免 15%，首年租金支出较市场价低约 110 万元"],
  ], { x: 7.2, y, w: 5.63, h: 2.3 }, { size: 12.5, gap: 8 });
  y = K.subhead(s, 7.2, 5.1, 5.63, "候选点比选（百分制）");
  K.table(s, [
    ["候选点", "客流", "区位", "租赁", "综合"],
    [{ text: "滨江步道（本项目）", options: { bold: true, color: C.navy } }, "95", "93", "86", { text: "92", options: { color: C.sage } }],
    ["万象城商场", "90", "80", "82", "85"],
    ["老城区文化街", "72", "88", "78", "78"],
  ], { x: 7.2, y, w: 5.63, colW: [2.23, 0.85, 0.85, 0.85, 0.85], rowH: 0.29, fontSize: 10.5,
       align: ["left", "center", "center", "center", "center"], numCols: [1, 2, 3, 4] });
  K.footer(s);
  s.addNotes("左边是项目基本情况。选址在三处候选点里比选过，滨江点位客流、区位、租赁三项都是第一，综合 92 分。");
}

// ═════════ 5 二、功能分区：平面 + 原则 + 面积指标表 ═════════
{
  const s = K.addSlide();
  K.header(s, "二", "空间与陈列方案", "按“高频在下、长停留在上”组织三层空间", T);
  K.lead(s, `九大功能区合计 ${fmt(AREA - zones[zones.length - 1][1], 0)} ㎡，占建筑面积 ${pct(AREA - zones[zones.length - 1][1], AREA)}；零售与阅读面积占比超过六成。`);
  const im = K.framedImage(s, IMG("plan.png"), 0.5, 2.2, { w: 5.9, ratio: 3200 / 1334 });
  K.paras(s, [
    ["动线单向上行", "扶梯只上不下，顾客自然走完三层；每层扶梯口正对主推陈列"],
    ["客货分流", "后仓与货梯集中在东侧，物流不穿越卖场，营业时段不补大货"],
    ["弹性空间", "活动剧场非活动时段作开放阅读座，面积利用率不低于 80%"],
  ], { x: 0.5, y: im.bottom + 0.15, w: 6.1, h: 6.25 - im.bottom - 0.15 }, { size: 11.5, gap: 5 });
  K.table(s, [["功能区", "面积（㎡）", "占比", "功能与配置要点"],
    ...zones.map((z) => [z[0], fmt(z[1], 0), pct(z[1], AREA), z[2]]),
    [{ text: "合计", options: { bold: true } }, { text: fmt(AREA, 0), options: { bold: true } }, "100.0%", ""]],
  { x: 6.8, y: 2.2, w: 6.03, colW: [1.35, 0.85, 0.7, 3.13], rowH: 0.335, fontSize: 9.5,
    align: ["left", "right", "right", "left"], numCols: [1, 2] });
  K.summary(s, "空间方案已与出租方、消防顾问确认；各区面积按施工图复核，误差不超过 2%。");
  K.footer(s);
  s.addNotes("空间组织的原则是高频在下、长停留在上。面积表里九大功能区加公共通道正好 6420 平米。");
}

// ═════════ 6 二、书架配置表 + 配置原则 ═════════
{
  const s = K.addSlide();
  K.header(s, "二", "空间与陈列方案", `全店书架 ${shelfTotal} 组，分两批安装，首批保障试营业`, T);
  K.lead(s, `批次一 ${batch(1)} 组覆盖一层全部和二层童书区，5 月 6 日前安装完成；批次二 ${batch(2)} 组 6 月 2 日前完成。`);
  K.table(s, [["楼层", "区域", "组数", "陈列方式", "批次"],
    ...shelves.map((r) => [r[0], r[1], String(r[2]), r[3],
      { text: r[4] === 1 ? "批次一" : "批次二", options: { color: r[4] === 1 ? C.amberT : C.steel, bold: true } }]),
    [{ text: "合计", options: { bold: true } }, "", { text: String(shelfTotal), options: { bold: true } }, `批次一 ${batch(1)} · 批次二 ${batch(2)}`, ""]],
  { x: 0.5, y: 2.2, w: 7.1, colW: [0.7, 1.9, 0.8, 2.6, 1.1], rowH: 0.37, fontSize: 11,
    align: ["center", "left", "right", "left", "center"], numCols: [2] });
  const y = K.subhead(s, 7.9, 2.2, 4.93, "配置原则");
  K.paras(s, [
    ["按客流强度分配密度", "一层单位面积书架数为三层的 1.8 倍，新书与畅销区占全店书架的 24%"],
    ["分批采购、一次预留", "地面、灯光、电源点位按满配一次施工到位，避免二批安装时二次开槽"],
    ["二批数量可调", "批次二按试营业首月客流和动销数据复核，上下浮动不超过 15%"],
    ["规格统一", "标准架 1200 × 400 × 2100 mm，矮架高 1200 mm；组数按标准架折算"],
  ], { x: 7.9, y, w: 4.93, h: 3.55 }, { size: 12.5, gap: 12 });
  K.summary(s, `书架已完成打样和验收，批次一 ${batch(1)} 组 3 月 20 日下单，工厂排产 25 天。`);
  K.footer(s);
  s.addNotes("书架共 292 组，第一批 170 组保证试营业，第二批 122 组对应专业书和阅读馆，数量按首月数据复核。");
}

// ═════════ 7 三、商品结构表 + 采购策略 ═════════
{
  const s = K.addSlide();
  K.header(s, "三", "商品与供应链", `首批 ${fmt(books / 1e4, 0)} 万册、${fmt(skus, 0)} 个 SKU，新书与童书占比近半`, T);
  K.lead(s, "商品结构按“新书引流、常销稳量、专业书立口碑”配置；首批按 60 天动销量备货，避免压库。");
  K.table(s, [["品类", "SKU", "首批（册）", "占比", "均价（元）", "主要渠道"],
    ...goods.map((g) => [g[0], fmt(g[1], 0), fmt(g[2], 0), pct(g[2], books), String(g[3]), g[4]]),
    [{ text: "合计", options: { bold: true } }, { text: fmt(skus, 0), options: { bold: true } }, { text: fmt(books, 0), options: { bold: true } }, "100.0%", "—", ""]],
  { x: 0.5, y: 2.2, w: 7.3, colW: [1.5, 0.95, 1.15, 0.9, 1.05, 1.75], rowH: 0.4, fontSize: 11,
    align: ["left", "right", "right", "right", "right", "left"], numCols: [1, 2, 3, 4] });
  const y = K.subhead(s, 8.1, 2.2, 4.73, "采购策略");
  K.paras(s, [
    ["总部集采为主", "新书、文学、社科由总部统一采购，享受集团折扣；专业书由门店按学科自采"],
    ["首批按 60 天动销备货", `首批采购成本约 ${fmt(stockValue, 0)} 万元（已纳入投资估算）`],
    ["滞销及时退换", "上架 60 天销量不足 3 册自动预警，经复核后七成退供应商、三成调拨其他门店"],
    ["外文原版单独管理", "由进口代理供货，不参与自动下架，按季度盘点"],
  ], { x: 8.1, y, w: 4.73, h: 3.55 }, { size: 12.5, gap: 12 });
  K.summary(s, "选品清单已完成 85%，剩余专业书部分 3 月 25 日前定稿；主要供应商框架协议已签订。");
  K.footer(s);
  s.addNotes("首批 8 万册，新书和童书占近一半。备货按 60 天动销量测算，滞销的及时退换，不压库存。");
}

// ═════════ 8 三、物流配送：链路 + 配送安排表 + 保障措施 ═════════
{
  const s = K.addSlide();
  K.header(s, "三", "商品与供应链", "依托城市分拨中心统配，新书实现次日上架", T);
  K.lead(s, "配送走“中央仓统配、城市分拨、门店按层收货”三级链路；后仓作业集中在开门前完成，不占用营业高峰。");
  K.flowRow(s, 0.5, 2.2, 12.33, 1.2, [
    ["① 上游供货", ["出版社、发行商约 1,200 家"]],
    ["② 中央仓", ["统一验收入库", "干线每日 2 班"]],
    ["③ 城市分拨中心", ["按门店 × 楼层分拣", "A、B 两区互为备份"]],
    ["④ 门店后仓", ["07:00–09:30 收货", "货梯直送各层"], C.sage],
  ], C.steel);
  K.subhead(s, 0.5, 3.6, 7.0, "配送安排");
  K.table(s, [["批次", "时段", "内容", "车型", "频次"],
    ["早-1", "07:00–07:40", "新书（A 区）", "4.2 m 厢货", "每日"],
    ["早-2", "08:00–08:35", "常销补货（B 区）", "4.2 m 厢货", "每日"],
    ["午", "12:30–12:45", "线上订单前置", "电动三轮", "每日"],
    ["晚", "21:30–21:55", "退货回收", "4.2 m 厢货", "每日"],
    ["周三", "08:00–08:20", "文创与杂志", "面包车", "每周"],
  ], { x: 0.5, y: 4.12, w: 7.0, colW: [0.8, 1.45, 1.9, 1.65, 1.2], rowH: 0.34, fontSize: 10.5,
       align: ["left", "left", "left", "left", "center"] });
  const y = K.subhead(s, 7.8, 3.6, 5.03, "保障措施");
  K.paras(s, [
    ["时效", "新书到分拨中心后 T+1 上架；缺货调拨 48 小时内到店"],
    ["隔离", "后仓与卖场只设两个补货口，顾客与物流动线不交叉"],
    ["应急", "分拨中心 A、B 两区互为备份，单区停运时次日恢复配送"],
  ], { x: 7.8, y, w: 5.03, h: 2.1 }, { size: 12.5, gap: 10 });
  K.summary(s, "物流配送费按销售额 2% 计入经营测算；与分拨中心的服务协议已进入法务审核。");
  K.footer(s);
  s.addNotes("物流是三级链路，门店每天早上两次到货，新书次日上架。后仓和卖场隔离，营业时段不补大货。");
}

// ═════════ 9 四、投资估算表 + 资金安排 ═════════
{
  const s = K.addSlide();
  K.header(s, "四", "经营测算", `项目总投资 ${fmt(investTotal)} 万元，装修工程占比近六成`, T);
  K.lead(s, `总投资 ${fmt(investTotal)} 万元，其中装修 ${fmt(invest[0][1], 0)} 万元（${pct(invest[0][1], investTotal)}）；资金由集团专项资金全额安排，分三次拨付。`);
  K.table(s, [["投资项目", "金额（万元）", "占比", "说明"],
    ...invest.map((r) => [r[0], fmt(r[1]), pct(r[1], investTotal), r[2]]),
    [{ text: "合计", options: { bold: true } }, { text: fmt(investTotal), options: { bold: true } }, "100.0%", ""]],
  { x: 0.5, y: 2.2, w: 7.6, colW: [1.7, 1.35, 0.95, 3.6], rowH: 0.42, fontSize: 11,
    align: ["left", "right", "right", "left"], numCols: [1, 2] });
  const y = K.subhead(s, 8.4, 2.2, 4.43, "资金安排");
  K.paras(s, [
    ["第一次拨付 40%", "3 月下旬，用于装修预付款、书架批次一下单"],
    ["第二次拨付 40%", "4 月下旬，用于装修进度款、首批图书采购、系统上线"],
    ["第三次拨付 20%", "6 月正式开业后，用于尾款与预备费"],
    ["控制措施", "装修、书架、系统三项合同均为固定总价，超支须报筹备领导小组审批"],
  ], { x: 8.4, y, w: 4.43, h: 3.6 }, { size: 12.5, gap: 14 });
  K.summary(s, "投资估算已经财务部初审；装修与书架采用固定总价合同，预备费仅用于设计变更。");
  K.footer(s);
  s.addNotes("总投资里装修占大头，将近六成。资金分三次拨付，主要合同都是固定总价，超支需要领导小组审批。");
}

// ═════════ 10 四、收入毛利 + 三年测算 ═════════
{
  const s = K.addSlide();
  K.header(s, "四", "经营测算", `首年销售 ${fmt(sales1, 0)} 万元，第 ${breakEven} 年实现经营盈利`, T);
  K.lead(s, `首年毛利 ${fmt(gp1, 0)} 万元、费用 ${fmt(Y[0].c, 0)} 万元，经营亏损 ${fmt(-Y[0].p, 0)} 万元；按年增长 ${GROWTH * 100}% 测算，第 ${breakEven} 年盈利 ${fmt(Y[breakEven - 1].p, 0)} 万元。`);
  K.subhead(s, 0.5, 2.2, 6.1, "首年收入与毛利（万元）");
  K.table(s, [["品类", "销售额", "毛利率", "毛利"],
    ...sales.map((r) => [r[0], fmt(r[1]), (r[2] * 100).toFixed(0) + "%", fmt(r[1] * r[2])]),
    [{ text: "合计", options: { bold: true } }, { text: fmt(sales1), options: { bold: true } },
     (gpRate * 100).toFixed(1) + "%", { text: fmt(gp1), options: { bold: true } }]],
  { x: 0.5, y: 2.72, w: 6.1, colW: [1.9, 1.5, 1.2, 1.5], rowH: 0.33, fontSize: 10.5,
    align: ["left", "right", "right", "right"], numCols: [1, 2, 3] });
  K.subhead(s, 6.9, 2.2, 5.93, "三年经营测算（万元）");
  const keys = Object.keys(Y[0].cost);
  K.table(s, [["项目", "第 1 年", "第 2 年", "第 3 年"],
    ["销售收入", ...Y.map((y) => fmt(y.s))],
    ["毛利", ...Y.map((y) => fmt(y.gp))],
    ...keys.map((k) => ["　" + k, ...Y.map((y) => fmt(y.cost[k]))]),
    [{ text: "经营利润", options: { bold: true } },
     ...Y.map((y) => ({ text: fmt(y.p), options: { bold: true, color: y.p < 0 ? C.red : C.sage } }))]],
  { x: 6.9, y: 2.72, w: 5.93, colW: [1.83, 1.37, 1.37, 1.36], rowH: 0.3, fontSize: 10.5,
    align: ["left", "right", "right", "right"], numCols: [1, 2, 3] });
  K.summary(s, `测算口径：租金 3.2 元/㎡/天，前 2 年减免 15%；人工 ${STAFF} 人、年增 5%；装修与设备按 5 年摊销（每年 ${fmt(dep, 0)} 万元）。`);
  K.footer(s);
  s.addNotes("首年会亏损，主要是装修和设备摊销；按每年 18% 的增长，第三年转为盈利。测算口径写在页底。");
}

// ═════════ 11 五、会员运营：旅程 + 举措 + 指标表 ═════════
{
  const s = K.addSlide();
  K.header(s, "五", "会员运营", "以阅读馆为抓手，首年末会员消费占比达到 38%", T);
  K.lead(s, "会员体系与集团门店打通；以“阅读馆体验券”拉新、以“活动 + 新书推送”促复购，形成到店—注册—复购闭环。");
  K.flowRow(s, 0.5, 2.2, 12.33, 1.05, [
    ["① 到店", ["地铁、步道引流"]], ["② 注册", ["扫码 30 秒，首单 9 折"]], ["③ 体验", ["阅读馆预约座位"]],
    ["④ 活动", ["每周 3 场读书会"]], ["⑤ 复购", ["新书推送、生日双倍积分"]],
  ], C.steel);
  const y = K.subhead(s, 0.5, 3.45, 6.6, "主要举措");
  K.paras(s, [
    ["体系打通", "积分通用、等级互认，老会员到店即享旗舰店权益"],
    ["专人维护", "店员每人每月维护 150 名会员，节假日前定向邀约"],
    ["活动常态化", "每周 3 场读书会、每月 1 场作者签售，会员优先报名"],
    ["数据驱动", "按阅读偏好推送新书，活动报名、预约、下单统一在小程序完成"],
  ], { x: 0.5, y, w: 6.6, h: 2.35 }, { size: 12.5, gap: 10 });
  K.subhead(s, 7.4, 3.45, 5.43, "关键指标");
  K.table(s, [["指标", "首月", "第三月", "首年末"],
    ["新增会员（人）", "4,200", "3,600", "38,000"],
    ["注册转化率", "12.0%", "18.5%", "20.0%"],
    ["活跃会员月均到店", "1.6 次", "2.4 次", "2.6 次"],
    ["会员消费占比", "15%", "26%", "38%"],
    ["活动场次", "10", "13", "150"],
  ], { x: 7.4, y: 3.97, w: 5.43, colW: [2.03, 1.1, 1.15, 1.15], rowH: 0.36, fontSize: 10.5,
       align: ["left", "right", "right", "right"], numCols: [1, 2, 3] });
  K.summary(s, "会员小程序 4 月 28 日上线，试营业前完成与集团会员系统的数据联调。");
  K.footer(s);
  s.addNotes("会员运营的抓手是三楼阅读馆：体验券拉新，活动和新书推送促复购。首年末会员消费占比目标 38%。");
}

// ═════════ 12 六、风险矩阵表 ═════════
{
  const s = K.addSlide();
  K.header(s, "六", "风险分析与应对", "识别六类主要风险，高等级风险均已落实责任部门", T);
  K.lead(s, "高等级风险 2 项（装修工期、客流不及预期），均已制定专项预案；其余 4 项纳入周例会跟踪。");
  const L = (t) => ({ text: t, options: { bold: true, align: "center", color: t === "高" ? C.red : t === "中" ? C.amberT : C.sage } });
  K.table(s, [["风险类别", "风险描述", "等级", "应对措施", "责任部门"],
    ["装修工期", "机电改造涉及消防审批，若审批延迟将顺延装修工期", L("高"), "消防顾问提前介入；审批期间先行施工不涉及消防的区域", "工程组"],
    ["客流不及预期", "试营业首月客流低于预测 20% 以上", L("高"), "加大地铁与步道导流；首月活动由每周 3 场加至 5 场", "运营组"],
    ["书架交付", "工厂排产紧张，批次一可能延后 3–5 天", L("中"), "打样通过后立即锁定排产；合同约定逾期违约金", "采购组"],
    ["图书到货", "个别出版社新书首发时间调整", L("中"), "首批清单预留 5% 替补书目", "商品组"],
    ["系统上线", "会员系统与集团系统联调出现数据问题", L("中"), "4 月 28 日上线后预留 3 周联调与压力测试", "信息组"],
    ["滨江汛期", "6 月进入汛期，暴雨可能影响客流与一层安全", L("低"), "一层入口设挡水板；汛期应急预案纳入开业演练", "行政组"],
  ], { x: 0.5, y: 2.2, w: 12.33, colW: [1.35, 3.9, 0.7, 4.98, 1.4], rowH: 0.56, fontSize: 11,
       align: ["left", "left", "center", "left", "left"] });
  K.summary(s, "风险清单每周更新一次，高等级风险由筹备办公室主任直接督办，变化情况在周报中单列。");
  K.footer(s);
  s.addNotes("六类风险里两类是高等级：装修工期和客流。都有专项预案和责任部门，每周更新。");
}

// ═════════ 13 七、进度计划表（甘特） ═════════
{
  const s = K.addSlide();
  K.header(s, "七", "实施计划与组织保障", "倒排工期，三条主线并行，6 月 18 日正式开业", T);
  K.lead(s, "装修、书架、商品三条主线并行推进；关键路径为“装修完成 → 书架安装 → 图书上架”，总工期 14 周。");
  const cols = ["3月上", "3月下", "4月上", "4月下", "5月上", "5月下", "6月上", "6月下"];
  const tasks = [ // 工作事项, 责任部门, 起, 止(含), 颜色
    ["方案定稿与招采", "筹备办", 0, 1, "8FB2CB"], ["装修施工", "工程组", 1, 4, "8FB2CB"],
    ["书架批次一生产安装", "采购组", 1, 4, C.amber], ["书架批次二生产安装", "采购组", 3, 6, C.steel],
    ["选品与首批采购", "商品组", 0, 3, C.amber], ["系统上线与联调", "信息组", 3, 5, C.steel],
    ["招聘与培训", "行政组", 2, 5, C.sage], ["图书上架", "商品组", 4, 4, C.amber],
    ["试营业", "运营组", 5, 6, C.red], ["正式开业", "运营组", 7, 7, C.red],
  ];
  const rows = [["工作事项", "责任部门", ...cols],
    ...tasks.map((t) => [t[0], t[1], ...cols.map((_, j) => j >= t[2] && j <= t[3]
      ? { text: "", options: { fill: { color: t[4] } } } : "")])];
  K.table(s, rows, { x: 0.5, y: 2.2, w: 12.33, colW: [2.6, 1.25, ...cols.map(() => 1.06)], rowH: 0.375, fontSize: 11,
    align: ["left", "left", ...cols.map(() => "center")] });
  K.paras(s, [
    ["关键节点", "03-31 装修进场；05-06 批次一书架安装完成；05-12 首批图书上架；05-20 试营业；06-02 批次二完成；06-18 正式开业"],
  ], { x: 0.5, y: 6.45, w: 12.33, h: 0.45 }, { num: null, size: 12 });
  K.footer(s);
  s.addNotes("三条主线并行，关键路径是装修、书架、上架。倒排下来总工期 14 周，6 月 18 日正式开业。");
}

// ═════════ 14 七、组织架构 + 职责表 + 工作机制 ═════════
{
  const s = K.addSlide();
  K.header(s, "七", "实施计划与组织保障", "成立筹备领导小组，六个专项组分线负责", T);
  K.lead(s, "实行“领导小组决策、筹备办公室统筹、专项组落实”三级管理；重大事项周例会研究，问题清单销号管理。");
  const box = (x, y, w, h, t, col, fill = "FFFFFF", tc = C.ink) => {
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: col, width: 1.25 } });
    s.addText(t, { x, y, w, h, fontFace: F, fontSize: 11.5, bold: true, color: tc, align: "center", valign: "middle", margin: 0 });
  };
  box(1.85, 2.25, 2.6, 0.55, "筹备领导小组", C.steel, C.steel, "FFFFFF");
  K.arrow(s, 3.15, 2.8, 3.15, 3.1, C.steel, 1.5);
  box(1.85, 3.1, 2.6, 0.55, "筹备办公室", C.amber, "FBF6EA");
  s.addShape(pres.shapes.LINE, { x: 3.15, y: 3.65, w: 0, h: 0.25, line: { color: C.mute, width: 1.25 } });
  s.addShape(pres.shapes.LINE, { x: 0.95, y: 3.9, w: 4.4, h: 0, line: { color: C.mute, width: 1.25 } });
  ["工程组", "采购组", "商品组", "运营组", "信息组", "行政组"].forEach((g, i) => {
    const x = 0.5 + i * 0.88;
    s.addShape(pres.shapes.LINE, { x: x + 0.45, y: 3.9, w: 0, h: 0.2, line: { color: C.mute, width: 1.25 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.1, w: 0.8, h: 1.55, fill: { color: "FFFFFF" }, line: { color: C.steel, width: 1 } });
    s.addText(g.split("").join("\n"), { x, y: 4.1, w: 0.8, h: 1.55, fontFace: F, fontSize: 11, bold: true, color: C.steel, align: "center", valign: "middle", margin: 0 });
  });
  K.paras(s, [
    ["周例会", "每周一上午，领导小组组长主持"],
    ["日报", "各专项组每日 18:00 前报进度与问题"],
    ["销号", "问题清单明确时限，逾期上报领导小组"],
  ], { x: 0.5, y: 5.85, w: 5.4, h: 1.05 }, { num: "arabic", size: 11.5, gap: 3 });
  K.table(s, [["专项组", "牵头", "主要职责", "人数"],
    ["工程组", "工程部经理", "装修施工、消防审批、机电改造、竣工验收", "5"],
    ["采购组", "采购部经理", "书架、设备、系统招采与合同管理", "4"],
    ["商品组", "商品部经理", "选品、首批采购、上架陈列、供应商对接", "6"],
    ["运营组", "拟任店长", "开业活动、会员运营、服务标准、客流导入", "8"],
    ["信息组", "信息部经理", "收银、库存、会员系统上线与联调", "3"],
    ["行政组", "行政部经理", "招聘培训、证照办理、安全与应急预案", "4"],
  ], { x: 6.2, y: 2.25, w: 6.63, colW: [1.0, 1.4, 3.53, 0.7], rowH: 0.64, fontSize: 11.5,
       align: ["left", "left", "left", "center"], numCols: [3] });
  K.footer(s);
  s.addNotes("组织上是三级管理：领导小组决策、筹备办统筹、六个专项组落实。每周例会，问题清单销号。");
}

// ═════════ 15 八、需决策事项：三项请示 ═════════
{
  const s = K.addSlide();
  K.header(s, "八", "需决策事项", "提请决策三项事项，建议于 4 月 5 日前明确", T);
  K.lead(s, "以下三项直接影响开业节点和首年测算，恳请领导小组审议；筹备组对每项均提出了建议方案。");
  const items = [
    ["阅读馆会员定价", "03-25", C.steel,
      "三层阅读馆为会员专属空间，定价直接影响座位预约规则和会员收入测算。",
      "年费 298 元，学生 198 元；首年会员年费收入按 58 万元计。",
      "同意建议定价，并授权筹备组制定预约规则。"],
    ["开业活动预算上限", "04-05", C.amberT,
      "开业首月活动排期和宣传物料须在 4 月中旬下单，预算上限尚未明确。",
      "首月活动预算不超过 60 万元，其中作者签售 25 万元、宣传 35 万元。",
      "同意预算上限，签售作者邀约按一事一报审批。"],
    ["二批书架合并招标", "03-25", C.red,
      `批次二 ${batch(2)} 组若单独招标，需增加约 4 周，影响 6 月 2 日完成节点。`,
      "与批次一合并招标，二批数量保留 ±15% 调整权，按首月数据确定。",
      "同意合并招标，授权按首月数据调整数量。"],
  ];
  items.forEach((it, i) => {
    const x = 0.5 + i * 4.19, y = 2.2, w = 3.95, h = 4.65;
    K.card(s, x, y, w, h); K.bar(s, x, y, h, it[2]);
    K.numDot(s, x + 0.25, y + 0.2, i + 1, it[2], 0.5);
    s.addText(it[0], { x: x + 0.9, y: y + 0.18, w: w - 1.05, h: 0.54, fontFace: F, fontSize: 16, bold: true, color: C.navy, margin: 0, valign: "middle" });
    const sec = [["背景", it[3]], ["建议方案", it[4]], ["请示事项", it[5]]];
    sec.forEach((p, k) => {
      const yy = y + 0.95 + k * 1.12;
      s.addText(p[0], { x: x + 0.25, y: yy, w: 2, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: k === 2 ? it[2] : C.mute, margin: 0 });
      s.addText(p[1], { x: x + 0.25, y: yy + 0.3, w: w - 0.45, h: 0.78, fontFace: F, fontSize: 11.5, color: C.ink, bold: k === 2, margin: 0, valign: "top" });
    });
    s.addShape(pres.shapes.LINE, { x: x + 0.25, y: y + 4.2, w: w - 0.5, h: 0, line: { color: C.line, width: 0.75 } });
    s.addText("建议决策时限", { x: x + 0.25, y: y + 4.22, w: 1.8, h: 0.38, fontFace: F, fontSize: 11, color: C.mute, margin: 0, valign: "middle" });
    s.addText(it[1], { x: x + w - 1.65, y: y + 4.22, w: 1.4, h: 0.38, fontFace: NUM, fontSize: 18, bold: true, color: it[2], align: "right", margin: 0, valign: "middle" });
  });
  K.footer(s);
  s.addNotes("请领导审议三件事，每件都有建议方案。其中二批书架合并招标最急，不定的话会影响 6 月 2 日的节点。");
}

// ═════════ 16 结束页 ═════════
{
  const s = K.addSlide();
  s.background = { color: "FBF8F1" };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.22, h: 7.5, fill: { color: C.amber }, line: { color: C.amber } });
  s.addImage({ path: IMG("cover_outline.png"), x: 2.9, y: 3.65, w: 7.6, h: 7.6 * 940 / 2300, transparency: 35 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.22, y: 1.75, w: 0.9, h: 0.08, fill: { color: C.amber }, line: { color: C.amber } });
  s.addText("汇报完毕", { x: 0.5, y: 2.0, w: 12.33, h: 1.0, fontFace: F, fontSize: 44, bold: true, color: C.navy, align: "center", margin: 0 });
  s.addText("请各位领导批评指正", { x: 0.5, y: 3.0, w: 12.33, h: 0.5, fontFace: F, fontSize: 18, color: C.mute, align: "center", margin: 0 });
  s.addText("云栖文化有限公司 · 滨江旗舰店开业筹备组", { x: 0.5, y: 6.75, w: 12.33, h: 0.4, fontFace: F, fontSize: 12, color: C.mute, align: "center", margin: 0 });
}

console.log(`测算：投资 ${fmt(investTotal)}｜销售 ${fmt(sales1)}｜毛利 ${fmt(gp1)}｜` +
  Y.map((y, i) => `Y${i + 1} 利润 ${fmt(y.p)}`).join("｜"));
K.save(OUT);
