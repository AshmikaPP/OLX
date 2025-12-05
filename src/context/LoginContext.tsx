import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  email: string | null;
}

interface AuthContextProps {
  user: User | null;
  logIn: (email: string) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      let email = JSON.parse(storedUser);
      setUser(email.email); 
    }
  }, []); 
  


  function logIn(email: string) {
    const user1 = { email };
    setUser(user1);
    localStorage.setItem("user", JSON.stringify(user1));
  }

  function logOut() {
    setUser(null);
    localStorage.removeItem("user");
    console.log("User logged out");
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
}
