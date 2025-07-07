import { useState, useEffect, useRef } from "react";
import { styles } from "../../../styles";
import DesignReport from "./DesignReport";
import { MAIN_RESULTS } from "./constants";

const ResultCard = ({ items, results }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
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

const Results = ({ data }) => {
  const [rawResults, setRawResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  const convertedResults = rawResults
    ? {
        ...rawResults,
        b: rawResults.b * 1000,
        l: rawResults.b * 1000,
        d: rawResults.d * 1000,
        D_wide: rawResults.D_wide * 1000,
        D_punch: rawResults.D_punch * 1000,
        B_final: rawResults.B_final * 1000,
        D_final: rawResults.D_final * 1000,
        d_final: rawResults.d_final * 1000,
        d_wide: rawResults.d_wide * 1000,
        d_punch: rawResults.d_punch * 1000,
        z: rawResults.z * 1000,
        Ap2_wide: rawResults.Ap2_wide * 1000000,
        As_wide: rawResults.As_wide * 1000000,
        Ap2_punch: rawResults.Ap2_punch * 1000000,
        As_punch: rawResults.As_punch * 1000000,
        Nxb: rawResults.N,
        Nyb: rawResults.N,
        Sxb: rawResults.s,
        Syb: rawResults.s,
      }
    : null;

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
        setRawResults(responseData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [data]);

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

  if (!convertedResults) {
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
        <ResultCard items={MAIN_RESULTS} results={convertedResults} />
      </div>

      <DesignReport data={data} results={convertedResults} />
    </div>
  );
};

export default Results;
