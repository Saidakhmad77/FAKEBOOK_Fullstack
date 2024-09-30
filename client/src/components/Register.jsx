import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        bio: "",
    });

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [registrationError, setRegistrationError] = useState("");

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "password") {
            setPasswordMatch(value === formData.confirmPassword);
            setIsPasswordValid(validatePassword(value));
        } else if (name === "confirmPassword") {
            setPasswordMatch(value === formData.password);
        }

        if (name === "username") {
            setUsernameTaken(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordMatch && isPasswordValid) {
            registerUser(formData);
        } else {
            console.log("Passwords do not match or password is invalid");
        }
    };

    const registerUser = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/register", data);
            console.log(response.data);
            setRegistrationError("");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setUsernameTaken(true);
                setRegistrationError("Username already exists!");
            } else {
                console.error("Registration error", error);
                setRegistrationError("Failed to register, please try again later.");
            }
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
                    {usernameTaken && <p style={{ color: "red" }}>Username is already taken!</p>}
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
                {!isPasswordValid && (
                    <p style={{ color: "red" }}>
                        Password must be at least 8 characters long and contain at least one letter, one number, and one special character.
                    </p>
                )}
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
                {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match!</p>}
                <div className="input-container">
                    <input
                        type="text"
                        name="bio"
                        placeholder="Bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>
                {registrationError && <p style={{ color: "red" }}>{registrationError}</p>}
                <button type="submit" className="register-btn">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
