<?php


class CreateDBTable
{
    public function __construct()
    {
        //debug.log('CreateDBTable');
        global $wpdb;
        global $quotes_db_version;

        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'indexpageblocks';

        $sql = "CREATE TABLE IF NOT EXISTS ".$table_name." (id int NOT NULL, content text NOT NULL, UNIQUE KEY id (id));";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);

        add_option("quotes_db_version", $quotes_db_version);

        $inserted1 = $wpdb->insert($table_name, array('id' => 0, 'content' => 'empty'));
        $inserted2 = $wpdb->insert($table_name, array('id' => 1, 'content' => 'empty'));
        $inserted3 = $wpdb->insert($table_name, array('id' => 2, 'content' => 'empty'));
    }
}