import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import BookCrud from "./page/BookCrud";
import Layout from "./page/Layout";

const App = () => {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />} />
          <Route path="/books" element={<BookCrud />} />
        </Route>
      </Routes> */}
      <BookCrud />
    </div>
  );
};

export default React.memo(App);
