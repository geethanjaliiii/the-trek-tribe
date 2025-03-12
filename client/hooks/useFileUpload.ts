// hooks/useFileUpload.ts
import { useState } from 'react';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string> => {
    if (!file) return '';
    
    try {
      setIsUploading(true);
      setProgress(0);
      setError(null);
      
      // For progress simulation (replace with actual progress if Cloudinary API supports it)
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);
      
      const url = await uploadToCloudinary(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      setIsUploading(false);
      
      return url;
    } catch (err) {
      console.log('error uploading to cloudinary',err);
      
      setError(err instanceof Error ? err.message : 'Upload failed');
      setIsUploading(false);
      throw err;
    }
  };

  const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
    try {
      setIsUploading(true);
      setError(null);
      
      const urls = await Promise.all(
        files.map(file => file ? uploadToCloudinary(file) : '')
      );
      
      setIsUploading(false);
      return urls.filter(url => url !== '');
    } catch (err) {
      console.log('Error uploading to cloudinary',err);
      
      setError(err instanceof Error ? err.message : 'Upload failed');
      setIsUploading(false);
      throw err;
    }
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    progress,
    error
  };
}