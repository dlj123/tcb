 require(['../config'], function(config) {
 	require(['jquery', 'common', 'fastclick'], function($, common, fastclick) {
 		var ipAdress = common.ipAdress;
 		var tokenId = sessionStorage.getItem("tokenId"),
 			companyId = "",
 			companyId02 = "",
 			deptId = "",
 			userId = "",
 			personInit = {};
 		var staffreward = {
 			init: function() {
 				common.tab('.top_tab ul li', '.content_panel');
 				common.focusBug();
 				this.dataInit();
 				this.companyInit();
 				this.deptInit();
 				this.positionInit();
 				this.personInit();
 				this.staffrewardSubmit();
 				this.staffrewardRecord();
 				this.typeSelect();

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
 			typeSelect: function() { // 奖励类型分类
 				$('.type_wrap').on('click', function() {
 					var typeListNew = [],
 						typePicker;
 					$.ajax({
 						url: ipAdress + '//weixin/oaDoc/thingType',
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
 								var typeList = res.data.thingTypeList;
 								for(var i = 0; i < typeList.length; i++) {
 									typeListNew[i] = {};
 									typeListNew[i].value = typeList[i].codeId;
 									typeListNew[i].text = typeList[i].codeDesc;
 								}
 								console.log(typeListNew);
 								typePicker = new mui.PopPicker();
 								typePicker.setData(typeListNew);
 								typePicker.pickers[0].setSelectedIndex(0, 1000);
 								typePicker.show(function(getSelectedItems) {
 									console.log(getSelectedItems[0]);
 									$('#type').html(getSelectedItems[0].text);
 									$('.type_wrap').attr('data-codeid', getSelectedItems[0].value);
 									typePicker.dispose();
 								})
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
 								companyPicker = new mui.PopPicker();
 								companyPicker.setData(companyListNew);
 								companyPicker.pickers[0].setSelectedIndex(0, 1000);
 								companyPicker.show(function(getSelectedItems) {
 									console.log(getSelectedItems[0]);
 									$('#company').html(getSelectedItems[0].text);
 									$('.dept_wrap').attr('data-companyid', getSelectedItems[0].value);
 									companyPicker.dispose();
 								})
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
 									var deptList = res.data.deptList;
 									for(var i = 0; i < deptList.length; i++) {
 										deptListNew[i] = {};
 										deptListNew[i].value = deptList[i].id;
 										deptListNew[i].text = deptList[i].departmentName;
 									}
 									console.log(deptListNew);
 									var deptPicker = new mui.PopPicker();
 									deptPicker.setData(deptListNew);
 									deptPicker.pickers[0].setSelectedIndex(0, 1000);
 									deptPicker.show(function(getSelectedItems) {
 										console.log(getSelectedItems[0]);
 										$('#department').html(getSelectedItems[0].text);
 										$('.position_wrap').attr('data-deptid', getSelectedItems[0].value);
 										deptPicker.dispose();
 									})
 								} else if(res.status == 401) {
 									mui.alert('服务器内部错误！');
 								}
 							}
 						})
 					}
 				})
 			},
 			positionInit: function() {
 				$('.position_wrap').on('click', function() {
 					deptId = $(this).attr('data-deptid');
 					if(!deptId) {
 						mui.alert('请选择部门之后再选择职位');
 					} else {
 						console.log(deptId);
 						$.ajax({
 							url: ipAdress + '/weixin/oaDoc/positionList',
 							data: {
 								deptId: deptId
 							},
 							type: 'POST',
 							dataType: 'json',
 							success: function(res) {
 								console.log(res);
 								var positionListNew = [],
 									positionList = [];
 								positionList = res.data.positionList;
 								for(var i = 0; i < positionList.length; i++) {
 									positionListNew[i] = {};
 									positionListNew[i].text = positionList[i].POSITION_NAME;
 									positionListNew[i].value = positionList[i].POSITION_ID;
 								}
 								console.log(positionListNew);
 								var positionPicker = new mui.PopPicker();
 								positionPicker.setData(positionListNew);
 								positionPicker.pickers[0].setSelectedIndex(0, 1000);
 								positionPicker.show(function(getSelectedItems) {
 									console.log(getSelectedItems[0]);
 									$('#position').html(getSelectedItems[0].text);
 									$('.user_wrap').attr('data-positionid', getSelectedItems[0].value);
 									positionPicker.dispose();
 								})
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
 									personList = [];
 								personList = res.data.userList;
 								for(var i = 0; i < personList.length; i++) {
 									personListNew[i] = {};
 									personListNew[i].text = personList[i].realName;
 									personListNew[i].value = personList[i].userId;
 								}
 								console.log(personListNew);
 								var personPicker = new mui.PopPicker();
 								personPicker.setData(personListNew);
 								personPicker.pickers[0].setSelectedIndex(0, 1000);
 								personPicker.show(function(getSelectedItems) {
 									console.log(getSelectedItems[0]);
 									$('#user').html(getSelectedItems[0].text);
 									$('.user_wrap').attr('data-userid', getSelectedItems[0].value);
 									personPicker.dispose();
 								})
 							}
 						})
 					}
 				}) //选择人
 			},

 			staffrewardSubmit: function() {
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
 				$('#staffrewardSubmit').on('click', function() {
 					var wxOaDoc = {};
 					wxOaDoc.formType = 'ygjl';
 					wxOaDoc.nCompanyName = selectValue($('#company').html().trim());
 					wxOaDoc.nDeptName = selectValue($('#department').html().trim());
 					wxOaDoc.nPositionName = selectValue($('#position').html().trim());
 					wxOaDoc.nUserName = selectValue($('#user').html().trim());
 					wxOaDoc.nCompanyId = $('.company_wrap').data('companyid');
 					wxOaDoc.nDeptId = $('.department_wrap').data('deptid');
 					wxOaDoc.nUserId = $('.person_wrap').data('userid');
 					//wxOaDoc.status = $('.type_wrap').data('codeid');// 情况说明类型
 					wxOaDoc.memo = $('.memo').val().trim(); // 奖励类型
 					wxOaDoc.money = $('.money').val().trim(); // 奖励金额
 					wxOaDoc.rewardCause = $('.rewardCause').val().trim(); //奖励事由

 					wxOaDoc.companyId = personInit.companyId;
 					wxOaDoc.deptId = personInit.deptId;
 					wxOaDoc.positionId = personInit.positonId;
 					wxOaDoc.userId = personInit.userId;
 					console.log(wxOaDoc);
 					//if(wxOaDoc.nCompanyName &&  wxOaDoc.nDeptName && wxOaDoc.nUserName && wxOaDoc.title && wxOaDoc.memo && wxOaDoc.status ){
 					if(wxOaDoc.nCompanyName.trim() == '') {
 						mui.alert('请选择公司');
 					} else if(wxOaDoc.nDeptName.trim() == '') {
 						mui.alert('请选择部门');
 					} else if(wxOaDoc.nPositionName.trim() == '') {
 						mui.alert('请选择职位');
 					} else if(wxOaDoc.nUserName.trim() == '') {
 						mui.alert('请选择人员姓名');
 					} else if(wxOaDoc.memo.trim() == '') {
 						mui.alert('请输入奖励类型');
 					} else if(wxOaDoc.money.trim() == '') {
 						mui.alert('请输入奖励金额');
 					} else if(isNaN(wxOaDoc.money)) {
 						mui.alert('请输入正确的数字');
 					} else if(wxOaDoc.money <= 0) {
 						mui.alert('金额必须大于0');
 					} else if(wxOaDoc.rewardCause.trim() == '') {
 						mui.alert('请输入奖励事由');
 					} else {
 						$.ajax({
 							url: ipAdress + '/weixin/oaDoc/save',
 							data: {
 								tokenId: tokenId,
 								wxOaDoc: JSON.stringify(wxOaDoc)
 							},
 							dataType: 'json',
 							type: 'POST',
 							success: function(res) {
 								console.log(res);
 								var oaDocId = res.oaDocId;
 								if(res.status == 200) {
 									window.location.href = "../staffreward/staffreward_submit_success.html?companyId=" + companyId + "&oaDocId=" + oaDocId + "&formType=" + wxOaDoc.formType
 								}
 							}
 						})
 					}
 				})
 			},

 			staffrewardRecord: function() {
 				var listHtml = "";
 				$.ajax({
 					url: ipAdress + '/weixin/oaDoc/oaDocList',
 					data: {
 						tokenId: tokenId,
 						formType: 'ygjl'
 					},
 					dataType: 'json',
 					type: 'POST',
 					success: function(res) {
 						console.log(res);
 						var staffrewardList = res.data.wxOaDocList;
 						for(var i = staffrewardList.length - 1; i >= 0; i--) {
 							listHtml += '<li class="item"><a href="staffreward_record.html?oaDocId=' + staffrewardList[i].id + '">';
 							listHtml += '<div class="name">' + staffrewardList[i].nCompanyName + '</div>';
 							listHtml += '<div class="leave_infos">';
 							listHtml += '<div class="time_reason">';
 							listHtml += '<p>部门：' + staffrewardList[i].nDeptName + '</p>';
 							listHtml += '<p>人员姓名：' + staffrewardList[i].nUserName + '</p>';
 							listHtml += '<p>奖励类型：' + staffrewardList[i].memo + '</p>';
 							listHtml += '<p>奖励金额：' + staffrewardList[i].money + '</p>';
 							listHtml += '<p>奖励事由：' + staffrewardList[i].rewardCause + '</p>';
 							/*if(staffrewardList[i].status=='41000011'){
 							   listHtml +=             '<p>分类：其他</p>';
 							}
 							else if(staffrewardList[i].status=='41000012'){
 							   listHtml +=             '<p>分类：扣除</p>';
 							}
 							else if(staffrewardList[i].status=='41000013'){
 								 listHtml +=             '<p>分类：补助</p>';
 							}*/
 							listHtml += ' </div>';
 							if(staffrewardList[i].applyType == '60011003') {
 								listHtml += '<span class="icon check"></span>';
 							} else if(staffrewardList[i].applyType == '60011002') {
 								listHtml += '<span class="icon failIcon"></span>';
 							} else if(staffrewardList[i].applyType == '60011001') {
 								listHtml += '<span class="icon successIcon"></span>';
 							}
 							listHtml += '</div>';
 							listHtml += '</a></li>';
 						}
 						$('#staffreward_record').addClass('license_record').html(listHtml);
 					}
 				})
 			}
 		}
 		staffreward.init();
 	})
 })