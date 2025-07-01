import React, { useState, useEffect, useRef } from "react";
import { FaCircleInfo } from "react-icons/fa6";

const FormField = React.memo(({ field, register, errors }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);
  const inputRef = useRef(null);

  const updateTooltipPosition = () => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setTooltipStyle({
        left: `${rect.left}px`,
        bottom: `${window.innerHeight - rect.top + 8}px`,
      });
    }
  };

  useEffect(() => {
    updateTooltipPosition();
    const handleScroll = () => updateTooltipPosition();
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const error = errors[field.id];

  // Add this effect to prevent unwanted value changes
  useEffect(() => {
    const handleWheel = (e) => {
      if (document.activeElement === inputRef.current) {
        e.preventDefault();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="mb-4">
      <label
        htmlFor={field.id}
        className="text-gray-600 text-[11px] sm:text-[13px] font-medium block mb-1"
      >
        <div className="flex items-center gap-1.5">
          {field.displayLabel}
          {field.tooltip && (
            <div
              className="relative group"
              ref={tooltipRef}
              style={{ isolation: "isolate" }}
              onMouseEnter={updateTooltipPosition}
              onClick={() => setIsTooltipVisible((prev) => !prev)}
            >
              <FaCircleInfo className="w-3.5 h-3.5 text-gray-500 cursor-help" />
              <div
                className={`absolute z-[9999] ${
                  isTooltipVisible
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                } group-hover:opacity-100 bottom-full left-0 mb-3 px-3 py-3 text-[11px] sm:text-[12.5px] bg-gray-800 text-white rounded min-w-[250px] whitespace-normal break-words transition-all duration-300 ease-out shadow-lg`}
                style={{
                  position: "fixed",
                  maxWidth: "calc(100vw - 2rem)",
                  ...tooltipStyle,
                }}
              >
                <div className="font-bold">{field.label}</div>
                {field.tooltip.split(" - ").map((part, index) => (
                  <div key={index}>{index === 0 ? null : part} </div>
                ))}
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
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.id}
              ref={(e) => {
                inputRef.current = e;
                register(field.id, {
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
                }).ref(e);
              }}
              className="w-full px-3 py-[0.4rem] border-none focus:outline-none text-[11px] sm:text-[13px] leading-tight"
              placeholder={field.placeholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              step={field.step || "any"} // Add this to prevent step interference
              onWheel={(e) => e.target.blur()} // Add this to prevent wheel changes
            />
          )}
        </div>
        {field.unit && (
          <span className="bg-gray-100 px-3 py-[0.4rem] text-gray-600 border-t border-b border-r border-gray-300 rounded-r-sm flex items-center text-[11px] sm:text-[13px] leading-tight">
            {field.unit}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
});

FormField.displayName = "FormField";

export default FormField;
