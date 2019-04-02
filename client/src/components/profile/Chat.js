import React, { Component } from "react";
import "../../styles/chat.css";

export default class Chat extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="chat-header">
            <span className="chat-title" /> Welcome to LiveChat
            {/* <div className="btn-group pull-right">
              <a
                type="button"
                className="btn btn-default btn-xs"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapseOne"
              >
                <span className="glyphicon glyphicon-chevron-down" />
              </a>
            </div> */}
          </div>

          {/* //////////////////////////// */}

          <div className="panel-body">
            <ul className="chat">
              <li className="left clearfix">
                <span className="chat-img pull-left">
                  <div className="my-profile-photo color-admin">A</div>
                </span>
                <div className="chat-body clearfix">
                  <div className="header">
                    <strong className="primary-font">ADMIN</strong>{" "}
                    <small className="pull-right text-muted">
                      {/* <span className="glyphicon glyphicon-time" /> */}
                      12 mins ago
                    </small>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur bibendum ornare dolor, quis ullamcorper ligula
                    sodales.
                  </p>
                </div>
              </li>
              <li className="right clearfix">
                <span
                  className="chat-img 
                "
                >
                  <div className="my-profile-photo color-me">M</div>
                </span>
                <div className="chat-body clearfix">
                  <div className="header">
                    <strong className="pull-right primary-font">Me</strong>
                    <small className=" text-muted">
                      {/* <span className="glyphicon glyphicon-time" /> */}
                      13 mins ago
                    </small>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur bibendum ornare dolor, quis ullamcorper ligula
                    sodales.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="panel-footer">
            <div className="input-group">
              {/* <textarea
                // style={{ resize: "none" }}
                placeholder="Type your message here..."
                className="form-control input-sm"
              /> */}
              <input
                type="text"
                className="form-control input-sm"
                placeholder="Type your message here..."
              />
              <span className="input-group-btn">
                <button className="btn btn-warning btn-sm" id="btn-chat">
                  Send
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
