import { useEffect, useRef, useState } from 'react';
import { getDashboardSummary } from '../api/pokemonApi';
import { DashboardSummaryDto } from '../models';
import { toast } from 'react-toastify';

export default function DashboardSummary() {
  const [data, setData] = useState<DashboardSummaryDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    getDashboardSummary()
      .then(setData)
      .catch(() => toast.error('Failed to load dashboard summary'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (expanded && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [expanded]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mb-6 text-white">
        <p>Loading dashboard summary...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="text-gray-300 hover:text-white text-base font-medium transition-colors"
        >
          {expanded ? 'Hide Summary ▲' : 'Show Summary ▼'}
        </button>
        <div className="text-sm text-gray-300">
          Total Pokémon: <span className="font-semibold text-white">{data.totalCount}</span>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-1500 ease-in-out"
        style={{ maxHeight: `${contentHeight}px` }}
      >
        <div ref={contentRef} className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow text-white">
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Count per Type</h2>
            <ul className="text-sm max-h-72 overflow-y-auto pr-2 divide-y divide-gray-700 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {Object.entries(data.countPerType).map(([type, count]) => (
                <li key={type} className="flex justify-between py-1">
                  <span className="capitalize text-gray-300">{type}</span>
                  <span className="text-white font-medium">{count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow text-white">
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Count per Generation</h2>
            <ul className="text-sm max-h-72 overflow-y-auto pr-2 divide-y divide-gray-700 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {Object.entries(data.countPerGeneration).map(([gen, count]) => (
                <li key={gen} className="flex justify-between py-1">
                  <span className="text-gray-300">{gen}</span>
                  <span className="text-white font-medium">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}