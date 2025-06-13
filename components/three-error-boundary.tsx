"use client"

import React from "react"

interface ThreeErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ThreeErrorBoundaryState {
  hasError: boolean
}

export class ThreeErrorBoundary extends React.Component<ThreeErrorBoundaryProps, ThreeErrorBoundaryState> {
  constructor(props: ThreeErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ThreeErrorBoundaryState {
    console.error('3D rendering error detected:', error.message)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ThreeJS error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <div className="mb-4 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">3D Rendering Error</h3>
              <p className="text-gray-400 mb-4">There was a problem loading the 3D content.</p>
              <p className="text-gray-500 mb-4 text-sm">Try refreshing the page or using a different browser.</p>
              <button
                onClick={() => {
                  this.setState({ hasError: false })
                  window.location.reload()
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
