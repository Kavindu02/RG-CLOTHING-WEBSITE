"use client"

import * as React from "react"

/**
 * RG BEDSHEETS - Luxury Interface Utility
 * Custom hook to detect mobile viewport based on the bespoke layout system.
 */

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Setting up the media query listener for precise architectural shifts
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Modern event listener for seamless viewport transition
    mql.addEventListener("change", onChange)
    
    // Initial check for the first render
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}