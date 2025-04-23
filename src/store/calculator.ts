import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { calculateFinancingProjection, calculateInvestmentSimulation } from '../utils/calculations'

export const useCalculatorStore = defineStore('calculator', () => {
  // Form data
  const financingAmount = ref(300000)
  const monthlyPayment = ref(2500)
  const financingTime = ref(360) // in months
  const propertyValue = ref(400000)
  const desiredRent = ref(1800)
  const expectedReturn = ref(0.9) // monthly percentage
  const vacancyTime = ref(1) // in months

  // Results
  const financingProjection = computed(() => {
    return calculateFinancingProjection({
      financingAmount: financingAmount.value,
      monthlyPayment: monthlyPayment.value,
      financingTime: financingTime.value,
      propertyValue: propertyValue.value,
      annualAppreciation: 5, // 5% annual property appreciation
    })
  })

  const investmentSimulation = computed(() => {
    return calculateInvestmentSimulation({
      monthlyPayment: monthlyPayment.value,
      desiredRent: desiredRent.value,
      expectedReturn: expectedReturn.value,
      financingTime: financingTime.value,
      vacancyTime: vacancyTime.value,
    })
  })

  // Format currency values
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value)
  }

  // Format percentage values
  const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'percent', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).format(value / 100)
  }

  return {
    // Form data
    financingAmount,
    monthlyPayment,
    financingTime,
    propertyValue,
    desiredRent,
    expectedReturn,
    vacancyTime,
    
    // Computed results
    financingProjection,
    investmentSimulation,
    
    // Formatting helpers
    formatCurrency,
    formatPercentage
  }
})