import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

// ANT DESIGN
import { Table, Avatar, Typography, Row, Col, Input, Divider, Tabs } from 'antd';
import {
     UnlockOutlined,
     LockOutlined,
     StarOutlined,
     BranchesOutlined,
     PullRequestOutlined,
     CoffeeOutlined,
     SearchOutlined
} from '@ant-design/icons';

import axios from '../../Api/axios';
import moment from 'moment';

export const RepositoryScreen = () => {

    const { user:{username} }     = useContext( AuthContext );

    const [ data, setData ]       = useState([]);
   
    const [ starred, setStarred ] = useState([]);

    const [ loading, setLoading ] = useState(true); 

    const { Text }                = Typography;

    const { TabPane }             = Tabs;

    // Get columns Table
    const columns = [
        {
            title    : '',
            dataIndex: 'initial',
            key      : 'initial',
            width    : '5%',
            render   : (_, item) => (
                <Avatar 
                    className="avatar"
                    icon={ item.name.charAt(0).toUpperCase() }
                    name={ item.name } 
                    size="large"
                    shape="square" 
                    style={{ backgroundColor: getColorAvatar() }}
                />
            )
        },
        {
          title     : 'Repository',
          dataIndex : 'name',
          key       : 'name',
          width     : '50%',
          render    : (_, item) => (
              <>
                { item.owner.login }&nbsp;       
                <Text strong>
                    / {item.name} { item.private? <LockOutlined /> : <UnlockOutlined />}
                </Text>
              </>
          )
        },
        {
            title     : 'Branchs',
            dataIndex : 'branchs',
            key       : 'branchs',
            width     : '15%',
            render    : (_, item) => (
                <>
                    <Row>
                        <Col span={6}><StarOutlined         className="mr-1" /><Text>0</Text></Col>
                        <Col span={6}><BranchesOutlined     className="mr-1" /><Text>0</Text></Col>
                        <Col span={6}><PullRequestOutlined  className="mr-1" /><Text>0</Text></Col>
                        <Col span={6}><CoffeeOutlined       className="mr-1" /><Text>0</Text></Col>
                    </Row>
                </>
            )
        },
        {
          title     : 'Update',
          dataIndex : 'pushed_at',
          key       : 'pushed_at',
          width     : '15%',
          render    : (_, item) => (
              <>
                <Text>
                   Updated { moment(item.pushed_at).fromNow() }
                </Text>
              </>
          )
        },
    ];
      
    // Get one color column table
    const getColorAvatar = () => {
        
        const colorList = [ '#ecf4ee', '#f4f0ff', '#fdf1dd', '#f1f1ff', '#fcf1ef', '#e9f3fc', '#f0f0f0' ];
        return colorList[ parseInt(Math.random() * 6 + 0) ];
    }   

    // Filter data
    const handleSearch = value => {
    
        setData( value 
                            ? data.filter( element => element.name.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim()))
                            : []);
           
        if( value === ''){
            setLoading(true);
            getAllRepositories();
        }
    }

    // Filter data starred
    const handleStarredSearch = value => {
        
        setStarred( value 
                            ? starred.filter( element => element.name.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim()))
                            : []);

        if( value === ''){
            setLoading(true);
            getAllRepositoriesStarred(); 
        }
    }
    
    // Get all repositories
    const getAllRepositories = async () => {

        axios.get(`${ username }/repos`, {crossDomain: true})
                .then(function ( response ) {
                    setData(response.data);
                    setLoading(false);
                }
            );
    };

    // Get all repositories starred
    const getAllRepositoriesStarred = () => {

        axios.get(`${ username }/starred`, {crossDomain: true})
                .then(function ( response ) {
                    setStarred(response.data);
                    setLoading(false);
                }
            );
    };

    // USEEFFECT
    useEffect(() => {
        getAllRepositories();
        getAllRepositoriesStarred(); 
    }, [username]);

    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="All" key="1">
                    <Row>
                        <Col span={6} push={18}>
                            <Input 
                                addonAfter={<SearchOutlined />} 
                                placeholder="Filter by name repository" 
                                onChange={ (event) => handleSearch( event.target.value ) }
                            />
                        </Col>
                        <Col span={18} pull={6}>
                            <h4 className="secondary-color">My repositories</h4>
                        </Col>
                    </Row>
                    <Divider />
                    <Table 
                        columns={ columns } 
                        dataSource={ data } 
                        loading={ loading }
                    />
                </TabPane>
                <TabPane tab="Starred" key="2">
                    <Row>
                        <Col span={6} push={18}>
                            <Input 
                                addonAfter={<SearchOutlined />} 
                                placeholder="Filter by name repository" 
                                onChange={ (event) => handleStarredSearch( event.target.value ) }
                            />
                        </Col>
                        <Col span={18} pull={6}>
                            <h4 className="secondary-color">My starred repositories </h4>
                        </Col>
                    </Row>
                    <Divider />
                    <Table 
                        columns={ columns } 
                        dataSource={ starred } 
                        loading={ loading }
                    />
                </TabPane>
            </Tabs>
        </>
    );
}
