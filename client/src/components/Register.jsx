import { useState } from "react";
import axios from "axios";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        bio: "",
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "confirmPassword") {
            setPasswordMatch(value === formData.password);
        } else if (name === "password") {
            setPasswordMatch(value === formData.confirmPassword);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordMatch) {
            console.log("Form submitted", formData);
            registerUser(formData);
        } else {
            console.log("Passwords do not match");
        }
    };

    const registerUser = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/register", data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        name="bio"
                        placeholder="Bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>
                {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match!</p>}
                <button type="submit" className="register-btn">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
