import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { calculateFinancingProjection, calculateInvestmentSimulation } from '../utils/calculations'

export const useCalculatorStore = defineStore('calculator', () => {
  // Form data
  const entryAmount = ref(0)
  const financingAmount = ref(300000)
  const monthlyPayment = ref(2500)
  const financingTime = ref(360) // in months
  const propertyValue = ref(400000)
  const propertyAnnualAppreciation = ref(5) // in percentage
  const desiredRent = ref(1800)
  const rentabilityPercentage = ref(0.9) // monthly percentage
  const vacancyTime = ref(1) // in months
  const annualInterestRatePercentage = ref(10) // in percentage

  // Results
  const totalFinancingDebt = computed(() => {
    const monthlyInterestRate = Math.pow(1 + annualInterestRatePercentage.value / 100, 1 / 12) - 1
    const totalFinancingDebt = financingAmount.value * Math.pow(1 + monthlyInterestRate, financingTime.value)

    return totalFinancingDebt
  })

  const totalPropertyCost = computed(() => {
    const totalCost = totalFinancingDebt.value + entryAmount.value
    return totalCost
  })

  const financingProjection = computed(() => {
    return calculateFinancingProjection({
      totalFinancingDebt: totalFinancingDebt.value,
      monthlyPayment: monthlyPayment.value,
      financingTime: financingTime.value,
      propertyValue: propertyValue.value,
      annualAppreciation: propertyAnnualAppreciation.value,
    })
  })

  const investmentSimulation = computed(() => {
    return calculateInvestmentSimulation({
      entryAmount: entryAmount.value,
      monthlyPayment: monthlyPayment.value,
      desiredRent: desiredRent.value,
      rentabilityPercentage: rentabilityPercentage.value,
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
    entryAmount,
    financingAmount,
    monthlyPayment,
    financingTime,
    propertyValue,
    desiredRent,
    propertyAnnualAppreciation,
    rentabilityPercentage,
    vacancyTime,
    annualInterestRatePercentage,
    
    // Computed results
    totalFinancingDebt,
    totalPropertyCost,
    financingProjection,
    investmentSimulation,
    
    // Formatting helpers
    formatCurrency,
    formatPercentage
  }
})