<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';

const calculatorStore = useCalculatorStore();
</script>

<template>
  <div class="form-section">
    <h3 class="form-section-title">Condições do Financiamento</h3>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="space-y-2">
        <label for="financingAmount" class="block text-sm font-medium text-gray-700">
          Valor a ser financiado
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">R$</span>
          </div>
          <input
            type="number"
            id="financingAmount"
            v-model="calculatorStore.financingAmount"
            class="input-field pl-10"
            placeholder="0,00"
            min="0"
            step="1000"
          />
        </div>
      </div>
      
      <div class="space-y-2">
        <label for="monthlyPayment" class="block text-sm font-medium text-gray-700">
          Valor da parcela mensal
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">R$</span>
          </div>
          <input
            type="number"
            id="monthlyPayment"
            v-model="calculatorStore.monthlyPayment"
            class="input-field pl-10"
            placeholder="0,00"
            min="0"
            step="100"
          />
        </div>
      </div>
      
      <div class="space-y-2 md:col-span-2">
        <label for="financingTime" class="block text-sm font-medium text-gray-700">
          Tempo de financiamento (meses)
        </label>
        <input
          type="number"
          id="financingTime"
          v-model="calculatorStore.financingTime"
          class="input-field"
          placeholder="360"
          min="12"
          max="480"
        />
        <p class="text-sm text-gray-500">
          {{ Math.floor(calculatorStore.financingTime / 12) }} anos e {{ calculatorStore.financingTime % 12 }} meses
        </p>
      </div>
    </div>
  </div>
</template>