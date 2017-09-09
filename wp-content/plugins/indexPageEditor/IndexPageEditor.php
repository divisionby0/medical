<?php
/*
Plugin Name: Index page editor
Plugin URI: http://none
Description: index page editor
Version: 1.0
Author: divisionby0
Author URI: http://none/
License: none
*/

include_once ('IndexPageDataParser.php');
include_once ('GetIndexPageContent.php');
include_once ('CreateDBTable.php');

$block1Content = '';
$block2Content = '';
$block3Content = '';

function updateBlock($id, $content){
    global $wpdb;
    

    $updateResult = $wpdb->update('wp_indexpageblocks',
                    array( 'content' => stripslashes($content)),
                    array( 'id' => $id ),
                    array( '%s'),
                    array( '%d' ));
}

function index_page_editor_setup_menu(){
    add_menu_page( 'Index Page Editor Plugin Page', 'Index Page Editor Plugin', 'manage_options', 'test-plugin', 'test_init' );
}

function test_init(){
    if(isset($_POST['importantLinksBlockEditor'])){
        $importantLinksBlockContent = $_POST['importantLinksBlockEditor'];
        updateBlock(0, $importantLinksBlockContent);
    }
    if(isset($_POST['otherInfoBlockEditor'])){
        $otherInfoBlockContent = $_POST['otherInfoBlockEditor'];
        updateBlock(1, $otherInfoBlockContent);
    }
    if(isset($_POST['additionalInfoBlockEditor'])){
        $additionalInfoBlockContent = $_POST['additionalInfoBlockEditor'];
        updateBlock(2, $additionalInfoBlockContent);
    }

    $indexPageDataGetter = new GetIndexPageContent();
    $blocksData = $indexPageDataGetter->execute();

    try{
        $block1 = $blocksData->get(0);
    }
    catch(Exception $exception){
        $block1 = '';
    }
    try{
        $block2 = $blocksData->get(1);
    }
    catch(Exception $exception){
        $block2 = '';
    }
    try{
        $block3 = $blocksData->get(2);
    }
    catch(Exception $exception){
        $block3 = '';
    }

    echo '<form method="post" action="">';
    echo '<div><h1>Important links</h1>';
    wp_editor( $block1, 'importantLinksBlockEditor', $settings = array() );
    echo '</div>';

    echo '<div><h1>Other info</h1>';
    wp_editor( $block2, 'otherInfoBlockEditor', $settings = array() );
    echo '</div>';

    echo '<div><h1>Additional info</h1>';
    wp_editor( $block3, 'additionalInfoBlockEditor', $settings = array() );
    echo '</div>';

    echo '<input type="submit" value="Save blocks">';
    echo '</form>';
}

add_action('admin_menu', 'index_page_editor_setup_menu');

function my_plugin_create_db(){
    new CreateDBTable();
}

register_activation_hook( __FILE__, 'my_plugin_create_db' );



