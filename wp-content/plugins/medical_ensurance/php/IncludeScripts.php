<?php

class IncludeScripts {

    private $pluginDir;

    public function __construct(){
        $this->start();
    }

    public function start(){
        $this->pluginDir = $this->getPluginDir();
        wp_enqueue_script('adminCode', $this->pluginDir.'js/adminCode.min.js');

        $this->addCSS();
        $this->registerJsScripts();

        $this->enqueueJSScripts();
        $this->registerQuestionary();
    }

    private function getPluginDir(){
        return plugins_url().'/'.Plugin::$name.'/';
    }

    private function registerQuestionary(){
        $questionary = new Questionary($this->pluginDir);
    }

    private function registerJsScripts(){
        wp_register_script( 'jqueryMobile', $this->pluginDir.'js/libs/jquery.mobile-1.4.5.min.js' );
        wp_register_script( 'bootstrap', $this->pluginDir.'js/libs/bootstrap/js/bootstrap.min.js' );
        wp_register_script( 'momentLib', $this->pluginDir.'js/libs/moment.min.js' );

        //wp_register_script( 'quotePersonPDFView', $this->pluginDir.'js/admin/quote/persons/QuotePersonPDFView.js' );
        wp_register_script( 'quoteAdminInit', $this->pluginDir.'js/admin/quote/QuoteAdminInit.js' );
    }

    private function enqueueAdminScripts(){
        wp_enqueue_script( 'quoteAdminInit' );
    }
    
    private function enqueueJSScripts(){
        wp_enqueue_script("jquery-ui-core", array('jquery'));
        wp_enqueue_script("jquery-ui-dialog", array('jquery','jquery-ui-core'));
        wp_enqueue_script("bootstrap");
        wp_enqueue_script( 'momentLib' );
        
        //wp_enqueue_script( 'quotePersonPDFView' );

        global $typenow;
        if ($this->is_edit_page('edit') || $this->is_edit_page('new')){
            $this->enqueueAdminScripts();
        }
    }

    private function addCSS(){
        wp_enqueue_style( 'jqueryUI', $this->pluginDir.'js/libs/jqueryUI_1_12_0/jquery-ui.min.css', false );

        //wp_enqueue_style( 'jqueryMobile', $this->pluginDir.'css/jquery.mobile-1.4.5.css', false );
        wp_enqueue_style( 'pluginCss', $this->pluginDir.'css/style.css', false );
        wp_enqueue_style( 'bootstrapCss', $this->pluginDir.'js/libs/bootstrap/css/bootstrap.min.css', false );

        if (!$this->is_edit_page('edit')){

        }
    }

    /**
     * is_edit_page
     * function to check if the current page is a post edit page
     *
     * @author Ohad Raz <admin@bainternet.info>
     *
     * @param  string  $new_edit what page to check for accepts new - new post page ,edit - edit post page, null for either
     * @return boolean
     */
    private function is_edit_page($new_edit = null){
        global $pagenow;
        //make sure we are on the backend
        if (!is_admin()) return false;


        if($new_edit == "edit")
            return in_array( $pagenow, array( 'post.php',  ) );
        elseif($new_edit == "new") //check for new post page
            return in_array( $pagenow, array( 'post-new.php' ) );
        else //check for either new or edit
            return in_array( $pagenow, array( 'post.php', 'post-new.php' ) );
    }

} 