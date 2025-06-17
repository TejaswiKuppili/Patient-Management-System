import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login as loginUser } from '../../api/authApi';
import { LoginRequest } from '../../types';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalSymbol } from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const Login = () => {
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    setServerError('');
    try {
      await loginUser(values);
      alert('Login successful');
      navigate('/dashboard/assign-roles');
    } catch (error: any) {
      setServerError(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box textAlign="center" mt={5}>
        <FontAwesomeIcon icon={faHospitalSymbol} size="2x" color="#007C7B" />
        <Typography variant="h4" component="h1" mt={1}>
          C9 SmartCare
        </Typography>
        <Typography variant="h6" mt={2}>
          Login
        </Typography>
      </Box>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <Box mt={3}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                margin="normal"
              />

              {serverError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {serverError}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting || loading}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>

              <Box mt={2} textAlign="center">
                <Typography variant="body2">
                  Don’t have an account?{' '}
                  <Link to="/register" style={{ color: '#007C7B' }}>
                    Register
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};







// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { login as loginUser } from '../../api/authApi';
// import { LoginRequest } from '../../types';
// import * as Yup from 'yup';
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Login.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHospitalSymbol } from '@fortawesome/free-solid-svg-icons';

// const LoginSchema = Yup.object().shape({
// email: Yup.string().email('Invalid email').required('Email is required'),
// password: Yup.string().required('Password is required'),
// });

// // This component handles user login functionality
// export const Login = () => {
//     const [serverError, setServerError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (values: LoginRequest) => {
//         setLoading(true);
//         setServerError('');
//         try {
//         await loginUser(values);
//         alert('Login successful')
//         navigate('/dashboard/assign-roles');
//         } catch (error: any) {
//         setServerError(error?.response?.data?.message || 'Something went wrong');
//         } finally {
//         setLoading(false);
//     }
// };

// return (
//     <div className="login-container">
//         <div className="logo-container">
//         <FontAwesomeIcon icon={faHospitalSymbol} size="2x" color="#007C7B" />
//         <h1 className="form-title">C9 SmartCare</h1>
//         </div>
//         <h2 className="form-title">Login</h2>
//         <Formik
//             initialValues={{ email: '', password: '' }}
//             validationSchema={LoginSchema}
//             onSubmit={handleSubmit}
//             >
//             {({ isSubmitting }) => (
//             <Form className="form">
//                 <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <Field type="email" name="email" className="form-input" />
//                 <ErrorMessage name="email" component="div" className="error-message" />
//                 </div>
//                 <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <Field type="password" name="password" className="form-input" />
//                 <ErrorMessage name="password" component="div" className="error-message" />
//                 </div>
//                 {serverError && <div className="server-error">{serverError}</div>}
//                 <button
//                 type="submit"
//                 className="submit-button"
//                 disabled={isSubmitting || loading}
//                 >
//                 {loading ? 'Logging in...' : 'Login'}
//                 </button>
//                 <div className="form-footer">
//                 Don’t have an account?{' '}
//                 <Link to="/register" className="link">
//                 Register
//                 </Link>
//                 </div>
//             </Form>
//             )}
//         </Formik>
//     </div>
// );
// }