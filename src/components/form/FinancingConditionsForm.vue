<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';

const calculatorStore = useCalculatorStore();
</script>

<template>
  <div class="form-section">
    <h3 class="form-section-title">Condições do Financiamento</h3>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div class="space-y-2">
        <label for="entryAmount" class="block text-sm font-medium text-gray-700">
          Valor de entrada / Ato
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">R$</span>
          </div>
          <input
            type="number"
            id="entryAmount"
            v-model="calculatorStore.entryAmount"
            class="input-field pl-10"
            placeholder="0,00"
            min="0"
            step="10"
            title="Valor inicial pago no ato da compra do imóvel."
          />
        </div>
      </div>

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
            step="100"
            title="Montante total que será financiado pelo banco ou instituição financeira."
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
            title="Valor que será pago mensalmente para quitar o financiamento."
          />
        </div>
      </div>

      <div class="space-y-2">
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
          title="Duração total do financiamento em meses."
        />
        <p class="text-sm text-gray-500">
          {{ Math.floor(calculatorStore.financingTime / 12) }} anos e {{ calculatorStore.financingTime % 12 }} meses
        </p>
      </div>

      <div class="space-y-2">
        <label for="annualInterestRatePercentage" class="block text-sm font-medium text-gray-700">
          Taxa de juros do financiamento a.a. (%)
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <input
            type="number"
            id="annualInterestRatePercentage"
            v-model="calculatorStore.annualInterestRatePercentage"
            class="input-field pr-12"
            placeholder="10"
            min="0"
            step="0.1"
            title="Taxa de juros anual aplicada ao financiamento."
          />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>