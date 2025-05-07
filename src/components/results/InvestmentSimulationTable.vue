<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';

const calculatorStore = useCalculatorStore();
const { t } = useI18n();
const showAllRows = ref(false);

const toggleRows = () => {
  showAllRows.value = !showAllRows.value;
};

// Filter the results based on showAllRows flag
const filteredSimulation = computed(() => {
  if (showAllRows.value) {
    return calculatorStore.investmentSimulation;
  } else {
    return calculatorStore.investmentSimulation.filter(item => 
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
        {{ t('results.investmentSimulationTable.title') }}
      </h3>
      <button 
        @click="toggleRows" 
        class="text-sm text-primary-600 hover:text-primary-800"
      >
        {{ showAllRows ? t('buttons.showLess') : t('buttons.showMore') }}
      </button>
    </div>
    
    <div class="overflow-x-auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>{{ t('results.investmentSimulationTable.month') }}</th>
            <th>{{ t('results.investmentSimulationTable.monthlyDifference') }}</th>
            <th>{{ t('results.investmentSimulationTable.investedAmount') }}</th>
            <th>{{ t('results.investmentSimulationTable.accumulatedBalance') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredSimulation" :key="item.month"
              :class="{'bg-primary-50': item.month === calculatorStore.financingTime}">
            <td>{{ item.month }}</td>
            <td>{{ calculatorStore.formatCurrency(item.monthlyDifference) }}</td>
            <td>{{ calculatorStore.formatCurrency(item.investedAmount) }}</td>
            <td :class="{'text-green-600 font-medium': item.balance > 0, 'text-red-600 font-medium': item.balance < 0}">
              {{ calculatorStore.formatCurrency(item.balance) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="p-4 bg-gray-50 border-t border-gray-200">
      <div class="text-sm text-gray-700">
        <p>
          <span class="font-medium">{{ t('results.investmentSimulationTable.monthlyDifferenceLabel') }}</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.monthlyPayment - calculatorStore.desiredRent) }}
        </p>
        <p class="flex items-center">
          <span class="font-medium">{{ t('results.investmentSimulationTable.totalInvestedWithoutReturns') }}</span>
          {{ calculatorStore.formatCurrency(calculatorStore.investmentSimulation[calculatorStore.investmentSimulation.length - 1].investedAmount) }}
          <span :title="t('results.investmentSimulationTable.totalInvestedWithoutReturnsTooltip')">
            <InformationCircleIcon class="h-4 text-gray-500 ml-1" />
          </span>
        </p>
        <p :class="{'text-green-600 font-medium': calculatorStore.investmentSimulation[calculatorStore.investmentSimulation.length - 1].balance > 0, 
                    'text-red-600 font-medium': calculatorStore.investmentSimulation[calculatorStore.investmentSimulation.length - 1].balance < 0, 
                    'text-base mt-2': true}">
          <span class="font-medium">{{ t('results.investmentSimulationTable.finalBalance') }}</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.investmentSimulation[calculatorStore.investmentSimulation.length - 1].balance) }}
        </p>
      </div>
    </div>
  </div>
</template>