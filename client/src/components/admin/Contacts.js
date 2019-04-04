import React, { Component } from "react";
import { connect } from "react-redux";
import { getContacts } from "../../actions/admin";
import "../../styles/admin/contacts.css";

class Contacts extends Component {
  state = {
    loaded: false
  };
  async componentDidMount() {
    await this.props.getContacts();
    this.setState({ loaded: true });
  }
  componentWillReceiveProps() {}
  render() {
    const { contacts } = this.props;
    const result = contacts.length ? (
      contacts.map(contact => {
        let date =
          contact.createdAt.split("T")[0] +
          " " +
          contact.createdAt.split("T")[1].split(".")[0];
        return (
          <li key={contact._id} className="contact-list-admin admin-item">
            <span className="admin-item__userNames">
              {contact.firstName} {contact.lastName}
            </span>
            <span className="admin-item__email">{contact.email}</span>
            <p className="admin-item__message">{contact.message}</p>
            <span className="admin-item__date">{date}</span>
          </li>
        );
      })
    ) : !this.state.loaded ? (
      <div className="loading loading--static">
        <i className="fas fa-spinner" />
      </div>
    ) : (
      <div className="empty empty--static">
        <i className="far fa-meh" />
      </div>
    );

    return (
      <div className="contact-page-admin">
        <ul className="contact-list-admin">{result}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.admin.contacts
  };
}

export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts);
