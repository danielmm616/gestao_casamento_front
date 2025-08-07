import { useEffect } from 'react';
import { QRCodeReaderJSQR } from '../../Components/QrCodeScanner';

export default function ScannerPage() {
  useEffect(() => {
    document.title = 'D&R | Scanner de QR Code';
  }, []);

  return (
    <div>
      <QRCodeReaderJSQR />
    </div>
  );
}
