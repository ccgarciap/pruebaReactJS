import React from 'react';

// Antd desing
import { Row, Col, Typography } from 'antd';

export const Footer = () => {
 
    const { Title } = Typography;

    return (
        <Row className="w-full bg-tertiary">
            <Col xs={24} md={8} lg={8}>
                <img
                    className="b-logo"
                    width={220} 
                    src="/assets/images/b-logo.png" alt="B Logo" />
            </Col>
            <Col xs={24} md={8} lg={8}>
                <Title 
                    className="text-center description" 
                    level={2}>
                        Let's build something awesome together!
                </Title>
            </Col>
            <Col xs={24} md={8} lg={8}>
                <img src="https://www.hellobuild.co/static/People3-3x-4c082c5b2fb0bae50f7d7f0082bab8e6.png" 
                    className="people"
                    alt="People" />
            </Col>
        </Row>
    )
}

