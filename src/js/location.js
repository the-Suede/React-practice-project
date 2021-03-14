function getlocal(getlocalSuccess) {
    //首先设置默认城市
    var defCity = {
        id: '000001',
        city: '北京',
        province: "",
        district: ""
    };
    //浏览器兼容
    if (navigator.geolocation) {
        console.log(22);
        navigator.geolocation.getCurrentPosition(
            function (position) {
                //获取地理位置成功时所做的处理
                var lat = position.coords.latitude; //估计精度
                var lon = position.coords.longitude; //估计纬度
                var point = new BMap.Point(lon, lat); // 创建点坐标
                var gc = new BMap.Geocoder(); //生成地图

                gc.getLocation(point, function (rs) {
                    console.log(rs);
                    var addComp = rs.addressComponents;
                    var curCity = {
                        id: '',
                        city: addComp.city,
                        province: addComp.province,
                        district: addComp.district
                    }

                    if (getlocalSuccess != undefined) {
                        getlocalSuccess(curCity);
                    }
                })
            },
            function (error) {
                //获取地理位置失败时所做的处理
                switch (error.code) {
                    case 1:
                        alert("位置服务被拒绝。");
                        break;
                    case 2:
                        alert("暂时获取不到位置信息。");
                        break;
                    case 3:
                        alert("获取位置信息超时。");
                        break;
                    default:
                        alert("未知错误。");
                        break;
                }
            }
        )
    } else {
        //如果不支持定位的话就将默认城市返回
        if (getlocalSuccess != undefined) {
            getlocalSuccess(defCity);
        }
    }
}

var myCity = new BMap.LocalCity();
//初始化定位

let relocation = function (result) {
    console.log(result);
    // return result
}
myCity.get(relocation)
// export default location
myCity.get(function (result) {
    console.log("result", result);
})
