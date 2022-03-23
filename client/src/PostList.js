import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4000/posts");

    setPosts(res.data);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const renderPost = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "10px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <h5>{post.timeS}</h5>
          <CommentList postId={post.postId} />
          <CommentCreate postId={post.postId} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPost}
    </div>
  );
}

export default PostList;
