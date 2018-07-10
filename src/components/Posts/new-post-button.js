import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { toggleForm } from "../../services/App/actions";

class NewPostButton extends Component {
  render() {
    return (
      <button className="btn new-post-btn" onClick={this.props.toggleForm}>
        <FontAwesomeIcon icon={faPlus} color="#ffffff" />
      </button>
    );
  }
}

export default connect(
  null,
  { toggleForm }
)(NewPostButton);
