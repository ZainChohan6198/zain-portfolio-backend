import React from 'react'
import { cn } from '@/utilities/ui'

export interface IframeBlockProps {
  url: string
  title?: string
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9'
  className?: string
}

export const IframeBlock: React.FC<IframeBlockProps> = ({
  url,
  title,
  aspectRatio = '16:9',
  className,
}) => {
  if (!url) return null

  // Calculate padding-bottom percentage based on aspect ratio
  const getAspectRatioPadding = (ratio: string) => {
    switch (ratio) {
      case '16:9':
        return '56.25%'
      case '4:3':
        return '75%'
      case '1:1':
        return '100%'
      case '21:9':
        return '42.86%'
      default:
        return '56.25%'
    }
  }

  return (
    <div className={cn('my-8', className)}>
      <div
        className="relative w-full"
        style={{ paddingBottom: getAspectRatioPadding(aspectRatio) }}
      >
        <iframe
          src={url}
          title={title || 'Embedded content'}
          className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  )
}
