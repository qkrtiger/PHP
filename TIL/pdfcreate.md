
## TCPDF를 이용해서 Pdf 생성하기

### 1. TCPDF 설치
1. [TCPDF 공식 사이트](https://tcpdf.org/)에서 최신 버전을 다운로드한다.
2. 다운로드한 압축 파일을 해제하고, tcpdf 폴더를 웹 서버의 프로젝트 디렉토리에 복사한다.

### 2. pdf 생성


```php
<?php
// TCPDF 라이브러리 포함
require_once('tcpdf/tcpdf.php');

// TCPDF 객체 생성
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// 문서 정보 설정
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Your Name');
$pdf->SetTitle('Sample PDF');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// 기본 헤더와 푸터 비활성화
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// 기본 폰트 설정
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// 마진 설정
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// 이미지 스케일 팩터 설정
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// 언어 관련 설정
if (@file_exists(dirname(__FILE__).'/tcpdf/examples/lang/eng.php')) {
    require_once(dirname(__FILE__).'/tcpdf/examples/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// 첫 페이지 추가
$pdf->AddPage();

// 콘텐츠 추가
$html = <<<EOD
<h1>Welcome to TCPDF!</h1>
<i>This is a simple PDF example using TCPDF.</i>
<p>This library allows you to create PDF documents directly from your PHP code.</p>
EOD;

$pdf->writeHTML($html, true, false, true, false, '');

// PDF 출력
$pdf->Output('sample.pdf', 'I');

```
