# Event Tracker Front End

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/robertvessnalong/eventtracker-frontend)

This is a front-end application created using Create-React-App, React-Bootstrap, and Axios. All API calls are being handled by [api.js](src/API/api.js).

If you would like to add your own backend, you can replace BASE_URL and modify each route:

```
const BASE_URL = 'https://eventtracker-backend.herokuapp.com';
```

- API Calls are being directed to the [Backend](https://github.com/robertvessnalong/eventtracker-backend)

Components data for Events, Performers, and Venues are all being fetched from the SeatGeek API. These components allow for querying, so a user can search for a specific Event, Performer, and Venue.

## Table of Contents

- [Event Tracker Front End](#event-tracker-front-end)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Testing](#testing)
  - [How To](#how-to)
    - [Events](#events)
    - [Performers](#performers)
    - [Venues](#venues)
    - [Social](#social)
    - [Profile](#profile)

## Install

```
npm install
npm run start
```

## Testing

Testing is done with Jest, to run test run command.

```
npm run test
```

This will set the [REACT_APP_NODE_ENV](./.env) to "Testing"

## How To

- Here are a few things that can be accomplished with this application.
  - On the Homepage, you are able to Signup or Login if you have an exisiting account
    - A account will allow you to save events, performers, and make comments
  - Once Registered/Logged In, you will see new links in the sidebar. Each link will take you to the following:
### Events
  - The events page will allow you to search for events, and favorite events. The current events shown will be events that are near you. Each event has a "Buy Tickets" button that will take you to a seperate site to make your purchase.
      - The comment button will allow you to comment on an event. The comments can be seen by clicking the "Social" link in the sidebar.
### Performers
  - The performers page will allow you to search for performers, and see all their events. Once you find a Performer, you can click "See Events". This will take you to the Performer Page. This page will show you all performer events.
### Venues
  - The venues page will allow you to search for venues.
### Social
  - The social page will show you all comments posted by every user.
### Profile
  - Profile page will allow you to change account information, see your favorite performers, and see your favorite events.
