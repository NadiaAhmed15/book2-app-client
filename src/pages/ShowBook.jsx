import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../component/BackButton";
import { SERVER_URL } from "../global";

const ShowBook = () => {
  const [book, setBook] = useState(null); // Initialize as null to handle loading state
  const [imageError, setImageError] = useState(false); // Track image load error
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  const handleImageError = () => {
    setImageError(true); // Set error state if image fails to load
  };

  return (
    <div className="container py-4">
      <BackButton />
      <h1 className="display-4 my-4">Book Details</h1>
      <div className="card shadow p-4">
        {book ? (
          <>
            <div className="row">
              {/* Image Section */}
              <div className="col-md-4">
                {book.image && !imageError ? (
                  <img
                    src={book.image}
                    alt="Book Cover"
                    className="img-fluid rounded mb-4"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="text-muted text-center border rounded p-4">
                    No Image Available
                  </div>
                )}
              </div>
              {/* Book Details */}
              <div className="col-md-8">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>ID:</strong> {book._id}
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Title:</strong> {book.title}
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Author:</strong> {book.author}
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Publish Year:</strong> {book.publishYear}
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Created At:</strong>{" "}
                    {new Date(book.createdAt).toLocaleString()}
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Last Updated:</strong>{" "}
                    {new Date(book.updatedAt).toLocaleString()}
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading book details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
