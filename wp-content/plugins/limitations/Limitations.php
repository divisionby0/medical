<?php
/*
Plugin Name: Limitations
Plugin URI: http://none
Version: 1.0
Author: divisionby0
License: none
*/

function limitationInit(){

    $limitationsPostTypeLabels = array(
        'name' => 'Limitations',
        'singular_name' => 'Limitation', // админ панель Добавить->Функцию
        'add_new' => 'Add limitation',
        'add_new_item' => 'Add new limitation', // заголовок тега <title>
        'edit_item' => 'Edit limitation',
        'new_item' => 'New limitation',
        'all_items' => 'All limitations',
        'view_item' => 'View limitation',
        'search_items' => 'Find limitation',
        'not_found' =>  'Limitations not found.',
        'not_found_in_trash' => 'No limitations at trash.',
        'menu_name' => 'Limitations' // ссылка в меню в админке
    );

    $limitationPostTypeConfig = array(
        'labels' => $limitationsPostTypeLabels,
        'singular_label' => __('Limitations'),
        'public' => true,
        'show_ui' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'rewrite' => array('slug' => 'limitations'),
        'supports' => array('title','editor')
    );

    register_post_type('limitation' , $limitationPostTypeConfig );
    
    wp_enqueue_script( 'limitationsPluginJS', getLimitationsPluginDir()."scripts.js");
}

function limitationAdminInit(){
    add_meta_box( 'show_limitationCompanyId_meta_box',
        'Company',
        'display_limitationCompanyId_meta_box',
        'limitation', 'advanced', 'high'
    );
}

function display_limitationCompanyId_meta_box( $post ){

    echo 'SHORTCODE: [company_limitations_text id='.$post->ID.']<br/>';

    $limitationCompany =  get_post_meta( $post->ID, 'limitationCompany', true );

    $query = new WP_Query(array(
        'post_type' => 'company',
        'post_status' => 'publish'
    ));

    echo "<select id='companiesSelect'>";
    while ($query->have_posts()) {
        $post = $query->the_post();
        $title = get_the_title($post);
        if($title === $limitationCompany){
            echo "<option selected='selected'>$title</option>";
        }
        else{
            echo "<option>$title</option>";
        }
    }
    echo "</select>";

    echo '<input style="display:none;" type="text" name="selectedCompany" id = "selectedCompany" value="'.$limitationCompany.'"></input>';

    wp_reset_query();
}

function limitationAdminSave($post_id) {

    $company = $_POST["selectedCompany"];
    update_post_meta($post_id, "limitationCompany", $company);
}

function getLimitationsPluginDir(){
    return plugins_url().'/limitations/';
}

function showCompanyLimitationsHandler($parameters){
    $postId=$parameters["id"];
    $limitationsPost = get_post($postId);

    echo apply_filters('the_content', $limitationsPost->post_content);;
}

add_action( 'init', 'limitationInit' );
add_action( 'admin_init', 'limitationAdminInit' );
add_action( 'save_post', 'limitationAdminSave', 19, 1 );

add_shortcode('company_limitations_text', 'showCompanyLimitationsHandler');

/*
// Move all "advanced" metaboxes above the default editor
add_action('edit_form_after_title', function() {
    global $post, $wp_meta_boxes;
    do_meta_boxes(get_current_screen(), 'advanced', $post);
    unset($wp_meta_boxes[get_post_type($post)]['advanced']);
});
*/