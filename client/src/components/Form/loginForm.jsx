import { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <>
        <div className="hero"><h2 className="form-title">Prisijungimas</h2></div>
        
        <form onSubmit={handleSubmit}>
            
                <label className="field-title mb-sm">Paštas:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </label>
            
                <label className="field-title mb-sm">Slaptažodis:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </label>
                {/* <Link to="..register">Registruotis</Link> */}
                <a href="">Registruotis</a>
            <button className="submit-btn mt-sm" type="submit">Prisijungti</button>
        </form>

        </>
    );
};

export default LoginForm;