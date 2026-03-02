export const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

export const minutesToTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

export const formatTime12h = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${h12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const getCurrentBlock = (blocks) => {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    for (const block of blocks) {
        const startMin = timeToMinutes(block.startTime);
        let endMin = timeToMinutes(block.endTime);

        // Handle midnight crossing
        if (endMin <= startMin) {
            if (nowMin >= startMin || nowMin < endMin) {
                const remaining = nowMin >= startMin
                    ? (24 * 60 - nowMin) + endMin
                    : endMin - nowMin;
                return { block, remainingMinutes: remaining };
            }
        } else {
            if (nowMin >= startMin && nowMin < endMin) {
                return { block, remainingMinutes: endMin - nowMin };
            }
        }
    }
    return null;
};

export const calculateAnalytics = (blocks) => {
    const totalMinutes = {
        ibadah: 0,
        work: 0,
        sleep: 0,
        family: 0,
        personal: 0,
        study: 0,
        other: 0,
    };

    blocks.forEach(block => {
        if (totalMinutes[block.category] !== undefined) {
            totalMinutes[block.category] += block.duration;
        }
    });

    const totalHours = {};
    Object.keys(totalMinutes).forEach(key => {
        totalHours[key] = Number((totalMinutes[key] / 60).toFixed(1));
    });

    const ibadahMinutes = totalMinutes.ibadah;
    const totalDayMinutes = 24 * 60;
    const ibadahPercentage = Math.round((ibadahMinutes / totalDayMinutes) * 100);

    // Sort blocks by start time to find gaps
    const sortedBlocks = [...blocks].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    let unplannedMinutes = 0;
    let gaps = [];

    let currentTime = 0; // start of day (00:00)

    sortedBlocks.forEach(block => {
        const startMin = timeToMinutes(block.startTime);
        const endMin = timeToMinutes(block.endTime);

        if (startMin > currentTime) {
            const gapDuration = startMin - currentTime;
            if (gapDuration >= 5) {
                unplannedMinutes += gapDuration;
                gaps.push({
                    start: minutesToTime(currentTime),
                    end: block.startTime,
                    duration: gapDuration
                });
            }
        }

        // Handle midnight crossing or normal end
        currentTime = Math.max(currentTime, endMin);
        if (startMin > endMin) { // Midnight crossing
            currentTime = 24 * 60; // Max day minutes
        }
    });

    // Check gap at the end of the day
    if (currentTime < (24 * 60)) {
        const gapDuration = (24 * 60) - currentTime;
        if (gapDuration >= 5) {
            unplannedMinutes += gapDuration;
            gaps.push({
                start: minutesToTime(currentTime),
                end: '24:00',
                duration: gapDuration
            });
        }
    }

    return {
        totalHours,
        ibadahPercentage,
        unplannedMinutes,
        unplannedHours: Number((unplannedMinutes / 60).toFixed(1)),
        gaps,
        focusedDayAchieved: ibadahMinutes >= (4 * 60) // >= 4 hours
    };
};

export const checkOverlap = (blocks, newBlock) => {
    const nStart = timeToMinutes(newBlock.startTime);
    let nEnd = timeToMinutes(newBlock.endTime);
    if (nEnd < nStart) nEnd += 24 * 60; // handle midnight crossing for overlap logic

    for (const block of blocks) {
        if (block.id === newBlock.id) continue;

        const bStart = timeToMinutes(block.startTime);
        let bEnd = timeToMinutes(block.endTime);
        if (bEnd < bStart) bEnd += 24 * 60;

        // Check if nStart is inside [bStart, bEnd) or nEnd is inside (bStart, bEnd]
        // or if [nStart, nEnd] completely encloses [bStart, bEnd]
        if (
            (nStart >= bStart && nStart < bEnd) ||
            (nEnd > bStart && nEnd <= bEnd) ||
            (nStart <= bStart && nEnd >= bEnd)
        ) {
            return true;
        }
    }
    return false;
};
