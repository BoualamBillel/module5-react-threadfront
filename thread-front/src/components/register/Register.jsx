import { useState } from "react";
import ErrorMessage from "../messages/ErrorMessage";
import "./Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== "" && verifyPassword !== "") {
            if (password !== verifyPassword) {
                setError("Les mots de passe ne correspondent pas. !");
                return;
            };

            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials : 'include',
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                })
            });

            if (response.ok) {
                setUsername("");
                setEmail("");
                setPassword("");
                setVerifyPassword("");
                // REDIRECTION VERS VERS LE FEED A IMPLEMENTER
            } else {
                const data = await response.json();
                setError(data.message);
                return;
            }
        };
    }

    return (
        <div className="register-container">
            {error !== "" && <ErrorMessage message={error} />}
            <h2 className="register-title">Créer un compte</h2>
            <div className="register-form">
                <form action="" method="post" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder="E-Mail"
                        required
                        className="register-input"
                        autoComplete="email"
                    />
                    <input
                        type="text"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        placeholder="Nom d'utilisateur"
                        required
                        className="register-input"
                        autoComplete="username"
                    />
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder="Mot de passe"
                        required
                        className="register-input"
                        autoComplete="new-password"
                    />
                    <input
                        type="password"
                        onChange={e => setVerifyPassword(e.target.value)}
                        value={verifyPassword}
                        placeholder="Confirmer le mot de passe"
                        className="register-input"
                        autoComplete="new-password"
                    />
                    <button type="submit" className="register-btn">S'inscrire</button>
                </form>
            </div>
        </div>
    );
}

export default Register;