import React, { useEffect, useCallback } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers';
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
import { registerSchema } from '../../utils/validations/validationSchemas';
import { useRegisterUserHook } from '../../services/hooks/userHooks';
import { HOME_ROUTE } from '../../utils/routesConstants';

const Register = () => {
  const history = useHistory();
  const classes = useFormStyles();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid, isSubmitting }
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: joiResolver(registerSchema)
  });

  const { user, startRegister } = useRegisterUserHook();

  useEffect(() => {
    if (user) {
      history.push(HOME_ROUTE);
    }
  }, [history, user]);

  const onSubmit = useCallback(
    (data) =>
      startRegister(data.firstName, data.lastName, data.email, data.password),
    [startRegister]
  );

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                inputRef={register}
                error={isPresent(errors.firstName)}
                helperText={errors.firstName && 'First Name is required'}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={register}
                error={isPresent(errors.lastName)}
                helperText={errors.lastName && 'Last Name is required'}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid || isSubmitting}
          >
            Sign Up
            {isSubmitting && <SpinnerAdornment />}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
