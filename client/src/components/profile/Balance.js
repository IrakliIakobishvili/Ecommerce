import React from "react";
import { Link, Route } from "react-router-dom";

import "../../styles/balance.css";

export const BalanceView = ({ match }) => {
  return (
    <div className="container balanceConteiner">
      <span className="myBalance">My Current balance is: </span>
    </div>
  );
};

const SubView = ({ match }) => (
  <div>
    <h3>...</h3>
  </div>
);
