import { auth, signIn, signOut } from "@/auth"

export default async function SignIn() {
  const session = await auth()

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <form
          action={async () => {
            "use server"
            await signIn("github", { redirectTo: '/' })
          }}
        >
          <button type="submit" className="p-2 bg-gray-800 text-white rounded">
            Sign in with GitHub
          </button>
        </form>

        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: '/' })
          }}
        >
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Sign in with Google
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit" className="p-2 bg-red-500 text-white rounded">
          Sign Out
        </button>
      </form>
    </div>
  )
}