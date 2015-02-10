<?php
class Access {
    //pdo对象
    private $_pdo = null;
    
    function Access($databasePath){
        $this->__construct($databasePath);
    }
    
    function __construct($databasePath) {
        try {
            $this->_pdo = new PDO("odbc:driver={microsoft access driver (*.mdb)};dbq=".$databasePath);
            $this->_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            exit($e->getMessage());
        }
    }
    /*
    *新增
    *$_table    string 表名
    *$_addData  array(key=>value) 插入数据
    *@return    返回受上一个 SQL 语句影响的行数
    */
    function addAll($_table, Array $_addArr) {
        $_sql = "";
        for( $i = 0 ; $i < count($_addArr); ++$i ){
            $_addFields = array();
            $_addValues = array();
            $_addData = $_addArr[$i];
            foreach ($_addData as $_key=>$_value) {
                $_addFields[] = $_key;
                $_addValues[] = $_value;
            }
            $_addFields = implode(',', $_addFields);
            $_addValues = implode("','", $_addValues);

            $_sql = "INSERT INTO $_table ($_addFields) VALUES ('$_addValues')";
            $_sql = iconv('utf-8', 'gbk//IGNORE', $_sql);//echo $_sql;
            try {
            $_stmt = $this->_pdo->prepare($_sql);
            $_stmt->execute();
            }catch (PDOException  $e) {
                exit("SQL statement: ".$_sql."\r\nError Info: ".$e->getMessage());
            }
        }

        return $_stmt;
    }

    /*
    *新增
    *$_table    string 表名
    *$_addData  array(key=>value) 插入数据
    *@return    返回受上一个 SQL 语句影响的行数
    */
    function add($_table, Array $_addData) {
        $_addFields = array();
        $_addValues = array();
        foreach ($_addData as $_key=>$_value) {
            $_addFields[] = $_key;
            $_addValues[] = $_value;
        }
        $_addFields = implode(',', $_addFields);
        $_addValues = implode("','", $_addValues);
        $_sql = "INSERT INTO $_table ($_addFields) VALUES ('$_addValues')";
        return $this->execute($_sql)->rowCount();
    }
    
    /*删除
    *$_table    string 表名
    *$_param    array(key=>value) 删除条件
    *@return    返回受上一个 SQL 语句影响的行数
    */
    function delete($_table, Array $_param) {
        $_where = '';
        foreach ($_param as $_key=>$_value) {
            $_where .= "$_key = '$_value' AND ";
        }
        $_where = 'WHERE '.substr($_where, 0, -4);
        $_sql = "DELETE FROM $_table $_where";
        return $this->execute($_sql)->rowCount();
    }

    /*修改
    *$_table    string 表名
    *$_param    array(key=>value) 条件
    *$_updateData   array(key=>value) 更新数据
    *@return    返回受上一个 SQL 语句影响的行数
    **/
    function update($_table, Array $_param, Array $_updateData) {
        $_where = $_setData = '';
        foreach ($_param as $_key=>$_value) {
            $_where .= "$_key = '$_value' AND ";
        }
        $_where = 'WHERE '.substr($_where, 0, -4);
        foreach ($_updateData as $_key=>$_value) {
            if (is_array($_value)) {
                $_setData .= "$_key='$_value[0]',";
            } else {
                $_setData .= "$_key='$_value',";
            }
        }
        $_setData = substr($_setData, 0, -1);
        $_sql = "UPDATE $_table SET $_setData $_where";
        return $this->execute($_sql)->rowCount();
    }
    
    /*查询
    *$_table    string 表名
    *$_fileld   array() 投影列
    *$_param    array(key=>array(key=>value)) 选择条件
    *@return objects array
    */
    function select($_table, Array $_fileld, Array $_param = array()) {
        $_limit = $_order = $_where = $_like = '';
        if (is_array($_param) && !empty($_param)) {
            $_limit = isset($_param['limit']) ? 'LIMIT '.$_param['limit'] : '';
            $_order = isset($_param['order']) ? 'ORDER BY '.$_param['order'] : '';
            if (isset($_param['where'])) {
                foreach ($_param['where'] as $_key=>$_value) {
                    $_where .= "$_key = '$_value' AND ";
                }
                $_where = 'WHERE '.substr($_where, 0, -4);
            }
            if (isset($_param['like'])) {
                foreach ($_param['like'] as $_key=>$_value) {
                    $_like = "WHERE $_key LIKE '%$_value%'";
                }
            }
        }
        $_selectFields = implode(',', $_fileld);
        $_sql = "SELECT $_selectFields FROM $_table $_where $_like $_order $_limit";
        $_stmt = $this->execute($_sql);
        $_result = array();
        while (!!$_objs = $_stmt->fetchObject()) {
            $_result[] = $_objs;
        }
        return $_result;
    }

    /*验证一条记录是否存在
    *$_table    string 表名
    *$_param    array(key=>array(key=>value))   条件
    *@return    bool
    */
    function hasOne($_table, Array $_param = array()) {
        return $this->totalNum($_table, $_param) ? true : false;
    }
    
    /*获取记录总数
    *$_table    string 表名
    *$_param    array(key=>array(key=>value))   条件
    *@return    int 记录总数
    */
    function totalNum($_table, Array $_param = array()) {
        $_where = '';
        if (isset($_param['where'])) {
            foreach ($_param['where'] as $_key=>$_value) {
                $_where .= "$_key = '$_value' AND ";
            }
            $_where = 'WHERE '.substr($_where, 0, -4);
        }
        $_sql = "SELECT COUNT(*) as count FROM $_table $_where";
        $_stmt = $this->execute($_sql);
        return $_stmt->fetchObject()->count;
    }

    /*执行SQL
    *$_sql  string sql语句
    *@return  PDOStatement object or false
    */
    function execute($_sql) {
        $_sql = iconv('utf-8', 'gbk//IGNORE', $_sql);//echo $_sql."<br>";
        try {
            $_stmt = $this->_pdo->prepare($_sql);
            $_stmt->execute();
        } catch (PDOException  $e) {
            exit("SQL statement: ".$_sql."\r\nError Info: ".$e->getMessage());
        }
        return $_stmt;
    }
}
?>