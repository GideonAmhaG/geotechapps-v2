import { FaChevronRight } from "react-icons/fa";

const soilTypes = [
  {
    id: "clay",
    name: "Clay",
    color: "bg-red-200",
    description: "Fine-grained soil with low permeability",
  },
  {
    id: "sand",
    name: "Sand",
    color: "bg-yellow-200",
    description: "Granular soil with good drainage",
  },
  {
    id: "silt",
    name: "Silt",
    color: "bg-gray-200",
    description: "Intermediate between sand and clay",
  },
  {
    id: "gravel",
    name: "Gravel",
    color: "bg-amber-200",
    description: "Coarse-grained soil with excellent drainage",
  },
];

export default function SoilType({ data, updateData, setActiveTab }) {
  const handleSelect = (type) => {
    updateData("soilType", type);
    setActiveTab(2); // Move to next tab
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Select Soil Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {soilTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-4 border rounded-lg text-left transition-all duration-200 flex items-center justify-between ${
              data.soilType === type.id
                ? "border-[#145da0] bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full mr-4 ${type.color}`}></div>
              <div>
                <h3 className="font-medium">{type.name}</h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
