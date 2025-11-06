// Status Value Mismatch

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

//  Match backend enum values exactly
const demandSchema = z
  .object({
    sku: z.string().min(1, 'SKU is required'),
    description: z.string().min(1, 'Product description is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    totalPlanned: z.preprocess(
      (val) => (val === '' || val === undefined ? undefined : Number(val)),
      z
        .number({ invalid_type_error: 'Planned total must be a number' })
        .min(0.01, 'Planned total must be greater than 0'),
    ),
    totalProduction: z.preprocess(
      (val) => (val === '' || val === undefined ? undefined : Number(val)),
      z
        .number({ invalid_type_error: 'Production total must be a number' })
        .min(0, 'Production total cannot be negative')
        .optional(),
    ),
    //  Match backend enum exactly
    status: z.enum(['Planning', 'In Progress', 'Completed']),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return startDate < endDate;
    },
    {
      message: 'Start date must be before end date',
      path: ['startDate'],
    },
  );

export type DemandFormData = z.infer<typeof demandSchema>;

interface DemandFormProps {
  onSubmit: (data: DemandFormData) => void;
  initialData?: Partial<DemandFormData>;
  isEditing?: boolean;
  onCancel?: () => void;
}

export function DemandForm({
  onSubmit,
  initialData,
  isEditing = false,
  onCancel,
}: DemandFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DemandFormData>({
    resolver: zodResolver(demandSchema),
    defaultValues: initialData || {
      status: 'Planning',
      totalPlanned: 0.01,
      totalProduction: 0,
    },
  });

  const handleFormSubmit = async (data: DemandFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const currentStatus = watch('status');

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 rounded-lg border border-border bg-white p-6 shadow-lg"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sku">SKU *</Label>
          <Input
            id="sku"
            {...register('sku')}
            placeholder="Enter SKU"
            className={errors.sku ? 'border-orange-500' : ''}
          />
          {errors.sku && (
            <p className="mt-1 text-sm text-orange-500">{errors.sku.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalPlanned">Planned Total (Tons) *</Label>
          <Input
            id="totalPlanned"
            type="number"
            step="0.01"
            min="0.01"
            {...register('totalPlanned', {
              valueAsNumber: true,
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
            placeholder="0.00"
            className={errors.totalPlanned ? 'border-orange-500' : ''}
          />
          {errors.totalPlanned && (
            <p className="mt-1 text-sm text-orange-500">
              {errors.totalPlanned.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalProduction">Production Total (Tons)</Label>
          <Input
            id="totalProduction"
            type="number"
            step="0.01"
            min="0"
            {...register('totalProduction', {
              valueAsNumber: true,
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
            placeholder="0.00"
            className={errors.totalProduction ? 'border-orange-500' : ''}
          />
          {errors.totalProduction && (
            <p className="mt-1 text-sm text-orange-500">
              {errors.totalProduction.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            {...register('startDate')}
            className={errors.startDate ? 'border-orange-500' : ''}
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-orange-500">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date *</Label>
          <Input
            id="endDate"
            type="date"
            {...register('endDate')}
            className={errors.endDate ? 'border-orange-500' : ''}
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-orange-500">
              {errors.endDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            onValueChange={(value: DemandFormData['status']) =>
              setValue('status', value)
            }
            defaultValue={initialData?.status || 'Planning'}
            value={currentStatus}
          >
            <SelectTrigger className={errors.status ? 'border-orange-500' : ''}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {/*  Use exact backend enum values */}
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="mt-1 text-sm text-orange-500">
              {errors.status.message}
            </p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Product Description *</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter product description"
            className={errors.description ? 'border-orange-500' : ''}
            rows={3}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-orange-500">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          className="border-0 bg-green-600 text-white hover:bg-green-700"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Processing...'
            : isEditing
              ? 'Save Changes'
              : 'Create Demand'}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="red"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
