import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import useProjectsStore from "./../store/projectsStore"

import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { createApplication } from "@/services/applications"

const formSchema = z.object({
  companyName: z.string().min(4, {
    message: "CompanyName must be at least 4 characters.",
  }),
  position: z.string().min(4, {
    message: "Position must be at least 4 characters.",
  }),
  vacancyUrl: z.string().optional(),
  project: z.string().min(1, {
    message: "Project is required.",
  }),
  notes: z.string().optional(),
});

export function ApplicationForm() {
  const { projects } = useProjectsStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      position: "",
      vacancyUrl: "",
      project: projects.length > 0 ? projects[0].uid : "",
      notes: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);

    createApplication({
      title: data.companyName,
      position: data.position,
      url: data.vacancyUrl,
    }).then((applicationId) => {
      console.log("Application created with ID:", applicationId);
      form.reset();
    }).catch((error) => {
      console.error("Error creating application:", error);
    }); 
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
              name="position"
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
          name="project"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Project</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.uid} value={project.uid}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage projects in the Projects section.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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