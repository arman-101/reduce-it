"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// This interface defines what we'll store in localStorage.
// We store the image data as a base64 string.
export interface StoredFile {
  preview: string; // base64 data URL
  name: string;
  type: string;
  originalSize: number;
  newSize: number;
}

interface ImageContextType {
  processedFiles: StoredFile[];
  setProcessedFiles: (files: StoredFile[]) => void;
  clearProcessedFiles: () => void;
  isLoaded: boolean; // To know when localStorage has been checked
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Helper function to convert a base64 string back to a File object for downloading
export const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};


export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [processedFiles, setProcessedFilesState] = useState<StoredFile[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // On initial load, try to get the files from localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem('processedImages');
      if (item) {
        setProcessedFilesState(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
    }
    setIsLoaded(true); // Mark as loaded
  }, []);

  const setProcessedFiles = (files: StoredFile[]) => {
    setProcessedFilesState(files);
    try {
        // Save the new files to localStorage
        window.localStorage.setItem('processedImages', JSON.stringify(files));
    } catch (error) {
        console.error("Failed to save to localStorage", error);
    }
  };

  const clearProcessedFiles = () => {
    setProcessedFilesState([]);
    try {
        // Clear from localStorage
        window.localStorage.removeItem('processedImages');
    } catch (error) {
        console.error("Failed to clear localStorage", error);
    }
  };

  return (
    <ImageContext.Provider value={{ processedFiles, setProcessedFiles, clearProcessedFiles, isLoaded }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};
