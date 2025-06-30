import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { firebaseSignUp } from "@/services/auth"; 

const formSchema = z.object({
  email: z.string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(24, { message: "Password must be at most 24 characters long." }),  
})


export function SignupForm() {
  const navigate = useNavigate();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = (data) => {
    firebaseSignUp(data)
      .then(() => {
        navigate("/");
      }).catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome again</CardTitle>
          <CardDescription>Your journey continues here</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@mail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            Enter your email address to continue.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      type="password"
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            Be sure to use a strong password. Use min 6 characters and max 24 characters.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Signup
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}