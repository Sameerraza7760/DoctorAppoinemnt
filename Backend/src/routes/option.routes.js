import { Router } from "express";

const router = Router();

const specialtiesList = [
  "Primary Care",
  "Internal Medicine",
  "Cardiology",
  "Dermatology",
  "Orthopedics",
];

const daysOfWeek = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

router.get("/", (req, res) => {
  const metadata = {
    specialties: specialtiesList,
    daysOfWeek: daysOfWeek,
  };
  res.json(metadata);
});

export default router;
