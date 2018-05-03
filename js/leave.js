require(['config'],function(config) {

	require(['jquery','common','fastclick','mui','picker'], function ($, common,fastclick,mui,picker) {

          var ipAdress = common.ipAdress;

          var tokenId = sessionStorage.getItem("tokenId");

          var userId = "",companyId="",staffName="",companyName="",deptId="",PositionId="",deptName="",positionName="",files = [],length,attachments=[];

          var leave = {

               init:function(){
                   fastclick.attach(document.body);
                   common.buttontap('#leaveSubmit');
                   common.tab('.top_tab ul li','.content_panel');
                   common.focusBug();
                   this.startTime();
                   this.typeSelect();
                   this.endTime();
                    this.sumDate();
                    this.delPerson('.approver_list li:not(.last)');
                    this.delPerson('.coper_list li:not(.last)');
                    this.uploadPic();
                    this.inputAutoWidth();
                    this.leaveInit();
                    this.leaveSubmit();
                    this.leaveRecord();
                    this.delUppic();
                    this.upAttachment();
                    this.toIndex();
               },
               toIndex:function(){

                  $('.asidemenu').on('click',function(){
                      window.location.href="../home/index.html?companyId="+companyId+"&deptId="+deptId+"&btmIndex=0";
                  })
               },
               startTime:function(){

                   

                   $('.startTime_wrap').on('tap',function(){
                    var startPicker;
                    if(!startPicker){
                        mui.init();
                        startPicker = new mui.DtPicker({
                          "type": "date",
                          "labels":["年", "月", "日",],
                          "beginDate":new Date(2009,1,1),
                          "endDate":new Date(new Date().getTime()+1000*60*60*24*14)
                        });
                      
                       startPicker.show(function(rs) {

                          $('#startTime').html(rs.text);

                          startPicker.dispose();
                         })
                      }
                   })
                },
                endTime:function(){
                  
                  $('.endTime_wrap').on('tap',function(){
                    var endPicker;
                    if(!endPicker){
                      mui.init();
                      endPicker = new mui.DtPicker({
                        "type": "date",
                        "labels":["年", "月", "日",],
                        "beginDate":new Date(2009,1,1),
                        "endDate":new Date(new Date().getTime()+1000*60*60*24*365)
                     });
                     endPicker.show(function(rs) {
                
                        $('#endTime').html(rs.text);
                        endPicker.dispose();
                       })
                     }
                   })
                },
                typeSelect:function(){

                 

                  
                   $('.leaveType_wrap').on('tap',function(){

                       var typePicker;

                      if(!typePicker){
                            typePicker = new mui.PopPicker();
                            typePicker.setData([{
                              value: '70011001',
                              text: '事假'
                            },{
                              value: '70011002',
                              text: '病假' 
                            }]);
                           typePicker.show(function(items){
                             $('#leaveType').html(items[0].text);
                           })
                       } 
                   })
                },             
               sumDate:function(){
                
                var startTime,endTime,s1,s2,total,day;
                   $('.leaveDays_wrap #leaveDays').on('focus',function(){
                     mui.init();
                     startTime =  new Date($('#startTime').html());
                        endTime =  new Date($('#endTime').html());
                        s1 = startTime.getTime();
                        s2 = endTime.getTime();
                        total = (s2-s1) / 1000;
                        //console.log(startTime,endTime);
                        day = parseInt(total / (24*60*60));
                        if(day>0){
                          $(this).val(day+'天');
                        }
                        else{
                            mui.alert('开始时间或结束时间选择有误，<br>请重新选择','提示','确定');
                            return;
                        }
                   })
                },

               delPerson:function(ele){
                   
                  var timeOutEvent = 0;

                  var longPress = function(t){
                          
                          timeOutEvent = 0;

                           $(ele).eq(t).find('.delIcon').css('display','block');

                           $(ele).eq(t).attr('allowDel','1');
                           //删除
                           $(ele).eq(t).on('touchstart',function(){

                                  if($(this).attr('allowDel')=='1'){

                                      $(this).remove();
                                  }
                           })
                   }

                   $(ele).on({
                          touchstart: function(e) {
                              
                              var index = $(this).index();
                              console.log($(this),index);
                              // 将当前元素的索引作为参数进行传递"
                              timeOutEvent = setTimeout(longPress(index), 800);
                              e.preventDefault();
                          },
                          touchmove: function() {
                              clearTimeout(timeOutEvent);
                              timeOutEvent = 0;
                          },
                          touchend: function() {
                              clearTimeout(timeOutEvent);
                              return false;
                          }
                      })
               },
               delUppic:function(){

                   var btnArray = ['取消', '确定'];  

                 $('#fileList').on('click','span.del',function(){

                        var that = $(this);

                        var index = $(this).parents('li').index();

                        console.log(index);

                        mui.confirm("确定删除吗？","提示信息",btnArray,function(e){

                            if (e.index == 1) {  

                                 files.splice(index,1);

                                 console.log(files);

                                 length = files.length;

                                 $('.addpics_tit span em').html(length);

                                 that.parents('li').css('display','none');

                               } 

                        });
                    })

                  $('#upAttacnList').on('click','li a',function(){

                        var that = $(this);

                        var index = $(this).parents('li').index();

                        console.log(index);
                        
                        mui.confirm("确定删除吗？","提示信息",btnArray,function(e){

                            if (e.index == 1) {  

                                 attachments.splice(index,1);

                                 that.parents('li').css('display','none');
                               
                            } 

                        });
                  })
               },
               //上传图片
               uploadPic:function(){

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


                $('#upImgInput').on('change',function(){

                      var imgHtml="",newFile,newUrl;            

                      newFile = this.files;

                      var formData = new FormData();
             
                      for (var i = 0; i < newFile.length; i++) {

                              console.log(newFile[i]);

                              if (!newFile[i].name.match(/.jpg|.jpeg|.gif|.png|.bmp/i)){　　//判断所选文件格式  

                                  common.maskConfirm("上传的图片格式不正确，请重新选择");

                               }  
                               if(newFile.length>9){

                                  return false;
                               }
                              else{

                                 function dataURLtoFile(dataurl, filename) {//将base64转换为文件
                                      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                                      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                                      while(n--){
                                          u8arr[n] = bstr.charCodeAt(n);
                                      }
                                      return new File([u8arr], filename, {type:mime});
                                  }

                                   // 压缩图片需要的一些元素和对象
                                    var reader = new FileReader(),
                                    //创建一个img对象
                                        img = new Image();

                                    // 选择的文件对象
                                    var file = newFile[i];

                                    // 缩放图片需要的canvas
                                    var canvas = document.createElement('canvas');
                                    var context = canvas.getContext('2d');
                                     // base64地址图片加载完毕后

                                      img.onload = function() {
                                          // 图片原始尺寸
                                          var originWidth = this.width;
                                          var originHeight = this.height;
                                          // 最大尺寸限制，可通过国设置宽高来实现图片压缩程度
                                          var maxWidth = 800,
                                              maxHeight = 800;
                                          // 目标尺寸
                                          var targetWidth = originWidth,
                                              targetHeight = originHeight;
                                          // 图片尺寸超过400x400的限制
                                          if(originWidth > maxWidth || originHeight > maxHeight) {
                                              if(originWidth / originHeight > maxWidth / maxHeight) {
                                                  // 更宽，按照宽度限定尺寸
                                                  targetWidth = maxWidth;
                                                  targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                                              } else {
                                                  targetHeight = maxHeight;
                                                  targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                                              }
                                          }
                                          // canvas对图片进行缩放
                                          canvas.width = targetWidth;
                                          canvas.height = targetHeight;
                                          // 清除画布
                                          context.clearRect(0, 0, targetWidth, targetHeight);
                                          // 图片压缩
                                          context.drawImage(img, 0, 0, targetWidth, targetHeight);
                                          /*第一个参数是创建的img对象；第二个参数是左上角坐标，后面两个是画布区域宽高*/
                                          //压缩后的图片base64 url
                                          /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/jpeg';
                                           * qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92*/
                                          newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式



                                          console.log(newUrl,newFile[i]);

                                          newUrl = dataURLtoFile(newUrl,file.name);

                                           formData.append('picPathFile',newUrl);

                                             $.ajax({

                                                 url:ipAdress+'/weixin/oaDoc/getUploadPhoto',

                                                 data:formData,

                                                 type:'POST',

                                                 dataType: 'json',

                                                 cache: false,                      // 不缓存

                                                 processData: false,                // 告诉jQuery不要去处理发送的数据

                                                 contentType: false,               // 告诉jQuery不要去设置Content-Type请求头

                                                 /*beforeSend:function(){

                                                 }*/

                                                 success:function(res){

                                                    console.log(res);

                                                    if(JSON.stringify(res.data)!=="{}"){

                                                      var urlItem = res.data.thumbnailFilePath3;

                                                          var item = {};

                                                              item.picPath = urlItem;

                                                              item.fileType = "0";

                                                              item.fileName = file.name;

                                                            files.push(item);   

                                                            length = files.length;

                                                            $('.addpics_tit span em').html(length);                                                       
                                               
                                                            imgHtml = '<li>'+

                                                                        '<div class="pic">'+

                                                                            '<img src="'+urlItem+'" alt="" title="">'+

                                                                            '<span class="del">'+

                                                                                '<i class="delIcon iconfont icon-guanbi"></i>'+

                                                                            '</span>'+

                                                                        '</div>'+

                                                                    '</li>';

                                                            $('#last').before(imgHtml);
                                                    }
                                                 }
                                                 
                                                })


                                      };

                                      // 文件base64化，以便获知图片原始尺寸
                                      reader.onload = function(e) {
                                          img.src = e.target.result;
                                      };
                                
                                   
                                          // 选择的文件是图片
                                     if(newFile[i].type.indexOf("image") == 0) {

                                              reader.readAsDataURL(newFile[i]);
                                      }                                                                                              
                               
                             }
                        }
             
                })
  
              },
              upAttachment:function(){

                    $('#upAttacnBtn_wrap input[type=file]').on('change',function(){

                          console.log(this.files[0]);

                          var newAttachment = this.files[0];

                          var formData02 = new FormData();

                          formData02.append('picPathFile',newAttachment);

                          $.ajax({

                                        url:ipAdress+'/weixin/oaDoc/getUploadPhoto',

                                        data:formData02,

                                        type:'POST',

                                        dataType: 'json',

                                        cache: false,                      // 不缓存

                                        processData: false,                // 告诉jQuery不要去处理发送的数据

                                        contentType: false,               // 告诉jQuery不要去设置Content-Type请求头

                                        success:function(res){

                                             console.log(res);

                                             if(JSON.stringify(res.data)!=="{}"){

                                             var itemUrl = res.data.thumbnailFilePath3,item = {};

                                             item.picPath=itemUrl;

                                             item.fileType = "1";

                                             item.fileName = newAttachment.name;
 
                                             attachments.push(item);

                                             $list = $('#upAttacnList');

                                             $list.append( '<li>' +

                                                '<p><a href="'+item.picPath+'">' + newAttachment.name + '</a></p>' +

                                                '<a href="javascript:;">删除</a>' +

                                             '</li>' );

                                           }

                                        }
                         })

                             
                    })

              },
               inputAutoWidth:function(){

                 var textWidth = function(text){ 

                      var sensor = $('<pre>'+ text +'</pre>').css({display: 'none'}); 

                      $('body').append(sensor); 

                      var width = sensor.width();

                      sensor.remove(); 

                      return width;
                  };
                  $(".topSear_txt").unbind('keydown').bind('keydown', function(){

                      $(this).width(textWidth($(this).val()));

                  });
               },
              leaveInit:function(){

                 var path = window.location.search.slice(1);

                 var companyData = common.parseUrl(path);

                     companyId = companyData.companyId;

                      deptId = companyData.deptId;

                 console.log(tokenId,companyId,deptId);
                 
                  $.ajax({

                    url:ipAdress+'/weixin/staffLeave/page',

                    data:{

                      tokenId:tokenId,

                      companyId:companyId,

                      deptId:deptId

                    },

                    type:"POST",

                    dataType:'json',

                    success:function(res){
  
                      console.log(res);

                      staffName = res.tmUser.realName;
  
                      companyName = res.userList[0].COMPANY_NAME;

                      deptName = res.userList[0].DEPARTMENT_NAME;

                      positionName = res.userList[0].POSITION_NAME;

                      userId = res.tmUser.id;

                      PositionId = res.userList[0].POSITION_ID;

                      $('.driverName').html(staffName);
                      
                      $('.companyName').html(companyName);

                      $('.deptName').html(deptName);

                      $('.positionName').html(positionName);

                    }
                    
                  })
              },
              leaveSubmit:function(){

                var formData = new FormData();

                $('#leaveSubmit').on('click',function(){

                   var leaveType = function(ele){

                          if($(ele).html()=="" || $(ele).html().trim()=='请选择'){

                             return "";
                          }
                          else if($(ele).html().trim()=="事假"){

                              return '70011001';

                          }
                          else if ($(ele).html().trim()=="病假") {

                              return '70011002';
                          }
                    }
                    var selectValue = function(ele){

                        if($(ele).html()=="" || $(ele).html().trim()=='请选择'){

                             return "";
                          }
                        else{

                          return $(ele).html().trim();
                        }
                    }

                     var wxStaffLeave = {};

                     wxStaffLeave.staffId = userId;

                     wxStaffLeave.companyId = companyId;

                     wxStaffLeave.staffName = staffName;

                     wxStaffLeave.companyName = companyName;

                     wxStaffLeave.status = leaveType('#leaveType');

                     startTime = selectValue('#startTime');

                     endTime = selectValue('#endTime');

                     leaveDay = $('#leaveDays').val();

                     wxStaffLeave.leaveDay = leaveDay.slice(0,leaveDay.length-1);

                     wxStaffLeave.memo = $('.leaveMark').val().trim();

                     wxStaffLeave.deptId = deptId;

                     wxStaffLeave.positionId = PositionId;

                     wxStaffLeave.deptName = positionName;

                     wxStaffLeave.positionName = positionName;

                     for(var i in attachments){

                       files.push(attachments[i]);
                     }

                     wxStaffLeave.wxStaffLeavePicList = files

                     //wxStaffLeave.wxStaffLeavePicList = files.concat(attachments);

                     //wxStaffLeave.wxStaffLeavePicList = files.push.apply(files,attachments);

                     console.log(wxStaffLeave.status,startTime,endTime,wxStaffLeave.leaveDay);

                     if(wxStaffLeave.status && startTime && endTime && wxStaffLeave.leaveDay){

                      wxStaffLeave = JSON.stringify(wxStaffLeave);

                      console.log(wxStaffLeave,startTime,endTime);

                      $.ajax({

                            url:ipAdress+'/weixin/staffLeave/save',

                            data:{

                              wxStaffLeave:wxStaffLeave,

                              startTime:startTime,

                              endTime:endTime
                            },

                           type:'POST',

                           dataType:'json',

                            beforeSend: function () {

                               $("#loading").css('display','block');

                            },
                           success:function(res){

                               console.log(res);

                               console.log(companyId);

                               var leaveId = res.leaveId;                            

                                if(res.status==200){

                                    window.location.href="leave_submit_success.html?leaveId="+leaveId+"&companyId="+companyId+'&deptId='+deptId;

                                }
                                else if(res.status==401){

                                    window.location.href="leave_submit_fail.html?companyId="+companyId+'&deptId='+deptId;
                                }
                            },
                            complete:function(){

                               $("#loading").css('display','none');
                            }
                         })
                     }
                     else{
                      
                          common.maskConfirm('请填写完整再提交！！');
                    }
                })
              },
              leaveRecord:function(){

                            $.ajax({

                                    url:ipAdress+'/weixin/staffLeave/staffLeaveList',

                                    data:{

                                      tokenId:tokenId

                                    },
                                    type:'POST',

                                    dataType:'json',

                                    success:function(res){

                                      console.log(res);

                                      var leaveRecordList = res.staffLeaveList,listHtml="";

                                      var timeValue = function(value){

                                           value = value.slice(0,10);

                                           value = value.replace(/-/g,":");

                                           return value;
                                           
                                           console.log(value);
                                      }

                                      for (var i = leaveRecordList.length-1; i >= 0; i--) {
                
                                                listHtml +='<li class="item"><a href="leave_record.html?leaveId='+leaveRecordList[i].id+'&companyId='+companyId+'&deptId='+deptId+'">';

                                                listHtml +=   '<div class="name">'+leaveRecordList[i].staffName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+leaveRecordList[i].deptName+'</div>';

                                                listHtml +=         '<div class="leave_infos">';

                                                listHtml +=           '<div class="time_reason">';

                                                listHtml +=             '<p>请假时间：'+timeValue(leaveRecordList[i].beginTime)+'-'+timeValue(leaveRecordList[i].overTime)+'</p>';

                                                listHtml +=             '<p>请假天数：'+leaveRecordList[i].leaveDay+'天</p>';

                                                if(leaveRecordList[i].status=='70011001'){

                                                  listHtml +=             '<p>请假类型：'+'事假'+'</p>';

                                                   }
                                                else if(leaveRecordList[i].status=='70011002'){

                                                      listHtml +=             '<p>请假类型：'+'病假'+'</p>';

                                                       
                                                }
                                                  listHtml +=         ' </div>';

                                                if(leaveRecordList[i].applyType=='60011003'){

                                                  listHtml +=          '<span class="icon check"></span>';

                                                }
                                                else if(leaveRecordList[i].applyType=='60011002'){

                                                  listHtml +=          '<span class="icon failIcon"></span>';

                                                }
                                                else if(leaveRecordList[i].applyType=='60011001'){

                                                  listHtml +=          '<span class="icon successIcon"></span>';

                                                } 
                                                listHtml += '</div>';
                                                
                                          
                                                listHtml +=  '</a></li>';
                                       
                                      }


                                      $('#leave_record').html(listHtml);

                                    }
                                  })                   
              }

          }
          leave.init();
         
     
     })
})




