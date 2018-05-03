 require(['../config'],function(config) {

	require(['jquery','common'], function ($, common) {

		  var ipAdress = common.ipAdress;

          var tokenId = sessionStorage.getItem("tokenId");

		  var basicPay = {

		  	    companyId:"",

                userId:"",

                salaryMonth:"",

                deptId:"",

			  	init:function(){

			       this.dataInit();

                   this.toIndex();

			  	},
                toIndex:function(){

                     $('.asidemenu').on('click',function(){

                      window.location.href='../home/index.html?companyId='+basicPay.companyId+'&deptId='+basicPay.deptId+'&btmIndex=0';
                   })
                },
			
                dataInit:function(){

                	var delZero= function(value){

		                    	var _value = value;

		                    	if(_value=='0'){
		                    		return "";
		                    	}
		                    	else{
		                    		return _value;
		                    	}
		                 }

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

                    basicPay.companyId = path.companyId;

                    basicPay.userId = path.userId;

                    basicPay.salaryMonth = path.salaryMonth;

                    basicPay.deptId = path.deptId;

                    var month = formateMonth(path.salaryMonth);

                    $.ajax({

                    	url:ipAdress+'/weixin/user/getUserSalaryByMonth',

                    	data:{

                            companyId:basicPay.companyId,

                            userId:basicPay.userId,

                            salaryMonth:basicPay.salaryMonth
                    	},

                    	dataType:'json',

                    	type:'POST',

                    	headers:{
                        
                            Accept: "application/json; charset=utf-8"
                    	},
                    	success:function(res){

                    		if(res.status==200){

                    		   console.log(res);

                               $('.payroll_money em').html(res.data.JIBENGONGZI);

                    		   $('.dixin .value').html(delZero(res.data.DIXIN));

                    		   $('.quanqinjiang .value').html(delZero(res.data.QUANQINJIANG));

                    		   $('.weishengjiang .value').html(delZero(res.data.WEISHENGJIANG));

                               $('.anquanjiang .value').html(delZero(res.data.ANQUANJIANG));

                               $('.shuangbanbuzhu .value').html(delZero(res.data.SHUANGBANBUZHU));

                               $('.canbu .value').html(delZero(res.data.CANBU));

                               $('.bingjiakouchu .value').html(delZero(res.data.BINGJIAKOUCHU));

                               $('.shijiakouchu .value').html(delZero(res.data.SHIJIAKOUCHU));

                               $('.kuanggongkouchu .value').html(delZero(res.data.KUANGGONGKOUCHU));

                    		}
                    	}

                    })
                }
		  }

         basicPay.init();
	})
})	