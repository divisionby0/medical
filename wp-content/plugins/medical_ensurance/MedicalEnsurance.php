<?php
/*
Plugin Name: Medical Ensurance
Plugin URI: http://none
Description: plugin description
Version: 1.0
Author: divisionby0
Author URI: http://none/
License: none
*/
//echo '<h1>Medical Ensurance</h1>';
//TODO auto load classes https://habrahabr.ru/post/31270/

include_once('php/Plugin.php');

include_once('php/div0/Constants.php');
include_once('php/div0/company/admin/ages/Ages.php');
include_once('php/div0/utils/Logger.php');
include_once('php/div0/utils/Logging.php');
include_once('php/div0/utils/StringUtil.php');
include_once('php/div0/utils/ArrayUtils.php');
include_once('php/Questionary.php');
include_once('php/div0/company/model/FamilyRateDetector.php');
include_once('php/div0/company/model/FamilyRateAges.php');
include_once('php/div0/company/model/CompanyData.php');
include_once('php/div0/company/model/Company.php');

include_once('php/div0/company/model/rateTableGuide/RateTableGuide.php');

include_once('php/div0/company/model/benefitsAgesCosts/zeroDeductible/BenefitsAgesCostsByZeroDeductible.php');
include_once('php/div0/company/model/FamilyRateBenefitsCostsByZeroDeductibleCalculation.php');
include_once('php/div0/company/model/IndividualsBenefitsCostsByZeroDeductibleCalculation.php');
include_once('php/div0/company/model/deductibleAmountOptions/DeductibleAmountOptionsParser.php');
include_once('php/div0/company/model/deductibleAmountOptions/DeductibleAmountOptions.php');
include_once('php/div0/company/admin/InitCompanyPostType.php');
include_once('php/div0/company/admin/InitCompanyAdmin.php');

include_once('php/div0/company/admin/dialog/BaseDataInputDialog.php');

include_once('php/div0/company/admin/rates/RateInputDialog.php');
include_once('php/div0/company/admin/deductibleAmountOptions/DeductibleAmountOptionDialog.php');

include_once('php/div0/company/admin/metaBoxes/FamilyRateMaxAgeMetabox.php');
include_once('php/div0/company/admin/metaBoxes/CompanyPageUrlMetaBox.php');
include_once('php/div0/company/admin/metaBoxes/DeductibleAmountOptionsMetaBox.php');
include_once('php/div0/company/admin/metaBoxes/RateTableGuideMetaBox.php');
include_once('php/div0/company/admin/metaBoxes/BaseMetaBox.php');
include_once('php/div0/company/admin/metaBoxes/SCCCMetaBox.php');
include_once('php/div0/company/admin/metaBoxes/StandardRatesMetaBox.php');
include_once('php/div0/company/admin/metaBoxes/questions/QuestionaryMetaBox.php');
include_once('php/div0/company/admin/metaBoxes/questions/QuestionsAdminView.php');
include_once('php/div0/company/admin/metaBoxes/CompanyMetaBox.php');
include_once('php/div0/company/admin/SaveCompany.php');

include_once('php/div0/company/admin/views/selects/Select.php');
include_once('php/div0/company/admin/views/selects/AgesSelect.php');
include_once('php/div0/company/admin/views/selects/TeenAgesSelect.php');
include_once('php/div0/company/admin/views/selects/DayNumberSelect.php');
include_once('php/div0/company/admin/views/selects/MonthSelect.php');
include_once('php/div0/company/admin/views/selects/YearSelect.php');
include_once('php/div0/company/admin/views/selects/CountriesSelect.php');
include_once('php/div0/company/admin/views/selects/VisitorTypeSelect.php');
include_once('php/div0/company/admin/views/selects/NumPersonsSelect.php');
include_once('php/div0/company/admin/views/itemRenderer/BaseItemRenderer.php');

// collections
include_once('php/div0/collections/ICollection.php');
include_once('php/div0/collections/AbstractCollection.php');
include_once('php/div0/collections/Map.php');
include_once('php/div0/collections/iterators/AbstractCollectionIterator.php');
include_once('php/div0/collections/iterators/MapIterator.php');
include_once('php/div0/collections/exceptions/CollectionException.php');
include_once('php/div0/collections/json/MapJsonDecoder.php');
include_once('php/div0/collections/json/MapJsonEncoder.php');
include_once('php/div0/collections/json/MapJsonEncoderException.php');

// quotes
include_once ('CreateQuoteTempStorageDBTable.php');
include_once('php/div0/quote/ApplicationEmailView.php');
include_once('php/div0/quote/InitApplicationsPostType.php');
include_once('php/div0/quote/IApplicationPostType.php');
include_once('php/div0/quote/Application.php');
include_once('php/div0/quote/ApplicationAdminView.php');
include_once('php/div0/quote/ApplicationStateDropDown.php');
include_once('php/div0/quote/ApplicationTypeView.php');
include_once('php/div0/quote/SaveApplication.php');

include_once('php/IncludeScripts.php');

Logger::setFile('log.txt');
$post_type = 'company';

function initPlugin() {
	new InitCompanyPostType();
	new InitApplicationsPostType();
	new IncludeScripts();
	new CreateQuoteTempStorageDBTable();
}

function company_admin() {
	new InitCompanyAdmin();

	add_meta_box( 'show_application_meta_box',
		'Application Details',
		'display_application_meta_box',
		'application', 'normal', 'high'
	);
}

function display_application_meta_box( $post ) {
	$postDate = $post->post_date;
	$postId = $post->ID;
	$type = $post->applicationType;
	$state = $post->applicationState;

	$content = $post->post_content;
	$quoteId = get_post_meta($postId, "id");
	$personsData = get_post_meta($postId, "persons");

	$cardType = get_post_meta($postId, "cardType");
	$cardNumber = get_post_meta($postId, "cardNumber");
	$cardExpDate = get_post_meta($postId, "cardExpDate");
	$cardHolder = get_post_meta($postId, "cardHolder");

	$countryOfOrigin = get_post_meta($postId, "countryOfOrigin");
	$countryOfOrigin = htmlspecialchars(urldecode($countryOfOrigin[0]));

	$visitorType = get_post_meta($postId, "visitorType");
	$visitorType = htmlspecialchars(urldecode($visitorType[0]));

	$arrivalDate = get_post_meta($postId, "arrivalDate");
	$arrivalDate = htmlspecialchars(urldecode($arrivalDate[0]));

	$sponsorFirstName = get_post_meta($postId, "sponsorFirstName");
	$sponsorFirstName = htmlspecialchars(urldecode($sponsorFirstName[0]));

	$sponsorLastName = get_post_meta($postId, "sponsorLastName");
	$sponsorLastName = htmlspecialchars(urldecode($sponsorLastName[0]));

	//echo '<p>created at:<b>'.$postDate.'</b></p>';

	$applicationCreationDateTime = $quoteId[0];
	$applicationCreationDateTimeData = explode("__", $applicationCreationDateTime);

	echo '<p>created <b>'.$applicationCreationDateTimeData[0].'  at '.$applicationCreationDateTimeData[1].'</b></p>';

	echo '<div>';
	new ApplicationTypeView($type);
	new ApplicationStateDropDown($state);
	echo '</div>';
	
	if(!isset($sponsorFirstName) || $sponsorFirstName === ""){
		$sponsorFirstName = "Not set";
	}
	if(!isset($sponsorLastName) || $sponsorLastName === ""){
		$sponsorLastName = "Not set";
	}

	$beneficiaryFirstName = get_post_meta($postId, "beneficiaryFirstName");
	$beneficiaryFirstName = htmlspecialchars(urldecode($beneficiaryFirstName[0]));

	$beneficiaryLastName = get_post_meta($postId, "beneficiaryLastName");
	$beneficiaryLastName = htmlspecialchars(urldecode($beneficiaryLastName[0]));

	if(!isset($beneficiaryFirstName) || $beneficiaryFirstName === ""){
		$beneficiaryFirstName = "Not set";
	}
	if(!isset($beneficiaryLastName) || $beneficiaryLastName === ""){
		$beneficiaryLastName = "Not set";
	}

	$address = get_post_meta($postId, "address");
	$address = htmlspecialchars(urldecode($address[0]));
	
	$city = get_post_meta($postId, "city");
	$city = htmlspecialchars(urldecode($city[0]));

	$province = get_post_meta($postId, "province");
	$province = htmlspecialchars(urldecode($province[0]));

	$postalCode = get_post_meta($postId, "postalCode");
	$postalCode = htmlspecialchars(urldecode($postalCode[0]));

	$email = get_post_meta($postId, "email");
	$email = htmlspecialchars(urldecode($email[0]));

	$phone = get_post_meta($postId, "phone");
	$phone = htmlspecialchars(urldecode($phone[0]));

	//$persons = stripslashes($personsData[0]);
	$persons = $personsData[0];
	$quoteId = $quoteId[0];

	echo '<div id="quoteData" style="display: none;">'.$content.'</div>';
	echo '<div id="personsData" style="display: none;">'.$persons.'</div>';

	echo '<h2 class="centered bg-info" style="color: gray;"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>  <b>Visitors</b></h2>';
	echo '<div class="row" style="line-height:1.6em !important;">';

	echo '<div class="col-sm-3">Country of origin:</div>';
	echo '<div class="col-sm-3 text-info">'.$countryOfOrigin.'</div>';

	echo '<div class="col-sm-3">Visitor(s) type:</div>';
	echo '<div class="col-sm-3 text-info">'.$visitorType.'</div>';

	echo '<div class="col-sm-3">Arrival date:</div>';
	echo '<div class="col-sm-3 text-info">'.$arrivalDate.'</div>';

	echo '<div class="col-sm-3">Sponsor:</div>';
	echo '<div class="col-sm-3 text-info">'.$sponsorFirstName.'</div>';

	echo '<div class="col-sm-3">Beneficiary:</div>';
	echo '<div class="col-sm-3 text-info">'.$beneficiaryFirstName.'</div>';

	echo '<div class="col-sm-3">Beneficiary relationship:</div>';
	echo '<div class="col-sm-3 text-info">'.$beneficiaryLastName.'</div>';

	echo '<div class="col-sm-3">Canadian address:</div>';
	echo '<div class="col-sm-3 text-info">'.$address.'</div>';

	echo '<div class="col-sm-3">City:</div>';
	echo '<div class="col-sm-3 text-info">'.$city.'</div>';

	echo '<div class="col-sm-3">Province:</div>';
	echo '<div class="col-sm-3 text-info">'.$province.'</div>';

	echo '<div class="col-sm-3">Postal code:</div>';
	echo '<div class="col-sm-3 text-info">'.$postalCode.'</div>';

	echo '<div class="col-sm-3">Email:</div>';
	echo '<div class="col-sm-3 text-info">'.$email.'</div>';

	echo '<div class="col-sm-3">Phone:</div>';
	echo '<div class="col-sm-3 text-info">'.$phone.'</div>';

	echo '</div>';

	new ApplicationAdminView();

	echo '</div>';
}

// show company
function display_company_meta_box( $company ) {
	$companyMetaBox = new CompanyMetaBox();
	$companyMetaBox->show($company);
}

function admin_save_post( $company_id, $company ) {
	new SaveCompany($company_id, $company);
	new SaveApplication($company);
}

function application_admin_save($post){
	new SaveApplication($post);
}

function my_edit_application_columns($columns){
	$columns = array(
		'cb' => '<input type="checkbox" />',
		'title' => __( 'Application' ),
		'id' => __( 'ID' ),
		'numPersons' => __( 'Num Persons' ),
		'period' => __( 'Period' ),
		'startDate' => __( 'Start date' ),
		'finishDate' => __( 'Finish date' ),
		'quoteDate' => __( 'Application date' ),
		'applicationType'=>__('Type'),
		'applicationState'=>__('State')
	);
	return $columns;
}

function my_manage_application_columns($column, $post_id){
	global $post;

	if($column!="quoteDate"){
		$columnValue = get_post_meta($post_id, $column);
		echo $columnValue[0];
	}
	else{
		echo get_the_date();
	}

	if($column!="applicationState"){
		return;
	}

	$columnValue = get_post_meta($post_id, $column);

	$applicationState = $columnValue[0];
	
	if($applicationState === "0"){
		echo '<b><font color="blue">_IN_PROCESS</font></b>';
	}
	else if($applicationState === "1"){
		echo '<b><font color="#a9a9a9">_COMPLETE</font></b>';
	}
	else if($applicationState === "2"){
		echo '<b><font color="#00008b">_PAYED</font></b>';
	}
	else if($applicationState === "3"){
		echo '<b><font color="#8b008b">_APPRUVED</font></b>';
	}
	else if($applicationState === "4"){
		echo '<b><font color="#2f4f4f">_Police_issued</font></b>';
	}
	else if($applicationState === "5"){
		echo '<b><font color="red">_CANCELLED</font></b>';
	}
	else{
		echo 'NOT SET';
	}
}

function my_edit_application_sortable_columns($sortable_columns){
	$newColumns = array();
	$newColumns['applicationState'] = 'applicationState';
	return $newColumns;
}

function custom_search_query( $query ) {
	$custom_fields = array(
		// put all the meta fields you want to search for here
		"id"
	);
	$searchterm = $query->query_vars['s'];

	// we have to remove the "s" parameter from the query, because it will prevent the posts from being found
	$query->query_vars['s'] = "";

	if ($searchterm != "") {
		$meta_query = array('relation' => 'OR');
		foreach($custom_fields as $cf) {
			array_push($meta_query, array(
				'key' => $cf,
				'value' => $searchterm,
				'compare' => 'LIKE'
			));
		}
		$query->set("meta_query", $meta_query);
	};
}

function remove_menus(){
	/*
	remove_menu_page( 'index.php' );                  //Dashboard
	remove_menu_page( 'edit.php' );                   //Posts
	remove_menu_page( 'upload.php' );                 //Media
	remove_menu_page( 'edit-comments.php' );          //Comments
	remove_menu_page( 'themes.php' );                 //Appearance
	remove_menu_page( 'plugins.php' );                //Plugins
	remove_menu_page( 'users.php' );                  //Users
	remove_menu_page( 'tools.php' );                  //Tools
	*/
}

add_action('init', 'initPlugin');
add_action( 'admin_init', 'company_admin' );
add_action( 'save_post', 'admin_save_post', 10, 2 );

add_filter( "pre_get_posts", "custom_search_query");
add_action( 'manage_application_posts_custom_column', 'my_manage_application_columns', 10, 2 );
add_filter( 'manage_edit-application_columns', 'my_edit_application_columns' ) ;
//add_filter( 'manage_edit-application_sortable_columns', 'my_edit_application_sortable_columns', 10, 2  );

add_action( 'admin_menu', 'remove_menus' );

