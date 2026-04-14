import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import DisplayScreen from './pages/DisplayScreen';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/display" element={<DisplayScreen />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
