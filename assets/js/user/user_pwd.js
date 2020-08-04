$(function () {
    var form = layui.form
    var layer = layui.layer
    //验证密码是否相同以及格式
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //判断新旧密码不能相同
        samePwd: function (value) {
            if (value===$('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value!==$('[name=newPwd]').val()) {
                return '新密码和确认密码不一致'
            }
        }
    })

    //设置密码提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url: '/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if (res.status!==0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg("更新密码成功")
                $('.layui-form')[0].reset()
            }
        })
    })

})