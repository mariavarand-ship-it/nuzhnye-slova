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

const moodObjects = [
  "внутренний чайник",
  "маленький шкаф",
  "сонный самовар",
  "карман для радости",
  "невидимый кот",
  "зонтик для мыслей",
  "пледовая корона",
  "лампа с характером",
  "смешной кабачок",
  "кнопка хорошего дня",
  "комната с тайным смехом",
  "летающая табуретка",
  "носок-философ",
  "ложка с важным видом",
  "облако без паспорта",
  "чемодан для тревоги",
  "фонарик внутри",
  "булочка судьбы",
  "пирожок спокойствия",
  "маленькая звезда в тапках",
  "рассеянный понедельник",
  "улыбка размером с горошину",
  "слово «кукуруза»",
  "тихий фейерверк",
  "домашний гром"
];

const moodActions = [
  "смотрит на мир с подозрительной нежностью",
  "надевает смешные носки и перестаёт спорить",
  "делает маленький поклон дню",
  "шепчет, что катастрофа немного преувеличивает",
  "прячет тревогу под подушку",
  "выходит из-за угла с булочкой",
  "включает режим тихого чуда",
  "перестаёт командовать внутренним парадом",
  "подмигивает из темноты",
  "перекладывает грусть в другой ящик",
  "говорит: «ну ладно, жить можно»",
  "заворачивает день в мягкую бумагу",
  "садится рядом и не требует отчёта",
  "делает вид, что всё это репетиция радости",
  "снимает с утра слишком серьёзную шляпу",
  "устраивает маленький переворот в пользу тепла",
  "отдаёт тревоге билет в один конец",
  "рисует смешной знак на полях дня",
  "просит не ругать сердце за погоду",
  "заменяет внутренний скрип на тихий свет",
  "возвращает воздуху право быть внутри",
  "выдаёт разрешение на маленькую радость",
  "становится смешнее ровно настолько, насколько нужно",
  "делает день менее деревянным",
  "кладёт в карман немного света"
];

const moodEndings = [
  "и это уже неплохое начало",
  "и день становится чуть менее колючим",
  "и плохое настроение теряет официальный вид",
  "и мир перестаёт быть строгим начальником",
  "и внутри появляется место для воздуха",
  "и тревога не получает главный микрофон",
  "и хаос выглядит почти декоративно",
  "и одна маленькая радость уже считается",
  "и не нужно побеждать дракона прямо сейчас",
  "и это достойно уважительного кивка от луны",
  "и всё плохое уменьшается до размера горошины",
  "и жизнь слегка подмигивает из-за занавески",
  "и настроение возвращается без лишнего шума",
  "и можно быть живым существом, а не идеальным механизмом",
  "и где-то внутри тихо включается свет",
  "и обычный вечер получает шанс стать уютным",
  "и сердце перестаёт спорить с погодой",
  "и день вдруг вспоминает, что можно быть мягче",
  "и усталость получает законный стул",
  "и мир становится не прекрасным, но выносимым",
  "и этого уже достаточно для маленькой победы",
  "и в голове появляется окно",
  "и смысл выглядывает из-под стола",
  "и даже тишина начинает звучать добрее",
  "и всё ещё можно устроить дружбу с этим днём"
];

const wisdomActions = [
  "замечать мысль и не тащить её за собой",
  "возвращаться к дыханию, когда внутри шумно",
  "выбирать один честный шаг вместо десяти тревожных",
  "не держать в руках то, что уже прошло",
  "не добавлять жестокости к боли",
  "позволять паузе быть частью пути",
  "слушать тело раньше, чем шум ума",
  "не верить каждой тревожной мысли",
  "выбирать ясность вместо спешки",
  "смотреть на себя без внутреннего суда",
  "не требовать от жизни немедленной развязки",
  "разрешать процессу быть процессом",
  "не превращать одну волну в целое море",
  "переставать воевать с тем, что уже случилось",
  "давать тишине немного места",
  "не называть ошибку своим именем",
  "беречь внимание от лишнего шума",
  "делать меньше, но честнее",
  "не спорить с дождём, а искать зонт",
  "отличать чувство от приговора",
  "отпускать мысль, если она стала клеткой",
  "видеть страх как погоду, а не как истину",
  "останавливать внутреннюю спешку у двери",
  "помнить, что мягкость тоже бывает силой",
  "не превращать чужую бурю в свой климат"
];

const wisdomResults = [
  "в этом уже есть свобода",
  "внутри становится просторнее",
  "следующий шаг перестаёт пугать",
  "боль перестаёт быть всей жизнью",
  "тишина становится не пустотой, а опорой",
  "внимание возвращается домой",
  "маленькое действие становится достаточным",
  "то, что меняется, больше не становится тюрьмой",
  "сердце учится не воевать с каждым углом мира",
  "день получает шанс стать мягче",
  "внутренний критик теряет должность",
  "внутри становится меньше поля битвы",
  "даже трудный день становится практикой",
  "появляется место для света",
  "дыхание снова становится домом",
  "прошлое перестаёт командовать настоящим",
  "внимание становится мягким фонарём",
  "сила перестаёт быть жёсткой",
  "страх становится просто погодой",
  "жизнь снова разговаривает тихим голосом",
  "одна дверь перестаёт казаться всей стеной",
  "хаос становится меньше",
  "пауза оказывается не пустотой, а мостом",
  "внутри появляется больше воздуха",
  "мир перестаёт требовать мгновенного ответа"
];

const praiseQualities = [
  "в тебе много настоящего",
  "в тебе есть тёплая внимательность",
  "в тебе есть тихая смелость",
  "в тебе живёт сила без лишнего шума",
  "в тебе есть мягкость без слабости",
  "в тебе много живого и глубокого",
  "в тебе есть редкая человеческая точность",
  "в тебе есть бережность к важным вещам",
  "в тебе есть умение сомневаться и всё равно идти",
  "в тебе есть тонкое чувство мира",
  "в тебе есть способность продолжать без фанфар",
  "в тебе есть интерес даже в тишине",
  "в тебе есть честность с собой",
  "в тебе светится странный внутренний мир",
  "в тебе дружат нежность и упрямство",
  "в тебе есть смысл, свет и маленькие победы",
  "в тебе есть способность замечать незаметное",
  "в тебе много ценного без всяких условий",
  "в тебе есть собственный внутренний почерк",
  "в тебе больше силы, чем говорит тревожный прогноз",
  "в тебе есть тихий огонёк, который не сдаётся",
  "в тебе есть редкая способность не становиться жёсткостью",
  "в тебе есть место, где живёт хорошее слово",
  "в тебе много воздуха для нового",
  "в тебе есть свет, который не требует сцены"
];

const praiseActions = [
  "ты умеешь замечать важное",
  "ты создаёшь смысл из мелочей",
  "ты держишься честнее, чем кажется изнутри",
  "ты не теряешь живое внутри",
  "ты справляешься без лишних фанфар",
  "ты умеешь соединять мягкость и силу",
  "ты собираешь себя бережно",
  "ты делаешь обычное объёмным",
  "ты видишь оттенки там, где другие видят плоскость",
  "ты продолжаешь двигаться даже в сомнениях",
  "ты остаёшься добрым местом для себя",
  "ты делаешь из хаоса что-то живое",
  "ты несёшь в себе умный огонёк",
  "ты постепенно становишься своей опорой",
  "ты находишь слова там, где другим только шумно",
  "ты держишь внутреннюю погоду лучше, чем кажется",
  "ты позволяешь себе чувствовать, и это смело",
  "ты не сдаёшь себя внутреннему критику полностью",
  "ты бережёшь способность удивляться",
  "ты остаёшься настоящим человеком даже в трудный день",
  "ты умеешь начинать заново",
  "ты замечаешь тонкое и не обесцениваешь его",
  "ты несёшь себя через день как важную вещь",
  "ты выбираешь жизнь даже в маленьких движениях",
  "ты строишь внутренний дом по одному кирпичику"
];

const praiseEndings = [
  "и это очень заметно",
  "и это достойно уважения",
  "и это не нужно доказывать",
  "и это уже большая работа",
  "и это красиво без дополнительных условий",
  "и это не черновик, а жизнь",
  "и с этим не нужно спорить",
  "и это делает тебя редким явлением",
  "и рядом с этим хочется быть бережнее",
  "и в этом есть настоящий стиль",
  "и это не исчезает в трудные дни",
  "и это твоя тихая магия",
  "и это можно признать без оправданий",
  "и это заслуживает мягкого света",
  "и это больше, чем кажется",
  "и это уже повод быть к себе добрее",
  "и это видно даже сквозь усталость",
  "и это не отменяется плохим днём",
  "и это очень по-настоящему",
  "и в этом есть сила без шума",
  "и это не требует разрешения",
  "и это уже достаточно важно",
  "и это стоит беречь",
  "и это делает день человечнее",
  "и это не маленькая вещь"
];

const nameOpeners = [
  "{name},",
  "{name}, слушай:",
  "{name}, вот что важно:",
  "{name}, маленькое послание:",
  "{name}, сегодня так:"
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

function getNameOpener() {
  const opener = getRandomItem(nameOpeners);
  return opener.replace("{name}", getName());
}

function saveUniqueMessage(usedKey, message) {
  let usedMessages = JSON.parse(localStorage.getItem(usedKey) || "[]");

  if (!usedMessages.includes(message)) {
    usedMessages.push(message);
  }

  if (usedMessages.length > 900) {
    usedMessages = usedMessages.slice(-900);
  }

  localStorage.setItem(usedKey, JSON.stringify(usedMessages));
}

function generateUniqueMessage(usedKey, generator) {
  let usedMessages = JSON.parse(localStorage.getItem(usedKey) || "[]");
  const maxAttempts = 200;

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
  const templates = [
    () => `${getNameOpener()} ${getRandomItem(moodObjects)} сегодня ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${getNameOpener()} если день ведёт себя странно, пусть ${getRandomItem(moodObjects)} ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${getNameOpener()} сегодня можно не совершать подвиги: пусть ${getRandomItem(moodObjects)} ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${getNameOpener()} даже если настроение спряталось, ${getRandomItem(moodObjects)} ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${getNameOpener()} пусть ${getRandomItem(moodObjects)} ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${getNameOpener()} если внутренний понедельник стучит ложкой по столу, пусть ${getRandomItem(moodObjects)} ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`,
    () => `${getNameOpener()} сегодня вселенная выдаёт тебе ${getRandomItem(moodObjects)}, который ${getRandomItem(moodActions)}, ${getRandomItem(moodEndings)}.`
  ];

  return generateUniqueMessage(moodUsedKey, () => getRandomItem(templates)());
}

function generateWisdomMessage() {
  const templates = [
    () => `${getNameOpener()} иногда важно ${getRandomItem(wisdomActions)}: ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} сегодня попробуй ${getRandomItem(wisdomActions)} — так ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} мудрость начинается там, где получается ${getRandomItem(wisdomActions)}, и тогда ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} не нужно всё решать сразу: достаточно ${getRandomItem(wisdomActions)}, чтобы ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} когда становится трудно, попробуй ${getRandomItem(wisdomActions)}; так ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} даже если мысль шумит как кастрюля, можно ${getRandomItem(wisdomActions)} — и тогда ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} один спокойный жест — ${getRandomItem(wisdomActions)} — иногда делает так, что ${getRandomItem(wisdomResults)}.`
  ];

  return generateUniqueMessage(wisdomUsedKey, () => getRandomItem(templates)());
}

function generatePraiseMessage() {
  const templates = [
    () => `${getNameOpener()} ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} ${getRandomItem(praiseActions)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} редкая способность уже есть: ${getRandomItem(praiseActions)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} хочется напомнить: ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} даже сегодня, даже не в идеальной форме, ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} в этом странном дне есть факт: ${getRandomItem(praiseActions)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} внутренний маленький оркестр подтверждает: ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`
  ];

  return generateUniqueMessage(praiseUsedKey, () => getRandomItem(templates)());
}

function showMood() {
  trackEvent("mood_clicked");
  emojiElement.textContent = getRandomItem(["☀︎", "✦", "☁︎", "♡", "☽", "✶", "✺"]);
  messageElement.textContent = generateMoodMessage();
}

function showWisdom() {
  trackEvent("wisdom_clicked");
  emojiElement.textContent = getRandomItem(["☽", "◌", "◇", "✧", "○", "✦"]);
  messageElement.textContent = generateWisdomMessage();
}

function showPraise() {
  trackEvent("praise_clicked");
  emojiElement.textContent = getRandomItem(["♡", "✶", "✺", "❋", "✦", "✧"]);
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
