import type { Block } from 'payload'

export const IframeBlock: Block = {
  slug: 'iframeBlock',
  interfaceName: 'IframeBlock',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Embed URL',
      admin: {
        description: 'Enter the URL of the content you want to embed (e.g., YouTube video URL)',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'Optional title for accessibility',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16:9',
      options: [
        {
          label: '16:9 (Widescreen)',
          value: '16:9',
        },
        {
          label: '4:3 (Standard)',
          value: '4:3',
        },
        {
          label: '1:1 (Square)',
          value: '1:1',
        },
        {
          label: '21:9 (Ultrawide)',
          value: '21:9',
        },
      ],
      admin: {
        description: 'Choose the aspect ratio for the embedded content',
      },
    },
  ],
}
