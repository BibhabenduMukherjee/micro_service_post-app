import React, { useState } from "react";
import axios from "axios";
function PostCreate() {
  const [title, setTitle] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="fs-2">Creata Post</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary p-2 m-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostCreate;
