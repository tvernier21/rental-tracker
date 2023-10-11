import { createClient } from '@supabase/supabase-js'

let supabaseInstance: ReturnType<typeof createClient> | null = null;

const getSupabaseClient = (supabaseAccessToken: any) => {
  // Only create a new instance if it doesn't exist
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
      {
        global: { 
          headers: { Authorization: `Bearer ${supabaseAccessToken}` }
        }
      }
    );
  }

  return supabaseInstance;
};

export default getSupabaseClient;