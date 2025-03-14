import { Link } from "react-router-dom";
import { styles } from "../styles";
import { heroPic } from "../assets";
import {
  FaDraftingCompass,
  FaRobot,
  FaClipboardList,
  FaCloud,
} from "react-icons/fa";
import { FeatureCard } from "../components";

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
            <Link
              to="/design"
              className="bg-[#145da0] text-white px-8 py-3 rounded-lg hover:bg-[#104f85] transition duration-300 mt-8 inline-block"
            >
              START DESIGNING FOUNDATIONS
            </Link>
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
      <div className={`${styles.padding} bg-white`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionHeadText}>Why Choose Us?</h2>
          <p className={styles.sectionSubText}>
            Transforming geotechnical engineering with innovative solutions
            crafted for precision, reliability, and efficiency.
          </p>
          <div className={styles.sectionGridThree}>
            <div>
              <h3 className={styles.sectionTitleText}>Innovative Tools</h3>
              <p className={styles.sectionBodyText}>
                Cutting-edge features that make your work easier and more
                efficient.
              </p>
            </div>
            <div>
              <h3 className={styles.sectionTitleText}>Precision Focus</h3>
              <p className={styles.sectionBodyText}>
                Engineered for accurate and reliable geotechnical designs.
              </p>
            </div>
            <div>
              <h3 className={styles.sectionTitleText}>User-Centric Design</h3>
              <p className={styles.sectionBodyText}>
                Designed to simplify workflows while keeping engineers' needs at
                the forefront.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Software Features Section */}
      <div className={`${styles.padding} bg-gray-100`}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionHeadText}>Our Platform</h2>
          <p className={styles.sectionSubText}>
            Streamline your geotechnical design with advanced, user-friendly
            tools
          </p>
          <div className={styles.sectionGridFour}>
            <FeatureCard
              icon={FaDraftingCompass}
              title="Foundation Design"
              bgColor="bg-green-100"
              iconColor="text-green-600"
              features={[
                "Pile Capacity Analysis",
                "Shallow Foundation Checks",
                "Retaining Wall Design",
                "Slope Stability Analysis",
                "Bearing Capacity Calculations",
              ]}
            />
            <FeatureCard
              icon={FaRobot}
              title="Smart Automation"
              bgColor="bg-blue-100"
              iconColor="text-blue-600"
              features={[
                "Streamlined Calculations",
                "Auto Parameter Estimation",
                "Real-Time Analysis",
                "Workflow Integration",
                "Automated Design Adjustments",
              ]}
            />
            <FeatureCard
              icon={FaClipboardList}
              title="Detailed Reports"
              bgColor="bg-yellow-100"
              iconColor="text-yellow-600"
              features={[
                "Customizable Reports",
                "Data Visualization",
                "Standards Compliance",
                "Design Insights",
                "Downloadable Summaries",
              ]}
            />
            <FeatureCard
              icon={FaCloud}
              title="Cloud Accessibility"
              bgColor="bg-purple-100"
              iconColor="text-purple-600"
              features={[
                "100% Web-Based",
                "Secure Data Backup",
                "Multi-Device Access",
                "No Installation",
                "Scalable Storage",
              ]}
            />
          </div>
          <div className="flex justify-center mt-16">
            <Link
              to="/design"
              className="text-[#145da0] sm:text-[14px] text-[12px] leading-relaxed hover:text-[#000000] uppercase transition-colors duration-200"
            >
              Explore Our Platform →
            </Link>
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
