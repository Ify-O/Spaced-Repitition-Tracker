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

userSelect.addEventListener("change", async () => {
  const userId = userSelect.value;

  if (!userId) {
    agendaContainer.innerHTML =
      "<p>Please select a user to view their revision agenda.</p>";
    return;
  }

  const data = await getData(userId);

  renderAgenda(data);
});

//function to handle the form submission for adding a new topic and its revision dates to the user's agenda
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userId = userSelect.value;

  if (!userId) {
    alert("Please select a user first.");
    return;
  }

  const topic = topicInput.value;
  const startDate = dateInput.value;

  const revisions = calculateRevisionDates(topic, startDate);

  await addData(userId, revisions);

  const updatedData = await getData(userId);

  renderAgenda(updatedData);

  form.reset();

  dateInput.value = new Date().toISOString().split("T")[0];
});

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

