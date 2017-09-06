<?php

class IncludeFrontendJsScripts {

    private $templateDir;

    public function __construct(){
        $this->start();
    }

    private function getTemplateDir(){
        $this->templateDir = get_template_directory_uri();
    }

    private function start(){
        $this->getTemplateDir();
        $this->registerJsScripts();
        $this->enqueueJSScripts();
    }

    private function registerJsScripts(){
        wp_register_script( 'datepicker', $this->templateDir.'/js/libs/jquery-ui.min.js' );
        wp_register_script( 'inlineStyler', $this->templateDir.'/js/libs/jquery.inlineStyler.min.js' );
    }

    private function enqueueJSScripts(){
        //wp_enqueue_script("jquery");

        wp_enqueue_script("jquery-ui-core", array('jquery'));
        wp_enqueue_script("datepicker", array('jquery','jquery-ui-core'));

        // You need styling for the datepicker. For simplicity I've linked to Google's hosted jQuery UI CSS.
        wp_register_style( 'jquery-ui', $this->templateDir.'/js/libs/jquery-ui.min.css' );
        wp_enqueue_style( 'jquery-ui' );

        wp_enqueue_script('frontendCode', $this->templateDir.'/js/frontendScripts.min.js');
    }
} 