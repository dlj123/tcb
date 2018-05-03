
 require(['../config'],function(config) {

	require(['jquery','common'], function ($, common) {

		       var ipAdress = common.ipAdress;

           var tokenId = sessionStorage.getItem("tokenId");  

           var info = {

                companyId:'',

                deptId:'',

           	    init:function(){

                  this.dateInit();

                  this.toIndex();

                },
                toIndex:function(){

                   $('.asidemenu').on('click',function(){

                      window.location.href='../home/index.html?companyId='+info.companyId+'&deptId='+info.deptId+'&btmIndex=0';
                   })

                },
               dateInit:function(){

                    var path = window.location.search.slice(1);

                    path = common.parseUrl(path);

                    info.companyId = path.companyId;

                    info.deptId = path.deptId;

                    console.log(path);

                    $.ajax({

                        url:ipAdress+'/weixin/mySelfMessage',

                        data:{

                           tokenId:tokenId,

                           companyId: path.companyId,

                           deptId:path.deptId
                        },
                        dataType:'json',

                        headers: {

                           Accept: "application/json; charset=utf-8"

                         },

                        type:'POST',

                        success:function(res){

                          if(res.status==200){
                           
                             console.log(res);

                             var userName = res.data.userList[0].REAL_NAME;

                             var companyName = res.data.userList[0].COMPANY_NAME;

                             var deptName = res.data.userList[0].DEPARTMENT_NAME;

                             var positon  = res.data.userList[0].POSITION_NAME;

                             var phone = res.data.userList[0].MOBILE_PHONE;

                             $('.info_pic .name').html(userName);

                             $('.info_list .company').html(companyName);

                             $('.info_list .department').html(deptName);

                             $('.info_list .position').html(positon);

                             $('.info_list .phone').html(phone);
                           }
                        }
                    })
               }
           }
           info.init();
    })
})          