<?php

class InitCompanyAdmin {
	public function __construct(){
		add_meta_box( 'edit_company_meta_box',
			'Company Details',
			'display_company_meta_box',
			Constants::$postType, 'normal', 'high'
		);
	}
} 