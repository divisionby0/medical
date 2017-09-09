<?php


class IndexPageSlider
{
    public function getHTML(){
        $id = get_option( 'index_page_gallery_id', '' );
        return do_shortcode("[metaslider id=".$id." percentwidth=100]");
    }
}