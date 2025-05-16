import { FaBalanceScale, FaCalculator } from "react-icons/fa";
import { styles } from "../../styles";
import { GuidanceSection, SelectionBox } from "../";

const loadTypes = [
  {
    id: "unfactored",
    name: "Unfactored Loads",
    icon: <FaBalanceScale className="text-2xl" />,
    description: "Service loads with separate dead/live components",
    useCase: "Best for: Entering dead and live load components separately",
  },
  {
    id: "factored",
    name: "Factored Loads",
    icon: <FaCalculator className="text-2xl" />,
    description: "Service loads from structural analysis software",
    useCase:
      "Best for: Using service load outputs from ETABS or similar software",
  },
];

const guidanceItems = [
  {
    main: "Unfactored loads allow precise control of load components.",
    detail:
      "Enter dead and live loads separately for accurate working stress calculations.",
  },
  {
    main: "Factored loads should use service combinations from analysis software.",
    detail:
      "Input 1.0DL + 1.0LL combinations directly from ETABS or similar programs.",
  },
  {
    main: "Working stress method applies a global safety factor of 3.0.",
    detail: "Bearing capacity is calculated as q_ultimate divided by 3.0.",
  },
  {
    main: "Moments require separate permanent/variable components when using Unfactored Loads.",
    detail:
      "Enter Mx and My moments with their dead and live load portions individually.",
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
        Select how you want to input your foundation loads
      </p>

      <SelectionBox
        options={loadTypes}
        selectedValue={data.loadType}
        onSelect={handleSelect}
      />

      <GuidanceSection
        title="Selection Guidance"
        items={guidanceItems}
        tip="Tip: The working stress method with global safety factor is currently implemented"
      />
    </div>
  );
}

export default LoadType;
