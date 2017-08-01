<?php

class ResultTableHeader {

    private $html;

    public function __construct(){
        $this->create();
    }
    private function create(){
        $this->html = '<tr>
        <th class="centered">Companies
        </th>
        <th class="centered">Exclusions and Limitations</th>
        <th class="centered">Benefits</th>
    </tr>';
    }

    public function getHTML(){
        return $this->html;
    }
} 