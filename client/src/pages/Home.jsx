import { Link } from "react-router-dom";
import { Suspense } from "react";
import { styles } from "../styles";
import {
  heroPic,
  comprehensive,
  enhanced,
  innovative,
  streamlined,
  aau,
  phaedrus,
  era,
} from "../assets";
import {
  FaDraftingCompass,
  FaRobot,
  FaClipboardList,
  FaCloud,
  FaAward,
  FaUsers,
  FaTools,
  FaBolt,
} from "react-icons/fa";
import {
  FeatureCard,
  WhyChooseCard,
  AdvantageCard,
  ComplianceItem,
  PricingTabs,
} from "../components";

const iconSize = "text-4xl";

function Home() {
  return (
    <div className={`w-full`}>
      {/* Hero Section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="flex flex-col md:flex-row items-center max-w-7.5xl mx-auto md:gap-16">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left md:pr-8">
            <h1 className="text-3xl md:text-5xl font-semibold text-black">
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
              width={800}
              height={500}
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

      {/* Metrics Section */}
      <div className={`${styles.padding} bg-white`}>
        <div className={styles.sectionContainer}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: FaUsers,
                value: "300+",
                text: "Engineers Using the App",
              },
              {
                Icon: FaTools,
                value: "4",
                text: "Geotechnical Tools Available",
              },
              {
                Icon: FaBolt,
                value: "5 sec",
                text: "Real-Time Results",
              },
            ].map(({ Icon, value, text }, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center w-full py-0"
              >
                <div className="flex flex-row items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#145da0] rounded-full">
                    <Icon className="text-white text-3xl" />
                  </div>
                  <h3 className="text-[#145da0] text-4xl font-bold">{value}</h3>
                </div>
                <p className="text-black text-lg mt-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backed by Industry Leaders Section */}
      <div className={`${styles.padding} bg-gray-100`}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionHeadText}`}>
            Used by Industry Leaders
          </h2>
          <p className={`${styles.sectionSubText}`}>
            We're proud to collaborate with forward-thinking organizations
          </p>

          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-36 mt-12 mb-3">
            {[aau, era, phaedrus].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Partner ${["AAU", "ERA", "Phaedrus"][index]}`}
                className="h-24 md:h-32 object-contain hover:scale-105 transition-transform"
                loading="lazy"
                width={160}
                height={80}
              />
            ))}
          </div>

          <Link
            to="/design"
            className="bg-[#145da0] text-white px-8 py-3 rounded-lg hover:bg-[#104f85] transition duration-300 mt-16 inline-block"
          >
            START DESIGNING FOUNDATIONS
          </Link>
        </div>
      </div>

      {/* Pricing Section */}
      <div className={`${styles.padding} bg-white`}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionHeadText}`}>
            Advanced Tools, Competitive Pricing
          </h2>
          <p className={`${styles.sectionSubText} mb-12`}>
            Maximize your geotechnical engineering capabilities
          </p>

          <Suspense
            fallback={
              <div className="h-[300px] flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <PricingTabs />
          </Suspense>

          <div className="mt-0 text-center">
            <Link
              to="#"
              className="text-[#145da0] text-[13px] font-medium hover:text-black transition duration-200 inline-flex items-center border-2 border-[#145da0] hover:border-black rounded-sm px-6 py-2 tracking-[0.2em] !font-sans"
            >
              COMPARE PLANS
              <span className="ml-3 text-[17px] font-bold transform translate-y-[-0.5px]">
                →
              </span>{" "}
            </Link>
          </div>
        </div>
      </div>

      {/* Common Questions Section */}
      <div className={`${styles.padding} bg-gray-100`}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionHeadText}`}>Common Questions</h2>
          <p className={`${styles.sectionSubText}`}>
            Analyze and design easier and faster
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-20">
            {[
              {
                icon: (
                  <FaClipboardList
                    className={`text-[#145da0] ${iconSize} mx-auto`}
                  />
                ),
                title: "How does the functionality compare?",
                description:
                  "Our Platform offers the same functionality as traditional geotechnical analysis software—often more. We're 100% cloud-based with responsive support, API integration, and mobile access.",
                linkText: "Compare features",
              },
              {
                icon: (
                  <FaUsers className={`text-[#145da0] ${iconSize} mx-auto`} />
                ),
                title: "How long does it take to learn?",
                description:
                  "Designed to be 10x easier to learn. Most professional users master the core tools in under one week compared to the industry average of several months.",
                linkText: "Learning guide",
              },
              {
                icon: (
                  <FaAward className={`text-[#145da0] ${iconSize} mx-auto`} />
                ),
                title: "Can I trust the results?",
                description:
                  "Results are QA-tested against industry standards and fully documented, but final foundation designs require verification by a licensed engineer with project-specific data.",
                linkText: "Validation reports",
              },
              {
                icon: (
                  <FaCloud className={`text-[#145da0] ${iconSize} mx-auto`} />
                ),
                title: "What about data security?",
                description:
                  "All project data is secured with bank-grade encryption (AES-256) and HTTPS protection. Contact us for enterprise deployment solutions or custom security requirements.",
                linkText: "Security details",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                {item.icon}
                <h3 className="text-2xl font-semibold mt-4">{item.title}</h3>
                <p className="text-gray-700 mt-2 px-4">{item.description}</p>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="text-[#145da0] text-xs font-medium hover:text-black transition duration-200 inline-flex items-center tracking-[0.3em] !font-sans px-6 py-2 uppercase"
                  >
                    {item.linkText}
                    <span className="ml-3 text-xs font-bold transform translate-y-[-0px]">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Engineers Section */}
      <div className={`${styles.padding} bg-white`}>
        <div className={styles.sectionContainer}>
          <h2 className={`${styles.sectionHeadText}`}>
            Join 300+ Professional Engineers!
          </h2>
          <p className={`${styles.sectionSubText}`}>
            Powerful cloud-based geotechnical analysis and design software
          </p>

          <Link
            to="/design"
            className="bg-[#145da0] text-white px-8 py-3 rounded-lg hover:bg-[#104f85] transition duration-300 mt-8 inline-block"
          >
            START DESIGNING FOUNDATIONS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
