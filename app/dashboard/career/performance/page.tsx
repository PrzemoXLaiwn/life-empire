'use client';

import { useEffect, useState } from 'react';
import { getCurrentCharacter } from '@/actions/character';
import { getPerformanceReviews } from '@/actions/career';

interface PerformanceReview {
  id: string;
  reviewDate: Date;
  quarter: number;
  year: number;
  productivityRating: number;
  qualityRating: number;
  teamworkRating: number;
  punctualityRating: number;
  overallRating: number;
  managerNotes: string;
  salaryIncrease: number;
  bonusAwarded: number;
  promoted: boolean;
  warning: boolean;
  job: {
    title: string;
  };
}

export default function PerformanceReviewsPage() {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);
    const charResult = await getCurrentCharacter();
    if ('error' in charResult || !charResult.data) {
      setLoading(false);
      return;
    }

    const result = await getPerformanceReviews(charResult.data.id);
    if ('error' in result) {
      console.error(result.error);
    } else {
      setReviews(result.data?.reviews || []);
    }
    setLoading(false);
  }

  function getRatingColor(rating: number) {
    if (rating >= 90) return 'text-green-400';
    if (rating >= 75) return 'text-blue-400';
    if (rating >= 60) return 'text-yellow-400';
    if (rating >= 40) return 'text-orange-400';
    return 'text-red-400';
  }

  function getRatingLabel(rating: number) {
    if (rating >= 90) return 'Outstanding';
    if (rating >= 75) return 'Excellent';
    if (rating >= 60) return 'Good';
    if (rating >= 40) return 'Needs Improvement';
    return 'Unsatisfactory';
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Performance Reviews</h1>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          📊 Performance Reviews
        </h1>

        {reviews.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 text-lg">No performance reviews yet.</p>
            <p className="text-gray-500 mt-2">Work for 90 days to receive your first quarterly review!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`bg-gray-800 rounded-lg p-6 border-2 ${
                  review.warning ? 'border-red-500' : review.overallRating >= 90 ? 'border-green-500' : 'border-gray-700'
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Q{review.quarter} {review.year} - {review.job.title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getRatingColor(review.overallRating)}`}>
                      {review.overallRating}%
                    </div>
                    <div className="text-sm text-gray-400">
                      {getRatingLabel(review.overallRating)}
                    </div>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Productivity</div>
                    <div className={`text-2xl font-bold ${getRatingColor(review.productivityRating)}`}>
                      {review.productivityRating}%
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Quality</div>
                    <div className={`text-2xl font-bold ${getRatingColor(review.qualityRating)}`}>
                      {review.qualityRating}%
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Teamwork</div>
                    <div className={`text-2xl font-bold ${getRatingColor(review.teamworkRating)}`}>
                      {review.teamworkRating}%
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Punctuality</div>
                    <div className={`text-2xl font-bold ${getRatingColor(review.punctualityRating)}`}>
                      {review.punctualityRating}%
                    </div>
                  </div>
                </div>

                {/* Manager Notes */}
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-400 mb-2">Manager Feedback:</div>
                  <p className="text-gray-200 italic">"{review.managerNotes}"</p>
                </div>

                {/* Outcomes */}
                <div className="flex flex-wrap gap-4">
                  {review.salaryIncrease > 0 && (
                    <div className="bg-green-900/30 border border-green-500 rounded-lg px-4 py-2">
                      <span className="text-green-400 font-bold">
                        💰 Salary Increase: +${review.salaryIncrease.toLocaleString()}/year
                      </span>
                    </div>
                  )}
                  {review.bonusAwarded > 0 && (
                    <div className="bg-blue-900/30 border border-blue-500 rounded-lg px-4 py-2">
                      <span className="text-blue-400 font-bold">
                        🎁 Bonus: +${review.bonusAwarded.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {review.promoted && (
                    <div className="bg-purple-900/30 border border-purple-500 rounded-lg px-4 py-2">
                      <span className="text-purple-400 font-bold">
                        🚀 Promoted!
                      </span>
                    </div>
                  )}
                  {review.warning && (
                    <div className="bg-red-900/30 border border-red-500 rounded-lg px-4 py-2">
                      <span className="text-red-400 font-bold">
                        ⚠️ Performance Warning
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
