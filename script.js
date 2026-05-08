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
const saveImageButton = document.getElementById("saveImageButton");
const authorLink = document.getElementById("authorLink");
const todayDateElement = document.getElementById("todayDate");
const footerPhraseElement = document.getElementById("footerPhrase");
const welcomeFooterPhraseElement = document.getElementById("welcomeFooterPhrase");

const nameKey = "childhoodName";

const backgroundClasses = [
  "bg-aurora",
  "bg-plum",
  "bg-ink",
  "bg-moss",
  "bg-ember",
  "bg-moon",
  "bg-candy"
];

const dailyBackgrounds = [
  {
    className: "bg-aurora",
    canvas: ["#2a2340", "#09090d", "#000000"],
    glows: [
      [180, 180, 220, "rgba(255, 255, 255, 0.09)"],
      [840, 820, 260, "rgba(180, 140, 255, 0.12)"],
      [820, 220, 190, "rgba(255, 180, 120, 0.08)"]
    ]
  },
  {
    className: "bg-plum",
    canvas: ["#3a1f3d", "#170b22", "#050407"],
    glows: [
      [190, 160, 230, "rgba(255, 180, 230, 0.12)"],
      [820, 780, 280, "rgba(160, 120, 255, 0.14)"],
      [820, 240, 200, "rgba(255, 210, 160, 0.08)"]
    ]
  },
  {
    className: "bg-ink",
    canvas: ["#18243a", "#070b14", "#000000"],
    glows: [
      [180, 200, 240, "rgba(160, 210, 255, 0.12)"],
      [820, 820, 280, "rgba(120, 120, 255, 0.11)"],
      [780, 220, 190, "rgba(255, 255, 255, 0.07)"]
    ]
  },
  {
    className: "bg-moss",
    canvas: ["#223b2a", "#09140d", "#020403"],
    glows: [
      [180, 180, 230, "rgba(210, 255, 190, 0.12)"],
      [840, 800, 270, "rgba(120, 220, 170, 0.11)"],
      [800, 230, 190, "rgba(255, 230, 170, 0.08)"]
    ]
  },
  {
    className: "bg-ember",
    canvas: ["#472419", "#150805", "#030101"],
    glows: [
      [180, 170, 230, "rgba(255, 190, 120, 0.13)"],
      [840, 820, 280, "rgba(255, 120, 90, 0.11)"],
      [800, 240, 190, "rgba(255, 240, 190, 0.08)"]
    ]
  },
  {
    className: "bg-moon",
    canvas: ["#243043", "#0b111c", "#030407"],
    glows: [
      [180, 180, 230, "rgba(220, 235, 255, 0.12)"],
      [840, 800, 280, "rgba(170, 190, 255, 0.12)"],
      [800, 230, 190, "rgba(255, 255, 255, 0.07)"]
    ]
  },
  {
    className: "bg-candy",
    canvas: ["#493050", "#170b20", "#050204"],
    glows: [
      [180, 170, 230, "rgba(255, 190, 230, 0.13)"],
      [840, 800, 270, "rgba(190, 150, 255, 0.13)"],
      [800, 230, 190, "rgba(255, 220, 170, 0.08)"]
    ]
  }
];

const footerPhrases = [
  "заходи, когда захочешь",
  "я здесь, если понадобится слово",
  "приходи, когда будет нужно",
  "можно вернуться в любой момент",
  "если что — здесь есть ещё немного слов",
  "заглядывай, когда захочется",
  "тут можно взять ещё одно слово",
  "возвращайся, если откликнется",
  "если станет шумно — заходи",
  "приходи за словами, когда захочешь",
  "можно заглянуть просто так",
  "здесь всегда есть место для ещё одной фразы",
  "если понадобится мягкий знак — заходи",
  "дверь приоткрыта, когда захочешь",
  "тут тихо, можно возвращаться"
];

const moodUsedKey = "generatedMoodMessages";
const wisdomUsedKey = "generatedWisdomMessages";
const praiseUsedKey = "generatedPraiseMessages";

const moodLastTemplateKey = "moodLastTemplate";
const wisdomLastTemplateKey = "wisdomLastTemplate";
const praiseLastTemplateKey = "praiseLastTemplate";

const nameLastOpenerKey = "nameLastOpener";

const nameOpeners = [
  "{name},",
  "{name}.",
  "{name}, слушай.",
  "{name}, смотри.",
  "{name}, маленькая весточка:",
  "{name}, важное донесение:",
  "{name}, без паники:",
  "{name}, между нами:",
  "{name}, официально сообщаем:",
  "{name}, по секрету:",
  "{name}, тихонько скажу:",
  "{name}, вот что нашлось:",
  "{name}, есть сообщение:",
  "{name}, держи нужное слово:",
  "{name}, сегодня можно так:"
];

const moodScenes = [
  "в твою честь один кабачок отменил тревожное совещание и ушёл смотреть на облака",
  "маленький фонарь внутри уже включился и делает вид, что это он всё спас",
  "внутренний пингвин сообщил: катастрофа переносится, потому что у него лапки и чай",
  "один уставший ангел снял кроссовки, сел рядом и сказал: ну ничего, прорвёмся",
  "день попытался быть суровым, но поскользнулся на булочке и стал добрее",
  "грусть хотела войти без стука, но её остановил вежливый самовар",
  "тревога пришла с докладом, но забыла папку и теперь просто мнётся у двери",
  "у мира сегодня немного кривой почерк, но письмо всё равно доброе",
  "внутренний ёжик наконец выдохнул и перестал охранять каждую травинку",
  "одна маленькая радость уже стоит в прихожей и делает вид, что она тут случайно",
  "серьёзность дня дала трещину, и оттуда выглянул смешной свет",
  "у тебя внутри обнаружен запасной карман для хороших новостей",
  "невидимый пельмень храбрости снова на посту",
  "мир сегодня не идеален, зато у него есть смешной воротник",
  "где-то рядом ходит удача в тапках и делает вид, что она просто мимо",
  "внутренний диспетчер разрешил посадку маленькому счастью",
  "печаль поставили на беззвучный режим до дальнейших распоряжений",
  "один носок-философ пришёл к выводу, что жить всё-таки можно",
  "хаос сегодня получил замечание за слишком громкое поведение",
  "внутренняя булочная открылась и выдаёт тёплые смыслы без очереди",
  "у дня нашлась мягкая сторона, просто она сначала пряталась за шкафом",
  "маленький дирижабль надежды пролетел над внутренним болотом",
  "комнатный гром передумал греметь и пошёл пить какао",
  "одна добрая нелепость уже работает на твоей стороне",
  "у тревоги сегодня выходной по семейным обстоятельствам",
  "мир прислал тебе невидимую открытку с кривой, но честной звездой",
  "сегодня можно быть не победителем, а тёплым живым существом",
  "внутренний таракан дипломатии подписал мирный договор с реальностью",
  "луна в тапках одобрила твоё право не собираться в идеального человека",
  "день ещё может повернуться к тебе нормальной стороной"
];

const moodEndings = [
  "Это уже неплохое начало.",
  "Можно выдохнуть хотя бы на один миллиметр.",
  "Жизнь не стала простой, но стала чуть менее колючей.",
  "Это считается хорошей новостью.",
  "Не фейерверк, конечно, но очень даже свет.",
  "Маленькая победа тоже победа, просто без барабана.",
  "С этим уже можно продолжать.",
  "Вот так иногда и держится мир.",
  "Ничего героического, просто достаточно.",
  "И да, это тоже поддержка."
];

const wisdomThoughts = [
  "сегодня можно не чинить всю жизнь. Достаточно выбрать один мягкий следующий шаг",
  "не верь первой тревожной мысли. Она часто приходит без пальто и документов",
  "если внутри шумно, начни не с решения, а с возвращения к себе",
  "не всё, что срочно кричит внутри, правда нуждается в немедленном ответе",
  "иногда самый взрослый поступок — не давить на себя ещё сильнее",
  "можно быть в процессе и не считать это провалом",
  "не обязательно понимать всё сразу. Некоторые смыслы доходят пешком",
  "если день рассыпался, не собирай весь. Подними один маленький кусочек",
  "не превращай усталость в обвинение против себя",
  "можно идти медленно и всё равно идти",
  "бережность — это не слабый режим, а нормальная человеческая настройка",
  "не каждая мысль заслуживает отдельного совещания",
  "там, где не получается быть смелым, можно хотя бы быть честным",
  "сначала вода, воздух и пауза. Большие выводы потом",
  "чужой шум не обязан становиться твоей внутренней погодой",
  "если не знаешь, что делать, сделай меньше. Но по-настоящему",
  "не надо выигрывать у дня. Достаточно не бросать себя",
  "иногда ответ появляется после тишины, а не после ещё одного анализа",
  "страх может ехать рядом, но не обязан держать руль",
  "ты можешь передумать. Это не слабость, а настройка маршрута",
  "не все двери нужно открыть сегодня. Некоторые пусть просто существуют",
  "если внутри слишком громко, говори с собой тише, а не строже",
  "можно не доказывать свою ценность продуктивностью",
  "не надо превращать маленькую ошибку в семейную сагу",
  "иногда достаточно перестать спорить с реальностью и найти себе плед",
  "если сердце устало, ему нужен не приказ, а место присесть",
  "не обязательно быть новой версией себя к вечеру",
  "самое важное сегодня может оказаться очень простым",
  "не всякая пауза — остановка. Иногда это способ не сломаться",
  "мягкость к себе тоже требует дисциплины"
];

const wisdomEndings = [
  "Вот и весь совет дня.",
  "Запиши это где-нибудь внутри, не на лбу.",
  "Этого достаточно на сегодня.",
  "Без фанфар, но по делу.",
  "Ничего грандиозного. Просто живое.",
  "Так день становится чуть менее железным.",
  "Это не решит всё, но вернёт тебе тебя.",
  "Иногда именно так и начинается опора.",
  "Можно попробовать без героизма.",
  "Тихо, но работает."
];

const praiseLines = [
  "ты не просто справляешься. Ты ещё умудряешься оставаться живым человеком, а это редкость",
  "с тобой миру становится чуть менее пластиково",
  "ты умеешь замечать тонкое — и не превращать это в шум. Это очень ценно",
  "в тебе есть не показная, а настоящая сила. Та, которая без прожектора",
  "ты не обязана быть удобной, чтобы быть хорошей",
  "ты умеешь продолжать, даже когда внутри не играет торжественная музыка",
  "в тебе есть редкое качество: ты чувствуешь глубоко, но всё равно идёшь",
  "ты не черновик человека. Ты уже целая история",
  "у тебя есть внутренний свет, который не просит разрешения",
  "ты делаешь обычные вещи живыми, и это заметно",
  "ты не сдаёшь себя целиком тревоге, даже когда она громкая",
  "у тебя хороший внутренний слух на настоящее",
  "ты умеешь быть нежной не потому, что слабая, а потому что сильная не камнем",
  "ты выдерживаешь дни, которые вообще-то могли бы быть помягче",
  "рядом с твоим взглядом вещи становятся объёмнее",
  "ты умеешь искать смысл, даже когда день выглядит как мокрая картонка",
  "в тебе много тихой храбрости. Не театральной, а рабочей",
  "ты не обязана сиять, чтобы быть ценной. Но всё равно иногда сияешь",
  "ты умеешь возвращаться к себе. Это огромная штука",
  "ты не просто проходишь через день — ты ещё замечаешь, из чего он сделан",
  "у тебя есть собственный внутренний почерк. Его не надо исправлять под линейку",
  "ты умеешь быть настоящей, даже когда это не самый удобный вариант",
  "в тебе есть мягкость, которая не разваливается от ветра",
  "ты заслуживаешь хороших слов не за подвиги, а просто потому что ты есть",
  "ты не меньше ценна в усталости, чем в собранности",
  "в тебе есть способность делать пространство теплее",
  "ты умеешь не огрубеть, хотя мир иногда очень старается",
  "ты важная не потому, что всё успеваешь. А потому что ты — это ты",
  "в тебе есть глубина, с которой не надо торопиться",
  "ты уже достаточно хорошая для этого дня"
];

const praiseEndings = [
  "И это правда.",
  "Без маленьких букв и оправданий.",
  "Можно не спорить.",
  "Это не комплимент из вежливости, а наблюдение.",
  "Пусть это сегодня побудет рядом.",
  "Да, вот так прямо.",
  "Никакого но.",
  "С этим можно немного расправить плечи.",
  "Это не отменяется плохим настроением.",
  "Пожалуйста, не прячь это от себя."
];

function startApp() {
  applyDailyBackground();
  updateTodayDate();
  updateDailyFooterPhrase();
  hideSaveButton();

  const savedName = localStorage.getItem(nameKey);

  if (savedName) {
    showMainScreen(savedName);
  } else {
    nameScreen.classList.remove("hidden");
    mainScreen.classList.add("hidden");
  }
}

function getDayNumber() {
  const startDate = new Date("2026-05-01T00:00:00");
  const today = new Date();
  const dayInMilliseconds = 1000 * 60 * 60 * 24;

  return Math.floor((today - startDate) / dayInMilliseconds);
}

function getDailyBackground() {
  const dayNumber = getDayNumber();
  return dailyBackgrounds[Math.abs(dayNumber) % dailyBackgrounds.length];
}

function applyDailyBackground() {
  const background = getDailyBackground();

  document.body.classList.remove(...backgroundClasses);
  document.body.classList.add(background.className);
}

function updateTodayDate() {
  if (!todayDateElement) return;

  const today = new Date();

  const formattedDate = today.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long"
  });

  todayDateElement.textContent = `сегодня · ${formattedDate}`;
}

function getFormattedSaveDate() {
  const today = new Date();

  return today.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function updateDailyFooterPhrase() {
  const dayNumber = getDayNumber();
  const phrase = footerPhrases[Math.abs(dayNumber) % footerPhrases.length];

  if (footerPhraseElement) {
    footerPhraseElement.textContent = phrase;
  }

  if (welcomeFooterPhraseElement) {
    welcomeFooterPhraseElement.textContent = phrase;
  }
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
  hideSaveButton();
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
  hideSaveButton();
}

function showSaveButton() {
  if (saveImageButton) {
    saveImageButton.classList.remove("is-hidden");
  }
}

function hideSaveButton() {
  if (saveImageButton) {
    saveImageButton.classList.add("is-hidden");
  }
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

function getDifferentRandomItem(items, storageKey) {
  const lastItem = localStorage.getItem(storageKey);
  const availableItems = items.filter(item => item !== lastItem);
  const chosenItem = getRandomItem(availableItems.length ? availableItems : items);

  localStorage.setItem(storageKey, chosenItem);

  return chosenItem;
}

function getDifferentTemplateIndex(templates, storageKey) {
  const lastIndex = Number(localStorage.getItem(storageKey));
  const indexes = templates.map((_, index) => index);
  const availableIndexes = indexes.filter(index => index !== lastIndex);
  const chosenIndex = getRandomItem(availableIndexes.length ? availableIndexes : indexes);

  localStorage.setItem(storageKey, String(chosenIndex));

  return chosenIndex;
}

function getNameOpener() {
  const opener = getDifferentRandomItem(nameOpeners, nameLastOpenerKey);
  return opener.replace("{name}", getName());
}

function saveUniqueMessage(usedKey, message) {
  let usedMessages = JSON.parse(localStorage.getItem(usedKey) || "[]");

  if (!usedMessages.includes(message)) {
    usedMessages.push(message);
  }

  if (usedMessages.length > 1200) {
    usedMessages = usedMessages.slice(-1200);
  }

  localStorage.setItem(usedKey, JSON.stringify(usedMessages));
}

function generateUniqueMessage(usedKey, generator) {
  let usedMessages = JSON.parse(localStorage.getItem(usedKey) || "[]");
  const maxAttempts = 280;

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
    () => `${getNameOpener()} ${getRandomItem(moodScenes)}. ${getRandomItem(moodEndings)}`,
    () => `${getNameOpener()} ${capitalizeFirstLetter(getRandomItem(moodScenes))}. ${getRandomItem(moodEndings)}`,
    () => `${getNameOpener()} если коротко: ${getRandomItem(moodScenes)}. ${getRandomItem(moodEndings)}`,
    () => `${getNameOpener()} сегодня так: ${getRandomItem(moodScenes)}. ${getRandomItem(moodEndings)}`,
    () => `${getNameOpener()} хорошая новость: ${getRandomItem(moodScenes)}. ${getRandomItem(moodEndings)}`,
    () => `${getNameOpener()} маленький отчёт из отдела абсурда: ${getRandomItem(moodScenes)}. ${getRandomItem(moodEndings)}`,
    () => `${getNameOpener()} по внутренней сводке: ${getRandomItem(moodScenes)}. ${getRandomItem(moodEndings)}`,
    () => `${getNameOpener()} настроение докладывает: ${getRandomItem(moodScenes)}. ${getRandomItem(moodEndings)}`
  ];

  return generateUniqueMessage(moodUsedKey, () => {
    const templateIndex = getDifferentTemplateIndex(templates, moodLastTemplateKey);
    return templates[templateIndex]();
  });
}

function generateWisdomMessage() {
  const templates = [
    () => `${getNameOpener()} ${getRandomItem(wisdomThoughts)}. ${getRandomItem(wisdomEndings)}`,
    () => `${getNameOpener()} совет дня: ${getRandomItem(wisdomThoughts)}. ${getRandomItem(wisdomEndings)}`,
    () => `${getNameOpener()} сегодня попробуй вот что: ${getRandomItem(wisdomThoughts)}. ${getRandomItem(wisdomEndings)}`,
    () => `${getNameOpener()} важная мысль без занудства: ${getRandomItem(wisdomThoughts)}. ${getRandomItem(wisdomEndings)}`,
    () => `${getNameOpener()} можно так: ${getRandomItem(wisdomThoughts)}. ${getRandomItem(wisdomEndings)}`,
    () => `${getNameOpener()} тихий совет: ${getRandomItem(wisdomThoughts)}. ${getRandomItem(wisdomEndings)}`,
    () => `${getNameOpener()} сегодня лучше помнить вот это: ${getRandomItem(wisdomThoughts)}. ${getRandomItem(wisdomEndings)}`,
    () => `${getNameOpener()} без большого драматического оркестра: ${getRandomItem(wisdomThoughts)}. ${getRandomItem(wisdomEndings)}`
  ];

  return generateUniqueMessage(wisdomUsedKey, () => {
    const templateIndex = getDifferentTemplateIndex(templates, wisdomLastTemplateKey);
    return templates[templateIndex]();
  });
}

function generatePraiseMessage() {
  const templates = [
    () => `${getNameOpener()} ${getRandomItem(praiseLines)}. ${getRandomItem(praiseEndings)}`,
    () => `${getNameOpener()} хочу напомнить: ${getRandomItem(praiseLines)}. ${getRandomItem(praiseEndings)}`,
    () => `${getNameOpener()} если честно: ${getRandomItem(praiseLines)}. ${getRandomItem(praiseEndings)}`,
    () => `${getNameOpener()} важный факт: ${getRandomItem(praiseLines)}. ${getRandomItem(praiseEndings)}`,
    () => `${getNameOpener()} смотри, какая штука: ${getRandomItem(praiseLines)}. ${getRandomItem(praiseEndings)}`,
    () => `${getNameOpener()} это стоит сказать вслух: ${getRandomItem(praiseLines)}. ${getRandomItem(praiseEndings)}`,
    () => `${getNameOpener()} маленькая честная похвала: ${getRandomItem(praiseLines)}. ${getRandomItem(praiseEndings)}`,
    () => `${getNameOpener()} я бы это не пропускала: ${getRandomItem(praiseLines)}. ${getRandomItem(praiseEndings)}`
  ];

  return generateUniqueMessage(praiseUsedKey, () => {
    const templateIndex = getDifferentTemplateIndex(templates, praiseLastTemplateKey);
    return templates[templateIndex]();
  });
}

function capitalizeFirstLetter(text) {
  if (!text) return text;
  return text.charAt(0).toLocaleUpperCase("ru-RU") + text.slice(1);
}

function showMood() {
  trackEvent("mood_clicked");
  emojiElement.textContent = getRandomItem(["☀︎", "✦", "☁︎", "♡", "☽", "✶", "✺"]);
  messageElement.textContent = generateMoodMessage();
  showSaveButton();
}

function showWisdom() {
  trackEvent("wisdom_clicked");
  emojiElement.textContent = getRandomItem(["☽", "◌", "◇", "✧", "○", "✦"]);
  messageElement.textContent = generateWisdomMessage();
  showSaveButton();
}

function showPraise() {
  trackEvent("praise_clicked");
  emojiElement.textContent = getRandomItem(["♡", "✶", "✺", "❋", "✦", "✧"]);
  messageElement.textContent = generatePraiseMessage();
  showSaveButton();
}

async function saveCurrentPhraseAsImage() {
  trackEvent("image_save_clicked");

  const text = messageElement.textContent.trim();
  const defaultText = "Нажми кнопку — и приложение скажет что-нибудь нужное.";

  if (!text || text === defaultText) {
    return;
  }

  const canvas = document.createElement("canvas");
  const size = 1080;
  const padding = 96;

  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  const dailyBackground = getDailyBackground();

  const gradient = context.createRadialGradient(
    size * 0.25,
    size * 0.2,
    40,
    size * 0.5,
    size * 0.5,
    size
  );

  gradient.addColorStop(0, dailyBackground.canvas[0]);
  gradient.addColorStop(0.45, dailyBackground.canvas[1]);
  gradient.addColorStop(1, dailyBackground.canvas[2]);

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  dailyBackground.glows.forEach(glow => {
    drawSoftGlow(context, glow[0], glow[1], glow[2], glow[3]);
  });

  context.fillStyle = "rgba(255, 255, 255, 0.9)";
  context.font = "56px Georgia, serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("✦", size / 2, 150);

  context.fillStyle = "rgba(255, 255, 255, 0.56)";
  context.font = "30px -apple-system, BlinkMacSystemFont, sans-serif";
  context.fillText(getFormattedSaveDate(), size / 2, 220);

  context.fillStyle = "#f7f2e8";
  context.font = "54px Georgia, serif";

  const lines = wrapText(context, text, size - padding * 2);
  const lineHeight = 72;
  const totalTextHeight = lines.length * lineHeight;
  let startY = size / 2 - totalTextHeight / 2 + 70;

  lines.forEach((line, index) => {
    context.fillText(line, size / 2, startY + index * lineHeight);
  });

  context.fillStyle = "rgba(255, 255, 255, 0.46)";
  context.font = "30px -apple-system, BlinkMacSystemFont, sans-serif";
  context.fillText("нужные слова", size / 2, size - 110);

  canvas.toBlob(async blob => {
    if (!blob) return;

    const file = new File([blob], "nuzhnye-slova.png", {
      type: "image/png"
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Нужные слова",
          text: "Сохранила нужные слова"
        });
        return;
      } catch (error) {
        // Если пользователь закрыл меню «Поделиться», просто скачиваем файл.
      }
    }

    const imageUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "nuzhnye-slova.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(imageUrl);
    }, 1000);
  }, "image/png");
}

function drawSoftGlow(context, x, y, radius, color) {
  const glow = context.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, color);
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");

  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function wrapText(context, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = context.measureText(testLine).width;

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

document.getElementById("saveNameButton").addEventListener("click", saveName);
document.getElementById("resetNameButton").addEventListener("click", resetName);
document.getElementById("moodButton").addEventListener("click", showMood);
document.getElementById("wisdomButton").addEventListener("click", showWisdom);
document.getElementById("praiseButton").addEventListener("click", showPraise);

if (saveImageButton) {
  saveImageButton.addEventListener("click", saveCurrentPhraseAsImage);
}

if (authorLink) {
  authorLink.addEventListener("click", () => {
    trackEvent("author_contact_clicked");
  });
}

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
