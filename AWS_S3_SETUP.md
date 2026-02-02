# AWS S3 Setup for Payload CMS

This guide will help you configure AWS S3 for file storage in your Payload CMS application.

## Environment Variables

Add these environment variables to your `.env` file:

```env
# AWS S3 Configuration
AWS_S3_BUCKET=your-s3-bucket-name
AWS_S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
```

## AWS S3 Bucket Setup

### 1. Create an S3 Bucket

1. Go to AWS S3 Console
2. Click "Create bucket"
3. Choose a unique bucket name
4. Select your preferred region
5. Configure bucket settings:
   - **Block Public Access**: Uncheck "Block all public access" (if you want public read access)
   - **Bucket Versioning**: Optional
   - **Tags**: Optional

### 2. Configure CORS (Cross-Origin Resource Sharing)

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

### 3. Create IAM User

1. Go to AWS IAM Console
2. Create a new user for your application
3. Attach the following policy (replace `your-bucket-name` with your actual bucket name):

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

### 4. Get Access Keys

1. Go to the IAM user you created
2. Go to "Security credentials" tab
3. Create access keys
4. Copy the Access Key ID and Secret Access Key

## Bucket Permissions

### For Public Read Access (Recommended for media files)

If you want your uploaded files to be publicly accessible:

1. Go to your S3 bucket
2. Click "Permissions" tab
3. Edit "Block public access" settings
4. Uncheck "Block all public access"
5. Save changes
6. Add this bucket policy (replace `your-bucket-name`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

## Testing the Configuration

1. Update your `.env` file with the correct values
2. Restart your development server
3. Try uploading a file in the Payload admin panel
4. Check if the file appears in your S3 bucket

## Troubleshooting

### Common Issues:

1. **403 Forbidden**: Check your IAM permissions and bucket policy
2. **CORS errors**: Ensure CORS is properly configured
3. **Files not accessible**: Check bucket public access settings
4. **Upload fails**: Verify your AWS credentials are correct

### Security Best Practices:

1. Use IAM roles instead of access keys when possible
2. Limit bucket permissions to only what's needed
3. Consider using CloudFront CDN for better performance
4. Enable bucket versioning for backup
5. Set up bucket lifecycle policies for cost optimization

## CloudFront CDN (Optional)

For better performance, consider setting up CloudFront:

1. Create a CloudFront distribution
2. Set your S3 bucket as the origin
3. Update your Payload config to use the CloudFront URL
4. Configure cache behaviors for different file types
