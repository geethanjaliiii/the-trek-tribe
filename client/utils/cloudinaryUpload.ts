// utils/cloudinaryUpload.ts
export async function uploadToCloudinary(file: File, folder: string = 'vendor-documents'): Promise<string> {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
  
      // Make the upload request to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to upload to Cloudinary');
      }
  
      const data = await response.json();
      console.log('cloudinary secure urls',data.secure_url);
      
      return data.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  }