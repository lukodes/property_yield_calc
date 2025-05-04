<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';

const calculatorStore = useCalculatorStore();
</script>

<template>
  <div class="form-section">
    <h3 class="form-section-title">Investimento Simulado</h3>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="space-y-2">
        <label for="rentabilityPercentage" class="block text-sm font-medium text-gray-700">
          Rentabilidade esperada mensal (%)
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <input
            type="number"
            id="rentabilityPercentage"
            v-model="calculatorStore.rentabilityPercentage"
            class="input-field pr-12"
            placeholder="0,90"
            min="0"
            step="0.1"
            title="Percentual de rentabilidade mensal esperada para o investimento."
          />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
      </div>
      
      <div class="space-y-2">
        <label for="vacancyTime" class="block text-sm font-medium text-gray-700">
          Tempo de vacância estimado (meses)
        </label>
        <input
          type="number"
          id="vacancyTime"
          v-model="calculatorStore.vacancyTime"
          class="input-field"
          placeholder="1"
          min="0"
          max="100"
          title="Número estimado de meses em que o imóvel ficará desocupado."
        />
      </div>
    </div>
  </div>
</template>