import { styles } from "../styles";

const AdvantageCard = ({
  title,
  description1,
  description2,
  image,
  reverse,
}) => {
  return (
    <div
      className={`mt-16 flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center md:items-start md:gap-12`}
    >
      <div className="md:w-1/2">
        <img
          src={image}
          alt={title}
          className="w-full h-90 object-cover rounded-2xl shadow-strong"
          loading="lazy"
        />
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
        <h3 className={`${styles.sectionTitleText}`}>{title}</h3>
        <div className="w-18 h-[0.1rem] bg-black mt-6 mb-3 mx-auto md:mx-0"></div>
        <p className={styles.sectionBodyText}>{description1}</p>
        <p className={`${styles.sectionBodyText} mt-4`}>{description2}</p>
      </div>
    </div>
  );
};

export default AdvantageCard;
