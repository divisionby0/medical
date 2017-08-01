<?php
/*
Plugin Name: Custom Post Type Attachment ( PDF )
Plugin URI: https://wordpress.org/plugins/custom-post-type-pdf-attachment/
Description: This plugin will allow you to upload pdf files to your post or pages or any other custom post types. You can either use shortcodes or functions to display attachments. You can upload at most 10 PDF files as attachments. :)
Version: 3.2.4
Text Domain: custom-post-type-pdf-attachment
Domain Path: /languages
Author: aviplugins.com
Author URI: http://www.aviplugins.com/
*/

/**
	  |||||   
	<(`0_0`)> 	
	()(afo)()
	  ()-()
**/

include_once dirname( __FILE__ ) . '/form_class.php';
include_once dirname( __FILE__ ) . '/pdf_attachment.php';
include_once dirname( __FILE__ ) . '/shortcode_function.php';
include_once dirname( __FILE__ ) . '/settings.php';

new afo_pdf_settings;