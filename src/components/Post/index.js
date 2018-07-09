import Preact, { Component } from "preact";

import { connect } from "react-redux";
import { getComments } from "../../services/PostsApi/actions";
import "./post.css";

const mapStateToProps = state => ({
  currentPost: state.app.currentPost,
  comments: state.posts.comments
});

class Post extends Component {
  componentWillMount() {
    this.props.comments = [];
    this.props.getComments(this.props.currentPost.id);
  }

  render() {
    return (
      <div className="post">
        <h1>{this.props.currentPost.title}</h1>
        <p>{this.props.currentPost.body}</p>

        <button onClick={() => (window.location.hash = "landing")}>
          Back to posts
        </button>

        {this.props.comments.length > 0 && (
          <div className="post__comments">
            <h1>Comments</h1>
            {this.props.comments.map(comment => (
              <div className="post__comment">
                <p>{comment.name}</p>
                <p>{comment.email}</p>
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
