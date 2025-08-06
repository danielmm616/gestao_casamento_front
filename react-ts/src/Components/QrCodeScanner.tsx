import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import './QrCodeScanner.css'; // Importa o CSS que criamos abaixo

export function QRCodeReaderJSQR() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scannedData, setScannedData] = useState<any>(null);

  useEffect(() => {
    let stream: MediaStream;
    let animationFrameId: number;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true');
          await videoRef.current.play();

          const tick = () => {
            if (videoRef.current && canvasRef.current) {
              const width = videoRef.current.videoWidth;
              const height = videoRef.current.videoHeight;
              canvasRef.current.width = width;
              canvasRef.current.height = height;

              const ctx = canvasRef.current.getContext('2d');
              if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, width, height);
                const imageData = ctx.getImageData(0, 0, width, height);
                const code = jsQR(imageData.data, width, height);

                if (code) {
                  try {
                    const data = JSON.parse(code.data);
                    setScannedData(data);
                    stopCamera();
                    return;
                  } catch (e) {
                    console.error('Erro ao decodificar JSON:', e);
                  }
                }
              }
            }
            animationFrameId = requestAnimationFrame(tick);
          };

          tick();
        }
      } catch (err) {
        console.error('Erro ao acessar a câmera:', err);
      }
    };

    const stopCamera = () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      cancelAnimationFrame(animationFrameId);
    };

    startCamera();
    return () => stopCamera();
  }, []);

  const handleRestart = () => window.location.reload();

  return (
    <div className="qr-container">
      <h2 className="qr-title">Leitor de QR Code</h2>

      {!scannedData ? (
        <div className="qr-video-wrapper">
          <video ref={videoRef} className="qr-video" />
          <canvas ref={canvasRef} className="qr-canvas" />
          <p className="qr-instruction">
            Posicione o QR code em frente à câmera
          </p>
        </div>
      ) : (
        <div className="qr-result-card">
          <h3 className="qr-result-title">Convidado identificado</h3>

          <div className="qr-result-line">
            <strong>{scannedData.title}</strong>
          </div>
          <div className="qr-result-line">
            <p>
              <strong>Nomes:</strong>
            </p>
            <ul className="name-list">
              {scannedData.names.map((name: string, i: number) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
          <div className="qr-result-line">
            <strong>Quantidade:</strong> {scannedData.quantity}
          </div>

          <button className="qr-button" onClick={handleRestart}>
            Escanear outro QR
          </button>
        </div>
      )}
    </div>
  );
}
