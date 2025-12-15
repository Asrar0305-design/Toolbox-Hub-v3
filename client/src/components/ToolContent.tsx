import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Section {
  title: string;
  content: string | string[];
}

interface ToolContentProps {
  howTo: Section;
  features: Section[];
  faqs: { question: string; answer: string }[];
}

export function ToolContent({ howTo, features, faqs }: ToolContentProps) {
  return (
    <div className="mt-16 space-y-16 max-w-3xl mx-auto">
      {/* How to Use Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
          {howTo.title}
        </h2>
        <div className="prose prose-lg text-muted-foreground">
          {Array.isArray(howTo.content) ? (
            <ol className="list-decimal list-inside space-y-2 font-medium">
              {howTo.content.map((step, i) => (
                <li key={i} className="pl-2">{step}</li>
              ))}
            </ol>
          ) : (
            <p>{howTo.content}</p>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
          Why Use This Tool?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-gray-50 p-6 border-2 border-gray-100 hover:border-black transition-colors">
              <h3 className="font-bold uppercase tracking-tight mb-2 text-lg">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {Array.isArray(feature.content) ? feature.content.join(" ") : feature.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-2 border-gray-100">
              <AccordionTrigger className="text-left font-bold hover:text-primary uppercase tracking-tight">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
