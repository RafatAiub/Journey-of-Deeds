import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download, Loader2, ExternalLink, FileText } from 'lucide-react';
import { useApp } from '../App';
import { translations } from '../utils/language';

// Set worker path for pdf.js
// Set worker path for pdf.js to a stable versioned URL
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ file, initialPage, onClose, title }) => {
    const { language } = useApp();
    const t = (key) => translations[language][key] || key;

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(initialPage || 1);
    const [scale, setScale] = useState(window.innerWidth < 640 ? 1.0 : 1.2);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Auto-fallback timer for mobile
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading && !error) {
                console.warn('PDF load timeout - showing fallback');
                setError(true);
                setIsLoading(false);
            }
        }, 10000);
        return () => clearTimeout(timer);
    }, [isLoading, error]);

    // Update width on resize
    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Scroll Lock
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    function onDocumentLoadError(err) {
        console.error('PDF Load Error:', err);
        setIsLoading(false);
        setError(true);
    }

    const changePage = (offset) => {
        setPageNumber(prev => Math.min(Math.max(1, prev + offset), numPages));
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col animate-fade-in overflow-hidden">
            {/* Header */}
            <header className="h-16 bg-[#18181b] border-b border-white/5 flex items-center justify-between px-4 sm:px-8 shrink-0 z-50 shadow-2xl">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-xl bg-white/5 text-white/70 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                    <div className="min-w-0">
                        <h3 className="text-xs font-black text-white/90 truncate max-w-[140px] uppercase tracking-tighter">{title}</h3>
                        <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest leading-none mt-1">
                            {pageNumber} / {numPages || '..'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setScale(s => Math.min(s + 0.2, 4))} className="p-2 rounded-lg bg-white/5 text-white/50"><ZoomIn size={18} /></button>
                    <button onClick={() => setScale(s => Math.max(s - 0.2, 0.4))} className="p-2 rounded-lg bg-white/5 text-white/50"><ZoomOut size={18} /></button>
                    <a href={file} target="_blank" className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 ml-2"><ExternalLink size={18} /></a>
                </div>
            </header>

            {/* Viewer */}
            <main className="flex-1 overflow-auto bg-black flex flex-col items-center">
                {isLoading && (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-white/20">
                        <div className="w-10 h-10 border-2 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mb-6" />
                        <p className="text-[10px] font-black tracking-[0.4em] uppercase animate-pulse">Initializing Quranic Content...</p>
                    </div>
                )}

                {error && (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center bg-[#0a0a0a]">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                            <FileText className="text-emerald-500 w-8 h-8" />
                        </div>
                        <h4 className="text-white font-black text-sm mb-2">{language === 'bn' ? 'পিডিএফ লোড হতে দেরি হচ্ছে' : 'Loading Slow or Interrupted'}</h4>
                        <p className="text-white/40 text-[10px] mb-8 leading-relaxed max-w-[240px]">
                            {language === 'bn'
                                ? 'আপনার ডিভাইসে সরাসরি পিডিএফ দেখার জন্য নিচের বাটনে ক্লিক করুন।'
                                : 'For the best experience on mobile, click the button below to view the PDF directly in your browser.'}
                        </p>
                        <a
                            href={file}
                            target="_blank"
                            className="bg-emerald-600 px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                        >
                            {language === 'bn' ? 'সরাসরি দেখুন' : 'Open Direct PDF'}
                        </a>
                    </div>
                )}

                {!error && (
                    <div className="p-4 sm:p-10 flex flex-col items-center">
                        <div className="shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-white rounded-sm mb-12">
                            <Document
                                file={file}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={onDocumentLoadError}
                                loading={null}
                                options={{
                                    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                                    cMapPacked: true,
                                }}
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    scale={scale}
                                    width={Math.min(windowWidth - 16, 800)}
                                    devicePixelRatio={window.innerWidth < 640 ? 1 : Math.min(2, window.devicePixelRatio || 1)}
                                    className="bg-white"
                                />
                            </Document>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            {!error && (
                <footer className="h-20 bg-[#18181b] flex items-center justify-between px-6 sm:px-12 shrink-0 border-t border-white/5">
                    <button
                        onClick={() => changePage(-1)}
                        disabled={pageNumber <= 1}
                        className="px-6 py-3.5 rounded-2xl bg-white/5 text-white/90 font-black text-[10px] uppercase tracking-widest disabled:opacity-20 transition-all border border-white/5 active:scale-95"
                    >
                        {language === 'bn' ? 'আগে' : 'Prev'}
                    </button>

                    <div className="flex flex-col items-center">
                        <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-[0.3em] mb-1">{language === 'bn' ? 'পৃষ্ঠা' : 'PAGE'}</span>
                        <div className="text-white font-black text-sm tabular-nums">
                            {pageNumber} <span className="text-white/20 mx-1">/</span> {numPages}
                        </div>
                    </div>

                    <button
                        onClick={() => changePage(1)}
                        disabled={pageNumber >= numPages}
                        className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest disabled:opacity-20 transition-all shadow-xl active:scale-95"
                    >
                        {language === 'bn' ? 'পরে' : 'Next'}
                    </button>
                </footer>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .react-pdf__Page__canvas { margin: 0 auto !important; display: block !important; }
            `}} />
        </div>
    );
};

export default PdfViewer;
