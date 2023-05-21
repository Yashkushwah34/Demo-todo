import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Row, Col, Input } from "antd";

import { Button } from "antd";

import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import classNames from "classnames";
import { useApi } from "../../Context/apiContext";

import styles from "./login.module.scss";

const LoginPage = () => {
  const emailReg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { response, callApi } = useApi();

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const blurValidationHandler = (type = "") => {
    if (type === "email") {
      if (!emailReg.test(email)) {
        setError({
          ...error,
          email: true,
        });
      }
    }
    if (type === "password") {
      if (!password.trim()) {
        setError({
          ...error,
          password: true,
        });
      }
    }
  };

  const validationHandler = () => {
    setError({
      email: false,
      password: false,
    });
    let emailError = false;
    let passwordError = false;
    let error = false;
    if (!emailReg.test(email)) {
      emailError = true;
      error = true;
    }
    if (!password.trim()) {
      passwordError = true;
      error = true;
    }
    setError({
      email: emailError,
      password: passwordError,
    });
    return error;
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const validate = validationHandler();
    if (!validate) {
      const obj = {
        email: email,
        password: password,
      };
      await callApi(obj);
    }
  };

  useEffect(() => {
    if (response && response.token) {
      localStorage.setItem("token", response.token);
      window.location.href = "/";
    }
  }, [response]);

  return (
    <>
      <Row
        gutter={[24, 24]}
        className={styles.container}
        justify="center"
        align="middle"
      >
        <Col xs={24}>
          <Row gutter={[24, 24]} justify="center" align="middle">
            <Col xs={24}>
              <div className={styles.welcomeTextContainer}>
                <h1>Welcome</h1>
              </div>
            </Col>
            <Col xl={7} lg={11} xs={18}>
              <div className={styles.loginContainer}>
                <form onSubmit={onSubmitHandler}>
                  <Row gutter={[24, 24]} justify="center">
                    <Col span="24">
                      <Row justify="center">
                        <Col span="20" className={styles.heading}>
                          <h2>Login</h2>
                        </Col>
                      </Row>
                    </Col>
                    <Col span="24">
                      <Row gutter={[24, 24]}>
                        <Col span="24">
                          <Input
                            className={classNames(styles.loginInput, {
                              [styles.error]: error.email,
                            })}
                            placeholder="Email"
                            bordered={false}
                            value={email}
                            onFocus={() =>
                              setError({
                                ...error,
                                email: false,
                              })
                            }
                            onBlur={() => blurValidationHandler("email")}
                            prefix={
                              <MdOutlineAlternateEmail
                                size={18}
                                fill={
                                  error.email ? "rgb(170, 40, 40)" : "#979797"
                                }
                              />
                            }
                            onChange={handleEmailChange}
                          />
                        </Col>
                        <Col span="24">
                          <Input.Password
                            className={classNames(styles.loginInput, {
                              [styles.error]: error.password,
                            })}
                            placeholder="Password"
                            bordered={false}
                            value={password}
                            onChange={handlePasswordChange}
                            onFocus={() =>
                              setError({
                                ...error,
                                password: false,
                              })
                            }
                            onBlur={() => blurValidationHandler("password")}
                            prefix={
                              <RiLockPasswordLine
                                size={18}
                                fill={
                                  error.password
                                    ? "rgb(170, 40, 40)"
                                    : "#979797"
                                }
                              />
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span="24">
                      <Row justify="center">
                        <Button type="primary" htmlType="submit">
                          Login
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
