# Burn In - Diagnóstico NR-1

##  Sobre o Projeto

O **Burn In** é uma ferramenta completa de diagnóstico empresarial para identificação de riscos psicossociais e cumprimento da Norma Regulamentadora NR-1. A solução oferece uma análise abrangente do ambiente de trabalho através de questionários estruturados e geração de relatórios automáticos.

## Funcionalidades Implementadas

### Landing Page
- Hero section com texto exato sobre NR-1
- Seção "Por que isso importa?" destacando a obrigação legal
- Design responsivo e moderno
- Meta tags para SEO

### Formulário Multi-etapas
- **Etapa 1**: Informações básicas opcionais (nome, cargo, setor)
- **Etapa 2**: Questionário completo com 22 perguntas organizadas em 5 categorias
- **Etapa 3**: Resumo e confirmação antes do envio
- Navegação intuitiva com barra de progresso
- Escala Likert de 1 a 5 (Nunca → Sempre)

### Sistema de Pontuação
- Cálculo automático por categoria e geral
- Classificação de risco com cores:
  - 🟢 **≤ 2,5**: Práticas Saudáveis (Verde)
  - 🟡 **2,6 a 3,5**: Pontos de Atenção (Amarelo)
  - 🔴 **≥ 3,6**: Alto Risco de Burnout (Vermelho)

### Página de Resultados
- Visualização da pontuação geral
- Análise detalhada por categoria
- Recomendações personalizadas baseadas nas áreas com menor pontuação
- Download do relatório em JSON
- Opção de envio ao RH

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo com animações
- **JavaScript**: Lógica de avaliação e cálculos
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter + Lora

## Estrutura do Projeto

```
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── README.md           # Documentação
└── .gitignore          # Arquivos ignorados pelo Git
```

## Dados de Demonstração

O sistema inclui:
- 22 perguntas organizadas em 5 categorias
- Sistema de pontuação automático
- Recomendações baseadas nas áreas com menor pontuação
- Relatório completo em CSV

## Privacidade e Conformidade

- **LGPD**: Política de privacidade incluída
- **Anonimato**: Informações pessoais são opcionais
- **Retenção**: Dados mantidos por 12 meses
- **Exclusão**: Possibilidade de exclusão a qualquer momento

## Suporte

Para dúvidas ou suporte:
- E-mail: contato@burnin.com.br
- Telefone: (11) 99999-9999

## Licença

Este projeto está sob a licença CATALISE. Veja o arquivo LICENSE para mais detalhes.