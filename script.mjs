import { getData, addData } from "./storage.mjs";
import { getUserIds } from "./common.mjs";
import { renderAgenda } from "./render.mjs";
import { presetTopics } from "./data.mjs";

// DOM ELEMENTS
const userSelect = document.getElementById("user-select");
const agendaContainer = document.getElementById("agenda-container");
const form = document.getElementById("newTopic-form");
const topicInput = document.getElementById("newTopic-name");
const dateInput = document.getElementById("newTopic-date");

// Set today's date as default
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

// Populate user dropdown
populateUsers();

// Restore last selected user
userSelect.value = localStorage.getItem("selectedUser") || "";

if (userSelect.value) {
  displayAgenda(userSelect.value);
}

// listen for user selection changes
userSelect.addEventListener("change", () => {
  const userId = userSelect.value;

  localStorage.setItem("selectedUser", userId);

  if (!userId) {
    agendaContainer.innerHTML =
      "<p>Please select a user to view their revision agenda.</p>";
    return;
  }

  displayAgenda(userId);
});

// Handle form submission to add new topic
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const userId = userSelect.value;

  if (!userId) {
    alert("Please select a user first.");
    return;
  }

  const topic = topicInput.value.trim();

  if (!topic) {
    alert("Please enter a topic.");
    return;
  }

  const startDate = dateInput.value;

  const revisions = calculateRevisionDates(topic, startDate);

  addData(userId, revisions);

  displayAgenda(userId);

  form.reset();
  dateInput.value = today;
  topicInput.focus();
});

// MERGE PRESET + STORED DATA
function getUserTopics(userId) {
  const stored = getData(userId) || [];
  const preset = presetTopics[userId] || [];

  return [...preset, ...stored];
}

// DISPLAY AGENDA
function displayAgenda(userId) {
  const data = getUserTopics(userId);
  renderAgenda(data, agendaContainer);
}

// Populate user dropdown
function populateUsers() {
  const users = getUserIds();

  userSelect.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a user";
  userSelect.appendChild(defaultOption);

  users.forEach((userId, index) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${index + 1}`;
    userSelect.appendChild(option);
  });
}

// Calculate spaced repetition dates
function calculateRevisionDates(topic, startDate) {
  const base = new Date(startDate);

  const dates = [
    addDays(base, 7),
    addMonths(base, 1),
    addMonths(base, 3),
    addMonths(base, 6),
    addYears(base, 1),
  ];

  return dates.map((date) => ({
    topic: topic,
    date: date.toISOString().split("T")[0],
  }));
}

// Date helpers
function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function addMonths(date, months) {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

function addYears(date, years) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}
