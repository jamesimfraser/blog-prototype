import Preact, { Component } from "preact";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCopy } from "@fortawesome/free-regular-svg-icons";

import { getPosts, addPost, removePost } from "../../services/PostsApi/actions";
import { toggleForm, setPost } from "../../services/App/actions";
import PostPreview from "./post-preview";
import Loader from "../Loader";
import "./posts.css";

const mapStateToProps = state => ({
  posts: state.posts.posts,
  fetching: state.posts.fetching
});

class Posts extends Component {
  state = { pageIndex: 0 };
  postsPerPage = 10;

  componentWillMount() {
    if (!this.props.posts.length) {
      this.props.getPosts();
    }
  }

  filterPosts() {
    const { pageIndex } = this.state;
    const { posts } = this.props;
    const startIndex = pageIndex * this.postsPerPage;

    return posts.slice(startIndex, startIndex + this.postsPerPage);
  }

  toNewPage(dir) {
    const { pageIndex } = this.state;
    const { posts } = this.props;

    if (
      (dir === "prev" && pageIndex === 0) ||
      (dir === "next" && this.postsPerPage * (pageIndex + 1) >= posts.length)
    ) {
      return;
    }

    this.setState(
      state =>
        dir === "next" ? (state.pageIndex += 1) : (state.pageIndex -= 1)
    );
  }

  render() {
    return (
      <div className="posts">
        {this.props.fetching && <Loader />}
        {!this.props.fetching &&
          this.props.posts.length < 1 && <p>No posts found</p>}
        {this.filterPosts().map(post => (
          <div className="posts__post-container">
            <PostPreview
              post={post}
              onClick={() => {
                this.props.setPost(post);
                window.location.hash = "fullPost";
              }}
            />
            <a
              href=""
              onClick={evt => {
                evt.preventDefault();
                this.props.removePost(post.id);
              }}
              className="posts__btn"
            >
              <FontAwesomeIcon icon={faTrashAlt} color="#ff0000" />
            </a>
            <a
              href=""
              onClick={evt => {
                evt.preventDefault();
                this.props.addPost({ ...post, id: null });
              }}
              className="posts__btn"
            >
              <FontAwesomeIcon icon={faCopy} />
            </a>
            <button
              className="btn posts__add-btn"
              onClick={this.props.toggleForm}
            >
              +
            </button>
          </div>
        ))}
        <button onClick={() => this.toNewPage("prev")}>Prev</button>
        <button onClick={() => this.toNewPage("next")}>Next</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getPosts, removePost, toggleForm, addPost, setPost }
)(Posts);
