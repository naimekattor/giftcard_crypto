'use client';

import React from 'react';
import { RETAILERS } from '@/constants/retailers';
import { Select } from '@/components/ui/Select';

interface RetailerDropdownProps {
  value: string;
  onChange: (retailerId: string) => void;
  error?: string;
  label?: string;
}

export const RetailerDropdown: React.FC<RetailerDropdownProps> = ({
  value,
  onChange,
  error,
  label = 'Retailer',
}) => {
  const options = RETAILERS.map((retailer) => ({
    value: retailer.id,
    label: retailer.name,
  }));

  return (
    <Select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      options={options}
    />
  );
};
