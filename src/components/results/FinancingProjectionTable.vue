<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const calculatorStore = useCalculatorStore();
const { t } = useI18n();

const showAllRows = ref(false);

const toggleRows = () => {
  showAllRows.value = !showAllRows.value;
};

// Filter the results based on showAllRows flag
const filteredProjection = computed(() => {
  if (showAllRows.value) {
    return calculatorStore.financingProjection;
  } else {
    return calculatorStore.financingProjection.filter(item => 
      item.month === 1 || 
      item.month === calculatorStore.financingTime || 
      item.month % 60 === 0
    );
  }
});
</script>

<template>
  <div class="card table-container">
    <div class="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">
        {{ t('results.financingProjection.title') }}
      </h3>
      <button 
        @click="toggleRows" 
        class="text-sm text-primary-600 hover:text-primary-800"
      >
        {{ showAllRows ? t('results.buttons.showLess') : t('results.buttons.showMore') }}
      </button>
    </div>
    
    <div class="overflow-x-auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>{{ t('results.financingProjection.month') }}</th>
            <th>{{ t('results.financingProjection.paidAmount') }}</th>
            <th>{{ t('results.financingProjection.remainingDebt') }}</th>
            <th>{{ t('results.financingProjection.propertyValue') }}</th>
            <th>{{ t('results.financingProjection.totalEquity') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredProjection" :key="item.month" 
              :class="{'bg-primary-50': item.month === calculatorStore.financingTime}">
            <td>{{ item.month }}</td>
            <td>{{ calculatorStore.formatCurrency(item.paidAmount) }}</td>
            <td>{{ calculatorStore.formatCurrency(item.remainingDebt) }}</td>
            <td>{{ calculatorStore.formatCurrency(item.propertyValue) }}</td>
            <td class="font-medium text-primary-700">
              {{ calculatorStore.formatCurrency(item.totalEquity) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="p-4 bg-gray-50 border-t border-gray-200">
      <div class="text-sm text-gray-700">
        <p>
          <span class="font-medium">{{ t('results.financingProjection.totalInvested') }}:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.financingProjection[calculatorStore.financingProjection.length - 1].paidAmount) }}
        </p>
        <p>
          <span class="font-medium">{{ t('results.financingProjection.finalPropertyValue') }}:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.financingProjection[calculatorStore.financingProjection.length - 1].propertyValue) }}
        </p>
        <p class="text-base font-medium text-primary-700 mt-2">
          <span class="font-medium">{{ t('results.financingProjection.finalTotalEquity') }}:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.financingProjection[calculatorStore.financingProjection.length - 1].totalEquity) }}
        </p>
      </div>
    </div>
  </div>
</template>