// API Integration

'use client';

import React, { useState, useEffect } from 'react';
import { DemandForm, type DemandFormData } from '@/components/damand-form';
import { DemandTable, type Demand } from '@/components/demand-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Home() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDemand, setEditingDemand] = useState<Demand | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use environment variable for API base URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    fetchDemands();
  }, []);

  const fetchDemands = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/demands`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Demand[] = await response.json();
      setDemands(data);
    } catch (error) {
      console.error('Error fetching demands:', error);
      setError('Error loading demands. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDemand = async (data: DemandFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/demands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          startDate: new Date(data.startDate).toISOString().split('T')[0],
          endDate: new Date(data.endDate).toISOString().split('T')[0],
          totalProduction: data.totalProduction || 0,
          // Status is already in correct format from form
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating demand');
      }

      setShowForm(false);
      await fetchDemands();
    } catch (error) {
      console.error('Error creating demand:', error);
      setError(
        error instanceof Error ? error.message : 'Error creating demand',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDemand = async (data: DemandFormData): Promise<void> => {
    if (!editingDemand) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/demands/${editingDemand.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            startDate: new Date(data.startDate).toISOString().split('T')[0],
            endDate: new Date(data.endDate).toISOString().split('T')[0],
            totalProduction: data.totalProduction || 0,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating demand');
      }

      setEditingDemand(null);
      await fetchDemands();
    } catch (error) {
      console.error('Error updating demand:', error);
      setError(
        error instanceof Error ? error.message : 'Error updating demand',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDemand = async (id: number): Promise<void> => {
    if (!confirm('Are you sure you want to delete this demand?')) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/demands/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchDemands();
    } catch (error) {
      console.error('Error deleting demand:', error);
      setError('Error deleting demand');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (demand: Demand): void => {
    setEditingDemand(demand);
    setError(null);
  };

  const handleCancelForm = (): void => {
    setShowForm(false);
    setEditingDemand(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Demand Planning
            </h1>
            <p className="mt-2 text-gray-600">
              Manage and track production demands efficiently
            </p>
          </div>
          <Button
            onClick={() => {
              setShowForm(true);
              setError(null);
            }}
            className="border-0 bg-orange-500 text-white hover:bg-orange-600"
            disabled={isLoading}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Demand
          </Button>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {(showForm || editingDemand) && (
          <div className="mb-8">
            <DemandForm
              onSubmit={editingDemand ? handleUpdateDemand : handleCreateDemand}
              initialData={editingDemand || undefined}
              isEditing={!!editingDemand}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {isLoading && !showForm && !editingDemand ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">Loading demands...</p>
          </div>
        ) : (
          <DemandTable
            demands={demands}
            onEdit={handleEdit}
            onDelete={handleDeleteDemand}
          />
        )}
      </div>
    </div>
  );
}
