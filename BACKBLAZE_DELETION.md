# Backblaze B2 File Deletion

This document explains how file deletion works with Backblaze B2 storage in your Payload CMS.

## How Deletion Works

When you delete a media file from the Payload admin panel, the following happens:

1. **Database Deletion**: The media record is deleted from the database
2. **File Deletion**: The actual files are deleted from Backblaze B2
3. **Image Sizes**: All generated image sizes are also deleted

## Implementation

### Automatic Deletion (S3 Storage Plugin)

The `@payloadcms/storage-s3` plugin should automatically handle file deletions when:

- Files are deleted through the Payload admin
- Media records are deleted via API
- Collections are deleted

### Manual Deletion Hook

As a backup, we've implemented a custom deletion hook in `src/collections/Media.ts` that:

1. **Logs deletion events** for debugging
2. **Deletes the main file** from Backblaze B2
3. **Deletes all image sizes** (thumbnail, square, small, medium, large, xlarge, og)

## Configuration

The deletion functionality is configured in:

### Payload Config (`src/payload.config.ts`)

```typescript
s3Storage({
  collections: {
    media: true,
  },
  bucket: process.env.BACKBLAZE_BUCKET,
  config: {
    endpoint: process.env.BACKBLAZE_ENDPOINT,
    region: process.env.BACKBLAZE_REGION,
    credentials: {
      accessKeyId: process.env.BACKBLAZE_ACCESS_KEY_ID,
      secretAccessKey: process.env.BACKBLAZE_SECRET_ACCESS_KEY,
    },
  },
  disableLocalStorage: true,
})
```

### Media Collection (`src/collections/Media.ts`)

```typescript
hooks: {
  afterDelete: [
    async ({ doc }) => {
      // Custom deletion logic
      // Deletes main file and all image sizes
    },
  ],
}
```

## Environment Variables

Make sure these environment variables are set in your `.env` file:

```env
BACKBLAZE_BUCKET=your-bucket-name
BACKBLAZE_ENDPOINT=https://s3.us-east-005.backblazeb2.com
BACKBLAZE_REGION=us-east-005
BACKBLAZE_ACCESS_KEY_ID=your-access-key-id
BACKBLAZE_SECRET_ACCESS_KEY=your-secret-access-key
```

## Testing Deletion

1. **Upload a test file** through the Payload admin
2. **Check Backblaze B2** to confirm the file exists
3. **Delete the file** from the Payload admin
4. **Check Backblaze B2** to confirm the file is deleted
5. **Check console logs** for deletion confirmation messages

## Troubleshooting

### Files Not Being Deleted

1. **Check environment variables**: Ensure all Backblaze variables are set
2. **Check console logs**: Look for deletion confirmation messages
3. **Check Backblaze permissions**: Ensure your API key has delete permissions
4. **Check network connectivity**: Ensure your server can reach Backblaze B2

### Common Issues

1. **403 Forbidden**: Check API key permissions
2. **File not found**: File may have already been deleted
3. **Network errors**: Check internet connectivity

## Logging

The deletion process logs the following:

- `🗑️ Media deleted from database: [id]` - When database record is deleted
- `✅ File deleted from Backblaze B2: [filename]` - When file is successfully deleted
- `❌ Error deleting file from Backblaze B2: [filename]` - When deletion fails

## Security Notes

- Files are permanently deleted from Backblaze B2
- There is no automatic backup or recovery
- Consider implementing a backup strategy for important files
- Test deletion functionality in a development environment first
