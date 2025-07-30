<script lang="ts">
  import type { SilbenteppichConfig } from './types';

  let { config = $bindable() }: { config: SilbenteppichConfig } = $props();

  const KONSONANTEN = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z'];
</script>

<div>
  <h2 class="text-xl font-semibold text-primary mb-6">
    Einstellungen
  </h2>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
    
    <!-- Silbenstruktur -->
    <div class="space-y-2">
      <label for="silbenstruktur" class="block text-sm font-medium text-primary">
        Silbenstruktur
      </label>
      <select id="silbenstruktur" bind:value={config.silbenstruktur} class="select-field">
        <option value="offen">Offene Silben (la, le, li...)</option>
        <option value="geschlossen">Geschlossene Silben (lam, lem, lim...)</option>
      </select>
    </div>

    <!-- Seitenausrichtung -->
    <div class="space-y-2">
      <label for="seitenausrichtung" class="block text-sm font-medium text-primary">
        Seitenausrichtung
      </label>
      <select id="seitenausrichtung" bind:value={config.seitenausrichtung} class="select-field">
        <option value="hoch">Hochformat (mehr Zeilen)</option>
        <option value="quer">Querformat (weniger Zeilen)</option>
      </select>
    </div>

    <!-- Schreibweise -->
    <div class="space-y-2">
      <label for="schreibweise" class="block text-sm font-medium text-primary">
        Schreibweise
      </label>
      <select id="schreibweise" bind:value={config.schreibweise} class="select-field">
        <option value="klein">Nur Kleinbuchstaben</option>
        <option value="gross">Nur Großbuchstaben</option>
        <option value="gemischt">Erster groß, zweiter klein</option>
      </select>
    </div>

    <!-- Startbuchstabe -->
    <div class="space-y-2">
      <label for="startbuchstabe" class="block text-sm font-medium text-primary">
        Startbuchstabe
      </label>
      <select id="startbuchstabe" bind:value={config.startbuchstabe} class="select-field">
        {#each KONSONANTEN as konsonant}
          <option value={konsonant}>{konsonant.toUpperCase()}</option>
        {/each}
      </select>
    </div>

    <!-- Umlaute -->
    <div class="space-y-2">
      <label for="umlaute" class="block text-sm font-medium text-primary">
        Umlaute
      </label>
      <label for="umlaute" class="flex items-center gap-3 p-3 border border-border rounded-lg bg-surface hover:bg-surface-muted transition-all duration-200 cursor-pointer">
        <input 
          id="umlaute"
          type="checkbox" 
          bind:checked={config.umlaute}
          class="w-5 h-5 text-accent border border-border rounded focus:ring-accent/20"
        />
        <span class="text-sm font-medium text-primary">Umlaute (ä, ö, ü) hinzufügen</span>
      </label>
    </div>

    <!-- Vokal-Reihenfolge -->
    <div class="space-y-2">
      <label for="vokalReihenfolge" class="block text-sm font-medium text-primary">
        Vokal-Reihenfolge
      </label>
      <select id="vokalReihenfolge" bind:value={config.vokalReihenfolge} class="select-field">
        <option value="standard">Standard (a, e, i, o, u)</option>
        <option value="zufall">Zufällige Permutation</option>
      </select>
    </div>

    <!-- Zeilen-Reihenfolge -->
    <div class="space-y-2">
      <label for="zeilenReihenfolge" class="block text-sm font-medium text-primary">
        Zeilen-Reihenfolge
      </label>
      <select id="zeilenReihenfolge" bind:value={config.zeilenReihenfolge} class="select-field">
        <option value="alphabetisch">Alphabetisch</option>
        <option value="zufall">Zufällig</option>
      </select>
    </div>

    <!-- Schriftart -->
    <div class="space-y-2">
      <label for="schriftart" class="block text-sm font-medium text-primary">
        Schriftart
      </label>
      <select id="schriftart" bind:value={config.schriftart} class="select-field">
        <option value="geist">Geist (Modern, professionell)</option>
        <option value="andika">Andika (Schultauglich, klares 'a')</option>
        
      </select>
    </div>
  </div>
</div>