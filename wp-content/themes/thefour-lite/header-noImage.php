<?php
/**
 * The template part for displaying header.
 * @package TheFour Lite
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">

    <?php
    $pagename = get_query_var('pagename');

    if($pagename == 'companies-by-user-data' || $pagename == 'medical-costs-in-canada'){
        echo '<meta name="viewport" content="user-scalable=yes">';
    }
    else{
        echo '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">';
    }
    ?>


    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div class="wrapper">
    <div class="header-wrapper">
        <?php get_template_part( 'template-parts/topbar' ); ?>
        <header class="header" style="min-height: 0;" role="banner">
            <div class="navbar">
                <div class="fullwidth headerContentContainer">
                    <div class="headerContent">
                        <?php
                        get_template_part( 'template-parts/header', 'branding' );
                        ?>
                        <nav class="site-navigation right" role="navigation" aria-label="<?php esc_html_e( 'Primary Navigation', 'thefour-lite' ); ?>">
                            <?php
                            wp_nav_menu( array(
                                'container_class' => 'main-menu',
                                'menu_class'      => 'main-menu clearfix',
                                'theme_location'  => 'primary',
                                'items_wrap'      => '<ul>%3$s</ul>',
                            ) );
                            ?>
                        </nav>
                        <a class="screen-reader-text skip-link" href="#content"><?php _e( 'Skip to content', 'thefour-lite' ); ?></a>

                        <div id="toggleMobileMenuButton"><img src="<?php echo get_template_directory_uri();?>/img/list.png"></div>
                    </div>
                </div>
            </div>
        </header>
    </div>
    <main class="main container clearfix" role="main">