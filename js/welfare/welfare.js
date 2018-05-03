 require(['../config'], function(config) {

 	require(['jquery', 'common', 'fastclick', 'mui', 'picker'], function($, common, fastclick, mui, picker) {

 		var ipAdress = common.ipAdress;

 		var tokenId = sessionStorage.getItem("tokenId"),
 			companyId = "",
 			companyId02 = "",
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
 			length,
      attachments=[];

 		var welfare = {

 			init: function() {
     				fastclick.attach(document.body);
     				common.buttontap('#welfareSubmit');
     				common.tab('.top_tab ul li', '.content_panel');
     				common.focusBug();
     				this.rewardDate();
     				this.typeSelect();
     				this.welfareInit();
     				this.welfareRecord();
     				this.welfareSubmit();
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
 			rewardDate: function() {
 				$('.rewardDate_wrap').on('tap', function() {

 					if(!welfarePicker){
	 					mui.init();
	 					var welfarePicker = new mui.DtPicker({
	 						type: "datetime",
	 						beginDate: new Date(2009, 04, 25),
	 						endDate: new Date(),
	 						labels: ['年', '月', '日', '时', '分'],

	 					});
	 					welfarePicker.show(function(rs) {
	 						$('#rewardDate').html(rs.text);
	 						welfarePicker.dispose();
	 					})
 					}
 				})
 			},
 			typeSelect: function() { //福利金类型
 				$('.welfareType_wrap').on('click', function() {
 					if(!benefitPicker){
	 					var benefitListNew = [],
	 						benefitPicker;
	 					$.ajax({
	 						url: ipAdress + '/weixin/oaDoc/benefitType',
	 						data: {
	 							tokenId: tokenId,
	 							companyId: companyId
	 						},
	 						dataType: 'json',
	 						type: 'POST',
	 						success: function(res) {
	 							console.log(res);
	 							if(res.status == 200) {
	 								var benefitList = res.data.benefitTypeList;
	 								for(var i = 0; i < benefitList.length; i++) {
	 									benefitListNew[i] = {};
	 									benefitListNew[i].value = benefitList[i].codeId;
	 									benefitListNew[i].text = benefitList[i].codeDesc;
	 								}
	 								console.log(benefitListNew);
	 								benefitPicker = new mui.PopPicker();
	 								benefitPicker.setData(benefitListNew);
	 								benefitPicker.pickers[0].setSelectedIndex(0, 1000);
	 								benefitPicker.show(function(getSelectedItems) {
	 									console.log(getSelectedItems[0]);
	 									$('#welfareType').html(getSelectedItems[0].text);
	 									$('.welfareType_wrap').attr('data-codeid', getSelectedItems[0].value);
	 									benefitPicker.dispose();
	 								})
	 							} else if(res.status == 401) {
	 								common.maskConfirm('服务器内部错误！');
	 							}
	 						}
	 					})
 					}
 				})
 			},

 			welfareInit: function() {
 				var path = window.location.search.slice(1);
 				var companyData = common.parseUrl(path);
 				companyId = companyData.companyId;
 				deptId =  companyData.deptId;
 				console.log(tokenId, companyId,deptId);
 				$.ajax({
 					url: ipAdress + '/weixin/oaDoc/page',
 					data: {
 						tokenId: tokenId,
 						companyId: companyId,
                        deptId:deptId
 					},
 					type: "POST",
 					dataType: 'json',
 					success: function(res) {
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

 						personInit.companyId = res.tmCompany.id;
 						personInit.deptId = res.userList[0].DEPARTMENT_ID;
 						personInit.positonId = res.userList[0].POSITION_ID;
 						personInit.userId = res.tmUser.id;
 						console.log(res);
 					}
 				})
 			},
 			welfareSubmit: function() {
 				$('#welfareSubmit').on('click', function() {
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
 					var wxOaDoc = {};
 					wxOaDoc.formType = 'fljsq';
 					// wxOaDoc.staffId = userId;
 					//wxOaDoc.companyId = companyId;
 					wxOaDoc.userName = staffName;
 					wxOaDoc.companyName = companyName;
 					//wxOaDoc.status = welfareType('#welfareType');// 福利金类型
 					var status = $('.welfareType_wrap').data('codeid'); // 福利金类型
 					wxOaDoc.status = status;
 					// alert($('.welfareType_wrap').data('codeid'));

 					var rewDate = selectValue($('#rewardDate').html()); // 福利金日期
 					wxOaDoc.money = $('.applyAmount').val().trim(); // 申请金额
 					wxOaDoc.rewardCause = $('.applyReason').val().trim(); // 申请原因
 					//wxOaDoc.deptId = deptId;
 					//wxOaDoc.positionId = PositionId;
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
 					wxOaDoc.turnToNumber = selectValue02($('.cardNum_wrap .cardNum').val());
 					wxOaDoc.turnToName = selectValue02($('.cardName_wrap .cardName').val());
 					console.log(tokenId, wxOaDoc.status, rewDate, wxOaDoc.money, wxOaDoc.rewardCause);
 					// if(wxOaDoc.status && rewDate && wxOaDoc.money && wxOaDoc.rewardCause){
 					var rel = /^[0-9]\d*(\.\d+)?$/; // 金额正则验证

 					var rel02 = /^[0-9]*$/;
 					if(rewDate.trim() == '') {
 						mui.alert('请选择福利日期');
 					}
 					// 申请金额
 					else if(wxOaDoc.money.trim() == '') {
 						mui.alert('请输入申请金额');
 					}
 					else if(wxOaDoc.turnToNumber.trim() == ''){
 						mui.alert('请输入打入卡号');
 					}
 					else if(!rel02.test(wxOaDoc.turnToNumber.trim())){
 						mui.alert('卡号请输入数值');
 					}
 					else if(wxOaDoc.turnToName.trim() == ''){
 						mui.alert('请输入打入姓名');
 					}
 					else if(wxOaDoc.money <= 0) {
 						mui.alert('金额必须大于0');
 					} else if(!rel.test(wxOaDoc.money.trim())) {
 						mui.alert('请输入正确的数字');
 					} else if(status == undefined) {
 						mui.alert('请选择福利金性质');
 					} else if(wxOaDoc.rewardCause.trim() == '') {
 						mui.alert('请输入申请原因');
 					} else {
 						console.log(JSON.stringify(wxOaDoc));
 						$.ajax({
 							url: ipAdress + '/weixin/oaDoc/save',
 							data: {
 								tokenId: tokenId,
 								wxOaDoc: JSON.stringify(wxOaDoc),
 								rewardDate: rewDate,

 							},
 							type: 'POST',
 							dataType: 'json',
 							  beforeSend: function () {

                                      $("#loading").css('display','block');

                                },
 							success: function(res) {
 								console.log(res);
 								var oaDocId = res.oaDocId;
 								if(res.status == 200) {
 									window.location.href = "../welfare/welfare_submit_success.html?companyId=" + companyId + "&oaDocId=" + oaDocId + "&formType=" + wxOaDoc.formType+"&deptId="+deptId
 								}
 							},
 							complete:function(){
 								$("#loading").css('display','none');
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

 			// 福利金申请记录初始化
 			welfareRecord: function() {
 				console.log(tokenId, ipAdress);
 				var listHtml = "";
 				$.ajax({
 					url: ipAdress + '/weixin/oaDoc/oaDocList',
 					data: {
 						tokenId: tokenId,
 						formType: 'fljsq'
 					},
 					dataType: 'json',
 					type: 'POST',
 					success: function(res) {
 						console.log(res);
 						var welfareList = res.data.wxOaDocList;
 						for(var i = welfareList.length - 1; i >= 0; i--) {
 							listHtml += '<li class="item"><a href="welfare_record.html?oaDocId=' + welfareList[i].id + '&companyId='+companyId+'&deptId='+deptId+'">';
 							listHtml += '<div class="name">' + welfareList[i].companyName + '</div>';
 							listHtml += '<div class="leave_infos">';
 							listHtml += '<div class="time_reason">';
 							listHtml += '<p>部门：' + welfareList[i].deptName + '</p>';
 							listHtml += '<p>人员：' + welfareList[i].userName + '</p>';
 							listHtml += '<p>福利日期：' + welfareList[i].rewardDate + '</p>';
 							listHtml += '<p>申请金额：' + welfareList[i].money + '元</p>';
 							//listHtml +=             '<p>福利金类型：<select id="benefit" style=""></select></p>';
 							if(welfareList[i].status == '51000001') {
 								listHtml += '<p>福利金类型：' + '困难求助' + '</p>';
 							} else if(welfareList[i].status == '51000002') {
 								listHtml += '<p>福利金类型：' + '婚嫁礼金' + '</p>';
 							} else if(welfareList[i].status == '51000003') {
 								listHtml += '<p>福利金类型：' + '结婚纪念金' + '</p>';
 							} else if(welfareList[i].status == '51000004') {
 								listHtml += '<p>福利金类型：' + '慰问金' + '</p>';
 							} else if(welfareList[i].status == '51000005') {
 								listHtml += '<p>福利金类型：' + '生日礼金' + '</p>';
 							}

 							listHtml += ' </div>';
 							if(welfareList[i].applyType == '60011003') {
 								listHtml += '<span class="icon check"></span>';
 							} else if(welfareList[i].applyType == '60011002') {
 								listHtml += '<span class="icon failIcon"></span>';
 							} else if(welfareList[i].applyType == '60011001') {
 								listHtml += '<span class="icon successIcon"></span>';
 							}
 							listHtml += '</div>';
 							listHtml += '</a></li>';

 						}
 						// 福利金类型动态回显
 						/*var benefitListNew=[],benefitPicker;
							                $.ajax({
							                     url: ipAdress+'/weixin/oaDoc/benefitType',
							                    data:{
							                      tokenId:tokenId,
							                      companyId:companyId
							                    },
							                    dataType:'json',
							                    type:'POST',
							                    success:function(res){
							                         console.log(res);
							                         if(res.status==200){
							                                   var benefitList = res.data.benefitTypeList;
							                                 var str="";
							                                 for(var i = 0;i<benefitList.length;i++){
							                                  benefitListNew[i]= {};
							                                  benefitListNew[i].value = benefitList[i].codeId;
							                                  benefitListNew[i].text = benefitList[i].codeDesc;							                                 
								                                 if(welfareList[i].status = benefitListNew[i].value){							                               
								                                 	 str+="<option value="+benefitListNew[i].value+">";
									                                  str+=""+benefitListNew[i].text+"";
									                                  str+="</option>";
								                                 }					                       				
							                                 }
							                                 $("#benefit").append(str);
							                                 console.log(benefitListNew);
							                             }
							                      else if(res.status==401){
							                                common.maskConfirm('服务器内部错误！');
							                             }
							                    }
							                })*/

 						$('#welfare_record').html(listHtml);

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

              }
 		}
 		welfare.init();
 	})
 })