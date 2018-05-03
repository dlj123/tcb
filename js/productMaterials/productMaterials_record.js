require(['../config'], function(config) {

	require(['jquery', 'common', 'fastclick', 'mui'], function($, common, fastclick, mui) {

		var ipAdress = common.ipAdress;

		var tokenId = sessionStorage.getItem("tokenId");

		var productMaterialsRecord = {

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

					if(value == '81000001') {
						return "自损配件";
					} else if(value == '81000002') {
						return "保养材料";
					} else if(value == '81000003') {
						return "低耗配件";
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
							$('.title').html(res.data.wxOaDoc.title); //标题
							$('.status').html(getValue(res.data.wxOaDoc.status)); //使用类别
							$('.productName').html(res.data.wxOaDoc.productName); //物品名称
							$('.modelType').html(res.data.wxOaDoc.modelType); // 规格型号
							$('.quantity').html(res.data.wxOaDoc.quantity); // 数量
							$('.payee').html(res.data.wxOaDoc.payee); //单位
							$('.price').html(res.data.wxOaDoc.price); // 单价
							$('.money').html(res.data.wxOaDoc.money); // 金额
							$('.memo').html(res.data.wxOaDoc.memo); // 备注
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
		productMaterialsRecord.init();

	})
})