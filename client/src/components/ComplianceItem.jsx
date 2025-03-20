import { styles } from "../styles";

const ComplianceItem = ({ icon: Icon, text }) => (
  <div className="flex items-start gap-3">
    <Icon className="text-[#145da0] w-6 h-6" />
    <p className={`${styles.sectionBodyText} max-w-xl`}>{text}</p>
  </div>
);

export default ComplianceItem;
