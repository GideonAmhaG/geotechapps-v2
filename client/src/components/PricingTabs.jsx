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
  FaUserFriends,
} from "react-icons/fa";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

const PricingTabs = () => {
  const [activeOption, setActiveOption] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

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

  const iconSize = "text-xl";

  const handleOptionChange = (index) => {
    if (transitioning || activeOption === index) return;
    setTransitioning(true);
    setActiveOption(index);
    setTimeout(() => setTransitioning(false), 500);
  };

  return (
    <div className="flex flex-col md:flex-row gap-0 pt-0 h-full">
      {/* Left side - Options */}
      <div className="md:w-[50%] bg-white pr-8 pl-8 pt-16 flex flex-col">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left px-6 py-3 rounded-xl flex items-center cursor-pointer transition-all duration-300 ease-out ${
              activeOption === index ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
            onClick={() => handleOptionChange(index)}
            disabled={transitioning}
          >
            <div
              className={`flex items-center justify-center h-12 w-12 rounded-full mr-5 flex-shrink-0 transition-all duration-300 ${
                activeOption === index
                  ? "bg-[#145da0] text-white"
                  : "bg-gray-200"
              }`}
            >
              <FaCheck className="text-xl" />
            </div>
            <div className="text-left">
              <h3
                className={`text-xl transition-colors duration-300 ${
                  activeOption === index
                    ? "text-[#145da0] font-medium"
                    : "text-gray-800"
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
      <div className="md:w-[50%] bg-white p-8 relative overflow-hidden">
        <div className="min-h-[380px] relative">
          {/* Exceptional Value Content */}
          <div
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              activeOption === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="h-full flex">
              <div className="w-[70%] pr-6 flex items-center justify-center">
                <img
                  src={heroPic}
                  alt="Software Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="w-[30%]">
                <div className="bg-gray-50 rounded-xl p-2 h-full">
                  <div className="space-y-1">
                    {tools.map((tool, i) => (
                      <div
                        key={i}
                        className={`flex items-center p-1 rounded ${
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
          </div>

          {/* Flexible Subscription Options Content */}
          <div
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              activeOption === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h3 className="text-2xl font-bold text-[#145da0] mb-4 text-left">
              <div>Pricing Based on</div>
              <div>Your Needs</div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  type: "Flexible",
                  description:
                    "Monthly payments, cancel anytime without any additional fees.",
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
                    "Monthly payments with a 12-month minimum commitment period.",
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
                },
                {
                  type: "Annual",
                  description:
                    "Save up to 17% with annual billing compared to monthly plans.",
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
                  discount: "Save 17%!",
                },
              ].map((option, i) => (
                <div
                  key={i}
                  className="border border-gray-400 rounded-xl px-4 py-5 relative"
                >
                  {option.type === "Annual" && (
                    <div className="absolute -top-3 right-4 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium shadow-sm">
                      Save 17%!
                    </div>
                  )}
                  <div className="flex justify-between items-left mb-2">
                    <h4 className="font-medium text-sm">{option.type}</h4>
                  </div>
                  <p className="text-gray-600 text-xs mb-3 text-left border-b border-gray-300 pb-3">
                    {option.description}
                  </p>
                  <div className="space-y-2">
                    {option.plans.map((plan, j) => (
                      <div key={j} className="flex flex-col items-start">
                        <p className="font-medium text-[10px]">{plan.name}</p>
                        <div className="flex flex-row">
                          <FaCheck className="text-green-500 text-[10px] mt-0.5 mr-1 flex-shrink-0" />
                          <p className="text-gray-700 text-[10px]">
                            {plan.price}{" "}
                            <span className="text-gray-500 text-[10px]">
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

          {/* Growth Content */}
          <div
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              activeOption === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h3 className="text-2xl font-bold text-[#145da0] mb-3 text-left">
              <div>Subscriptions Tailored</div>
              <div>for You</div>
            </h3>
            <div className="space-y-2">
              {[
                {
                  title: "Business",
                  description:
                    "Provides shared access solutions for multiple team members",
                  features: [
                    {
                      value: ["15", "2"],
                      icons: [
                        <MdOutlinePersonAddAlt1
                          className={iconSize}
                          key="icon1"
                        />,
                        <FaUserFriends className={iconSize} key="icon2" />,
                      ],
                      label: ["individual logins", "simultaneous users"],
                      subFeatures: [
                        "increase simultaneous users",
                        "increase individual logins",
                      ],
                      growthText: "Includes options to grow!",
                    },
                  ],
                },
                {
                  title: "Professional",
                  description:
                    "Complete engineering software package for professional users",
                  features: [
                    {
                      value: "1",
                      icon: (
                        <MdOutlinePersonAddAlt1
                          className={iconSize}
                          key="icon3"
                        />
                      ),
                      label: "designed for single users",
                      subFeatures: [
                        "add seats to your plan with multi-seat subscriptions",
                        "1 user seat = 3 devices and 6 IP limits per month",
                      ],
                      growthText: "Includes options to grow!",
                    },
                  ],
                },
                {
                  title: "Basic",
                  description:
                    "Essential structural analysis tools designed for individual users",
                  features: [
                    {
                      value: "1",
                      icon: (
                        <MdOutlinePersonAddAlt1
                          className={iconSize}
                          key="icon4"
                        />
                      ),
                      label: "designed for single users",
                      subFeatures: [
                        "add seats to your plan with multi-seat subscriptions",
                        "1 user seat = 3 devices and 6 IP limits per month",
                      ],
                      growthText: "Includes options to grow!",
                    },
                  ],
                },
              ].map((plan, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center">
                    <div className="w-[30%] pr-3 text-left">
                      <h4 className="font-medium text-sm mb-1">{plan.title}</h4>
                      <p className="text-gray-600 text-[11px] leading-tight">
                        {plan.description}
                      </p>
                    </div>
                    <div className="border-l border-gray-300 ml-2 mr-3 self-stretch"></div>
                    <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
                      {i === 0 ? (
                        <>
                          <div className="w-[20%] text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <p className="text-xl font-semibold">
                                {plan.features[0].value[0]}
                              </p>
                              {plan.features[0].icons[0]}
                            </div>
                            <p className="text-gray-600 text-[11px]">
                              {plan.features[0].label[0]}
                            </p>
                          </div>
                          <div className="w-[20%] text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {plan.features[0].icons[1]}
                              <p className="text-xl font-semibold">
                                {plan.features[0].value[1]}
                              </p>
                            </div>
                            <p className="text-gray-600 text-[11px]">
                              {plan.features[0].label[1]}
                            </p>
                          </div>
                          <div className="w-[60%]">
                            <p className="text-[11px] text-gray-600 mb-1 text-left">
                              {plan.features[0].growthText}
                            </p>
                            <ul className="space-y-1">
                              {plan.features[0].subFeatures.map((sub, k) => (
                                <li
                                  key={k}
                                  className="text-gray-600 text-[10px] flex"
                                >
                                  <span className="mr-1">✓</span>
                                  <span>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-[20%] text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <p className="text-xl font-semibold">
                                {plan.features[0].value}
                              </p>
                              {plan.features[0].icon}
                            </div>
                            <p className="text-gray-600 text-[11px]">
                              {plan.features[0].label}
                            </p>
                          </div>
                          <div className="w-[80%]">
                            <p className="text-[11px] text-gray-600 mb-1 text-left">
                              {plan.features[0].growthText}
                            </p>
                            <ul className="space-y-1">
                              {plan.features[0].subFeatures.map((sub, k) => (
                                <li
                                  key={k}
                                  className="text-gray-600 text-[10px] flex"
                                >
                                  <span className="mr-1">✓</span>
                                  <span>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTabs;
