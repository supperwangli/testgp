
/*
功能：保存cookies函数 
参数：name，cookie名字；value，值
*/
function SetCookie(name,value){
    var Days = 60;   //cookie 将被保存两个月
    var exp  = new Date();  //获得当前时间
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
} 
/*
功能：获取cookies函数 
参数：name，cookie名字
*/
function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null)
  return unescape(arr[2]); 
    return null;

} 
/*
功能：删除cookies函数 
参数：name，cookie名字
*/
function delCookie(name){
    var exp = new Date();  //当前时间
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

(function($) {
  var func_logout = function(){};
  $.fn.set_logout = function (func) {
	return this.each(function() {
	  func_logout = func;
	});
  }
  $.fn.logout = function () {
	return this.each(function() {
	  delCookie('tsh51_username');
	  delCookie('tsh51_password');
	  func_logout();
	});
  }
  $.fn.close_login = function () {
	return this.each(function() {
	  this.innerHTML = "";
	  this.style.display = "none";
	});
  }
/***************** login operation *********************/
  var func_login = function(){};
  $.fn.set_login = function (func) {
	return this.each(function() {
	  func_login = func;
	});
  }
  $.fn.click_login = function () {
	return this.each(function() {
	var uname = document.getElementById('username').value;
	if ( (uname == null) || (uname.replace(/(^\s*)|(\s*$)/g, '') == '') ) {
	  document.getElementById('id_login_tip').innerHTML = "帐号不能为空！";
	  return;
	}
	var pword = document.getElementById('ppassword').value;
	if ( (pword == null) || (pword.replace(/(^\s*)|(\s*$)/g, '') == '') ) {
	  document.getElementById('id_login_tip').innerHTML = "密码不能为空！";
	  return;
	}
var thisobj = this;
$.post('login.php', {'p0':'cTool', 'p1':uname, 'p2':pword}, function(msg) {
  var ret = $.parseJSON(msg);
  if (ret.s == 0) {
	func_login(uname);
	thisobj.style.display = "none";
  } else if (ret.s == -1) {
	document.getElementById('id_login_tip').innerHTML = "账号不正确！";
  } else if (ret.s == -2) {
	document.getElementById('id_login_tip').innerHTML = "密码不正确！";
  }
});

	});
  }
  $.fn.show_login = function () {
	return this.each(function() {
	  document.getElementById("ID_REGISTER").style.display = "none";
	  document.getElementById("ID_LOGIN").style.display = "block";
	});
  }
/***************** register show *********************/
  $.fn.click_register = function () {
	return this.each(function() {
	var uname = document.getElementById('member_user').value;
	if (uname.replace(/(^\s*)|(\s*$)/g, '') == '') {
		document.getElementById('id_register_tip').innerHTML = "帐号不能为空！";
		return;
	}
	var pword = document.getElementById('member_password').value;
	if (pword.replace(/(^\s*)|(\s*$)/g, '') == '') {
		document.getElementById('id_register_tip').innerHTML = "密码不能为空！";
		return;
	}
	var repword = document.getElementById('pass').value;
	if (pword != repword){
		document.getElementById('id_register_tip').innerHTML = "两次输入密码不一样！";
		return;
	}
	var mname = document.getElementById('member_name').value;
	if (mname.replace(/(^\s*)|(\s*$)/g, '') == '' || mname.replace(/[\u4e00-\u9fa5]/g, '')) {
		document.getElementById('id_register_tip').innerHTML = "真实姓名不能为空且必须为中文！";
		return;
	}
	var mphone = document.getElementById('member_phone').value;
	var mmail = document.getElementById('member_email').value;

var thisobj = this;
$.post('login.php', {'p0':'register', 'p1':uname, 'p2':pword, 'p3':mname, 'p6':mphone, 'p7':mmail}, function(msg) {
  var ret = $.parseJSON(msg);
  if (ret.s >= 0) {
	func_login(uname);
	thisobj.style.display = "none";
  } else {
	document.getElementById('id_register_tip').innerHTML = ret.m;
  }
});

	});
  }
  $.fn.show_register = function () {
	return this.each(function() {
	  document.getElementById("ID_LOGIN").style.display = "none";
	  document.getElementById("ID_REGISTER").style.display = "block";
	});
  }

    $.fn.extend({
        showlogin: function(x, str) {
/*
			var defaults = {
                decimal_length: 2,
            };
            var options = $.extend(defaults, options);
            var len = parseInt(options['decimal_length']);
			len = parseInt(options['aaa']);
			order_type = options['xxx'];
*/
            return this.each(function() {
/*****/
this.innerHTML =
"<div id='ID_LOGIN'>"+
"<div class='LGIt1 txtl'>用户登录</div>"+
"<div class='LGIt2 btnl' onclick=$('#"+this.id+"').show_register()>用户注册</div>"+
"<div class='LGIbdy'>"+
"<label>用户名:</label><br />"+
"<input type='text' id='username' placeholder='用户名' /><br />"+
"<label>密码:</label><br />"+
"<input type='password' id='ppassword' placeholder='密码' /><br />"+
"</div>"+
"<div id='id_login_tip' class='LGItip'></div>"+
"<div class='LGIb1 btnl' onclick=$('#"+this.id+"').click_login()>登录</div>"+
"<div class='LGIb2 btnl' onclick=$('#"+this.id+"').close_login()>取消</div>"+
"</div>"+
"<div id='ID_REGISTER'>"+
"<div class='LGIt1 btnl' onclick=$('#"+this.id+"').show_login()>用户登录</div>"+
"<div class='LGIt2 txtl'>用户注册</div>"+
"<div class='LGIbdy'>"+
"<label>账号:&emsp;&emsp;</label>"+
"<input name='member_user' type='text' id='member_user' maxlength='20' placeholder='必须填写' /><br />"+
"<label>密码:&emsp;&emsp;</label>"+
"<input name='member_password' type='password' id='member_password' maxlength='20' placeholder='必须填写' /><br />"+
"<label>确认密码:</label>"+
"<input name='pass' type='password' id='pass' placeholder='必须填写' /><br />"+
"<label>真实姓名:</label>"+
"<input name='member_name' type='text' id='member_name' placeholder='' /><br />"+
"<label>手机号码:</label>"+
"<input name='member_phone' type='text' id='member_phone' placeholder='外卖必填' /><br />"+
"<label>电子邮箱:</label>"+
"<input name='member_email' type='text' id='member_email' placeholder='找回密码' /><br />"+
"</div>"+
"<div id='id_register_tip' class='LGItip'></div>"+
"<div class='LGIb1 btnl' onclick=$('#"+this.id+"').click_register()>注册</div>"+
"<div class='LGIb2 btnl' onclick=$('#"+this.id+"').close_login()>取消</div>"+
"</div>";
if (x == 0) {
  document.getElementById("ID_LOGIN").style.display = "block";
  document.getElementById("ID_REGISTER").style.display = "none";
} else {
  document.getElementById("ID_LOGIN").style.display = "none";
  document.getElementById("ID_REGISTER").style.display = "block";
}
this.style.display = "block";
/*****/
            });
        }
    });

})(jQuery);
