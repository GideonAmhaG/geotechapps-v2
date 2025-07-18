import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { styles } from "../../../styles";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import ReportPDF from "./DesignReportPDF";
import {
  GEOTECHNICAL_ITEMS,
  STRUCTURAL_ITEMS,
  SHEAR_PUNCHING_ITEMS,
  SHEAR_WIDE_BEAM_ITEMS,
  BENDING_MOMENT_ITEMS,
  FINAL_VALUES_ITEMS,
} from "./constants";

const formatValue = (value, unit, decimals = 2) => {
  if (value === undefined || value === null) return "N/A";
  const numValue = typeof value === "number" ? value : parseFloat(value);

  if (unit === "" && Math.abs(numValue) < 0.0001) {
    return numValue.toFixed(4);
  }

  if (Number.isInteger(numValue)) {
    return `${numValue} ${unit}`;
  }

  return `${numValue.toFixed(decimals)} ${unit}`;
};

const ParameterTable = ({ title, subheader, items, results }) => {
  return (
    <div className="mb-6">
      {title && (
        <h4 className={`${styles.cardTitle} !text-[#008080] mb-2`}>{title}</h4>
      )}
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className={`${styles.cardDescription} py-2 px-3 text-left`}>
                {subheader || ""}
              </th>
              <th className={`${styles.cardDescription} py-2 px-3 text-right`}>
                Results
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className={`${styles.cardDescription} py-2 px-3 w-2/3`}>
                  {item.label}
                </td>
                <td
                  className={`${styles.cardDescription} font-medium py-2 px-3 text-right w-1/3`}
                >
                  {formatValue(results[item.id], item.unit, item.decimals)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DesignReport = ({ data, results }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4"
        aria-expanded={isExpanded}
        aria-controls="design-report-content"
      >
        <div className="flex items-center text-[#145da0] hover:text-black">
          <span className="font-medium md:text-[18px] sm:text-[16px] text-[14px]">
            Design Report
          </span>
          <span className="ml-2 md:text-[18px] sm:text-[16px] text-[14px]">
            {isExpanded ? (
              <IoChevronDown className="inline" />
            ) : (
              <IoChevronForward className="inline" />
            )}
          </span>
        </div>
      </button>

      <div
        id="design-report-content"
        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isExpanded}
      >
        <div className="space-y-6 mt-4 px-8">
          <h3 className={`${styles.cardTitle} !text-[#008080]`}>
            Geotechnical Design
          </h3>
          <ParameterTable
            items={GEOTECHNICAL_ITEMS}
            results={{ ...data.inputs, ...results }}
          />

          <h3 className={`${styles.cardTitle} !text-[#008080]`}>
            Structural Design
          </h3>
          <ParameterTable
            items={STRUCTURAL_ITEMS}
            results={{ ...data.inputs, ...results }}
          />

          <ParameterTable
            subheader="Shear Failure - Punching"
            items={SHEAR_PUNCHING_ITEMS}
            results={results}
          />

          <ParameterTable
            subheader="Shear Failure - Vertical/Wide Beam"
            items={SHEAR_WIDE_BEAM_ITEMS}
            results={results}
          />

          <ParameterTable
            subheader="Bending Moment Failure"
            items={BENDING_MOMENT_ITEMS}
            results={results}
          />

          <h3 className={`${styles.cardTitle} !text-[#008080]`}>
            Final Rounded Values
          </h3>
          <ParameterTable items={FINAL_VALUES_ITEMS} results={results} />

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
            <PDFDownloadLink
              document={<ReportPDF data={data} results={results} />}
              fileName={`foundation_design_${new Date()
                .toISOString()
                .replace(/[:.]/g, "-")
                .replace("T", "_")
                .slice(0, 19)}.pdf`}
              className="px-4 py-2 bg-[#145da0] text-white rounded-md hover:bg-[#0e4a7c] flex items-center justify-center transition-colors text-[12px] sm:text-[14px] md:text-[16px]"
            >
              {({ loading }) => (
                <>
                  <FiDownload className="mr-2" />
                  {loading ? "Preparing PDF..." : "Download PDF"}
                </>
              )}
            </PDFDownloadLink>

            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center transition-colors text-[12px] sm:text-[14px] md:text-[16px]">
              Save to Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignReport;
