"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function TestSupabase() {
  const [status, setStatus] = useState("Checking connection...")

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setStatus("❌ Supabase error: " + error.message)
      } else {
        setStatus("✅ Supabase connected successfully")
      }
    }

    testConnection()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Supabase Connection Test</h1>
      <p>{status}</p>
    </div>
  )
}
