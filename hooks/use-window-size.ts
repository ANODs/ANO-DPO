"use client"

import { useState, useEffect } from "react"

interface WindowSize {
  width: number
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      })
    }

    window.addEventListener("resize", handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}
