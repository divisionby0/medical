<?php
class CompanyContentText
{
    public function get($companyName){
        global $wpdb;
        $requestText = "SELECT post_id FROM $wpdb->postmeta WHERE meta_key = '".$this->getMetaKey()."' AND  meta_value = '".$companyName."' LIMIT 1000";
        $posts = $wpdb->get_results($requestText, ARRAY_A);

        $postToShow = null;
        
        for($i=0; $i<sizeof($posts); $i++){
            $postId = $posts[$i]["post_id"];
            $post = get_post($postId, OBJECT);
            $postType = $post->post_type;

            if($postType === $this->getPostType()){
                $postToShow = $post;
               break; 
            }
        }
        return $postToShow->post_content;
    }

    protected function getMetaKey(){
    }
    protected function getPostType(){
    }
}