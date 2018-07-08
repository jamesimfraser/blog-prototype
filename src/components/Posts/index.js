import Preact, { Component } from "preact";
import { connect } from "react-redux";

import {
  getPosts,
  toggleForm,
  addPost,
  removePost
} from "../../services/Posts/actions";

import Post from "../Post";
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
        {this.props.fetching && <p>Loading...</p>}
        {this.filterPosts().map(post => (
          <div className="posts__post-container">
            <Post post={post} />
            <button onClick={() => this.props.removePost(post.id)}>
              Remove
            </button>
            <button onClick={() => this.props.addPost({ ...post, id: null })}>
              Copy
            </button>
          </div>
        ))}
        <button className="btn posts__add-btn" onClick={this.props.toggleForm}>
          +
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getPosts, removePost, toggleForm, addPost }
)(Posts);
