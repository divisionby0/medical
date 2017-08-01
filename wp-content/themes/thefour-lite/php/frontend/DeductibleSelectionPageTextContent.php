<?php

class DeductibleSelectionPageTextContent
{
    public function __construct()
    {
        $page = get_page_by_title( "DeductibleSelectionPage");

        $content = apply_filters('the_content', $page->post_content);
        echo $content;
    }
}