import { useEffect, useState } from "react";

function Results({ data }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Validate all required data exists
        if (!data.foundationType || !data.soilType || !data.inputs) {
          throw new Error("Missing required design data");
        }

        const response = await fetch("http://localhost:5000/api/design", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            foundationType: data.foundationType,
            soilType: data.soilType, // Make sure this is included
            inputs: data.inputs,
          }),
        });

        if (!response.ok) {
          let errorMessage = "Calculation failed";
          try {
            const errorData = await response.json();
            errorMessage = errorData.error?.message || errorMessage;
          } catch (e) {
            console.error("Error parsing error response:", e);
          }
          throw new Error(`${errorMessage} (Status: ${response.status})`);
        }

        const responseData = await response.json();

        console.log("API Response:", responseData); // Debug log

        if (!responseData.data) {
          throw new Error("Invalid response format from server");
        }

        setResults({
          b: responseData.data.b,
          d: responseData.data.d,
          N: responseData.data.N,
          s: responseData.data.s,
        });
      } catch (err) {
        console.error("Calculation error:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [data]);

  if (loading) return <div className="p-4 text-center">Calculating...</div>;
  if (error)
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-red-500">Error</h2>
        <p className="text-red-500">{error}</p>
        <p className="mt-2 text-sm text-gray-600">
          Please check your input parameters and try again.
        </p>
      </div>
    );

  if (!results)
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">No Results</h2>
        <p>No results available for the current design.</p>
      </div>
    );

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
