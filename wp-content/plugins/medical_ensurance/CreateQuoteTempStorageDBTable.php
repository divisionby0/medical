<?php

class CreateQuoteTempStorageDBTable
{
    public function __construct(){
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'quote_temp_storage';

        $tableExists = $wpdb->get_var("show tables like '$table_name'") == $table_name;

        if(!$tableExists) {
            $sql = "CREATE TABLE " . $table_name . " (
	  quoteId text NOT NULL,
	  quote_date text,
	  data text
	);";

            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }
    }
}