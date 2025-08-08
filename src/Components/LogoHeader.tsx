import logo from '../assets/logo.png';

export function LogoHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <img
        className="guest-response-image"
        src={logo}
        alt={`logo.png`}
        style={{ maxWidth: '90%', maxHeight: '150px', margin: '0 auto' }}
      />
    </div>
  );
}
