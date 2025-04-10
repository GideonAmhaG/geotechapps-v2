import { styles } from "../styles";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaXTwitter,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa6";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      {/* Main Footer Content */}
      <div className={`${styles.paddingX} py-12 max-w-7xl mx-auto`}>
        {/* Footer Grid - Original Four Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {[
            {
              title: "Quick Links",
              links: [
                { name: "Design Tools", to: "/design-tools" },
                { name: "Features", to: "/features" },
                { name: "Pricing", to: "/pricing" },
                { name: "Documentation", to: "/docs" },
              ],
            },
            {
              title: "Legal",
              links: [
                { name: "Terms of Service", to: "/terms" },
                { name: "Privacy Policy", to: "/privacy" },
                { name: "Disclaimer", to: "/disclaimer" },
              ],
            },
            {
              title: "Support",
              links: [
                { name: "FAQ", to: "/faq" },
                { name: "Help Center", to: "/help" },
                { name: "Contact Us", to: "/contact" },
                {
                  name: "Tutorial Video",
                  to: "/tutorials",
                  icon: <FaYoutube className="ml-1.5 inline" />,
                },
              ],
            },
            {
              title: "Company",
              links: [
                { name: "About Us", to: "/about" },
                { name: "Blog", to: "/#" },
                { name: "Careers", to: "/#" },
              ],
            },
          ].map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={`${section.title}-${link.to}-${index}`}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
                    >
                      {link.name}
                      {link.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} GeotechApps. All rights
              reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {[
              {
                href: "https://github.com/GideonAmhaG",
                icon: <FaGithub className="h-5 w-5" />,
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/gideon-amha-g/",
                icon: <FaLinkedin className="h-5 w-5" />,
                label: "LinkedIn",
              },
              {
                href: "mailto:gideonamha@gmail.com",
                icon: <FaEnvelope className="h-5 w-5" />,
                label: "Email",
              },
              {
                href: "https://x.com/GideonAmha",
                icon: <FaXTwitter className="h-5 w-5" />,
                label: "X (Twitter)",
              },
              {
                href: "#",
                icon: <FaYoutube className="h-5 w-5" />,
                label: "YouTube",
              },
            ].map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="text-gray-400 hover:text-[#145da0] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <FaArrowUp className="mr-2" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
