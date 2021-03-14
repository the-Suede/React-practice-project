import React from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import './bottom.scss';
@withRouter
class Bottom extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        const pathname = this.props.location.pathname;
        return (
            <>
                {/* 底部导航栏 */}
                <TabBar
                    unselectedTintColor="#999"
                    tintColor="#0292d8"
                    barTintColor="white"
                    tabBarPosition='bottom'
                >
                    <TabBar.Item
                        title="首页"
                        key="home"
                        icon={<div style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            background: 'url(/iconfont/home.png) center center /  0.5rem 0.5rem no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            background: 'url(/iconfont/home_selected.png) center center /  0.5rem 0.5rem no-repeat'
                        }}
                        />
                        }
                        selected={pathname === '/home'}
                        onPress={() => {
                            this.props.history.push('/home')
                        }}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '0.5rem',
                                height: '0.5rem',
                                background: 'url(/iconfont/category.png) center center /  0.5rem 0.5rem no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '0.5rem',
                                height: '0.5rem',
                                background: 'url(/iconfont/category_selected.png) center center /  0.5rem 0.5rem no-repeat'
                            }}
                            />
                        }
                        title="商品分类"
                        key="category"
                        selected={pathname === '/category'}
                        onPress={() => {
                            this.props.history.push('/category')
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '0.5rem',
                                height: '0.5rem',
                                background: 'url(/iconfont/cart.png) center center /  0.5rem 0.5rem no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '0.5rem',
                                height: '0.5rem',
                                background: 'url(/iconfont/cart_selected.png) center center /  0.5rem 0.5rem no-repeat'
                            }}
                            />
                        }
                        title="购物车"
                        key="cart"
                        selected={pathname === '/cart'}
                        onPress={() => {
                            this.props.history.push('/cart')
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '0.5rem',
                                height: '0.5rem',
                                background: 'url(/iconfont/mine.png) center center /  0.5rem 0.5rem '
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '0.5rem',
                                height: '0.5rem',
                                background: 'url(/iconfont/mine_selected.png) center center /  0.5rem 0.5rem no-repeat'
                            }}
                            />
                        }
                        title="个人中心"
                        key="mine"
                        selected={pathname === '/mine'}
                        onPress={() => {
                            this.props.history.push('/mine')
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </>
        )
    }
};

export default Bottom;