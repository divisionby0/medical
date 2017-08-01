<div class="brandingContainer">
    <div class="branding">
        <?php
        $brand = esc_html( get_bloginfo() );
        if ( $logo = thefour_setting( 'logo' ) )
        {
            $brand = sprintf( '<img src="%s" alt="%s">', esc_url( $logo ), esc_attr( get_bloginfo() ) );
        }
        $brand = apply_filters( 'thefour_brand', $brand );
        ?>
        <a class="brand" href="<?php echo esc_url( home_url() ); ?>">
            <?php
            echo $brand;
            ?>
        </a>
        <?php
        get_template_part( 'template-parts/header', 'phone' );
        echo "<a href='".site_url()."'><div class='brandSlogan'><b>".get_bloginfo("description")."</b></div></a>";
        ?>
    </div>
</div>

