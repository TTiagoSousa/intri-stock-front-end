import React, { useState } from 'react';
import './Compound_Interest_Calculator.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import Simple_Input_And_Lable from '../../../Components/Inputs/Simple_Input_And_Lable/Simple_Input_And_Lable';
import Simple_Button from '../../../Components/Buttons/Simple_Button/Simple_Button';
import Simple_Selector_And_Lable from '../../../Components/Selectors/Simple_Selector_And_Lable/Simple_Selector_And_Lable';
import { useCompoundInterestCalculator } from '../../../Hooks/Compound_Interest/useCompoundInterestCalculator';
import Simple_Alert from '../../../Components/Alerts/Simple_Alert/Simple_Alert';
import Investment_Table from './Components/Investment_Table';

const Compound_Interest_Calculator = () => {

  const { t } = useTranslation();

  const interestFrequencyOptions = [
    { label: t('Monthly'), value: 'monthly' },
    { label: t('Quarterly'), value: 'quarterly' },
    { label: t('Yearly'), value: 'yearly' }
  ];

  const contributionFrequencyOptions = [
    { label: t('Monthly'), value: 'monthly' },
    { label: t('Quarterly'), value: 'quarterly' },
    { label: t('Yearly'), value: 'yearly' }
  ];

  const {
    initialInvestment, setInitialInvestment,
    duration, setDuration,
    additionalInvestment, setAdditionalInvestment,
    interestRate, setInterestRate,
    interestFrequency, setInterestFrequency,
    contributionFrequency, setContributionFrequency,
    negotiationFeeRate, setNegotiationFeeRate,
    expenseFeeRate, setExpenseFeeRate,
    calculateCompoundInterest,
    calculationResult
  } = useCompoundInterestCalculator();

  const isDisableCalculatorButton = !initialInvestment || !duration || !additionalInvestment || !interestRate || !interestFrequency || !contributionFrequency;
  
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    setIsLoading(true); // Ativa o loading antes da simulação
    await calculateCompoundInterest(); // Calcula a simulação
    setIsLoading(false); // Desativa o loading após a simulação ser concluída
  }

  console.log(calculationResult);

  return (
    <div className='Compound_Interest_Calculator'>

      <div className='Alert'>
        <Simple_Alert  />
      </div>

      <section className='Info'>
        <div className='Container'>
          <span>{t("Compound Interest Calculator")}</span>
          <span>{t("Compound interest is a financial concept where interest is calculated not only on the initial amount (principal) but also on the accumulated interest from previous periods. In other words, compound interest generates interest on interest.")}</span>
          <Link>{t("Learn more about Compound Interest >")}</Link>
        </div>
      </section>
      <section className='Form_Calculator'>
        <div className='Form_Calculator_Container'>
          <div className='Header'>
            <span>{t("Calculator")}</span>
          </div>
          <form action="">
            <div className="Input_Field">
              <Simple_Input_And_Lable
                label_text={t('Initial Investment')}
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable
                label_text={t('Duration by years')}
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable
                label_text={t('Additional Investment')}
                type="number"
                value={additionalInvestment}
                onChange={(e) => setAdditionalInvestment(e.target.value)}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable
                label_text={t('Interest rate')}
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable
                label_text={t('Negotiation fee rate (optional)')}
                type="number"
                value={negotiationFeeRate}
                onChange={(e) => setNegotiationFeeRate(e.target.value)}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable
                label_text={t('Expense fee rate (optional)')}
                type="number"
                value={expenseFeeRate}
                onChange={(e) => setExpenseFeeRate(e.target.value)}
              />
            </div>
            <div className="Input_Field">
              <Simple_Selector_And_Lable
                label_text={t('Compound Interest Frequency')}
                options={interestFrequencyOptions}
                value={interestFrequency}
                onChange={setInterestFrequency}
              />
            </div>
            <div className="Input_Field">
              <Simple_Selector_And_Lable
                label_text={t('Contribution Frequency')}
                options={contributionFrequencyOptions}
                value={contributionFrequency}
                onChange={setContributionFrequency}
              />
            </div>
            <div className="Button_Field">
              <Simple_Button
                text={t('Save')}
                disabled={true}
              />
            </div>
            <div className="Button_Field">
              <Simple_Button
                text={t('Calculate')}
                onClick={handleCalculate}
                disabled={isDisableCalculatorButton}
              />
            </div>
          </form>
        </div>
        <div className='Form_Info'>
          <div className='Header'>
            <span>{t("Result")}</span>
          </div>
          <div className='Content'>
            {isLoading ? (
              <div className="Loading"></div>
            ) : calculationResult ? (
              <>
                <div className='Content_With_Results'>
                  <div>
                    <span>{t("Final amount")}</span> <span>{calculationResult.finalAmount}</span>
                  </div>
                  <div>
                    <span>{t("Accumulated interest")}</span> <span>{calculationResult.accumulatedInterest}</span>
                  </div>
                  <div>
                    <span>{t("Total invested")}</span> <span>{calculationResult.totalInvested}</span>
                  </div>
                  <div>
                    <span>{t("Interst rate")}</span> <span>{calculationResult.annualInterestRatePercent} <span>%</span></span>
                  </div>
                  <div>
                    <span>{t("Expense fee rate")}</span> <span>{calculationResult.totalPaidInFees.expenseFeeRate}</span>
                  </div>
                  <div>
                    <span>{t("Negotiation fee rate")}</span> <span>{calculationResult.totalPaidInFees.negotiationFeeRate}</span>
                  </div>
                  <div>
                    <span>{t("Total fees paid")}</span> <span>{calculationResult.totalPaidInFees.totalPaid}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className='Content_No_Result'>
                <span>{t("Make your simulation now and discover how your investment can grow over time! Calculate compound interest and explore different scenarios to see how small changes can significantly impact your financial goals. Understand the power of compound interest and find out how you can maximize your returns over the long term")}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {calculationResult?.monthlyBreakdown && calculationResult?.yearlyBreakdown && (
        <Investment_Table 
          monthlyBreakdown={calculationResult.monthlyBreakdown}
          yearlyBreakdown={calculationResult.yearlyBreakdown}
        />
      )}
    </div>
  )
};

export default Compound_Interest_Calculator;