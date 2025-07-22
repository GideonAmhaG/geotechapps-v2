import { useState, useEffect } from "react";
import { styles } from "../../../styles";
import DesignReport from "./DesignReport";
import { MAIN_RESULTS } from "./constants";

const ResultCard = ({ items, results }) => {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-3 px-4"></th>
            <th
              scope="col"
              className={`${styles.cardDescription} py-3 px-4 text-right`}
            >
              Results
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="bg-green-50">
              <td className={`${styles.cardDescription} py-3 px-4`}>
                {item.label}
              </td>
              <td
                className={`${styles.cardDescription} font-medium py-3 px-4 text-right`}
              >
                {results[item.id]}
                {item.unit && ` ${item.unit}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Results = ({ data, updateData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!data.foundationType || !data.soilType || !data.inputs) {
          throw new Error("Missing required design data");
        }

        const response = await fetch("http://localhost:5000/api/design", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            foundationType: data.foundationType,
            soilType: data.soilType,
            inputs: data.inputs,
          }),
        });

        if (!response.ok) {
          throw new Error(`Calculation failed (Status: ${response.status})`);
        }

        const responseData = await response.json();
        updateData("results", responseData.data);
      } catch (err) {
        setError(err.message);
        updateData("results", null);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [data, updateData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#145da0]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h2 className={`${styles.sectionTitleText} text-red-600 mb-4`}>
          Error
        </h2>
        <p className="text-red-600 mb-4">{error}</p>
      </div>
    );
  }

  if (!data.results) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h2 className={`${styles.sectionTitleText} mb-4`}>No Results</h2>
        <p className={`${styles.sectionBodyText}`}>
          No results available for the current design.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText}`}>Results</h2>
      <p className={`${styles.sectionBodyText} mb-6`}>
        Review your foundation design results
      </p>

      <div className="mb-8">
        <h3 className={`${styles.cardTitle} !text-[#008080] mb-2`}>
          Design Summary
        </h3>
        <div className="w-full border-t border-gray-200 mb-4" />
        <ResultCard items={MAIN_RESULTS} results={data.results} />
      </div>

      <DesignReport data={data} results={data.results} />
    </div>
  );
};

export default Results;
