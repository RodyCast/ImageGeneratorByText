function criarImagemComTexto(event) {
    event.preventDefault();

    const textoInput = document.getElementById('texto-input');
    const texto = textoInput.value;

    if (!texto) {
        alert('Por favor, insira o texto.');
        return;
    }

    const linhas = texto.split('\n');

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 100 + (linhas.length - 1) * 30;

    const ctx = canvas.getContext('2d');

    // Define o fundo da imagem como branco
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '24px Arial';
    ctx.fillStyle = 'black'; // Define a cor do texto como preto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const x = canvas.width / 2;
    let y = canvas.height / 2 - (linhas.length - 1) * 15;

    for (const linha of linhas) {
        ctx.fillText(linha, x, y);
        y += 30;
    }

    const dataURL = canvas.toDataURL('image/png');

    const imagem = document.createElement('img');
    imagem.src = dataURL;

    const imagemContainer = document.getElementById('imagem-container');
    imagemContainer.innerHTML = '';
    imagemContainer.appendChild(imagem);

    // Cria um link de download e inicia o download com o nome personalizado com base no texto inserido
    const linkDownload = document.createElement('a');
    const nomeArquivo = texto.trim().replace(/\s+/g, '_') + '.png'; // Substitui espaços por '_' no nome do arquivo
    linkDownload.href = dataURL;
    linkDownload.download = nomeArquivo;
    linkDownload.style.display = 'none';
    document.body.appendChild(linkDownload);
    linkDownload.click();
    document.body.removeChild(linkDownload);
}

const formGerarImagem = document.getElementById('form-gerar-imagem');
formGerarImagem.addEventListener('submit', criarImagemComTexto);
