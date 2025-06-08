// Elementos do DOM
const startButton = document.getElementById('startButton');
const initialScreen = document.getElementById('initialScreen');
const mainContent = document.getElementById('mainContent');
const heartsContainer = document.getElementById('heartsContainer');
const musicaFundo = document.getElementById('musicaFundo');
const musicButton = document.getElementById('musicButton');
const musicIcon = document.getElementById('musicIcon');

// Variáveis do carrossel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let carouselInterval;

// Função principal - executada quando o botão é clicado
function iniciarExperiencia() {
    // Ocultar tela inicial
    initialScreen.style.display = 'none';
    
    // Mostrar conteúdo principal
    mainContent.classList.add('show');
    
    // Mostrar corações animados
    heartsContainer.classList.add('show');
    
    // Reproduzir música
    musicaFundo.play().catch(error => {
        console.log('Erro ao reproduzir música:', error);
        // Alguns navegadores bloqueiam autoplay, mas o usuário pode clicar no controle
    });
    
    // Iniciar carrossel automático
    iniciarCarrossel();
}

// Função para iniciar o carrossel automático
function iniciarCarrossel() {
    carouselInterval = setInterval(() => {
        proximoSlide();
    }, 4000); // Troca de slide a cada 4 segundos
}

// Função para ir para o próximo slide
function proximoSlide() {
    // Remover classe active do slide atual
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Avançar para o próximo slide (volta ao primeiro se estiver no último)
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Adicionar classe active ao novo slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Função para ir para um slide específico
function irParaSlide(slideIndex) {
    // Remover classe active do slide atual
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Definir novo slide
    currentSlide = slideIndex;
    
    // Adicionar classe active ao novo slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Reiniciar o timer do carrossel
    clearInterval(carouselInterval);
    iniciarCarrossel();
}

// Função para controlar a música
function controlarMusica() {
    if (musicaFundo.paused) {
        musicaFundo.play();
        musicIcon.textContent = '⏸️';
    } else {
        musicaFundo.pause();
        musicIcon.textContent = '▶️';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botão principal
    startButton.addEventListener('click', iniciarExperiencia);
    
    // Controle de música
    musicButton.addEventListener('click', controlarMusica);
    
    // Indicadores do carrossel
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            irParaSlide(index);
        });
    });
    
    // Pausar carrossel quando o usuário passa o mouse sobre ele
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        iniciarCarrossel();
    });
});

// Função para criar efeito de corações extras ao clicar na tela
function criarCoracaoExtra(x, y) {
    const coracao = document.createElement('div');
    coracao.innerHTML = '❤️';
    coracao.style.position = 'fixed';
    coracao.style.left = x + 'px';
    coracao.style.top = y + 'px';
    coracao.style.fontSize = '1.5rem';
    coracao.style.pointerEvents = 'none';
    coracao.style.zIndex = '1000';
    coracao.style.animation = 'floatUp 2s ease-out forwards';
    
    document.body.appendChild(coracao);
    
    // Remover o coração após a animação
    setTimeout(() => {
        coracao.remove();
    }, 2000);
}

// CSS para animação dos corações extras
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Adicionar corações extras ao clicar na tela (após iniciar a experiência)
document.addEventListener('click', function(e) {
    if (mainContent.classList.contains('show')) {
        // Criar alguns corações aleatórios próximos ao clique
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 100;
                const offsetY = (Math.random() - 0.5) * 100;
                criarCoracaoExtra(e.clientX + offsetX, e.clientY + offsetY);
            }, i * 100);
        }
    }
});

// Função para ajustar volume da música (opcional)
function ajustarVolume(volume) {
    musicaFundo.volume = volume; // volume entre 0 e 1
}

// Definir volume inicial (50%)
document.addEventListener('DOMContentLoaded', function() {
    ajustarVolume(0.5);
});

// Adicionar efeito de partículas de coração no fundo
function criarParticulasCoracao() {
    if (!mainContent.classList.contains('show')) return;
    
    const particula = document.createElement('div');
    particula.innerHTML = Math.random() > 0.5 ? '❤️' : '💕';
    particula.style.position = 'fixed';
    particula.style.left = Math.random() * window.innerWidth + 'px';
    particula.style.top = window.innerHeight + 'px';
    particula.style.fontSize = '1rem';
    particula.style.pointerEvents = 'none';
    particula.style.zIndex = '1';
    particula.style.opacity = '0.6';
    particula.style.animation = 'floatUpSlow 8s linear forwards';
    
    document.body.appendChild(particula);
    
    setTimeout(() => {
        particula.remove();
    }, 8000);
}

// CSS para partículas lentas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatUpSlow {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Criar partículas a cada 3 segundos
setInterval(criarParticulasCoracao, 3000);



// Elementos do vídeo
const videoButton = document.getElementById('videoButton');
const videoModal = document.getElementById('videoModal');
const closeVideo = document.getElementById('closeVideo');
const specialVideo = document.getElementById('specialVideo');

// Função para abrir o vídeo em tela cheia
function abrirVideo() {
    // Pausar música de fundo
    if (!musicaFundo.paused) {
        musicaFundo.pause();
        musicIcon.textContent = '▶️';
    }
    
    // Mostrar modal do vídeo
    videoModal.classList.add('show');
    
    // Reproduzir vídeo
    specialVideo.play();
    
    // Pausar carrossel
    clearInterval(carouselInterval);
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
}

// Função para fechar o vídeo
function fecharVideo() {
    // Ocultar modal
    videoModal.classList.remove('show');
    
    // Pausar e resetar vídeo
    specialVideo.pause();
    specialVideo.currentTime = 0;
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
    
    // Reiniciar carrossel se o conteúdo estiver visível
    if (mainContent.classList.contains('show')) {
        iniciarCarrossel();
    }
    
    // Retomar música de fundo
    if (mainContent.classList.contains('show')) {
        musicaFundo.play();
        musicIcon.textContent = '⏸️';
    }
}

// Event listeners para o vídeo
document.addEventListener('DOMContentLoaded', function() {
    // Botão para abrir vídeo
    videoButton.addEventListener('click', abrirVideo);
    
    // Botão para fechar vídeo
    closeVideo.addEventListener('click', fecharVideo);
    
    // Fechar vídeo ao clicar fora dele
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            fecharVideo();
        }
    });
    
    // Fechar vídeo com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('show')) {
            fecharVideo();
        }
    });
    
    // Quando o vídeo terminar, fechar automaticamente
    specialVideo.addEventListener('ended', function() {
        fecharVideo();
    });
    
    // Prevenir que o vídeo seja pausado acidentalmente ao clicar
    specialVideo.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Função para criar efeito especial quando o vídeo é aberto
function criarEfeitoEspecialVideo() {
    // Criar corações especiais ao redor do botão
    const rect = videoButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const angle = (i * 45) * Math.PI / 180;
            const distance = 100;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            criarCoracaoExtra(x, y);
        }, i * 50);
    }
}

// Adicionar efeito especial ao clicar no botão do vídeo
videoButton.addEventListener('click', criarEfeitoEspecialVideo);

document.addEventListener('DOMContentLoaded', function() {
    // Get the elements
    const videoModal = document.getElementById('videoModal');
    const specialVideo = document.getElementById('specialVideo');
    const closeButton = document.getElementById('closeVideo');
    const backgroundMusic = document.getElementById('backgroundMusic'); // Assuming an ID for your background music

    // To open the video modal when the video element itself is clicked
    // You'll likely want a separate trigger for this, e.g., a button or a thumbnail.
    // For now, let's assume you click the video element itself to open the modal.
    // If you have a different element that triggers the modal, replace `specialVideo`
    // in the `click` event listener below with that element's ID or class.
    
    // Example: If you have an image or button with ID 'openVideoBtn' to open the modal
    const openVideoBtn = document.getElementById('openVideoBtn'); // Add this ID to your HTML element

    if (openVideoBtn) {
        openVideoBtn.addEventListener('click', function() {
            videoModal.style.display = 'flex'; // Use 'flex' to enable centering
            specialVideo.play(); // Start playing the video
            if (backgroundMusic) {
                backgroundMusic.pause(); // Pause background music
            }
        });
    } else {
        // Fallback: If no specific button, click the video itself to open the modal
        // This is less common for "opening in full screen" but works for demonstration.
        specialVideo.addEventListener('click', function() {
            videoModal.style.display = 'flex'; // Use 'flex' to enable centering
            specialVideo.play(); // Start playing the video
            if (backgroundMusic) {
                backgroundMusic.pause(); // Pause background music
            }
        });
    }

    // When the user clicks on <span> (x), close the modal
    closeButton.addEventListener('click', function() {
        videoModal.style.display = 'none';
        specialVideo.pause(); // Pause the video when closing
        specialVideo.currentTime = 0; // Reset video to the beginning
        if (backgroundMusic) {
            backgroundMusic.play(); // Resume background music
        }
    });

    // When the user clicks anywhere outside of the modal content, close it
    window.addEventListener('click', function(event) {
        if (event.target == videoModal) {
            videoModal.style.display = 'none';
            specialVideo.pause(); // Pause the video when closing
            specialVideo.currentTime = 0; // Reset video to the beginning
            if (backgroundMusic) {
                backgroundMusic.play(); // Resume background music
            }
        }
    });
});