(function (win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;//获得窗口宽度
        if (width > 750) { //按照设计稿的宽度设为标准
            width = 750;
        }
        var rem = width / 7.5; //让1rem等于设计稿（物理像素）的100px；等于逻辑像素的50px 即物理像素是css像素的2倍
        docEl.style.fontSize = rem + 'px'; //设置rem
    }
    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    refreshRem();
})(window)