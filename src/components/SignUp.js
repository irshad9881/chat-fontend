import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link,  useNavigate } from 'react-router-dom';
import './SignUP.css'
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:1337/api/auth/local/register`, {
                username,
                email,
                password,
            });
            alert('user created successfully');
            navigate('/login');
        } catch (err) {

            if (err.response) {
                const errorMessage = err.response.data?.error?.message || 'An error occurred during registration';
                console.log("Status:", err.response.status);
                console.log("Error Name:", err.response.data?.error?.name);
                console.log("Error Message:", errorMessage);

                // Display the error message to the user
                alert("Error: " + errorMessage);

                // Set the error state to display in the UI, if needed
                setError(errorMessage);

            } else if (err.request) {
                console.log("network err");
            } else {
                console.log(err);
            }

        }
    };



    return (
        <div className={'main-container'}>
            <Form onSubmit={handleSubmit} className='signup'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usernames</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <Form.Text className="text-muted">
                        We'll never share your username with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Button id='buttonsubmit' variant="primary" type="submit">
                    SignUp
                </Button>
                {error && <p>{error}</p>}
                <p className='mt-2'>
                    <span>   Already have an account?  </span>
                <Link className="link-opacity-50-hover" to='/login'>Log in</Link>
            </p>
            </Form>
           
        </div>
    );
};

export default SignUp;
