require(['../config'], function(config) {

	require(['jquery', 'common', 'fastclick', 'mui'], function($, common, fastclick, mui) {

		var ipAdress = common.ipAdress;

		var tokenId = sessionStorage.getItem("tokenId");

		var staffrewardRecord = {

			init: function() {

				this.recordInit();

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
							$('.company').html(res.data.wxOaDoc.nCompanyName);
							$('.department').html(res.data.wxOaDoc.nDeptName);
							$('.position').html(res.data.wxOaDoc.nPositionName);
							$('.user').html(res.data.wxOaDoc.nUserName);
							$('.memo').html(res.data.wxOaDoc.memo);
							$('.money').html(res.data.wxOaDoc.money);
							$('.rewardCause').html(res.data.wxOaDoc.rewardCause);

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
		staffrewardRecord.init();

	})
})