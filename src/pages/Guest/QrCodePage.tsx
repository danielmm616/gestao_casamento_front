import { useLocation } from 'react-router-dom';

export function QrCodePage() {
  const location = useLocation();
  const qrCode = location.state?.qrCode;

  if (!qrCode) return <p>QR Code não encontrado</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Obrigado pela confirmação! 🙌</h1>
      <img src={qrCode} alt="QR Code" />
    </div>
  );
}
