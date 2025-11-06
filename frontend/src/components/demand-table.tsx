//Status Display

'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Edit, Trash2 } from 'lucide-react';

export interface Demand {
  id: number;
  sku: string;
  description: string;
  startDate: string;
  endDate: string;
  totalPlanned: number;
  totalProduction: number;
  status: 'Planning' | 'In Progress' | 'Completed';
}

interface DemandTableProps {
  demands: Demand[];
  onEdit: (demand: Demand) => void;
  onDelete: (id: number) => void;
}

export function DemandTable({ demands, onEdit, onDelete }: DemandTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getCompletionRate = (planned: number, produced: number) => {
    if (planned === 0) return 0;
    return (produced / planned) * 100;
  };

  if (demands.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-white py-8 text-center">
        <p className="text-gray-500">No demands registered</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="border-r border-border">SKU</TableHead>
            <TableHead className="border-r border-border">
              Description
            </TableHead>
            <TableHead className="border-r border-border">Start Date</TableHead>
            <TableHead className="border-r border-border">End Date</TableHead>
            <TableHead className="border-r border-border">
              Planned (TONS)
            </TableHead>
            <TableHead className="border-r border-border">
              Production (TONS)
            </TableHead>
            <TableHead className="border-r border-border">Completion</TableHead>
            <TableHead className="border-r border-border">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demands.map((demand) => {
            const completionRate = getCompletionRate(
              demand.totalPlanned,
              demand.totalProduction,
            );

            return (
              <TableRow key={demand.id} className="border-border">
                <TableCell className="border-r border-border font-medium">
                  {demand.sku}
                </TableCell>
                <TableCell className="max-w-xs truncate border-r border-border">
                  {demand.description}
                </TableCell>
                <TableCell className="border-r border-border">
                  {formatDate(demand.startDate)}
                </TableCell>
                <TableCell className="border-r border-border">
                  {formatDate(demand.endDate)}
                </TableCell>
                <TableCell className="border-r border-border text-right">
                  {formatNumber(demand.totalPlanned)}
                </TableCell>
                <TableCell className="border-r border-border text-right">
                  {formatNumber(demand.totalProduction)}
                </TableCell>
                <TableCell className="border-r border-border">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full ${
                          completionRate >= 100
                            ? 'bg-green-500'
                            : completionRate >= 75
                              ? 'bg-yellow-500'
                              : completionRate >= 50
                                ? 'bg-orange-500'
                                : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(completionRate, 100)}%` }}
                      />
                    </div>
                    <span className="w-12 text-sm text-gray-600">
                      {completionRate.toFixed(1)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="border-r border-border">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                      demand.status,
                    )}`}
                  >
                    {demand.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(demand)}
                      className="border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(demand.id)}
                      className="border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
