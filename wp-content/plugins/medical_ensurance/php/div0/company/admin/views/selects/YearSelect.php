<?php


class YearSelect extends Select{

    // override
    protected function createContent(){
        $this->content = '<option value="2016">2016</option>';
        $this->content  .= '<option value="2017">2017</option>';
        $this->content  .= '<option value="2018">2018</option>';
        $this->content  .= '<option value="2019">2019</option>';
        $this->content  .= '<option value="2020">2020</option>';
        $this->content  .= '<option value="2021">2021</option>';
    }
} 