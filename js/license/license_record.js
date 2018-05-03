require(['../config'],function(config) {

	require(['jquery','common','fastclick','mui'], function ($, common,fastclick,mui) {

        var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var overSpeedRecord = {

          companyId:'',

          deptId:'',

			init:function(){

				this.recordInit();

        this.toIndex();

			},
      toIndex:function(){

          $('.asidemenu').on('click',function(){

              window.location.href="../home/index.html?companyId="+overSpeedRecord.companyId+"&deptId="+overSpeedRecord.deptId;
          })
      },
			recordInit:function(){

				var path = window.location.search;

				path = path.slice(1);

				path = common.parseUrl(path);

        overSpeedRecord.companyId = path.companyId;

        overSpeedRecord.deptId = path.deptId;

				console.log(path);

                $.ajax({

                 	url:ipAdress+'/weixin/oaDoc/view',

                 	data:{
                   
                      oaDocId:path.oaDocId

                 	},

                 	type:'POST',

                 	dataType:'json',

                 	success:function(res){
                      
                     console.log(res);

                     //var picList = res.data.oaDocPicList,picHtml="";

                     if(res.status == 200){

                      var picList = res.data.oaDocPicList,picHtml="",fileList= res.data.oaDocFileList,fileHtml="";

                             $('.company').html(res.data.wxOaDoc.nCompanyName);               
                           
                             $('.deparmtent').html(res.data.wxOaDoc.nDeptName);

                             $('.carNum').html(res.data.wxOaDoc.carNo);

                             $('.certifyNum').html(res.data.wxOaDoc.certificateNumber+'次');

                              if(res.data.wxOaDoc.licenseType=='11000001'){

                                 $('.cartifyType').html("人为破坏");
                              }
                              else if(res.data.wxOaDoc.licenseType=='11000002'){

                                 $('.cartifyType').html("牌证丢失");
                              }
                              else if(res.data.wxOaDoc.licenseType=='11000003'){
                                
                                 $('.cartifyType').html("自然耗损");
                              }
                             $('.certifyMemo').html(res.data.wxOaDoc.memo);

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
			}
		}
		overSpeedRecord.init();

	})
})	