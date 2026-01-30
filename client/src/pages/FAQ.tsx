import { ToolLayout } from "@/components/ToolLayout";
import { SeoHead } from "@/components/SeoHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <ToolLayout
      title="FAQ"
      description="Frequently Asked Questions about ToolBox Hub and our services."
    >
      <SeoHead 
        title="Frequently Asked Questions - ToolBox Hub"
        description="Find answers to common questions about ToolBox Hub's free online utilities, privacy, security, and how our tools work."
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground">
            Find answers to the most common questions about our services, tools, and policies. 
            If you can't find what you're looking for, feel free to <a href="/contact" className="text-primary hover:underline">contact us</a>.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              What is ToolBox Hub?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              ToolBox Hub is a free online platform that provides a comprehensive suite of digital utilities and tools. 
              We offer image converters, PDF tools, QR code generators, JSON formatters, password generators, and many more utilities. 
              All our tools are designed to work directly in your browser without requiring any software installation or user registration.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              Are your tools really free?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Yes, absolutely! All our core tools are completely free to use with no hidden charges, subscription fees, or premium tiers. 
              We support our platform through unobtrusive advertising, which allows us to keep all tools accessible to everyone. 
              You don't need to create an account or provide payment information to use any of our services.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              Is my data safe? Do you store my files?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Your data is completely safe. Most of our tools use client-side processing, which means all operations happen directly in your browser using WebAssembly and JavaScript. 
              Your files never leave your device and are not uploaded to our servers. We have no access to your data, and nothing is stored on our end. 
              This approach ensures maximum privacy and security for all users.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              Do I need to create an account?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              No, you don't need to create an account or sign up to use any of our tools. We believe in providing instant access to essential utilities without barriers. 
              Simply visit our website, select the tool you need, and start using it immediately. No email verification, no passwords, no hassle.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              What browsers are supported?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Our tools work on all modern web browsers including Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, and Opera. 
              We recommend using the latest version of your preferred browser for the best performance and compatibility. 
              Our tools are also fully responsive and work seamlessly on mobile devices, tablets, and desktop computers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              Are there any file size limitations?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Since our tools process files directly in your browser, the main limitation is your device's available memory and processing power. 
              For most tools, you can process files up to several hundred megabytes without issues on modern devices. 
              However, very large files may take longer to process or may not work on devices with limited resources. 
              We continuously optimize our tools to handle larger files more efficiently.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              How do I convert images between different formats?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Using our Image Converter tool is simple: (1) Navigate to the Image Converter from our tools menu, 
              (2) Upload or drag-and-drop your image file, (3) Select your desired output format (PNG, JPG, WEBP, etc.), 
              (4) Click convert, and (5) Download your converted image instantly. The entire process happens in your browser, 
              ensuring your images remain private and secure.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              Can I use your tools for commercial projects?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Yes, you can use our tools for both personal and commercial projects. There are no restrictions on how you use the output generated by our tools. 
              However, you are responsible for ensuring that any content you process through our tools complies with applicable copyright laws and that you have the necessary rights to use such content.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              Why do you show advertisements?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              We display advertisements to support the development and maintenance of our free tools. 
              Running a platform with multiple tools requires server costs, development time, and ongoing maintenance. 
              By showing unobtrusive ads, we can keep all our tools completely free for everyone without requiring subscriptions or premium accounts. 
              We carefully select ad partners to ensure a good user experience while supporting our mission to provide free digital utilities.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              How often do you add new tools?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              We are constantly working on adding new tools and improving existing ones based on user feedback and emerging needs. 
              Typically, we release new tools or major updates every few weeks. Follow our blog to stay updated on new releases, 
              feature announcements, and tips for getting the most out of our platform. You can also suggest new tools through our contact form.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              What makes ToolBox Hub different from other online tool websites?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              ToolBox Hub stands out in several ways: (1) Privacy-first approach with client-side processing, 
              (2) No registration or sign-up required, (3) Modern, fast, and responsive interface, 
              (4) All tools are completely free with no premium tiers, (5) Regular updates and new features, 
              (6) Clean design without intrusive pop-ups or excessive advertising, and (7) Cross-platform compatibility across all devices. 
              We focus on providing a seamless, professional experience for all users.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              I found a bug or have a feature request. How can I report it?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              We appreciate your feedback! If you've found a bug or have a suggestion for a new feature or tool, 
              please visit our <a href="/contact" className="text-primary hover:underline">contact page</a> and send us a detailed message. 
              Include information about your browser, device, and steps to reproduce any issues. We review all feedback and prioritize improvements based on user needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-13" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              Do you offer API access to your tools?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Currently, we do not offer API access as most of our tools are designed to run client-side in the browser for maximum privacy and security. 
              However, we are exploring options for providing API access to certain tools in the future for developers who need programmatic access. 
              If this is something you're interested in, please let us know through our contact form so we can gauge demand and prioritize development accordingly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-14" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              Can I use ToolBox Hub offline?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              While our tools require an initial internet connection to load the web application, once loaded, many of our tools can function offline since they process data client-side. 
              We are working on implementing Progressive Web App (PWA) features that will allow you to install ToolBox Hub on your device and use it with limited or no internet connectivity. 
              Stay tuned for updates on this feature.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-15" className="border-4 border-black bg-white px-6">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">
              How can I support ToolBox Hub?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              The best way to support us is by using our tools and sharing ToolBox Hub with friends, colleagues, and on social media. 
              Allowing ads to display (not using ad blockers on our site) also helps us maintain and improve our services. 
              Additionally, providing feedback, reporting bugs, and suggesting new features helps us create better tools for everyone. 
              Your support and engagement are what keep ToolBox Hub growing and improving.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-gray-100 p-8 md:p-12 text-center border-4 border-black mt-12">
          <h3 className="text-2xl font-bold uppercase mb-4">Still Have Questions?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-black text-white font-bold uppercase tracking-wider py-4 px-8 hover:bg-primary transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </ToolLayout>
  );
}
