import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  FoundationType,
  SoilType,
  InputParameters,
  Results,
} from "../components";

export default function Design() {
  const [activeTab, setActiveTab] = useState(0);
  const [designData, setDesignData] = useState({
    foundationType: null,
    soilType: null,
    inputs: {},
    results: null,
  });

  const tabs = [
    { id: 0, label: "Foundation", component: FoundationType },
    { id: 1, label: "Soil", component: SoilType },
    { id: 2, label: "Inputs", component: InputParameters },
    { id: 3, label: "Results", component: Results },
  ];

  const updateDesignData = (key, value) => {
    setDesignData((prev) => ({ ...prev, [key]: value }));
  };

  const ActiveComponent = tabs[activeTab].component;

  const handleNext = () => {
    if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
  };

  const handleBack = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Left Panel (Inputs) */}
      <div className="w-full lg:w-1/2 p-4 overflow-y-auto h-[50vh] lg:h-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-600">
            Foundation Design
          </h1>
          <div className="text-xs md:text-sm text-gray-500 hidden sm:block">
            Eurocode (EN) <span className="font-medium">1992-1-1</span>,{" "}
            <span className="font-medium">1997-1</span>
          </div>
        </div>

        <div className="flex items-center mb-6 space-x-4">
          <button
            onClick={handleBack}
            disabled={activeTab === 0}
            className={`p-2 rounded-full transition-colors ${
              activeTab === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>

          <div className="flex-1 overflow-x-auto">
            <div className="flex space-x-1 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  disabled={
                    (tab.id === 1 && !designData.foundationType) ||
                    (tab.id === 2 && !designData.soilType) ||
                    (tab.id === 3 && !designData.inputs)
                  }
                  className={`relative px-4 py-2 text-xs md:text-sm lg:text-base font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-[#145da0]"
                      : "text-gray-500 hover:text-gray-700"
                  } ${
                    (tab.id === 1 && !designData.foundationType) ||
                    (tab.id === 2 && !designData.soilType) ||
                    (tab.id === 3 && !designData.inputs)
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[0.1rem] lg:h-0.5 bg-[#145da0] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={
              (activeTab === 0 && !designData.foundationType) ||
              (activeTab === 1 && !designData.soilType) ||
              (activeTab === 2 && !designData.inputs) ||
              activeTab === tabs.length - 1
            }
            className={`p-2 rounded-full ${
              (activeTab === 0 && !designData.foundationType) ||
              (activeTab === 1 && !designData.soilType) ||
              (activeTab === 2 && !designData.inputs) ||
              activeTab === tabs.length - 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FiChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 mb-4 overflow-x-auto">
          <ActiveComponent
            data={designData}
            updateData={updateDesignData}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>

      {/* Right Panel (Visuals) */}
      <div className="w-full lg:w-1/2 bg-gray-100 border-t lg:border-t-0 lg:border-l border-gray-200 overflow-y-auto h-[50vh] lg:h-auto">
        <div className="h-full w-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="p-4">
            <span className="text-gray-400 block">Interactive Diagram</span>
          </div>
        </div>
      </div>
    </div>
  );
}
