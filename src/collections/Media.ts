import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

// Function to delete file from Backblaze B2
const deleteFromBackblaze = async (filename: string) => {
  try {
    const { S3Client, DeleteObjectCommand } = await import('@aws-sdk/client-s3')

    const client = new S3Client({
      endpoint: process.env.BACKBLAZE_ENDPOINT,
      region: process.env.BACKBLAZE_REGION,
      credentials: {
        accessKeyId: process.env.BACKBLAZE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.BACKBLAZE_SECRET_ACCESS_KEY!,
      },
    })

    const command = new DeleteObjectCommand({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: filename,
    })

    await client.send(command)
    console.log(`✅ File deleted from Backblaze B2: ${filename}`)
  } catch (error) {
    console.error(`❌ Error deleting file from Backblaze B2: ${filename}`, error)
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  hooks: {
    afterDelete: [
      async ({ doc }) => {
        console.log('🗑️ Media deleted from database:', doc.id)

        // Delete the main file
        if (doc.filename) {
          await deleteFromBackblaze(doc.filename)
        }

        // Delete all image sizes
        if (doc.sizes) {
          const sizes = ['thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og']
          for (const size of sizes) {
            if (doc.sizes[size]?.filename) {
              await deleteFromBackblaze(doc.sizes[size].filename)
            }
          }
        }
      },
    ],
  },
}
