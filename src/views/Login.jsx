import React from 'react';
import { List, InputItem, Toast, Button, NavBar, Icon } from 'antd-mobile';
// import { createForm } from 'rc-form';
import { myapi } from '@/utils/request';
import querystring from 'querystring';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '@/store/actions/user';

//connect()
const mapStateToProps = function (state) {
    return state
};
const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(userActions, dispatch)
};

@connect(mapStateToProps, mapDispatchToProps)
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // error: false,
            username: '',
            password: ''
        }
    };
    componentDidMount() {
        // this.autoFocusInst.focus();
        console.log(this);
    }

    //username
    usernameonChange = (value) => {
        this.setState({
            username: value
        });
    }

    //password
    passwordonChange = (value) => {
        this.setState({
            password: value
        });
    }

    //点击登录
    handleClick = async () => {
        const { history, location, login } = this.props;
        const { username, password } = this.state;

        //发起请求
        const result = await myapi.get('user/login', { params: { username, password } })
        const { data } = result;
        if (data.code == 200) {
            //改变redux状态
            login(data.data);
            let { redirectTo = '/mine' } = querystring.parse(location.search.slice(1));
            history.replace(redirectTo)
        } else {
            Toast.fail('用户名或密码不正确', 1)
        }
    }
    render() {
        // const { getFieldProps } = this.props.form;
        const { username, password, error } = this.state;
        return (
            // <div style={{ width: '100%', height: '100%', background: 'url(/img/login.png) center 1.1rem/ 100% no-repeat #a1d4e7' }}>
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.replace('/home') }}
                >登录</NavBar>
                <List>
                    <InputItem
                        // {...getFieldProps('autofocus')}
                        clear
                        placeholder="请输入用户名"
                        // ref={el => this.autoFocusInst = el}
                        // error={error}
                        value={username}
                        onChange={this.usernameonChange}
                    >用户名</InputItem>
                    <InputItem
                        type="password"
                        clear
                        placeholder="输入密码"
                        // ref={el => this.inputRef = el}
                        // error={error}
                        value={password}
                        onChange={this.passwordonChange}
                    >密码</InputItem>

                    <Button
                        type="primary"
                        onClick={this.handleClick}
                    >登录</Button>
                    <Button
                        onClick={() => { this.props.history.push('/reg') }}
                    >注册</Button>
                </List>
            </div>
        )
    }
};
// const Login = createForm()(Logina);
export default Login;