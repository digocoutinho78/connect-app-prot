PROTÓTIPO – CONNECT d1000 (REFATORAÇÃO UX)

Crie um protótipo mobile (iOS first, responsivo para Android) para o aplicativo CONNECT d1000, um app B2B voltado para representantes da indústria farmacêutica.

Objetivo do projeto:
Modernizar interface, melhorar performance percebida, reduzir fricção cognitiva e tornar a navegação mais rápida e intuitiva para usuários com pouco tempo disponível e foco em dados estratégicos.

A proposta deve seguir princípios de UX voltados para:

Clareza imediata

Hierarquia visual forte

Redução de carga cognitiva

Feedback constante do sistema

Navegação rasa (máximo 2 níveis)

🎨 DIRETRIZES VISUAIS

Fonte:
Utilizar Lato (Google Fonts)

Títulos: Lato Bold

Subtítulos: Lato SemiBold

Corpo: Lato Regular

Auxiliar: Lato Light

Estilo:

Corporativo, limpo, moderno

Muito espaço em branco

Destaque visual para números estratégicos

Ícones simples e consistentes

Interface objetiva, sem excesso decorativo

Cores:

Azul como cor primária

Verde para status positivo

Vermelho para erro

Cinza neutro para informações secundárias

Fundo predominantemente branco

🧭 ESTRUTURA DE NAVEGAÇÃO

Arquitetura principal:

Splash

Login

Ativação (quando necessário)

Seleção de Bandeira

Home

Lojas

Produtos por Loja

Produto Detalhe

Estoque

Vendas (Normal / PBM / Anual)

Onde Tem

Sugestão

Mapa

Fale Conosco

Menu lateral:

Lojas

Produtos

Favoritos

Mapa de Lojas

Fale Conosco

Perfil / Configurações

Bottom Navigation (quando dentro de produto):

Estoque

Vendas

Onde Tem

📱 FLUXO COMPLETO DAS TELAS
1️⃣ SPLASH

Tela simples com:

Logo centralizada

Fundo branco

Indicador discreto de loading

UX:
Exibir mensagem pequena abaixo do loading:
“Verificando acesso…”

Se houver erro de conexão:
Mostrar estado com botão “Tentar novamente”.

2️⃣ LOGIN

Elementos:

Logo no topo

Campo Usuário

Campo Senha

Botão primário: ENTRAR

Link secundário: Esqueci minha senha

Opção biometria (Face ID / Digital)

UX:

Botão desabilitado até preencher campos

Feedback imediato de erro

Loading no botão ao autenticar

Mensagem clara se credenciais inválidas

3️⃣ ACESSO EXPIRADO

Título forte:
“Seu acesso está expirado”

Texto explicativo simples:
“Solicite um novo código para continuar.”

Botões:

Solicitar Código (primário)

Campo para inserir código

Ativar (primário)

Estados:

Código inválido (erro em vermelho)

Código válido → Tela de sucesso

Tela sucesso:
✔ Ativado com sucesso
Botão: Continuar

UX:
Processo deve ser guiado e simples. Nunca bloquear sem explicar.

4️⃣ SELEÇÃO DE BANDEIRA

Título:
Selecione uma bandeira

Exibir cards grandes clicáveis:

Drogasmil

Farmalife

Tamoio

Rosário

UX:
Cards bem espaçados, toque confortável.
Ao selecionar, feedback visual imediato.

5️⃣ HOME

Header:
Logo da bandeira + CONNECT d1000
Ícone perfil
Ícone notificações

Cards principais:

Lojas

Produtos

Favoritos

Mapa de Lojas

Fale Conosco

UX:
Botões grandes.
Ícone + título.
Foco em clareza.
Nada de excesso de informação.

6️⃣ LOJAS

Header azul com título LOJAS

Campo busca:
Placeholder:
“Bairro, Loja ou Cidade / UF”

Filtros segmentados:

Bairro

Loja

Cidade / UF

Estado vazio:
Ilustração simples + instrução clara.

Resultado:
Lista com cards contendo:

Nome loja

Distância

Código

Telefone

Regional

Endereço

UX:
Lista escaneável.
Nome em destaque.
Informações secundárias mais leves.

Toque leva para:
Produtos da loja.

7️⃣ PRODUTOS POR LOJA

Header:
Nome da loja

Campo busca:
“Nome do Produto”

Resultado:
Lista com:

Imagem pequena do produto

Nome

Quantidade disponível

UX:
Quantidade visível e destacada.
Feedback rápido ao buscar.
Persistir último filtro utilizado.

Bottom Navigation:

Estoque

Vendas

8️⃣ PRODUTO DETALHE

Topo:
Imagem produto
Nome produto
Ícone favorito (estrela)

Informações da loja:

Distância

Código

Telefone

Regional

Endereço

Card principal:
Quantidade atual (número grande, visualmente dominante)

Botão primário:
“Sugerir Valor ou Faceamento”

Bottom Navigation:

Estoque

Vendas

Onde Tem

UX:
Foco no número.
Hierarquia clara.
Informações agrupadas.

9️⃣ VENDAS

Tabs segmentadas:

Normal

PBM

Anual

Gráfico:
Barras dos últimos 12 meses.

Tabela abaixo:

Mês

Vendas Normal

Vendas PBM ou Ano Anterior

UX:
Gráfico simples.
Legenda clara.
Número sempre legível.
Mostrar timestamp:
“Atualizado às HH:MM”.

🔟 ONDE TEM

Alternância:

Lista

Mapa

Lista:

Loja

Quantidade

Indicador visual de destaque

Mapa:

Pins agrupados (cluster)

Zoom automático

Botão centralizar localização

UX:
Evitar excesso visual.
Cluster inteligente para evitar sobreposição.

1️⃣1️⃣ SUGESTÃO

Título:
Sugestão

Mostrar:
Produto
Quantidade atual

Campo:
Nova quantidade
Observação

Botões:

Salvar (primário)

Cancelar (secundário)

UX:
Validação clara.
Toast de sucesso:
“Sugestão enviada com sucesso”.

1️⃣2️⃣ MAPA DE LOJAS

Mapa full screen.
Pins com cluster.
Botão centralizar localização.

UX:
Interação fluida.
Zoom suave.
Feedback visual ao selecionar loja.

1️⃣3️⃣ FALE CONOSCO

Campos:

Assunto

Loja

Produto

Mensagem

Botão:
Enviar

Estados:

Campo obrigatório destacado

Sucesso

Erro envio

UX:
Formulário simples.
Sem excesso de campos.

🎛 COMPONENTES REUTILIZÁVEIS

Criar como componentes no Figma:

Botão primário

Botão secundário

Input padrão

Input erro

Card Loja

Card Produto

Tab segmentada

Badge numérica

Toast feedback

Header padrão

Bottom Navigation

🔄 ESTADOS GLOBAIS

Criar variações para:

Loading

Erro API

Sem conexão

Sem resultados

Sessão expirada

Atualização em tempo real

🎯 PRINCÍPIOS UX PRIORITÁRIOS

Reduzir cliques desnecessários

Mostrar dados antes de pedir ação

Nunca deixar o usuário sem feedback

Destacar números estratégicos

Manter consistência visual e comportamental

Minimizar esforço cognitivo

O protótipo deve transmitir:
Rapidez, confiança e clareza operacional.