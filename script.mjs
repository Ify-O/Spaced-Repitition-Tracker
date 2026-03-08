import { getData, addData } from "./storage.mjs";
import { getUserIds } from "./common.mjs";

//DOM ELEMENTS
const userSelect = document.getElementById("user-select");
const agendaContainer = document.getElementById("agenda-container");

const form = document.getElementById("newTopic-form");
const topicInput = document.getElementById("newTopic-name");
const dateInput = document.getElementById("newTopic-date");

//Setting the date to today by default
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

// Populate the user select dropdown
populateUsers();

userSelect.addEventListener("change", () => {
  const userId = userSelect.value;

  if (!userId) {
    agendaContainer.innerHTML =
      "<p>Please select a user to view their revision agenda.</p>";
    return;
  }

  const data = getData(userId) || [];

  renderAgenda(data);
});

//function to handle the form submission for adding a new topic and its revision dates to the user's agenda
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

  // Reset form (keep date defaulted to today)
  topicInput.value = "";
  dateInput.value = today;
});

// Populate the user dropdown dynamically
function populateUsers() {
  const users = getUserIds();

  // Clear previous options
  userSelect.innerHTML = "";

  // Default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a user";
  userSelect.appendChild(defaultOption);
  // Add user options
  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
}

// Function to calculate the revision dates based on the given topic and start date
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

//helper functions to add days, months, or years to a given date
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

// Function to render the revision agenda for a user
function renderAgenda(items) {
  if (!items || items.length === 0) {
    agendaContainer.innerHTML = "<p>No agenda for this user.</p>";
    return;
  }

  const today = new Date();

  const upcomingItems = items
    .filter((item) => new Date(item.date) >= today) // remove past dates
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // chronological order

  if (upcomingItems.length === 0) {
    agendaContainer.innerHTML = "<p>No upcoming revisions.</p>";
    return;
  }

  const html = upcomingItems
    .map((item) => `<li>${item.topic} — ${formatDate(item.date)}</li>`)
    .join("");
  agendaContainer.innerHTML = `<ul>${html}</ul>`;
}

// Helper function to format a date string as "Month Day, Year"
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
