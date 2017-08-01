<?php

class BaseMetaBox {
    public function __construct($company, $headerText, $metaName, $addButtonId, $addButtonPostfix, $removeButtonId, $removeButtonPostfix, $metaboxEditor, $errorTextContainerId, $selectId){
        $companyMetaCollection = get_post_meta( $company->ID, $metaName, true );
        $normalizedCompanyMetaCollection = htmlspecialchars($companyMetaCollection, ENT_QUOTES, 'UTF-8');

        $spoilerId = 'spoiler_'.rand(1,150000);

        echo '<div class="metaBox" >';
        echo '<h1 class="centered">'.$headerText.'</h1>';
        echo '<div style="float:left;">All '.$headerText.'</div>';
        $select = new Select($selectId, $selectId);
        echo $select->getHTML();

        echo '<input type="button" style="float:left;" value="Add '.$addButtonPostfix.'" id="'.$addButtonId.'">';
        echo '<div style="color: red" id="'.$errorTextContainerId.'"></div>';
        echo '<input type="button" style="float:left;color:red;" value="Remove '.$removeButtonPostfix.'" id="'.$removeButtonId.'">';

        echo '<div class="spoiler"><input type="checkbox" id="'.$spoilerId.'"><label for="'.$spoilerId.'">'.$headerText.' debug data</label><div class="spoiler_body">';
        echo '<input type="text" size="100%" name="'.$metaboxEditor.'" id = "'.$metaboxEditor.'" value="'.$normalizedCompanyMetaCollection.'" class="fullWidth"></input>';
        echo '</div></div>';

        //echo '<input type="text" size="100%" name="'.$metaboxEditor.'" id = "'.$metaboxEditor.'" value="'.$normalizedCompanyMetaCollection.'" class="invisible"></input>';
        echo '</div>';
    }
} 