<?php

class Person
{
    private $id;
    private $age;
    private $benefit;
    private $sccc;
    private $firstName;
    private $lastName;
    private $gender;
    
    public function __construct($id, $age, $sccc, $benefit)
    {
        $this->id = $id;
        $this->age = $age;
        $this->sccc = $sccc;
        $this->benefit = $benefit;
    }

    /**
     * @return mixed
     */
    public function getBenefit()
    {
        return $this->benefit;
    }

    /**
     * @param mixed $benefit
     */
    public function setBenefit($benefit)
    {
        $this->benefit = $benefit;
    }

    /**
     * @return mixed
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * @param mixed $age
     */
    public function setAge($age)
    {
        $this->age = $age;
    }

    /**
     * @return mixed
     */
    public function getSccc()
    {
        return $this->sccc;
    }

    /**
     * @param mixed $sccc
     */
    public function setSccc($sccc)
    {
        $this->sccc = $sccc;
    }

    /**
     * @return mixed
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * @param mixed $firstName
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    /**
     * @return mixed
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @param mixed $lastName
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    /**
     * @return mixed
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * @param mixed $gender
     */
    public function setGender($gender)
    {
        $this->gender = $gender;
    }
}