 require(['../config'],function(config) {

	require(['jquery','common'], function ($, common) {

			  var ipAdress = common.ipAdress;

	          var tokenId = sessionStorage.getItem("tokenId");

			  var otherDetail = {

			  	    companyId:"",

                    userId:"",

                    salaryMonth:"",

                    deptId:'',

				  	init:function(){
      
				       this.dataInit();   

				       this.toIndex(); 

				  	},
				  	 toIndex:function(){

	                     $('.asidemenu').on('click',function(){

	                      window.location.href='../home/index.html?companyId='+otherDetail.companyId+'&deptId='+otherDetail.deptId+'&btmIndex=0';
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
		                    var delZero= function(value){

		                    	var _value = value;

		                    	if(_value=='0'){

		                    		return "";
		                    	}
		                    	else{

		                    		return _value;
		                    	}
		                    }
		                    var path = window.location.search;

		                    path = path.slice(1);

		                    path = common.parseUrl(path);

		                    otherDetail.companyId = path.companyId;

		                    otherDetail.userId = path.userId;

		                    otherDetail.salaryMonth = path.salaryMonth;

		                     otherDetail.deptId = path.deptId;

		                    var month = formateMonth(path.salaryMonth);

		                    $.ajax({

		                    	url:ipAdress+'/weixin/user/getUserSalaryByMonth',

		                    	data:{

		                            companyId:otherDetail.companyId,

		                            userId:otherDetail.userId,

		                            salaryMonth:otherDetail.salaryMonth
		                    	},

		                    	dataType:'json',

		                    	type:'POST',

		                    	headers:{
		                        
		                            Accept: "application/json; charset=utf-8"
		                    	},
		                    	success:function(res){

		                    		if(res.status==200){

		                    		   console.log(res);

		                    		   $('.payroll_money em').html(res.data.OTHER_SALARY);

		                    		   $('.shengchanjiangli .value').html(delZero(res.data.SHENGCHANJIANGLI));

		                    		   $('.shengchanbuzhu .value').html(delZero(res.data.SHENGCHANBUZU));

		                    		   $('.jiabanbuzhu .value').html(delZero(res.data.JIABANBUZHU));

		                               $('.yiwaishanghai .value').html(res.data.YIWAISHANGHAIXIAN > 0 ? '-'+res.data.YIWAISHANGHAIXIAN : '');

		                               $('.shebao .value').html(res.data.SHEBAO > 0 ? '-'+res.data.SHEBAO : '');

		                               $('.jijin .value').html(res.data.JIJIN > 0 ? '-'+res.data.JIJIN : '');

		                               $('.peixunkouchu .value').html(res.data.PEIXUNKOUCHU > 0 ? '-'+res.data.PEIXUNKOUCHU : '');

		                               $('.shigukouchu .value').html(res.data.SHIGUKOUCHU > 0 ? '-'+res.data.SHIGUKOUCHU : '');

		                               $('.shenghuofeikouchu .value').html(res.data.SHENGHUOFEIKOUCHU > 0 ? '-'+res.data.SHENGHUOFEIKOUCHU : '');

		                               $('.chaosukouchu .value').html(res.data.CHAOSUKOUCHU > 0 ? '-'+res.data.CHAOSUKOUCHU : '');

		                               $('.gonglingongzi .value').html(delZero(res.data.GONGLINGGONGZI));

		                    		}
		                    	}

		                    })
				  	}
				}

	         otherDetail.init();
	})
})	