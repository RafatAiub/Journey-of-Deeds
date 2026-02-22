import fs from 'fs';
import { PDFParse } from 'pdf-parse';

const pdfPath = 'public/তারাবীহর সালাতে কুরআনের বার্তা [boimate.com].pdf';

async function extractInfo() {
    let dataBuffer = fs.readFileSync(pdfPath);

    try {
        const parser = new PDFParse();
        const data = await parser.parse(dataBuffer);

        console.log("Total Pages:", data.numpages);
        console.log("START_OF_TEXT");
        console.log(data.text.substring(0, 10000));
        console.log("END_OF_TEXT");

    } catch (err) {
        console.error("Error:", err);
    }
}

extractInfo();
