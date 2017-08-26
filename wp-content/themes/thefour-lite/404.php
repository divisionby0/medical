<?php
/**
 * The template part for displaying 404 page.
 * Content of this page (heading and search form) are moved to the header.
 * @package TheFour Lite
 */
?>

<?php
    get_header();
    echo '<div class="fullWidth centered">';
?>
<h1>Page not found</h1>
<a href="<?php echo site_url();?>">Go to main</a>
<?php echo '</div>';
?>
<?php get_footer(); ?>
