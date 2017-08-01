<?php

class AddressRequestView
{
    public function getHtml(){
        return $this->getAddressLineElement().$this->getCityElement().$this->getProvinceElement();
    }

    private function getAddressLineElement(){
        return '<div class="col">
                <div class="col">Canadian address</div>
                <div class="col">
                    <input type="text" id="canadianAddress" value="" placeholder="Build. num, Street, Item num.">
                </div>
            </div>';
    }

    private function getCityElement(){
        return '<div class="col">
                <div class="col">City</div>
                <div class="col">
                    <input type="text" id="canadianAddressCity" value="" placeholder="City">
                </div>
            </div>';
    }
    private function getProvinceElement(){
        return '<div class="col">
                <div class="col">Province</div>
                <div class="col">
                    <select id="provinceSelect">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
</select>
                </div>
            </div>';
    }

}