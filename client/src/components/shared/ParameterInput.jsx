function ParameterInput({
  label,
  name,
  value,
  unit,
  onChange,
  description,
  min,
  max,
  step,
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {unit && `(${unit})`}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#145da0] focus:border-[#145da0]"
      />
      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}

export default ParameterInput;
