import { useState, useRef, useEffect } from "react";
import { value } from "../assets";
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
  const [sliderPosition, setSliderPosition] = useState({ top: 0, height: 0 });
  const optionsRef = useRef([]);
  const containerRef = useRef(null);

  const options = [
    {
      title: "Advanced Features",
      description:
        "Access premium geotechnical design tools and analysis software at competitive rates.",
    },
    {
      title: "Customizable Plans",
      description:
        "Choose from Monthly, Annual, or Project-based pricing to match your workflow.",
    },
    {
      title: "Scalable Solutions",
      description:
        "Easily upgrade your subscription as your engineering needs expand over time.",
    },
  ];

  const tools = [
    {
      name: "Soil Analysis",
      icon: <FaCube className="text-[#145da0] text-xs" />,
    },
    {
      name: "Pile Design",
      icon: <FaRulerVertical className="text-[#145da0] text-xs" />,
    },
    {
      name: "Slope Stability",
      icon: <FaLayerGroup className="text-[#145da0] text-xs" />,
    },
    {
      name: "Load Analysis",
      icon: <FaWeightHanging className="text-[#145da0] text-xs" />,
    },
    {
      name: "Mobile Access",
      icon: <FaMobile className="text-[#145da0] text-xs" />,
    },
    {
      name: "Foundation Design",
      icon: <FaAnchor className="text-[#145da0] text-xs" />,
    },
    {
      name: "Retaining Walls",
      icon: <FaProjectDiagram className="text-[#145da0] text-xs" />,
    },
    {
      name: "Bearing Capacity",
      icon: <FaBuilding className="text-[#145da0] text-xs" />,
    },
    {
      name: "Settlement Calc",
      icon: <FaUserCog className="text-[#145da0] text-xs" />,
    },
    {
      name: "Geotech Reports",
      icon: <FaUsers className="text-[#145da0] text-xs" />,
    },
  ];

  const iconSize = "text-xl";

  const updateSliderPosition = () => {
    if (optionsRef.current[activeOption]) {
      const activeElement = optionsRef.current[activeOption];
      const { offsetTop, offsetHeight } = activeElement;
      setSliderPosition({
        top: offsetTop,
        height: offsetHeight,
      });
    }
  };

  useEffect(() => {
    updateSliderPosition();

    const resizeObserver = new ResizeObserver(() => {
      updateSliderPosition();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeOption]);

  const handleOptionChange = (index) => {
    if (transitioning || activeOption === index) return;
    setTransitioning(true);
    setActiveOption(index);
    setTimeout(() => setTransitioning(false), 250);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 pt-0 h-full">
      {/* Left side - Options */}
      <div
        className="lg:w-[50%] bg-white pr-8 pl-8 pt-16 flex flex-col relative"
        ref={containerRef}
      >
        {/* Sliding background */}
        <div
          className="absolute left-6 right-8 bg-blue-50 rounded-3xl transition-all duration-200 ease-out z-0"
          style={{
            top: `${sliderPosition.top}px`,
            height: `${sliderPosition.height}px`,
          }}
        />

        {options.map((option, index) => (
          <button
            key={index}
            ref={(el) => (optionsRef.current[index] = el)}
            className="w-full text-left px-6 py-3 rounded-md flex items-center cursor-pointer relative z-10"
            onClick={() => handleOptionChange(index)}
            disabled={transitioning}
          >
            <div
              className={`flex items-center justify-center h-12 w-12 rounded-full mr-5 flex-shrink-0 transition-all duration-200 ${
                activeOption === index
                  ? "bg-[#145da0] text-white"
                  : "bg-gray-200"
              }`}
            >
              <FaCheck className="text-xl" />
            </div>
            <div className="text-left">
              <h3
                className={`text-xl font-medium transition-colors duration-200 ${
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
      <div className="lg:w-[50%] bg-white p-8 relative overflow-hidden overflow-y-auto">
        <div className="min-h-[380px] relative">
          {/* Advanced Features Content */}
          <div
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              activeOption === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="h-full flex">
              <div className="w-[70%] pr-6 flex items-center justify-center">
                <img
                  src={value}
                  loading="lazy"
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
              <div>Flexible Pricing</div>
              <div>Options</div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  type: "Monthly",
                  description:
                    "Pay as you go with monthly access, cancel anytime without penalties.",
                  plans: [
                    {
                      name: "Enterprise Plan",
                      price: "39,500",
                      note: "ETB, billed monthly",
                    },
                    {
                      name: "Professional Plan",
                      price: "14,000",
                      note: "ETB, billed monthly",
                    },
                    {
                      name: "Standard Plan",
                      price: "5,000",
                      note: "ETB, billed monthly",
                    },
                  ],
                },
                {
                  type: "Annual",
                  description:
                    "Save up to 15% with yearly billing compared to monthly rates.",
                  plans: [
                    {
                      name: "Enterprise Plan",
                      price: "28,200",
                      note: "ETB, billed monthly",
                    },
                    {
                      name: "Professional Plan",
                      price: "7,800",
                      note: "ETB, billed monthly",
                    },
                    {
                      name: "Standard Plan",
                      price: "4,500",
                      note: "ETB, billed monthly",
                    },
                  ],
                },
                {
                  type: "Project",
                  description:
                    "Special rates for project-based work with extended access.",
                  plans: [
                    {
                      name: "Enterprise Plan",
                      price: "280,000",
                      note: "ETB, per project",
                    },
                    {
                      name: "Professional Plan",
                      price: "78,000",
                      note: "ETB, per project",
                    },
                    {
                      name: "Standard Plan",
                      price: "44,500",
                      note: "ETB, per project",
                    },
                  ],
                  discount: "Save 15%!",
                },
              ].map((option, i) => (
                <div
                  key={i}
                  className="border border-gray-400 rounded-xl px-4 py-5 relative"
                >
                  {option.type === "Project" && (
                    <div className="absolute -top-3 right-4 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium shadow-sm">
                      Save 15%!
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

          {/* Scalable Solutions Content */}
          <div
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              activeOption === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h3 className="text-2xl font-bold text-[#145da0] mb-3 text-left">
              <div>Growth-Oriented</div>
              <div>Subscriptions</div>
            </h3>
            <div className="space-y-2">
              {[
                {
                  title: "Enterprise",
                  description:
                    "Team access with multiple licenses for large engineering firms",
                  features: [
                    {
                      value: ["20", "5"],
                      icons: [
                        <MdOutlinePersonAddAlt1
                          className={iconSize}
                          key="icon1"
                        />,
                        <FaUserFriends className={iconSize} key="icon2" />,
                      ],
                      label: ["user licenses", "concurrent sessions"],
                      subFeatures: [
                        "expand team size as needed",
                        "add more concurrent users",
                      ],
                      growthText: "Built for expansion!",
                    },
                  ],
                },
                {
                  title: "Professional",
                  description:
                    "Full geotechnical suite for individual practitioners",
                  features: [
                    {
                      value: "1",
                      icon: (
                        <MdOutlinePersonAddAlt1
                          className={iconSize}
                          key="icon3"
                        />
                      ),
                      label: "single user license",
                      subFeatures: [
                        "upgrade to team plan anytime",
                        "1 license = 3 devices and 6 IP limits",
                      ],
                      growthText: "Easy to upgrade!",
                    },
                  ],
                },
                {
                  title: "Standard",
                  description:
                    "Core geotechnical tools for individual engineers",
                  features: [
                    {
                      value: "1",
                      icon: (
                        <MdOutlinePersonAddAlt1
                          className={iconSize}
                          key="icon4"
                        />
                      ),
                      label: "single user license",
                      subFeatures: [
                        "upgrade to professional plan",
                        "1 license = 2 devices and 4 IP limits",
                      ],
                      growthText: "Easy to upgrade!",
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
