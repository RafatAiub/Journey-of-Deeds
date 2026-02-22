import * as pdfjs from 'pdfjs-dist';
import fs from 'fs';

async function extractText() {
    try {
        const data = new Uint8Array(fs.readFileSync('public/taraweeh_master.pdf'));
        const loadingTask = pdfjs.getDocument({
            data,
            useSystemFonts: true,
            disableFontFace: true
        });
        const pdf = await loadingTask.promise;
        console.log('Pages:', pdf.numPages);

        for (let i = 1; i <= Math.min(20, pdf.numPages); i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str).join(' ');
            console.log(`--- Page ${i} ---`);
            console.log(strings.substring(0, 500));
        }
    } catch (err) {
        console.error(err);
    }
}

extractText();
