import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface ProfileCompletionAlertProps {
  completion: number
}

export function ProfileCompletionAlert({ completion }: ProfileCompletionAlertProps) {
  return (
    <Alert className="m-6 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
      <AlertCircle className="h-5 w-5 text-amber-600" />
      <AlertTitle className="text-amber-800 dark:text-amber-300">Complete your profile</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-400">
        <div className="mt-2 space-y-2">
          <p>Your profile is {completion}% complete. Complete your profile to get verified and access all features.</p>
          <Progress value={completion} className="h-2 bg-amber-200 dark:bg-amber-800" />
          <Button
            asChild
            variant="outline"
            className="mt-2 border-amber-600 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900"
          >
            <Link href="/vendor/dashboard/profile">Continue Setup</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

