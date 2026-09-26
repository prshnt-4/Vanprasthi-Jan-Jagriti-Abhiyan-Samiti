/** Local JSON-file storage for admin/CMS trial without MongoDB. Never enabled in production. */
export function isLocalTrialMode(): boolean {
  return process.env.LOCAL_TRIAL_MODE === 'true' && process.env.NODE_ENV !== 'production';
}
