const cpfEl = document.querySelector("#cpf");
const gerarCpfBtn = document.querySelector("#gerar-cpf");
const copiarCpfBtn = document.querySelector("#copiar-cpf");

function gerarCPF() {
    let n = Math.floor(Math.random() * 999999999) + 1; // formula para gerar os primeiros 9 digitos do cpf
    let nStr = n.toString().padStart(9, "0");
    let dv1 = calcularDV(nStr, 10); // digito verificador 1, primeiro numero que vem depois do -
    let dv2 = calcularDV(nStr + dv1, 11); // digito verificador 2, segundo numero que vem depois do -
    
    cpfEl.innerText = formatarCPF(nStr + dv1 + dv2);
}

function calcularDV(numero, peso) {
    let total = 0;
    for (let i = 0; i < numero.length; i++) {
      total += parseInt(numero.charAt(i)) * peso--;
    }
    let resto = total % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function formatarCPF(cpf) {
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cpf.replace(cpfRegex, "$1.$2.$3-$4");
}

function copiarCPF(){
    const cpf = cpfEl.innerHTML;
    navigator.clipboard.writeText(cpf).then(() => {
        alert(`CPF ${cpf} copiado para a área de transferência!`)
    },
    (err) => {
        console.log("erro ao copiar cpf")
    })
}

gerarCpfBtn.addEventListener("click", gerarCPF);
copiarCpfBtn.addEventListener("click", copiarCPF)
