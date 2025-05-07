function ResultCard({ title, value, unit, description }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
      <h3 className="font-medium text-gray-700">{title}</h3>
      <div className="flex items-baseline mt-2">
        <p className="text-2xl font-bold text-[#145da0] mr-2">{value}</p>
        {unit && <span className="text-gray-500">{unit}</span>}
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
}

export default ResultCard;
