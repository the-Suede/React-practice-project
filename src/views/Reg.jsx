import React from 'react';
import { List, InputItem, Toast, NavBar, Icon, WhiteSpace, Button, Flex, Checkbox } from 'antd-mobile';
// import { createForm } from 'rc-form';
import { myapi } from '@/utils/request';
class Reg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameError: false,
            passwordError: false,
            username: '',
            password: '',
            isAgree: true,
            usernameHaveExist: false
        }
    };
    componentDidMount() {
        // this.autoFocusInst.focus();
    }

    //username
    usernameonErrorClick = () => {
        if (this.state.usernameError) {
            if (this.state.usernameHaveExist) {
                Toast.info('用户名已存在');
            } else {
                Toast.info('用户名由4-12位数字或英文字母组成');
            }
        }
    }
    usernameonChange = (value) => {
        var reg = /^([a-zA-Z0-9]{4,12})$/;
        var res = reg.test(value);
        if (res === false) {
            this.setState({
                usernameError: true,
            });
        } else {
            this.setState({
                usernameError: false,
            });
        }
        this.setState({
            username: value
        });
    }
    usernameonBlur = async () => {
        if (this.state.usernameError) {
            Toast.info('用户名由4-12位数字或英文字母组成');
        }
        const result = await myapi.get('/user/check', { params: { username: this.state.username } })
        const { data } = result;
        if (data.code == 400) {
            Toast.info('用户名已存在');
            this.setState({
                usernameError: true,
                usernameHaveExist: true
            });
        } else {
            this.setState({
                usernameHaveExist: false
            });
        }
    }

    //password
    passwordonErrorClick = () => {
        if (this.state.usernameError) {
            Toast.info('密码有6-16位英文字母或数字组成');
        }
    }
    passwordonChange = (value) => {
        var reg = /^([a-zA-Z0-9]{6,16})$/;
        var res = reg.test(value);
        if (res === false) {
            this.setState({
                passwordError: true,
            });
        } else {
            this.setState({
                passwordError: false,
            });
        }
        this.setState({
            password: value
        });
    }
    passwordonBlur = () => {
        if (this.state.passwordError) {
            Toast.info('密码有6-16位英文字母或数字组成');
        }
    }

    //点击注册
    handleClick = async () => {
        const { usernameError, passwordError, isAgree, username, password } = this.state;
        if (usernameError == true || passwordError == true || isAgree == false || username == '' || password == '') {
            Toast.fail('请完善用户注册信息!', 1);
            return
        }

        //密码加密
        //未加密

        //axios请求
        const result = await myapi.post('user/reg', { username, password });
        const { data } = result;

        //如果注册成功
        if (data.code == 200) {
            Toast.success('注册成功!', 1);
            //跳转登陆页面
            this.props.history.replace('/login')
        } else {
            Toast.fail('注册失败', 1);
        }
    }
    render() {
        // const { getFieldProps } = this.props.form;
        let { usernameError, username, passwordError, password, isAgree } = this.state;
        return (
            // <div style={{ width: '100%', height: '100%', background: 'url(/img/login.png) center 1.1rem/ 100% no-repeat #a1d4e7' }}>
            <div style={{ background: '#eef3fa', width: '100%', height: '100%' }}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.replace('/login') }}
                // rightContent={[
                //     <Icon key="1" type="ellipsis" />,
                // ]}
                >注册</NavBar>

                <WhiteSpace size='lg' />

                <List>
                    <InputItem
                        // {...getFieldProps('autofocus')}
                        clear
                        placeholder="请输入用户名"
                        // ref={el => this.autoFocusInst = el}
                        error={usernameError}
                        onErrorClick={this.usernameonErrorClick}
                        onChange={this.usernameonChange}
                        onBlur={this.usernameonBlur}
                        value={username}
                    >用户名</InputItem>
                    <InputItem
                        type="password"
                        clear
                        placeholder="请输入密码"
                        // ref={el => this.inputRef = el}
                        error={passwordError}
                        onErrorClick={this.passwordonErrorClick}
                        onChange={this.passwordonChange}
                        onBlur={this.passwordonBlur}
                        value={password}
                    >密码</InputItem>
                </List>

                <WhiteSpace size='lg' />


                <Button
                    type="primary"
                    size="large"
                    style={{ height: '1.2rem', width: '95%', margin: '0 auto', lineHeight: '1.2rem' }}
                    onClick={this.handleClick}
                >
                    注册
                </Button>

                <WhiteSpace />

                <Flex>
                    <Flex.Item>
                        <Checkbox.AgreeItem
                            defaultChecked={true}
                            data-seed="logId"
                            checked={isAgree}
                            onChange={() => this.setState({ isAgree: !isAgree })} >
                            {/* <a onClick={(e) => { e.preventDefault(); alert('agree it'); }}> */}
                                我已阅读并同意《用户协议》与《隐私协议》
                            {/* </a> */}
                        </Checkbox.AgreeItem>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
};
// const Reg = createForm()(Rega);
export default Reg;