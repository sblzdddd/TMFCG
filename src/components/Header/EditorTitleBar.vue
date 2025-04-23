<template>
  <div class="editor-titlebar px-4 py-2 flex items-center border-b-2 border-black/20">
    <!-- Home button -->
    <NuxtLink class="mr-4" to="/">
      <v-btn elevation="0" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </NuxtLink>

    <!-- Title and profile name -->
    <div class="flex items-center flex-grow">
      <h2 class="text-lg font-medium mr-4">卡组编辑器</h2>

      <!-- Dropdown menu -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn elevation="0" v-bind="props">
            文件
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="saveCurrentCard">
            <v-list-item-title>保存卡组</v-list-item-title>
          </v-list-item>

          <v-list-item @click="exportProfile">
            <v-list-item-title>导出为.json</v-list-item-title>
          </v-list-item>

          <v-list-item @click="importProfile">
            <v-list-item-title>导入.json</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-text-field
        v-model="profileName"
        class="max-w-xs"
        density="compact"
        hide-details
        label="牌组名称"
        variant="outlined"
        @update:model-value="setProfileName"
    />
    <input
        ref="fileInput"
        accept=".json"
        class="d-none"
        type="file"
        @change="handleFileUpload"
    >
  </div>
</template>

<script lang="ts" setup>
const {cardEditModel} = useCardEditor();
const {currentProfile} = useCardProfile();
const {loadProfileFromFile, downloadProfile} = useCardLoader();
const {addCard, setProfileName} = useCardEditor();

const profileName = ref(currentProfile.value.name);
const fileInput = ref<HTMLInputElement | null>(null);

const saveCurrentCard = () => {
  addCard({...cardEditModel});
};

const exportProfile = () => {
  downloadProfile();
};

const importProfile = () => {
  fileInput.value?.click();
};

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  try {
    await loadProfileFromFile(file);
    profileName.value = currentProfile.value.name;
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  } catch (error) {
    alert('加载牌组失败：' + (error instanceof Error ? error.message : '未知错误'));
  }
};
</script>

<style scoped>
</style> 