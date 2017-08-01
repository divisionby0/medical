<?php

class InitApplicationsPostType
{
    public function __construct()
    {
        $labels = array(
            'name' => 'Applications',
            'singular_name' => 'Application', // админ панель Добавить->Функцию
            'add_new' => 'Add application',
            'add_new_item' => 'Add new application', // заголовок тега <title>
            'edit_item' => 'Edit application',
            'new_item' => 'New application',
            'all_items' => 'All applications',
            'view_item' => 'View application',
            'search_items' => 'Find application',
            'not_found' =>  'Quotes not found.',
            'not_found_in_trash' => 'No applications at trash.',
            'menu_name' => 'Applications' // ссылка в меню в админке
        );

        $args = array(
            'labels' => $labels,
            'singular_label' => __('Applications'),
            'public' => true,
            'show_ui' => true,
            'capability_type' => 'post',
            'hierarchical' => false,
            'rewrite' => array('slug' => 'applications'),
            'supports' => array('title'),
        );
        
        register_post_type('application' , $args );
    }
}