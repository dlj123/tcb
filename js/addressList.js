require(['config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

          var ipAdress = common.ipAdress;

          var tokenId = sessionStorage.getItem("tokenId");  

          var addressList = {

            companyId:'',

            deptId:'',

          	init:function(){
                 
                 common.tab('.top_tab ul li','.contentPanel');

                 this.addressLayer();

                 this.dataInit();

                 this.deptPerson();

                 this.toIndex();
          	},
            toIndex:function(){

                 $('.asidemenu').on('click',function(){

                      window.location.href="../home/index.html?companyId="+addressList.companyId+"&deptId="+addressList.deptId+"&btmIndex=0";

                 })
            },
            dataInit:function(){

                 var path = window.location.search;

                     path = path.slice(1);

                     path = common.parseUrl(path);

                     console.log(path);

                     this.companyId = path.companyId;

                     this.deptId = path.deptId;

                  //公司下面的部门初始化   
                 $.ajax({

                    url:ipAdress+'/weixin/oaDoc/addressList',

                    data:{

                      companyId:path.companyId,

                      stationType: false
                    },

                    type:'POST',

                    dataType:'json',

                    success:function(res){

                       console.log(res);

                       if(res.status==200){

                          var deptList = res.data.deptList,deptListHtml="";

                          for(var i = 0;i<deptList.length;i++){

                               deptListHtml += '<div class="commonTit" data-depid="'+deptList[i].ID+'">';

                               deptListHtml +=  '<h3 class="tit">'+deptList[i].DEPARTMENT_NAME+'</h3>';

                               deptListHtml +=  '<i class="iconfont icon-jiantou-copy-copy"></i>';

                               deptListHtml +='</div>';

                          }
                          $('#contentPanel01').html(deptListHtml);
                       }
                       else if(res.status==401){

                         common.maskConfirm('服务器内部错误');

                       }
                    }
                 })
                 //车队初始化
                 $.ajax({

                    url:ipAdress+'/weixin/oaDoc/addressList',

                    data:{

                       companyId:path.companyId,

                       stationType: true
                    },
                    dataType:'json',

                    type:'POST',

                    success:function(res){
                        
                       console.log(res);

                       if(res.status==200){
                          
                          var deptList = res.data.deptStationList,deptListHtml="";

                          for(var i = 0;i<deptList.length;i++){

                               deptListHtml += '<div class="commonTit" data-depid="'+deptList[i].ID+'">';

                               deptListHtml +=  '<h3 class="tit">'+deptList[i].DEPARTMENT_NAME+'</h3>';

                               deptListHtml +=  '<i class="iconfont icon-jiantou-copy-copy"></i>';

                               deptListHtml +='</div>';

                          }
                          $('#contentPanel02').html(deptListHtml);
                       }
                       else if(res.status==401){

                          common.maskConfirm('服务器内部错误');

                       }
                    }
                 })
            },
            deptPerson:function(){
              
                 $('.contentPanel').on('click','.commonTit',function(){

                  var that = $(this);

                  var deptId = $(this).data('depid'),addressList='',addressListH='';

                  if($(this).next() && $(this).next('ul').hasClass('active')){

                     $(this).animate({'height':'.8rem','line-height':'.8rem'},100);

                      $(this).find('h5').animate({'font-size':'.3rem'},100);

                      $(this).find('i').removeClass('icon-xiangshangjiantou').addClass('icon-jiantou-copy-copy').animate({'font-size':'.32rem'},100);

                     $(this).next('ul').removeClass('active');

                  }
                  else{

                      $(this).animate({'height':'.7rem','line-height':'.7rem'},100);

                      $(this).find('h5').animate({'font-size':'.26rem'},100);

                      $(this).find('i').removeClass('icon-jiantou-copy-copy').addClass('icon-xiangshangjiantou').animate({'font-size':'.28rem'},100);

                      $.ajax({
                         
                         url:ipAdress+'/weixin/oaDoc/addressStationList',

                         data:{

                           deptId:deptId
                         },

                         type:'POST',

                         dataType:'json',

                         success:function(res){
                             
                             console.log(res);

                             var positionList = res.data.positionList;

                             addressList = $('<ul class="cont_list active"></ul>'),addressListH="";
                        
                             that.after(addressList);
                             
                             for (var i = 0; i <positionList.length; i++) {

                                   addressListH += '<li data-name="'+positionList[i].REAL_NAME+'" data-position="'+positionList[i].POSITION_NAME+'" data-phone="'+positionList[i].MOBILE_PHONE+'" data-email="'+positionList[i].EMAIL+'">';

                                   addressListH +=       '<div class="pic">';

                                   addressListH +=             '<img src="../../images/perpic.jpg" alt="" title="">';

                                   addressListH +=       '</div>';

                                   addressListH +=       '<div class="nameJob_list_wrap">';

                                   addressListH +=             '<div class="nameJob_list">';

                                   addressListH +=                 '<div class="name_job">';

                                   addressListH +=                      '<h5>'+positionList[i].REAL_NAME+'</h5>';

                                   addressListH +=                      '<p>'+positionList[i].MOBILE_PHONE+'&nbsp;&nbsp;&nbsp;'+positionList[i].POSITION_NAME+'</p>';

                                   addressListH +=                  '</div>';

                                   addressListH +=                  '<div class="right_point"><i class="iconfont icon-arrow-right"></i></div>';

                                   addressListH +=             '</div>';  

                                   addressListH +=       '</div>';

                                   addressListH += '</li>';
                              }
                              addressList.html(addressListH);

                           }
                        })

                  }

                 })
            },
          	addressLayer:function(){

          		$('.contentPanel').on('click','.cont_list li',function(){

          			var name = $(this).data('name'),

                position = $(this).data('position'),

                phone = $(this).data('phone'),

                email = $(this).data('email');

                $('.name').html(name);

                $('.position').html(position);

                $('.phone').html(phone);

                $('.email').html(email);

                $('#addressInfo_box').show();

          		})
          		$('#addressInfo_box').bind('click',function(e){

    		         var target = $(e.target);

    						 if(target.closest('.addressInfo_cont').length==0){

    							   $('#addressInfo_box').hide();
    						 }
    						 e.stopPropagation();
              })

          		$('#addressInfo_box .callBtn').on('click',function(){

          			 $(this).parents('#addressInfo_box').hide();

          		})
	
          	  }
            
          }
          addressList.init();
	})

})	