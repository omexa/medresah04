import React from "react";
import { motion } from "framer-motion";

function AboutUs() {
  return (
    <div className="py-12 sm:px-12 lg:px-16">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }} // Trigger every time it comes into view
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-green-800 mb-6"
      >
        بسم الله الرحمن الرحيم
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }} // Trigger every time it comes into view
        transition={{ duration: 0.8 }}
        className="text-center text-lg text-gray-700 mb-12"
      >
        <span className="text-2xl font-mono text-yellow-800">
          Al Huda Islamic Center
        </span>
        , operating under Medina United Muslims Friendship of Calgary ®, is a
        registered charitable and non-profit organization (#783649544 RR 0001)
        based in Calgary, Alberta, Canada. Since 2008, we have been dedicated to
        serving the local Muslim community with unwavering commitment.
      </motion.p>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="mb-12 p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-semibold text-green-800 mb-4">Mission</h2>
        <p className="text-gray-700 text-lg">
          Al Huda Islamic Center provides authentic Islamic education, spiritual
          growth, and community support based on the Quran and Sunnah, as
          understood by the righteous predecessors. We aim to empower Muslims,
          especially youth and women, to build a strong, united community and
          share the message of Islam while making a positive impact in Calgary.
        </p>
      </motion.section>

      {/* Divider */}
      <div className="border-t-2 border-gray-300 mb-12"></div>

      {/* Vision Section */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="mb-12 p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-semibold text-green-800 mb-4">Vision</h2>
        <p className="text-gray-700 text-lg">
          Our vision is to empower Muslims with knowledge and practical
          spirituality to become contributing members of the greater Calgary
          community. We are committed to actively engaging in Dawah for both
          Muslims and non-Muslims, spreading Islamic knowledge, and
          strengthening brotherhood based on the Quran and the Sunnah of the
          Prophet Muhammad (peace be upon him), as understood by the righteous
          predecessors.
        </p>
      </motion.section>

      {/* Divider */}
      <div className="border-t-2 border-gray-300 mb-12"></div>

      {/* Final Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <p className="text-gray-700 text-lg">
          Through inclusive religious, educational, and social programs, we aim
          to nurture spiritual growth, uphold Islamic values, and foster a
          compassionate, faith-driven community. Together, we strive to build a
          vibrant and unified Muslim community rooted in faith, knowledge, and
          mutual support.
        </p>
      </motion.section>
    </div>
  );
}

export default AboutUs;
