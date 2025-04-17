import React, { useState } from "react";
import { FaMountain, FaRuler } from "react-icons/fa";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import { styles } from "../../styles";
import { GiWaterDrop, GiPowder } from "react-icons/gi";

const soilTypes = [
  {
    id: "CU",
    name: "Clay (Undrained)",
    icon: <GiWaterDrop className="text-2xl" />,
    description: "Short-term behavior - total stress analysis",
    useCase: "Best for: Immediate loading conditions",
  },
  {
    id: "CD",
    name: "Clay (Drained)",
    icon: <FaMountain className="text-2xl" />,
    description: "Long-term behavior - effective stress analysis",
    useCase: "Best for: Consolidated/clayey soils",
  },
  {
    id: "S",
    name: "Sand",
    icon: <GiPowder className="text-2xl" />, // Changed to GiPowder
    description: "Drained granular soil - friction-dominated",
    useCase: "Best for: Free-draining granular materials",
  },
  {
    id: "CUST",
    name: "Custom Bearing Capacity",
    icon: <FaRuler className="text-2xl" />,
    description: "Bypass soil-specific calculations",
    useCase: "Best for: Pre-calculated or empirical values",
  },
];

const guidanceItems = [
  {
    main: "Undrained clay analysis is for short-term conditions.",
    detail: "Uses total stress parameters (Sᵤ) with φ=0 approach.",
  },
  {
    main: "Drained clay analysis considers long-term stability.",
    detail: "Requires effective stress parameters (c', φ').",
  },
  {
    main: "Sand always uses drained analysis.",
    detail: "Friction angle (φ') typically ranges 28°-45°.",
  },
  {
    main: "Custom bearing capacity option bypasses standard calculations.",
    detail:
      "Enter pre-calculated bearing capacity to override automatic calculations.",
  },
];

export default function SoilType({ data, updateData, setActiveTab }) {
  const [isGuidanceVisible, setGuidanceVisible] = useState(false);

  const handleSelect = (type) => {
    updateData("soilType", type);
    setActiveTab(2); // Move to next tab
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText}`}>Soil Behavior Type</h2>
      <p className={`${styles.sectionBodyText} mb-6`}>
        Select the soil behavior that matches your site conditions
      </p>

      <div className="grid grid-cols-1 gap-4">
        {soilTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-5 border-2 rounded-xl text-left transition-all duration-200 flex items-center justify-between ${
              data.soilType === type.id
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
            <IoChevronForward className="text-gray-400 text-xl" />
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
              Soil Behavior Guidance
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

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-500 italic md:text-[14px] sm:text-[12px] text-[11px]">
                Tip: Always verify soil behavior with laboratory testing when
                possible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
