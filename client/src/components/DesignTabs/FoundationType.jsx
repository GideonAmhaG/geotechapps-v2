import { FaCube, FaObjectGroup, FaLink } from "react-icons/fa";
import { GiStonePath, GiBrickWall } from "react-icons/gi";
import { IoChevronForward } from "react-icons/io5";

const foundationTypes = [
  {
    id: "isolated",
    name: "Isolated Footing",
    icon: <FaCube className="text-2xl" />,
    description: "Single column support for stable soils",
    useCase: "Best for: Individual columns with moderate loads",
  },
  {
    id: "combined",
    name: "Combined Footing",
    icon: <FaObjectGroup className="text-2xl" />,
    description: "Supports multiple closely-spaced columns",
    useCase: "Best for: Adjacent columns where isolated footings would overlap",
  },
  {
    id: "strap",
    name: "Strap Footing",
    icon: <FaLink className="text-2xl" />,
    description: "Connected footings with a beam",
    useCase: "Best for: Eccentric loading or property line constraints",
  },
  {
    id: "retaining",
    name: "Retaining Wall",
    icon: <GiBrickWall className="text-2xl" />, // Using GiBrickWall instead
    description: "Supports lateral earth pressure",
    useCase: "Best for: Slope stabilization and basement walls",
  },
];

export default function FoundationType({ data, updateData, setActiveTab }) {
  const handleSelect = (type) => {
    updateData("foundationType", type);
    setActiveTab(1); // Move to soil input tab
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Foundation Type</h2>
      <p className="text-gray-600 mb-6">
        Select the foundation type that matches your project requirements
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {foundationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-5 border-2 rounded-xl text-left transition-all duration-200 flex items-start justify-between ${
              data.foundationType === type.id
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            <div className="flex items-start">
              <div className="mr-4 text-blue-600 mt-1">{type.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{type.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  {type.useCase}
                </p>
              </div>
            </div>
            <IoChevronForward className="text-gray-400 mt-1" />
          </button>
        ))}
      </div>

      {/* Engineering Guidance Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-800 mb-2 flex items-center">
          <GiStonePath className="mr-2 text-yellow-600" />
          Selection Guidance
        </h3>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Isolated footings are most economical for standard structures</li>
          <li>Choose combined footings when column spacing is less than 2m</li>
          <li>Strap footings help when one column is near a property line</li>
          <li>
            Retaining walls require special consideration of lateral forces
          </li>
        </ul>
      </div>
    </div>
  );
}
