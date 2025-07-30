<script lang="ts">
  import { generateSilbenteppich, validateConfig, DEFAULT_CONFIG } from './lib/silbenteppich';
  import type { SilbenteppichConfig } from './lib/types';
  import ConfigPanel from './lib/ConfigPanel.svelte';
  import SilbenteppichView from './lib/SilbenteppichView.svelte';
  import Footer from './lib/Footer.svelte';
  import { Printer, RotateCcw } from 'lucide-svelte';

  let config = $state<SilbenteppichConfig>({ ...DEFAULT_CONFIG });
  
  // Generate data reactively when config changes using $derived
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
    // Set correct print orientation based on configuration
    const isLandscape = config.seitenausrichtung === 'quer';
    
    // Create or update print-specific CSS
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
      }
    `;
    
    // Small delay to ensure CSS is applied
    setTimeout(() => {
      window.print();
    }, 100);
  }

  function refreshRandom() {
    // Force regeneration by creating new config object
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
        <strong>Silbenteppiche online generieren:</strong> Kindgerechte Lesehilfe im DIN A4‑Format für Lesetraining und Leseförderung. Druckoptimiert, responsive und perfekt für Leseübungen im Unterricht oder zu Hause.
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
              <div class="flex gap-4">
                <button onclick={handlePrint} class="primary-button flex items-center gap-3 flex-1" style="flex: 2;">
                  <Printer size={20} />
                  Drucken (DIN A4)
                </button>
                <button onclick={refreshRandom} class="refresh-button flex items-center justify-center gap-2 flex-1" title="Neue Zufallsanordnung">
                  <RotateCcw size={18} />
                  <span class="hidden sm:inline">Neu</span>
                </button>
              </div>
            {:else}
              <button onclick={handlePrint} class="primary-button flex items-center gap-3 w-full">
                <Printer size={20} />
                Drucken (DIN A4)
              </button>
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
