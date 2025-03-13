import React from "react";
import { styles } from "../styles";
import { heroPic } from "../assets";

export default function Home() {
  return (
    <div className={`w-full`}>
      {/* Hero Section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto md:gap-16">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left md:pr-8">
            <h1 className="text-3xl md:text-5xl font-bold text-black">
              Geotechnical Solutions, Simplified
            </h1>
            <p className="text-gray-700 mt-4 text-lg md:text-xl">
              Empowering geotechnical engineers with intuitive, cloud-based
              tools for precise design and analysis. Accessible anytime,
              anywhere.
            </p>
            <button className="bg-[#145da0] text-white px-8 py-3 rounded-lg hover:bg-[#104f85] transition duration-300 mt-8">
              START DESIGNING FOUNDATIONS
            </button>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img
              src={heroPic}
              alt="Geotechnical Engineering Software"
              className="object-contain w-full max-w-md md:max-w-full"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Why Choose Us?
          </h2>
          <p className="text-gray-700 mt-4 text-lg md:text-xl">
            Empowering geotechnical professionals with innovative, precise, and
            user-focused solutions tailored to their needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-xl font-semibold text-black">
                Innovative Tools
              </h3>
              <p className="text-gray-700">
                Cutting-edge features that make your work easier and more
                efficient.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black">
                Precision Focus
              </h3>
              <p className="text-gray-700">
                Engineered for accurate and reliable geotechnical designs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black">
                User-Centric Design
              </h3>
              <p className="text-gray-700">
                Designed to simplify workflows while keeping engineers' needs at
                the forefront.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Software Features Section */}
      <div className={`${styles.padding} bg-gray-100 text-center`}>
        <h2 className={`${styles.sectionHeadText} text-black`}>Our Platform</h2>
        <p className={`${styles.sectionSubText} text-gray-700`}>
          Streamline your geotechnical design with advanced, user-friendly tools
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Site Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Site Analysis</h3>
            <ul className="text-gray-700">
              <li>Soil Profile Evaluation</li>
              <li>Soil Stability Assessment</li>
              <li>Geotechnical Parameter Estimation</li>
              <li>Data Visualization</li>
            </ul>
          </div>

          {/* Foundation Design */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Foundation Design</h3>
            <ul className="text-gray-700">
              <li>Pile Capacity Analysis</li>
              <li>Shallow Foundation Checks</li>
              <li>Retaining Wall Design</li>
              <li>Advanced Slope Stability</li>
            </ul>
          </div>

          {/* Reports and Automation */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Reports & Automation</h3>
            <ul className="text-gray-700">
              <li>Customizable Reports</li>
              <li>Automated Calculations</li>
              <li>Compliance with Standards</li>
              <li>Efficient Workflow Integration</li>
            </ul>
          </div>

          {/* Cloud Accessibility */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Cloud Accessibility</h3>
            <ul className="text-gray-700">
              <li>100% Cloud-Based</li>
              <li>Secure Data Storage</li>
              <li>Multi-Device Access</li>
              <li>No Installation Needed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* The Geotech Advantage Section */}
      <div className={`${styles.padding} bg-white text-center`}>
        <h2 className={`${styles.sectionHeadText} text-black`}>
          The Geotech Advantage
        </h2>
        <p className={`${styles.sectionSubText} text-gray-700`}>
          Revolutionizing geotechnical design with cutting-edge technology
        </p>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Streamlined Workflow</h3>
          <p className="text-gray-700">
            Our intuitive interface and automated features ensure faster and
            more accurate design, reducing manual effort and errors.
          </p>
        </div>
      </div>

      {/* Standards Compliance Section */}
      <div className={`${styles.padding} bg-gray-100 text-center`}>
        <h2 className={`${styles.sectionHeadText} text-black`}>
          Standards Compliance
        </h2>
        <p className={`${styles.sectionSubText} text-gray-700`}>
          Align with international geotechnical standards effortlessly
        </p>
      </div>

      {/* Customer Support Section */}
      <div className={`${styles.padding} bg-white text-center`}>
        <h2 className={`${styles.sectionHeadText} text-black`}>
          Comprehensive Support
        </h2>
        <p className={`${styles.sectionSubText} text-gray-700`}>
          Expert assistance to ensure your success, 24/7
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">📞 10k+</h3>
            <p className="text-gray-700">Projects Supported</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">🌍 120+</h3>
            <p className="text-gray-700">Countries Using Geotech Apps</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">⏱️ 30 min</h3>
            <p className="text-gray-700">Average Response Time</p>
          </div>
        </div>
      </div>

      {/* Value Section */}
      <div className={`${styles.padding} bg-gray-100 text-center`}>
        <h2 className={`${styles.sectionHeadText} text-black`}>
          Maximizing Value for Engineers
        </h2>
        <p className={`${styles.sectionSubText} text-gray-700`}>
          Delivering exceptional tools and cost-effective solutions
        </p>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Affordable Plans</h3>
          <p className="text-gray-700">
            Flexible subscriptions that cater to individual engineers and large
            teams alike.
          </p>

          <h3 className="text-xl font-semibold mb-4 mt-8">
            Scalable Solutions
          </h3>
          <p className="text-gray-700">
            Expand as your team grows with multi-user and enterprise plans.
          </p>
        </div>
      </div>

      {/* New White Section */}
      <div className={`${styles.padding} text-center`}>
        <h2 className={`${styles.sectionHeadText} text-black`}>
          Trusted by Industry Leaders
        </h2>
        <p className={`${styles.sectionSubText} text-gray-700`}>
          Leading geotechnical firms rely on our platform to deliver exceptional
          results.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div>
            <img
              src="/path-to-logo1.png"
              alt="Company Logo 1"
              className="mx-auto w-32"
            />
            <p className="text-gray-700 mt-4">
              "Exceptional tools that transformed our workflow!"
            </p>
          </div>
          <div>
            <img
              src="/path-to-logo2.png"
              alt="Company Logo 2"
              className="mx-auto w-32"
            />
            <p className="text-gray-700 mt-4">
              "Unparalleled support and innovation."
            </p>
          </div>
          <div>
            <img
              src="/path-to-logo3.png"
              alt="Company Logo 3"
              className="mx-auto w-32"
            />
            <p className="text-gray-700 mt-4">
              "Reliable and intuitive solutions."
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className={`${styles.padding} bg-gray-100 text-center`}>
        <h2 className={`${styles.sectionHeadText} text-black`}>
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">
              "Geotech Apps has made my work so much easier. The tools are
              intuitive and powerful, and the support is outstanding!"
            </p>
            <p className="text-gray-900 font-semibold mt-4">
              Jane Doe, Geotechnical Engineer
            </p>
          </div>
          {/* Repeat testimonials with relevant content */}
        </div>
      </div>
    </div>
  );
}
