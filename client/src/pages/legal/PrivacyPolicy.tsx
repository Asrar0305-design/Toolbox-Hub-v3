import { ToolLayout } from "@/components/ToolLayout";
import { SeoHead } from "@/components/SeoHead";

export default function PrivacyPolicy() {
  return (
    <ToolLayout
      title="Privacy Policy"
      description="We value your privacy. Learn how we handle your data."
    >
      <SeoHead 
        title="Privacy Policy"
        description="Privacy Policy for ToolBox Hub. We prioritize your privacy and data security."
      />
      <div className="prose prose-lg max-w-none font-sans">
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

        <h3>1. Introduction</h3>
        <p>
          Welcome to ToolBox Hub ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
          This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
        </p>

        <h3>2. Information We Collect</h3>
        <p>
          <strong>Personal Information:</strong> We do not require you to create an account or provide personal information (such as name, email address) to use our tools.
        </p>
        <p>
          <strong>Usage Data:</strong> We may automatically collect certain information when you visit, use, or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website, and other technical information.
        </p>

        <h3>3. How We Use Your Information</h3>
        <p>
          We use the information we collect or receive:
        </p>
        <ul>
          <li>To facilitate account creation and logon process (if applicable).</li>
          <li>To send you administrative information.</li>
          <li>To protect our Services.</li>
          <li>To enforce our terms, conditions, and policies.</li>
          <li>To respond to legal requests and prevent harm.</li>
        </ul>

        <h3>4. Cookies and Tracking Technologies</h3>
        <p>
          We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. 
          Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
        </p>
        <p>
          <strong>Google AdSense:</strong> We use Google AdSense to display ads. Google uses cookies to serve ads based on a user's prior visits to your website or other websites. 
          Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. 
          Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </p>

        <h3>5. Third-Party Websites</h3>
        <p>
          The Website may contain advertisements from third parties that are not affiliated with us and which may link to other websites, online services, or mobile applications. 
          We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy policy.
        </p>

        <h3>6. Contact Us</h3>
        <p>
          If you have questions or comments about this policy, you may email us at privacy@toolbox.hub.
        </p>
      </div>
    </ToolLayout>
  );
}
