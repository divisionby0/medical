<?php
/**
 * Theme functions file which contains global functions of the theme
 * @package TheFour Lite
 */
// Load theme files
require get_template_directory() . '/inc/media.php';
require get_template_directory() . '/inc/header.php';
require get_template_directory() . '/inc/customizer/customizer.php';
new TheFour_Customizer;
// Load file for the frontend only
if ( ! is_admin() )
{
	require get_template_directory() . '/inc/template-tags.php';
}
add_action( 'after_setup_theme', 'thefour_setup' );
/**
 * Setup theme
 */
function thefour_setup()
{
	// Theme features
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-formats', array( 'aside', 'application', 'video', 'audio' ) );
	add_theme_support( 'custom-header', array(
		'width'         => 1920,
		'height'        => 500,
		'uploads'       => true,
		'default-image' => get_template_directory_uri() . '/img/header.jpg',
		'header-text'   => false,
	) );
	add_theme_support( 'post-thumbnails' );
	add_image_size( 'thefour-list-thumbnail', 760, 0 );
	add_image_size( 'thefour-grid-thumbnail', 348, 0 );
	// Custom theme features
	add_theme_support( 'thefour-social-buttons' );
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'thefour-lite' ),
		'social'  => __( 'Social Links Menu', 'thefour-lite' ),
	) );
	// Make the theme translation ready
	load_theme_textdomain( 'thefour-lite', get_template_directory() . '/lang' );
}
add_action( 'widgets_init', 'thefour_register_sidebars' );
/**
 * Register theme sidebars.
 */
function thefour_register_sidebars()
{
	register_sidebar( array(
		'name'          => __( 'Primary Sidebar', 'thefour-lite' ),
		'id'            => 'primary',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
	register_sidebars( 4, array(
		'name'          => __( 'Footer %d', 'thefour-lite' ),
		'id'            => 'footer',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}
/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function content_width() {
	$GLOBALS['content_width'] = apply_filters( 'content_width', 760 );
}
add_action( 'after_setup_theme', 'content_width', 0 );
/**
 * Get theme default settings.
 * @param string $name
 * @return mixed
 */
function thefour_default_setting( $name )
{
	$defaults = array(
		'front_page_blog_title'    => __( 'Latest Updates', 'thefour-lite' ),
		'front_page_blog_tag'      => _x( 'front-page', 'Front end default tag slug for featured blog posts', 'thefour-lite' ),
		'front_page_blog_hide_tag' => true,
	);
	return isset( $defaults[$name] ) ? $defaults[$name] : false;
}
/**
 * Get theme settings.
 * @param string $name
 * @return mixed
 */
function thefour_setting( $name )
{
	return get_theme_mod( $name, thefour_default_setting( $name ) );
}
if(!is_admin()){
	includeFrontend();
}
function includeFrontend(){
	include_once('php/frontend/form/FormRowElement.php');
	include_once('php/frontend/form/visitorDataInputForm/AgesFormRowElement.php');
	include_once('php/frontend/form/visitorDataInputForm/InvisibleAgesFormRowElement.php');
	include_once('php/frontend/form/visitorDataInputForm/BenefitFormRowElement.php');
	include_once('php/frontend/form/visitorDataInputForm/StartDateFormRowElement.php');
	include_once('php/frontend/form/visitorDataInputForm/FinishDateFormRowElement.php');
	include_once('php/frontend/form/visitorDataInputForm/NumPersonsFormRowElement.php');
	include_once('php/frontend/form/visitorDataInputForm/CountriesFormRowElement.php');
	include_once('php/frontend/form/visitorDataInputForm/VisitorTypeFormRowElement.php');
	include_once('php/frontend/form/visitorDataInputForm/SCCCRadioButtons.php');
	include_once('php/frontend/form/FormSubmitButton.php');
	include_once('php/frontend/resultTable/ParseSubmittedFormData.php');
	include_once('php/frontend/form/visitorDataInputForm/VisitorDataInputForm.php');
	include_once('php/frontend/form/visitorDataInputForm/UseScccText.php');
	include_once('php/frontend/pages/applicationCreationPage/CountriesSelectOptions.php');
	include_once('php/frontend/pages/applicationCreationPage/AddressRequestView.php');
	include_once('php/frontend/pages/applicationCreationPage/PersonsAdditionalDataRequestView.php');
	include_once('php/frontend/pages/applicationCreationPage/PersonalInfoRequestView.php');
	include_once('php/frontend/pages/applicationCreationPage/CompanyCostsView.php');
	include_once('php/frontend/pages/applicationCreationPage/SelectedCompanyDataView.php');
	include_once('php/frontend/pages/finishQuotePage/UserSelectionFinishPageView.php');
	include_once('php/utils/WPUtils.php');
	include_once('php/utils/DateTimeUtils.php');
	include_once('php/frontend/GetCompanies.php');
	include_once('php/frontend/GetCompaniesCalculationsDataOnly.php');
	include_once('php/frontend/calculations/Person.php');
	include_once('php/frontend/calculations/CalculateCost.php');
	include_once('php/frontend/benefits/SelectedBenefit.php');
	include_once('php/frontend/benefits/CompaniesBenefits.php');
	include_once('php/frontend/benefits/BenefitsSorter.php');
	include_once('php/frontend/benefits/GetCompaniesBenefits.php');
	include_once('php/frontend/benefits/BenefitsCollectionEncoder.php');
	include_once('php/frontend/benefits/CreateBenefitsHtmlContainer.php');
	include_once('php/frontend/form/benefitsSelectionForm/BenefitSelectionForm.php');
	include_once('php/frontend/BenefitsSelectionPageTextContent.php');
	include_once('php/frontend/DeductibleSelectionPageTextContent.php');
	include_once('php/frontend/CompanyContentText.php');
	include_once('php/frontend/CompanyBenefitsText.php');
	include_once('php/frontend/CompanyLimitationsText.php');
	include_once('php/frontend/resultTable/TableTextDataItemRenderer.php');
	include_once('php/frontend/resultTable/LimitedCharsTableTextItemRenderer.php');
	include_once('php/frontend/resultTable/InvisibleTableTextDataItemRenderer.php');
	include_once('php/frontend/resultTable/ResultTableHeader.php');
	include_once('php/frontend/resultTable/CompanyResultTableRow.php');
	include_once('php/frontend/resultTable/ResultTable.php');
	include_once('php/frontend/MedicalConditionRemark.php');

	include_once('php/Cookie.php');
	include_once('php/frontend/indexPage/IndexPageSlider.php');
	include_once('php/frontend/indexPage/IndexPage.php');

	include_once('IncludeFrontendJsScripts.php');
	new IncludeFrontendJsScripts();
}
function register_general_result_table_text_data_max_chars(){
	register_setting('general', 'result_table_text_data_max_chars', 'esc_attr');
	add_settings_field('result_table_text_data_max_chars', '<label for="result_table_text_data_max_chars">'.__('Result table text data max chars' , 'result_table_text_data_max_chars' ).'</label>' , 'print_result_table_text_data_max_chars', 'general');
}
function print_result_table_text_data_max_chars(){
	$value = get_option( 'result_table_text_data_max_chars', '' );
	echo '<input style="type="text" id="result_table_text_data_max_chars" name="result_table_text_data_max_chars" value="' . $value . '" />';
}
function register_general_index_page_gallery_id(){
	register_setting('general', 'index_page_gallery_id', 'esc_attr');
	add_settings_field('index_page_gallery_id', '<label for="index_page_gallery_id">'.__('Index page gallery id' , 'index_page_gallery_id' ).'</label>' , 'print_index_page_gallery_id', 'general');
}
function print_index_page_gallery_id(){
	$value = get_option( 'index_page_gallery_id', '' );
	echo '<input style="type="text" id="index_page_gallery_id" name="index_page_gallery_id" value="' . $value . '" />';
}
function register_general_quote_email_admin_text(){
	register_setting('general', 'quote_admin_email_text', 'esc_attr');
	add_settings_field('quote_email_admin_field', '<label for="quote_admin_email_text">'.__('Quote admin email text' , 'quote_admin_email_text' ).'</label>' , 'print_quote_admin_email_text', 'general');
}
function print_quote_admin_email_text(){
	$value = get_option( 'quote_admin_email_text', '' );
	echo '<input style="width:100%;" type="text" id="quote_admin_email_text" name="quote_admin_email_text" value="' . $value . '" />';
}
function register_general_phone_number()
{
	register_setting('general', 'phone_number', 'esc_attr');
	add_settings_field('phone_number_admin_field', '<label for="phone_number">'.__('Phone' , 'phone_number' ).'</label>' , 'print_phone_number_input', 'general');
}
function print_phone_number_input()
{
	$value = get_option( 'phone_number', '' );
	echo '<input type="text" id="phone_number" name="phone_number" value="' . $value . '" />';
}
add_filter('admin_init', 'register_general_phone_number');
//add_filter('admin_init', 'register_general_quote_email_admin_text');
add_filter('admin_init', 'register_general_index_page_gallery_id');
add_filter('admin_init', 'register_general_result_table_text_data_max_chars');
//echo '<h1>ADMIN EMAIL: '.get_bloginfo('admin_email').'</h1>';
add_filter('wp_headers', 'wpse167128_nocache');
function wpse167128_nocache($headers)
{
	unset($headers['Cache-Control']);
	return $headers;
}
function set_email_content_type(){
	return "text/html";
}
add_filter( 'wp_mail_content_type','set_email_content_type' );
// questions
function loadQuestions(){
	$companyId = $_POST['companyId'];
	echo get_post_meta($companyId, Constants::$questionary)[0];
	die();
}
function saveApplication(){
	$quoteId = $_POST['quoteId'];
	$data = $_POST['quoteData'];
	$companyName = $_POST['companyName'];
	$persons = $_POST['persons'];

	$period = $_POST['period'];
	$numPersons = $_POST['numPersons'];
	$startDate = $_POST['startDate'];
	$finishDate = $_POST['finishDate'];
	$cardType = $_POST['cardType'];
	$cardNumber = $_POST['cardNumber'];
	$cardExpDate = $_POST['cardExpDate'];
	$cardHolder = $_POST['cardHolderName'];

	$countryOfOrigin = $_POST['countryOfOrigin'];
	$visitorType = $_POST['visitorType'];
	$arrivalDate = $_POST['arrivalDate'];
	$sponsorFirstName = $_POST['sponsorFirstName'];
	$sponsorLastName = $_POST['sponsorLastName'];
	$beneficiaryFirstName = $_POST['beneficiaryFirstName'];
	$beneficiaryLastName = $_POST['beneficiaryLastName'];
	$address = $_POST['address'];
	$city = $_POST['city'];
	$province = $_POST['province'];
	$postalCode = $_POST['postalCode'];

	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$type = $_POST['applicationType'];

	$quote = new Application($quoteId,
		$companyName,
		$data,
		$persons,
		$period,
		$numPersons,
		$startDate,
		$finishDate,
		$cardType,
		$cardNumber,
		$cardExpDate,
		$cardHolder,
		$countryOfOrigin,
		$visitorType,
		$arrivalDate,
		$sponsorFirstName,
		$sponsorLastName,
		$address,
		$email,
		$city,
		$province,
		$postalCode,
		$phone,
		$beneficiaryFirstName,
		$beneficiaryLastName,
		$type,
		"0");

	wp_insert_quote($quote);
	echo 'saved arrival persons: '.$persons;
	die();
}
function saveTempQuotePersons(){
	$quoteId = $_POST['quoteId'];
	$personsData = $_POST['data'];
	global $wpdb;
	$wpdb->insert( 'wp_quote_temp_storage', array(
		'quoteId' => $quoteId,
		'data' => $personsData
	),
		array(
			'%s',
			'%s'
		));
	echo 'saved quoteId='.$quoteId."   personsData=".$personsData;
	die();
}
function loadTempQuotePersons(){
	$quoteId = $_POST['quoteId'];
	global $wpdb;
	$personsData = $wpdb->get_var("SELECT data FROM wp_quote_temp_storage WHERE quoteId=".$quoteId);
	echo $personsData;
	die();
}
function deleteTempQuotePersons(){
	$quoteId = $_POST['quoteId'];
	global $wpdb;
	$wpdb->delete( 'wp_quote_temp_storage', array('quoteId' => $quoteId));
	echo 'persons temp row deleted. query='.$wpdb->last_query;
	die();
}
// email
function sendResultFormEmail(){
	$adminEmail = get_option('admin_email');
	$headers  = "MIME-Version: 1.0" . "\n";
	$headers .= "Content-type: text/html; charset=utf-8" . "\n";
	$headers .= "X-Priority: 1 (Higuest)\n";
	$headers .= "X-MSMail-Priority: High\n";
	$headers .= "Importance: High\n";
	$headers .= "From: insureyourstay.ca <".$adminEmail.">" . "\n";
	$headers .= "Return-Path: insureyourstay.ca <".$adminEmail.">" . "\n";
	$headers .= "Reply-To: insureyourstay.ca <".$adminEmail.">";
	$receiver = $_POST['receiver'];
	$messageJson = $_POST['data'];
	$messageObject = json_decode(stripslashes($messageJson));
	$emailTableBuilder = new EmailTableBuilder();
	$tableHtml = $emailTableBuilder->create($messageObject);
	$emailBuilder = new EmailBuilder();
	$emailHTML = $emailBuilder->create($tableHtml);

	$result = wp_mail($receiver, "Your application request", $emailHTML);
	if($result) {
		echo json_encode(array("result"=>"complete"));
	}
	else{
		//echo '!!! error sending message  receiver='.$receiver.'    emailHtml:'.$emailHTML;
		echo json_encode(array("result"=>"error", "emailHtml"=>$emailHTML));
	}
	die();
}
function sendApplicationResultEmail(){
	$receiver = $_POST['receiver'];
	$emailBody = $_POST['body'];
	$appId = $_POST['appId'];
	$headers  = "MIME-Version: 1.0" . "\n";
	$headers .= "Content-type: text/html; charset=utf-8" . "\n";
	$headers .= "X-Priority: 1 (Higuest)\n";
	$headers .= "X-MSMail-Priority: High\n";
	$headers .= "Importance: High\n";
	$attachments = array( WP_CONTENT_DIR . '/uploads/applications/Application_'.$appId.'.html' );
	$result = wp_mail($receiver, "Your application", $emailBody, $headers, $attachments);
	if($result) {
		echo "message sent to ".$receiver;
	}
	else{
		echo '!!! error sending message  receiver='.$receiver;
	}
	die();
}
function sendApplicationAdminEmail(){
	$receiver = get_bloginfo('admin_email');
	$appId = $_POST['appId'];
	$headers  = "MIME-Version: 1.0" . "\n";
	$headers .= "Content-type: text/html; charset=utf-8" . "\n";
	$headers .= "X-Priority: 1 (Higuest)\n";
	$headers .= "X-MSMail-Priority: High\n";
	$headers .= "Importance: High\n";
	$result = wp_mail($receiver, "Your have new application", "You have new application from customer. Application id is: ".$appId, $headers);
	if($result) {
		echo json_encode(array("result"=>"complete"));
	}
	else{
		echo json_encode(array("result"=>"errorSendingAdminApplication", "adminEmail"=>$receiver));
	}
	die();
}
function saveApplicationHTML(){
	$uploadsDirData = wp_upload_dir();
	$uploadsDirURI = $uploadsDirData['basedir'];
	$uploadsDirURL = $uploadsDirData['baseurl'];
	$appId = $_POST['appId'];
	$appContent = $_POST['appContent'];
	$appContent = preg_replace('/\\\\/', '', $appContent);
	//$appContent = htmlentities ($appContent, ENT_NOQUOTES, 'utf-8');
	$appContent = preg_replace("/•/", "-", $appContent);
	$appContent = '<!DOCTYPE><html><body>'.$appContent.'</body></html>';
	$htmlFileUri = $uploadsDirURI. '/applications/Application_' . $appId.'.html';
	$htmlFileUrl = $uploadsDirURL. '/applications/Application_' . $appId.'.html';
	try{
		$htmlFile = fopen($htmlFileUri, "w");
		fwrite($htmlFile, $appContent);
		$returnValue = array("result"=>"success","url"=>$htmlFileUrl,"appId"=>$appId);
	}
	catch(Exception $exception){
		$returnValue = array("result"=>"error","errorText"=>$exception->getMessage());
	}
	echo json_encode($returnValue);
	die();
}

function redirectToPayPalCheckOut(){
	echo simplePayPalCartPluginRedirectToCheckOut();
	wp_die(); // this is required to terminate immediately and return a proper response
}

function wp_insert_quote(IApplicationPostType $post, $wp_error = false)
{
	$post_id = wp_insert_post($post->get_post_data(), $wp_error);
	if (0 === $post_id || $post_id instanceof WP_Error) {
		return $post_id;
	}
	foreach ($post->get_post_meta() as $key => $value) {
		update_post_meta($post_id, $key, $value);
	}
	return $post_id;
}
add_action( 'wp_ajax_sendApplicationAdminEmail', 'sendApplicationAdminEmail');
add_action( 'wp_ajax_nopriv_sendApplicationAdminEmail', 'sendApplicationAdminEmail' );

// fucking paypal shopping cart plugin
add_action( 'wp_ajax_redirectToPayPalCheckOut', 'redirectToPayPalCheckOut');
add_action( 'wp_ajax_nopriv_redirectToPayPalCheckOut', 'redirectToPayPalCheckOut' );


add_action( 'wp_ajax_sendResultFormEmail', 'sendResultFormEmail');
add_action( 'wp_ajax_nopriv_sendResultFormEmail', 'sendResultFormEmail' );
add_action( 'wp_ajax_saveApplicationHTML', 'saveApplicationHTML');
add_action( 'wp_ajax_nopriv_saveApplicationHTML', 'saveApplicationHTML');
add_action( 'wp_ajax_sendApplicationResultEmail', 'sendApplicationResultEmail');
add_action( 'wp_ajax_nopriv_sendApplicationResultEmail', 'sendApplicationResultEmail' );
add_action( 'wp_ajax_loadQuestions', 'loadQuestions');
add_action( 'wp_ajax_nopriv_loadQuestions', 'loadQuestions' );
add_action( 'wp_ajax_saveApplication', 'saveApplication');
add_action( 'wp_ajax_nopriv_saveApplication', 'saveApplication' );
add_action( 'wp_ajax_saveTempQuotePersons', 'saveTempQuotePersons');
add_action( 'wp_ajax_nopriv_saveTempQuotePersons', 'saveTempQuotePersons' );
add_action( 'wp_ajax_loadTempQuotePersons', 'loadTempQuotePersons');
add_action( 'wp_ajax_nopriv_loadTempQuotePersons', 'loadTempQuotePersons' );
add_action( 'wp_ajax_deleteTempQuotePersons', 'deleteTempQuotePersons');
add_action( 'wp_ajax_nopriv_deleteTempQuotePersons', 'deleteTempQuotePersons' );
// adding ajaxurl for frontend
add_action('wp_head', 'createJSConstants');
function createJSConstants() {
	echo '<script type="text/javascript">
           var ajaxurl = "' . admin_url('admin-ajax.php') . '";
           var resultTableTextDataMaxChars = "' . get_option( 'result_table_text_data_max_chars', '1000' ) . '";
         </script>';
}
class EmailBuilder{
	private $head = '<div style="font-size: 1.3em; width: 100%; text-align: center;">Thank you for choosing <b>Insure<font color="#4aa0f0">Your</font>Stay.ca</b> to supply you with top quality quotes. If you have any questions or you decided to buy insurance, just email or call us.</p><br/><div>Best Regards,</div><div>Insure<font color="#4aa0f0">Your</font>Stay Team,</div><div>EmailSender: info@insureyourstay.ca</div><div>Phone: 1-888-997-1687</div>';
	public function create($tableHTML){
		return $this->head.$tableHTML;
	}
}
class EmailTableBuilder
{
	private $tableStyle = 'border: 1px solid #ddd; border-collapse: collapse;border-spacing: 0;';
	private $fontColor = 'color:#333;';
	private function createNameElement($name, $url){
		return '<div style="font-size: 2em; color: #bd070f; text-align: center; padding-top: 5px; padding-bottom: 5px;"><a href="'.$url.'" style="text-decoration:none; color: #bd070f;">'.$name.'</a></div>';
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