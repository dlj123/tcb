require(['config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		 var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var index = {

      companyId:'',

      deptId:'',

      btmIndex:'',
 
			init:function(){
                
                this.indexData();

                this.selectLayer();

                this.companyConfirm();
			},
			indexData:function(){

				var path = window.location.search.slice(1);

                var companydata = common.parseUrl(path);

                index.btmIndex = companydata.btmIndex;

                index.companyId = companydata.companyId;

                index.deptId = companydata.deptId;

                console.log(index.deptId);

                $.ajax({      //主菜单获取

                   url:ipAdress+'/weixin/index',

                   data:{

                   	 tokenId:tokenId,

                   	 companyId:companydata.companyId,

                     deptId:index.deptId

                   },

                   async: false,

                   type:'POST',

                   dataType:'json',

                   success:function(res){

                   	   console.log(res);
           
                       var mainMenu = res.menus,inSection="",subList="",companyName="",companyid="",footMenu = res.menuBottom,menuBottomH="";

                       companyName = res.tmCompany.companyName;

                       companyid = res.companyId;

                       $('.insec1_menus .launch a').attr('href','../launchCheck/launch.html?companyId='+res.tmCompany.id+'&deptId='+index.deptId);

                       $('.insec1_menus .examine a').attr('href','../launchCheck/check.html?companyId='+res.tmCompany.id+'&deptId='+index.deptId);

                       $('.insec1_menus .copy a').attr('href','../launchCheck/copy.html?companyId='+res.tmCompany.id+'&deptId='+index.deptId);

                       $('.message a').attr("href","../message/message.html?companyId="+res.tmCompany.id+'&deptId='+index.deptId);

                       console.log(companyName);

                       $('#compa_name').html(companyName);

                       for(var i = 0;i<mainMenu.length;i++){
             				
                       	       var subMenu = mainMenu[i].subMenuList;
                           
                               if(mainMenu[i].subMenuList.length == 0){

                                   inSection += "";

                               }else{
                                       inSection += "<div class='inSection'><h3 class='tit'>"+mainMenu[i].menuName+"</h3><ul class='inSection_list' id='inSection_list"+i+"'>"

                               }


	                       	    for(var j = 0;j < subMenu.length;j++){
	                                    
	                                     inSection +="<li><div class='item clock'>";

                                    	 inSection +=" 		<a href="+subMenu[j].menuUrl+"?companyId="+ companyid + "&deptId="+index.deptId+">";

	                                     inSection +="			<span style='background:url(../../images/"+subMenu[j].menuIcon+");background-size:cover'></span>";

	                                     inSection +="		<p>"+subMenu[j].menuName+"</p>";
	                                     
	                                     inSection +="	</a></div></li>";
	                                      	  
	                       	    }
                     	   		inSection +=" </ul></div>";

                               $('#inSecCont').html(inSection);
                      
                       	       
                      }

                      console.log(companydata.companyId);
                        
                    //底部菜单
                  for(var i = 0;i<footMenu.length;i++){
                    
                           var bottomMenu = footMenu[i].subMenuList;
                         
                           for(var j = 0;j < bottomMenu.length;j++){
                                            
                                    if(index.btmIndex==j){

                                       menuBottomH += '<li class="active">';
                                    }

                                   else{
                                       menuBottomH += '<li class="">';
                                   }
                                    menuBottomH +=   '<a href='+bottomMenu[j].menuUrl+'?btmIndex='+j+'&companyId='+companydata.companyId+'&deptId='+companydata.deptId+'>';

                                    if(index.btmIndex==j){

                                        menuBottomH +=      '<span style="background: url(../../images/'+bottomMenu[j].menuIcon+') no-repeat left top;background-size: contain;"></span>';
                                    }
                                    else{
                                        menuBottomH +=      '<span style="background: url(../../images/'+bottomMenu[j].menuNoneIcon+') no-repeat left top;background-size: contain;"></span>';
                                    }
                                    menuBottomH +=      '<p>'+bottomMenu[j].menuName+'</p>';

                                    menuBottomH +=    '</a>';
                                    
                                    menuBottomH +=  '</li>';
                                                  
                              }
                    }

                    $('#footMenu').html(menuBottomH);

                   }
                })

                console.log(tokenId,index.companyId,index.deptId);

                $.ajax({   //发起审核中的流程数量

                    url:ipAdress+'/weixin/oaDoc/getInitiateCount',

                    data:{
                        tokenId:tokenId,
                        companyId:index.companyId,
                        deptId:index.deptId
                    },
                    dataType:'json',

                    type:'POST',

                    headers:{

                         Accept: "application/json; charset=utf-8"
                    },
                    success:function(res){

                       console.log(res);

                       if(res.status==200 && res.data.initiateCount>0){

                         $('.insec1_menus .launch div').before('<span class="num">'+res.data.initiateCount+'</span>');

                       }
                    }
                })
                  $.ajax({   //当前登录人审核中流程的数量

                    url:ipAdress+'/weixin/oaDoc/getApplyNoCount',

                    data:{

                        tokenId:tokenId,

                        companyId:index.companyId
                    },
                    dataType:'json',

                    type:'POST',
                    
                    headers:{

                         Accept: "application/json; charset=utf-8"
                    },
                    success:function(res){

                       console.log(res);

                       if(res.status==200 && res.data.initiateCount>0){

                           $('.insec1_menus .examine div').before('<span class="num">'+res.data.initiateCount+'</span>');
                       }
                    }
                })
            },
            selectLayer:function(){

              $('#compa_name').on('click',function(){

                var companyList = [],companyHtml='';

                $.ajax({

                  url:ipAdress+'/weixin/main',

                  async: false,

                  data:{

                    tokenId:tokenId

                  },

                  type:'POST',

                  dataType:'json',

                  success:function(res){

                     console.log(res);

                     companyList = res.companyList;

                     if(companyList.length>1){

                        for (var i = 0;i < companyList.length; i++) {

                          if(index.companyId == companyList[i].id){

                              companyHtml += "<li data-companyid='"+companyList[i].id+"' class='active'><a href='javascript:;'>"+companyList[i].companyName+"</a></li>"

                          }
          
                          else{

                              companyHtml += "<li data-companyid='"+companyList[i].id+"'><a href='javascript:;'>"+companyList[i].companyName+"</a></li>"
                          
                          }

                        }
                        $('#companyList').html(companyHtml);

                        $('#selectCompany').show();

                    }
                    else{
                         //获取部门
                         index.companyId = res.companyList[0].id;

                         console.log(index.companyId);

                         $.ajax({

                             url:ipAdress+'/weixin/mainDeptList',

                             data:{

                                  tokenId:tokenId,

                                  companyId:index.companyId
                             },
                             type:'POST',

                             dataType:'json',

                             headers:{

                                 Accept: "application/json; charset=utf-8"
                             },
                             success:function(res){

                                console.log(res);

                                var deptListData = res.data.deptList,deptListHtml="";

                                if(deptListData.length>1){

                                   for(var i = 0;i<deptListData.length;i++){

                                      if(index.deptId == deptListData[i].DEPARTMENT_ID){

                                            deptListHtml +='<li data-companyid="'+index.companyId+'"data-deptid="'+deptListData[i].DEPARTMENT_ID+'" class="active"><a href="javascript:;">'+deptListData[i].DEPARTMENT_NAME+'</a></li>'
                                      }
                                      else{
                                             deptListHtml +='<li data-companyid="'+index.companyId+'"data-deptid="'+deptListData[i].DEPARTMENT_ID+'"><a href="javascript:;">'+deptListData[i].DEPARTMENT_NAME+'</a></li>'
                                      }
                                      
                                   }
                                   $('#companyList').html(deptListHtml);

                                   $('#selectCompany').show();
                                }
                                else{

                                    index.deptId = res.data.deptList[0].DEPARTMENT_ID;

                                    window.location.href='index.html?companyId='+index.companyId+'&deptId='+index.deptId+'&btmIndex=0';
                                }
                             }
                         })
                    }
                   }
                 })
                 
              })
            },
            companyConfirm:function(){

                 $("body").bind("click",function(e){

                             var target  = $(e.target);

                             if(target.closest('.compa_name').length == 0  && target.closest('.select_company_wrap').length == 0){

                               setTimeout(function(){

                                $("#selectCompany").hide();

                               },200)                              
                            };

                        event.stopPropagation();

                  })
           

               $('#companyList').on('click','li',function(){

                   index.companyId = $(this).attr('data-companyid');

                   index.deptId = $(this).attr('data-deptid');

                   if(!index.deptId){

                           $.ajax({

                               url:ipAdress+'/weixin/mainDeptList',

                               data:{
                                     tokenId:tokenId,
                                     companyId:index.companyId
                               },
                               dataType:'json',

                               type:'POST',

                               headers:{

                                   Accept: "application/json; charset=utf-8"
                               },
                               success:function(res){

                                  console.log(res);

                                  var deptListData = res.data.deptList,deptListHtml="";

                                  if(deptListData.length>1){

                                   for(var i = 0;i<deptListData.length;i++){

                                      if(index.deptId == deptListData[i].DEPARTMENT_ID){

                                            deptListHtml +='<li data-companyid="'+deptListData[i].COMPANY_ID+'" data-deptid="'+deptListData[i].DEPARTMENT_ID+'" class="active"><a href="javascript:;">'+deptListData[i].DEPARTMENT_NAME+'</a></li>'
                                      }
                                      else{
                                             deptListHtml +='<li data-companyid="'+deptListData[i].COMPANY_ID+'" data-deptid="'+deptListData[i].DEPARTMENT_ID+'"><a href="javascript:;">'+deptListData[i].DEPARTMENT_NAME+'</a></li>'
                                      }
                                      
                                   }
                                   $('#companyList').html(deptListHtml);

                                   $('#selectCompany').show();
                                }
                                else{

                                    if(!res.data.deptList[0]){

                                         common.maskConfirm("该公司下无部门");

                                    }
                                    else{

                                        index.deptId = res.data.deptList[0].DEPARTMENT_ID;

                                         window.location.href='index.html?companyId='+index.companyId+'&deptId='+index.deptId+'&btmIndex=0';
                                        
                                         $('#compa_name').html(res.data.deptList[0].COMPANY_NAME);
                                    }                                 
                                }
                               }//success结束
                           })
                    }
                    else{

                         window.location.href='index.html?companyId='+index.companyId+'&deptId='+index.deptId+'&btmIndex=0';

                         $('#compa_name').html(res.data.deptList[0].COMPANY_NAME);
                    }

                })


            }
		}
        index.init();
	})

})	