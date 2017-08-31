<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<div class="wrap">
<h1><?php _e('File Manager - System Properties','ffm'); ?>  <a href="http://filemanager.webdesi9.com/product/file-manager" class="button button-primary" target="_blank" title="Click to Buy PRO"><?php  _e('Buy PRO', 'ffm'); ?></a></h1>

<table cellpadding="5" style="background:#fff; padding:10px; border-left: 5px solid #0073AA;">
	
	<tr>
		<th>PHP version</th>
		<td><code><?php echo phpversion(); ?></code></td>
	</tr>
	
	<tr>
		<th>Maximum file upload size (upload_max_filesize)</th>
		<td><code><?php echo ini_get('upload_max_filesize'); ?></code></td>
	</tr>

	<tr>
		<th>Post maximum file upload size (post_max_size)</th>
		<td><code><?php echo ini_get('post_max_size'); ?></code></td>
	</tr>
	
	<tr>
		<th>Memory Limit (memory_limit)</th>
		<td><code><?php echo ini_get('memory_limit'); ?></code></td>
	</tr>
	
	<tr>
		<th>Timeout (max_execution_time)</th>
		<td><code><?php echo ini_get('max_execution_time'); ?></code></td>
	</tr>
	
	<tr>
		<th>Browser and OS (HTTP_USER_AGENT)</th>
		<td><code><?php echo $_SERVER['HTTP_USER_AGENT']; ?></code></td>
	</tr>
	
</table>
</div>