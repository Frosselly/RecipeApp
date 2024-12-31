import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  // Restore user session on app load
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const user = await response.json();
        setUserInfo(user);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
