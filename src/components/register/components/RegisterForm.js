import React from 'react';

// ANT DESIGN
import { Form, Input } from 'antd';

export const RegisterForm = () => {

    return (
        <>
            <Form.Item
                hasFeedback
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username' }]}
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
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match'));
                        },
                    }),
                ]}
            >
                <Input.Password size="large" />
            </Form.Item> 
        </>
    );
};
