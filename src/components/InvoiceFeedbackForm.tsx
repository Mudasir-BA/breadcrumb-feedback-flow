
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "./StarRating";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contact: z.string().min(1, "Phone/Email is required"),
  dateOfVisit: z.string().min(1, "Date of visit is required"),
  shopLocation: z.string().optional(),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  staffBehavior: z.number().min(1).max(5),
  staffAttentiveness: z.enum(["Yes", "No", "Somewhat"]),
  billingProcess: z.enum(["Yes", "No", "Somewhat"]),
  loyaltyPoints: z.enum(["Yes", "No", "I don't know"]),
  productAvailability: z.object({
    answer: z.enum(["Yes", "No"]),
    comment: z.string().optional(),
  }),
  productFreshness: z.number().min(1).max(5),
  packaging: z.enum(["Yes", "No", "Somewhat"]),
  cleanliness: z.number().min(1).max(5),
  pricing: z.object({
    answer: z.enum(["Yes", "No"]),
    comment: z.string().optional(),
  }),
  overallSatisfaction: z.number().min(1).max(5),
  suggestions: z.string().optional(),
});

const InvoiceFeedbackForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffBehavior: 0,
      productFreshness: 0,
      cleanliness: 0,
      overallSatisfaction: 0,
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
                <FormLabel className="text-amber-900">Phone/Email*</FormLabel>
                <FormControl>
                  <Input {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfVisit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Date of Visit*</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shopLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Shop Location</FormLabel>
                <FormControl>
                  <Input {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Invoice Number*</FormLabel>
                <FormControl>
                  <Input {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Service & Staff Behaviour</h2>
          <FormField
            control={form.control}
            name="staffBehavior"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">How would you rate the staff's behaviour and courtesy?*</FormLabel>
                <FormControl>
                  <StarRating rating={field.value} onRatingChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="staffAttentiveness"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Was the cashier/staff attentive and responsive?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    {["Yes", "No", "Somewhat"].map((option) => (
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
            name="billingProcess"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Was the billing process smooth and fast?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    {["Yes", "No", "Somewhat"].map((option) => (
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
            name="loyaltyPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Was Loyalty Points offered?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    {["Yes", "No", "I don't know"].map((option) => (
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

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Product Quality & Availability</h2>
          <FormField
            control={form.control}
            name="productAvailability.answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Were the products you wanted available?*</FormLabel>
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
            name="productAvailability.comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Please mention any items not available (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productFreshness"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">How fresh did the items seem?*</FormLabel>
                <FormControl>
                  <StarRating rating={field.value} onRatingChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="packaging"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Were you satisfied with the product packaging and hygiene?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    {["Yes", "No", "Somewhat"].map((option) => (
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

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Cleanliness & Environment</h2>
          <FormField
            control={form.control}
            name="cleanliness"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">How clean and organized was the shop?*</FormLabel>
                <FormControl>
                  <StarRating rating={field.value} onRatingChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Pricing & Value</h2>
          <FormField
            control={form.control}
            name="pricing.answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Do you feel the product(s) were priced fairly?*</FormLabel>
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
            name="pricing.comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Comments on pricing (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-amber-200 focus:border-amber-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800">Overall Experience</h2>
          <FormField
            control={form.control}
            name="overallSatisfaction"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Overall, how satisfied are you with your visit today?*</FormLabel>
                <FormControl>
                  <StarRating rating={field.value} onRatingChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="suggestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900">Do you have any suggestions or complaints about this specific visit?</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border-amber-200 focus:border-amber-400" />
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

export default InvoiceFeedbackForm;
