<?php

include_once ('php/InitQuotesPostType.php');
include_once ('php/IQuotePostType.php');
include_once ('php/Quote.php');
include_once ('php/QuoteAdminView.php');

$pluginUrl = plugins_url().'/quotes/';

wp_register_script( 'cookie', $pluginUrl.'/js/utils/Cookie.js' );
wp_register_script( 'quoteEditAdminView', $pluginUrl.'/js/QuoteEditAdminView.js' );
wp_register_script( 'quoteAdminInit', $pluginUrl.'/js/QuoteAdminInit.js' );

wp_enqueue_script( 'cookie' );
wp_enqueue_script( 'quoteEditAdminView' );
wp_enqueue_script( 'quoteAdminInit' );


function initQuotesPlugin() {
    new InitApplicationsPostType();
}

add_action('init', 'initQuotesPlugin');
add_action( 'admin_init', 'quote_admin' );

function display_quote_meta_box( $post ) {
    $postDate = $post->post_date;
    echo '<p>created at:<b>'.$postDate.'</b></p>';
    echo '<div id="quoteData" style="display: none;">'.$post->post_content.'</div>';
    new ApplicationAdminView();
    
    echo '</div>';
}

function quote_admin() {
    add_meta_box( 'show_quote_meta_box',
        'Quote Details',
        'display_quote_meta_box',
        'application', 'normal', 'high'
    );
}



