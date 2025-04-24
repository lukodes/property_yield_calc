<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const calculatorStore = useCalculatorStore();
const router = useRouter();

const financingResult = computed(() => {
  const lastItem = calculatorStore.financingProjection[calculatorStore.financingProjection.length - 1];
  return {
    totalPaid: lastItem.paidAmount,
    finalPropertyValue: lastItem.propertyValue,
    totalEquity: lastItem.totalEquity
  };
});

const investmentResult = computed(() => {
  const lastItem = calculatorStore.investmentSimulation[calculatorStore.investmentSimulation.length - 1];
  return {
    monthlyDifference: calculatorStore.monthlyPayment - calculatorStore.desiredRent,
    totalInvested: lastItem.investedAmount,
    finalBalance: lastItem.balance
  };
});

const navigateToForm = () => {
  router.push('/');
};
</script>

<template>
  <div class="card mb-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Resumo da Simulação</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <h3 class="text-lg font-medium text-primary-800">Cenário com Financiamento</h3>
        <p class="text-sm">
          <span class="font-medium">Valor financiado:</span> {{ calculatorStore.formatCurrency(calculatorStore.financingAmount) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Valor do imóvel inicial:</span> {{ calculatorStore.formatCurrency(calculatorStore.propertyValue) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Valorização anual do imóvel:</span> {{ calculatorStore.propertyAnnualAppreciation }}%
        </p>
        <p class="text-sm">
          <span class="font-medium">Tempo de financiamento:</span> 
          {{ Math.floor(calculatorStore.financingTime / 12) }} anos e {{ calculatorStore.financingTime % 12 }} meses
        </p>
        <p class="text-lg font-medium text-primary-700">
          <span>Patrimônio final:</span> {{ calculatorStore.formatCurrency(financingResult.totalEquity) }}
        </p>
      </div>
      
      <div class="space-y-3">
        <h3 class="text-lg font-medium text-accent-700">Cenário com Aluguel e Investimento</h3>
        <p class="text-sm">
          <span class="font-medium">Diferença mensal investida:</span> 
          {{ calculatorStore.formatCurrency(investmentResult.monthlyDifference) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Tempo de vacância considerado:</span> 
          {{ calculatorStore.vacancyTime }} meses
        </p>
        <p class="text-sm">
          <span class="font-medium">Rentabilidade mensal:</span> 
          {{ calculatorStore.rentabilityPercentage }}%
        </p>
        <p :class="{'text-green-600 font-medium': investmentResult.finalBalance > 0, 
                    'text-red-600 font-medium': investmentResult.finalBalance < 0, 
                    'text-lg': true}">
          <span>Saldo final:</span> {{ calculatorStore.formatCurrency(investmentResult.finalBalance) }}
        </p>
      </div>
    </div>
    
    <div class="border-t border-gray-200 mt-6 pt-4">
      <div class="flex justify-between items-center">
        <p class="text-sm font-medium">
          Diferença entre cenários:
          <span :class="{'text-green-600': financingResult.totalEquity > investmentResult.finalBalance, 
                          'text-red-600': financingResult.totalEquity < investmentResult.finalBalance}">
            {{ calculatorStore.formatCurrency(financingResult.totalEquity - investmentResult.finalBalance) }}
            {{ financingResult.totalEquity > investmentResult.finalBalance ? 'a favor do financiamento' : 'a favor do investimento' }}
          </span>
        </p>
        <button
          @click="navigateToForm"
          class="text-sm text-primary-600 hover:text-primary-800"
        >
          Alterar parâmetros
        </button>
      </div>
    </div>
  </div>
</template>