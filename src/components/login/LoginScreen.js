import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

// Ant desing
import { 
    Row,
    Col,
    Card,
    Typography,
    Form,
    Button
} from 'antd';

// Components
import { LoginForm } from './components/LoginForm';
import { Footer } from '../ui/Footer';

export const LoginScreen = ({ history }) => {

    const [form]             = Form.useForm();
    
    const { user, dispatch } = useContext( AuthContext );
   
    const { Title }          = Typography;

    // ON FINISH FORM SUBMIT
    const onFinish = (values) => {
       
        if( !user.logged && values.username === user.email && values.password === user.password )
            handleLogin( user );
        else
            form.setFields([    
                {
                    name   : 'email',
                    errors : ['Email or password is incorrect'] ,
                },
            ]);
    };

    // HANDLE LOGIN
    const handleLogin = ( values ) => {
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
                        <Row className="row justify-content-md-center mt-5">
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
                                title={<Title level={2}>Login</Title>} 
                            >
                                <Form
                                    form={ form }
                                    className="login"
                                    layout="vertical"
                                    name="form"
                                    onFinish={ onFinish }
                                >
                                    <LoginForm />
                                    <Form.Item>
                                        <Button
                                            block
                                            className="submit" 
                                            htmlType="submit"
                                            size="large"
                                            type="primary">
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Col 
                                    className="text-center" 
                                    span={24}
                                >
                                    or
                                    <Link 
                                        className="link"
                                        to="/register"> Sign up
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
