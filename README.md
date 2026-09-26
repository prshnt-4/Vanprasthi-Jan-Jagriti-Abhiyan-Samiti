# Vanprasthi-Jan-Jagriti-Abhiyan-Samiti
# Vanprasthi-Jan-Jagriti-Abhiyan-Samiti

## Run the admin portal locally without MongoDB

1. Install dependencies with `npm install`.
2. Set `LOCAL_TRIAL_MODE=true` in `.env.local`.
3. Start the app with `npm run dev` and open `http://localhost:3000/admin/login`.
4. Sign in with `admin@vanprasthisamiti.org` / `AdminPass@2026!`.

Local trial data is stored in `.local-trial/store.json`. It persists across restarts and is not used in production. Set `LOCAL_TRIAL_MODE=false` to use the MongoDB connection configured by `MONGODB_URI`.

Admin Gallery, Events, and News & Articles forms accept image uploads from a computer or phone. Uploaded image files are saved under `public/uploads/`; keep that directory on the same persistent disk as the app.
