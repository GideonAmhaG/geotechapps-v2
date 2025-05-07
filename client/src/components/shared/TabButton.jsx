function TabButton({ children, active, onClick, disabled }) {
  return (
    <button
      className={`px-4 py-2 font-medium text-sm md:text-base transition-colors duration-200 ${
        active
          ? "text-[#145da0] border-b-2 border-[#145da0]"
          : "text-gray-500 hover:text-gray-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default TabButton;
