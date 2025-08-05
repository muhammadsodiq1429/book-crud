import { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default class Layout extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
}
