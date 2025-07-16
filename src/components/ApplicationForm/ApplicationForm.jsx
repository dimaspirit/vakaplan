import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import useAuthStore from "../../store/authStore";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { formSchema } from "./schema";
import useApplicationStore from "../../store/applicationStore";

export function ApplicationForm({ onSubmitForm }) {
  const { user } = useAuthStore();
  const createApplication = useApplicationStore((state) => state.createApplication);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      positionTitle: "",
      vacancyUrl: "",
      notes: "",
    },
  });

  const onSubmit = async(data) => {
    try {
      await createApplication({...data, createdBy: user.uid});
      form.reset();
      if (onSubmitForm) onSubmitForm();
    } catch {
      console.error("Error creating application:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:basis-1/2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:basis-1/2">
            <FormField
              control={form.control}
              name="positionTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Position Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="vacancyUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vacancy URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                URL to the vacancy page.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add an application</Button>
      </form>
    </Form>
  )
}