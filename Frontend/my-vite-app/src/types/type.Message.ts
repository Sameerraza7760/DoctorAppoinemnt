export interface Message {

  content: string;
  senderId: string | undefined;
  receiverId: string;
  senderType: string;
  receiverType: string;
  
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
