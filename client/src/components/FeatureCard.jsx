import { FaCheck } from "react-icons/fa";
import { styles } from "../styles";

const FeatureCard = ({ icon: Icon, title, bgColor, iconColor, features }) => (
  <div className={`${styles.sectionCard}`}>
    <div className="flex flex-col items-start">
      <div className={`rounded-full ${bgColor} p-3 mb-4`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className={`${styles.sectionTitleText}`}>{title}</h3>
      <div className="w-20 h-0.5 bg-black mt-6 mb-3"></div>
      <ul className={`${styles.sectionCardText} space-y-4`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <FaCheck className={`w-3.5 h-3.5 ${iconColor} mr-2`} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FeatureCard;
