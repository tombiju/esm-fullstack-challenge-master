import { createClient } from "@supabase/supabase-js";
import { AuthProvider, HttpError } from "react-admin";

// ✅ Use environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authProvider: AuthProvider = {
  login: async ({ email, phone }: { email?: string; phone?: string }) => {
    let result;
    if (email) {
      result = await supabase.auth.signInWithOtp({
        email,
      });
    } else if (phone) {
      result = await supabase.auth.signInWithOtp({
        phone,
      });
    } else {
      return Promise.reject(new HttpError("Missing email or phone", 400));
    }

    if (result.error) {
      return Promise.reject(
        new HttpError("Failed to send magic link.", 400, {
          message: result.error.message,
        }),
      );
    }

    return Promise.resolve();
  },

  logout: async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    return Promise.resolve();
  },

  checkError: () => Promise.resolve(),
  checkAuth: () =>
    supabase.auth
      .getSession()
      .then(({ data }) =>
        data.session
          ? Promise.resolve()
          : Promise.reject(new HttpError("Not authenticated", 401)),
      ),

  getPermissions: () => Promise.resolve(undefined),

  getIdentity: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user || null;
  },
};

export default authProvider;
