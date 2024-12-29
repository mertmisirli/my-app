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
// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store'; // Store ve persistor'ı import ettik
import { store } from './redux/store';
import Home from './pages/Home';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Todo from './pages/Todo';
import Category from './pages/Category';
import CategoryDetail from './pages/CategoryDetail';
import Profile from './pages/Profile';
import Plans from './pages/Plans';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar'; // Sidebar component'i
import Quotation from './pages/sidebar/Quotation/Quotation';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Sidebar />

          <div
            style={{
              transition: 'margin-left 0.3s', // İçeriğin kayma süresi
              marginLeft: showSidebar ? '250px' : '0', // Sidebar açıldığında içerik kayacak
              flex: 1, // İçeriğin geri kalan kısmı
            }}
          >
            <Router>
              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/news-detail/:id" element={<NewsDetail />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/category-detail/:id" element={<CategoryDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Sidebar Pages */}
                <Route path="/new-quotation" element={<Quotation />} />
              </Routes>
            </Router>
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
