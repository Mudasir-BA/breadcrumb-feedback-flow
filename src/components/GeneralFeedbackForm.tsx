
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import StarRating from "./StarRating";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contact: z.string().min(1, "Email/Phone is required"),
  location: z.string().min(1, "City/Location is required"),
  visitFrequency: z.enum(["Daily", "Weekly", "Occasionally", "First Time"]),
  brandImpression: z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
  }),
  favoriteItems: z.string().optional(),
  improvementSuggestions: z.string().optional(),
  customerServiceIssues: z.object({
    hadIssues: z.enum(["Yes", "No"]),
    description: z.string().optional(),
  }),
  suggestions: z.string().optional(),
  npsScore: z.number().min(0).max(10),
  loyaltyProgram: z.enum(["Yes", "No", "Maybe"]),
});

const GeneralFeedbackForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandImpression: {
        rating: 0,
      },
      npsScore: 5,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback!",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Customer Details</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email/Phone*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City/Location*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Brand Perception</h2>
          <FormField
            control={form.control}
            name="visitFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How often do you visit our bakery?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {["Daily", "Weekly", "Occasionally", "First Time"].map((option) => (
                      <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Add more sections following the same pattern */}

        <Button type="submit" className="w-full">Submit Feedback</Button>
      </form>
    </Form>
  );
};

export default GeneralFeedbackForm;
