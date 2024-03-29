/**
 * This is entry point for XMeme Frontend Application.
 * The specifications are as follows:-
 *
 * 1) components - Contains all the required components for the frontend to work.
 *    . Head over to each component to find more details.
 *
 * 2) queries- It contains a single queries.js file which contain all the API calls to XMeme Backend
 *             and each request's catch block is kept in individual components for better modularity.
 *
 * 3) node_modules - Contains all application dependencies
 * 4) App.js- Root Component.
 * 5) App.css - Stylesheet for App.js Root Component.
 * 6) public - contains all the assets for the application.
 *
 * The application uses ReactJS,HTML,CSS,MaterialUI,Bootstrap in frontend and axios module to make API calls.
 * The frontend application runs at (Local):-
 * http://localhost:3000/
 *
 * The application is responsive and has both mobile and desktop rendering.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const rootContainer = document.getElementById("root");
const root = ReactDOM.createRoot(rootContainer);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
