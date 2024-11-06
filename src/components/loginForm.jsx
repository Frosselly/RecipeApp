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
        <h2 className="form-title">Log in</h2>
        <form onSubmit={handleSubmit}>
            
                <label className="field-title mb-sm">Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </label>
            
                <label className="field-title mb-sm">Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </label>
            <button className="submit-btn mt-sm" type="submit">Login</button>
        </form>

        </>
    );
};

export default LoginForm;