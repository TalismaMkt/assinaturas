# Social-first snippets — MS Recebíveis

Use com `assets/template-social-first.html`.

---

## 1. Cover / post principal com imagem

```html
<section class="poster">
  <div class="top">
    <div class="brand">
      <div class="brand-kicker">MS Recebíveis</div>
      <div class="brand-mark"></div>
    </div>

    <div class="text-block">
      <div class="eyebrow">{{EYEBROW}}</div>
      <h1 class="headline">{{HEADLINE}}</h1>
      <p class="copy">{{COPY}}</p>
    </div>

    <div class="meta-row">
      <div>
        <div class="meta-label">Leitura</div>
        <div class="meta-value">{{META_LEFT}}</div>
      </div>
      <div>
        <div class="meta-label">Foco</div>
        <div class="meta-value">{{META_RIGHT}}</div>
      </div>
    </div>
  </div>

  <div class="bottom">
    <img src="{{IMAGE_URL}}" alt="{{IMAGE_ALT}}" />
  </div>
</section>
```

---

## 2. Variação sem imagem (closing/reflexão)

```html
<section class="poster no-image">
  <div class="top">
    <div class="brand">
      <div class="brand-kicker">MS Recebíveis</div>
      <div class="brand-mark"></div>
    </div>

    <div class="text-block">
      <div class="eyebrow">{{EYEBROW}}</div>
      <h1 class="headline">{{HEADLINE}}</h1>
      <p class="copy">{{COPY}}</p>
    </div>

    <div class="meta-row">
      <div>
        <div class="meta-label">Fechamento</div>
        <div class="meta-value">{{META_LEFT}}</div>
      </div>
      <div>
        <div class="meta-label">Tom</div>
        <div class="meta-value">{{META_RIGHT}}</div>
      </div>
    </div>
  </div>

  <div class="bottom">
    <div class="closing-card">
      <div class="small">MS Recebíveis</div>
      <div class="value">{{CLOSING_VALUE}}</div>
    </div>
  </div>
</section>
```
