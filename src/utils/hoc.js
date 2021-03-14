import React from 'react';
import store from '@/store';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { myapi } from '@/utils/request';
import { logout } from '../store/actions/user';
//高阶函数
function withUser(InnerComponent) { //需要包装的组件

    // return function OuterComponent(props) { //包装后输出的组件，接收包装之前的props
    //     let user = localStorage.getItem('userInfo');
    //     try {
    //         user = JSON.parse(user) || {}
    //     } catch (e) {
    //         user = user
    //     }
    //     return <InnerComponent user={user} {...props} />
    // }

    return class OuterComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                user: {}
            }
        }
        componentDidMount() {
            let user = localStorage.getItem("userInfo")
            try {
                user = JSON.parse(user) || {}
            } catch (e) {
                user = user
            }
            this.setState({
                user
            })
        }
        render() {
            let { user } = this.state;
            return <InnerComponent user={user} {...this.props} />
        }
    }
}

function withStorage(key) {
    return function (InnerComponent) {
        return function OuterComponent(props) {
            // console.log('OuterComponent', props);
            let data = localStorage.getItem(key)
            try {
                data = JSON.parse(data) || {}
            } catch (e) {
                data = data
            }
            let propData = {
                [key]: data
            }
            return <InnerComponent {...propData} {...props} />
        }
    }
}


function withStore(...keys) {
    return function (InnerComponent) {
        return class OuterComponent extends React.Component {
            constructor(props) {
                super(props);
                this.state = this.filteData()
            };
            componentDidMount() {
                store.subscribe(() => {
                    this.setState(this.filteData())
                })
            };
            filteData = () => {
                let reduxData = store.getState();
                // console.log('reduxData', reduxData);

                let shareData = {};
                keys.forEach(key => {
                    shareData[key] = reduxData[key]
                });
                // console.log('shareData', shareData);

                return keys.length > 0 ? shareData : reduxData;
            };
            render() {
                return <InnerComponent dispatch={store.dispatch} {...this.props} {...this.state} />
            }
        }

    }
}

//需要登录才能进入的组件都要使用这个高阶组件（判断token）
function withLogin(InnerComponent) {
    const mapStateToProps = function (state) {
        return { userInfo: state.user.userInfo }
    }
    const mapDispatchToProps = function (dispatch) {
        return {
            logout() {
                dispatch({ type: 'logout' })
            }
        }
    }
    @connect(mapStateToProps, mapDispatchToProps)
    class OuterComponent extends React.Component {
        componentDidMount() {
            const { userInfo, history, logout, location } = this.props;
            //验证token有效性
            myapi.get('/user/verify', {
                headers: {
                    Authorization: userInfo.Authorization
                }
            }).then(({ data }) => {
                if (data.code == 400) {
                    logout();
                    history.push({
                        pathname: "/login",
                        search: "?redirectTo=" + location.pathname
                    })
                }
            })
        }
        render() {
            const { userInfo, location } = this.props
            if (userInfo._id) {
                return <InnerComponent {...this.props} />
            } else {
                return <Redirect to={"/login?redirectTo=" + location.pathname} />
            }

        }
    }
    return OuterComponent
}

export { withStorage, withUser, withStore, withLogin }