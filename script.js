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

const nameOpeners = [
  "{name},",
  "{name}, слушай,",
  "{name}, смотри,",
  "{name}, тихонько,",
  "{name}, маленькая весточка,",
  "{name}, по секрету,"
];

function startApp() {
  if (saveImageButton) {
    saveImageButton.textContent = "Поделиться";
    saveImageButton.classList.add("is-hidden");
  }

  applyDailyBackground();
  updateTodayDate();
  updateDailyFooterPhrase();

  const savedName = localStorage.getItem(nameKey);

  if (savedName) {
    showMainScreen(savedName);
  } else {
    showNameScreen();
  }
}

function showNameScreen() {
  nameScreen.classList.remove("hidden");
  mainScreen.classList.add("hidden");

  setTimeout(() => {
    if (nameInput) {
      nameInput.focus();
    }
  }, 100);
}

function showMainScreen(name) {
  applyDailyBackground();

  nameScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");

  emojiElement.textContent = "✦";
  messageElement.textContent = `${formatName(name)}, нажми кнопку — и приложение скажет что-нибудь нужное.`;

  hideSaveButton();
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
  localStorage.removeItem(nameKey);
  nameInput.value = "";

  emojiElement.textContent = "✦";
  messageElement.textContent = "Нажми кнопку — и приложение скажет что-нибудь нужное.";

  hideSaveButton();
  showNameScreen();
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

function getName() {
  return formatName(localStorage.getItem(nameKey) || "солнышко");
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getNameOpener() {
  const opener = getRandomItem(nameOpeners);
  return opener.replace("{name}", getName());
}

function lowerFirstLetter(text) {
  if (!text) return text;
  return text.charAt(0).toLocaleLowerCase("ru-RU") + text.slice(1);
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

function setButtonsDisabled(isDisabled) {
  [moodButton, wisdomButton, praiseButton].forEach((button) => {
    if (button) {
      button.disabled = isDisabled;
    }
  });
}

function startLoadingAnimation() {
  const frames = [
    "✦",
    "✦ ·",
    "✦ · ·",
    "облако ищет слово ·",
    "булочка думает · ·",
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
    body: JSON.stringify({ type })
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

    emojiElement.textContent = getRandomItem(emojiList);
    messageElement.textContent = `${getNameOpener()} ${lowerFirstLetter(message)}`;

    showSaveButton();
  } catch (error) {
    console.error(error);

    stopLoadingAnimation();

    emojiElement.textContent = "☁︎";
    messageElement.textContent = `${getNameOpener()} что-то зашуршало не там. Попробуй ещё раз — облако чинит проводок.`;

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
  const text = messageElement.textContent.trim();

  if (!text) {
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Нужные слова",
        text
      });
      return;
    } catch (error) {
      // Пользователь мог закрыть системное меню — это нормально.
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    messageElement.textContent = `${text}\n\nскопировано в буфер`;
  } catch (error) {
    console.error(error);
  }
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
  saveImageButton.addEventListener("click", shareCurrentPhrase);
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

startApp();
