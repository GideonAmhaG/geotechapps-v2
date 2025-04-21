import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { styles } from "../../styles";

export default function InputParameters({ data, updateData, setActiveTab }) {
  const { foundationType, soilType } = data;
  const [inputs, setInputs] = useState(data.inputs || {});

  // Common input fields for all foundation types
  const commonFields = [
    {
      id: "DL",
      label: "Permanent Load (Gk)",
      type: "number",
      placeholder: "e.g. 500",
      required: true,
      unit: "kN",
      tooltip: "Unfactored permanent vertical load",
    },
    {
      id: "LL",
      label: "Variable Load (Qk)",
      type: "number",
      placeholder: "e.g. 300",
      required: true,
      unit: "kN",
      tooltip: "Unfactored variable vertical load",
    },
    {
      id: "mxp",
      label: "Moment X Permanent",
      type: "number",
      placeholder: "e.g. 50",
      required: true,
      unit: "kNm",
      tooltip: "Unfactored permanent moment about X-axis",
    },
    {
      id: "mxv",
      label: "Moment X Variable",
      type: "number",
      placeholder: "e.g. 30",
      required: true,
      unit: "kNm",
      tooltip: "Unfactored variable moment about X-axis",
    },
    {
      id: "myp",
      label: "Moment Y Permanent",
      type: "number",
      placeholder: "e.g. 50",
      required: true,
      unit: "kNm",
      tooltip: "Unfactored permanent moment about Y-axis",
    },
    {
      id: "myv",
      label: "Moment Y Variable",
      type: "number",
      placeholder: "e.g. 30",
      required: true,
      unit: "kNm",
      tooltip: "Unfactored variable moment about Y-axis",
    },
  ];

  // Geometry fields based on foundation type
  const getGeometryFields = () => {
    switch (foundationType) {
      case "isolated":
        return [
          {
            id: "COL",
            label: "Column Width X",
            type: "number",
            placeholder: "e.g. 0.3",
            required: true,
            unit: "m",
            tooltip: "Column dimension along X-axis",
          },
          {
            id: "COLY",
            label: "Column Width Y",
            type: "number",
            placeholder: "e.g. 0.3",
            required: true,
            unit: "m",
            tooltip: "Column dimension along Y-axis",
          },
        ];
      case "combined":
        return [
          {
            id: "COL1",
            label: "Column 1 Width X",
            type: "number",
            placeholder: "e.g. 0.3",
            required: true,
            unit: "m",
            tooltip: "First column X dimension",
          },
          {
            id: "COLY1",
            label: "Column 1 Width Y",
            type: "number",
            placeholder: "e.g. 0.3",
            required: true,
            unit: "m",
            tooltip: "First column Y dimension",
          },
          {
            id: "COL2",
            label: "Column 2 Width X",
            type: "number",
            placeholder: "e.g. 0.3",
            required: true,
            unit: "m",
            tooltip: "Second column X dimension",
          },
          {
            id: "COLY2",
            label: "Column 2 Width Y",
            type: "number",
            placeholder: "e.g. 0.3",
            required: true,
            unit: "m",
            tooltip: "Second column Y dimension",
          },
          {
            id: "COL_SPACING",
            label: "Column Spacing",
            type: "number",
            placeholder: "e.g. 3.0",
            required: true,
            unit: "m",
            tooltip: "Distance between column centers",
          },
        ];
      case "strap":
        return [
          {
            id: "COL_MAIN",
            label: "Main Column Width",
            type: "number",
            placeholder: "e.g. 0.4",
            required: true,
            unit: "m",
            tooltip: "Primary column dimension",
          },
          {
            id: "COL_STRAP",
            label: "Strap Column Width",
            type: "number",
            placeholder: "e.g. 0.3",
            required: true,
            unit: "m",
            tooltip: "Secondary column dimension",
          },
          {
            id: "STRAP_LENGTH",
            label: "Strap Beam Length",
            type: "number",
            placeholder: "e.g. 2.5",
            required: true,
            unit: "m",
            tooltip: "Distance between columns",
          },
        ];
      case "retaining":
        return [
          {
            id: "WALL_HEIGHT",
            label: "Wall Height",
            type: "number",
            placeholder: "e.g. 2.0",
            required: true,
            unit: "m",
            tooltip: "Total wall height",
          },
          {
            id: "WALL_THICKNESS",
            label: "Wall Thickness",
            type: "number",
            placeholder: "e.g. 0.3",
            required: true,
            unit: "m",
            tooltip: "Base thickness of wall",
          },
          {
            id: "TOE_LENGTH",
            label: "Toe Length",
            type: "number",
            placeholder: "e.g. 1.0",
            required: true,
            unit: "m",
            tooltip: "Length of toe extension",
          },
          {
            id: "HEEL_LENGTH",
            label: "Heel Length",
            type: "number",
            placeholder: "e.g. 1.5",
            required: true,
            unit: "m",
            tooltip: "Length of heel extension",
          },
        ];
      default:
        return [];
    }
  };

  // Soil properties based on soil type
  const getSoilFields = () => {
    switch (soilType) {
      case "CU": // Clay (Undrained)
        return [
          {
            id: "DF",
            label: "Foundation Depth",
            type: "number",
            placeholder: "e.g. 1.5",
            required: true,
            unit: "m",
            tooltip: "Depth from ground surface to footing base",
          },
          {
            id: "CU",
            label: "Undrained Cohesion",
            type: "number",
            placeholder: "e.g. 50",
            required: true,
            unit: "kPa",
            tooltip: "Soil undrained shear strength",
          },
          {
            id: "GAM",
            label: "Soil Unit Weight",
            type: "number",
            placeholder: "e.g. 18",
            required: true,
            unit: "kN/m³",
            tooltip: "Unit weight of soil",
          },
        ];
      case "CD": // Clay (Drained)
        return [
          {
            id: "DF",
            label: "Foundation Depth",
            type: "number",
            placeholder: "e.g. 1.5",
            required: true,
            unit: "m",
            tooltip: "Depth from ground surface to footing base",
          },
          {
            id: "C_PRIME",
            label: "Effective Cohesion",
            type: "number",
            placeholder: "e.g. 5",
            required: true,
            unit: "kPa",
            tooltip: "Effective cohesion parameter",
          },
          {
            id: "PHI_PRIME",
            label: "Friction Angle",
            type: "number",
            placeholder: "e.g. 25",
            required: true,
            unit: "°",
            tooltip: "Effective angle of internal friction",
          },
          {
            id: "GAM",
            label: "Soil Unit Weight",
            type: "number",
            placeholder: "e.g. 18",
            required: true,
            unit: "kN/m³",
            tooltip: "Unit weight of soil",
          },
        ];
      case "S": // Sand
        return [
          {
            id: "DF",
            label: "Foundation Depth",
            type: "number",
            placeholder: "e.g. 1.5",
            required: true,
            unit: "m",
            tooltip: "Depth from ground surface to footing base",
          },
          {
            id: "PHI_PRIME",
            label: "Friction Angle",
            type: "number",
            placeholder: "e.g. 30",
            required: true,
            unit: "°",
            tooltip: "Effective angle of internal friction",
          },
          {
            id: "GAM",
            label: "Soil Unit Weight",
            type: "number",
            placeholder: "e.g. 18",
            required: true,
            unit: "kN/m³",
            tooltip: "Unit weight of soil",
          },
        ];
      case "CUST": // Custom bearing capacity
        return [
          {
            id: "BC",
            label: "Bearing Capacity",
            type: "number",
            placeholder: "e.g. 200",
            required: true,
            unit: "kPa",
            tooltip: "Allowable bearing capacity",
          },
          {
            id: "DF",
            label: "Foundation Depth",
            type: "number",
            placeholder: "e.g. 1.5",
            required: true,
            unit: "m",
            tooltip: "Depth from ground surface to footing base",
          },
          {
            id: "GAM",
            label: "Soil Unit Weight",
            type: "number",
            placeholder: "e.g. 18",
            required: true,
            unit: "kN/m³",
            tooltip: "Unit weight of soil",
          },
        ];
      default:
        return [];
    }
  };

  // Material properties (common for all)
  const materialFields = [
    {
      id: "FCK",
      label: "Concrete Strength",
      type: "number",
      placeholder: "e.g. 25",
      required: true,
      unit: "MPa",
      tooltip: "Characteristic compressive strength",
    },
    {
      id: "FYK",
      label: "Steel Strength",
      type: "number",
      placeholder: "e.g. 500",
      required: true,
      unit: "MPa",
      tooltip: "Characteristic yield strength",
    },
    {
      id: "BAR",
      label: "Rebar Diameter",
      type: "number",
      placeholder: "e.g. 16",
      required: true,
      unit: "mm",
      tooltip: "Main reinforcement bar size",
    },
    {
      id: "COV",
      label: "Concrete Cover",
      type: "select",
      options: [
        { value: "40", label: "40 mm (Footing on lean concrete)" },
        { value: "75", label: "75 mm (Footing on soil)" },
      ],
      required: true,
      tooltip: "Nominal concrete cover to reinforcement",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData("inputs", inputs);
    setActiveTab(3);
  };

  // Reusable form field component
  const FormField = ({ field }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="space-y-1 mb-4">
        <label
          htmlFor={field.id}
          className={`${styles.cardDescription} font-medium`}
        >
          <div className="flex items-center gap-1.5">
            {field.label}
            {field.tooltip && (
              <span title={field.tooltip} className="cursor-help">
                <FaInfoCircle className="w-3 h-3 text-gray-500" />
              </span>
            )}
          </div>
        </label>

        <div className="flex items-center">
          <div
            className={`flex-1 border rounded-l-md overflow-hidden ${
              isFocused
                ? "border-blue-500 ring-1 ring-blue-100"
                : "border-gray-300"
            }`}
          >
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={inputs[field.id] || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border-none focus:outline-none ${styles.sectionBodyText}`}
              placeholder={field.placeholder}
              required={field.required}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          <span
            className={`${styles.sectionBodyText} bg-gray-100 px-3 py-2 text-gray-600 border-t border-b border-r border-gray-300 rounded-r-md`}
          >
            {field.unit}
          </span>
        </div>
      </div>
    );
  };

  // Section Separator Component
  const SectionSeparator = ({ title }) => (
    <div className="w-full my-6">
      <h3 className={`${styles.sectionTitleText} mb-2`}>{title}</h3>
      <div className="w-full border-t border-gray-200" />
    </div>
  );

  // Main component return
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText} mb-2`}>Design Parameters</h2>
      <p className={`${styles.sectionBodyText} mb-6`}>
        Enter the required parameters for your {foundationType} foundation and{" "}
        {soilType} soil conditions
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Loads and Moments */}
        <SectionSeparator title="Loads and Moments" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonFields.map((field) => (
            <FormField key={field.id} field={field} />
          ))}
        </div>

        {/* Geometry */}
        <SectionSeparator title="Geometry" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getGeometryFields().map((field) => (
            <FormField key={field.id} field={field} />
          ))}
        </div>

        {/* Soil Properties */}
        <SectionSeparator title="Soil Properties" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getSoilFields().map((field) => (
            <FormField key={field.id} field={field} />
          ))}
        </div>

        {/* Material Properties */}
        <SectionSeparator title="Material Properties" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materialFields.map((field) => (
            <FormField key={field.id} field={field} />
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className={`${styles.cardTitle} px-6 py-2 bg-[#145da0] text-white rounded-md
            hover:bg-[#0e4a7c] transition-colors focus:outline-none focus:ring-2
            focus:ring-blue-300 focus:ring-offset-2 shadow-sm`}
          >
            Calculate Design
          </button>
        </div>
      </form>
    </div>
  );
}
