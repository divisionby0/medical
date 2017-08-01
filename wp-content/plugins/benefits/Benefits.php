<?php
/*
Plugin Name: Benefits
Plugin URI: http://none
Version: 1.0
Author: divisionby0
License: none
*/

function benefitInit(){

    $benefitsPostTypeLabels = array(
        'name' => 'Benefits',
        'singular_name' => 'Benefit', // админ панель Добавить->Функцию
        'add_new' => 'Add benefit',
        'add_new_item' => 'Add new benefit', // заголовок тега <title>
        'edit_item' => 'Edit benefit',
        'new_item' => 'New benefit',
        'all_items' => 'All benefits',
        'view_item' => 'View benefit',
        'search_items' => 'Find benefit',
        'not_found' =>  'Benefits not found.',
        'not_found_in_trash' => 'No benefits at trash.',
        'menu_name' => 'Benefits' // ссылка в меню в админке
    );

    $benefitsPostTypeConfig = array(
        'labels' => $benefitsPostTypeLabels,
        'singular_label' => __('Benefits'),
        'public' => true,
        'show_ui' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'rewrite' => array('slug' => 'benefits'),
        'supports' => array('title','editor')
    );

    register_post_type('benefit' , $benefitsPostTypeConfig );
    
    wp_enqueue_script( 'pluginJS', getPluginDir()."scripts.js");
}

function benefitAdminInit(){
    add_meta_box( 'show_benefitCompanyId_meta_box',
        'Company',
        'display_benefitCompanyId_meta_box',
        'benefit', 'advanced', 'high'
    );
}

function display_benefitCompanyId_meta_box( $post ){
    echo 'SHORTCODE: [company_benefits_text id='.$post->ID.']<br/>';
    $benefitCompany =  get_post_meta( $post->ID, 'benefitCompany', true );

    $query = new WP_Query(array(
        'post_type' => 'company',
        'post_status' => 'publish'
    ));

    echo "<select id='companiesSelect'>";
    while ($query->have_posts()) {
        $post = $query->the_post();
        $title = get_the_title($post);
        if($title === $benefitCompany){
            echo "<option selected='selected'>$title</option>";
        }
        else{
            echo "<option>$title</option>";
        }
    }
    echo "</select>";

    echo '<input style="display:none;" type="text" name="selectedCompany" id = "selectedCompany" value="'.$benefitCompany.'"></input>';

    wp_reset_query();
}

function benefitAdminSave($post_id) {
    $company = $_POST["selectedCompany"];
    update_post_meta($post_id, "benefitCompany", $company);
}

function showCompanyBenefitsHandler($parameters){
    $postId=$parameters["id"];
    $benefitsPost = get_post($postId);
    
    echo apply_filters('the_content', $benefitsPost->post_content);;
}

function getPluginDir(){
    return plugins_url().'/benefits/';
}


add_action( 'init', 'benefitInit' );
add_action( 'admin_init', 'benefitAdminInit' );
add_action( 'save_post', 'benefitAdminSave', 18, 1 );

add_shortcode('company_benefits_text', 'showCompanyBenefitsHandler');

//add_action( 'admin_head', 'check_page_template' );