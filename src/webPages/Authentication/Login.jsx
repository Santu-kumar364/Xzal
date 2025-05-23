import { Button, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { loginUserAction } from "../../Redux/Auth/auth.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "" };

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
    dispatch(loginUserAction(values));
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
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

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  padding: "10px 0",
                  marginTop: "10px",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center gap-2 items-center pt-5">
        <p>Don't have an account ?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </>
  );
};

export default Login;
