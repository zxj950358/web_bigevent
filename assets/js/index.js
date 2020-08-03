$(function () {
    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清除token
            localStorage.removeItem('token')
            // 2.退回登录界面
            location.href='/login.html'

            //关闭弹出层
            layer.close(index);
        });
        

        
    })








})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo', 
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！')
        }
        // 调用 renderAvatar 渲染用户的头像
        renderAvatar(res.data)
        },
        //进行身份确认好后才可以进入首页
        // complete: function(res) {
        //     if (res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！') {
        //         localStorage.removeItem('token')
        //     location.href='/login.html'
        //     }
        // }
      
      
    })
  }

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
      // 3.1 渲染图片头像
      $('.layui-nav-img')
        .attr('src', user.user_pic)
        .show()
      $('.text-avatar').hide()
    } else {
      // 3.2 渲染文本头像
      $('.layui-nav-img').hide()
      var first = name[0].toUpperCase()
      $('.text-avatar')
        .html(first)
        .show()
    }
  }
