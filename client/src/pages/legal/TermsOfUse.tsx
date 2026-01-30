import { ToolLayout } from "@/components/ToolLayout";
import { SeoHead } from "@/components/SeoHead";

export default function TermsOfUse() {
  return (
    <ToolLayout
      title="Terms of Use"
      description="Please read these terms carefully before using our services."
    >
      <SeoHead 
        title="Terms of Use"
        description="Terms and Conditions for using ToolBox Hub services."
      />
      <div className="prose prose-lg max-w-none font-sans">
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

        <h3>1. Agreement to Terms</h3>
        <p>
          These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and ToolBox Hub ("we," "us," or "our"), 
          concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
        </p>

        <h3>2. Intellectual Property Rights</h3>
        <p>
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") 
          and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
        </p>

        <h3>3. User Representations</h3>
        <p>
          By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; 
          (3) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; 
          and (5) your use of the Site will not violate any applicable law or regulation.
        </p>

        <h3>4. Prohibited Activities</h3>
        <p>
          You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
        </p>

        <h3>5. Disclaimer</h3>
        <p>
          THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. 
          TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF.
        </p>

        <h3>6. User-Generated Content</h3>
        <p>
          While our tools process data client-side in your browser, you are solely responsible for any content you process, convert, or generate using our services. 
          You represent and warrant that you own or have the necessary rights to use any content you process through our tools and that such content does not violate any third-party rights or applicable laws.
        </p>

        <h3>7. Service Availability</h3>
        <p>
          We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. 
          However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. 
          We will not be liable to you or any third party for any modification, suspension, or discontinuance of the Site.
        </p>

        <h3>8. Governing Law</h3>
        <p>
          These Terms shall be governed by and defined following the laws of the jurisdiction in which ToolBox Hub operates. 
          ToolBox Hub and yourself irrevocably consent that the courts shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
        </p>

        <h3>9. Dispute Resolution</h3>
        <p>
          If you have any concern or dispute about the Service, you agree to first try to resolve the dispute informally by contacting us. 
          We will make every effort to resolve any disputes in good faith.
        </p>

        <h3>10. Corrections</h3>
        <p>
          There may be information on the Site that contains typographical errors, inaccuracies, or omissions that may relate to the Site, including descriptions, pricing, availability, and various other information. 
          We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice.
        </p>

        <h3>11. Limitation of Liability</h3>
        <p>
          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, 
          INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>

        <h3>12. Indemnification</h3>
        <p>
          You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, 
          from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: 
          (1) your use of the Site; (2) breach of these Terms of Use; (3) any breach of your representations and warranties set forth in these Terms of Use; 
          (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any harmful act toward any other user of the Site with whom you connected via the Site.
        </p>

        <h3>13. Contact Us</h3>
        <p>
          In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
        </p>
        <ul>
          <li>Email: support@webtoolboxhub.com</li>
          <li>Contact Form: <a href="/contact">Contact Us</a></li>
        </ul>
      </div>
    </ToolLayout>
  );
}
