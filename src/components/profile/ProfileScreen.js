import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

// Ant Design
import { Card, Row, Col, Divider, Table, Tabs, Avatar, Typography, Spin } from 'antd';

import axios from '../../Api/axios';

export const ProfileScreen = () => {

    const { user:{username} }         = useContext( AuthContext );
    const [ data, setData ]           = useState([]);
    const [ followers, setFollowers ] = useState([]);
    const [ following, setFollowing ] = useState([]);
    const [ loading, setLoading ]     = useState(true);
    const { TabPane }                 = Tabs;
    const { Link, Text }              = Typography;

    // Get columns Table
    const columns = [
        {
            title    : 'Avatar',
            dataIndex: 'initial',
            key      : 'initial',
            width    : '10%',
            render   : (_, item) =>  <Avatar size="large" src={ item.avatar_url  } />
        },
        {
          title     : 'Username',
          dataIndex : 'login',
          key       : 'login',
          width     : '80%',
          render    : (_, item) => <Link> { item.login } </Link>
        }
    ];

    // USEEFFECT
    useEffect(() => {

        // Get all repositories
        const getInfoProfile = () => {
            axios.get(`${ username }`, {crossDomain: true})
                    .then(function ( response ) {
                            setData(response.data);
                        }
                    );
        };

        // Get followers
        const getFollowers = () => {
            axios.get(`${ username }/followers`, {crossDomain: true})
                    .then(function ( response ) {
                        setFollowers(response.data);
                    }
                );
        };

        // Get following
        const getFollowing = () => {
            axios.get(`${ username }/following`, {crossDomain: true})
                    .then(function ( response ) {
                        setFollowing(response.data);
                        setLoading(false);
                    }
                );
        };

        getInfoProfile();
        getFollowers(); 
        getFollowing(); 
    }, [ username ]);

    return (
        <>
            {
                !data && (
                    <Spin />
                )
            }
            {
                data && (
                    <Row>
                        <Col span={24}>
                            <div className="container-fluid">
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <h4 className="secondary-color">My profile</h4>
                                    </Col>
                                    <Divider />
                                    <Col xs={24} md={6} lg={6} className="justify-content-md-center">
                                        <Card
                                            className="text-center"
                                            hoverable
                                            cover={<img alt={ data.login } src={ data.avatar_url} />}
                                        >
                                            <h5>{ data && data.name }</h5>
                                            <Text>{ data && data.login }</Text><br />
                                            <Text>{ data && data.location }</Text>
                                        </Card> 
                                    </Col> 
                                    <Col xs={24} md={18} lg={18}>
                                        <Tabs defaultActiveKey="1">
                                            <TabPane tab="Followers" key="1">
                                                <Table 
                                                    columns={ columns } 
                                                    dataSource={ followers } 
                                                    loading={ loading }
                                                />
                                            </TabPane>
                                            <TabPane tab="Following" key="2">
                                                <Table 
                                                    columns={ columns } 
                                                    dataSource={ following } 
                                                    loading={ loading }
                                                />
                                            </TabPane>
                                        </Tabs>
                                    </Col> 
                                </Row>
                            </div>
                        </Col>
                    </Row>
                )
            }
        </>
    );
};
