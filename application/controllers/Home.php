<?php
defined('BASEPATH') or exit('No direct script access allowed');

require 'vendor/autoload.php';
use PHPJasper\PHPJasper;
// use simitsdk\phpjasperxml\PHPJasperXML;

class Home extends CI_Controller
{

	public function index()
	{
		$sessionEmail = $this->session->userdata('email');
		$sessionUsername = $this->session->userdata('userName');

		if ($sessionEmail && $sessionUsername) {
			$data['title'] = "Home";
	
			$this->load->view('template/header_view', $data);
			$this->load->view('home_view');
			$this->load->view('template/footer_view');
		} else {
			redirect();
		}
	}

	public function get_data()
	{
		date_default_timezone_set('Asia/Jakarta');

		$query = "SELECT id_detail, fd.id_header, fh.kepada, fh.kantor_cabang, deskripsi_jasa, jumlah, alasan_permintaan, pemohon, kepala_cabang, gadept_appr, 
					finndept_appr, accdept_appr, created_by, created_date
					FROM form_header fh
					RIGHT JOIN form_detail fd ON fd.id_header = fh.id_header
		;";
		$data = $this->db->query($query);
		$data_result = array_reverse($data->result_array());


		for ($i = 0; $i < sizeof($data_result); $i++) {
			$data_result[$i]['no'] = $i + 1;
			$data_result[$i]['created_date'] =  date('d F Y H:i:s', htmlspecialchars($data_result[$i]['created_date']));
			$data_result[$i]['kepala_cabang']	= $data_result[$i]['kepala_cabang'] == 0 ? '<span style="color: red;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
				</svg></span>' : '<span style="color: green;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
				</svg></span>';
			$data_result[$i]['gadept_appr']	= $data_result[$i]['gadept_appr'] == 0 ? '<span style="color: red;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
				</svg></span>' : '<span style="color: green;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
				</svg></span>';
			$data_result[$i]['finndept_appr']	= $data_result[$i]['finndept_appr'] == 0 ? '<span style="color: red;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
				</svg></span>' : '<span style="color: green;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
				</svg></span>';
			$data_result[$i]['accdept_appr']	= $data_result[$i]['accdept_appr'] == 0 ? '<span style="color: red;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
				</svg></span>' : '<span style="color: green;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
				</svg></span>';
		}

		echo json_encode($data_result);
	}

	public function submit_form_ga12b()
	{
		$sessionOrganisasi = $this->session->userdata('organisasi') == null ? '' : $this->session->userdata('organisasi');
		$sessionUsername = $this->session->userdata('userName');

		$organisasi		= $sessionOrganisasi;
		$kepada			= $_POST['kepada'];
		$kantor_cabang	= $_POST['kantor_cabang'];
		$pemohon		= $sessionUsername;
		$kepala_cabang	= false;
		$gadept_appr	= false;
		$finndept_appr	= false;
		$accdept_appr	= false;

		$created_by		= $sessionUsername;
		$created_date	= time();

		$loop_count = sizeof($_POST['deskripsi_barang']);

		// HEADER
		$input_header = [
			'organisasi' 	=> $organisasi,
			'kepada' 		=> $kepada,
			'kantor_cabang' => $kantor_cabang,
			'pemohon'		=> $pemohon,
			'kepala_cabang'	=> $kepala_cabang,
			'gadept_appr'	=> $gadept_appr,
			'finndept_appr'	=> $finndept_appr,
			'accdept_appr'	=> $accdept_appr,
			'created_by' 	=> $created_by,
			'created_date' 	=> $created_date
		];
	
		try {
			// $this->db->insert('form_header', $input_header);
			// $id_header = $this->db->insert_id();
			$id_header = 5;
			
			try {
				// DETAIL
				for ($i = 0; $i < $loop_count; $i++) {
					$deskripsi_jasa 	= $_POST['deskripsi_barang'][$i];
					$jumlah 			= $_POST['jumlah'][$i];
					$alasan_permintaan 	= $_POST['alasan_permintaan'][$i];

					$input_detail = [
						'id_header'			 => $id_header , 
						'deskripsi_jasa'	 => $deskripsi_jasa, 
						'jumlah'			 => $jumlah, 
						'alasan_permintaan'	 => $alasan_permintaan, 
					];
					$this->db->insert('form_detail', $input_detail);
				}

				$this->jasper_to_pdf($organisasi, $kepada, $kantor_cabang, $sessionUsername);

				echo json_encode(
					array(
						'status' => 'success', 'response' => 'Form Added!'
					)
				);
			} catch (Exception $x) {
				echo json_encode(
					array(
						'status' => 'error', 'response' => $x->getMessage()
					)
				);
			}
		} catch (Exception $x) {
			echo json_encode(
				array(
					'status' => 'error', 'response' => $x->getMessage()
				)
			);
		}
	}

	public function upload_files()
	{
		ini_set('post_max_size', '10240M');
		ini_set('upload_max_filesize', '2048M');
		// ini_set('display_errors', 0);
	}

	private function jasper_to_pdf($organisasi, $kepada, $kantor_cabang, $pemohon)
	{	
		// Konfigurasi koneksi database
		$db_connection = [
			'driver'   => 'mysql',   // Tipe database
			'host'     => 'localhost',
			'username' => 'root',
			'password' => 'root',
			'database' => 'alfresco-custom-app'
		];

		// Parameter yang diperlukan untuk laporan (jika ada)
		$params = [
			'PARAM_ORGANISASI' => 2
			// 'organisasi'    => $organisasi,
			// 'kepada'        => $kepada,
			// 'kantor_cabang' => $kantor_cabang,
			// 'pemohon'       => $pemohon
		];
		
		$input = __DIR__ . 'Form_GA_12B.jasper';
		$output = 'assets';
		$options = [
			'format'        => ['pdf'],
			'locale'        => 'en',
			'params'        => $params,
			'db_connection' => $db_connection
		];
		
		$jasper = new PHPJasper;
		
		$jasper->process(
				$input,
				$output,
				$options
		)->execute();
	}

	private function format_bytes($a_bytes) {
		if ($a_bytes < 1024) {
			return $a_bytes .' B';
		} elseif ($a_bytes < 1048576) {
			return round($a_bytes / 1024, 2) .' KB';
		} elseif ($a_bytes < 1073741824) {
			return round($a_bytes / 1048576, 2) . ' MB';
		} elseif ($a_bytes < 1099511627776) {
			return round($a_bytes / 1073741824, 2) . ' GB';
		} elseif ($a_bytes < 1125899906842624) {
			return round($a_bytes / 1099511627776, 2) .' TB';
		} elseif ($a_bytes < 1152921504606846976) {
			return round($a_bytes / 1125899906842624, 2) .' PB';
		} elseif ($a_bytes < 1180591620717411303424) {
			return round($a_bytes / 1152921504606846976, 2) .' EB';
		} elseif ($a_bytes < 1208925819614629174706176) {
			return round($a_bytes / 1180591620717411303424, 2) .' ZB';
		} else {
			return round($a_bytes / 1208925819614629174706176, 2) .' YB';
		}
	}
}
