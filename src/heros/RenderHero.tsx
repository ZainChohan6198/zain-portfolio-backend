import React from 'react'

import { HighImpactHero, HighImpactHeroProps } from '@/heros/HighImpact'
import { LowImpactHero, LowImpactHeroType } from '@/heros/LowImpact'
import { MediumImpactHero, MediumImpactHeroProps } from '@/heros/MediumImpact'

type RenderHeroProps =
  | (HighImpactHeroProps & { type: 'highImpact' })
  | (LowImpactHeroType & { type: 'lowImpact' })
  | (MediumImpactHeroProps & { type: 'mediumImpact' })
  | { type?: 'none' }

export const RenderHero: React.FC<RenderHeroProps> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  switch (type) {
    case 'highImpact':
      return <HighImpactHero {...(props as HighImpactHeroProps)} />
    case 'lowImpact':
      return <LowImpactHero {...(props as LowImpactHeroType)} />
    case 'mediumImpact':
      return <MediumImpactHero {...(props as MediumImpactHeroProps)} />
    default:
      return null
  }
}
