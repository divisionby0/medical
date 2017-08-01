<?php

class QuestionaryMetaBox
{
    public function __construct($company){
        $company_questionaryData = strval( get_post_meta( $company->ID, Constants::$questionary, true ) );
        $normalizedQuestionaryData = htmlspecialchars($company_questionaryData, ENT_QUOTES, 'UTF-8');

        $spoilerId = 'spoiler_'.rand(1,15000);

        echo '<h1 class="centered">Questionary</h1>';

        echo '<div class="spoiler"><input type="checkbox" id="'.$spoilerId.'"><label for="'.$spoilerId.'">questionary debug data</label><div class="spoiler_body">';
        echo '<input type="text" size="100%" name="'.Constants::$questionaryEditor.'" id="'.Constants::$questionaryEditor.'" value="'.$normalizedQuestionaryData.'" class="fullWidth"></input>';
        echo '</div></div>';
        
        $questionsAdminView = new QuestionsAdminView();
        $questionsAdminView->create();
    }
}