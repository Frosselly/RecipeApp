import { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form submitted', formData);
    };

    return (
        <>
        <h2 className="form-title">Register</h2>
        <form onSubmit={handleSubmit}>
            <label className="field-title mb-sm">
                Username:
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    maxLength={50}
                />
            </label>

            <label className="field-title mb-sm">
                Email:
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={255}
                />
            </label>

            <label className="field-title mb-sm">
                Password:
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    maxLength={100}
                />
            </label>

            <label className="field-title mb-sm">
                Confirm Password:
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    maxLength={100}
                />
            </label>

            <button type="submit" className="submit-btn mt-sm">Register</button>
        </form>
        </>
    );
};

export default RegisterForm;