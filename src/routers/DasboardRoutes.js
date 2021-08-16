import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// Ant Design
import { Layout } from 'antd';

// Components
import { Navbar } from '../components/ui/Navbar';
import { RepositoryScreen } from '../components/repositories/RepositoryScreen';
import { ProfileScreen } from '../components/profile/ProfileScreen';
// import { Sidebar } from '../components/ui/Sidebar';

export const DashboardRoutes = () => {
     
    const { Content } = Layout;

    return (
        <>   
             <Layout>
                <Navbar />
                <Layout>                    
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content 
                            className="site-layout-background content"
                            style={{
                                background:'#fff',
                                margin: '20px 0',
                                minHeight: 280,
                                padding: 24,
                            }}
                        >
                            <Switch>
                                <Route exact path="/repositories" component={ RepositoryScreen }></Route>
                                <Route exact path="/profile" component={ ProfileScreen }></Route>
                                <Redirect to="/repositories" />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
}
