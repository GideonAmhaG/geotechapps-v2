import { useState } from "react";
import { ParameterInput } from "../";
import { FaCalculator } from "react-icons/fa";

// Parameter configurations based on foundation and soil type
const getParametersConfig = (foundationType, soilType) => {
  const commonParams = [
    {
      name: "load",
      label: "Design Load",
      unit: "kN",
      description: "Total vertical load to be supported",
      min: 10,
      max: 10000,
      step: 10,
    },
  ];

  if (foundationType === "shallow") {
    return [
      ...commonParams,
      {
        name: "width",
        label: "Foundation Width",
        unit: "m",
        description: "Width of the footing",
        min: 0.5,
        max: 10,
        step: 0.1,
      },
      {
        name: "length",
        label: "Foundation Length",
        unit: "m",
        description: "Length of the footing",
        min: 0.5,
        max: 10,
        step: 0.1,
      },
    ];
  } else {
    // Deep foundation parameters
    return [
      ...commonParams,
      {
        name: "diameter",
        label: "Pile Diameter",
        unit: "m",
        description: "Diameter of the pile",
        min: 0.2,
        max: 2,
        step: 0.05,
      },
      {
        name: "depth",
        label: "Pile Depth",
        unit: "m",
        description: "Embedment depth of the pile",
        min: 5,
        max: 50,
        step: 0.5,
      },
    ];
  }
};

export default function InputParameters({ data, updateData, setActiveTab }) {
  const [parameters, setParameters] = useState(data.parameters || {});
  const paramsConfig = getParametersConfig(data.foundationType, data.soilType);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData("parameters", parameters);
    // Perform calculations here or in Results component
    updateData("results", calculateResults(data.foundationType, parameters));
    setActiveTab(3); // Move to results tab
  };

  // Mock calculation function
  const calculateResults = (foundationType, params) => {
    if (foundationType === "shallow") {
      return {
        bearingCapacity: (params.load / (params.width * params.length)).toFixed(
          2
        ),
        settlement: (params.load * 0.001).toFixed(2),
      };
    } else {
      return {
        pileCapacity: (params.load * 1.5).toFixed(2),
        settlement: (params.load * 0.0005).toFixed(2),
      };
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Input Parameters</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {paramsConfig.map((param) => (
            <ParameterInput
              key={param.name}
              {...param}
              value={parameters[param.name] || ""}
              onChange={handleChange}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 flex items-center justify-center px-6 py-3 bg-[#145da0] text-white rounded-md hover:bg-[#104f85] transition-colors duration-200"
        >
          <FaCalculator className="mr-2" />
          Calculate Results
        </button>
      </form>
    </div>
  );
}
