'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Demand, DemandTable } from '@/components/demand-table';
import {
  TrendingUp,
  TrendingDown,
  Package,
  Calendar,
  ArrowUp,
  ArrowDown,
  RefreshCw,
} from 'lucide-react';

interface ProductionData {
  month: string;
  production: number;
  planned: number;
  completionRate: number;
  growth: number;
}

interface AnalyticsSummary {
  totalProduction: number;
  totalPlanned: number;
  averageCompletion: number;
  growthRate: number;
  activeDemands: number;
  completedThisMonth: number;
}

export default function ProductionPage() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [productionData, setProductionData] = useState<ProductionData[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '1y'>('6m');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    fetchProductionData();
  }, [timeRange]);

  const fetchProductionData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch both demands and statistics
      const [demandsResponse, statsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/demands`),
        fetch(`${API_BASE_URL}/demands/statistics`),
      ]);

      if (!demandsResponse.ok) {
        throw new Error(`Failed to fetch demands: ${demandsResponse.status}`);
      }
      if (!statsResponse.ok) {
        throw new Error(`Failed to fetch statistics: ${statsResponse.status}`);
      }

      const demandsData: Demand[] = await demandsResponse.json();
      const statsData = await statsResponse.json();

      setDemands(demandsData);
      processProductionData(demandsData, statsData);
    } catch (error) {
      console.error('Error fetching production data:', error);
      setError(
        'Error loading production data. Please check if the server is running.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const processProductionData = (demandsData: Demand[], statsData: any) => {
    // Calculate growth rate from the demands data
    const growthRate = calculateGrowthRate(demandsData);

    // Use backend statistics data
    setSummary({
      totalProduction: statsData.totalProduced || 0,
      totalPlanned: statsData.totalPlanned || 0,
      averageCompletion:
        statsData.totalPlanned > 0
          ? (statsData.totalProduced / statsData.totalPlanned) * 100
          : 0,
      growthRate: growthRate,
      activeDemands: statsData.inProgress || 0,
      completedThisMonth: calculateCompletedThisMonth(demandsData),
    });

    // Process chart data from demands
    const monthlyData = processMonthlyData(demandsData);
    setProductionData(monthlyData);
  };

  // Calculate growth rate based on last two months of production
  const calculateGrowthRate = (demandsData: Demand[]): number => {
    if (demandsData.length === 0) return 0;

    // Group production by month
    const monthlyProduction: { [key: string]: number } = {};

    demandsData.forEach((demand) => {
      const monthKey = new Date(demand.endDate).toISOString().slice(0, 7); // YYYY-MM
      monthlyProduction[monthKey] =
        (monthlyProduction[monthKey] || 0) + demand.totalProduction;
    });

    // Sort months and get last two
    const sortedMonths = Object.keys(monthlyProduction).sort();
    if (sortedMonths.length < 2) return 0;

    const currentMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths[sortedMonths.length - 2];

    const currentProduction = monthlyProduction[currentMonth];
    const previousProduction = monthlyProduction[previousMonth];

    if (previousProduction === 0) return 0;

    return (
      ((currentProduction - previousProduction) / previousProduction) * 100
    );
  };

  const calculateCompletedThisMonth = (demandsData: Demand[]): number => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return demandsData.filter((demand) => {
      const demandDate = new Date(demand.endDate);
      return (
        demand.status === 'Completed' &&
        demandDate.getMonth() === currentMonth &&
        demandDate.getFullYear() === currentYear
      );
    }).length;
  };

  const processMonthlyData = (demandsData: Demand[]): ProductionData[] => {
    const monthlyData: { [key: string]: ProductionData } = {};

    // Process each demand and group by month
    demandsData.forEach((demand) => {
      const endDate = new Date(demand.endDate);
      const monthKey = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}`;
      const monthName = endDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthName,
          production: 0,
          planned: 0,
          completionRate: 0,
          growth: 0,
        };
      }

      monthlyData[monthKey].production += demand.totalProduction;
      monthlyData[monthKey].planned += demand.totalPlanned;
    });

    // Calculate completion rates and growth
    const sortedMonths = Object.keys(monthlyData).sort();
    const processedData: ProductionData[] = [];

    sortedMonths.forEach((monthKey, index) => {
      const data = monthlyData[monthKey];

      // Calculate completion rate
      data.completionRate =
        data.planned > 0 ? (data.production / data.planned) * 100 : 0;

      // Calculate growth compared to previous month
      if (index > 0) {
        const prevMonthKey = sortedMonths[index - 1];
        const prevData = monthlyData[prevMonthKey];
        data.growth =
          prevData.production > 0
            ? ((data.production - prevData.production) / prevData.production) *
              100
            : 0;
      } else {
        data.growth = 0;
      }

      processedData.push(data);
    });

    // Filter by time range
    const monthsToShow = timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : 12;
    return processedData.slice(-monthsToShow);
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="mr-3 h-8 w-8 animate-spin text-orange-500" />
            <p className="text-gray-600">Loading production analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="mb-4 text-red-800">{error}</p>
            <button
              onClick={fetchProductionData}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col items-start justify-between lg:flex-row lg:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Production Analytics
            </h1>
            <p className="mt-2 text-gray-600">
              Track production growth, completion rates, and performance metrics
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="mt-4 flex space-x-2 lg:mt-0">
            {(['3m', '6m', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-orange-500 text-white'
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Production
                </CardTitle>
                <Package className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.totalProduction.toFixed(1)}T
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  {getGrowthIcon(summary.growthRate)}
                  <span
                    className={`ml-1 ${getGrowthColor(summary.growthRate)}`}
                  >
                    {Math.abs(summary.growthRate).toFixed(1)}%{' '}
                    {summary.growthRate >= 0 ? 'growth' : 'decline'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.averageCompletion.toFixed(1)}%
                </div>
                <p className="text-xs text-gray-500">
                  {summary.totalPlanned.toFixed(1)}T planned
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Demands
                </CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.activeDemands}
                </div>
                <p className="text-xs text-gray-500">
                  {summary.completedThisMonth} completed this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Performance
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {productionData.length > 0
                    ? productionData[
                        productionData.length - 1
                      ].completionRate.toFixed(1)
                    : 0}
                  %
                </div>
                <p className="text-xs text-gray-500">
                  Current month completion
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Production vs Planned Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Production vs Planned</CardTitle>
              <CardDescription>
                Comparison of actual production against planned targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value}T`, 'Tons']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="planned" fill="#232120" name="Planned" />
                  <Bar
                    dataKey="production"
                    fill="#F05123"
                    name="Actual Production"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Completion Rate Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Completion Rate Trend</CardTitle>
              <CardDescription>
                Monthly completion rate percentage over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis unit="%" />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Completion Rate']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="completionRate"
                    stroke="#F05123"
                    fill="#F05123"
                    fillOpacity={0.3}
                    name="Completion Rate"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Production Growth Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Production Growth Trend</CardTitle>
              <CardDescription>
                Monthly production growth and decline analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis unit="%" />
                  <Tooltip
                    formatter={(value) => [
                      `${Math.abs(Number(value)).toFixed(1)}%`,
                      'Growth Rate',
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="#F05123"
                    strokeWidth={3}
                    dot={{ fill: '#F05123', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Growth Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Demands Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Production Demands</CardTitle>
            <CardDescription>
              Latest production demands with completion status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DemandTable
              demands={demands.slice(0, 10)} // Show only recent 10 demands
              onEdit={() => {}} // Empty handlers for analytics page
              onDelete={() => {}}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
