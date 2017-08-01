<?php

class QuestionsAdminView
{
    public function create(){
        echo '<div class="container-full">
    <div class="container-full row text-center" style="padding-top: 10px; padding-bottom: 10px;">
        <button type="button" id="createRootQuestionButton" class="btn btn-success">Create root question</button>
        <button type="button" id="createSubQuestionButton" class="btn btn-success">Create sub question</button>
        <button type="button" id="createAnswerButton" class="btn btn-success">Create answer</button>

        <div class="col-sm-2">
            <button id="searchButton" type="button" class="btn btn-success" id="btn-search">Search</button>
            <input type="input" class="form-control" id="input-search" placeholder="Type to search..." value="">
        </div>
    </div>
    <div class="row">
        <div class="container-full" style="height: 550px; overflow-y:scroll;">
            <div id="tree"></div>
        </div>
    </div>
</div>
<div id="dialogContainer"></div>';
    }
}