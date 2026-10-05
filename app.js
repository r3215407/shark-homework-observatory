(function () {
  "use strict";

  const STORAGE_KEY = "shark-observatory-v1";
  const NO_HOMEWORK = "NONE";
  const GRADES = ["A+", "A", "A-", "B+", "B", "C"];
  const OPTIONS = [...GRADES, NO_HOMEWORK];
  const SUBJECTS = [
    { key: "chinese", name: "语文", asset: "assets/shark-whale.png" },
    { key: "math", name: "数学", asset: "assets/shark-hammer.png" },
    { key: "english", name: "英语", asset: "assets/shark-blue.png" }
  ];
  const GRADE_COLORS = ["#147b73", "#55a679", "#9bcf9e", "#8ab6e8", "#5f91d3", "#bed5f2"];
  const SUBJECT_COLORS = { chinese: "#c64b43", math: "#167653", english: "#3564b0" };

  const COMMON_ONE = [
    ["clownfish", "小丑鱼", "珊瑚礁小鱼", "会躲在海葵触手之间，把这里当作安全的家。", "身体表面的黏液能帮助它不被海葵蜇伤。"],
    ["blue-tang", "蓝倒吊", "珊瑚礁小鱼", "喜欢在珊瑚礁间穿梭，寻找海藻和小型食物。", "尾部附近有像小手术刀一样的硬刺。"],
    ["butterflyfish", "蝴蝶鱼", "珊瑚礁小鱼", "身体扁平，很适合钻进珊瑚缝隙里找食物。", "许多蝴蝶鱼会成对生活。"],
    ["damselfish", "雀鲷", "珊瑚礁小鱼", "个头不大，却会认真守护自己的小片海藻园。", "有些雀鲷像海底的小园丁一样照料海藻。"],
    ["lionfish", "狮子鱼", "珊瑚礁小鱼", "有扇子一样展开的鱼鳍，游动时十分醒目。", "漂亮的长刺带有毒性，只适合远远观察。"],
    ["pufferfish", "河豚", "特别访客", "遇到危险时会吸入水，让身体鼓得圆圆的。", "牙齿会不断生长，因此需要啃咬硬物。"],
    ["sunfish", "翻车鱼", "特别访客", "身体像一面大圆盘，常常侧躺在海面晒太阳。", "它是世界上最重的硬骨鱼之一。"],
    ["garden-eel", "花园鳗", "特别访客", "把尾巴藏在沙洞里，身体随海流轻轻摆动。", "遇到危险时会依次缩回沙里。"],
    ["seahorse", "海马", "海底朋友", "用卷曲的尾巴抓住海草，避免被水流带走。", "海马宝宝由海马爸爸从育儿袋里生出来。"],
    ["octopus", "普通章鱼", "海底朋友", "有八条灵活的腕足，还很擅长解决问题。", "章鱼有三个心脏，血液是蓝色的。"],
    ["cuttlefish", "乌贼", "海底朋友", "能迅速改变颜色和花纹，与同伴交流或隐藏自己。", "它的眼睛瞳孔像字母 W。"],
    ["jellyfish", "海月水母", "海底朋友", "身体透明，像一把漂在水里的小伞。", "水母没有心脏和骨骼。"],
    ["green-turtle", "绿海龟", "海底朋友", "会长途旅行，也会回到熟悉的海滩产卵。", "成年绿海龟主要吃海草。"],
    ["hermit-crab", "寄居蟹", "海底朋友", "会寻找合适的空贝壳，保护柔软的腹部。", "长大后还需要换一间更大的贝壳房子。"],
    ["manta-ray", "蝠鲼", "特别访客", "展开胸鳍时像在海里飞翔，性情通常很温和。", "每只蝠鲼腹部的斑点都不完全相同。"],
    ["eagle-ray", "斑点鹰鳐", "特别访客", "背上有白色斑点，长尾巴像一条细线。", "它会用扁平的牙齿压碎贝类外壳。"]
  ];
  const COMMON_TWO = [
    ["scallop", "扇贝", "贝类", "用两片贝壳保护身体，也能快速开合贝壳游动。", "外套膜边缘排列着许多小眼睛。"],
    ["giant-clam", "砗磲", "贝类", "是体型很大的双壳贝，会安静地生活在珊瑚礁中。", "外套膜里的共生藻能利用阳光制造养分。"],
    ["nautilus", "鹦鹉螺", "贝类", "住在分成许多小室的螺旋外壳里。", "会调节壳内气体和液体来控制浮沉。"],
    ["sea-hare", "海兔", "软体动物", "头上的触角像兔耳，其实是一种海蛞蝓。", "受到打扰时，有些海兔会释放紫色液体。"],
    ["cowrie", "宝螺", "贝类", "会用柔软的外套膜包住贝壳，让表面保持光滑。", "许多宝螺的花纹会随生长改变。"],
    ["sunflower-star", "太阳海星", "棘皮动物", "有很多腕足，在海底移动速度比多数海星快。", "最多可以拥有二十多条腕足。"],
    ["blue-sea-star", "蓝海星", "棘皮动物", "鲜艳的蓝色让它在浅海中很容易被认出。", "没有真正的大脑，却有遍布身体的神经系统。"],
    ["sea-urchin", "海胆", "棘皮动物", "用棘刺保护自己，并靠许多小管足慢慢移动。", "有一套由五颗牙组成的咀嚼结构。"],
    ["sea-cucumber", "海参", "棘皮动物", "会吞入海底沉积物，帮助清理和翻动海床。", "有些海参能够重新长出失去的身体部分。"],
    ["cleaner-shrimp", "清洁虾", "海底朋友", "会替鱼清理皮肤和嘴里的寄生物。", "鱼儿会排队等待清洁虾服务。"],
    ["horseshoe-crab", "鲎", "特别访客", "祖先很早就出现在海洋中，外形保留了古老特征。", "它的血液因为含铜而呈蓝色。"],
    ["leafy-seadragon", "叶海龙", "海底朋友", "叶片状突起让它看起来像漂动的海藻。", "这些叶片主要用来伪装，并不是游泳用的鳍。"],
    ["ribbon-eel", "丝带鳗", "珊瑚礁小鱼", "身体细长，会从洞穴里探出头观察水流。", "在成长过程中会明显改变体色。"],
    ["sea-angel", "裸海蝶", "软体动物", "挥动像翅膀的足，在冰冷海水里游动。", "它其实是没有外壳的海洋蜗牛亲戚。"],
    ["coconut-crab", "椰子蟹", "特别访客", "是体型很大的陆生寄居蟹，也会靠近海岸生活。", "成年后已经不再使用贝壳。"],
    ["nudibranch", "西班牙舞娘", "软体动物", "游动时身体边缘翻卷，像展开的裙摆。", "鲜艳颜色常用来提醒捕食者不要靠近。"]
  ];
  const RARE = [
    ["whale-shark", "鲸鲨", "现代鲨鱼", "是世界上最大的鱼，却主要过滤海水中的浮游生物。", "每只鲸鲨身上的白色斑点都像独一无二的指纹。"],
    ["basking-shark", "姥鲨", "现代鲨鱼", "是世界第二大的鱼，会张着大嘴过滤海水中的小食物。", "它常在海面附近缓慢游动，像在晒太阳。"],
    ["great-white", "大白鲨", "现代鲨鱼", "依靠灵敏的感官在开阔海域中寻找方向和食物。", "能感受到其他动物产生的微弱电信号。"],
    ["tiger-shark", "虎鲨", "现代鲨鱼", "幼年时身体两侧有深色条纹，像老虎的花纹。", "随着年龄增长，身上的条纹会慢慢变淡。"],
    ["hammerhead", "双髻鲨", "现代鲨鱼", "宽阔的头部能让感知器官分布得更开。", "更宽的视野帮助它观察周围环境。"],
    ["nurse-shark", "护士鲨", "现代鲨鱼", "常在海底休息，会用嘴部吸力寻找缝隙里的食物。", "不游动时也能让水流过鳃。"],
    ["thresher-shark", "狐鲨", "现代鲨鱼", "尾鳍上叶特别长，长度接近身体的一半。", "会用长尾巴拍击鱼群。"],
    ["sawshark", "锯鲨", "现代鲨鱼", "吻部细长，两侧排列着像锯齿一样的结构。", "吻部触须能帮助它寻找海底食物。"],
    ["frilled-shark", "皱鳃鲨", "现代鲨鱼", "身体细长，六对鳃裂边缘呈褶皱状。", "生活在较深海域，很少被直接观察到。"],
    ["goblin-shark", "哥布林鲨", "现代鲨鱼", "有扁长的吻部和可以迅速向前伸出的颌。", "吻部布满感受电信号的小孔。"],
    ["blue-whale", "蓝鲸", "鲸类", "是地球上已知体型最大的动物，会发出低沉的声音交流。", "它主要吃很小的磷虾。"],
    ["humpback-whale", "座头鲸", "鲸类", "有很长的胸鳍，也会唱出复杂而有节奏的歌声。", "不同海域的群体可能拥有不同的歌。"],
    ["sperm-whale", "抹香鲸", "鲸类", "能够潜入很深的海域寻找乌贼。", "它拥有动物世界中很大的脑。"],
    ["orca", "虎鲸", "鲸类", "属于海豚科，家族成员会合作生活和交流。", "不同家族有各自的叫声习惯。"],
    ["dunkleosteus", "邓氏鱼", "史前生物", "生活在泥盆纪，是拥有坚硬头甲的大型盾皮鱼。", "用锋利的骨板边缘切割食物。", "约3.8亿至3.6亿年前"],
    ["megalodon", "巨齿鲨", "史前生物", "是已经灭绝的大型鲨类，曾生活在温暖海域。", "科学家主要通过巨大的化石牙齿认识它。", "约2300万至360万年前"]
  ];
  const CARDS = [
    ...COMMON_ONE.map((item, index) => makeCard(item, "common", "assets/cards-common-1.jpg", index)),
    ...COMMON_TWO.map((item, index) => makeCard(item, "common", "assets/cards-common-2.jpg", index)),
    ...RARE.map((item, index) => makeCard(item, "rare", "assets/cards-rare.jpg", index))
  ];
  const CARD_MAP = Object.fromEntries(CARDS.map((card) => [card.id, card]));

  function makeCard(item, rarity, sheet, spriteIndex) {
    return { id: item[0], name: item[1], category: item[2], description: `${item[1]}${item[3]}`, fact: item[4], era: item[5] || "现存物种", rarity, sheet, spriteIndex };
  }

  const defaultState = { settings: { childName: "小海", companions: {} }, records: {}, achievements: { collection: {}, pending: [], grants: {}, rareMisses: 0, recent: [], totalDraws: 0, migrated: true } };
  let state = loadState();
  let activeView = "today";
  let openSubject = "english";
  let todayDraft = {};
  let historyMonth = new Date();
  let analysisRange = "7";
  let collectionFilter = "all";
  let toastTimer;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || typeof saved !== "object") return clone(defaultState);
      const next = {
        settings: { ...defaultState.settings, ...(saved.settings || {}), companions: { ...((saved.settings && saved.settings.companions) || {}) } },
        records: saved.records && typeof saved.records === "object" ? saved.records : {},
        achievements: saved.achievements ? { ...defaultState.achievements, ...saved.achievements } : clone(defaultState.achievements)
      };
      next.achievements.collection ||= {};
      next.achievements.pending = Array.isArray(next.achievements.pending) ? next.achievements.pending : [];
      next.achievements.grants ||= {};
      next.achievements.recent = Array.isArray(next.achievements.recent) ? next.achievements.recent : [];
      if (!saved.achievements) migrateExistingRecords(next);
      return next;
    } catch (_) { return clone(defaultState); }
  }

  function migrateExistingRecords(next) {
    const dates = Object.keys(next.records);
    dates.forEach((key) => { next.achievements.grants[key] = drawCountForRecord(next.records[key]); });
    if (dates.length) next.achievements.collection["green-turtle"] = { count: 1, firstFound: localDateKey(), reason: "老朋友纪念卡" };
  }

  function saveState(message) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updatePendingBadge();
      if (message) showToast(message);
      return true;
    } catch (_) { showToast("没有保存成功，请检查浏览器存储设置"); return false; }
  }

  function localDateKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  function parseDateKey(key) { const [y, m, d] = key.split("-").map(Number); return new Date(y, m - 1, d); }
  function formatLongDate(date) { return new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "long" }).format(date); }
  function formatShortDate(key) { return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(parseDateKey(key)); }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }
  function refreshIcons() { if (window.lucide) window.lucide.createIcons({ attrs: { "aria-hidden": "true" } }); }
  function optionLabel(value) { return value === NO_HOMEWORK ? "无作业" : value; }
  function isConfirmed(value) { return OPTIONS.includes(value); }
  function randomUnit() { const array = new Uint32Array(1); if (crypto && crypto.getRandomValues) crypto.getRandomValues(array); else array[0] = Math.random() * 4294967296; return array[0] / 4294967296; }
  function randomItem(items) { return items.length ? items[Math.floor(randomUnit() * items.length)] : null; }
  function uniqueId() { return crypto && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }

  function recordStatus(record = {}) {
    const confirmed = SUBJECTS.filter((subject) => isConfirmed(record[subject.key])).length;
    const graded = SUBJECTS.filter((subject) => GRADES.includes(record[subject.key])).length;
    return { confirmed, graded, valid: confirmed === 3 && graded > 0, rest: confirmed === 3 && graded === 0 };
  }
  function drawCountForRecord(record = {}) {
    if (!recordStatus(record).valid) return 0;
    const values = SUBJECTS.map((subject) => record[subject.key]);
    return Math.min(1 + values.filter((v) => v === "A").length + values.filter((v) => v === "A+").length * 2, 3);
  }
  function isWithinRewardWindow(key) { return Math.floor((parseDateKey(localDateKey()) - parseDateKey(key)) / 86400000) <= 7 && key <= localDateKey(); }
  function grantDrawsForDate(key) {
    const deserved = drawCountForRecord(state.records[key]);
    const granted = Number(state.achievements.grants[key] || 0);
    if (!isWithinRewardWindow(key) || deserved <= granted) return 0;
    const added = deserved - granted;
    state.achievements.grants[key] = deserved;
    for (let index = 0; index < added; index += 1) state.achievements.pending.push({ id: uniqueId(), date: key, reason: key === localDateKey() ? "完成当天作业记录" : "补录作业记录" });
    return added;
  }

  function initTodayDraft() { todayDraft = { ...(state.records[localDateKey()] || {}) }; }
  function subjectAvatarHtml(subject) {
    const card = CARD_MAP[state.settings.companions[subject.key]];
    if (!card || !state.achievements.collection[card.id]) return `<img class="subject-art" src="${subject.asset}" alt="">`;
    return `<span class="subject-art subject-card-art${card.rarity === "rare" ? " is-rare" : ""}" aria-label="${escapeHtml(card.name)}科目伙伴">${speciesArtHtml(card)}</span>`;
  }
  function gradePickerHtml(subjectKey, selected, mode = "today") {
    return `<div class="grade-picker" role="group" aria-label="选择等级或无作业">${OPTIONS.map((grade) => `<button type="button" class="${grade === selected ? "is-selected" : ""}${grade === NO_HOMEWORK ? " no-homework-option" : ""}" data-grade="${grade}" data-subject="${subjectKey}" data-mode="${mode}" aria-pressed="${grade === selected}">${optionLabel(grade)}</button>`).join("")}</div>`;
  }

  function renderToday() {
    $("#today-date").textContent = formatLongDate(new Date());
    const status = recordStatus(todayDraft);
    $("#today-progress").innerHTML = `已确认 <strong>${status.confirmed}/3</strong> 科`;
    $("#save-today").disabled = status.confirmed === 0;
    const draws = drawCountForRecord(todayDraft);
    $("#today-reward-hint").textContent = status.confirmed < 3 ? `还差 ${3 - status.confirmed} 科确认今天的作业情况` : status.rest ? "今天是休息日，保存后不会产生发现机会" : `今天有 ${draws} 次海洋发现`;
    $("#subject-list").innerHTML = SUBJECTS.map((subject) => {
      const selected = todayDraft[subject.key] || "";
      const open = openSubject === subject.key;
      return `<div class="subject-block${open ? " is-open" : ""}" data-subject="${subject.key}"><button class="subject-summary" type="button" data-open-subject="${subject.key}" aria-expanded="${open}">${subjectAvatarHtml(subject)}<span class="subject-name">${subject.name}</span><span class="grade-status${selected ? "" : " is-empty"}${selected === NO_HOMEWORK ? " is-no-homework" : ""}">${selected ? optionLabel(selected) : "未选择"}</span><span class="summary-chevron"><i data-lucide="chevron-down"></i></span></button>${open ? gradePickerHtml(subject.key, selected) : ""}</div>`;
    }).join("");
    refreshIcons();
  }

  function switchView(view) {
    activeView = view;
    $$(".view").forEach((section) => { const active = section.dataset.view === view; section.hidden = !active; section.classList.toggle("is-active", active); });
    $$(".bottom-nav button").forEach((button) => button.classList.toggle("is-selected", button.dataset.target === view));
    const titles = { today: ["今天记录", `${state.settings.childName}的作业`], history: ["历史记录", "每一天都清清楚楚"], analysis: ["学习分析", "看看最近的变化"], collection: ["海洋图鉴", "遇见更多海洋朋友"] };
    $("#page-title").textContent = titles[view][0]; $("#page-subtitle").textContent = titles[view][1]; $("#settings-button").hidden = view !== "today";
    if (view === "history") renderHistory(); if (view === "analysis") renderAnalysis(); if (view === "collection") renderCollection();
    window.scrollTo({ top: 0, behavior: "smooth" }); refreshIcons();
  }

  function renderHistory() {
    const year = historyMonth.getFullYear(), month = historyMonth.getMonth(), todayKey = localDateKey(), current = new Date();
    $("#history-month").textContent = `${year}年${month + 1}月`;
    $("#next-month").disabled = year === current.getFullYear() && month === current.getMonth();
    const days = new Date(year, month + 1, 0).getDate(), first = (new Date(year, month, 1).getDay() + 6) % 7;
    const cells = Array.from({ length: 42 }, (_, index) => {
      const day = index - first + 1; if (day < 1 || day > days) return `<span class="calendar-spacer"></span>`;
      const key = localDateKey(new Date(year, month, day)), record = state.records[key] || {}, status = recordStatus(record), classes = ["calendar-day"];
      if (key === todayKey) classes.push("is-today"); if (status.confirmed) classes.push("has-record"); if (status.confirmed === 3) classes.push("is-complete");
      const detail = status.confirmed ? SUBJECTS.filter((s) => isConfirmed(record[s.key])).map((s) => `${s.name}${optionLabel(record[s.key])}`).join("，") : "未记录";
      return `<button class="${classes.join(" ")}" type="button" data-calendar-date="${key}" aria-label="${month + 1}月${day}日，${detail}" ${key > todayKey ? "disabled" : ""}><span class="calendar-day-number">${day}</span>${status.confirmed === 3 ? `<span class="calendar-complete"><i data-lucide="check"></i></span>` : ""}<span class="record-dots">${SUBJECTS.map((s) => `<i class="record-dot ${s.key}${isConfirmed(record[s.key]) ? " is-filled" : ""}${record[s.key] === NO_HOMEWORK ? " is-none" : ""}"></i>`).join("")}</span></button>`;
    }).join("");
    const monthRecords = Object.keys(state.records).filter((key) => { const d = parseDateKey(key); return d.getFullYear() === year && d.getMonth() === month; });
    $("#history-calendar").innerHTML = `<div class="calendar-panel"><div class="calendar-weekdays">${["一", "二", "三", "四", "五", "六", "日"].map((d) => `<span>${d}</span>`).join("")}</div><div class="calendar-grid">${cells}</div></div><div class="calendar-summary"><span>本月已记录 ${monthRecords.length} 天</span><span>全部确认 ${monthRecords.filter((key) => recordStatus(state.records[key]).confirmed === 3).length} 天</span></div><div class="calendar-legend">${SUBJECTS.map((s) => `<span><i class="record-dot ${s.key} is-filled"></i>${s.name}</span>`).join("")}<span><i data-lucide="circle-minus"></i>无作业也算已确认</span></div>`;
    refreshIcons();
  }

  function openRecordEditor(key) {
    const sheet = $("#sheet"), draft = { ...(state.records[key] || {}) };
    sheet.dataset.sheetMode = "record";
    $("#sheet-content").innerHTML = `<div class="sheet-title-row"><h2>编辑当天记录</h2><button class="icon-button" type="button" data-close-sheet aria-label="关闭"><i data-lucide="x"></i></button></div><p class="sheet-copy">${formatLongDate(parseDateKey(key))}，三科都确认后才会计算发现次数。</p><div class="form-field"><label for="record-date">日期</label><input id="record-date" type="date" value="${key}" max="${localDateKey()}"></div><div id="editor-grades">${SUBJECTS.map((s) => `<div class="editor-subject" data-editor-subject="${s.key}"><div class="editor-subject-head"><strong>${s.name}</strong><button class="text-button" type="button" data-clear-subject="${s.key}">改为未记录</button></div>${gradePickerHtml(s.key, draft[s.key] || "", "editor")}</div>`).join("")}</div><div class="sheet-actions"><button class="danger-button" type="button" data-delete-day ${state.records[key] ? "" : "disabled"}>删除当天</button><button class="primary-button" type="button" data-save-record><i data-lucide="save"></i><span>保存记录</span></button></div>`;
    sheet._recordDraft = draft; sheet._recordDate = key; if (!sheet.open) sheet.showModal(); refreshIcons();
  }
  function renderEditorGrades() { SUBJECTS.forEach((s) => { const block = $(`[data-editor-subject="${s.key}"]`, $("#sheet")); if (block) $(".grade-picker", block).outerHTML = gradePickerHtml(s.key, $("#sheet")._recordDraft[s.key] || "", "editor"); }); }

  function renderAnalysis() {
    $$("#range-control button").forEach((button) => button.classList.toggle("is-selected", button.dataset.range === analysisRange));
    const days = analysisRange === "term" ? 120 : Number(analysisRange), dates = [], end = new Date();
    for (let index = days - 1; index >= 0; index -= 1) { const date = new Date(end); date.setDate(end.getDate() - index); dates.push(localDateKey(date)); }
    const effective = dates.filter((key) => state.records[key] && SUBJECTS.some((s) => GRADES.includes(state.records[key][s.key])));
    if (!effective.length) { $("#analysis-content").innerHTML = `<div class="empty-state"><img src="assets/shark-whale.png" alt=""><h3>还没有足够的记录</h3><p>记录几天作业后，这里会显示趋势和等级分布。</p><button class="secondary-button compact-button" type="button" data-go-today><i data-lucide="pencil-line"></i><span>去记录今天</span></button></div>`; refreshIcons(); return; }
    const stats = SUBJECTS.map((s) => { const values = effective.map((key) => state.records[key][s.key]).filter((v) => GRADES.includes(v)); return { ...s, values, counts: Object.fromEntries(GRADES.map((grade) => [grade, values.filter((v) => v === grade).length])) }; });
    const stable = stats.filter((s) => s.values.length).sort((a, b) => new Set(a.values).size - new Set(b.values).size || b.values.length - a.values.length)[0];
    $("#analysis-content").innerHTML = `<div class="insight-strip"><img src="assets/shark-whale.png" alt=""><p>${stable ? `最近${analysisRange === "term" ? "一学期" : `${days}天`}，${stable.name}记录最稳定` : "继续记录，就能看到更多变化"}</p></div><section class="chart-section"><h3>等级趋势</h3><div class="chart-wrap">${trendChartSvg(dates)}</div><div class="legend">${SUBJECTS.map((s) => `<span><i class="legend-dot" style="background:${SUBJECT_COLORS[s.key]}"></i>${s.name}</span>`).join("")}</div></section><section class="chart-section"><h3>等级分布</h3><div class="distribution">${stats.map(distributionRowHtml).join("")}</div><div class="legend">${GRADES.map((g, i) => `<span><i class="legend-dot" style="background:${GRADE_COLORS[i]}"></i>${g}</span>`).join("")}</div><p class="distribution-note">未记录和无作业的科目不参与统计，也不会按 C 计算。</p></section>`;
  }
  function trendChartSvg(dates) {
    const width = 360, height = 220, left = 34, right = 12, top = 12, bottom = 30, plotW = width - left - right, plotH = height - top - bottom;
    const x = (i) => left + (dates.length === 1 ? plotW / 2 : i * plotW / (dates.length - 1)), y = (g) => top + GRADES.indexOf(g) * plotH / (GRADES.length - 1);
    const lines = SUBJECTS.map((s) => { const segments = []; let current = []; dates.forEach((key, i) => { const grade = state.records[key] && state.records[key][s.key]; if (GRADES.includes(grade)) current.push([x(i), y(grade), grade]); else if (current.length) { segments.push(current); current = []; } }); if (current.length) segments.push(current); return segments.map((seg) => `<polyline class="chart-line" stroke="${SUBJECT_COLORS[s.key]}" points="${seg.map((p) => `${p[0]},${p[1]}`).join(" ")}"/>`).join("") + segments.flat().map((p) => `<circle class="chart-point" fill="${SUBJECT_COLORS[s.key]}" cx="${p[0]}" cy="${p[1]}" r="4"><title>${s.name} ${p[2]}</title></circle>`).join(""); }).join("");
    const labels = dates.length <= 7 ? dates.map((_, i) => i) : [0, Math.floor((dates.length - 1) / 2), dates.length - 1];
    return `<svg class="trend-chart" viewBox="0 0 ${width} ${height}" role="img">${GRADES.map((g) => { const gy = y(g); return `<line class="chart-grid" x1="${left}" x2="${width - right}" y1="${gy}" y2="${gy}"/><text class="chart-axis-label" x="2" y="${gy + 4}">${g}</text>`; }).join("")}${labels.map((i) => { const d = parseDateKey(dates[i]); return `<text class="chart-axis-label" text-anchor="middle" x="${x(i)}" y="${height - 8}">${d.getMonth() + 1}/${d.getDate()}</text>`; }).join("")}${lines}</svg>`;
  }
  function distributionRowHtml(item) { const total = item.values.length, stack = total ? GRADES.map((g, i) => { const p = item.counts[g] / total * 100; return p ? `<span style="width:${p}%;background:${GRADE_COLORS[i]}"></span>` : ""; }).join("") : ""; return `<div class="distribution-row"><span class="distribution-label">${item.name}</span><div class="stack" aria-label="${item.name}共${total}条记录">${stack}</div></div>`; }

  function speciesArtHtml(card) { const col = card.spriteIndex % 4, row = Math.floor(card.spriteIndex / 4); return `<span class="species-art" style="--sprite:url('${card.sheet}');--sprite-x:${col * 33.333}%;--sprite-y:${row * 33.333}%"></span>`; }
  function entry(id) { return state.achievements.collection[id] || null; }
  function renderCollection() {
    const owned = CARDS.filter((card) => entry(card.id));
    const filters = { all: () => true, common: (c) => c.rarity === "common", rare: (c) => c.rarity === "rare", shark: (c) => c.category === "现代鲨鱼", whale: (c) => c.category === "鲸类", prehistoric: (c) => c.category === "史前生物" };
    const cards = CARDS.filter(filters[collectionFilter]).sort((a, b) => Number(Boolean(entry(b.id))) - Number(Boolean(entry(a.id))));
    const pending = state.achievements.pending.length;
    $("#collection-content").innerHTML = `<section class="collection-progress"><div class="progress-title"><strong>已发现 ${owned.length} / 48</strong><span>普通 ${owned.filter((c) => c.rarity === "common").length}/32 · 稀有 ${owned.filter((c) => c.rarity === "rare").length}/16</span></div><div class="depth-track"><span style="width:${owned.length / 48 * 100}%"></span><i></i><i></i><i></i><i></i></div></section>${pending ? `<section class="pending-strip"><img src="assets/shark-whale.png" alt=""><div><strong>有 ${pending} 次发现等待开启</strong><span>新的海洋伙伴正在等你</span></div><button type="button" data-open-discovery>开始发现</button></section>` : `<section class="collection-calm"><img src="assets/shark-guide.png" alt=""><p>新的海洋朋友会在完成作业记录后出现</p></section>`}<div class="collection-filters" role="group">${[["all","全部"],["common","普通"],["rare","稀有"],["shark","鲨鱼"],["whale","鲸类"],["prehistoric","史前"]].map(([key,label]) => `<button type="button" data-collection-filter="${key}" class="${collectionFilter === key ? "is-selected" : ""}">${label}</button>`).join("")}</div><div class="collection-grid">${cards.map(collectionCardHtml).join("")}</div>`;
    refreshIcons();
  }
  function collectionCardHtml(card) {
    const owned = entry(card.id);
    if (!owned) return `<div class="collection-card is-locked" aria-label="尚未发现"><div class="card-back-pattern"><i data-lucide="waves"></i></div><strong>尚未发现</strong></div>`;
    const companion = Object.values(state.settings.companions).includes(card.id);
    return `<button class="collection-card is-${card.rarity}" type="button" data-card-detail="${card.id}"><span class="card-rarity">${card.rarity === "rare" ? "稀有 R" : "普通"}</span>${card.rarity === "rare" ? `<span class="tooth-badge"><i data-lucide="shield"></i></span>` : ""}${speciesArtHtml(card)}<span class="collection-card-foot"><strong>${card.name}</strong><small>${owned.count > 1 ? `×${owned.count}${owned.count === 3 ? " MAX" : ""}` : card.category}</small></span>${companion ? `<span class="companion-mark"><i data-lucide="heart"></i></span>` : ""}</button>`;
  }
  function openCardDetail(id) {
    const card = CARD_MAP[id], owned = entry(id); if (!card || !owned) return;
    const companions = SUBJECTS.filter((s) => state.settings.companions[s.key] === id).map((s) => s.name);
    $("#sheet").dataset.sheetMode = "card";
    $("#sheet-content").innerHTML = `<div class="sheet-title-row"><h2>${card.name}</h2><button class="icon-button" type="button" data-close-sheet><i data-lucide="x"></i></button></div><div class="detail-hero is-${card.rarity}"><span class="detail-rarity">${card.rarity === "rare" ? `稀有 R · ${card.category}` : `普通 · ${card.category}`}</span>${speciesArtHtml(card)}</div><p class="species-description">${card.description}</p><section class="fact-block"><h3>你知道吗</h3><p>${card.fact}</p>${owned.count >= 2 ? `<p class="unlocked-fact">伙伴升级解锁了新的观察记录。</p>` : ""}</section><dl class="species-meta"><div><dt>${card.category === "史前生物" ? "生存年代" : "物种状态"}</dt><dd>${card.era}</dd></div><div><dt>首次发现</dt><dd>${formatShortDate(owned.firstFound)}</dd></div><div><dt>当前数量</dt><dd>×${owned.count}${owned.count === 3 ? " MAX" : ""}</dd></div></dl>${companions.length ? `<p class="companion-current"><i data-lucide="heart"></i>正在陪伴：${companions.join("、")}</p>` : ""}<button class="primary-button" type="button" data-choose-companion="${card.id}"><i data-lucide="smile"></i><span>设为科目伙伴</span></button>`;
    if (!$("#sheet").open) $("#sheet").showModal(); refreshIcons();
  }
  function openCompanionPicker(id) {
    const card = CARD_MAP[id];
    $("#sheet").dataset.sheetMode = "companion";
    $("#sheet-content").innerHTML = `<div class="sheet-title-row"><h2>选择科目伙伴</h2><button class="icon-button" type="button" data-close-sheet><i data-lucide="x"></i></button></div><p class="sheet-copy">让${card.name}陪伴哪个科目？同一位伙伴可以选择多科。</p><div class="companion-picker">${SUBJECTS.map((s) => `<button type="button" data-set-companion="${s.key}" data-card-id="${id}" class="${state.settings.companions[s.key] === id ? "is-selected" : ""}">${subjectAvatarHtml(s)}<strong>${s.name}</strong><span>${state.settings.companions[s.key] === id ? "正在陪伴" : "设为伙伴"}</span></button>`).join("")}</div><button class="secondary-button reset-companions" type="button" data-reset-companions><i data-lucide="rotate-ccw"></i><span>恢复默认伙伴</span></button>`;
    if (!$("#sheet").open) $("#sheet").showModal();
    refreshIcons();
  }
  function openCompanionOverview() {
    $("#sheet").dataset.sheetMode = "companion";
    $("#sheet-content").innerHTML = `<div class="sheet-title-row"><h2>科目伙伴</h2><button class="icon-button" type="button" data-close-sheet><i data-lucide="x"></i></button></div><p class="sheet-copy">从图鉴卡片详情中选择喜欢的伙伴。</p><div class="companion-overview">${SUBJECTS.map((s) => { const card = CARD_MAP[state.settings.companions[s.key]]; return `<div>${subjectAvatarHtml(s)}<span><strong>${s.name}</strong><small>${card ? card.name : "默认伙伴"}</small></span></div>`; }).join("")}</div><div class="settings-actions"><button class="primary-button" type="button" data-go-collection><i data-lucide="book-open"></i><span>去图鉴更换</span></button><button class="secondary-button" type="button" data-reset-companions><i data-lucide="rotate-ccw"></i><span>恢复默认伙伴</span></button></div>`;
    refreshIcons();
  }

  function openDiscovery() { renderDiscoveryChoices(); if (!$("#discovery-dialog").open) $("#discovery-dialog").showModal(); }
  function renderDiscoveryChoices() {
    const pending = state.achievements.pending.slice(0, 3); if (!pending.length) { $("#discovery-dialog").close(); renderCollection(); return; }
    $("#discovery-content").innerHTML = `<div class="discovery-head"><button class="icon-button" type="button" data-close-discovery><i data-lucide="arrow-left"></i></button><strong>待发现海域</strong><span>剩余 ${state.achievements.pending.length} 次</span></div><div class="discovery-signal"><i></i><span>${state.achievements.rareMisses >= 4 ? "深海信号正在变强" : "选一张开始发现"}</span></div><div class="card-back-fan count-${pending.length}">${pending.map((item) => `<button class="discovery-back" type="button" data-draw-pending="${item.id}"><span class="sonar-mark"><i data-lucide="waves"></i></span><small>鲨鱼观察站</small></button>`).join("")}</div><p class="discovery-help">每张卡背都一样，下一位朋友会在翻开时出现</p>`;
    refreshIcons();
  }
  function chooseCard() {
    if (state.achievements.totalDraws === 0) return CARD_MAP.clownfish;
    const recent = state.achievements.recent, lastTwoRare = recent.slice(0, 2).length === 2 && recent.slice(0, 2).every((x) => x.rarity === "rare");
    const rareFresh = CARDS.filter((c) => c.rarity === "rare" && !entry(c.id)), rareAll = CARDS.filter((c) => c.rarity === "rare");
    if (!lastTwoRare && (state.achievements.rareMisses >= 5 || randomUnit() < 0.33)) return randomItem(rareFresh.length ? rareFresh : rareAll.filter((c) => c.id !== (recent[0] && recent[0].cardId))) || rareAll[0];
    const commons = CARDS.filter((c) => c.rarity === "common" && c.id !== (recent[0] && recent[0].cardId)), fresh = commons.filter((c) => !entry(c.id)), doubles = commons.filter((c) => entry(c.id) && entry(c.id).count === 1), triples = commons.filter((c) => entry(c.id) && entry(c.id).count === 2);
    if (recent[0] && recent[0].rarity === "common" && recent[0].repeated && fresh.length) return randomItem(fresh);
    const roll = randomUnit(), preferred = roll < 0.6 ? fresh : roll < 0.9 ? doubles : triples;
    return randomItem(preferred.length ? preferred : fresh.length ? fresh : doubles.length ? doubles : triples.length ? triples : rareFresh.length ? rareFresh : rareAll);
  }
  function resolveDraw(id) {
    const index = state.achievements.pending.findIndex((item) => item.id === id); if (index < 0) return;
    const pending = state.achievements.pending[index], card = chooseCard(), previous = entry(card.id), count = Math.min((previous && previous.count || 0) + 1, card.rarity === "common" ? 3 : 99);
    state.achievements.collection[card.id] = { ...(previous || {}), count, firstFound: previous ? previous.firstFound : pending.date, reason: previous ? previous.reason : pending.reason };
    state.achievements.pending.splice(index, 1); state.achievements.totalDraws += 1; state.achievements.rareMisses = card.rarity === "rare" ? 0 : state.achievements.rareMisses + 1;
    state.achievements.recent.unshift({ cardId: card.id, rarity: card.rarity, repeated: Boolean(previous) }); state.achievements.recent = state.achievements.recent.slice(0, 5); saveState(); renderReveal(card, count, Boolean(previous));
  }
  function renderReveal(card, count, repeated) {
    const pending = state.achievements.pending.length, title = card.rarity === "rare" ? `稀有发现：${card.name}` : repeated ? (count === 3 ? "伙伴满级" : "伙伴升级") : `发现了${card.name}`;
    $("#discovery-content").innerHTML = `<div class="reveal-scene is-${card.rarity}"><div class="sonar-rings"><i></i><i></i><i></i></div><button class="icon-button reveal-close" type="button" data-close-discovery><i data-lucide="x"></i></button><div class="flip-card"><div class="flip-card-inner"><div class="flip-card-back"><span class="sonar-mark"><i data-lucide="waves"></i></span></div><article class="flip-card-front"><span class="reveal-rarity">${card.rarity === "rare" ? "稀有 R" : "普通"}</span>${card.rarity === "rare" ? `<span class="tooth-badge"><i data-lucide="shield"></i></span>` : ""}${speciesArtHtml(card)}<div class="reveal-card-copy"><strong>${card.name}</strong><span>${repeated ? `×${count}${count === 3 ? " MAX" : ""}` : card.category}</span></div></article></div></div><div class="reveal-copy"><h2>${title}</h2><p>${card.description}</p></div><div class="reveal-actions">${pending ? `<button class="primary-button" type="button" data-continue-discovery>继续发现（还剩 ${pending} 次）</button>` : `<button class="primary-button" type="button" data-finish-discovery>收进图鉴</button>`}<button class="secondary-button" type="button" data-choose-companion="${card.id}"><i data-lucide="heart"></i><span>设为科目伙伴</span></button></div></div>`;
    refreshIcons(); requestAnimationFrame(() => requestAnimationFrame(() => $(".reveal-scene").classList.add("is-revealed")));
  }

  function openRewardSheet(added, key) {
    $("#sheet").dataset.sheetMode = "reward";
    $("#sheet-content").innerHTML = `<div class="reward-sheet"><div class="reward-shells">${Array.from({ length: added }, () => "<i></i>").join("")}</div><h2>${key === localDateKey() ? "今天记录完成" : "补录完成"}</h2><p>获得 ${added} 次海洋发现</p><span>${added === 1 ? "完成记录获得一次发现" : "A 或 A+ 带来了额外发现"}</span><div class="settings-actions"><button class="primary-button" type="button" data-discover-now><i data-lucide="sparkles"></i><span>现在去发现</span></button><button class="secondary-button" type="button" data-close-sheet>稍后再看</button></div></div>`;
    if (!$("#sheet").open) $("#sheet").showModal(); refreshIcons();
  }
  function openSettings() {
    $("#sheet").dataset.sheetMode = "settings";
    $("#sheet-content").innerHTML = `<div class="sheet-title-row"><h2>设置</h2><button class="icon-button" type="button" data-close-sheet><i data-lucide="x"></i></button></div><p class="sheet-copy">成绩、图鉴和科目伙伴只保存在当前浏览器中。</p><div class="form-field"><label for="child-name">孩子昵称</label><input id="child-name" maxlength="12" value="${escapeHtml(state.settings.childName)}"></div><button class="settings-row" type="button" data-open-companions><span><strong>科目伙伴</strong><small>查看和恢复三个科目的头像</small></span><i data-lucide="chevron-right"></i></button><div class="settings-actions"><button class="primary-button" type="button" data-save-settings><i data-lucide="save"></i><span>保存设置</span></button><button class="danger-button" type="button" data-clear-all>清空全部数据</button></div>`;
    if (!$("#sheet").open) $("#sheet").showModal(); refreshIcons();
  }
  function updatePendingBadge() { const badge = $("#pending-badge"), count = state.achievements.pending.length; badge.hidden = !count; badge.textContent = count > 9 ? "9+" : count; }
  function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("is-visible"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200); }

  document.addEventListener("click", (event) => {
    const nav = event.target.closest("[data-target]"); if (nav) return switchView(nav.dataset.target);
    const opener = event.target.closest("[data-open-subject]"); if (opener) { openSubject = openSubject === opener.dataset.openSubject ? "" : opener.dataset.openSubject; return renderToday(); }
    const grade = event.target.closest("[data-grade]"); if (grade) { if (grade.dataset.mode === "editor") { $("#sheet")._recordDraft[grade.dataset.subject] = grade.dataset.grade; renderEditorGrades(); } else { todayDraft[grade.dataset.subject] = grade.dataset.grade; renderToday(); } return; }
    if (event.target.closest("#save-today")) { const key = localDateKey(); state.records[key] = { ...todayDraft }; const added = grantDrawsForDate(key); if (saveState()) { renderToday(); if (added) openRewardSheet(added, key); else showToast(recordStatus(todayDraft).rest ? "休息日已保存" : "今天记录已保存"); } return; }
    if (event.target.closest("#settings-button")) return openSettings();
    if (event.target.closest("[data-close-sheet]")) return $("#sheet").close();
    const day = event.target.closest("[data-calendar-date]"); if (day) return openRecordEditor(day.dataset.calendarDate);
    if (event.target.closest("#previous-month")) { historyMonth = new Date(historyMonth.getFullYear(), historyMonth.getMonth() - 1, 1); return renderHistory(); }
    if (event.target.closest("#next-month")) { const next = new Date(historyMonth.getFullYear(), historyMonth.getMonth() + 1, 1), now = new Date(); if (next > new Date(now.getFullYear(), now.getMonth(), 1)) return; historyMonth = next; return renderHistory(); }
    const range = event.target.closest("[data-range]"); if (range) { analysisRange = range.dataset.range; return renderAnalysis(); }
    const clear = event.target.closest("[data-clear-subject]"); if (clear) { delete $("#sheet")._recordDraft[clear.dataset.clearSubject]; return renderEditorGrades(); }
    if (event.target.closest("[data-save-record]")) { const sheet = $("#sheet"), key = $("#record-date").value; if (!key || key > localDateKey()) return showToast("请选择今天或以前的日期"); if (sheet._recordDate !== key) delete state.records[sheet._recordDate]; if (Object.keys(sheet._recordDraft).length) state.records[key] = { ...sheet._recordDraft }; else delete state.records[key]; const added = grantDrawsForDate(key); if (saveState()) { sheet.close(); renderHistory(); if (added) openRewardSheet(added, key); else showToast("记录已保存"); } return; }
    if (event.target.closest("[data-delete-day]")) { const sheet = $("#sheet"); if (confirm("删除这一天的全部记录？已经获得的卡片不会被删除。")) { delete state.records[sheet._recordDate]; saveState("当天记录已删除"); sheet.close(); renderHistory(); } return; }
    const filter = event.target.closest("[data-collection-filter]"); if (filter) { collectionFilter = filter.dataset.collectionFilter; return renderCollection(); }
    if (event.target.closest("[data-open-discovery]")) return openDiscovery();
    const detail = event.target.closest("[data-card-detail]"); if (detail) return openCardDetail(detail.dataset.cardDetail);
    const draw = event.target.closest("[data-draw-pending]"); if (draw) return resolveDraw(draw.dataset.drawPending);
    if (event.target.closest("[data-continue-discovery]")) return renderDiscoveryChoices();
    if (event.target.closest("[data-finish-discovery]")) { $("#discovery-dialog").close(); return switchView("collection"); }
    if (event.target.closest("[data-close-discovery]")) { $("#discovery-dialog").close(); if (activeView === "collection") renderCollection(); return; }
    if (event.target.closest("[data-discover-now]")) { $("#sheet").close(); return openDiscovery(); }
    const choose = event.target.closest("[data-choose-companion]"); if (choose) return openCompanionPicker(choose.dataset.chooseCompanion);
    const set = event.target.closest("[data-set-companion]"); if (set) { const card = CARD_MAP[set.dataset.cardId], subject = SUBJECTS.find((s) => s.key === set.dataset.setCompanion); state.settings.companions[subject.key] = card.id; saveState(`${card.name}开始陪伴${subject.name}啦`); openCompanionPicker(card.id); renderToday(); return; }
    if (event.target.closest("[data-reset-companions]")) { state.settings.companions = {}; saveState("已恢复默认科目伙伴"); openCompanionOverview(); renderToday(); return; }
    if (event.target.closest("[data-open-companions]")) return openCompanionOverview();
    if (event.target.closest("[data-go-collection]")) { $("#sheet").close(); return switchView("collection"); }
    if (event.target.closest("[data-save-settings]")) { const name = $("#child-name").value.trim(); if (!name) return showToast("请输入孩子昵称"); state.settings.childName = name; if (saveState("设置已保存")) { $("#sheet").close(); switchView(activeView); } return; }
    if (event.target.closest("[data-clear-all]")) { if (confirm("确定清空全部成绩、图鉴和科目伙伴？此操作无法撤销。")) { state = clone(defaultState); saveState("全部本地数据已清空"); initTodayDraft(); $("#sheet").close(); switchView("today"); renderToday(); } return; }
    if (event.target.closest("[data-go-today]")) switchView("today");
  });

  $("#sheet").addEventListener("click", (event) => { if (event.target === $("#sheet")) $("#sheet").close(); });
  $("#discovery-dialog").addEventListener("cancel", () => { if (activeView === "collection") renderCollection(); });
  initTodayDraft(); updatePendingBadge(); renderToday(); switchView("today");
}());
