import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function splitPdf() {
    const pdfPath = 'public/তারাবীহর সালাতে কুরআনের বার্তা [boimate.com].pdf';
    const outputDir = 'public/taraweeh_summaries';

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const totalPages = pdfDoc.getPageCount();

    console.log(`Total Pages: ${totalPages}`);

    // Assuming 5 pages per day after a 6-page intro
    const introPages = 6;
    const pagesPerDay = 5;

    for (let day = 1; day <= 30; day++) {
        const start = introPages + (day - 1) * pagesPerDay;
        const end = Math.min(start + pagesPerDay, totalPages);

        if (start >= totalPages) break;

        const newPdf = await PDFDocument.create();
        const pageIndices = Array.from({ length: end - start }, (_, i) => start + i);
        const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
        copiedPages.forEach(page => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        fs.writeFileSync(`${outputDir}/day_${day}.pdf`, pdfBytes);
        console.log(`Saved Day ${day}: Pages ${start + 1} to ${end}`);
    }
}

splitPdf().catch(err => console.error(err));
