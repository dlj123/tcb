
require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		     var ipAdress = common.ipAdress;

         var tokenId = sessionStorage.getItem("tokenId");

         var  streamDetail = {

              companyId:'',

              deptId:'',

           	  init:function(){

                fastclick.attach(document.body);

                this.dataInit();

                this.toIndex();

            	},
              toIndex:function(){

                 $('.asidemenu').on('click',function(){

                  window.location.href='../home/index.html?companyId='+streamDetail.companyId+'&deptId='+streamDetail.deptId+'&btmIndex=0';
                })
              },
              dataInit:function(){

                  var path = window.location.search;

                     path = path.slice(1);

                     path = common.parseUrl(path);

                     console.log(path);

                    streamDetail.companyId = path.companyId;

                    streamDetail.deptId = path.deptId;

                    var index = path.index;

                    //获取停运信息

                    console.log(streamDetail.companyId,streamDetail.deptId,index);

                            $.ajax({

                                     url:ipAdress+'/weixin/TimeEntry/MoreStopTransport',

                                     data:{
                                               companyId:streamDetail.companyId,

                                               deptId:streamDetail.deptId
                                      },
                                     dataType:'json',

                                     type:'POST',

                                     headers: {
                                                Accept: "application/json; charset=utf-8"
                                     },

                                      success:function(res){

                                               if(res.status==200){

                                                    console.log(res);

                                                    var getStreamList = function(list,dataList){

                                                       list = list || [];

                                                       for(var i = 0;i<dataList.length;i++){

                                                          list[i]= dataList[i].carid;

                                                       }

                                                       list = list.join(',');

                                                       return list;
                                                    }

                                                    var getStreamHtml = function(dataList){

                                                           $.ajax({

                                                                 url:ipAdress+'/weixin/TimeEntry/selectCarInfoByCarId',

                                                                 data:{

                                                                    list:dataList
                                                                 },
                                                                 dataType:'json',

                                                                 type:'POST',

                                                                 headers:{

                                                                     Accept: "application/json; charset=utf-8"
                                                                 },
                                                                 success:function(res){

                                                                   if(res.status==200){

                                                                     console.log(res);

                                                                     var carDetailList = res.data.carInfo,carDetailHtml="";

                                                                      for(var i = 0;i<carDetailList.length;i++){
                                                                     
                                                                        carDetailHtml +=' <tr>'+
                                                                                               '<td>'+carDetailList[i].carNo+'</td>'+
                                                                                               '<td>'+carDetailList[i].carLicense+'</td>'+
                                                                                           '</tr>'

                                                                      }
                                                                      $('.offdetail_table tbody').html(carDetailHtml);
                                                                   }
                                                                 }

                                                      })
                                                    }

                                                    var streamList = "",dataStreamList = [];

                                                    if(index=="1"){

                                                      dataStreamList = res.data.tycarId.tingyun1carid;

                                                      streamList = getStreamList(streamList,dataStreamList);

                                                      console.log(streamList);

                                                      getStreamHtml(streamList);
                                                       
                                                    }
                                                    else if(index=="2"){

                                                       dataStreamList = res.data.tycarId.tingyun2carid;

                                                       streamList = getStreamList(streamList,dataStreamList);

                                                       console.log(streamList);

                                                       getStreamHtml(streamList);
                                                    }
                                                    else if(index=="3"){
                                                      
                                                       dataStreamList = res.data.tycarId.tingyun3carid;

                                                       streamList = getStreamList(streamList,dataStreamList);

                                                       console.log(streamList);

                                                       getStreamHtml(streamList);
                                                    }
                                                    else if(index=="4"){

                                                       dataStreamList = res.data.tycarId.tingyun3carid;

                                                       streamList = getStreamList(streamList,dataStreamList);

                                                       console.log(streamList);

                                                       getStreamHtml(streamList);
                                                    }
                                                }
                                        }
                          })                        
              }
          }

          streamDetail.init();

	})
})	