
require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		     var ipAdress = common.ipAdress;

         var tokenId = sessionStorage.getItem("tokenId"),btmIndex = "";

         var  oilWear = {

            companyId:'',

            deptId:'',

         	  init:function(){

              fastclick.attach(document.body);

              this.dataInit();

              this.toIndex();

          	},
            toIndex:function(){
              
               $('.asidemenu').on('click',function(){

                  window.location.href='../home/index.html?companyId='+oilWear.companyId+'&deptId='+oilWear.deptId+'&btmIndex=0';
                })
            },
            dataInit:function(){
              
               var path = window.location.search;

               path = path.slice(1);

               path = common.parseUrl(path);

               oilWear.companyId = path.companyId;

               oilWear.deptId = path.deptId;

               console.log(oilWear.companyId,oilWear.deptId);

               $.ajax({

                   url:ipAdress+'/weixin/TimeEntry/stationOil',

                   data:{
                         companyId:oilWear.companyId,

                         deptId:oilWear.deptId
                   },
                   dataType:'json',

                   type:'POST',

                   headers: {

                             Accept: "application/json; charset=utf-8"

                     },
                   success:function(res){

                      if(res.status==200){

                          console.log(res);

                          var oilWearList = res.data.tripRecordList,oilWearHtml='';

                          for(var i = 0;i<oilWearList.length;i++){
                     
                            oilWearHtml +='<tr>';

                             oilWearHtml +=                   '<td><a href="oil_wear_detail.html?companyId='+oilWear.companyId+'&deptId='+oilWear.deptId+'&carNo='+oilWearList[i].carno+'">'+oilWearList[i].carno+'</a></td>';

                             if(oilWearList[i].locamountsum==undefined){

                               oilWearHtml +=                   '<td>m³</td>';

                             }
                             else{

                               oilWearHtml +=                   '<td>'+oilWearList[i].locamountsum+'m³</td>';

                             }
                             if(oilWearList[i].triprefuelnum==undefined){

                                oilWearHtml +=                   '<td>&nbsp;</td>';

                             }
                             else{

                                  oilWearHtml +=                   '<td>'+oilWearList[i].triprefuelnum+'L</td>';
                             }

                          
                            if(oilWearList[i].oilConsumption==undefined){

                                 oilWearHtml +=                   '<td>&nbsp;</td>';

                             }
                             else{

                                 oilWearHtml +=                   '<td>'+oilWearList[i].oilConsumption+'L/m³</td>';
                                 
                             }

                             '</tr>'
                           }

                           $('.oilWear_table tbody').html(oilWearHtml);

                       }
                   }    
               })
            }
          }

          oilWear.init();

	})
})	