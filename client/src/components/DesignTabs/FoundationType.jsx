import { useState } from "react";
import { FaCube, FaObjectGroup, FaLink } from "react-icons/fa";
import { GiStonePath, GiBrickWall } from "react-icons/gi";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import { styles } from "../../styles";

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
    icon: <GiBrickWall className="text-2xl" />,
    description: "Supports lateral earth pressure",
    useCase: "Best for: Slope stabilization and basement walls",
  },
];

const guidanceItems = [
  "Isolated footings are most economical for standard structures",
  "Choose combined footings when column spacing is less than 2m",
  "Strap footings help when one column is near a property line",
  "Retaining walls require special consideration of lateral forces",
];

export default function FoundationType({ data, updateData, setActiveTab }) {
  const [isGuidanceVisible, setGuidanceVisible] = useState(false);

  const handleSelect = (type) => {
    updateData("foundationType", type);
    setActiveTab(1); // Move to soil input tab
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText}`}>Foundation Type</h2>
      <p className={`${styles.sectionBodyText} mb-6`}>
        Select the foundation type that matches your project requirements
      </p>

      <div className="grid grid-cols-1 gap-4">
        {foundationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-5 border-2 rounded-xl text-left transition-all duration-200 flex items-start justify-between ${
              data.foundationType === type.id
                ? "border-[#145da0] bg-[#f0f7ff] shadow-md"
                : "border-gray-200 hover:border-[#145da0]/50 hover:bg-[#f0f7ff]/50"
            }`}
          >
            <div className="flex items-start">
              <div className="mr-4 text-[#145da0] mt-1">{type.icon}</div>
              <div>
                <h3 className={`${styles.cardTitle}`}>{type.name}</h3>
                <p className={`${styles.cardDescription}`}>
                  {type.description}
                </p>
                <p className={`${styles.cardUseCase}`}>{type.useCase}</p>
              </div>
            </div>
            <IoChevronForward className="text-gray-400 mt-1" />
          </button>
        ))}
      </div>

      {/* Improved Guidance Section */}
      {/* Minimal Guidance Section */}
      <div className="mt-8">
        <div className="rounded-xl overflow-hidden transition-all duration-200">
          <button
            onClick={() => setGuidanceVisible(!isGuidanceVisible)}
            className={`w-full flex items-center justify-between p-5 transition-colors duration-200 ${
              isGuidanceVisible ? "bg-[#f0f7ff]" : "bg-white hover:bg-gray-50"
            } rounded-xl`}
          >
            <span className="text-lg font-medium text-gray-800">
              Selection Guidance
            </span>
            {isGuidanceVisible ? (
              <IoChevronDown className="text-gray-500 transition-transform" />
            ) : (
              <IoChevronForward className="text-gray-500 transition-transform" />
            )}
          </button>

          <div
            className={`transition-all duration-300 ease-in-out ${
              isGuidanceVisible
                ? "max-h-96 opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="pl-5 pr-5 pb-5">
              <ul className="space-y-3">
                {guidanceItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start p-3 rounded-lg hover:bg-blue-50 transition-colors duration-150"
                  >
                    <div className="flex-shrink-0 h-5 flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="ml-3 text-gray-700 leading-snug">{item}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">
                  Tip: Consider soil conditions and load requirements when
                  selecting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
