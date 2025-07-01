import { useEffect, useState, useRef } from "react";
import { FiDownload, FiPrinter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { saveAs } from "file-saver";

function Results({ data }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const reportRef = useRef();

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
        if (!responseData.data) {
          throw new Error("Invalid response format from server");
        }

        setResults({
          b: responseData.data.b,
          d: responseData.data.d,
          N: responseData.data.N,
          s: responseData.data.s,
          ...responseData.data, // Include all additional data for the report
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

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    pageStyle: `
      @page { size: A4; margin: 1cm; }
      @media print { 
        body { font-size: 12pt; }
        .print-section { break-inside: avoid; }
      }
    `,
    documentTitle: `Foundation_Design_Report_${
      new Date().toISOString().split("T")[0]
    }`,
  });

  const handleDownload = () => {
    const blob = new Blob(
      [document.getElementById("design-report").innerHTML],
      {
        type: "text/html;charset=utf-8",
      }
    );
    saveAs(
      blob,
      `Foundation_Design_${new Date().toISOString().split("T")[0]}.html`
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-red-600">Error</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-sm text-gray-600">
          Please check your input parameters and try again.
        </p>
      </div>
    );

  if (!results)
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">No Results</h2>
        <p>No results available for the current design.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Results Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Design Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">Dimensions</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Footing Width (B)</span>
                  <span className="font-medium">{results.b} m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thickness (D)</span>
                  <span className="font-medium">{results.d} m</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">
                Reinforcement
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Bars (N)</span>
                  <span className="font-medium">{results.N}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bar Spacing (S)</span>
                  <span className="font-medium">{results.s} mm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowReport(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              View Full Report
            </button>
          </div>
        </div>
      </div>

      {/* Design Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-bold text-gray-800">Design Report</h3>
              <button
                onClick={() => setShowReport(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div
              className="overflow-y-auto p-6"
              ref={reportRef}
              id="design-report"
            >
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-center mb-2">
                  Foundation Design Report
                </h1>
                <p className="text-center text-gray-600">
                  Generated on {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* Project Information */}
              <div className="mb-8 print-section">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                  Project Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <span className="font-medium">Foundation Type:</span>{" "}
                      {data.foundationType}
                    </p>
                    <p>
                      <span className="font-medium">Soil Type:</span>{" "}
                      {data.soilType}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Design Results Summary */}
              <div className="mb-8 print-section">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                  Design Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h3 className="font-medium mb-2">Dimensions</h3>
                    <ul className="space-y-1">
                      <li>Footing Width (B): {results.b} m</li>
                      <li>Thickness (D): {results.d} m</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h3 className="font-medium mb-2">Reinforcement</h3>
                    <ul className="space-y-1">
                      <li>Number of Bars (N): {results.N}</li>
                      <li>Bar Spacing (S): {results.s} mm</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed Calculations */}
              <div className="mb-8 print-section">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                  Detailed Calculations
                </h2>

                {/* Bearing Capacity */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">1. Bearing Capacity</h3>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    {results.qa && (
                      <p>
                        Allowable bearing capacity (q<sub>a</sub>): {results.qa}{" "}
                        kPa
                      </p>
                    )}
                    {results.qu && (
                      <p>
                        Ultimate bearing capacity (q<sub>u</sub>): {results.qu}{" "}
                        kPa
                      </p>
                    )}
                    {results.fs && <p>Factor of safety (FS): {results.fs}</p>}
                  </div>
                </div>

                {/* Structural Design */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">2. Structural Design</h3>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p>
                      Design axial load (P): {results.p_s?.toFixed(2) || "N/A"}{" "}
                      kN
                    </p>
                    <p>
                      Maximum stress (σ<sub>max</sub>):{" "}
                      {results.sig_p?.toFixed(2) || "N/A"} kPa
                    </p>
                    <p>
                      Reinforcement area (A<sub>s</sub>):{" "}
                      {results.As?.toFixed(2) || "N/A"} mm²
                    </p>
                  </div>
                </div>

                {/* Verification Checks */}
                <div>
                  <h3 className="font-medium mb-2">3. Verification Checks</h3>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p>
                      Shear resistance (v<sub>Rd</sub>):{" "}
                      {results.vrd?.toFixed(2) || "N/A"} kPa
                    </p>
                    <p>
                      Moment resistance (M<sub>Rd</sub>):{" "}
                      {results.mrd?.toFixed(2) || "N/A"} kNm
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Parameters */}
              <div className="print-section">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                  Input Parameters
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Loads</h3>
                    <ul className="space-y-1">
                      <li>
                        Permanent load (G<sub>k</sub>): {data.inputs.DL} kN
                      </li>
                      <li>
                        Variable load (Q<sub>k</sub>): {data.inputs.LL} kN
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Material Properties</h3>
                    <ul className="space-y-1">
                      <li>
                        Concrete strength (f<sub>ck</sub>): {data.inputs.fck}{" "}
                        MPa
                      </li>
                      <li>
                        Steel strength (f<sub>yk</sub>): {data.inputs.fyk} MPa
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4 flex justify-end space-x-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <FiPrinter className="mr-2" /> Print
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <FiDownload className="mr-2" /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
