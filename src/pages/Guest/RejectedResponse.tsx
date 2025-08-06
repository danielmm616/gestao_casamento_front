import { useEffect } from 'react';
import './RejectedResponse.css';

export function RejectedPage() {
  useEffect(() => {
    document.title = 'D&R | Resposta do Convidado';
  }, []);

  return (
    <div className="rejected-container">
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img
          className="guest-response-image"
          src={'/src/assets/logo.png'}
          alt={`logo.png`}
          style={{ maxWidth: '90%', maxHeight: '150px', margin: '0 auto' }}
        />
      </div>
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
