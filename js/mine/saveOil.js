 require(['../config'],function(config) {

	require(['jquery','common'], function ($, common) {

		  var ipAdress = common.ipAdress;

	      var tokenId = sessionStorage.getItem("tokenId");

		  var saveOil = {

		  	    companyId:"",

                userId:"",

                salaryMonth:"",

                deptId:"",

			  	init:function(){
          
			        this.dataInit();

			        this.toIndex();
      
			  	},
			  	 toIndex:function(){

                     $('.asidemenu').on('click',function(){

                      window.location.href='../home/index.html?companyId='+saveOil.companyId+'&deptId='+saveOil.deptId+'&btmIndex=0';
                   })
                },
			  	dataInit:function(){

			  		var path = window.location.search;

                    path= path.slice(1);

                    path=common.parseUrl(path);

                    saveOil.companyId = path.companyId;

                    saveOil.userId = path.userId;

                    saveOil.salaryMonth = path.salaryMonth;

                    saveOil.deptId = path.deptId;

                    console.log(saveOil.companyId,saveOil.userId,saveOil.salaryMonth);

                     $.ajax({

                    	url:ipAdress+'/weixin/user/getUserSalaryByMonth',

                    	data:{

                            companyId:saveOil.companyId,

                            userId:saveOil.userId,

                            salaryMonth:saveOil.salaryMonth
                    	},

                    	dataType:'json',

                    	type:'POST',

                    	headers:{
                        
                            Accept: "application/json; charset=utf-8"
                    	},
                    	success:function(res){


                    		var delzero = function(value){

                    			 if(value=="0"){

                    			 	return "&nbsp;"

                    			 }
                    			 else{
                    			 	return value
                    			 }
                    		}

                    		var unitHtml = function(unit,html,jieyou_stere,jieyou_amount){

                                var _html = html;

						            _html +=    '<tr>'+

                                                    '<td>'+unit+'</td>'+

						                            '<td>'+delzero(jieyou_stere)+'</td>'+

						                            '<td>'+delzero(jieyou_amount)+'</td>'+

						                        '</tr>';

						        return _html;    
                    		}

                    		if(res.status==200){

                    		  console.log(res);

                    		  $('.payroll_money em').html(res.data.JIEYOU_SALARY);

                    		  var jieyouList = res.data.jieyougongziList,jieyouHtml="";

                    		  for(var i = 0;i<jieyouList.length;i++){
                                 
                                 jieyouHtml += '<div class="carNum">';

								 jieyouHtml +=		           '<p>车号：<em>'+jieyouList[i].CAR_NO+'</em></p>';

								 jieyouHtml +=	'</div>';

                                 jieyouHtml += '<table cellpadding="0" cellspacing="0" class="save_oil_table">';

								 jieyouHtml +=			            '<colgroup>';

								 jieyouHtml +=			               '<col class="col01"></col>';

								 jieyouHtml +=			                '<col span="2" class="col02"></col>';

								 jieyouHtml +=			            '</colgroup>';

								 jieyouHtml +=			            '<thead>';

								 jieyouHtml +=			                '<tr>';

								 jieyouHtml +=			                    '<th></th>';

								 jieyouHtml +=			                    '<th>方量</th>';

								 jieyouHtml +=			                    '<th>金额</th>';

								 jieyouHtml +=			                '</tr>';

								 jieyouHtml +=			            '</thead>';

								 jieyouHtml +=                      '<tbody>';

								              var kmDetalList = jieyouList[i].jieyouKmDetalList;


								                    for(var j = 0;j<kmDetalList.length;j++){

								                    	  if(j==0){

                                                               jieyouHtml = unitHtml('0-5km',jieyouHtml,kmDetalList[0].JIEYOU_0_5KM_STERE,kmDetalList[0].JIEYOU_0_5KM_STERE_AMOUNT);

								                    	  }
								                    	  else if(j == 1){

                                                                 jieyouHtml = unitHtml('5-10km',jieyouHtml,kmDetalList[1].JIEYOU_5_10KM_STERE,kmDetalList[1].JIEYOU_5_10KM_STERE_AMOUNT);
								                    	  }
								                    	  else if(j == 2){

								                    	  	     jieyouHtml = unitHtml('10-15km',jieyouHtml,kmDetalList[2].JIEYOU_10_15KM_STERE,kmDetalList[2].JIEYOU_10_15KM_STERE_AMOUNT);
								                    	  }
								                    	  else if(j == 3){

								                    	  	  jieyouHtml = unitHtml('15-20km',jieyouHtml,kmDetalList[3].JIEYOU_15_20KM_STERE,kmDetalList[3].JIEYOU_15_20KM_STERE_AMOUNT);
								                    	  }
								                    	  else if(j == 4){

								                    	  	 jieyouHtml = unitHtml('20-25km',jieyouHtml,kmDetalList[4].JIEYOU_20_25KM_STERE,kmDetalList[4].JIEYOU_20_25KM_STERE_AMOUNT);
								                    	  }
								                    	  else if(j == 5){

								                    	  	 jieyouHtml = unitHtml('25-30km',jieyouHtml,kmDetalList[5].JIEYOU_25_30KM_STERE,kmDetalList[5].JIEYOU_25_30KM_STERE_AMOUNT);
								                    	  }
								                    	  else if(j == 6){

								                    	  	 jieyouHtml = unitHtml('30-35km',jieyouHtml,kmDetalList[6].JIEYOU_30_35KM_STERE,kmDetalList[6].JIEYOU_30_35KM_STERE_AMOUNT);
								                    	  }
								                    	  else if(j == 7){

								                    	  	 jieyouHtml = unitHtml('35-40km',jieyouHtml,kmDetalList[7].JIEYOU_35_40KM_STERE,kmDetalList[7].JIEYOU_35_40KM_STERE_AMOUNT);
								                    	  }
								                    	  else if(j == 8){

								                    	  	 jieyouHtml = unitHtml('40-45km',jieyouHtml,kmDetalList[8].JIEYOU_40_45KM_STERE,kmDetalList[8].JIEYOU_40_45KM_STERE_AMOUNT);
								                    	  }
								                    }

								 jieyouHtml +=               '<tr>';

								 jieyouHtml +=                   '<td>塔吊</td>';

								 jieyouHtml +=                   '<td colspan="2" class="align_right">'+delzero(jieyouList[i].JIEYOU_CRANE_AMOUNT)+'</td>';

								 jieyouHtml +=               '</tr>';

								 jieyouHtml +=               '<tr>';

								 jieyouHtml +=                   '<td>转运</td>';

								 jieyouHtml +=                   '<td colspan="2" class="align_right">'+delzero(jieyouList[i].JIEYOU_TRANSFER_AMOUNT)+'</td>';

								jieyouHtml +=                '</tr>';

								jieyouHtml +=                '<tr>';

								jieyouHtml +=                    '<td>超时</td>';

								jieyouHtml +=                    '<td colspan="2" class="align_right">'+delzero(jieyouList[i].JIEYOU_EXPIRETIME_AMOUNT)+'</td>';

								jieyouHtml +=                '</tr>';

								jieyouHtml +=               ' <tr>';

								jieyouHtml +=                    '<td>个人小计</td>';

								jieyouHtml +=                    '<td>'+delzero(jieyouList[i].JIEYOU_GERENJIXIAO.JIEYOU_STERE_SUM)+'</td>';

								jieyouHtml +=                    '<td>'+delzero(jieyouList[i].JIEYOU_GERENJIXIAO.JIEYOU_GERENJIXIAO)+'</td>';

								jieyouHtml +=                '</tr>';

								jieyouHtml +=                '<tr>';

								jieyouHtml +=                    '<td>单车小计</td>';

								 jieyouHtml +=                   '<td colspan="2" class="align_right">'+delzero(jieyouList[i].JIEYOU_DANCHEJIXIAO)+'</td>';

								jieyouHtml +=                '</tr>';

								 jieyouHtml +=                '<tr>';

								 jieyouHtml +=                   '<td>加油</td>';

								jieyouHtml +=                    '<td>'+delzero(jieyouList[i].JIEYOU_JIAYOU.OIL_LITER)+'</td>';

								 jieyouHtml +=                   '<td>'+delzero(jieyouList[i].JIEYOU_JIAYOU.OIL_AMOUNT)+'</td>';

								jieyouHtml +=                '</tr>';

								jieyouHtml +=                 '<tr>';

								jieyouHtml +=                    '<td>补油</td>';

								jieyouHtml +=                    '<td>'+delzero(jieyouList[i].JIEYOU_BUYOU.OIL_EX_LITER)+'</td>';

								jieyouHtml +=                    '<td>'+delzero(jieyouList[i].JIEYOU_BUYOU.OIL_EX_AMOUNT)+'</td>';

								jieyouHtml +=                '</tr>';

								jieyouHtml +=                 '<tr>';

								jieyouHtml +=                    '<td>趟次运能比</td>';

								jieyouHtml +=                    '<td colspan="2" class="align_left">'+delzero(jieyouList[i].TANGCIYUNNENG)+'</td>';

								  jieyouHtml +=              '</tr>';

								 jieyouHtml +=                      '</tbody>';

								 jieyouHtml +=	'</table>';

								 jieyouHtml +=	'<div class="item_total">';

								 jieyouHtml +=	   '<p>节油小计：<em>'+delzero(jieyouList[i].JIEYOUXIAOJI)+'</em></p>';

								 jieyouHtml +=	'</div>';
                    		  }

                    		  $('.payroll_money').after(jieyouHtml);
                    		}

                    	}
                    })

			  	}
			

		  }

         saveOil.init();
	})
})	