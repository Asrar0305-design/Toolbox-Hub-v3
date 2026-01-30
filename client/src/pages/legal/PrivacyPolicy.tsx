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

        <h3>6. Data Security</h3>
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. 
          However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, 
          transmission of personal information to and from our Website is at your own risk. You should only access the services within a secure environment.
        </p>
        <p>
          <strong>Client-Side Processing:</strong> Most of our tools process data entirely in your browser using WebAssembly and JavaScript. This means your files and data never leave your device, 
          providing an additional layer of security and privacy. We do not have access to the files you process using our tools.
        </p>

        <h3>7. Data Retention</h3>
        <p>
          We will only keep your information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law 
          (such as tax, accounting, or other legal requirements). When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.
        </p>

        <h3>8. Your Privacy Rights</h3>
        <p>
          Depending on your location, you may have certain rights regarding your personal information, including:
        </p>
        <ul>
          <li>The right to access – You have the right to request copies of your personal data.</li>
          <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
          <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>

        <h3>9. Children's Privacy</h3>
        <p>
          We do not knowingly collect data from or market to children under 13 years of age. By using the Website, you represent that you are at least 13 or that you are the parent or guardian 
          of such a minor and consent to such minor dependent's use of the Website. If we learn that personal information from users less than 13 years of age has been collected, 
          we will deactivate the account and take reasonable measures to promptly delete such data from our records.
        </p>

        <h3>10. Updates to This Policy</h3>
        <p>
          We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible. 
          We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
        </p>

        <h3>11. Contact Us</h3>
        <p>
          If you have questions or comments about this policy, you may contact us at:
        </p>
        <ul>
          <li>Email: privacy@webtoolboxhub.com</li>
          <li>Contact Form: <a href="/contact">Contact Us</a></li>
        </ul>
      </div>
    </ToolLayout>
  );
}
