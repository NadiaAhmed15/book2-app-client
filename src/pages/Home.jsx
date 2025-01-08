import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../component/BookTable";
import { SERVER_URL } from "../global";

const Home = () => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();
  const usernameLocal = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (usernameLocal == null) {
    navigate("/");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-4">Book List</h1>
          <span className="text-muted">Welcome, {usernameLocal}!</span>
        </div>
        <div>
          <Link to="/book/create" className="btn btn-success me-3">
            <MdOutlineAddBox className="me-1" /> Add Book
          </Link>
          <button className="btn btn-danger" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
      <div className="card shadow">
        <div className="card-body">
          <BookTable books={books} />
        </div>
      </div>
    </div>
  );
};

export default Home;
