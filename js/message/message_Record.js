require(['../config'],function(config) {

	require(['jquery','common','fastclick','mui'], function ($, common,fastclick,mui) {

        var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var productionDeductionRecord = {

			init:function(){

				this.recordInit();

			},
			recordInit:function(){

				var path = window.location.search;

				path = path.slice(1);

				path = common.parseUrl(path);

				console.log(path);

         $.ajax({

                 	url:ipAdress+'/weixin/oaDoc/afficheMessageView',

                 	data:{
                   
                      afficheId:path.afficheId
                 	},
                 	type:'POST',

                 	dataType:'json',

                 	success:function(res){
                      
                     console.log(res);

                     if(res.status == 200){

                             $('.title').html(res.data.tmAffiche.title);               
                           
                             $('.infos_html').html(res.data.tmAffiche.info);

                     }
                      
                 	}
         })
			}
		}
		productionDeductionRecord.init();

	})
})	