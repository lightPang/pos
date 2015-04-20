<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>POS机管理系统</title>
    <!-- basic styles -->

    <link href="__PUBLIC__/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="__PUBLIC__/css/font-awesome.min.css" />
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />
    <link rel="stylesheet" href="__PUBLIC__/css/ace.min.css" />
    <link rel="stylesheet" href="__PUBLIC__/css/ace-rtl.min.css" />

  </head>

  <body class="login-layout">
    <div class="main-container">
      <div class="main-content">
        <div class="row">
          <div class="col-sm-10 col-sm-offset-1">
            <div class="login-container">
              <div class="center">
                <h1>
                  <i class="icon-leaf green"></i>
                  <span class="red">POS机</span>
                  <span class="white">管理系统</span>
                </h1>
                <h4 class="blue">&copy; 城域科技有限公司</h4>
              </div>

              <div class="space-6"></div>

              <div class="position-relative">
                <div id="login-box" class="login-box visible widget-box no-border">
                  <div class="widget-body">
                    <div class="widget-main">
                      <h4 class="header blue lighter bigger">
                        <i class="icon-coffee green"></i>
                        请登陆
                      </h4>

                      <div class="space-6"></div>

                      <form method="post" id="login_form" action="__APP__/Index/login">
                        <fieldset>
                          <label class="block clearfix">
                            <span class="block input-icon input-icon-right">
                              <input type="text" class="form-control" name="account" placeholder="用户名" />
                              <i class="icon-user"></i>
                            </span>
                          </label>

                          <label class="block clearfix">
                            <span class="block input-icon input-icon-right">
                              <input type="password" class="form-control" name="pwd" placeholder="密码" />
                              <i class="icon-lock"></i>
                            </span>
                          </label>

                          <div class="space"></div>

                          <div class="form-actions center">
                            <input type="submit" value="登陆" id="sbtn" class="width-35 btn btn-sm btn-primary">
                          </div>

                          <div class="space-4"></div>
                        </fieldset>
                      </form>
                    </div><!-- /widget-main -->
                  </div><!-- /widget-body -->
                </div><!-- /login-box -->
              </div><!-- /position-relative -->
            </div>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div>
    </div><!-- /.main-container -->


    <script src="__PUBLIC__/js/jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="__PUBLIC__/js/jquery.md5.js"></script>
    <script type="text/javascript" src="__PUBLIC__/userDefinedJs/login.js"></script>
</body>
</html>