import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import DhikrCounters from '../components/DhikrCounters';

// Mock useApp
vi.mock('../App', () => ({
    useApp: () => ({
        language: 'en'
    })
}));

// Mock SawabBadge to avoid deep complexity in this test
vi.mock('../components/SawabBadge', () => ({
    default: () => <div data-testid="sawab-badge" />
}));

describe('DhikrCounters', () => {
    const mockDhikrData = {
        subhanallah: 10,
        alhamdulillah: 5,
        allahuakbar: 0,
        custom: { label: 'Istighfar', count: 20 }
    };

    it('should increment a counter when the + button is clicked', () => {
        const onUpdate = vi.fn();
        render(<DhikrCounters dhikrData={mockDhikrData} onUpdate={onUpdate} />);

        // Find all + buttons. There are 4 (Subhanallah, Alhamdulillah, AllahuAkbar, Custom)
        const plusButtons = screen.getAllByText('+');
        fireEvent.click(plusButtons[0]); // Subhanallah

        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            subhanallah: 11
        }));
    });

    it('should decrement a counter but stay at zero', () => {
        const onUpdate = vi.fn();
        render(<DhikrCounters dhikrData={mockDhikrData} onUpdate={onUpdate} />);

        const minusButtons = screen.getAllByText('-');
        fireEvent.click(minusButtons[2]); // Allahu Akbar (currently 0)

        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            allahuakbar: 0
        }));
    });

    it('should update count when the large "Tap to count" button is clicked', () => {
        const onUpdate = vi.fn();
        render(<DhikrCounters dhikrData={mockDhikrData} onUpdate={onUpdate} />);

        const tapButtons = screen.getAllByText(/Tap to count/i);
        fireEvent.click(tapButtons[0]); // Subhanallah

        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            subhanallah: 11
        }));
    });

    it('should show reset confirmation and reset all counters when confirmed', () => {
        const onUpdate = vi.fn();
        render(<DhikrCounters dhikrData={mockDhikrData} onUpdate={onUpdate} />);

        // Find reset all button by role. Accessible name is now "Reset All"
        const resetAllBtn = screen.getByRole('button', { name: /Reset All/i });
        fireEvent.click(resetAllBtn);

        // Confirmation modal should appear. It has a "Yes, Reset" button.
        const confirmBtn = screen.getByText(/Yes, Reset/i);
        fireEvent.click(confirmBtn);

        expect(onUpdate).toHaveBeenCalledWith({
            subhanallah: 0,
            alhamdulillah: 0,
            allahuakbar: 0,
            custom: expect.objectContaining({ count: 0 })
        });
    });
});
