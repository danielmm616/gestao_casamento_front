import { useEffect } from 'react';
import { QRCodeReaderJSQR } from '../../Components';

export function ScannerPage() {
  useEffect(() => {
    document.title = 'D&R | Scanner de QR Code';
  }, []);

  return (
    <div>
      <QRCodeReaderJSQR />
    </div>
  );
}
