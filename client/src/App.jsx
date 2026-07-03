import "./App.css";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import ViewProductPage from "./pages/ViewProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
      <Route path="/edit-product/:productId" element={<EditProductPage />} />
      <Route path="/view-product/:productId" element={<ViewProductPage />} />
    </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
