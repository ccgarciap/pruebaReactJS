import React from 'react';

// Antd desing
import {  Form, Input } from 'antd';

export const LoginForm = () => {

    return (
        <>
            <Form.Item
                hasFeedback
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email' }]}
            >
                <Input size="large" />
            </Form.Item>
            <Form.Item
                hasFeedback
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password' }]}
            >
                <Input.Password size="large" />
            </Form.Item>
        </>
    );
};
