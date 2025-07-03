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
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
});

export function ProjectForm({createdBy}) {
    console.log("ProjectForm createdBy:", createdBy);
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
      },
    });

    const onSubmit = (data) => {
      console.log("Form submitted with data:", data);

      const handleCreateProject = async (data) => {
        try {
          const response = await createProject({...data, createdBy});
          console.log("Project created with ID:", response);
          // Optionally, you can reset the form or show a success message
          form.reset();
        } catch (error) {
          console.error("Error creating project:", error);
          // Handle error, e.g., show an error message to the user
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