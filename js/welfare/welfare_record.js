require(['../config'], function(config) {

	require(['jquery', 'common', 'fastclick', 'mui'], function($, common, fastclick, mui) {

		var ipAdress = common.ipAdress;

		//var tokenId = sessionStorage.getItem("tokenId");
		var tokenId = sessionStorage.getItem("tokenId"),
			companyId = "",
			companyId02 = "",
			deptId = "",
			userId = "",
			personInit = {};

		var welfareRecord = {

			init: function() {

				this.recordInit();

				this.toIndex();

			},
			toIndex:function(){

                var path = window.location.search.slice(1);

                    path = common.parseUrl(path);

                     $('.asidemenu').on('click',function(){

                        window.location.href="../home/index.html?companyId="+path.companyId+"&deptId="+path.deptId+"&btmIndex=0";

                    })

			},
			recordInit: function() {
				var path = window.location.search;
				path = path.slice(1);
				path = common.parseUrl(path);
				console.log(path);
				var getValue = function(value) {
					// 福利金类型动态回显
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
								var str = "";
								for(var i = 0; i < benefitList.length; i++) {
									benefitListNew[i] = {};
									benefitListNew[i].value = benefitList[i].codeId;
									benefitListNew[i].text = benefitList[i].codeDesc;
									if(value = benefitListNew[i].value) {
										str = "" + benefitListNew[i].text + "";
									}
								}
								//alert(str)
							} else if(res.status == 401) {
								common.maskConfirm('服务器内部错误！');
							}
						}
					})
					
				}
				var getStatus = function(value) {

					if(value == '51000001') {

						return "困难求助";

					} else if(value == '51000002') {

						return "婚嫁礼金";

					} else if(value == '51000003') {

						return "结婚纪念金";

					} else if(value == '51000004') {

						return "慰问金";

					} else if(value == '51000005') {

						return "生日礼金";

					}
				}
				$.ajax({
					url: ipAdress + '/weixin/oaDoc/view',
					data: {
						oaDocId: path.oaDocId
					},
					type: 'POST',
					dataType: 'json',
					success: function(res) {
						console.log(res);
						if(res.status == 200) {
							 var picList = res.data.oaDocPicList,picHtml="",fileList= res.data.oaDocFileList,fileHtml="";
							$('.company').html(res.data.wxOaDoc.companyName); //公司
							$('.department').html(res.data.wxOaDoc.deptName); // 部门
							$('.position').html(res.data.wxOaDoc.position); // 职位
							$('.name').html(res.data.wxOaDoc.userName); //姓名
							$('.rewardDate').html(res.data.wxOaDoc.rewardDate); // 福利日期
							$('.applyAmount').html(res.data.wxOaDoc.money); // 申请金额
							$('.welfareType').html(getStatus(res.data.wxOaDoc.status)); //福利金类型
							$('.applyReason').html(res.data.wxOaDoc.rewardCause); // 申请原因
							$('.enterNumber').html(res.data.wxOaDoc.turnToNumber);
							$('.enterName').html(res.data.wxOaDoc.turnToName);
							if(res.data.wxOaDoc.applyType == 60011003) {
								$('#stateIcon').addClass('checkIcon');
							} else if(res.data.wxOaDoc.applyType == 60011001) {
								$('#stateIcon').addClass('sucessIcon');
							} else {
								$('#stateIcon').addClass('failIcon');
							}
							 for(var i = 0;i<picList.length;i++){

                             picHtml += ' <li>'+
                                            '    <div>'+
                                            '       <img src="'+picList[i].PIC_PATH+'" alt="" title="">'+
                                            '    </div>'+
                                           ' </li>';

                             }

                           $('#picList').html(picHtml);

                          for(var i =0;i<fileList.length;i++){

                           fileHtml += '<li><a href="'+fileList[i].PIC_PATH+'">'+fileList[i].FILE_NAME+'</a></li>'
 
                         }
                         $('#fileList').html(fileHtml);
						}
					}
				})
			}
		}
		welfareRecord.init();

	})
})