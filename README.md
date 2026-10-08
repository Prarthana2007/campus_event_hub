# Campus Event Hub - Node.js Web Server

## Aim

To develop a basic Node.js web server using Express that serves static pages, handles custom routes, returns JSON data, logs requests with middleware, and displays a custom 404 page.

## Description

Campus Event Hub is a small student-focused event calendar. The Express server serves the website from `public/`, provides page routes and two JSON endpoints, and reports request method, URL, response status, and response time in the terminal. Event cards are loaded in the browser from the events API. The contact form demonstrates client-side confirmation only; it does not save or send form data.

## Features

- Responsive home, events, about, and contact pages with shared styling.
- Five campus events returned by the JSON API and displayed on the site.
- Expandable event details and a mobile navigation menu.
- Contact form with required fields and a browser confirmation message.
- Custom request logging middleware and branded 404 page.
- Server port defaults to `3000` and can be changed with the `PORT` environment variable.

## Technologies

- Node.js
- Express.js
- HTML5
- CSS3
- Browser JavaScript
- npm

## Project Structure

```text
campus-event-hub/
|-- package.json
|-- package-lock.json
|-- server.js
|-- README.md
`-- public/
    |-- index.html
    |-- events.html
    |-- about.html
    |-- contact.html
    |-- 404.html
    |-- css/
    |   `-- style.css
    `-- js/
        `-- script.js
```

## Installation

Open a terminal in the `campus-event-hub` folder and install the dependencies:

```bash
npm install
```

## Run the Server

```bash
npm start
```

The server prints its address in the terminal. Open [http://localhost:3000](http://localhost:3000) in a browser. To use a different port, set the `PORT` environment variable before starting the server.

## Available Routes

| Method | Route | Result |
| --- | --- | --- |
| GET | `/` | Home page |
| GET | `/events` | Event calendar |
| GET | `/about` | About the project |
| GET | `/contact` | Contact form |
| GET | `/api/events` | Event list as JSON |
| GET | `/api/status` | Server status, name, Node.js version, and uptime in seconds |
| GET | Any unknown path | HTTP 404 and the custom not-found page |

## Expected Output

- The home page introduces Campus Event Hub and displays three featured events.
- The events page displays all five events, with expandable details.
- The about and contact routes display their respective pages.
- `/api/events` responds with a JSON array containing five event records.
- `/api/status` responds with JSON describing the running server.
- An unknown route, such as `/test`, responds with status `404` and the branded page.
- The terminal logs each request in the form `GET /events - 200 - 5.0ms`.