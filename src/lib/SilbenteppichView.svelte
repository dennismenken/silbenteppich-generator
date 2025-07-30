<script lang="ts">
  import type { SilbenteppichData } from './types';
  import { ZEILEN_QUERFORMAT, ZEILEN_HOCHFORMAT } from './silbenteppich';

  let { data }: { data: SilbenteppichData } = $props();

  const isLandscape = $derived(data.config.seitenausrichtung === 'quer');
  const showAllVowels = $derived(!isLandscape);
  const maxZeilen = $derived(isLandscape ? ZEILEN_QUERFORMAT : ZEILEN_HOCHFORMAT);
</script>

<!-- Screen View -->
<div class="print-hidden h-full" class:font-geist={data.config.schriftart === 'geist'} class:font-andika={data.config.schriftart === 'andika'}>
  <div class="text-center mb-6">
    <h2 class="text-2xl font-semibold text-primary mb-3">
      Silbenteppich
    </h2>
    <div class="text-sm text-secondary flex flex-wrap justify-center gap-4">
      <span>
        {data.config.silbenstruktur === 'offen' ? 'Offene Silben' : 'Geschlossene Silben'}
      </span>
      <span class="text-subtle">•</span>
      <span>
        {data.config.seitenausrichtung === 'quer' ? 'Querformat' : 'Hochformat'}
      </span>
      <span class="text-subtle">•</span>
      <span>
        Ab {data.config.startbuchstabe.toUpperCase()}
      </span>
    </div>
  </div>

  <!-- Screen Grid Preview - Equalized boxes like print -->
  <div class="screen-grid" class:landscape={isLandscape} class:mit-umlaute={data.config.umlaute} class:geschlossen={data.config.silbenstruktur === 'geschlossen'}>
    {#each data.zeilen.slice(0, maxZeilen) as zeile}
      <div class="screen-row">
        <div class="screen-konsonant"
             class:font-andika={data.config.schriftart === 'andika'}
             class:font-geist={data.config.schriftart === 'geist'}>
          {zeile.konsonant}
        </div>
        <div class="screen-silben-container">
          {#each zeile.silben as silbe}
            <div class="screen-silbe"
                 class:font-andika={data.config.schriftart === 'andika'}
                 class:font-geist={data.config.schriftart === 'geist'}>
              {silbe}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- Print View -->
<div class="print-only hidden print:block" 
     class:font-geist={data.config.schriftart === 'geist'} 
     class:font-andika={data.config.schriftart === 'andika'}
     class:landscape={isLandscape}>
  <!-- Print Header -->
  <div class="print-header">
    <h1>Silbenteppich</h1>
    <div class="config-info">
      {data.config.silbenstruktur === 'offen' ? 'Offene Silben' : 'Geschlossene Silben'} • 
      Ab {data.config.startbuchstabe.toUpperCase()} • 
      {data.config.seitenausrichtung === 'quer' ? 'Querformat' : 'Hochformat'} • 
      {data.config.schriftart === 'geist' ? 'Geist' : 'Andika'}
    </div>
  </div>

  <!-- Optimized grid layout for print -->
  <div class="print-grid" class:landscape={isLandscape} class:mit-umlaute={data.config.umlaute} class:geschlossen={data.config.silbenstruktur === 'geschlossen'}>
    {#each data.zeilen.slice(0, maxZeilen) as zeile}
      <div class="print-row print:break-inside-avoid">
        <div class="print-konsonant"
             class:font-andika={data.config.schriftart === 'andika'}
             class:font-geist={data.config.schriftart === 'geist'}>
          {zeile.konsonant}
        </div>
        <div class="print-silben-container">
          {#each zeile.silben as silbe}
            <div class="print-silbe"
                 class:font-andika={data.config.schriftart === 'andika'}
                 class:font-geist={data.config.schriftart === 'geist'}>
              {silbe}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Footer nur für Screen, nicht für Print -->
  <div class="print-hidden text-center mt-6 text-xs text-gray-500" class:mt-3={isLandscape}>
    <p>
      Silbenteppich-Generator • 
      {data.zeilen.length} Zeilen • 
      5{data.config.umlaute ? ' + Umlaute' : ''} Vokale
    </p>
  </div>
</div>