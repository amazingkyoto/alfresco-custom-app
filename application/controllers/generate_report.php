<?php
// require 'PHPJasperXML.inc.php';

// Mengambil data dari formulir HTML
var_dump($_POST);die;
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];

// Menggunakan path absolut ke file .jrxml Anda
$jasperFile = '/path/to/your/report.jrxml';

// Konfigurasi koneksi database
$db_connection = [
    'driver' => 'mysql',   // Tipe database
    'host' => 'localhost',
    'username' => 'db_username',
    'password' => 'db_password',
    'database' => 'db_name'
];

$input = $jasperFile;
$output = '/path/to/output/directory'; // Ganti dengan path ke direktori output

$options = [
    'format' => ['pdf'],  // Format laporan (misalnya PDF)
    'params' => [         // Parameter yang diperlukan untuk laporan (jika ada)
        'start_date' => $start_date,
        'end_date' => $end_date
    ],
    'db_connection' => $db_connection
];

$jasper = new PHPJasperXML();
$jasper->process($input, $output, $options);
?>
