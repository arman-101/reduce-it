"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, AlertCircle, HelpCircle } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/navigation';
import { useImageContext, StoredFile } from '@/context/ImageContext';
import Image from 'next/image';
import { ConfirmationModal } from './ConfirmationModal';

// ---- Enums, Interfaces, and Types ----
enum AppState { IDLE, PROCESSING }
interface UploadedFile { file: File; preview: string; width: number; height: number; }

// ---- Helper Functions ----
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes <= 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

// ---- Main Component ----
export function ImageUploader() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [targetSize, setTargetSize] = useState(100);
  const [processingProgress, setProcessingProgress] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showUpscaleWarning, setShowUpscaleWarning] = useState(false);
  const [prioritizeQuality, setPrioritizeQuality] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { setProcessedFiles } = useImageContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const remainingSlots = 10 - files.length;
    if (remainingSlots <= 0) {
        setError("You have already reached the 10 image limit.");
        return;
    }

    const filesToUpload = acceptedFiles.slice(0, remainingSlots);
    if(acceptedFiles.length > remainingSlots) {
        setError(`You can only add ${remainingSlots} more image(s). ${filesToUpload.length} were added.`);
    }

    filesToUpload.forEach(file => {
      const objectUrl = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = objectUrl;
      img.onload = () => {
        setFiles(prev => [...prev, { file, preview: objectUrl, width: img.naturalWidth, height: img.naturalHeight }]);
      }
    });
  }, [files.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': ['.jpeg', '.png', '.jpg'] }, disabled: appState !== AppState.IDLE });

  const removeFile = (preview: string) => {
    const fileToRemove = files.find(f => f.preview === preview);
    if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);
    setFiles(files.filter(f => f.preview !== preview));
    if (error) setError(null);
  };

  const startCompression = async () => {
    setAppState(AppState.PROCESSING);
    const processed: StoredFile[] = [];

    for (let i = 0; i < files.length; i++) {
      setProgressPercentage((i / files.length) * 100);
      const uploadedFile = files[i];
      setProcessingProgress(`Compressing ${i + 1} of ${files.length}: ${uploadedFile.file.name}`);
      
      try {
        const compressedFile = await imageCompression(uploadedFile.file, {
          maxSizeMB: targetSize / 1024,
          maxWidthOrHeight: Math.max(uploadedFile.width, uploadedFile.height),
          useWebWorker: true,
          maxIteration: 15,
          // This is the new option based on the user's choice
          alwaysKeepResolution: prioritizeQuality,
        });
        const base64Preview = await fileToBase64(compressedFile);
        processed.push({
            preview: base64Preview,
            name: compressedFile.name,
            type: compressedFile.type,
            newSize: compressedFile.size,
            originalSize: uploadedFile.file.size,
        });
      } catch (error) { console.error("Compression Error:", error); }
    }
    
    setProgressPercentage(100);
    setProcessingProgress("Finalizing...");

    setProcessedFiles(processed);
    setTimeout(() => {
        router.push('/compressed');
    }, 300);
  };
  
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (files.length > 0) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [files.length]);

  if (appState === AppState.PROCESSING) return (
    <div className="w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Compressing Images...</h2>
        <div className="w-full bg-secondary rounded-full h-4 relative overflow-hidden">
            <div className="bg-primary h-4 rounded-full transition-all duration-300 ease-linear" style={{ width: `${progressPercentage}%` }}></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-foreground">{Math.round(progressPercentage)}%</span>
        </div>
        <p className="text-muted-foreground mt-4 truncate">{processingProgress}</p>
    </div>
  );

  return (
    <div className="w-full max-w-7xl relative">
      <ConfirmationModal isOpen={showUpscaleWarning} onClose={() => setShowUpscaleWarning(false)} onConfirm={() => { setShowUpscaleWarning(false); startCompression(); }} title="Pointless Compression?" message="At least one image is smaller than the target size. Compressing it may not reduce its size. Continue anyway?" />
      
      {files.length === 0 ? (
        <div {...getRootProps()} className={`w-full h-96 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 ${isDragActive ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary'}`}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center flex-grow pt-16">
            <UploadCloud className="w-20 h-20 text-muted-foreground mb-4" />
            <h2 className="text-3xl font-semibold text-foreground">Drag & Drop Images Here</h2>
            <p className="text-muted-foreground mt-2">or click to browse</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center flex-shrink-0 pb-12">
            <div className="w-1/4 h-px bg-border my-4"></div>
            <p className="text-sm text-muted-foreground/80">You can upload up to 10 images at a time.</p>
          </div>
        </div>
      ) : (
        <div className="w-full mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {files.map((uploadedFile) => (
              <div key={uploadedFile.preview} className="relative group bg-card p-3 rounded-lg shadow-sm overflow-hidden">
                <div className="relative w-full h-48">
                  <Image src={uploadedFile.preview} alt={uploadedFile.file.name} fill style={{ objectFit: 'cover' }} className="rounded-md" />
                </div>
                <button onClick={() => removeFile(uploadedFile.preview)} className="absolute top-2 right-2 bg-destructive/80 hover:bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-4 h-4" />
                </button>
                <div className="mt-3 text-sm">
                  <p className="font-semibold text-foreground truncate">{uploadedFile.file.name}</p>
                  <p className="text-xs text-muted-foreground">{`${uploadedFile.width}x${uploadedFile.height}`}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(uploadedFile.file.size)}</p>
                </div>
              </div>
            ))}
            {files.length < 10 && (
              <div {...getRootProps()} className="w-full h-full min-h-[260px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 border-border bg-card hover:border-primary">
                <input {...getInputProps()} />
                <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
                <p className="text-foreground font-semibold">Add More</p>
              </div>
            )}
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">Reduce images to ~{targetSize} KB</h3>
            <Slider.Root className="relative flex items-center select-none touch-none w-full h-5" defaultValue={[100]} max={2000} min={10} step={10} onValueChange={(value) => setTargetSize(value[0])}>
                <Slider.Track className="bg-secondary relative grow rounded-full h-1.5">
                    <Slider.Range className="absolute bg-primary rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-primary shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background" />
            </Slider.Root>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>10 KB</span>
                <span>2 MB</span>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
                <input
                    type="checkbox"
                    id="quality-toggle"
                    checked={prioritizeQuality}
                    onChange={(e) => setPrioritizeQuality(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="quality-toggle" className="text-sm text-foreground select-none">
                    Prioritize Quality (Keep Resolution)
                </label>
                <div className="group relative flex items-center">
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    <div className="absolute bottom-full mb-2 w-64 bg-popover text-popover-foreground text-xs rounded-md shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Checking this will prevent the image dimensions from being reduced. This preserves detail but may result in a file size larger than your target.
                    </div>
                </div>
            </div>
            <div className="mt-6 text-center">
                <button onClick={startCompression} className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105">
                    Reduce {files.length} Image{files.length !== 1 ? 's' : ''}
                </button>
            </div>
          </div>
        </div>
      )}
      {error && <div className="mt-4 flex items-center justify-center gap-2 text-destructive font-semibold"><AlertCircle className="w-5 h-5" />{error}</div>}
    </div>
  );
}
