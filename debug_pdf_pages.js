import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function debugPages() {
    try {
        const existingPdfBytes = fs.readFileSync('public/taraweeh_master.pdf');
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const totalPages = pdfDoc.getPageCount();
        console.log('Total Pages:', totalPages);

        // We can't easily extract text with pdf-lib, but we can try to find the TOC page
        // Usually TOC is in the first 10 pages.
    } catch (err) {
        console.error(err);
    }
}
debugPages();
