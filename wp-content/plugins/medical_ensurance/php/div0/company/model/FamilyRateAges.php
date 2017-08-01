<?php

class FamilyRateAges
{
    private $maxOldestPersonNum = 1;

    public function selectOldestAges(array $sourceAges){
        rsort($sourceAges);
        return array_slice($sourceAges, 0, $this->maxOldestPersonNum);
    }
}