<?php
/**
 * Created by PhpStorm.
 * User: ilay
 * Date: 15.08.2016
 * Time: 16:51
 */

class InitCompanyPostType {
	public function __construct(){

        $labels = array(
            'name' => 'Companies',
            'singular_name' => 'Company', // админ панель Добавить->Функцию
            'add_new' => 'Add company',
            'add_new_item' => 'Add new company', // заголовок тега <title>
            'edit_item' => 'Edit company',
            'new_item' => 'New company',
            'all_items' => 'All companies',
            'view_item' => 'View company',
            'search_items' => 'Find companies',
            'not_found' =>  'Companies not found.',
            'not_found_in_trash' => 'No companies at trash.',
            'menu_name' => 'Companies' // ссылка в меню в админке
        );

		$args = array(
			'labels' => $labels,
			'singular_label' => __('Company'),
			'public' => true,
			'show_ui' => true,
			'capability_type' => 'post',
			'hierarchical' => false,
			'rewrite' => array('slug' => 'companies'),
			'supports' => array('title', 'custom-fields'),

		);
		register_post_type(Constants::$postType , $args );
	}
} 