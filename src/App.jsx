import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { storage } from '@/lib/storage';

function App() {
  useEffect(() => {
    storage.initSeedData();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
