<?php

class Session
{
    private static $sessionData;

    public static function init()
    {
        self::$sessionData = new Map('sessionData');
        
        add_action('init', 'sessionStart', 1);

        function sessionStart() {
            if(!session_id()) {
                session_start();
            }
        }
    }

    public static function setSessionId($id){
        self::$sessionData->add('sessionId', $id);

        $sessionId = 'session_'.$id;
        $sessionData = self::getSessionDataById($sessionId);

        $sessionExists = isset($sessionData);
        
        if($sessionExists){
            self::$sessionData = self::parseSessionData($sessionData);
        }
        else{
            $sessionJsonData = self::createSessionDataJson();
            self::saveSession($sessionJsonData);
        }
    }

    public static function setData($key, $value){
        self::$sessionData->add($key, $value);
        $sessionJsonData = self::createSessionDataJson();
        self::saveSession($sessionJsonData);
    }
    public static function getData($key){
        $data = null;
        try{
            $data = self::$sessionData->get($key);
        }
        catch(CollectionException $exception){

        }
        return $data;
    }

    private static function saveSession($sessionJson){
        $sessionId = 'session_'.self::$sessionData->get('sessionId');
        $_SESSION[$sessionId] = $sessionJson;
    }
    private static function createSessionDataJson(){
        $sessionDataJsonEncoder = self::$sessionData->getJsonEncoder();
        return $sessionDataJsonEncoder->encode();
    }
    private static function getSessionDataById($id){
        return $_SESSION[$id];
    }

    private static function parseSessionData($sessionData){
        $mapJsonDecoder = new MapJsonDecoder($sessionData);
        return $mapJsonDecoder->decode();
    }
}