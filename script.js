function trackEvent(eventName) {
  if (typeof gtag === "function") {
    gtag("event", eventName);
  }
}

const nameScreen = document.getElementById("nameScreen");
const mainScreen = document.getElementById("mainScreen");
const nameInput = document.getElementById("nameInput");
const messageElement = document.getElementById("message");
const emojiElement = document.getElementById("emoji");

const nameKey = "childhoodName";

const backgroundClasses = [
  "bg-aurora",
  "bg-plum",
  "bg-ink",
  "bg-moss",
  "bg-ember",
  "bg-moon"
];

const moodUsedKey = "generatedMoodMessages";
const wisdomUsedKey = "generatedWisdomMessages";
const praiseUsedKey = "generatedPraiseMessages";

const moodThings = [
  "внутренний чайник",
  "маленькая радость",
  "день",
  "мир",
  "внутренняя лампочка",
  "смешная мелочь",
  "сердце",
  "утро",
  "вечер",
  "невидимый помощник",
  "уютный свет",
  "пледовая корона",
  "маленькое чудо",
  "добрая случайность",
  "тихая звезда",
  "смешной знак",
  "карман для радости",
  "внутренний кот",
  "фонарик внутри",
  "нежная мысль"
];

const moodActions = [
  "смотрит на тебя с уважением",
  "становится мягче на один вдох",
  "приносит тебе тёплый знак",
  "делает вид, что всё идёт по плану",
  "перестаёт командовать",
  "тихо садится рядом",
  "надевает смешные носки",
  "прячет тревогу под плед",
  "просит чашку чая",
  "включает тихий режим заботы",
  "делает маленький реверанс",
  "перестаёт притворяться катастрофой",
  "рисует улыбку на полях",
  "шепчет, что ещё не всё пропало",
  "становится похожим на мягкую лампу",
  "просит не ругать себя",
  "выходит из-за угла с булочкой",
  "становится менее колючим",
  "делает день чуть теплее",
  "оставляет тебе место для воздуха"
];

const moodEndings = [
  "и это уже неплохое начало",
  "и жить становится немного смешнее",
  "и мир перестаёт быть таким начальником",
  "и плохое настроение теряет важный вид",
  "и тревога не получает главный микрофон",
  "и день становится чуть менее деревянным",
  "и где-то внутри тихо включается свет",
  "и настроение возвращается без лишнего шума",
  "и можно быть живой, а не идеальной",
  "и даже хаос выглядит почти декоративно",
  "и сердце перестаёт спорить с погодой",
  "и обычный вечер может стать уютным",
  "и день получает шанс исправиться",
  "и всё плохое становится размером с горошину",
  "и тебе не нужно побеждать дракона прямо сейчас",
  "и это достойно уважительного кивка от луны",
  "и можно дышать чуть свободнее",
  "и мир внезапно становится менее суровым",
  "и настроение перестаёт хмурить брови",
  "и одна маленькая радость уже считается"
];

const wisdomActions = [
  "замечать мысль и не продолжать её силой",
  "возвращаться к дыханию, когда внутри становится шумно",
  "выбирать один честный шаг вместо десяти тревожных",
  "не держать в руках то, что уже прошло",
  "не добавлять жестокости к боли",
  "позволять паузе быть частью пути",
  "слушать тело раньше, чем шум ума",
  "не верить каждой тревожной мысли",
  "выбирать ясность вместо спешки",
  "смотреть на себя без наказания",
  "не требовать от себя цветения зимой",
  "разрешать себе быть в процессе",
  "не превращать одну волну в целое море",
  "переставать воевать с тем, что уже есть",
  "давать тишине немного места",
  "не называть ошибку своим именем",
  "беречь внимание от лишнего шума",
  "делать меньше, но честнее",
  "не спорить с дождём, а искать зонт",
  "отличать чувство от приговора"
];

const wisdomResults = [
  "в этом уже есть свобода",
  "внутри становится просторнее",
  "следующий шаг перестаёт пугать",
  "боль перестаёт быть всей жизнью",
  "тишина становится не пустотой, а опорой",
  "ты снова оказываешься на своей стороне",
  "маленькое действие становится достаточным",
  "то, что меняется, больше не становится тюрьмой",
  "сердце учится не воевать с каждым углом мира",
  "день получает шанс стать мягче",
  "внутренний критик теряет должность",
  "ты перестаёшь быть полем битвы",
  "даже трудный день становится практикой",
  "в тебе появляется место для света",
  "дыхание снова становится домом",
  "прошлое перестаёт командовать настоящим",
  "внимание становится мягким фонарём",
  "сила перестаёт быть жёсткой",
  "страх становится просто погодой",
  "жизнь снова разговаривает с тобой"
];

const praiseQualities = [
  "очень настоящая",
  "тёплая и внимательная",
  "смелая в своём тихом способе",
  "сильная без лишнего шума",
  "мягкая, но не слабая",
  "живая и глубокая",
  "редкая и очень человеческая",
  "бережная к важным вещам",
  "умная в своих сомнениях",
  "тонко чувствующая",
  "способная продолжать даже без фанфар",
  "интересная даже в тишине",
  "честная с собой",
  "светлая в своём странном внутреннем мире",
  "нежная и упрямая одновременно",
  "собранная из смысла, света и маленьких побед",
  "способная замечать то, что другие пропускают",
  "неидеальная, но очень ценная",
  "человек с собственным внутренним почерком",
  "гораздо сильнее, чем твой тревожный прогноз"
];

const praiseActions = [
  "умеешь замечать важное",
  "создаёшь смысл из мелочей",
  "держишься честнее, чем сама думаешь",
  "не теряешь живое внутри",
  "справляешься без лишних фанфар",
  "можешь быть мягкой и сильной одновременно",
  "собираешь себя бережно",
  "делаешь обычное объёмным",
  "видишь оттенки там, где другие видят плоскость",
  "продолжаешь двигаться даже в сомнениях",
  "остаёшься доброй без самопредательства",
  "делаешь из хаоса что-то живое",
  "несёшь в себе умный огонёк",
  "постепенно становишься своей опорой",
  "умеешь находить слова там, где другим только шумно",
  "держишь внутреннюю погоду лучше, чем кажется",
  "позволяешь себе чувствовать, и это смело",
  "не сдаёшь себя внутреннему критику полностью",
  "бережёшь в себе способность удивляться",
  "умеешь быть настоящей даже в плохой день"
];

const praiseEndings = [
  "и это очень заметно",
  "и это достойно уважения",
  "и это не надо доказывать",
  "и это уже большая работа",
  "и это красиво без дополнительных условий",
  "и это не черновик, а жизнь",
  "и с этим не нужно спорить",
  "и это делает тебя редкой",
  "и рядом с этим хочется быть бережнее",
  "и в этом есть настоящий стиль",
  "и это не исчезает в трудные дни",
  "и это твоя тихая магия",
  "и ты имеешь право это признать",
  "и это заслуживает мягкого света",
  "и это больше, чем кажется",
  "и это уже повод быть к себе добрее",
  "и это видно даже сквозь усталость",
  "и это не отменяется плохим днём",
  "и это очень по-настоящему",
  "и в этом есть сила без шума"
];

function startApp() {
  applyRandomBackground();

  const savedName = localStorage.getItem(nameKey);

  if (savedName) {
    showMainScreen(savedName);
  } else {
    nameScreen.classList.remove("hidden");
    mainScreen.classList.add("hidden");
  }
}

function applyRandomBackground() {
  const background = getRandomItem(backgroundClasses);
  document.body.classList.add(background);
}

function saveName() {
  const name = nameInput.value.trim();

  if (!name) {
    nameInput.focus();
    return;
  }

  localStorage.setItem(nameKey, name);
  trackEvent("name_saved");
  showMainScreen(name);
}

function resetName() {
  trackEvent("name_changed");

  localStorage.removeItem(nameKey);
  nameInput.value = "";
  messageElement.textContent = "Нажми кнопку — и приложение скажет что-нибудь нужное.";
  emojiElement.textContent = "✦";
  nameScreen.classList.remove("hidden");
  mainScreen.classList.add("hidden");

  setTimeout(() => {
    nameInput.focus();
  }, 100);
}

function showMainScreen(name) {
  nameScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  messageElement.textContent = `${formatName(name)}, нажми кнопку — и приложение скажет что-нибудь нужное.`;
}

function getName() {
  const savedName = localStorage.getItem(nameKey) || "солнышко";
  return formatName(savedName);
}

function formatName(name) {
  if (!name) return "Солнышко";
  return name.charAt(0).toLocaleUpperCase("ru-RU") + name.slice(1);
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function saveUniqueMessage(usedKey, message) {
  let usedMessages = JSON.parse(localStorage.getItem(usedKey) || "[]");

  if (!usedMessages.includes(message)) {
    usedMessages.push(message);
  }

  if (usedMessages.length > 700) {
    usedMessages = usedMessages.slice(-700);
  }

  localStorage.setItem(usedKey, JSON.stringify(usedMessages));
}

function generateUniqueMessage(usedKey, generator) {
  let usedMessages = JSON.parse(localStorage.getItem(usedKey) || "[]");
  const maxAttempts = 160;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const message = generator();

    if (!usedMessages.includes(message)) {
      saveUniqueMessage(usedKey, message);
      return message;
    }
  }

  localStorage.setItem(usedKey, JSON.stringify([]));
  const message = generator();
  saveUniqueMessage(usedKey, message);

  return message;
}

function generateMoodMessage() {
  const name = getName();

  const templates = [
    () => `${name}, ${getRandomItem(moodThings)} сегодня ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${name}, если день ведёт себя странно, пусть ${getRandomItem(moodThings)} ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${name}, сегодня можно не быть героиней: пусть ${getRandomItem(moodThings)} ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${name}, даже если настроение спряталось, ${getRandomItem(moodThings)} ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${name}, пусть ${getRandomItem(moodThings)} ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`
  ];

  return generateUniqueMessage(moodUsedKey, () => getRandomItem(templates)());
}

function generateWisdomMessage() {
  const name = getName();

  const templates = [
    () => `${name}, иногда важно ${getRandomItem(wisdomActions)}: ${getRandomItem(wisdomResults)}.`,
    () => `${name}, сегодня попробуй ${getRandomItem(wisdomActions)} — так ${getRandomItem(wisdomResults)}.`,
    () => `${name}, мудрость начинается там, где ты умеешь ${getRandomItem(wisdomActions)}, и тогда ${getRandomItem(wisdomResults)}.`,
    () => `${name}, не спеши всё решать сразу: достаточно ${getRandomItem(wisdomActions)}, чтобы ${getRandomItem(wisdomResults)}.`,
    () => `${name}, когда становится трудно, попробуй ${getRandomItem(wisdomActions)}; так ${getRandomItem(wisdomResults)}.`
  ];

  return generateUniqueMessage(wisdomUsedKey, () => getRandomItem(templates)());
}

function generatePraiseMessage() {
  const name = getName();

  const templates = [
    () => `${name}, ты ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`,
    () => `${name}, ты ${getRandomItem(praiseActions)}, ${getRandomItem(praiseEndings)}.`,
    () => `${name}, в тебе есть редкая способность: ты ${getRandomItem(praiseActions)}, ${getRandomItem(praiseEndings)}.`,
    () => `${name}, мне хочется напомнить: ты ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`,
    () => `${name}, даже сегодня, даже не в идеальной форме, ты ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`
  ];

  return generateUniqueMessage(praiseUsedKey, () => getRandomItem(templates)());
}

function showMood() {
  trackEvent("mood_clicked");
  emojiElement.textContent = getRandomItem(["☀︎", "✦", "☁︎", "♡", "☽"]);
  messageElement.textContent = generateMoodMessage();
}

function showWisdom() {
  trackEvent("wisdom_clicked");
  emojiElement.textContent = getRandomItem(["☽", "◌", "◇", "✧", "○"]);
  messageElement.textContent = generateWisdomMessage();
}

function showPraise() {
  trackEvent("praise_clicked");
  emojiElement.textContent = getRandomItem(["♡", "✶", "✺", "❋", "✦"]);
  messageElement.textContent = generatePraiseMessage();
}

document.getElementById("saveNameButton").addEventListener("click", saveName);
document.getElementById("resetNameButton").addEventListener("click", resetName);
document.getElementById("moodButton").addEventListener("click", showMood);
document.getElementById("wisdomButton").addEventListener("click", showWisdom);
document.getElementById("praiseButton").addEventListener("click", showPraise);

nameInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    saveName();
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

startApp();
