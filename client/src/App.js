import Body from "./Component/Body/Body";
import Header from "./Component/Header/Header";
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import {Toaster} from "react-hot-toast"
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import DeleteBlog from "./pages/DeleteBlog";
import Editblog from "./pages/Editblog";
import DetailedPage from "./Component/DetailedPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/> }/>
        <Route path="/create-new-blog" element={<CreateBlog/>}/>
        <Route path="/my-blog" element={<MyBlogs />} />
        <Route path="/edit-blog/:id" element={<Editblog />} />
        <Route path="/delete-blog/:id" element={<DeleteBlog />} />
        <Route path="/detailed-page/:id" element={<DetailedPage/> }/>
      </Routes>
    </div>
  );
}

export default App;
