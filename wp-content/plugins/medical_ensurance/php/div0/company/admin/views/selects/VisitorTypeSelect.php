<?php


class VisitorTypeSelect extends Select
{
    public static $types = array('Visitor', 'New Immigrant', 'Super Visa', 'Work or Student Visa', 'Returning Canadian', 'Other');

    // override
    protected function createContent(){

        $this->content = '';
        for($i=0; $i<sizeof(self::$types); $i++){
            $this->content .= '<option value="'.self::$types[$i].'">'.self::$types[$i].'</option>';
        }
    }
}