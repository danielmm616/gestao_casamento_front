import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GuestResponse } from './pages/Guest/GuestResponse';
import { QrCodePage } from './pages/Guest/QrCodePage';
import { RejectedPage } from './pages/Guest/RejectedResponse';
import ScannerPage from './pages/Guest/ScannerPage';
import NotFound from './Components/NotFound';
import { EnjoyParty } from './pages/Guest/GuestAtParty';
import { LoginPage } from './pages/Admin/LoginPage';
import { AdminPanel } from './pages/Admin/AdminPanel';
import { PrivateRoute } from './Components/PrivateRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/guest/:id" element={<GuestResponse />} />
        <Route path="/guest-info/qr" element={<QrCodePage />} />
        <Route path="/guest-info/rejected" element={<RejectedPage />} />
        <Route path="/guest-info/enjoy" element={<EnjoyParty />} />
        <Route path="/guest-info/scanner" element={<ScannerPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin/painel"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
