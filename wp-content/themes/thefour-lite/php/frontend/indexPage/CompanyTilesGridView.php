<?php


class CompanyTilesGridView
{
    private $data; //Array
    private $totalRows = 4;
    private $imageTitlePrefix = "insureyourstay.ca : ";

    public function __construct($data)
    {
        $this->data = $data;
        $this->createPrefix();
        $this->createContent();
        $this->createPostfix();
    }

    private function createPrefix(){
        echo '<div class="videoBlock indexPageBlock"><div class="container">';
        $this->createRowPrefix();
    }
    private function createPostfix(){
        echo '</div></div>';
    }

    private function createContent(){
        $rowCounter = 1;
        foreach($this->data as $companyData){

            $this->createCompanyContent($companyData);
            $rowCounter++;
            if($rowCounter > $this->totalRows){
                $this->createRowPostfix();
                $this->createRowPrefix();
                $rowCounter = 1;
            }
        }
        $this->createRowPostfix();
    }

    private function createCompanyContent($companyData){
        $companyPageUrl = $companyData['pageUrl'];
        $companyImageUrl = $companyData['imageUrl'];
        $companyPageTitle = $companyData['title'];

        echo '<div class="col-md-3" style="padding-top:10px; padding-bottom: 10px;"><a href="'.$companyPageUrl.'"><img alt="'.$companyPageTitle.'" src="'.$companyImageUrl.'" class="img-responsive img-thumbnail" alt="Cinque Terre"></a></div>';
    }

    private function createRowPrefix(){
        echo '<div class="row justify-content-center">';
    }
    private function createRowPostfix(){
        echo '</div>';
    }
}