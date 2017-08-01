<?php

class MonthSelect extends Select{

    // override
    protected function createContent(){
        $this->content = '<option value="1">January</option>';
        $this->content  .= '<option value="2">February</option>';
        $this->content  .= '<option value="3">March</option>';
        $this->content  .= '<option value="4">April</option>';
        $this->content  .= '<option value="5">May</option>';
        $this->content  .= '<option value="6">June</option>';

        $this->content  .= '<option value="7">July</option>';
        $this->content  .= '<option value="8">August</option>';
        $this->content  .= '<option value="9">September</option>';
        $this->content  .= '<option value="10">October</option>';
        $this->content  .= '<option value="11">November</option>';
        $this->content  .= '<option value="12">December</option>';
    }
} 