// Função para carregar o header apropriado
async function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) return;

  // Verifica se está na página home
  const isHome =
    window.location.pathname === '/' ||
    window.location.pathname === '/home' ||
    window.location.pathname.includes('home.html');

  // Carrega o header apropriado - CAMINHOS CORRIGIDOS
  const headerPath = isHome
    ? 'components/header-home.html' // ✅ Correto: de pages/ para components/
    : 'components/header.html'; // ✅ Correto: de pages/ para components/

  try {
    const response = await fetch(headerPath);
    const headerContent = await response.text();
    headerPlaceholder.innerHTML = headerContent;
  } catch (error) {
    console.error('Erro ao carregar o header:', error);
    console.error('Caminho tentado:', headerPath);
  }
}

// Função para inicialização da página
document.addEventListener('DOMContentLoaded', () => {
  // Carrega o header em todas as páginas
  loadHeader();
});

// Funções de autenticação
function handleLogin(event) {
  event.preventDefault();
  window.location.href = 'login.html';
  const form = event.target;
  const formData = new FormData(form);

  // Aqui você pode adicionar a lógica de autenticação
  const email = formData.get('email');
  const password = formData.get('password');

  console.log('Tentativa de login:', { email });
  setTimeout(() => {
    window.location.href = 'eventos.html';
  }, 1000);
}

function handleRegister(event) {
  event.preventDefault();
  window.location.href = 'registrar.html';
  const form = event.target;
  const formData = new FormData(form);

  // Aqui você pode adicionar a lógica de registro
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    userType: formData.get('userType'),
  };

  console.log('Dados do registro:', {
    name: data.name,
    email: data.email,
    userType: data.userType,
  });

  // Simulação de registro bem-sucedido
  // Em produção, isso seria uma chamada à API
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1000);
}

// Funções de eventos
function createEvent(event) {
  event.preventDefault();
  // Lógica para criar evento
  console.log('Criando evento...');
}

function handleEventRegistration(event) {
  event.preventDefault();

  console.log('Processando inscrição...');

  window.location.href = 'inscricaoConfirmada.html';
}

function manageEvent(eventId) {
  console.log('Gerenciando evento:', eventId);
}

function validateEventDate(dateString) {
  const selectedDate = new Date(dateString);
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() + 2,
    today.getMonth(),
    today.getDate()
  );

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  maxDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return {
      valid: false,
      message: 'A data do evento não pode ser no passado.',
    };
  }

  if (selectedDate > maxDate) {
    return {
      valid: false,
      message: 'A data do evento não pode ser mais de 2 anos no futuro.',
    };
  }

  return {
    valid: true,
    message: 'Data válida.',
  };
}

function getCurrentDateLimits() {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() + 2,
    today.getMonth(),
    today.getDate()
  );

  return {
    min: today.toISOString().split('T')[0],
    max: maxDate.toISOString().split('T')[0],
  };
}

// Funções de navegação
function navigateToEventDetails(eventId) {
  // Navega para detalhes do evento
  window.location.href = `detalhesEventos.html?id=${eventId}`;
}

// Funções de utilidade
function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR');
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Funções para manipulação de imagem
function setupImageUpload() {
  const uploadBtn = document.getElementById('imageUploadBtn');
  const imageInput = document.getElementById('imageInput');
  const uploadText = document.querySelector('.upload-text');

  if (!uploadBtn || !imageInput || !uploadText) return;

  uploadBtn.addEventListener('click', function () {
    imageInput.click();
  });

  imageInput.addEventListener('change', function (e) {
    if (e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      uploadText.textContent = `Imagem selecionada: ${fileName}`;
      uploadBtn.style.background = '#e5e7eb';
      uploadBtn.style.border = '2px solid #4f46e5';
    }
  });
}

// Funções para formulários
function setupCreateEventForm() {
  const form = document.getElementById('createEventForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const imageInput = document.getElementById('imageInput');

    if (imageInput && imageInput.files[0]) {
      formData.append('eventImage', imageInput.files[0]);
    }

    // Aqui você pode adicionar a lógica para enviar o formData para o servidor
    alert('Evento criado com sucesso!');
  });
}

// Funções para filtros de eventos
function setupEventFilters() {
  const filterTags = document.querySelectorAll('.filter-tag');
  if (!filterTags.length) return;

  filterTags.forEach((tag) => {
    tag.addEventListener('click', function () {
      this.classList.toggle('active');
      // Aqui você pode adicionar a lógica para filtrar os eventos
      console.log('Filtro selecionado:', this.textContent);
    });
  });
}

// Funções para detalhes do evento
function setupEventDetails() {
  // Pegar o ID do evento da URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  if (eventId) {
    // Aqui você pode adicionar a lógica para carregar os detalhes do evento
    console.log('Carregando detalhes do evento:', eventId);
  }
}

// Funções para gerenciamento de eventos
function setupEventManagement() {
  const managementTable = document.querySelector('.table');
  if (!managementTable) return;

  // Setup da busca
  const searchField = document.querySelector('.search-field');
  if (searchField) {
    searchField.addEventListener('input', function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('.table-row');

      rows.forEach((row) => {
        const eventName = row
          .querySelector('.table-cell-text')
          .textContent.toLowerCase();
        if (eventName.includes(searchTerm)) {
          row.style.display = 'flex';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // Animação inicial das linhas
  const rows = document.querySelectorAll('.table-row');
  rows.forEach((row, index) => {
    row.style.animation = `slideInFromRight 0.5s ease-out ${index * 0.1}s both`;
  });

  // Setup dos botões de ação
  document.querySelectorAll('.action-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      const action = this.dataset.action;
      const eventId = this.dataset.eventId;

      switch (action) {
        case 'edit':
          handleEventEdit(eventId);
          break;
        case 'delete':
          handleEventDelete(eventId);
          break;
      }
    });
  });
}

function handleEventEdit(eventId) {
  alert(`Editar evento ID: ${eventId}`);
  // Aqui você pode adicionar a lógica para redirecionar para a página de edição
  // window.location.href = `editarEvento.html?id=${eventId}`;
}

function handleEventDelete(eventId) {
  if (
    confirm(
      'Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.'
    )
  ) {
    // Aqui você pode adicionar a chamada para a API para deletar o evento
    alert(`Evento ID: ${eventId} foi excluído com sucesso!`);

    const rows = document.querySelectorAll('.table-row');
    const targetRow = rows[eventId - 1];

    if (targetRow) {
      targetRow.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => {
        targetRow.remove();

        const remainingRows = document.querySelectorAll('.table-row');
        if (remainingRows.length === 0) {
          const table = document.querySelector('.table');
          const emptyState = document.querySelector('.empty-state');
          if (table) table.style.display = 'none';
          if (emptyState) emptyState.style.display = 'block';
        }
      }, 300);
    }
  }
}

// Inicialização de todas as funcionalidades
document.addEventListener('DOMContentLoaded', () => {
  // Carrega o header em todas as páginas
  loadHeader();

  // Inicializa todas as funcionalidades
  setupImageUpload();
  setupCreateEventForm();
  setupEventFilters();
  setupEventDetails();
  setupEventManagement();
});
