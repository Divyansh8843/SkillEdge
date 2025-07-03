# Google OAuth Configuration Fix

## Problem

Getting "Error 400: redirect_uri_mismatch" when trying to sign in with Google.

## Solution

You need to update your Google Cloud Console OAuth configuration:

### Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID: `315505600602-ika45gr51s9fepj4b0rf5icoerqgh93h.apps.googleusercontent.com`
3. Click on it to edit

### Step 2: Add Authorized JavaScript Origins

Add these origins:

```
http://localhost:8000
```

### Step 3: Add Authorized Redirect URIs

Add these redirect URIs:

```
http://localhost:8000
http://localhost:8000/
```

### Step 4: Save Changes

1. Click "Save" in Google Cloud Console
2. Wait a few minutes for changes to propagate
3. Try signing in again at http://localhost:8000

## Note

Make sure your app is running on exactly `http://localhost:8000` (which it is now).
