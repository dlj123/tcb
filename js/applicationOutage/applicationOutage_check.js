require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var id,taskId,instanceId,companyId,empower,staffId,isAccredit;

		var applicationOutageCheck = {

      companyId02:'',

      deptId02:'',

			init:function(){

                 this.focus();

                 this.checkInit();

                 this.accreditCheck();

                 this.toIndex();

                 this.otherFlowCheck(applicationOutageCheck.companyId02,applicationOutageCheck.deptId02);

              },

              toIndex:function(){

                   var path = window.location.search.slice(1);

                       path = common.parseUrl(path);

                       applicationOutageCheck.companyId02 = path.companyId;

                       applicationOutageCheck.deptId02 = path.deptId;

                   $('.asidemenu').on('click',function(){

                     window.location.href="../home/index.html?companyId="+path.companyId+"&deptId="+path.deptId+"&btmIndex=0";
                  
                   })

              },
			focus:function(){

                $('.agreeArea').focus(function(){

                    $(this).css('background','#0093dd');

                }).blur(function(){
                    
                    $(this).css('background','#ddd');
                })
			},
			checkInit:function(){

				    var path = window.location.search;

                    path = path.slice(1);

                    path = common.parseUrl(path);

                    console.log(path);

                    empower =  path.empower;

                    id = path.id;

                    taskId = path.taskId;

                    isAccredit = path.isAccredit;

                    console.log(taskId,empower,id,isAccredit);

         
                    var getTime = function(value){
              
                        value = value.slice(0,10);

                        return value;
                    }

                    $.ajax({

                    	url:ipAdress+'/weixin/oaDoc/edit',

                    	data:{

                           id:id,

                           taskId:taskId,

                           empower:empower,

                           tokenId:tokenId

                    	},

                    	type:'POST',

                    	dataType:'json',

                    	success:function(res){

                    		console.log(res);

                         var fileLists = res.wxOaDoc.wxOaDocPicList,picList=[],fileList=[],picHtml="",fileHtml="";

                        for(var i = 0;i<fileLists.length;i++){

                             if(fileLists[i].FILE_TYPE=='0'){

                               picList.push(fileLists[i]);

                             }
                             else if(fileLists[i].FILE_TYPE=='1'){

                               fileList.push(fileLists[i]);

                             }

                        }

                            //empower是否办理过授权，activitiAccredit是否授权过
 
                            if(!res.activitiAccredit && empower=='100011002'){

                                 $('.approval').css('display','block');

                            }
                    		    else if(res.activitiAccredit){

                    			    $('.approval').css('display','none');
                             
    	                            if(res.activitiAccredit.status=='90011001'){

    	                            	$('.pass,.reject').removeAttr('disabled').css('background','#0093dd');
    	                                 
    	                             }
    	                             else if(res.activitiAccredit.status=='90011001'){

    	                                $('.pass,.reject').attr('disabled','disabled').css('background','#ccc');    

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

                             $('.carNum').html(res.wxOaDoc.carNo);

                             $('.person').html(res.wxOaDoc.nUserName);

                             $('.start_date').html(res.wxOaDoc.startDate);

                              $('.production_date').html(res.wxOaDoc.productionDate);

                             $('.memo').html(res.wxOaDoc.memo);

                              for(var i = 0;i<picList.length;i++){

                             picHtml += ' <li>'+
                                            '    <div>'+
                                            '       <img src="'+picList[i].PIC_PATH+'" alt="" title="">'+
                                            '    </div>'+
                                           ' </li>';

                             }

                            $('#picList').html(picHtml);
                            
                             for(var i = 0;i<fileList.length;i++){

                                fileHtml += ' <li><a href="'+fileList[i].PIC_PATH+'">'+fileList[i].FILE_NAME+'</a></li>';

                             }
                             $('#fileList').html(fileHtml);

                    	  }
                    })
			},
          otherFlowCheck:function(parameter01,parameter02){

               var itemCompanyId = "",itemDeptId = "";

              $('.applyTable_ope').on('click','.pass',function(){

                  if(typeof($(this).attr('disabled'))=="undefined"){

                    if(!$('#pass_box').data('check')){

                          $('#pass_box').attr('data-check','1');

                          $('#pass_box .agreeArea').val("");

                          $('#pass_box .agreeTit').html("同意？");

                          $('#pass_box textarea').attr('placeholder','备注一下');
                         
                          $('#pass_box').show();

                      }
                   }   

                }).on('click','.reject',function(){

                     if(typeof($(this).attr('disabled'))=="undefined"){
                   
                        if(!$('#pass_box').data('check') || $('#pass_box').data('check')=='1'){

                            $('#pass_box').attr('data-check','2');

                            $('#pass_box .agreeArea').val("");

                            $('#pass_box .agreeTit').html("不同意？");

                            $('#pass_box .agreeWrap textarea').attr('placeholder','说明一下');
                           
                            $('#pass_box').show();

                          }
                      }
                });

                $('#pass_box').on('click','.confirm',function(){

                       //同意

                       if($('#pass_box').data('check')=='1'){

                       var memo = $('.agreeWrap .agreeArea').val();

                      if(empower=='100011002'){

                               console.log(id,taskId,tokenId,instanceId,memo,empower);

                                  $.ajax({

                                  url:ipAdress+'/weixin/oaDoc/editFlow',

                                  data:{


                                       isAccredit:isAccredit,

                                       applyStatus:'AGREE',

                                       id:id,

                                       taskId:taskId,

                                       tokenId:tokenId,

                                       instanceId:instanceId,

                                       memo:memo
                                  },
                                  type:'POST',

                                  dataType:'json',

                                  success:function(res){

                                    console.log(res);

                                      $('#pass_box').hide();  

                                      common.maskConfirm02("操作成功！",function(){

                                         window.location.href='../launchCheck/check.html?tab=2&companyId='+parameter01+'&deptId='+parameter02;

                                      })                             

                                      
                                  }
                                 })
                               }
                               else if(empower=='100011001'){

                                 console.log(tokenId,instanceId,staffId,memo);

                                   $.ajax({

                                  url:ipAdress+'/weixin/oaDoc/autidActiviti',

                                  data:{

                                          isAccredit:isAccredit,

                                          tokenId:tokenId,

                                          accreditStatust:'AGREE',
                                      
                                          instanceId:instanceId,

                                          auditDesc:memo

                                  },
                                  type:'POST',

                                  dataType:'json',

                                  success:function(res){

                                       console.log(res);

                                       if(res.status==200){

                                          common.maskConfirm02('操作成功',function(){
                                             
                                                window.location.href='../launchCheck/check.html?tab=2&companyId='+parameter01+'&deptId='+parameter02;

                                          });

                                         

                                       }
                                         else if(res.data.status==401){

                                             common.maskConfirm(res.message);
                                         }
                                      
                                  }
                                 })

                               }
                        }

                        //拒绝

                        else if($('#pass_box').data('check')=='2'){

                              var memo = $('#pass_box textarea').val();

                             console.log(empower);

                          if(empower=='100011002'){

                             console.log(isAccredit,id,taskId,tokenId,instanceId,memo,empower);

                                $.ajax({

                                url:ipAdress+'/weixin/oaDoc/editFlow',

                                data:{

                                     isAccredit:isAccredit,

                                     applyStatus:'REFUSE',

                                     id:id,

                                     taskId:taskId,

                                     tokenId:tokenId,

                                     instanceId:instanceId,

                                     memo:memo
                                },
                                type:'POST',

                                dataType:'json',

                                success:function(res){

                                  console.log(res);

                                    $('#pass_box').hide();  

                                     common.maskConfirm02('操作成功',function(){

                                            window.location.href='../launchCheck/check.html?tab=2&companyId='+parameter01+'&deptId='+parameter02;

                                     })                             

                                  }
                               })
                             }
                             else if(empower=='100011001'){

                               console.log(tokenId,instanceId,staffId,memo);

                                 $.ajax({

                                url:ipAdress+'/weixin/oaDoc/autidActiviti',

                                data:{

                                       isAccredit:isAccredit,

                                        tokenId:tokenId,

                                        accreditStatust:'REFUSE',
                                    
                                        instanceId:instanceId,

                                        auditDesc:memo

                                },
                                type:'POST',

                                dataType:'json',

                                success:function(res){

                                     console.log(res);

                                     if(res.status==200){

                                        common.maskConfirm02("操作成功",function(){

                                            window.location.href='../launchCheck/check.html?tab=2&companyId='+parameter01+'&deptId='+parameter02;

                                        })

                                       }
                                       else if(res.data.status==401){

                                           common.maskConfirm(res.message);

                                       }                                
                                }
                               })

                              }

                        }

                  }).on('click','.concel',function(){

                   $(this).parents('#pass_box').css('display','none');

                    $('#pass_box').removeAttr('data-check');
                 })
          },
        accreditCheck:function(){

             	var  positionId ='';

               $('.applyTable_ope').on('click','.approval',function(){
                   
                    $('#accredit_box').show();

                })

               //选择公司
               $('#accredit_company_select').on('click',function(){

                    var accreditCompanyH="";

                    if($('#accredit_company_list').css('display')=='none'){

                            $.ajax({

		               	    	url:ipAdress+'/weixin/staffLeave/getCompanyList',

		               	    	data:{
		                          companyId:companyId
		               	    	},

		               	    	type:'POST',

		               	    	dataType:'json',

		               	    	success:function(res){

		                            console.log(res);

		                            var accreditCompanyL = res.data.companyList;

		                            console.log(accreditCompanyL);

		                            for(var i = 0;i<accreditCompanyL.length;i++){

		                              accreditCompanyH += '<li data-companyid="'+accreditCompanyL[i].id+'">'+accreditCompanyL[i].companyName+'</li>'

		                            }

		                            $('#accredit_company_list').css('display','block').html(accreditCompanyH);
                               
		                          
		               	    	}
               	          })
                    	 
                    }
                    else{
                    	$('#accredit_company_list').css('display','none');
                    }
               	    
               })

               $('#accredit_company_list').on('click','li',function(){

               	    itemCompanyId = $(this).data('companyid');

               	    $('#accredit_company_list').hide();

               	    $('#accredit_company_list').siblings('#accredit_company_select').find('span:first-child').html($(this).html()).css('color','#666');
                    
                    $('#accredit_item2').css('display','block');
               })

                $(document).bind("click",function(e){

					 var target  = $(e.target);

					 if(target.closest("#accredit_company_select,#accredit_company_list,#accredit_company_list li").length == 0){

						 $("#accredit_company_list").hide();
					 };

					 e.stopPropagation();

				 })

               //选择部门
               $('#accredit_department_select').on('click',function(){

                    var accreditDeptH="";

                    if($('#accredit_department_list').css('display')=='none'){

                            $.ajax({

		               	    	url:ipAdress+'/weixin/staffLeave/getDeptList',

		               	    	data:{
		                          companyId:itemCompanyId
		               	    	},

		               	    	type:'POST',

		               	    	dataType:'json',

		               	    	success:function(res){

		                            console.log(res);

		                            var accreditDeptL = res.data.deptList;

		                            console.log(accreditDeptL);

		                            for(var i = 0;i<accreditDeptL.length;i++){

		                              accreditDeptH += '<li data-deptid="'+accreditDeptL[i].id+'">'+accreditDeptL[i].departmentName+'</li>'

		                            }

		                            $('#accredit_department_list').css('display','block').html(accreditDeptH);

		                          }
               	          })
                    	 
                    }
                    else{
                    	$('#accredit_department_list').css('display','none');
                    }
               	    
               })

               $('#accredit_department_list').on('click','li',function(){

                    itemDeptId = $(this).data('deptid');

               	    $('#accredit_department_list').hide();

               	    $('#accredit_department_list').siblings('#accredit_department_select').find('span:first-child').html($(this).html()).css('color','#666');
                    
                    $('#accredit_item3').css('display','block');
               })

                $(document).bind("click",function(e){

        					 var target  = $(e.target);

        					 if(target.closest("#accredit_department_select,#accredit_department_list,#accredit_department_list li").length == 0){

        						 $("#accredit_department_list").hide();
        					 };

        					 e.stopPropagation();

        				 })

              //选择职位
              $('#accredit_position_select').on('click',function(){

                    var accreditPositionH="";

                    console.log(accreditPositionH);
           
                    console.log(itemDeptId);

                    if($('#accredit_position_list').css('display')=='none'){

                            $.ajax({

		               	    	url:ipAdress+'/weixin/staffLeave/getPositionList',

		               	    	data:{
		                          deptId:itemDeptId
		               	    	},

		               	    	type:'POST',

		               	    	dataType:'json',

		               	    	success:function(res){

		                            console.log(res);	

		                            var accreditPositonL = res.data.postitionList;

		                            console.log(accreditPositonL);

		                            for(var i = 0;i<accreditPositonL.length;i++){

		                              accreditPositionH += '<li data-positionid="'+accreditPositonL[i].id+'">'+accreditPositonL[i].positionName+'</li>'

		                            }

		                            $('#accredit_position_list').css('display','block').html(accreditPositionH);

		                          }
               	          })
                    	 
                    }
                    else{
                    	$('#accredit_position_list').css('display','none');
                    }
               	    
               })
               $('#accredit_position_list').on('click','li',function(){

               	   positionId = $(this).data('positionid');

               	    $('#accredit_position_list').hide();

               	    $('#accredit_position_list').siblings('#accredit_position_select').find('span:first-child').html($(this).html()).css('color','#666');
               })

                $(document).bind("click",function(e){

        					 var target  = $(e.target);

        					 if(target.closest("#accredit_position_select,#accredit_position_list,#accredit_position_list li").length == 0){

        						 $("#accredit_position_list").hide();
        					 };

        					 e.stopPropagation();

				        })


                //授权确定
                $('#accredit_box').on('click','.confirm',function(){

                	var accreditDesc = $('#memo_area').val();

                	console.log(positionId,instanceId,tokenId,accreditDesc);

                   
                    $.ajax({

                    	url:ipAdress+'/weixin/oaDoc/empowerFlow',

                    	data:{

                           positionId:positionId,

                           instanceId:instanceId,

                           tokenId:tokenId,

                           accreditDesc:accreditDesc
                    	},

                    	type:'POST',

                    	dataType:'json',

                    	success:function(res){
                            
                            console.log(res);

                            if(res.status==401){

                            	$('#accredit_box').css('display','none');

                            	common.maskConfirm('授权失败!!'+res.msg);

                            }

                            else if(res.status==200){

                            	$('#accredit_box').css('display','none');

                            	$('.pass,.reject').attr('disabled','disabled').css('background','#ccc');

                            	$('.approval').css('display','none');

                              window.location.reload();

                            }
                    	}
                    })

                }).on('click','.concel',function(){

                	$('#accredit_box').css('display','none');

                })

             }
		}
       applicationOutageCheck.init();
	})
})	