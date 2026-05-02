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
  "внутренний огурец",
  "карманный самовар",
  "чайник с амбициями",
  "сонная табуретка",
  "невидимый пельмень",
  "зонтик для мыслей",
  "пугливый банан",
  "луна в тапках",
  "булочка судьбы",
  "серьёзная морковка",
  "внутренний кабачок",
  "домашний метеорит",
  "носок-философ",
  "комнатный гром",
  "вежливый карась",
  "рассеянный вторник",
  "крошечный дирижабль",
  "смущённая кастрюля",
  "тихий фейерверк",
  "внутренний пингвин",
  "ложка с дипломом",
  "пирожок спокойствия",
  "сапог-оптимист",
  "шкаф с секретом",
  "маленький барабан внутри"
];

const moodActions = [
  "съел половину тревоги",
  "объявил день пригодным для жизни",
  "ушёл в отпуск вместо паники",
  "попросил не драматизировать",
  "надел праздничные носки",
  "снял с мира серьёзное лицо",
  "принёс одну маленькую радость",
  "отменил внутреннюю скуку",
  "подвинул грусть локтем",
  "включил режим нелепого уюта",
  "спрятал печаль в комод",
  "тихо подмигнул",
  "разрешил не геройствовать",
  "выдал сердцу плед",
  "заменил тревогу на булочку",
  "подписал мирный договор с утром",
  "добавил в день немного абсурда",
  "перестал устраивать драму",
  "нашёл запасной смысл",
  "поставил хаос в очередь",
  "погладил день против шерсти",
  "позвал радость из-под стола",
  "перевёл мрак на полставки",
  "сделал вид, что так и было",
  "выдал миру справку о несерьёзности"
];

const moodResults = [
  "это уже удача",
  "можно жить",
  "день стал мягче",
  "это хорошая новость",
  "мир уже не такой вредный",
  "всё не зря",
  "настроение перестало дуться",
  "это вполне победа",
  "всё не безнадёжно",
  "этого уже достаточно",
  "день больше не кусается",
  "сердце может выдохнуть",
  "даже понедельник растерялся",
  "стало чуть смешнее",
  "мрак немного опозорился",
  "теперь всё терпимо",
  "хаос потерял авторитет",
  "жизнь уже не такая колючая",
  "можно не паниковать",
  "стало на один светлее",
  "драма сняла шляпу",
  "внутри появился смешной воздух",
  "тревога ушла за хлебом",
  "день получил мягкий угол",
  "радость показала нос"
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
  "{name}, слушай,",
  "{name},",
  "{name}, сегодня так,",
  "{name}, вот что важно,"
];

function startApp() {
  applyRandomBackground();
  hideSaveButton();

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
    () => `${getNameOpener()} сегодня в деле ${getRandomItem(moodObjects)}: ${getRandomItem(moodActions)} — ${getRandomItem(moodResults)}.`,
    () => `${getNameOpener()} срочная новость: ${getRandomItem(moodObjects)} ${getRandomItem(moodActions)} — ${getRandomItem(moodResults)}.`,
    () => `${getNameOpener()} если что, у нас тут ${getRandomItem(moodObjects)}: ${getRandomItem(moodActions)} — ${getRandomItem(moodResults)}.`,
    () => `${getNameOpener()} для поднятия духа назначается ${getRandomItem(moodObjects)}: ${getRandomItem(moodActions)} — ${getRandomItem(moodResults)}.`,
    () => `${getNameOpener()} у мира сломалось серьёзное лицо: ${getRandomItem(moodObjects)} ${getRandomItem(moodActions)}.`,
    () => `${getNameOpener()} ${getRandomItem(moodObjects)} сообщает: ${getRandomItem(moodResults)}.`,
    () => `${getNameOpener()} ${getRandomItem(moodObjects)} уже всё понял — ${getRandomItem(moodResults)}.`
  ];

  return generateUniqueMessage(moodUsedKey, () => getRandomItem(templates)());
}

function generateWisdomMessage() {
  const templates = [
    () => `${getNameOpener()} иногда важно ${getRandomItem(wisdomActions)} — ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} сегодня попробуй ${getRandomItem(wisdomActions)} — так ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} мудрость начинается там, где получается ${getRandomItem(wisdomActions)}, и тогда ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} не нужно всё решать сразу: достаточно ${getRandomItem(wisdomActions)}, чтобы ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} когда становится трудно, попробуй ${getRandomItem(wisdomActions)} — так ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} даже если мысль шумит как кастрюля, можно ${getRandomItem(wisdomActions)} — и тогда ${getRandomItem(wisdomResults)}.`,
    () => `${getNameOpener()} один спокойный жест, ${getRandomItem(wisdomActions)}, иногда делает так, что ${getRandomItem(wisdomResults)}.`
  ];

  return generateUniqueMessage(wisdomUsedKey, () => getRandomItem(templates)());
}

function generatePraiseMessage() {
  const templates = [
    () => `${getNameOpener()} ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} ${getRandomItem(praiseActions)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} редкая способность уже есть — ${getRandomItem(praiseActions)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} хочется напомнить: ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} даже сегодня, даже не в идеальной форме, ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} в этом странном дне есть факт — ${getRandomItem(praiseActions)}, ${getRandomItem(praiseEndings)}.`,
    () => `${getNameOpener()} внутренний маленький оркестр подтверждает: ${getRandomItem(praiseQualities)}, ${getRandomItem(praiseEndings)}.`
  ];

  return generateUniqueMessage(praiseUsedKey, () => getRandomItem(templates)());
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

  const gradient = context.createRadialGradient(
    size * 0.25,
    size * 0.2,
    40,
    size * 0.5,
    size * 0.5,
    size
  );

  gradient.addColorStop(0, "#2a2340");
  gradient.addColorStop(0.45, "#09090d");
  gradient.addColorStop(1, "#000000");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  drawSoftGlow(context, 180, 180, 220, "rgba(255, 255, 255, 0.09)");
  drawSoftGlow(context, 840, 820, 260, "rgba(180, 140, 255, 0.12)");
  drawSoftGlow(context, 820, 220, 190, "rgba(255, 180, 120, 0.08)");

  context.fillStyle = "rgba(255, 255, 255, 0.9)";
  context.font = "56px Georgia, serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("✦", size / 2, 160);

  context.fillStyle = "#f7f2e8";
  context.font = "54px Georgia, serif";

  const lines = wrapText(context, text, size - padding * 2);
  const lineHeight = 72;
  const totalTextHeight = lines.length * lineHeight;
  let startY = size / 2 - totalTextHeight / 2 + 36;

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
