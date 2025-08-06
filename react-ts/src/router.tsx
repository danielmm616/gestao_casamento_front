import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
import { GuestResponse } from './pages/Guest/GuestResponse';
import { QrCodePage } from './pages/Guest/QrCodePage';
import { RejectedPage } from './pages/Guest/RejectedResponse';
import ScannerPage from './pages/Guest/ScannerPage';
// import GuestList from './pages/Admin/GuestList';
// import CreateGuest from './pages/Admin/CreateGuest';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/guest/:id" element={<GuestResponse />} />
        <Route path="/qr" element={<QrCodePage />} />
        <Route path="/rejected" element={<RejectedPage />} />
        <Route path="/scanner" element={<ScannerPage />} />
        {/* <Route path="/scanner" element={<ScannerPage />} /> */}
        {/* <Route path="/rejected" element={<RejectedPage />} /> */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        {/* <Route path="/admin/guests" element={<GuestList />} /> */}
        {/* <Route path="/admin/guests/new" element={<CreateGuest />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
