
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Product from './pages/Product'

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route index path="/" element={<Product />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
