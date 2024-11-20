
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Product from './pages/Product'
import News from "./pages/News";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route index path="/" element={<Product />}></Route>
          <Route index path="/news" element={<News />}></Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
