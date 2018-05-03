require(['config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		    var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var clyd = {
           
             init:function(){
              
                this.dataInit();

                this.insuranceDtPicker();

             },
             insuranceDtPicker:function(){
                
                    $('.insuranceTime_wrap').on('tap',function(){

                    mui.init();

                    var insuranceDtPicker = new mui.DtPicker({

                      "type": "date",

                      "labels":["年", "月", "日",],

                      "beginDate":new Date(2009,1,1),

                      "endDate":new Date(2018,12,31)
                      
                    });
                  
                   insuranceDtPicker.show(function(rs) {

                      $('#insuranceTime').html(rs.text);

                      insuranceDtPicker.dispose();
                     })
                   })

             },
             dataInit:function(){

             	var path = window.location.search;

             	    path = path.slice(1);

             	    path = common.parseUrl(path);

             	console.log(path);

             	 $.ajax({
                    
                      url:ipAdress+'/weixin/oaDoc/page',

                      data:{

                         tokenId:tokenId,

                         companyId:path.companyId,

                         FORM_TYPE:'bxsq'
                      },
                      
                      type:'POST',

                      dataType:'json',

                      success:function(res){
                           
                           console.log(res);

                           var applyPerson = res.tmUser.realName;

                          //if(res.status==200){

                             $('#apply_person').find('span').html(applyPerson);

                          //}

                         /* else if(res.status==401){

                           	  common.maskConfirm('服务器内部错误');
                           }*/
                      }
             	 })
             }
        }
        clyd.init();
    })
})        