# Guia de Direção de Arte - Dice & Cards Era

> **Conceito Central**: "Pergaminho & Aço"
> Interface que parece um livro de estratégia medieval interativo, com elementos de metal envelhecido e pergaminho antigo.

---

## 1. Paleta de Cores

### 1.1 Backgrounds

| Token                  | Hex       | Uso                          |
|------------------------|-----------|------------------------------|
| `--medieval-bg-deep`   | `#0d0b09` | Fundo principal, negro-marrom profundo |
| `--medieval-bg-panel`  | `#1a1612` | Painéis e sidebars           |
| `--medieval-bg-card`   | `#2a2318` | Cards e containers           |
| `--medieval-bg-parchment` | `#3d3428` | Pergaminho escuro         |

### 1.2 Cores Principais

| Token                       | Hex       | Uso                          |
|-----------------------------|-----------|------------------------------|
| `--medieval-primary`        | `#d4a574` | Dourado envelhecido - ação primária |
| `--medieval-primary-bright` | `#e8c79a` | Dourado claro - hover states |
| `--medieval-accent`         | `#c41e3a` | Carmesim dragão - alertas, perigo |
| `--medieval-accent-glow`    | `#ff4d6d` | Carmesim brilho - efeitos    |

### 1.3 Texto

| Token                        | Hex       | Uso                          |
|------------------------------|-----------|------------------------------|
| `--medieval-text-primary`    | `#f5e6d3` | Texto principal (pergaminho claro) |
| `--medieval-text-secondary`  | `#b8a082` | Texto secundário             |
| `--medieval-text-muted`      | `#6b5c4a` | Texto desabilitado/hint      |

### 1.4 Recursos do Jogo

| Recurso | Token              | Hex       |
|---------|--------------------|-----------|
| Grão    | `--medieval-grain` | `#daa520` |
| Madeira | `--medieval-wood`  | `#8b5a2b` |
| Ouro    | `--medieval-gold`  | `#ffd700` |

### 1.5 Eras

| Era      | Token                  | Hex       | Atmosfera        |
|----------|------------------------|-----------|------------------|
| Paz      | `--medieval-era-peace` | `#4a7c59` | Verde musgo, esperança |
| Guerra   | `--medieval-era-war`   | `#a41e1e` | Vermelho sangue, tensão |
| Invasão  | `--medieval-era-invasion` | `#6b2d6b` | Roxo sombrio, desespero |

### 1.6 Clãs

| Clã        | Token                     | Hex       |
|------------|---------------------------|-----------|
| Ferronatos | `--medieval-clan-ferronatos` | `#b22222` |
| Verdâneos  | `--medieval-clan-verdaneos`  | `#2e8b57` |
| Umbral     | `--medieval-clan-umbral`     | `#663399` |

---

## 2. Tipografia

### 2.1 Fontes

| Uso              | Fonte              | Fallback   | Classe Tailwind        |
|------------------|--------------------|------------|------------------------|
| Logo/Títulos     | Cinzel Decorative  | serif      | `font-cinzel-decorative` |
| Subtítulos       | Cinzel             | serif      | `font-cinzel`          |
| Corpo de texto   | Crimson Text       | Georgia    | `font-crimson`         |
| UI/Dados         | Geist Sans         | system-ui  | `font-sans`            |
| Números/Código   | Geist Mono         | monospace  | `font-mono`            |

### 2.2 Hierarquia

```
H1: Cinzel Decorative, 2.5rem, text-gradient-golden
H2: Cinzel, 1.75rem, text-medieval-primary
H3: Cinzel, 1.25rem, text-medieval-text-primary
Body: Crimson Text, 1rem, text-medieval-text-secondary
Caption: Geist Sans, 0.875rem, text-medieval-text-muted
```

### 2.3 Gradiente Dourado para Títulos

```css
.text-gradient-golden {
  background: linear-gradient(
    135deg,
    #d4a574 0%,
    #e8c79a 25%,
    #d4a574 50%,
    #b8956a 75%,
    #d4a574 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 3. Texturas e Efeitos

### 3.1 Textura de Pergaminho

```css
.bg-parchment {
  background-image: url("data:image/svg+xml,..."); /* noise pattern */
  background-color: var(--medieval-bg-parchment);
  background-blend-mode: overlay;
}
```

### 3.2 Borda Metálica

```css
.metal-border {
  border: 2px solid var(--medieval-primary);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.5);
}
```

### 3.3 Brilho Dourado

```css
.golden-glow {
  box-shadow: 0 0 20px rgba(212, 165, 116, 0.4);
}
```

### 3.4 Vinheta de Fundo

```css
.vignette {
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(13, 11, 9, 0.9) 100%
  );
}
```

---

## 4. Componentes UI

### 4.1 Componentes Medievais Disponíveis

| Componente        | Arquivo                                    | Uso                              |
|-------------------|--------------------------------------------|----------------------------------|
| `MedievalCard`    | `components/ui/medieval/MedievalCard.tsx`  | Container principal com bordas   |
| `MedievalButton`  | `components/ui/medieval/MedievalButton.tsx`| Botões estilizados               |
| `ParchmentPanel`  | `components/ui/medieval/ParchmentPanel.tsx`| Painéis com textura pergaminho   |
| `OrnamentDivider` | `components/ui/medieval/OrnamentDivider.tsx`| Divisores decorativos           |
| `CornerOrnaments` | `components/ui/medieval/CornerOrnaments.tsx`| Cantos decorativos para cards   |
| `ScrollPanel`     | `components/ui/medieval/ScrollPanel.tsx`   | Container com scroll estilizado  |

### 4.2 Variantes de MedievalCard

```tsx
<MedievalCard variant="default" />  // Borda simples
<MedievalCard variant="elevated" /> // Com sombra e hover
<MedievalCard variant="ornate" />   // Com decorações extras
```

### 4.3 Variantes de MedievalButton

```tsx
<MedievalButton variant="primary" />   // Dourado, ação principal
<MedievalButton variant="secondary" /> // Transparente, ação secundária
<MedievalButton variant="danger" />    // Vermelho, ação destrutiva
<MedievalButton variant="ghost" />     // Sem fundo, links
```

### 4.4 Variantes de OrnamentDivider

```tsx
<OrnamentDivider variant="simple" />  // Linha simples
<OrnamentDivider variant="pointed" /> // Com ponta central
<OrnamentDivider variant="dots" />    // Com três pontos
```

---

## 5. Animações

### 5.1 Biblioteca

Usamos **Framer Motion** para todas as animações. As variantes estão definidas em `src/lib/animations.ts`.

### 5.2 Variantes Globais

```tsx
// Fade com slide para cima
export const fadeSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// Hover para cards
export const cardHover = {
  whileHover: { y: -4, boxShadow: "0 8px 24px rgba(212,165,116,0.3)" },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

// Lista com stagger
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export const staggerItem = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
};
```

### 5.3 Animações de "Game Juice"

| Evento           | Componente FX        | Duração | Descrição                    |
|------------------|----------------------|---------|------------------------------|
| Recurso +/-      | `ResourcePopup`      | 1.2s    | Número flutua e desaparece   |
| Construção OK    | `Sparkles`           | 0.6s    | Partículas douradas          |
| Fim de Turno     | `TurnBanner`         | 2s      | Banner desliza e pulsa       |
| Mudança de Era   | `EraTransition`      | 3s      | Overlay dramático fullscreen |
| Combate          | `CombatFeedback`     | 0.4s    | Screen shake + flash         |
| Item Coletado    | `CollectAnimation`   | 0.8s    | Arco até o HUD               |
| Achievement      | `AchievementToast`   | 3s      | Toast com glow pulsante      |

### 5.4 Usando Animações no Jogo

```tsx
import { useGameAnimationContext } from "@/components/game/fx";

function MyComponent() {
  const {
    triggerResourcePopup,
    triggerBuildComplete,
    triggerCombatFeedback,
    triggerAchievement
  } = useGameAnimationContext();

  const handleBuild = () => {
    // ... lógica de construção
    triggerBuildComplete({ x: 100, y: 200 });
  };
}
```

### 5.5 Acessibilidade

Sempre respeitar a preferência do usuário por movimento reduzido:

```tsx
import { useReducedMotion } from "@/hooks";

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1] }}
    />
  );
}
```

---

## 6. Backgrounds

### 6.1 Arquivos Disponíveis

| Arquivo                    | Dimensão  | Uso                          |
|----------------------------|-----------|------------------------------|
| `/bg/hero-landing.png`     | 1920x1080 | Landing page hero            |
| `/bg/auth-guild-hall.png`  | 1920x1080 | Telas de login/registro      |
| `/bg/era-peace.jpg`        | 1920x1080 | Jogo durante Era da Paz      |
| `/bg/era-war.jpg`          | 1920x1080 | Jogo durante Era da Guerra   |
| `/bg/era-invasion.jpg`     | 1920x1080 | Jogo durante Era da Invasão  |
| `/bg/territory-village.png`| 800x600   | Overlay de território        |

### 6.2 Padrão de Uso

```tsx
import Image from "next/image";

<div className="relative">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/bg/era-peace.jpg"
      alt="Medieval landscape"
      fill
      className="object-cover"
      priority
      quality={85}
    />
    {/* Overlay escuro */}
    <div className="absolute inset-0 bg-medieval-bg-deep/70" />
    {/* Vinheta */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,11,9,0.9)_100%)]" />
  </div>

  {/* Conteúdo */}
  <div className="relative z-10">
    {children}
  </div>
</div>
```

---

## 7. Ícones

### 7.1 Biblioteca

Usamos **Lucide React** para ícones. Preferir ícones que combinem com a temática medieval.

### 7.2 Ícones Recomendados por Contexto

| Contexto    | Ícones Sugeridos                                    |
|-------------|-----------------------------------------------------|
| Recursos    | `Wheat`, `TreePine`, `Coins`                        |
| Militar     | `Swords`, `Shield`, `Target`, `Castle`              |
| Navegação   | `ChevronLeft`, `ChevronRight`, `ArrowLeft`          |
| Ações       | `Hammer`, `Plus`, `Settings`, `Eye`                 |
| Status      | `AlertCircle`, `CheckCircle`, `Clock`, `Trophy`     |
| Diplomacia  | `Handshake`, `Flag`, `Scroll`                       |

### 7.3 Estilização

```tsx
import { Swords } from "lucide-react";

<Swords className="w-5 h-5 text-medieval-primary" />
```

---

## 8. Layout de Páginas

### 8.1 Estrutura Base do Jogo

```tsx
<div className="min-h-screen bg-medieval-bg-deep">
  {/* Textura de fundo */}
  <div className="fixed inset-0 bg-parchment opacity-20 pointer-events-none" />

  {/* Vinheta */}
  <div className="fixed inset-0 bg-[radial-gradient(...)] pointer-events-none" />

  {/* Conteúdo */}
  <div className="relative z-10">
    {/* Header/HUD */}
    {/* Main content */}
    {/* Sidebar */}
  </div>
</div>
```

### 8.2 Espaçamento

| Elemento              | Padding/Gap      |
|-----------------------|------------------|
| Container principal   | `p-4` ou `p-6`   |
| Entre cards           | `gap-4`          |
| Dentro de cards       | `p-4` ou `p-6`   |
| Entre seções          | `space-y-6`      |

### 8.3 Responsividade

```tsx
// Mobile first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

---

## 9. Boas Práticas

### 9.1 DO (Fazer)

- ✅ Usar componentes medievais (`MedievalCard`, `MedievalButton`, etc.)
- ✅ Manter hierarquia visual com tipografia correta
- ✅ Usar animações sutis para feedback
- ✅ Respeitar `prefers-reduced-motion`
- ✅ Usar cores da paleta definida
- ✅ Manter overlay escuro sobre backgrounds
- ✅ Usar `font-cinzel` para títulos importantes

### 9.2 DON'T (Não Fazer)

- ❌ Usar cores fora da paleta medieval
- ❌ Usar fontes sans-serif para títulos de destaque
- ❌ Criar componentes UI sem seguir o estilo medieval
- ❌ Animações longas (>3s) sem propósito
- ❌ Backgrounds claros ou brancos
- ❌ Bordas arredondadas demais (`rounded-full` em containers)
- ❌ Sombras coloridas (usar sempre preto/dourado)

---

## 10. Checklist para Novas Telas

Ao criar uma nova tela, verificar:

- [ ] Background com imagem ou textura de pergaminho
- [ ] Overlay escuro + vinheta sobre backgrounds
- [ ] Títulos usando `font-cinzel` ou `font-cinzel-decorative`
- [ ] Cards usando `MedievalCard` com variante apropriada
- [ ] Botões usando `MedievalButton`
- [ ] Animações de entrada (fade, slide)
- [ ] Feedback visual para ações (hover, click)
- [ ] Cores da paleta medieval
- [ ] Ícones do Lucide com estilo consistente
- [ ] Responsividade mobile-first
- [ ] Acessibilidade (contraste, motion)

---

## 11. Referências

### 11.1 Inspirações Visuais
- **Coders Guild** (guild.codr.studio) - Estilo ilustrado semi-realista
- **RyuDragon Original** - Atmosfera de browser game medieval 2000s
- **Darkest Dungeon** - UI gótica com pergaminho

### 11.2 Arquivos de Configuração
- Cores Tailwind: `tailwind.config.ts`
- CSS Global: `src/app/globals.css`
- Animações: `src/lib/animations.ts`
- Componentes FX: `src/components/game/fx/`
- Componentes UI: `src/components/ui/medieval/`
- Hooks: `src/hooks/`

---

*Última atualização: Janeiro 2026*
