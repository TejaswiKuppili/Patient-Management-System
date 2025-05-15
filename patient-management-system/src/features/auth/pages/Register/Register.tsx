import {Formik, Form, Field, ErrorMessage} from 'formik';
import {register as registerUser} from '../../api/authApi';
import { RegisterRequest } from '../../types';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalSymbol } from '@fortawesome/free-solid-svg-icons';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords do not match").required('Confirm Password is required')
});

export const Register = () => {
    const navigate = useNavigate();
    const[serverError, setServerError] = useState('');
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (values: RegisterRequest) => {
        setLoading(true);
        setServerError('');
        try{
            await registerUser(values);
            alert('Registration successful');
            navigate('/login');
            // Redirect to login page or perform any other action
        }
        catch(error: any){
            setServerError(error?.response?.data?.message || 'Something went wrong');
            navigate('/login');
            alert('Registration successful! Please login to continue.');
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <div className="register-container">
            <div className="logo-container">
                <FontAwesomeIcon icon={faHospitalSymbol} size="2x" color="#007C7B" />
                <h1 className="form-title">C9 SmartCare</h1>
            </div>
            <h2 className="form-title">Register</h2>
            <Formik initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}>
                {({isSubmitting}) => (
                    <Form className="form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field type="text" name="name" className="form-input" />
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="form-input" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className="form-input" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field type="password" name="confirmPassword" className="form-input" />
                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                        </div>
                        {serverError && <div className="server-error">{serverError}</div>}
                        <button type="submit" className="submit-button" disabled={isSubmitting || loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        <div className="form-footer"> Already have an account?{' '} <Link to="/login" className="link"> Login </Link> </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}