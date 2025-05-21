import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">
        Your privacy is important to us. This Privacy Policy outlines how we
        collect, use, and protect your personal data when you use our blog
        platform across categories such as science, technology, sports,
        education, and more.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">1. Information We Collect</h2>
      <ul className="list-disc list-inside text-gray-600">
        <li>Email address and name when registering or subscribing.</li>
        <li>Content you submit, like posts and comments.</li>
        <li>Usage data, such as IP address, browser type, and device info.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside text-gray-600">
        <li>To provide and maintain the platform’s functionality.</li>
        <li>To personalize content and user experience.</li>
        <li>To send you updates, newsletters, or important notices.</li>
        <li>To monitor and improve performance and user interaction.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">3. Data Sharing</h2>
      <p className="text-gray-600 mb-4">
        We do not sell or trade your personal information. We may share data with:
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>Trusted third-party services essential for platform operations.</li>
        <li>Legal authorities when required by law.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">4. Cookies</h2>
      <p className="text-gray-600">
        We use cookies to improve your experience and understand usage patterns.
        You can disable cookies in your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">5. Your Rights</h2>
      <ul className="list-disc list-inside text-gray-600">
        <li>Access or update your information anytime.</li>
        <li>Request deletion of your account or data.</li>
        <li>Opt out of newsletters and marketing communications.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">6. Changes to this Policy</h2>
      <p className="text-gray-600 mb-4">
        We may update this Privacy Policy from time to time. The updated version
        will be posted on this page with a revised effective date.
      </p>

      <p className="text-sm text-gray-500 mt-8">Effective Date: May 15, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
