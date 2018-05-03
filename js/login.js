require(['config'],function(config) {

	require(['jquery','common','fastclick','url'], function ($, common,fastclick,url) {

          var ipAdress = common.ipAdress;
    
          var login = {

              companyId:'',

              deptId:'',

              tokenId:'',
              
              init:function(){

                   fastclick.attach(document.body);

                   common.buttontap('.lgbtn_wrap button');

                   this.dataInit();
                   
                   this.txtedite();

                   this.eyechange();

                   this.pwdcheckbox();

                   this.validate();

                   this.companyConfirm();

                   this.cookieInit();
                 
          	  },
              dataInit:function(){

                  var userCode = sessionStorage.getItem('userCode');

                  var passWord = sessionStorage.getItem('passWord');

                  if(userCode && passWord){

                      $('.username').val(userCode);

                      $('.password').val(passWord);
                    
                  }
                  
              },
              cookieInit:function(){

                var strName = localStorage.getItem('keyName');

                var strPass = localStorage.getItem('keyPass');

                if(strName){

                    $('.username').val(strName);

                }if(strPass){

                    $('.password').val(strPass);

                }
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
              //记住用户名和密码
          	  pwdcheckbox:function(){

                    $('.remember_pwd .checkboxIcon').on('click',function(){

                          if($(this).hasClass('active')){

                             localStorage.removeItem('keyPass');
                             
                             $(this).removeClass('active');
                      	  }
                      	  else{

                              if(!$('.username').val() || !$('.password').val()){

                                 common.maskConfirm("请填写用户名和密码再操作记住密码！");

                              }

                             else{

                                var strName = $('.username').val();

                                var strPass = $('.password').val();

                                localStorage.setItem('keyName',strName);

                                localStorage.setItem('keyPass',strPass);
 
                                $(this).addClass('active');

                              }
                      	  }
                  })

          	  },
          	  validate:function(){
                  
          	  	  $('.lgbtn_wrap').on('click','button',function(){

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

                               headers:{

                                    Accept: "application/json; charset=utf-8"
                                   },

                               success: function (res) {

                                console.log(res);
                                  
                                  var res = JSON.stringify(res);

                                      res = JSON.parse(res);

                                  if(res.status==200){

                                    login.tokenId = res.tokenId;

                                    sessionStorage.setItem("tokenId", res.tokenId);    

                                    sessionStorage.setItem("userCode", username); 

                                    sessionStorage.setItem("passWord", password);                             

                                    companyNum = res.companyCount;

                                                if(companyNum>1){
                                                     
                                                     $('#selectCompany').css('display','block');

                                                     $.ajax({

                                                          url:ipAdress+'/weixin/main',

                                                          async: false,

                                                          data:{

                                                            tokenId:login.tokenId

                                                          },

                                                          dataType:'json',

                                                          type:'POST',

                                                          success:function(res){

                                                             console.log(res);

                                                             var companyList = res.companyList,companyHtml='';

                                                             $('#selectCompany .tit').html('选择公司');

                                                             for (var i = 0;i < companyList.length; i++) {

                                                                 companyHtml += "<li data-companyid='"+companyList[i].id+"'><i class='iconfont icon-gou'></i>"+companyList[i].companyName+"</li>"

                                                             }
                                                             $('#companyList').html(companyHtml);
                                                          }
                                                     })
                                                }
                                                else{ 

                                                   login.companyId = res.companyId;

                                                   $('.confirm_wrap input[type=hidden]').val("2");
                                                   
                                                   $.ajax({

                                                      url:ipAdress + '/weixin/mainDeptList',

                                                      data:{

                                                           tokenId:login.tokenId,
                                                           
                                                           companyId:login.companyId
                                                      },
                                                      dataType:'json',

                                                      type:'POST',

                                                      headers:{

                                                           Accept: "application/json; charset=utf-8"
                                                      },
                                                      success:function(res){

                                                         console.log(res);

                                                          var deptData = res.data.deptList,deptHtml = "";

                                                          if(deptData.length>1){

                                                              $('#selectCompany').show();

                                                              $('#selectCompany .tit').html("选择部门");

                                                              for(var i = 0;i<deptData.length;i++){
                                                                   
                                                                   deptHtml += '<li data-deptId="'+deptData[i].DEPARTMENT_ID+'"><i class="iconfont icon-gou"></i>'+deptData[i].DEPARTMENT_NAME+'</li>'
                                                              }
                                                              $('#companyList').html(deptHtml);
                                                          }
                                                          else{

                                                               login.deptId = res.data.deptList[0].DEPARTMENT_ID;

                                                               window.location.href='../home/index.html?companyId='+login.companyId+'&deptId='+login.deptId+'&btmIndex=0'; 
                                                          }
                                                      }
                                                   })                                    

                                                }

                                  }//状态200
                                  else{

                                     $('.message').html(res.message);
                                    
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

                      if($(this).data('companyid')){

                         $(this).addClass('active').siblings('li').removeClass('active');

                         login.companyId = $(this).data('companyid');

                      }
                      else if($(this).data('deptid')){

                             $(this).addClass('active').siblings('li').removeClass('active');

                             login.deptId = $(this).data('deptid');

                             console.log(login.deptId);
                       }   

                   })
             
                   $('#selectCompany .confirm_wrap button').on('click',function(e){

                        if($('.confirm_wrap input[type=hidden]').val()=='1'){

                          if(!login.companyId){

                             common.maskConfirm("请选择公司");
                          }

                          else{

                            $.ajax({

                               url:ipAdress+'/weixin/mainDeptList',

                               data:{

                                    companyId:login.companyId,

                                    tokenId:login.tokenId
                               },
                               dataType:'json',

                               type:'POST',

                               headers:{

                                      Accept: "application/json; charset=utf-8"
                               },
                               success:function(res){

                                  console.log(res);

                                  var deptData = res.data.deptList,deptHtml = "";

                                  if(deptData.length>1){

                                      $('#selectCompany .tit').html("选择部门");

                                      for(var i = 0;i<deptData.length;i++){
                                           
                                           deptHtml += '<li data-deptId="'+deptData[i].DEPARTMENT_ID+'"><i class="iconfont icon-gou"></i>'+deptData[i].DEPARTMENT_NAME+'</li>'
                                      }
                                      $('#companyList').html(deptHtml);
                                  }
                                  else{

                                       login.deptId = res.data.deptList[0].DEPARTMENT_ID;

                                       window.location.href='../home/index.html?companyId='+login.companyId+'&deptId='+login.deptId+'&btmIndex=0'; 
                                  }
                               }
                            })

                             $('.confirm_wrap input[type=hidden]').val('2');

                           }
                        }
                        else if($('.confirm_wrap input[type=hidden]').val()=='2') {

                            if(!login.deptId){

                               common.maskConfirm("请选择部门");
                            }

                            else{

                                window.location.href='../home/index.html?companyId='+login.companyId+'&deptId='+login.deptId+'&btmIndex=0';

                                $('.confirm_wrap input[type=hidden]').val("1");
                            }
                           
                        }  
                   })
                   $('#selectCompany').on('click',function(e){
            
                        var target  = $(e.target);

                        if(target.closest('.layer_box02').length == 0){
                       
                          $('#selectCompany').hide();

                          $('.confirm_wrap input[type=hidden]').val("1");

                        };

                        e.stopPropagation();

                    })

              }
          }
          login.init();
	})   
})	