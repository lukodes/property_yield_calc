<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';
import { useI18n } from 'vue-i18n';

const calculatorStore = useCalculatorStore();
const { t } = useI18n();
</script>

<template>
  <div class="form-section">
    <h3 class="form-section-title">{{ t('propertyParameters.title') }}</h3>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="space-y-2">
        <label for="propertyValue" class="block text-sm font-medium text-gray-700">
          {{ t('propertyParameters.propertyValue') }}
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
            :title="t('propertyParameters.propertyValue')"
          />
        </div>
      </div>
      
      <div class="space-y-2">
        <label for="desiredRent" class="block text-sm font-medium text-gray-700">
          {{ t('propertyParameters.desiredRent') }}
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
            :title="t('propertyParameters.desiredRent')"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label for="propertyAnnualAppreciation" class="block text-sm font-medium text-gray-700">
          {{ t('propertyParameters.annualAppreciation') }}
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <input
            type="number"
            id="propertyAnnualAppreciation"
            v-model="calculatorStore.propertyAnnualAppreciation"
            class="input-field pr-12"
            placeholder="5"
            min="0"
            step="0.1"
            :title="t('propertyParameters.annualAppreciation')"
          />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>