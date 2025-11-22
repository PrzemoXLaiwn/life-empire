'use client';

import { useEffect, useState } from 'react';
import { getCurrentCharacter } from '@/actions/character';
import { getJobBenefits, getWorkExpenses } from '@/actions/career';

interface JobBenefit {
  id: string;
  type: string;
  name: string;
  description?: string;
  monthlyValue: number;
  costToPlayer: number;
  isActive: boolean;
  startedAt: Date;
  job: {
    title: string;
  };
}

interface WorkExpense {
  id: string;
  type: string;
  description: string;
  amount: number;
  frequency: string;
  paidAt: Date;
  relatedToJob?: string;
}

export default function CareerFinancesPage() {
  const [benefits, setBenefits] = useState<JobBenefit[]>([]);
  const [expenses, setExpenses] = useState<WorkExpense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const charResult = await getCurrentCharacter();
    if ('error' in charResult || !charResult.data) {
      setLoading(false);
      return;
    }

    const [benefitsResult, expensesResult] = await Promise.all([
      getJobBenefits(charResult.data.id),
      getWorkExpenses(charResult.data.id)
    ]);

    if (!('error' in benefitsResult)) {
      setBenefits(benefitsResult.data?.benefits || []);
    }
    if (!('error' in expensesResult)) {
      setExpenses(expensesResult.data?.expenses || []);
    }

    setLoading(false);
  }

  const totalBenefitsValue = benefits.reduce((sum, b) => sum + b.monthlyValue, 0);
  const totalBenefitsCost = benefits.reduce((sum, b) => sum + b.costToPlayer, 0);
  const totalExpenses = expenses.reduce((sum, e) => {
    if (e.frequency === 'Daily') return sum + (e.amount * 30);
    if (e.frequency === 'Weekly') return sum + (e.amount * 4);
    if (e.frequency === 'Monthly') return sum + e.amount;
    return sum;
  }, 0);

  function getBenefitIcon(type: string) {
    switch (type) {
      case 'Health Insurance': return '🏥';
      case 'Dental': return '🦷';
      case 'Vision': return '👓';
      case '401K': return '💰';
      case 'Company Car': return '🚗';
      case 'Gym Membership': return '💪';
      case 'Meal Vouchers': return '🍔';
      case 'Transit Pass': return '🚇';
      default: return '📦';
    }
  }

  function getExpenseIcon(type: string) {
    switch (type) {
      case 'Commute': return '🚌';
      case 'Parking': return '🅿️';
      case 'Uniform': return '👔';
      case 'Tools': return '🔧';
      case 'Meals': return '🍽️';
      case 'Dry Cleaning': return '👗';
      case 'Professional Development': return '📚';
      default: return '💸';
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Career Finances</h1>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          💼 Career Finances
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border-2 border-green-700">
            <div className="text-sm text-green-300 mb-2">Monthly Benefits Value</div>
            <div className="text-3xl font-bold text-white mb-1">
              ${totalBenefitsValue.toLocaleString()}
            </div>
            <div className="text-xs text-green-300">
              Your cost: ${totalBenefitsCost.toLocaleString()}/mo
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border-2 border-red-700">
            <div className="text-sm text-red-300 mb-2">Monthly Expenses</div>
            <div className="text-3xl font-bold text-white mb-1">
              -${totalExpenses.toLocaleString()}
            </div>
            <div className="text-xs text-red-300">
              Cost of working
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border-2 border-blue-700">
            <div className="text-sm text-blue-300 mb-2">Net Impact</div>
            <div className={`text-3xl font-bold ${(totalBenefitsValue - totalBenefitsCost - totalExpenses) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${((totalBenefitsValue - totalBenefitsCost) - totalExpenses).toLocaleString()}
            </div>
            <div className="text-xs text-blue-300">
              Per month
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            🎁 Job Benefits
          </h2>

          {benefits.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-400">No job benefits yet.</p>
              <p className="text-gray-500 text-sm mt-2">Get a better job to unlock benefits!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="bg-gray-800 rounded-lg p-5 border-2 border-gray-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getBenefitIcon(benefit.type)}</span>
                      <div>
                        <h3 className="text-lg font-bold">{benefit.name}</h3>
                        <p className="text-sm text-gray-400">{benefit.job.title}</p>
                      </div>
                    </div>
                    {benefit.isActive && (
                      <span className="bg-green-900/30 border border-green-500 text-green-400 px-2 py-1 rounded text-xs">
                        Active
                      </span>
                    )}
                  </div>

                  {benefit.description && (
                    <p className="text-sm text-gray-400 mb-3">{benefit.description}</p>
                  )}

                  <div className="flex justify-between items-center bg-gray-700 rounded p-3">
                    <div>
                      <div className="text-xs text-gray-400">Monthly Value</div>
                      <div className="text-lg font-bold text-green-400">
                        ${benefit.monthlyValue.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Your Cost</div>
                      <div className="text-lg font-bold text-red-400">
                        ${benefit.costToPlayer.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-center text-xs text-gray-500">
                    Started: {new Date(benefit.startedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expenses Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            💸 Work Expenses
          </h2>

          {expenses.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-400">No work expenses tracked yet.</p>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left p-4 font-bold">Type</th>
                    <th className="text-left p-4 font-bold">Description</th>
                    <th className="text-left p-4 font-bold">Amount</th>
                    <th className="text-left p-4 font-bold">Frequency</th>
                    <th className="text-left p-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="border-t border-gray-700 hover:bg-gray-750">
                      <td className="p-4">
                        <span className="flex items-center gap-2">
                          {getExpenseIcon(expense.type)} {expense.type}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{expense.description}</td>
                      <td className="p-4 font-bold text-red-400">
                        ${expense.amount.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className="bg-blue-900/30 border border-blue-500 text-blue-400 px-2 py-1 rounded text-xs">
                          {expense.frequency}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 text-sm">
                        {new Date(expense.paidAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
