$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length>6) {
                return '昵称长度必须在1-6个字符之间！'
            }
        }
    })

    initUserInfo()
    //初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:function(res){
                if (res.status !==0) {
                    return layer.msg('res.message')
                }
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
        // $('.layui-form')[0].reset()
    })


    //表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if (res.status!==0) {
                    return layer.msg('用户信息修改失败')
                } else {
                    layer.msg('恭喜信息修改成功')
                    window.parent.getUserInfo()
                }

            }
        })
    })
})