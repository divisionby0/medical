<?php

class SelectedCompanyDataView
{
    protected $companyName;
    protected $benefit;
    protected $plan;
    protected $planDeductible;
    protected $planCost;

    public function __construct()
    {
        $this->getData();
        $this->show();
    }

    protected function show(){
        $this->createPrefix();
        $this->createContent();
        $this->createPostfix();
    }

    protected function createPrefix(){
        echo '<h3 class="bg-info centered">You choose</h3>';
        echo '<div class="container">';
        echo '<div class="row">';
    }

    protected function createContent(){
        echo '<div class="col-sm-3 centered">Company<p><b id="companyNameContainer">'.$this->companyName.'</b></p></div>';
        echo '<div class="col-sm-3 centered">Benefit<p><b id="selectedBenefitContainer">'.$this->benefit.'</b></p></div>';
        echo '<div class="col-sm-3 centered">Deductible<p><b id="selectedDeductibleContainer">'.$this->planDeductible.'</b></p></div>';
        echo '<div class="col-sm-3 centered">Total premium<p><b id="selectedPremiumContainer">'.$this->planCost.'</b></p></div>';
    }

    protected function createPostfix(){
        echo '</div>';
        echo '</div>';
    }

    protected function getData(){
        $selectedCompany = Cookie::getSelectedCompanyData();
        $data = StringUtil::unquote($selectedCompany);
        $companyData = json_decode($data);

        // http://stackoverflow.com/questions/18576762/php-stdclass-to-array
        $companyData = json_decode(json_encode($companyData), true);

        $selectedPlanData = Cookie::getSelectedCompanyPlan();
        $data = StringUtil::unquote($selectedPlanData);
        $decodedPlanData = json_decode($data);
        $decodedPlanData = json_decode(json_encode($decodedPlanData), true);

        $this->companyName = $companyData['companyName'];
        $this->benefit = $companyData['benefit'];
        $this->plan = $decodedPlanData;
        $this->planDeductible = $decodedPlanData['deductible'];
        $this->planCost = $decodedPlanData['cost'];

        $this->benefit = StringUtil::formatMoneyInt($this->benefit);
        $this->planDeductible = StringUtil::formatMoneyInt($this->planDeductible);
        $this->planCost = StringUtil::formatMoneyDivisional($this->planCost);
    }
    
    private function formatMoney(){
        //$this->benefit = StringUtils::
    }
}