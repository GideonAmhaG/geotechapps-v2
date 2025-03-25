import { useState } from "react";
import { heroPic } from "../assets";
import {
  FaCheck,
  FaCube,
  FaRulerVertical,
  FaWeightHanging,
  FaMobile,
  FaLayerGroup,
  FaUserCog,
  FaUsers,
  FaBuilding,
  FaProjectDiagram,
  FaAnchor,
} from "react-icons/fa";

const PricingTabs = () => {
  const [activeOption, setActiveOption] = useState(0);

  const options = [
    {
      title: "Exceptional Value",
      description:
        "Get access to a complete package of structural analysis and design software at a cost-effective price.",
    },
    {
      title: "Flexible Subscription Options",
      description:
        "Only pay for software when you need it with Flexible Monthly, Contract, and Annual Plans.",
    },
    {
      title: "SkyCiv Grows with You",
      description:
        "Expanding your team's subscription as your company grows is easy with multi-seat or Business Plans.",
    },
  ];

  const tools = [
    {
      name: "Structural 3D",
      icon: <FaCube className="text-[#145da0] text-xs" />,
    },
    {
      name: "SkyCiv Beam",
      icon: <FaRulerVertical className="text-[#145da0] text-xs" />,
    },
    {
      name: "Section Builder",
      icon: <FaLayerGroup className="text-[#145da0] text-xs" />,
    },
    {
      name: "Load Generator",
      icon: <FaWeightHanging className="text-[#145da0] text-xs" />,
    },
    {
      name: "SkyCiv Mobile",
      icon: <FaMobile className="text-[#145da0] text-xs" />,
    },
    {
      name: "Base Plate Design",
      icon: <FaAnchor className="text-[#145da0] text-xs" />,
    },
    {
      name: "Member Design",
      icon: <FaProjectDiagram className="text-[#145da0] text-xs" />,
    },
    {
      name: "RC Member Design",
      icon: <FaBuilding className="text-[#145da0] text-xs" />,
    },
    {
      name: "Connection Design",
      icon: <FaUserCog className="text-[#145da0] text-xs" />,
    },
    {
      name: "Foundation Design",
      icon: <FaUsers className="text-[#145da0] text-xs" />,
    },
  ];

  const contentContainerStyle = { minHeight: "380px" };

  return (
    <div className="flex flex-col md:flex-row gap-0 pt-0 h-full">
      {/* Left side - Options */}
      <div className="md:w-[50%] bg-white pr-8 pl-8 pt-16 flex flex-col">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left px-6 py-3 transition-all rounded-xl flex items-center cursor-pointer ${
              activeOption === index ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveOption(index)}
          >
            <div
              className={`flex items-center justify-center h-12 w-12 rounded-full mr-5 flex-shrink-0 ${
                activeOption === index
                  ? "bg-[#145da0] text-white"
                  : "bg-gray-200"
              }`}
            >
              <FaCheck className="text-xl" />
            </div>
            <div className="text-left">
              <h3
                className={`text-xl ${
                  activeOption === index ? "text-[#145da0]" : "text-gray-800"
                }`}
              >
                {option.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{option.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Right side - Content */}
      <div className="md:w-[50%] bg-white p-8 overflow-y-auto">
        {/* Exceptional Value Content - Tools List */}
        {activeOption === 0 && (
          <div className="h-full flex" style={contentContainerStyle}>
            <div className="w-[70%] pr-6 flex items-center justify-center">
              <img
                src={heroPic}
                alt="Software Preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="w-[30%]">
              <div className="bg-gray-50 rounded-xl p-2 h-full overflow-y-auto">
                <div className="space-y-1">
                  {tools.map((tool, i) => (
                    <div
                      key={i}
                      className={`flex items-center p-1 hover:bg-gray-100 rounded ${
                        i === 0 ? "mt-4" : ""
                      }`}
                    >
                      <div className="ml-3 mr-2">{tool.icon}</div>
                      <span className="text-[10px] leading-tight">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                  <div className="pt-1 pl-18">
                    <p className="text-[10px] text-gray-500">...and more!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flexible Subscription Options Content - Horizontal Cards */}
        {activeOption === 1 && (
          <div className="h-full flex flex-col" style={contentContainerStyle}>
            <h3 className="text-xl font-bold text-[#145da0] mb-4">
              Pricing Based on Your Needs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
              {[
                {
                  type: "Flexible",
                  description:
                    "Automatic monthly payments, cancel anytime without fees.",
                  plans: [
                    {
                      name: "Business Subscription",
                      price: "$699",
                      note: "USD, billed monthly",
                    },
                    {
                      name: "Professional Subscription",
                      price: "$249",
                      note: "USD, billed monthly",
                    },
                    {
                      name: "Basic Subscription",
                      price: "$89",
                      note: "USD, billed monthly",
                    },
                  ],
                },
                {
                  type: "Contract",
                  description:
                    "Automatic monthly payments, 12 month minimum term.",
                  plans: [
                    {
                      name: "Business Subscription",
                      price: "$499",
                      note: "USD, billed monthly",
                    },
                    {
                      name: "Professional Subscription",
                      price: "$139",
                      note: "USD, billed monthly",
                    },
                    {
                      name: "Basic Subscription",
                      price: "$79",
                      note: "USD, billed monthly",
                    },
                  ],
                  discount: "Save 17%!",
                },
                {
                  type: "Annual",
                  description: "Save up to 17% when you pay annually!",
                  plans: [
                    {
                      name: "Business Subscription",
                      price: "$4,990",
                      note: "USD, billed annually",
                    },
                    {
                      name: "Professional Subscription",
                      price: "$1,390",
                      note: "USD, billed annually",
                    },
                    {
                      name: "Basic Subscription",
                      price: "$790",
                      note: "USD, billed annually",
                    },
                  ],
                },
              ].map((option, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-left mb-2">
                    <h4 className="font-medium text-sm">{option.type}</h4>
                    {option.discount && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        {option.discount}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs mb-3">
                    {option.description}
                  </p>
                  <div className="space-y-2">
                    {option.plans.map((plan, j) => (
                      <div key={j} className="flex items-start">
                        <FaCheck className="text-green-500 text-xs mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-xs">{plan.name}</p>
                          <p className="text-gray-700 text-xs">
                            {plan.price}{" "}
                            <span className="text-gray-500 text-xs">
                              {plan.note}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Growth Content - Vertical Cards */}
        {activeOption === 2 && (
          <div className="h-full flex flex-col" style={contentContainerStyle}>
            <h3 className="text-xl font-bold text-[#145da0] mb-3">
              Subscriptions Tailored for You
            </h3>
            <div className="space-y-2 flex-1 overflow-y-auto">
              {[
                {
                  title: "Business",
                  description: "For multiple team members.",
                  features: [
                    { value: "15", label: "individual begins" },
                    { value: "2", label: "simultaneous users" },
                    {
                      label: "options:",
                      subFeatures: ["✓ increase users", "✓ add seats"],
                    },
                  ],
                },
                {
                  title: "Professional",
                  description: "Full software suite.",
                  features: [
                    { value: "1", label: "single user" },
                    {
                      label: "options:",
                      subFeatures: ["✓ multi-seat", "✓ 3 devices"],
                    },
                  ],
                },
                {
                  title: "Basic",
                  description: "Essential tools only.",
                  features: [
                    { value: "1", label: "single user" },
                    {
                      label: "options:",
                      subFeatures: ["✓ multi-seat", "✓ 3 devices"],
                    },
                  ],
                },
              ].map((plan, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-2.5">
                  <h4 className="font-medium text-xs mb-0.5">{plan.title}</h4>
                  <p className="text-gray-600 text-[10px] mb-1.5">
                    {plan.description}
                  </p>
                  <div className="grid grid-cols-3 gap-1">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="col-span-1">
                        {feature.value && (
                          <p className="text-xs font-bold mb-0.5">
                            {feature.value}
                          </p>
                        )}
                        <p className="text-gray-600 text-[10px] mb-0.5">
                          {feature.label}
                        </p>
                        {feature.subFeatures && (
                          <ul className="space-y-0.5">
                            {feature.subFeatures.map((sub, k) => (
                              <li key={k} className="text-gray-600 text-[10px]">
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingTabs;
