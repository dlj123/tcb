 require(['../config'], function(config) {

 	require(['jquery', 'common', 'fastclick', 'mui', 'picker'], function($, common, fastclick, mui, picker) {

 		var ipAdress = common.ipAdress;

 		var tokenId = sessionStorage.getItem("tokenId"),
 			companyId = "",
 			fileTypeId = "",
 			type ="",
 			deptId = "",
 			userId = "",
 			personInit = {};

 		var userId = "",
 			companyId = "",
 			staffName = "",
 			companyName = "",
 			deptId = "",
 			PositionId = "",
 			deptName = "",
 			positionName = "",
      files=[],
      length,attachments=[];

 		var archives = {
 			init: function() {
 				fastclick.attach(document.body);
 				common.buttontap('#archivesSubmit');
 				common.tab('.top_tab ul li', '.content_panel');
        common.focusBug();
 				this.fileType();
 				this.archivesType();
 				this.archivesRecord();
 				this.archivesSubmit();
 				this.dataInit();
        this.toIndex();
        this.delUppic();
        this.uploadPic();
        this.upAttachment();
 			},
      toIndex:function(){

         $('.asidemenu').on('click',function(){

                  window.location.href="../home/index.html?companyId="+companyId+"&deptId="+deptId+"&btmIndex=0";
                  
          })
      },
 			dataInit: function() {

 				var path = window.location.search;

 				path = path.slice(1);

 				path = common.parseUrl(path);

 				companyId = path.companyId;

        deptId = path.deptId;

 				$.ajax({

 					url: ipAdress + '/weixin/oaDoc/page',

 					data: {

 						tokenId: tokenId,

 						companyId: companyId,

            deptId:deptId
 					},
 					dataType: 'json',

 					type: 'POST',

 					success: function(res) {

 						personInit.companyId = res.tmCompany.id;

 						personInit.deptId = res.userList[0].DEPARTMENT_ID;

 						personInit.positonId = res.userList[0].POSITION_ID;

 						personInit.userId = res.tmUser.id;

 						console.log(res);

 					}
 				})

 			},
 			fileType: function() { //获取文案类型
 				$('.fileType_wrap').on('click', function() {

 					$.ajax({
 						url: ipAdress + '/weixin/oaDoc/recordType',
 						data: {

            },
 						dataType: 'json',
 						type: 'POST',
 						success: function(res) {
              console.log(res);
 							var recordTypeListNew = [];
 							if(res.status == 200) {
 								var recordList = res.data.recordTypeList;
 								for(var i = 0; i < recordList.length; i++) {
 									recordTypeListNew[i] = {};
 									recordTypeListNew[i].text = recordList[i].codeDesc;
 									recordTypeListNew[i].value = recordList[i].codeId;
 								}
 							}
 							fileTypePicker = new mui.PopPicker();
 							fileTypePicker.setData(recordTypeListNew);
 							fileTypePicker.pickers[0].setSelectedIndex(0, 1000);
 							fileTypePicker.show(function(getSelectedItems) {
 								$('#fileType').html(getSelectedItems[0].text);
 								$('#status').html("请选择");
 								$('.status_wrap').attr('data-fileTypeid', getSelectedItems[0].value);
 							
 								fileTypePicker.dispose();
 							})
 						}
 					})

 				}) //点击文案类型
 			},
 			archivesType: function() { //获取合同类型
 				$('.status_wrap').on('click', function() {
 					   fileTypeId = $(this).attr('data-fileTypeid');

                 console.log(fileTypeId);

                  if(!fileTypeId){

                      mui.alert('请选择文案之后再选择合同');

                    }
                  else{
 					$.ajax({
 						url: ipAdress + '/weixin/oaDoc/eachType',
 						data: {
 							type:fileTypeId
 						},
 						dataType: 'json',
 						type: 'POST',
 						success: function(res) {
              console.log(res);
 							var eachTypeListNew = [];
 							if(res.status == 200) {
 								var eachList = res.data.eachTypeList,archivesTypePicker;
 								for(var i = 0; i < eachList.length; i++) {
 									eachTypeListNew[i] = {};
 									eachTypeListNew[i].text = eachList[i].codeDesc;
 									eachTypeListNew[i].value = eachList[i].codeId;
 								}
 							}
              if(!archivesTypePicker){
   							archivesTypePicker = new mui.PopPicker();
   							archivesTypePicker.setData(eachTypeListNew);
   							archivesTypePicker.pickers[0].setSelectedIndex(0, 1000);
   							archivesTypePicker.show(function(getSelectedItems) {
   								$('.status_wrap').attr('data-codeid', getSelectedItems[0].value);
   								$('#status').html(getSelectedItems[0].text);
   								archivesTypePicker.dispose();
   							})
               } 
 						}
 					})
 					

					}
 				}); //点击合同
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
 			archivesSubmit: function() {
 				$('#archivesSubmit').on('click', function() {
 					var wxOaDoc = {};
 					wxOaDoc.formType = 'dagl';
 					wxOaDoc.userName = staffName;
 					wxOaDoc.companyName = companyName;
 					var fileType = $('.status_wrap').data('filetypeid'); // 文案类型
 					var status = $('.status_wrap').data('codeid'); // 合同类型
 					wxOaDoc.status = status;
					wxOaDoc.fileType = fileType;

          console.log(status,fileType);
 					wxOaDoc.title = $('.title').val().trim(); // 档案标题
 					wxOaDoc.memo = $('.memo').val().trim(); // 档案内容
 					wxOaDoc.deptName = deptName;
 					wxOaDoc.position = positionName;
 					wxOaDoc.companyId = personInit.companyId;
 					wxOaDoc.deptId = personInit.deptId;
 					wxOaDoc.positionId = personInit.positonId;
 					wxOaDoc.userId = personInit.userId;

          for(var i in attachments){
            files.push(attachments[i]);
          }
          wxOaDoc.wxOaDocPicList = files;
 					console.log(tokenId, wxOaDoc);
 					//if(wxOaDoc.status && wxOaDoc.title &&wxOaDoc.memo ){
 					if(wxOaDoc.title.trim() == '') {
 						mui.alert('请输入标题');
 					} else if(wxOaDoc.memo.trim() == '') {
 						mui.alert('请输入内容');
 					} else if(status == undefined) {
 						mui.alert('请选择合同类型');
 					} else {
 						console.log(JSON.stringify(wxOaDoc));
 						$.ajax({
 							url: ipAdress + '/weixin/oaDoc/save',
 							data: {
 								tokenId: tokenId,
 								wxOaDoc: JSON.stringify(wxOaDoc)
 							},
 							type: 'POST',
 							dataType: 'json',
              beforeSend:function(){
                $('#loading').css('display','block');
              },
 							success: function(res) {
 								console.log(res);
 								var oaDocId = res.oaDocId;
 								if(res.status == 200) {
 									window.location.href = "../archives/archives_submit_success.html?companyId=" + companyId + "&oaDocId=" + oaDocId + "&formType=" + wxOaDoc.formType+"&deptId="+deptId
 								}else{
 									window.location.href = "../archives/archives_submit_fail.html?companyId=" + companyId +"&formType=" + wxOaDoc.formType+"&deptId="+deptId

 								}
 							},
              complete:function(){
                $('#loading').css('display','none');
              }
 						})
 					}
 				})
 			},
 			/*}
		               	   	  }
		               	   })
                       }
                     else{
                          mui.alert("请填写完整再提交");
		              }   	   
               })
			},*/

 			// 行政文案记录初始化
 			archivesRecord: function() {
 				var listHtml = "";
 				$.ajax({
 					url: ipAdress + '/weixin/oaDoc/oaDocList',
 					data: {
 						tokenId: tokenId,
 						formType: 'dagl'
 					},
 					dataType: 'json',
 					type: 'POST',
 					success: function(res) {
 						var archivesList = res.data.wxOaDocList;
 						for(var i = archivesList.length - 1; i >= 0; i--) {
 							listHtml += '<li class="item"><a href="archives_record.html?oaDocId=' + archivesList[i].id + '&companyId='+companyId+'&deptId='+deptId+'">';
 							//listHtml +=   '<div class="name">'+archivesList[i].deptName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+archivesList[i].userName+'</div>';
 							listHtml += '<div class="name">' + archivesList[i].companyName + '</div>';
 							listHtml += '<div class="leave_infos">';
 							listHtml += '<div class="time_reason">';
 							//listHtml +=             '<p>部门：'+archivesList[i].deptName+'</p>';
 							listHtml += '<p>' + archivesList[i].userName + '</p>';
 							listHtml += '<p>标题：' + archivesList[i].title + '</p>';
 							listHtml += '<p>内容：' + archivesList[i].memo + '</p>';
 							if(archivesList[i].status == '31000001') {
 								listHtml += '<p>合同类型：' + '轮胎合同' + '</p>';
 							} else if(archivesList[i].status == '31000002') {
 								listHtml += '<p>合同类型：' + '租房合同' + '</p>';
 							} else if(archivesList[i].status == '31000003') {
 								listHtml += '<p>合同类型：' + '对外联系函' + '</p>';
 							} else if(archivesList[i].status == '31000004') {
 								listHtml += '<p>合同类型：' + '其他' + '</p>';
 							} else if(archivesList[i].status == '31000005') {
 								listHtml += '<p>合同类型：' + '购房合同' + '</p>';
 							} else if(archivesList[i].status == '31000006') {
 								listHtml += '<p>合同类型：' + '外来联系函' + '</p>';
 							} else if(archivesList[i].status == '31000007') {
 								listHtml += '<p>合同类型：' + '生产合同' + '</p>';
 							} else if(archivesList[i].status == '31000008') {
 								listHtml += '<p>合同类型：' + '油料合同' + '</p>';
 							} else if(archivesList[i].status == '31000009') {
 								listHtml += '<p>合同类型：' + '管理合同' + '</p>';
 							} else if(archivesList[i].status == '31000010') {
 								listHtml += '<p>合同类型：' + '股东合同' + '</p>';
 							} else if(archivesList[i].status == '31000011') {
 								listHtml += '<p>合同类型：' + '红头合同' + '</p>';
 							}
 							listHtml += ' </div>';

 							if(archivesList[i].applyType == '60011003') {
 								listHtml += '<span class="icon check"></span>';

 							} else if(archivesList[i].applyType == '60011002') {

 								listHtml += '<span class="icon failIcon"></span>';

 							} else if(archivesList[i].applyType == '60011001') {

 								listHtml += '<span class="icon successIcon"></span>';

 							}
 							listHtml += '</div>';

 							listHtml += '</a></li>';

 						}

 						$('#archives_record').addClass('license_record').html(listHtml);

 					}
 				})
 			}

 		}
 		archives.init();
 	})
 })