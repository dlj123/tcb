require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		     var ipAdress = common.ipAdress;

         var tokenId = sessionStorage.getItem("tokenId"),btmIndex = "";

         var  offStream = {

            companyId:"",

            deptId:"",

            teamList:[],

          	init:function(){

         		   this.selectTeam();

               this.dataInit();

               this.toStreamDetail();

               this.toIndex();

          	},
            toIndex:function(){

               $('.asidemenu').on('click',function(){

                  window.location.href='../home/index.html?companyId='+offStream.companyId+'&deptId='+offStream.deptId+'&btmIndex=0';
               })

            },
            dataInit:function(){
               
                   var path = window.location.search;

                     path = path.slice(1);

                     path = common.parseUrl(path);

                      offStream.companyId = path.companyId;

                     console.log(offStream.companyId,tokenId);

                     //车队获取

                $.ajax({

                      url:ipAdress+'/weixin/TimeEntry/page',

                      data:{

                           tokenId:tokenId,

                           companyId:offStream.companyId,

                      },
                      dataType:'json',

                      type:'POST',

                      headers: {
                             Accept: "application/json; charset=utf-8"
                        },
                      success:function(res){

                            if(res.status==200){

                                  console.log(res);

                                  if(res.data.userList[0].POSITION_NAME=="总经理" || res.data.userList[0].POSITION_NAME=="经营副总" || res.data.userList[0].POSITION_NAME=="物资副总"
                                    || res.data.userList[0].POSITION_NAME=="生产副总" || res.data.userList[0].POSITION_NAME=="生产部长" || res.data.userList[0].POSITION_NAME=="数据中心经理"
                                    || res.data.userList[0].POSITION_NAME=="ERP专员" || res.data.userList[0].POSITION_NAME=="泵车数据文员" || res.data.userList[0].POSITION_NAME=="砼车数据文员"){

                                         $('.team_off .carTeam em').html(res.data.deptList[0].departmentName);

                                          var deptId = res.data.deptList[0].id;

                                           offStream.deptId = deptId;
                              
                                         $('.team_off .carTeam em').after('<i class="iconfont icon-jiantou-copy-copy downMenu"></i>');

                                         var dataCarList = res.data.deptList;

                                         for(var i = 0;i<dataCarList.length;i++){

                                           offStream.teamList[i] = {};

                                           offStream.teamList[i].value = dataCarList[i].id;

                                           offStream.teamList[i].text = dataCarList[i].departmentName;
                                         }
                                         console.log(offStream.teamList);

                                         $('.offList').attr('href','off_stream_detail.html?companyId='+offStream.companyId+'&depId='+offStream.deptId);

                                         console.log(offStream.companyId,offStream.deptId);
                                         //获取停运信息
                                          $.ajax({

                                             url:ipAdress+'/weixin/TimeEntry/MoreStopTransport',

                                             data:{
                                                 companyId:offStream.companyId,

                                                 deptId:offStream.deptId
                                             },
                                             dataType:'json',

                                             type:'POST',

                                              headers: {
                                                     Accept: "application/json; charset=utf-8"
                                               },

                                             success:function(res){

                                               if(res.status==200){

                                                    console.log(res);

                                                    if(res.data.status=='401'){

                                                          common.maskConfirm("该车队配置账单日错误");
                                                    }

                                                    else{

                                                        $('.times .value em').html(res.data.tysize.tingyunsize);

                                                        $('.times .value span').html(res.data.tysize.tingyunzong);

                                                        $('.oneDay').html(res.data.tysize.tingyun1size);

                                                        $('.twoDay').html(res.data.tysize.tingyun2size);

                                                        $('.threeDay').html(res.data.tysize.tingyun3size);

                                                        $('.fourMoreDay').html(res.data.tysize.tingyun4size);

                                                    }
                                                } 
                                             }
                                         })  

                                  }//如果是总经理
                                  else{

                                     $('.team_off .carTeam').find('.downMenu').remove();

                                     $('.team_off .carTeam em').html(res.data.userList[0].DEPARTMENT_NAME);

                                          var deptId = res.data.userList[0].DEPARTMENT_ID;

                                          console.log(offStream.companyId,deptId);

                                          offStream.deptId = deptId;
                                      
                                           //获取停运信息
                                      
                                          console.log(offStream.companyId,offStream.deptId);

                                          $.ajax({

                                             url:ipAdress+'/weixin/TimeEntry/MoreStopTransport',

                                             data:{
                                                 companyId:offStream.companyId,

                                                 deptId:offStream.deptId
                                             },
                                             dataType:'json',

                                             type:'POST',

                                              headers: {
                                                     Accept: "application/json; charset=utf-8"
                                               },

                                             success:function(res){

                                                if(res.status==200){

                                                    console.log(res);

                                                    if(res.data.status=='401'){

                                                        common.maskConfirm("该车队配置账单日错误");
                                                    }
                                                    else{

                                                        $('.times .value em').html(res.data.tysize.tingyunsize);

                                                        $('.times .value span').html(res.data.tysize.tingyunzong);

                                                        $('.oneDay').html(res.data.tysize.tingyun1size);

                                                        $('.twoDay').html(res.data.tysize.tingyun2size);

                                                        $('.threeDay').html(res.data.tysize.tingyun3size);

                                                        $('.fourMoreDay').html(res.data.tysize.tingyun4size);
                                                    }    
                                                }    
                                             }
                                         })

                                      
                                    }//如果不是总经理
                      }//如果车队获取到了
                     }//success
                 })//获取车队  
               
            },
            selectTeam:function(){

                  $('.team_off').on('tap','.carTeam',function(){

                      console.log($(this).find('i').hasClass('downMenu'));

                      if($(this).find('i').hasClass('downMenu')){

                            var teamPicker = new mui.PopPicker();

                            teamPicker.setData(offStream.teamList);
                            //picker.pickers[0].setSelectedIndex(4, 2000);
                            teamPicker.pickers[0].setSelectedValue('2', 500);

                            teamPicker.show(function(SelectedItem) {

                                 console.log(SelectedItem);

                                 offStream.deptId = SelectedItem[0].value;

                                 $('.carTeam em').html(SelectedItem[0].text);

                                  console.log(offStream.companyId,offStream.deptId);

                                  $.ajax({

                                             url:ipAdress+'/weixin/TimeEntry/MoreStopTransport',

                                             data:{
                                                 companyId:offStream.companyId,

                                                 deptId:offStream.deptId
                                             },
                                             dataType:'json',

                                             type:'POST',

                                              headers: {
                                                     Accept: "application/json; charset=utf-8"
                                               },

                                             success:function(res){

                                                if(res.status==200){

                                                    console.log(res);

                                                    if(res.data.status=='401'){

                                                        common.maskConfirm("该车队配置账单日错误");
                                                    }
                                                    else{

                                                        $('.times .value em').html(res.data.tysize.tingyunsize);

                                                        $('.times .value span').html(res.data.tysize.tingyunzong);

                                                        $('.oneDay').html(res.data.tysize.tingyun1size);

                                                        $('.twoDay').html(res.data.tysize.tingyun2size);

                                                        $('.threeDay').html(res.data.tysize.tingyun3size);

                                                        $('.fourMoreDay').html(res.data.tysize.tingyun4size);
                                                    }    
                                                }    
                                             }
                                   })

                            })
                    }

               })
            },
            toStreamDetail:function(){

               $('.offDay_table').on('click','.offList',function(){

                   var index= $(this).data('index');

                   console.log(index);

                   $(this).attr('href','off_stream_detail.html?companyId='+offStream.companyId+'&deptId='+offStream.deptId+'&index='+index);
               })
            }
          }

          offStream.init();

	})
})	