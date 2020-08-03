//设置路径（测试）
var baseURL = 'http://ajax.frontend.itheima.net'
//设置路径（生产）


//拦截/过滤每一次ajax请求，配置每次请求需要的参数
$.ajaxPrefilter(function (options) {
    options.url = baseURL+options.url

    if (options.url.indexOf('/my/')!==-1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //进行身份确认好后才可以进入首页
    options.complete = function (res) {
        var data = res.responseJSON
        console.log(data)
        if (data.status ==1 && data.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }




})