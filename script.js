const STORAGE_KEY = "writersRoomDraft";

const topicInput = document.getElementById("topic");
const genreSelect = document.getElementById("genre");
const toneSelect = document.getElementById("tone");
const lengthSelect = document.getElementById("length");
const resultArea = document.getElementById("result");
const statusText = document.getElementById("status");
const charCount = document.getElementById("charCount");

const generateBtn = document.getElementById("generateBtn");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");

function setStatus(message) {
  statusText.textContent = message;
}

function updateCharCount() {
  charCount.textContent = `${resultArea.value.length}자`;
}

function buildDraft(topic, genre, tone, targetChars) {
  const safeTopic = topic.trim() || "일상의 한 장면";
  const base = `${safeTopic}을(를) ${genre} 장르로 먼저 풀어내고, 이어서 ${tone} 톤으로 다듬어 보면 이야기의 방향과 분위기가 더 분명해진다. `;

  let output = "";
  while (output.length < targetChars) {
    output += base;
  }

  return output.slice(0, targetChars);
}

function saveToLocalStorage() {
  const data = {
    topic: topicInput.value,
    genre: genreSelect.value,
    tone: toneSelect.value,
    length: lengthSelect.value,
    result: resultArea.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  setStatus("현재 내용을 브라우저에 저장했습니다.");
}

function loadFromLocalStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    setStatus("저장된 내용이 없습니다.");
    return;
  }

  const data = JSON.parse(raw);
  topicInput.value = data.topic || "";
  genreSelect.value = data.genre || genreSelect.options[0].value;
  toneSelect.value = data.tone || toneSelect.options[0].value;
  lengthSelect.value = data.length || lengthSelect.options[0].value;
  resultArea.value = data.result || "";
  updateCharCount();
  setStatus("저장된 내용을 불러왔습니다.");
}

function clearLocalStorage() {
  localStorage.removeItem(STORAGE_KEY);
  setStatus("저장된 내용을 삭제했습니다.");
}

generateBtn.addEventListener("click", () => {
  const targetChars = Number(lengthSelect.value);
  const draft = buildDraft(topicInput.value, genreSelect.value, toneSelect.value, targetChars);

  resultArea.value = draft;
  updateCharCount();
  setStatus(`초안을 생성했습니다. 목표 ${targetChars}자 기준입니다.`);
});

saveBtn.addEventListener("click", saveToLocalStorage);
loadBtn.addEventListener("click", loadFromLocalStorage);
clearBtn.addEventListener("click", clearLocalStorage);

resultArea.addEventListener("input", updateCharCount);

updateCharCount();
