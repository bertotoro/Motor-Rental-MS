import React from "react";
import { Row, Col, Form, Input, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from "../redux/actions/userActions";
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css';

AOS.init();

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertsReducer);

  function onFinish(values) {
    console.log("Form Values: ", values); // Add logging for debugging
    if (values.password !== values.cpassword) {
      message.error("Passwords do not match");
      return;
    }
    
    const userObj = {
      username: values.username,
      password: values.password,
      role: values.isAdmin ? 'admin' : 'user' // Correctly set role based on isAdmin checkbox
    };
    
    dispatch(userRegister(userObj));
    console.log("User Object: ", userObj); // Add logging for debugging
  }

  return (
    <div className="login">
      {loading && (<Spinner />)}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img 
            className='w-100'
            data-aos='slide-right'
            data-aos-duration='1500'
            src={require('../asset/img2.webp').default}
            alt="Background" 
          />
          <h1 className='login-logo'style={{ position: 'relative', top: '-210px' }}>M O T O  R E N T A L</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5" onFinish={onFinish} initialValues={{ isAdmin: false }} style={{ marginTop: '100px', padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input type="password"/>
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
              <Input type="password"/>
            </Form.Item>
            <Form.Item name="isAdmin" valuePropName="checked">
              <Checkbox>Register as Admin</Checkbox>
            </Form.Item>
            <button type="submit" className="btn1 mt-2 mb-3">Register</button>
            <br />
            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
