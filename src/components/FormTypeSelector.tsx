
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, MessageSquare } from "lucide-react";

interface FormTypeSelectorProps {
  onSelect: (type: 'invoice' | 'general') => void;
}

const FormTypeSelector = ({ onSelect }: FormTypeSelectorProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
      <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelect('invoice')}>
        <div className="flex flex-col items-center gap-4">
          <FileText className="w-12 h-12 text-amber-600" />
          <h3 className="text-xl font-semibold">Invoice-Based Feedback</h3>
          <p className="text-center text-muted-foreground">Share your experience about a recent purchase</p>
          <Button variant="outline">Select</Button>
        </div>
      </Card>
      <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelect('general')}>
        <div className="flex flex-col items-center gap-4">
          <MessageSquare className="w-12 h-12 text-amber-600" />
          <h3 className="text-xl font-semibold">General Feedback</h3>
          <p className="text-center text-muted-foreground">Share your overall experience with our bakery</p>
          <Button variant="outline">Select</Button>
        </div>
      </Card>
    </div>
  );
};

export default FormTypeSelector;
