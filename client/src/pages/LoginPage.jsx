import {useState, useContext} from 'react';
import {UserContext} from '../UserContext';
import {Navigate} from 'react-router';


export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUserInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/login`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password}),
            credentials: "include"
        })

        if(response.ok){
            response.json().then((userInfo) => {
                setUserInfo(userInfo)
                setRedirect(true)
            })
        }
    }

    if(redirect){
        return <Navigate to="/"/>
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
    );
};