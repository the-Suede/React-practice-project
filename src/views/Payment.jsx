import React from 'react';
import { Result, Button } from 'antd-mobile';

function Payment(props) {
    //接收
    const myImg = src => <img src={src} alt="" style={{ width: '100%' }} />;
    return (
        <>
            <Result
                img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
                title="支付成功"
            // message={<div>998.00元</div>}
            />
            <Button style={{ width: '95%', margin: '0.6rem auto' }} onClick={() => { props.history.replace('/home') }}>返回首页</Button>
        </>)
}
export default Payment;