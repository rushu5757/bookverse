import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="font-bold text-xl">Bookverse</h1>
        <div>
          <Link to="/" className="mr-4">Books</Link>
          <Link to="/add">Add Book</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
