import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import "./App.css";
import MainScreen from "./myPages/MainScreen";
import InhousePartForm from "./myPages/InhousePartForm";
import OutsourcedPartForm from "./myPages/OutsourcedPartForm";
import ProductDetail from "./myPages/ProductDetail";
import About from "./myPages/About";
import PageNotFound from "./myPages/PageNotFound";
import Parts from "./myPages/Parts";
import Login from "./myPages/Login";
import Products from "./myPages/Products";

import Home from "./components/Home";

import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" exact element={<MainScreen />} />
          <Route path="login" element={<Login />} />
          <Route path="parts" element={<Parts />} />
          <Route path="parts/:id" element={<Parts />} />

          <Route path="InhousePartForm" element={<InhousePartForm />} />
          <Route path="InhousePartForm/:id" element={<InhousePartForm />} />
          <Route path="OutsourcedPartForm" element={<OutsourcedPartForm />} />
          <Route
            path="OutsourcedPartForm/:id"
            element={<OutsourcedPartForm />}
          />

          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />

          <Route path="ProductDetail" element={<ProductDetail />} />
          <Route path="ProductDetail/:id" element={<ProductDetail />} />

          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* <Route element={<ProtectedRoute />}> */}

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
