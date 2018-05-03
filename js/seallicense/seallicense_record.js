require(['../config'], function(config) {

	require(['jquery', 'common', 'fastclick', 'mui'], function($, common, fastclick, mui) {

		var ipAdress = common.ipAdress;

		var tokenId = sessionStorage.getItem("tokenId");

		var seallicenseRecord = {

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
					//alert(value)
					if(value == '61000001') {
						return "公章";
					} else if(value == '61000002') {
						return "合同章";
					} else if(value == '61000003') {
						return "财务章";
					} else if(value == '61000004') {
						return "业务章";
					} else if(value == '61000005') {
						return "结算章";
					} else if(value == '61000006') {
						return "法人章";
					} else if(value == '71000001') {
						return "三证合一正副复印件";
					} else if(value == '71000002') {
						return "道路运输许可证正副原件";
					} else if(value == '71000003') {
						return "三证合一正副印件";
					} else if(value == '71000004') {
						return "法人身份证复印件";
					} else if(value == '71000005') {
						return "道路运输许可证正副复印件";
					}

				}
				var getTime = function(value) {
					return value = value.slice(0, 10);
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
							$('.company').html(res.data.wxOaDoc.nCompanyName); //公司             
							$('.department').html(res.data.wxOaDoc.nDeptName); //部门
							$('.position').html(res.data.wxOaDoc.nPositionName); //职位
							$('.user').html(res.data.wxOaDoc.nUserName); //人员姓名
							$('.rewardDate').html(res.data.wxOaDoc.rewardDate); //使用时间
							//$('.welfareType').html(getValue(res.data.wxOaDoc.status));//福利金类型
							$('.sealType').html(getValue(res.data.wxOaDoc.stampType)); //印章类型
							$('.licenseType').html(getValue(res.data.wxOaDoc.licenceType)); //证照类型
							$('.uses').html(res.data.wxOaDoc.uses); // 用途
							$('.send_unit').html(res.data.wxOaDoc.sendUnit); // 发往单位
							$('.filename').html(res.data.wxOaDoc.fileName); //文件名称
							$('.reason').html(res.data.wxOaDoc.reason); // 使用事由
							$('.sealuse').html(res.data.wxOaDoc.sealUse); // 印章用途
							$('.returnDate').html(res.data.wxOaDoc.returnDate); // 归还时间

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
		seallicenseRecord.init();

	})
})