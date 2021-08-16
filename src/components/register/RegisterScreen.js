import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

// Antd desing
import { 
    Form,
    Button,
    Row,
    Col,
    Card,
    Typography
} from 'antd';

// Components
import { RegisterForm } from './components/RegisterForm';
import { Footer } from '../ui/Footer';

export const RegisterScreen = ({ history }) => {

    const { dispatch } = useContext( AuthContext );

    const { Title }    = Typography;

    // ON SUBMIT FORM
    const onFinish = ( values ) => {
        handleRegister( values );
    };

    // HANDLE REGISTER
    const handleRegister = ( values ) => {
        dispatch({
            type    : types.login,
            payload : {
                ...values
            }
        });

        history.replace('/'); 
    }
   
    return (
        <>
            <Row>
                <Col span={24}>
                    <div className="container-fluid">
                        <Row className="row justify-content-md-center mt-3">
                            <Col 
                                span={24}
                                className="text-center mb-3" 
                            >
                                <img
                                    className="logo"
                                    src="/assets/images/logo.png" alt="Logo" 
                                    width={210} />
                            </Col>
                            <Card 
                                bordered={false}
                                className="form-block" 
                                title={<Title level={2}>Sign up</Title>} 
                            >
                                <Form
                                    className="login"
                                    layout="vertical"
                                    name="form"
                                    onFinish={ onFinish }
                                >
                                    <RegisterForm />
                                    <Form.Item>
                                        <Button
                                            block
                                            className="submit" 
                                            htmlType="submit"
                                            size="large"
                                            type="primary">
                                            Sign up
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Col 
                                    className="text-center" 
                                    span={24}
                                >
                                    I have an account
                                    <Link 
                                        className="link"
                                        to="/login"> Login
                                    </Link>
                                </Col>
                            </Card>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Footer />
        </>
    );
}
