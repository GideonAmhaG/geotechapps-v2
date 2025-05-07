import React from "react";
import { styles } from "../../../styles";

const SectionSeparator = ({ title }) => (
  <div className="w-full my-6">
    <h3 className={`${styles.cardTitle} !text-[#008080] mb-2`}>{title}</h3>
    <div className="w-full border-t border-gray-200" />
  </div>
);

export default React.memo(SectionSeparator);
