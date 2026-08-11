import React from 'react';

interface ImageModalProps {
  src: string;
  alt?: string;
  open: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt = '', open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full mx-4">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-100 rounded">Close</button>
        </div>
        <div className="p-4">
          <img src={src} alt={alt} className="w-full h-auto rounded" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
