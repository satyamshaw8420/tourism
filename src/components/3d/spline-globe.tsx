'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline').then((mod) => mod.Spline), { 
  ssr: false,
  loading: () => <div className="h-96 lg:h-[600px] w-full flex items-center justify-center">Loading 3D globe...</div>
})

const SplineGlobe: React.FC = () => {
  return (
    <div className="relative w-full h-96 lg:h-[600px]">
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading 3D globe...</div>}>
        <Spline
          scene="https://prod.spline.design/6G-u3-02-WJX6ZD1V/scene.splinecode"
          className="w-full h-full"
        />
      </Suspense>
    </div>
  )
}

export default SplineGlobe