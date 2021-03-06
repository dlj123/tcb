require(['../config'], function(config) {

	require(['jquery', 'common', 'fastclick'], function($, common, fastclick) {

		var ipAdress = common.ipAdress;

		var tokenId = sessionStorage.getItem("tokenId");

		var id, taskId, instanceId, companyId, empower, staffId, isAccredit;

		var situationCheck = {

			init: function() {

				this.reasonSelect();

				this.focus();

				this.checkInit();

				this.checkPass();

				this.accreditCheck();

				this.checkReject();

			},
			reasonSelect: function() {

				//理由选择
				//$('.reason_list').on('click','li:not(".rejectInput")',function(){

				$('.reason_list').on('click', 'li', function() {

					$(this).addClass('active').siblings('li').removeClass('active');

				})
				//弹层显示与隐藏
				$('.reason_confirm a').on('click', function() {

					$(this).parents('#check_box').hide();

				})

				$('.applyTable_ope .reject').on('click', function() {

					$('#check_box').show();
				})
			},
			focus: function() {

				$('.agreeArea').focus(function() {

					$(this).css('background', '#0093dd');

				}).blur(function() {

					$(this).css('background', '#ddd');
				})
			},
			checkInit: function() {

				var path = window.location.search;

				path = path.slice(1);

				path = common.parseUrl(path);

				console.log(path);

				empower = path.empower;

				id = path.id;

				taskId = path.taskId;

				isAccredit = path.isAccredit;

				console.log(taskId, empower, id, isAccredit);

				var getTime = function(value) {

					value = value.slice(0, 10);

					return value;
				}

				$.ajax({

					url: ipAdress + '/weixin/oaDoc/edit',

					data: {

						id: id,

						taskId: taskId,

						empower: empower,

						tokenId: tokenId

					},

					type: 'POST',

					dataType: 'json',

					success: function(res) {

						console.log(res);

						//empower是否办理过授权，activitiAccredit是否授权过

						if(!res.activitiAccredit && empower == '100011002') {

							$('.approval').css('display', 'block');

						} else if(res.activitiAccredit) {

							$('.approval').css('display', 'none');

							if(res.activitiAccredit.status == '90011001') {

								$('.pass,.reject').removeAttr('disabled').css('background', '#0093dd');

							} else if(res.activitiAccredit.status == '90011001') {

								$('.pass,.reject').attr('disabled', 'disabled').css('background', '#ccc');

							}
						}
						id = res.wxOaDoc.id;
						taskId = res.taskId;
						//staffId = res.wxStaffLeave.staffId;
						deptId = res.wxOaDoc.deptId;
						companyId = res.wxOaDoc.companyId;
						instanceId = res.wxOaDoc.instanceId;
						$('.company').html(res.wxOaDoc.nCompanyName);
						$('.department').html(res.wxOaDoc.nDeptName);
						$('.name').html(res.wxOaDoc.nUserName);
						$('.status').html(res.wxOaDoc.status); // 分类
						$('.title').html(res.wxOaDoc.title); // 标题
						$('.memo').html(res.wxOaDoc.memo); // 内容

					}
				})
			},

			checkPass: function() {

				var itemCompanyId = "",
					itemDeptId = "";

				console.log(empower);

				$('.applyTable_ope').on('click', '.pass', function() {

					if($(this).attr('disabled')) {

						return false;

					} else {
						$('#pass_box .agreeArea').val("");

						$('#pass_box').show();
					}

				})

				$('#pass_box').on('click', '.confirm', function() {

					var memo = $('.agreeWrap .agreeArea').val();

					if(empower == '100011002') {

						console.log(id, taskId, tokenId, instanceId, memo);

						$.ajax({

							url: ipAdress + '/weixin/oaDoc/editFlow',

							data: {

								isAccredit: isAccredit,

								applyStatus: 'AGREE',

								id: id,

								taskId: taskId,

								tokenId: tokenId,

								instanceId: instanceId,

								memo: memo
							},
							type: 'POST',

							dataType: 'json',

							success: function(res) {

								console.log(res);

								if(res.status == 200) {

									$('#pass_box').hide();

									window.location.href = '../launchCheck/check.html?tab=2';

								}

							}
						})
					} else if(empower == '100011001') {

						console.log(tokenId, instanceId, staffId, memo);

						$.ajax({

							url: ipAdress + '/weixin/oaDoc/autidActiviti',

							data: {

								tokenId: tokenId,

								accreditStatust: 'AGREE',

								instanceId: instanceId,

								staffId: staffId,

								auditDesc: memo

							},
							type: 'POST',

							dataType: 'json',

							success: function(res) {

								console.log(res);

								if(res.status == 200) {

									window.location.href = '../launchCheck/check.html?tab=2';

								} else if(res.status == 401) {

									common.maskConfirm(res.message);
								}

							}
						})

					}
				}).on('click', '.concel', function() {

					$(this).parents('#pass_box').css('display', 'none');

				})

			},

			accreditCheck: function() {

				var positionId = '';

				$('.applyTable_ope').on('click', '.approval', function() {

					$('#accredit_box').show();

				})

				//选择公司
				$('#accredit_company_select').on('click', function() {

					var accreditCompanyH = "";

					if($('#accredit_company_list').css('display') == 'none') {

						$.ajax({

							url: ipAdress + '/weixin/staffLeave/getCompanyList',

							data: {
								companyId: companyId
							},

							type: 'POST',

							dataType: 'json',

							success: function(res) {

								console.log(res);

								var accreditCompanyL = res.data.companyList;

								console.log(accreditCompanyL);

								for(var i = 0; i < accreditCompanyL.length; i++) {

									accreditCompanyH += '<li data-companyid="' + accreditCompanyL[i].id + '">' + accreditCompanyL[i].companyName + '</li>'

								}

								$('#accredit_company_list').css('display', 'block').html(accreditCompanyH);

							}
						})

					} else {
						$('#accredit_company_list').css('display', 'none');
					}

				})

				$('#accredit_company_list').on('click', 'li', function() {

					itemCompanyId = $(this).data('companyid');

					$('#accredit_company_list').hide();

					$('#accredit_company_list').siblings('#accredit_company_select').find('span:first-child').html($(this).html()).css('color', '#666');

					$('#accredit_item2').css('display', 'block');
				})

				$(document).bind("click", function(e) {

					var target = $(e.target);

					if(target.closest("#accredit_company_select,#accredit_company_list,#accredit_company_list li").length == 0) {

						$("#accredit_company_list").hide();
					};

					e.stopPropagation();

				})

				//选择部门
				$('#accredit_department_select').on('click', function() {

					var accreditDeptH = "";

					if($('#accredit_department_list').css('display') == 'none') {

						$.ajax({

							url: ipAdress + '/weixin/staffLeave/getDeptList',

							data: {
								companyId: itemCompanyId
							},

							type: 'POST',

							dataType: 'json',

							success: function(res) {

								console.log(res);

								var accreditDeptL = res.data.deptList;

								console.log(accreditDeptL);

								for(var i = 0; i < accreditDeptL.length; i++) {

									accreditDeptH += '<li data-deptid="' + accreditDeptL[i].id + '">' + accreditDeptL[i].departmentName + '</li>'

								}

								$('#accredit_department_list').css('display', 'block').html(accreditDeptH);

							}
						})

					} else {
						$('#accredit_department_list').css('display', 'none');
					}

				})

				$('#accredit_department_list').on('click', 'li', function() {

					itemDeptId = $(this).data('deptid');

					$('#accredit_department_list').hide();

					$('#accredit_department_list').siblings('#accredit_department_select').find('span:first-child').html($(this).html()).css('color', '#666');

					$('#accredit_item3').css('display', 'block');
				})

				$(document).bind("click", function(e) {

					var target = $(e.target);

					if(target.closest("#accredit_department_select,#accredit_department_list,#accredit_department_list li").length == 0) {

						$("#accredit_department_list").hide();
					};

					e.stopPropagation();

				})

				//选择职位
				$('#accredit_position_select').on('click', function() {

					var accreditPositionH = "";

					console.log(accreditPositionH);

					console.log(itemDeptId);

					if($('#accredit_position_list').css('display') == 'none') {

						$.ajax({

							url: ipAdress + '/weixin/staffLeave/getPositionList',

							data: {
								deptId: itemDeptId
							},

							type: 'POST',

							dataType: 'json',

							success: function(res) {

								console.log(res);

								var accreditPositonL = res.data.postitionList;

								console.log(accreditPositonL);

								for(var i = 0; i < accreditPositonL.length; i++) {

									accreditPositionH += '<li data-positionid="' + accreditPositonL[i].id + '">' + accreditPositonL[i].positionName + '</li>'

								}

								$('#accredit_position_list').css('display', 'block').html(accreditPositionH);

							}
						})

					} else {
						$('#accredit_position_list').css('display', 'none');
					}

				})
				$('#accredit_position_list').on('click', 'li', function() {

					positionId = $(this).data('positionid');

					$('#accredit_position_list').hide();

					$('#accredit_position_list').siblings('#accredit_position_select').find('span:first-child').html($(this).html()).css('color', '#666');
				})

				$(document).bind("click", function(e) {

					var target = $(e.target);

					if(target.closest("#accredit_position_select,#accredit_position_list,#accredit_position_list li").length == 0) {

						$("#accredit_position_list").hide();
					};

					e.stopPropagation();

				})

				//授权确定
				$('#accredit_box').on('click', '.confirm', function() {

					var accreditDesc = $('#memo_area').val();

					console.log(positionId, instanceId, tokenId, accreditDesc);

					$.ajax({

						url: ipAdress + '/weixin/oaDoc/empowerFlow',

						data: {

							positionId: positionId,

							instanceId: instanceId,

							tokenId: tokenId,

							accreditDesc: accreditDesc
						},

						type: 'POST',

						dataType: 'json',

						success: function(res) {

							console.log(res);

							if(res.status == 401) {

								$('#accredit_box').css('display', 'none');

								common.maskConfirm('授权失败!!' + res.msg);

							} else if(res.status == 200) {

								$('#accredit_box').css('display', 'none');

								$('.pass,.reject').attr('disabled', 'disabled').css('background', '#ccc');

								$('.approval').css('display', 'none');

								window.location.reload();

							}
						}
					})

				}).on('click', '.concel', function() {

					$('#accredit_box').css('display', 'none');

				})

			},
			checkReject: function() {

				$('.applyTable_ope .reject').on('click', function() {

					if($(this).attr('disabled')) {

						return false;
					} else { $('#checkno_box').show(); }
				})
				$('#checkno_box').on('click', '.confirm', function() {

					var memo = "";

					$('.reason_list li').each(function() {

						if($(this).hasClass('active')) {

							memo = $(this).find('p').html().trim();

						}
					})

					if(empower == '100011002') {

						console.log(leaveId, taskId, tokenId, instanceId, memo, empower);

						$.ajax({

							url: ipAdress + '/weixin/oaDoc/editFlow',

							data: {

								isAccredit: isAccredit,

								applyStatus: 'REFUSE',

								taskId: taskId,

								tokenId: tokenId,

								instanceId: instanceId,

								memo: memo
							},
							type: 'POST',

							dataType: 'json',

							success: function(res) {

								console.log(res);

								$('#checkno_box').hide();

								window.location.href = '../launchCheck/check.html?tab=2';
							}
						})
					} else if(empower == '100011001') {

						console.log(tokenId, instanceId, staffId, memo);

						$.ajax({

							url: ipAdress + '/weixin/oaDoc/autidActiviti',

							data: {

								tokenId: tokenId,

								accreditStatust: 'REFUSE',

								instanceId: instanceId,

								staffId: staffId,

								auditDesc: memo

							},
							type: 'POST',

							dataType: 'json',

							success: function(res) {

								console.log(res);

								if(res.status == 200) {

									window.location.href = '../launchCheck/check.html?tab=2';

								} else if(res.status == 401) {

									common.maskConfirm(res.message);
								}
							}
						})

					}

				}).on('click', '.concel', function() {

					$('#checkno_box').hide();

				})
			}
		}
		situationCheck.init();
	})
})