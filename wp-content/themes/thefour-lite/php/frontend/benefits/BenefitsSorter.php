<?php


class BenefitsSorter
{
    public static function sortByBenefit(Map $collection){
        $sortedCollection = new Map($collection->getId());

        $keys = $collection->getKeys();

        foreach($keys as $key){
            $key = intval($key);
        }

        sort($keys);
        
        foreach($keys as $key){
            $sortedCollection->add($key, $collection->get($key));
        }
        return $sortedCollection;
    }
}