# Backblaze B2 Storage Setup

This guide will help you configure Backblaze B2 storage for your Payload CMS application.

## Prerequisites

1. A Backblaze B2 account
2. A B2 bucket created
3. Application keys (Access Key ID and Secret Access Key)

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Backblaze B2 Configuration
BACKBLAZE_BUCKET=your-bucket-name
BACKBLAZE_ENDPOINT=https://s3.us-west-002.backblazeb2.com
BACKBLAZE_REGION=us-west-002
BACKBLAZE_ACCESS_KEY_ID=your-access-key-id
BACKBLAZE_SECRET_ACCESS_KEY=your-secret-access-key
```

## Backblaze B2 Setup Steps

### 1. Create a B2 Account

- Go to [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html)
- Sign up for an account

### 2. Create a Bucket

- Log into your Backblaze B2 account
- Click "Create Bucket"
- Choose a unique bucket name
- Select "All Public" or "Private" based on your needs
- Choose your preferred region

### 3. Create Application Keys

- Go to "App Keys" in your B2 account
- Click "Add a New Application Key"
- Give it a name (e.g., "Payload CMS")
- Select your bucket
- Choose "Read and Write" permissions
- Save the Access Key ID and Secret Access Key

### 4. Get Your Endpoint URL

- The endpoint URL format is: `https://s3.{region}.backblazeb2.com`
- Common regions:
  - US West: `https://s3.us-west-002.backblazeb2.com`
  - US East: `https://s3.us-east-002.backblazeb2.com`
  - EU Central: `https://s3.eu-central-003.backblazeb2.com`

## Configuration

The storage is already configured in `src/payload.config.ts` to use Backblaze B2 for the `media` collection. The configuration includes:

- S3-compatible storage adapter
- Automatic image resizing
- File size limits (5MB by default)
- Proper CORS configuration

## Testing

1. Start your development server: `pnpm dev`
2. Go to the Payload admin panel
3. Try uploading an image to the Media collection
4. Check your Backblaze B2 bucket to see the uploaded files

## Troubleshooting

### Common Issues

1. **403 Forbidden**: Check your Access Key ID and Secret Access Key
2. **Bucket not found**: Verify your bucket name and region
3. **CORS errors**: Ensure your bucket allows CORS from your domain

### Debug Environment Variables

Make sure all environment variables are properly set:

```bash
echo $BACKBLAZE_BUCKET
echo $BACKBLAZE_ENDPOINT
echo $BACKBLAZE_REGION
echo $BACKBLAZE_ACCESS_KEY_ID
echo $BACKBLAZE_SECRET_ACCESS_KEY
```

## Security Notes

- Never commit your `.env` file to version control
- Use different application keys for development and production
- Consider using IAM roles for production deployments
- Regularly rotate your access keys

## Cost Optimization

- Backblaze B2 charges for storage and data transfer
- Consider setting up lifecycle policies for old files
- Monitor your usage in the B2 dashboard
