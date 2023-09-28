const Button = ({ label, onClick, disabled, outline }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        bg-rose-500
        border-rose-500
        text-white
        text-md
        py-3
        font-semibold
        border-2
        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "border-black" : "border-rose-500"}
        ${outline ? "text-black" : "text-white"}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
