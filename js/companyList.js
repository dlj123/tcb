require(['config'],function(config) {

	require(['jquery','common','fastclick','url'], function ($, common,fastclick,url) {

        var ipAdress = common.ipAdress;

        var tokenId = sessionStorage.getItem("tokenId");

        var companyId = "";

		var companyList = {
			 
              init:function(){

                 fastclick.attach(document.body);

                 this.companydata();

                 this.selectCompany();

              },
              companydata:function(){

                 console.log(tokenId);

                 $.ajax({

                 	url:ipAdress+'/weixin/main',

                 	async: false,

                 	data:{

                 		tokenId:tokenId

                 	},

                 	dataType:'json',

                 	success:function(res){

                      console.log(res);

                      var companyList = res.companyList,companyHtml='';

                      for (var i = 0;i < companyList.length; i++) {

                      	companyHtml += "<li data-companyid='"+companyList[i].id+"'>"+companyList[i].companyName+"</li>"

                      }
                      $('#companyList').html(companyHtml);
                 	}
                 })

              },
              selectCompany:function(){

              	 $('#companyList').on('click','li',function(){

                     var companyId = $(this).data('companyid');

                     window.location.href='index.html?companyId='+companyId;
                 })
              }
		}
		companyList.init();

	})

})	