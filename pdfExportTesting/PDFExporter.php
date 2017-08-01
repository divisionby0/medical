<?php

include_once ("../wp-content/plugins/medical_ensurance/php/div0/utils/Logger.php");
use \CloudConvert\Api;
use \CloudConvert\Process;
class PDFExporter
{
    private $api = "JLs3vaHJs6zIBu3teg3V6jL_CRL1KwRXDWeW3FI8z78yGAqe1DUY5rwZjNVxmYIEoM4CM56C8ZHicNNWa0Pu8w";

    public function __construct()
    {
        $this->api = new Api("JLs3vaHJs6zIBu3teg3V6jL_CRL1KwRXDWeW3FI8z78yGAqe1DUY5rwZjNVxmYIEoM4CM56C8ZHicNNWa0Pu8w");

        $process = $this->api->createProcess([
            'inputformat' => 'website',
            'outputformat' => 'pdf',
        ]);

        try{
            $startedProcess = $process->start([
                "wait" => true,
                "input" => "url",
                "save"=>true,
                "output" => [
                    "filename"=> "2017-04-02__19-30-6.pdf",
                    "ext"=>"pdf",
                ],
                "file" => "http://medicalensurance/wp-content/uploads/pdf/2017-04-02__19-30-6.html",
                "filename" => "2017-04-02__19-30-6.pdf",
                "outputformat" => "pdf",
            ]);
            Logger::logMessage("start result");
            print_r($startedProcess);
            
            Logger::logMessage("output.url=".$startedProcess->output->url);

            $process->download("2017-04-02__19-30-6.pdf", $startedProcess->output->url);

        }
        catch(Exception $exception){
            Logger::logMessage("Start EXCEPTION: ".$exception->getMessage().'    code:'.$exception->getCode().'     '.$exception->getTraceAsString() );
        }

        /*
        try{
            $process->download("2017-04-02__19-30-6.pdf");
        }
        catch(Exception $exception){
            Logger::logError("Download EXCEPTION: ".$exception->getMessage().'    code:'.$exception->getCode().'     '.$exception->getTraceAsString());
        }
        */
    }
}