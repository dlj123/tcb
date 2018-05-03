require(['config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

		var copy = {

			companyId:'',

			deptId:'',

			init:function(){
               
               this.dataInit();

               this.checkerInit('#copy_cont');

               this.toIndex();
 
			},
			toIndex:function(){

				$('.asidemenu').on('click',function(){

					 window.location.href="../home/index.html?companyId="+copy.companyId+"&deptId="+copy.deptId+"&btmIndex=0";
				})

			},
			dataInit:function(){

                  var path = window.location.search.slice(1);

                  path = common.parseUrl(path);

                  console.log(path);

                  copy.companyId =  path.companyId;

                  this.deptId = path.deptId;
                
				   // 抄送请假信息列表
                   var checkList = function(elelist,noCheckHtml){

                            noCheckHtml = "";

                			if(!elelist){

                				elelist = [];

                			}
                			else{

	                			for(var i = elelist.length-1;i>=0;i--){
	                           
		                            noCheckHtml += '<div class="applies">';	                           

	                                noCheckHtml +=     '<a href="../leave/leave_record.html?leaveId='+elelist[i].ID+'" class="apply_link">';

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

				    			    noCheckHtml += '<ul class="checkList"></ul>'; 
			    		       }
		    		     }

		    		     return noCheckHtml;
                            
                   }  

               //抄送其他流程列表
               var checkList02 = function(elelist,noCheckHtml){

                            noCheckHtml = "";

                			if(!elelist){

                				elelist = [];

                			}
                			else{

	                			for(var i = elelist.length-1;i>=0;i--){
	                           
		                            noCheckHtml += '<div class="applies">';	 

		                            if(elelist[i].FORM_TYPE=='csgl'){

		                            	noCheckHtml +=     '<a href="../overspeed/overSpeed_record.html?oaDocId='+elelist[i].ID+'" class="apply_link">';

		                            }                          
                                   else if(elelist[i].FORM_TYPE=='pzgl'){

                                        noCheckHtml +=     '<a href="../license/license_record.html?oaDocId='+elelist[i].ID+'" class="apply_link">';
                                   }
	                               else if(elelist[i].FORM_TYPE=='cljc'){

                                        noCheckHtml +=     '<a href="../inspection/inspection_record.html?oaDocId='+elelist[i].ID+'" class="apply_link">';
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

				    			    noCheckHtml += '<ul class="checkList"></ul>'; 
			    		       }
		    		     }

		    		     return noCheckHtml;
                            
                   }

				$.ajax({	
								
                   
					url:ipAdress+'/weixin/activitiSend/getActivitiSendList',

					data:{

                        tokenId:tokenId,
                        
                        companyId:copy.companyId,

                        deptId:copy.deptId
                        
					},
					type:'POST',

					dataType:'json',

                    success:function(res){
                       
                      console.log(res);

                      var copyList01 = res.data.leaveList;

                      var copyList02 = res.data.oaDocList;

                      if(copyList01.length>0){

	                      var copyHtml = checkList(copyList01,copyHtml);

                          $('#copy_cont').append(copyHtml);

                      }
                      if(copyList02.length>0){

                      	  var copyHtml02 = checkList02(copyList02,copyHtml02);

                          $('#copy_cont').append(copyHtml02);
                      }
                    }
				})
  


			},
			//展开审核人
			checkerInit:function(ele){

				var checkedPerson = function(checkedList,checkedHtml){

					checkedHtml="";

                    if(!checkedList){

                    	checkedList=[];
                    }
                    else{
                    

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
							checkedHtml +=		    		'<p>'+checkedList[i].AUDIT_STATUS_NAME+'</p>';
							checkedHtml +=		    		'<p>'+checkedList[i].AUDIT_DATE+'</p>';
							checkedHtml +=		    '</div>';
							checkedHtml +=		 '</div>';	
					    	checkedHtml +=	'</div>';
					    	checkedHtml +='</li>';
				    	}
				    	return checkedHtml;
				    	console.log(checkedHtml);
				    }
				}

				$(ele).on('click','.checkOpen',function(){

					var instanceId = $(this).data('instanceid');

                    console.log(instanceId);

                    var that = $(this);

					if($(this).next('.checkList').css('display')=='none'){
                      
                      $(this).next('.checkList').css('display','block');

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

								var checkedHtml = checkedPerson(checkedList,checkedHtml);

                                that.next('.checkList').html(checkedHtml);
							}
					    })

					}
					else{

						$(this).next('.checkList').css('display','none');
					}

				})
	
			}
		}
        copy.init();
	})
})	