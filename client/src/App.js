import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <div className="container">
      <PostCreate />
      <PostList />
    </div>
  );
}

export default App;
