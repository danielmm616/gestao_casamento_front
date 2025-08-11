/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import './QrCodeScanner.css';
import { confirmPresenceAtEvent, getGuest } from '../services/api';
import { GuestNamesList } from './GuestNamesList';
import { LogoHeader } from './LogoHeader';

export function QRCodeReaderJSQR() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

          const tick = async () => {
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
                    const stringfiedData = code.data
                      .split('payload=')
                      .at(-1) as string;
                    const data = JSON.parse(stringfiedData);

                    const response = await confirmPresenceAtEvent(data.id);
                    console.log(
                      'Response from confirmPresenceAtEvent:',
                      response,
                    );

                    try {
                      const guest = await getGuest(data.id);
                      setScannedData({
                        ...guest.data,
                        status: response.error ? 'error' : 'success',
                        message:
                          response.data?.message ||
                          response.data?.error ||
                          'Erro desconhecido. Tente novamente.',
                      });
                    } catch (error) {
                      console.error('Erro ao obter convidado:', error);
                      setScannedData({
                        ...data,
                        status: response.error ? 'error' : 'success',
                        message:
                          response.data?.message ||
                          response.data?.error ||
                          'Erro desconhecido. Tente novamente.',
                      });
                    }

                    stopCamera();
                    return;
                  } catch (e) {
                    console.error('Erro ao processar QR:', e);
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
          <LogoHeader />
          <h3 className="qr-result-title">Identificação convite</h3>

          <div className="qr-result-message" style={{ marginTop: 10 }}>
            {scannedData.status === 'success' ? (
              <p style={{ color: 'green' }}>{scannedData.message}</p>
            ) : (
              <p style={{ color: 'red' }}>{scannedData.message}</p>
            )}
          </div>
          <div className="qr-result-line">
            <p style={{ margin: 0 }}>
              <strong>Nomes:</strong>
            </p>
            <GuestNamesList names={scannedData.names} />
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
