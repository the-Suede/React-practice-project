import React from 'react';
import Bottom from '$c/Bottom';
import { NavBar, TabBar } from 'antd-mobile';
import './Category.scss';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'kongtiao',
            hidden: false,
            fullScreen: false,
        };
    }
    category_goto = (data) => {
        this.props.history.replace({
            pathname: 'search',
            search: `?key_word=${data}&redirectTo=category`
        })
    };
    renderContent = function (category_list) {
        console.log(category_list);
        return (
            <div style={{ backgroundColor: '#fff', height: '13rem', paddingLeft: '1.3rem' }}>
                <div style={{ fontSize: '12px', color: '#999', height: '0.88rem', lineHeight: '0.88rem', paddingLeft: '0.4rem' }}>热门品类</div>
                <ul className='category_list_ul' style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        category_list.map(item => (
                            <li className='category_list_item' style={{ padding: '0.2rem' }} key={item.text} onClick={() => { this.category_goto(item.text) }}>
                                <img src={item.pic_url} alt="" style={{ width: '1.56rem', height: '1.56rem' }} />
                                <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '0.2rem' }}>{item.text}</p>
                            </li>

                        ))
                    }
                </ul>
            </div >
        );
    }

    render() {
        const { selectedTab } = this.state;
        return (<div id="all">
            <div className="head">
                <NavBar
                    mode="light"
                    style={{ height: '100%' }}
                >
                    商品分类
            </NavBar>
            </div>
            <div className="content" style={{ marginTop: 0, backgroundColor: '#fff' }}>
                <div>
                    <div
                        className='category_tabbar'
                    >
                        <TabBar
                            unselectedTintColor="#999"
                            tintColor="#0292d8"
                            barTintColor="white"
                            hidden={this.state.hidden}
                        >
                            {/* 空调 */}
                            <TabBar.Item
                                title="空调"
                                key="kongtiao"
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(/iconfont/category/kongtiao.png) center center /  21px 21px no-repeat'
                                }}
                                />
                                }
                                selectedIcon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(/iconfont/category/kongtiao_select.png) center center /  21px 21px no-repeat'
                                }}
                                />
                                }
                                selected={selectedTab === 'kongtiao'}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'kongtiao',
                                    });
                                }}
                                data-seed="logId"
                            >
                                {
                                    this.renderContent([
                                        { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10002.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '挂壁式空调' },
                                        { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10294.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '变频空调' },
                                        { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10326.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '华凌空调' }
                                    ])
                                }
                            </TabBar.Item>

                            {/* 冰箱 */}
                            <TabBar.Item
                                title="冰箱"
                                key="bingxiang"
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(/iconfont/category/bingxiang.png) center center /  21px 21px no-repeat'
                                }}
                                />
                                }
                                selectedIcon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(/iconfont/category/bingxiang_select.png) center center /  21px 21px no-repeat'
                                }}
                                />
                                }
                                selected={selectedTab === 'bingxiang'}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'bingxiang',
                                    });
                                }}
                                data-seed="logId"
                            >
                                {
                                    this.renderContent([
                                        { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10011.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '三门冰箱' },
                                        { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10309.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '一级能效冰箱' },
                                        { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10013.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '对开门冰箱' }])
                                }
                            </TabBar.Item>

                            {/* 洗衣机 */}
                            <TabBar.Item
                                icon={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'url(/iconfont/category/xiyiji.png) center center /  21px 21px no-repeat'
                                    }}
                                    />
                                }
                                selectedIcon={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'url(/iconfont/category/xiyiji_select.png) center center /  21px 21px no-repeat'
                                    }}
                                    />
                                }
                                title="洗衣机"
                                key="xiyiji"
                                selected={selectedTab === 'xiyiji'}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'xiyiji',
                                    });
                                }}
                                data-seed="logId1"
                            >
                                {this.renderContent([
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10016.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '滚筒洗衣机' },
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10017.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '波轮洗衣机' }])}
                            </TabBar.Item>

                            {/* 厨房小家电 */}
                            <TabBar.Item
                                icon={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'url(/iconfont/category/weibolu.png) center center /  21px 21px no-repeat'
                                    }}
                                    />
                                }
                                selectedIcon={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'url(/iconfont/category/weibolu_select.png) center center /  21px 21px no-repeat'
                                    }}
                                    />
                                }
                                title="厨房小家电"
                                key="xiaojiadian"
                                selected={selectedTab === 'xiaojiadian'}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'xiaojiadian',
                                    });
                                }}
                            >
                                {this.renderContent([
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10036.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '微波炉' },
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10039.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '电饭煲' },
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10035.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '烤箱' },
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10037.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '电磁炉' }])}
                            </TabBar.Item>

                            {/* 热水/净水 */}
                            <TabBar.Item
                                icon={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'url(/iconfont/category/yinshuiji.png) center center /  21px 21px no-repeat'
                                    }}
                                    />
                                }
                                selectedIcon={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'url(/iconfont/category/yinshuiji_select.png) center center /  21px 21px no-repeat'
                                    }}
                                    />
                                }
                                title="热水/净水"
                                key="yinshuiji"
                                selected={selectedTab === 'yinshuiji'}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'yinshuiji',
                                    });
                                }}
                            >
                                {this.renderContent([
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10023.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '热水器' },
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10056.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '净水机' }])}
                            </TabBar.Item>

                            {/* 生活家电 */}
                            <TabBar.Item
                                icon={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'url(/iconfont/category/xichenqi.png) center center /  21px 21px no-repeat'
                                    }}
                                    />
                                }
                                selectedIcon={
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: 'url(/iconfont/category/xichenqi_select.png) center center /  21px 21px no-repeat'
                                    }}
                                    />
                                }
                                title="生活家电"
                                key="shenghuo"
                                selected={selectedTab === 'shenghuo'}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'shenghuo',
                                    });
                                }}
                            >
                                {this.renderContent([
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10063.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '扫地机器人' },
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10041.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '电水壶' },
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10331.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '按摩' },
                                    { pic_url: 'https://pic.midea.cn/h5/img/mall/category_sub/category_10052.png?x-oss-process=image/format,webp/quality,Q_90&t=20210203', text: '取暖器' }])}
                            </TabBar.Item>
                        </TabBar>
                    </div>
                </div>
            </div>
            <div className="bottom"> <Bottom></Bottom></div>
        </div>
        )
    }
};
export default Category;