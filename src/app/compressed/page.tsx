"use client"

import { useImageContext, base64ToFile } from '@/context/ImageContext';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Download, RefreshCw, ChevronsRight, AlertTriangle, Loader } from 'lucide-react';
import Image from 'next/image';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { useEffect, useState } from 'react';
import { ConfirmationModal } from '@/components/ConfirmationModal';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes <= 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default function CompressedPage() {
  const { processedFiles, clearProcessedFiles, isLoaded } = useImageContext();
  const router = useRouter();
  const [totalOriginalSize, setTotalOriginalSize] = useState(0);
  const [totalNewSize, setTotalNewSize] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isLoaded && processedFiles.length > 0) {
      const originalTotal = processedFiles.reduce((acc, file) => acc + file.originalSize, 0);
      const newTotal = processedFiles.reduce((acc, file) => acc + file.newSize, 0);
      setTotalOriginalSize(originalTotal);
      setTotalNewSize(newTotal);
    }
  }, [processedFiles, isLoaded]);

  const downloadAll = () => {
    const zip = new JSZip();
    processedFiles.forEach(pf => {
        const file = base64ToFile(pf.preview, pf.name);
        zip.file(file.name, file);
    });
    zip.generateAsync({ type: "blob" }).then(content => saveAs(content, "Reduced-Images.zip"));
  };

  const handleDownloadSingle = (fileData: typeof processedFiles[0]) => {
    const file = base64ToFile(fileData.preview, fileData.name);
    saveAs(file, file.name);
  };

  const confirmReduceMore = () => {
    clearProcessedFiles();
    router.push('/');
  };

  if (!isLoaded) {
    return (
        <div className="flex flex-col min-h-screen bg-background font-sans">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <Loader className="w-12 h-12 animate-spin text-primary" />
            </main>
            <Footer />
        </div>
    );
  }

  if (isLoaded && processedFiles.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background font-sans">
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-center text-center">
            <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">No Compressed Images Found</h1>
            <p className="text-muted-foreground mb-6">Your session has expired or no images were compressed. Please return home.</p>
            <button onClick={() => router.push('/')} className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-primary/90">
                Go to Homepage
            </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <ConfirmationModal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={confirmReduceMore} title="Start Over?" message="Are you sure? Your current compressed files will be permanently deleted from this browser." />
        <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-primary mb-2">Compression Complete!</h2>
                <p className="text-lg text-muted-foreground font-semibold">You saved {formatBytes(totalOriginalSize - totalNewSize)}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
                {processedFiles.map((pf) => (
                    <div key={pf.preview} className="bg-card p-3 rounded-lg shadow-sm">
                        <div className="relative w-full h-48 mb-3">
                            <Image src={pf.preview} alt={pf.name} fill style={{ objectFit: 'cover' }} className="rounded-md" />
                        </div>
                        <p className="font-semibold text-sm text-foreground truncate">{pf.name}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground my-2">
                            <span>{formatBytes(pf.originalSize)}</span>
                            <ChevronsRight className="w-4 h-4 text-primary" />
                            <span className="font-bold text-primary">{formatBytes(pf.newSize)}</span>
                        </div>
                        <button onClick={() => handleDownloadSingle(pf)} className="w-full mt-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={downloadAll} className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105 flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Download All (.zip)
                </button>
                <button onClick={() => setShowModal(true)} className="bg-accent text-accent-foreground font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-accent/90 transition-transform transform hover:scale-105 flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5" /> Reduce More
                </button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
