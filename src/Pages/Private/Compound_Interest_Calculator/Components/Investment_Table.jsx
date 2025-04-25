import React, { useState } from 'react';
import '../Compound_Interest_Calculator.scss';
import { useTranslation } from 'react-i18next';

const Investment_Table = ({ monthlyBreakdown, yearlyBreakdown }) => {
  const { t } = useTranslation();

  const [viewMode, setViewMode] = useState('chart');

  const rawData = viewMode === 'monthly' ? monthlyBreakdown
  : viewMode === 'yearly' ? yearlyBreakdown
  : [];

  const data = Array.isArray(rawData) ? rawData : [];

  return (
    <div className='Investment_Table'>
      <div className="Header">
        <div><span>{t("Simulation")}</span></div>
        <div className="toggle-buttons">
          <button
            className={`toggle-button ${viewMode === 'chart' ? 'active' : ''}`}
            onClick={() => setViewMode('chart')}
          >
            {t("Chart")}
          </button>
          <button
            className={`toggle-button ${viewMode === 'monthly' ? 'active' : ''}`}
            onClick={() => setViewMode('monthly')}
          >
            {t("Monthly Table")}
          </button>
          <button
            className={`toggle-button ${viewMode === 'yearly' ? 'active' : ''}`}
            onClick={() => setViewMode('yearly')}
          >
            {t("Yearly Table")}
          </button>
        </div>
      </div>

      <div className="Table_Or_Chart">
        {viewMode === 'chart' && (
          <div className="Chart_Container">
            <span>{t("Graph view coming soon...")}</span>
          </div>
        )}

        {(viewMode === 'monthly' || viewMode === 'yearly') && (
          <table>
            <thead>
              <tr>
                <th><span>{viewMode === 'monthly' ? t("Month") : t("Year")}</span></th>
                <th><span>{t("Total invested")}</span></th>
                <th><span>{t("Total paid on fees")}</span></th>
                <th><span>{t("Accumulated interest")}</span></th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
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
        )}
      </div>
    </div>
  );
};

export default Investment_Table;