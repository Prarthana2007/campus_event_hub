const menuButton = document.querySelector(".nav-toggle");
const primaryNavigation = document.querySelector(".primary-nav");

if (menuButton && primaryNavigation) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    primaryNavigation.classList.toggle("is-open", !isExpanded);
  });

  primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNavigation.classList.remove("is-open");
    });
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

function createEventCard(event) {
  const card = document.createElement("article");
  card.className = "event-card";

  const imageFrame = document.createElement("div");
  imageFrame.className = "event-image-frame";
  const image = document.createElement("img");
  image.src = event.image;
  image.alt = "Scene representing " + event.title;
  image.loading = "lazy";
  imageFrame.append(image);

  const date = document.createElement("span");
  date.className = "event-date-badge";
  date.innerHTML = "<b>" + event.day + "</b><span>" + event.month + "</span>";
  imageFrame.append(date);

  const content = document.createElement("div");
  content.className = "event-card-content";
  const category = document.createElement("p");
  category.className = "event-category";
  category.textContent = event.category;
  const title = document.createElement("h3");
  title.textContent = event.title;
  const facts = document.createElement("div");
  facts.className = "event-facts";
  facts.innerHTML = "<span>" + event.date + "</span><span>" + event.time + "</span><span>" + event.venue + "</span>";
  const description = document.createElement("p");
  description.className = "event-description";
  description.textContent = event.description;
  const details = document.createElement("div");
  details.className = "event-extra-details";
  details.hidden = true;
  details.textContent = event.host + " hosts this event. " + event.entry + ".";
  const toggle = document.createElement("button");
  toggle.className = "event-details-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  toggle.textContent = "View details +";
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.textContent = expanded ? "View details +" : "Hide details -";
    details.hidden = expanded;
  });

  content.append(category, title, facts, description, details, toggle);
  card.append(imageFrame, content);
  return card;
}

async function loadEventLists() {
  const featuredContainer = document.querySelector("#featured-events");
  const allEventsContainer = document.querySelector("#all-events");
  const eventCount = document.querySelector("#event-count");

  if (!featuredContainer && !allEventsContainer) {
    return;
  }

  try {
    const response = await fetch("/api/events");
    if (!response.ok) {
      throw new Error("The event list could not be loaded.");
    }

    const events = await response.json();
    if (featuredContainer) {
      featuredContainer.replaceChildren(...events.filter((event) => event.featured).map(createEventCard));
    }
    if (allEventsContainer) {
      allEventsContainer.replaceChildren(...events.map(createEventCard));
    }
    if (eventCount) {
      eventCount.textContent = events.length + " events on the calendar";
    }
  } catch (error) {
    const message = document.createElement("p");
    message.className = "loading-note error-note";
    message.textContent = "The calendar could not load just now. Refresh the page to try again.";
    featuredContainer?.replaceChildren(message.cloneNode(true));
    allEventsContainer?.replaceChildren(message);
    if (eventCount) {
      eventCount.textContent = "Calendar temporarily unavailable";
    }
  }
}

loadEventLists();

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const status = document.querySelector("#form-status");
    status.textContent = "Thanks, " + name + ". Your note is ready for the Campus Event Hub team. This demo does not store or send it.";
    contactForm.reset();
  });
}