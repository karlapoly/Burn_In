# Configuração do Sistema de Salvamento

### **Sistema Web Completo:**
- **Usuário responde** via web
- **Dados salvos** diretamente no GitHub
- **Sem banco de dados** necessário

### **Como Funciona:**
1. **Usuário completa** diagnóstico no site
2. **Dados são salvos** automaticamente no GitHub
3. **Você acessa** os dados via senha `admin2024`
4. **Exporta Excel** com todos os diagnósticos

## **Configuração Necessária:**

### **1. Token do GitHub:**
Você precisa criar um token de acesso para o GitHub:

1. **Acesse**: https://github.com/settings/tokens
2. **Clique**: "Generate new token" → "Generate new token (classic)"

### **2. Configurar no Código:**
No arquivo `script.js`, linha 663, substitua:
```javascript
'Authorization': 'token ghp_your_token_here'
```
Por:
```javascript
'Authorization': 'token SEU_TOKEN_AQUI'
```
## **Estrutura Final:**
```
Burn_In/
├── data/
│   ├── diagnostico-1703123456789.json
│   ├── diagnostico-1703123456790.json
│   └── ...
├── index.html
├── script.js
└── styles.css
```

### **Administrador:**
1. Acessa o site
2. **Triple click** no logo "Burn In"
3. Digita senha: `admin2024`
4. Clica "Exportar Todos os Dados"
5. Baixa Excel com todos os diagnósticos

## **Segurança:**
- **Senha**: `admin2024` para acessar dados
- **Token**: Mantenha secreto (não compartilhe)
- **Dados**: Salvos no seu GitHub privado

