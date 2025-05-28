# 🎨 Gerador de Paletas de Cores

Um gerador moderno e responsivo de paletas de cores construído com Next.js, React e Tailwind CSS. Gere paletas vibrantes, copie códigos HEX facilmente e bloqueie suas cores favoritas!

## ✨ Funcionalidades

- **🎲 Geração Aleatória**: Gere paletas com 5 cores vibrantes aleatórias
- **📋 Cópia Fácil**: Clique em qualquer cor para copiar o código HEX
- **🔒 Bloqueio de Cores**: Bloqueie cores favoritas para mantê-las na próxima geração
- **📱 Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **⚡ Performance**: Otimizado para carregamento rápido
- **🌐 Deploy Automático**: Configurado para GitHub Pages

## 🚀 Como Usar

1. **Visualizar Cores**: A página carrega com 5 cores aleatórias
2. **Copiar HEX**: Clique em qualquer cartão de cor para copiar o código HEX
3. **Gerar Nova Paleta**: Use o botão "Nova Paleta" para gerar novas cores
4. **Bloquear Cores**: Passe o mouse sobre uma cor e clique no ícone de cadeado para bloqueá-la
5. **Cores Bloqueadas**: Cores bloqueadas não mudam ao gerar nova paleta

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca de interface do usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de CSS utilitário
- **Shadcn/UI** - Componentes de interface modernos
- **Lucide React** - Ícones SVG
- **Clipboard API** - Para copiar códigos HEX

## 📦 Instalação e Execução Local

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

1. **Clone o repositório**
\`\`\`bash
git clone https://github.com/SUA_ORGANIZACAO/color-palette-generator.git
cd color-palette-generator
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

3. **Execute em modo de desenvolvimento**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

4. **Acesse no navegador**
Abra [http://localhost:3000](http://localhost:3000)

## 🚀 Deploy no GitHub Pages

### Configuração Automática

Este projeto está configurado para deploy automático no GitHub Pages usando GitHub Actions.

### Passos para Deploy

1. **Fork ou Clone o Repositório**
\`\`\`bash
git clone https://github.com/SUA_ORGANIZACAO/color-palette-generator.git
\`\`\`

2. **Configure o Repositório no GitHub**
   - Vá para Settings > Pages
   - Source: "GitHub Actions"
   - O workflow será executado automaticamente

3. **Personalize o Base Path** (se necessário)
   - Edite \`next.config.mjs\`
   - Altere \`color-palette-generator\` para o nome do seu repositório

4. **Push para Main Branch**
\`\`\`bash
git add .
git commit -m "Deploy inicial"
git push origin main
\`\`\`

5. **Acesse seu Site**
   - URL: \`https://SUA_ORGANIZACAO.github.io/color-palette-generator/\`

### Deploy Manual

Para build manual:

\`\`\`bash
# Build para produção
npm run build

# Os arquivos estarão na pasta 'out/'
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
color-palette-generator/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── components/
│   └── ui/                  # Componentes shadcn/ui
├── hooks/                   # Hooks customizados
├── lib/                     # Utilitários
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions
├── next.config.mjs          # Configuração Next.js
├── package.json             # Dependências
├── tailwind.config.ts       # Configuração Tailwind
├── tsconfig.json           # Configuração TypeScript
└── README.md               # Este arquivo
\`\`\`

## 🎨 Personalização

### Cores do Tema
Edite \`app/globals.css\` para personalizar as cores do tema:

\`\`\`css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96%;
  /* ... outras variáveis */
}
\`\`\`

### Algoritmo de Cores
Modifique a função \`generateRandomColor\` em \`app/page.tsx\` para diferentes algoritmos:

\`\`\`typescript
const generateRandomColor = (): string => {
  // Seu algoritmo personalizado aqui
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}
\`\`\`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo \`LICENSE\` para mais detalhes.

## 🐛 Problemas Conhecidos

- **Clipboard API**: Requer HTTPS em produção (GitHub Pages fornece automaticamente)
- **Cores Muito Claras**: Algumas cores muito claras podem ter baixo contraste

## 🔮 Próximas Funcionalidades

- [ ] Exportar paleta como imagem
- [ ] Histórico de paletas geradas
- [ ] Paletas baseadas em harmonia de cores
- [ ] Modo escuro
- [ ] Compartilhamento de paletas via URL

## 📞 Suporte

Se encontrar problemas ou tiver sugestões:

1. Abra uma [Issue](https://github.com/SUA_ORGANIZACAO/color-palette-generator/issues)
2. Envie um Pull Request
3. Entre em contato via [email](mailto:seu-email@exemplo.com)

---

**Feito com ❤️ e muito ☕**
\`\`\`
\`\`\`

Criei um **Gerador de Paletas de Cores** completo com todas as funcionalidades solicitadas! 🎨

## ✨ Principais Características:

### 🎯 Funcionalidades Implementadas:
- **5 cartões de cores** com códigos HEX aleatórios
- **Botão "Nova Paleta"** para gerar novas cores
- **Clique para copiar** códigos HEX (com feedback visual)
- **Sistema de bloqueio** de cores (ícone de cadeado)
- **Design responsivo** e moderno

### 🚀 Configuração Técnica:
- **Next.js 14** com App Router
- **Exportação estática** otimizada
- **GitHub Actions** para deploy automático
- **Configuração completa** para GitHub Pages
- **Base path** configurável para organizações

### 🎨 Design e UX:
- **Interface em português**
- **Cores vibrantes** e contrastantes
- **Transições suaves** e efeitos hover
- **Feedback visual** para todas as ações
- **Responsivo** para todos os dispositivos

### 📦 Arquivos Incluídos:
- ✅ `next.config.mjs` - Configuração para exportação estática
- ✅ `.github/workflows/deploy.yml` - GitHub Actions
- ✅ `package.json` - Dependências e scripts
- ✅ `README.md` - Instruções completas
- ✅ Estrutura completa do projeto
