import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import DisplayScreen from './pages/DisplayScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/display" element={<DisplayScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
