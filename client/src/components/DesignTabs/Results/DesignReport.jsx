import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { styles } from "../../../styles";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import ReportPDF from "./DesignReportPDF";

const formatValue = (value, unit, decimals = 2) => {
  if (value === undefined || value === null) return "N/A";
  const numValue = typeof value === "number" ? value : parseFloat(value);

  if (
    unit === "" &&
    (value.toString().includes("rho") || Math.abs(numValue) < 0.0001)
  ) {
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

  // Geotechnical Design
  const proportioningItems = [
    { id: "D_final", label: "Footing thickness (D)", unit: "mm" },
    { id: "gamma_conc", label: "Concrete Unit Weight (γconc)", unit: "kN/m³" },
    { id: "SW_conc", label: "Self weight of footing (SWconc)", unit: "kN" },
    { id: "SW_fill", label: "Self weight of fill (SWfill)", unit: "kN" },
    { id: "DL", label: "Permanent Load (Gk)", unit: "kN" },
    { id: "LL", label: "Variable Load (Qk)", unit: "kN" },
    {
      id: "p_p",
      label: "Service Load (P = [Gk + SWconc + SWfill] + Qk)",
      unit: "kN",
    },
    { id: "b", label: "Footing Width (B)", unit: "mm" },
    { id: "l", label: "Footing Length (L)", unit: "mm" },
    { id: "area", label: "Footing Area (A)", unit: "m²" },
    { id: "mxp", label: "Moment X (Mx = Mx,Gk + Mx,Qk)", unit: "kNm" },
    { id: "myp", label: "Moment Y (My = My,Gk + My,Qk)", unit: "kNm" },
    {
      id: "ex",
      label: "Eccentricity X (ex)",
      unit: "mm",
      decimals: 4,
    },
    {
      id: "ey",
      label: "Eccentricity Y (ey)",
      unit: "mm",
      decimals: 4,
    },
    { id: "CU", label: "Undrained Cohesion (Cu)", unit: "kPa" },
    { id: "gamma", label: "Soil Unit Weight (γ)", unit: "kN/m³" },
    { id: "Df", label: "Foundation Depth (Df)", unit: "mm" },
    { id: "qu", label: "Ultimate Bearing Capacity (qu)", unit: "kPa" },
    { id: "fs", label: "Factor of Safety (FS)", unit: "" },
    { id: "sig_p", label: "Maximum Stress (σmax)", unit: "kPa" },
    { id: "qa", label: "Allowable Bearing Capacity (qall)", unit: "kPa" },
  ];

  // Structural Design
  const structuralDesignItems = [
    { id: "p_s", label: "Design Load (P = 1.35Gk + 1.5Qk)", unit: "kN" },
    { id: "sig_s", label: "Design Stress (σ)", unit: "kPa" },
    { id: "fck", label: "Concrete Strength (fck)", unit: "MPa" },
    { id: "fyk", label: "Steel Strength (fyk)", unit: "MPa" },
  ];

  // Shear Failure - Punching
  const shearFailurePunchingItems = [
    { id: "d_punch", label: "Effective Depth (d)", unit: "mm" },
    { id: "k_punch", label: "Size Factor (k)", unit: "" },
    {
      id: "rho_final",
      label: "Reinforcement Ratio (ρ)",
      unit: "",
      decimals: 4,
    },
    {
      id: "As_punch",
      label: "Critical-Section Surface Area (Acs)",
      unit: "m²",
    },
    {
      id: "Ap2_punch",
      label: "Critical-Section Cross-Sectional Area (Acc)",
      unit: "m²",
    },
    {
      id: "vrd_min_punch",
      label: "Minimum Shear Resistance (vRd,min)",
      unit: "kPa",
    },
    { id: "ved_punch", label: "Design Shear Stress (vEd)", unit: "kPa" },
    { id: "vrd_punch", label: "Shear Resistance (vRd)", unit: "kPa" },
    { id: "D_punch", label: "Required Depth (D)", unit: "mm" },
  ];

  // Shear Failure - Vertical/Wide Beam
  const shearFailureWideBeamItems = [
    { id: "d_wide", label: "Effective Depth (d)", unit: "mm" },
    { id: "k_wide", label: "Size Factor (k)", unit: "" },
    {
      id: "rho_final",
      label: "Reinforcement Ratio (ρ)",
      unit: "",
      decimals: 4,
    },
    { id: "As_wide", label: "Critical-Section Surface Area (Acs)", unit: "m²" },
    {
      id: "Ap2_wide",
      label: "Critical-Section Cross-Sectional Area (Acc)",
      unit: "m²",
    },
    {
      id: "vrd_min_wide",
      label: "Minimum Shear Resistance (vRd,min)",
      unit: "kPa",
    },
    { id: "ved_wide", label: "Design Shear Stress (vEd)", unit: "kPa" },
    { id: "vrd_wide", label: "Shear Resistance (vRd)", unit: "kPa" },
    { id: "D_wide", label: "Required Depth (D)", unit: "mm" },
  ];

  // Bending Moment Failure
  const bendingMomentItems = [
    { id: "d_final", label: "Effective Depth (d)", unit: "mm" },
    { id: "B_final", label: "Footing Width (B)", unit: "mm" },
    { id: "z", label: "Lever Arm (z)", unit: "mm" },
    {
      id: "rho_min",
      label: "Minimum Reinforcement Ratio (ρmin)",
      unit: "",
      decimals: 4,
    },
    {
      id: "rho_final",
      label: "Reinforcement Ratio (ρ)",
      unit: "",
      decimals: 4,
    },
    { id: "Asmin", label: "Minimum Reinforcement Area (As,min)", unit: "mm²" },
    { id: "med", label: "Design Moment (MEd)", unit: "kNm" },
    { id: "mrd", label: "Moment Resistance (MRd)", unit: "kNm" },
    { id: "As_old", label: "Required Reinforcement Area (As)", unit: "mm²" },
  ];

  // Final Rounded Values (matches Design Summary section)
  const finalValuesItems = [
    { id: "b", label: "Footing Width (B)", unit: "mm" },
    { id: "l", label: "Footing Length (L)", unit: "mm" },
    { id: "d", label: "Footing Thickness (D)", unit: "mm" },
    { id: "Nxb", label: "Number of bars, x-direction, bottom (Nxb)", unit: "" },
    { id: "Nyb", label: "Number of bars, y-direction, bottom (Nyb)", unit: "" },
    {
      id: "Sxb",
      label: "Spacing between bars, x-direction, bottom (Sxb)",
      unit: "mm",
    },
    {
      id: "Syb",
      label: "Spacing between bars, y-direction, bottom (Syb)",
      unit: "mm",
    },
  ];

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
            items={proportioningItems}
            results={{ ...data.inputs, ...results }}
          />

          <h3 className={`${styles.cardTitle} !text-[#008080]`}>
            Structural Design
          </h3>
          <ParameterTable
            items={structuralDesignItems}
            results={{ ...data.inputs, ...results }}
          />

          <ParameterTable
            subheader="Shear Failure - Punching"
            items={shearFailurePunchingItems}
            results={results}
          />

          <ParameterTable
            subheader="Shear Failure - Vertical/Wide Beam"
            items={shearFailureWideBeamItems}
            results={results}
          />

          <ParameterTable
            subheader="Bending Moment Failure"
            items={bendingMomentItems}
            results={results}
          />

          <h3 className={`${styles.cardTitle} !text-[#008080]`}>
            Final Rounded Values
          </h3>
          <ParameterTable items={finalValuesItems} results={results} />

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
            <PDFDownloadLink
              document={<ReportPDF data={data} results={results} />}
              fileName={`foundation_design_${
                new Date().toISOString().split("T")[0]
              }.pdf`}
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
