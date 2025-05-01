<template>
  <div ref="preRef" :class="`${!isInCodePreview ? 'content-base my-4' : 'border-t-2 border-primary/40'} pre`">
    <div v-if="!isInCodePreview" class="pre-head">
      <div v-if="props.filename" class="filename">
        <Icon :size="14" class="mt-1" :name="languageIcon" />
        <i>{{ filename }}</i>
      </div>
      <v-btn 
        :icon="codeCopied ? 'mdi-check' : 'mdi-content-copy'" 
        variant="text" 
        size="x-small" 
        class="backdrop-blur-sm"
        @click="copyCode"
      />
    </div>
    <v-btn 
      v-if="isInCodePreview"
      class="absolute top-1 right-1 backdrop-blur-sm"
      :icon="codeCopied ? 'mdi-check' : 'mdi-content-copy'"
      variant="text"
      size="x-small"
      @click="copyCode"
    />
    <pre class="pre-body" :class="$props.class"><slot/></pre>
  </div>
</template>


<script setup lang="ts">
import "./content.css"

const preRef = ref<HTMLDivElement | null>(null)

interface Props {
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: '',
  filename: '',
  highlights: () => [],
  meta: '',
  class: '',
})

// Add detection of parent CodePreview component
const isInCodePreview = ref(false)

onMounted(() => {
  // Check if any parent element has is-embedded attribute
  const checkParentForEmbedded = (element: HTMLElement | null): boolean => {
    if (!element) return false
    if (element.hasAttribute('is-embedded')) return true
    return checkParentForEmbedded(element.parentElement)
  }

  if (preRef.value && checkParentForEmbedded(preRef.value.parentElement)) {
    isInCodePreview.value = true
  }
})

const languageIcon = computed(() => {
  if (!props.language) return 'vscode-icons:file-type-text'
  switch (props.language) {
    case 'javascript':
      return 'vscode-icons:file-type-js'
    case 'js':
      return 'vscode-icons:file-type-js'
    case 'ts':
      return 'vscode-icons:file-type-typescript'
    case 'typescript':
      return 'vscode-icons:file-type-typescript'
    case 'html':
      return 'vscode-icons:file-type-html'
    case 'css':
      return 'vscode-icons:file-type-css'
    case 'scss':
      return 'vscode-icons:file-type-scss'
    case 'sass':
      return 'vscode-icons:file-type-sass'
    case 'vue':
      return 'vscode-icons:file-type-vue'
    case 'python':
      return 'vscode-icons:file-type-python'
    case 'php':
      return 'vscode-icons:file-type-php'
    case 'ruby':
      return 'vscode-icons:file-type-ruby'
    case 'java':
      return 'vscode-icons:file-type-java'
    case 'csharp':
      return 'vscode-icons:file-type-csharp'
    case 'go':
      return 'vscode-icons:file-type-go'
    case 'kotlin':
      return 'vscode-icons:file-type-kotlin'
    case 'swift':
      return 'vscode-icons:file-type-swift'
    case 'rust':
      return 'vscode-icons:file-type-rust'
    case 'bash':
      return 'vscode-icons:file-type-shell'
    case 'sh':
      return 'vscode-icons:file-type-shell'
    case 'shell':
      return 'vscode-icons:file-type-shell'
    case 'powershell':
      return 'vscode-icons:file-type-shell'
    case 'sql':
      return 'vscode-icons:file-type-sql'
    case 'yaml':
      return 'vscode-icons:file-type-yaml'
    case 'yml':
      return 'vscode-icons:file-type-yaml'
    case 'json':
      return 'vscode-icons:file-type-json'
    case 'toml':
      return 'vscode-icons:file-type-toml'
    case 'xml':
      return 'vscode-icons:file-type-xml'
    default:
      return 'vscode-icons:file-type-text'
  }
})

const codeCopied = ref<boolean>(false);

const copyCode = (): void => {
  navigator.clipboard.writeText(props.code)
      .then(() => {
        codeCopied.value = true;
        setTimeout(function () {
          codeCopied.value = false;
        }, 5000);
      })
      .catch(() => {
        console.error('Error: Unable to copy code.');
      });
}

</script>

<style lang="postcss">
.pre {
  @apply w-full relative;

  &-head {
    @apply flex justify-end items-center border-b-2 border-primary/40 px-2 py-0.5;

    .filename,
    .copy-success,
    .copy-btn {
      @apply text-sm opacity-70 pl-2;
    }

    .filename {
      @apply flex items-center gap-1 ml-0 mr-auto;
    }

    .copy-success {
      @apply text-green-400 border-transparent;
    }

    .copy-btn {
      @apply bg-inherit border-primary;

      &:hover,
      &:active {
        @apply text-green-400 border-green-400;
      }
    }
  }

  &-body {
    @apply p-2 !text-xs;
    overflow-x: auto;

    code {
      @apply inline-block w-full min-w-max;
    }

    .line {
      @apply px-2 pr-8;

      span {
        @apply bg-transparent;
      }

      &.highlight,
      &.highlighted {
        @apply bg-gray-400;
      }

      &::before {
        content: attr(line);
        @apply text-sm min-w-8;
        display: inline-block;
        opacity: 0.5;
      }

      &.diff.remove {
        @apply bg-red-400;
      }

      &.diff.add {
        @apply bg-green-400;
      }
    }
  }
}

pre code .line {
  display: block;
}
</style> 