"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function SolvePage() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔐 Auth protection
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/auth")
    })
  }, [router])

  const solveProblem = async () => {
    if (!question.trim()) return

    setLoading(true)
    setAnswer("")

    const res = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })

    const data = await res.json()
    setAnswer(data.answer)
    setLoading(false)
  }

  return (
    <div style={{ padding: 40, maxWidth: 800 }}>
      <h1>🧠 AI Problem Solver</h1>

      <textarea
        placeholder="Enter your math / physics / any problem..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", height: 150, marginTop: 20 }}
      />

      <button onClick={solveProblem} disabled={loading} style={{ marginTop: 20 }}>
        {loading ? "Solving..." : "Solve"}
      </button>

      {answer && (
        <div style={{ marginTop: 30 }}>
          <h3>Answer:</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{answer}</pre>
        </div>
      )}
    </div>
  )
}
