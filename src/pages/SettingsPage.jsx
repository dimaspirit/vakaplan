import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Loader2Icon, LogOutIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import useAuthStore from "../store/authStore";

function SettingsPage() {
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const signout = useAuthStore(state => state.signout);

  const handleLogout = async() => {
    setIsLogoutLoading(true);
    signout();
  }

  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight text-balance">
        Settings
      </h1>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" className="w-full" disabled={isLogoutLoading} onClick={handleLogout} >
            {!isLogoutLoading && <LogOutIcon />}
            {isLogoutLoading && <Loader2Icon className="animate-spin" />}
            Log out from 
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default SettingsPage