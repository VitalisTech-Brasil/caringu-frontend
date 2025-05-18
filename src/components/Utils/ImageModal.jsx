
const ImageModal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center">
        <div className="max-w-5xl w-full px-4 flex flex-col items-end">
          <button
            onClick={onClose}
            className="top-4 right-4 text-white text-3xl font-bold"
          >
            &times;
          </button>
          <img
            src={imageSrc}
            alt="Imagem ampliada"
            className="w-full max-h-[90vh] object-contain rounded shadow-lg"
          />
        </div>
      </div>
    );
  };
  

export default ImageModal;