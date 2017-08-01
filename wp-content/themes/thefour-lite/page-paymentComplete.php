<?php
/*
Template Name: page payment complete
*/
get_header('noImage');
echo '<div id="pageType" style="display: none;">paymentCompletePage</div>';

echo '<h1>Payment complete</h1>';
echo '<div style="float: right;">
        <button type="button" class="btn btn-success" id="finishButton" style="float: right; margin-left: 10px;">Finish</button>
        <button type="button" class="btn btn-warning" id="prevButton" style="float: right;">Prev</button>
</div>';
get_footer();