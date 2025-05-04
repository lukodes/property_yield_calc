interface FinancingProjectionParams {
  totalFinancingDebt: number;
  monthlyPayment: number;
  financingTime: number;
  propertyValue: number;
  annualAppreciation: number;
}

interface InvestmentSimulationParams {
  entryAmount: number;
  monthlyPayment: number;
  desiredRent: number;
  rentabilityPercentage: number;
  financingTime: number;
  vacancyTime: number;
}

interface MonthlyProjection {
  month: number;
  paidAmount: number;
  remainingDebt: number;
  propertyValue: number;
  totalEquity: number;
}

interface MonthlyInvestment {
  month: number;
  monthlyDifference: number;
  investedAmount: number;
  balance: number;
}

// Calculate property financing projection
export function calculateFinancingProjection(params: FinancingProjectionParams): MonthlyProjection[] {
  const {
    totalFinancingDebt,
    monthlyPayment,
    financingTime,
    propertyValue,
    annualAppreciation,
  } = params;

  const monthlyAppreciation = Math.pow(1 + annualAppreciation / 100, 1 / 12) - 1;
  const result: MonthlyProjection[] = [];
  
  let currentRemainingDebt = totalFinancingDebt;
  let currentPaidAmount = 0;
  let currentPropertyValue = propertyValue;
  
  // Calculate for each month
  for (let month = 1; month <= financingTime; month++) {
    // Update property value with monthly appreciation
    currentPropertyValue = currentPropertyValue * (1 + monthlyAppreciation);
    
    // Update paid amount with monthly payment
    currentPaidAmount += monthlyPayment;
    
    // Simple linear debt reduction (this is a simplification)
    currentRemainingDebt = totalFinancingDebt - (totalFinancingDebt / financingTime * month);
    if (currentRemainingDebt < 0) currentRemainingDebt = 0;
    
    // Calculate equity (property value minus remaining debt)
    const totalEquity = currentPropertyValue - currentRemainingDebt;
    
    // Add to results
    result.push({
      month,
      paidAmount: currentPaidAmount,
      remainingDebt: currentRemainingDebt,
      propertyValue: currentPropertyValue,
      totalEquity
    });
    
    // Add yearly data points only for performance (except first and last year)
    if (month < financingTime && month % 12 !== 0 && month !== 1) {
      // Remove last added month for performance if not a significant point
      result.pop();
    }
  }
  
  return result;
}

// Calculate investment simulation with the difference between mortgage payment and rent
export function calculateInvestmentSimulation(params: InvestmentSimulationParams): MonthlyInvestment[] {
  const {
    entryAmount,
    monthlyPayment,
    desiredRent,
    rentabilityPercentage,
    financingTime,
    vacancyTime
  } = params;

  const result: MonthlyInvestment[] = [];
  
  // Calculate monthly difference (positive means investing, negative means additional cost)
  const monthlyDifference = monthlyPayment - desiredRent;
  
  // Calculate initial vacancy cost (added to first month)
  const vacancyCost = desiredRent * vacancyTime;
  
  let investedAmount = entryAmount + vacancyCost;
  let balance = investedAmount;
  
  // Calculate for each month
  for (let month = 1; month <= financingTime; month++) {
    // Update invested amount with monthly difference
    if (monthlyDifference > 0) {
      investedAmount += monthlyDifference;
    }
    
    // Apply monthly return on balance
    const monthlyInterest = balance * (rentabilityPercentage / 100);
    
    // Update balance with monthly difference and interest
    balance = balance + monthlyDifference + monthlyInterest;
    
    // Add to results
    result.push({
      month,
      monthlyDifference,
      investedAmount,
      balance
    });
    
    // Add yearly data points only for performance (except first and last year)
    if (month < financingTime && month % 12 !== 0 && month !== 1) {
      // Remove last added month for performance if not a significant point
      result.pop();
    }
  }
  
  return result;
}