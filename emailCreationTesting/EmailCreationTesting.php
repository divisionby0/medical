<?php
$data = '{"userDataInfo":"Age(s):13    Benefit:$25 000    Period:2 day(s)  Stable Pre-existing Medical Condition","companies":[{"name":"Allianze","url":"http://insureyourstay.ca/companies/allianze/","plan":[{"benefit":"$ 0","cost":"$ 4.30"},{"benefit":"$ 100","cost":"$ 4.08"},{"benefit":"$ 250","cost":"$ 3.87"},{"benefit":"$ 1000","cost":"$ 3.44"},{"benefit":"$ 3000","cost":"$ 3.01"}],"benefits":"<p></p><p>Allianze benefits text</p>\n<p></p>","limitations":"<p></p><p>Allianze limitations text</p>\n<p></p>"},{"name":"Manulife","url":"http://insureyourstay.ca/companies/manulife/","plan":[{"benefit":"$ 0","cost":"$ 4.56"},{"benefit":"$ 75","cost":"$ 4.34"},{"benefit":"$ 500","cost":"$ 3.69"},{"benefit":"$ 1000","cost":"$ 3.47"},{"benefit":"$ 2500","cost":"$ 3.25"},{"benefit":"$ 5000","cost":"$ 2.82"}],"benefits":"<p></p><p>manulide benefits text</p>\n<p></p>","limitations":"<p></p><p>manulide limitations&nbsp;text</p>\n<p></p>"},{"name":"21st Century","url":"http://insureyourstay.ca/companies/21st-century/","plan":[{"benefit":"$ 0","cost":"$ 4.83"},{"benefit":"$ 50","cost":"$ 4.60"},{"benefit":"$ 250","cost":"$ 4.14"},{"benefit":"$ 500","cost":"$ 4.60"},{"benefit":"$ 1000","cost":"$ 3.68"},{"benefit":"$ 2500","cost":"$ 3.22"},{"benefit":"$ 5000","cost":"$ 2.99"},{"benefit":"$ 10000","cost":"$ 2.76"}],"benefits":"<p></p><h5><strong>The <span style=\"color: #ff0000;\">deductible</span> amount is shown<br>\non your policy confirmation and <span style=\"color: #ff0000;\">applies per policy</span> per<br>\nInsured.</strong></h5>\n<h5><strong>Subject to the policy terms, we will reimburse you for eligible</strong><br>\n<strong>expenses incurred by you, that are in excess of any other sums</strong><br>\n<strong>which yo...</strong></h5><p></p>","limitations":"<p></p><h5><span style=\"color: #ff0000;\"><strong>You are not eligible for coverage under this policy if:</strong></span></h5>\n<h6><strong>• a physician has advised you not to travel;</strong><br>\n<strong>• you have been diagnosed with a terminal illness with less</strong><br>\n<strong>than two (2) years to live;</strong><br>\n<strong>• you have a kidney condition requiring dialysis; and/or</strong></h6><p></p>"}]}';


$messageData = json_decode($data);

$emailFormBuilder = new EmailTableBuilder();
$result = $emailFormBuilder->create($messageData);

echo $result;

/*
class EmailTableBuilder
{
    private $tableStyle = 'border: 1px solid #ddd; border-collapse: collapse;border-spacing: 0;';
    private $fontColor = 'color:#333;';

    private function createNameElement($name, $url){
        return '<div style="font-size: 2em; color: #bd070f; text-align: center; padding-top: 5px; padding-bottom: 5px;"><a href="'.$url.'" style="text-decoration:none; color: #4aa0f0;">'.$name.'</a></div>';
    }
    private function createPlanElement($plan){
        $planTable = '<table style="'.$this->tableStyle.$this->fontColor.' width: 90%; margin: 0 auto;"><tbody>';
        $planTable .= '<tr><td style="'.$this->tableStyle.' text-align: center;"><b>Deductible</b></td><td style="'.$this->tableStyle.' text-align: center;"><b>Plan</b></td></tr>';

        foreach($plan as $planBenefit){
            $benefitValue = $planBenefit->benefit;
            $benefitCost = $planBenefit->cost;
            $planTable .= '<tr style="border: 1px solid #ddd;"><td style="'.$this->tableStyle.' text-align: center;">'.$benefitValue.'</td><td style="'.$this->tableStyle.' text-align: center;">'.$benefitCost.'</td></tr>';
        }
        $planTable .= '</tbody></table>';

        return $planTable;
    }

    private function createReadMoreElement($url){
        $element = '<div style="width: 100%; text-align: center;"><a style="color: #4aa0f0;" href="'.$url.'">read more</a></div>';
        return $element;
    }

    private function createTextElement($text){
        $element = '<td style="'.$this->tableStyle.$this->fontColor.' vertical-align: top; padding-left:4px; width:40%;">'.$text.'</td>';
        return $element;
    }

    public function create($data){
        $userDataInfo = $data->userDataInfo;
        $companies = $data->companies;

        $result = '<div style="font-size: large; color: #4aa0f0; text-align: center; padding-top: 20px; padding-bottom: 20px">'.$userDataInfo.'</div>';
        $result .= '<table style="'.$this->tableStyle.' width: 100%;"><tbody><tr style="border: 1px solid #ddd;"><td style="text-align: center;"><b>PLAN</b></td><td style="text-align: center;"><b>Exclusions and Limitations</b></td><td style="text-align: center;"><b>Benefits</b></td></tr>';

        foreach($companies as $company){
            $companyName = $company->name;
            $companyUrl = $company->url;
            $companyPlan = $company->plan;
            $companyLimitations = $company->limitations;
            $companyBenefits = $company->benefits;

            $companyTableRow = '<tr style="padding:10px;">';
            $companyTableRow .= '<td style="'.$this->tableStyle.' width: 20%; text-align: center">'.$this->createNameElement($companyName, $companyUrl);
            $companyTableRow .= $this->createPlanElement($companyPlan);

            $companyTableRow .= $this->createReadMoreElement($companyUrl);
            $companyTableRow .= '</td>';

            $companyTableRow .= $this->createTextElement($companyLimitations);
            $companyTableRow .= $this->createTextElement($companyBenefits);

            $companyTableRow .= '</tr>';

            $result .= $companyTableRow;
        }

        $result .= '</tbody></table>';
        return $result;
    }
}
*/