import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { SERVER_URL } from "../global";
import BackButton from "../component/BackButton";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleDeleteBook = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book? This action cannot be undone."
    );

    if (!confirmDelete) return;

    axios
      .delete(`${SERVER_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(
          "An error occurred while deleting the book. Please try again.",
          { variant: "error" }
        );
      });
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-3">
        <BackButton />
      </div>

      {/* Card for Delete Confirmation */}
      <div className="card border-danger shadow">
        <div className="card-body text-center">
          <h1 className="card-title text-danger">Delete Book</h1>
          <p className="card-text my-4">
            Are you sure you want to delete this book? This action cannot be
            undone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-danger"
              onClick={handleDeleteBook}
            >
              Yes, Delete It
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
