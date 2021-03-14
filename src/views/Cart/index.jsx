import React from 'react';
import { Card, WhiteSpace, Checkbox, List, Stepper, Button, NavBar, Icon, Flex, Modal, Result } from 'antd-mobile';
import './Cart.scss';
import cartActions from '@/store/actions/cart';
import { bindActionCreators } from 'redux';
import { withLogin } from '@/utils/hoc';
import { connect } from 'react-redux';
import querystring from 'querystring';
import { myapi } from '../../utils/request';

const mapStateToProps = function (state) {
    return {
        username: state.user.userInfo.username,
        redux_cart_data: state.cart.cart_data
    }
};
const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(cartActions, dispatch)
}
@withLogin
@connect(mapStateToProps, mapDispatchToProps)
class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart_data: [],
            total_price: 0,
            cart_edit: false
        };
    };
    async componentDidMount() {
        const { username } = this.props;
        const { data: { data } } = await myapi.get('/cart', { params: { username } });
        localStorage.setItem('cart', JSON.stringify(data));
        this.setState({
            cart_data: data,
        })
    };
    //购物车数据刷新
    cart_data_renew = async () => {
        const { username } = this.props;
        const { data: { data } } = await myapi.get('/cart', { params: { username } });
        localStorage.setItem('cart', JSON.stringify(data));
        this.setState({
            cart_data: data,
        })
    };
    //展示所选商品总价
    showNum = (data) => {
        let res = data.filter(item => {
            return item.is_select == 1
        })
        this.setState({
            total_price: res.reduce((pre, item) => {
                return pre + item.goods_price.slice(0, -2) * item.goods_num
            }, 0)
        })
    }
    //单选
    oneChosen = (id) => {
        const ls_cart_data = JSON.parse(localStorage.getItem('cart'));
        ls_cart_data.forEach(item => {
            if (item.goods_id == id) {
                item.is_select = !item.is_select
            }
        })
        localStorage.setItem('cart', JSON.stringify(ls_cart_data));
        this.setState({
            cart_data: ls_cart_data,
        })
        this.showNum(ls_cart_data)
    }
    //全选
    allChosen = () => {
        const ls_cart_data = JSON.parse(localStorage.getItem('cart'));
        const allChosen_ls_cart_data = ls_cart_data.map(item => {
            return { ...item, is_select: !item.is_select }
        });
        localStorage.setItem('cart', JSON.stringify(allChosen_ls_cart_data));
        this.setState({
            cart_data: JSON.parse(localStorage.getItem('cart'))
        })
    }
    //修改数量
    numChange = async (val, id) => {
        // 获取本地购物车数据
        const ls_cart_data = JSON.parse(localStorage.getItem('cart'));
        //修改本地
        let needmodify_cart_data = ls_cart_data.filter(item => {
            return item.goods_id == id
        })[0];
        //修改数据库
        const haveChange = await myapi.post('/cart/numchange', {
            newNum: val * 1,
            goods_id: id
        })
        if (haveChange.data.data) {
            needmodify_cart_data.goods_num = val * 1;
            //修改数据库成功，存本地数据，并修改组件状态，促使组件刷新
            localStorage.setItem("cart", JSON.stringify(ls_cart_data));
            this.setState({
                cart_data: ls_cart_data
            })
            this.showNum(ls_cart_data)
        }
    }
    //删除购物车商品
    removeGoods = async () => {
        let ls_cart_data = JSON.parse(localStorage.getItem('cart'));
        ls_cart_data.forEach(async (item) => {
            if (item.is_select == 1) {
                const result = await myapi.delete('/cart', { params: { id: item._id } })
                const { data: { code } } = result;
                if (code == 200) {
                    this.cart_data_renew()
                    this.setState({
                        cart_edit: false
                    })
                }
            }
        })
    }
    //结算成功
    successfulPayment = async () => {
        const { username, history } = this.props;
        let ls_cart_data = JSON.parse(localStorage.getItem('cart'));
        //把商品信息存到用户数据库
        const havebought_goods = ls_cart_data.filter(item => item.is_select);
        // console.log("havebought_goods", havebought_goods);
        // console.log(Object.prototype.toString.call(havebought_goods))
        const { data: { code } } = await myapi.post('/user/myorder', { username, myorder: havebought_goods });
        // console.log(code);

        //删除购物车数据库信息
        if (code == 200) {
            ls_cart_data.forEach(async (item) => {
                if (item.is_select == 1) {
                    const result = await myapi.delete('/cart', { params: { id: item._id } })
                    const { data: { code } } = result;
                    if (code == 200) {
                        //替换组件
                        history.replace('/payment')
                    }
                }
            })
        }

    }
    render() {
        const { cart_data, total_price, cart_edit } = this.state;
        const alert = Modal.alert;
        return (<div id="all">
            <div className="cart_head">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        let { redirectTo = '/home' } = querystring.parse(this.props.location.search.slice(1));
                        this.props.history.replace(redirectTo)
                    }}
                >购物车</NavBar>
            </div>
            <div className="content cart_content">
                {
                    cart_data.length == 0 ?
                        <>
                            <h2 style={{ textAlign: 'center', color: '#ccc', marginTop: '1rem' }}>您的购物车空空如也~</h2>
                        </>
                        :
                        <Card>
                            <Card.Header
                                title="美的官网商城"
                                extra={
                                    cart_edit ?
                                        <span>完成</span>
                                        :
                                        <span>编辑</span>
                                }
                                onClick={() => {
                                    this.setState({
                                        cart_edit: !cart_edit
                                    })
                                }}
                            >
                            </Card.Header>
                            <Card.Body>
                                {
                                    cart_data.map(item => (
                                        <div className='cart_item' key={item._id} >
                                            <Checkbox.AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)} style={{ width: '100%', marginLeft: '0.2rem' }}
                                                onChange={() => {
                                                    this.oneChosen(item.goods_id)
                                                }}
                                                checked={item.is_select}
                                            >
                                                <div className='item_info'>
                                                    <div className='item_pic'>
                                                        <img src={item.goods_pic} alt="" />
                                                    </div>
                                                    <div className='item_text'>
                                                        <div className='item_name'>
                                                            {item.goods_title}
                                                        </div>
                                                        <div className='pricenbtn' style={{ marginTop: '0.7rem' }} onClick={(e) => { e.preventDefault() }}>
                                                            <List style={{ padding: 0 }}>
                                                                <List.Item
                                                                    extra={
                                                                        <Stepper
                                                                            style={{ width: '100%' }}
                                                                            showNumber
                                                                            min={1}
                                                                            value={item.goods_num}
                                                                            onChange={(val) => { this.numChange(val, item.goods_id) }}
                                                                        />}
                                                                    style={{ padding: 0 }}
                                                                >
                                                                    <span style={{ color: '#ff6600' }}>￥{item.goods_price.slice(0, -2)}</span>
                                                                </List.Item>
                                                            </List>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Checkbox.AgreeItem>
                                        </div>
                                    ))
                                }
                            </Card.Body>
                        </Card>
                }

                <WhiteSpace size="lg" />
            </div>
            <div className="cart_bottom">
                <Flex justify='between' style={{ width: '100%' }}>
                    <Flex.Item style={{ flex: 2 }}>
                        <div className="selectAll">
                            <Checkbox.AgreeItem
                                onChange={() => {
                                    this.allChosen()
                                }}
                                checked={cart_data ? false : cart_data.every(item => { return item.is_select == true })
                                }
                            >
                                全选
                            </Checkbox.AgreeItem>
                        </div>
                    </Flex.Item>
                    {/* 结算 or 删除 */}
                    {
                        cart_edit ?
                            <>
                                {/* 删除 */}
                                <Flex.Item style={{ flex: 1, paddingRight: '5px' }}>
                                    <div className="clear_btn">
                                        <Button
                                            type="warning"
                                            style={{ fontWeight: 'bold' }}
                                            onClick={() => {
                                                alert('提示', '删除后商品将不在购物车展示', [
                                                    { text: '取消', style: 'default' },
                                                    { text: '确认删除', onPress: () => this.removeGoods() },
                                                ]);
                                            }} >
                                            删除
                                        </Button>
                                    </div>
                                </Flex.Item>
                            </>
                            :
                            <>
                                {/* 结算 */}
                                <Flex.Item style={{ flex: 1 }}>
                                    <div className="total_price_wrap" >
                                        <span>合计:</span>
                                        <span className='total_price'>￥{total_price}</span>
                                    </div>
                                </Flex.Item>
                                <Flex.Item style={{ flex: 1, paddingRight: '5px' }}>
                                    <div className="clear_btn">
                                        <Button style={{ backgroundColor: '#ff6600', color: '#fff', fontWeight: 'bold' }}
                                            onClick={() => { this.successfulPayment() }}>
                                            结算
                                        </Button>
                                    </div>
                                </Flex.Item>
                            </>
                    }

                </Flex>
            </div>

        </div >
        )
    }
};
export default Cart;