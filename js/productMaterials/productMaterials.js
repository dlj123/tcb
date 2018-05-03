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
      files = [],
      length,attachments=[];

 		var productMaterials = {

 			init: function() {
 				fastclick.attach(document.body);
 				common.buttontap('#productMaterialsSubmit');
 				common.tab('.top_tab ul li', '.content_panel');
        common.focusBug();
 				this.productMaterialsInit();
 				this.productMaterialsRecord();
 				this.productMaterialsSubmit();
 				this.typeSelect();
        this.delUppic();
        this.uploadPic();
        this.upAttachment();
        this.toIndex();
 			},
      toIndex:function(){

          $('.asidemenu').on('click',function(){

                  window.location.href="../home/index.html?companyId="+companyId+"&deptId="+deptId+"&btmIndex=0";
                  
              })
      },

 			// 使用类别
 			typeSelect: function() {
 				$('.useType_wrap').on('click', function() {
 					var useListNew = [],
 						benefitPicker;
 					$.ajax({
 						url: ipAdress + '/weixin/oaDoc/useType',
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
 								var useList = res.data.recordTypeList;
 								for(var i = 0; i < useList.length; i++) {
 									useListNew[i] = {};
 									useListNew[i].value = useList[i].codeId;
 									useListNew[i].text = useList[i].codeDesc;
 								}
 								console.log(useListNew);
 								benefitPicker = new mui.PopPicker();
 								benefitPicker.setData(useListNew);
 								benefitPicker.pickers[0].setSelectedIndex(0, 1000);
 								benefitPicker.show(function(getSelectedItems) {
 									console.log(getSelectedItems[0]);
 									$('#useType').html(getSelectedItems[0].text);
 									$('.useType_wrap').attr('data-codeid', getSelectedItems[0].value);
 									benefitPicker.dispose();
 								})
 							} else if(res.status == 401) {
 								common.maskConfirm('服务器内部错误！');
 							}
 						}
 					})
 				})
 			},

 			productMaterialsInit: function() {
 				var path = window.location.search.slice(1);
 				var companyData = common.parseUrl(path);
 				companyId = companyData.companyId;

 				deptId = companyData.deptId;
 				console.log(tokenId, companyId);
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
 						//deptId = res.userList[0].DEPARTMENT_ID;
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
 			productMaterialsSubmit: function() {
 				$('#productMaterialsSubmit').on('click', function() {
 					var wxOaDoc = {};
 					wxOaDoc.formType = 'scwzcg';
 					wxOaDoc.userName = staffName;
 					wxOaDoc.companyName = companyName;
 					wxOaDoc.title = $('.title').val().trim(); // 标题
 					var status = $('.useType_wrap').data('codeid'); // 使用类别
 					wxOaDoc.status = status;
 					wxOaDoc.productName = $('.productName').val().trim(); //物品名称
 					wxOaDoc.modelType = $('.modelType').val().trim(); //规格型号
 					wxOaDoc.quantity = $('.quantity').val().trim(); //数量
 					wxOaDoc.payee = $('.payee').val().trim(); //单位
 					wxOaDoc.price = $('.price').val().trim(); //单价
 					wxOaDoc.money = $('.money').val().trim(); //金额
 					wxOaDoc.memo = $('.memo').val().trim(); //备注
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
 					console.log(tokenId, wxOaDoc.title, wxOaDoc.carNo, wxOaDoc.status, wxOaDoc.productName, wxOaDoc.modelType, wxOaDoc.quantity, wxOaDoc.payee, wxOaDoc.price, wxOaDoc.money, wxOaDoc.memo);
 					var re = /^[0-9]*[1-9][0-9]*$/; // 数量正则验证
 					var rel = /^[0-9]\d*(\.\d+)?$/; // 单价、金额正则验证
 					if(wxOaDoc.title.trim() == '') {
 						mui.alert('请输入标题');
 					} else if(status == undefined) { //使用类别
 						mui.alert('请选择使用类别');
 					} else if(wxOaDoc.productName.trim() == '') {
 						mui.alert('请输入物品名称');
 					} else if(wxOaDoc.modelType.trim() == '') {
 						mui.alert('请输入规格型号');
 					} else if(wxOaDoc.quantity.trim() == '') {
 						mui.alert('请输入数量');
 					} else if(!re.test(wxOaDoc.quantity.trim())) {
 						mui.alert('数量请输入正整数');
 					} else if(wxOaDoc.payee.trim() == '') {
 						mui.alert('请输入单位');
 					} else if(wxOaDoc.price.trim() == '') {
 						mui.alert('请输入单价');
 					} else if(wxOaDoc.price <= 0) {
 						mui.alert('单价必须大于0');
 					} else if(!rel.test(wxOaDoc.price.trim())) {
 						mui.alert('单价请输入正确的数字');
 					} else if(wxOaDoc.money.trim() == '') {
 						mui.alert('请输入金额');
 					} else if(wxOaDoc.money <= 0) {
 						mui.alert('金额必须大于0');
 					} else if(!rel.test(wxOaDoc.money.trim())) {
 						mui.alert('请输入正确的数字');
 					} else if(wxOaDoc.memo.trim() == '') {
 						mui.alert('请输入备注');
 					}
 					else {
 						console.log(JSON.stringify(wxOaDoc));
 						$.ajax({
 							url: ipAdress + '/weixin/oaDoc/save',
 							data: {
 								tokenId: tokenId,
 								wxOaDoc: JSON.stringify(wxOaDoc),
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
 									window.location.href = "../productMaterials/productMaterials_submit_success.html?companyId=" + companyId + "&oaDocId=" + oaDocId + "&formType=" + wxOaDoc.formType+"&deptId="+deptId
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

 			//生产物质采购申请记录初始化
 			productMaterialsRecord: function() {
 				console.log(tokenId, ipAdress);
 				var listHtml = "";
 				$.ajax({
 					url: ipAdress + '/weixin/oaDoc/oaDocList',
 					data: {
 						tokenId: tokenId,
 						formType: 'scwzcg'
 					},
 					dataType: 'json',
 					type: 'POST',
 					success: function(res) {
 						console.log(res);
 						var productMaterialsList = res.data.wxOaDocList;
 						for(var i = productMaterialsList.length - 1; i >= 0; i--) {
 							listHtml += '<li class="item"><a href="productMaterials_record.html?oaDocId=' + productMaterialsList[i].id + '&companyId='+companyId+'&deptId='+deptId+'">';
 							//listHtml +=   '<div class="name">' +productMaterialsList[i].companyName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+productMaterialsList[i].deptName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+productMaterialsList[i].userName+'</div>';
 							listHtml += '<div class="name">' + productMaterialsList[i].companyName + '</div>';
 							listHtml += '<div class="leave_infos">';
 							listHtml += '<div class="time_reason">';
 							listHtml += '<p>部门：' + productMaterialsList[i].deptName + '</p>';
 							listHtml += '<p>人员：' + productMaterialsList[i].userName + '</p>';
 							listHtml += '<p>物品名称：' + productMaterialsList[i].productName + '</p>';
 							listHtml += '<p>申请金额：' + productMaterialsList[i].money + '元</p>';
 							if(productMaterialsList[i].status == '81000001') {
 								listHtml += '<p>使用类别：自损配件</p>';
 							} else if(productMaterialsList[i].status == '81000002') {
 								listHtml += '<p>使用类别：保养材料</p>';
 							} else if(productMaterialsList[i].status == '81000003') {
 								listHtml += '<p>使用类别：低耗配件</p>';
 							}

 							listHtml += ' </div>';
 							if(productMaterialsList[i].applyType == '60011003') {
 								listHtml += '<span class="icon check"></span>';
 							} else if(productMaterialsList[i].applyType == '60011002') {
 								listHtml += '<span class="icon failIcon"></span>';
 							} else if(productMaterialsList[i].applyType == '60011001') {
 								listHtml += '<span class="icon successIcon"></span>';
 							}
 							listHtml += '</div>';
 							listHtml += '</a></li>';
 						}
 						$('#productMaterials_record').addClass('license_record').html(listHtml);
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
                         })

                             
                    })

              }
 		}
 		productMaterials.init();
 	})
 })