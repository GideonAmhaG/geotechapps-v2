import { Link } from "react-router-dom";
import { styles } from "../styles";
import {
  heroPic,
  comprehensive,
  enhanced,
  innovative,
  streamlined,
} from "../assets";
import {
  FaDraftingCompass,
  FaRobot,
  FaClipboardList,
  FaCloud,
  FaAward,
} from "react-icons/fa";
import {
  FeatureCard,
  WhyChooseCard,
  AdvantageCard,
  ComplianceItem,
} from "../components";

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
          <h2 className={`${styles.sectionHeadText} mb-6`}>Why Choose Us?</h2>
          <p className={`${styles.sectionSubText} mb-12`}>
            Transforming geotechnical engineering with innovative solutions
            crafted for precision, reliability, and efficiency.
          </p>
          <div className={styles.sectionGridThree}>
            <WhyChooseCard
              number="1"
              title="Innovative Tools"
              description="Cutting-edge features that make your work easier and more efficient."
            />
            <WhyChooseCard
              number="2"
              title="Precision Focus"
              description="Engineered for accurate and reliable geotechnical designs."
            />
            <WhyChooseCard
              number="3"
              title="User-Centric Design"
              description="Designed to simplify workflows while keeping engineers' needs at the forefront."
            />
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
      <div className={`${styles.padding} bg-white`}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionHeadText}`}>The Geotech Advantage</h2>
          <p className={`${styles.sectionSubText}`}>
            Revolutionizing geotechnical design with cutting-edge technology
          </p>
          <div className="mt-12 space-y-20">
            <AdvantageCard
              title="Streamlined Workflow"
              description1="Our intuitive platform is meticulously designed to enhance every phase of the engineering process. By automating repetitive tasks and optimizing complex workflows, it provides professionals with the tools they need to achieve exceptional accuracy and speed in their projects."
              description2="The platform minimizes manual effort, ensuring that errors are drastically reduced and time is used efficiently. Additionally, its user-friendly interface empowers engineers to focus on innovative solutions rather than tedious tasks. Whether working on small projects or large-scale developments, the platform adapts to deliver a seamless and efficient design experience tailored to your needs."
              image={streamlined}
              reverse={false}
            />
            <AdvantageCard
              title="Comprehensive Design Tools"
              description1="Equipped with a comprehensive suite of powerful tools, our platform enables engineers to tackle even the most intricate calculations with confidence. Designed to adhere to rigorous safety standards, it ensures that every project is both reliable and compliant with modern engineering requirements."
              description2="The tools are intuitive yet highly capable, bridging traditional methods with cutting-edge advancements. With its versatility and robust functionality, this platform caters to a wide range of engineering challenges. Whether it's structural analysis or design optimization, engineers have everything they need to innovate and succeed at their fingertips."
              image={comprehensive}
              reverse={true}
            />
            <AdvantageCard
              title="Enhanced Collaboration"
              description1="Our platform integrates seamless collaboration features, enabling teams to stay connected and aligned at every stage of a project. Real-time communication tools allow for instant updates, while task assignment and progress tracking ensure that all stakeholders remain informed."
              description2="These features foster transparency and build trust among team members, driving efficiency and accountability. By breaking down silos and promoting a unified approach, the platform enhances teamwork in complex projects. Engineers and managers can share insights and resources effortlessly, creating an environment where collaboration leads to success."
              image={enhanced}
              reverse={false}
            />
            <AdvantageCard
              title="Innovative Technology Integration"
              description1="Our platform leverages the latest advancements in technology to redefine the engineering landscape. From advanced analytics to adaptive design solutions, it simplifies complex tasks and fosters innovation. These features empower engineers to navigate evolving challenges with confidence and precision."
              description2="By seamlessly integrating state-of-the-art technologies, the platform supports scalable solutions tailored to individual project needs. It encourages creative problem-solving while maintaining reliability and efficiency, setting a new standard for modern engineering practices."
              image={innovative}
              reverse={true}
            />
          </div>
          <Link
            to="/design"
            className="bg-[#145da0] text-white px-8 py-3 rounded-lg hover:bg-[#104f85] transition duration-300 mt-16 inline-block"
          >
            START DESIGNING FOUNDATIONS
          </Link>
        </div>
      </div>

      {/* Standards Compliance Section */}
      <div className={`${styles.padding} bg-gray-100`}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionHeadText}`}>Standards Compliance</h2>
          <p className={`${styles.sectionSubText}`}>
            Effortlessly align with international geotechnical standards
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-6 items-start">
            <div className="space-y-6">
              <ComplianceItem
                icon={FaAward}
                text="Fully compliant with Eurocode standards for geotechnical design."
              />
              <ComplianceItem
                icon={FaAward}
                text="Streamlines calculations to meet Eurocode requirements."
              />
            </div>
            <div className="space-y-6 md:ml-auto">
              <ComplianceItem
                icon={FaAward}
                text="Ensures safety, reliability, and adherence to engineering norms."
              />
              <ComplianceItem
                icon={FaAward}
                text="Adapts to evolving global standards for accurate assessments."
              />
            </div>
          </div>
        </div>
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
