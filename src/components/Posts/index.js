import Preact, { Component } from "preact";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCopy } from "@fortawesome/free-regular-svg-icons";

import { getPosts, addPost, removePost } from "../../services/PostsApi/actions";
import { setPost } from "../../services/App/actions";
import PostPreview from "./post-preview";
import Loader from "../Loader";
import Pagination from "./pagination";
import NewPostButton from "./new-post-button";
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

  toNewPage = dir => {
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
  };

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
        <NewPostButton />
        {this.props.posts.length > this.postsPerPage && (
          <Pagination
            onClick={this.toNewPage}
            totalPages={totalPages}
            currentPage={this.state.pageIndex + 1}
          />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getPosts, removePost, addPost, setPost }
)(Posts);
