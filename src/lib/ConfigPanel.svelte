<script lang="ts">
  import type { SilbenteppichConfig } from './types';
  import { STANDARD_KONSONANTEN, KONSONANTEN_CLUSTER } from './silbenteppich';
  import { PRESETS } from './presets';

  let { config = $bindable() }: { config: SilbenteppichConfig } = $props();

  let selectedPreset = $state('');

  const konsonantenliste = $derived(
    config.konsonantModus === 'cluster' ? KONSONANTEN_CLUSTER : STANDARD_KONSONANTEN
  );

  function applyPreset(presetName: string) {
    if (!presetName) return;
    const preset = PRESETS.find(p => p.name === presetName);
    if (preset) {
      config = { ...config, ...preset.config };
    }
  }

  // Wenn sich ein Config-Wert manuell aendert, Preset auf leer setzen
  // (wird durch $effect getrackt, reagiert auf jede Config-Aenderung)
  let lastAppliedPreset = $state('');
  $effect(() => {
    // Config-Werte lesen um Tracking auszuloesen
    const _ = JSON.stringify(config);
    if (selectedPreset && selectedPreset !== lastAppliedPreset) {
      // Nutzer hat gerade ein Preset ausgewaehlt
      lastAppliedPreset = selectedPreset;
    } else if (lastAppliedPreset && selectedPreset === lastAppliedPreset) {
      // Config hat sich geaendert, aber nicht durch Preset-Auswahl
      // -> Reset auf benutzerdefiniert
    }
  });

  function handlePresetChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    selectedPreset = value;
    applyPreset(value);
  }

  // Wenn konsonantModus wechselt, startbuchstabe zuruecksetzen falls ungueltig
  $effect(() => {
    if (config.startbuchstabe && !konsonantenliste.includes(config.startbuchstabe)) {
      config.startbuchstabe = '';
    }
  });
</script>

<div>
  <h2 class="text-xl font-semibold text-primary mb-6">
    Einstellungen
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

    <!-- Vorlage (Preset) -->
    <div class="space-y-2">
      <label for="vorlage" class="block text-sm font-medium text-primary">
        Vorlage
      </label>
      <select id="vorlage" value={selectedPreset} onchange={handlePresetChange} class="select-field">
        <option value="">-- Benutzerdefiniert --</option>
        {#each PRESETS as preset}
          <option value={preset.name}>{preset.name}</option>
        {/each}
      </select>
    </div>

    <!-- Silbenstruktur -->
    <div class="space-y-2">
      <label for="silbenstruktur" class="block text-sm font-medium text-primary">
        Silbenstruktur
      </label>
      <select id="silbenstruktur" bind:value={config.silbenstruktur} class="select-field">
        <option value="offen">Offene Silben (la, le, li...)</option>
        <option value="geschlossen">Geschlossene Silben (lam, lem, lim...)</option>
        <option value="vokal-konsonant">VK-Silben (am, em, im...)</option>
      </select>
    </div>

    <!-- Endkonsonant (Stopper) - nur bei geschlossenen Silben -->
    {#if config.silbenstruktur === 'geschlossen'}
      <div class="space-y-2">
        <label for="endkonsonant" class="block text-sm font-medium text-primary">
          Endkonsonant (Stopper)
        </label>
        <select id="endkonsonant" bind:value={config.endkonsonant} class="select-field">
          <optgroup label="Stufe 1 (früh)">
            <option value="m">m (lam, lem, lim...)</option>
            <option value="l">l (bal, bel, bil...)</option>
            <option value="n">n (ban, ben, bin...)</option>
          </optgroup>
          <optgroup label="Stufe 2">
            <option value="t">t (bat, bet, bit...)</option>
            <option value="d">d (bad, bed, bid...)</option>
            <option value="s">s (bas, bes, bis...)</option>
          </optgroup>
          <optgroup label="Stufe 3 (später)">
            <option value="r">r (bar, ber, bir...)</option>
            <option value="p">p (bap, bep, bip...)</option>
            <option value="f">f (baf, bef, bif...)</option>
            <option value="w">w (baw, bew, biw...)</option>
          </optgroup>
          <optgroup label="Verbindungen">
            <option value="ck">ck (back, beck, bick...)</option>
            <option value="ng">ng (bang, beng, bing...)</option>
            <option value="nk">nk (bank, benk, bink...)</option>
            <option value="tz">tz (batz, betz, bitz...)</option>
          </optgroup>
          <optgroup label="Doppelkonsonanten">
            <option value="mm">mm (bamm, bemm, bimm...)</option>
            <option value="ll">ll (ball, bell, bill...)</option>
            <option value="nn">nn (bann, benn, binn...)</option>
            <option value="ss">ss (bass, bess, biss...)</option>
            <option value="tt">tt (batt, bett, bitt...)</option>
            <option value="ff">ff (baff, beff, biff...)</option>
            <option value="pp">pp (bapp, bepp, bipp...)</option>
            <option value="rr">rr (barr, berr, birr...)</option>
          </optgroup>
        </select>
      </div>
    {/if}

    <!-- Konsonant-Modus -->
    <div class="space-y-2">
      <label for="konsonantModus" class="block text-sm font-medium text-primary">
        Konsonanten
      </label>
      <select id="konsonantModus" bind:value={config.konsonantModus} class="select-field">
        <option value="einzel">Einzelne Konsonanten (b, d, f...)</option>
        <option value="cluster">Konsonantenverbindungen (bl, kr, schr...)</option>
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
        {config.konsonantModus === 'cluster' ? 'Startverbindung' : 'Startbuchstabe'}
      </label>
      <select id="startbuchstabe" bind:value={config.startbuchstabe} class="select-field">
        <option value="">{config.konsonantModus === 'cluster' ? 'Keine Startverbindung (zufällig)' : 'Kein Startbuchstabe (zufällig)'}</option>
        {#each konsonantenliste as konsonant}
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
