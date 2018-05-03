require(['../config'], function(config) {

	require(['jquery', 'common', 'fastclick', 'mui'], function($, common, fastclick, mui) {

		var ipAdress = common.ipAdress;

		var tokenId = sessionStorage.getItem("tokenId");

		var situationRecord = {

			init: function() {

				this.recordInit();

			},
			recordInit: function() {

				var path = window.location.search;

				path = path.slice(1);

				path = common.parseUrl(path);

				console.log(path);

				var getValue = function(value) {

					if(value == '41000011') {
						return "其他";
					} else if(value == '41000012') {
						return "扣除";
					} else if(value == '41000013') {
						return "补助";
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
							$('.company').html(res.data.wxOaDoc.nCompanyName);
							$('.department').html(res.data.wxOaDoc.nDeptName);
							$('.name').html(res.data.wxOaDoc.nUserName);
							$('.status').html(getValue(res.data.wxOaDoc.status)); //情况说明类型
							$('.title').html(res.data.wxOaDoc.title);
							$('.memo').html(res.data.wxOaDoc.memo);

							if(res.data.wxOaDoc.applyType == 60011003) {

								$('#stateIcon').addClass('checkIcon');

							} else if(res.data.wxOaDoc.applyType == 60011001) {

								$('#stateIcon').addClass('sucessIcon');
							} else {

								$('#stateIcon').addClass('failIcon');
							}

						}

					}
				})
			}
		}
		situationRecord.init();

	})
})