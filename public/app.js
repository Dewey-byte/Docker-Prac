const lanternRow = document.getElementById("lantern-row");
const signal = document.getElementById("signal");
const clock = document.getElementById("clock");
const tide = document.getElementById("tide");
const form = document.getElementById("log-form");
const note = document.getElementById("note");
const logList = document.getElementById("log-list");

const KEY = "solstice-dock-notes";

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const now = new Date();
  clock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const hour = now.getHours() + now.getMinutes() / 60;
  const phase = (Math.sin((hour / 24) * Math.PI * 2) + 1) / 2;
  const label = phase > 0.62 ? "High tide" : phase < 0.38 ? "Low tide" : "Slack water";
  tide.textContent = `${label} · ${Math.round(phase * 100)}%`;
}

function renderLanterns() {
  lanternRow.innerHTML = "";
  for (let i = 0; i < 7; i += 1) {
    const btn = document.createElement("button");
    btn.className = "lantern";
    btn.type = "button";
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", `Lantern ${i + 1}`);
    btn.innerHTML = '<span class="post"></span><span class="flame"></span>';
    btn.addEventListener("click", () => {
      btn.classList.toggle("on");
      btn.setAttribute("aria-pressed", btn.classList.contains("on") ? "true" : "false");
      const lit = lanternRow.querySelectorAll(".lantern.on").length;
      signal.hidden = lit < 7;
    });
    lanternRow.appendChild(btn);
  }
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem(KEY) || "[]");
  logList.innerHTML = "";
  notes
    .slice(-5)
    .reverse()
    .forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      logList.appendChild(li);
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = note.value.trim();
  if (!text) return;
  const notes = JSON.parse(localStorage.getItem(KEY) || "[]");
  notes.push(text);
  localStorage.setItem(KEY, JSON.stringify(notes));
  note.value = "";
  loadNotes();
});

renderLanterns();
loadNotes();
tick();
setInterval(tick, 1000);
