<?php


class IndexPageDataParser
{
    public function parse(array $data){
        $resultMap = new Map('data');
        foreach($data as $dataItem){
            $resultMap->add($dataItem->id, $dataItem->content);
        }
        return $resultMap;
    }
}