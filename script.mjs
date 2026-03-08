import { getData, addData } from "./storage.mjs";
import { getUserIds } from "./common.mjs";

//DOM ELEMENTS
const userSelect = document.getElementById("user-select");
const agendaContainer = document.getElementById("agenda-container");
const form = document.getElementById("newTopic-form");
const topicInput = document.getElementById("newTopic-name");
const dateInput = document.getElementById("newTopic-date");

//Set today's date as default
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

//Populate the user select dropdown
populateUsers();

//Restore last selected user from localStorage
userSelect.value = localStorage.getItem("selectedUser") || "";
if (userSelect.value) {
  const data = getData(userSelect.value) || [];
  renderAgenda(data);
}

//Listen for user selection changes
userSelect.addEventListener("change", () => {
  const userId = userSelect.value;

//Save the current selection to localStorage
  localStorage.setItem("selectedUser", userId);

  if (!userId) {
    agendaContainer.innerHTML =
      "<p>Please select a user to view their revision agenda.</p>";
    return;
  }

  const data = getData(userId) || [];
  renderAgenda(data);
});

//Handle form submission for adding new topics
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

  const updatedData = getData(userId) || [];
  renderAgenda(updatedData);

//Reset form (topic cleared, date reset to today)
  topicInput.value = "";
  dateInput.value = today;
  topicInput.focus();
});

//Populate the user dropdown dynamically
function populateUsers() {
  const users = getUserIds();
  userSelect.innerHTML = "";

//Default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a user";
  userSelect.appendChild(defaultOption);

//Add user options
  users.forEach((userId, index) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${index + 1}`;
    userSelect.appendChild(option);
  });
}

//Calculate revision dates based on spaced repetition schedule
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

//Helper functions to manipulate dates
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

//Render agenda for a user
function renderAgenda(items) {
  if (!items || items.length === 0) {
    agendaContainer.innerHTML = "<p>No agenda for this user.</p>";
    return;
  }

  const today = new Date();

  //Filter out past dates and sort chronologically
  const upcomingItems = items
    .filter((item) => new Date(item.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (upcomingItems.length === 0) {
    agendaContainer.innerHTML = "<p>No upcoming revisions.</p>";
    return;
  }

  //Group dates by topic
  const grouped = upcomingItems.reduce((acc, item) => {
    if (!acc[item.topic]) acc[item.topic] = [];
    acc[item.topic].push(formatDate(item.date));
    return acc;
  }, {});

  const html = Object.entries(grouped)
    .map(([topic, dates]) => `<li>${topic}: ${dates.join(", ")}</li>`)
    .join("");

  agendaContainer.innerHTML = `<ul>${html}</ul>`;
}

//Format date as "Month Day, Year"
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
