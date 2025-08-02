import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

import useAuthStore from "@/store/authStore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { formSchema } from "./schema"
import useApplicationStore from "../../store/applicationStore"
import STATUSES from "../../status"

export function ApplicationForm({ mode = "edit", application = {}, onSubmitForm }) {
  const { user } = useAuthStore()
  const createApplication = useApplicationStore((state) => state.createApplication)
  const updateApplication = useApplicationStore((state) => state.updateApplication)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      positionTitle: "",
      projectTitle: "",
      status: STATUSES[0].id,
      vacancyUrl: "",
      notes: "",
      description: "",
      ...application,
    },
  })

  useEffect(() => {
    if (mode !== "create") {
      form.reset(application)
    }
  }, [application, mode, form])

  const isView = mode === "view"
  const isEdit = mode === "edit"
  const isCreate = mode === "create"

  const onSubmit = async (data) => {
    console.log(application.id, data)
    try {
      if (isCreate) {
        await createApplication({ ...data, createdBy: user.uid })
        form.reset();
        onSubmitForm();
      } else if (isEdit) {
        await updateApplication(application.uid, data)
      }
    } catch (error) {
      console.error("Error submitting application:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="positionTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                {isView ? (
                  <p>{field.value}</p>
                ) : (
                  <Input placeholder="Position Title" {...field} disabled={isView} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:basis-1/2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    {isView ? (
                      <p>{field.value}</p>
                    ) : (
                      <Input placeholder="Company Name" {...field} disabled={isView} />
                    )}
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
                    {isView ? (
                      <p>{field.value}</p>
                    ) : (
                      <Input placeholder="Project Title" {...field} disabled={isView} />
                    )}
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
                  {isView ? (
                    <p>{STATUSES.find((s) => s.id === field.value)?.label}</p>
                  ) : (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUSES.map((status) => (
                          <SelectItem key={status.id} value={status.id}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
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
                    {isView ? (
                      <a href={field.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        {field.value}
                      </a>
                    ) : (
                      <Input placeholder="Vacancy URL" {...field} disabled={isView} />
                    )}
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
                {isView ? (
                  <p className="whitespace-pre-wrap">{field.value}</p>
                ) : (
                  <Textarea {...field} disabled={isView} />
                )}
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
                {isView ? (
                  <p className="whitespace-pre-wrap">{field.value}</p>
                ) : (
                  <Textarea {...field} disabled={isView} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(isEdit || isCreate) && (
          <Button type="submit">{isCreate ? "Add Application" : "Update Application"}</Button>
        )}
      </form>
    </Form>
  )
}
