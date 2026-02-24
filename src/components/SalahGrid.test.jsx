import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SalahGrid from '../components/SalahGrid';

// Mock useApp
vi.mock('../utils/AppContext', () => ({
    useApp: () => ({
        language: 'en'
    })
}));

describe('SalahGrid', () => {
    const mockSalahData = {
        fajr: { fard: false, sunnah: false, jamaat: false },
        dhuhr: { fard: false, sunnah: false, jamaat: false },
        asr: { fard: false, sunnah: false, jamaat: false },
        maghrib: { fard: false, sunnah: false, jamaat: false },
        isha: { fard: false, sunnah: false, jamaat: false }
    };
    const mockExtraPrayers = {
        tarawih: 0,
        tahajjud: false,
        ishraq: false,
        chasht: false
    };

    it('should call onUpdate when a prayer fard is toggled', () => {
        const onUpdate = vi.fn();
        render(
            <SalahGrid
                salahData={mockSalahData}
                extraPrayers={mockExtraPrayers}
                onUpdate={onUpdate}
                onExtraUpdate={() => { }}
            />
        );

        // All "Fard" buttons have a span with text "Fard" (translated)
        // Since we mocked language to 'en', it will be "Fard"
        const fardButtons = screen.getAllByRole('button').filter(b => b.textContent.includes('Fard'));
        fireEvent.click(fardButtons[0]); // Fajr Fard

        expect(onUpdate).toHaveBeenCalled();
    });

    it('should automatically enable fard when jamaat is enabled', () => {
        const onUpdate = vi.fn();
        render(
            <SalahGrid
                salahData={mockSalahData}
                extraPrayers={mockExtraPrayers}
                onUpdate={onUpdate}
                onExtraUpdate={() => { }}
            />
        );

        const jamaatButtons = screen.getAllByRole('button').filter(b => b.textContent.includes('Jama\'at'));
        fireEvent.click(jamaatButtons[0]);

        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            fajr: expect.objectContaining({ fard: true, jamaat: true, qaza: false })
        }));
    });

    it('should disable fard and jamaat when qaza is enabled', () => {
        const onUpdate = vi.fn();
        const dataWithFard = {
            ...mockSalahData,
            fajr: { fard: true, jamaat: true, sunnah: false, qaza: false }
        };
        render(
            <SalahGrid
                salahData={dataWithFard}
                extraPrayers={mockExtraPrayers}
                onUpdate={onUpdate}
                onExtraUpdate={() => { }}
            />
        );

        const qazaButtons = screen.getAllByRole('button').filter(b => b.textContent.includes('Qaza'));
        fireEvent.click(qazaButtons[0]);

        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            fajr: expect.objectContaining({ qaza: true, fard: false, jamaat: false })
        }));
    });
});
