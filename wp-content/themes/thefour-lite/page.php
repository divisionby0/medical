<?php
/**
 * The template for displaying all pages.
 * @package TheFour Lite
 */

get_header('noImage');
echo '<div id="pageType" style="display: none;">simplePage</div>';
?>

<section id="content" class="content no-sidebar">

	<?php if ( have_posts() ): the_post(); ?>

		<?php get_template_part( 'template-parts/content', 'page' ); ?>

		<?php
		if ( comments_open() || get_comments_number() || ! is_front_page() )
		{
			comments_template('', true );
		}
		?>

	<?php endif; ?>

</section>

<?php get_footer(); ?>
