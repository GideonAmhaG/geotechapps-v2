import { useState } from "react";
import { styles } from "../styles";
import {
  FoundationType,
  SoilType,
  InputParameters,
  Results,
  TabButton,
} from "../components";

export default function Design() {
  const [activeTab, setActiveTab] = useState(0);
  const [designData, setDesignData] = useState({
    foundationType: null,
    soilType: null,
    parameters: {},
    results: null,
  });

  const tabs = [
    { id: 0, label: "Foundation Type", component: FoundationType },
    { id: 1, label: "Soil Type", component: SoilType },
    { id: 2, label: "Input Parameters", component: InputParameters },
    { id: 3, label: "Results", component: Results },
  ];

  const updateDesignData = (key, value) => {
    setDesignData((prev) => ({ ...prev, [key]: value }));
  };

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className={`${styles.padding} bg-gray-50 min-h-screen`}>
      <div className={styles.sectionContainer}>
        <h1 className={`${styles.sectionHeadText} mb-2`}>Foundation Design</h1>
        <p className={`${styles.sectionSubText} mb-8`}>
          Step-by-step foundation design tool
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              disabled={
                (tab.id === 1 && !designData.foundationType) ||
                (tab.id === 2 && !designData.soilType) ||
                (tab.id === 3 && !designData.parameters)
              }
            >
              {tab.label}
            </TabButton>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ActiveComponent
            data={designData}
            updateData={updateDesignData}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
}
