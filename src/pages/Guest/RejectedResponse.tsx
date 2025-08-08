import { useEffect } from 'react';
import './RejectedResponse.css';
import { LogoHeader } from '../../Components';

export function RejectedPage() {
  useEffect(() => {
    document.title = 'D&R | Resposta do Convidado';
  }, []);

  return (
    <div className="rejected-container">
      <LogoHeader />

      <p>Sentiremos sua falta 💖, mas agradecemos por avisar!</p>
      <p>
        Sabemos que imprevistos acontecem, e apesar de não poder estar conosco
        neste dia tão especial, queremos que saiba que seu carinho e pensamentos
        são muito importantes para nós.
      </p>
      <p>
        Desejamos que em breve possamos nos encontrar para celebrar juntos
        momentos felizes.
      </p>
      <p>
        Com carinho, <br /> <b> Daniel e Rafaella</b>
      </p>
    </div>
  );
}
