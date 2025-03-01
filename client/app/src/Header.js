import {Link} from "react-router-dom"; 
import {useContext, useEffect, useState} from "react"; 
import { UserContext } from "./UserContext";
export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', { credentials: 'include' })
        .then(response => response.json())
        .then(userInfo => {
            if (userInfo?.id) {
                setUserInfo(userInfo);  
            } else {
                setUserInfo(null);  
            }
        })
        .catch(err => console.error("Error fetching user info:", err));
}, []);
 
function confirmLogout() {
  const confirmLogout = window.confirm("Do you want to log out? Click confirm.");
  if (confirmLogout) {
    logout();
  }
}
  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null); 
  }
  const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <> 
          <span> Welcome, ({username}) </span>
            <Link to="/create">Create new post</Link>
            <a onClick={confirmLogout}>Logout </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}