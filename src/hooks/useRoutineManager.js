import { useState, useEffect, useCallback, useMemo } from 'react';
import { loadRoutine, saveRoutine } from '../utils/routineStorage';
import { calculateAnalytics, checkOverlap, timeToMinutes } from '../utils/routineAnalytics';
import { routineTemplates } from '../data/routineTemplates';

export const useRoutineManager = (dateStr) => {
    const [routine, setRoutine] = useState(() => loadRoutine(dateStr));

    const analytics = useMemo(() => calculateAnalytics(routine.blocks), [routine.blocks]);

    useEffect(() => {
        const loaded = loadRoutine(dateStr);
        setRoutine(loaded);
    }, [dateStr]);

    const _saveAndSet = useCallback((newRoutine) => {
        setRoutine(newRoutine);
        saveRoutine(dateStr, newRoutine);
    }, [dateStr]);

    const loadTemplate = useCallback((templateId) => {
        const template = routineTemplates[templateId];
        if (!template) return;

        const newRoutine = {
            ...routine,
            blocks: template.blocks.map(b => ({ ...b, id: `${templateId}_${b.id}_${Date.now()}` }))
        };
        _saveAndSet(newRoutine);
    }, [routine, _saveAndSet]);

    const addBlock = useCallback((block) => {
        const newBlock = {
            ...block,
            id: Date.now().toString(),
            isCompleted: false,
            notes: block.notes || '',
            duration: timeToMinutes(block.endTime) - timeToMinutes(block.startTime) + (timeToMinutes(block.endTime) < timeToMinutes(block.startTime) ? 24 * 60 : 0)
        };

        if (checkOverlap(routine.blocks, newBlock)) {
            return { success: false, error: 'Time block overlaps with an existing block.' };
        }

        const newRoutine = {
            ...routine,
            blocks: [...routine.blocks, newBlock]
        };
        _saveAndSet(newRoutine);
        return { success: true };
    }, [routine, _saveAndSet]);

    const updateBlock = useCallback((id, updates) => {
        const blockIndex = routine.blocks.findIndex(b => b.id === id);
        if (blockIndex === -1) return { success: false, error: 'Block not found' };

        const updatedBlock = { ...routine.blocks[blockIndex], ...updates };

        if (updates.startTime || updates.endTime) {
            updatedBlock.duration = timeToMinutes(updatedBlock.endTime) - timeToMinutes(updatedBlock.startTime) + (timeToMinutes(updatedBlock.endTime) < timeToMinutes(updatedBlock.startTime) ? 24 * 60 : 0);
        }

        if (checkOverlap(routine.blocks, updatedBlock)) {
            return { success: false, error: 'Time block overlaps with an existing block.' };
        }

        const newBlocks = [...routine.blocks];
        newBlocks[blockIndex] = updatedBlock;

        _saveAndSet({ ...routine, blocks: newBlocks });
        return { success: true };
    }, [routine, _saveAndSet]);

    const deleteBlock = useCallback((id) => {
        const newBlocks = routine.blocks.filter(b => b.id !== id);
        _saveAndSet({ ...routine, blocks: newBlocks });
    }, [routine, _saveAndSet]);

    const toggleComplete = useCallback((id) => {
        const newBlocks = routine.blocks.map(b =>
            b.id === id ? { ...b, isCompleted: !b.isCompleted } : b
        );
        _saveAndSet({ ...routine, blocks: newBlocks });
    }, [routine, _saveAndSet]);

    const clearAll = useCallback(() => {
        _saveAndSet({ ...routine, blocks: [] });
    }, [routine, _saveAndSet]);

    return {
        routine,
        analytics,
        loadTemplate,
        addBlock,
        updateBlock,
        deleteBlock,
        toggleComplete,
        clearAll
    };
};
