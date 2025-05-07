<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const changeLocale = (newLocale: string) => {
  locale.value = newLocale;
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="p-4 bg-gray-800 text-white">
      <select @change="changeLocale(($event.target as HTMLSelectElement).value || 'pt-BR')" class="bg-gray-700 text-white p-2 rounded">
        <option value="pt-BR">Português (BR)</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </header>
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>