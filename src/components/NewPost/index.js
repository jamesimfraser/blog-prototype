import Preact, { Component } from "preact";
import { connect } from "react-redux";

import { addPost, toggleForm } from "../../services/Posts/actions";
import "./new-post.css";

const mapStateToProps = state => ({ active: state.posts.formActive });

class NewPost extends Component {
  state = { post: { title: "", body: "" } };

  onSubmit = () => {
    const { post } = this.state;

    if (!post.title || !post.body) {
      return;
    }

    this.props.addPost({ ...this.state.post });
    this.setState({ post: { title: "", body: "" } });
  };

  render() {
    return (
      <div
        className={`new-post ${this.props.active ? "new-post--active" : ""}`}
      >
        <div className="new-post__content">
          <p onClick={this.props.toggleForm}>X</p>
          <div className="new-post__field">
            <label htmlFor="title" className="new-post__label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="new-post__input"
              value={this.state.post.title}
              onChange={evt =>
                this.setState(
                  state => (state.post.title = evt.currentTarget.value)
                )
              }
            />
          </div>

          <div className="new-post__field">
            <label htmlFor="body" className="new-post__label">
              Content
            </label>
            <input
              type="text"
              id="body"
              className="new-post__input"
              value={this.state.post.body}
              onChange={evt =>
                this.setState(
                  state => (state.post.body = evt.currentTarget.value)
                )
              }
            />
          </div>

          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { addPost, toggleForm }
)(NewPost);
