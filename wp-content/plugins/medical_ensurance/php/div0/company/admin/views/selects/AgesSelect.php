<?php

class AgesSelect extends Select{
    protected function createContent(){
        for($i=0; $i<100; $i++){
            $this->content.='<option value="'.$i.'">'.$i.'</options>';
        }
    }
} 