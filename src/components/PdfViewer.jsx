import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download, Loader2 } from 'lucide-react';

// Set worker path for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ file, initialPage, onClose, title }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(initialPage || 1);
    const [scale, setScale] = useState(1.0);
    const [isLoading, setIsLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const changePage = (offset) => {
        setPageNumber(prev => Math.min(Math.max(1, prev + offset), numPages));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/95 backdrop-blur-xl animate-fade-in">
            <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/20">

                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
                    <div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{title}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                            Page {pageNumber} of {numPages || '...'}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setScale(s => Math.min(s + 0.2, 2.0))}
                            className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setScale(s => Math.max(s - 0.2, 0.5))}
                            className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <div className="w-px h-6 bg-slate-100 mx-1" />
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all hover:rotate-90"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* PDF Content */}
                <div className="flex-1 overflow-auto bg-slate-50/50 flex flex-col items-center p-4 sm:p-8 scrollbar-hide select-none transition-all">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 z-10">
                            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Loading Quranic Message...</p>
                        </div>
                    )}

                    <div className="shadow-2xl rounded-lg overflow-hidden border border-slate-200 transition-transform duration-300" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
                        <Document
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={null}
                        >
                            <Page
                                pageNumber={pageNumber}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                width={Math.min(window.innerWidth - 80, 800)}
                                className="transition-opacity duration-500"
                            />
                        </Document>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-center gap-8">
                    <button
                        onClick={() => changePage(-1)}
                        disabled={pageNumber <= 1}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                        <ChevronLeft className="w-4 h-4" /> Prev
                    </button>

                    <div className="text-sm font-black text-slate-900 min-w-[80px] text-center">
                        {pageNumber} <span className="text-slate-300 mx-1">/</span> {numPages}
                    </div>

                    <button
                        onClick={() => changePage(1)}
                        disabled={pageNumber >= numPages}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                        Next <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PdfViewer;
