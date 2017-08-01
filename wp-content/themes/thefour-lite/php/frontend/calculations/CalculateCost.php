<?php


class CalculateCost
{
    private $numPersons;
    private $agesJson;
    private $ages;
    private $totalDays;
    private $benefit;
    private $sccc;
    private $persons;
    
    private function debugUserData(){
        Logger::logMessage('Ages: '.$this->agesJson);
        Logger::logMessage('Benefit: '.$this->benefit);
        Logger::logMessage('SCCC: '.$this->sccc);
        Logger::logMessage('total days: '.$this->totalDays);
    }
    
    private function createPersons(){
        $this->persons = new Map('persons');

        for($i = 0; $i<$this->numPersons; $i++){
            $personAge = $this->ages->get($i);
            $person = new Person($i, $personAge, $this->sccc, $this->benefit);
            $this->persons->add($i, $person);
        }
    }

    private function parseAges(){
        $agesCollection = new Map('ages');

        $agesArray = json_decode($this->agesJson);

        for($i=0; $i<sizeof($agesArray); $i++){
            $agesCollection->add($i, $agesArray[$i]);
        }
        return $agesCollection;
    }

    public function __construct(array $userData, Map $companies)
    {
        $this->numPersons = $userData['numPersons'];
        $this->agesJson = stripslashes($userData['ages']);
        $this->totalDays = $userData['totalDays'];
        $this->benefit = $userData['benefit'];
        $this->sccc = $userData['useSccc']==='Yes' ? 1 : 0;

        $this->debugUserData();
        $this->ages = $this->parseAges();
        $this->createPersons();
    }
}