<script lang="ts">
  import type { SilbenteppichData } from './types';
  import { ZEILEN_QUERFORMAT, ZEILEN_HOCHFORMAT } from './silbenteppich';

  let { data }: { data: SilbenteppichData } = $props();

  const isLandscape = $derived(data.config.seitenausrichtung === 'quer');
  const showAllVowels = $derived(!isLandscape);
  const maxZeilen = $derived(isLandscape ? ZEILEN_QUERFORMAT : ZEILEN_HOCHFORMAT);
  const isCluster = $derived(data.config.konsonantModus === 'cluster');

  const silbenstrukturLabel = $derived(() => {
    switch (data.config.silbenstruktur) {
      case 'offen':
        return 'Offene Silben';
      case 'geschlossen':
        return `Geschlossene Silben (Stopper: ${data.config.endkonsonant})`;
      case 'vokal-konsonant':
        return 'VK-Silben (Vokal-Konsonant)';
      default:
        return '';
    }
  });

  const startbuchstabeLabel = $derived(
    data.config.startbuchstabe
      ? `Ab ${data.config.startbuchstabe.toUpperCase()}`
      : 'Zufällig'
  );
</script>

<!-- Screen View -->
<div class="print-hidden h-full" class:font-geist={data.config.schriftart === 'geist'} class:font-andika={data.config.schriftart === 'andika'}>
  <div class="text-center mb-6">
    <h2 class="text-2xl font-semibold text-primary mb-3">
      Silbenteppich
    </h2>
    <div class="text-sm text-secondary flex flex-wrap justify-center gap-4">
      <span>
        {silbenstrukturLabel()}
      </span>
      <span class="text-subtle">|</span>
      <span>
        {data.config.seitenausrichtung === 'quer' ? 'Querformat' : 'Hochformat'}
      </span>
      <span class="text-subtle">|</span>
      <span>
        {startbuchstabeLabel}
      </span>
      {#if isCluster}
        <span class="text-subtle">|</span>
        <span>Cluster</span>
      {/if}
    </div>
  </div>

  <!-- Screen Grid Preview - Equalized boxes like print -->
  <div class="screen-grid"
       class:landscape={isLandscape}
       class:mit-umlaute={data.config.umlaute}
       class:geschlossen={data.config.silbenstruktur === 'geschlossen'}
       class:cluster-mode={isCluster}>
    {#each data.zeilen.slice(0, maxZeilen) as zeile}
      <div class="screen-row" class:cluster-mode={isCluster}>
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
      {silbenstrukturLabel()} |
      {startbuchstabeLabel} |
      {data.config.seitenausrichtung === 'quer' ? 'Querformat' : 'Hochformat'} |
      {data.config.schriftart === 'geist' ? 'Geist' : 'Andika'}
      {#if isCluster} | Cluster{/if}
    </div>
  </div>

  <!-- Optimized grid layout for print -->
  <div class="print-grid"
       class:landscape={isLandscape}
       class:mit-umlaute={data.config.umlaute}
       class:geschlossen={data.config.silbenstruktur === 'geschlossen'}
       class:cluster-mode={isCluster}>
    {#each data.zeilen.slice(0, maxZeilen) as zeile}
      <div class="print-row print:break-inside-avoid" class:cluster-mode={isCluster}>
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
</div>
