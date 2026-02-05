"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push("/auth")
      } else {
        setEmail(data.session.user.email)
      }

      setLoading(false)
    }

    checkSession()
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/auth")
  }

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome to StudyForge 🚀</h1>
      <p>Logged in as: {email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  )
}
