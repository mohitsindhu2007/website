# Deployment Guide for Mr Sindhu Furniture and Electronics

## Netlify Deployment Steps

### 1. Connect to GitHub
1. First, push this repository to GitHub:
   ```
   git add .
   git commit -m "Prepare for deployment"
   git push -u origin main
   ```

2. Sign in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select GitHub and authorize Netlify
5. Choose your repository (mohitsindhu121/Web)

### 2. Configure Build Settings
Configure the following build settings on Netlify:
- Build command: `npm run build`
- Publish directory: `dist`

### 3. Set Environment Variables
In Netlify's site settings under "Environment", add the following variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: production
- `PORT`: 8080 (Netlify will override this anyway)

### 4. Deploy Settings
In your Netlify site settings:
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the instructions to set up DNS records

### 5. Additional Configuration for Functions
If you want to use Netlify Functions for your API:
1. Create a `.netlify/functions` directory locally
2. Move server-side code to serverless functions
3. Update API endpoints to point to `.netlify/functions/api`

## Vercel Alternative Deployment

If you prefer Vercel:
1. Sign up for [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Configure the same environment variables
4. Deploy your site

## Checking Your Deployment
1. After deployment, check if your site is working correctly
2. Test all features: product browsing, review system, cart functionality
3. Verify database connection is working properly

## Custom Domain Setup
For a free custom domain:
1. Use [Freenom](https://www.freenom.com/) to register a free domain
2. Connect it to your Netlify site using the instructions provided
3. Wait for DNS propagation (can take up to 48 hours)

## Need Help?
If you encounter any issues during deployment, check the Netlify logs for error messages or contact support.