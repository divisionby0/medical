<?php

class SaveApplication
{
    public function __construct($post)
    {
        $isApplicationPostType = $post->post_type == Constants::$applicationPostType;
        if($isApplicationPostType){
            $state = $_POST[Constants::$applicationStateEditor];

            if ( isset( $state )) {
                update_post_meta( $post->ID, Constants::$applicationState, $state );
            }
        }
    }
}