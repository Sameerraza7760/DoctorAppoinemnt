export interface Message {
  message: string;
  patientId: string | undefined;
  doctorId?: string;
  senderId: string | undefined;
  timestamp: string;
}

//   sender: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: {
//       enum: ["Doctor", "Patient"],
//     },
//     required: true,
//   },
//   receiver: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: {
