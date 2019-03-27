import React from 'react';
import { Link, Route } from "react-router-dom";

export const NestedView = ({ match }) => {
  return (
    <div>
      {/*default message*/}
      <Route exact path={match.url} render={() => (
        <h3>Please select a section:</h3>
      )}/>
      <Link to={`${match.url}/info`}>Info - </Link>
      <Link to={`${match.url}/about`}>About - </Link>
      <Link to={`${match.url}/contacts`}>Contact</Link>
      <Route path={`${match.url}/:sectionName`} component={SubView}/>
    </div>
  )
};

const SubView = ({ match }) => (
  <div>
    <h3>Section: {match.params.sectionName}</h3>
  </div>
);