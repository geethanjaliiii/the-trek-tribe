import { useState } from "react";

interface FileUploaderProps {
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  helperText?: string;
  error?: string;
  id?: string; // Added id prop to uniquely identify each uploader
}

export function FileUploader({
  value,
  onChange,
  accept = "*",
  maxSize = 5,
  helperText,
  error,
  id = "file-upload", // Default ID that can be overridden
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(
    typeof value === "string" ? value : ""
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    setFileError(null);

    // Check file type
    if (accept !== "*") {
      const fileType = file.type;
      const acceptTypes = accept.split(",").map((type) => type.trim());
      const isValidType = acceptTypes.some((type) => {
        if (type.startsWith(".")) {
          // Extension check
          return file.name.endsWith(type);
        } else if (type.includes("*")) {
          // Wildcard MIME type (e.g., "image/*")
          return fileType.startsWith(type.replace("*", ""));
        } else {
          return fileType === type;
        }
      });

      if (!isValidType) {
        setPreview("");
        setFileError(`Invalid file type. Accepted formats: ${accept}`);
        return;
      }
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      setFileError(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    // If validation passed, handle file
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setPreview("");
    setFileError(null);
  };

  return (
    <div className="space-y-2">
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        } ${error ? "border-destructive/50 bg-destructive/5" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(id)?.click()}
      >
        <input
          type="file"
          id={id}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />

        {value ? (
          <div className="py-2">
            <p className="text-sm font-medium mb-1">
              File uploaded successfully
            </p>
            
            {accept?.includes("image") && value.startsWith("data:image") && (
              <div className="flex justify-center mt-2">
                <img
                  src={value}
                  alt="Preview"
                  className="max-h-24 max-w-full rounded"
                />
              </div>
            )}
            
            <button
              type="button"
              className="mt-2 px-3 py-1 text-sm border rounded hover:bg-gray-100"
              onClick={removeFile}
            >
              Change File
            </button>
          </div>
        ) : (
          <div className="py-4">
            <div className="h-8 w-8 mx-auto mb-2 text-muted-foreground">
              {/* Upload icon would go here */}
            </div>
            <p className="text-sm font-medium mb-1">
              Drag and drop or click to upload
            </p>
            {helperText && (
              <p className="text-xs text-muted-foreground">{helperText}</p>
            )}
          </div>
        )}
      </div>

      {(fileError || error) && (
        <p className="text-red-500 text-sm">{fileError || error}</p>
      )}
    </div>
  );
}

// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";
// import { FileIcon, Upload, UploadCloud, X } from "lucide-react";

// interface FileUploaderProps {
//   value: string;
//   onChange: (value: string) => void;
//   accept?: string;
//   maxSize?: number; // in MB
//   helperText?: string;
//   error?: string;
  
// }

// export function FileUploader({
//   value,
//   onChange,
//   accept = "*",
//   maxSize = 5,
//   helperText,
//   error,
// }: FileUploaderProps) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [fileError, setFileError] = useState<string | null>("");
//   const [preview, setPreview] = useState<string>(
//     typeof value === "string" ? value : ""
//   );
//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       validateAndProcessFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       validateAndProcessFile(e.target.files[0]);
//     }
//   };
//   const validateAndProcessFile = (file: File) => {
//     setFileError("");

//     //check file type
//     if (accept != "*") {
//       const fileType = file.type;
//       const acceptTypes = accept.split(",").map((type) => type.trim());
//       const isValidType = acceptTypes.some((type) => {
//         if (type.startsWith(".")) {
//           //extension check
//           return file.name.endsWith(type);
//         } else if (type.includes("*")) {
//           // Wildcard MIME type (e.g., "image/*")
//           return fileType.startsWith(type.replace("*", ""));
//         } else {
//           return fileType === type;
//         }
//       });

//       if (!isValidType) {
//         setPreview("");
//         setFileError(`Invalid file type. Accepted formats: ${accept}`);
//         return;
//       }
//       const reader = new FileReader();
//       reader.onload = () => {};
//       reader.readAsDataURL(file);
//     }

//     //2.check file syse
//     const fileSizeInMB = file.size / (1024 * 1024);
//     if (fileSizeInMB > maxSize) {
//       setFileError(`File size exceeds ${maxSize}MB limit`);
//       return;
//     }

//     //if validation passed, handle file
//     const reader = new FileReader();
//     reader.onload = () => {
//       setPreview(reader.result as string);
//       onChange(reader.result as string);
//       console.log("reader=>", reader);
//     };
//     reader.readAsDataURL(file);
//   };

//   // const handleFile = (file: File) => {
//   //   setError(null)

//   //   // Check file size
//   //   if (file.size > maxSize * 1024 * 1024) {
//   //     setError(`File size exceeds ${maxSize}MB limit`)
//   //     return
//   //   }

//   //   // In a real app, you would upload the file to your server or cloud storage
//   //   // For this demo, we'll just use the file name
//   //   onChange(file.name)
//   // }

//   const removeFile = () => {
//     onChange("");
//     setFileError(null);
//   };

//   return (
//     <div className="space-y-2">
//       <div
//         className={cn(
//           "border-2 border-dashed rounded-lg p-6 transition-colors",
//           isDragging
//             ? "border-primary bg-primary/5"
//             : "border-muted-foreground/25",
//           error && "border-destructive/50 bg-destructive/5"
//         )}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={() => document.getElementById("file-upload")?.click()}
//       >
//         <input
//           type="file"
//           id="file-upload"
//           className="hidden"
//           accept={accept}
//           onChange={handleFileChange}
//         />

//         {value ? (
//           <div className="py-2">
//             <p className="text-sm font-medium mb-1">
//               File uploaded successfully
//             </p>
//             4
//             {accept?.includes("image") && value.startsWith("data:image") && (
//               <div className="flex justify-center mt-2">
//                 <img
//                   src={value}
//                   alt="Preview"
//                   className="max-h-24 max-w-full rounded"
//                 />
//               </div>
//             )}
//             <Button
//               variant="outline"
//               size="sm"
//               className="mt-2"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onChange("");
//               }}
//             >
//               Chanage File
//             </Button>
//           </div>
//         ) : (
//           <div className="py-4">
//             <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
//             <p className="text-sm font-medium mb-1">
//               Drag and drop or click to upload
//             </p>
//             {helperText && (
//               <p className="text-xs text-muted-foreground">{helperText}</p>
//             )}
//           </div>
//         )}
//       </div>

//       {(fileError || error) && (
//         <p className="text-red-500 text-sm">{fileError || error}</p>
//       )}
//     </div>
//   );
// }

// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { cn } from "@/lib/utils"
// import { FileIcon, UploadCloud, X } from "lucide-react"

// interface FileUploaderProps {
//   value: string
//   onChange: (value: string) => void
//   accept?: string
//   maxSize?: number // in MB
//   helperText?: string
// }

// export function FileUploader({ value, onChange, accept, maxSize = 5, helperText }: FileUploaderProps) {
//   const [isDragging, setIsDragging] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // In a real app, this would be a file object or URL
//   // For this demo, we'll just use a string to simulate a file being uploaded
//   const hasFile = !!value

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }

//   const handleDragLeave = () => {
//     setIsDragging(false)
//   }

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     setIsDragging(false)

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFile(e.dataTransfer.files[0])
//     }
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFile(e.target.files[0])
//     }
//   }

//   const handleFile = (file: File) => {
//     setError(null)

//     // Check file size
//     if (file.size > maxSize * 1024 * 1024) {
//       setError(`File size exceeds ${maxSize}MB limit`)
//       return
//     }

//     // In a real app, you would upload the file to your server or cloud storage
//     // For this demo, we'll just use the file name
//     onChange(file.name)
//   }

//   const removeFile = () => {
//     onChange("")
//     setError(null)
//   }

//   return (
//     <div className="space-y-2">
//       <div
//         className={cn(
//           "border-2 border-dashed rounded-lg p-6 transition-colors",
//           isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
//           error && "border-destructive/50 bg-destructive/5",
//         )}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         <div className="flex flex-col items-center justify-center space-y-3 text-center">
//           {hasFile ? (
//             <div className="flex items-center justify-between w-full">
//               <div className="flex items-center space-x-2">
//                 <FileIcon className="h-8 w-8 text-primary" />
//                 <div className="space-y-1">
//                   <p className="text-sm font-medium">{value}</p>
//                   <p className="text-xs text-muted-foreground">Uploaded successfully</p>
//                 </div>
//               </div>
//               <Button variant="ghost" size="icon" onClick={removeFile} className="h-8 w-8">
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           ) : (
//             <>
//               <div className="rounded-full bg-primary/10 p-3">
//                 <UploadCloud className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium">
//                   Drag & drop or{" "}
//                   <Label htmlFor={`file-upload-${accept}`} className="cursor-pointer text-primary">
//                     browse
//                   </Label>
//                 </p>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   {helperText || `Upload a file (Max: ${maxSize}MB)`}
//                 </p>
//               </div>
//               <Input
//                 id={`file-upload-${accept}`}
//                 type="file"
//                 accept={accept}
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </>
//           )}
//         </div>
//       </div>
//       {error && <p className="text-xs text-destructive">{error}</p>}
//     </div>
//   )
// }
