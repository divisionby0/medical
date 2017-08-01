<?php


class NumPersonsSelect extends Select
{
    protected function createContent(){
        $this->content.='<option value="1">1</options>';
        $this->content.='<option value="2">2</options>';
        $this->content.='<option value="3">3</options>';
        $this->content.='<option value="4">4</options>';
        $this->content.='<option value="5">5</options>';
        $this->content.='<option value="6">6</options>';
        $this->content.='<option value="7">7</options>';
    }
}