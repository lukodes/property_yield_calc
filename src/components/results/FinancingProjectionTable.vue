<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';
import { ref, computed } from 'vue';

const calculatorStore = useCalculatorStore();
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
      <h3 class="text-lg font-medium text-gray-900">Projeção de Patrimônio com Financiamento</h3>
      <button 
        @click="toggleRows" 
        class="text-sm text-primary-600 hover:text-primary-800"
      >
        {{ showAllRows ? 'Mostrar menos' : 'Mostrar mais' }}
      </button>
    </div>
    
    <div class="overflow-x-auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Valor Pago</th>
            <th>Saldo Devedor</th>
            <th>Valor do Imóvel</th>
            <th>Patrimônio Total</th>
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
        <p><span class="font-medium">Total investido:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.financingProjection[calculatorStore.financingProjection.length - 1].paidAmount) }}
        </p>
        <p><span class="font-medium">Valor final do imóvel:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.financingProjection[calculatorStore.financingProjection.length - 1].propertyValue) }}
        </p>
        <p class="text-base font-medium text-primary-700 mt-2">
          <span class="font-medium">Patrimônio total ao final:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.financingProjection[calculatorStore.financingProjection.length - 1].totalEquity) }}
        </p>
      </div>
    </div>
  </div>
</template>