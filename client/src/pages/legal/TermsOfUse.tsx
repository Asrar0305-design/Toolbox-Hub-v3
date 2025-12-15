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

        <h3>6. Limitation of Liability</h3>
        <p>
          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, 
          INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
      </div>
    </ToolLayout>
  );
}
