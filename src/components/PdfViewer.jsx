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

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(initialPage || 1);
    const [scale, setScale] = useState(window.innerWidth < 640 ? 0.6 : 1.0);
    const [isLoading, setIsLoading] = useState(true);

    // Lock body scroll on mount
    React.useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none'; // Prevent pull-to-refresh
        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.touchAction = 'auto';
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
        <div
            className="fixed inset-0 z-[100] bg-[#020617] flex flex-col animate-fade-in overflow-hidden"
            style={{ overscrollBehavior: 'none' }}
        >
            {/* Native-style Navigation Bar */}
            <header className="h-16 h-20 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-8 shrink-0 z-50">
                <div className="flex items-center gap-4 min-w-0">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-90"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-black text-white truncate max-w-[150px] sm:max-w-md">{title}</h3>
                        <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">
                            {t('pdfPageLabel')} {pageNumber} / {numPages || '...'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-3">
                    <button
                        onClick={() => setScale(s => Math.min(s + 0.2, 4.0))}
                        className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
                    >
                        <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                        onClick={() => setScale(s => Math.max(s - 0.2, 0.4))}
                        className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
                    >
                        <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <a
                        href={file}
                        target="_blank"
                        download="Quran_Message_Shaykh_Ahmadullah.pdf"
                        className="hidden sm:flex p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-900/20"
                    >
                        <Download className="w-5 h-5" />
                    </a>
                </div>
            </header>

            {/* Robust Scroll Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-950 flex flex-col items-center p-4 sm:p-12 scrollbar-hide">
                {isLoading && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10">
                        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] animate-pulse">Establishing Connection...</p>
                    </div>
                )}

                <div
                    className="relative shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-white rounded-sm origin-top transition-transform duration-200 ease-out"
                    style={{
                        transform: `scale(${scale})`,
                        marginBottom: `${(scale - 1) * 100}%`
                    }}
                >
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(err) => console.error('PDF Load Error:', err)}
                        loading={null}
                    >
                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={Math.min(window.innerWidth - 32, 850)}
                            devicePixelRatio={Math.min(2, window.devicePixelRatio || 1)}
                            className="transition-opacity duration-300"
                        />
                    </Document>
                </div>
            </main>

            {/* Fixed Footer Controls */}
            <footer className="h-20 bg-slate-900/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-center gap-4 sm:gap-12 px-6 shrink-0 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
                <button
                    onClick={() => changePage(-1)}
                    disabled={pageNumber <= 1}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white/5 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-white/10 disabled:opacity-10 transition-all active:scale-95"
                >
                    <ChevronLeft className="w-4 h-4" /> {language === 'bn' ? 'পূর্ববর্তী' : 'Prev'}
                </button>

                <div className="flex flex-col items-center min-w-[80px]">
                    <span className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-tighter mb-0.5">{language === 'bn' ? 'পৃষ্ঠা' : 'PAGE'}</span>
                    <div className="text-lg font-black text-white leading-none">
                        {pageNumber} <span className="text-white/20 mx-1">/</span> {numPages}
                    </div>
                </div>

                <button
                    onClick={() => changePage(1)}
                    disabled={pageNumber >= numPages}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-emerald-500 disabled:opacity-10 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                    {language === 'bn' ? 'পরবর্তী' : 'Next'} <ChevronRight className="w-4 h-4" />
                </button>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
                .react-pdf__Page__canvas {
                    margin: 0 auto !important;
                    display: block !important;
                    image-rendering: -webkit-optimize-contrast;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </div>
    );
};

export default PdfViewer;
