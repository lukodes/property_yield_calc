<script setup lang="ts">
import { useRouter } from 'vue-router';
import FinancingConditionsForm from './FinancingConditionsForm.vue';
import PropertyParametersForm from './PropertyParametersForm.vue';
import InvestmentSimulationForm from './InvestmentSimulationForm.vue';

const router = useRouter();

const generateSimulation = () => {
  router.push('/results');
};
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <form @submit.prevent="generateSimulation" class="space-y-4">
      <FinancingConditionsForm />
      <PropertyParametersForm />
      <InvestmentSimulationForm />
      
      <div class="flex justify-center mt-8">
        <button 
          type="submit" 
          class="btn-primary px-8 py-3 text-base"
        >
          Gerar Simulação
        </button>
      </div>
    </form>
  </div>
</template>