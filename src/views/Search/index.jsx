import React, { useState, useEffect, useCallback } from 'react';
import { NavBar, SearchBar, Icon, Flex, Tabs, Toast } from 'antd-mobile';
import './Search.scss';
import { myapi } from '@/utils/request';
import querystring from 'querystring';

function Search(props) {
    const recommendSearch = ['空调', '冰箱', '洗衣机', '厨小电', '厨大电', '生活家电', '热水器', '净水'];
    const [hotGoodsList, sethotGoodsList] = useState([]);
    let [searchResult, setsearchResult] = useState([]);
    let [searchInput, setsearchInput] = useState('');
    useEffect(async () => {
        let { key_word } = querystring.parse(props.location.search.slice(1));
        if (key_word) {
            searchFun(key_word);
        }
        const { data: { data } } = await myapi.get('/goods', {
            params: {
                page: 1, size: 10
            }
        });
        sethotGoodsList(data);
    }, [])
    //返回按钮
    const returnBtn = useCallback(() => {
        let { redirectTo } = querystring.parse(props.location.search.slice(1));
        if (searchResult.length > 0) {
            if (redirectTo) {
                props.history.replace(redirectTo)
            }
            else {
                setsearchResult([])
            }

        }
        else {
            props.history.replace('/home')
        }
    }, [searchResult])
    //搜索函数
    const searchFun = useCallback(async (key_word) => {
        const { data: { data } } = await myapi.get('/goods/like/search', {
            params: {
                key_word
            }
        });
        setsearchResult(data);
    }, []);
    //搜索框提交函数
    const searchSubmit = useCallback(async (val) => {
        const { data: { data } } = await myapi.get('/goods/like/search', {
            params: {
                key_word: val
            }
        });
        if (!data.length) {
            Toast.offline(`抱歉，没有${val}相关的商品`, 2);
            setsearchInput('')
        } else {
            setsearchResult(data);
        }
    }, [])
    //排序函数
    const sortFun = useCallback(async (tab) => {
        var compare = function (prop, sort) {
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (sort == 'desc') {
                    if (val1 < val2) {
                        return 1;
                    } else if (val1 > val2) {
                        return -1;
                    } else {
                        return 0;
                    }
                } else {
                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        }
        if (tab.key == 'addtime') {
            let newsearchResult = searchResult.map(item => { return { ...item, original_price: item.original_price.slice(0, -2) } })
            newsearchResult.sort(compare('_id', 'asc'))
            setsearchResult(newsearchResult)
        }
        else if (tab.key == 'sale_price_desc') {
            let newsearchResult = searchResult.map(item => { return { ...item, pc_price: item.pc_price.slice(0, -2) } })
            newsearchResult.sort(compare('sale_price', 'desc'))
            setsearchResult(newsearchResult)
        }
        else if (tab.key == 'sale_price_asc') {
            let newsearchResult = searchResult.map(item => { return { ...item, mobile_price: item.mobile_price.slice(0, -2) } })
            newsearchResult.sort(compare('sale_price', 'asc'))
            setsearchResult(newsearchResult)
        }
    }, [searchResult]);
    return (
        <div id="search">
            {/* 搜索框 */}
            <div className='HeadBar'>
                <Flex style={{ borderBottom: 'solid 1px #ccc' }}>
                    <Flex.Item style={{ flex: 1 }}>
                        <NavBar
                            mode="light"
                            icon={<Icon type="left" />}
                            onLeftClick={() => {
                                returnBtn()
                            }}
                            style={{ padding: 0 }}
                        ></NavBar>
                    </Flex.Item>
                    <Flex.Item style={{ flex: 11, margin: 0 }}>
                        <SearchBar maxLength={8}
                            value={searchInput}
                            onSubmit={(val) => { searchSubmit(val) }}
                            onChange={(val) => { setsearchInput(val) }}
                        />
                    </Flex.Item>
                </Flex>
            </div>
            {
                searchResult.length ?
                    <>
                        <div className='searchResult'>
                            <div className='sort' onClick={() => { }}>
                                <Tabs
                                    tabs={[
                                        { title: '综合价格', key: 'addtime' },
                                        { title: '价格最高', key: 'sale_price_desc' },
                                        { title: '价格最低', key: 'sale_price_asc' },
                                    ]}
                                    initialPage={0}
                                    animated={false}
                                    useOnPan={false}
                                    onTabClick={(tab) => { sortFun(tab); }}
                                >
                                </Tabs>
                            </div>
                            <ul className='hotGoodsList'>
                                {
                                    searchResult.map(item => (
                                        <li className='hotGoodsItem'
                                            key={item._id}
                                            onClick={() => {
                                                props.history.replace({
                                                    pathname: '/detail/' + item._id,
                                                    search: '?redirectTo=' + props.location.pathname
                                                })
                                            }}>
                                            <div className="hotGoods_pic">
                                                <img src={item.pic_url} alt="" />
                                            </div>
                                            <div className='hotGoods_info'>
                                                <p className='hotGoods_info_name'>
                                                    {item.dis_sku_title}
                                                </p>
                                                <div className='hotGoods_info_tag'>
                                                    <span className='tag'>限时特惠</span>
                                                </div>
                                                <div className='hotGoods_info_price'>
                                                    <span>￥{item.sale_price.slice(0, -2)}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                    :
                    <>
                        {/* 推荐搜索 */}
                        <div className='recommend'>
                            <p>推荐搜索</p>
                            <ul className='recommendSearch'>
                                {
                                    recommendSearch.map(item => (<li className='recommendSearchItem'
                                        key={item}
                                        onClick={() => { searchFun(item) }}
                                    >{item}</li>))
                                }
                            </ul>
                        </div>
                        {/* 热门商品 */}
                        <div className='hotGoods'>
                            <p>热卖商品</p>
                            <ul className='hotGoodsList'>
                                {
                                    hotGoodsList.map(item => (
                                        <li className='hotGoodsItem'
                                            key={item._id}
                                            onClick={() => {
                                                props.history.replace({
                                                    pathname: '/detail/' + item._id,
                                                    search: '?redirectTo=' + props.location.pathname
                                                })
                                            }}>
                                            <div className="hotGoods_pic">
                                                <img src={item.pic_url} alt="" />
                                            </div>
                                            <div className='hotGoods_info'>
                                                <p className='hotGoods_info_name'>
                                                    {item.dis_sku_title}
                                                </p>
                                                <div className='hotGoods_info_tag'>
                                                    <span className='tag'>限时特惠</span>
                                                </div>
                                                <div className='hotGoods_info_price'>
                                                    <span>￥{item.sale_price.slice(0, -2)}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
            }
        </div >
    )
};

export default Search;