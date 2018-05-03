 require(['../config'],function(config) {

	require(['jquery','common'], function ($, common) {

		  var ipAdress = common.ipAdress;

          var tokenId = sessionStorage.getItem("tokenId");

		  var monthPay = {

		  	    companyId:"",

                userId:"",

                salaryMonth:"",

                monthId:"",

                deptId:"",

			  	init:function(){

			         this.dataInit();

               this.confirmGongzi();

               this.toIndex();

			  	},

          toIndex:function(){

            $('.asidemenu').on('click',function(){

                window.location.href="../home/index.html?companyId="+monthPay.companyId+"&deptId="+monthPay.deptId+"&btmIndex=0";
            })

          },
			    dataInit:function(){

			    	  var formateMonth = function(value){

                    	var _value  = value;

                         _value =  _value.slice(5);

                         if(_value<=9){

                         	 return _value.slice(1);
                         }
                         else{

                         	return _value
                         }
                    }

                    var path = window.location.search;

                    path= path.slice(1);

                    path=common.parseUrl(path);

                    monthPay.companyId = path.companyId;

                    monthPay.userId = path.userId;

                    monthPay.salaryMonth = path.salaryMonth;

                    monthPay.deptId = path.deptId;

                    var month = formateMonth(path.salaryMonth);

                    $('.payroll_month span').html(month);

                    $('.basicPay a').attr('href','basicPay.html?companyId='+monthPay.companyId+'&userId='+monthPay.userId+'&salaryMonth='+monthPay.salaryMonth+'&deptId='+monthPay.deptId);

                    $('.performanceDetail a').attr('href','performanceDetail.html?companyId='+monthPay.companyId+'&userId='+monthPay.userId+'&salaryMonth='+monthPay.salaryMonth+'&deptId='+monthPay.deptId);

                    $('.saveOil a').attr('href','saveOil.html?companyId='+monthPay.companyId+'&userId='+monthPay.userId+'&salaryMonth='+monthPay.salaryMonth+'&deptId='+monthPay.deptId);

                    $('.otherDetail a').attr('href','otherDetail.html?companyId='+monthPay.companyId+'&userId='+monthPay.userId+'&salaryMonth='+monthPay.salaryMonth+'&deptId='+monthPay.deptId);

                    console.log(monthPay.companyId,monthPay.userId,monthPay.salaryMonth);

                    $.ajax({

                    	url:ipAdress+'/weixin/user/getUserSalaryByMonth',

                    	data:{

                            companyId:monthPay.companyId,

                            userId:monthPay.userId,

                            salaryMonth:monthPay.salaryMonth
                    	},

                    	dataType:'json',

                    	type:'POST',

                    	headers:{
                        
                            Accept: "application/json; charset=utf-8"
                    	},
                    	success:function(res){

                    		if(res.status==200){

                    		   console.log(res);

                               monthPay.monthId = res.data.MONTH_REPORT_ID;

                    		       $('.payroll_month em').html(res.data.DRIVER_SALARY_SUM);

                               $('.basicValue em').html(res.data.JIBENGONGZI);

                               $('.performanceValue em').html(res.data.JIXIAO_SALARY);

                               $('.saveOilValue em').html(res.data.JIEYOU_SALARY);

                               $('.otherValue em').html(res.data.OTHER_SALARY);

                               if(res.data.CONFIRM_STATUS==10011001){

                                  $('.comfirm_wrap').css('display','none');

                                  $('.statusIcon').removeClass('statusIcon01').addClass('statusIcon02');
                               }
                               else if(res.data.CONFIRM_STATUS==10011002){

                                  $('.comfirm_wrap').css('display','block');

                                  $('.statusIcon').addClass('statusIcon01');
                               }

                    		}
                    	}

                    })
			    },
                confirmGongzi:function(){

                   
                    $('.comfirm_wrap button').on('click',function(res){

                            mui.confirm("确认","是否确认工资明细",function(e){

                              if(e.index == 1){

                                   console.log(monthPay.monthId,monthPay.monthId);

                                   $.ajax({

                                    url:ipAdress+'/weixin/user/updateDriverConfirmStatus',

                                    data:{

                                       MONTH_REPORT_ID:monthPay.monthId,

                                       userId:monthPay.userId
                                    },

                                    dataType:'json',

                                    type:'POST',

                                    headers:{

                                      Accept: "application/json; charset=utf-8"
                                    },
                                    success:function(res){

                                        if(res.status==200){

                                             console.log(res);

                                             common.maskConfirm02("确认成功！！",function(){

                                                  $('.comfirm_wrap').css('display','none');
                                                 
                                                  $('.statusIcon').addClass('statusIcon02');
                                             });

                                        }

                                    }
                                })
                              }
                            })



                    })
  
                }
               
		  }

         monthPay.init();
	})
})	