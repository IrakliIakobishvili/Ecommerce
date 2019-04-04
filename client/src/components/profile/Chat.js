import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMessage, getMessages } from "../../actions/chat";
import "../../styles/chat.css";

class Chat extends Component {
  state = {
    inputValue: ""
  };
  textareaHandler = e => {
    this.setState({ inputValue: e.target.value });
  };
  submitHandler = async () => {
    console.log(this.state);
    await this.props.sendMessage(this.state.inputValue);
    this.props.getMessages();
  };
  componentDidMount() {
    this.props.getMessages();
    setInterval(() => {
      this.props.getMessages();
    }, 1000);
  }
  render() {
    const { messages } = this.props;
    const result = messages.length ? (
      messages.map(message => {
        return (
          <li key={message._id} className="left clearfix">
            <span className="chat-img pull-left">
              <div className="my-profile-photo color-admin">A</div>
            </span>
            <div className="chat-body clearfix">
              <div className="header">
                <strong className="primary-font">{message.author}</strong>{" "}
                <small className="pull-right text-muted">{message.date}</small>
              </div>
              <p>{message.text}</p>
            </div>
          </li>
        );
      })
    ) : (
      <span>Empty</span>
    );
    return (
      <div className="container">
        <div className="row">
          <div className="chat-header">
            <span className="chat-title" /> Welcome to LiveChat
          </div>
          <div className="panel-body">
            <ul className="chat">{result}</ul>
          </div>
          <div className="panel-footer">
            <div className="input-group">
              <textarea
                value={this.setState.inputValue}
                onChange={this.textareaHandler}
                type="text"
                className="form-control input-sm"
                placeholder="Type your message here..."
              />
              <span className="input-group-btn">
                <button
                  onClick={this.submitHandler}
                  className="btn btn-warning btn-sm"
                  id="btn-chat"
                >
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

function mapStateToProps(state) {
  return {
    messages: state.chat.messages
  };
}

export default connect(
  mapStateToProps,
  { sendMessage, getMessages }
)(Chat);
