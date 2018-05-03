require(['../config'],function(config) {

	require(['jquery','common','fastclick'], function ($, common,fastclick) {

		     var ipAdress = common.ipAdress;

         var tokenId = sessionStorage.getItem("tokenId"),btmIndex = "";

         var  oilWearDetail = {

            companyId:'',

            deptId:'',

            carNo:'',

         	  init:function(){

              fastclick.attach(document.body);

              this.dataInit();

              this.toIndex();

          	},
            toIndex:function(){
              
               $('.asidemenu').on('click',function(){

                  window.location.href='../home/index.html?companyId='+oilWearDetail.companyId+'&deptId='+oilWearDetail.deptId+'&btmIndex=0';
                  
                })
            },
            dataInit:function(){

              var path = window.location.search;

                  path = path.slice(1);

                  path = common.parseUrl(path);

                  oilWearDetail.companyId = path.companyId;

                  oilWearDetail.deptId = path.deptId;

                  oilWearDetail.carNo = path.carNo;

                  $.ajax({

                      url:ipAdress+'/weixin/TimeEntry/carOil',

                      data:{
                          companyId:oilWearDetail.companyId,

                          deptId:oilWearDetail.deptId,

                          carNo:oilWearDetail.carNo
                      },
                      dataType:'json',

                      type:'POST',

                       headers: {

                             Accept: "application/json; charset=utf-8"

                      },

                      success:function(res){

                        var formateDate = function(value){
                           
                             return value.slice(5,7)+'月'+value.slice(8,10)+'日';
                        }

                        if(res.status==200){

                           console.log(res);

                           var oilWearMonth = res.data.carList,oilWearMonthHtml="";

                           for(var i = 0;i<oilWearMonth.length;i++){

                               oilWearMonthHtml +='<tr>'+

                                                       '<td>'+formateDate(oilWearMonth[i].createdate)+'</td>'+

                                                       '<td>'+oilWearMonth[i].locamountsum+'m³</td>'+

                                                       '<td>'+oilWearMonth[i].triprefuelnum+'L</td>'+

                                                   '</tr>'

                           }

                           $('.oilWear_table tbody').html(oilWearMonthHtml);

                         }

                      }
                  })
            }
        }
        oilWearDetail.init();
  })
})            