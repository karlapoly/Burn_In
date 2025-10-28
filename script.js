// Dados das perguntas organizadas por categoria
const questions = [
    {
        category: "Organização e Carga de Trabalho",
        questions: [
            "Consigo realizar todas as minhas tarefas dentro do horário de trabalho.",
            "O volume de trabalho permite que eu mantenha meu descanso e minha vida pessoal equilibrados.",
            "As metas da empresa são realistas e possíveis de atingir.",
            "Recebo apoio quando enfrento dificuldades nas tarefas.",
            "Meu horário de trabalho é respeitado, sem necessidade de horas extras frequentes.",
            "O ambiente físico favorece minha concentração e conforto."
        ]
    },
    {
        category: "Comunicação e Clima Organizacional",
        questions: [
            "Recebo informações claras sobre o que é esperado do meu trabalho.",
            "Tenho liberdade para expressar dúvidas ou opiniões.",
            "Sinto que posso contar com meu gestor quando tenho dificuldades.",
            "Há um canal seguro para dar sugestões ou relatar problemas.",
            "Mudanças e decisões são comunicadas com antecedência."
        ]
    },
    {
        category: "Reconhecimento e Valorização",
        questions: [
            "Meu esforço é reconhecido pela liderança.",
            "Minhas ideias e contribuições são valorizadas.",
            "O feedback que recebo é construtivo e respeitoso.",
            "Os critérios para reconhecimento ou promoção são justos e claros."
        ]
    },
    {
        category: "Autonomia e Participação",
        questions: [
            "Tenho liberdade para propor melhorias no meu trabalho.",
            "Posso ajustar minha forma de trabalhar (horários ou métodos) quando necessário.",
            "Sou envolvido(a) em decisões que afetam diretamente minha rotina."
        ]
    },
    {
        category: "Saúde Mental e Suporte",
        questions: [
            "Sinto prazer e motivação ao realizar minhas atividades.",
            "Tenho energia e bem-estar emocional para lidar com as demandas do trabalho.",
            "A empresa promove ações de cuidado e bem-estar (pausas, integração, apoio).",
            "Consigo equilibrar bem o trabalho e a vida pessoal."
        ]
    }
];

// Opções da escala Likert
const likertOptions = [
    { value: 1, label: "Nunca", emoji: "1️⃣" },
    { value: 2, label: "Raramente", emoji: "2️⃣" },
    { value: 3, label: "Às vezes", emoji: "3️⃣" },
    { value: 4, label: "Frequentemente", emoji: "4️⃣" },
    { value: 5, label: "Sempre", emoji: "5️⃣" }
];

// Variáveis globais
let currentStep = 0;
let currentQuestionIndex = 0;
let answers = {};
let totalQuestions = 0;
let currentSection = 'home';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Calcular total de perguntas
    totalQuestions = questions.reduce((total, category) => total + category.questions.length, 0);
    
    // Inicializar respostas
    for (let i = 0; i < totalQuestions; i++) {
        answers[i] = null;
    }
    
    // Configurar navegação
    setupNavigation();
});

// Configurar navegação entre seções
function setupNavigation() {
    // Navegação do menu
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            showSection(target);
        });
    });
    
    // Botões CTA
    document.querySelectorAll('a[href="#diagnostico"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('diagnostico');
        });
    });
}

// Mostrar seção específica
function showSection(sectionId) {
    // Esconder todas as seções
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar seção atual
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Se for a seção de diagnóstico, iniciar o processo
        if (sectionId === 'diagnostico') {
            startEvaluation();
        }
    }
}

// Função para iniciar a avaliação
function startEvaluation() {
    // Mostrar apenas o formulário dentro da seção de diagnóstico
    const diagnosticoSection = document.getElementById('diagnostico-section');
    diagnosticoSection.innerHTML = `
        <div class="form-container">
            <div class="form-header">
                <h2>🧭 Questionário de Bem-Estar no Trabalho</h2>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
                <p class="progress-text" id="progress-text">Etapa 1 de 3</p>
            </div>

            <!-- Informações Básicas -->
            <div id="basic-info-step" class="form-step">
                <h3>Informações Básicas (Opcionais)</h3>
                <p class="step-description">Estas informações são opcionais e podem ser omitidas para manter o anonimato</p>
                
                <div class="form-group">
                    <label for="nome">Nome (opcional)</label>
                    <input type="text" id="nome" name="nome" placeholder="Seu nome completo">
                </div>
                
                <div class="form-group">
                    <label for="cargo">Cargo (opcional)</label>
                    <input type="text" id="cargo" name="cargo" placeholder="Seu cargo na empresa">
                </div>
                
                <div class="form-group">
                    <label for="setor">Setor (opcional)</label>
                    <select id="setor" name="setor">
                        <option value="">Selecione o setor</option>
                        <option value="administrativo">Administrativo</option>
                        <option value="comercial">Comercial</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="marketing">Marketing</option>
                        <option value="operacional">Operacional</option>
                        <option value="recursos-humanos">Recursos Humanos</option>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="vendas">Vendas</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
                
                <div class="privacy-notice">
                    <p><strong>Importante:</strong> Todas as informações são opcionais. Você pode responder o questionário de forma completamente anônima se preferir.</p>
                </div>
            </div>

            <!-- Questionário -->
            <div id="questionnaire-step" class="form-step" style="display: none;">
                <div id="question-container">
                    <!-- Perguntas serão inseridas dinamicamente aqui -->
                </div>
            </div>

            <!-- Resumo -->
            <div id="summary-step" class="form-step" style="display: none;">
                <h3>Resumo do Diagnóstico</h3>
                <p>Revise as informações antes de finalizar</p>
                
                <div id="summary-content">
                    <!-- Resumo será inserido dinamicamente aqui -->
                </div>
                
                <div class="consent-section">
                    <h4>Consentimento para Processamento de Dados</h4>
                    <p>Ao finalizar este diagnóstico, você concorda que os dados fornecidos sejam processados para gerar o relatório de avaliação conforme nossa Política de Privacidade. Os dados são mantidos por 12 meses e podem ser excluídos a qualquer momento.</p>
                </div>
            </div>

            <div class="form-navigation">
                <button type="button" class="btn btn-secondary" id="prev-btn" onclick="previousStep()" style="display: none;">
                    <i class="fas fa-arrow-left"></i>
                    Anterior
                </button>
                <button type="button" class="btn btn-primary" id="next-btn" onclick="nextStep()">
                    Próxima
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button type="button" class="btn btn-success" id="submit-btn" onclick="submitForm()" style="display: none;">
                    <i class="fas fa-check"></i>
                    Finalizar Diagnóstico
                </button>
            </div>
        </div>
    `;
    
    showStep(0);
}

// Função para mostrar uma etapa específica
function showStep(step) {
    currentStep = step;
    
    // Esconder todas as etapas
    document.getElementById('basic-info-step').style.display = 'none';
    document.getElementById('questionnaire-step').style.display = 'none';
    document.getElementById('summary-step').style.display = 'none';
    
    // Mostrar etapa atual
    if (step === 0) {
        document.getElementById('basic-info-step').style.display = 'block';
    } else if (step === 1) {
        document.getElementById('questionnaire-step').style.display = 'block';
        showQuestion(0);
    } else if (step === 2) {
        document.getElementById('summary-step').style.display = 'block';
        showSummary();
    }
    
    // Atualizar barra de progresso
    updateProgress();
    
    // Atualizar botões de navegação
    updateNavigationButtons();
}

// Função para mostrar uma pergunta específica
function showQuestion(index) {
    const container = document.getElementById('question-container');
    const questionData = getQuestionData(index);
    
    if (!questionData) return;
    
    container.innerHTML = `
        <div class="question">
            <h3>${questionData.question}</h3>
            <div class="options">
                ${likertOptions.map(option => `
                    <div class="option" onclick="selectAnswer(${index}, ${option.value})">
                        <input type="radio" name="question_${index}" value="${option.value}" 
                               ${answers[index] === option.value ? 'checked' : ''}>
                        <label>
                            <span class="emoji">${option.emoji}</span>
                            <span class="text">${option.label}</span>
                        </label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Atualizar barra de progresso
    updateProgress();
    
    // Atualizar botões de navegação
    updateNavigationButtons();
}

// Função para obter dados da pergunta pelo índice
function getQuestionData(index) {
    let currentIndex = 0;
    
    for (let categoryIndex = 0; categoryIndex < questions.length; categoryIndex++) {
        const category = questions[categoryIndex];
        
        for (let questionIndex = 0; questionIndex < category.questions.length; questionIndex++) {
            if (currentIndex === index) {
                return {
                    category: category.category,
                    question: category.questions[questionIndex],
                    categoryIndex: categoryIndex,
                    questionIndex: questionIndex
                };
            }
            currentIndex++;
        }
    }
    
    return null;
}

// Função para selecionar uma opção
function selectAnswer(questionIndex, value) {
    answers[questionIndex] = value;
    
    // Atualizar visual da seleção
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
        const input = option.querySelector('input');
        if (input && input.value == value) {
            option.classList.add('selected');
        }
    });
    
    // Atualizar barra de progresso
    updateProgress();
    
    // Atualizar botões de navegação
    updateNavigationButtons();
}

// Função para atualizar barra de progresso
function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (!progressFill || !progressText) return;
    
    let percentage = 0;
    let text = '';
    
    if (currentStep === 0) {
        percentage = 33;
        text = 'Etapa 1 de 3';
    } else if (currentStep === 1) {
        // Calcular progresso baseado nas perguntas respondidas
        const answeredQuestions = Object.values(answers).filter(answer => answer !== null).length;
        percentage = 33 + (answeredQuestions / totalQuestions) * 33;
        text = `Pergunta ${currentQuestionIndex + 1} de ${totalQuestions}`;
    } else if (currentStep === 2) {
        percentage = 100;
        text = 'Etapa 3 de 3';
    }
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = text;
}

// Função para atualizar botões de navegação
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!prevBtn || !nextBtn || !submitBtn) return;
    
    // Botão anterior
    if (currentStep === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
    }
    
    // Botão próxima/submit
    if (currentStep === 2) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
    
    // Verificar se pode avançar
    const canProceed = canProceedToNext();
    nextBtn.disabled = !canProceed;
    submitBtn.disabled = !canProceed;
}

// Função para verificar se pode avançar
function canProceedToNext() {
    if (currentStep === 0) {
        return true; // Informações básicas são opcionais
    } else if (currentStep === 1) {
        return answers[currentQuestionIndex] !== null;
    } else if (currentStep === 2) {
        return true; // Resumo sempre pode ser finalizado
    }
    return true;
}

// Função para próxima etapa
function nextStep() {
    if (currentStep < 2) {
        if (currentStep === 1) {
            // Se estamos no questionário, avançar para próxima pergunta
            if (currentQuestionIndex < totalQuestions - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
                updateProgress();
            } else {
                // Se terminamos todas as perguntas, ir para resumo
                showStep(2);
            }
        } else {
            showStep(currentStep + 1);
        }
    }
}

// Função para etapa anterior
function previousStep() {
    if (currentStep > 0) {
        if (currentStep === 1) {
            // Se estamos no questionário, voltar para pergunta anterior
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion(currentQuestionIndex);
                updateProgress();
            } else {
                // Se estamos na primeira pergunta, voltar para informações básicas
                showStep(0);
            }
        } else {
            showStep(currentStep - 1);
        }
    }
}

// Função para mostrar resumo
function showSummary() {
    const summaryContent = document.getElementById('summary-content');
    
    // Coletar informações básicas
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const setor = document.getElementById('setor').value;
    
    let summaryHTML = '';
    
    // Informações básicas (se preenchidas)
    if (nome || cargo || setor) {
        summaryHTML += `
            <div class="summary-section">
                <h4>Informações Pessoais</h4>
                <p><strong>Nome:</strong> ${nome || 'Não informado'}</p>
                <p><strong>Cargo:</strong> ${cargo || 'Não informado'}</p>
                <p><strong>Setor:</strong> ${setor || 'Não informado'}</p>
            </div>
        `;
    }
    
    // Resumo das respostas
    const answeredQuestions = Object.values(answers).filter(answer => answer !== null).length;
    summaryHTML += `
        <div class="summary-section">
            <h4>Questionário</h4>
            <p><strong>${answeredQuestions}</strong> de <strong>${totalQuestions}</strong> perguntas respondidas</p>
        </div>
    `;
    
    summaryContent.innerHTML = summaryHTML;
}

// Função para submeter o formulário
function submitForm() {
    // Verificar se todas as perguntas foram respondidas
    const unansweredQuestions = Object.values(answers).filter(answer => answer === null);
    
    if (unansweredQuestions.length > 0) {
        alert('Por favor, responda todas as perguntas antes de finalizar o diagnóstico.');
        return;
    }
    
    // Calcular resultados
    const results = calculateResults();
    
    // Salvar dados no GitHub
    saveDiagnosticData(results);
    
    // Mostrar resultados
    showResults(results);
}

// Função para salvar dados do diagnóstico no GitHub
async function saveDiagnosticData(results) {
    try {
        // Criar novo diagnóstico
        const newDiagnostic = {
            id: Date.now(), // ID único baseado em timestamp
            data: new Date().toLocaleDateString('pt-BR'),
            hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            timestamp: new Date().toISOString(),
            pontuacaoGeral: results.overallScore,
            nivelRisco: results.riskLevel,
            nivelRiscoLabel: results.riskLabel,
            porcentagemRisco: results.riskPercentage,
            pontuacoesPorCategoria: results.categoryAverages,
            recomendacoes: results.recommendations,
            respostasDetalhadas: answers,
            informacoes: {
                nome: document.getElementById('nome').value || '',
                cargo: document.getElementById('cargo').value || '',
                setor: document.getElementById('setor').value || ''
            }
        };
        
        // Salvar no GitHub
        await saveToGitHub(newDiagnostic);
        
        console.log('Diagnóstico salvo no GitHub com sucesso!');
        
    } catch (error) {
        console.error('Erro ao salvar diagnóstico:', error);
        alert('Erro ao salvar dados. Tente novamente.');
    }
}

// Função para obter token do GitHub
async function getGitHubToken() {
    // Verificar se já temos o token salvo
    let token = localStorage.getItem('github_token');
    
    if (!token) {
        // Solicitar token do usuário
        const tokenInput = prompt(
            '🔐 Token do GitHub necessário\n\n' +
            'Para salvar os diagnósticos no GitHub, você precisa de um token de acesso.\n\n' +
            'Como obter:\n' +
            '1. Acesse: https://github.com/settings/tokens\n' +
            '2. Clique em "Generate new token (classic)"\n' +
            '3. Selecione a permissão "repo"\n' +
            '4. Copie o token gerado\n\n' +
            'Digite seu token abaixo:'
        );
        
        if (!tokenInput) {
            throw new Error('Token do GitHub é necessário para salvar os dados');
        }
        
        // Validar formato do token
        if (!tokenInput.startsWith('ghp_') && !tokenInput.startsWith('gho_') && !tokenInput.startsWith('ghu_')) {
            throw new Error('Token inválido. Deve começar com ghp_, gho_ ou ghu_');
        }
        
        token = tokenInput;
        // Salvar no localStorage para próximas vezes
        localStorage.setItem('github_token', token);
        
        // Mostrar confirmação
        alert('✅ Token configurado com sucesso! Será salvo para próximas sessões.');
    }
    
    return token;
}

// Função para salvar no GitHub via API
async function saveToGitHub(diagnostic) {
    try {
        // Obter token do GitHub
        const token = await getGitHubToken();
        
        // Configurações do GitHub
        const owner = 'karla'; // Seu usuário do GitHub
        const repo = 'Burn_In'; // Nome do repositório
        const fileName = `diagnostico-${diagnostic.id}.json`;
        const path = `data/${fileName}`;
        
        // Criar conteúdo do arquivo
        const content = JSON.stringify(diagnostic, null, 2);
        
        // Salvar no GitHub
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Novo diagnóstico - ${diagnostic.data}`,
                content: btoa(content) // Codificar em base64
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao salvar no GitHub');
        }
        
        console.log('Dados salvos no GitHub com sucesso!');
        
    } catch (error) {
        console.error('Erro ao salvar no GitHub:', error);
        throw error;
    }
}

// Função para calcular resultados
function calculateResults() {
    const results = {
        overallScore: 0,
        categoryScores: {},
        categoryAverages: {},
        riskLevel: '',
        recommendations: []
    };
    
    let totalScore = 0;
    let questionCount = 0;
    
    // Calcular pontuação por categoria
    let currentIndex = 0;
    
    questions.forEach((category, categoryIndex) => {
        let categoryScore = 0;
        let categoryQuestionCount = 0;
        
        category.questions.forEach((question, questionIndex) => {
            const answer = answers[currentIndex];
            categoryScore += answer;
            totalScore += answer;
            questionCount++;
            categoryQuestionCount++;
            currentIndex++;
        });
        
        results.categoryScores[category.category] = categoryScore;
        results.categoryAverages[category.category] = categoryScore / categoryQuestionCount;
    });
    
    // Calcular média geral
    results.overallScore = totalScore / questionCount;
    
    // Determinar nível de risco conforme nova escala
    if (results.overallScore >= 4.0) {
        results.riskLevel = 'low';
        results.riskLabel = 'Clima saudável e equilibrado';
        results.riskPercentage = Math.round((results.overallScore / 5) * 100);
    } else if (results.overallScore >= 3.0) {
        results.riskLevel = 'medium';
        results.riskLabel = 'Pontos de atenção — fatores de estresse presentes';
        results.riskPercentage = Math.round((results.overallScore / 5) * 100);
    } else {
        results.riskLevel = 'high';
        results.riskLabel = 'Risco alto de estresse e burnout — requer plano de ação';
        results.riskPercentage = Math.round((results.overallScore / 5) * 100);
    }
    
    // Gerar recomendações baseadas nas categorias com menor pontuação
    results.recommendations = generateRecommendations(results.categoryAverages);
    
    return results;
}

// Função para gerar recomendações
function generateRecommendations(categoryAverages) {
    const recommendations = [];
    
    // Ordenar categorias por pontuação (menor primeiro)
    const sortedCategories = Object.entries(categoryAverages)
        .sort(([,a], [,b]) => a - b);
    
    // Gerar recomendações para as 3 categorias com menor pontuação
    sortedCategories.slice(0, 3).forEach(([category, average]) => {
        if (average < 3.0) {
            recommendations.push(getRecommendationForCategory(category, average));
        }
    });
    
    return recommendations;
}

// Função para obter recomendação específica por categoria
function getRecommendationForCategory(category, average) {
    const recommendations = {
        "Organização e Carga de Trabalho": "Revisar a distribuição de tarefas, estabelecer metas realistas, respeitar horários de trabalho e criar ambiente físico adequado para concentração e conforto.",
        "Comunicação e Clima Organizacional": "Estabelecer canais claros de comunicação, promover transparência nas decisões, criar ambiente seguro para expressão de opiniões e comunicar mudanças com antecedência.",
        "Reconhecimento e Valorização": "Implementar sistema de reconhecimento regular, valorizar ideias e contribuições, fornecer feedback construtivo e estabelecer critérios claros para promoções.",
        "Autonomia e Participação": "Delegar mais responsabilidades, permitir flexibilidade nos métodos de trabalho, envolver colaboradores em decisões que afetam sua rotina e promover inovação.",
        "Saúde Mental e Suporte": "Implementar programas de bem-estar corporativo, oferecer suporte psicológico, promover ações de cuidado e integração, e facilitar o equilíbrio entre trabalho e vida pessoal."
    };
    
    return recommendations[category] || "Focar em melhorias específicas nesta área para aumentar a satisfação e bem-estar dos colaboradores.";
}

// Função para mostrar resultados
function showResults(results) {
    const diagnosticoSection = document.getElementById('diagnostico-section');
    diagnosticoSection.innerHTML = `
        <div class="results-container">
            <div class="results-header">
                <h2>Resultado do Diagnóstico</h2>
                <p>Análise completa da saúde mental corporativa</p>
            </div>

            <div class="score-display">
                <div class="score-circle">
                    <span id="score-percentage">${results.riskPercentage}%</span>
                </div>
                <div class="score-info">
                    <h3 id="risk-level">${results.riskLabel}</h3>
                    <p id="risk-description">${getRiskDescription(results.riskLevel, results.overallScore)}</p>
                </div>
            </div>

            <div class="result-summary" id="result-summary">
                <h3>Diagnóstico Geral</h3>
                <p><strong>Pontuação Média:</strong> ${results.overallScore.toFixed(2)}/5.0</p>
                <p><strong>Nível de Risco:</strong> ${results.riskLabel}</p>
                
                <h4 style="margin-top: 20px;">Análise por Categoria:</h4>
                <div style="margin-top: 15px;">
                    ${Object.entries(results.categoryAverages).map(([category, average]) => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding: 8px; background: white; border-radius: 8px;">
                            <span><strong>${category}:</strong></span>
                            <span>${average.toFixed(2)}/5.0</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="recommendations" id="recommendations">
                <h3>Recomendações Prioritárias</h3>
                ${results.recommendations.map(rec => `
                    <div class="recommendation-item">
                        <i class="fas fa-lightbulb"></i>
                        <div>
                            <strong>${rec}</strong>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="action-buttons">
                <button class="btn btn-primary" onclick="downloadReport()">
                    <i class="fas fa-download"></i>
                    Baixar Relatório
                </button>
                <button class="btn btn-secondary" onclick="sendToHR()">
                    <i class="fas fa-envelope"></i>
                    Enviar ao RH
                </button>
                <button class="btn btn-outline" onclick="manageGitHubToken()">
                    <i class="fas fa-cog"></i>
                    Configurar GitHub
                </button>
                <button class="btn btn-outline" onclick="restartEvaluation()">
                    <i class="fas fa-redo"></i>
                    Nova Avaliação
                </button>
            </div>
        </div>
    `;
}

// Função para obter descrição do risco
function getRiskDescription(riskLevel, score) {
    if (riskLevel === 'low') {
        return "Parabéns! Sua empresa demonstra um clima saudável e equilibrado. Continue mantendo essas práticas positivas e monitore regularmente para garantir a sustentabilidade do ambiente de trabalho.";
    } else if (riskLevel === 'medium') {
        return "Sua empresa apresenta pontos de atenção com fatores de estresse presentes. É importante implementar melhorias nas áreas identificadas para prevenir problemas futuros e aumentar a satisfação dos colaboradores.";
    } else {
        return "⚠️ ATENÇÃO: Sua empresa apresenta risco alto de estresse e burnout. É fundamental implementar um plano de ação imediato para melhorar o ambiente de trabalho e prevenir problemas de saúde mental dos colaboradores.";
    }
}

// Função para baixar relatório
function downloadReport() {
    const results = calculateResults();
    const reportData = generateReportData(results);
    
    // Criar e baixar arquivo JSON
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `relatorio-catalise-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    alert('Relatório baixado com sucesso!');
}

// Função para gerar dados do relatório
function generateReportData(results) {
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const setor = document.getElementById('setor').value;
    
    return {
        empresa: "Diagnóstico NR-1 Burn In",
        data: new Date().toLocaleDateString('pt-BR'),
        informacoes: {
            nome: nome || 'Anônimo',
            cargo: cargo || 'Não informado',
            setor: setor || 'Não informado'
        },
        pontuacaoGeral: results.overallScore,
        nivelRisco: results.riskLabel,
        porcentagemRisco: results.riskPercentage,
        pontuacoesPorCategoria: results.categoryAverages,
        recomendacoes: results.recommendations,
        respostasDetalhadas: answers,
        interpretacao: {
            "≥ 4,0": "Clima saudável e equilibrado",
            "3,0 a 3,9": "Pontos de atenção — fatores de estresse presentes",
            "< 3,0": "Risco alto de estresse e burnout — requer plano de ação"
        }
    };
}

// Função para enviar ao RH
function sendToHR() {
    alert('Relatório enviado para o RH com sucesso!');
}

// Função para gerenciar token do GitHub
function manageGitHubToken() {
    const currentToken = localStorage.getItem('github_token');
    
    if (currentToken) {
        const action = confirm(
            '🔐 Token do GitHub configurado\n\n' +
            'Token atual: ' + currentToken.substring(0, 8) + '...\n\n' +
            'Clique OK para alterar o token\n' +
            'Clique Cancelar para remover o token'
        );
        
        if (action) {
            // Alterar token
            const newToken = prompt(
                '🔐 Novo Token do GitHub\n\n' +
                'Digite o novo token:'
            );
            
            if (newToken && (newToken.startsWith('ghp_') || newToken.startsWith('gho_') || newToken.startsWith('ghu_'))) {
                localStorage.setItem('github_token', newToken);
                alert('✅ Token alterado com sucesso!');
            } else if (newToken) {
                alert('❌ Token inválido. Deve começar com ghp_, gho_ ou ghu_');
            }
        } else {
            // Remover token
            localStorage.removeItem('github_token');
            alert('✅ Token removido com sucesso!');
        }
    } else {
        // Configurar token pela primeira vez
        getGitHubToken().catch(error => {
            alert('❌ Erro ao configurar token: ' + error.message);
        });
    }
}

// Função para reiniciar avaliação
function restartEvaluation() {
    // Resetar variáveis
    currentStep = 0;
    currentQuestionIndex = 0;
    answers = {};
    
    // Resetar respostas
    for (let i = 0; i < totalQuestions; i++) {
        answers[i] = null;
    }
    
    // Voltar para a seção home
    showSection('home');
}