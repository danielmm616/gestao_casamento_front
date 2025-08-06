type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
};

export function ConfirmDeleteModal({ open, onClose, onConfirm, title }: Props) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Confirmar Exclusão</h3>
        <p>
          Tem certeza que deseja excluir{' '}
          <strong>{title || 'este convidado'}</strong>?
        </p>
        <button
          onClick={onConfirm}
          style={{ marginRight: 10, background: 'red', color: 'white' }}
        >
          Sim, excluir
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 8,
  width: '90%',
  maxWidth: 400,
};
