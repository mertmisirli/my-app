
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Product from './pages/Product'
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Todo from "./pages/Todo";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route index path="/" element={<Product />}></Route>
          <Route index path="/news" element={<News />}></Route> 
          <Route index path="/news-detail/:id" element={<NewsDetail />}></Route>
          <Route index path="/todo" element={<Todo />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
