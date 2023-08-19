import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const passwordReset = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password"
  });

const updatePassword = (updatedPassword) =>
  supabase.auth.updateUser({ password: updatedPassword });

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false)

  const checkUserAccess = async (userId) => {
    const { data, error } = await supabase
      .from("UserAccess")
      .select("approved")
      .eq("user_id", userId)
      .single();
    if (data) {
      setIsApproved(data.approved);
    } else {
      console.log('User access not found:', error);
    }
    setIsLoading(false);
  };


  useEffect(() => {
    setIsLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);
      
      if (currentUser) {
        checkUserAccess(currentUser.id);
      }
      setIsLoading(false)
    };
    getUser();
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        setAuth(false);
      } else if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setAuth(false);
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        login,
        signOut,
        passwordReset,
        updatePassword
      }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;