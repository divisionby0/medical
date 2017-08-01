<?php


class TeenAgesSelect extends Select
{
    protected function createContent(){
        for($i=0; $i<22; $i++){
            $this->content.='<option value="'.$i.'">'.$i.'</options>';
        }
    }
}