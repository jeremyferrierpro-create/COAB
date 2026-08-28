import { z } from "zod"

// --- Schémas communs partagés ---

const addressSchema = z.object({
  address: z.string().min(5, "L'adresse est requise"),
  zipCode: z.string().regex(/^[0-9]{5}$/, "Le code postal doit contenir 5 chiffres"),
  city: z.string().min(2, "La ville est requise"),
})

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro de téléphone invalide"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
  birthPlace: z.string().min(2, "Le lieu de naissance est requis"),
  nationality: z.string().min(2, "La nationalité est requise"),
}).merge(addressSchema)

const lifestyleSchema = z.object({
  hobbies: z.preprocess(
    (val) => {
      if (typeof val === "string") return val.split(",").map((s) => s.trim()).filter(Boolean)
      return val
    },
    z.array(z.string()).min(1, "Veuillez préciser au moins un centre d'intérêt")
  ),
  lifestyle: z.string().min(1, "Veuillez préciser votre rythme de vie (Lève-tôt, Couche-tard, etc.)"),
})

// --- Schéma Sénior ---

export const seniorFormSchema = personalInfoSchema.merge(lifestyleSchema).extend({
  housingType: z.enum(["Maison", "Appartement"], {
    required_error: "Veuillez sélectionner le type de logement",
  }),
  roomSurface: z.coerce.number().min(9, "La chambre doit faire au moins 9m²"),
  hasPets: z.boolean().default(false),
  accessibilityLevel: z.enum(["Plain-pied", "Ascenseur", "Escaliers"], {
    required_error: "Veuillez préciser l'accessibilité",
  }),
  expectedPresence: z.string().min(10, "Veuillez décrire vos attentes (Soirs, Week-end, etc.)"),
  preferredProfile: z.enum(["Etudiant", "Jeune Actif", "Pas de préférence"], {
    required_error: "Veuillez sélectionner un profil recherché",
  }),
  acceptCharte: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la charte Cohabilis" }),
  }),
})

export type SeniorFormValues = z.infer<typeof seniorFormSchema>

// --- Schéma Junior ---

export const juniorFormSchema = personalInfoSchema.merge(lifestyleSchema).extend({
  situation: z.enum(["Etudiant", "Alternant", "Jeune Actif", "Service Civique"], {
    required_error: "Veuillez préciser votre situation",
  }),
  targetCities: z.array(z.string()).min(1, "Veuillez sélectionner au moins une ville cible"),
  maxBudget: z.coerce.number().min(50, "Le budget doit être supérieur à 50€"),
  moveInDate: z.string().min(1, "La date d'emménagement est requise"),
  acceptCharte: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la charte Cohabilis" }),
  }),
})

export type JuniorFormValues = z.infer<typeof juniorFormSchema>
