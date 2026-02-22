import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download, Loader2 } from 'lucide-react';
import { useApp } from '../App';
import { translations } from '../utils/language';

// Set worker path for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ file, initialPage, onClose, title }) => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(initialPage || 1);
    const [scale, setScale] = useState(window.innerWidth < 640 ? 0.8 : 1.2);
    const [isLoading, setIsLoading] = useState(true);

    // Update width on resize/orientation change
    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock body scroll on mount
    React.useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const changePage = (offset) => {
        setPageNumber(prev => Math.min(Math.max(1, prev + offset), numPages));
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-fade-in overflow-hidden">
            {/* Header */}
            <header className="h-20 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-8 shrink-0 z-50 shadow-xl">
                <div className="flex items-center gap-4 min-w-0">
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-black text-white truncate max-w-[140px] sm:max-w-md">{title}</h3>
                        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">
                            {t('pdfPageLabel')} {pageNumber} / {numPages || '...'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setScale(s => Math.min(s + 0.2, 3.0))}
                        className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95"
                    >
                        <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                        onClick={() => setScale(s => Math.max(s - 0.2, 0.5))}
                        className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95"
                    >
                        <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <a
                        href={file}
                        target="_blank"
                        download
                        className="hidden sm:flex p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-900/20"
                    >
                        <Download className="w-5 h-5" />
                    </a>
                </div>
            </header>

            {/* Scrollable PDF Area */}
            <main className="flex-1 overflow-auto bg-[#020617] p-2 sm:p-10 flex flex-col items-center">
                {isLoading && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
                        <p className="text-xs font-black text-emerald-500 uppercase tracking-widest animate-pulse font-outfit">Loading High Quality PDF...</p>
                    </div>
                )}

                <div className="relative shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-white rounded-sm overflow-hidden mb-8">
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(err) => console.error('PDF Error:', err)}
                        loading={null}
                    >
                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            scale={scale}
                            width={Math.min(windowWidth - 32, 800)}
                            devicePixelRatio={Math.min(2, window.devicePixelRatio || 1)}
                            className="bg-white"
                        />
                    </Document>
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className="h-20 bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-6 sm:px-12 shrink-0 z-50">
                <button
                    onClick={() => changePage(-1)}
                    disabled={pageNumber <= 1}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-white/10 disabled:opacity-10 transition-all active:scale-95 border border-white/5"
                >
                    <ChevronLeft className="w-4 h-4" /> {language === 'bn' ? 'পূর্ববর্তী' : 'Prev'}
                </button>

                <div className="flex flex-col items-center">
                    <div className="text-lg sm:text-2xl font-black text-white leading-none font-outfit">
                        {pageNumber} <span className="text-white/20 mx-1">/</span> {numPages}
                    </div>
                </div>

                <button
                    onClick={() => changePage(1)}
                    disabled={pageNumber >= numPages}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-emerald-500 disabled:opacity-10 transition-all active:scale-95 shadow-lg shadow-emerald-500/30"
                >
                    {language === 'bn' ? 'পরবর্তী' : 'Next'} <ChevronRight className="w-4 h-4" />
                </button>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
                .react-pdf__Page__canvas {
                    margin: 0 auto !important;
                    display: block !important;
                    image-rendering: auto;
                    -webkit-font-smoothing: antialiased;
                }
            `}} />
        </div>
    );
};

export default PdfViewer;
