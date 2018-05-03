
 require(['../config'],function(config) {

	require(['jquery','common'], function ($, common) {

		       var ipAdress = common.ipAdress;

           var tokenId = sessionStorage.getItem("tokenId");  

           var setPwd = {

                companyId:'',

                deptId:'',

           	    init:function(){

                  this.dateInit();

                  this.toIndex();
               },
               toIndex:function(){

                  $('.asidemenu').on('click',function(){

                      window.location.href="../home/index.html?companyId="+setPwd.companyId+"&deptId="+setPwd.deptId+"&btmIndex=0";
                  })

               },
               dateInit:function(){

                    var path = window.location.search.slice(1),passWord="",userCode="";

                    path = common.parseUrl(path);

                    setPwd.companyId = path.companyId;

                    setPwd.deptId = path.deptId;

                    console.log(path);

                    $('.set_main').on('click',function(){

                         window.location.href='setPwd.html?companyId='+path.companyId;

                    })
                    $('.lg_out').on('click',function(){

                        $.ajax({

                          url:ipAdress+'/weixin/loginOut',

                          data:{

                          },
                          type:'POST',

                          dataType:'json',

                          headers:{

                            Accept: "application/json; charset=utf-8"

                          },
                          success:function(res){

                            if(res.status == 200){

                                console.log(res);

                                window.location.href='../login/login.html';
                            }
                          }

                        })
                    })
               }
           }
           setPwd.init();
    })
})          