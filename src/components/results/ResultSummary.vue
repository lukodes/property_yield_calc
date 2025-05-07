<script setup lang="ts">
import { useCalculatorStore } from '../../store/calculator';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';

const calculatorStore = useCalculatorStore();
const router = useRouter();
const { t } = useI18n();

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
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ t('results.resultSummary.title') }}</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <h3 class="text-lg font-medium text-primary-800">{{ t('results.resultSummary.financingScenario') }}</h3>
        <p class="text-sm">
          <span class="font-medium">{{ t('results.resultSummary.financedAmount') }}:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.financingAmount) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">{{ t('results.resultSummary.totalPaid') }}:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.totalFinancingDebt) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">{{ t('results.resultSummary.initialPropertyValue') }}:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.propertyValue) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">{{ t('results.resultSummary.totalPropertyCost') }}:</span> 
          {{ calculatorStore.formatCurrency(calculatorStore.totalPropertyCost) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">{{ t('results.resultSummary.annualAppreciation') }}:</span> 
          {{ calculatorStore.propertyAnnualAppreciation }}%
        </p>
        <p class="text-sm">
          <span class="font-medium">{{ t('results.resultSummary.financingTime') }}:</span> 
          {{ Math.floor(calculatorStore.financingTime / 12) }} {{ t('results.resultSummary.years') }} 
          {{ calculatorStore.financingTime % 12 }} {{ t('results.resultSummary.months') }}
        </p>
        <p class="text-lg font-medium text-primary-700 flex items-center gap-1">
          <span>{{ t('results.resultSummary.finalEquity') }}</span>
          <span :title="t('results.resultSummary.finalEquityTooltip')">
            <InformationCircleIcon class="h-5 w-5 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(financingResult.totalEquity) }}
        </p>
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium text-accent-700">{{ t('results.resultSummary.investmentScenario') }}</h3>
        <p class="text-sm flex items-center gap-1">
          <span class="font-medium">{{ t('results.resultSummary.entryAmount') }}</span>
          <span :title="t('results.resultSummary.entryAmountTooltip')">
            <InformationCircleIcon class="h-4 w-4 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(calculatorStore.entryAmount) }}
        </p>
        <p class="text-sm flex items-center gap-1">
          <span class="font-medium">{{ t('results.resultSummary.vacancyCost') }}</span>
          <span :title="t('results.resultSummary.vacancyCostTooltip')">
            <InformationCircleIcon class="h-4 w-4 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(calculatorStore.vacancyTime * calculatorStore.monthlyPayment) }}
        </p>
        <p class="text-sm flex items-center gap-1">
          <span class="font-medium">{{ t('results.resultSummary.monthlyDifference') }}</span>
          <span :title="t('results.resultSummary.monthlyDifferenceTooltip')">
            <InformationCircleIcon class="h-4 w-4 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(investmentResult.monthlyDifference) }}
        </p>
        <p class="text-sm flex items-center gap-1">
          <span class="font-medium">{{ t('results.resultSummary.totalInvestedWithoutReturns') }}</span>
          <span :title="t('results.resultSummary.totalInvestedWithoutReturnsTooltip')">
            <InformationCircleIcon class="h-4 w-4 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(
            investmentResult.monthlyDifference * (calculatorStore.financingTime - calculatorStore.vacancyTime)
          ) }}
        </p>
        <p class="text-sm">
          <span class="font-medium">{{ t('results.resultSummary.vacancyTime') }}:</span> 
          {{ calculatorStore.vacancyTime }} {{ t('results.resultSummary.months') }}
        </p>
        <p class="text-sm">
          <span class="font-medium">{{ t('results.resultSummary.monthlyReturn') }}:</span> 
          {{ calculatorStore.rentabilityPercentage }}%
        </p>
        <p :class="{'text-green-600 font-medium': investmentResult.finalBalance > 0, 
                    'text-red-600 font-medium': investmentResult.finalBalance < 0, 
                    'text-lg': true}"
           class="flex items-center gap-1">
          <span>{{ t('results.resultSummary.finalBalance') }}</span>
          <span :title="t('results.resultSummary.finalBalanceTooltip')">
            <InformationCircleIcon class="h-5 w-5 text-gray-500" />
          </span>
          {{ calculatorStore.formatCurrency(investmentResult.finalBalance) }}
        </p>
      </div>
    </div>

    <div class="border-t border-gray-200 mt-6 pt-4">
      <div class="flex justify-between items-center">
        <p class="text-sm font-medium">
          {{ t('results.resultSummary.scenarioDifference') }}:
          <span :class="{'text-green-600': financingResult.totalEquity > investmentResult.finalBalance, 
                          'text-red-600': financingResult.totalEquity < investmentResult.finalBalance}">
            {{ calculatorStore.formatCurrency(financingResult.totalEquity - investmentResult.finalBalance) }}
            {{ financingResult.totalEquity > investmentResult.finalBalance 
              ? t('results.resultSummary.favorFinancing') 
              : t('results.resultSummary.favorInvestment') }}
          </span>
        </p>
        <button
          @click="navigateToForm"
          class="text-sm text-primary-600 hover:text-primary-800"
        >
          {{ t('results.resultSummary.changeParameters') }}
        </button>
      </div>
    </div>
  </div>
</template>