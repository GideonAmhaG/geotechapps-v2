import { styles } from "../../styles";

const DiagramHeader = ({ title, subtitle }) => {
  return (
    <div className="p-6">
      <h2 className={`${styles.sectionTitleText}`}>{title}</h2>
      {subtitle && (
        <p className={`${styles.sectionBodyText} text-gray-600 mt-1`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default DiagramHeader;
