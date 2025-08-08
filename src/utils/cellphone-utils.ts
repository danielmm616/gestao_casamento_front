export function formatCellphone(value: string): string {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3').trim();
  }

  return digits.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3').trim();
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function generateWhatsAppInvite(numero: string, mensagem: string) {
  const numeroLimpo = numero.replace(/\D/g, '');
  const mensagemCodificada = encodeURIComponent(mensagem);
  if (isMobile()) {
    return `https://wa.me/55${numeroLimpo}?text=${mensagemCodificada}`;
  } else {
    return `https://web.whatsapp.com/send?phone=55${numeroLimpo}&text=${mensagemCodificada}`;
  }
}
