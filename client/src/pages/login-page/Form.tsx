import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik, FormikTouched, FormikErrors, FormikHelpers } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';

import { FlexBetween } from '../../components/FlexBetween';

import { setLogin } from '../../state/index';
import {
  FormValue,
  LoginFormValue,
  RegisterFormValue,
} from '../../types/props';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.string().required('required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

export const Form = () => {
  const [pageType, setPageType] = useState('login');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';

  const register = async (
    values: RegisterFormValue,
    onSubmitProps: FormikHelpers<FormValue>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }
    formData.append('picturePath', values.picture.name);

    const savedUserResponse = await fetch(
      'https://social-flare.onrender.com/auth/register',
      {
        method: 'POST',
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType('login');
    }
  };

  const login = async (
    values: LoginFormValue,
    onSubmitProps: FormikHelpers<FormValue>
  ) => {
    const loggedInResponse = await fetch(
      'https://social-flare.onrender.com/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate('/home');
    }
  };

  const handleFormSubmit = async (
    values: FormValue,
    onSubmitProps: FormikHelpers<FormValue>
  ) => {
    if (isLogin) await login(values as LoginFormValue, onSubmitProps);
    if (isRegister) await register(values as RegisterFormValue, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValue).firstName}
                  name="firstName"
                  error={
                    Boolean(
                      (touched as FormikTouched<RegisterFormValue>).firstName
                    ) &&
                    Boolean(
                      (errors as FormikErrors<RegisterFormValue>).firstName
                    )
                  }
                  helperText={
                    (touched as FormikTouched<RegisterFormValue>).firstName &&
                    (errors as FormikErrors<RegisterFormValue>).firstName
                  }
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValue).lastName}
                  name="lastName"
                  error={
                    Boolean(
                      (touched as FormikTouched<RegisterFormValue>).lastName
                    ) &&
                    Boolean(
                      (errors as FormikErrors<RegisterFormValue>).lastName
                    )
                  }
                  helperText={
                    (touched as FormikTouched<RegisterFormValue>).lastName &&
                    (errors as FormikErrors<RegisterFormValue>).lastName
                  }
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValue).location}
                  name="location"
                  error={
                    Boolean(
                      (touched as FormikTouched<RegisterFormValue>).location
                    ) &&
                    Boolean(
                      (errors as FormikErrors<RegisterFormValue>).location
                    )
                  }
                  helperText={
                    (touched as FormikTouched<RegisterFormValue>).location &&
                    (errors as FormikErrors<RegisterFormValue>).location
                  }
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFormValue).occupation}
                  name="occupation"
                  error={
                    Boolean(
                      (touched as FormikTouched<RegisterFormValue>).occupation
                    ) &&
                    Boolean(
                      (errors as FormikErrors<RegisterFormValue>).occupation
                    )
                  }
                  helperText={
                    (touched as FormikTouched<RegisterFormValue>).occupation &&
                    (errors as FormikErrors<RegisterFormValue>).occupation
                  }
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue('picture', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!(values as RegisterFormValue).picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>
                              {(values as RegisterFormValue).picture.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={(values as LoginFormValue).email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={(values as LoginFormValue).password}
              name="password"
              error={
                Boolean((touched as FormikTouched<LoginFormValue>).password) &&
                Boolean((errors as FormikErrors<LoginFormValue>).password)
              }
              helperText={
                (touched as FormikTouched<LoginFormValue>).password &&
                (errors as FormikErrors<LoginFormValue>).password
              }
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login');
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : 'Already have an account? Login here.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};
