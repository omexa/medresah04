import Image from "next/image";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaypal,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className=" text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Image
            src="/img/mfcicon.jpg"
            width={100}
            height={100}
            alt="Medina United MFC Logo"
            className="w-24 h-24 rounded-full mb-4"
          />
          <p className="text-2xl font-semibold mb-4">AlHuda Islamic Center</p>
          <a
            href="https://donorchoice.ca/embedded/mumfc"
            target="_blank"
            className="py-3 px-6 bg-yellow-600 text-white font-bold text-lg rounded-sm shadow-lg hover:bg-yellow-500 transition-all duration-300 mb-4"
          >
            Donate Now
          </a>
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=26CHJFCDZVLJ8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3 px-6 bg-[#14532D] text-white font-bold text-lg rounded-sm shadow-lg hover:bg-[#1c723e] transition-all duration-300"
          >
            <FaPaypal className="mr-2" size={20} />
            Donate with PayPal
          </a>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4 text-yellow-500">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              "home",
              "Calendar",
              "activities",
              "events",
              // "programs",
              "About",
              "contact",
            ].map((section) => (
              <li key={section}>
                <a
                  href={`#${section.toLowerCase()}`}
                  className="text-gray-400 hover:text-yellow-500 text-lg font-medium"
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact and Social Media Links */}
        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4 text-yellow-500">
            Get in Touch
          </h4>
          <p className="text-gray-400 mb-4">
            📍 2008 36 St SE, Calgary, AB
            <br />
            📞 +1 403 971 1823 || +1 403 903 4978 <br />
            📧 medinaunitedm140@gmail.com
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://www.facebook.com/share/15nP2J2Rdk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Medina United MFC. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
