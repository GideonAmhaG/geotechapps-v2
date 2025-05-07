import { FaMountain, FaRuler } from "react-icons/fa";
import { styles } from "../../styles";
import { GiWaterDrop, GiPowder } from "react-icons/gi";
import { GuidanceSection, SelectionBox } from "../";

const soilTypes = [
  {
    id: "CU",
    name: "Clay (Undrained)",
    icon: <GiWaterDrop className="text-2xl" />,
    description: "Short-term behavior for all fine-grained soils",
    useCase: "Best for: Silts and clays under immediate loading",
  },
  {
    id: "CD",
    name: "Clay (Drained)",
    icon: <FaMountain className="text-2xl" />,
    description: "Long-term behavior for cohesive soils",
    useCase: "Best for: Consolidated clays and silty clays",
  },
  {
    id: "S",
    name: "Sand",
    icon: <GiPowder className="text-2xl" />,
    description: "Drained behavior for granular materials",
    useCase: "Best for: Sands, gravels, and silty sands",
  },
  {
    id: "CUST",
    name: "Custom Bearing Capacity",
    icon: <FaRuler className="text-2xl" />,
    description: "User-specified bearing capacity",
    useCase: "Best for: Pre-calculated or empirical values",
  },
];

const guidanceItems = [
  {
    main: "Undrained analysis is conservative for all fine-grained soils.",
    detail:
      "Includes silty clays - uses total stress parameters (Sᵤ) with φ=0.",
  },
  {
    main: "Drained analysis covers long-term conditions.",
    detail:
      "Effective stress parameters (c', φ') work for clays and most silty soils.",
  },
  {
    main: "Sand analysis applies to all granular materials.",
    detail: "For gravels, increase φ' to 35°-45° in input parameters.",
  },
  {
    main: "Custom option allows direct bearing capacity input.",
    detail:
      "Provide your calculated bearing capacity to bypass automatic calculations.",
  },
];

function SoilType({ data, updateData, setActiveTab }) {
  const handleSelect = (type) => {
    updateData("soilType", type);
    setActiveTab(2);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText}`}>Soil Behavior Type</h2>
      <p className={`${styles.sectionBodyText} mb-6`}>
        Select the soil behavior that matches your site conditions
      </p>

      <SelectionBox
        options={soilTypes}
        selectedValue={data.soilType}
        onSelect={handleSelect}
      />

      <GuidanceSection
        title="Selection Guidance"
        items={guidanceItems}
        tip="Tip: For silty soils, use 'Clay' types and adjust φ' accordingly"
      />
    </div>
  );
}

export default SoilType;
