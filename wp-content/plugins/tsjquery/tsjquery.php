<?php
/*
Plugin Name: tsjquery
Plugin URI: http://none
Description: plugin description
Version: 1.0
Author: divisionby0
Author URI: http://none/
License: none
*/

include_once('php/PluginTSjquery.php');
$pluginDir = "";


function initTSjquery() {

    wp_deregister_script( 'jquery' );

    $pluginDir = plugins_url().'/'.PluginTSjquery::$name.'/';

    wp_register_script( 'jquery', $pluginDir.'js/libs/jquery-3.1.0.js');

    wp_register_script( 'test', $pluginDir.'js/TestingJquery.js' );
    wp_register_script( 'init', $pluginDir.'js/Initor.js' );

    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'test' );
    wp_enqueue_script( 'init' );
}

add_action('init', 'initTSjquery');
