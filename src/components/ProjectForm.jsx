import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createProject } from "@/services/projects"

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
} from "@/components/ui/card"

import useProjectsStore from "../store/projectsStore"

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
});

export function ProjectForm({createdBy}) {
  const { syncProjects } = useProjectsStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data) => {
    const handleCreateProject = async (data) => {
      try {
        const response = await createProject({...data, createdBy});
        console.log("Project created with ID:", response);
        form.reset();
        syncProjects();
      } catch (error) {
        console.error("Error creating project:", error);
      }
    };

    handleCreateProject(data);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    The project will contains applications and close the project will close all applications.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Create a project</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}