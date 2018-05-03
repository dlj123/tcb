require(['config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

		var launch = {

			companyId:'',

			deptId:'',

			init:function(){
               
               common.tab('.top_tab ul li','.content_panel');

               this.dataInit();

               this.checkerInit();

               this.toIndex();

            },
			dataInit:function(){

				var path = window.location.search;

				path = path.slice(1);

				path = common.parseUrl(path);

				this.companyId = path.companyId;

				this.deptId = path.deptId;

				//获取发起的请假待审核、已通过、未通过申请列表
                this.leaveLaunch('#launchChecking','REVIEW','reviewList');

                this.leaveLaunch('#launchPass','PASS','passList');

                this.leaveLaunch('#launchFail','NOPASS','noPassList');

         

                //获取发起的其他流程待审核、已通过、未通过申请列表

                this.otherlaunch('#launchPass','PASS','otherPassList');

                this.otherlaunch('#launchFail','NOPASS','otherNoPassList');

                this.otherlaunch('#launchChecking','REVIEW','otherReviewList');
                

               //待审核、已通过、未通过审核人列表
			   this.checkerInit('#launchChecking');

			   this.checkerInit('#launchPass');

			   this.checkerInit('#launchFail');


			},

			toIndex:function(){

				$('.asidemenu').on('click',function(){

					 window.location.href="../home/index.html?companyId="+launch.companyId+"&deptId="+launch.deptId+"&btmIndex=0";
				})

			},
			
			leaveLaunch:function(ele,state,list){

                   var checkList = function(elelist,noCheckHtml){

                        	noCheckHtml = "";

                			if(!elelist){

                				elelist = [];

                			}
                			else{

	                			for(var i = elelist.length-1;i>=0;i--){
	                           
	                            noCheckHtml += '<div class="applies">';	

                                noCheckHtml +=     '<a href="../leave/leave_record.html?leaveId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            
                                noCheckHtml +=        '<div class="type">';

			    				noCheckHtml +=           '<span>'+elelist[i].flowName+'</span>';

	                            noCheckHtml +=           '<p>'+elelist[i].flowType+'</p>';

	                            noCheckHtml +=        '</div>';

			    				noCheckHtml +=        '<div class="person">';

                                noCheckHtml +=                    '<h5 class="name">'+elelist[i].staffName+'</h5>';

			    				noCheckHtml +=                    '<p class="time">'+elelist[i].createDate+'</p>';

			    				noCheckHtml +=        '</div>';

			    				noCheckHtml +=  '</a>';	 

			    				noCheckHtml +=  '</div>';

			    			    noCheckHtml +=  '<div class="checkOpen" data-instanceid="'+elelist[i].instanceId+'"><i class="iconfont icon-jiantou-copy-copy"></i></div>';
                                
                                noCheckHtml +=  '<div class="checkList_wrap"></div>';
			    		      
			    		       }
		    		     }

		    		     return noCheckHtml;
                            
                   }
                  //请假发起审核
                 console.log(launch.companyId,state);
				 $.ajax({

                	url:ipAdress+'/weixin/oaDoc/initiate',

                	data:{

                       tokenId:tokenId,

                       companyId:launch.companyId,

                       type:state,

                       deptId:launch.deptId
                	},
                	dataType:'json',

                	type:'POST',

                	success:function(res){
                        
                        console.log(res);

                        var launchHtml="",launchList=[];

                    	launchList = res.data[list];

                    	if (res.status==200) {

                    		launchHtml = checkList(launchList,launchHtml);

                    		$(ele).append(launchHtml);

                    	}

                	}
                })  
				
			},
			otherlaunch:function(ele,state,list){

				   // 待审核信息列表
                   var checkList = function(elelist,noCheckHtml){

                        	noCheckHtml = "";

                			if(!elelist){

                				elelist = [];

                			}
                			else{

	                			for(var i = elelist.length-1;i>=0;i--){
	                           
	                            noCheckHtml += '<div class="applies">';	

	                              if(elelist[i].formType=='csgl'){

	                            	noCheckHtml +=     '<a href="../overspeed/overSpeed_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }                           
                                 else if(elelist[i].formType=='pzgl'){
	                            	
	                            	noCheckHtml +=     '<a href="../license/license_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }
                                
                                else if(elelist[i].formType=='cljc'){
	                            	
	                            	noCheckHtml +=     '<a href="../inspection/inspection_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }   

	                            else if(elelist[i].formType=='zjjh'){
	                            	
	                            	noCheckHtml +=     '<a href="../moneyPlan/moneyPlan_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }      

	                            else if(elelist[i].formType=='jbjk'){
	                            	
	                            	noCheckHtml +=     '<a href="../basicLoan/basicLoan_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }

	                            else if(elelist[i].formType=='shfjk'){
	                            	
	                            	noCheckHtml +=     '<a href="../liveLoan/liveLoan_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }

	                            else if(elelist[i].formType=='sgjk'){
	                            	
	                            	noCheckHtml +=     '<a href="../accidentLoan/accidentLoan_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }                               
             
             					else if(elelist[i].formType=='sgck'){
	                            	
	                            	noCheckHtml +=     '<a href="../accidentSurvey/accidentSurvey_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }   

	                            else if(elelist[i].formType=='bx'){
	                            	
	                            	noCheckHtml +=     '<a href="../reimbursement/reimbursement_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            } 

                               else if(elelist[i].formType=='sckc'){

                                     noCheckHtml +=     '<a href="../productionDeduction/productionDeduction_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
                                }

                               else if(elelist[i].formType=='scjl'){

                                 	 noCheckHtml +=     '<a href="../productionReward/productionReward_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
                               }

                               else if(elelist[i].formType=='scbz'){

                                  	 noCheckHtml +=     '<a href="../productionSubsidy/productionSubsidy_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
                               }

                               else if(elelist[i].formType=='tysq'){

                                  	 noCheckHtml +=     '<a href="../applicationOutage/applicationOutage_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
                               }


                                  else if(elelist[i].formType=='fljsq'){// 福利金申请
	                            	
	                            	noCheckHtml +=     '<a href="../welfare/welfare_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }       
	                            
	                            else if(elelist[i].formType=='qksm'){// 情况说明
	                            	
	                            	noCheckHtml +=     '<a href="../situation/situation_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }       
	                            
	                            else if(elelist[i].formType=='ygjl'){// 员工奖励
	                            	
	                            	noCheckHtml +=     '<a href="../staffreward/staffreward_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }    
	                            
	                            else if(elelist[i].formType=='yzzz'){// 印章证照
	                            	
	                            	noCheckHtml +=     '<a href="../seallicense/seallicense_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }    
	                            
	                            else if(elelist[i].formType=='scwzcg'){// 生产物资采购
	                            	
	                            	noCheckHtml +=     '<a href="../productMaterials/productMaterials_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }    
	                            
	                            else if(elelist[i].formType=='dagl'){// 档案管理
	                            	
	                            	noCheckHtml +=     '<a href="../archives/archives_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }   
	                            
	                            else if(elelist[i].formType=='xzwzcg'){// 行政物资采购
	                            	
	                            	noCheckHtml +=     '<a href="../adminMaterials/adminMaterials_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }   

                                else if(elelist[i].formType=='yctj'){
	                            	
	                            	noCheckHtml +=     '<a href="../abnormallySubmission/abnormallySubmit_record.html?oaDocId='+elelist[i].id+'&companyId='+launch.companyId+'&deptId='+launch.deptId+'" class="apply_link">';
	                            }   

	                            noCheckHtml +=        '<div class="type">';

			    				noCheckHtml +=           '<span>'+elelist[i].flowName+'</span>';

	                            noCheckHtml +=           '<p>'+elelist[i].flowType+'</p>';

	                            noCheckHtml +=        '</div>';

			    				noCheckHtml +=        '<div class="person">';
 
                                noCheckHtml +=                    '<h5 class="name">'+elelist[i].userName+'</h5>';
	
                                noCheckHtml +=                    '<p class="time">'+elelist[i].createDate+'</p>';

			    				noCheckHtml +=        '</div>';

			    				noCheckHtml +=  '</a>';	 

			    				noCheckHtml +=  '</div>';

			    			    noCheckHtml +=  '<div class="checkOpen" data-instanceid="'+elelist[i].instanceId+'"><i class="iconfont icon-jiantou-copy-copy"></i></div>';
                                
                                noCheckHtml +=  '<div class="checkList_wrap"></div>';
			    		       
			    		       }
		    		     }

		    		     return noCheckHtml;
                            
                   }
                   //其他流程发起审核

                   console.log(tokenId,launch.companyId,state);
                   
                   $.ajax({

					url:ipAdress+'/weixin/oaDoc/initiateOther',

					data:{

                        tokenId:tokenId,

                        companyId:launch.companyId,

                        type:state,

                        deptId:launch.deptId
					},
					type:'POST',

					dataType:'json',

                    success:function(res){

                    	console.log(res);

                    	var launchHtml="",launchList=[];

                    	launchList = res.data[list];

                    	if (res.status==200) {

                    		launchHtml = checkList(launchList,launchHtml);

                    		$(ele).append(launchHtml);

                    	}
                    }
				})
              
			},
			//展开审核人
			checkerInit:function(ele){

				var checkedPerson = function(checkedList,nextStepName,checkedHtml){

					checkedHtml="";

					var flag = "";

                    if(!checkedList){

                    	checkedList=[];
                    }
                    else{
                    
                           checkedHtml ='<ul class="checkList">';

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
        launch.init();
	})
})	