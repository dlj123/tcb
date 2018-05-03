 require(['../config'],function(config) {

  require(['jquery','common','fastclick'], function ($, common,fastclick) {

          var ipAdress = common.ipAdress;

          var tokenId = sessionStorage.getItem("tokenId"),companyId="",carId="",companyId02="",deptId="",personInit = {};  

          var companyName="",deptName="",positionName="",staffName="";

          var choose = {

            init:function(){

              common.tab('.top_tab ul li','.content_panel');

              this.dataInit();

              this.chooseSubmit();

              this.toIndex();
            
            },
            toIndex:function(){

             var path = window.location.search;

                    path = path.slice(1);

                    path = common.parseUrl(path);

              $('.asidemenu').on('click',function(){

                  window.location.href="../home/index.html?companyId="+path.companyId+"&deptId="+path.deptId+"&btmIndex=0";
              })

            },
            dataInit:function(){

                 var path = window.location.search;

                    path = path.slice(1);

                    path = common.parseUrl(path);

                    companyId = path.companyId;

                    deptId = path.deptId;

                 var formType = 'sgck';
                 
                 $.ajax({

                    url:ipAdress+'/weixin/oaDoc/findAccidentByUserId',

                    data:{
                          
                       tokenId: tokenId,

                       formType:formType
                    },
                    dataType:'json',

                    type:'POST',

                    success:function(res){

                      //alert("成功");
                      var accidentList = res.data.accidentList;

                      for(var i = 0;i<accidentList.length;i++){
                        var accidentMap = accidentList[i];
                        var s = "<tr align='center'><td><input type='radio' name='accidentId' value='"+accidentMap.id+"' /></td>";
                        s+= "<td>"+accidentMap.flowName+"</td><td>"+accidentMap.createDate+"</td><td>"+accidentMap.userName+"</td><td>"+accidentMap.id+"</td></tr>";
                        $('#accidentTable tbody').append(s);
                      }

                      console.log(res);

                    }
                 })

            },
           
          
          
            chooseSubmit:function(){

               

              $('.submit_wrap').on('click','.submit_btn',function(){
                
                  var accidentId = $("input[name='accidentId']:checked").val();
                      
                  window.location.href="accidentLoan.html?companyId="+companyId+"&accidentId="+accidentId+"&deptId="+deptId;


              })
            }

           
          

            
          }
         choose.init();

  }) 
})  
function handleFiles(files) {

                   /*在各个机型都可以点击 file 调用相册 和 摄像头拍照 
                  1. 在老版本的安卓中，必须加上capture，否则只能调用相册 
                  2. 在IOS中 加了capture，就只能调用摄像头不能调用相册*/
                var getIos = function(){
                    
                       var ua=navigator.userAgent.toLowerCase();

                       if (ua.match(/iPhone\sOS/i) == "iphone os") {

                                  return true;

                        } else {

                                  return false;

                        }
                 }//getIos方法结束
                 if (getIos()) {

                              $('#upImgInput').removeAttr("capture");
                   }

                var list = document.getElementById('fileList');
            
                var lastItem = document.getElementById('last');
             
                for (var i = 0; i < files.length; i++) {

                  var li = document.createElement("li");

                  list.insertBefore(li,lastItem);

                  var div = document.createElement("div");

                  div.className="pic";

                  var img = document.createElement("img");

                  img.src = window.URL.createObjectURL(files[i]);

                  console.log(img.src);
                 
                  img.onload = function() {

                    window.URL.revokeObjectURL(this.src);

                  }
                 

                  li.appendChild(div);

                  div.append(img);

                  var span = document.createElement("span");

                  span.className="del";

                  var i = document.createElement("i");

                  i.className="delIcon iconfont icon-guanbi";

                  span.append(i);

                  div.append(span);
                
                }
             
            }



        