function trackEvent(eventName) {
  if (typeof gtag === "function") {
    gtag("event", eventName);
  }
}

const API_URL = "https://nuzhnye-slova-api.vercel.app/api/generate";
const APP_URL = "https://mariavarand-ship-it.github.io/nuzhnye-slova/";

const nameScreen = document.getElementById("nameScreen");
const mainScreen = document.getElementById("mainScreen");
const messageElement = document.getElementById("message");
const emojiElement = document.getElementById("emoji");
const saveImageButton = document.getElementById("saveImageButton");
const authorLink = document.getElementById("authorLink");
const todayDateElement = document.getElementById("todayDate");
const footerPhraseElement = document.getElementById("footerPhrase");
const welcomeFooterPhraseElement = document.getElementById("welcomeFooterPhrase");

const startButton = document.getElementById("startButton");
const resetNameButton = document.getElementById("resetNameButton");
const moodButton = document.getElementById("moodButton");
const wisdomButton = document.getElementById("wisdomButton");
const praiseButton = document.getElementById("praiseButton");

// Мягкое предложение имени
const namePrompt = document.getElementById("namePrompt");
const inlineNameInput = document.getElementById("inlineNameInput");
const inlineNameSave = document.getElementById("inlineNameSave");
const nameLaterButton = document.getElementById("nameLaterButton");

// OneSignal: кнопка уведомлений
const notifyButton = document.getElementById("notifyButton");

const nameKey = "childhoodName";
const onboardedKey = "onboarded";          // человек уже заходил в приложение
const namePromptSeenKey = "namePromptSeen"; // предложение имени уже показывали
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
  "bg-aurora",
  "bg-plum",
  "bg-ink",
  "bg-moss",
  "bg-ember",
  "bg-moon",
  "bg-candy"
];

const footerPhrases = [
  "заходи, когда захочешь",
  "я здесь, если понадобится слово",
  "приходи, когда будет нужно",
  "можно вернуться в любой момент",
  "тут можно взять ещё одно слово",
  "если станет шумно — заходи",
  "можно заглянуть просто так"
];

function startApp() {
  if (saveImageButton) {
    saveImageButton.textContent = "Поделиться";
    saveImageButton.classList.add("is-hidden");
  }

  applyDailyBackground();
  updateTodayDate();
  updateDailyFooterPhrase();

  const onboarded = localStorage.getItem(onboardedKey) === "1";

  // Новый человек видит стартовый экран. Кто уже заходил — сразу главный.
  if (onboarded) {
    showMainScreen();
  } else {
    showWelcomeScreen();
  }
}

function showWelcomeScreen() {
  if (!nameScreen || !mainScreen) return;

  nameScreen.classList.remove("hidden");
  mainScreen.classList.add("hidden");
}

function showMainScreen() {
  if (!nameScreen || !mainScreen || !messageElement || !emojiElement) return;

  applyDailyBackground();

  nameScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");

  emojiElement.textContent = "✦";

  const name = getSavedName();
  if (name) {
    messageElement.textContent =
      `${formatName(name)}, нажми кнопку — и приложение скажет что-нибудь нужное.`;
  } else {
    messageElement.textContent =
      "Нажми кнопку — и приложение скажет что-нибудь тёплое и нужное. Прямо для тебя.";
  }

  updateCornerLabel();
  hideSaveButton();
  hideNotifyButton();
  hideNamePrompt();
}

// Кнопка «Получить тёплые слова» на стартовом экране:
// заходим в приложение и сразу даём первое тёплое слово.
function enterApp() {
  localStorage.setItem(onboardedKey, "1");
  trackEvent("app_started");
  showMainScreen();
  showMood();
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
    hash += savedName.charCodeAt(i) * (i + 1);
  }

  return hash;
}

function applyDailyBackground() {
  const dayNumber = getDayNumber();
  const nameHash = getNameHash();
  const className = dailyBackgrounds[Math.abs(dayNumber + nameHash) % dailyBackgrounds.length];

  document.body.classList.remove(...backgroundClasses);
  document.body.classList.add(className);
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
  const phrase = footerPhrases[Math.abs(getDayNumber()) % footerPhrases.length];

  if (footerPhraseElement) {
    footerPhraseElement.textContent = phrase;
  }

  if (welcomeFooterPhraseElement) {
    welcomeFooterPhraseElement.textContent = phrase;
  }
}

function formatName(name) {
  if (!name) return "Солнышко";
  return name.charAt(0).toLocaleUpperCase("ru-RU") + name.slice(1);
}

function getSavedName() {
  return localStorage.getItem(nameKey) || "";
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function hideSaveButton() {
  if (saveImageButton) {
    saveImageButton.classList.add("is-hidden");
  }
}

function showSaveButton() {
  if (saveImageButton) {
    saveImageButton.classList.remove("is-hidden");
  }
}

// ===== Предложение имени =====
function updateCornerLabel() {
  if (!resetNameButton) return;
  resetNameButton.textContent = getSavedName() ? "сменить имя" : "добавить имя";
}

function hideNamePrompt() {
  if (namePrompt) {
    namePrompt.classList.add("is-hidden");
  }
}

// Открыть предложение имени вручную (по кнопке в углу)
function openNamePrompt() {
  if (!namePrompt) return;
  if (inlineNameInput) {
    inlineNameInput.value = getSavedName();
  }
  namePrompt.classList.remove("is-hidden");
  setTimeout(() => {
    if (inlineNameInput) inlineNameInput.focus();
  }, 50);
}

// Показать предложение само — только если имени нет и его ещё не показывали
function maybeShowNamePrompt() {
  if (!namePrompt) return;

  const hasName = !!getSavedName();
  const seen = localStorage.getItem(namePromptSeenKey) === "1";

  if (!hasName && !seen) {
    namePrompt.classList.remove("is-hidden");
  }
}

function saveInlineName() {
  if (!inlineNameInput) return;

  const name = inlineNameInput.value.trim();

  if (!name) {
    inlineNameInput.focus();
    return;
  }

  localStorage.setItem(nameKey, name);
  localStorage.setItem(namePromptSeenKey, "1");
  trackEvent("name_saved");

  hideNamePrompt();
  updateCornerLabel();

  // Тёплое подтверждение
  if (emojiElement) emojiElement.textContent = "♡";
  if (messageElement) {
    messageElement.textContent =
      `Готово, ${formatName(name)} 🤍 Теперь буду обращаться по имени.`;
  }
}

function dismissNamePrompt() {
  localStorage.setItem(namePromptSeenKey, "1");
  trackEvent("name_skipped");
  hideNamePrompt();
}

// ===== OneSignal: кнопка уведомлений =====
function hideNotifyButton() {
  if (notifyButton) {
    notifyButton.classList.add("is-hidden");
  }
}

function maybeShowNotifyButton() {
  if (!notifyButton) return;

  // Пока на экране висит предложение имени — уведомления не предлагаем,
  // чтобы не сваливать на человека две просьбы сразу.
  if (namePrompt && !namePrompt.classList.contains("is-hidden")) {
    return;
  }

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(function (OneSignal) {
    try {
      const alreadyAllowed = OneSignal.Notifications.permission === true;
      if (alreadyAllowed) {
        notifyButton.classList.add("is-hidden");
      } else {
        notifyButton.classList.remove("is-hidden");
      }
    } catch (error) {
      notifyButton.classList.remove("is-hidden");
    }
  });
}

function setButtonsDisabled(isDisabled) {
  [moodButton, wisdomButton, praiseButton].forEach((button) => {
    if (button) {
      button.disabled = isDisabled;
    }
  });
}

function startLoadingAnimation() {
  if (!messageElement || !emojiElement) return;

  const frames = [
    "✦",
    "✦ ·",
    "✦ · ·",
    "облако ищет слово ·",
    "тёплое уже в пути · ·",
    "самовар собирает смысл · · ·",
    "маленькая лампа шуршит ·"
  ];

  let step = 0;

  stopLoadingAnimation();

  emojiElement.textContent = "✦";
  messageElement.textContent = frames[0];

  loadingAnimationTimer = setInterval(() => {
    messageElement.textContent = frames[step % frames.length];
    step += 1;
  }, 420);
}

function stopLoadingAnimation() {
  if (loadingAnimationTimer) {
    clearInterval(loadingAnimationTimer);
    loadingAnimationTimer = null;
  }
}

async function generateAIMessage(type) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type, name: getSavedName() })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "AI generation failed");
  }

  if (!data.message) {
    throw new Error("Empty AI message");
  }

  return data.message.trim();
}

async function showAIMessage(type, eventName, emojiList) {
  trackEvent(eventName);

  hideSaveButton();
  setButtonsDisabled(true);
  startLoadingAnimation();

  try {
    const message = await generateAIMessage(type);

    stopLoadingAnimation();

    if (emojiElement) {
      emojiElement.textContent = getRandomItem(emojiList);
    }

    if (messageElement) {
      messageElement.textContent = message;
    }

    showSaveButton();
    // Сначала (после первого слова) — мягко предлагаем имя,
    // потом — уведомления (но не одновременно).
    maybeShowNamePrompt();
    maybeShowNotifyButton();
  } catch (error) {
    console.error(error);
    stopLoadingAnimation();

    if (emojiElement) {
      emojiElement.textContent = "☁︎";
    }

    if (messageElement) {
      const who = formatName(getSavedName() || "Солнышко");
      messageElement.textContent =
        `${who}, что-то зашуршало не там. Попробуй ещё раз — облако чинит проводок.`;
    }

    showSaveButton();
  } finally {
    stopLoadingAnimation();
    setButtonsDisabled(false);
  }
}

function showMood() {
  showAIMessage("mood", "mood_clicked", ["☀︎", "✦", "☁︎", "♡", "☽", "✶", "✺"]);
}

function showWisdom() {
  showAIMessage("wisdom", "wisdom_clicked", ["☽", "◌", "◇", "✧", "○", "✦"]);
}

function showPraise() {
  showAIMessage("praise", "praise_clicked", ["♡", "✶", "✺", "❋", "✦", "✧"]);
}

async function shareCurrentPhrase() {
  trackEvent("image_save_clicked");

  if (!messageElement) return;

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
  const cardBackground = getCardBackground();

  const gradient = context.createRadialGradient(
    size * 0.25,
    size * 0.2,
    40,
    size * 0.5,
    size * 0.5,
    size
  );

  gradient.addColorStop(0, cardBackground.canvas[0]);
  gradient.addColorStop(0.45, cardBackground.canvas[1]);
  gradient.addColorStop(1, cardBackground.canvas[2]);

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  cardBackground.glows.forEach((glow) => {
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

  // Подпись приложения
  context.fillStyle = "rgba(255, 255, 255, 0.46)";
  context.font = "30px -apple-system, BlinkMacSystemFont, sans-serif";
  context.fillText("нужные слова", size / 2, size - 116);

  // Деликатная ссылка, чтобы тот, кому отправили, мог найти приложение
  context.fillStyle = "rgba(255, 255, 255, 0.3)";
  context.font = "24px -apple-system, BlinkMacSystemFont, sans-serif";
  context.fillText("mariavarand-ship-it.github.io/nuzhnye-slova", size / 2, size - 72);

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, "image/png");
  });

  if (!blob) return;

  const file = new File([blob], "nuzhnye-slova.png", {
    type: "image/png"
  });

  const shareText =
    `Держи тёплые слова 🤍\nЕсли захочешь себе такие же — нажми:\n${APP_URL}`;

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "Нужные слова",
        text: shareText
      });

      trackEvent("shared_success");
      return;
    } catch (error) {
      // Пользователь мог закрыть меню «Поделиться».
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
}

function getCardBackground() {
  const currentClass = backgroundClasses.find((className) =>
    document.body.classList.contains(className)
  );

  const backgrounds = {
    "bg-aurora": {
      canvas: ["#2a2340", "#09090d", "#000000"],
      glows: [
        [180, 180, 220, "rgba(255, 255, 255, 0.09)"],
        [840, 820, 260, "rgba(180, 140, 255, 0.12)"],
        [820, 220, 190, "rgba(255, 180, 120, 0.08)"]
      ]
    },
    "bg-plum": {
      canvas: ["#3a1f3d", "#170b22", "#050407"],
      glows: [
        [190, 160, 230, "rgba(255, 180, 230, 0.12)"],
        [820, 780, 280, "rgba(160, 120, 255, 0.14)"],
        [820, 240, 200, "rgba(255, 210, 160, 0.08)"]
      ]
    },
    "bg-ink": {
      canvas: ["#18243a", "#070b14", "#000000"],
      glows: [
        [180, 200, 240, "rgba(160, 210, 255, 0.12)"],
        [820, 820, 280, "rgba(120, 120, 255, 0.11)"],
        [780, 220, 190, "rgba(255, 255, 255, 0.07)"]
      ]
    },
    "bg-moss": {
      canvas: ["#223b2a", "#09140d", "#020403"],
      glows: [
        [180, 180, 230, "rgba(210, 255, 190, 0.12)"],
        [840, 800, 270, "rgba(120, 220, 170, 0.11)"],
        [800, 230, 190, "rgba(255, 230, 170, 0.08)"]
      ]
    },
    "bg-ember": {
      canvas: ["#472419", "#150805", "#030101"],
      glows: [
        [180, 170, 230, "rgba(255, 190, 120, 0.13)"],
        [840, 820, 280, "rgba(255, 120, 90, 0.11)"],
        [800, 240, 190, "rgba(255, 240, 190, 0.08)"]
      ]
    },
    "bg-moon": {
      canvas: ["#243043", "#0b111c", "#030407"],
      glows: [
        [180, 180, 230, "rgba(220, 235, 255, 0.12)"],
        [840, 800, 280, "rgba(170, 190, 255, 0.12)"],
        [800, 230, 190, "rgba(255, 255, 255, 0.07)"]
      ]
    },
    "bg-candy": {
      canvas: ["#493050", "#170b20", "#050204"],
      glows: [
        [180, 170, 230, "rgba(255, 190, 230, 0.13)"],
        [840, 800, 270, "rgba(190, 150, 255, 0.13)"],
        [800, 230, 190, "rgba(255, 220, 170, 0.08)"]
      ]
    }
  };

  return backgrounds[currentClass] || backgrounds["bg-aurora"];
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

// ===== Слушатели =====
if (startButton) {
  startButton.addEventListener("click", enterApp);
}

if (resetNameButton) {
  resetNameButton.addEventListener("click", openNamePrompt);
}

if (inlineNameSave) {
  inlineNameSave.addEventListener("click", saveInlineName);
}

if (nameLaterButton) {
  nameLaterButton.addEventListener("click", dismissNamePrompt);
}

if (inlineNameInput) {
  inlineNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveInlineName();
    }
  });
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
  saveImageButton.addEventListener("click", shareCurrentPhrase);
}

// OneSignal: нажатие на кнопку уведомлений
if (notifyButton) {
  notifyButton.addEventListener("click", function () {
    trackEvent("notify_clicked");

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function (OneSignal) {
      try {
        await OneSignal.Notifications.requestPermission();

        if (OneSignal.Notifications.permission === true) {
          notifyButton.classList.add("is-hidden");
          trackEvent("notify_granted");
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
}

if (authorLink) {
  authorLink.addEventListener("click", () => {
    trackEvent("author_contact_clicked");
  });
}

startApp();
