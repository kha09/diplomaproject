import Header from "../../components/header"
import LoginPage from "../../components/login"
import { auth } from "@/auth"

export default function LoginRoute() {
  return (
    <main className="min-h-screen">
      <Header />
      <LoginPage />
    </main>
  )
}
