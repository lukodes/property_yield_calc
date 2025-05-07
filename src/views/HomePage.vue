<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import CalculatorForm from '../components/form/CalculatorForm.vue';

const { t } = useI18n();
</script>

<template>
  <div class="py-4">
    <div class="container mx-auto px-4">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold mb-2">{{ t('homePage.title') }}</h1>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          {{ t('homePage.description') }}
        </p>
      </header>
      
      <CalculatorForm />
    </div>
  </div>
</template>