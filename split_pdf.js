import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function splitPdf() {
    const inputPath = 'public/taraweeh_master.pdf';
    const outputDir = 'public/taraweeh_chapters';

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const totalPages = pdfDoc.getPageCount();
    console.log(`Total Pages: ${totalPages}`);

    // Estimated Structure:
    // 0-8: Intro/Cover
    // 9-13: Chapter 1
    // 14-18: Chapter 2
    // ... and so on.

    const introEnd = 8;
    const pagesPerChapter = 5;

    for (let i = 0; i < 27; i++) {
        const start = introEnd + (i * pagesPerChapter);
        // We take the rest of the book for each file to allow scrolling forward, 
        // but it will START at the correct page for that chapter.
        const end = totalPages;

        if (start >= totalPages) break;

        const subPdf = await PDFDocument.create();
        const pageIndices = Array.from({ length: end - start }, (_, k) => start + k);
        const copiedPages = await subPdf.copyPages(pdfDoc, pageIndices);
        copiedPages.forEach(p => subPdf.addPage(p));

        const bytes = await subPdf.save();
        fs.writeFileSync(`${outputDir}/chapter_${i + 1}.pdf`, bytes);
        console.log(`Created Chapter ${i + 1} starting from page ${start + 1}`);
    }
}

splitPdf().catch(console.error);
