import Preact from "preact";

const PostPreview = ({ post, onClick }) => {
  return (
    <div className="post-preview" onClick={onClick}>
      <h1>{post.title}</h1>
      <p>{`${post.body.substring(0, 50).replace(/\s$/, "")}${
        post.body.length > 50 ? "..." : ""
      }`}</p>
    </div>
  );
};

export default PostPreview;
