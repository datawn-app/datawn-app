// 간단한 클라이언트 측 검증 및 mailto로 의뢰 내용을 여는 스크립트
function handleSubmit(e){
  e.preventDefault();
  const form = e.target;
  const name = form.clientName.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const type = form.serviceType.value.trim();
  const details = form.details.value.trim();

  if(!name || !email || !phone || !type || !details){
    alert('모든 항목을 채워주세요.');
    return false;
  }

  // 메일 본문 생성(간단히 mailto 사용)
  const subject = encodeURIComponent(`[업무의뢰] ${type} - ${name}`);
  const bodyLines = [
    `의뢰인: ${name}`,
    `이메일: ${email}`,
    `전화번호: ${phone}`,
    `의뢰구분: ${type}`,
    '',
    `상세내용:`,
    details
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));

  // 기본 이메일 주소 — 실제 운영 시 서버 엔드포인트로 전송하도록 변경 권장
  const to = 'info@datawn.kr';
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

  // 새 창으로 mailto 열기(사용자 이메일 클라이언트로 전송)
  window.location.href = mailto;

  // 폼 리셋
  form.reset();
  return false;
}