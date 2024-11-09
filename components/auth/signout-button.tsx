import { signOut } from "@/auth"
import { LogoutIcon } from "../ui/Icons/Logout"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}

    >
      <button type="submit" className="">
        <LogoutIcon />
      </button>
    </form>
  )
}