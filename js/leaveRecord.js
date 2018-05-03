require(['config'],function(config) {

	require(['jquery','common','fastclick','mui'], function ($, common,fastclick,mui) {

        var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var leaveRecord = {

           companyId:"",
 
           deptId:"",

			init:function(){



				this.recordInit();

        this.toIndex();

			},
      toIndex:function(){
           
           $('.asidemenu').on('click',function(){

               window.location.href="../home/index.html?companyId="+leaveRecord.companyId+"&deptId="+leaveRecord.deptId+"&btmIndex=0"
           })
      },
			recordInit:function(){

				var path = window.location.search;

				path = path.slice(1);

				path = common.parseUrl(path);

        leaveRecord.companyId = path.companyId;

        leaveRecord.deptId = path.deptId;
 
				console.log(path);

				var getValue = function(value){

                     if(value=='70011001'){

                        return "事假";

                     }
                     else if(value=='70011002'){

                        return "病假";
                     }
				}
                var getTime = function(value){

                   return value = value.slice(0,10);
                } 
                 $.ajax({

                 	url:ipAdress+'/weixin/staffLeave/view',

                 	data:{
                   
                      leaveId:path.leaveId
                 	},
                 	type:'POST',

                 	dataType:'json',

                 	success:function(res){
                      
                       console.log(res);

                       var picList = res.staffLeavePicList,picHtml="",fileList= res.staffLeaveFileList,fileHtml="";

                       $('.name').html(res.tmStaffLeave.staffName);

                       $('.company').html(res.tmStaffLeave.companyName);

                       $('.department').html(res.tmStaffLeave.deptName);

                       $('.position').html(res.tmStaffLeave.positionName);

                       $('.leaveType').html(getValue(res.tmStaffLeave.status));

                       $('.startTime').html(getTime(res.tmStaffLeave.beginTime));

                       $('.endTime').html(getTime(res.tmStaffLeave.overTime));

                       $('.leaveDay').html(res.tmStaffLeave.leaveDay+'天');

                       $('.leaveMemo').html(res.tmStaffLeave.memo);

                       for(var i = 0;i<picList.length;i++){

                         picHtml += ' <li>'+
                                        '    <div>'+
                                        '       <img src="'+picList[i].PIC_PATH+'" alt="" title="">'+
                                        '    </div>'+
                                       ' </li>';

                         }

                        $('#picList').html(picHtml);

                        for(var i =0;i<fileList.length;i++){

                           fileHtml += '<li><a href="'+fileList[i].PIC_PATH+'">'+fileList[i].FILE_NAME+'</a></li>'

                        }
                        $('#fileList').html(fileHtml);
                       //请假状态的显示

                       if(res.tmStaffLeave.applyType=='60011003'){

                           $('#stateIcon').removeClass('failIcon sucessIcon').addClass('checkIcon');

                       }
                       else if(res.tmStaffLeave.applyType=='60011002'){

                           $('#stateIcon').removeClass('sucessIcon checkIcon').addClass('failIcon');
                       }
                       else{

                           $('#stateIcon').removeClass('failIcon checkIcon').addClass('sucessIcon');
                       }

                 	}
                 })
			}
		}
		leaveRecord.init();

	})
})	