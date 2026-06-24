# Uso do template — MS Recebíveis

O template-base fica em:
- `assets/template.html`

## Estrutura esperada
Ele funciona no estilo da skill-base original:
- um arquivo HTML principal
- região `<!-- POSTERS_HERE -->`
- cada slide entra como um bloco `<section class="poster ...">`

## Tipos de slide sugeridos
- `poster cover`
- `poster compact`
- `poster closing`

## Campos a substituir
No `<title>` do documento:
- `{{DECK_TITLE}}`

Nos slides:
- kicker da marca
- ícone
- headline
- subheadline
- eyebrow
- title-right
- copy
- card-label
- card-value

## Lógica de adaptação da skill original
A skill original usava:
- seed template
- região de posters
- receitas de layout

A adaptação da MS segue a mesma lógica:
- template-base institucional
- posters por slide
- layouts simples e consistentes
- uma ideia por slide

## Regra de entrega visual
A skill deve sempre considerar HTML como formato interno de composição.

Para entrega ao usuário:
- renderizar em PNG
- gerar um arquivo por slide sempre que possível
- priorizar o envio individual de cada slide
- evitar entregar apenas o HTML cru para avaliação

## Próxima etapa técnica ideal
- gerar snippets de slide automaticamente
- montar um `render.mjs`
- substituir `<!-- POSTERS_HERE -->` por todos os slides
- exportar PNG individual por slide
