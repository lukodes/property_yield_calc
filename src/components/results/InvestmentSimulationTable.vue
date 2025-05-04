<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';
import { ref, computed } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';

const calculatorStore = useCalculatorStore();
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
      <h3 class="text-lg font-medium text-gray-900">Simulação de Investimento (Diferença entre Parcela e Aluguel)</h3>
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
            <th>Diferença Mensal</th>
            <th>Valor Investido</th>
            <th>Saldo Acumulado</th>
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
        <p><span class="font-medium">Diferença mensal entre parcela e aluguel:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.monthlyPayment - calculatorStore.desiredRent) }}
        </p>
        <p class="flex items-center">
          <span class="font-medium">
            Valor total investido s/ rendimentos:
          </span>
          {{ calculatorStore.formatCurrency(calculatorStore.investmentSimulation[calculatorStore.investmentSimulation.length - 1].investedAmount) }}

          <span  title="Esse valor só leva em consideração o total investido bruto, sem os rendimentos sob juros composto.">
            <InformationCircleIcon class="h-4 text-gray-500 ml-1" />
          </span>
        </p>
        <p :class="{'text-green-600 font-medium': calculatorStore.investmentSimulation[calculatorStore.investmentSimulation.length - 1].balance > 0, 
                    'text-red-600 font-medium': calculatorStore.investmentSimulation[calculatorStore.investmentSimulation.length - 1].balance < 0, 
                    'text-base mt-2': true}">
          <span class="font-medium">Saldo final:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.investmentSimulation[calculatorStore.investmentSimulation.length - 1].balance) }}
        </p>
      </div>
    </div>
  </div>
</template>