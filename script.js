// Lista de cidades
const cities = [
    "Araruama", "Armação dos Búzios", "Arraial do Cabo", "Cabo Frio", "Casimiro de Abreu",
    "Iguaba Grande", "Maricá", "Rio Bonito", "Rio das Ostras", "São Pedro da Aldeia",
    "Saquarema", "Silva Jardim", "Aperibé", "Cambuci", "Campos dos Goytacazes",
    "Cardoso Moreira", "Itaperuna", "Laje do Muriaé", "Natividade", "São Francisco de Itabapoana",
    "São João da Barra", "São José de Ubá", "Bom Jesus do Itabapoana", "Carapebus", "Conceição de Macabu",
    "Italva", "Itaocara", "Macaé", "Miracema", "Porciúncula", "Quissamã", "Santo Antônio de Pádua",
    "São Fidélis", "Varre-sai", "Areal", "Cantagalo", "Duas Barras", "São José do Vale do Rio Preto",
    "São Sebastião do Alto", "Sumidouro", "Teresópolis", "Bom Jardim", "Cachoeiras de Macacu",
    "Carmo", "Cordeiro", "Macuco", "Nova Friburgo", "Petrópolis", "Santa Maria Madalena", "Trajano de Moraes"
];

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    setupCitySystem();
});

function setupCitySystem() {
    // Configurar campo de múltiplas cidades (P9 - Local de publicação)
    const inputP9 = document.getElementById('p9');
    if (inputP9) {
        inputP9.addEventListener('input', function() {
            showSuggestions(this, true);
        });
    }
    
    // Configurar campo de uma cidade (P10 - Base)
    const inputP10 = document.getElementById('p10');
    if (inputP10) {
        inputP10.addEventListener('input', function() {
            showSuggestions(this, false);
        });
    }
}

function showSuggestions(input, isMultiple) {
    const searchText = input.value.toLowerCase();
    
    // Filtrar cidades
    const filteredCities = cities.filter(city => 
        city.toLowerCase().includes(searchText)
    );
    
    // Criar ou limpar container de sugestões
    let suggestionsContainer = input.nextElementSibling;
    if (!suggestionsContainer || !suggestionsContainer.classList.contains('suggestions')) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'suggestions';
        input.parentNode.insertBefore(suggestionsContainer, input.nextSibling);
    }
    
    suggestionsContainer.innerHTML = '';
    
    // Adicionar cidades filtradas
    filteredCities.forEach(city => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = city;
        
        // Quando clicar na cidade
        item.onclick = function() {
            if (isMultiple) {
                addMultipleCity(city);
            } else {
                selectSingleCity(city);
            }
            suggestionsContainer.style.display = 'none';
            input.value = '';
        };
        
        suggestionsContainer.appendChild(item);
    });
    
    suggestionsContainer.style.display = 'block';
}

function addMultipleCity(city) {
    // Verificar se já existe
    if (document.querySelector(`[data-city="${city}"]`)) return;
    
    // Criar container de cidades selecionadas se não existir
    const container = document.querySelector('#p9').parentNode;
    let selectedContainer = container.querySelector('.selected-cities');
    
    if (!selectedContainer) {
        selectedContainer = document.createElement('div');
        selectedContainer.className = 'selected-cities';
        container.appendChild(selectedContainer);
    }
    
    // Criar tag da cidade
    const tag = document.createElement('div');
    tag.className = 'city-tag';
    tag.setAttribute('data-city', city);
    tag.innerHTML = `${city} <span class="remove">×</span>`;
    
    // Botão para remover
    tag.querySelector('.remove').onclick = function() {
        tag.remove();
        updateMultipleCitiesField();
    };
    
    selectedContainer.appendChild(tag);
    updateMultipleCitiesField();
}

function selectSingleCity(city) {
    const container = document.querySelector('#p10').parentNode;
    let selectedContainer = container.querySelector('.selected-city');
    
    if (!selectedContainer) {
        selectedContainer = document.createElement('div');
        selectedContainer.className = 'selected-city';
        container.appendChild(selectedContainer);
    }
    
    selectedContainer.innerHTML = `${city} <span class="remove">×</span>`;
    selectedContainer.style.display = 'block';
    
    // Botão para remover
    selectedContainer.querySelector('.remove').onclick = function() {
        selectedContainer.style.display = 'none';
        document.querySelector('input[name="base"]').value = '';
    };
    
    // Atualizar campo do formulário
    document.querySelector('input[name="base"]').value = city;
}

function updateMultipleCitiesField() {
    const tags = document.querySelectorAll('.city-tag');
    const selectedCities = Array.from(tags).map(tag => 
        tag.getAttribute('data-city')
    );
    document.querySelector('input[name="local"]').value = selectedCities.join(', ');
}

// Esconder sugestões quando clicar fora
document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('input')) {
        document.querySelectorAll('.suggestions').forEach(s => {
            s.style.display = 'none';
        });
    }
});



// Seleciona todos os radio buttons da editoria primária
const radiosPrimaria = document.querySelectorAll('input[name="primaria"]')
const checkboxesSecundaria = document.querySelectorAll('input[name="secundaria[]"]')

// Adiciona evento de mudança para cada radio button
radiosPrimaria.forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.checked) {
      // Valor selecionado na primária
      const valorSelecionado = this.value

      // Desmarca todos os checkboxes primeiro
      checkboxesSecundaria.forEach((checkbox) => {
        checkbox.checked = false
      })

      // Marca os checkboxes que NÃO são o valor selecionado
      checkboxesSecundaria.forEach((checkbox) => {
        if (checkbox.value !== valorSelecionado) {
          checkbox.checked = true
        }
      })
    } else {
      checkboxesSecundaria.forEach((checkbox) => {
        checkbox.checked = false
      })
    }
  })
})

// Opcional: Impede que o usuário mude manualmente a seleção secundária
checkboxesSecundaria.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    // Verifica se há uma seleção na primária
    const primariaSelecionada = document.querySelector('input[name="primaria"]:checked')

    if (primariaSelecionada) {
      // Impede a mudança manual
      e.preventDefault()

      // Reaplica a lógica
      checkboxesSecundaria.forEach((cb) => {
        cb.checked = cb.value !== primariaSelecionada.value
      })
    }
  })
})

// Permitir desmarcar radio buttons ao clicar novamente
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("click", function (e) {
    if (this.wasChecked) {
      this.checked = false

      // Se for um radio da editoria primária, desmarca as secundárias
      if (this.name === "primaria") {
        checkboxesSecundaria.forEach((checkbox) => {
          checkbox.checked = false
        })
      }
    }
    this.wasChecked = this.checked
  })
})
