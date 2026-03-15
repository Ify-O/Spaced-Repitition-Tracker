# Study Buddy SRT - Spaced Repetition Tracker

**Live Site:** https://study-buddy-srt.netlify.app/

## Project Overview

Study Buddy SRT is a simple web application designed to help users track topics they need to revise using the **spaced repetition learning technique**.

Spaced repetition is a method of reviewing information over increasing time intervals to improve long-term memory retention. As a student learning programming, I found this concept particularly useful for revisiting topics such as JavaScript concepts, algorithms, and problem-solving techniques.

This project was built as part of the **Code Your Future Spaced Repetition Tracker assignment**, which focuses on implementing correct application logic using **JavaScript modules, data storage, and date calculations** rather than heavy UI design.

The application allows users to:

* Select a user from a dropdown
* Add topics they want to revise
* Automatically generate revision dates based on spaced repetition intervals
* View upcoming revision dates in chronological order

The goal of the application is to help users understand **which topic they should revise next**.

# Live Deployment

The project is deployed using **Netlify** and automatically updates when changes are pushed to GitHub.

Live website:

https://study-buddy-srt.netlify.app/

# Tech Stack

This project was intentionally built using **core web technologies** to focus on logic and modular JavaScript.

### Languages

* HTML5
* CSS3
* JavaScript (ES Modules)

### Tools & Platforms

* Node.js
* Node built-in testing (`node:test`)
* LocalStorage (via provided storage module)
* Netlify (deployment)
* GitHub (version control)

# Project Structure

The project is organised using **JavaScript modules** to separate responsibilities and keep the code maintainable.

```
project-root
│
├── index.html
├── about.html
├── styles.css
│
├── script.mjs        # Main application logic
├── render.mjs        # Handles agenda display logic
├── common.mjs        # Shared utilities (user IDs)
├── storage.mjs       # Provided storage helper functions
│
└── tests
    └── common.test.mjs   # Unit tests
```

### Module Responsibilities

**script.mjs**

* Handles application logic
* Manages form submissions
* Calculates revision dates
* Loads agendas for selected users
* Interacts with storage functions

**render.mjs**

* Responsible for rendering the agenda
* Sorts revision dates
* Filters past dates
* Formats dates for display

**common.mjs**

* Stores reusable logic
* Defines the list of available users

**storage.mjs**

* Provided by the project scaffold
* Handles saving and retrieving user data using LocalStorage

# Core Features

### 1. User Selection

The application includes a dropdown containing exactly **five users**, as required by the assignment rubric.

Each user has an independent revision agenda stored in LocalStorage.

When a user is selected:

* Their stored agenda is loaded
* Upcoming revision topics are displayed

If no topics exist, the user sees:

```
No agenda for this user.
```

### 2. Adding Topics

Users can add new topics using the form.

The form includes:

* Topic text input
* Date picker
* Submit button

Form validation ensures:

* A topic name is entered
* A valid date is selected

The date picker defaults to **today’s date**.

### 3. Automatic Revision Scheduling

When a topic is submitted, the application automatically calculates revision dates using spaced repetition intervals.

Revision intervals:

* 1 week
* 1 month
* 3 months
* 6 months
* 1 year

These dates are calculated using JavaScript date manipulation and then stored for the selected user.

Example output:

```
Functions in JS — July 26 2027
Functions in JS — August 19 2027
Functions in JS — October 19 2027
Functions in JS — January 19 2028
Functions in JS — July 19 2028
```

### 4. Agenda Rendering

The agenda displays:

* Topic name
* Revision date

Features of the agenda display:

* Sorted in **chronological order**
* Past revision dates are automatically hidden
* Topics remain stored across page reloads

# Accessibility

Accessibility was considered during development to ensure usability for all users.

Accessibility features include:

* Proper HTML semantic structure
* Labelled form inputs
* Keyboard-accessible form submission
* Screen-reader friendly updates using `aria-live`
* Logical document structure

The website is designed to achieve **100% Lighthouse accessibility score**, as required by the assignment rubric.

# Data Storage

The project uses the **provided storage module**, which manages LocalStorage interactions.

Available functions:

```
getData(userId)
addData(userId, data)
clearData(userId)
```

Each topic submission stores multiple revision dates associated with the selected user.

Data persists across page reloads.

# Unit Testing

The project includes **unit tests** written using Node’s built-in testing module.

Test file:

```
common.test.mjs
```

Tests verify:

* Correct number of users
* Correct user IDs
* User ID data types
* Revision calculation logic

Example test:

```javascript
test("calculateRevisionDates returns 5 revision dates", () => {
  const result = calculateRevisionDates("JS", "2027-07-19");
  assert.equal(result.length, 5);
});
```

This ensures the core logic works as expected.

# Assignment Rubric Compliance

This project was developed to satisfy all requirements of MigraCode **Spaced Repetition Tracker rubric**.

The application includes:

* A dropdown with **exactly 5 users**
* No user selected on initial page load
* Empty agenda for new users
* Agenda loaded from LocalStorage
* Chronological revision display
* Past revision dates hidden
* Accessible form for adding topics
* Automatic revision date calculation
* Persistent data storage
* Unit tests verifying functionality
* Accessible interface with Lighthouse compliance


# What I Learned

Building this project helped strengthen my understanding of:

* JavaScript module architecture
* Separation of concerns
* Date manipulation in JavaScript
* LocalStorage data persistence
* Accessibility best practices
* Writing unit tests with Node
* Deploying static applications using Netlify

It also demonstrated how relatively simple logic can be used to build useful learning tools.

# Future Improvements

Potential future improvements include:

* Topic editing and deletion
* Visual calendar view
* Notifications for upcoming revisions
* Progress tracking
* Multiple topics grouped by subject
