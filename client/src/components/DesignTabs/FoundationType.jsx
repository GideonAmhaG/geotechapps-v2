import { FaCube, FaObjectGroup, FaLink } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { styles } from "../../styles";
import { GuidanceSection, SelectionBox } from "../";

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
  const handleSelect = (type) => {
    updateData("foundationType", type);
    setActiveTab(1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText}`}>Foundation Type</h2>
      <p className={`${styles.sectionBodyText} mb-6`}>
        Select the foundation type that matches your project requirements
      </p>

      <SelectionBox
        options={foundationTypes}
        selectedValue={data.foundationType}
        onSelect={handleSelect}
      />

      <GuidanceSection
        title="Selection Guidance"
        items={guidanceItems}
        tip="Tip: Soil conditions and load requirements affect foundation selection"
      />
    </div>
  );
}
