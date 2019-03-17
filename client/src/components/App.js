import React from "react";

import Header from "./Header";

export default props => {
  return (
    <div>
      <Header />
      <div className="App">{props.children}</div>
    </div>
  );
};
