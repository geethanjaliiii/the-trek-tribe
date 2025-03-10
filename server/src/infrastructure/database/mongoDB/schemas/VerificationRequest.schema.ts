import { Schema } from "mongoose";
import { IVerificationRequestModel } from "../../models/verificationRequest.model";

export const VerificationRequestSchema =new Schema<IVerificationRequestModel>({
    vendorId:{type: Schema.Types.ObjectId, ref:'Vendor',required: true},
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      },
      applyCount:{
        type:Number,
        default:0,
      },
      rejectReason:{
        type:String
      },
      submittedAt:{
        type:Date,
        default:Date.now
      },
      updatedAt:{
        type:Date,
        default:Date.now
      }
})