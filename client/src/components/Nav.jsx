import { useContext, useEffect } from "react";
import { Link, Navigate} from "react-router";
import { UserContext } from "../UserContext";

export default function Nav() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  async function logout() {
    const response = await fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
    });

    if (response.ok && userInfo === null) {
      return <Navigate to="/" />;
    }
  }

  const username = userInfo?.username;

  return (
    <nav>
      <ul>
        <li >
          <Link to="/">Mamos receptai</Link>
        </li>
        <ul>
          {username && (
            <>
              <p>Welcome, {username}</p>
              <li>
                <Link to="/add-recipe">Kurti recepta</Link>
              </li>
              <a onClick={logout}>Atsijungti</a>
            </>
          )}
          {!username && (
            <>
              <li>
                <Link to="/register">Registruotis</Link>
              </li>
              <li>
                <Link to="/login">Prisijungti</Link>
              </li>
            </>
          )}
        </ul>
      </ul>
    </nav>
  );
}
