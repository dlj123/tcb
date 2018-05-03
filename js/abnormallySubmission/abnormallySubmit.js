 require(['../config'],function(config) {

	require(['jquery','common','fastclick','webuploader'], function ($, common,fastclick,webuploader) {

		      var ipAdress = common.ipAdress;

          var tokenId = sessionStorage.getItem("tokenId"),companyId="",carId="",companyId02="",deptId="",deptId02="",personInit = {},files=[],length,attachments=[];  

          var abnormallySubmit = {

          	init:function(){

              common.tab('.top_tab ul li','.content_panel');

              common.focusBug();

              this.dataInit();

          		this.companyInit();

          		this.carTeamInit();

          		this.carNumInit();

              this.personValue();

              this.startTime();

              this.delUppic();

              this.uploadPic();

              this.upAttachment();

              this.abnormallySubmitSubmit();

              this.abnormallySubmitRecord();

              this.toIndex();
            
          	},
            toIndex:function(){

              $('.asidemenu').on('click',function(){

                  window.location.href="../home/index.html?companyId="+companyId+"&deptId="+deptId+"&btmIndex=0";
              })
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

                                 if(!companyPicker){

                                  companyPicker = new mui.PopPicker();

                                  companyPicker.setData(companyListNew);

                                  companyPicker.pickers[0].setSelectedIndex(0, 1000);

                                 companyPicker.show(function(getSelectedItems) {

                                    console.log(getSelectedItems[0]);

                                    $('#company').html(getSelectedItems[0].text);

                                    $('.carTeam_wrap').attr('data-companyid',getSelectedItems[0].value);

                                    $('#carTeam').html("请选择");

                                    $('#carNum').html("请选择");

                                    $('#carPerson').html("请选择");

                                    companyPicker.dispose();

                                 })
                             } 
                             

                             }
                      else if(res.status==401){

                                common.maskConfirm('服务器内部错误！');
                             }
                    }
                })

                  

	             	       
        				 }) 
          	},
          	carTeamInit:function(){

          		var carListNew=[];

              $('.carTeam_wrap').on('click',function(){

                companyId02 = $('.carTeam_wrap').attr('data-companyid');

                 console.log(companyId02);

          				if(!companyId02){

                      mui.alert('请选择公司之后再选择车队');

			          		}
			          	else{

                    console.log(companyId02);

				          		$.ajax({

				                     url:ipAdress+'/weixin/oaDoc/getDeptList',

				                     data:{

				                       companyId:companyId02

				                     },

				                     dataType:'json',

				                     type:'POST',

				                     success:function(res){
				                        
				                        console.log(res);

				                        if(res.status==200){

				                         var carList = res.data.deptList,carTeamPicker;

                                           for(var i = 0;i<carList.length;i++){

                                           	  carListNew[i] = {};

                                           	  carListNew[i].value = carList[i].id;

                                           	  carListNew[i].text = carList[i].departmentName;
                                           }
                                           console.log(carListNew);

                                           if(!carTeamPicker){
                              
                                            carTeamPicker = new mui.PopPicker();

                    										    carTeamPicker.setData(carListNew);

                    										    carTeamPicker.pickers[0].setSelectedIndex(0, 1000);

                    										 	carTeamPicker.show(function(getSelectedItems) {

                    											      console.log(getSelectedItems[0]);

                    											      $('#carTeam').html(getSelectedItems[0].text);

                                                $('.carNum_wrap').attr('data-deptid',getSelectedItems[0].value);

                    											      carTeamPicker.dispose();   

                                                 $('#carNum').html("请选择");

                                                 $('#carPerson').html("请选择");                                             

                    										    })
                                     }
                                          

				                        }
				                        else if(res.status==401){

                                            common.maskConfirm('服务器内部错误！');
				                        }
				                     }
				          		})
				        }

          		})

          	
          	},
            carNumInit:function(){

              $('.carNum_wrap').on('click',function(){

                   deptId02 = $('.carNum_wrap').attr('data-deptid');

                   if(!deptId02){

                      mui.alert('请选择车队之后再选择车号')
                   }
                   else{

                      $.ajax({

                           url:ipAdress+'/weixin/oaDoc/getCarNo',

                           data:{

                            companyId:companyId02,

                            deptId:deptId02
                           },

                           type:'POST',

                           dataType:'json',

                           success:function(res){

                             console.log(res);

                              var carListNew = [];

                             var carList = res.data.carList,carNumPicker;

                             for(var i =0;i<carList.length;i++){

                                   carListNew[i] = {};

                                   carListNew[i].text = carList[i].carNo;

                                   carListNew[i].value = carList[i].carId;

                             }
                             console.log(carListNew);

                             if(!carNumPicker){

                              carNumPicker = new mui.PopPicker();

                              carNumPicker.setData(carListNew);

                              carNumPicker.pickers[0].setSelectedIndex(0, 1000);

                              carNumPicker.show(function(getSelectedItems) {

                                    console.log(getSelectedItems[0]);

                                    $('#carNum').html(getSelectedItems[0].text);

                                    $('.carPerson_wrap').attr('data-carid',getSelectedItems[0].value);

                                    carNumPicker.dispose();  
 
                                    $('#carPerson').html("请选择");

                              })

                            }

                           }


                      })

                   }
              })//选择车号

                
            },
             personValue:function(){             

              $('.carPerson_wrap').on('click',function(){

                    carId = $('.carPerson_wrap').attr('data-carid');

                  console.log(carId);

                  if(!carId){

                       mui.alert('请选择车号之后再选择人');

                  }
                  else{

                      $.ajax({

                        url:ipAdress+'/weixin/oaDoc/getCarByPeople',

                        data:{

                           carId:carId
                        },

                        type:'POST',

                        dataType:'json',

                        success:function(res){
                                 
                            console.log(res);

                            if(res.status==200){
                             
                               if(res.data.status=="401"){

                                  $('#carPerson').html(res.data.message);

                                }
                                else{

                                    var peopleList = res.data.peopleList,peopleListNew=[];

                                    if(!personPicker){//弹层不重复弹出

                                        var personPicker = new mui.PopPicker();

                                        for(var i = 0;i<peopleList.length;i++){

                                          peopleListNew[i] = {};

                                          peopleListNew[i].value = peopleList[i].userId;

                                          peopleListNew[i].text = peopleList[i].real_name;

                                        }

                                         personPicker.setData(peopleListNew);

                                         personPicker.show(function (selectItems) {

                                               $('#carPerson').html(selectItems[0].text);

                                               $('#carPerson').attr('data-personids',selectItems[0].value);

                                                personPicker.dispose();  

                                          })

                                      }//弹层不重复弹出

                                }
                         
                            }
                            else if(res.status==401){

                                common.maskConfirm('服务器内部错误！');

                            }
                        }
                     })
                    }
                  })
                  },
            startTime:function(){

              $('.startTime_wrap').on('click',function(){

                var startTimepicker;

                if(!startTimepicker){

                     startTimepicker = new mui.DtPicker({

                      type: "datetime",

                      beginDate: new Date(2009, 04, 25),

                      endDate: new Date(),

                      labels: ['年', '月', '日','时','分'],

                    }) 
                    startTimepicker.show(function(items) {

                        console.log(items);

                        $('#startTime').html(items.text);

                    }) 
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

                      var imgHtml="",newFile,newUrl,urlItem,item;            

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

                                                             urlItem = res.data.thumbnailFilePath3;

                                                             item = {};

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
            abnormallySubmitSubmit:function(){

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

                      wxOaDoc.nDeptName = selectValue($('#carTeam').html().trim());

                      wxOaDoc.carNo = selectValue($('#carNum').html().trim());

                      wxOaDoc.nUserName = $('#carPerson').html().trim();

                      wxOaDoc.formType ='yctj';

                      wxOaDoc.nCompanyId = $('.carTeam_wrap').data('companyid');

                      wxOaDoc.nDeptId = $('.carNum_wrap').data('deptid');

                      wxOaDoc.carId = $('.carPerson_wrap').data('carid');

                      wxOaDoc.nUserId = $('#carPerson').data('personids');

                      wxOaDoc.stopDate = selectValue02($('#stopTime_wrap').val());

                      wxOaDoc.directDamage = selectValue02($('#directDamage').val());

                      wxOaDoc.reason = selectValue02($('#reason').val());  

                      wxOaDoc.memo = selectValue02($('#memo').val());

                      wxOaDoc.companyId = personInit.companyId;

                      wxOaDoc.deptId = personInit.deptId;

                      wxOaDoc.positionId = personInit.positonId;

                      wxOaDoc.userId = personInit.userId;

                      for(var i in attachments){

                        files.push(attachments[i]);
                      }

                      wxOaDoc.wxOaDocPicList = files;

                      var startDate = selectValue($('#startTime').html());

                      console.log(wxOaDoc);

                      if(wxOaDoc.nCompanyName.trim() =='请选择' || startDate.trim() =='请选择'){

                        mui.alert('请输入完整再提交');

                      }
                      else{

                        $.ajax({

                            url:ipAdress+'/weixin/oaDoc/save',

                            data:{

                              tokenId:tokenId,

                              wxOaDoc:JSON.stringify(wxOaDoc),

                              startDate:selectValue($('#startTime').html())

                            },

                            dataType:'json',

                            type:'POST',

                            beforeSend:function(){

                                $('#loading').css('display','block');

                            },

                            success:function(res){
                               
                               console.log(res);

                               var oaDocId = res.oaDocId;

                               if (res.status=="200") {
                                
                                 window.location.href="abnormallySubmit_submit_success.html?companyId="+companyId+"&oaDocId="+oaDocId+"&formType="+wxOaDoc.formType+"&deptId="+deptId
                                  
                               }
                            },
                            complete:function(){

                              $('#loading').css('display','none');
                            }
                          })
                      }
              })
            },
            //异常提交初始化
            abnormallySubmitRecord:function(){

                console.log(tokenId,ipAdress);

                var listHtml = "";

                $.ajax({

                    url:ipAdress+'/weixin/oaDoc/oaDocList',

                    data:{

                         tokenId:tokenId,

                         formType:'yctj'
                    },

                    dataType:'json',

                    type:'POST',

                    success:function(res){
       
                      console.log(res);

                      var abnormallySubmitList = res.data.wxOaDocList;

                        for (var i = abnormallySubmitList.length-1; i >= 0; i--) {
                
                                                listHtml +='<li class="item"><a href="abnormallySubmit_record.html?oaDocId='+abnormallySubmitList[i].id+'&companyId='+companyId+'&deptId='+deptId+'">';

                                                listHtml +=   '<div class="name">'+abnormallySubmitList[i].nCompanyName+'</div>';

                                                listHtml +=         '<div class="leave_infos">';

                                                listHtml +=           '<div class="time_reason">';

                                                listHtml +=             '<p>部门：'+abnormallySubmitList[i].nDeptName+'</p>';

                                                 listHtml +=            '<p>人员：'+abnormallySubmitList[i].nUserName+'</p>';

                                                listHtml +=             '<p>发生时间：'+abnormallySubmitList[i].startDate+'</p>';

                                                listHtml +=         ' </div>';

                                                if(abnormallySubmitList[i].applyType=='60011003'){

                                                  listHtml +=          '<span class="icon check"></span>';

                                                }
                                                else if(abnormallySubmitList[i].applyType=='60011002'){

                                                  listHtml +=          '<span class="icon failIcon"></span>';

                                                }
                                                else if(abnormallySubmitList[i].applyType=='60011001'){

                                                  listHtml +=          '<span class="icon successIcon"></span>';

                                                } 
                                                listHtml += '</div>';
                                                
                                          
                                                listHtml +=  '</a></li>';
                                       
                                      }
                

                             $('#abnormallySubmit_record').html(listHtml);


                    }
                })
            }
          }
         abnormallySubmit.init();

	}) 
})	
