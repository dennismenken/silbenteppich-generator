<script lang="ts">
  import { generateSilbenteppich, validateConfig, DEFAULT_CONFIG } from '$lib/silbenteppich';
  import type { SilbenteppichConfig } from '$lib/types';
  import ConfigPanel from '$lib/ConfigPanel.svelte';
  import SilbenteppichView from '$lib/SilbenteppichView.svelte';
  import Footer from '$lib/Footer.svelte';
  import { Printer, RotateCcw, Download, Loader2 } from 'lucide-svelte';

  let config = $state<SilbenteppichConfig>({ ...DEFAULT_CONFIG });
  let pdfLoading = $state(false);

  const silbenteppichData = $derived(() => {
    try {
      return generateSilbenteppich(validateConfig(config));
    } catch (error) {
      console.error('Error generating silbenteppich:', error);
      return null;
    }
  });

  const currentData = $derived(silbenteppichData());

  function handlePrint() {
    const isLandscape = config.seitenausrichtung === 'quer';

    let printStyle = document.getElementById('print-orientation-style');
    if (!printStyle) {
      printStyle = document.createElement('style');
      printStyle.id = 'print-orientation-style';
      document.head.appendChild(printStyle);
    }

    printStyle.textContent = `
      @media print {
        @page {
          margin: 12mm;
          size: A4 ${isLandscape ? 'landscape' : 'portrait'};
        }
        @page :first {
          margin: 12mm;
        }
        @page :left {
          margin: 0;
        }
        @page :right {
          margin: 0;
        }
        html, body {
          page-break-after: avoid !important;
          page-break-before: avoid !important;
          page-break-inside: avoid !important;
        }
      }
    `;

    setTimeout(() => {
      window.print();
    }, 100);
  }

  async function handleDownloadPdf() {
    pdfLoading = true;
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'PDF-Generierung fehlgeschlagen');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `silbenteppich-${config.silbenstruktur}-${config.seitenausrichtung}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF download failed:', error);
      alert(`PDF-Download fehlgeschlagen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
    } finally {
      pdfLoading = false;
    }
  }

  function refreshRandom() {
    config = { ...config };
  }
</script>

<div class="min-h-screen flex flex-col font-geist">
  <!-- Header -->
  <header class="print-hidden bg-surface border-b border-border py-12 px-4 text-center">
    <div class="max-w-4xl mx-auto flex flex-col gap-4">
      <div class="flex flex-col items-center justify-center gap-4 mb-4">
        <img
          src="/images/silbenteppich-generator.svg"
          alt="Silbenteppich-Generator Logo"
          class="w-12 h-12 md:w-16 md:h-16"
        />
        <h1 class="text-4xl md:text-5xl font-semibold text-primary">
          Silbenteppich<br />Generator
        </h1>
      </div>
      <p class="text-lg md:text-xl text-secondary">
        <strong>Silbenteppiche online generieren:</strong> Kindgerechte Lesehilfe im DIN A4-Format
        fuer Lesetraining und Lesefoerderung. Druckoptimiert, responsive und perfekt fuer
        Leseuebungen im Unterricht oder zu Hause.
      </p>
    </div>
  </header>

  <!-- Main Content -->
  <div class="flex-1 flex flex-col">
    <!-- Controls -->
    <div class="print-hidden p-6">
      <div class="max-w-7xl mx-auto">
        <div class="card-simple p-6">
          <ConfigPanel bind:config />

          <!-- Buttons -->
          <div class="mt-6 pt-6 border-t border-border">
            {#if config.vokalReihenfolge === 'zufall' || config.zeilenReihenfolge === 'zufall' || !config.startbuchstabe}
              <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex gap-2 flex-1 sm:flex-[2]">
                  <button onclick={handlePrint} class="primary-button flex items-center justify-center gap-3 flex-1">
                    <Printer size={20} />
                    Drucken
                  </button>
                  <button
                    onclick={handleDownloadPdf}
                    disabled={pdfLoading}
                    class="secondary-button flex items-center justify-center gap-2 flex-1"
                  >
                    {#if pdfLoading}
                      <Loader2 size={18} class="animate-spin" />
                      PDF...
                    {:else}
                      <Download size={18} />
                      PDF
                    {/if}
                  </button>
                </div>
                <button
                  onclick={refreshRandom}
                  class="refresh-button flex items-center justify-center gap-2 w-full sm:w-auto sm:flex-1"
                  title="Neue Zufallsanordnung"
                >
                  <RotateCcw size={18} />
                  Neu
                </button>
              </div>
            {:else}
              <div class="flex flex-col sm:flex-row gap-3">
                <button onclick={handlePrint} class="primary-button flex items-center justify-center gap-3 flex-1">
                  <Printer size={20} />
                  Drucken (DIN A4)
                </button>
                <button
                  onclick={handleDownloadPdf}
                  disabled={pdfLoading}
                  class="secondary-button flex items-center justify-center gap-2 flex-1"
                >
                  {#if pdfLoading}
                    <Loader2 size={18} class="animate-spin" />
                    PDF wird erstellt...
                  {:else}
                    <Download size={18} />
                    PDF herunterladen
                  {/if}
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Carpet View -->
    <div class="flex-1 p-6 print:p-0">
      <div class="max-w-7xl mx-auto h-full">
        {#if currentData}
          <SilbenteppichView data={currentData} />
        {:else}
          <div class="text-center py-8">
            <p class="text-lg text-secondary">Lade Silbenteppich...</p>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Footer -->
  <Footer />
</div>
