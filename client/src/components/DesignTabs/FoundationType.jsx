import { useState } from "react";
import { FaCube, FaObjectGroup, FaLink } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import { styles } from "../../styles";
import { Link } from "react-router-dom";

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
  {
    main: "Isolated footings are most economical for standard structures.",
    detail: "Saves 15-20% compared to combined footings in typical cases.",
  },
  {
    main: "Choose combined footings when column spacing is less than 2m.",
    detail: "Prevents overlapping stress zones in dense layouts.",
  },
  {
    main: "Strap footings help when one column is near a property line.",
    detail: "The connecting beam redistributes eccentric loads.",
  },
  {
    main: "Retaining walls require special consideration of lateral forces.",
    detail: "Hydrostatic pressure and soil friction must be calculated.",
  },
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
            className={`p-5 border-2 rounded-xl text-left transition-all duration-200 flex items-center justify-between ${
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
            <IoChevronForward className="text-gray-400 text-xl" />{" "}
          </button>
        ))}
      </div>

      {/* Guidance Section */}
      <div className="mt-8">
        <button
          onClick={() => setGuidanceVisible(!isGuidanceVisible)}
          className="w-full flex items-center justify-between p-4"
          aria-expanded={isGuidanceVisible}
          aria-controls="guidance-content"
        >
          <div className="flex items-center text-[#145da0] hover:text-black">
            <span className="font-medium md:text-[18px] sm:text-[16px] text-[14px]">
              Selection Guidance
            </span>
            <span className="ml-2 md:text-[18px] sm:text-[16px] text-[14px]">
              {isGuidanceVisible ? (
                <IoChevronDown className="inline" />
              ) : (
                <IoChevronForward className="inline" />
              )}
            </span>
          </div>
        </button>

        <div
          id="guidance-content"
          className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
            isGuidanceVisible
              ? "max-h-[var(--content-height)] opacity-100"
              : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isGuidanceVisible}
          style={{ "--content-height": "500px" }}
        >
          <div className="px-5 pb-5 space-y-0">
            {guidanceItems.map((item, index) => (
              <div key={index} className="p-3">
                <div className="flex">
                  <div className="flex-shrink-0 mt-0.5 mr-3 text-blue-600">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 md:text-[16px] sm:text-[14px] text-[13px]">
                      {item.main}
                    </p>
                    {item.detail && (
                      <p className="mt-1.5 text-gray-600 pl-2 border-l-2 border-blue-200 md:text-[14px] sm:text-[12px] text-[11px]">
                        {item.detail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 text-center">
              <Link
                href="#"
                className="text-[#145da0] font-medium hover:text-black transition duration-200 inline-flex items-center tracking-[0.3em] !font-sans px-6 py-2 uppercase"
                style={{
                  fontSize: "clamp(0.6rem, 0.8vw, 0.75rem)",
                }}
              >
                Documentation
                <span className="ml-3 font-bold transform translate-y-[-0px] md:text-[14px] sm:text-[12px] text-[11px]">
                  →
                </span>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-500 italic md:text-[14px] sm:text-[12px] text-[11px]">
                Tip: Soil conditions and load requirements affect foundation
                selection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
