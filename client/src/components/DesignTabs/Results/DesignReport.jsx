import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { styles } from "../../../styles";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import { ReportPDF } from "./DesignReportPDF";

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

const ParameterTable = ({ title, items, results }) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-2 px-2 py-1 bg-gray-100 rounded">
        {title}
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 text-sm text-gray-700 w-2/3">
                  {item.label}
                </td>
                <td className="py-2 px-3 text-sm text-gray-900 text-right font-medium w-1/3">
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

  // 1. Proportioning
  const proportioningItems = [
    { id: "D_final", label: "Footing thickness", unit: "mm" },
    { id: "gamma_conc", label: "Concrete Unit Weight (γ_conc)", unit: "kN/m³" },
    { id: "SW_conc", label: "Self weight of footing", unit: "kN" },
    { id: "SW_fill", label: "Self weight of fill", unit: "kN" },
    { id: "DL", label: "Permanent Load (Gk)", unit: "kN" },
    { id: "LL", label: "Variable Load (Qk)", unit: "kN" },
    { id: "p_p", label: "P = 1(Gk + Self Weight) + 1Qk", unit: "kN" },
    { id: "b", label: "B", unit: "mm" },
    { id: "l", label: "L", unit: "mm" },
    { id: "area", label: "A = B * L", unit: "m²" },
    { id: "mxp", label: "Mx = 1Mxp + 1Mxv", unit: "kNm" },
    { id: "myp", label: "My = 1Myp + 1Myv", unit: "kNm" },
    { id: "ex", label: "e_x = abs(My / P)", unit: "mm", decimals: 4 },
    { id: "ey", label: "e_y = abs(Mx / P)", unit: "mm", decimals: 4 },
    { id: "CU", label: "Undrained Cohesion (Cu)", unit: "kPa" },
    { id: "gamma", label: "Soil Unit Weight (γ)", unit: "kN/m³" },
    { id: "Df", label: "Foundation Depth (Df)", unit: "mm" },
    { id: "qu", label: "Ultimate Bearing Capacity (qu)", unit: "kPa" },
    { id: "fs", label: "Factor of Safety (FS)", unit: "" },
    { id: "sig_p", label: "σmax", unit: "kPa" },
    { id: "qa", label: "qall", unit: "kPa" },
  ];

  // 2. Structural Design
  const structuralDesignItems = [
    { id: "p_s", label: "P = 1.35Gk + 1.5Qk", unit: "kN" },
    { id: "sig_s", label: "σ", unit: "kPa" },
    { id: "fck", label: "fck", unit: "MPa" },
    { id: "fyk", label: "fyk", unit: "MPa" },
  ];

  // 2.1 Shear Failure - Punching
  const shearFailurePunchingItems = [
    { id: "d_punch", label: "d", unit: "mm" },
    { id: "k_punch", label: "k", unit: "" },
    { id: "rho_final", label: "ρ", unit: "", decimals: 4 },
    { id: "As_punch", label: "As", unit: "m²" },
    { id: "Ap2_punch", label: "Ap", unit: "m²" },
    { id: "vrd_min_punch", label: "vRd,min", unit: "kPa" },
    { id: "ved_punch", label: "vEd", unit: "kPa" },
    { id: "vrd_punch", label: "vRd", unit: "kPa" },
    { id: "D_punch", label: "D", unit: "mm" },
  ];

  // 2.1 Shear Failure - Vertical/Wide Beam
  const shearFailureWideBeamItems = [
    { id: "d_wide", label: "d", unit: "mm" },
    { id: "k_wide", label: "k", unit: "" },
    { id: "rho_final", label: "ρ", unit: "", decimals: 4 },
    { id: "As_wide", label: "As", unit: "m²" },
    { id: "Ap2_wide", label: "Ap", unit: "m²" },
    { id: "vrd_min_wide", label: "vRd,min", unit: "kPa" },
    { id: "ved_wide", label: "vEd", unit: "kPa" },
    { id: "vrd_wide", label: "vRd", unit: "kPa" },
    { id: "D_wide", label: "D", unit: "mm" },
  ];

  // 2.2 Bending Moment Failure
  const bendingMomentItems = [
    { id: "d_final", label: "d", unit: "mm" },
    { id: "B_final", label: "B", unit: "mm" },
    { id: "z", label: "z", unit: "mm" },
    { id: "rho_min", label: "ρmin", unit: "", decimals: 4 },
    { id: "rho_final", label: "ρ", unit: "", decimals: 4 },
    { id: "Asmin", label: "As,min", unit: "mm²" },
    { id: "med", label: "MEd", unit: "kNm" },
    { id: "mrd", label: "MRd", unit: "kNm" },
    { id: "As_old", label: "As", unit: "mm²" },
  ];

  // 3. Final Rounded Values
  const finalValuesItems = [
    { id: "d", label: "D", unit: "mm" },
    { id: "b", label: "B", unit: "mm" },
    { id: "Nxb", label: "N", unit: "" },
    { id: "Sxb", label: "s", unit: "mm" },
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
        <div className="space-y-6 mt-4">
          <ParameterTable
            title="1. Proportioning"
            items={proportioningItems}
            results={{ ...data.inputs, ...results }}
          />

          <ParameterTable
            title="2. Structural Design"
            items={structuralDesignItems}
            results={{ ...data.inputs, ...results }}
          />

          <ParameterTable
            title="2.1 Shear Failure - Punching"
            items={shearFailurePunchingItems}
            results={results}
          />

          <ParameterTable
            title="2.2 Shear Failure - Vertical/Wide Beam"
            items={shearFailureWideBeamItems}
            results={results}
          />

          <ParameterTable
            title="2.3 Bending Moment Failure"
            items={bendingMomentItems}
            results={results}
          />

          <ParameterTable
            title="3. Final Rounded Values"
            items={finalValuesItems}
            results={results}
          />

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
            <PDFDownloadLink
              document={<ReportPDF data={data} results={results} />}
              fileName={`foundation_design_${
                new Date().toISOString().split("T")[0]
              }.pdf`}
              className="px-4 py-2 bg-[#145da0] text-white rounded-md hover:bg-[#0e4a7c] flex items-center justify-center transition-colors"
            >
              {({ loading }) => (
                <>
                  <FiDownload className="mr-2" />
                  {loading ? "Preparing PDF..." : "Download PDF"}
                </>
              )}
            </PDFDownloadLink>

            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center transition-colors">
              Save to Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignReport;
