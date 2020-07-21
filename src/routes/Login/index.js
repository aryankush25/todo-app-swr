import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers';
import Joi from '@hapi/joi';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright';
import SpinnerAdornment from '../../components/shared/SpinnerAdornment';
import { useFormStyles } from '../../styles/formStyles';
import { isPresent } from '../../utils/helper';

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().required()
});

const Login = () => {
  const classes = useFormStyles();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema)
  });

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(data);
      }, 2000);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={register}
            error={isPresent(errors.email)}
            helperText={errors.email && 'Email is required'}
            disabled={isSubmitting}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
            error={isPresent(errors.password)}
            helperText={errors.password && 'Password is required'}
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid || isSubmitting}
          >
            Sign In
            {isSubmitting && <SpinnerAdornment />}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
