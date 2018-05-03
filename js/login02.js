require(['config'],function(config) {

	require(['jquery','common','fastclick','url'], function ($, common,fastclick,url) {

          var ipAdress = common.ipAdress;
    
          var login = {
              
              init:function(){

                   fastclick.attach(document.body);

                   common.buttontap('.lgbtn_wrap button');
                   
                   this.txtedite();

                   this.eyechange();

                   this.pwdcheckbox();

                   this.validate();

                   this.companyConfirm();
                 
          	  },
          	  txtedite:function(){

          	  	 $('.acc-input').focus(function(){

                      $(this).siblings('.decIcon').css('opacity','1');

                  }).blur(function(){

                  	  $(this).siblings('.decIcon').css('opacity','0');
                  })

                  $('.input-container .decIcon').on('click',function(){

                  	  $(this).siblings('.acc-input').val('').focus();
                  })
          	  },
          	  eyechange:function(){

          	  	$('.input-container .pwd_show').on('click',function(){

          	  		 if($(this).hasClass('icon-yanjingbishang')){

          	  		 	$(this).removeClass('icon-yanjingbishang').addClass('icon-yanjing-zhengkai');

          	  		 	$(this).siblings('.password').attr('type','text').focus();
          	  		 }
          	  		 else{

          	  		 	$(this).removeClass('icon-yanjing-zhengkai').addClass('icon-yanjingbishang');

          	  		 	$(this).siblings('.password').attr('type','password').focus();
          	  		 }
          	  	})
          	  },
          	  pwdcheckbox:function(){
                    
                  $('.remember_pwd .checkboxIcon').on('click',function(){

                  	  if($(this).hasClass('active')){
                         
                         $(this).removeClass('active');
                  	  }
                  	  else{

                         $(this).addClass('active');
                  	  }
                  })
          	  },
          	  validate:function(){
                  
          	  	  $('.lgbtn_wrap button').on('click',function(){
                         
                         $('.acc-input').each(function(){

                         	if ($(this).val()=="") {

                         		$(this).focus();
                         		
                         		return false;
                         	}
                          else{
                            var companyNum,

                            username = $('.username').val(),

                            password = $('.password').val();

                            $.ajax({

                               type:"POST",

                               url:ipAdress+'/weixin/login',

                               data:{

                                  userName:username,

                                  passWord:password
                               },
                               //contentType: "application/json;charset=utf-8",
                               async: false,

                               dataType:'json',

                               success: function (res) {
                                  
                                  var res = JSON.stringify(res);

                                      res = JSON.parse(res);

                                  console.log(res.companyId);

                                  if(res.status==200){

                                    sessionStorage.setItem("tokenId", res.tokenId); 

                                    companyNum = res.companyCount;

                                    if(companyNum>1){
                                         
                                         $('#selectCompany').css('display','block');

                                         $.ajax({

                                              url:ipAdress+'/weixin/main',

                                              async: false,

                                              data:{

                                                tokenId:res.tokenId

                                              },

                                              dataType:'json',

                                              type:'POST',

                                              success:function(res){

                                                 console.log(res);

                                                 var companyList = res.companyList,companyHtml='';

                                                 for (var i = 0;i < companyList.length; i++) {

                                                     companyHtml += "<li data-companyid='"+companyList[i].id+"'><i class='iconfont icon-gou'></i>"+companyList[i].companyName+"</li>"

                                                 }
                                                 $('#companyList').html(companyHtml);
                                              }
                                         })
                                    }
                                    else{

                                       window.location.href="../home/index.html?companyId="+res.companyId+"&btmIndex=0";
                                    }

                                  }

                               },
                               fail:function(xhr){

                                 console.log(xhr);
                                 
                               }
                            })
                          }
                         })
          	  	  })
          	  },
              companyConfirm:function() {

                  $('#companyList').on('click','li',function(){

                         $(this).addClass('active').siblings('li').removeClass('active');

                         var companyId = $(this).data('companyid');

                         window.location.href='../home/index.html?companyId='+companyId+"&btmIndex=0";

                  })
                  $('#selectCompany').on('touchstart',function(event){

                       var _con = $('.layer_box');

                       if(!_con.is(event.currentTarget) && _con.has(event.currentTarget).length == 0){
                             
                             $('#selectCompany').hide();  
                       }
                  })
              }
          }
          login.init();
	})   
})	