<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';

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
          <span class="font-medium">Valor financiado:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.financingAmount) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Valor total pago no financiamento:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.totalFinancingDebt) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Valor do imóvel inicial:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.propertyValue) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Valor total gasto no imóvel:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.totalPropertyCost) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">Valorização anual do imóvel:</span> 
          {{ calculatorStore.propertyAnnualAppreciation }}%
        </p>
        <p class="text-sm">
          <span class="font-medium">Tempo de financiamento:</span> 
          {{ Math.floor(calculatorStore.financingTime / 12) }} anos e {{ calculatorStore.financingTime % 12 }} meses
        </p>
        <p class="text-lg font-medium text-primary-700 flex items-center gap-1">
          <span>Patrimônio final</span>
          <span title="Valor do imóvel ao fim do financiamento considerando a taxa de valorização.">
            <InformationCircleIcon class="h-5 w-5 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(financingResult.totalEquity) }}
        </p>
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium text-accent-700">Cenário com Aluguel e Investimento</h3>
        <p class="text-sm flex items-center gap-1">
          <span class="font-medium">Valor de entrada do imóvel</span>
          <span title="Valor inicial pago na entrada do imóvel. É considerado como investimento no cenário sem financiamento.">
            <InformationCircleIcon class="h-4 w-4 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(calculatorStore.entryAmount) }}
        </p>
        <p class="text-sm flex items-center gap-1">
          <span class="font-medium">Valor gasto no período de vacância</span>
          <span title="Valor total gasto durante o tempo estimado sem inquilino. Calculado: aluguel multiplicado pelos meses de vacância. No cenário de investimento é contabilizado somado ao valor de entrada como montande inicial a render juros.">
            <InformationCircleIcon class="h-4 w-4 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(calculatorStore.vacancyTime * calculatorStore.monthlyPayment) }}
        </p>
        <p class="text-sm flex items-center gap-1">
          <span class="font-medium">Diferença mensal investida</span>
          <span title="Diferença entre o valor da parcela do financiamento e o aluguel desejado. Esse valor é investido mensalmente.">
            <InformationCircleIcon class="h-4 w-4 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(investmentResult.monthlyDifference) }}
        </p>
        <p class="text-sm flex items-center gap-1">
          <span class="font-medium">Valor total aportado s/ rendimentos</span>
          <span title="Valor total investido ao longo do tempo de financiamento. Calculado: diferença mensal multiplicada pelo tempo de financiamento, sem considerar a rentabilidade.">
            <InformationCircleIcon class="h-4 w-4 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(
            investmentResult.monthlyDifference * calculatorStore.financingTime
          ) }}
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
                    'text-lg': true}"
           class="flex items-center gap-1">
          <span>Saldo final</span>
          <span title="Valor total acumulado com os investimentos mensais e rendimento composto. Representa o patrimônio final ao investir todo mês o valor que seria pago na diferença do aluguel mais o montante inicial sob a taxa de juros.">
            <InformationCircleIcon class="h-5 w-5 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(investmentResult.finalBalance) }}
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
