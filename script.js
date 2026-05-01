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
const wisdomLastStartKey = "wisdomLastStart";

const moodStarts = [
  "сегодня твой внутренний чайник",
  "пусть маленькая радость",
  "если день пришёл без настроения,",
  "твоя улыбка",
  "пусть тревога",
  "сегодня мир",
  "даже если облака ворчат,",
  "пусть смешная мелочь",
  "если настроение спряталось под диван,",
  "сегодня можно",
  "пусть этот день",
  "если внутри идёт дождь,",
  "твоя внутренняя лампочка",
  "пусть усталость",
  "даже самый странный вторник",
  "если жизнь шуршит пакетом,",
  "сегодня твоё сердце",
  "пусть грусть",
  "если мысли скачут,",
  "пусть у дня",
  "сегодня случайная звезда",
  "пусть твой внутренний кот",
  "если мир надел серьёзное лицо,",
  "сегодня маленькое чудо",
  "пусть твоя душа",
  "если всё вокруг скрипит,",
  "сегодня даже тень",
  "пусть хорошая новость",
  "если день похож на старый лифт,",
  "сегодня можно без героизма"
];

const moodMiddles = [
  "смотрит на тебя с уважением",
  "приносит тебе тёплый знак",
  "делает вид, что всё идёт по плану",
  "надевает смешные носки",
  "тихо садится рядом и не командует",
  "улыбается одним уголком",
  "просит чашку чая и перестаёт шуметь",
  "прыгает через лужу с достоинством",
  "прячется в кармане для радости",
  "становится мягче на один вдох",
  "дружит с твоей усталостью",
  "забывает, зачем пришла пугать",
  "светит не ярко, а уютно",
  "отходит в сторону и не мешает жить",
  "пишет тебе записку: «держись нежно»",
  "решает быть добрее, чем собирался",
  "несёт маленький фонарик",
  "садится на подоконник и молчит",
  "пляшут нестройно, но весело",
  "появляется карман для чуда",
  "выходит из-за угла с булочкой",
  "делает маленький реверанс",
  "перестаёт притворяться катастрофой",
  "включает тихий режим заботы",
  "заворачивается в плед и мирится",
  "рисует улыбку на полях",
  "становится похожим на мягкую лампу",
  "просит не ругать себя",
  "превращается в смешной знак",
  "шепчет: «ещё не всё пропало»"
];

const moodEnds = [
  "и это уже неплохое начало.",
  "и день становится чуть менее колючим.",
  "и жить становится смешнее.",
  "и внутри появляется место для воздуха.",
  "и мир перестаёт быть таким начальником.",
  "и ты снова оказываешься на своей стороне.",
  "и плохое настроение теряет важный вид.",
  "и даже хаос выглядит почти декоративно.",
  "и одна маленькая радость уже считается.",
  "и можно не побеждать дракона прямо сейчас.",
  "и это достойно уважительного кивка от луны.",
  "и всё плохое становится размером с горошину.",
  "и день уже не такой деревянный.",
  "и можно быть живой, а не идеальной.",
  "и где-то внутри тихо включается свет.",
  "и настроение возвращается без лишнего шума.",
  "и тревога не получает главный микрофон.",
  "и ты не обязана доказывать, что справляешься.",
  "и даже обычный вечер может стать уютным.",
  "и жизнь слегка подмигивает из-за занавески.",
  "и всё становится не идеально, но выносимо.",
  "и это тоже маленькая победа.",
  "и можно дышать чуть свободнее.",
  "и мир внезапно становится менее суровым.",
  "и твоя усталость получает мягкий стул.",
  "и настроение перестаёт хмурить брови.",
  "и где-то рядом появляется смешной смысл.",
  "и сегодня уже не кажется совсем пустым.",
  "и сердце перестаёт спорить с погодой.",
  "и день получает шанс исправиться."
];

const wisdomStarts = [
  "не каждую мысль нужно продолжать:",
  "спокойствие начинается там, где",
  "если путь кажется длинным,",
  "отпустить — значит",
  "когда сердце становится мягче,",
  "терпение — это",
  "один ясный вдох",
  "не превращай временное состояние",
  "мудрость иногда говорит тихо:",
  "сострадание к себе начинается там, где",
  "если внутри много шума,",
  "покой приходит не тогда, когда",
  "не всякая эмоция",
  "когда ты перестаёшь спорить с моментом,",
  "если ответ не приходит сразу,",
  "не держи прошлое",
  "внимание становится светом, когда",
  "мягкость не отменяет силы:",
  "если страх закрывает небо,",
  "каждый день можно начать заново,",
  "иногда ясность начинается с того, что",
  "не всё, что громко внутри,",
  "тишина становится опорой, когда",
  "если сердце устало,",
  "путь становится легче, когда",
  "не спеши отвечать миру из раны:",
  "внутренняя свобода начинается там, где",
  "если тревога просит гарантий,",
  "иногда самый мудрый шаг —",
  "не делай из одной волны"
];

const wisdomMiddles = [
  "ты замечаешь её и отпускаешь",
  "ты возвращаешься к дыханию",
  "ты выбираешь один честный шаг",
  "ты перестаёшь держать камень в руках",
  "ты не добавляешь жестокости к боли",
  "ты позволяешь паузе быть частью пути",
  "ты слушаешь тело раньше шума ума",
  "ты перестаёшь верить каждой тревожной мысли",
  "ты выбираешь ясность вместо спешки",
  "ты смотришь на себя без наказания",
  "ты не требуешь от себя цветения зимой",
  "ты разрешаешь себе быть в процессе",
  "ты не превращаешь волну в целое море",
  "ты перестаёшь воевать с тем, что уже есть",
  "ты даёшь тишине немного места",
  "ты не называешь ошибку своим именем",
  "ты кладёшь жизнь туда, где твоё внимание",
  "ты остаёшься доброй без самопредательства",
  "ты помнишь, что облако не является небом",
  "ты возвращаешься к себе без громких обещаний",
  "ты перестаёшь торопить себя",
  "ты отличаешь чувство от приговора",
  "ты оставляешь прошлому его место",
  "ты выбираешь мягкую честность",
  "ты не превращаешь усталость в обвинение",
  "ты позволяешь себе не знать всего",
  "ты замечаешь промежуток между чувством и действием",
  "ты бережёшь внимание от лишнего шума",
  "ты делаешь меньше, но честнее",
  "ты не споришь с дождём, а ищешь зонт"
];

const wisdomEnds = [
  "и в этом уже есть свобода.",
  "и мир внутри становится просторнее.",
  "и следующий шаг перестаёт пугать.",
  "и боль перестаёт быть всей твоей жизнью.",
  "и тишина становится не пустотой, а опорой.",
  "и ты снова оказываешься на своей стороне.",
  "и маленькое действие становится достаточным.",
  "и то, что меняется, больше не становится тюрьмой.",
  "и сердце учится не воевать с каждым углом мира.",
  "и день получает шанс стать мягче.",
  "и внутренний критик теряет должность.",
  "и ты перестаёшь быть полем битвы.",
  "и даже трудный день становится практикой.",
  "и в тебе появляется место для света.",
  "и дыхание снова становится домом.",
  "и прошлое перестаёт командовать настоящим.",
  "и внимание становится мягким фонарём.",
  "и сила перестаёт быть жёсткой.",
  "и страх становится просто погодой.",
  "и жизнь снова разговаривает с тобой.",
  "и ты перестаёшь мерить себя одной ошибкой.",
  "и в настоящем появляется воздух.",
  "и то, что было тяжёлым, теряет власть быть всем.",
  "и путь снова становится человеческим.",
  "и даже пауза оказывается движением.",
  "и ты не обязана быть каменной, чтобы быть сильной.",
  "и внутри становится чуть меньше войны.",
  "и забота о себе перестаёт казаться лишней.",
  "и один вдох становится началом возвращения.",
  "и жизнь не требует от тебя идеальности."
];

const praiseStarts = [
  "ты",
  "в тебе",
  "у тебя",
  "сегодня ты",
  "даже когда ты устаёшь, ты",
  "твоя нежность",
  "твой взгляд",
  "твоя внутренняя сила",
  "твои маленькие шаги",
  "ты уже",
  "твоя чувствительность",
  "твоя смелость",
  "твой способ видеть мир",
  "в твоём хаосе",
  "ты умеешь",
  "в твоей мягкости",
  "твоя усталость",
  "твои идеи",
  "ты постепенно",
  "твоя честность",
  "твоя внимательность",
  "в твоём способе думать",
  "ты даже в сомнениях",
  "твоя доброта",
  "в тебе тихо",
  "ты не громкая победа, но",
  "твоя способность продолжать",
  "твой внутренний свет",
  "ты в своём темпе",
  "твоя настоящесть"
];

const praiseMiddles = [
  "редкий зверь с тёплым светом",
  "умеешь замечать важное",
  "держишься честнее, чем думаешь",
  "создаёшь смысл из мелочей",
  "не теряешь живое внутри",
  "имеешь собственный красивый почерк",
  "справляешься без лишних фанфар",
  "можешь быть мягкой и сильной одновременно",
  "несёшь в себе умный огонёк",
  "становишься своей опорой",
  "не поломка, а тонкая настройка",
  "не громкая, но настоящая",
  "делает обычное объёмным",
  "есть странная, но красивая логика",
  "делать из простого живое",
  "много силы без лишнего шума",
  "не отменяет твою ценность",
  "похожи на маленьких птиц",
  "собираешь себя бережно",
  "делает тебя настоящей",
  "видит оттенки там, где другие видят плоскость",
  "есть собственная музыка",
  "осталась живой и чувствующей",
  "не требует доказательств",
  "есть редкое тепло",
  "ты тихая сила",
  "важнее, чем тебе кажется",
  "светит без объявления",
  "движешься честно",
  "делает мир менее пластиковым"
];

const praiseEnds = [
  "и это очень заметно.",
  "даже если никто не хлопает.",
  "и это достойно уважения.",
  "даже в плохую погоду.",
  "и мир от этого становится чуть менее плоским.",
  "даже когда внутренний критик бурчит.",
  "и это не надо доказывать.",
  "и это уже большая работа.",
  "и это красиво без дополнительных условий.",
  "и это не черновик, а жизнь.",
  "и с этим не нужно спорить.",
  "и это делает тебя редкой.",
  "и рядом с этим хочется быть бережнее.",
  "и в этом есть настоящий стиль.",
  "и это не исчезает в трудные дни.",
  "и это твоя тихая магия.",
  "и ты имеешь право это признать.",
  "и это заслуживает мягкого света.",
  "и это больше, чем кажется.",
  "и это уже повод быть к себе добрее.",
  "и это не надо заслуживать заново.",
  "и в этом есть сила без шума.",
  "и это делает тебя живой.",
  "и это достойно не критики, а заботы.",
  "и это не случайность.",
  "и это уже часть твоей красоты.",
  "и ты можешь опереться на это.",
  "и это видно даже сквозь усталость.",
  "и это не отменяется плохим днём.",
  "и это очень по-настоящему."
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
  messageElement.textContent = `${name}, нажми кнопку — и приложение скажет что-нибудь нужное.`;
}

function getName() {
  return localStorage.getItem(nameKey) || "солнышко";
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function lowerFirstLetter(text) {
  if (!text) return text;
  return text.charAt(0).toLocaleLowerCase("ru-RU") + text.slice(1);
}

function withName(text) {
  return `${getName()}, ${lowerFirstLetter(text)}`;
}

function generateMessage(starts, middles, ends, usedKey) {
  let usedMessages = JSON.parse(localStorage.getItem(usedKey) || "[]");
  const maxAttempts = 120;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const message = `${getRandomItem(starts)} ${getRandomItem(middles)} ${getRandomItem(ends)}`;

    if (!usedMessages.includes(message)) {
      usedMessages.push(message);

      if (usedMessages.length > 500) {
        usedMessages = usedMessages.slice(-500);
      }

      localStorage.setItem(usedKey, JSON.stringify(usedMessages));
      return message;
    }
  }

  usedMessages = [];
  localStorage.setItem(usedKey, JSON.stringify(usedMessages));

  return `${getRandomItem(starts)} ${getRandomItem(middles)} ${getRandomItem(ends)}`;
}

function generateWisdomMessage() {
  let usedMessages = JSON.parse(localStorage.getItem(wisdomUsedKey) || "[]");
  const lastStart = localStorage.getItem(wisdomLastStartKey);

  const availableStarts = wisdomStarts.filter(start => start !== lastStart);
  const maxAttempts = 150;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const start = getRandomItem(availableStarts);
    const middle = getRandomItem(wisdomMiddles);
    const end = getRandomItem(wisdomEnds);

    const message = `${start} ${middle} ${end}`;

    if (!usedMessages.includes(message)) {
      usedMessages.push(message);

      if (usedMessages.length > 500) {
        usedMessages = usedMessages.slice(-500);
      }

      localStorage.setItem(wisdomUsedKey, JSON.stringify(usedMessages));
      localStorage.setItem(wisdomLastStartKey, start);

      return message;
    }
  }

  usedMessages = [];
  localStorage.setItem(wisdomUsedKey, JSON.stringify(usedMessages));

  const start = getRandomItem(availableStarts);
  const message = `${start} ${getRandomItem(wisdomMiddles)} ${getRandomItem(wisdomEnds)}`;

  localStorage.setItem(wisdomLastStartKey, start);

  return message;
}

function showMood() {
  trackEvent("mood_clicked");

  emojiElement.textContent = getRandomItem(["☀︎", "✦", "☁︎", "♡", "☽"]);

  const text = generateMessage(
    moodStarts,
    moodMiddles,
    moodEnds,
    moodUsedKey
  );

  if (Math.random() > 0.5) {
    messageElement.textContent = withName(text);
  } else {
    messageElement.textContent = text;
  }
}

function showWisdom() {
  trackEvent("wisdom_clicked");

  emojiElement.textContent = getRandomItem(["☽", "◌", "◇", "✧", "○"]);

  const text = generateWisdomMessage();

  messageElement.textContent = withName(text);
}

function showPraise() {
  trackEvent("praise_clicked");

  emojiElement.textContent = getRandomItem(["♡", "✶", "✺", "❋", "✦"]);

  const text = generateMessage(
    praiseStarts,
    praiseMiddles,
    praiseEnds,
    praiseUsedKey
  );

  messageElement.textContent = withName(text);
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
