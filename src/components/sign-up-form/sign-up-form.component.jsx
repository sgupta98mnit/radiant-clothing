import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { Form } from 'react-router-dom';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields(defaultFormFields);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else if (error.code === 'auth/weak-password') {
                alert('Password must be at least 6 characters');
            }
            else {
                console.log('user created error', error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;


        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' required onChange={handleChange} name='displayName' value={displayName} />

                <FormInput label='Email' required onChange={handleChange} name='email' value={email} />

                <FormInput label='Password' required onChange={handleChange} name='password' value={password} type='password' />

                <FormInput label='Confirm Password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} type='password' />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
};

export default SignUpForm;