import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Patient } from "./models/patient.models.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// app.use(
//   session({
//     secret: "26472163912fhslbvs1288",
//     resave: false,CD3  XZAqa2cdzsa
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback", // Corrected callbackURL path
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // Strategy callback implementation
//       console.log(profile); // Log the Google profile for debugging
//       try {
//         let user = await Patient.findOne({ googleId: profile.id });
//         if (!user) {
//           user = new Patient({
//             googleId: profile.id,
//             fullName: profile.displayName,
//             email: profile.emails[0].value,
//             maritalStatus: "121212",
//             phoneNumber: 12121212121212,
//             gender: "male",
//             password: "1212312312",address:"12121212"

//             // Ensure you adjust or validate other profile data as needed
//           });
//           await user.save();
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// app.get(
//   "auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.send("Authentication successful!");
//   }
// );

/// we used express  session because when we login we google or other service its generate the new id when when we decode this id we get the userInformation

import userRouter from "./routes/user.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import patientRouter from "./routes/patient.routes.js";
import appoinmentRouter from "./routes/appoinment.routes.js";
import optionRouter from "./routes/option.routes.js";
import conversationRouter from "./routes/messege.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);

app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/appointment", appoinmentRouter);
app.use("/api/v1/metadata", optionRouter);
app.use("/api/v1/message", conversationRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
