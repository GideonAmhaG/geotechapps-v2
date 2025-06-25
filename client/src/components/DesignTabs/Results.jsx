import { useEffect, useState } from "react";

function Results({ data }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/design", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            foundationType: data.foundationType,
            inputs: data.inputs,
          }),
        });

        if (!response.ok) throw new Error("Calculation failed");
        const { data: fullResults } = await response.json();

        // Extract only what we need from the full response
        setResults({
          b: fullResults.b, // Width (m)
          d: fullResults.d, // Thickness (m)
          N: fullResults.N, // Number of bars
          s: fullResults.s, // Spacing (mm)
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [data]);

  if (loading) return <div className="p-4 text-center">Calculating...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Design Results</h2>
      <div className="space-y-3">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Footing Width (B)</span>
          <span className="font-medium">{results.b} m</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Thickness (D)</span>
          <span className="font-medium">{results.d} m</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Number of Bars (N)</span>
          <span className="font-medium">{results.N}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Bar Spacing (S)</span>
          <span className="font-medium">{results.s} mm</span>
        </div>
      </div>
    </div>
  );
}

export default Results;
