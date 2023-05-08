import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

import { Form } from './Form';

export const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          backgroundColor: theme.palette.background.alt,
          p: '1rem 6%',
          textAlign: 'center',
        }}
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SocialFlare
        </Typography>
      </Box>

      <Box
        sx={{
          width: isNonMobileScreens ? '50%' : '93%',
          p: '2rem',
          m: '2rem auto',
          borderRadius: '1.5rem',
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Welcome to SocialFlare, the Social Media for Everyone!
        </Typography>
        <Form />
      </Box>
      <Typography
        fontWeight="500"
        variant="h5"
        sx={{
          width: isNonMobileScreens ? '50%' : '93%',
          p: '2rem',
          m: '2rem auto',
          borderRadius: '1.5rem',
          backgroundColor: theme.palette.background.alt,
        }}
      >
        Hey, if you want quick try, you can use this account:
        <br />
        username: testuser@gmail.com password: 1234
        <br />
        username: fakeman@gmail.com password: 1234
      </Typography>
    </Box>
  );
};
