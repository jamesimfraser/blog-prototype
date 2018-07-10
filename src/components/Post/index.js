import Preact, { Component } from "preact";

import Loader from "../Loader";
import { connect } from "react-redux";
import { getComments } from "../../services/PostsApi/actions";
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
        <h1>{this.props.currentPost.title}</h1>
        <p>{this.props.currentPost.body}</p>

        <button
          className="btn btn--cta"
          onClick={() => (window.location.hash = "landing")}
        >
          Back to posts
        </button>

        <h1>Comments</h1>

        {this.props.fetching ? (
          <Loader />
        ) : (
          <div className="post__comments">
            {this.props.comments.map(comment => (
              <div
                className="post__comment"
                style={{
                  marginBottom: "2rem",
                  padding: "1rem",
                  borderTop: "1px solid #eeeeee"
                }}
              >
                <p style={{ fontWeight: "bold", marginBottom: 0 }}>
                  {comment.name}
                </p>
                <p style={{ fontSize: "1.2rem", margin: 0 }}>{comment.email}</p>
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
