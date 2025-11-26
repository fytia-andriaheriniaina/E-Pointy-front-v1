export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        {children}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
