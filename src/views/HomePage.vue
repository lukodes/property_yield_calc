<script setup lang="ts">
import { onMounted } from 'vue';
import CalculatorForm from '../components/form/CalculatorForm.vue';
</script>

<template>
  <div class="py-4">
    <div class="container mx-auto px-4">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold mb-2">Calculadora Financeira</h1>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          Compare cenários de financiamento imobiliário e investimentos alternativos para tomar a melhor decisão financeira.
        </p>
      </header>
      
      <CalculatorForm />
    </div>
  </div>
</template>