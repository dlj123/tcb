require(['config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		 var ipAdress = common.ipAdress;

         var tokenId = sessionStorage.getItem("tokenId");

		 var check = {

		 	companyId:'',

		 	deptId:'',

			init:function(){
               
               common.tab('.top_tab ul li','.content_panel');

               this.dataInit();

               this.noCheckInit();

               this.checkPerson('#noList');

               this.checkPerson('#checkList');

               this.toIndex();
 
			},
			toIndex:function(){

				$('.asidemenu').on('click',function(){

					 window.location.href="../home/index.html?companyId="+check.companyId+"&deptId="+check.deptId+"&btmIndex=0";
				})

			},
			dataInit:function(){

				var path  = window.location.search;

				    path = path.slice(1);

				    path = common.parseUrl(path);

				    console.log(path);

				    var tab = path.tab;

				    if(tab && tab=="2"){

				    	$('.top_tab ul li').eq(1).click();
				    }

				    check.companyId = path.companyId;

				    check.deptId = path.deptId;

			},
			noCheckInit:function(){

				var noCheckHtml = "",checkHtml="";

                //未审核请假初始化
                console.log(check.companyId);

                $.ajax({

                	url:ipAdress+'/weixin/oaDoc/apply',

                	data:{

                         tokenId: tokenId,

                         companyId:check.companyId,

                         deptId:check.deptId
                	},

                	type:'POST',

                	dataType:'json',

                	success:function(res){

                		console.log(res);

                            var checkList = function(elelist,noCheckHtml){

			                        	noCheckHtml = "";

			                			if(!elelist){

			                				elelist = [];

			                			}
			                			else{

				                			for(var i = elelist.length-1;i>=0;i--){
				                           
				                            noCheckHtml += '<div class="applies">';	                           

				                            if(!elelist[i].taskId && elelist == accreditNoList){

				                            	console.log(elelist[i].empower);

				                            	//isAccredit为是否为授权的审核

				                            	noCheckHtml +=     '<a href="applyTable.html?leaveId='+elelist[i].ID+'&empower='+elelist[i].empower+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';

				                            }
				                            else if(elelist[i].taskId && elelist == applyNoList){

				                            	 console.log(elelist[i].taskId);

			                                noCheckHtml +=     '<a href="applyTable.html?leaveId='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                            
			                               }
				                          
				                            noCheckHtml +=        '<div class="type">';

						    				noCheckHtml +=           '<span>'+elelist[i].FLOW_NAME+'</span>';

				                            noCheckHtml +=           '<p>'+elelist[i].FLOW_TYPE+'</p>';

				                            noCheckHtml +=        '</div>';

						    				noCheckHtml +=        '<div class="person">';

						    				noCheckHtml +=                    '<h5 class="name">'+elelist[i].STAFF_NAME+'</h5>';

						    				noCheckHtml +=                    '<p class="time">'+elelist[i].submission_time+'</p>';

						    				noCheckHtml +=        '</div>';

						    				noCheckHtml +=  '</a>';	 

						    				noCheckHtml +=  '</div>';

						    			    noCheckHtml +=  '<div class="checkOpen" data-instanceid="'+elelist[i].INSTANCE_ID+'"><i class="iconfont icon-jiantou-copy-copy"></i></div>';

						    			    noCheckHtml += '<div class="checkList_wrap"></ul>'; 
						    		       }
					    		     }

					    		     return noCheckHtml;
			                            
			                }


                            var accreditNoList = res.data.accreditNoList,

                            applyNoList = res.data.applyNoList;

                            noCheckHtml = checkList(accreditNoList,noCheckHtml);

                            //console.log(noCheckHtml);

                		    $('#noList').append(noCheckHtml);

                            noCheckHtml =  checkList(applyNoList,noCheckHtml);

                            $('#noList').append(noCheckHtml);
                	}
              
                })
    
                //未审核的其他流程初始化
                console.log(check.companyId);

                $.ajax({

                	url:ipAdress+'/weixin/oaDoc/oaDocApplyNo',

                	data:{
                     
                       tokenId:tokenId,

                       companyId:check.companyId,

                       deptId:check.deptId
                	},

                	dataType:'json',

                	type:'POST',

                	success:function(res){

                          console.log(res);

                           var checkList = function(elelist,noCheckHtml){

		                        	noCheckHtml = "";

		                			if(!elelist){

		                				elelist = [];

		                			}
		                			else{

			                			for(var i = elelist.length-1;i>=0;i--){
			                           
			                            noCheckHtml += '<div class="applies">';	                           

			                            if(elelist == accreditNoList){

			                            	if(elelist[i].FORM_TYPE=='csgl'){
			                            		
			                            		noCheckHtml +=     '<a href="../overspeed/overSpeed_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId +'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                            	}
				                            else if(elelist[i].FORM_TYPE=='pzgl'){

				                            	noCheckHtml +=     '<a href="../license/license_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                            else if(elelist[i].FORM_TYPE=='cljc'){

				                            	noCheckHtml +=     '<a href="../inspection/inspection_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                            else if(elelist[i].FORM_TYPE=='zjjh'){

				                            	noCheckHtml +=     '<a href="../moneyPlan/moneyPlan_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                            else if(elelist[i].FORM_TYPE=='jbjk'){

				                            	noCheckHtml +=     '<a href="../basicLoan/basicLoan_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                            else if(elelist[i].FORM_TYPE=='shfjk'){

				                            	noCheckHtml +=     '<a href="../liveLoan/liveLoan_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                            else if(elelist[i].FORM_TYPE=='sgjk'){

				                            	noCheckHtml +=     '<a href="../accidentLoan/accidentLoan_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                            else if(elelist[i].FORM_TYPE=='sgck'){

				                            	noCheckHtml +=     '<a href="../accidentSurvey/accidentSurvey_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                            else if(elelist[i].FORM_TYPE=='bx'){

				                            	noCheckHtml +=     '<a href="../reimbursement/reimbursement_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                             else if(elelist[i].FORM_TYPE=='sckc'){

				                            	noCheckHtml +=     '<a href="../productionDeduction/productionDeduction_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                             else if(elelist[i].FORM_TYPE=='scjl'){

				                            	noCheckHtml +=     '<a href="../productionReward/productionReward_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                             else if(elelist[i].FORM_TYPE=='scbz'){

				                            	noCheckHtml +=     '<a href="../productionSubsidy/productionSubsidy_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                             else if(elelist[i].FORM_TYPE=='tysq'){

				                            	noCheckHtml +=     '<a href="../applicationOutage/applicationOutage_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }


                                            else if(elelist[i].FORM_TYPE=='fljsq'){// 福利金申请

				                            noCheckHtml +=     '<a href="../welfare/welfare_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                                }
				                                 
				                             else if(elelist[i].FORM_TYPE=='qksm'){// 情况说明

				                            noCheckHtml +=     '<a href="../situation/situation_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                                }
				                                 
				                             else if(elelist[i].FORM_TYPE=='ygjl'){// 员工奖励

				                            noCheckHtml +=     '<a href="../staffreward/staffreward_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                                }
				                                 
				                             else if(elelist[i].FORM_TYPE=='yzzz'){// 印章证照

				                            noCheckHtml +=     '<a href="../seallicense/seallicense_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                                }
				                                  
				                             else if(elelist[i].FORM_TYPE=='scwzcg'){// 生产物资采购

				                            noCheckHtml +=     '<a href="../productMaterials/productMaterials_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                                }
				                                 
				                             else if(elelist[i].FORM_TYPE=='dagl'){// 档案管理

				                            noCheckHtml +=     '<a href="../archives/archives_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                                }
				                                  
				                             else if(elelist[i].FORM_TYPE=='xzwzcg'){// 行政物资采购

				                            noCheckHtml +=     '<a href="../adminMaterials/adminMaterials_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                                }




				                             else if(elelist[i].FORM_TYPE=='yctj'){

				                            	noCheckHtml +=     '<a href="../abnormallySubmission/abnormallySubmit_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011001&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
			                            }

			                            else if(elelist == applyNoList){

				                            if(elelist[i].FORM_TYPE=='csgl'){


			                                noCheckHtml +=     '<a href="../overspeed/overSpeed_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';

			                                }
			                                else if(elelist[i].FORM_TYPE=='pzgl'){

			                                	noCheckHtml +=     '<a href="../license/license_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                             	else if(elelist[i].FORM_TYPE=='cljc'){

			                                	noCheckHtml +=     '<a href="../inspection/inspection_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                else if(elelist[i].FORM_TYPE=='zjjh'){

			                                	noCheckHtml +=     '<a href="../moneyPlan/moneyPlan_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                else if(elelist[i].FORM_TYPE=='jbjk'){

			                                	noCheckHtml +=     '<a href="../basicLoan/basicLoan_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                else if(elelist[i].FORM_TYPE=='shfjk'){

			                                	noCheckHtml +=     '<a href="../liveLoan/liveLoan_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                else if(elelist[i].FORM_TYPE=='sgjk'){

			                                	noCheckHtml +=     '<a href="../accidentLoan/accidentLoan_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                else if(elelist[i].FORM_TYPE=='sgck'){

			                                	noCheckHtml +=     '<a href="../accidentSurvey/accidentSurvey_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                else if(elelist[i].FORM_TYPE=='bx'){

			                                	noCheckHtml +=     '<a href="../reimbursement/reimbursement_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                else if(elelist[i].FORM_TYPE=='sckc'){

				                            	noCheckHtml +=     '<a href="../productionDeduction/productionDeduction_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                             else if(elelist[i].FORM_TYPE=='scjl'){

				                            	noCheckHtml +=     '<a href="../productionReward/productionReward_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                             else if(elelist[i].FORM_TYPE=='scbz'){

				                            	noCheckHtml +=     '<a href="../productionSubsidy/productionSubsidy_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
				                            else if(elelist[i].FORM_TYPE=='tysq'){

				                            	noCheckHtml +=     '<a href="../applicationOutage/applicationOutage_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }


                                            else if(elelist[i].FORM_TYPE=='fljsq'){// 福利金申请

			                                	noCheckHtml +=     '<a href="../welfare/welfare_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                
			                                else if(elelist[i].FORM_TYPE=='qksm'){// 情况说明

			                                	noCheckHtml +=     '<a href="../situation/situation_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                
			                                else if(elelist[i].FORM_TYPE=='ygjl'){// 员工奖励

			                                	noCheckHtml +=     '<a href="../staffreward/staffreward_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                 
			                                else if(elelist[i].FORM_TYPE=='yzzz'){// 印章证照

			                                	noCheckHtml +=     '<a href="../seallicense/seallicense_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                  
			                                else if(elelist[i].FORM_TYPE=='scwzcg'){// 生产物资采购

			                                	noCheckHtml +=     '<a href="../productMaterials/productMaterials_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                  
			                                else if(elelist[i].FORM_TYPE=='dagl'){// 档案管理

			                                	noCheckHtml +=     '<a href="../archives/archives_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }
			                                
			                                else if(elelist[i].FORM_TYPE=='xzwzcg'){// 行政物资采购

			                                	noCheckHtml +=     '<a href="../adminMaterials/adminMaterials_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
			                                }



				                            else if(elelist[i].FORM_TYPE=='yctj'){

				                            	noCheckHtml +=     '<a href="../abnormallySubmission/abnormallySubmit_check.html?id='+elelist[i].ID+'&empower='+elelist[i].empower+'&taskId='+elelist[i].taskId+'&isAccredit=10011002&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
				                            }
			                            }
		                                noCheckHtml +=        '<div class="type">';

					    				noCheckHtml +=           '<span>'+elelist[i].FLOW_NAME+'</span>';

			                            noCheckHtml +=           '<p>'+elelist[i].FLOW_TYPE+'</p>';

			                            noCheckHtml +=        '</div>';

					    				noCheckHtml +=        '<div class="person">';

					    				noCheckHtml +=                    '<h5 class="name">'+elelist[i].USER_NAME+'</h5>';

					    				noCheckHtml +=                    '<p class="time">'+elelist[i].submission_time+'</p>';

					    				noCheckHtml +=        '</div>';

					    				noCheckHtml +=  '</a>';	 

					    				noCheckHtml +=  '</div>';

					    			    noCheckHtml +=  '<div class="checkOpen" data-instanceid="'+elelist[i].INSTANCE_ID+'"><i class="iconfont icon-jiantou-copy-copy"></i></div>';

					    			    noCheckHtml += '<div class="checkList_wrap"></div>'; 
					    		       }
				    		     }

				    		     return noCheckHtml;
		                            
		                    }

                           var accreditNoList = res.data.accreditNoList,

                            applyNoList = res.data.oaDocNoList;

                            noCheckHtml = checkList(accreditNoList,noCheckHtml);

                		    $('#noList').append(noCheckHtml);

                            noCheckHtml =  checkList(applyNoList,noCheckHtml);

                            $('#noList').append(noCheckHtml);

                	}
                })
                //已审核请假初始化
                 console.log(check.companyId);
                 
                 $.ajax({

                      	url:ipAdress+'/weixin/oaDoc/applyYes',

                      	data:{
                      		tokenId:tokenId,

                      		companyId:check.companyId,

                      		deptId:check.deptId
                      	},

                        type:'POST',

                      	dataType:'json',

                      	success:function(res){

                      		console.log(res);

 
                              var checkList = function(elelist,noCheckHtml){

                                            noCheckHtml="";

				                			if(!elelist){

				                				elelist = [];

				                			}
				                			else{

					                			for(var i = elelist.length-1;i>=0;i--){
					                           
					                            noCheckHtml += '<div class="applies">';
	
                                                noCheckHtml +=     '<a href="../leave/leave_record.html?leaveId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';

			                                    noCheckHtml +=        '<div class="type">';

							    				noCheckHtml +=           '<span>'+elelist[i].FLOW_NAME+'</span>';

					                            noCheckHtml +=           '<p>'+elelist[i].FLOW_TYPE+'</p>';

					                            noCheckHtml +=        '</div>';

							    				noCheckHtml +=        '<div class="person">';

							    				noCheckHtml +=                    '<h5 class="name">'+elelist[i].STAFF_NAME+'</h5>';

							    				noCheckHtml +=                    '<p class="time">'+elelist[i].submission_time+'</p>';

							    				noCheckHtml +=        '</div>';

							    				noCheckHtml +=  '</a>';	 

							    				noCheckHtml +=  '</div>';

							    			    noCheckHtml +=  '<div class="checkOpen" data-instanceid="'+elelist[i].INSTANCE_ID+'"><i class="iconfont icon-jiantou-copy-copy"></i></div>';

							    			    noCheckHtml += '<div class="checkList_wrap"></div>'; 
							    		       }
						    		     }

						    		     return noCheckHtml;
				                             
                               }


                              var checkedList = res.data.applyYesList;

                              checkHtml = checkList(checkedList,checkHtml);

                              $('#checkList').append(checkHtml);
                             
                      	}
                      })
                 //已审核其他流程初始化
                 console.log(check.companyId);

                 $.ajax({

                 	url:ipAdress+'/weixin/oaDoc/oaDocApplyYes',

                 	data:{
                         
                         tokenId:tokenId,

                         companyId:check.companyId,

                         deptId:check.deptId
                 	},
                 	dataType:'json',

                 	type:'POST',

                 	success:function(res){

                        console.log(res);

                        if(res.status==200){

                          var checkList = function(elelist,noCheckHtml){

                                            noCheckHtml="";

				                			if(!elelist){

				                				elelist = [];

				                			}
				                			else{

					                			for(var i = elelist.length-1;i>=0;i--){
					                           
					                            noCheckHtml += '<div class="applies">';

					                            if(elelist[i].FORM_TYPE=='csgl'){
	
                                                     noCheckHtml +=     '<a href="../overspeed/overSpeed_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                
                                                 }
                                                 else if(elelist[i].FORM_TYPE=='pzgl'){

                                                 	 noCheckHtml +=     '<a href="../license/license_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                 else if(elelist[i].FORM_TYPE=='cljc'){

                                                 	 noCheckHtml +=     '<a href="../inspection/inspection_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                 else if(elelist[i].FORM_TYPE=='zjjh'){

                                                 	 noCheckHtml +=     '<a href="../moneyPlan/moneyPlan_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                 else if(elelist[i].FORM_TYPE=='jbjk'){

                                                 	 noCheckHtml +=     '<a href="../basicLoan/basicLoan_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                 else if(elelist[i].FORM_TYPE=='shfjk'){

                                                 	 noCheckHtml +=     '<a href="../liveLoan/liveLoan_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                 else if(elelist[i].FORM_TYPE=='sgjk'){

                                                 	 noCheckHtml +=     '<a href="../accidentLoan/accidentLoan_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                 else if(elelist[i].FORM_TYPE=='sgck'){

                                                 	 noCheckHtml +=     '<a href="../accidentSurvey/accidentSurvey_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                 else if(elelist[i].FORM_TYPE=='bx'){

                                                 	 noCheckHtml +=     '<a href="../reimbursement/reimbursement_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                  else if(elelist[i].FORM_TYPE=='sckc'){

                                                 	 noCheckHtml +=     '<a href="../productionDeduction/productionDeduction_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                  else if(elelist[i].FORM_TYPE=='scjl'){

                                                 	 noCheckHtml +=     '<a href="../productionReward/productionReward_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                  else if(elelist[i].FORM_TYPE=='scbz'){

                                                 	 noCheckHtml +=     '<a href="../productionSubsidy/productionSubsidy_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                 else if(elelist[i].FORM_TYPE=='tysq'){

                                                 	 noCheckHtml +=     '<a href="../applicationOutage/applicationOutage_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }

                                               else if(elelist[i].FORM_TYPE=='fljsq'){// 福利金申请

                                                 	 noCheckHtml +=     '<a href="../welfare/welfare_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                 
                                                  else if(elelist[i].FORM_TYPE=='qksm'){// 情况说明

                                                 	 noCheckHtml +=     '<a href="../situation/situation_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                  
                                                   else if(elelist[i].FORM_TYPE=='ygjl'){// 员工奖励

                                                 	 noCheckHtml +=     '<a href="../staffreward/staffreward_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                  
                                                   else if(elelist[i].FORM_TYPE=='yzzz'){// 印章证照

                                                 	 noCheckHtml +=     '<a href="../seallicense/seallicense_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                   
                                                   else if(elelist[i].FORM_TYPE=='scwzcg'){// 生产物资采购

                                                 	 noCheckHtml +=     '<a href="../productMaterials/productMaterials_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                   
                                                  
                                                   else if(elelist[i].FORM_TYPE=='dagl'){// 档案管理

                                                 	 noCheckHtml +=     '<a href="../archives/archives_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }
                                                   
                                                    else if(elelist[i].FORM_TYPE=='xzwzcg'){//行政物资采购

                                                 	 noCheckHtml +=     '<a href="../adminMaterials/adminMaterials_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }






                                                  else if(elelist[i].FORM_TYPE=='yctj'){

                                                 	 noCheckHtml +=     '<a href="../abnormallySubmission/abnormallySubmit_record.html?oaDocId='+elelist[i].ID+'&companyId='+check.companyId+'&deptId='+check.deptId+'" class="apply_link">';
                                                 }

			                                    noCheckHtml +=        '<div class="type">';

							    				noCheckHtml +=           '<span>'+elelist[i].FLOW_NAME+'</span>';

					                            noCheckHtml +=           '<p>'+elelist[i].FLOW_TYPE+'</p>';

					                            noCheckHtml +=        '</div>';

							    				noCheckHtml +=        '<div class="person">';

							    				noCheckHtml +=                    '<h5 class="name">'+elelist[i].USER_NAME+'</h5>';

							    				noCheckHtml +=                    '<p class="time">'+elelist[i].submission_time+'</p>';

							    				noCheckHtml +=        '</div>';

							    				noCheckHtml +=  '</a>';	 

							    				noCheckHtml +=  '</div>';

							    			    noCheckHtml +=  '<div class="checkOpen" data-instanceid="'+elelist[i].INSTANCE_ID+'"><i class="iconfont icon-jiantou-copy-copy"></i></div>';

							    			    noCheckHtml += '<div class="checkList_wrap"></div>'; 
							    		       }
						    		     }

						    		     return noCheckHtml;
				                             
                               }

                               var checkedList = res.data.oaDocYesList;

                              checkHtml = checkList(checkedList,checkHtml);

                              $('#checkList').append(checkHtml);
                        }

                 	}
                 })

			},
                //展开审核人
			checkPerson:function(ele){

				var checkedPerson = function(checkedList,nextStepName,checkedHtml){

					checkedHtml="";

                    if(!checkedList){

                    	checkedList=[];
                    }
                    else{
                    
                        checkedHtml +='<ul class="checkList">';

						for(var i = checkedList.length-1;i>=0;i--){

							checkedHtml +='<li>';

							if(checkedList[i].AUDIT_STATUS=='60011001'){

								checkedHtml +=           '<div class="checkIcon pass"><i class="iconfont icon-gou"></i></div>';
							}
							else if(checkedList[i].AUDIT_STATUS=='60011002'){

								checkedHtml +=           '<div class="checkIcon fail"><i class="iconfont icon-cha"></i></div>';
							}
	                        else{
	                        	checkedHtml +=           '<div class="checkIcon check"><i class="iconfont icon-tanhao"></i></div>';
	                        }
					    	checkedHtml +=    '<div class="checkInfo_wrap">';
							checkedHtml +=	    '<div class="checkInfo">';
							checkedHtml +=		    '<div class="name">'+checkedList[i].AUDIT_NAME+'</div>';
							checkedHtml +=		    '<div class="state_time">';
							checkedHtml +=		    		'<p>'+checkedList[i].AUDIT_STATUS_NAME+'<span>('+checkedList[i].ACTIVITI_STATUS_NAME+')</span></p>';
							checkedHtml +=		    		'<p>'+checkedList[i].AUDIT_DATE+'</p>';
							checkedHtml +=		    '</div>';
							checkedHtml +=		 '</div>';	
					    	checkedHtml +=	'</div>';
					    	checkedHtml +='</li>';
				    	}

				    	checkedHtml +='</ul>';

				    	if(!nextStepName){

				    		flag="";

				    	}
				    	else{

				    	   flag = '<div class="nextNotice"><span>下一步</span><span>'+nextStepName+'</span></div>';
				    	}

                        checkedHtml = flag + checkedHtml;

				    	return checkedHtml;
				    }
				}

				$(ele).on('click','.checkOpen',function(){

					var instanceId = $(this).data('instanceid');

                    console.log(instanceId);

                    var that = $(this);

					if($(this).next('.checkList_wrap').css('display')=='none'){
                      
                      $(this).next('.checkList_wrap').css('display','block');

                      	$.ajax({

							url:ipAdress+'/weixin/oaDoc/applyMessage',

							data:{
                                 
                                 instanceId:instanceId
							},

							type:'POST',

							dataType:'json',

							success:function(res){

								console.log(res);

								var checkedList = res.data.applyYesList;

								var nextStepName;

								if(res.data.nextStepList.length>0){

									 nextStepName = res.data.nextStepList[0].nextName;

								}
								else{
                                    
                                    nextStepName = "";
								}

								var checkedHtml = checkedPerson(checkedList,nextStepName,checkedHtml);

								console.log(checkedHtml);

                                that.next('.checkList_wrap').html(checkedHtml);
							}
					    })

					}
					else{

						$(this).next('.checkList_wrap').css('display','none');
					}

				})
			}
		}
        check.init();
	})
})	