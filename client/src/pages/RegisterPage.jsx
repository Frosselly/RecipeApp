import {useState} from 'react';


export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch(`http://localhost:4000/register`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, username, password})
        })
    }

    return (
        <form className='register-form' onSubmit={handleSubmit}>
            <h1>Registracija</h1>
            <input type="text" placeholder="Paštas" onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder="Slapyvardis" onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Slaptažodis" onChange={(e) => setPassword(e.target.value)}/>
            <button>Registruotis</button>
        </form>
    );
};