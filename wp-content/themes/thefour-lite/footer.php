<?php
/**
 * The template part for displaying footer section.
 * @package TheFour Lite
 */
?>

</main>



</div><!-- .wrapper -->

<?php wp_footer(); ?>




<nav class="mobile-navigation" role="navigation">
    <?php
    wp_nav_menu( array(
        'container_class' => 'mobile-menu',
        'menu_class'      => 'mobile-menu clearfix',
        'theme_location'  => 'primary',
        'items_wrap'      => '<ul>%3$s</ul>',
    ) );
    ?>
</nav>

<footer class="footer"  role="contentinfo">

    <div id="phoneNumberContainer" class="phoneNumberFooter footerLinks">
        <a href="http://insureyourstay.ca/terms-of-service/" target="_blank">Terms of Service |</a>
        <a href="http://insureyourstay.ca/privacy-policy/" target="_blank">Privacy Policy |</a>
        <a href="http://insureyourstay.ca/disclaimer/" target="_blank">Disclaimer |</a>
        <a href="http://insureyourstay.ca/copyright/" target="_blank">Copyright</a>
    </div>

    <div id="phoneNumberContainer" class="phoneNumberFooter right">
        <?php
        $phone_number = get_option( 'phone_number', '' );
        echo $phone_number;
        ?>
    </div>
</footer><!-- .footer -->

</body>
</html>

