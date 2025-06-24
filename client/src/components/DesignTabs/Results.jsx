import { useEffect, useState } from "react";
import { styles } from "../../styles";
import { ResultCard } from "../shared";

function Results({ data, updateData }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/design", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            foundationType: data.foundationType,
            inputs: data.inputs,
          }),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const results = await response.json();
        setResults(results);
        updateData("results", results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [data, updateData]);

  if (loading) return <div className="text-center py-8">Calculating...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText}`}>Isolated Footing Results</h2>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ResultCard
            title="Dimensions"
            items={[
              { label: "Width (B)", value: `${results.width} m` },
              { label: "Depth (D)", value: `${results.depth} m` },
            ]}
          />
          <ResultCard
            title="Reinforcement"
            items={[
              { label: "Area", value: `${results.reinforcement_area} mm²/m` },
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default Results;
