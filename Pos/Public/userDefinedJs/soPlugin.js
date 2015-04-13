;(function($){
  $.fn.soPlugin = function(opts){
    var defaults = {
      "so_id" : null,
      "tableIndexArr" : null,
      "dataUrl" : "/pos/Pos/index.php/Apply/getSoItem"
    };

    var option = $.extend( defaults, opts );

    //this.css('color','red');
    this.each(function(){
      //var $_this = $(this);
      console.log( 2 );});
      var $_this = this;
      $.ajax({
        type:'post',
        data:{ "soId" : option.so_id },
        url : option.dataUrl,
        success:function(data){
          var innerHtml = ' <div class="row">\
                  <div class="line"> \
                    <div class="col-sm-3  no-padding-right" id="ua_so_number"> 订单编号：<span></span></div>\
                    <div class="col-sm-3 no-padding-right" id="ua_client_number"> 商户编号：<span></span></div> \
                    <div class="col-sm-4 no-padding-right" id="ua_state"> 订单状态：<span></span></div> \
                    <div class="bottom"></div> \
                  </div>\
                  <div class="line"> \
                    <div class="col-sm-3  no-padding-right" id="ua_client_name"> 商户名称：<span></span></div>\
                    <div class="col-sm-3 no-padding-right" id="ua_formal_name"> 正式名称：<span></span></div> \
                    <div class="col-sm-4 no-padding-right" id="ua_client_addr"> 商户地址：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_clientAttr"> 商户属性：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_clientMcc"> 商户类别：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_ac_time"> 收单日期：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_is_urgent"> 是否加急：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_province"> 所属省份：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_city"> 所属城市：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_district"> 所在区域：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_crInner"> 费率【内】：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_billBank"> 收单银行：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_acBank"> 开户银行：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_clientPlatform"> 所属平台：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_crOuter"> 费率【外】：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-6 no-padding-right" id="ua_account_num"> 入账账号：<span></span></div> \
                    <div class="col-sm-6 no-padding-right" id="ua_account_name"> 入账名称：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="border-bottom"></div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_legal_name"> 法人姓名：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_passport_num"> 身份证号码：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_legal_tel"> 法人固话：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_contact_name"> 装机联系人：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_contact_phone"> 联系人手机：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_contact_fax"> 联系人传真：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="border-bottom"></div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_bankOp"> 银行经办人：<span></span></div> \
                    <div class="col-sm-5 no-padding-right" id="ua_auth_person"> 被授权人：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_register_date"> 登记日期：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_bo_phone"> 经办人手机：<span></span></div> \
                    <div class="col-sm-5 no-padding-right" id="ua_auth_person_passport"> 被授权人身份证号：</div> \
                    <div class="col-sm-3 no-padding-right" id="ua_active_date"> 启用日期：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_belonged_org"> 所属机构：<span></span></div> \
                    <div class="col-sm-5 no-padding-right" id="ua_promise"> 入网风险承诺书：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_banker_name"> 行员名：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_org_um"> 机构号：<span></span></div> \
                    <div class="col-sm-5 no-padding-right" id="ua_promise_addr"> 入网风险承诺书（地址）：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_banker_num"> 行员号：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_license_num"> 营业执照编号：<span></span></div> \
                    <div class="col-sm-5 no-padding-right" id="ua_promise_close">入网风险承诺书（结算）：<span></span></div> \
                    <div class="col-sm-3 no-padding-right" id="ua_applier_card_num"> 申请人卡号：<span></span></div>   \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                    <div class="col-sm-3 no-padding-right" id="ua_file_num"> 归档编号：<span></span></div> \
                    <div class="bottom"></div> \
                  </div> \
                  <div class="border-bottom"></div> \
                  <div class="line"> \
                    <div class="col-sm-1 no-padding-right" >协议：</div> \
                      <div class="col-sm-2 "> \
                        <Button id="ua_contractDownload">下载</Button> \
                      </div> \
                      <div class="col-sm-1 no-padding-right" >税务登记：</div> \
                      <div class="col-sm-2"> \
                        <Button id="ua_taxDownload">下载</Button> \
                      </div>\
                      <div class="col-sm-1 control-div no-padding-right" >营业执照：</div> \
                      <div class="col-sm-2"> \
                        <Button id="ua_licenseDownload">下载</Button> \
                      </div> \
                      <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                      <div class="col-sm-1 no-padding-right" >卡复印件：</div> \
                      <div class="col-sm-2"> \
                        <Button id="ua_cardDownload">下载</Button> \
                      </div> \
                      <div class="col-sm-1 no-padding-right" >身份证复印</div> \
                      <div class="col-sm-2">  \
                        <Button id="ua_passportDownload">下载</Button> \
                      </div> \
                      <div class="col-sm-1 control-div no-padding-right" >授权委托书</div> \
                      <div class="col-sm-2 file-box"> \
                        <Button id="ua_authDownload" >下载</Button> \
                      </div> \
                      <div class="bottom"></div> \
                  </div> \
                  <div class="line"> \
                      <div class="col-sm-1 no-padding-right" >商户图片1</div> \
                      <div class="col-sm-2 "> \
                        <Button id="ua_clientImgDownload1" onclick="downloadFile()">下载</Button> \
                      </div> \
                      <div class="col-sm-1 no-padding-right" >商户图片2</div> \
                      <div class="col-sm-2"> \
                        <Button id="ua_clientImgDownload2" >下载</Button> \
                      </div> \
                      <div class="col-sm-1 no-padding-right" >商户图片3</div> \
                        <div class="col-sm-2 "> \
                        <Button id="ua_clientImgDownload3" onclick="downloadFile()">下载</Button> \
                      </div> \
                      <div class="bottom"></div> \
                  </div> \
                  <div class="border-bottom"></div>\
                  <form id="ua_si_form">\
                    <table id="ua_si-table" class="table table-striped table-bordered table-hover">\
                      <thead>\
                        <tr>\
                          <th>安装地址</th>\
                          <th>拓展人</th>\
                          <th>机型型号</th>\
                          <th>机身编码</th>\
                          <th>键盘型号</th>\
                          <th>键盘编码</th>\
                          <th>SIM卡类型</th>\
                          <th>SIM卡号码</th>\
                          <th>年费</th>\
                          <th>押金</th>\
                          <th>备注</th>\
                        </tr>\
                      </thead>\
                      <tbody>\
                      </tbody>\
                    </table>\
                    <div class="space-8"></div>\
                    <div class="form-group">\
                      <div class="col-sm-9"> </div>\
                      <div class="col-sm-3">\
                        <button class="btn btn-info" id="ua_passBtn" type="button" onclick="passApply()">\
                          <i class="icon-ok bigger-110"></i>\
                            通过\
                        </button>\
                        <button class="btn btn-danger" id="ua_returnBtn" type="button">\
                          <i class="icon-share-alt bigger-110"></i>\
                            返回\
                        </button>\
                      </div>\
                    </div> \
                    <input type="hidden" name="so_id" id="ua_so_id" />\
                    <input type="hidden" name="c_id" id="ua_c_id" />\
                  </form>\
              </div>';
          if( $_this.find('#ua_so_number').length == 0  )
          $_this.append( innerHtml );
        else console.log(123);
          var soItem = data['data'];
          for( var k in soItem ){
            var id = "#ua_"  + k ;
            $(id).find('span').html( soItem[k] );
          }
          console.log( data );
        }
      });
    
  }
})(jQuery);

function test(){
  $("#file_upload").soPlugin({
    "so_id" : "2"
  });
}