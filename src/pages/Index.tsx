
import { useState } from "react";
import FormTypeSelector from "@/components/FormTypeSelector";
import InvoiceFeedbackForm from "@/components/InvoiceFeedbackForm";
import GeneralFeedbackForm from "@/components/GeneralFeedbackForm";

const Index = () => {
  const [formType, setFormType] = useState<'invoice' | 'general' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">
            Bakery Feedback
          </h1>
          <p className="text-lg text-amber-700">
            We value your feedback! Help us serve you better.
          </p>
        </div>

        {!formType ? (
          <FormTypeSelector onSelect={setFormType} />
        ) : (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <button
              onClick={() => setFormType(null)}
              className="mb-6 text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-2"
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
