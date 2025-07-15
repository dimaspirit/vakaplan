import { useState, useEffect } from "react"
import { useNavigate } from "react-router";

import useAuthStore from "@/store/authStore"
import { AuthForm } from "@/components/AuthForm";

function AuthPage() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if(user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium text-4xl">
          Vakaplan
        </a>
        
        <AuthForm />

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}

export default AuthPage