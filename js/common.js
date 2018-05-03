define(['jquery'],function($){

	 var common = {

          //ipAdress:'http://172.17.125.18:8080',

          //ipAdress:'http://172.17.125.39:8080',

          ipAdress:'http://172.17.125.88:8080',

          //ipAdress:'http://172.17.125.63:8080',

          //ipAdress:'http://172.17.125.118:8080',

          //ipAdress:'http://120.24.3.81:8180/bdyErp',

          //ipAdress:'http://172.17.125.107:8080',

          tab:function(ele01,ele02){
              
          	$(ele01).on('click',function(){

                $(this).addClass('active').siblings().removeClass('active');

                $(ele02).hide();

                $(ele02).eq($(this).index()).show();
          	})
          },
          focusBug:function(){

              $('input,textarea').focus(function(){

                  $('body').removeClass("mui-focusin");

              }).blur(function(){

                $('body').removeClass("mui-focusin");

              })
          },
          eleFocus:function(ele){

                $(ele).focus(function(){

                    $(this).css('background','#0093dd');

                }).blur(function(){
                    
                    $(this).css('background','#ddd');
                })
          },
          buttontap:function(ele){

                 $(ele).on('touchstart',function(){

                     $(this).css('background','#0083c4');

                 }).on('touchend',function(){

                     $(this).css('background','#0093dd');

                 })
          },
          parseUrl:function(url){

             var arr1 = url.split('&');

             var arr2 = new Object();

             for(i in arr1){

               var ta=arr1[i].split('=');

               arr2[ta[0]]=ta[1];

             }
             
             return arr2;
          },
          maskConfirm:function(msg){

             var html = $('#maskLayer').html();

            if(!html){
  
                    html = "";

                    html += '<div class="mask" id="maskLayer" style="display:block">';

                    html +=           '<div class="layer_wrap">';

                    html +=              '<div class="layer_box">';

                    html +=                 '<p class="notice_info">'+msg+'</p>';

                    html +=              '</div>';

                    html +=            '</div>';

                    html += '</div>';

                 $('body').append(html);    

                 setTimeout(function(){

                   $('#maskLayer').css('display','none');

                 },1000);   

              }

            else{

                 $('#maskLayer').css('display','block');

                 setTimeout(function(){
 
                     $('#maskLayer').css('display','none');

                   },1000);   
              
              }       
          },
          maskConfirm02:function(msg,fn){

             var html = $('#maskLayer').html();

                if(!html){


                              html = "";

                              html += '<div class="mask" id="maskLayer" style="display:block">';

                              html +=           '<div class="layer_wrap">';

                              html +=              '<div class="layer_box">';

                              html +=                 '<p class="notice_info">'+msg+'</p>';

                              html +=              '</div>';

                              html +=            '</div>';

                              html += '</div>';

                              $('body').append(html); 

                              setTimeout(function(){

                                   $('#maskLayer').css('display','none');

                                   if(fn){

                                      fn();
                                   } 

                              },1000);   
                }   
                else{

                         $('#maskLayer').css('display','block');

                         $('#maskLayer').find('.notice_info').html(msg);

                         setTimeout(function(){
         
                             $('#maskLayer').css('display','none');
                          
                               if(fn){

                                      fn();
                                } 
                         },1000);   
              
                }    
          }

          
      }
	 return common;

	})