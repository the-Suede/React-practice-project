import React from 'react';
import Bottom from '$c/Bottom';
import { Flex, SearchBar, WingBlank, Carousel, NoticeBar, Button, Toast } from 'antd-mobile';
import './Home.scss';
import { myapi } from '@/utils/request';
import { connect } from 'react-redux';
const mapStateToProps = function (state) {
    return { username: state.user.userInfo.username }
}
@connect(mapStateToProps)
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().getDate(),
            banner: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
            cbtn: [{ num: '1', text: '空调' }, { num: '2', text: '冰箱' }, { num: '3', text: '洗衣机' }, { num: '4', text: '厨房大电' }, { num: '5', text: '厨房小电' }, { num: '6', text: '生活家电' }, { num: '7', text: '热水' }, { num: '8', text: '生态周边' }, { num: '9', text: '家装/配件' }, { num: '10', text: 'PRO会员' }],
            data: []
        }
    }
    async componentDidMount() {
        const { data: { data } } = await myapi.get('/goods')
        this.setState({
            data
        })
    }
    // 商品跳转
    goto = (data) => {
        this.props.history.push('/detail/' + data)
    };
    //分类跳转
    category_goto = (data) => {
        this.props.history.replace({
            pathname: 'search',
            search: `?key_word=${data}&redirectTo=home`
        })
    };
    // 加入购物车
    addCart = async (id) => {
        const { username, history, location } = this.props;
        if (!username) {
            history.replace({
                pathname: "/login",
                search: "?redirectTo=" + location.pathname
            })
        } else {
            const { data: { data } } = await myapi.post('/cart/', { username, id });
            if (data) {
                Toast.success('加入购物车成功', 1);
            }
        }
    };
    render() {
        const { data } = this.state;
        const { history } = this.props;
        return (
            <div id="all">
                {/* 头部 */}
                <div className="head">
                    <div onClick={() => { history.replace('/search') }}>
                        <Flex>
                            <Flex.Item style={{ flex: 5 }}>
                                <SearchBar placeholder="输入您想要的商品" disabled style={{ background: '#0092d8', width: '100%' }} />
                            </Flex.Item>
                            <Flex.Item style={{ flex: 1 }}>
                                <div style={{ width: '100%', height: '1rem', background: 'url(/iconfont/calendar.png) center center/ 55% 62% no-repeat', textAlign: 'center', lineHeight: '1.2rem', fontWeight: 'bold', color: 'red' }}>
                                    {this.state.date}
                                </div>
                            </Flex.Item>
                        </Flex>
                    </div>
                </div>

                <div className="content">
                    {/* 通知栏 */}
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        【通知】1.用美的分期支付，送腾讯视频会员；2.受疫情管控政策影响，新疆、河北、黑龙江、辽宁、吉林、北京等（其他地区详询在线客服）区域发货/配送时效有延迟或暂停派件，对您造成的不便敬请谅解！3.由于系统维护升级，周五特惠领券活动即日起取消，后续会更新新的活动，新活动预计年后上线，敬请期待
                    </NoticeBar>
                    {/* 轮播图 */}
                    <WingBlank style={{ margin: '0.2rem 0' }}>
                        <Carousel
                            style={{ borderRadius: '20px' }}
                            // autoplay={false}
                            infinite
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.banner.map(val => (
                                // <a
                                //     key={val}
                                //     href="http://www.alipay.com"
                                //     style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                // >
                                <img
                                    key={val}
                                    src={`/img/banner_${val}.png`}
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                // onLoad={() => {
                                //     // fire window resize event to change height
                                //     window.dispatchEvent(new Event('resize'));
                                //     this.setState({ imgHeight: 'auto' });
                                // }}
                                />
                                // </a>
                            ))}
                        </Carousel>
                    </WingBlank>

                    {/* 分类按钮 */}
                    <ul className='cbtn'>
                        {this.state.cbtn.map(item => (
                            <li key={item.num} onClick={() => { this.category_goto(item.text) }}>
                                <img src={`img/categorybtn/cbtn_${item.num}.png`} />
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>

                    {/* goodslist */}
                    <div className="goodslist">
                        <Flex wrap="wrap" justify="between">
                            {
                                data.map(item => (
                                    <div className="inline product" key={item._id} onClick={() => { this.goto(item._id) }}>
                                        <div className="pic" style={{ width: '2.72rem', height: '2.72rem' }}>
                                            <img src={item.pic_url} alt="" style={{ width: '100%', height: '100%' }} />
                                        </div>
                                        <div className="info">
                                            <div className="name">
                                                {item.dis_sku_title}
                                            </div>
                                            <div className="opt_box">
                                                <div className="price_box">
                                                    <div className="main_price">
                                                        <span>
                                                            ￥{item.original_price.slice(0, -2)}
                                                        </span>
                                                    </div>
                                                    <div className="del_price">
                                                        <del>
                                                            ￥{item.sale_price.slice(0, -2)}
                                                        </del>
                                                    </div>
                                                </div>
                                                <div className="cart_btn">
                                                    <Button
                                                        size='small'
                                                        style={{ background: 'url(/iconfont/cart_white.png) center center/ 60% 60% no-repeat #0092d8', borderRadius: '30px', width: '30px', height: '30px' }}
                                                        onClick={(e) => {
                                                            e.stopPropagation(),
                                                                this.addCart(item._id)
                                                        }}
                                                    ></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Flex>
                    </div>
                </div>

                {/* 底部 */}
                <div className="bottom"> <Bottom></Bottom></div>
            </div >
        )
    }
};
export default Home;