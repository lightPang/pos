;(function($){
  $.fn.rrPlugin = function(opts){
    var defaults = {
      "rr_id" : null,
      "div_prefix" : null,
      "dataUrl" : "/pos/Pos/index.php/ReturnRecord/getReturnRecord"
    };

    var option = $.extend( defaults, opts );

    //this.css('color','red');
    this.each(function(){
       
      //var $_this = $(this);
      console.log( 2 );});
      var $_this = this;
      console.log(123);
      if( $_this.find('div').length != 0  ){
        console.log(123);
        $_this.find('span').html('');
        $_this.find('tbody').html('');
      }
      $.ajax({
        type:'post',
        data:{ "rr_id" : option.rr_id },
        url : option.dataUrl,
        success:function(data){
          var innerHtml = 
                '<div class="line"> '
                +'<div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'm_code"> 机身编码：<span></span></div>'
                +'<div class="col-sm-3 no-padding-right" id="' + option.div_prefix + 'm_tcode"> 终端编号：<span></span></div>'
                + '<div class="bottom"></div>'
                + '</div>'
                + '<div class="space-4"></div>'  
                + '<div class="line"> \
                  <div class="col-sm-3 no-padding-right" id="' + option.div_prefix + 'addr"> 安装地址：<span></span></div>' 
                + '<div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'setup_time"> 装机时间：<span></span></div>'
                +  '<div class="bottom"></div>' 
                +'</div>'
                +'<div class="line">'
                + '<div class="col-sm-3 no-padding-right" id="' + option.div_prefix + 'create_time"> 创建时间：<span></span></div>' 
                +  '<div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'returnType"> 退机类型<span></span></div>'
                +  '<div class="bottom"></div>' 
                +'</div>' 
                +'<div class="line">' 
                +  '<div class="col-sm-3 no-padding-right" id="' + option.div_prefix + 'confirm_time"> 确认时间：<span></span></div>' 
                +  '<div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'complete_time"> 完成时间：<span></span></div>'
                +  '<div class="bottom"></div>' 
                +'</div>'
                +'<div class="line">' 
                +  '<div class="col-sm-3 no-padding-right" id="' + option.div_prefix + 'receive_time"> 接机时间：<span></span></div>' 
                +  '<div class="col-sm-3 no-padding-right" id="' + option.div_prefix + 'complete_info"> 完成备注：<span></span></div>'
                +  '<div class="bottom"></div>' 
                +'</div>'
                +'<div class="line">' 
                +  '<div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'reject_time"> 拒绝时间：<span></span></div>'
                +  '<div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'reject_info"> 拒绝备注：<span></span></div>'
                +  '<div class="bottom"></div>'
                +'</div>'   
                +'<div class="line">' 
                +  '<div class="col-sm-3 no-padding-right" id="' + option.div_prefix + 'User"> 负责人：<span></span></div>' 
                +  '<div class="col-sm-3  no-padding-right" id="' + option.div_prefix + 'state"> 退机状态：<span></span></div>'
                +  '<div class="bottom"></div>'
                +'</div>'  
                +'<div class="record_div">'
                +  '<input type="hidden" id="' + option.div_prefix + 'table_name" value="return_record" />'
                +  '<input type="hidden" id="' + option.div_prefix + 'item_id" />'
                +  '<table id="' + option.div_prefix + 'record_table"  class="table table-striped table-bordered table-hover">'
                +    '<thead>'
                +      '<tr><th class="user_td">修改用户</th><th class="time_td" >修改时间</th><th class="content_td">修改内容</th></tr>'
                +    '</thead><tbody></tbody></table></div><!-- record div end -->';
          if( $_this.find('div').length == 0  )
            $_this.append( innerHtml );
          var item = data['data'];
          for( var k in item ){
            var id = "#" + option.div_prefix  + k ;
            $(id).find('span').html( item[k] );
          }
          var stateTxt = '';
          switch( item['state'] ){
            case '0':
              stateTxt = '已提交';
              break;
            case '1':
              stateTxt = '已确认';
              break;
            case '2':
              stateTxt = '已完成';
              break;
            case '3':
              stateTxt = '已还机';
              break;
            case '4':
              stateTxt = '未通过';
              break;
          }
          $("#"+ option.div_prefix +"state").find('span').html( stateTxt );
          var item_name_id = "#" + option.div_prefix + 'item_id';
          $( item_name_id ).val( item['rr_id'] );
          loadModifyRecordWithId( option.div_prefix + 'table_name' , option.div_prefix + 'item_id' , option.div_prefix + 'record_table');
        }
      });
    
  }
})(jQuery);
