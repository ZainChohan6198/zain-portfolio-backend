import React, { Fragment } from 'react'

import type {
  ArchiveBlock as ArchiveBlockType,
  CallToActionBlock as CallToActionBlockType,
  ContentBlock as ContentBlockType,
  MediaBlock as MediaBlockType,
} from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { IframeBlock } from '@/blocks/IframeBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

type BlockType =
  | (ArchiveBlockType & { blockType: 'archive' })
  | (CallToActionBlockType & { blockType: 'cta' })
  | (ContentBlockType & { blockType: 'content' })
  | (MediaBlockType & { blockType: 'mediaBlock' })
  | {
      blockType: 'iframeBlock'
      url: string
      title?: string
      aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9'
    }

export const RenderBlocks: React.FC<{
  blocks: BlockType[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          switch (block.blockType) {
            case 'archive':
              return (
                <div className="my-16" key={index}>
                  <ArchiveBlock {...block} />
                </div>
              )
            case 'content':
              return (
                <div className="my-16" key={index}>
                  <ContentBlock {...block} />
                </div>
              )
            case 'cta':
              return (
                <div className="my-16" key={index}>
                  <CallToActionBlock {...block} />
                </div>
              )
            case 'mediaBlock':
              return (
                <div className="my-16" key={index}>
                  <MediaBlock {...block} disableInnerContainer />
                </div>
              )
            case 'iframeBlock':
              return (
                <div className="my-16" key={index}>
                  <IframeBlock {...block} />
                </div>
              )
            default:
              return null
          }
        })}
      </Fragment>
    )
  }

  return null
}
