import { IoChevronForward } from "react-icons/io5";
import { styles } from "../../styles";

function SelectionBox({ options, selectedValue, onSelect, className = "" }) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`p-5 border-2 rounded-xl text-left transition-all duration-200 flex items-center justify-between ${
            selectedValue === option.id
              ? "border-[#145da0] bg-[#f0f7ff] shadow-md"
              : "border-gray-200 hover:border-[#145da0]/50 hover:bg-[#f0f7ff]/50"
          }`}
        >
          <div className="flex items-start">
            <div className="mr-4 text-[#145da0] mt-1">{option.icon}</div>
            <div>
              <h3 className={`${styles.cardTitle}`}>{option.name}</h3>
              <p className={`${styles.cardDescription}`}>
                {option.description}
              </p>
              <p className={`${styles.cardUseCase}`}>{option.useCase}</p>
            </div>
          </div>
          <IoChevronForward className="text-gray-400 text-xl" />
        </button>
      ))}
    </div>
  );
}

export default SelectionBox;
