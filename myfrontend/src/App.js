import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import "./App.css";
import MainScreen from "./myPages/MainScreen";
import InhousePartForm from "./myPages/InhousePartForm";
import OutsourcedPartForm from "./myPages/OutsourcedPartForm";
import ProductDetail from "./myPages/ProductDetail";
import About from "./myPages/About";
import PageNotFound from "./myPages/PageNotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<MainScreen />} />
        <Route path="InhousePartForm" element={<InhousePartForm />} />
        <Route path="OutsourcedPartForm" element={<OutsourcedPartForm />} />
        <Route path="ProductDetail" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
