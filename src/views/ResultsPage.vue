<script setup lang="ts">
import ResultSummary from '../components/results/ResultSummary.vue';
import FinancingProjectionTable from '../components/results/FinancingProjectionTable.vue';
import InvestmentSimulationTable from '../components/results/InvestmentSimulationTable.vue';
</script>

<template>
  <div class="bg-gray-50 py-4">
    <div class="container mx-auto px-4 max-w-6xl">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Resultados da Simulação</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Analise as projeções detalhadas de financiamento e investimento alternativo.
        </p>
      </header>
      
      <ResultSummary />
      
      <div class="space-y-8">
        <FinancingProjectionTable />
        <InvestmentSimulationTable />
      </div>
    </div>
  </div>
</template>