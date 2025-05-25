import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonListPage from './pages/PokemonListPage';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <ToastContainer />
       <div className="min-h-screen bg-gray-900 text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}