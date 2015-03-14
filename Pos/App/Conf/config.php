<?php
return array(
    'URL_MODEL' =>  1, // 如果你的环境不支持PATHINFO 请设置为3
    'DB_TYPE'   =>  'mysql',
    'DB_HOST'   =>  'localhost',
    'DB_NAME'   =>  'pos',
    'DB_USER'   =>  'root',
    'DB_PWD'    =>  '',
    'DB_PORT'   =>  '3306',
    'DB_PREFIX' =>  '',
    'DEFAULT_TIMEZONE'=>'Asia/ShangHai' ,
    'Web_Prefix' => '/pos/Pos/',
	//'配置项'=>'配置值'
    #'SHOW_RUN_TIME'    => true, // 运行时间显示
    #'SHOW_ADV_TIME'    => true, // 显示详细的运行时间
    #'SHOW_DB_TIMES'    => true, // 显示数据库查询和写入次数
   # 'SHOW_CACHE_TIMES' => true, // 显示缓存操作次数
    #'SHOW_USE_MEM'     => true, // 显示内存开销
    #'SHOW_LOAD_FILE'   => true, // 显示加载文件数
   # 'SHOW_FUN_TIMES'   => true, // 显示函数调用次数
);
?>