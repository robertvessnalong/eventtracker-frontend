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
  - [Usage](#usage)
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

## Usage

- The application will function normally without any additional configuration. However, you are more than welcome to use your own backend.

## Events

- Events Component will render all events using SeatGeek Geoip feature. It will find all events near the current user.

- The Event Page, features Event Items. These items allow you to favorite an event, comment on a event, and link to SeatGeek to purchase tickets.

- You are allowed to Query events using the seach bar at the top of the page. This will remove Geoip and search all events related to search results.

## Performers

- Performer Component will render all performers from SeatGeek. SeatGeek API does not allow for Geoip for this call.

- The Performer Page, features Performer Items. These items will redirect you to the performer page. There you can favorite the performer, and see the performers upcoming events.

- You are allowed to Query events using the seach bar at the top of the page. This will remove Geoip and search all events related to search results.

## Venues

- Venue Component will render all venues using SeatGeek Geopip feature. It will find all events near the current user.

- You are allowed to Query events using the seach bar at the top of the page. This will remove Geoip and search all events related to search results.

## Social

- Social Component will render all comments that each user has made. The Social Item will render the User First Name, The Event Name, The Date Commented, and the Commnet.

## Profile

- Profile allows you to see your favorite events, and performers. It will also allow you to change your name, and email. It will not allow password changes at the moment. 