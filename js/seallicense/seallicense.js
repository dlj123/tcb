

 require(['../config'], function(config) {
 	require(['jquery', 'common', 'fastclick'], function($, common, fastclick) {
 		var ipAdress = common.ipAdress;
 		var tokenId = sessionStorage.getItem("tokenId"),
 			companyId = "",
 			companyId02 = "",
 			deptId = "",
 			userId = "",
 			files=[],
 			length=[],
 			personInit = {},attachments=[];
 		var seallicense = {
 			init: function() {
         				common.tab('.top_tab ul li', '.content_panel');
         				common.focusBug();
         				this.dataInit();
         				this.companyInit();
         				this.deptInit();
         				this.positionInit();
         				this.personInit();
         				this.seallicenseSubmit();
         				this.seallicenseRecord();
         				//this.typeSelect();
         				this.sealSelect();
         				this.licenseSelect();
         				this.rewardDate(); //使用时间
         				this.returnDate(); //归还时间
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
 				console.log(path);
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
 						console.log(res);
 						personInit.companyId = res.tmCompany.id;
 						personInit.deptId = res.userList[0].DEPARTMENT_ID;
 						personInit.positonId = res.userList[0].POSITION_ID;
 						personInit.userId = res.tmUser.id;
 						$('.certifyNum').attr('data-userid', res.tmUser.id);
 					}
 				})
 			},

 			rewardDate: function() { // 使用日期
 				 var rewardDatePicker;
 				$('.rewardDate_wrap').on('tap', function() {
                   
 					if(!rewardDatePicker){
		 					mui.init();
		 					 rewardDatePicker = new mui.DtPicker({
		 						type: "datetime",
		 						beginDate: new Date(2009, 04, 25),
		 						endDate: new Date(),
		 						labels: ['年', '月', '日', '时', '分'],

		 					});
		 					rewardDatePicker.show(function(rs) {
		 						$('#rewardDate').html(rs.text);
		 						rewardDatePicker.dispose();
		 					})
 					}
 				})
 			},

 			returnDate: function() { // 归还时间
 				$('.returnDate_wrap').on('tap', function() {

 					var returnDatePicker;
 					if(!returnDatePicker){
		 					mui.init();
		 					var returnDatePicker = new mui.DtPicker({
		 						type: "datetime",
		 						beginDate: new Date(2009, 04, 25),
		 						endDate: new Date(new Date().getTime()+1000*60*60*24*7),
		 						labels: ['年', '月', '日', '时', '分'],

		 					});
		 					returnDatePicker.show(function(rs) {
		 						$('#returnDate').html(rs.text);
		 						returnDatePicker.dispose();
		 					})
 					}
 				})
 			},

 			sealSelect: function() { // 印章类型
 				$('.sealType_wrap').on('click', function() {
 					var sealListNew = [],
 						sealPicker;
 					$.ajax({
 						url: ipAdress + '//weixin/oaDoc/stampType',
 						data: {
 							tokenId: tokenId,
 							companyId: companyId
 						},
 						dataType: 'json',
 						type: 'POST',
 						success: function(res) {
 							//alert(JSON.stringify(res))
 							console.log(res);
 							if(res.status == 200) {
 								var sealList = res.data.stampTypeList;
 								for(var i = 0; i < sealList.length; i++) {
 									sealListNew[i] = {};
 									sealListNew[i].value = sealList[i].codeId;
 									sealListNew[i].text = sealList[i].codeDesc;
 								}
 								console.log(sealListNew);
 								if(!sealPicker){
		 								sealPicker = new mui.PopPicker();
		 								sealPicker.setData(sealListNew);
		 								sealPicker.pickers[0].setSelectedIndex(0, 1000);
		 								sealPicker.show(function(getSelectedItems) {
		 									console.log(getSelectedItems[0]);
		 									$('#sealType').html(getSelectedItems[0].text);
		 									$('.sealType_wrap').attr('data-codeid', getSelectedItems[0].value);
		 									sealPicker.dispose();
		 								})
 								}
 							} else if(res.status == 401) {
 								common.maskConfirm('服务器内部错误！');
 							}
 						}
 					})
 				})
 			},

 			licenseSelect: function() { // 证照类型
 				$('.licenseType_wrap').on('click', function() {
 					var licenseListNew = [],
 						licensePicker;
 					$.ajax({
 						url: ipAdress + '//weixin/oaDoc/cardType',
 						data: {
 							tokenId: tokenId,
 							companyId: companyId
 						},
 						dataType: 'json',
 						type: 'POST',
 						success: function(res) {
 							//alert(JSON.stringify(res))
 							console.log(res);
 							if(res.status == 200) {
 								var licenseList = res.data.cardTypeList;
 								for(var i = 0; i < licenseList.length; i++) {
 									licenseListNew[i] = {};
 									licenseListNew[i].value = licenseList[i].codeId;
 									licenseListNew[i].text = licenseList[i].codeDesc;
 								}
 								console.log(licenseListNew);
 								if(!licensePicker){
	 								licensePicker = new mui.PopPicker();
	 								licensePicker.setData(licenseListNew);
	 								licensePicker.pickers[0].setSelectedIndex(0, 1000);
	 								licensePicker.show(function(getSelectedItems) {
	 									console.log(getSelectedItems[0]);
	 									$('#licenseType').html(getSelectedItems[0].text);
	 									$('.licenseType_wrap').attr('data-codeid', getSelectedItems[0].value);
	 									licensePicker.dispose();
	 								})
 								}
 							} else if(res.status == 401) {
 								common.maskConfirm('服务器内部错误！');
 							}
 						}
 					})
 				})
 			},

 			//初始化公司
 			companyInit: function() {
 				$('.company_wrap').on('click', function() {
 					var companyListNew = [],
 						companyPicker;
 					$.ajax({
 						url: ipAdress + '/weixin/oaDoc/getCompanyList',
 						data: {
 							companyId: companyId
 						},
 						dataType: 'json',
 						type: 'POST',
 						success: function(res) {
 							console.log(res);
 							if(res.status == 200) {
 								var companyList = res.data.companyList;
 								for(var i = 0; i < companyList.length; i++) {
 									companyListNew[i] = {};
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
	 									$('.dept_wrap').attr('data-companyid', getSelectedItems[0].value);
	 									companyPicker.dispose();
	 									$('#department').html("请选择");
	 									$('#position').html("请选择");
	 									$('#user').html("请选择");
	 								})
 								}
 							} else if(res.status == 401) {
 								common.maskConfirm('服务器内部错误！');
 							}
 						}
 					})
 				})
 			},
 			//初始化部门
 			deptInit: function() {
 				var deptListNew = [];
 				$('.dept_wrap').on('click', function() {
 					companyId02 = $(this).attr('data-companyid');
 					console.log(companyId02);
 					if(!companyId02) {
 						mui.alert('请选择公司之后再选择部门');
 					} else {
 						console.log(companyId02);
 						$.ajax({
 							url: ipAdress + '/weixin/staffLeave/getDeptList',
 							data: {
 								companyId: companyId02
 							},
 							dataType: 'json',
 							type: 'POST',
 							success: function(res) {
 								console.log(res);
 								if(res.status == 200) {
 									var deptList = res.data.deptList,deptPicker;
 									for(var i = 0; i < deptList.length; i++) {
 										deptListNew[i] = {};
 										deptListNew[i].value = deptList[i].id;
 										deptListNew[i].text = deptList[i].departmentName;
 									}
 									console.log(deptListNew);
 									if(!deptPicker){
	 									deptPicker = new mui.PopPicker();
	 									deptPicker.setData(deptListNew);
	 									deptPicker.pickers[0].setSelectedIndex(0, 1000);
	 									deptPicker.show(function(getSelectedItems) {
	 										console.log(getSelectedItems[0]);
	 										$('#department').html(getSelectedItems[0].text);
	 										$('.position_wrap').attr('data-deptid', getSelectedItems[0].value);
	 										deptPicker.dispose();
	 										$('#position').html("请选择");
	 									    $('#user').html("请选择");
	 									})
 									}
 								} else if(res.status == 401) {
 									mui.alert('服务器内部错误！');
 								}
 							}
 						})
 					}
 				})
 			},

 			//初始化职位
 			positionInit: function() {
 				$('.position_wrap').on('click', function() {
 					deptId02 = $(this).attr('data-deptid');
 					if(!deptId02) {
 						mui.alert('请选择部门之后再选择职位');
 					} else {
 						console.log(deptId02);
 						$.ajax({
 							url: ipAdress + '/weixin/oaDoc/positionList',
 							data: {
 								deptId: deptId02
 							},
 							type: 'POST',
 							dataType: 'json',
 							success: function(res) {
 								console.log(res);
 								var positionListNew = [],
 									positionList = [],
 								positionList = res.data.positionList,positionPicker;
 								for(var i = 0; i < positionList.length; i++) {
 									positionListNew[i] = {};
 									positionListNew[i].text = positionList[i].POSITION_NAME;
 									positionListNew[i].value = positionList[i].POSITION_ID;
 								}
 								console.log(positionListNew);
 								if(!positionPicker){
	 								positionPicker = new mui.PopPicker();
	 								positionPicker.setData(positionListNew);
	 								positionPicker.pickers[0].setSelectedIndex(0, 1000);
	 								positionPicker.show(function(getSelectedItems) {
	 									console.log(getSelectedItems[0]);
	 									$('#position').html(getSelectedItems[0].text);
	 									$('.user_wrap').attr('data-positionid', getSelectedItems[0].value);
	 									positionPicker.dispose();
	 									$('#user').html("请选择");
	 								})
 								}
 							}
 						})
 					}
 				}) //选择职位
 			},

 			// 初始化人员
 			personInit: function() {
 				$('.user_wrap').on('click', function() {
 					positionId = $(this).attr('data-positionid');
 					if(!positionId) {
 						mui.alert('请选择职位之后再选择人');
 					} else {
 						console.log(positionId);
 						$.ajax({
 							url: ipAdress + '/weixin/oaDoc/positionAndPeopleList',
 							data: {
 								positionId: positionId
 							},
 							type: 'POST',
 							dataType: 'json',
 							success: function(res) {
 								console.log(res);
 								var personListNew = [],
 									personList = [],
 								personList = res.data.userList,personPicker;
 								for(var i = 0; i < personList.length; i++) {
 									personListNew[i] = {};
 									personListNew[i].text = personList[i].realName;
 									personListNew[i].value = personList[i].userId;
 								}
 								console.log(personListNew);
 								if(!personPicker){
	 								personPicker = new mui.PopPicker();
	 								personPicker.setData(personListNew);
	 								personPicker.pickers[0].setSelectedIndex(0, 1000);
	 								personPicker.show(function(getSelectedItems) {
	 									console.log(getSelectedItems[0]);
	 									$('#user').html(getSelectedItems[0].text);
	 									$('.user_wrap').attr('data-userid', getSelectedItems[0].value);
	 									personPicker.dispose();
	 								})
 								}
 							}
 						})
 					}
 				}) //选择人
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
 			seallicenseSubmit: function() {
 				var selectValue = function(value) {
 					if(value == "请选择") {
 						value = "";
 					}
 					return value;
 				}
 				var selectValue02 = function(value) {
 					if(value == "请输入") {
 						value = "";
 					}
 					return value;
 				}
 				$('#seallicenseSubmit').on('click', function() {
 					var wxOaDoc = {};
 					wxOaDoc.formType = 'yzzz';
 					wxOaDoc.nCompanyName = selectValue($('#company').html().trim());
 					wxOaDoc.nDeptName = selectValue($('#department').html().trim());
 					wxOaDoc.nPositionName = selectValue($('#position').html().trim());
 					wxOaDoc.nUserName = selectValue($('#user').html().trim());
 					wxOaDoc.nCompanyId = $('.company_wrap').data('companyid');
 					wxOaDoc.nDeptId = $('.department_wrap').data('deptid');
 					wxOaDoc.nUserId = $('.person_wrap').data('userid');

 					var stampType = $('.sealType_wrap').data('codeid'); // 印章类型
 					wxOaDoc.stampType = stampType;
 					var licenceType = $('.licenseType_wrap').data('codeid'); // 证照类型
 					wxOaDoc.licenceType = licenceType;

 					wxOaDoc.uses = $('.uses').val().trim(); // 用途
 					wxOaDoc.sendUnit = $('.send_unit').val().trim(); // 发往单位
 					wxOaDoc.fileName = $('.filename').val().trim(); //文件名称
 					wxOaDoc.reason = $('.reason').val().trim(); //使用事由
 					wxOaDoc.sealUse = $('.sealuse').val().trim(); // 印章用途
 					var retDate = selectValue($('#returnDate').html()); // 归还时间
 					var rewDate = selectValue($('#rewardDate').html()); // 使用时间
 					wxOaDoc.companyId = personInit.companyId;
 					wxOaDoc.deptId = personInit.deptId;
 					wxOaDoc.positionId = personInit.positonId;
 					wxOaDoc.userId = personInit.userId;

          for(var i in attachments){

            files.push(attachments[i]);
          }
 					wxOaDoc.wxOaDocPicList = files;
 					console.log(wxOaDoc, retDate, rewDate);
 					//if(wxOaDoc.nCompanyName &&  wxOaDoc.nDeptName && wxOaDoc.nPositionName && retDate && rewDate && wxOaDoc.nUserName && wxOaDoc.stampType && wxOaDoc.licenceType &&
 					//wxOaDoc.uses && wxOaDoc.status && wxOaDoc.sendUnit && wxOaDoc.fileName  &&  wxOaDoc.reason  &&  wxOaDoc.sealUse ){

 					if(wxOaDoc.nCompanyName.trim() == '') {
 						mui.alert('请选择公司');
 					} else if(wxOaDoc.nDeptName.trim() == '') {
 						mui.alert('请选择部门');
 					} else if(wxOaDoc.nPositionName.trim() == '') {
 						mui.alert('请选择职位');
 					} else if(wxOaDoc.nUserName.trim() == '') {
 						mui.alert('请选择人员姓名');
 					} else if(rewDate.trim() == '') {
 						mui.alert('请选择使用日期');
 					} else if(stampType == undefined) { //印章类型
 						mui.alert('请选择印章类型');
 					} else if(wxOaDoc.uses.trim() == '') {
 						mui.alert('请输入用途');
 					} else if(wxOaDoc.sendUnit.trim() == '') {
 						mui.alert('请输入发往单位');
 					} else if(wxOaDoc.fileName.trim() == '') {
 						mui.alert('请输入文件名称');
 					} else if(wxOaDoc.reason.trim() == '') {
 						mui.alert('请输入使用事由');
 					} else if(retDate.trim() == '') {
 						mui.alert('请选择归还日期');
 					} else {
 						console.log(JSON.stringify(wxOaDoc));
 						$.ajax({
 							url: ipAdress + '/weixin/oaDoc/save',
 							data: {
 								tokenId: tokenId,
 								wxOaDoc: JSON.stringify(wxOaDoc),
 								returnDate: retDate, //归还时间
 								rewardDate: rewDate, //使用时间

 							},
 							dataType: 'json',
 							type: 'POST',
 							beforeSend:function(){
                               $('#loading').css('display','block');
 							},
 							success: function(res) {
 								console.log(res);
 								var oaDocId = res.oaDocId;
 								if(res.status == 200) {
 									window.location.href = "../seallicense/seallicense_submit_success.html?companyId=" + companyId + "&oaDocId=" + oaDocId + "&formType=" + wxOaDoc.formType+"&deptId="+deptId
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

 			seallicenseRecord: function() {
 				var listHtml = "";
 				$.ajax({
 					url: ipAdress + '/weixin/oaDoc/oaDocList',
 					data: {
 						tokenId: tokenId,
 						formType: 'yzzz'
 					},
 					dataType: 'json',
 					type: 'POST',
 					success: function(res) {
 						console.log(res);
 						var seallicenseList = res.data.wxOaDocList;
 						for(var i = seallicenseList.length - 1; i >= 0; i--) {
 							listHtml += '<li class="item"><a href="seallicense_record.html?oaDocId=' + seallicenseList[i].id + '&companyId='+companyId+'&deptId='+deptId+'">';
 							listHtml += '<div class="name">' + seallicenseList[i].nCompanyName + '</div>';
 							listHtml += '<div class="leave_infos">';
 							listHtml += '<div class="time_reason">';
 							listHtml += '<p>部门：' + seallicenseList[i].nDeptName + '</p>';
 							listHtml += '<p>职位：' + seallicenseList[i].nPositionName + '</p>';
 							listHtml += '<p>人员姓名：' + seallicenseList[i].nUserName + '</p>';
 							listHtml += '<p使用时间：' + seallicenseList[i].rewardDate + '</p>';
 							// listHtml +=             '<p>印章类型：'+seallicenseList[i].stampType+'</p>';
 							// listHtml +=             '<p>证照类型：'+seallicenseList[i].licenceType+'</p>';
 							// 印章类型
 							if(seallicenseList[i].stampType == '61000001') {
 								listHtml += '<p>印章类型：公章</p>';
 							} else if(seallicenseList[i].stampType == '61000002') {
 								listHtml += '<p>印章类型：合同章</p>';
 							} else if(seallicenseList[i].stampType == '61000003') {
 								listHtml += '<p>印章类型：财务章</p>';
 							} else if(seallicenseList[i].stampType == '61000004') {
 								listHtml += '<p>印章类型：业务章</p>';
 							} else if(seallicenseList[i].stampType == '61000005') {
 								listHtml += '<p>印章类型：结算章</p>';
 							} else if(seallicenseList[i].stampType == '61000006') {
 								listHtml += '<p>印章类型：法人章</p>';
 							}
 							// 证照类型
 							if(seallicenseList[i].licenceType == '71000001') {
 								listHtml += '<p>证照类型：三证合一正副复印件</p>';
 							} else if(seallicenseList[i].licenceType == '71000002') {
 								listHtml += '<p>证照类型：道路运输许可证正副原件</p>';
 							} else if(seallicenseList[i].licenceType == '71000003') {
 								listHtml += '<p>证照类型：三证合一正副印件</p>';
 							} else if(seallicenseList[i].licenceType == '71000004') {
 								listHtml += '<p>证照类型：法人身份证复印件</p>';
 							} else if(seallicenseList[i].licenceType == '71000005') {
 								listHtml += '<p>证照类型：道路运输许可证正副复印件</p>';
 							}

 							listHtml += ' </div>';
 							if(seallicenseList[i].applyType == '60011003') {
 								listHtml += '<span class="icon check"></span>';
 							} else if(seallicenseList[i].applyType == '60011002') {
 								listHtml += '<span class="icon failIcon"></span>';
 							} else if(seallicenseList[i].applyType == '60011001') {
 								listHtml += '<span class="icon successIcon"></span>';
 							}
 							listHtml += '</div>';
 							listHtml += '</a></li>';
 						}
 						$('#seallicense_record').addClass('license_record').html(listHtml);
 					}
 				})
 			}
 		}
 		seallicense.init();
 	})
 })