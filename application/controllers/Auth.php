<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Auth extends CI_Controller
{

	// Berikut API untuk login ke Alfresco prosia

	// https://192.168.195.86:8080/alfresco/service/api/login?u=admin&pw=admin
	
	// http://192.168.195.86:8080/alfresco/service/api/people/admin?alf_ticket=TICKET_368c98e363c853a6f75fe7b4215fea0b3f170bb8
	
	public function index()
	{
		$sessionEmail = $this->session->userdata('email');
		$sessionUsername = $this->session->userdata('userName');

		if ($sessionEmail && $sessionUsername) {
			redirect('home');
		} else {
			$submit = isset($_POST['submit']) ? $_POST['submit'] : '';
		
			if ($submit) {
				$username = isset($_POST['username']) ? $_POST['username'] : '';
				$password = isset($_POST['password']) ? $_POST['password'] : '';
	
				if (empty($username) && empty($password)) {
					echo json_encode(
						array(
							'status' => 'error', 'response' => 'Fill Username and Password fields first!'
						)
					);
				} elseif (empty($username)) {
					echo json_encode(
						array(
							'status' => 'error', 'response' => 'Fill the Username field first!'
						)
					);
				} elseif (empty($password)) { 
					echo json_encode(
						array(
							'status' => 'error', 'response' => 'Fill the Password field first!'
						)
					);
				} else {
					try {
						$ticket_token = $this->get_ticket_token($username, $password);
	
						try {
							$response = $this->get_detail_login($username, $ticket_token);
	
							if ($username === $response['response']->userName) {
								$this->session->set_userdata(
									array(
										'Organisasi' => $response['response']->organization,
										'userName' => $response['response']->userName,
										'email' => $response['response']->email
									)
								);
							}
	
							echo json_encode($response);
						} catch (Exception $x) {
							echo json_encode(
								array(
									'status' => 'error', 
									'response' => $x->getMessage()
								)
							);
						}
					} catch (Exception $x) {
						echo json_encode(
							array(
								'status' => 'error', 
								'response' => $x->getMessage()
							)
						);
					}
			
				}
			} else {
				$data['title'] = "Login";
		
				$this->load->view('template/header_view', $data);
				$this->load->view('auth/login_view');
				$this->load->view('template/footer_view');
			}
		}
	}

	private function get_ticket_token($username, $password)
	{
		$url = "http://192.168.195.86:8080/alfresco/service/api/login";
					
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_SSL_VERIFYPEER => false, // DANGEROUS
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 13,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			// CURLOPT_POSTFIELDS => array('File' => new CURLFILE(base_url() . $unsanitized_file_path . $file_name_mask . $type)),
			CURLOPT_POSTFIELDS => array('u' => $username, 'pw' => $password),
			// CURLOPT_HTTPHEADER => array(
			// 	'Authorization: Bearer ' . $bearer_token,
			// 	'Content-Type: multipart/form-data'
			// ),
		));

		// 401 || 403
		if (isset(((array) ((array) simplexml_load_string(curl_exec($curl)))['status'])['code'])) {
			echo json_encode(
				array(
					'status' => 'error', 
					'response' => 'Make sure username and password are correct!'
					)
				);
			die;
		} else {
			$response = ((array) simplexml_load_string(curl_exec($curl)))[0];
		}
			

		if ($response === false) 
			$response = curl_error($curl);
			
		curl_close($curl);
		
		return $response;

	}

	private function get_detail_login($username, $ticket_token)
	{
		// $url = "http://192.168.195.86:8080/alfresco/service/api/people/" . $username;
		$url = "http://192.168.195.86:8080/alfresco/service/api/people/" . $username . "?alf_ticket=" . $ticket_token;

		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_SSL_VERIFYPEER => false, // DANGEROUS
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 13,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			// CURLOPT_POSTFIELDS => array('File' => new CURLFILE(base_url() . $unsanitized_file_path . $file_name_mask . $type)),
			// CURLOPT_POSTFIELDS => array('alf_ticket' => $ticket_token),
			// CURLOPT_HTTPHEADER => array(
			// 	'Authorization: Bearer ' . $bearer_token,
			// 	'Content-Type: multipart/form-data'
			// ),
		));

		$response = curl_exec($curl);

		if ($response === false) 
			$response = curl_error($curl);

		curl_close($curl);
	
		return array(
			'status' => 'success', 
			'response' => json_decode($response)
		);
	}

	public function logout()
	{
		$this->session->unset_userdata('organisasi');
		$this->session->unset_userdata('userName');
		$this->session->unset_userdata('email');

		redirect();
	}
}