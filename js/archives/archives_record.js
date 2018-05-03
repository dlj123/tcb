require(['../config'], function(config) {

	require(['jquery', 'common', 'fastclick', 'mui'], function($, common, fastclick, mui) {

		var ipAdress = common.ipAdress;

		var tokenId = sessionStorage.getItem("tokenId");

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
							var archivesType = "";
							$('.title').html(res.data.wxOaDoc.title); //标题
							$('.memo').html(res.data.wxOaDoc.memo); // 内容
							if(res.data.wxOaDoc.fileType=='10003'){
								$('.fileType').html('合同管理');
							}
							else if(res.data.wxOaDoc.fileType=='10009'){
								$('.fileType').html('管理文书');
							}
							else if(res.data.wxOaDoc.fileType=='10010'){
								$('.fileType').html('档案管理');
							}
							
							if(res.data.wxOaDoc.status == '31000001') {
								archivesType = "轮胎合同"
							} else if(res.data.wxOaDoc.status == '31000002') {
								archivesType = "租房合同"
							} else if(res.data.wxOaDoc.status == '31000003') {
								archivesType = "对外联系函"
							} else if(res.data.wxOaDoc.status == '31000004') {
								archivesType = "其他"
							} else if(res.data.wxOaDoc.status == '31000005') {
								archivesType = "购房合同"
							} else if(res.data.wxOaDoc.status == '31000006') {
								archivesType = "外来联系函"
							} else if(res.data.wxOaDoc.status == '31000007') {
								archivesType = "生产合同"
							} else if(res.data.wxOaDoc.status == '31000008') {
								archivesType = "油料合同"
							} else if(res.data.wxOaDoc.status == '31000009') {
								archivesType = "管理合同"
							} else if(res.data.wxOaDoc.status == '31000010') {
								archivesType = "股东合同"
							} else if(res.data.wxOaDoc.status == '31000011') {
								archivesType = "红头合同"
							}else if(res.data.wxOaDoc.status == '91000001'){
								archivesType = "日常行政文书1"
							}else if(res.data.wxOaDoc.status == '91000002'){
								archivesType = "日常行政文书2"
							}else if(res.data.wxOaDoc.status == '11000011'){
								archivesType = "管理文件制度1"
							}else if(res.data.wxOaDoc.status == '11000012'){
								archivesType = "管理文件制度2"
							}
							$('.status').html(archivesType); // 合同分类
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