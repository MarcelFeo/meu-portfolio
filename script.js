// Buscar projetos do GitHub
async function fetchProjects() {
    const username = 'MarcelFeo';
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    const projectList = document.getElementById('project-list');
    repos.slice(0, 9).forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Sem descrição disponível'}</p>
            <a href="${repo.html_url}" target="_blank" class="btn">Ver no GitHub</a>
        `;
        projectList.appendChild(projectCard);
    });
}

// Alternar tema
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verifica tema salvo no localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
});

// Feedback ao enviar formulário
document.getElementById('contact-form').addEventListener('submit', function(e) {
    // Não precisa prevenir o padrão, pois o Formspree cuidará do envio
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Obrigado por entrar em contato.');
        this.reset(); // Limpa o formulário após o envio
    }, 500); // Pequeno delay para garantir que o envio ocorra primeiro
});

// Carregar projetos ao iniciar
window.onload = fetchProjects;
