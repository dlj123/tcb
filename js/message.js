require(['config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {
		 var ipAdress = common.ipAdress;

		var tokenId = sessionStorage.getItem("tokenId"),companyId="",carId="",companyId02="",deptId="",personInit = {};

       	var message = {

       	   init:function(){

       	   	   common.tab('.top_tab ul li','.content_panel');  
                        	
            	this.dataInit();

              this.toIndex();
             
       	   },
           toIndex:function(){

              $('.asidemenu').on('click',function(){

                 window.location.href="../home/index.html?companyId="+companyId+"&deptId="+deptId+"&btmIndex=0";
              })
           },
 			dataInit:function(){

                 var path = window.location.search;

                    path = path.slice(1);

                    path = common.parseUrl(path);

                    companyId = path.companyId;

                    deptId = path.deptId;
                         
                 $.ajax({

                    url:ipAdress+'/weixin/oaDoc/page',

                    data:{
                          
                       tokenId: tokenId,

                       companyId:companyId,

                       deptId:deptId
                    },
                    dataType:'json',

                    type:'POST',

                    success:function(res){
 			
                      personInit.companyId = res.tmCompany.id;

                      personInit.deptId = res.userList[0].DEPARTMENT_ID;

                      personInit.positonId = res.userList[0].POSITION_ID;

                      personInit.userId = res.tmUser.id;

                      $.ajax({

                                    url:ipAdress+'/weixin/oaDoc/afficheMessage',

                                    data:{

                                      companyId:personInit.companyId,
                                      deptId:personInit.deptId,
                                      positionId:personInit.positonId,
                                      userId:personInit.userId

                                    },
                                    type:'POST',

                                    dataType:'json',

                                    success:function(res){

                                      console.log(res);

                                      var list = res.data.tmAfficheList,listHtml="";
                                      var list1 = res.data.tmAfficheList1;
                                      var list2 = res.data.tmAfficheList2;
                                      var list3 = res.data.tmAfficheList3;
                                      var list4 = res.data.tmAfficheList4;
                                      var dateValue = function(value){

                                           value = value.slice(0,10);

                                           value = value.replace(/-/g,"-");

                                           return value;
                                           
                                           console.log(value);
                                      }


                                      var timeValue = function(value){

                                           value = value.slice(11,16);

                                           value = value.replace(/-/g,":");

                                           return value;
                                           
                                           console.log(value);
                                      }

                                      for (var i = list.length-1; i >= 0; i--) {
                
                                                listHtml +='<li class="item"><a href="message_record.html?afficheId='+list[i].ID+'">';                         

                                                listHtml += ' <div class="pic">';

                                                listHtml += '     <img src="../../images/perpic.jpg" alt="" title="">';

                                                listHtml += ' </div>';

                                                listHtml += ' <div class="infos_wrap">';

                                                listHtml += '   <div class="infos_cont">';

                                                listHtml += '       <div class="title_time">';

                                                listHtml += '           <h5>'+list[i].TITLE+'</h5>';     

                                                listHtml += '           <p>'+dateValue(list[i].SEND_DATE)+'&nbsp;'+timeValue(list[i].SEND_DATE)+'</p>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '       <div class="right_point">';

                                                listHtml += '           <i class="iconfont icon-arrow-right"></i>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '   </div>'; 

                                                listHtml += ' </div >';                                   
                                          
                                                listHtml +=  '</a></li>';
                                       
                                      }


                                      for (var i = list1.length-1; i >= 0; i--) {
                
                                                listHtml +='<li class="item"><a href="message_record.html?afficheId='+list1[i].ID+'">';                         

                                                listHtml += ' <div class="pic">';

                                                listHtml += '     <img src="../../images/perpic.jpg" alt="" title="">';

                                                listHtml += ' </div>';

                                                listHtml += ' <div class="infos_wrap">';

                                                listHtml += '   <div class="infos_cont">';

                                                listHtml += '       <div class="title_time">';

                                                listHtml += '           <h5>'+list1[i].TITLE+'</h5>';     

                                                listHtml += '           <p>'+dateValue(list1[i].SEND_DATE)+'&nbsp;'+timeValue(list1[i].SEND_DATE)+'</p>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '       <div class="right_point">';

                                                listHtml += '           <i class="iconfont icon-arrow-right"></i>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '   </div>'; 

                                                listHtml += ' </div >';                                   
                                          
                                                listHtml +=  '</a></li>';
                                       
                                      }


                                      for (var i = list2.length-1; i >= 0; i--) {
                
                                                listHtml +='<li class="item"><a href="message_record.html?afficheId='+list2[i].ID+'">';                         

                                                listHtml += ' <div class="pic">';

                                                listHtml += '     <img src="../../images/perpic.jpg" alt="" title="">';

                                                listHtml += ' </div>';

                                                listHtml += ' <div class="infos_wrap">';

                                                listHtml += '   <div class="infos_cont">';

                                                listHtml += '       <div class="title_time">';

                                                listHtml += '           <h5>'+list2[i].TITLE+'</h5>';     

                                                listHtml += '           <p>'+dateValue(list2[i].SEND_DATE)+'&nbsp;'+timeValue(list2[i].SEND_DATE)+'</p>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '       <div class="right_point">';

                                                listHtml += '           <i class="iconfont icon-arrow-right"></i>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '   </div>'; 

                                                listHtml += ' </div >';                                   
                                          
                                                listHtml +=  '</a></li>';
                                       
                                      }


                                      for (var i = list3.length-1; i >= 0; i--) {
                
                                                listHtml +='<li class="item"><a href="message_record.html?afficheId='+list3[i].ID+'">';                         

                                                listHtml += ' <div class="pic">';

                                                listHtml += '     <img src="../../images/perpic.jpg" alt="" title="">';

                                                listHtml += ' </div>';

                                                listHtml += ' <div class="infos_wrap">';

                                                listHtml += '   <div class="infos_cont">';

                                                listHtml += '       <div class="title_time">';

                                                listHtml += '           <h5>'+list3[i].TITLE+'</h5>';     

                                                listHtml += '           <p>'+dateValue(list3[i].SEND_DATE)+'&nbsp;'+timeValue(list3[i].SEND_DATE)+'</p>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '       <div class="right_point">';

                                                listHtml += '           <i class="iconfont icon-arrow-right"></i>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '   </div>'; 

                                                listHtml += ' </div >';                                   
                                          
                                                listHtml +=  '</a></li>';
                                       
                                      }


                                      for (var i = list4.length-1; i >= 0; i--) {
                
                                                listHtml +='<li class="item"><a href="message_record.html?afficheId='+list4[i].ID+'">';                         

                                                listHtml += ' <div class="pic">';

                                                listHtml += '     <img src="../../images/perpic.jpg" alt="" title="">';

                                                listHtml += ' </div>';

                                                listHtml += ' <div class="infos_wrap">';

                                                listHtml += '   <div class="infos_cont">';

                                                listHtml += '       <div class="title_time">';

                                                listHtml += '           <h5>'+list4[i].TITLE+'</h5>';     

                                                listHtml += '           <p>'+dateValue(list4[i].SEND_DATE)+'&nbsp;'+timeValue(list4[i].SEND_DATE)+'</p>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '       <div class="right_point">';

                                                listHtml += '           <i class="iconfont icon-arrow-right"></i>';  

                                                listHtml += '       </div>'; 

                                                listHtml += '   </div>'; 

                                                listHtml += ' </div >';                                   
                                          
                                                listHtml +=  '</a></li>';
                                       
                                      }


                                      $('.public_notice').html(listHtml);

                                    }
                                  })             

                          console.log(res);
                  }
                    
                 })

            },
	}
       message.init();

	})

})	