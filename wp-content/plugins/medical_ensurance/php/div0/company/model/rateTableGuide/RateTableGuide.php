<?php


class RateTableGuide
{
    private $collection;
    
    public function __construct(Map $collection)
    {
        $this->collection = $collection;
    }
    
    public function getJson(){
        $jsonEncoder = $this->collection->getJsonEncoder();
        return $jsonEncoder->encode();
    }
    
    public function getTableName($age, $sccc){
        //Logger::logMessage('RateTableGuide getTableName age='.$age.'   sccc='.$sccc);
        $item = $this->getItemByAgeAndSccc($age, $sccc);
        
        if(isset($item)){
            //Logger::logMessage("rate table guide record by age and sccc found");
            return $item->get('premiumTable');
        }
        else{
            return null;
        }
    }
    
    private function getItemByAgeAndSccc($age, $sccc){
        $keys = $this->collection->getKeys();
        $itemToReturn = null;

        foreach($keys as $key){
            if($key!='type'){
                $item = $this->collection->get($key);
                $itemType = $item->get('type');

                if($itemType && $itemType == 'Map'){
                    $ageFrom = intval($item->get('ageFrom'));
                    $ageTill = intval($item->get('ageTill'));

                    $scccOption = $item->get('scco');
                    $scccOption = $scccOption==1 ? 'Yes':'No';
                    //Logger::logMessage('item sccc = '.$scccOption);

                    if($ageFrom<=$age && $ageTill>=$age && $scccOption===$sccc){
                        $itemToReturn = $item;
                        break;
                    }
                }
            }
        }
        return $itemToReturn;
    }
}