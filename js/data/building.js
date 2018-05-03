require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		     var ipAdress = common.ipAdress;

         var tokenId = sessionStorage.getItem("tokenId"),btmIndex = "";

         var  offStream = {

            companyId:"",

            deptId:"",

          	init:function(){

               fastclick.attach(document.body);

               this.toIndex();

          	},
            toIndex:function(){

              var path = window.location.search.slice(1);

                  path = common.parseUrl(path);

                  offStream.companyId = path.companyId;

                  offStream.deptId = path.deptId;

               $('.asidemenu').on('click',function(){

                  window.location.href='../home/index.html?companyId='+offStream.companyId+'&deptId='+offStream.deptId+'&btmIndex=0';
               })

            }
          }

          offStream.init();

	})
})	