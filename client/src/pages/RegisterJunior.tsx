import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { juniorFormSchema, type JuniorFormValues } from "../lib/validations"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import { Select } from "../components/ui/Select"
import { Checkbox } from "../components/ui/Checkbox"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import toast from "react-hot-toast"

export default function RegisterJunior() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JuniorFormValues>({
    resolver: zodResolver(juniorFormSchema) as any,
  })

  const onSubmit = async (data: JuniorFormValues) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/register-junior`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (res.ok) {
        toast.success("Candidature envoyée avec succès ! Vous pouvez maintenant vous connecter.");
        navigate('/login');
      } else {
        toast.error(resData.error || "Une erreur est survenue lors de l'inscription.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue.");
    }
  }

  return (
    <div className="min-h-screen bg-coab-cream p-4 md:p-8 lg:p-12 font-serif">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link to="/" className="inline-flex items-center text-coab-blue hover:text-coab-blue-dark font-sans font-semibold transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" /> Retour à l'accueil
        </Link>
        
        <Card className="bg-white border-coab-green/20 shadow-lg">
          <CardHeader className="bg-coab-green/5 rounded-t-3xl pb-8">
            <CardTitle className="text-3xl font-extrabold text-coab-green-dark">Chercher une chambre</CardTitle>
            <CardDescription className="text-lg text-coab-black-light">
              Logez-vous de manière abordable en tenant compagnie à un sénior.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-sans">
              
              {/* Informations personnelles */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-coab-black border-b border-coab-cream-light pb-2">Informations Personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" {...register("firstName")} error={errors.firstName?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" {...register("lastName")} error={errors.lastName?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date de naissance</Label>
                    <Input id="birthDate" type="date" {...register("birthDate")} error={errors.birthDate?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" {...register("phone")} error={errors.phone?.message} placeholder="06 12 34 56 78" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} error={errors.email?.message} />
                  </div>
                </div>
              </div>

              {/* Adresse actuelle */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-coab-black border-b border-coab-cream-light pb-2">Adresse actuelle</h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse complète</Label>
                  <Input id="address" {...register("address")} error={errors.address?.message} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Code Postal</Label>
                    <Input id="zipCode" {...register("zipCode")} error={errors.zipCode?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" {...register("city")} error={errors.city?.message} />
                  </div>
                </div>
              </div>

              {/* La Recherche */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-coab-black border-b border-coab-cream-light pb-2">Votre Recherche</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="situation">Situation actuelle</Label>
                    <Select id="situation" {...register("situation")} error={errors.situation?.message} options={[
                      {value: "Etudiant", label: "Étudiant"},
                      {value: "Alternant", label: "Alternant"},
                      {value: "Jeune Actif", label: "Jeune Actif"},
                      {value: "Service Civique", label: "Service Civique"}
                    ]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetCities">Villes ciblées (séparées par virgules)</Label>
                    <Input id="targetCities" {...register("targetCities")} error={errors.targetCities?.message as string} placeholder="Foix, Pamiers, Tarascon..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxBudget">Budget Mensuel Max (€)</Label>
                    <Input id="maxBudget" type="number" {...register("maxBudget")} error={errors.maxBudget?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="moveInDate">Date d'emménagement souhaitée</Label>
                    <Input id="moveInDate" type="date" {...register("moveInDate")} error={errors.moveInDate?.message} />
                  </div>
                </div>
              </div>

              {/* Affinités */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-coab-black border-b border-coab-cream-light pb-2">Affinités (Pour le Matching)</h3>
                <div className="space-y-2">
                  <Label htmlFor="hobbies">Vos centres d'intérêts (séparés par des virgules)</Label>
                  <Input id="hobbies" {...register("hobbies")} error={errors.hobbies?.message as string} placeholder="Jeux vidéos, Sport, Cinéma..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lifestyle">Rythme de vie</Label>
                  <Select id="lifestyle" {...register("lifestyle")} error={errors.lifestyle?.message} options={[{value: "Lève-tôt", label: "Lève-tôt"}, {value: "Couche-tard", label: "Couche-tard"}, {value: "Flexible", label: "Flexible"}]} />
                </div>
              </div>

              {/* Charte */}
              <div className="bg-coab-cream-light p-6 rounded-2xl space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="acceptCharte" {...register("acceptCharte")} error={errors.acceptCharte?.message} className="mt-1" />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="acceptCharte">J'accepte la Politique de Confidentialité et le traitement de mes données de profilage (Habitudes de vie) à des fins de matching (RGPD).</Label>
                    <p className="text-sm text-coab-gray">Vos données de profilage sont sécurisées et strictement limitées à la recherche d'une personne compatible.</p>
                  </div>
                </div>
              </div>

              <Button type="submit" variant="junior" size="lg" className="w-full text-lg h-14" isLoading={isSubmitting}>
                Soumettre ma candidature
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
