import './Modal.css';

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
