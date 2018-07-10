import Preact, { Component } from "preact";
import { connect } from "react-redux";

import { addPost } from "../../services/PostsApi/actions";
import { toggleForm } from "../../services/App/actions";
import "./new-post.css";

const mapStateToProps = state => ({ active: state.app.formActive });

class NewPost extends Component {
  state = { post: { title: "", body: "" } };

  onSubmit = () => {
    const { post } = this.state;

    if (!post.title || !post.body) {
      return;
    }

    this.props.addPost({ ...this.state.post });
    this.setState({ post: { title: "", body: "" } });
    this.props.toggleForm();
  };

  render() {
    return (
      <div
        className={`new-post ${this.props.active ? "new-post--active" : ""}`}
      >
        <div className="new-post__background" />
        <div className="new-post__content">
          <a
            href=""
            className="new-post__close"
            onClick={evt => {
              evt.preventDefault();
              this.props.toggleForm();
            }}
          >
            X
          </a>
          <h1>Add a new post</h1>
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
            <textarea
              id="body"
              className="new-post__input"
              value={this.state.post.body}
              rows={5}
              onChange={evt =>
                this.setState(
                  state => (state.post.body = evt.currentTarget.value)
                )
              }
            />
          </div>

          <button class="btn btn--cta" onClick={this.onSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { addPost, toggleForm }
)(NewPost);
