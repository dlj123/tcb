require(['config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		var leaveSubmit = {
           
             init:function(){

             	this.param();
                
             },
             param:function(){

                 var path =  window.location.search;

                 path = path.slice(1);

                 path = common.parseUrl(path);

                 console.log(path);

                 $('.asidemenu').on('click',function(){

                     window.location.href='../home/index.html?companyId='+path.companyId+'&deptId='+path.deptId+'&btmIndex=0';
                 })

                 $('#successDetail').attr('href','leave_record.html?leaveId='+path.leaveId+'&companyId='+path.companyId+'&deptId='+path.deptId);

                 if($('#gohome_fail')){

                 	$('#gohome_fail').attr('href','../home/index.html?companyId='+path.companyId+'&deptId='+path.deptId+'&btmIndex=0');

                 }

                 if($('#gohome_success')){

                 	$('#gohome_success').attr('href','../home/index.html?companyId='+path.companyId+'&deptId='+path.deptId+'&btmIndex=0');

                 }
             } 
		}
		leaveSubmit.init();
    })
})