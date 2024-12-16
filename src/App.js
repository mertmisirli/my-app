// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

// const Earth = () => {
//   return (
//     <mesh>
//       <sphereGeometry args={[20, 64, 64]} /> {/* Küreyi büyük yapıyoruz (yarıçapı 20) */}
//       <meshStandardMaterial
//         map={new THREE.TextureLoader().load('/earth-texture4.png')} // Dünya haritası
//       />
//     </mesh>
//   );
// };

// const App = () => {
//   return (
//     <Canvas
//       style={{ width: '100vw', height: '100vh' }}
//       camera={{ position: [0, 0, 30] }} // Kamerayı biraz daha uzakta konumlandırdık
//     >
//       <ambientLight intensity={1.5} />
//       <pointLight position={[10, 10, 10]} />
//       <Earth />
//       <OrbitControls /> {/* Kullanıcı etkileşimi için kontrol ekliyoruz */}
//     </Canvas>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Product from './pages/Product'
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Todo from "./pages/Todo";
import Home from "./pages/Home";
import CategoryDetail from "./pages/CategoryDetail";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Plans from "./pages/Plans";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route index path="/news" element={<News />}></Route> 
          <Route index path="/news-detail/:id" element={<NewsDetail />}></Route>
          <Route index path="/todo" element={<Todo />}></Route>
          <Route index path="/categories" element={<Category />}></Route>
          <Route index path="/category-detail/:id" element={<CategoryDetail />}></Route>

          <Route index path="/profile" element={<Profile />}></Route>
          <Route index path="/plans" element={<Plans />}></Route>
          <Route index path="/calendar" element={<Calendar />}></Route>
          <Route index path="/settings" element={<Settings />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

