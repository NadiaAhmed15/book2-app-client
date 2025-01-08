import { useState, useEffect } from "react";
import BackButton from "../component/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../global";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    axios
      .put(`${SERVER_URL}/book/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        enqueueSnackbar("Failed to update the book", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-3">
        <BackButton />
      </div>

      {/* Card Wrapper */}
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Edit Book</h1>
          <form>
            {/* Title Field */}
            <div className="form-group row mb-3">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Author Field */}
            <div className="form-group row mb-3">
              <label htmlFor="author" className="col-sm-2 col-form-label">
                Author
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>

            {/* Publish Year Field */}
            <div className="form-group row mb-4">
              <label htmlFor="publishYear" className="col-sm-2 col-form-label">
                Publish Year
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  id="publishYear"
                  className="form-control"
                  placeholder="Enter publish year"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="text-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditBook}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
