import * as yup from 'yup'

export const signupSchema = yup
    .object({
        username: yup
            .string()
            .required('First name is required')
            .matches(/^[a-zA-Z0-9_]{3,20}$/, 'Please enter valid name')
            .max(40),
        email: yup
            .string()
            .required('Email is required.')
            .email('Email must be a valid email'),
        password: yup
            .string()
            .required('Password is required.')
            .min(8, 'Password must be at least 8 characters')
            .max(32, 'Password must be at most 32 characters'),
        confirm_password: yup
            .string()
            .required('Confirm password is required.')
            .oneOf([yup.ref('password'), null], 'Password does not match.'),
    })
    .required()

    export const loginSchema = yup
      .object({
        email: yup
          .string()
          .required('This field is required.')
          .test(
            'Email or Username',
            'Must be a valid email or username',
            (value) => {
              if (!value) return false;
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
              return emailRegex.test(value) || usernameRegex.test(value);
            }
          ),
        password: yup
          .string()
          .required('This field is required.')
          .min(8, 'Password must be at least 8 characters'),
      })
      .required();
    