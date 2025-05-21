import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Terms and Conditions</h1>
      <p className="text-gray-600 mb-4">
        These terms govern your use of our blog platform, covering categories
        like science, tech, sports, education, lifestyle, and more. By using
        our services, you agree to abide by these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">1. Use of Platform</h2>
      <p className="text-gray-600 mb-4">
        You may use our platform to read, write, and comment on blogs in
        accordance with these terms. You must be 13 years or older to register.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">2. User Conduct</h2>
      <ul className="list-disc list-inside text-gray-600">
        <li>No spamming, harassment, or abusive content.</li>
        <li>No plagiarism or copying content without credit.</li>
        <li>Respect community guidelines and fellow users.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">3. Intellectual Property</h2>
      <p className="text-gray-600 mb-4">
        All content posted remains the property of the author. However, by
        submitting content, you grant us a non-exclusive license to display and
        promote your posts on our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">4. Account Termination</h2>
      <p className="text-gray-600 mb-4">
        We reserve the right to suspend or terminate accounts that violate our
        terms or harm our community.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">5. Limitation of Liability</h2>
      <p className="text-gray-600 mb-4">
        We are not liable for any content published by users or for any loss or
        damage resulting from platform use.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-700">6. Changes to Terms</h2>
      <p className="text-gray-600 mb-4">
        We may revise these Terms at any time. Continued use of the platform
        constitutes acceptance of any changes.
      </p>

      <p className="text-sm text-gray-500 mt-8">Effective Date: May 15, 2025</p>
    </div>
  );
};

export default TermsAndConditions;
