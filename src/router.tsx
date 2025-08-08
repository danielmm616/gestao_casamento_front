import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { NotFound, PrivateRoute } from './Components';
import {
  EnjoyParty,
  GuestResponse,
  QrCodePage,
  RejectedPage,
  ScannerPage,
} from './pages/Guest';
import { AdminPanel, LoginPage } from './pages/Admin';

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
