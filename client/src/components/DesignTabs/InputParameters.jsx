import React, { useCallback, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCircleInfo } from "react-icons/fa6";
import { styles } from "../../styles";

const COMMON_FIELDS = [
  {
    id: "DL",
    label: "Gk",
    type: "number",
    placeholder: "e.g. 500",
    unit: "kN",
    tooltip: "Permanent Load (Gk) - Unfactored permanent vertical load",
    required: true,
    min: 0,
  },
  {
    id: "LL",
    label: "Qk",
    type: "number",
    placeholder: "e.g. 300",
    unit: "kN",
    tooltip: "Variable Load (Qk) - Unfactored variable vertical load",
    required: true,
    min: 0,
  },
  {
    id: "mxp",
    label: "Moment X Permanent",
    type: "number",
    placeholder: "e.g. 50",
    unit: "kN-m",
    tooltip: "Moment X Permanent - Unfactored permanent moment about X-axis",
    required: true,
  },
  {
    id: "mxv",
    label: "Moment X Variable",
    type: "number",
    placeholder: "e.g. 30",
    unit: "kN-m",
    tooltip: "Moment X Variable - Unfactored variable moment about X-axis",
    required: true,
  },
  {
    id: "myp",
    label: "Moment Y Permanent",
    type: "number",
    placeholder: "e.g. 50",
    unit: "kN-m",
    tooltip: "Moment Y Permanent - Unfactored permanent moment about Y-axis",
    required: true,
  },
  {
    id: "myv",
    label: "Moment Y Variable",
    type: "number",
    placeholder: "e.g. 30",
    unit: "kN-m",
    tooltip: "Moment Y Variable - Unfactored variable moment about Y-axis",
    required: true,
  },
];

const MATERIAL_FIELDS = [
  {
    id: "FCK",
    label: "Concrete Strength",
    type: "number",
    placeholder: "e.g. 25",
    unit: "MPa",
    tooltip: "Concrete Strength - Characteristic compressive strength",
    required: true,
    min: 20,
    max: 60,
  },
  {
    id: "FYK",
    label: "Steel Strength",
    type: "number",
    placeholder: "e.g. 500",
    unit: "MPa",
    tooltip: "Steel Strength - Characteristic yield strength",
    required: true,
    min: 400,
    max: 600,
  },
  {
    id: "BAR",
    label: "Rebar Diameter",
    type: "number",
    placeholder: "e.g. 16",
    unit: "mm",
    tooltip: "Rebar Diameter - Main reinforcement bar size",
    required: true,
    min: 8,
    max: 32,
  },
  {
    id: "COV",
    label: "Concrete Cover",
    type: "select",
    options: [
      { value: "40", label: "40 mm (Footing on lean concrete)" },
      { value: "75", label: "75 mm (Footing on soil)" },
    ],
    tooltip: "Concrete Cover - Nominal concrete cover to reinforcement",
    required: true,
  },
];

const FormField = React.memo(({ field, register, errors }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const tooltipRef = useRef(null);

  const updateTooltipPosition = useCallback(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setTooltipStyle({
        left: `${rect.left}px`,
        bottom: `${window.innerHeight - rect.top + 8}px`,
      });
    }
  }, []);

  useEffect(() => {
    updateTooltipPosition();
    const handleScroll = () => updateTooltipPosition();
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [updateTooltipPosition]);

  const error = errors[field.id];

  return (
    <div className="mb-4">
      <label
        htmlFor={field.id}
        className={`text-gray-600 text-[11px] sm:text-[13px] font-medium block mb-1`}
      >
        <div className="flex items-center gap-1.5">
          {field.label}
          {field.tooltip && (
            <div
              className="relative group"
              ref={tooltipRef}
              style={{ isolation: "isolate" }}
              onMouseEnter={() => {
                setIsHovered(true);
                updateTooltipPosition();
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <FaCircleInfo className="w-3.5 h-3.5 text-gray-500 cursor-help" />
              <div
                className="absolute z-[9999] opacity-0 group-hover:opacity-100 bottom-full left-0 mb-3 px-3 py-3 text-[11px] sm:text-[12.5px] bg-gray-800 text-white rounded min-w-[250px] whitespace-normal break-words transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto shadow-lg"
                style={{
                  position: "fixed",
                  maxWidth: "calc(100vw - 2rem)",
                  ...tooltipStyle,
                }}
              >
                {field.tooltip}
                <div className="absolute top-full left-3 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800" />
              </div>
            </div>
          )}
        </div>
      </label>

      <div className="flex items-stretch">
        <div
          className={`flex-1 border rounded-l-sm overflow-hidden ${
            isFocused
              ? "border-blue-500 ring-1 ring-blue-100"
              : error
              ? "border-red-500"
              : "border-gray-300"
          }`}
        >
          {field.type === "select" ? (
            <select
              id={field.id}
              {...register(field.id, { required: field.required })}
              className="w-full px-3 py-[0.4rem] border-none focus:outline-none text-[11px] sm:text-[13px] leading-tight"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.id}
              {...register(field.id, {
                required: field.required && "This field is required",
                min: field.min && {
                  value: field.min,
                  message: `Minimum value is ${field.min}`,
                },
                max: field.max && {
                  value: field.max,
                  message: `Maximum value is ${field.max}`,
                },
                valueAsNumber: field.type === "number",
              })}
              className="w-full px-3 py-[0.4rem] border-none focus:outline-none text-[11px] sm:text-[13px] leading-tight"
              placeholder={field.placeholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}
        </div>
        <span className="bg-gray-100 px-3 py-[0.4rem] text-gray-600 border-t border-b border-r border-gray-300 rounded-r-sm flex items-center text-[11px] sm:text-[13px] leading-tight">
          {field.unit}
        </span>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
});

const SectionSeparator = ({ title }) => (
  <div className="w-full my-6">
    <h3 className={`${styles.cardTitle} !text-[#008080] mb-2`}>{title}</h3>
    <div className="w-full border-t border-gray-200" />
  </div>
);

export default function InputParameters({ data, updateData, setActiveTab }) {
  const { foundationType, soilType } = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data.inputs || {},
  });

  const getGeometryFields = useCallback(() => {
    const fields = {
      isolated: [
        {
          id: "COL",
          label: "Column Width X",
          type: "number",
          placeholder: "e.g. 300",
          unit: "mm",
          tooltip: "Column Width X - Column dimension along X-axis",
          required: true,
          min: 100,
        },
        {
          id: "COLY",
          label: "Column Width Y",
          type: "number",
          placeholder: "e.g. 300",
          unit: "mm",
          tooltip: "Column Width Y - Column dimension along Y-axis",
          required: true,
          min: 100,
        },
      ],
      combined: [
        {
          id: "COL1",
          label: "Column 1 Width X",
          type: "number",
          placeholder: "e.g. 300",
          unit: "mm",
          tooltip: "Column 1 Width X - First column X dimension",
          required: true,
          min: 100,
        },
        {
          id: "COLY1",
          label: "Column 1 Width Y",
          type: "number",
          placeholder: "e.g. 300",
          unit: "mm",
          tooltip: "Column 1 Width Y - First column Y dimension",
          required: true,
          min: 100,
        },
        {
          id: "COL2",
          label: "Column 2 Width X",
          type: "number",
          placeholder: "e.g. 300",
          unit: "mm",
          tooltip: "Column 2 Width X - Second column X dimension",
          required: true,
          min: 100,
        },
        {
          id: "COLY2",
          label: "Column 2 Width Y",
          type: "number",
          placeholder: "e.g. 300",
          unit: "mm",
          tooltip: "Column 2 Width Y - Second column Y dimension",
          required: true,
          min: 100,
        },
        {
          id: "COL_SPACING",
          label: "Column Spacing",
          type: "number",
          placeholder: "e.g. 3000",
          unit: "mm",
          tooltip: "Column Spacing - Distance between column centers",
          required: true,
          min: 500,
        },
      ],
      strap: [
        {
          id: "COL_MAIN",
          label: "Main Column Width",
          type: "number",
          placeholder: "e.g. 400",
          unit: "mm",
          tooltip: "Main Column Width - Primary column dimension",
          required: true,
          min: 100,
        },
        {
          id: "COL_STRAP",
          label: "Strap Column Width",
          type: "number",
          placeholder: "e.g. 300",
          unit: "mm",
          tooltip: "Strap Column Width - Secondary column dimension",
          required: true,
          min: 100,
        },
        {
          id: "STRAP_LENGTH",
          label: "Strap Beam Length",
          type: "number",
          placeholder: "e.g. 2500",
          unit: "mm",
          tooltip: "Strap Beam Length - Distance between columns",
          required: true,
          min: 500,
        },
      ],
      retaining: [
        {
          id: "WALL_HEIGHT",
          label: "Wall Height",
          type: "number",
          placeholder: "e.g. 2000",
          unit: "mm",
          tooltip: "Wall Height - Total wall height",
          required: true,
          min: 500,
        },
        {
          id: "WALL_THICKNESS",
          label: "Wall Thickness",
          type: "number",
          placeholder: "e.g. 300",
          unit: "mm",
          tooltip: "Wall Thickness - Base thickness of wall",
          required: true,
          min: 100,
        },
        {
          id: "TOE_LENGTH",
          label: "Toe Length",
          type: "number",
          placeholder: "e.g. 1000",
          unit: "mm",
          tooltip: "Toe Length - Length of toe extension",
          required: true,
          min: 300,
        },
        {
          id: "HEEL_LENGTH",
          label: "Heel Length",
          type: "number",
          placeholder: "e.g. 1500",
          unit: "mm",
          tooltip: "Heel Length - Length of heel extension",
          required: true,
          min: 300,
        },
      ],
    };
    return fields[foundationType] || [];
  }, [foundationType]);

  const getSoilFields = useCallback(() => {
    const fields = {
      CU: [
        {
          id: "DF",
          label: "Foundation Depth",
          type: "number",
          placeholder: "e.g. 1500",
          unit: "mm",
          tooltip:
            "Foundation Depth - Depth from ground surface to footing base",
          required: true,
          min: 300,
        },
        {
          id: "CU",
          label: "Undrained Cohesion",
          type: "number",
          placeholder: "e.g. 50",
          unit: "kPa",
          tooltip: "Undrained Cohesion - Soil undrained shear strength",
          required: true,
          min: 10,
        },
        {
          id: "GAM",
          label: "Soil Unit Weight",
          type: "number",
          placeholder: "e.g. 18",
          unit: "kN/m³",
          tooltip: "Soil Unit Weight - Unit weight of soil",
          required: true,
          min: 15,
          max: 22,
        },
      ],
      CD: [
        {
          id: "DF",
          label: "Foundation Depth",
          type: "number",
          placeholder: "e.g. 1500",
          unit: "mm",
          tooltip:
            "Foundation Depth - Depth from ground surface to footing base",
          required: true,
          min: 300,
        },
        {
          id: "C_PRIME",
          label: "Effective Cohesion",
          type: "number",
          placeholder: "e.g. 5",
          unit: "kPa",
          tooltip: "Effective Cohesion - Effective cohesion parameter",
          required: true,
          min: 0,
        },
        {
          id: "PHI_PRIME",
          label: "Friction Angle",
          type: "number",
          placeholder: "e.g. 25",
          unit: "°",
          tooltip: "Friction Angle - Effective angle of internal friction",
          required: true,
          min: 0,
          max: 45,
        },
        {
          id: "GAM",
          label: "Soil Unit Weight",
          type: "number",
          placeholder: "e.g. 18",
          unit: "kN/m³",
          tooltip: "Soil Unit Weight - Unit weight of soil",
          required: true,
          min: 15,
          max: 22,
        },
      ],
      S: [
        {
          id: "DF",
          label: "Foundation Depth",
          type: "number",
          placeholder: "e.g. 1500",
          unit: "mm",
          tooltip:
            "Foundation Depth - Depth from ground surface to footing base",
          required: true,
          min: 300,
        },
        {
          id: "PHI_PRIME",
          label: "Friction Angle",
          type: "number",
          placeholder: "e.g. 30",
          unit: "°",
          tooltip: "Friction Angle - Effective angle of internal friction",
          required: true,
          min: 25,
          max: 40,
        },
        {
          id: "GAM",
          label: "Soil Unit Weight",
          type: "number",
          placeholder: "e.g. 18",
          unit: "kN/m³",
          tooltip: "Soil Unit Weight - Unit weight of soil",
          required: true,
          min: 15,
          max: 22,
        },
      ],
      CUST: [
        {
          id: "BC",
          label: "Bearing Capacity",
          type: "number",
          placeholder: "e.g. 200",
          unit: "kPa",
          tooltip: "Bearing Capacity - Allowable bearing capacity",
          required: true,
          min: 50,
        },
        {
          id: "DF",
          label: "Foundation Depth",
          type: "number",
          placeholder: "e.g. 1500",
          unit: "mm",
          tooltip:
            "Foundation Depth - Depth from ground surface to footing base",
          required: true,
          min: 300,
        },
        {
          id: "GAM",
          label: "Soil Unit Weight",
          type: "number",
          placeholder: "e.g. 18",
          unit: "kN/m³",
          tooltip: "Soil Unit Weight - Unit weight of soil",
          required: true,
          min: 15,
          max: 22,
        },
      ],
    };
    return fields[soilType] || [];
  }, [soilType]);

  const onSubmit = (formData) => {
    updateData("inputs", formData);
    setActiveTab(3);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText}`}>Inputs</h2>
      <p className={`${styles.sectionBodyText} mb-6`}>
        Enter the required parameters for your foundation design
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SectionSeparator title="Loads and Moments" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMMON_FIELDS.map((field) => (
            <FormField
              key={field.id}
              field={field}
              register={register}
              errors={errors}
            />
          ))}
        </div>

        <SectionSeparator title="Geometry" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getGeometryFields().map((field) => (
            <FormField
              key={field.id}
              field={field}
              register={register}
              errors={errors}
            />
          ))}
        </div>

        <SectionSeparator title="Soil Properties" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getSoilFields().map((field) => (
            <FormField
              key={field.id}
              field={field}
              register={register}
              errors={errors}
            />
          ))}
        </div>

        <SectionSeparator title="Material Properties" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MATERIAL_FIELDS.map((field) => (
            <FormField
              key={field.id}
              field={field}
              register={register}
              errors={errors}
            />
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className={`${styles.cardTitle} px-6 py-2 bg-[#145da0] text-white rounded-md hover:bg-[#0e4a7c] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 shadow-sm`}
          >
            Calculate Design
          </button>
        </div>
      </form>
    </div>
  );
}
