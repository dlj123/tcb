require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		  var ipAdress = common.ipAdress;

      var tokenId = sessionStorage.getItem("tokenId"),btmIndex = "";

		 var data = {

		 	companyId:"",

      deptId:"",

		 	teamList:[],

		 	init:function(){

		 		this.btmMenuInit();

		 		this.dataInit();

		 		this.teamSelect();

         this.dispatch();

         this.toIndex();
		 	},

      toIndex:function(){

         $('.asidemenu').on('click',function(){

              window.location.href="../home/index.html?companyId="+data.companyId+'&deptId='+data.deptId+'&btmIndex=0';
         })

      },
    
		 	btmMenuInit:function(){

		          var path = window.location.search.slice(1);

		                  var companydata = common.parseUrl(path);

		                  btmIndex = companydata.btmIndex;

		                  console.log(companydata);
		                  
		                  $.ajax({

		                     url:ipAdress+'/weixin/index',

		                     data:{

		                       tokenId:tokenId,

		                       companyId:companydata.companyId,

                                 
		                     },

		                     async: false,

		                     type:'POST',

		                     dataType:'json',

		                     success:function(res){

		                         console.log(res);
		             
		                         var footMenu =res.menuBottom,menuBottomH="",companyName="",companyid="";
		                   
		                        console.log(companydata.companyId);
		                          
		                      //底部菜单
		                    for(var i = 0;i<footMenu.length;i++){
		                      
		                             var bottomMenu = footMenu[i].subMenuList;
		                           
		                             for(var j = 0;j < bottomMenu.length;j++){
		                                              
		                               if(btmIndex==j){

		                                         menuBottomH += '<li class="active">';
		                                      }

		                                     else{
		                                         menuBottomH += '<li class="">';
		                                     }
		                                      menuBottomH +=   '<a href='+bottomMenu[j].menuUrl+'?btmIndex='+j+'&companyId='+companydata.companyId+'&deptId='+companydata.deptId+'>';

		                                      if(btmIndex==j){

		                                          menuBottomH +=      '<span style="background: url(../../images/'+bottomMenu[j].menuIcon+') no-repeat left top;background-size: contain;"></span>';
		                                      }
		                                      else{
		                                          menuBottomH +=      '<span style="background: url(../../images/'+bottomMenu[j].menuNoneIcon+') no-repeat left top;background-size: contain;"></span>';
		                                      }
		                                      menuBottomH +=      '<p>'+bottomMenu[j].menuName+'</p>';

		                                      menuBottomH +=    '</a>';
		                                      
		                                      menuBottomH +=  '</li>';
		                                                    
		                                }
		                      }

		                      $('#footMenu').html(menuBottomH);

		                     }
		                  })
		        },
             dataInit:function(){

             	//时间获取

              

             	var monthFormate = function(value){

                    if(value<=9){

                    	return "0"+value;
                    }
                    else{

                    	return value;
                    }
             	}

                 var today = new Date();

                 var year = today.getFullYear();

                 var month = monthFormate(today.getMonth()+1);

                 var day = monthFormate(today.getDate()-1);

                 console.log(year,month,day);

                 $('.time_carteam .time em').html(month+'月'+day);

                 var path = window.location.search;

                     path = path.slice(1);

                     path = common.parseUrl(path);

                     data.companyId = path.companyId;

                     console.log(data.companyId,tokenId);

                     //车队获取

                $.ajax({

                     	url:ipAdress+'/weixin/TimeEntry/page',

                     	data:{

                           tokenId:tokenId,

                           companyId:data.companyId,

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

                                         $('.time_carteam .carTeam em').html(res.data.deptList[0].departmentName);
                              
                                         $('.time_carteam .carTeam em').after('<i class="iconfont icon-jiantou-copy-copy downMenu"></i>');

                                          var dataCarList = res.data.deptList;

                                          var deptId = res.data.deptList[0].id;

                                          data.deptId = deptId;

                                          $('.data_menus .oil_wear').attr('href','oil_wear.html?companyId='+data.companyId+'&deptId='+data.deptId);

                                          $('.data_menus .capacity').attr('href','capacity.html?companyId='+data.companyId+'&deptId='+data.deptId);

                                          $('.data_menus .offStream').attr('href','off_stream.html?companyId='+data.companyId+'&deptId='+data.deptId); 

                                          $('.data_menus .order').attr('href','building.html?companyId='+data.companyId+'&deptId='+data.deptId);

                                         for(var i = 0;i<dataCarList.length;i++){

                                         	 data.teamList[i] = {};

                                         	 data.teamList[i].value = dataCarList[i].id;

                                         	 data.teamList[i].text = dataCarList[i].departmentName;
                                         }
                                         console.log(data.teamList);
                                         //方量和趟
                                         $.ajax({

                                                    url:ipAdress+'/weixin/TimeEntry/CapacityAndTripTime',

                                                    data:{

                                                          companyId:data.companyId,

                                                          deptId:data.deptId
                                                          
                                                    },

                                                    dataType:'json',

                                                    type:'POST',

                                                    headers: {

                                                         Accept: "application/json; charset=utf-8"

                                                    },
                                                    success:function(response){

                                                        if(response.status==200){

                                                                 console.log(response);

                                                                 if(response.data.status==401){

                                                                    common.maskConfirm("该车队配置账单日错误");

                                                                    $('.areas_times .areas span').html("0");

                                                                    $('.areas_times .areas em').html("0");

                                                                    $('.areas_times .times span').html("0");

                                                                    $('.areas_times .times em').html("0");
                                                                 }

                                                                else{

                                                                  $('.areas_times .areas span').html(response.data.Taste.locamountsumzong);

                                                                  $('.areas_times .areas em').html(response.data.Taste.locamountsum);

                                                                  $('.areas_times .times span').html(response.data.Taste.transfertripsumzong);

                                                                  $('.areas_times .times em').html(response.data.Taste.transfertripsum);
                                                              }

                                                    }
                                              }//success
                                        })//方量ajax
                                        //油耗
                                        console.log(data.companyId,data.deptId);
                                        $.ajax({

                                            url:ipAdress+'/weixin/TimeEntry/oilConsumption',

                                            data:{

                                                 companyId:data.companyId,

                                                 deptId:data.deptId
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

                                                    $('.data_menus .oil_wear p em').html("0");

                                                 }
                                                  else if(res.data.oilNum=="undefined"){

                                                       $('.data_menus .oil_wear p em').html("0");
                                                  }
                                                 else{

                                                   $('.data_menus .oil_wear p em').html(res.data.oilNum);

                                                 }

                                               }
                                            }
                                        }) 
                                        //运能
                                        $.ajax({

                                            url:ipAdress+'/weixin/TimeEntry/transportCapacityDayAmount',

                                            data:{

                                                 companyId:data.companyId,

                                                 deptId:data.deptId
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

                                                       $('.data_menus .capacity p em').html("0");
                                                    }
                                                    else if(res.data.transportDayAmountList[0].transportCapacity=="undefined"){

                                                       $('.data_menus .capacity p em').html("0");
                                                    }
                                                    else{

                                                        $('.data_menus .capacity p em').html(res.data.transportDayAmountList[0].transportCapacity);
                                                    }
                                               }
                                            }
                                        }) 
                                      //停运
                                      console.log(data.companyId,data.deptId);
                                      
                                      $.ajax({

                                          url:ipAdress+'/weixin/TimeEntry/MoreStopTransport',

                                          data:{

                                               companyId:data.companyId,

                                               deptId:data.deptId 
                                          },
                                          dataType:'json',

                                          type:'POST',

                                           headers:{

                                                Accept: "application/json; charset=utf-8"
                                           },

                                          success:function(res){

                                            if(res.status==200){

                                                console.log(res)

                                              if(res.data.status=='401'){
                                                
                                                 common.maskConfirm("该车队配置账单日错误");

                                                 $('.data_menus .offStream p em').html("0");

                                              }
                                              else if(res.data.tysize=="undefined"){

                                                 $('.data_menus .offStream p em').html("0"); 
                                              }
                                              else{

                                                 $('.data_menus .offStream p em').html(res.data.tysize.tingyunsize); 
                                              }
                                              
                                            }
                                          }
                                      })
                             		  }//如果是总经理
                             		  else{

                             		  	 $('.time_carteam .carTeam').find('.downMenu').remove();

                             		  	 $('.time_carteam .carTeam em').html(res.data.userList[0].DEPARTMENT_NAME);

                                          //方量和趟次获取

                                          var deptId = res.data.userList[0].DEPARTMENT_ID;

                                          console.log(data.companyId,deptId);

                                          data.deptId = deptId;

                                           $('.data_menus .oil_wear').attr('href','oil_wear.html?companyId='+data.companyId+'&deptId='+data.deptId);
                                            
                                            $('.data_menus .capacity').attr('href','capacity.html?companyId='+data.companyId+'&deptId='+data.deptId);

                                             $('.data_menus .offStream').attr('href','off_stream.html?companyId='+data.companyId+'&deptId='+data.deptId);
                                            
                                            $('.data_menus .order').attr('href','building.html?companyId='+data.companyId+'&deptId='+data.deptId);
                                          $.ajax({

                                                    url:ipAdress+'/weixin/TimeEntry/CapacityAndTripTime',

                                                    data:{

                                                          companyId:data.companyId,

                                                          deptId:data.deptId
                                                          
                                                    },

                                                    dataType:'json',

                                                    type:'POST',

                                                    headers: {

                                                         Accept: "application/json; charset=utf-8"

                                                    },
                                                    success:function(response){

                                                      console.log(response);

                                                        if(response.status==200){

                                                                 console.log(response);

                                                                if(response.data.status == "401"){

                                                                   common.maskConfirm("该车队配置账单日错误");

                                                                    $('.areas_times .areas span').html("0");

                                                                   $('.areas_times .areas em').html("0");

                                                                   $('.areas_times .times span').html("0");

                                                                   $('.areas_times .times em').html("0");
                                                                }
                                                                                                          
                                                                else{

                                                                  $('.areas_times .areas span').html(response.data.Taste.locamountsumzong);

                                                                  $('.areas_times .areas em').html(response.data.Taste.locamountsum);

                                                                  $('.areas_times .times span').html(response.data.Taste.transfertripsumzong);

                                                                  $('.areas_times .times em').html(response.data.Taste.transfertripsum);
                                                               }

                                                    }
                                              }//success
                                        })//方量ajax
                                     
                                         //油耗
                                        console.log(data.companyId,data.deptId);

                                        $.ajax({

                                            url:ipAdress+'/weixin/TimeEntry/oilConsumption',

                                            data:{

                                                 companyId:data.companyId,

                                                 deptId:data.deptId
                                            },
                                            dataType:'json',

                                            type:'POST',

                                            headers:{

                                                  Accept: "application/json; charset=utf-8"
                                            },
                                            success:function(res){

                                              if(res.status==200){
                                                
                                                 console.log(res);

                                                 if(res.data.status=='401'|| JSON.stringify(res.data)=='{}'){

                                                      common.maskConfirm("该车队配置账单日错误");

                                                      $('.data_menus .oil_wear p em').html("0");
                                                 }
                                                 else if(res.data.oilNum=="undefined"){

                                                      $('.data_menus .oil_wear p em').html("0");
                                                 }
                                                 else

                                                   $('.data_menus .oil_wear p em').html(res.data.oilNum);

                                               }
                                            }
                                        })
                                        console.log()
                                        //运能
                                        $.ajax({

                                            url:ipAdress+'/weixin/TimeEntry/transportCapacityDayAmount',

                                            data:{

                                                 companyId:data.companyId,

                                                 deptId:data.deptId
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

                                                               $('.data_menus .capacity p em').html("0");

                                                         }
                                                         else if(res.data.transportDayAmountList[0].transportCapacity=='undefined'){

                                                              $('.data_menus .capacity p em').html("0");
                                                         }
                                                         else{

                                                           $('.data_menus .capacity p em').html(res.data.transportDayAmountList[0].transportCapacity);

                                                         }
                                                  }
                                            }
                                        }) 
                                         //停运
                                      $.ajax({

                                          url:ipAdress+'/weixin/TimeEntry/MoreStopTransport',

                                          data:{

                                               companyId:data.companyId,

                                               deptId:data.deptId 
                                          },

                                          dataType:'json',

                                          type:'POST',

                                          headers:{

                                                Accept: "application/json; charset=utf-8"
                                           },

                                          success:function(res){
                                            
                                              if(res.status==200){

                                                    console.log(res)

                                                  if(res.data.status=='401'){
                                                    
                                                     common.maskConfirm("该车队配置账单日错误");

                                                     $('.data_menus .offStream p em').html("0");

                                                  }
                                                  else if(res.data.tysize=="undefined"){

                                                     $('.data_menus .offStream p em').html("0"); 
                                                  }
                                                  else{

                                                     $('.data_menus .offStream p em').html(res.data.tysize.tingyunsize); 
                                                  }
                                              
                                            }
                                          }
                                      })
 
                                    }//如果不是总经理
                     	}//如果车队获取到了
                     }//success
                 })//获取车队
                //主菜单初始化
               
            },
            teamSelect:function(){

            	$('.time_carteam').on('tap','.carTeam',function(){

            		if($(this).find('i').hasClass('downMenu')){

            		    var teamPicker = new mui.PopPicker();

        						teamPicker.setData(data.teamList);
        						//picker.pickers[0].setSelectedIndex(4, 2000);
        						teamPicker.pickers[0].setSelectedValue('2', 500);

        						teamPicker.show(function(SelectedItem) {

        							      console.log(SelectedItem);

                            data.deptId = SelectedItem[0].value;

        							      $('.carTeam em').html(SelectedItem[0].text);

                             $('.data_menus .oil_wear').attr('href','oil_wear.html?companyId='+data.companyId+'&deptId='+data.deptId);

                             $('.data_menus .capacity').attr('href','capacity.html?companyId='+data.companyId+'&deptId='+data.deptId);

                             $('.data_menus .offStream').attr('href','off_stream.html?companyId='+data.companyId+'&deptId='+data.deptId);

                             $('.data_menus .order').attr('href','building.html?companyId='+data.companyId+'&deptId='+data.deptId);

                            //方量和趟次

                             $.ajax({

                                                    url:ipAdress+'/weixin/TimeEntry/CapacityAndTripTime',

                                                    data:{

                                                          companyId:data.companyId,

                                                          deptId:data.deptId
                                                          
                                                    },

                                                    dataType:'json',

                                                    type:'POST',

                                                    headers: {

                                                         Accept: "application/json; charset=utf-8"

                                                    },
                                                    success:function(response){

                                                      console.log(response);

                                                        if(response.status==200){

                                                                 console.log(response);

                                                                if(response.data.status == "401"){

                                                                   common.maskConfirm("该车队配置账单日错误");

                                                                   $('.areas_times .areas span').html("0");

                                                                   $('.areas_times .areas em').html("0");

                                                                   $('.areas_times .times span').html("0");

                                                                   $('.areas_times .times em').html("0");
                                                                }
                                                                                                          
                                                                else{

                                                                  $('.areas_times .areas span').html(response.data.Taste.locamountsumzong);

                                                                  $('.areas_times .areas em').html(response.data.Taste.locamountsum);

                                                                  $('.areas_times .times span').html(response.data.Taste.transfertripsumzong);

                                                                  $('.areas_times .times em').html(response.data.Taste.transfertripsum);
                                                               }

                                                    }
                                              }//success
                              })//方量ajax

                             //油耗
                             $.ajax({

                                            url:ipAdress+'/weixin/TimeEntry/oilConsumption',

                                            data:{

                                                 companyId:data.companyId,

                                                 deptId:data.deptId
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

                                                       $('.data_menus .oil_wear p em').html("0");

                                                 }
                                                 else if(res.data.oilNum=="undefined"){

                                                      $('.data_menus .oil_wear p em').html("0");
                                                 }
                                                 else{

                                                   $('.data_menus .oil_wear p em').html(res.data.oilNum);

                                                 }

                                               }
                                            }
                            }) 
                          //运能
                          $.ajax({

                              url:ipAdress+'/weixin/TimeEntry/transportCapacityDayAmount',

                              data:{
                                      companyId:data.companyId,

                                      deptId:data.deptId
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

                                                       $('.data_menus .capacity p em').html("0");

                                                  }
                                                 else if(res.data.transportDayAmountList[0].transportCapacity=="undefined"){

                                                       $('.data_menus .capacity p em').html("0");
                                                 }
                                                 else{

                                                   $('.data_menus .capacity p em').html(res.data.transportDayAmountList[0].transportCapacity);

                                                 }

                                     }
                              }
                          })    
                           //停运
                           $.ajax({

                                          url:ipAdress+'/weixin/TimeEntry/MoreStopTransport',

                                          data:{

                                               companyId:data.companyId,

                                               deptId:data.deptId 
                                          },
                                          dataType:'json',

                                          type:'POST',

                                           headers:{

                                                Accept: "application/json; charset=utf-8"
                                           },

                                          success:function(res){
                                            
                                              if(res.status==200){

                                                console.log(res)

                                              if(res.data.status=='401'){
                                                
                                                 common.maskConfirm("该车队配置账单日错误");

                                                 $('.data_menus .offStream p em').html("0");

                                              }
                                              else if(res.data.tysize=="undefined"){

                                                 $('.data_menus .offStream p em').html("0"); 
                                              }
                                              else{

                                                 $('.data_menus .offStream p em').html(res.data.tysize.tingyunsize); 
                                              }
                                              
                                            }
                                    }
                          })
        						})
					       }

            	})

            },
		 	dispatch:function(){

               $('.dispatch a').on('click',function(){

               	    $(this).css('display','none');

               	    $('.dispatch_layer').css('display','inline-block');

               	    setTimeout(

               	    	function(){

               	    		$('.dispatch_layer').css('display','none');

               	    	},1000);
               })
		 	}
		 	
		 }
		 data.init();

	})
})	