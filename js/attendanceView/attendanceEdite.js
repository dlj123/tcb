require(['../config'],function(config) {

	require(['jquery','common','fastclick','mui','picker'], function ($, common,fastclick,mui,picker) {

		    var ipAdress = common.ipAdress;

	        var tokenId = sessionStorage.getItem("tokenId"),tmStaffAttendance={};

	        var attendanceEdite = {

	        	 userId:"",

	        	 record:"",

	        	 attendanceId:"",

	        	 companyId:"",

	        	 deptId:"",
	           
	             init:function(){
	              
	                this.dataInit();

	                this.textareaSize();

	                this.attendanceState();

	                this.submit();

	                this.toIndex();

	             },
	             toIndex:function(){

	             	  var path = window.location.search;

	             	      path = common.parseUrl(path);

	             	      this.companyId = path.companyId;

	             	      this.deptId = path.deptId;

	             	      console.log(this.companyId,this.deptId);

	             	  $('.asidemenu').on('click',function(){

	             	  	  window.location.href="../home/index.html?companyId="+attendanceEdite.companyId+"&deptId="+attendanceEdite.deptId;
	             	  })

	             },
	             dataInit:function(){

	             	var path = window.location.search;

	             	path = path.slice(1);

	             	path = common.parseUrl(path);

	             	if(path.attendanceId){

			             	this.attendanceId = path.attendanceId;

			             	console.log(attendanceEdite.attendanceId);

			                $.ajax({

			                    	url:ipAdress+'/weixin/oaDoc/hitView',

			                    	data:{
			                            
			                            attendanceId:attendanceEdite.attendanceId
			                    	},
			                    	headers:{

			                             Accept: "application/json; charset=utf-8"
			                    	},
			                    	dataType:'json',

			                    	type:'POST',

			                    	success:function(res){

			                    		if(res.status==200){

			                                console.log(res);

			                                tmStaffAttendance.useId = res.data.hitViewList[0].userId;

			                                tmStaffAttendance.companyId = res.data.hitViewList[0].companyId;

			                                tmStaffAttendance.companyName = res.data.hitViewList[0].companyName;

			                                tmStaffAttendance.departmentId =  res.data.hitViewList[0].deptId;

			                                tmStaffAttendance.departmentName = res.data.hitViewList[0].deptName;

			                                tmStaffAttendance.positionId = res.data.hitViewList[0].positionId;

			                                tmStaffAttendance.positionName =  res.data.hitViewList[0].positionName;

			                                tmStaffAttendance.shiftsId = res.data.hitViewList[0].shitId;

			                                tmStaffAttendance.shiftsName = res.data.hitViewList[0].shitName;

			                                tmStaffAttendance.status = res.data.hitViewList[0].STATUS;

			                                tmStaffAttendance.id =  res.data.hitViewList[0].attendanceId;

			                                $('.name').html(res.data.hitViewList[0].realName);

			                                $('.carTeam').html(res.data.hitViewList[0].deptName);

			                                $('.carNum').html(res.data.hitViewList[0].carNo);

                                            if(res.data.hitViewList[0].STATUS==50011001){

			                                	$('#state').html('正常').attr('data-status','50011001');
			                                }
			                                else if(res.data.hitViewList[0].STATUS==50011002){

			                                    $('#state').html('作废').attr('data-status','50011002');
			                                }
			                                else if(res.data.hitViewList[0].STATUS==50011003){

			                                    $('#state').html('迟到').attr('data-status','50011003');
			                                }
			                                else if(res.data.hitViewList[0].STATUS==50011004){

			                                    $('#state').html('早退').attr('data-status','50011004');
			                                }
			                                else if(res.data.hitViewList[0].STATUS==50011005){

			                                    $('#state').html('迟到早退').attr('data-status','50011005');
			                                }
			                                else if(res.data.hitViewList[0].STATUS==50011006){

			                                    $('#state').html('旷工').attr('data-status','50011006');
			                                }
			                    		}
			                    	}
                           })

                    }
                    if(path.userId){

		                    this.userId = path.userId;

		                    console.log(attendanceEdite.userId);

		                     $.ajax({

			                    	url:ipAdress+'/weixin/oaDoc/noHitView',

			                    	data:{
			                            
			                            userId:attendanceEdite.userId
			                    	},
			                    	headers:{

			                             Accept: "application/json; charset=utf-8"
			                    	},
			                    	dataType:'json',

			                    	type:'POST',

			                    	success:function(res){

			                    		if(res.status==200){

			                                console.log(res);

			                                tmStaffAttendance.useId = res.data.noHitViewList[0].userId;

			                                tmStaffAttendance.companyId = res.data.noHitViewList[0].companyId;

			                                tmStaffAttendance.companyName = res.data.noHitViewList[0].companyName;

			                                tmStaffAttendance.departmentId =  res.data.noHitViewList[0].deptId;

			                                tmStaffAttendance.departmentName = res.data.noHitViewList[0].deptName;

			                                tmStaffAttendance.positionId = res.data.noHitViewList[0].positionId;

			                                tmStaffAttendance.positionName =  res.data.noHitViewList[0].positionName;

			                                tmStaffAttendance.shiftsId = res.data.noHitViewList[0].shitId;

			                                tmStaffAttendance.shiftsName = res.data.noHitViewList[0].shitName;

			                                $('.name').html(res.data.noHitViewList[0].realName);

			                                $('.carTeam').html(res.data.noHitViewList[0].deptName);

			                                $('.carNum').html(res.data.noHitViewList[0].carNo);

			                                if(res.data.noHitViewList[0].STATUS==50011001){

			                                	$('#state').html('正常').attr('data-status','50011001');
			                                }
			                                else if(res.data.noHitViewList[0].STATUS==50011002){

			                                    $('#state').html('作废').attr('data-status','50011002');
			                                }
			                                else if(res.data.noHitViewList[0].STATUS==50011003){

			                                    $('#state').html('迟到').attr('data-status','50011003');
			                                }
			                                else if(res.data.noHitViewList[0].STATUS==50011004){

			                                    $('#state').html('早退').attr('data-status','50011004');
			                                }
			                                else if(res.data.noHitViewList[0].STATUS==50011005){

			                                    $('#state').html('迟到早退').attr('data-status','50011005');
			                                }
			                                else if(res.data.noHitViewList[0].STATUS==50011006){

			                                    $('#state').html('旷工').attr('data-status','50011006');
			                                }
			                    		}
			                    	}
                           })

                    }
	             	this.record = path.record;

	             	


	             },
	             textareaSize:function(){

	             	  $('.intro_wrap .intro_area').bind('input propertychange', function() {
	       
					       var maxNum = 200-$(this).val().length;

					       if(maxNum>=0){
					       
					         $('.intro_wrap p').html(maxNum+'/200');
					       }
					       else {
					          return
					       }
					   });
	             },
	             attendanceState:function(){

	             	 $('.stateEdite').on('tap',function(){

	             	 	var statusPicker;

	             	 	if(!statusPicker){

	             	 		statusPicker = new mui.PopPicker();

							statusPicker.setData([{

							    value: "50011001",

							    text: "正常"

							}, {

							    value: "50011002",

							    text: "作废"

							},{

							    value: "50011003",

							    text: "迟到"

							},{
							    value: "50011004",

							    text: "早退"

							},{
							    value: "50011005",

							    text: "迟到早退"

							},{
								value: "50011006",

							    text: "旷工"
							}])

							statusPicker.pickers[0].setSelectedValue('50011001', 2000);

							statusPicker.show(function(SelectedItem) {

								console.log(SelectedItem);

								$('#state').attr('data-status',SelectedItem[0].value);

								$('#state').html(SelectedItem[0].text);

							})

	             	 	}

	             	})
	             },
	             submit:function(){

	             	$('.submit_area').on('click','button',function(){

                               if(attendanceEdite.record=='1'){

                               	    if(!$('.intro_area').val() && $('#state').attr('data-status')==tmStaffAttendance.status){

                               	    	 mui.alert('请选择考勤状态、填写说明！！','注意');
                               	    }

                               	    else if($('#state').attr('data-status')==tmStaffAttendance.status){

                               	    	 mui.alert('请选择考勤状态！！','注意');
                               	    }

                               	    else if(!$('.intro_area').val()){

                               	    	 mui.alert('请填写说明！！','注意');
                               	    }

                               	    else{

                                        tmStaffAttendance.status = $('#state').attr('data-status');

                               	    	console.log(tmStaffAttendance,$('.intro_area').val());

                                        $.ajax({
				                              
				                               url:ipAdress+'/weixin/oaDoc/hitEdit',

				                               data:{

				                                    tmStaffAttendance:JSON.stringify(tmStaffAttendance),

				                                    memo:$('.intro_area').val()
				                               },

				                               dataType:'json',

				                               type:'POST',

				                               headers:{

				                                  Accept: "application/json; charset=utf-8"

				                               },
				                                beforeSend: function () {

				                                      $("#loading").css('display','block');

				                                },
				                               success:function(res){

				                               	   console.log(res);

				                               	   if(res.data.status==200){
                                                    
	                                                    common.maskConfirm02(res.data.message,function(){

	                                                    	window.location.href="index.html?companyId="+attendanceEdite.companyId+"&deptId="+attendanceEdite.deptId
	                                                    });
				                               	   }

				                               },
				                               complete: function () {

				                                   $("#loading").css('display','none');
				                               }
				                       	  })

                                    }
	   
                       }
                       else if(attendanceEdite.record=='2'){

                       	       if(!$('.intro_area').val() && !$('#state').attr('data-status')){

                               	    	 mui.alert('请选择考勤状态、填写说明！！','注意');
                               }

                               else if(!$('#state').attr('data-status')){

                               	    	 mui.alert('请选择考勤状态！！','注意');
                               }

                               else if(!$('.intro_area').val()){

                               	    	 mui.alert('请填写说明！！','注意');
                               }
                       	      else{

                                    tmStaffAttendance.status = $('#state').attr('data-status');

                                    console.log(tmStaffAttendance,$('.intro_area').val());

                       	      	     $.ajax({
		                              
				                               url:ipAdress+'/weixin/oaDoc/hitSave',

				                               data:{

				                                    tmStaffAttendance:JSON.stringify(tmStaffAttendance),

				                                    memo:$('.intro_area').val()
				                               },

				                               dataType:'json',

				                               type:'POST',

				                               headers:{

				                                  Accept: "application/json; charset=utf-8"

				                               },
				                                beforeSend: function () {

				                                      $("#loading").css('display','block');

				                                },
				                               success:function(res){

				                               	    console.log(res);

				                               	   if(res.data.status==200){

				                               	   	    console.log(attendanceEdite.companyId,attendanceEdite.deptId);
                                                    
	                                                     common.maskConfirm02(res.data.message,function(){

	                                                    	window.location.href="index.html?companyId="+attendanceEdite.companyId+"&deptId="+attendanceEdite.deptId
	                                                    
	                                                    });
				                               	   }
				                               },
				                               complete: function () {

				                                   $("#loading").css('display','none');
				                               }
		                       	     })
                       	      }
                       }

	             	})
                       
                   
	             }
	        }   
        attendanceEdite.init();  
    })
})             