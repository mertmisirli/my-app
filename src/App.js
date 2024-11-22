
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Product from './pages/Product'
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route index path="/" element={<Product />}></Route>
          <Route index path="/news" element={<News />}></Route> 
          <Route index path="/news-detail/:id" element={<NewsDetail />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
