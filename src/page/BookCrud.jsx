import React, { Component } from "react";
import Popup from "../components/ui/Popup";
import { BiPlus, BiSearch } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default class BookCrud extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      title: "",
      author: "",
      genre: "",
      price: "",
      books: [/* 
        {
          id: 1,
          title: "Clean Code",
          author: "Robert C. Martin",
          genre: "Programming",
          price: "25.00",
        },
        {
          id: 2,
          title: "The Pragmatic Programmer",
          author: "Andrew Hunt",
          genre: "Programming",
          price: "30.00",
        },
        {
          id: 3,
          title: "1984",
          author: "George Orwell",
          genre: "Fiction",
          price: "15.00",
        },
        {
          id: 4,
          title: "Sapiens",
          author: "Yuval Noah Harari",
          genre: "History",
          price: "22.50",
        },
        {
          id: 5,
          title: "Atomic Habits",
          author: "James Clear",
          genre: "Self-help",
          price: "18.00",
        },
        {
          id: 6,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
          price: "17.00",
        },
        {
          id: 7,
          title: "Deep Work",
          author: "Cal Newport",
          genre: "Productivity",
          price: "19.99",
        },
        {
          id: 8,
          title: "The Art of War",
          author: "Sun Tzu",
          genre: "Strategy",
          price: "12.00",
        },
        {
          id: 9,
          title: "Rich Dad Poor Dad",
          author: "Robert Kiyosaki",
          genre: "Finance",
          price: "14.99",
        },
        {
          id: 10,
          title: "The Alchemist",
          author: "Paulo Coelho",
          genre: "Fiction",
          price: "16.50",
        },
       */],
      data: null,
      updatingItem: null,
      searchValue: "",
      searchResult: null,
    };
  }

  handleClick = () => {
    this.setState({ showPopup: true });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, genre, price, books, updatingItem } = this.state;
    if (updatingItem) {
      this.setState({
        books: books.map((book) =>
          book.id === updatingItem.id
            ? { ...book, title, author, genre, price }
            : book
        ),
      });
    } else {
      const newBook = {
        id: Date.now(),
        title,
        author,
        genre,
        price,
        books,
      };
      this.setState({ books: [...books, newBook] });
    }
    this.setState({
      title: "",
      author: "",
      genre: "",
      price: "",
      showPopup: false,
    });
  };
  handleDelete = (id) => {
    const { books } = this.state;
    this.setState({ books: books.filter((book) => book.id !== id) });
  };
  handleUpdate = (book) => {
    this.setState({
      updatingItem: book,
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      showPopup: true,
    });
  };
  handleSearch = (e) => {
    const value = e.target.value;
    const { books } = this.state;
    const result = books.filter(
      (book) =>
        book.title.toLowerCase().startsWith(value.toLowerCase()) ||
        book.author.toLowerCase().startsWith(value.toLowerCase())
    );
    this.setState({
      searchValue: value,
      searchResult: result,
    });
  };

  render() {
    const {
      title,
      author,
      genre,
      price,
      books,
      showPopup,
      searchValue,
      updatingItem,
      searchResult,
      data,
    } = this.state;
    return (
      <div className="flex flex-col items-center">
        <div className="w-[80%] flex items-center justify-between h-15 px-4 text-[20px] bg-gray-300">
          <div className="flex items-center px-3 py-2 bg-white rounded-4xl">
            <input
              type="text"
              placeholder="Search…"
              onChange={this.handleSearch}
            />
            <BiSearch className="text-2xl" />
          </div>
          <button className="cursor-pointer" onClick={this.handleClick}>
            <BiPlus className="text-2xl" />
          </button>
        </div>
        {showPopup && (
          <Popup onClick={() => this.setState({ showPopup: false })}>
            <form
              action=""
              className="flex flex-col gap-3 bg-white w-[400px] p-10"
              onSubmit={this.handleSubmit}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Book</h3>
                <ImCross
                  className="cursor-pointer"
                  onClick={() => this.setState({ showPopup: false })}
                />
              </div>
              <input
                required
                type="text"
                placeholder="Title…"
                className="border py-2 px-3 rounded-[10px]"
                onChange={(e) => this.setState({ title: e.target.value })}
                value={title}
              />
              <input
                required
                type="text"
                placeholder="Author…"
                className="border py-2 px-3 rounded-[10px]"
                onChange={(e) => this.setState({ author: e.target.value })}
                value={author}
              />
              <input
                required
                type="text"
                placeholder="Genre…"
                className="border py-2 px-3 rounded-[10px]"
                onChange={(e) => this.setState({ genre: e.target.value })}
                value={genre}
              />
              <input
                required
                type="text"
                placeholder="Price…"
                className="border py-2 px-3 rounded-[10px]"
                onChange={(e) => this.setState({ price: e.target.value })}
                value={price}
              />
              <button className="border cursor-pointer py-2 px-3 rounded-[10px] bg-black text-white">
                {updatingItem ? "Save" : "Add"}
              </button>
            </form>
          </Popup>
        )}
        <table className="w-[80%] divide-y divide-gray-200 text-lg text-left mt-10">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700">#</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Author</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Genre</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Update</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.map((book, index) => (
              <tr className="hover:bg-gray-50 transition-colors" key={book.id}>
                <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-gray-700">{book.title}</td>
                <td className="px-4 py-3 text-gray-700">{book.author}</td>
                <td className="px-4 py-3 text-gray-700">{book.genre}</td>
                <td className="px-4 py-3 text-gray-700">{book.price}</td>
                <td className="px-4 py-3 text-blue-600 cursor-pointer">
                  {<FaEdit onClick={() => this.handleUpdate(book)} />}
                </td>
                <td className="px-4 py-3 text-red-600 cursor-pointer">
                  {<FaTrash onClick={() => this.handleDelete(book.id)} />}
                </td>
              </tr>
            ))}
            {searchValue &&
              searchResult?.map((book, index) => (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  key={book.id}
                >
                  <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-700">{book.title}</td>
                  <td className="px-4 py-3 text-gray-700">{book.author}</td>
                  <td className="px-4 py-3 text-gray-700">{book.genre}</td>
                  <td className="px-4 py-3 text-gray-700">{book.price}</td>
                  <td className="px-4 py-3 text-blue-600 cursor-pointer">
                    {<FaEdit onClick={() => this.handleUpdate(book)} />}
                  </td>
                  <td className="px-4 py-3 text-red-600 cursor-pointer">
                    {<FaTrash onClick={() => this.handleDelete(book.id)} />}
                  </td>
                </tr>
              ))}
            {!searchValue &&
              books?.map((book, index) => (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  key={book.id}
                >
                  <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-700">{book.title}</td>
                  <td className="px-4 py-3 text-gray-700">{book.author}</td>
                  <td className="px-4 py-3 text-gray-700">{book.genre}</td>
                  <td className="px-4 py-3 text-gray-700">{book.price}</td>
                  <td className="px-4 py-3 text-blue-600 cursor-pointer">
                    {<FaEdit onClick={() => this.handleUpdate(book)} />}
                  </td>
                  <td className="px-4 py-3 text-red-600 cursor-pointer">
                    {<FaTrash onClick={() => this.handleDelete(book.id)} />}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
