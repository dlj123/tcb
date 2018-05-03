require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		 var ipAdress = common.ipAdress;

         var tokenId = sessionStorage.getItem("tokenId"),btmIndex = "";

         var  capacity = {

            companyId:"",

            deptId:"",
 
         	  init:function(){

                fastclick.attach(document.body);

         	     	//common.tab('.capacity_tab li','.content_panel');

                this.dataInit();

                this.tabChange();

                this.toIndex();

          	},

            toIndex:function(){
                 
                 $('.asidemenu').on('click',function(){

                     window.location.href='../home/index.html?companyId='+capacity.companyId+'&deptId='+capacity.deptId+'&btmIndex=0';
                 })
            },
            dataInit:function(){

                 var path = window.location.search;

                     path = path.slice(1);

                     path = common.parseUrl(path);

                     capacity.companyId = path.companyId;

                     capacity.deptId = path.deptId;

                     console.log(capacity.companyId,capacity.deptId);
                 
                 //日运能
                   $.ajax({

                       url:ipAdress+'/weixin/TimeEntry/transportCapacityByDay',

                       data:{
                           companyId:capacity.companyId,

                           deptId:capacity.deptId
                       },
                       dataType:'json',

                       type:'POST',

                       headers:{

                              Accept: "application/json; charset=utf-8"
                       },

                       success:function(res){

                          if(res.status==200){

                             console.log(res);

                             if(res.data.status=='401'){

                                common.maskConfirm("该车队配置账单日错误");
                             }
                             else if(res.data.transportDayList.length==0){

                                common.maskConfirm("暂无日账单");
                             }
                             else{
                                
                                 var daylistdata = res.data.transportDayList,daylistHtml="";

                                 for(var i = 0;i<daylistdata.length;i++){

                                     daylistHtml+='<tr>'+
                                                       '<td>'+daylistdata[i].carno+'</td>'+

                                                       '<td>'+daylistdata[i].locamountsum+'m³</td>'+

                                                       '<td>'+daylistdata[i].userCount+'人</td>'+

                                                       '<td>'+daylistdata[i].transportCapacity+'m³/人</td>'+

                                                   '</tr>'
                                 }
                                 $('#dayCapacity tbody').html(daylistHtml);
                             }
                          }
                       }
                   })

            },
            tabChange:function(){

                  var monthFormate = function(value){


                  }

                  $('.capacity_tab').on('click','li',function(){

                      var index = $(this).index();

                      $(this).addClass('active').siblings('li').removeClass('active');

                      $('.content_panel').hide();

                      if(index==0){
                             //日运能
                             $.ajax({

                                 url:ipAdress+'/weixin/TimeEntry/transportCapacityByDay',

                                 data:{
                                     companyId:capacity.companyId,

                                     deptId:capacity.deptId
                                 },
                                 dataType:'json',

                                 type:'POST',

                                 headers:{

                                        Accept: "application/json; charset=utf-8"
                                 },

                                 success:function(res){

                                    if(res.status==200){

                                       console.log(res);

                                       if(res.data.status=='401'){

                                          common.maskConfirm("该车队配置账单日错误");
                                       }
                                       else if(res.data.transportDayList.length==0){

                                          common.maskConfirm("暂无日账单");
                                       }
                                       else{
                                          
                                           var daylistdata = res.data.transportDayList,daylistHtml="";

                                           for(var i = 0;i<daylistdata.length;i++){

                                               daylistHtml+='<tr>'+
                                                                 '<td>'+daylistdata[i].carno+'</td>'+

                                                                 '<td>'+daylistdata[i].locamountsum+'m³</td>'+

                                                                 '<td>'+daylistdata[i].userCount+'人</td>'+

                                                                 '<td>'+daylistdata[i].transportCapacity+'m³/人</td>'+

                                                             '</tr>'
                                           }
                                           $('#dayCapacity tbody').html(daylistHtml);
                                       }
                                    }
                                 }
                             })

                            $('.content_panel').eq(0).show();

                      }
                      else if(index==1){
                          //月运能
                         $.ajax({

                             url:ipAdress+'/weixin/TimeEntry/transportCapacityByMonth',

                             data:{
                                 companyId:capacity.companyId,

                                 deptId:capacity.deptId
                             },
                             dataType:'json',

                             type:'POST',

                             headers:{

                                    Accept: "application/json; charset=utf-8"
                             },

                             success:function(res){

                                if(res.status==200){

                                   console.log(res);

                                   if(res.data.status=='401'){

                                      common.maskConfirm("该车队配置账单日错误");
                                   }
                                   else if(res.data.transportMonthList.length==0){

                                      common.maskConfirm("暂无月账单");
                                   }
                                   else{
                                      
                                       var monthlistdata = res.data.transportMonthList,monthlistHtml="";

                                       for(var i = 0;i<monthlistdata.length;i++){

                                           monthlistHtml+='<tr>'+

                                                             '<td>'+monthlistdata[i].createdate+'</td>'+

                                                             '<td>'+monthlistdata[i].locamountsum+'m³</td>'+

                                                             '<td>'+monthlistdata[i].userCount+'人</td>'+

                                                             '<td>'+monthlistdata[i].transportCapacity+'m³/人</td>'+

                                                         '</tr>'
                                       }
                                       $('#monthCapacity tbody').html(monthlistHtml);
                                   }
                                }
                             }
                         })
                         $('.content_panel').eq(1).show();
                      }
                      else if(index==2){
                           //月运能
                         $.ajax({

                             url:ipAdress+'/weixin/TimeEntry/transportCapacityByYear',

                             data:{
                                 companyId:capacity.companyId,

                                 deptId:capacity.deptId
                             },
                             dataType:'json',

                             type:'POST',

                             headers:{

                                    Accept: "application/json; charset=utf-8"
                             },

                             success:function(res){

                                 if(res.status==200){

                                   console.log(res);

                                   if(res.data.status=='401'){

                                      common.maskConfirm("该车队配置账单日错误");
                                   }
                                   else if(res.data.transportYearList.length==0){

                                      common.maskConfirm("暂无年账单");
                                   }
                                   else{
                                      
                                       var yearlistdata = res.data.transportYearList,yearlistHtml="";

                                       for(var i = 0;i<yearlistdata.length;i++){

                                           yearlistHtml+='<tr>'+
                                           
                                                             '<td>'+yearlistdata[i].actualTime+'</td>'+

                                                             '<td>'+yearlistdata[i].locamountsum+'m³</td>'+

                                                             '<td>'+yearlistdata[i].userCount+'人</td>'+

                                                             '<td>'+yearlistdata[i].transportCapacity+'m³/人</td>'+

                                                         '</tr>'
                                       }
                                       $('#yearCapacity tbody').html(yearlistHtml);
                                   }
                                }
                             }
                         })
                         $('.content_panel').eq(2).show();
                      }

                  })
            }
          }

          capacity.init();

	})
})	