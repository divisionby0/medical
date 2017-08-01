<?php
class afo_pdf_settings {

	public function __construct() {
		$this->load_settings();
	}
	
	public function custom_pdf_attachment_post_data(){
		if(isset($_POST['option']) and sanitize_text_field($_POST['option']) == "save_custom_pdf_attachment_settings"){
			
			if ( ! isset( $_POST['save_custom_pdf_attachment_action_field'] ) || ! wp_verify_nonce( $_POST['save_custom_pdf_attachment_action_field'], 'save_custom_pdf_attachment_action' ) ) {
			   wp_die( 'Sorry, your nonce did not verify.');
			} 
			
			if( isset($_POST['attachment_post_types']) and is_array($_POST['attachment_post_types']) ) {
				$saved_post_types_for_pdf_attachment = array_map('sanitize_text_field',$_POST['attachment_post_types']);
				update_option( 'saved_post_types_for_pdf_attachment', $saved_post_types_for_pdf_attachment );
			} else {
				delete_option( 'saved_post_types_for_pdf_attachment' );
			}
			
			if(isset($_POST['no_of_pdf_attachment'])){
				update_option( 'saved_no_of_pdf_attachment', sanitize_text_field($_POST['no_of_pdf_attachment']) );
			} else {
				delete_option( 'saved_no_of_pdf_attachment' );
			}
			
			if(isset($_POST['pdf_open_in'])){
				update_option( 'pdf_open_in', sanitize_text_field($_POST['pdf_open_in']) );
			} else {
				delete_option( 'pdf_open_in' );
			}
			
			$GLOBALS['msg'] = __('Data updated successfully','custom-post-type-pdf-attachment');
		}
	}
	
	public function post_types_selected( $saved_types = '' ){
		$args = array(
		'public'   => true,
		);
		$post_types = get_post_types( $args, 'names' ); 
		$post_types = array_diff($post_types, array('attachment'));
		foreach ( $post_types as $post_type ) {
			if(is_array($saved_types) and in_array($post_type,$saved_types)){
				echo '<p>'.form_class::form_checkbox('attachment_post_types[]','attachment_post_types',$post_type,'','','',true,'','',false).'&nbsp;'.$post_type.'</p>';
			} else{
				echo '<p>'.form_class::form_checkbox('attachment_post_types[]','attachment_post_types',$post_type,'','','',false,'','',false).'&nbsp;'.$post_type.'</p>';
			}
		}
	}
	
	public function get_no_of_pdf_files_selected( $saved_no_of_pdf_attachment = '' ){
		$ret = '';
		$ret .= '<option value="">--</option>';
		for($i=1; $i<=10; $i++){
			if($saved_no_of_pdf_attachment == $i){
				$ret .= '<option value="'.$i.'" selected="selected">'.$i.'</option>';
			} else {
				$ret .= '<option value="'.$i.'">'.$i.'</option>';
			}
		}
		return $ret;
	}
	
	public function get_pdf_open_in_selected( $pdf_open_in = '' ){
		$open_in_array = array( '_self' => 'Same Window', '_blank' => 'New Window' );
		$ret = '';
		
		if(is_array($open_in_array)){
			foreach( $open_in_array as $key => $value ){
				if($key == $pdf_open_in){
					$ret .= '<option value="'.$key.'" selected="selected">'.$value.'</option>';
				} else {
					$ret .= '<option value="'.$key.'">'.$value.'</option>';
				}
			}
		}
		return $ret;
	}
	
	public function show_message(){
		if(isset($GLOBALS['msg'])){
			echo '<div class="updated notice"><p>'.$GLOBALS['msg'].'</p></div>';
			$GLOBALS['msg'] = '';
		}
	}
	
	public function help_info($saved_no_of_pdf_attachment=''){
		
		echo '<table width="100%" border="0">';
		echo '<tr>
					<td colspan="2"><strong style="color:#008EC2">Show All Attachments with a Single Shortcode or Function:</strong> </td>
				  </tr>
				<tr>
					<td>
					<strong>Shortcode :</strong> <span style="color:#008EC2">[pdf_all_attachments]</span> use this in the post/ page content where you have uploaded the attachments.
					<br>
					<strong>Custom Function :</strong> <span style="color:#008EC2">&lt;?php echo pdf_all_attachment_files();?&gt;</span> use this in your template if you don\'t want to use shortcodes.</td>
				  </tr>
				  <tr>
					<td colspan="2">&nbsp;</td>
				  </tr>';
				  
		if($saved_no_of_pdf_attachment > 0 and $saved_no_of_pdf_attachment <= 10){
			for($i=1; $i<=$saved_no_of_pdf_attachment; $i++){
				echo '<tr>
					<td colspan="2"><strong style="color:#008EC2">Attachment '.$i.' :</strong> </td>
				  </tr>
				<tr>
					<td>
					<strong>Shortcode :</strong> <span style="color:#008EC2">[pdf_attachment file="'.$i.'" name="optional file name"]</span> use this in the post/ page content where you have uploaded the attachments.
					<br>
					<strong>Custom Function :</strong> <span style="color:#008EC2">&lt;?php echo pdf_attachment_file('.$i.',"optional file name");?&gt;</span> use this in your template if you don\'t want to use shortcodes.</td>
				  </tr>
				  <tr>
					<td colspan="2">&nbsp;</td>
				  </tr>';
			}
		}
		echo '</table>';
	}
	
	public function  custom_pdf_attachment_options () {
		global $wpdb;
		
		$saved_types = get_option('saved_post_types_for_pdf_attachment');
		$saved_no_of_pdf_attachment = get_option('saved_no_of_pdf_attachment');
		$pdf_open_in = get_option('pdf_open_in');
		echo '<div class="wrap">';
		$this->show_message();
		$this->help_support();
		
		form_class::form_open();
		wp_nonce_field( 'save_custom_pdf_attachment_action', 'save_custom_pdf_attachment_action_field' );
		form_class::form_input('hidden','option','','save_custom_pdf_attachment_settings');
		?>
		<table width="100%" border="0" style="background-color:#FFFFFF; border:1px solid #CCCCCC; padding:0px 0px 0px 10px; margin:2px 0px;">
		  <tr>
			<td><h3><?php _e('Custom Post Type Attachment ( PDF )');?></h3></td>
		  </tr>
		  <tr>
			<td><strong><?php _e('Select Post Types Where You Want Custom PDF Attachments','custom-post-type-pdf-attachment');?></strong></td>
		  </tr>
		  <tr>
			<td><?php $this->post_types_selected($saved_types); ?></td>
		  </tr>
          <tr>
			<td>&nbsp;</td>
		  </tr>
		  <tr>
			<td><strong><?php _e('Select Number of Attachment Files','custom-post-type-pdf-attachment');?></strong></td>
		  </tr>
		  <tr>
			<td><?php form_class::form_select('no_of_pdf_attachment','',$this->get_no_of_pdf_files_selected($saved_no_of_pdf_attachment));?></td>
		  </tr>
          <tr>
			<td>&nbsp;</td>
		  </tr>
          <tr>
			<td><strong><?php _e('PDF Open in','custom-post-type-pdf-attachment');?></strong></td>
		  </tr>
		  <tr>
			<td><?php form_class::form_select('pdf_open_in','',$this->get_pdf_open_in_selected($pdf_open_in));?></td>
		  </tr>
          <tr>
			<td>&nbsp;</td>
		  </tr>
		  <tr>
			<td><?php form_class::form_input('submit','submit','',__('Save','custom-post-type-pdf-attachment'),'button button-primary button-large');?></td>
		  </tr>
           <tr>
			<td>&nbsp;</td>
		  </tr>
           <tr>
			<td><?php $this->help_info($saved_no_of_pdf_attachment); ?></td>
		  </tr>
		</table>
		<?php 
		form_class::form_close();
		$this->donate();
		echo '</div>';
	}
	
	public function help_support(){ ?>
	<table width="100%" border="0" style="background-color:#FFFFFF; border:1px solid #CCCCCC; padding:5px 0px 5px 10px; margin:2px 0px;">
	  <tr>
		<td align="right"><a href="http://www.aviplugins.com/support.php" target="_blank">Help and Support</a> <a href="http://www.aviplugins.com/rss/news.xml" target="_blank"><img src="<?php echo  plugin_dir_url( __FILE__ ) . '/images/rss.png';?>" style="vertical-align: middle;" alt="RSS"></a></td>
	  </tr>
	</table>
	<?php
	}
	
	public function load_plugin_textdomain() {
		load_plugin_textdomain( 'custom-post-type-pdf-attachment', FALSE, basename( dirname( __FILE__ ) ) . '/languages/' );
	}

	public function custom_pdf_attachment_plugin_menu () {
		add_options_page( 'Custom Pdf Attachment', 'Custom PDF Attachment', 'activate_plugins', 'custom_pdf_attachment',  array( $this,'custom_pdf_attachment_options' ) );
	}
	
	public function load_settings(){
		add_action('admin_menu', array( $this, 'custom_pdf_attachment_plugin_menu' ) );
		add_action( 'admin_init', array( $this, 'custom_pdf_attachment_post_data' ) );
		add_action( 'plugins_loaded', array( $this, 'load_plugin_textdomain' ) );
	}
	
	public function donate(){	?>
	<table width="100%" border="0" style="background-color:#FFF; border:1px solid #ccc; margin:2px 0px; padding-right:10px;">
	 <tr>
	 <td align="right"><a href="http://www.aviplugins.com/donate/" target="_blank">Donate</a> <img src="<?php echo  plugin_dir_url( __FILE__ ) . '/images/paypal.png';?>" style="vertical-align: middle;" alt="PayPal"></td>
	  </tr>
	</table>
	<?php
	} 
	
}