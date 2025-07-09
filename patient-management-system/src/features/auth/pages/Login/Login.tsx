import { Formik, Form } from 'formik';
import { login as loginUser } from '../../api/authApi';
import { LoginRequest } from '../../types';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospitalSymbol } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { CustomButton, CustomContainer, CustomTextField } from '../../../../components/common/Custom';
import { PasswordField } from '../../../../components/common/Custom/PasswordField';

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
    <CustomContainer>
      <Box textAlign="center">
        <FontAwesomeIcon icon={faHospitalSymbol} size="2x" color="#007C7B" />
        <Typography variant="h5" component="h1" mt={1}
        sx = {{ fontWeight: 'bold', color: '#007b83' }}>
          C9 SmartCare
        </Typography>
        <Typography variant="h6" mt={2} mb={3}
        sx = {{ fontWeight: 'bold', color: '#007b83' }}>
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
              <CustomTextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

            <PasswordField
            id="password"
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            />

              {serverError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {serverError}
                </Alert>
              )}

              <CustomButton
                type="submit"
                loading={loading}
                sx={{ mt: 3 }}
              >
                Login
              </CustomButton>

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
    </CustomContainer>
  );
};