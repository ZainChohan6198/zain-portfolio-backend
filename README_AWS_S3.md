# AWS S3 Setup - Quick Guide

## ✅ Configuration Complete

Your Payload CMS is now configured to use AWS S3 for file storage. Here's what you need to do:

## 1. Environment Variables

Add these to your `.env` file:

```env
# AWS S3 Configuration
AWS_S3_BUCKET=your-s3-bucket-name
AWS_S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
```

## 2. AWS Setup Steps

### Create S3 Bucket:

1. Go to AWS S3 Console
2. Create a new bucket with a unique name
3. Choose your preferred region
4. **Important**: Uncheck "Block all public access" if you want files to be publicly accessible

### Create IAM User:

1. Go to AWS IAM Console
2. Create a new user
3. Attach this policy (replace `your-bucket-name`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::your-bucket-name", "arn:aws:s3:::your-bucket-name/*"]
    }
  ]
}
```

4. Create access keys for the user
5. Copy the Access Key ID and Secret Access Key

### Configure CORS:

Add this CORS configuration to your S3 bucket:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

## 3. Test Your Configuration

Run this command to test your AWS S3 connection:

```bash
pnpm test-s3
```

## 4. What's Changed

- ✅ Updated `payload.config.ts` to use AWS S3
- ✅ Created test script for S3 connection
- ✅ Added AWS SDK dependency
- ✅ Created detailed setup documentation

## 5. Next Steps

1. Update your `.env` file with your AWS credentials
2. Create your S3 bucket and configure permissions
3. Run `pnpm test-s3` to verify the connection
4. Start your development server: `pnpm dev`
5. Try uploading a file in the Payload admin panel

## Troubleshooting

- **403 Forbidden**: Check IAM permissions and bucket policy
- **CORS errors**: Ensure CORS is properly configured
- **Files not accessible**: Check bucket public access settings
- **Upload fails**: Verify AWS credentials are correct

For detailed setup instructions, see `AWS_S3_SETUP.md`
