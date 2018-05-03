require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		    var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var indexData = {

             companyId:'',

             time:'',

             deptId:'',
           
             init:function(){
              
                this.dataInit();

                this.attendanceTab();

                this.toEdite();

                this.toIndex();

             },
             toIndex:function(){

                $('.asidemenu').on('click',function(){

                    window.location.href="../home/index.html?companyId="+indexData.companyId+"&deptId="+indexData.deptId+"&btmIndex=0"
                })

             },
             dataInit:function(){

              var clockHtmlFn = function(html,item){

                  html = html || "";

                  item =  item || {};

                  html += '<tr>';

                    console.log(item.CAR_NO);

                    if(item.CAR_NO==undefined){
  
                      html +=           '<td>--</td>';
                   }
                   else{

                     html +=           '<td>'+item.CAR_NO+'</td>';

                   }
                   if(item.REAL_NAME==undefined){

                    html +=           '<td>--</td>';

                   }
                   else{

                    html +=           '<td>'+item.REAL_NAME+'</td>';

                    }
                   if(item.CODE_DESC==undefined){

                     html +=           '<td>--</td>';
                     
                   }
                   else{

                    html +=           '<td>'+item.CODE_DESC+'</td>';

                    }

                     if(item.ID && item.userId){

                                        if(item.STATUS ==50011001){

                                          html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">正常(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011002){

                                          html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">作废(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011003){

                                            html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">迟到(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011004){

                                           html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">早退(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011005){

                                           html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">迟到早退(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011006){

                                           html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">旷工(可点击)</a></td>';
                                        }
                     }
                     else if(item.userId){

                                         html +=        '<td><a href="attendanceEdite.html?userId='+item.userId+'&record=2&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">未打卡(可点击)</a></td>';
                      }


                    html +=  '</tr>';

                    return html;
             }

             	var path = window.location.search;

             	    path = path.slice(1);

             	    path = common.parseUrl(path);

                  console.log(path);

                  this.companyId = path.companyId;

                  this.deptId = path.deptId;

                  var dateFormate= function(value){

                      var _value = value;

                      if(_value<=9){

                        return '0'+_value;

                      }
                      else{

                        return _value;
                      }

                  }

                  var today = new Date();

                  console.log(today);

                  var yesterday = new Date(today.getTime() - 86400000);

                  console.log(yesterday);

                  var year = yesterday.getFullYear();

                  var month = dateFormate(yesterday.getMonth()+1);

                  var day = dateFormate(yesterday.getDate());

                  var hour = dateFormate(yesterday.getHours());

                  var minute = dateFormate(yesterday.getMinutes());

                  var second = dateFormate(yesterday.getSeconds());

                  console.log(year,month,day,hour,minute,second);

                  this.time = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second

                  $('.team_time .time em').html(year+'-'+month+'-'+day);

                  //获取车队
                  console.log(tokenId,indexData.companyId);

                  $.ajax({

                      url:ipAdress+'/weixin/oaDoc/attendancePage',

                      data:{

                          tokenId:tokenId,

                          companyId:indexData.companyId,

                          deptId:indexData.deptId
                      },
                      dataType:'json',

                      type:'POST',

                       headers:{

                              Accept: "application/json; charset=utf-8"
                       },
                       
                       success:function(res){

                         if(res.status==200){

                             console.log(res);

                            indexData.deptId = res.data.userList[0].DEPARTMENT_ID;

                            $('.team_time .team em').html(res.data.userList[0].DEPARTMENT_NAME);

                            //获取已打卡
                            console.log(indexData.companyId,indexData.deptId,indexData.time);

                            $.ajax({

                               url:ipAdress+'/weixin/oaDoc/hitCard',

                               data:{

                                 companyId:indexData.companyId,

                                 deptId:indexData.deptId,

                                 clockTime:indexData.time
                               },

                               dataType:'json',

                               type:'POST',

                               headers:{

                                      Accept: "application/json; charset=utf-8"
                               },

                                beforeSend: function () {

                                     // $("#loading").css('display','block');

                                },

                               success:function(res){

                                   console.log(res);

                                   var clockListOne = res.data.hitCardList,

                                   clockListTwo = res.data.hitCardTwoList,clockHtmlOne="",clockHtmlTwo="",clockHtml="";  

                                   console.log(clockListTwo);                         

                                    if(clockListOne.length>0){

                                     for(var i = 0;i<clockListOne.length;i++){

                                      clockHtmlOne = clockHtmlFn(clockHtmlOne,clockListOne[i]);

                                      } 
                                      console.log(clockHtmlOne); 
                                    }
                                    if(clockListTwo.length>0){

                                      for(var i = 0;i<clockListTwo.length;i++){

                                        clockHtmlTwo = clockHtmlFn(clockHtmlTwo,clockListTwo[i]);

                                      }
                                      console.log(clockHtmlTwo);

                                     }

                                   clockHtml = clockHtmlOne+clockHtmlTwo;

                                   $('.normal_table tbody').append(clockHtml);         
                               },
                               complete: function () {

                                  console.log('dd');

                                  // $("#loading").css('display','none');
                               }
                            })  

                          }
                       }
                  })
                  

             },
             attendanceTab:function(){

                   var clockHtmlFn = function(html,item){

                  
                                    html += '<tr>';

                                      if(item.CAR_NO==undefined){
                    
                                        html +=           '<td>--</td>';
                                     }
                                     else{

                                       html +=           '<td>'+item.CAR_NO+'</td>';

                                     }
                                     if(item.REAL_NAME==undefined){

                                      html +=           '<td>--</td>';

                                     }
                                     else{

                                      html +=           '<td>'+item.REAL_NAME+'</td>';

                                      }
                                     if(item.CODE_DESC==undefined){

                                       html +=           '<td>--</td>';
                                       
                                     }
                                     else{

                                      html +=           '<td>'+item.CODE_DESC+'</td>';

                                      }

                                      if(item.ID && item.userId){

                                        if(item.STATUS ==50011001){

                                          html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">正常(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011002){

                                          html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">作废(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011003){

                                            html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">迟到(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011004){

                                           html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">早退(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011005){

                                           html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">迟到早退(可点击)</a></td>';
                                        }
                                        else if(item.STATUS ==50011006){

                                           html +=           '<td><a href="attendanceEdite.html?attendanceId='+item.ID+'&record=1&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">旷工(可点击)</a></td>';
                                        }
                                      }
                                      else if(item.userId){

                                         html +=        '<td><a href="attendanceEdite.html?userId='+item.userId+'&record=2&companyId='+indexData.companyId+'&deptId='+indexData.deptId+'">未打卡(可点击)</a></td>';
                                      }

                                      html +=  '</tr>';

                                      return html;
                }

                $('.attendanceView_tab li').on('click',function(){

                   var i = $(this).index();

                   $(this).addClass('active').siblings('li').removeClass('active');

                   $('.content_panel').css('display','none');

                    console.log(indexData.companyId,indexData.deptId,indexData.time);

                   if(i == 0){

                              $.ajax({

                               url:ipAdress+'/weixin/oaDoc/hitCard',

                               data:{

                                 companyId:indexData.companyId,

                                 deptId:indexData.deptId,

                                 clockTime:indexData.time

                               },
                               dataType:'json',

                               type:'POST',

                               headers:{

                                      Accept: "application/json; charset=utf-8"
                               },

                                beforeSend: function () {

                                      $("#loading").css('display','block');

                                },

                               success:function(res){

                                   console.log(res);

                                   var clockListOne = res.data.hitCardList,

                                   clockListTwo = res.data.hitCardTwoList,clockHtmlOne="",clockHtmlTwo="",clockHtml=""; 

                                   if(clockListOne.length>0){

                                     for(var i = 0;i<clockListOne.length;i++){

                                      clockHtmlOne = clockHtmlFn(clockHtmlOne,clockListOne[i]);

                                      }  
                                    }
                                    if(clockListTwo.length>0){

                                      for(var i = 0;i<clockListTwo.length;i++){

                                        clockHtmlTwo = clockHtmlFn(clockHtmlTwo,clockListTwo[i]);

                                      }

                                     }
                                      clockHtml = clockHtmlOne+clockHtmlTwo;

                                      $('.normal_table tbody').html(clockHtml);         
                               },
                               complete: function () {

                                   $("#loading").css('display','none');
                               }
                            }) 

                           $('.content_panel').eq(0).show();
                   }
                   else if(i == 1){

                         $.ajax({

                               url:ipAdress+'/weixin/oaDoc/noHitCard',

                               data:{

                                 companyId:indexData.companyId,

                                 deptId:indexData.deptId,

                                 clockTime:indexData.time

                               },
                               dataType:'json',

                               type:'POST',

                               headers:{

                                      Accept: "application/json; charset=utf-8"
                               },

                                beforeSend: function () {

                                      $("#loading").css('display','block');

                                },

                               success:function(res){

                                   console.log(res);

                                   var clockListOne = res.data.noHitCardList,

                                   clockListTwo = res.data.noHitCardTwoList,clockHtmlOne="",clockHtmlTwo="",clockHtml="";

                                   if(clockListOne.length>0){

                                    for(var i = 0;i<clockListOne.length;i++){

                                      clockHtmlOne = clockHtmlFn(clockHtmlOne,clockListOne[i]);

                                      }

                                   }

                                  if(clockListTwo.length>0){

                                    for(var i = 0;i<clockListTwo.length;i++){

                                         clockHtmlTwo = clockHtmlFn(clockHtmlTwo,clockListTwo[i]);

                                    }

                                   }

                                   clockHtml = clockHtmlOne+clockHtmlTwo;

                                   $('.absence_table tbody').html(clockHtml);          
                               },
                               complete: function () {

                                   $("#loading").css('display','none');
                               }
                            }) 

                            $('.content_panel').eq(1).show();
                   }
                })
             },
             toEdite:function(){
                    $('')
             }
        }
        indexData.init();
    })
})        