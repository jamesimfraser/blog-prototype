import Preact, { Component } from "preact";

import Loader from "../Loader";
import { connect } from "react-redux";
import { getComments } from "../../services/PostsApi/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import "./post.css";

const mapStateToProps = state => ({
  currentPost: state.app.currentPost,
  comments: state.posts.comments,
  fetching: state.posts.fetching.comments
});

class Post extends Component {
  componentWillMount() {
    this.props.getComments(this.props.currentPost.id);
  }

  render() {
    return (
      <div className="post">
        <button
          className="btn post__back"
          onClick={() => (window.location.hash = "landing")}
        >
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            className="post__back-icon"
          />{" "}
          Back to posts
        </button>

        <h1>{this.props.currentPost.title}</h1>
        <p>{this.props.currentPost.body}</p>
        <h1>Comments</h1>

        {this.props.fetching ? (
          <Loader />
        ) : (
          <div className="post__comments">
            {this.props.comments.map(comment => (
              <div className="post__comment">
                <p className="post__comment-name">{comment.name}</p>
                <p className="post__coment-email">{comment.email}</p>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getComments }
)(Post);
