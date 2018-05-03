
 require(['../config'],function(config) {

	require(['jquery','common'], function ($, common) {

		       var ipAdress = common.ipAdress;

           var tokenId = sessionStorage.getItem("tokenId");  

           var setPwd = {

                companyId:"",

           	    init:function(){

                  this.dateInit();

                  this.stateChange();

                  this.validate();

                },
               dateInit:function(){

                    var path = window.location.search.slice(1);

                    path = common.parseUrl(path);

                    this.companyId = path.companyId;

                    $.ajax({

                        url:ipAdress+'/weixin/goPassWordPage',

                        data:{

                           tokenId:tokenId,

                           companyId: setPwd.companyId
                        },
                        dataType:'json',

                        headers: {

                           Accept: "application/json; charset=utf-8"

                         },

                        type:'POST',

                        success:function(res){

                        	if(res.status==200){
                           
                              console.log(res);

                              var userCode = res.data.userCode;

                              $('.default_account').html(userCode);
                           }
                        }
                    })
               },
               stateChange:function(){

                   $('.setPwd_list .comm_input').each(function(){

                       $(this).focus(function(){

                          $('.setPwd_list .edite_icon').removeClass('focus');

                       	  $(this).siblings('.edite_icon').addClass('focus');

                       }).blur(function(){

                          $(this).siblings('.edite_icon').removeClass('focus');
                       })
                   })
                   $('.setPwd_list').on('click','.change_icon',function(){

                          $('.setPwd_list .edite_icon').removeClass('focus');

                          $(this).parents('.edite_icon').addClass('focus');

                   	    if($(this).parents('.edite_icon').siblings('.comm_input').attr('type')=='text'){

                             $(this).parents('.edite_icon').siblings('.comm_input').attr('type','password');

                             $(this).find('i').removeClass('icon-yanjing-zhengkai').addClass('icon-yanjingbishang');

                        }
                        else{

                           $(this).parents('.edite_icon').siblings('.comm_input').attr('type','text');

                           $(this).find('i').removeClass('icon-yanjingbishang').addClass('icon-yanjing-zhengkai');
                        }
                   })
                   $('.setPwd_list').on('click','.del_icon',function(){

                          $('.setPwd_list .edite_icon').removeClass('focus');

                          $(this).parents('.edite_icon').addClass('focus');

                          $(this).parents('.edite_icon').siblings('.comm_input').val("").focus();  
                   })
               },
               validate:function(){

                   var oldPwd = "",setPwd="",comfirmPwd="";

                   $('.common_top .ope').on('click',function(){

                           oldPwd = $('#oldPwd').val();

                           setPwd = $('#newPwd').val();

                           comfirmPwd = $('#comfirmPwd').val();

                            var that = $(this);

                            if(!oldPwd || !setPwd || !comfirmPwd){

                                  common.maskConfirm02('密码不能为空!!',function(){

                                  that.focus();

                                })
                            }
                            else{
                              
                                    if(setPwd==comfirmPwd){

                                        $.ajax({

                                            url:ipAdress+'/weixin/editPassWord',

                                            data:{

                                               tokenId:tokenId,

                                               password:setPwd,

                                               companyId: setPwd.companyId
                                            },
                                            dataType:'json',

                                            headers: {

                                               Accept: "application/json; charset=utf-8"

                                             },

                                            type:'POST',

                                            success:function(res){

                                              if(res.status==200){

                                                 console.log(res);

                                                 if(res.data.status=="200"){

                                                     common.maskConfirm(res.data.messsage);
                                                 }
                                              }
                                           }
                                        })

                                    }
                                    else{

                                        common.maskConfirm02('两次密码不一致，请重新输入',function(){
                                             
                                           that.focus();

                                        });
                                    }
                            }
                   })
               }
           }
           setPwd.init();
    })
})          