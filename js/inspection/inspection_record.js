require(['../config'],function(config) {

	require(['jquery','common','fastclick','mui'], function ($, common,fastclick,mui) {

        var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var overSpeedRecord = {

			init:function(){

				this.recordInit();

			},
			recordInit:function(){

				var path = window.location.search;

				path = path.slice(1);

				path = common.parseUrl(path);

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

                             $('.carNum').html(res.data.wxOaDoc.carNo);

                             $('.carPerson').html(res.data.wxOaDoc.nUserName);

                             $('.checkDate').html(res.data.wxOaDoc.rewardDate);

                             $('.checkMemo').html(res.data.wxOaDoc.memo);

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

          //车辆检查详情
          $.ajax({

            url:ipAdress+'/weixin/oaDoc/getCarCheck',

            data:{
               oaDocId:path.oaDocId
            },
            dataType:'json',

            type:'POST',

            success:function(res){
                 
                 console.log(res);

                 var wxOaDocSub = res.data.wxOaDocSub;

                 $('#jc1').html(wxOaDocSub.jc1);
                 $('#jc2').html(wxOaDocSub.jc2);
                 $('#jc3').html(wxOaDocSub.jc3);
                 $('#jc4').html(wxOaDocSub.jc4);
                 $('#jc5').html(wxOaDocSub.jc5);
                 $('#jc6').html(wxOaDocSub.jc6);
                 $('#jc7').html(wxOaDocSub.jc7);
                 $('#jc8').html(wxOaDocSub.jc8);
                 $('#jc9').html(wxOaDocSub.jc9);
                 $('#jc10').html(wxOaDocSub.jc10);
            }

          })      
			}
		}
		overSpeedRecord.init();

	})
})	