import { useEffect } from 'react';
import './GuestAtParty.css';
import { LogoHeader } from '../../Components';

export function EnjoyParty() {
  useEffect(() => {
    document.title = 'Aproveite a Festa! 🎉';
  }, []);

  return (
    <div className="enjoy-party-container">
      <LogoHeader />

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
