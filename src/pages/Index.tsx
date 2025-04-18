
import { useState } from "react";
import FormTypeSelector from "@/components/FormTypeSelector";
import InvoiceFeedbackForm from "@/components/InvoiceFeedbackForm";
import GeneralFeedbackForm from "@/components/GeneralFeedbackForm";

const Index = () => {
  const [formType, setFormType] = useState<'invoice' | 'general' | null>(null);

  return (
    <div className="min-h-screen bg-[#FFFAF0] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3E2723] mb-4">Bakery Feedback</h1>
          <p className="text-lg text-[#8B4513]">We value your feedback! Help us serve you better.</p>
        </div>

        {!formType ? (
          <FormTypeSelector onSelect={setFormType} />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setFormType(null)}
              className="mb-6 text-[#8B4513] hover:text-[#DAA520] transition-colors"
            >
              ← Back to form selection
            </button>
            {formType === 'invoice' ? <InvoiceFeedbackForm /> : <GeneralFeedbackForm />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
