import { ResultCard } from "../";
import { FaCheckCircle, FaFileDownload } from "react-icons/fa";

function Results({ data }) {
  if (!data.results)
    return <p>No results available. Please complete the design process.</p>;

  return (
    <div>
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold">Design Results</h2>
        <span className="ml-2 text-green-500 flex items-center">
          <FaCheckCircle className="mr-1" />
          Success
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {data.foundationType === "shallow" ? (
          <>
            <ResultCard
              title="Bearing Capacity"
              value={data.results.bearingCapacity}
              unit="kPa"
              description="Maximum pressure the soil can withstand"
            />
            <ResultCard
              title="Expected Settlement"
              value={data.results.settlement}
              unit="mm"
              description="Estimated foundation settlement"
            />
          </>
        ) : (
          <>
            <ResultCard
              title="Pile Capacity"
              value={data.results.pileCapacity}
              unit="kN"
              description="Maximum load capacity of the pile"
            />
            <ResultCard
              title="Expected Settlement"
              value={data.results.settlement}
              unit="mm"
              description="Estimated foundation settlement"
            />
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <button className="px-4 py-2 bg-[#145da0] text-white rounded-md hover:bg-[#104f85] transition-colors duration-200 flex items-center">
          <FaFileDownload className="mr-2" />
          Download Report
        </button>
        <button className="px-4 py-2 border border-[#145da0] text-[#145da0] rounded-md hover:bg-blue-50 transition-colors duration-200">
          Start New Design
        </button>
      </div>
    </div>
  );
}

export default Results;
