import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBooks from "./pages/CreateBooks";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/create" element={<CreateBooks />} />
        <Route path="/book/details/:id" element={<ShowBook />} />
        <Route path="/book/edit/:id" element={<EditBook />} />
        <Route path="/book/delete/:id" element={<DeleteBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
