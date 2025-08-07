import { useEffect } from 'react';
import './GuestAtParty.css';

export function EnjoyParty() {
  useEffect(() => {
    document.title = 'Aproveite a Festa! 🎉';
  }, []);

  return (
    <div className="enjoy-party-container">
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img
          className="guest-response-image"
          src={'/src/assets/logo.png'}
          alt={`logo.png`}
          style={{ maxWidth: '90%', maxHeight: '150px', margin: '0 auto' }}
        />
      </div>

      <h3>🎉 Você já entrou! 🚪✨</h3>

      <p>
        O QR code ficou no passado… tipo o DeLorean. Se tiver uma máquina do
        tempo, talvez dê pra voltar e escanear — mas ó, melhor ficar por aqui
        mesmo!
      </p>
      <p>
        Valeu por vir! Sua presença é mais valiosa que o Anel pra Sauron 🧙‍♂️,
        mais animada que festa na casa do Andy 🧸, e mais brilhante que as
        lanternas da Rapunzel! 🏮
      </p>
      <p>
        Agora aproveita, grita, dança, come... só não tente abrir uma porta
        aleatória — pode ser a dos gritos da Monstros S.A. 😱
      </p>
    </div>
  );
}
