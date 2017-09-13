<?php


class GetCompanyTilesGridData
{
    private $data;
    private $companies;
    public function __construct()
    {
        $this->companies = array();
        $this->data = get_option( 'companyCollection_ids_text', '' );
        $this->parseData();
    }

    private function parseData(){
        $pagesIds = explode(",", $this->data);
        foreach ($pagesIds as $id){
            $companyPageUrl = get_permalink($id);
            $companyImageUrl = wp_get_attachment_url( get_post_thumbnail_id($id) );
            $companyPageTitle = get_the_title($id);
            $companyData = ['pageUrl'=>$companyPageUrl,'imageUrl'=>$companyImageUrl, 'title'=>$companyPageTitle];
            array_push($this->companies, $companyData);
        }
    }

    public function getData(){
        return $this->companies;
    }
}