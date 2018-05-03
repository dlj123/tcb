require(['config'],function(config) {

	require(['jquery','common','fastclick','mobiscroll'], function ($, common,fastclick,mobiscroll) {

        var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId"),btmIndex = "",companyId="",deptId="";

        var mine = {

           userId:"",

       	  init:function(){

              this.mineData();

              this.toMineInfo();

              this.yearSelect();

              this.inputAutoWidth();

              this.infoLayer();

              this.toWallet();
       	  },
       	  infoLayer:function(){

             $('.info_pic').on('click',function(){

             	$('#uppicLayer').show();

             })
             $('#uppicLayer .concel').on('click',function(){
               
                $(this).parents('#uppicLayer').hide();
             })
       	  },
        mineData:function(){

          var path = window.location.search.slice(1);

                  companydata = common.parseUrl(path);

                  btmIndex = companydata.btmIndex;

                  companyId = companydata.companyId;

                  deptId = companydata.deptId;

                  console.log(companydata);

                  //初始数据获取
                   $('.setLink').attr('href','set.html?companyId='+companydata.companyId+'&deptId='+companydata.deptId);

                   console.log(companydata.deptId,companydata.companyId);

                    $.ajax({

                        url:ipAdress+'/weixin/goToMySelf',

                        data:{

                           tokenId:tokenId,

                           deptId:companydata.deptId,

                           companyId:companydata.companyId
                        },

                        type:'POST',

                        dataType:'json',

                        headers:{

                           Accept: "application/json; charset=utf-8"
                        },
                        success:function(res){

                          if(res.status==200){

                             console.log(res);

                              var name = res.data.userList[0].REAL_NAME;

                              var departName = res.data.userList[0].DEPARTMENT_NAME;

                              $('.pic_name .name h3').html(name);

                              $('.pic_name .name p').html(departName);

                              mine.userId = res.data.userList[0].userId;
                          }
                        }

                    })
                  //底部菜单获取
                  $.ajax({

                     url:ipAdress+'/weixin/index',

                     data:{

                       tokenId:tokenId,

                       companyId:companydata.companyId

                     },

                     async: false,

                     type:'POST',

                     dataType:'json',

                     success:function(res){

                         console.log(res);
             
                         var footMenu =res.menuBottom,menuBottomH="",companyName="",companyid="";
                   
                        console.log(companydata.companyId);
                          
                      //底部菜单
                    for(var i = 0;i<footMenu.length;i++){
                      
                             var bottomMenu = footMenu[i].subMenuList;
                           
                             for(var j = 0;j < bottomMenu.length;j++){
                                              
                               if(btmIndex==j){

                                         menuBottomH += '<li class="active">';
                                      }

                                     else{
                                         menuBottomH += '<li class="">';
                                     }
                                      menuBottomH +=   '<a href='+bottomMenu[j].menuUrl+'?btmIndex='+j+'&companyId='+companydata.companyId+'&deptId='+companydata.deptId+'>';

                                      if(btmIndex==j){

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
            },
            toMineInfo:function(){

                $('.mine_name').on('click',function(){

                     window.location = 'info.html?companyId='+companyId+'&deptId='+deptId;
                })
            },
       	  yearSelect:function(){

				// Use the settings object to change the theme
    				mobiscroll.settings = {
    				    theme: 'ios'
    				};

    				var now = new Date(),
    				    min = new Date(now.getFullYear() -10, now.getMonth()),
    				    until = new Date(now.getFullYear() + 10, now.getMonth());

    				mobiscroll.date('#selectYear', {
    				    theme: 'ios',
    				    lang: 'zh',
    				    display: 'bottom',
    				    dateWheels: 'yy',
    				    dateFormat: 'yy',
    				    min: min,
    				    max: until,
    				    minWidth: 100,
    				    onSet: function (event, inst) { // More info about onSet: https://docs.mobiscroll.com/3-0-0_beta5/color#!event-onSet
                        
                                $('#yearValue').val(event.valueText);

                                //console.log(event.valueText);
                        }  
    				});

       	  },
       	  inputAutoWidth:function(){
                 var textWidth = function(text){ 
                      var sensor = $('<pre>'+ text +'</pre>').css({display: 'none'}); 
                      $('body').append(sensor); 
                      var width = sensor.width();
                      sensor.remove(); 
                      return width;
                  };
                  $("#yearValue").unbind('keydown').bind('keydown', function(){
                      $(this).width(textWidth($(this).val()));
                  });
           },
           toWallet:function(){

                $('.myWallet').on('click',function(){

                    window.location.href='mywallet.html?companyId='+companyId+'&userId='+mine.userId+'&deptId='+deptId;

                })
           }
       }
       mine.init();
	})
})	