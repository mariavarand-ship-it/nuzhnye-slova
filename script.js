function trackEvent(eventName) {
  if (typeof gtag === "function") {
    gtag("event", eventName);
  }
}

const API_URL = "https://nuzhnye-slova-api.vercel.app/api/generate";

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

const saveNameButton = document.getElementById("saveNameButton");
const resetNameButton = document.getElementById("resetNameButton");
const moodButton = document.getElementById("moodButton");
const wisdomButton = document.getElementById("wisdomButton");
const praiseButton = document.getElementById("praiseButton");

const nameKey = "childhoodName";
const nameLastOpenerKey = "nameLastOpener";

let loadingAnimationTimer = null;

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

const nameOpeners = [
  "{name},",
  "{name}.",
  "{name}, слушай.",
  "{name}, смотри.",
  "{name}, маленькая весточка.",
  "{name}, важное донесение.",
  "{name}, без паники.",
  "{name}, между нами.",
  "{name}, официально сообщаем.",
  "{name}, по секрету.",
  "{name}, тихонько скажу.",
  "{name}, вот что нашлось.",
  "{name}, есть сообщение.",
  "{name}, держи нужное слово.",
  "{name}, сегодня можно так."
];

const moodLoadingTexts = [
  "Внутренний диспетчер надевает наушники и слушает настроение...",
  "Сейчас посмотрим, что там шуршит под сердцем...",
  "Минутку, маленький ёжик проверяет приборы настроения...",
  "Облако-практикант уже несёт сводку изнутри...",
  "Сейчас лампа внутри мигнёт и что-нибудь поймёт...",
  "Настроение ушло за булочкой, но уже возвращается...",
  "Тихо-тихо, внутренний самовар собирает пар и смысл..."
];

const wisdomLoadingTexts = [
  "Самовар мудрости закипает, но без нравоучений...",
  "Маленькая мысль дня ищет тапочки...",
  "Сейчас облако сформулирует что-то негромкое...",
  "Минутку, внутренний архивариус достаёт мягкую записку...",
  "Мудрость идёт пешком, зато без пафоса...",
  "Сейчас лампа подумает и не будет строить из себя солнце...",
  "Тихий совет уже проснулся, просто расчёсывает антенны..."
];

const praiseLoadingTexts = [
  "Внутренняя булочка подбирает похвалу потеплее...",
  "Сейчас маленький хор хороших слов встанет полукругом...",
  "Похвала гладит воротничок и готовится выйти...",
  "Минутку, диспетчер нежности ищет правильную кнопку...",
  "Сейчас достанем хорошее слово из мягкого кармана...",
  "Внутренний ёжик репетирует комплимент без плаката...",
  "Похвала уже идёт, просто несёт с собой плед..."
];

function startApp() {
  if (saveImageButton) {
    saveImageButton.textContent = "Поделиться";
  }

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

function getNameHash() {
  const savedName = localStorage.getItem(nameKey) || "guest";
  let hash = 0;

  for (let i = 0; i < savedName.length; i++) {
    hash = hash + savedName.charCodeAt(i) * (i + 1);
  }

  return hash;
}

function getDailyBackground() {
  const dayNumber = getDayNumber();
  const nameHash = getNameHash();

  return dailyBackgrounds[Math.abs(dayNumber + nameHash) % dailyBackgrounds.length];
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
  applyDailyBackground();

  setTimeout(() => {
    nameInput.focus();
  }, 100);
}

function showMainScreen(name) {
  applyDailyBackground();

  nameScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");

  messageElement.textContent = `${formatName(name)}, нажми кнопку — и приложение скажет что-нибудь нужное.`;
  emojiElement.textContent = "✦";

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
  const availableItems = items.filter((item) => item !== lastItem);
  const chosenItem = getRandomItem(availableItems.length ? availableItems : items);

  localStorage.setItem(storageKey, chosenItem);

  return chosenItem;
}

function getNameOpener() {
  const opener = getDifferentRandomItem(nameOpeners, nameLastOpenerKey);
  return opener.replace("{name}", getName());
}

function setButtonsDisabled(isDisabled) {
  [moodButton, wisdomButton, praiseButton].forEach((button) => {
    if (button) {
      button.disabled = isDisabled;
    }
  });
}

async function generateAIMessage(type) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("AI generation error:", data);
    throw new Error(data?.error || "AI generation failed");
  }

  if (!data.message) {
    throw new Error("Empty AI message");
  }

  return data.message.trim();
}

function startLoadingAnimation() {
  const loadingEmojis = ["·", "✦", "☽", "♡", "☁︎", "✺", "◌"];
  let step = 0;

  stopLoadingAnimation();

  loadingAnimationTimer = setInterval(() => {
    const leftEmoji = loadingEmojis[step % loadingEmojis.length];
    const rightEmoji = loadingEmojis[(step + 3) % loadingEmojis.length];

    emojiElement.textContent = `${leftEmoji} ${rightEmoji}`;

    step = step + 1;
  }, 380);
}

function stopLoadingAnimation() {
  if (loadingAnimationTimer) {
    clearInterval(loadingAnimationTimer);
    loadingAnimationTimer = null;
  }
}

async function showAIMessage(type, eventName, emojiList, loadingText) {
  trackEvent(eventName);

  emojiElement.textContent = getRandomItem(emojiList);
  messageElement.textContent = loadingText;

  hideSaveButton();
  setButtonsDisabled(true);
  startLoadingAnimation();

  try {
    const message = await generateAIMessage(type);

    stopLoadingAnimation();

    emojiElement.textContent = getRandomItem(emojiList);
    messageElement.textContent = `${getNameOpener()} ${message}`;

    showSaveButton();
  } catch (error) {
    console.error(error);

    stopLoadingAnimation();

    emojiElement.textContent = "☁︎";
    messageElement.textContent =
      "Что-то зашуршало не там. Попробуй ещё раз — внутренний ёжик уже чинит проводок.";

    showSaveButton();
  } finally {
    stopLoadingAnimation();
    setButtonsDisabled(false);
  }
}

function showMood() {
  showAIMessage(
    "mood",
    "mood_clicked",
    ["☀︎", "✦", "☁︎", "♡", "☽", "✶", "✺"],
    getRandomItem(moodLoadingTexts)
  );
}

function showWisdom() {
  showAIMessage(
    "wisdom",
    "wisdom_clicked",
    ["☽", "◌", "◇", "✧", "○", "✦"],
    getRandomItem(wisdomLoadingTexts)
  );
}

function showPraise() {
  showAIMessage(
    "praise",
    "praise_clicked",
    ["♡", "✶", "✺", "❋", "✦", "✧"],
    getRandomItem(praiseLoadingTexts)
  );
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

  dailyBackground.glows.forEach((glow) => {
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
  const startY = size / 2 - totalTextHeight / 2 + 70;

  lines.forEach((line, index) => {
    context.fillText(line, size / 2, startY + index * lineHeight);
  });

  context.fillStyle = "rgba(255, 255, 255, 0.46)";
  context.font = "30px -apple-system, BlinkMacSystemFont, sans-serif";
  context.fillText("нужные слова", size / 2, size - 110);

  canvas.toBlob(async (blob) => {
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

  words.forEach((word) => {
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

if (saveNameButton) {
  saveNameButton.addEventListener("click", saveName);
}

if (resetNameButton) {
  resetNameButton.addEventListener("click", resetName);
}

if (moodButton) {
  moodButton.addEventListener("click", showMood);
}

if (wisdomButton) {
  wisdomButton.addEventListener("click", showWisdom);
}

if (praiseButton) {
  praiseButton.addEventListener("click", showPraise);
}

if (saveImageButton) {
  saveImageButton.addEventListener("click", saveCurrentPhraseAsImage);
}

if (authorLink) {
  authorLink.addEventListener("click", () => {
    trackEvent("author_contact_clicked");
  });
}

if (nameInput) {
  nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveName();
    }
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

startApp();
