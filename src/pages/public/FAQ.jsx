import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: "What is included in a typical package?",
      answer: "Our packages generally include accommodations, specified meals (often breakfast), ground transportation during the tour, and guided excursions. Flights and personal expenses are usually not included unless explicitly stated in the package details."
    },
    {
      question: "Are flights included in the price?",
      answer: "International flights are not included in the standard package price. This allows our clients the flexibility to use air miles or choose their preferred airline. However, our team can assist you with booking flights upon request."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 60 days or more prior to departure receive a full refund minus a small administrative fee. Cancellations between 30 and 59 days receive a 50% refund. Cancellations made less than 30 days prior are non-refundable. We highly recommend purchasing travel insurance."
    },
    {
      question: "Can I customize a package itinerary?",
      answer: "Absolutely! While our featured packages are carefully curated, we specialize in tailor-made travel. Contact our team, and we will work with you to modify an existing itinerary or build one from scratch based on your preferences."
    },
    {
      question: "Do I need travel insurance?",
      answer: "Yes, we strongly recommend comprehensive travel insurance for all our clients to cover unexpected cancellations, medical emergencies, and lost luggage."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container max-w-3xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600">Find answers to common questions about traveling with Qube.</p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-slate-900 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
