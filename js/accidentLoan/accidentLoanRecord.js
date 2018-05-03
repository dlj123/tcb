require(['../config'],function(config) {

	require(['jquery','common','fastclick','mui'], function ($, common,fastclick,mui) {

        var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var accidentLoanRecord = {

            oaDocId:"",

            companyId:"",

            deptId:"",
            accidentId:"",

			init:function(){

				this.recordInit();

                this.searchInit();

			},
			recordInit:function(){

				var path = window.location.search;

				path = path.slice(1);

				path = common.parseUrl(path);

                accidentLoanRecord.oaDocId = path.oaDocId;

                accidentLoanRecord.companyId = path.companyId;

                accidentLoanRecord.deptId = path.deptId;

				console.log(path);

                 $('.asidemenu').on('click',function(){

                    window.location.href="../home/index.html?companyId="+path.companyId+"&deptId="+path.deptId+"&btmIndex=0";

                 })

         $.ajax({

                 	url:ipAdress+'/weixin/oaDoc/view',

                 	data:{
                   
                      oaDocId:path.oaDocId
                 	},
                 	type:'POST',

                 	dataType:'json',

                 	success:function(res){
                      
                     console.log(res);

                     if(res.status == 200){

                             var picList = res.data.oaDocPicList,picHtml="",fileList= res.data.oaDocFileList,fileHtml="";


                             accidentLoanRecord.accidentId = res.data.wxOaDoc.pAccidentId;

                             $('.rewardDate').html(res.data.wxOaDoc.rewardDate);     

                             $('.company').html(res.data.wxOaDoc.companyName);               
                           
                             $('.deparmtent').html(res.data.wxOaDoc.deptName);

                             $('.position').html(res.data.wxOaDoc.position);

                             $('.people').html(res.data.wxOaDoc.userName);

                             $('.money').html(res.data.wxOaDoc.money);

                             $('.amount').html(res.data.wxOaDoc.amount);

                             $('.reason').html(res.data.wxOaDoc.reason);

                             $('.memo').html(res.data.wxOaDoc.memo);

                             $('.enterNumber').html(res.data.wxOaDoc.turnToNumber);

                             $('.enterName').html(res.data.wxOaDoc.turnToName);

                           if(res.data.wxOaDoc.applyType==60011003){
                                
                                $('#stateIcon').addClass('checkIcon');
                                 
                             }
                          else if(res.data.wxOaDoc.applyType==60011001){

                                $('#stateIcon').addClass('sucessIcon');
                          }
                          else{

                            $('#stateIcon').addClass('failIcon');
                          }
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

                      }
                      
                 	}
         })
			},
            searchInit:function(){

                 $('#search').on('click',function(){
                     
                     if(!accidentLoanRecord.oaDocId){

                         common.maskConfirm("暂无关联事件");

                     }
                     else{

                          window.location.href='../accidentSurvey/accidentSurvey_record.html?oaDocId='+accidentLoanRecord.accidentId+'&companyId='+accidentLoanRecord.companyId+'&deptId='+accidentLoanRecord.deptId;

                      }


                 });
          }
		}
        
		accidentLoanRecord.init();

	})
})	