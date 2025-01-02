import { auth, signIn, signOut } from "@/auth"

export default async function SignIn() {
const session = await auth()

if (!session) return  <form
action={async () => {
  "use server"
  await signIn("github" , {redirectTo : '/'})
}}
>
<button type="submit">Sign in with GitHub</button>
</form>
  return (
   
<div>
<form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
</div>

    
  )
}