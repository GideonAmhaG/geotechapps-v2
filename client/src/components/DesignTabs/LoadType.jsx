import { styles } from "../../styles";
import { GuidanceSection, SelectionBox } from "../";

const loadTypes = [
  {
    id: "unfactored",
    name: "Unfactored Loads",
    description: "Service loads before applying safety factors",
    useCase:
      "Best for: Traditional design methods or when working with service load values",
  },
  {
    id: "factored",
    name: "Factored Loads",
    description: "Design loads with safety factors already applied",
    useCase:
      "Best for: Direct input of ultimate limit state (ULS) design loads",
  },
];

const guidanceItems = [
  {
    main: "Unfactored loads are service loads (characteristic values).",
    detail:
      "The software will apply appropriate partial safety factors (γG, γQ) according to Eurocode.",
  },
  {
    main: "Factored loads already include safety factors.",
    detail:
      "Use when you've already calculated 1.35Gk + 1.5Qk or other load combinations.",
  },
  {
    main: "Eurocode partial safety factors:",
    detail: "Permanent (γG) = 1.35 (unfav) or 1.0 (fav), Variable (γQ) = 1.5",
  },
];

function LoadType({ data, updateData, setActiveTab }) {
  const handleSelect = (type) => {
    updateData("loadType", type);
    setActiveTab(3);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText}`}>Load Type</h2>
      <p className={`${styles.sectionBodyText} mb-6`}>
        Specify whether your input loads are factored or unfactored
      </p>

      <SelectionBox
        options={loadTypes}
        selectedValue={data.loadType}
        onSelect={handleSelect}
      />

      <GuidanceSection
        title="Selection Guidance"
        items={guidanceItems}
        tip="Tip: Most engineers work with unfactored (characteristic) loads"
      />
    </div>
  );
}

export default LoadType;
