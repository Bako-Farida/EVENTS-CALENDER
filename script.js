const events = [
  {
    title: "Meeting",
    date: new Date(2024, 4, 9),
    location: "Conference Room A",
    attendees: new Set(["John", "Alice"]),
  },
  {
    title: "Presentation",
    date: new Date(2024, 4, 10),
    location: "Auditorium",
    attendees: new Set(["Bob", "Alice", "Charlie"]),
  },
  {
    title: "Team Lunch",
    date: new Date(2024, 4, 11),
    location: "Cafeteria",
    attendees: new Set(["John", "Alice", "Charlie", "David"]),
  },
  {
    title: "Workshop",
    date: new Date(2024, 4, 12),
    location: "Training Room",
    attendees: new Set(["Alice", "David", "Eve"]),
  },
  {
    title: "Conference",
    date: new Date(2024, 4, 13),
    location: "Convention Center",
    attendees: new Set(["John", "Bob", "Alice", "Charlie", "David", "Eve"]),
  },
  {
    title: "Networking Event",
    date: new Date(2024, 4, 14),
    location: "Networking Hall",
    attendees: new Set(["John", "Alice", "Charlie", "Eve"]),
  },
  
  {
    title: "Product Launch",
    date: new Date(2024, 4, 15),
    location: "Grand Ballroom",
    attendees: new Set(["John", "Bob", "Alice", "David", "Eve"]),
  },
  {
    title: "Training Session",
    date: new Date(2024, 5, 16),
    location: "Training Room",
    attendees: new Set(["John", "Alice", "Charlie", "David", "Eve"]),
  },
  {
    title: "Team Building Activity",
    date: new Date(2024, 5, 17),
    location: "Outdoor Park",
    attendees: new Set(["John", "Bob", "Alice", "Charlie", "David", "Eve"]),
  }
];

// Step 2: Use .filter() and .map() to display events happening in the next 7 days
function displayNext7DaysEvents() {
  const currentDate = new Date();
  const next7DaysEvents = events
    .filter(event => {
      const next7Days = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      return event.date <= next7Days;
    })
    .map(({ title, date, location }) => ({ title, date, location }));

  const eventsTableBody = document.getElementById("events-table-body");
  eventsTableBody.innerHTML = ""; // Clear previous entries

  next7DaysEvents.forEach(({ title, date, location }) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${title}</td><td>${date.toDateString()}</td><td>${location}</td>`;
    eventsTableBody.appendChild(row);
  });
}

// Step 3: Create a WeakMap to store event organizers
const eventOrganizers = new WeakMap();
events.forEach(event => {
eventOrganizers.set(event, event.title);
});


// Step 4: Use destructuring assignment to extract and display event properties in a table format
function displayEventProperties() {
  const eventPropertiesBody = document.getElementById("event-properties-body");
  
  eventPropertiesBody.innerHTML = ""; // Clear previous entries
  
  events.forEach(event => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${event.title}</td><td>${event.date.toDateString()}</td><td>${event.location}</td><td>${Array.from(event.attendees).join(", ")}</td>`;
    eventPropertiesBody.appendChild(row);
  });
}

// Step 5: Create a function to add a new attendee to an event
function addAttendee(eventTitle, attendeeName) {
  const event = events.find(event => event.title === eventTitle);
  if (event) {
    event.attendees.add(attendeeName);
    console.log(`${attendeeName} has been added to the ${eventTitle} event.`);
  } else {
    console.log(`Event '${eventTitle}' not found.`);
  }
}

// Step 6: Create a function to convert event array to JSON string with formattedDate
function eventsToJSON() {
  const eventsJSON = events.map(event => {
    const formattedDate = event.date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric"
    });
    return { ...event, formattedDate };
  });
  return JSON.stringify(eventsJSON);
}

// Step 7: Use Object.keys(), Object.values(), and Object.entries() to display properties and values of the first event object
function displayEventEntries() {
  const firstEvent = events[0];
  const eventEntries = document.getElementById("event-entries");

  eventEntries.innerHTML = ""; // Clear previous entries

  Object.entries(firstEvent).forEach(([key, value]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${key}</td><td>${value}</td>`;
    eventEntries.appendChild(row);
  });
}

// Step 8: Use .forEach() to iterate over events array and log title and date of each event
function logEventTitleAndDate() {
  console.log("Title and date of each event:");
  events.forEach(({ title, date }) => {
    console.log(`Title: ${title}\tDate: ${date.toDateString()}`);
  });
}

// Step 9: Bonus - Implement functionality to delete events from the array using .splice()
function deleteEvent(eventTitle) {
  const index = events.findIndex(event => event.title === eventTitle);
  if (index !== -1) {
    events.splice(index, 1);
    console.log(`Event '${eventTitle}' has been deleted.`);
  } else {
    console.log(`Event '${eventTitle}' not found.`);
  }
}

// Step 10: Bonus - Use .reduce() to find the event with the most attendees
function findEventWithMostAttendees() {
  const eventWithMostAttendees = events.reduce((prevEvent, currentEvent) => {
    return prevEvent.attendees.size > currentEvent.attendees.size ? prevEvent : currentEvent;
  });

  const mostAttendeesInfo = document.getElementById("most-attendees-info");
  mostAttendeesInfo.textContent = `Event with the most attendees: ${eventWithMostAttendees.title}`;
}

// Initial display of events
displayNext7DaysEvents();
displayEventProperties();
// displayEventEntries();
//logEventTitleAndDate();
findEventWithMostAttendees();

// Event listener for adding attendee form submission
const addAttendeeForm = document.getElementById("add-attendee-form");
addAttendeeForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const eventTitle = document.getElementById("event-title").value;
  const attendeeName = document.getElementById("attendee-name").value;
  addAttendee(eventTitle, attendeeName);
  // Refresh display after adding attendee
  displayNext7DaysEvents();
  findEventWithMostAttendees();
  displayEventProperties();
});
