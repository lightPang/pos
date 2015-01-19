var rootUrl = "/pos/Pos/index.php/";
var createUrl =  rootUrl + "Area/createCity";
var UaDataUrl = rootUrl + "Approve/getUADataByPage";
$(document).ready(function(){
  loadUADataByPage(0);
});
/****
function used to show unapproved setup_order item

data is the array of setup_order, when the length of data is 0

it means that there is no unapproved setup_order

inHtml is the html text to be added into div.
****/
function loadUnApprovedData(data){
  var inHtml = "";
  var headHtml = '<div class="panel panel-default"> \
                  <div class="panel-heading"> \
                    <h4 class="panel-title">  \
                      <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#';
  var midHtml = '"><i class="icon-angle-down bigger-110" data-icon-hide="icon-angle-down" data-icon-show="icon-angle-right"></i>';
  var downHtml = '</a></h4></div><div class="panel-collapse collapse in" id="';
  var lowHtml = '"> \
                  <div class="panel-body">';

  var botHtml = '</div></div></div>';

  if( data.length === 0 ){
    inHtml = "<p>暂无未审批订单</p>"; 
  }
  else{
    
    for( var i = 0; i<data.length; ++i ){
      var contentHtml = "";
      var titleHtml = "&nbsp;" + data[i]['so_number'] + "&nbsp;" + data[i]['client_name'] + "&nbsp;";
      var idHtml = data[i]['so_number'];
      contentHtml = '<div class="row"> \
                        <div class="line"> \
                          <div class="col-sm-3  no-padding-right" > 商户名称：'+data[i]['client_name']+ '</div> \
                          <div class="col-sm-3 no-padding-right" > 正式名称：' + data[i]['formal_name'] +'</div> \
                          <div class="col-sm-4 no-padding-right" > 商户地址：' + data[i]['client_addr'] +'</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right"> 商户属性：' + data[i]['ca_id'] + '个体户</div> \
                          <div class="col-sm-3 no-padding-right"> 商户类别：' + data[i]['mi_id'] + '</div> \
                          <div class="col-sm-3 no-padding-right"> 收单日期：' + data[i]['ac_time'] + '</div> \
                          <div class="col-sm-3 no-padding-right"> 是否加急：' + data[i]['is_urgent'] + '</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 所属省份：'+ data[i]['ap_id'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 所属城市：'+ data[i]['ac_id'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 所在区域：'+ data[i]['ad_id'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 费率【内】：</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 收单银行：'+ data[i]['bill_b_id'] +'</div> \
                          <div class="col-sm-3 no-padding-right" > 开户银行：'+ data[i]['account_b_id'] +'</div> \
                          <div class="col-sm-3 no-padding-right" > 所属平台：'+ data[i]['cp_id'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 费率【外】：'+ data[i]['cr_outer_id'] +'</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-6 no-padding-right" > 入账账号：'+ data[i]['account_num'] + '</div> \
                          <div class="col-sm-6 no-padding-right" > 入账名称：'+ data[i]['account_name'] +'</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="border-bottom"></div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 法人姓名：'+ data[i]['legal_name'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 身份证号码：' +data[i]['passport_num'] +'</div> \
                          <div class="col-sm-3 no-padding-right" > 法人固话：' + data[i]['legal_tel'] + '</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 装机联系人：'+ data[i]['contact_name'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 联系人手机：'+ data[i]['contact_phone'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 联系人传真：'+ data[i]['contact_fax'] + '</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="border-bottom"></div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 银行经办人：'+ data[i]['bo_id'] + '</div> \
                          <div class="col-sm-5 no-padding-right" > 被授权人：' + data[i]['auth_person'] +'</div> \
                          <div class="col-sm-3 no-padding-right" > 登记日期：' + data[i]['register_date'] +'</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 经办人手机：'+ data[i]['bo_phone'] +'</div> \
                          <div class="col-sm-5 no-padding-right" > 身份证号：' + data[i]['auth_person_passport'] +'</div> \
                          <div class="col-sm-3 no-padding-right" > 启用日期：' + data[i]['active_date'] + '</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 所属机构：' + data[i]['belonged_org'] + '</div> \
                          <div class="col-sm-5 no-padding-right" > 入网风险承诺书：'+ data[i]['promise'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 行员名：' + data[i]['banker_name'] +'</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 机构号：' + data[i]['org_num'] + '</div> \
                          <div class="col-sm-5 no-padding-right" > 入网风险承诺书（地址）：' + data[i]['promise_addr'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 行员号：' + data[i]['banker_num'] + '</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 营业执照编号：'+ data[i]['license_num'] + '</div> \
                          <div class="col-sm-5 no-padding-right" >入网风险承诺书（结算）：' + data[i]['promise_close'] + '</div> \
                          <div class="col-sm-3 no-padding-right" > 申请人卡号：' + data[i]['applier_card_num'] + '</div>   \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                          <div class="col-sm-3 no-padding-right" > 归档编号：' + data[i]['file_num'] + '</div> \
                          <div class="bottom"></div> \
                        </div> \
                        <div class="border-bottom"></div> \
                        <div class="line"> \
                            <div class="col-sm-1 no-padding-right" >协议：</div> \
                            <div class="col-sm-2 "> \
                              <Button onclick="downloadFile('+data[i]['contract_file_id']+')">下载</Button> \
                            </div> \
                            <div class="col-sm-1 no-padding-right" >税务登记：</div> \
                            <div class="col-sm-2 file-box"> \
                              <Button onclick="downloadFile('+data[i]['tax_file_id']+')">下载</Button> \
                            </div> \
                            <div class="col-sm-1 control-div no-padding-right" >营业执照：</div> \
                            <div class="col-sm-2 file-box"> \
                              <Button onclick="downloadFile('+data[i]['license_file_id']+')">下载</Button> \
                            </div> \
                            <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                            <div class="col-sm-1 no-padding-right" >卡复印件：</div> \
                            <div class="col-sm-2 file-box"> \
                              <Button onclick="downloadFile('+data[i]['card_file_id']+')">下载</Button> \
                            </div> \
                            <div class="col-sm-1 no-padding-right" >身份证复印</div> \
                            <div class="col-sm-2 file-box">  \
                              <Button onclick="downloadFile('+data[i]['passport_file_id']+')">下载</Button> \
                            </div> \
                            <div class="col-sm-1 control-div no-padding-right" >授权委托书</div> \
                            <div class="col-sm-2 file-box"> \
                              <Button onclick="downloadFile('+data[i]['auth_file_id']+')">下载</Button> \
                            </div> \
                            <div class="bottom"></div> \
                        </div> \
                        <div class="line"> \
                            <div class="col-sm-1 no-padding-right" >商户图片1</div> \
                            <div class="col-sm-2 file-box"> \
                             <Button onclick="downloadFile('+data[i]['client_img_1_id']+')">下载</Button> \
                            </div> \
                            <div class="col-sm-1 no-padding-right" >商户图片2</div> \
                            <div class="col-sm-2 file-box"> \
                              <Button onclick="downloadFile('+data[i]['client_img_2_id']+')">下载</Button> \
                            </div> \
                            <div class="col-sm-1 no-padding-right" >商户图片3</div> \
                            <div class="col-sm-2 file-box"> \
                             <Button onclick="downloadFile('+data[i]['client_img_3_id']+')">下载</Button> \
                            </div> \
                            <div class="bottom"></div> \
                        </div> \
                        <div class="border-bottom"></div> \
                        <div  class="dataTables_wrapper" role="grid"> \
                          <input type="hidden" id="si_list" name="si_list" value="1"/> \
                          <table id="machineListTable" class="table table-striped table-bordered table-hover"> \
                            <thead> \
                              <tr> \
                                <th>编号</th> \
                                <th>安装地址</th> \
                                <th>拓展人</th> \
                                <th>机型型号</th> \
                                <th>键盘型号</th> \
                                <th>SIM卡型号</th> \
                                <th>年费</th> \
                                <th>押金</th> \
                                <th>备注</th> \
                              </tr> \
                            </thead> \
                            <tbody> \
                            </tbody> \
                          </table> \
                        </div> \
                        <div class="space-8"></div> \
                        <div class="form-group"> \
                          <div class="col-md-10 "> </div> \
                          <div class="col-sm-2 "> \
                            <button class="btn btn-info" id="submitBtn" type="button"> \
                              <i class="icon-ok bigger-110"></i> \
                                Submit \
                            </button> \
                          </div> \
                        </div>  \
                      </div>';
      contentHtml = headHtml + idHtml + midHtml + titleHtml + downHtml + idHtml + lowHtml+contentHtml + botHtml;
      inHtml += contentHtml;
    }
  }

  $("#submitContent").html('');
  $("#submitContent").html(inHtml);
}

/****
function used to load unapproved setup_order item from sever

pageNum is the pageNum of the setup_order, when it is initialized to 0,

it means that the first page of data will be loaded

****/
function loadUADataByPage(pageNum){
  $.ajax({
    type: "POST",
    dataType:"json", 
    url: UaDataUrl,
    data: {'pageNum':pageNum},
    success: function(data){
      loadUnApprovedData(data['data']);

    }
  });
  paging(pageNum);
  $liList = $("#submitPage").find('li');
  for( var i = 0; i < $liList.length; ++i ){
    $a = $liList.eq(i);
    var tabValue = $a.find('a').html();
    if( tabValue -1== pageNum ){
      $a.addClass('disabled');
    }
  }
}

/****
function used to download img from server

id is the file id .

****/
function downloadFile(id){
  window.open('/pos/Pos/index.php/File/downloadFileById/id/'+id);
}

/****
function used to initialize the paging button

only five paging button will be shown and the origin is the starting page num
****/
function paging(origin){
  var submitPageCount = $("#submitPageCount").val();
  var leftLiClass = '';
  var rightLiClass = '';
  if( origin == 0 )
    leftLiClass = 'class="disabled"';
  if( origin == submitPageCount - 1 )
    rightLiClass = 'class="disabled"';
  var pageHtml = '<ul class="pagination"><li '+ leftLiClass +'><a><<</a></li>';
  if( submitPageCount == 0 ) return;
  for( var i = origin-4; i < origin+5; ++i ){
    if( i <0 || i >= submitPageCount ) continue;
    else{
      var liHtml = '<li><a href="javascript:alterPage('+ i.toString() +')" >'+(i +1 ).toString()+'</a></li>';
      pageHtml += liHtml;
    }
  }
  pageHtml += '<li '+ rightLiClass +' ><a>>></a></li></ul>';
  $("#submitPage").html(pageHtml);
}