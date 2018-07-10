import Preact, { Component } from "preact";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCopy,
  faArrowAltCircleRight,
  faArrowAltCircleLeft
} from "@fortawesome/free-regular-svg-icons";

import { getPosts, addPost, removePost } from "../../services/PostsApi/actions";
import { toggleForm, setPost } from "../../services/App/actions";
import PostPreview from "./post-preview";
import Loader from "../Loader";
import "./posts.css";

const mapStateToProps = state => ({
  posts: state.posts.posts,
  fetching: state.posts.fetching.posts
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
        dir === "next" ? (state.pageIndex += 1) : (state.pageIndex -= 1),
      () => window.scrollTo(0, 0)
    );
  }

  render() {
    if (this.props.fetching) {
      return <Loader />;
    }

    const totalPages = Math.ceil(this.props.posts.length / this.postsPerPage);

    return (
      <div className="posts">
        {this.props.posts.length < 1 ? (
          <p>No posts found</p>
        ) : (
          <div>
            {this.filterPosts().map((post, index) => (
              <div
                key={`post_${post.id}`}
                className="posts__post-container"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
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
              </div>
            ))}
          </div>
        )}
        <button className="btn posts__add-btn" onClick={this.props.toggleForm}>
          +
        </button>
        {this.props.posts.length > this.postsPerPage && (
          <div className="posts__pagination-wrapper">
            <button
              onClick={() => this.toNewPage("prev")}
              className={`btn posts__pagination ${
                this.state.pageIndex <= 0 ? "posts__pagination--fade" : ""
              }`}
            >
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </button>
            <p className="posts__pagination-copy">
              Page {this.state.pageIndex + 1} of {totalPages}
            </p>
            <button
              onClick={() => this.toNewPage("next")}
              className={`btn posts__pagination ${
                this.state.pageIndex + 1 >= totalPages
                  ? "posts__pagination--fade"
                  : ""
              }`}
            >
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getPosts, removePost, toggleForm, addPost, setPost }
)(Posts);
