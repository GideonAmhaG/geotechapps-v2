import React from "react";

const SelectionSummary = ({ designData }) => {
  const textSizeClass = "text-xs md:text-sm";

  const foundationTypes = [
    { id: "isolated", name: "Isolated Footing" },
    { id: "combined", name: "Combined Footing" },
    { id: "strap", name: "Strap Footing" },
    { id: "retaining", name: "Retaining Wall" },
  ];

  const soilTypes = [
    { id: "CU", name: "Clay (Undrained)" },
    { id: "CD", name: "Clay (Drained)" },
    { id: "S", name: "Sand" },
    { id: "CUST", name: "Custom Bearing Capacity" },
  ];

  const selectionData = [
    {
      key: "foundationType",
      label: "Foundation",
      options: foundationTypes,
      selected: designData.foundationType,
      marginClass: "mr-2",
    },
    {
      key: "soilType",
      label: "Soil",
      options: soilTypes,
      selected: designData.soilType,
      marginClass: "ml-2",
    },
  ];

  const displaySelection = (item) => {
    const selectedOption = item.options.find((opt) => opt.id === item.selected);
    if (selectedOption) {
      return (
        <span className={item.marginClass}>
          {item.label}:{" "}
          <span className={`font-medium text-gray-700 ${textSizeClass}`}>
            {selectedOption.name}
          </span>
        </span>
      );
    }
    return null;
  };

  const hasSelections = designData.foundationType || designData.soilType;

  return (
    <div className={`mb-4`}>
      {hasSelections && (
        <div className={`flex items-center text-gray-500 ${textSizeClass}`}>
          {selectionData.map((item, index) => (
            <React.Fragment key={item.key}>
              {displaySelection(item)}
              {index < selectionData.length - 1 &&
                item.selected &&
                selectionData[index + 1].selected && (
                  <span className="mx-2 h-3 border-l border-gray-300" />
                )}
            </React.Fragment>
          ))}
        </div>
      )}
      {!hasSelections && (
        <div className={`italic text-gray-400 mb-2 ${textSizeClass}`}>
          Selections will appear here.
        </div>
      )}
    </div>
  );
};

export default SelectionSummary;
