;(function($){
  $.fn.siPlugin = function(opts){
    var defaults = {
      "rr_id" : null,
      "tableIndexArr" : null,
      "div_prefix" : null,
      "dataUrl" : "/pos/Pos/index.php/ReturnRecord/getReturnRecord"
    };

    var option = $.extend( defaults, opts );

    //this.css('color','red');
    this.each(function(){
      //var $_this = $(this);
      console.log( 2 );});
      var $_this = this;
      if( $_this.find('div').length != 0  ){
        $_this.find('span').html('');
        $_this.find('tbody').html('');
      }
      $.ajax({
        type:'post',
        data:{ "si_id" : option.si_id },
        url : option.dataUrl,
        success:function(data){
          var innerHtml = ' <div class="row">\
                  <div class="line"> \
                    <div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'so_number"> 订单编号：<span></span></div>\
                    <div class="col-sm-3 no-padding-right" id="'+ option.div_prefix + 'client_number"> 商户编号：<span></span></div> \
                    <div class="col-sm-4 no-padding-right" id="'+ option.div_prefix + 'state"> 订单状态：<span></span></div> \
                    <div class="bottom"></div> \
                  </div>\
                  <div class="line"> \
                    <div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'addr"> 装机地址：<span></span></div>\
                    <div class="col-sm-3 no-padding-right" id="'+ option.div_prefix + 'version"> 机型版本：<span></span></div> \
                    <div class="col-sm-4 no-padding-right" id="'+ option.div_prefix + 'key"> 密钥：<span></span></div> \
                    <div class="bottom"></div> \
                  </div>\
                  <div class="line"> \
                    <div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'm_code"> 机身编码：<span></span></div>\
                    <div class="col-sm-3 no-padding-right" id="'+ option.div_prefix + 'keyboard_code"> 键盘编码：<span></span></div> \
                    <div class="col-sm-4 no-padding-right" id="'+ option.div_prefix + 'm_tcode"> 终端编码：<span></span></div> \
                    <div class="bottom"></div> \
                  </div>\
              </div>' + '<div class="record_div"> \
                  <input type="hidden" id="' + option.div_prefix + 'table_name" value="setup_item" />\
                  <input type="hidden" id="' + option.div_prefix + 'item_id" />\
                  <table id="' + option.div_prefix + 'record_table"  class="table table-striped table-bordered table-hover">\
                  <thead>\
                    <tr>\
                      <th class="user_td">修改用户</th>\
                      <th class="time_td" >修改时间</th>\
                      <th class="content_td">修改内容</th>\
                    </tr>\
                  </thead>\
                  <tbody>\
                  </tbody>\
                </table>\
                </div><!-- record div end -->';
          if( $_this.find('div').length == 0  )
            $_this.append( innerHtml );
          var soItem = data['data'];
          for( var k in soItem ){
            var id = "#" + option.div_prefix  + k ;
            $(id).find('span').html( soItem[k] );
          }
          var item_name_id = "#" + option.div_prefix + 'item_id';
          $( item_name_id ).val( soItem['si_id'] );
          loadModifyRecordWithId( option.div_prefix + 'table_name' , option.div_prefix + 'item_id' , option.div_prefix + 'record_table');
        }
      });
    
  }
})(jQuery);
