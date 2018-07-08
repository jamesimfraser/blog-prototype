import Preact from "preact";

import "./post";

const Post = ({ post }) => {
  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{`${post.body.substring(0, 50).replace(/\s$/, "")}${
        post.body.length > 50 ? "..." : ""
      }`}</p>
    </div>
  );
};

export default Post;
