# GitHub Release & Packages Setup

## 📦 **Create GitHub Release**

### **Option 1: Via GitHub Web Interface (Recommended)**

1. Go to: https://github.com/pratik20gb/shorilabs/releases/new
2. **Choose a tag:** `v1.0.1` (or create new tag)
3. **Release title:** `v1.0.1 - Fixed Metadata and Links`
4. **Description:**
   ```markdown
   ## 🐛 Bug Fixes
   - Fixed CLI package name in website CLISection component
   - Updated npm package metadata with correct author information
   - Added social links to CLI README

   ## 🔧 Changes
   - Updated all GitHub links to `pratik20gb/shorilabs`
   - Updated Twitter handle to `@sage_pratik`
   - Updated website URL to `shorilabs.xyz`

   ## 📦 Installation
   ```bash
   npm install -g @shorilabs/patterns-cli@1.0.1
   ```

   ## 🔗 Links
   - **Website:** [shorilabs.xyz](https://shorilabs.xyz)
   - **npm Package:** [@shorilabs/patterns-cli](https://www.npmjs.com/package/@shorilabs/patterns-cli)
   - **GitHub:** [pratik20gb/shorilabs](https://github.com/pratik20gb/shorilabs)
   ```
5. Click **"Publish release"**

### **Option 2: Via Git Tags (Already Created)**

The tag `v1.0.1` is already created locally. Push it:

```bash
git push origin v1.0.1
```

Then create release on GitHub using the tag.

---

## 📦 **GitHub Packages**

**Note:** You're using **npm** (not GitHub Packages), which is correct! GitHub Packages is a separate registry. Your package is already on npm, which is the standard.

If you want to also publish to GitHub Packages:

1. Go to: https://github.com/settings/tokens
2. Create a token with `write:packages` permission
3. Update `.npmrc` in CLI directory:
   ```
   @shorilabs:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN
   ```
4. Publish: `npm publish --access public`

**But this is optional** - npm is the standard and you're already there! ✅

---

## ✅ **Quick Steps**

1. **Push tags:**
   ```bash
   git push origin v1.0.1
   ```

2. **Create release on GitHub:**
   - Go to: https://github.com/pratik20gb/shorilabs/releases/new
   - Use tag `v1.0.1`
   - Add release notes
   - Publish

3. **Done!** Your release will appear on GitHub.

---

**Your package is already on npm, which is perfect!** GitHub Packages is optional.

