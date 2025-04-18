import { useState } from "react";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function GuidanceSection({ title, items, tip }) {
  const [isGuidanceVisible, setGuidanceVisible] = useState(false);

  return (
    <div className="mt-8">
      <button
        onClick={() => setGuidanceVisible(!isGuidanceVisible)}
        className="w-full flex items-center justify-between p-4"
        aria-expanded={isGuidanceVisible}
        aria-controls="guidance-content"
      >
        <div className="flex items-center text-[#145da0] hover:text-black">
          <span className="font-medium md:text-[18px] sm:text-[16px] text-[14px]">
            {title}
          </span>
          <span className="ml-2 md:text-[18px] sm:text-[16px] text-[14px]">
            {isGuidanceVisible ? (
              <IoChevronDown className="inline" />
            ) : (
              <IoChevronForward className="inline" />
            )}
          </span>
        </div>
      </button>

      <div
        id="guidance-content"
        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          isGuidanceVisible
            ? "max-h-[var(--content-height)] opacity-100"
            : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isGuidanceVisible}
        style={{ "--content-height": "500px" }}
      >
        <div className="px-5 pb-5 space-y-0">
          {items.map((item, index) => (
            <div key={index} className="p-3">
              <div className="flex">
                <div className="flex-shrink-0 mt-0.5 mr-3 text-blue-600">✓</div>
                <div>
                  <p className="font-medium text-gray-800 md:text-[16px] sm:text-[14px] text-[13px]">
                    {item.main}
                  </p>
                  {item.detail && (
                    <p className="mt-1.5 text-gray-600 pl-2 border-l-2 border-blue-200 md:text-[14px] sm:text-[12px] text-[11px]">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 text-center">
            <Link
              href="#"
              className="text-[#145da0] font-medium hover:text-black transition duration-200 inline-flex items-center tracking-[0.3em] !font-sans px-6 py-2 uppercase"
              style={{
                fontSize: "clamp(0.6rem, 0.8vw, 0.75rem)",
              }}
            >
              Documentation
              <span className="ml-3 font-bold transform translate-y-[-0px] md:text-[14px] sm:text-[12px] text-[11px]">
                →
              </span>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500 italic md:text-[14px] sm:text-[12px] text-[11px]">
              {tip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
