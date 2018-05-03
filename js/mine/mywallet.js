 require(['../config'],function(config) {

	require(['jquery','common'], function ($, common) {

		  var ipAdress = common.ipAdress;

          var tokenId = sessionStorage.getItem("tokenId");

		  var mywallet = {

		  	    companyId:"",

		  	    userId:"",

		  	    deptId:"",

			  	init:function(){

                    this.dataInit();

			  		this.selectTime();

			  		this.toCurrent();

			  		this.toIndex();

			  	},
			  	toIndex:function(){

			  		$('.asidemenu').on('click',function(){

			  			window.location.href="../home/index.html?companyId="+mywallet.companyId+"&deptId="+mywallet.deptId+"&btmIndex=0";
			  		})
			  	},
			  	formateMonth:function(value){
                   
                    	var _value  = value;

                         _value =  _value.slice(5);

                         if(_value<=9){

                         	 return _value.slice(1);
                         }
                         else{

                         	return _value
                         }
			  	},
			  	dataInit:function(){

			  		var today = new Date();

			  	    var year = today.getFullYear();

			  	    $('#yearValue').html(year+'年');

			  		var path = window.location.search;

			  		    path = path.slice(1);

			  		    path=common.parseUrl(path);

			  		    console.log(path);

			  		    mywallet.companyId = path.companyId;

                        mywallet.userId = path.userId;

                        mywallet.deptId = path.deptId; 
 
                        console.log(mywallet.companyId,mywallet.userId,year);
                
                    $.ajax({

                         url:ipAdress+'/weixin/user/getUserSalaryMonthList',

                         data:{

                            companyId:mywallet.companyId,

                            userId:mywallet.userId,

                            salaryYear:year

                         },
                         dataType:'json',

                         type:'POST',

                         headers: {

                             Accept: "application/json; charset=utf-8"
                         },
                         success:function(res){


                         	if(res.status==200){

                         	    console.log(res);

                         	    var monthList = res.data.monthList,monthListH="";

                         	    for(var i = 0;i < monthList.length;i++){

                                    monthListH +=    '<li>';

									monthListH +=                 '<a href="monthPay.html?salaryMonth='+monthList[i].SALARY_MONTH+'&companyId='+mywallet.companyId+'&userId='+mywallet.userId+'&deptId='+mywallet.deptId+'">';

                                  if(monthList[i].CONFIRM_STATUS==10011001){

									monthListH +=                      '<div class="label">'+mywallet.formateMonth(monthList[i].SALARY_MONTH)+'月<span class="confirm">(已确认)</span></div>';
                                  
                                  }
                                  else if(monthList[i].CONFIRM_STATUS==10011002){

                                  	monthListH +=                      '<div class="label">'+mywallet.formateMonth(monthList[i].SALARY_MONTH)+'月<span class="noConfirm">(未确认)</span></div>';
                                  }
									monthListH +=                       '<div class="value">'+monthList[i].DRIVER_SALARY_SUM+'<i class="iconfont icon-arrow-right"></i></div>';
                                
									monthListH +=                 '</a>';

					                monthListH +=       '</li>' 
                         	    }
                         	    //console.log(monthListH);
                                $('.monthValue_list').html(monthListH);
                         	}
                        }
                    })
			  	},
			  	selectTime:function(){

                    $('#selectYear').on('tap',function(){

			  			    mui.init();

		                    var dtPicker = new mui.DtPicker({

					  			"type":'year',

					  			"labels":["年"],

					  			"beginDate": new Date(2008,01),

		                        "endDate": new Date(2018,01)
					  		}); 

					  		

						    dtPicker.show(function (selectItems) { 

		                        console.log(selectItems);

						        $('#yearValue').html(selectItems.y.text+'年');


						           $.ajax({

				                         url:ipAdress+'/weixin/user/getUserSalaryMonthList',

				                         data:{

				                            companyId:mywallet.companyId,

				                            userId:mywallet.userId,

				                            salaryYear:selectItems.y.text

				                         },
				                         dataType:'json',

				                         type:'POST',

				                         headers: {

				                             Accept: "application/json; charset=utf-8"
				                         },
				                         success:function(res){


				                         	if(res.status==200){

				                         	    console.log(res);

				                         	    var monthList = res.data.monthList,monthListH="";

				                         	    for(var i = 0;i < monthList.length;i++){

				                                    monthListH += '<li>';

													monthListH +=                  '<a href="monthPay.html?salaryMonth='+monthList[i].SALARY_MONTH+'&companyId='+mywallet.companyId+'&userId='+mywallet.userId+'">';
                                          
                                                    if(monthList[i].CONFIRM_STATUS==10011001){

                                                       monthListH +=                       '<div class="label">'+mywallet.formateMonth(monthList[i].SALARY_MONTH)+'月<span class="confirm">(已确认)</span></div>';
                                                     }
												    else if(monthList[i].CONFIRM_STATUS==10011002){

                                                       monthListH +=                       '<div class="label">'+mywallet.formateMonth(monthList[i].SALARY_MONTH)+'月<span class="noConfirm">(未确认)</span></div>';

												    }

													monthListH +=                        '<div class="value">'+monthList[i].DRIVER_SALARY_SUM+'<i class="iconfont icon-arrow-right"></i></div>';
				                                
													monthListH +=                 '</a>';

									                monthListH +=              '</li>' 
				                         	    }
				                         	    //console.log(monthListH);
				                                $('.monthValue_list').html(monthListH);
				                         	}
				                        }
				                })

						         dtPicker.dispose();

						    })

			  		})//选择月份的tap事件

			  		
			  	},
			  	toCurrent:function(){

			  		$('.wallet_top').on('click',function(){

			  			 window.location.href='performancePay.html';

			  		})
			  	}

		  }

         mywallet.init();
	})
})	