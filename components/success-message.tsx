"use client"

import { CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"

interface SuccessMessageProps {
  show: boolean
  onHide: () => void
}

export function SuccessMessage({ show, onHide }: SuccessMessageProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onHide, 300) // Wait for animation to complete
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [show, onHide])

  if (!show) return null

  return (
    <div
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top-5">
        <CheckCircle2 className="w-6 h-6 animate-in zoom-in-50 duration-500" />
        <p className="font-medium">Successfully confirmed!</p>
      </div>
    </div>
  )
}
