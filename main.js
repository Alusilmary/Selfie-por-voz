// Inicializa a API de reconhecimento de voz do navegador
var SpeechRecognition = window.webkitSpeechRecognition;

// Cria uma nova instância de reconhecimento de fala
var recognition = new SpeechRecognition();

// Obtém a referência do elemento de texto onde será exibido o comando de voz
var Textbox = document.getElementById("textbox");

// Função chamada ao clicar no botão "Iniciar"
function start() {
    // Limpa o conteúdo da textarea
    Textbox.innerHTML = "";
    // Inicia o reconhecimento de fala
    recognition.start();
}

// Evento disparado quando o reconhecimento de fala retorna um resultado
recognition.onresult = function(event) {
    // Exibe o evento no console para debug
    console.log(event);

    // Obtém o texto transcrito do primeiro resultado
    var Content = event.results[0][0].transcript;

    // Exibe o texto transcrito na textarea
    Textbox.innerHTML = Content;
    console.log(Content);

    // Se o comando de voz for "tire minha selfie"
    if(Content.toLowerCase() == "tire minha selfie") {
        console.log("tirando selfie --- ");
        // Chama a função para tirar a selfie
        speak();
    }
}

// Função para sintetizar a fala e tirar a selfie
function speak() {
    // Inicializa a API de síntese de fala do navegador
    var synth = window.speechSynthesis;

    // Texto que será falado pelo navegador
    var speakData = "Tirando sua selfie em 5 segundos";

    // Cria uma nova instância de fala com o texto
    var utterThis = new SpeechSynthesisUtterance(speakData);

    // Faz o navegador falar o texto
    synth.speak(utterThis);

    // Anexa a câmera ao elemento HTML com o id "camera"
    Webcam.attach(camera);

    // Aguarda 5 segundos antes de tirar a selfie
    setTimeout(function() {
        takeSelfie();
    }, 5000);
}

// Configurações da câmera
camera = document.getElementById("camera");
Webcam.set({
    width: 360,
    height: 250,
    image_format: 'jpeg',
    jpeg_quality: 90
});

// Função para capturar a selfie
function takeSelfie() {
    // Captura a imagem da webcam
    Webcam.snap(function(data_uri) {
        // Exibe a imagem capturada no elemento com id "result"
        document.getElementById("result").innerHTML = '<img id="selfieImage" src="'+data_uri+'"/>';
        // Chama a função para salvar a imagem
        save(data_uri);
    });
}

// Função para salvar a selfie
function save(data_uri) {
    // Cria um elemento <a> temporário
    var link = document.createElement('a');
    // Define o href do link como a URL da imagem
    link.href = data_uri;
    // Define o atributo download do link para nomear o arquivo
    link.download = 'selfie.jpg';
    // Adiciona o link ao corpo do documento
    document.body.appendChild(link);
    // Dispara o clique no link para iniciar o download
    link.click();
    // Remove o link do documento após o download
    document.body.removeChild(link);
}
  