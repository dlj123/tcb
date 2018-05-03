 require(['../config'],function(config) {

	require(['jquery','common'], function ($, common) {

		  var ipAdress = common.ipAdress;

          var tokenId = sessionStorage.getItem("tokenId");

		  var performanceDetail = {

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

                      window.location.href='../home/index.html?companyId='+performanceDetail.companyId+'&deptId='+performanceDetail.deptId+'&btmIndex=0';
                   })
                },
			    dataInit:function(){
                  
                    var formateMonth = function(value){

                    	var _value  = value;

                         _value =  _value.slice(5);

                         if(_value<=9){

                         	 return _value.slice(1);
                         }
                         else{

                         	return _value
                         }
                    }
                    var path = window.location.search;

                    path= path.slice(1);

                    path=common.parseUrl(path);

                    performanceDetail.companyId = path.companyId;

                    performanceDetail.userId = path.userId;

                    performanceDetail.salaryMonth = path.salaryMonth;

                    performanceDetail.deptId = path.deptId;

                    var month = formateMonth(path.salaryMonth);

                    $.ajax({

                    	url:ipAdress+'/weixin/user/getUserSalaryByMonth',

                    	data:{

                            companyId:performanceDetail.companyId,

                            userId:performanceDetail.userId,

                            salaryMonth:performanceDetail.salaryMonth
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

                    		var unitHtml = function(html,uint,beton_stere,beton_trip,beton_amount,mortar_stere,mortar_trip,mortar_amount,water_stere,water_trip,water_amount){

                    			var _html = html;

                                
									_html += 				                '<tr>';

									_html += 				                    '<td>'+uint+'</td>';

									_html += 				                    '<td>';

									_html += 				                           '<div>';

									_html += 				                                '<span>'+delzero(beton_stere)+'</span>';

									_html += 				                                '<span>'+delzero(beton_trip)+'</span>';

									_html += 				                            '</div>';

									_html += 				                            '<div>'+delzero(beton_amount)+'</div>';

									_html += 				                    '</td>';

									_html += 				                    '<td>';

									_html += 				                            '<div>';

									_html += 				                                '<span>'+delzero(mortar_stere)+'</span>';

									_html += 				                                '<span>'+delzero(mortar_trip)+'</span>';

									_html += 				                            '</div>';

									_html += 				                            '<div>'+delzero(mortar_amount)+'</div>';

									_html += 				                    '</td>';

									_html += 				                    '<td>';

									_html += 				                            '<div>';

									_html += 				                                '<span>'+delzero(water_stere)+'</span>';

									_html += 				                                '<span>'+delzero(water_trip)+'</span>';

									_html += 			                            '</div>';

									_html += 				                            '<div>'+delzero(water_amount)+'</div>';

									_html += 				                    '</td>';

									_html += 				                '</tr>';

									return _html;

                    		}

                    		if(res.status==200){

                    		   console.log(res);

                               $('.performance_money em').html(res.data.JIXIAO_SALARY); 

                               var jixiaogongziList = res.data.jixiaogongziList,jixiaogongziListH = "";

                               for(var i = 0;i<jixiaogongziList.length;i++){

                                     jixiaogongziListH += ' <div class="lead_line">';

									 jixiaogongziListH += 				            '<span>车号：<em>'+jixiaogongziList[i].CAR_NO+'</em></span>';

									 jixiaogongziListH += 				            '<span>方量:'+jixiaogongziList[i].STERE_SUM+'m³</span>';

									 jixiaogongziListH += 				            '<span>趟次：'+jixiaogongziList[i].TOTAL_TRIP+'车</span>';

									jixiaogongziListH += 					        '</div>';

									jixiaogongziListH += 			            '<table cellpadding="0" cellspacing="0" class="table_unit">';

									jixiaogongziListH += 			            '<colgroup>';

									jixiaogongziListH += 			               '<col class="col01"></col>';

									jixiaogongziListH += 			               '<col class="col02" span="3"></col>';

									jixiaogongziListH += 			            '</colgroup>';

									jixiaogongziListH += 			            '<thead>';

									jixiaogongziListH += 			               ' <tr>';

									jixiaogongziListH += 			                   '<th></th>';

									jixiaogongziListH += 			                  ' <th>';

									jixiaogongziListH += 			                       '<div>混凝土</div>';

									jixiaogongziListH += 			                       '<div>';

									jixiaogongziListH += 			                          ' <span>方量</span>';

									jixiaogongziListH += 			                           '<span>趟次</span>';

									jixiaogongziListH += 			                       '</div>';

									jixiaogongziListH += 			                   '</th>';

									jixiaogongziListH += 			                   '<th>';

									jixiaogongziListH += 			                      ' <div>砂浆</div>';

									jixiaogongziListH += 			                       '<div>';

									jixiaogongziListH += 			                          ' <span>方量</span>';

									jixiaogongziListH += 			                           '<span>趟次</span>';

									jixiaogongziListH += 			                      '</div>';

									jixiaogongziListH += 			                   '</th>';

									jixiaogongziListH += 			                   '<th>';

									jixiaogongziListH += 			                       '<div>拖水</div>';

									jixiaogongziListH += 			                       '<div>';

									jixiaogongziListH += 			                           '<span>方量</span>';

									jixiaogongziListH += 			                           '<span>趟次</span>';

									jixiaogongziListH += 			                       '</div>';

									jixiaogongziListH += 			                   '</th>';

									jixiaogongziListH += 			                '</tr>';

									jixiaogongziListH += 			            '</thead>';

									jixiaogongziListH += 			             '<tbody class="unit_tbody">';

									                 var kmDetalList = jixiaogongziList[i].kmDetalList;

                            		               for(var j = 0;j<kmDetalList.length;j++){

                            		               	if(j ==0){

                                                       jixiaogongziListH = unitHtml(jixiaogongziListH,'0-5km',kmDetalList[0].BETON_0_5KM_STERE,kmDetalList[0].BETON_0_5KM_TRIP,kmDetalList[0].BETON_0_5KM_AMOUNT,
                                                       	kmDetalList[0].MORTAR_0_5KM_STERE,kmDetalList[0].MORTAR_0_5KM_TRIP,kmDetalList[0].MORTAR_0_5KM_AMOUNT,
                                                       	kmDetalList[0].WARTER_0_5KM_STERE,kmDetalList[0].WARTER_0_5KM_TRIP,kmDetalList[0].WARTER_0_5KM_AMOUNT);
                                                     }

									                else if(j == 1){

                                    
								                           jixiaogongziListH = unitHtml(jixiaogongziListH,'5-10km',kmDetalList[1].BETON_5_10KM_STERE,kmDetalList[1].BETON_5_10KM_TRIP,kmDetalList[1].BETON_5_10KM_AMOUNT,
                                                       	kmDetalList[1].MORTAR_5_10KM_STERE,kmDetalList[1].MORTAR_5_10KM_TRIP,kmDetalList[1].MORTAR_5_10KM_AMOUNT,
                                                       	kmDetalList[1].WARTER_5_10KM_STERE,kmDetalList[1].WARTER_5_10KM_TRIP,kmDetalList[1].WARTER_5_10KM_AMOUNT);


									                }
									                else if(j==2){
                                                          jixiaogongziListH = unitHtml(jixiaogongziListH,'10-15km',kmDetalList[2].BETON_10_15KM_STERE,kmDetalList[2].BETON_10_15KM_TRIP,kmDetalList[2].BETON_10_15KM_AMOUNT,
                                                       	kmDetalList[2].MORTAR_10_15KM_STERE,kmDetalList[2].MORTAR_10_15KM_TRIP,kmDetalList[2].MORTAR_10_15KM_AMOUNT,
                                                       	kmDetalList[2].WARTER_10_15KM_STERE,kmDetalList[2].WARTER_10_15KM_TRIP,kmDetalList[2].WARTER_10_15KM_AMOUNT);
									                }
									                 else if(j==3){
									                	   jixiaogongziListH = unitHtml(jixiaogongziListH,'15-20km',kmDetalList[3].BETON_15_20KM_STERE,kmDetalList[3].BETON_15_20KM_TRIP,kmDetalList[3].BETON_15_20KM_AMOUNT,
                                                       	kmDetalList[3].MORTAR_15_20KM_STERE,kmDetalList[3].MORTAR_15_20KM_TRIP,kmDetalList[3].MORTAR_15_20KM_AMOUNT,
                                                       	kmDetalList[3].WARTER_15_20KM_STERE,kmDetalList[3].WARTER_15_20KM_TRIP,kmDetalList[3].WARTER_15_20KM_AMOUNT);
									                }
									                 else if(j==4){
									                	   jixiaogongziListH = unitHtml(jixiaogongziListH,'20-25km',kmDetalList[4].BETON_20_25KM_STERE,kmDetalList[4].BETON_20_25KM_TRIP,kmDetalList[4].BETON_20_25KM_AMOUNT,
                                                       	kmDetalList[4].MORTAR_20_25KM_STERE,kmDetalList[4].MORTAR_20_25KM_TRIP,kmDetalList[4].MORTAR_20_25KM_AMOUNT,
                                                       	kmDetalList[4].WARTER_20_25KM_STERE,kmDetalList[4].WARTER_20_25KM_TRIP,kmDetalList[4].WARTER_20_25KM_AMOUNT);
									                }
									                 else if(j==5){
									                	   jixiaogongziListH = unitHtml(jixiaogongziListH,'25-30km',kmDetalList[5].BETON_25_30KM_STERE,kmDetalList[5].BETON_25_30KM_TRIP,kmDetalList[5].BETON_25_30KM_AMOUNT,
                                                       	kmDetalList[5].MORTAR_25_30KM_STERE,kmDetalList[5].MORTAR_25_30KM_TRIP,kmDetalList[5].MORTAR_25_30KM_AMOUNT,
                                                       	kmDetalList[5].WARTER_25_30KM_STERE,kmDetalList[5].WARTER_25_30KM_TRIP,kmDetalList[5].WARTER_25_30KM_AMOUNT);
									                }
									                 else if(j==6){
									                	   jixiaogongziListH = unitHtml(jixiaogongziListH,'30-35km',kmDetalList[6].BETON_30_35KM_STERE,kmDetalList[6].BETON_30_35KM_TRIP,kmDetalList[6].BETON_30_35KM_AMOUNT,
                                                       	kmDetalList[6].MORTAR_30_35KM_STERE,kmDetalList[6].MORTAR_30_35KM_TRIP,kmDetalList[6].MORTAR_30_35KM_AMOUNT,
                                                       	kmDetalList[6].WARTER_30_35KM_STERE,kmDetalList[6].WARTER_30_35KM_TRIP,kmDetalList[6].WARTER_30_35KM_AMOUNT);
									                }
									                 else if(j==7){
									                	   jixiaogongziListH = unitHtml(jixiaogongziListH,'35-40km',kmDetalList[7].BETON_35_40KM_STERE,kmDetalList[7].BETON_35_40KM_TRIP,kmDetalList[7].BETON_35_40KM_AMOUNT,
                                                       	kmDetalList[7].MORTAR_35_40KM_STERE,kmDetalList[7].MORTAR_35_40KM_TRIP,kmDetalList[7].MORTAR_35_40KM_AMOUNT,
                                                       	kmDetalList[7].WARTER_35_40KM_STERE,kmDetalList[7].WARTER_35_40KM_TRIP,kmDetalList[7].WARTER_35_40KM_AMOUNT);
									                }
                                                     else if(j==8){
									                	   jixiaogongziListH = unitHtml(jixiaogongziListH,'40-45km',kmDetalList[8].BETON_40_45KM_STERE,kmDetalList[8].BETON_40_45KM_TRIP,kmDetalList[8].BETON_40_45KM_AMOUNT,
                                                       	kmDetalList[8].MORTAR_40_45KM_STERE,kmDetalList[8].MORTAR_40_45KM_TRIP,kmDetalList[8].MORTAR_40_45KM_AMOUNT,
                                                       	kmDetalList[8].WARTER_40_45KM_STERE,kmDetalList[8].WARTER_40_45KM_TRIP,kmDetalList[8].WARTER_40_45KM_AMOUNT);
									                }
 			                                    }
 			                        jixiaogongziListH += 				        '<tr><td>公里档补助</td><td colspan="3">'+delzero(jixiaogongziList[i].GONGLIDANGBUZHU)+'</td></tr>';

									jixiaogongziListH += 				        '</tbody>';

									jixiaogongziListH += 				    '</table>';

		                            jixiaogongziListH +=               '<table cellpadding="0" cellspacing="0" class="type_table">';

									jixiaogongziListH +=               '		            <thead>';

									jixiaogongziListH +=               '		                <tr>';

									jixiaogongziListH +=               '		                    <th></th>';

									jixiaogongziListH +=               '		                    <th>方量</th>';

									jixiaogongziListH +=               '		                    <th>趟次</th>';

									jixiaogongziListH +=               '		                    <th>金额</th>';

									jixiaogongziListH +=               '		                </tr>';

									jixiaogongziListH +=               '		            </thead>';

									jixiaogongziListH +=               '		            <tbody>';

									jixiaogongziListH +=               '		                <tr>';

									jixiaogongziListH +=               '		                    <td>塔吊</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].CRANE.CRANE_STERE)+'</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].CRANE.CRANE_TRIP)+'</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].CRANE.CRANE_AMOUNT)+'</td>';

									jixiaogongziListH +=               '		                </tr>';

									jixiaogongziListH +=               '		                <tr>';

									jixiaogongziListH +=               '		                    <td>转运</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].TRANSFER.TRANSFER_STERE)+'</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].TRANSFER.TRANSFER_TRIP)+'</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].TRANSFER.TRANSFER_AMOUNT)+'</td>';

									jixiaogongziListH +=               '		                </tr>';

									jixiaogongziListH +=               '		                <tr>';

									jixiaogongziListH +=               '		                    <td>多土</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].OVERBETON.OVERBETON_STERE)+'</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].OVERBETON.OVERBETON_TRIP)+'</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].OVERBETON.OVERBETON_AMOUNT)+'</td>';

									jixiaogongziListH +=               '		                </tr>';

									jixiaogongziListH +=               '		                <tr>';

									jixiaogongziListH +=               '		                    <td>退土</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].BACKBETON.BACKBETON_STERE)+'</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].BACKBETON.BACKBETON_TRIP)+'</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].BACKBETON.BACKBETON_AMOUNT)+'</td>';

									jixiaogongziListH +=               '		                </tr>';

									jixiaogongziListH +=               '		                <tr>';

									jixiaogongziListH +=               '		                    <td>超时</td>';

									jixiaogongziListH +=               '		                    <td colspan="2">'+delzero(jixiaogongziList[i].EXPIRETIME.EXPIRETIME_HOUR)+'</td>';

									jixiaogongziListH +=               '		                    <td>'+delzero(jixiaogongziList[i].EXPIRETIME.EXPIRETIME_AMOUNT)+'</td>';

									jixiaogongziListH +=               '		                </tr>';

									jixiaogongziListH +=               '		            </tbody>';

									jixiaogongziListH +=               '		        </table>';

									jixiaogongziListH +=               '		        <div class="item_total">';

									jixiaogongziListH +=               '		            <p>绩效小计：<em>'+delzero(jixiaogongziList[i].JIXIAOXIAOJI)+'</em></p>';

									jixiaogongziListH +=               '		        </div>';
                               }
                               $('#performanceList').html(jixiaogongziListH);
    
                    		}
                    	}

                    })
                }
		  }

         performanceDetail.init();
	})
})	