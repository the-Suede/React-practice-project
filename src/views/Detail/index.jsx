import React from 'react';
import { myapi } from '@/utils/request';
import { NavBar, Icon, WingBlank, Carousel, NoticeBar, Button, Toast } from 'antd-mobile';
import './Detail.scss';
import { connect } from 'react-redux';
import querystring from 'querystring';
const mapStateToProps = function (state) {
    return { username: state.user.userInfo.username }
}
@connect(mapStateToProps)
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            pic_infos: [],
            TagNameList: []
        }
    }
    async componentDidMount() {
        let { match: { params: { id } } } = this.props;
        const { data: { data } } = await myapi.get('/goods/' + id);
        const { pic_infos } = data;
        const { TagNameList } = data.tag_info;
        this.setState({ data, pic_infos, TagNameList });
    }
    //返回键
    return = () => {
        const { history, location } = this.props;
        let { redirectTo = '/home' } = querystring.parse(location.search.slice(1));
        history.replace(redirectTo);
    }
    // 加入购物车
    addCart = async () => {
        const { username, history, location } = this.props;
        if (!username) {
            history.replace({
                pathname: "/login",
                search: "?redirectTo=" + location.pathname
            })
        } else {
            let { match: { params: { id } } } = this.props;
            const { data: { data } } = await myapi.post('/cart/', { username, id });
            if (data) {
                Toast.success('加入购物车成功', 1);
            }
        }
    };
    //立即购买
    buyNow = async () => {
        const { username, history, location } = this.props;
        if (!username) {
            history.replace({
                pathname: "/login",
                search: "?redirectTo=" + location.pathname
            })
        } else {
            let { match: { params: { id } } } = this.props;
            const { data: { data } } = await myapi.post('/cart/', { username, id });
            if (data) {
                history.replace({
                    pathname: "/cart",
                })
            }
        }
    }
    render() {
        const { history, location } = this.props;
        let { data, pic_infos, TagNameList } = this.state;

        if (TagNameList.length == 0 || !TagNameList) {
            TagNameList = ['过年不打烊']
        }
        return <div id='detail'>
            <div className='detail_head'>
                {/* 顶部导航栏 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.return() }}
                >商品详情</NavBar>
                {/* 通告栏 */}
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    【通知】1.用美的分期支付，送腾讯视频会员；2.受疫情管控政策影响，新疆、河北、黑龙江、辽宁、吉林、北京等（其他地区详询在线客服）区域发货/配送时效有延迟或暂停派件，对您造成的不便敬请谅解！3.由于系统维护升级，周五特惠领券活动即日起取消，后续会更新新的活动，新活动预计年后上线，敬请期待
                </NoticeBar>
            </div>
            <div className="detail_content">
                {/* 商品图片 */}
                <WingBlank style={{ margin: '0.4rem 0' }}>
                    <Carousel>
                        {
                            pic_infos.map(item => (
                                <img
                                    key={item.pic_index}
                                    src={item.local_pic_relative_path}
                                // style={{ width: '100%', verticalAlign: 'top' }}
                                />
                            ))
                        }
                    </Carousel>
                </WingBlank>
                <div className="info_wrap">
                    {/* price */}
                    <div className='price'>
                        <span className='sale_price'>￥{data.sale_price ? data.sale_price.slice(0, -2) : '0'}</span>
                        <del className='del_price'>￥{data.original_price ? data.original_price.slice(0, -2) : '0'}</del>
                    </div>
                    {/* product_tag */}
                    <div className='product_tag'>
                        {
                            TagNameList.map(item => (
                                <span key={item} style={{ display: 'inline-block', height: '0.36rem', borderRadius: '0.18rem', textAlign: 'center', padding: '0 0.2rem', backgroundColor: 'rgba(255,102,0,0.1)', color: '#ff6600', fontSize: '12px', lineHeight: '0.36rem', marginRight: '5px' }}>{item}</span>
                            ))
                        }
                    </div>
                    {/* title */}
                    <div className="item_title">
                        <span style={{ display: 'inline-block', height: '0.36rem', borderRadius: '0.18rem', textAlign: 'center', padding: '0 0.2rem', backgroundColor: 'rgba(0,146,216,0.1)', color: '#0092d8', fontSize: '12px', lineHeight: '0.36rem', marginRight: '10px' }}>自营</span>
                        {data.dis_sku_title}
                    </div>
                </div>
            </div>
            {/* bottom */}
            <div className='detail_bottom'>
                <ul className='button_left'>
                    <li onClick={() => { this.props.history.push('/home') }} style={{ width: '0.6rem' }}>
                        <i><img src="/iconfont/home.png" alt="" /></i>
                        <span>首页</span>
                    </li>
                    <li onClick={() => {
                        history.replace({
                            pathname: "/cart",
                            search: "?redirectTo=" + location.pathname
                        })
                    }}>
                        <i><img src="/iconfont/cart.png" alt="" /></i>
                        <span>购物车</span>
                    </li>
                </ul>
                <div className='button_right'>
                    <Button onClick={() => { this.addCart() }} style={{ backgroundColor: '#0086e6', color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: '14px', width: '2.7rem', height: '0.8rem', lineHeight: '0.8rem', border: 'none', borderRadius: '0.4rem' }}>加入购物车</Button>
                    <Button onClick={() => { this.buyNow() }} style={{ backgroundColor: '#ff6600', color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: '14px', width: '2.7rem', height: '0.8rem', lineHeight: '0.8rem', border: 'none', borderRadius: '0.4rem' }}>立即购买</Button>
                </div>
            </div>
        </div>
    }
}

export default Detail;