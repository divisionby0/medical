<?php


class GetIndexPageContent
{
    public function execute(){
        global $wpdb;

        $table_name = $wpdb->prefix . 'indexpageblocks';
        $result = $wpdb->get_results('SELECT * FROM '.$table_name);

        $pageDataParser = new IndexPageDataParser();
        $pageDataMap = $pageDataParser->parse($result);
        return $pageDataMap;
    }
}