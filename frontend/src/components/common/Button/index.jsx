const Button = ({ label, onClick, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default Button;
