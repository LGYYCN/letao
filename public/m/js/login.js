$(function () {
  var data

  $('.mui-btn-primary').on('click', function () {
    var userName = $('.userName').val().trim()
    var password = $('.password').val()
    if (!userName || !password) {
      mui.toast('请输入用户名或密码', {
        duration: 'long',
        type: 'div'
      })
      return
    } else {
      $.ajax({
        type: 'post',
        url: '/user/login',
        data: {
          username: userName,
          password: password
        },
        success: function (res) {
          if (res.success) {
            location.href = getQueryString('returnUrl')
          } else {
            mui.toast('请输入正确的用户名或密码', {
              duration: 'long',
              type: 'div'
            })
          }
        }
      })
    }
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
