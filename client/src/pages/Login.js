// set up react, state, link, mutations, and auth for logging in
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// set up page contents
const Login = (props) => {
    // set form state as blank upon initial load
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state using credentials inputted in form
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    }

    // submit the form
    const handleFormSubmit = async (e) => {
        // prevent page from automatically refreshing upon form submit
        e.preventDefault();
        //check the form state was properly saved
        console.log(formState);

        // attempt to log in using the provided form data
        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (err) { // throw error if anything goes wrong
            console.error(e);
        }

        // clear form values upon submission
        setFormState({
            email: '',
            password: ''
        });
    }

    // return the loaded page
    return (
        <div>
            <h1>Login</h1>
            <div>
                {data ? (
                    <p>
                        Success! You may now head{' '}
                        <Link to="/">back to the homepage.</Link>
                    </p>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <input
                            placeholder="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="password"
                            name="password"
                            type="password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                        <button
                            className="btn btn-block btn-primary"
                            style={{ cursor: 'pointer' }}
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                )}

                {error && (
                    <div>
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
}

// export the page layout
export default Login;
