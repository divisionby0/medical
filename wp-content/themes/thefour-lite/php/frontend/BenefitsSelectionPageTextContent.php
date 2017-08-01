<?php


class BenefitsSelectionPageTextContent
{
    public function __construct()
    {
        $page = get_page_by_title( "BenefitSelectionPage");

        //$post = get_post($id);

        $content = apply_filters('the_content', $page->post_content);
        echo $content;
    }
}