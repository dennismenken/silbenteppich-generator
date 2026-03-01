<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <meta name="description" content="Silbenteppich-Generator - Webapp zur Generierung von Silbenteppichen als Lesehilfe fuer Kinder im DIN A4-Format" />
  <title>Silbenteppich-Generator</title>

  <!-- Open Graph Tags -->
  <meta property="og:title" content="Silbenteppich-Generator" />
  <meta property="og:description" content="Silbenteppiche online generieren: Kindgerechte Lesehilfe im DIN A4-Format fuer Lesetraining und Lesefoerderung. Druckoptimiert, responsive und perfekt fuer Leseuebungen." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://silbenteppich.de/" />
  <meta property="og:image" content="https://silbenteppich.de/images/silbenteppich-og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:site_name" content="Silbenteppich-Generator" />

  <!-- Twitter Card Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Silbenteppich-Generator" />
  <meta name="twitter:description" content="Silbenteppiche online generieren: Kindgerechte Lesehilfe im DIN A4-Format fuer Lesetraining und Lesefoerderung." />
  <meta name="twitter:image" content="https://silbenteppich.de/images/silbenteppich-og.png" />

  <!-- Author Meta Tags -->
  <meta name="author" content="Dennis Menken" />
  <link rel="author" href="https://dennismenken.de" />

  <!-- Schema.org Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Silbenteppich-Generator",
    "description": "Webapp zur Generierung von Silbenteppichen als Lesehilfe fuer Kinder im DIN A4-Format. Erstellt druckoptimierte Leseuebungen fuer Grundschule und Lesefoerderung.",
    "url": "https://silbenteppich.de/",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "author": {
      "@type": "Person",
      "name": "Dennis Menken",
      "url": "https://dennismenken.de"
    },
    "creator": {
      "@type": "Person",
      "name": "Dennis Menken",
      "url": "https://dennismenken.de"
    },
    "publisher": {
      "@type": "Person",
      "name": "Dennis Menken"
    },
    "datePublished": "2025-07-30",
    "dateModified": "2025-08-01",
    "keywords": ["Silbenteppich", "Lesefoerderung", "Grundschule", "Lesetraining", "Lesehilfe", "DIN A4", "Druckvorlage"],
    "inLanguage": "de-DE",
    "isAccessibleForFree": true,
    "license": "https://opensource.org/licenses/MIT"
  })}</script>`}
</svelte:head>

{@render children()}
