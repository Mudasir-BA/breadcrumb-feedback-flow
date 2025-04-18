
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
                <FormLabel>Phone/Email*</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Date of Visit*</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
                <FormLabel>Shop Location</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Invoice Number*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Service & Staff Behaviour</h2>
          <FormField
            control={form.control}
            name="staffBehavior"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How would you rate the staff's behaviour and courtesy?*</FormLabel>
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
                <FormLabel>Was the cashier/staff attentive and responsive?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="No" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Somewhat" />
                      </FormControl>
                      <FormLabel className="font-normal">Somewhat</FormLabel>
                    </FormItem>
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

export default InvoiceFeedbackForm;
