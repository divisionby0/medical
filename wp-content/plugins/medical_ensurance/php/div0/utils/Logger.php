<?php

class Logger {

    // лог записывается в файл E:\workspaces\DenverServers\home\log\medicalensurance\medicalensurance-error.log
    private static $fileLogging;

    private static $fileLoggingEnabled = 1;

    public static function setFile($file){
        self::$fileLogging = new Logging();
        self::$fileLogging->lfile($file);
        
        self::$fileLoggingEnabled = 1;
    }

    public static function logMessage($text){
        echo '<p style="font-size: 11px">'.$text.'</p>';

        if(self::$fileLoggingEnabled == 1){
            /*
            echo '<p style="font-size: 11px">logging to file...</p>';
            self::$fileLogging->lwrite($text);
            self::$fileLogging->lclose();
            */
            error_log('INFO:'.$text);
        }
    }
    public static function logError($error){
        echo '<p style="color: red; font-size: 11px">'.$error.'</p>';

        if(self::$fileLoggingEnabled == 1){
            /*
            self::$fileLogging->lwrite($error);
            self::$fileLogging->lclose();
            */
            error_log('ERROR:'.$error);
        }
    }
} 