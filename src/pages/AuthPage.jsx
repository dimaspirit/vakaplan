import { useState } from "react"

import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/LoginForm"
import { SignupForm } from "@/components/SignupForm"

function AuthPage() {
  const [authPage, setAuthPage] = useState("login");

  const changeAuthPageText = authPage === "login" ? "Do not have an account?" : "Already have an account?";
  const changeAuthPageTextTitle = authPage === "login" ? "Sign up" : "Login";

  const toggleAuthPage = () => {
    setAuthPage((prevPage) => (prevPage === "login" ? "signup" : "login"));
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium text-4xl">
          Vakaplan
        </a>

        {authPage === "login" && <LoginForm />}
        {authPage === "signup" && <SignupForm />}
        
        <div className="text-center text-sm">
          {changeAuthPageText}
          <Button variant="link" onClick={toggleAuthPage}>{changeAuthPageTextTitle}</Button>
        </div>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}

export default AuthPage