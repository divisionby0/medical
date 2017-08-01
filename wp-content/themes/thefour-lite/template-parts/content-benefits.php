<?php
/**
 * The template part for displaying company benefits
 *
 * @package WordPress
 * @subpackage medical_ensurance
 */
?>

<article id="post-<?php the_ID(); ?>" >

    <header class="entry-header">
        <p><b>Benefits</b></p>
    </header><!-- .entry-header -->

	<div class="entry-content">
		<?php
        $postId = get_the_ID();

        $companyName = get_the_title($postId);

        $companyBenefitsText = new CompanyBenefitsText();
        $company_benefits = $companyBenefitsText->get($companyName);
        echo $company_benefits;
		?>
	</div><!-- .entry-content -->
</article><!-- #post-## -->
