"use client";

import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUploader } from "./file-uploader";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VendorVerificationValues } from "@/types/Vendor";
import { businessTypes, countries, steps } from "@/lib/data";
import { useFileUpload } from "@/hooks/useFileUpload";
import {
  useGetVendorDetailsQuery,
  useSendVerificationRequestMutation,
} from "@/features/api/vendor/vendorApiSlice";
import { toast } from "sonner";

interface ProfileWizardProps {
  vendor: VendorVerificationValues;
  loading:any;

}

export function ProfileWizard({ vendor ,loading}: ProfileWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const { uploadFile, uploadMultipleFiles, isUploading } = useFileUpload();
  const [sendVerificationRequest, { isLoading: isSubmitting }] =
    useSendVerificationRequestMutation();

    // useEffect(() => {
    //   console.log(vendor,'formData');
      
    //   setFormData({
    //     ...vendor,
      //   fullName: vendor.fullName || '',
      //   email:vendor.email || '',
      //   phoneNumber:vendor?.phoneNumber || vendor.phoneNumber,
      // });
    // }, [vendor]);

  // const handleChange = (field: string, value: string | string[]) => {
  //   setFormData((prev: any) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  const handleNext = async (
    values: VendorVerificationValues,
    formikHelpers: FormikHelpers<VendorVerificationValues>
  ) => {
    formikHelpers.setTouched(
      steps[currentStep].fields.reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {}
      )
    );

    const errors = await validateStep(values);
    console.log("validation error", errors);

    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      formikHelpers.setErrors(errors);
      focusOnError(errors, steps[currentStep].fields);
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (
    values: VendorVerificationValues,
    { setSubmitting }: FormikHelpers<VendorVerificationValues>
  ) => {
    try {
      setSubmitting(true);

      const businessDocFiles = await Promise.all(
        values.businessDocuments.map(async (doc, index) => {
          // If it's already a File object, use it directly
          if (doc instanceof File)
            return { key: `businessDoc_${index}`, file: doc };

          // If it's a data URL, convert it to a File object
          if (typeof doc === "string" && doc.startsWith("data:")) {
            const response = await fetch(doc);
            const blob = await response.blob();
            const file = new File(
              [blob],
              `document_${index}.${doc.includes("image/jpeg") ? "jpg" : "png"}`,
              {
                type: doc.includes("image/jpeg") ? "image/jpeg" : "image/png",
              }
            );
            return { key: `businessDoc_${index}`, file };
          }

          // If it's already a URL (string but not data URL), return it as is
          return { key: `businessDoc_${index}`, url: doc };
        })
      );
      // Helper function to convert data URL to File
      const convertToFile = async (data: any, name: string, index: number) => {
        if (data instanceof File) return data;
        if (typeof data === "string" && data.startsWith("data:")) {
          const response = await fetch(data);
          const blob = await response.blob();
          return new File(
            [blob],
            `${name}_${index}.${data.includes("image/jpeg") ? "jpg" : "png"}`,
            {
              type: data.includes("image/jpeg") ? "image/jpeg" : "image/png",
            }
          );
        }
        return null; // Return null if it's neither a File nor data URL
      };
      const filesToUpload: { key: string; file: File }[] = [];

      // Add business logo if it exists
      if (values.businessLogo) {
        const logoFile = await convertToFile(
          values.businessLogo,
          "businessLogo",
          0
        );
        if (logoFile) {
          filesToUpload.push({ key: "businessLogo", file: logoFile });
        }
      }
      if (values.ownerIdProof) {
        const idFile = await convertToFile(
          values.ownerIdProof,
          "ownerIdProof",
          0
        );
        if (idFile) {
          filesToUpload.push({ key: "ownerIdProof", file: idFile });
        }
      }

      // Add business documents that need uploading (have file but no URL yet)
      businessDocFiles
        .filter((item) => item.file && !item.url)
        .forEach((item) =>
          filesToUpload.push(item as { key: string; file: File })
        );

      // Show upload status
      const uploadingToast = toast.loading("Uploading documents...");

      // Upload files
      const uploadResults = await Promise.all(
        filesToUpload.map(async ({ key, file }) => {
          const url = await uploadFile(file);
          return { key, url };
        })
      );

      console.log("upload files to upload", filesToUpload);
      toast.dismiss(uploadingToast);
      toast.success("Documents uploaded successfully");

      // Prepare final data
      const requestData = {
        ...values,
        businessLogo:
          uploadResults.find((r) => r.key === "businessLogo")?.url || "",
        ownerIdProof:
          uploadResults.find((r) => r.key === "ownerIdProof")?.url || "",
        businessDocuments: businessDocFiles
          .map((doc, index) => {
            // If it already has a URL, use it
            if (doc.url) return doc.url;
            // Otherwise look for the uploaded URL
            return (
              uploadResults.find((r) => r.key === `businessDoc_${index}`)
                ?.url || ""
            );
          })
          .filter((url) => url !== ""),
      };

      // Submit verification request
      const submittingToast = toast.loading(
        "Submitting verification request..."
      );
      console.log("requested data", requestData);
      await sendVerificationRequest(requestData).unwrap();

      toast.dismiss(submittingToast);
      toast.success("Verification request submitted successfully!");
    
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Failed to submit verification request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const focusOnError = (errors: any, currentStepFields: string[]) => {
    const errorFields = Object.keys(errors);
    const filedToFocus = errorFields.find((field) =>
      currentStepFields.includes(field)
    );

    if (filedToFocus) {
      const errorElement = document.getElementById(filedToFocus);
      if (errorElement) {
        errorElement.focus();
      }
    }
  };

  const validateStep = async (values: VendorVerificationValues) => {
    try {
      await steps[currentStep].validationSchema.validateSync(values, {
        abortEarly: false,
      });
      return {};
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      if (err.inner) {
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
      }
      return validationErrors;
    }
  };
  const renderStepContent = (formikProps: any) => {
    const { values, errors, touched, handleChange, setFieldValue } =
      formikProps;
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Field
                as={Input}
                name='fullName'
                id="fullName"
                type='fullName'
                placeholder="Enter your full name"
                className={
                  errors.fullName && touched.fullName ? "border-red-500" : ""
                }
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Field
                id="email"
                name="email"
                type="email"
                disabled={true}
                placeholder="Enter your email"
                className="bg-gray-100 cursor-not-allowed"
              />
              <p className="text-sm text-gray-500 mt-1">
                Email cannot be changed
              </p>{" "}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Field
                as={Input}
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className={
                  errors.phoneNumber && touched.phoneNumber
                    ? "border-red-500"
                    : ""
                }
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalContactNumber">
                Additional Contact Number (Optional)
              </Label>
              <Field
                as={Input}
                id="additionalContactNumber"
                name="additionalContactNumber"
                placeholder="Enter additional contact number"
                className={
                  errors.additionalContactNumber &&
                  touched.additionalContactNumber
                    ? "border-red-500"
                    : ""
                }
              />
              <ErrorMessage
                name="additionalContactNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name*</Label>
              <Field
                as={Input}
                id="businessName"
                name="businessName"
                placeholder="Enter your business name"
                className={
                  errors.businessName && touched.businessName
                    ? "border-red-500"
                    : ""
                }
              />
              <ErrorMessage
                name="businessName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessDescription">Business Description*</Label>
              <Field
                as={Textarea}
                id="businessDescription"
                name="businessDescription"
                placeholder="Describe your business"
                className={`min-h-[100px] ${
                  errors.businessDescription && touched.businessDescription
                    ? "border-red-500"
                    : ""
                }`}
              />
              <ErrorMessage
                name="businessDescription"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">
                Business Registration Number*
              </Label>
              <Field
                as={Input}
                id="registrationNumber"
                name="registrationNumber"
                placeholder="Enter registration number"
                className={
                  errors.registrationNumber && touched.registrationNumber
                    ? "border-red-500"
                    : ""
                }
              />
              <ErrorMessage
                name="registrationNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type*</Label>
              <Select
                value={values.businessType}
                onValueChange={(value: string) =>
                  setFieldValue("businessType", value)
                }
              >
                <SelectTrigger
                  id="businessType"
                  className={
                    errors.businessType && touched.businessType
                      ? "border-red-500"
                      : ""
                  }
                >
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage
                name="businessType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Field
                as={Textarea}
                id="address"
                name="address"
                placeholder="Enter your address"
                className={
                  errors.address && touched.address ? "border-red-500" : ""
                }
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Field
                  as={Input}
                  id="city"
                  name="city"
                  className={
                    errors.city && touched.city ? "border-red-500" : ""
                  }
                  placeholder="Enter city"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Field
                  as={Input}
                  id="state"
                  name="state"
                  placeholder="Enter state"
                  className={
                    errors.state && touched.state ? "border-red-500" : ""
                  }
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={values.country}
                  onValueChange={(value: string) =>
                    setFieldValue("country", value)
                  }
                >
                  <SelectTrigger
                    id="country"
                    className={
                      errors.country && touched.country ? "border-red-500" : ""
                    }
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Field
                  as={Input}
                  id="pincode"
                  name="pincode"
                  placeholder="Enter pincode"
                  className={
                    errors.pincode && touched.pincode ? "border-red-500" : ""
                  }
                />
                <ErrorMessage
                  name="pincode"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Field
                as={Input}
                id="website"
                name="website"
                placeholder="Enter website URL"
                className={
                  errors.website && touched.website ? "border-red-500" : ""
                }
              />
              <ErrorMessage
                name="website"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        );
      case 3:
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Business Logo*</Label>
              <FileUploader
                value={values.businessLogo}
                onChange={(value) => setFieldValue("businessLogo", value)}
                accept="image/*"
                maxSize={2}
                helperText="Upload your business logo (Max: 2MB)"
                error={
                  errors.businessLogo && touched.businessLogo
                    ? errors.businessLogo
                    : ""
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Business License*</Label>
              <FileUploader
                id="business-logo-upload"
                value={values.businessDocuments[0] || ""}
                onChange={(value) => {
                  const newDocs = [...values.businessDocuments];
                  newDocs[0] = value;
                  setFieldValue("businessDocuments", newDocs);
                }}
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={5}
                helperText="Upload your business license (Max: 5MB)"
                error={
                  errors.businessDocuments && touched.businessDocuments
                    ? "Business license is required"
                    : ""
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Aadhaar Card*</Label>
              <FileUploader
                id="aadhaar-card-upload"
                value={values.ownerIdProof}
                onChange={(value) => setFieldValue("ownerIdProof", value)}
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={5}
                helperText="Upload your Aadhaar card (Max: 5MB)"
                error={
                  errors.ownerIdProof && touched.ownerIdProof
                    ? errors.ownerIdProof
                    : ""
                }
              />
            </div>

            <div className="space-y-2">
              <Label>GST Certificate (if applicable)</Label>
              <FileUploader
                id="gst-cert-upload"
                value={values.businessDocuments[1] || ""}
                onChange={(value) => {
                  const newDocs = [...values.businessDocuments];
                  newDocs[1] = value;
                  setFieldValue("businessDocuments", newDocs);
                }}
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={5}
                helperText="Upload your GST certificate (Max: 5MB)"
              />
            </div>

            <div className="space-y-2">
              <Label>PAN Card</Label>
              <FileUploader
                id="pan-card-upload"
                value={values.businessDocuments[2] || ""}
                onChange={(value) => {
                  const newDocs = [...values.businessDocuments];
                  newDocs[2] = value;
                  setFieldValue("businessDocuments", newDocs);
                }}
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={5}
                helperText="Upload your PAN card (Max: 5MB)"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Full Name:</span>
                  <p>{values.fullName}</p>
                </div>
                <div>
                  <span className="font-medium">Email:</span>
                  <p>{values.email}</p>
                </div>
                <div>
                  <span className="font-medium">Phone Number:</span>
                  <p>{values.phoneNumber}</p>
                </div>
                <div>
                  <span className="font-medium">Additional Contact:</span>
                  <p>{values.additionalContactNumber || "Not provided"}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Business Information</h3>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Business Name:</span>
                  <p>{values.businessName}</p>
                </div>
                <div>
                  <span className="font-medium">Business Type:</span>
                  <p>{values.businessType}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Business Description:</span>
                  <p>{values.businessDescription}</p>
                </div>
                <div>
                  <span className="font-medium">Registration Number:</span>
                  <p>{values.registrationNumber}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Location & Contact</h3>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <span className="font-medium">Address:</span>
                  <p>{values.address}</p>
                </div>
                <div>
                  <span className="font-medium">City:</span>
                  <p>{values.city}</p>
                </div>
                <div>
                  <span className="font-medium">State:</span>
                  <p>{values.state}</p>
                </div>
                <div>
                  <span className="font-medium">Country:</span>
                  <p>{values.country}</p>
                </div>
                <div>
                  <span className="font-medium">Pincode:</span>
                  <p>{values.pincode}</p>
                </div>
                <div>
                  <span className="font-medium">Website:</span>
                  <p>{values.website || "Not provided"}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Documents</h3>
              <div className="mt-2 space-y-2 text-sm">
                <p>
                  <span className="font-medium">Business Logo:</span>{" "}
                  {values.businessLogo ? "Uploaded" : "Not uploaded"}
                </p>
                <p>
                  <span className="font-medium">Business License:</span>{" "}
                  {values.businessDocuments[0] ? "Uploaded" : "Not uploaded"}
                </p>
                <p>
                  <span className="font-medium">Aadhaar Card:</span>{" "}
                  {values.ownerIdProof ? "Uploaded" : "Not uploaded"}
                </p>
                <p>
                  <span className="font-medium">GST Certificate:</span>{" "}
                  {values.businessDocuments[1] ? "Uploaded" : "Not uploaded"}
                </p>
                <p>
                  <span className="font-medium">PAN Card:</span>{" "}
                  {values.businessDocuments[2] ? "Uploaded" : "Not uploaded"}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:bg-amber-950 dark:border-amber-800">
              <p className="text-amber-800 dark:text-amber-300">
                By submitting this form, you confirm that all information
                provided is accurate and complete. Your profile will be reviewed
                by our admin team for verification.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading your profile information...</span>
        </div>
      ) : (
        <Formik
          initialValues={
           { ...vendor,
            fullName: vendor.fullName || '',
            email:vendor.email || '',
            phoneNumber:vendor?.phoneNumber ||''}
          }
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={steps[currentStep].validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {(formikProps) => (
            <Form className="space-y-8">
              <div className="flex items-center justify-between">
                <nav className="flex space-x-2">
                  {steps.map((step, index) => (
                    <button
                      type="button"
                      key={step.id}
                      onClick={() =>
                        index < currentStep && setCurrentStep(index)
                      }
                      disabled={index > currentStep}
                      className={cn(
                        "flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium",
                        index === currentStep
                          ? "bg-primary text-primary-foreground"
                          : index < currentStep
                          ? "text-primary hover:bg-muted"
                          : "text-muted-foreground"
                      )}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border">
                        {index < currentStep ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <span className="hidden md:inline">{step.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <Card>
                <CardContent className="pt-6">
                  {renderStepContent(formikProps)}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting || formikProps.isSubmitting}
                    className="gap-2"
                  >
                    {(isSubmitting || formikProps.isSubmitting) && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    Submit for Verification
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => handleNext(formikProps.values, formikProps)}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
