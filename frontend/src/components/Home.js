/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

const React = require("react");

const NotebookList = require("./NotebookList");
const Statistic = require("./Statistic");

/*
  *** TODO: Start building the frontend from here ***
  You should remove the placeholder text and modify the component as you see
  fit while working on the assignment.
*/
const Home = () => (
  <div className="container">
    <h1>Neverwrote</h1>
    <blockquote>Never say "I never wrote that down" ever again!</blockquote>
    <Statistic />
    <NotebookList />
  </div>
);

module.exports = Home;
