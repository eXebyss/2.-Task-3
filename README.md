# First things first

## `This is client-server web-app`

## Following technologies are used and implemented:

-**ReactJS** to render components and their content on the client side.\
-**React-Router** to switch between pages.\
-**Node.js** and **Express.js** is responsible for running the server for BE logic like handling incoming *http* request and validate data on BE if it is necessary.\
-Deployed on **Heroku**.\
-Due to ephemeral file system on **Heroku**, "Export CSV" feature is working only running the **Node.js** server on localhost. Get request on *Client* side is fetching data from: 'http://localhost:5000/' . It can be easily changed in './client/src/config.js': API_URL2.

## 0. To install the app on your localhost:

Run the following command in your terminal:

### `npm i` or `npm install`

## 1. Before running the app on your localhost:

Run the following command in your terminal:

### `npm run build`

This will build the client side app on your localhost.

## 2. To run the app in development build:

Run the following command in your terminal:

### `npm run dev`

## 3. To simply start the app in regular way:

Run the following command in your terminal:

### `npm run start`

## 4. App is deployed on heroku and 2 pages are currently available:

`1.` <https://magebit-task3.herokuapp.com/main>

`2.` <https://magebit-task3.herokuapp.com/maillist>

### Happy hacking!
