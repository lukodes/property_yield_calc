<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';
import { useI18n } from 'vue-i18n';

const calculatorStore = useCalculatorStore();
const { t } = useI18n();
</script>

<template>
  <div class="form-section">
    <h3 class="form-section-title">{{ t('financingConditions.title') }}</h3>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div class="space-y-2">
        <label for="entryAmount" class="block text-sm font-medium text-gray-700">
          {{ t('financingConditions.entryAmount') }}
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
            :title="t('financingConditions.entryAmount')"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label for="financingAmount" class="block text-sm font-medium text-gray-700">
          {{ t('financingConditions.financingAmount') }}
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
            :title="t('financingConditions.financingAmount')"
          />
        </div>
      </div>
      
      <div class="space-y-2">
        <label for="monthlyPayment" class="block text-sm font-medium text-gray-700">
          {{ t('financingConditions.monthlyPayment') }}
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
            :title="t('financingConditions.monthlyPayment')"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label for="financingTime" class="block text-sm font-medium text-gray-700">
          {{ t('financingConditions.financingTime') }}
        </label>
        <input
          type="number"
          id="financingTime"
          v-model="calculatorStore.financingTime"
          class="input-field"
          placeholder="360"
          min="12"
          max="480"
          :title="t('financingConditions.financingTime')"
        />
        <p class="text-sm text-gray-500">
          {{ t('financingConditions.yearsAndMonths', {
            years: Math.floor(calculatorStore.financingTime / 12),
            months: calculatorStore.financingTime % 12,
          }) }}
        </p>
      </div>

      <div class="space-y-2">
        <label for="annualInterestRatePercentage" class="block text-sm font-medium text-gray-700">
          {{ t('financingConditions.annualInterestRate') }}
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
            :title="t('financingConditions.annualInterestRate')"
          />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>