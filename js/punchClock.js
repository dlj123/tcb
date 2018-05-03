require(['config'],function(config) {

  require(['jquery','common','fastclick'], function ($, common,fastclick) {

              var ipAdress= common.ipAdress;

              var tokenId = sessionStorage.getItem("tokenId");

              var punchClock ={

                 address:'',

                 companyId:'',

                 deptId:'',

                init:function(){

                  //common.tab('.clock_tab a','.content_panel');

                  //this.arriveClock();

                  this.currentTime();

                  this.location();

                  this.clockRecord();

                  this.arriveSubmit();

                  this.currentTime();

                  this.freshen();

                  this.getPath();

                  this.toIndex();
                 
                },

                getPath:function(){

                    var path = window.location.search.slice(1);

                        path = common.parseUrl(path);

                    this.companyId = path.companyId;

                    this.deptId = path.deptId;

                },
                toIndex:function(){
                   
                    $('.asidemenu').on('click',function(){                         

                         window.location.href="../home/index.html?companyId="+punchClock.companyId+"&deptId="+punchClock.deptId+"&btmIndex=0"
                    })
                 },
                currentTime:function(){

                  var date,year,month,day,week;

                      date = new Date();
                       
                      year = date.getFullYear();

                      month = date.getMonth() + 1;

                      day = date.getDate();

                      week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];

                      console.log(date.getDay());

                      if(month >= 1 && month <= 9){

                        month = '0'+ month;

                      }
                      if (day >= 1&&day <= 9) {

                        day =  '0' + day;
                      }
                    $('#currenTime').html(year+'.'+month+'.'+day+'&nbsp;&nbsp;&nbsp;'+week);
               },
               location:function(){

                    var map,currentPoint,goalPoint,SitePrecision,SiteLatitude;

                   map = new BMap.Map("punchClock_map");

                   map.centerAndZoom("武汉", 15); 

                    //初始化地图
                    initMap();
                    //初始化函数
                    function initMap(){
                    
                       //获取当前定位经纬度坐标
                        if (navigator.geolocation) {

                             map = new BMap.Map("punchClock_map");

                             map.centerAndZoom("武汉", 15); 

                             var geolocation = new BMap.Geolocation();    

                             var gc = new BMap.Geocoder(); 

                              geolocation.getCurrentPosition( function(r) {   //定位结果对象会传递给r变量  

                               //console.log(r,tokenId,r.point.lng,r.point.lat);

                                currentPoint =  new BMap.Point(r.point.lng, r.point.lat); 

                                map.centerAndZoom(currentPoint, 15);
           
                                map.addControl(new BMap.NavigationControl());

                                var marker = new BMap.Marker(currentPoint);   // 创建标注    
                                                
                                map.addOverlay(marker);    

                                console.log(tokenId,r.point.lng,r.point.lat);

                                 //获取定位及距离最近打卡点的距离，能否打卡的时间空间判断

                                 punchClock.lng = r.point.lng;

                                 punchClock.lat = r.point.lat;



                                  // 根据坐标得到地址描述    
                                  gc.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){     

                                      if (result){      

                                       console.log(result.address);   

                                       punchClock.address = result.address;

                                      }      
                                  });

                                  $.ajax({

                                          url:ipAdress+'/weixin/shifts/view',
                                         
                                          data:{

                                            tokenId:tokenId,

                                            SitePrecision:r.point.lng,

                                            SiteLatitude:r.point.lat

                                          },

                                          type:'POST',

                                          dataType:'json',

                                          success:function(res){

                                               console.log(res);  

                                               for(var i in res)  

                                               if(res[i]=="请重新登陆！"){

                                                  common.maskConfirm02(res[i],function(){

                                                     window.location.href="../login/login.html"

                                                  });

                                               }
                                               else if(res[i]=="该员工尚未设置班制,请联系系统管理员！"){                                                

                                                    $('#goToWorkArea').html("(签到时间段)");

                                                    $('#BackTimeArea').html("(签退时间段)");

                                                    var text01 = $('<i class="icon-cha iconfont"></i>');

                                                    $('.notice_fresh p.notice').html("");

                                                    $('.notice_fresh p.notice').append(text01).append(res[i]);

                                                    $('.arrive_btn').removeClass('normal').addClass('abnormal').html("签到"); 
                                               } 

                                            
                                              else if(res[i].shiftsId){

                                                     if(res[i].shiftsId=='40011002'){

                                                        $('#goToWorkArea').html(res.Taste.shiftsBegintime+'~'+res.Taste.shiftsBeginInterval+'(签到时间段)');

                                                        $('.clockState_list li').css('border-left','0');

                                                        $('.clockState_list li:not(:first)').css('display','none');
                                                     }
                                                     else{

                                                        $('#goToWorkArea').html(res.Taste.shiftsBegintime+'~'+res.Taste.shiftsBeginInterval+'(签到时间段)');

                                                        $('#BackTimeArea').html(res.Taste.shiftsFinishtime+'~'+res.Taste.shiftsEndInterval+'(签退时间段)');
                                                     }

                                                     if(res[i].workstatus == "3"||res[i].workstatus == "4"||res[i].workstatus == "5"||res[i].workstatus=="2"){                                              

                                                                    $('.clock_tab').attr('data-shiftsid',res.Taste.shiftsId);

                                                                    var text01 = $('<i class="icon-cha iconfont"></i>');

                                                                    $('.notice_fresh p.notice').html("");

                                                                    $('.arrive_btn').removeClass('normal').addClass('abnormal').html("签到"); 

                                                                    if(res[i].workstatus == "3"){

                                                                      $('.notice_fresh p.notice').append(text01).append("该公司尚未设置打卡地点！");

                                                                    }
                                                                    else if(res[i].workstatus == "4"){

                                                                      $('.notice_fresh p.notice').append(text01).append("暂未进入打卡范围!");

                                                                    }
                                                                    else if(res[i].workstatus == "5"){

                                                                      $('.notice_fresh p.notice').append(text01).append("暂未或已超过打卡时间!");
                                                                    }
                                                                    else if(res[i].workstatus == "2"){

                                                                      $('.notice_fresh p.notice').append(text01).append("打卡已完成!");

                                                                    }

                                                           }
                                                           else if(res[i].workstatus == "0"||res[i].workstatus == "1"){
                                                         
                                                                  if(res.Taste.workstatus=="0"){

                                                                      $('.arrive_btn').html("签到");
                                                                  }
                                                                  else if(res.Taste.workstatus=="1"){

                                                                      $('.arrive_btn').html("签退");
                                                                  }

                                                                  goalPoint = new BMap.Point(res.Taste.sitePrecision,res.Taste.siteLatitude);

                                                                 var marker02 = new BMap.Marker(goalPoint);   // 创建标注    
                                                                  
                                                                 map.addOverlay(marker02); 

                                                                  /*var polyline = new BMap.Polyline([currentPoint,goalPoint], {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});  //定义折线
                                                                  
                                                                  map.addOverlay(polyline); */    //添加折线到地图上                                                                                

                                                                 $('.clock_tab').attr('data-shiftsid',res.Taste.shiftsId);

                                                                 $('.arrive_btn').attr('data-workstatus',res.Taste.workstatus);

                                                                 $('.arrive_btn').attr('data-shiftsBegintime',res.Taste.shiftsBegintime);

                                                                 $('.arrive_btn').attr('data-shiftsBeginInterval',res.Taste.shiftsBeginInterval);

                                                                 $('.arrive_btn').attr('data-shiftsFinishtime',res.Taste.shiftsFinishtime);

                                                                 $('.arrive_btn').attr('data-shiftsEndInterval',res.Taste.shiftsEndInterval);

                                                                 $('.arrive_btn').attr('data-distance',res.Taste.distance);

                                                                 $('.arrive_btn').attr('data-beginstatus',res.Taste.beginstatus);

                                                                 $('.arrive_btn').attr('data-tmstaId',res.Taste.tmstaId);

                                                                 $('.arrive_btn').attr('data-begindatetime',res.Taste.begindatetime);

                                                                 if(res.Taste.distance<=res.Taste.attendanceDistance){

                                                                    var text02 = $('<i class="iconfont icon-gou"></i>');

                                                                    $('.notice_fresh p.notice').html("");

                                                                    $('.notice_fresh p.notice').append(text02).append('已进入签到区');

                                                                    $('.arrive_btn').removeClass('abnormal').addClass('normal');

                                                                 }
                                                           }//上班和下班的处理
                                                    }//班制的判断
                                              } //success的处理    
                          
                                       })
                            })  

                        }
                       else{
                            alert("您的浏览器版本较低或不支持，建议换浏览器查看");
                        } 
                   }
                }, 
                clockRecord:function(){


                   var formatMonth = function(target) {

                      if (target < 9) {

                          target = "0" + (target + 1);
                      }
                      else {
                          target = target + 1;
                      }
                      return target;
                  }

                   var today = new Date();

                    $('#currentMonth').html(today.getFullYear()+'-'+formatMonth(today.getMonth()));
 
               },
               freshen:function(){

                    $('.freshBtn').on('click',function(){

                         window.location.reload();

                    })
               },
               arriveSubmit:function(){
   
                 $('.arrive_btn').on('click',function(){

                    var workstatus = $(this).attr('data-workstatus'),

                     shiftsId =  $('.clock_tab').attr('data-shiftsid'),

                     shiftsBegintime = $(this).attr('data-shiftsBegintime'),

                     shiftsBeginInterval = $(this).attr('data-shiftsBeginInterval'),

                     shiftsFinishtime = $(this).attr('data-shiftsFinishtime'),

                     shiftsEndInterval = $(this).attr('data-shiftsEndInterval'),

                     distance = $(this).attr('data-distance'),

                     begindatetime = $(this).attr('data-begindatetime');

                     var Beginstatus = $(this).attr('data-beginstatus'),

                     tmstaId = $(this).attr('data-tmstaId');

                     console.log(punchClock.address,workstatus,shiftsId,shiftsBegintime,shiftsBeginInterval,shiftsFinishtime,shiftsEndInterval,distance,Beginstatus,tmstaId,begindatetime);

                     $.ajax({
                       
                          url:ipAdress+'/weixin/shifts/insert',

                          data:{

                            tokenId:tokenId,

                            address:punchClock.address,

                            workstatus:workstatus,

                            shiftsId:shiftsId,

                            shiftsBegintime:shiftsBegintime,

                            shiftsBeginInterval:shiftsBeginInterval,
                           
                            shiftsFinishtime:shiftsFinishtime,
                           
                            shiftsEndInterval:shiftsEndInterval,

                            distance: distance,

                            beginstatus:Beginstatus,

                            tmstaId:tmstaId,

                            begindatetime:begindatetime
                          },

                          dataType:'json',

                          type:'POST',

                          success:function(res){

                            console.log(res);

                             if(res.message=="签到成功"){

                                 common.maskConfirm02(res.message,function(){

                                      $('.arrive_btn').html("签退");

                                       window.location.reload();
                                 })
                              
                            }

                            else if(res.message=="签退成功"){

                                 common.maskConfirm02(res.message,function(){

                                      window.location.reload();

                                      $('.arrive_btn').html("签到").removClass("normal").addClass('absense');
                                 })
                               
                             }
                          }
                    })

                  })
                }

            }
              punchClock.init();
    })

})







      