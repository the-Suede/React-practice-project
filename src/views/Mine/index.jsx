import React from 'react';
import Bottom from '$c/Bottom';
import './Mine.scss';
import { Modal, List } from 'antd-mobile';
import { withLogin } from '@/utils/hoc';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '@/store/actions/user';
const mapStateToProps = function (state) {
    return { userInfo: state.user.userInfo }
}
const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(userActions, dispatch)
}
@connect(mapStateToProps, mapDispatchToProps)
@withLogin
class Mine extends React.Component {
    constructor() {
        super();

    }
    render() {
        const alert = Modal.alert;
        const Item = List.Item;
        const Brief = Item.Brief;
        const { logout } = this.props;
        return (<div id="all">
            <div className="content" style={{ marginTop: 0 }}>
                <div className='user_info'>
                    <div className='setting_btn' onClick={() =>
                        alert('退出登录', 'Are you sure???', [
                            { text: '取消' },
                            { text: '确定', onPress: () => { logout() } },
                        ])}>
                        <img src="/iconfont/logout.png" alt="" />
                    </div>
                    <div className='avator'>
                        <img src="https://filecmms.midea.com/ccrm-prod/userHeadImg/defaultHeadImg.png" alt="" />
                    </div>
                    <div className='username'>小美的</div>
                </div>
                <List className="my-list">
                    <Item extra="查看详情" arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                        我的订单
                    </Item>
                    <Item arrow="horizontal" onClick={() => { }}>设置</Item>
                </List>
            </div>
            <div className="bottom"> <Bottom></Bottom></div>
        </div >
        )
    }
};
export default Mine;