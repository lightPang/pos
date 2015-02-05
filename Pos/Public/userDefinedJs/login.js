$(document).ready(function(){
  $('input[name=account]').focus();

  $('#login_form').submit(function(event){
        event.preventDefault();
        var $form = $(this),
          url = $form.attr('action');
          account = $('input[name=account]').val();
          pwd = $('input[name=pwd]').val();

        if(account != '' && pwd != ''){
          $('#sbtn').attr("disabled", true);
          $.post(url, {account:$.md5(account), pwd:$.md5(pwd)}, function(data){
            if(data=='true'){
              location.href="Index/home";
            }
            else if(data=='fail'){
              alert('账号或密码错误！');
            }
            else{
              alert(data);
            }
          })
          .complete(function() { $('#sbtn').attr("disabled", false);});
        }        
  });
});
