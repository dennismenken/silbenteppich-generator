<script lang="ts">
  import { marked } from 'marked';
  import { Github } from 'lucide-svelte';
  import legalAvailability from './legal-availability.json';

  // Configure marked for safe HTML output
  marked.setOptions({
    breaks: true,
    gfm: true
  });

  let showImpressum = $state(false);
  let showDatenschutz = $state(false);

  async function loadMarkdownContent(filename: string): Promise<string> {
    try {
      const response = await fetch(`/legal/${filename}.md`);
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.warn(`Konnte ${filename}.md nicht laden:`, error);
    }
    return '';
  }

  let impressumContent = $state('');
  let datenschutzContent = $state('');
  let impressumHTML = $state('');
  let datenschutzHTML = $state('');

  async function toggleImpressum() {
    if (!showImpressum && !impressumContent) {
      impressumContent = await loadMarkdownContent('imprint');
      if (impressumContent) {
        impressumHTML = await marked(impressumContent);
      }
    }
    showImpressum = !showImpressum;
    showDatenschutz = false;
  }

  async function toggleDatenschutz() {
    if (!showDatenschutz && !datenschutzContent) {
      datenschutzContent = await loadMarkdownContent('privacy');
      if (datenschutzContent) {
        datenschutzHTML = await marked(datenschutzContent);
      }
    }
    showDatenschutz = !showDatenschutz;
    showImpressum = false;
  }

  function closeModal() {
    showImpressum = false;
    showDatenschutz = false;
  }

  // Use build-time availability check
  const linksAvailable = legalAvailability;
</script>

<footer class="print-hidden bg-surface border-t border-border mt-auto py-6">
  <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
    <div class="flex gap-6 items-center">
      {#if linksAvailable.imprint}
        <button onclick={toggleImpressum} class="text-secondary hover:text-primary transition-colors duration-200 underline decoration-dotted">
          Impressum
        </button>
      {/if}
      {#if linksAvailable.privacy}
        <button onclick={toggleDatenschutz} class="text-secondary hover:text-primary transition-colors duration-200 underline decoration-dotted">
          Datenschutzerklärung
        </button>
      {/if}
      {#if !linksAvailable.imprint && !linksAvailable.privacy}
        <span class="text-primary font-medium">Silbenteppich-Generator v1.0</span>
      {/if}
    </div>
    
    <div class="text-sm text-secondary flex items-center gap-2">
      <span>Für einfaches Lernen. Kostenlos & Open Source</span>
      <a href="https://github.com/dennismenken/silbenteppich-generator" 
         target="_blank" 
         rel="noopener noreferrer"
         class="hover:text-primary transition-colors duration-200"
         title="Zum GitHub Repository">
        <Github size={16} />
      </a>
    </div>
  </div>
</footer>

<!-- Modal for legal content -->
{#if showImpressum || showDatenschutz}
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
       onclick={closeModal} 
       role="button" 
       tabindex="0" 
       onkeydown={(e) => e.key === 'Escape' && closeModal()}>
    <div class="card max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" 
         onclick={(e) => e.stopPropagation()} 
         onkeydown={(e) => e.key === 'Enter' && e.stopPropagation()}
         role="dialog" 
         tabindex="-1">
      <div class="flex justify-between items-center p-6 border-b border-border">
        <h2 class="text-xl font-semibold text-primary">
          {showImpressum ? 'Impressum' : 'Datenschutzerklärung'}
        </h2>
        <button onclick={closeModal} 
                class="text-secondary hover:text-primary text-2xl leading-none transition-colors duration-200">
          ×
        </button>
      </div>
      <div class="p-6 overflow-y-auto flex-1 prose prose-sm max-w-none">
        {#if showImpressum && impressumHTML}
          {@html impressumHTML}
        {:else if showDatenschutz && datenschutzHTML}
          {@html datenschutzHTML}
        {:else}
          <p class="text-center text-gray-500">Inhalt wird geladen...</p>
        {/if}
      </div>
    </div>
  </div>
{/if}

