<?php
get_header('noImage');
//echo '<p>ID:'.WPUtils::getId().'</p>';
$postId = WPUtils::getId();

$company_benefits = get_post_meta( $postId, Constants::$benefitsText, true );
$company_limitations = get_post_meta( $postId, Constants::$limitationsText, true );

?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">

		<?php
		echo '<h1>'.get_the_title().'</h1>';

		echo pdf_all_attachment_files();

		$content_post = get_post(get_the_ID());

		$content = $content_post->post_content;
		$content = apply_filters('the_content', $content);
		$content = str_replace(']]>', ']]&gt;', $content);
		echo $content;

		get_template_part( 'template-parts/content', 'benefits' );
		get_template_part( 'template-parts/content', 'limitations' );

		?>
	</main><!-- .site-main -->

	<?php //get_sidebar( 'content-bottom' ); ?>

</div><!-- .content-area -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>