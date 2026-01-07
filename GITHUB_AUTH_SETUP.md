# GitHub OAuth Setup Guide

This guide will help you set up GitHub OAuth authentication for the todo app.

## Step 1: Create GitHub OAuth App

1. Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Click **"New OAuth App"** button
3. Fill in the form:
   - **Application name**: `Todo App`
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click **"Register application"**
5. You'll see your **Client ID** - copy it
6. Click **"Generate a new client secret"** - copy the secret (you can only see it once!)

## Step 2: Create Environment Variables

1. In the root of your project, create a file named `.env.local`
2. Add the following content:

```env
# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# NextAuth Configuration
# Generate a random secret with: openssl rand -base64 32
# Or use any random string (at least 32 characters)
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

3. Replace the placeholder values:
   - `your_github_client_id_here` → Your GitHub Client ID from Step 1
   - `your_github_client_secret_here` → Your GitHub Client Secret from Step 1
   - `your_random_secret_here` → Generate a random secret (see below)

## Step 3: Generate NEXTAUTH_SECRET

Run this command in your terminal to generate a secure random secret:

```bash
openssl rand -base64 32
```

## Step 4: Restart Your Development Server

After creating `.env.local`, restart your Next.js development server:

```bash
npm run dev
```

## Step 5: Test the Integration

1. Click "Log in" in the header
2. You should see a "Sign in with GitHub" button in both Login and SignUp modals
3. Click the button - it should redirect you to GitHub
4. Authorize the app
5. You should be redirected back and see your GitHub username/avatar in the header

## For Production Deployment on Vercel

Follow these steps to deploy your app to Vercel with GitHub OAuth working:

### Step 1: Deploy Your App to Vercel (First Time)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add GitHub OAuth integration"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)** and sign in with your GitHub account

3. **Click "Add New Project"** or **"Import Project"**

4. **Select your repository** from the list

5. **Configure the project**:
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. **Click "Deploy"** (don't add environment variables yet - we'll do that next)

7. **Wait for deployment** - Vercel will give you a URL like `https://your-app-name.vercel.app`

### Step 2: Update GitHub OAuth App for Production

1. **Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)**

2. **Click on your OAuth App** (the one you created for local development)

3. **Update the settings**:
   - **Homepage URL**: `https://your-app-name.vercel.app` (replace with your actual Vercel URL)
   - **Authorization callback URL**: `https://your-app-name.vercel.app/api/auth/callback/github` (replace with your actual Vercel URL)

4. **Click "Update application"**

### Step 3: Add Environment Variables in Vercel

1. **In your Vercel project dashboard**, go to **Settings** → **Environment Variables**

2. **Add the following environment variables** (one by one):

   **Variable 1:**
   - **Name**: `GITHUB_CLIENT_ID`
   - **Value**: Your GitHub Client ID (same as in `.env.local`)
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 2:**
   - **Name**: `GITHUB_CLIENT_SECRET`
   - **Value**: Your GitHub Client Secret (same as in `.env.local`)
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 3:**
   - **Name**: `NEXTAUTH_SECRET`
   - **Value**: Your NEXTAUTH_SECRET (same as in `.env.local` - the one we generated: `sF4UhDQbW6P2csieXmpQyyjiYseiJ4SJo5YrTPa21Xw=`)
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 4:**
   - **Name**: `NEXTAUTH_URL`
   - **Value**: `https://your-app-name.vercel.app` (replace with your actual Vercel URL)
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**

### Step 4: Redeploy Your App

After adding environment variables, you need to trigger a new deployment:

1. **Go to the "Deployments" tab** in Vercel
2. **Click the three dots (⋯)** on your latest deployment
3. **Click "Redeploy"**
4. **Or** make a small change and push to GitHub (Vercel will auto-deploy)

### Step 5: Test Production Deployment

1. **Visit your Vercel URL**: `https://your-app-name.vercel.app`
2. **Click "Log in"** in the header
3. **Click "Sign in with GitHub"**
4. **Authorize the app** on GitHub
5. **You should be redirected back** and see your GitHub username/avatar in the header

### Important Notes:

- **Keep your `.env.local` file for local development** - it won't affect production
- **The same GitHub OAuth App** can work for both local and production (just update the callback URL)
- **Or create a separate OAuth App** for production if you prefer
- **Environment variables in Vercel** override any `.env.local` file in production
- **After updating environment variables**, always redeploy for changes to take effect

### Quick Checklist:

- [ ] Code pushed to GitHub
- [ ] App deployed to Vercel
- [ ] GitHub OAuth App callback URL updated to Vercel URL
- [ ] All 4 environment variables added in Vercel
- [ ] App redeployed after adding environment variables
- [ ] Tested GitHub OAuth login on production URL

## Troubleshooting

- **"Invalid client" error**: Check that your Client ID and Secret are correct in `.env.local`
- **Redirect URI mismatch**: Make sure the callback URL in GitHub matches exactly: `http://localhost:3000/api/auth/callback/github`
- **Session not working**: Ensure `NEXTAUTH_SECRET` is set and the server was restarted after creating `.env.local`

