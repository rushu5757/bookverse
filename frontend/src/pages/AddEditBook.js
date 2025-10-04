import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddEditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ id, title, author });
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? "Update" : "Add"} Book
        </button>
      </form>
    </div>
  );
}

export default AddEditBook;
