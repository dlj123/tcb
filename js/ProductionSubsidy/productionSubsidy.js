 require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		      var ipAdress = common.ipAdress;

          var tokenId = sessionStorage.getItem("tokenId"),companyId="",carId="",companyId02="",deptId="",position="",personInit = {};  

          var productionSubsidy = {

          	init:function(){

              common.tab('.top_tab ul li','.content_panel');

              common.focusBug();

              this.dataInit();

          		this.companyInit();

              this.deptInit();

              this.positionInit();

              this.personInit();
          	
              this.productionSubsidySubmit();

              this.productionSubsidyRecord();
            
          	},
            dataInit:function(){

                 var path = window.location.search;

                    path = path.slice(1);

                    path = common.parseUrl(path);

                    companyId = path.companyId;

                    deptId = path.deptId;
                 
                 $.ajax({

                    url:ipAdress+'/weixin/oaDoc/page',

                    data:{
                          
                       tokenId: tokenId,

                       companyId:companyId,

                       deptId:deptId
                    },
                    dataType:'json',

                    type:'POST',

                    success:function(res){

                      personInit.companyId = res.tmCompany.id;

                      personInit.deptId = res.userList[0].DEPARTMENT_ID;

                      personInit.positonId = res.userList[0].POSITION_ID;

                      personInit.userId = res.tmUser.id;

                      console.log(res);

                    }
                 })

            },
          	//初始化公司
          	companyInit:function(){

	             $('.company_wrap').on('click',function(){

              
             

               var companyListNew=[],companyPicker;

                $.ajax({

                    url:ipAdress+'/weixin/oaDoc/getCompanyList',

                    data:{

                      companyId:companyId

                    },
                    dataType:'json',

                    type:'POST',

                    success:function(res){
                         
                         console.log(res);

                         if(res.status==200){

                                 var companyList = res.data.companyList;

                                 for(var i = 0;i<companyList.length;i++){

                                  companyListNew[i]= {};

                                  companyListNew[i].value = companyList[i].id;

                                  companyListNew[i].text = companyList[i].companyName;

                                 }
                                 console.log(companyListNew);

                                  companyPicker = new mui.PopPicker();

                                companyPicker.setData(companyListNew);

                                companyPicker.pickers[0].setSelectedIndex(0, 1000);

                                companyPicker.show(function(getSelectedItems) {

                                    console.log(getSelectedItems[0]);

                                    $('#company').html(getSelectedItems[0].text);

                                    $('.dept_wrap').attr('data-companyid',getSelectedItems[0].value);

                                    companyPicker.dispose();

                                })

                             

                             }
                      else if(res.status==401){

                                common.maskConfirm('服务器内部错误！');
                             }
                    }
                })     
        			}) 
          	},
            //初始化部门
            deptInit:function(){

              var deptListNew = [];

              $('.dept_wrap').on('click',function(){

                companyId02 = $(this).attr('data-companyid');

                 console.log(companyId02);

                  if(!companyId02){

                      mui.alert('请选择公司之后再选择部门');

                    }
                  else{

                    console.log(companyId02);

                      $.ajax({

                             url:ipAdress+'/weixin/staffLeave/getDeptList',

                             data:{

                               companyId:companyId02

                             },

                             dataType:'json',

                             type:'POST',

                             success:function(res){
                                
                                console.log(res);

                                if(res.status==200){

                                 var deptList = res.data.deptList;

                                           for(var i = 0;i<deptList.length;i++){

                                              deptListNew[i] = {};

                                              deptListNew[i].value = deptList[i].id;

                                              deptListNew[i].text = deptList[i].departmentName;
                                           }
                                           console.log(deptListNew);
                              
                                            var deptPicker = new mui.PopPicker();

                                            deptPicker.setData(deptListNew);

                                            deptPicker.pickers[0].setSelectedIndex(0, 1000);

                                          deptPicker.show(function(getSelectedItems) {

                                                console.log(getSelectedItems[0]);

                                                $('#department').html(getSelectedItems[0].text);

                                                $('.position_wrap').attr('data-deptid',getSelectedItems[0].value);

                                                deptPicker.dispose();                                                

                                            })

                                }
                                else if(res.status==401){

                                   mui.alert('服务器内部错误！');

                                }
                             }
                      })
                }

              })

            
            },
            positionInit:function(){

              $('.position_wrap').on('click',function(){

                   deptId = $(this).attr('data-deptid');

                   if(!deptId){

                      mui.alert('请选择部门之后再选择职位');
                   }
                   else{

                     console.log(deptId);

                     $.ajax({

                           url:ipAdress+'/weixin/oaDoc/positionList',

                           data:{                       

                            deptId:deptId

                           },

                           type:'POST',

                           dataType:'json',

                           success:function(res){

                             console.log(res);
                    
                             var positionListNew = [] ,positionList = [];
                      
                                positionList = res.data.positionList;

                             for(var i = 0;i<positionList.length;i++){

                                   positionListNew[i] = {};

                                   positionListNew[i].text = positionList[i].POSITION_NAME;

                                   positionListNew[i].value = positionList[i].POSITION_ID;

                             }
                             console.log(positionListNew);

                              var positionPicker = new mui.PopPicker();

                            positionPicker.setData(positionListNew);

                            positionPicker.pickers[0].setSelectedIndex(0, 1000);

                            positionPicker.show(function(getSelectedItems) {

                                  console.log(getSelectedItems[0]);

                                  $('#position').html(getSelectedItems[0].text);

                                  $('.user_wrap').attr('data-positionid',getSelectedItems[0].value);

                                  positionPicker.dispose();  

                            })

                           }


                      })

                   }
              })//选择职位

                
            },
            personInit:function(){

              $('.user_wrap').on('click',function(){

                   positionId = $(this).attr('data-positionid');

                   if(!positionId){

                      mui.alert('请选择职位之后再选择人');
                   }
                   else{

                     console.log(positionId);

                     $.ajax({

                           url:ipAdress+'/weixin/oaDoc/positionAndPeopleList',

                           data:{                       

                            positionId:positionId

                           },

                           type:'POST',

                           dataType:'json',

                           success:function(res){

                             console.log(res);

                             var personListNew = [],personList = [];

                             personList = res.data.userList;
                    
                             for(var i = 0;i<personList.length;i++){

                                   personListNew[i] = {};

                                   personListNew[i].text = personList[i].realName;

                                   personListNew[i].value = personList[i].id;

                             }
                             console.log(personListNew);

                              var personPicker = new mui.PopPicker();

                            personPicker.setData(personListNew);

                            personPicker.pickers[0].setSelectedIndex(0, 1000);

                            personPicker.show(function(getSelectedItems) {

                                  console.log(getSelectedItems[0]);

                                  $('#user').html(getSelectedItems[0].text);

                                  $('.user_wrap').attr('data-userid',getSelectedItems[0].value);

                                  personPicker.dispose();  

                            })

                           }


                      })

                   }
              })//选择人

                
            },
          
           
            productionSubsidySubmit:function(){

              var selectValue = function(value){

                  if(value=="请选择"){

                        value = "";
                  }
                  return value;
                }

               var selectValue02 = function(value){

                  if(value=="请输入"){

                       value = "";
                  }
                  return value;
                }

              $('.submit_wrap').on('click','.submit_btn',function(){

                  var wxOaDoc = {};

                      wxOaDoc.nCompanyName = selectValue($('#company').html().trim());

                      wxOaDoc.nDeptName = selectValue($('#department').html().trim());

                      wxOaDoc.nPositionName = selectValue($('#position').html().trim());

                      wxOaDoc.nUserName = selectValue($('#user').html().trim());

                      wxOaDoc.subsidyCause = selectValue02($('#subsidyCause').val());

                      wxOaDoc.money = selectValue02($('#money').val());

                      wxOaDoc.formType ='scbz';

                      wxOaDoc.nCompanyId = $('.dept_wrap').data('companyid');

                      wxOaDoc.nDeptId = $('.position_wrap').data('deptid');

                      wxOaDoc.nPositionId = $('.user_wrap').data('positionid');

                      wxOaDoc.nUserId = $('.user_wrap').data('userid');

                      wxOaDoc.companyId = personInit.companyId;

                      wxOaDoc.deptId = personInit.deptId;

                      wxOaDoc.positionId = personInit.positonId;

                      wxOaDoc.userId = personInit.userId;

                      

                      console.log(wxOaDoc);

                     
                      if(wxOaDoc.nCompanyName.trim() =='' ){

                        mui.alert('请选择公司');

                      }else if(wxOaDoc.nDeptName.trim() =='' ){

                        mui.alert('请选择部门');

                      }else if(wxOaDoc.nDeptName.trim() =='' ){

                        mui.alert('请选择职位');

                      }else if(wxOaDoc.nUserName.trim() =='' ){

                        mui.alert('请选择姓名');

                      }else if(wxOaDoc.subsidyCause.trim() =='' ){

                        mui.alert('补助事由不能为空');

                      }else if(wxOaDoc.money.trim() =='' ){

                        mui.alert('金额不能为空');

                      }else{

                        $.ajax({

                            url:ipAdress+'/weixin/oaDoc/save',

                            data:{

                              tokenId:tokenId,

                              wxOaDoc:JSON.stringify(wxOaDoc)
                            },

                            dataType:'json',

                            type:'POST',

                            success:function(res){
                               
                               console.log(res);

                               var oaDocId = res.oaDocId;

                               if (res.status=="200") {

                                 window.location.href="productionSubsidy_submit_success.html?companyId="+companyId+"&oaDocId="+oaDocId+"&formType="+wxOaDoc.formType
                                  
                               }
                            }
                          })
                      }
              })
            },

          


           //生产扣除记录初始化
           productionSubsidyRecord:function(){

                console.log(tokenId,ipAdress);

                var listHtml = "";

                $.ajax({

                    url:ipAdress+'/weixin/oaDoc/oaDocList',

                    data:{

                         tokenId:tokenId,

                         formType:'scbz'
                    },

                    dataType:'json',

                    type:'POST',

                    success:function(res){
       
                      console.log(res);

                      var productionSubsidyList = res.data.wxOaDocList;

                        for (var i = productionSubsidyList.length-1; i >= 0; i--) {
                
                                                listHtml +='<li class="item"><a href="productionSubsidy_record.html?oaDocId='+productionSubsidyList[i].id+'">';

                                                listHtml +=   '<div class="name">'+productionSubsidyList[i].nCompanyName+'</div>';

                                                listHtml +=         '<div class="leave_infos">';

                                                listHtml +=           '<div class="time_reason">';

                                                listHtml +=             '<p>部门：'+productionSubsidyList[i].nDeptName+'</p>';

                                                listHtml +=            '<p>人员：'+productionSubsidyList[i].nUserName+'</p>';

                                                listHtml +=         ' </div>';

                                                if(productionSubsidyList[i].applyType=='60011003'){

                                                  listHtml +=          '<span class="icon check"></span>';

                                                }
                                                else if(productionSubsidyList[i].applyType=='60011002'){

                                                  listHtml +=          '<span class="icon failIcon"></span>';

                                                }
                                                else if(productionSubsidyList[i].applyType=='60011001'){

                                                  listHtml +=          '<span class="icon successIcon"></span>';

                                                } 
                                                listHtml += '</div>';
                                                
                                          
                                                listHtml +=  '</a></li>';
                                       
                                      }
                
                             $('#productionSubsidy_record').html(listHtml);


                    }
                })
            }
          }
         productionSubsidy.init();

	})
})	
function handleFiles(files) {

                   /*在各个机型都可以点击 file 调用相册 和 摄像头拍照 
                  1. 在老版本的安卓中，必须加上capture，否则只能调用相册 
                  2. 在IOS中 加了capture，就只能调用摄像头不能调用相册*/
                var getIos = function(){
                    
                       var ua=navigator.userAgent.toLowerCase();

                       if (ua.match(/iPhone\sOS/i) == "iphone os") {

                                  return true;

                        } else {

                                  return false;

                        }
                 }//getIos方法结束
                 if (getIos()) {

                              $('#upImgInput').removeAttr("capture");
                   }

                var list = document.getElementById('fileList');
            
                var lastItem = document.getElementById('last');
             
                for (var i = 0; i < files.length; i++) {

                  var li = document.createElement("li");

                  list.insertBefore(li,lastItem);

                  var div = document.createElement("div");

                  div.className="pic";

                  var img = document.createElement("img");

                  img.src = window.URL.createObjectURL(files[i]);

                  console.log(img.src);
                 
                  img.onload = function() {

                    window.URL.revokeObjectURL(this.src);

                  }
                 

                  li.appendChild(div);

                  div.append(img);

                  var span = document.createElement("span");

                  span.className="del";

                  var i = document.createElement("i");

                  i.className="delIcon iconfont icon-guanbi";

                  span.append(i);

                  div.append(span);
                
                }
             
            }



        