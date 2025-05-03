import React, { useState, useEffect, useMemo } from 'react';
import '../Compound_Interest_Calculator.scss';
import { useTranslation } from 'react-i18next';
import Evolution_Chart from './Evolution_Chart';
import Pagination from '../../../../Components/Pagination/Pagination';

const ROWS_PER_PAGE = 12; // one page = 12 rows

const Simulation_Data = ({ monthlyBreakdown = [], yearlyBreakdown = [] }) => {

  const { t } = useTranslation();

  const [viewMode, setViewMode] = useState('monthly');

  const Data =
  viewMode === 'monthly' ? monthlyBreakdown :
  viewMode === 'yearly' ? yearlyBreakdown :
  [];

  return (
    <div className="Simulation_Data">

      <div className="Chart_Container">
        <div className="Header">
          <span>{t("Accumulated Interest Chart")}</span>
        </div>
        <div className='Chart_Container_Info'>
          <Evolution_Chart monthlyBreakdown={monthlyBreakdown} />
        </div>
      </div>

      <div className='Table_Container'>
        <div className="Header">
          <div>
            <span>{t("Detailed Compound Interest Table")}</span>
          </div>
          <div>
          <button
            className={`toggle-button ${viewMode === 'monthly' ? 'active' : ''}`}
            onClick={() => setViewMode('monthly')}
          >
            <span>{t("Monthly Table")}</span>
          </button>
          <button
            className={`toggle-button ${viewMode === 'yearly' ? 'active' : ''}`}
            onClick={() => setViewMode('yearly')}
          >
            <span>{t("Yearly Table")}</span>
          </button>
        </div>
        </div>
        <div className="Table_Container_Info">
          <div className='Container'>
          <table>
            <thead>
              <tr>
                <th><span>{t(viewMode === 'monthly' ? 'Month' : 'Year')}</span></th>
                <th><span>{t('Total invested')}</span></th>
                <th><span>{t('Total paid on fees')}</span></th>
                <th><span>{t('Accumulated interest')}</span></th>
              </tr>
            </thead>
            <tbody>
            {Data.map((entry, index) => (
              <tr key={index}>
                <td>
                  <span>{viewMode === 'monthly' ? `${t("Month")} ${entry.month}` : `${t("Year")} ${entry.year}`}</span>
                </td>
                <td><span>{entry.totalInvested}</span></td>
                <td><span>{entry.totalPaidInFees.totalPaid}</span></td>
                <td><span>{entry.accumulatedInterest}</span></td>
              </tr>
            ))}
            </tbody>
          </table>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation_Data;