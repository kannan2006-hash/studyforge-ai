"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const signUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) setMessage(error.message)
    else setMessage("✅ Check your email for confirmation")

    setLoading(false)
  }

  const signIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) setMessage(error.message)
    else setMessage("✅ Logged in successfully")

    setLoading(false)
  }

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h1>StudyForge Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={signUp} disabled={loading}>
        Sign Up
      </button>

      <button onClick={signIn} disabled={loading} style={{ marginLeft: 10 }}>
        Sign In
      </button>

      <p>{message}</p>
    </div>
  )
}
