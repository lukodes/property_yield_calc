<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';

const calculatorStore = useCalculatorStore();
</script>

<template>
  <div class="form-section">
    <h3 class="form-section-title">Parâmetros do Imóvel</h3>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="space-y-2">
        <label for="propertyValue" class="block text-sm font-medium text-gray-700">
          Valor total do imóvel
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">R$</span>
          </div>
          <input
            type="number"
            id="propertyValue"
            v-model="calculatorStore.propertyValue"
            class="input-field pl-10"
            placeholder="0,00"
            min="0"
            step="1000"
          />
        </div>
      </div>
      
      <div class="space-y-2">
        <label for="desiredRent" class="block text-sm font-medium text-gray-700">
          Valor do aluguel pretendido
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">R$</span>
          </div>
          <input
            type="number"
            id="desiredRent"
            v-model="calculatorStore.desiredRent"
            class="input-field pl-10"
            placeholder="0,00"
            min="0"
            step="100"
          />
        </div>
      </div>
    </div>
  </div>
</template>