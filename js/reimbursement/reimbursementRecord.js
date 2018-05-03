require(['../config'],function(config) {

	require(['jquery','common','fastclick','mui'], function ($, common,fastclick,mui) {

        var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var oaDocId = "";

        var reimbursementRecord = {

			init:function(){

				this.recordInit();

                this.searchInit();

			},
			recordInit:function(){

				var path = window.location.search;

				path = path.slice(1);

				path = common.parseUrl(path);

                oaDocId = path.oaDocId;

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

                             $('.company').html(res.data.wxOaDoc.nCompanyName);               
                           
                             $('.deparmtent').html(res.data.wxOaDoc.nDeptName);

                             $('.position').html(res.data.wxOaDoc.nPositionName);

                             $('.people').html(res.data.wxOaDoc.nUserName);

                             var oaDocBxList = res.data.oaDocBxList;
                             for (var i = 0; i < oaDocBxList.length; i++) {
                                 var s = "";
                                 s += "<div class='item'><div class='label'>预算内费用</div><div class='info_item inLoan'>"+oaDocBxList[i].IN_LOAN+"</div></div>";
                                 s += "<div class='item'><div class='label'>预算外费用</div><div class='info_item outLoan'>"+oaDocBxList[i].OUT_LOAN+"</div></div>";
                                 s += "<div class='item'><div class='label'>金额</div><div class='info_item money'>"+oaDocBxList[i].MONEY+"</div></div>";
                                 s += "<div class='item'><div class='label'>打入姓名</div><div class='info_item turnToName'>"+oaDocBxList[i].TURN_TO_NAME+"</div></div>";
                                 s += "<div class='item'><div class='label'>打入卡号</div><div class='info_item turnToNumber'>"+oaDocBxList[i].TURN_TO_NUMBER+"</div></div>";
                                 s += "<div class='item'><div class='label'>摘要</div><div class='info_item roundup'>"+oaDocBxList[i].ROUNDUP+"</div></div>";

                                 $("#recordDiv").append(s);
                             }


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
                    window.location.href='../reimbursement/reimbursement_record.html?oaDocId='+oaDocId;
                 });
        }
		}
        
		reimbursementRecord.init();

	})
})	