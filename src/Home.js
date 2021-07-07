import React from "react";
import { Link } from "react-router-dom";
const Home = (props) => {
  return (
    <div className="home">
      <ol>
        <Link to="example-1">
          <li>Example 1 (Map Setup)</li>
        </Link>
        <Link to="example-2">
          <li>Example 2 (Draw Shapes)</li>
        </Link>
        <Link to="example-3">
          <li>Example 3 (Layer Clipping)</li>
        </Link>
        <Link to="example-4">
          <li>Example 4 (LineString arrows)</li>
        </Link>
        <Link to="example-5">
          <li>Example 5 (Apply Layers)</li>
        </Link>
      </ol>
    </div>
  );
};

export default Home;
