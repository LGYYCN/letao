$(function () {
  var data = {
    productId: getQueryString('id')
  }
  mui('.mui-scroll-wrapper').scroll({
    indicators: true,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  $.ajax({
    url: '/product/queryProductDetail',
    data: {
      id: data.productId
    },
    success: function (res) {
      var size = res.size.split('-')
      var minSize = +size[0]
      var maxSize = +size[1]
      var size = []
      for (let i = minSize; i <= maxSize; i++) {
        size.push(i)
      }
      res.size = size
      var tmpSlider = template('tmp-slider', {
        list: res.pic
      })
      $('#slider').html(tmpSlider)
      mui("#slider").slider({
        interval: 1000
      });

      var tmpInfo = template('tmp-info', res);
      $('.product-info').html(tmpInfo)
      mui('.mui-numbox').numbox()
      $('.product-size button').on('click', function () {
        data.size = +$(this).text()
        $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning')
      })
    }
  })


  // 加入购物车
  $('#footer .add-product').on('click', function () {
    data.num = mui('.mui-numbox').numbox().getValue()
    if (!data.size) {
      mui.toast('请选择想购买的尺寸', {
        duration: 'long',
        type: 'div'
      })
      return
    }
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: data,
      success: function (res) {
        if (res.error == 400) {
          mui.confirm('您还未登录, 需要登录后才能添加购物车哦! 现在是否跳转到登陆页面呢?  ', '温馨提示: ', ['yes', 'no'], function (e) {
            if (e.index) {
              return
            }
            location.href = 'login.html?returnUrl=' + location.href
          }, 'div')
        } else {
          mui.confirm('您已经将商品添加到购物车了, 请问是否需要现在就跳转到购物车查看您的商品信息呢? ', '温馨提示: ', ['yes', 'no'], function (e) {
            if (e.index) {
              return
            }
            location.href = 'cart.html?id=' + data.productId + '&size=' + data.size + '&num=' + data.num
          }, 'div')
        }
      }
    })
  })
})




// 使用正则匹配url参数 返回这个匹配成功的值 根据参数名获取参数的值
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    console.log(r);
    // 别人之前使用unescape 方式解密  但是我们默认是encodeURI加密 使用 decodeURI 解密
    return decodeURI(r[2]);
  }
  return null;
}
