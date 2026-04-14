import React from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Box,
} from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  gender: Yup.string().required("Gender is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(registerUserAction({ data: values }));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div>
                <Field
                  as={TextField}
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="firstName">
                  {(msg) => (
                    <Typography color="error" variant="caption">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="lastName">
                  {(msg) => (
                    <Typography color="error" variant="caption">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <Typography color="error" variant="caption">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>
              </div>

              <div>
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="password">
                  {(msg) => (
                    <Typography color="error" variant="caption">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>
              </div>

              <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                <Field as={RadioGroup} row name="gender">
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </Field>
              </Box>
              <ErrorMessage name="gender">
                {(msg) => (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ display: "block", textAlign: "center" }}
                  >
                    {msg}
                  </Typography>
                )}
              </ErrorMessage>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center gap-2 items-center pt-5">
        <p>Already have an account ?</p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </Box>
  );
};

export default Register;



 