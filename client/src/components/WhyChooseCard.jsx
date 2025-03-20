import { styles } from "../styles";

const WhyChooseCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className={styles.sectionNumberBadge}>{number}</div>
    <h3 className={`${styles.sectionTitleText} mt-4`}>{title}</h3>
    <div className="flex justify-center items-center space-x-1 mt-4 mb-2">
      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
    </div>
    <p className={styles.sectionBodyText}>{description}</p>
    <div className="flex justify-center items-center space-x-1 mt-2">
      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
    </div>
  </div>
);

export default WhyChooseCard;
