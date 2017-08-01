<?php
/**
 * The template part for displaying company limitations
 *
 * @package WordPress
 * @subpackage medical_ensurance
 */
?>

<article id="post-<?php the_ID(); ?>" >

    <header class="entry-header">
        <p><b>Limitations</b></p>
    </header><!-- .entry-header -->

	<div class="entry-content">
		<?php
        $postId = get_the_ID();

        $companyName = get_the_title($postId);

        Logger::logMessage("company name ".$companyName);

        $companyLimitationsText = new CompanyLimitationsText();
        $company_limitations = $companyLimitationsText->get($companyName);
        
        echo $company_limitations;
		?>
	</div><!-- .entry-content -->
</article><!-- #post-## -->
