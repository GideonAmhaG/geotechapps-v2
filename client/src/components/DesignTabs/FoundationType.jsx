import { FaBuilding, FaLayerGroup, FaChevronRight } from "react-icons/fa";

const foundationTypes = [
  {
    id: "shallow",
    name: "Shallow Foundation",
    icon: <FaBuilding className="text-2xl" />,
    description: "Footings, rafts, and mats for light to medium structures",
  },
  {
    id: "deep",
    name: "Deep Foundation",
    icon: <FaLayerGroup className="text-2xl" />,
    description: "Piles, drilled shafts, and caissons for heavy structures",
  },
];

export default function FoundationType({ data, updateData, setActiveTab }) {
  const handleSelect = (type) => {
    updateData("foundationType", type);
    setActiveTab(1); // Move to next tab
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Select Foundation Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {foundationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-4 border rounded-lg text-left transition-all duration-200 flex items-center justify-between ${
              data.foundationType === type.id
                ? "border-[#145da0] bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div className="mr-4 text-[#145da0]">{type.icon}</div>
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
