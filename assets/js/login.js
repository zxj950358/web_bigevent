$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 定义layui表单检验规则
    var form = layui.form

    form.verify({
        pwd: [/^\S{6,12}$/, "密码为6-12位，不能包含空格"],
        repwd: function (value) {
            if ($('#reg-pwd').val()!==value) {
                return "两次密码输入不一致"
            }
        }
    })

    //注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url: '/api/reguser',
            data: {
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val()
            },
            // 第二种获取表单的数据方法：data:$('#form_reg').serialize()
            success:function(res){
                if (res.status!=0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#link_login').click()
                location.reload()//第一种：重新加载页面，和重新重置是一样的，但是如果以后功能多就不推荐这种的方式
                // 第二种：$('#form_reg')[0].reset()
            }
        })
    })

    //登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url: '/api/login',
            data: $(this).serialize(),
            // 第二种获取表单的数据方法：data:$('#form_reg').serialize()
            success:function(res){
                if (res.status!=0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //保存token
                localStorage.setItem('token', res.token)
                //跳转页面
                location.href='/index.html'
            }
        })
    })

})