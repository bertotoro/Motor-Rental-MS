import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; 

AOS.init();

function Login() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer);
    const [videoDimensions, setVideoDimensions] = useState({ width: '100%', height: '100%' });

    useEffect(() => {
        // Set the body and html to have full height
        document.body.style.height = '100vh';
        document.documentElement.style.height = '100vh';
    }, []);

    function onFinish(values) {
        dispatch(userLogin(values));
        console.log(values);
    }

    function handleDimensionChange(e) {
        const { name, value } = e.target;
        setVideoDimensions(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className='login' style={{ height: '100vh' }}>
            {loading && (<Spinner />)}
            <Row gutter={16} className='d-flex align-items-center' style={{ height: '100%' }}>
                <Col lg={16} style={{ position: 'relative', height: '100%' }}>
                    <video
                        id='background-video'
                        style={{ 
                            width: '151%', 
                            height: '174%',
                            position: 'relative', 
                            top: '-410px' // Adjust this value as needed
                        }}
                        data-aos='slide-right'
                        data-aos-duration='1500'
                        src={require('../asset/vid1.mp4').default}
                        alt="Background"
                        autoPlay
                        loop
                        muted
                    />
                    <h1 className='login-logo' style={{ position: 'absolute', top: '611px', left: '20px' }}>M O T O R E N T A L</h1>
                </Col>
                <Col lg={8} className='text-left p-5' style={{ height: '100%' }}>
                    <Form layout='vertical' className='login-form' onFinish={onFinish} style={{ marginTop: '217px', padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <h1>Login</h1>
                        <hr />
                        <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                            <Input type='password' />
                        </Form.Item>

                        <button className='btn1 mt-2'>Login</button>

                        <hr />

                        <Link to='/register'>Click Here to Register</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
