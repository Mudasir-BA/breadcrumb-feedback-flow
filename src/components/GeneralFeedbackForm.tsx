
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
        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Customer Details</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Name*</FormLabel>
                <FormControl>
                  <Input {...field} className="border-amber-200 focus:border-amber-400" />
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
                <FormLabel className="text-amber-900">Email/Phone*</FormLabel>
                <FormControl>
                  <Input {...field} className="border-amber-200 focus:border-amber-400" />
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
                <FormLabel className="text-amber-900">City/Location*</FormLabel>
                <FormControl>
                  <Input {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Brand Perception</h2>
          <FormField
            control={form.control}
            name="visitFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">How often do you visit our bakery?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-2"
                  >
                    {["Daily", "Weekly", "Occasionally", "First Time"].map((option) => (
                      <FormItem key={option} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal text-amber-900">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brandImpression.rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">What is your overall impression of our brand?*</FormLabel>
                <FormControl>
                  <StarRating rating={field.value} onRatingChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brandImpression.comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Why? (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Product Feedback</h2>
          <FormField
            control={form.control}
            name="favoriteItems"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">What are your favorite items?</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="improvementSuggestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Is there any product you think we should improve or add?</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Customer Service</h2>
          <FormField
            control={form.control}
            name="customerServiceIssues.hadIssues"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Have you faced any customer service issues in the past?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    {["Yes", "No"].map((option) => (
                      <FormItem key={option} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal text-amber-900">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerServiceIssues.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">If yes, please describe:</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Suggestions & Ideas</h2>
          <FormField
            control={form.control}
            name="suggestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">What do you think we can do to improve your experience?</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Loyalty & Recommendation</h2>
          <FormField
            control={form.control}
            name="npsScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">How likely are you to recommend our bakery to others? (0-10)*</FormLabel>
                <FormControl>
                  <div className="w-full flex flex-col items-center gap-2">
                    <Slider
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <span className="text-amber-900 font-semibold">{field.value}</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="loyaltyProgram"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Would you be interested in a customer loyalty program?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    {["Yes", "No", "Maybe"].map((option) => (
                      <FormItem key={option} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal text-amber-900">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
        >
          Submit Feedback
        </Button>
      </form>
    </Form>
  );
};

export default GeneralFeedbackForm;
