# Deployment Checklist

## Pre-Deployment Setup

### 1. Get API Keys ✅ COMPLETE!
- [x] **Anthropic API Key**: ✅ Configured and ready
- [x] **FAL.ai API Key**: ✅ Configured and ready
- [x] **Supabase**: ✅ Configured and ready

### 2. Local Development ✅ READY!
```bash
# Install dependencies (once npm permission issue is resolved)
npm install

# All environment variables are configured! 🎉
# ✅ Supabase URL and anon key
# ✅ FAL.ai API key
# ✅ Anthropic API key

# Test locally
npm run dev
```

### 3. Set Up Supabase Database
See detailed instructions in `SUPABASE_SETUP.md`:
1. Go to your Supabase SQL Editor
2. Run the schema from `supabase/schema.sql`
3. Verify the `responses` table is created

### 3. Test the Application
- [ ] Visit http://localhost:3000
- [ ] Click "Start Setting Boundaries"
- [ ] Enter a test scenario: "My coworker keeps asking me to cover their shifts"
- [ ] Verify you get three boundary responses
- [ ] Check that images generate (may take 30-60 seconds)
- [ ] Test copy-to-clipboard functionality

## Vercel Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: No Machine - Reformed Doormat's Boundary Coach"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel
1. Visit [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `ANTHROPIC_API_KEY`: Your Anthropic key
   - `FAL_KEY`: Your FAL.ai key
   - `NEXT_PUBLIC_APP_URL`: Your Vercel domain (e.g., https://no-machine.vercel.app)
5. Deploy!

### 3. Post-Deployment Verification
- [ ] Test the live application end-to-end
- [ ] Verify API endpoints work in production
- [ ] Check that images generate properly
- [ ] Confirm error handling works

## Production Considerations

### Performance
- FAL.ai image generation can take 30-60 seconds
- Consider adding a queue system for heavy usage
- Monitor API rate limits

### Scaling
- Current setup handles light-to-moderate traffic
- For high traffic, consider:
  - Image caching/CDN
  - Database for response history
  - Rate limiting

### Monitoring
- Set up Vercel analytics
- Monitor API usage/costs
- Watch for API errors in logs

## Troubleshooting

### Common Issues
- **"API key not found"**: Check environment variables are set correctly
- **Long image loading**: FAL.ai can be slow, this is normal
- **Images not loading**: Check FAL_KEY and model access
- **Build failures**: Ensure all dependencies are in package.json

### API Limits
- **Anthropic**: Check your usage tier and limits
- **FAL.ai**: Monitor credit usage and rate limits