import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import useAuthStore from "@/store/authStore";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { formSchema } from "./schema";
import useApplicationStore from "../../store/applicationStore";

import STATUSES from '../../status';

export function ApplicationForm({ onSubmitForm }) {
  const { user } = useAuthStore();
  const createApplication = useApplicationStore((state) => state.createApplication);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      positionTitle: "",
      status: STATUSES[0].id,
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
        <div>
          <FormField
            control={form.control}
            name="positionTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Position Title" {...field} className={'md:text-xl md:h-10 font-semibold'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
              name="projectTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:basis-1/2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATUSES.map((status) => <SelectItem key={status.id} value={status.id}>{status.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                    You can manage statuses in your{" "}
                    <Link href="/examples/forms">board settings</Link>.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:basis-1/2">
            <FormField
              control={form.control}
              name="vacancyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vacancy URL</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormDescription>
                Qualifications, Requirements, Responsibilities 
              </FormDescription>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
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