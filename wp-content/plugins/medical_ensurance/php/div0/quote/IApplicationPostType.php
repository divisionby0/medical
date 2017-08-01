<?php


interface IApplicationPostType
{
    /**
     * Get the post data as a wp_insert_post compatible array.
     *
     * @return array
     */
    public function get_post_data();

    /**
     * Get all the post meta as a key-value associative array.
     *
     * @return array
     */
    public function get_post_meta();
}