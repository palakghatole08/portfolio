const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("in");
  });
}, {threshold: 0.08});
$$(".reveal").forEach(el => observer.observe(el));

const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
$$(".mobile-menu a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

const themeToggle = $("#themeToggle");
const savedTheme = localStorage.getItem("palak-theme");
if (savedTheme === "light") document.body.classList.add("light");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("palak-theme", document.body.classList.contains("light") ? "light" : "dark");
});

const chatLaunch = $("#chatLaunch"), chatbot = $("#chatbot"), chatClose = $("#chatClose");
chatLaunch.addEventListener("click", () => chatbot.classList.toggle("open"));
chatClose.addEventListener("click", () => chatbot.classList.remove("open"));

const chatBody = $("#chatBody");
const chatInput = $("#chatInput");
const chatForm = $("#chatForm");

const answers = {
  projects: "Palak has three highlighted projects: Smart Ration Card Scanning, Arduino-based Smoke & Temperature Fire Detection, and an Image Classification App built with PyTorch, torchvision and Streamlit.",
  skills: "Core skills include Python, C, Scikit-learn, Random Forest, Pandas, NumPy, PyTorch, Torchvision, CNN, Streamlit, Arduino, IoT, PLC, SCADA and DCS.",
  education: "Palak is pursuing B.Tech in Electronics & Communication Engineering at TGPCET, Nagpur, with an aggregate CGPA of 8.9 and expected passing year 2027.",
  contact: "You can reach Palak at palakghatole82@gmail.com, call 9373139883, or connect on LinkedIn and GitHub from the contact section.",
};

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type === "user" ? "user-message" : "bot-message";
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function respond(query) {
  const q = query.toLowerCase();
  if (q.includes("project")) return answers.projects;
  if (q.includes("skill") || q.includes("tech")) return answers.skills;
  if (q.includes("education") || q.includes("college") || q.includes("cgpa")) return answers.education;
  if (q.includes("contact") || q.includes("email") || q.includes("linkedin") || q.includes("github")) return answers.contact;
  return "Ask me about Palak's projects, skills, education or contact details.";
}

$$(".quick-row button").forEach(btn => btn.addEventListener("click", () => {
  const key = btn.dataset.q;
  addMessage(btn.textContent, "user");
  setTimeout(() => addMessage(answers[key], "bot"), 180);
}));

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  addMessage(value, "user");
  chatInput.value = "";
  setTimeout(() => addMessage(respond(value), "bot"), 180);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (reduceMotion.matches) {
  document.documentElement.style.scrollBehavior = "auto";
}
