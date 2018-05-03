 require(['../config'], function(config) {
 	require(['jquery', 'common', 'fastclick'], function($, common, fastclick) {
 		var ipAdress = common.ipAdress;
 		var tokenId = sessionStorage.getItem("tokenId"),
 			companyId = "",
 			companyId02 = "",
 			deptId = "",
 			userId = "",
 			personInit = {};
 		var situation = {
 			init: function() {
 				common.tab('.top_tab ul li', '.content_panel');
 				common.focusBug();
 				this.dataInit();
 				this.companyInit();
 				this.deptInit();
 				this.personInit();
 				this.situationSubmit();
 				this.situationRecord();
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
 			typeSelect: function() { // 情况说明类型分类
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
 					$('#carTeam').html("");
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
 			deptInit: function() {
 				var deptListNew = [];
 				$('.dept_wrap').on('click', function() {
 					companyId02 = $(this).attr('data-companyid');
 					console.log(companyId02);
 					if(!companyId02) {
 						mui.alert('请选择公司之后再选择车队');
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
 										$('#dept').html(getSelectedItems[0].text);
 										$('.person_wrap').attr('data-deptid', getSelectedItems[0].value);
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
 			personInit: function() {
 				$('.person_wrap').on('click', function() {
 					deptId = $(this).attr('data-deptid');
 					if(!deptId) {
 						mui.alert('请选择部门之后再选择人');
 					} else {
 						console.log(deptId);
 						$.ajax({
 							url: ipAdress + '/weixin/oaDoc/getPositionList',
 							data: {
 								deptId: deptId
 							},
 							type: 'POST',
 							dataType: 'json',
 							success: function(res) {
 								console.log(res);
 								var personListNew = [],
 									personList = [];
 								personList = res.data.peopleList;
 								for(var i = 0; i < personList.length; i++) {
 									personListNew[i] = {};
 									personListNew[i].text = personList[i].REAL_NAME;
 									personListNew[i].value = personList[i].userId;
 								}
 								console.log(personListNew);
 								var personPicker = new mui.PopPicker();
 								personPicker.setData(personListNew);
 								personPicker.pickers[0].setSelectedIndex(0, 1000);
 								personPicker.show(function(getSelectedItems) {
 									console.log(getSelectedItems[0]);
 									$('#person').html(getSelectedItems[0].text);
 									$('.person_wrap').attr('data-userid', getSelectedItems[0].value);
 									personPicker.dispose();
 								})
 							}
 						})
 					}
 				}) //选择车号
 			},
 			situationSubmit: function() {
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
 				$('#situationSubmit').on('click', function() {
 					var wxOaDoc = {};
 					wxOaDoc.formType = 'qksm';

 					wxOaDoc.nCompanyName = selectValue($('#company').html().trim());
 					wxOaDoc.nDeptName = selectValue($('#dept').html().trim());
 					wxOaDoc.nUserName = $('#person').html().trim();
 					wxOaDoc.nCompanyId = $('.dept_wrap').data('companyid');
 					wxOaDoc.nDeptId = $('.person_wrap').data('deptid');
 					wxOaDoc.nUserId = $('#person').data('personids');

 					var status = $('.type_wrap').data('codeid'); // 情况说明类型
 					wxOaDoc.status = status;

 					wxOaDoc.title = $('.title').val().trim(); // 标题
 					wxOaDoc.memo = $('.content').val().trim(); // 内容
 					wxOaDoc.companyId = personInit.companyId;
 					wxOaDoc.deptId = personInit.deptId;
 					wxOaDoc.positionId = personInit.positonId;
 					wxOaDoc.userId = personInit.userId;
 					console.log(wxOaDoc);
 					// if(wxOaDoc.nCompanyName &&  wxOaDoc.nDeptName && wxOaDoc.nUserName && wxOaDoc.title && wxOaDoc.memo && wxOaDoc.status ){
 					if(status == undefined) {
 						mui.alert('请选择分类');
 					} else if(wxOaDoc.nCompanyName.trim() == '') {
 						mui.alert('请选择公司');
 					} else if(wxOaDoc.nDeptName.trim() == '') {
 						mui.alert('请选择部门');
 					} else if(wxOaDoc.nUserName.trim() == '请选择') {
 						mui.alert('请选择人员');
 					}
 					/*else if(status  ==undefined ){
 					  mui.alert('请选择情况说明类型');
 					}*/
 					else if(wxOaDoc.title.trim() == '') {
 						mui.alert('请输入标题');
 					} else if(wxOaDoc.memo.trim() == '') {
 						mui.alert('请输入内容');
 					} else {
 						console.log(JSON.stringify(wxOaDoc));

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
 									window.location.href = "../situation/situation_submit_success.html?companyId=" + companyId + "&oaDocId=" + oaDocId + "&formType=" + wxOaDoc.formType
 								}
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

 			situationRecord: function() {
 				var listHtml = "";
 				$.ajax({
 					url: ipAdress + '/weixin/oaDoc/oaDocList',
 					data: {
 						tokenId: tokenId,
 						formType: 'qksm'
 					},
 					dataType: 'json',
 					type: 'POST',
 					success: function(res) {
 						console.log(res);
 						var situationList = res.data.wxOaDocList;
 						for(var i = situationList.length - 1; i >= 0; i--) {
 							listHtml += '<li class="item"><a href="situation_record.html?oaDocId=' + situationList[i].id + '">';
 							listHtml += '<div class="name">' + situationList[i].nCompanyName + '</div>';
 							listHtml += '<div class="leave_infos">';
 							listHtml += '<div class="time_reason">';
 							listHtml += '<p>部门：' + situationList[i].nDeptName + '</p>';
 							listHtml += '<p>申请人：' + situationList[i].nUserName + '</p>';
 							listHtml += '<p>标题：' + situationList[i].title + '</p>';
 							listHtml += '<p>内容：' + situationList[i].memo + '</p>';
 							if(situationList[i].status == '41000011') {
 								listHtml += '<p>分类：其他</p>';
 							} else if(situationList[i].status == '41000012') {
 								listHtml += '<p>分类：扣除</p>';
 							} else if(situationList[i].status == '41000013') {
 								listHtml += '<p>分类：补助</p>';
 							}
 							listHtml += ' </div>';
 							if(situationList[i].applyType == '60011003') {
 								listHtml += '<span class="icon check"></span>';
 							} else if(situationList[i].applyType == '60011002') {
 								listHtml += '<span class="icon failIcon"></span>';
 							} else if(situationList[i].applyType == '60011001') {
 								listHtml += '<span class="icon successIcon"></span>';
 							}
 							listHtml += '</div>';
 							listHtml += '</a></li>';
 						}
 						$('#situation_record ').addClass('license_record').html(listHtml);
 					}
 				})
 			}
 		}
 		situation.init();
 	})
 })