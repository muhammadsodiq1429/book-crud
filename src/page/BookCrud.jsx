import React, { Component } from "react";
import Popup from "../components/ui/Popup";
import { BiPlus, BiSearch } from "react-icons/bi";

export default class BookCrud extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      title: "",
      author: "",
      genre: "",
      price: "",
      books: [],
    };
  }

  handleClick = () => {
    this.setState({ showPopup: true });
  };
  handleSubmit = (e) => {
    const { title, author, genre, price, books } = this.state;
    e.preventDefault();

    const newBook = {
      id: Date.now(),
      title,
      author,
      genre,
      price,
      books,
    };
    this.setState({ books: [...books, newBook] });

    this.setState({ showPopup: false });
  };
  render() {
    const { title, author, genre, price, books } = this.state;
    return (
      <div className="flex flex-col items-center">
        <div className="border w-[80%] flex items-center h-15 px-4 text-[20px]">
          <div className="flex-1 flex items-center">
            <input type="text" placeholder="Search…" />
            <BiSearch className="text-2xl" />
          </div>
          <button className="cursor-pointer" onClick={this.handleClick}>
            <BiPlus className="text-2xl" />
          </button>
        </div>
        {this.state.showPopup && (
          <Popup>
            <form
              action=""
              className="flex flex-col gap-3 bg-white w-[400px] p-10"
              onSubmit={this.handleSubmit}
            >
              <h3 className="text-2xl font-bold">Book</h3>
              <input
                type="text"
                placeholder="Title…"
                className="border py-2 px-3 rounded-[10px]"
                onChange={(e) => this.setState({ title: e.target.value })}
                value={title}
              />
              <input
                type="text"
                placeholder="Author…"
                className="border py-2 px-3 rounded-[10px]"
                onChange={(e) => this.setState({ author: e.target.value })}
                value={author}
              />
              <input
                type="text"
                placeholder="Genre…"
                className="border py-2 px-3 rounded-[10px]"
                onChange={(e) => this.setState({ genre: e.target.value })}
                value={genre}
              />
              <input
                type="text"
                placeholder="Price…"
                className="border py-2 px-3 rounded-[10px]"
                onChange={(e) => this.setState({ price: e.target.value })}
                value={price}
              />
              <button className="border cursor-pointer py-2 px-3 rounded-[10px] bg-black text-white">
                Add
              </button>
            </form>
          </Popup>
        )}
        <table className="w-[80%] divide-y divide-gray-200 text-sm text-left mt-20">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700">#</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Author</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Genre</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {books?.map((book, index) => (
              <tr className="hover:bg-gray-50 transition-colors" key={book.id}>
                <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-gray-700">{book.title}</td>
                <td className="px-4 py-3 text-gray-700">{book.author}</td>
                <td className="px-4 py-3 text-gray-700">{book.genre}</td>
                <td className="px-4 py-3 text-gray-700">{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
