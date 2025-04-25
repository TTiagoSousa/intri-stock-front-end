import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useNavs } from "../../Contexts/Navs_Context";
import { useAuth } from "../../Contexts/Auth_Context";
import { End_Points } from "../../Services/endPoints";
import http from "../../Services/httpService";

export const useCompoundInterestCalculator = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();
  const { setAlert } = useNavs();
  const { refreshUser } = useAuth();

  const [initialInvestment, setInitialInvestment] = useState('');
  const [duration, setDuration] = useState('');
  const [additionalInvestment, setAdditionalInvestment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [interestFrequency, setInterestFrequency] = useState('');
  const [contributionFrequency, setContributionFrequency] = useState('');
  const [negotiationFeeRate, setNegotiationFeeRate] = useState('');
  const [expenseFeeRate, setExpenseFeeRate] = useState('');
  const [calculationResult, setCalculationResult] = useState(null); // Nova variável de estado para armazenar o resultado da simulação

  const calculateCompoundInterest = async () => {

    if (!initialInvestment || !duration || !additionalInvestment || !interestRate || !interestFrequency || !contributionFrequency) {
      return setAlert({
        open: true,
        message: t("All fields must be filled"),
        type: 'error'
      });
    }

    try {

      const requestData = {
        initialAmount: parseFloat(initialInvestment),
        annualInterestRate: parseFloat(interestRate),
        years: parseInt(duration),
        recurringContribution: parseFloat(additionalInvestment),
        contributionFrequency: contributionFrequency,
        capitalizationFrequency: interestFrequency,
        negotiationFeeRate: parseFloat(negotiationFeeRate),
        expenseFeeRate: parseFloat(expenseFeeRate),
      };

      // Fazendo a requisição para o backend
      const response = await http.post(
        End_Points.CompoundInterestCalculator_Endpoint(),
        requestData,
        { withCredentials: true }
      );

      // Exibindo alerta de sucesso
      setAlert({
        open: true,
        message: t("Calculation successful"),
        type: 'success',
      });

      // Armazenando o resultado da simulação no estado
      setCalculationResult(response.data);

    } catch (error) {
      // Tratamento de erro
      console.log(error);
      const msg = error.response?.data?.message || error.message || "Something went wrong";
      console.log(msg);
      setAlert({
        open: true,
        message: t(msg),
        type: 'error',
      });
    }
  }

  return {
    initialInvestment, setInitialInvestment,
    duration, setDuration,
    additionalInvestment, setAdditionalInvestment,
    interestRate, setInterestRate,
    interestFrequency, setInterestFrequency,
    contributionFrequency, setContributionFrequency,
    calculateCompoundInterest,
    negotiationFeeRate, setNegotiationFeeRate,
    expenseFeeRate, setExpenseFeeRate,
    calculationResult, 
  };
}
