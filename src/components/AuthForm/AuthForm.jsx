import { useState, useMemo, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2Icon, AlertCircleIcon } from "lucide-react";
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
import { getAuthViewConfigByAuthType, defaultFormValues, AUTH_TYPES } from "./constants";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AuthForm() {
  const authMethods = {
    login: useAuthStore(state => state.login),
    signup: useAuthStore(state => state.signup),
  }

  const [type, setType] = useState(AUTH_TYPES.LOGIN);
  const [isLoading, setIsLoading] = useState(false);

  const authViewConfig = useMemo(() => getAuthViewConfigByAuthType(type), [type]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  const toggleAuthType = () => {
    if (isLoading) return;

    setType(prevType => 
      prevType === AUTH_TYPES.LOGIN ? AUTH_TYPES.SIGNUP : AUTH_TYPES.LOGIN
    );
    form.clearErrors(); 
    form.reset();
  }

  const onSubmit = async(userCredentials) => {
    setIsLoading(true);

    try {
      await authMethods[type](userCredentials);
    } catch(error) {
      form.setError('root.serverError', {
        type: error.code, // auth/email-already-in-use
        message: 'This email is already in use. Déjà vu?'
      });

    } finally {
      setIsLoading(false);
    }
  }

  const serverErrorType = form.formState.errors?.root?.serverError?.type;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{authViewConfig.welcomeLabel}</CardTitle>
          <CardDescription>{authViewConfig.welcomeDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    {serverErrorType === 'auth/email-already-in-use' && (
                      <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>Déjà vu?</AlertTitle>
                        <AlertDescription>
                          <p>Looks like you've already signed up. Try logging in instead!</p>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      type="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" autoComplete="new-password" disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            {authViewConfig.passwordDescriptionLabel}
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                    aria-busy={isLoading}
                  >
                    {isLoading && <><Loader2Icon className="animate-spin" />Please wait</>}
                    {!isLoading && authViewConfig.btnLabel}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-center text-sm">
        {authViewConfig.changeAuthTypeDescription}
        <Button variant="link" onClick={toggleAuthType}>{authViewConfig.changeAuthTypeLabel}</Button>
      </div>
    </div>
  )
}