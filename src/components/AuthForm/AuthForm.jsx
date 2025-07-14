import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import useAuthStore from '../../store/authStore';
import { formSchema } from "./schema";
import { getOptionsByAuthType, defaultsFormValues } from "./constants";

export function AuthForm() {
  const authMethods = {
    login: useAuthStore(state => state.login),
    signup: useAuthStore(state => state.signup),
  };

  const [type, setType] = useState('login');
  const [isLoading, setIsLoading] = useState(false);

  const options = getOptionsByAuthType(type);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultsFormValues,
  });

  const toggleAuthType = () => {
    setType((prevState) => {
      if(isLoading) return type;
      return prevState === 'login' ? 'signup' : 'login'
    })
  }

  const onSubmit = async(userCredentials) => {
    setIsLoading(true);

    try {
      await authMethods[type](userCredentials);
    } catch(error) {
      setIsLoading(false);
      console.error('AuthForm -> onSubmit error', error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Your journey starts here</CardDescription>
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
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
                            <Input type="password" autoComplete={options.passwordAutoCompleteProp} {...field} />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            {options.passwordDescriptionLabel}
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <><Loader2Icon className="animate-spin" />Please wait</>}
                    {!isLoading && options.btnLabel}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-center text-sm">
        {options.changeAuthTypeDescription}
        <Button variant="link" onClick={toggleAuthType}>{options.changeAuthTypeLabel}</Button>
      </div>
    </div>
  )
}