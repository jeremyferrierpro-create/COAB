import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"

function PagePlaceholder({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-coab-black font-sans">{title}</h1>
      <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-coab-blue-dark">{description}</CardTitle>
          <CardDescription>
            Ce module est en cours de développement (Phase ERP).
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center border-t border-coab-cream-light/50">
          <p className="text-coab-gray font-medium">Contenu à venir...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function AdminDashboard() {
  return <PagePlaceholder title="Tableau de bord" description="Vue globale de l'activité (KPIs, Alertes)" />
}

export function AdminCRM() {
  return <PagePlaceholder title="CRM / Utilisateurs" description="Gestion complète des dossiers Séniors, Juniors et Bénévoles" />
}

export function AdminOperations() {
  return <PagePlaceholder title="Opérations & Binômes" description="Matching hybride, gestion des cohabitations actives et suivis" />
}

export function AdminLegal() {
  return <PagePlaceholder title="Pôle Juridique" description="Génération des contrats loi ELAN, signatures électroniques, quittances" />
}

export function AdminFinances() {
  return <PagePlaceholder title="Pôle Finances" description="Revenus (Subventions, Dons), Dépenses, et flux financiers" />
}

export function AdminReports() {
  return <PagePlaceholder title="Rapports & Analytics" description="Statistiques globales, rapports d'impact 100% détaillés" />
}
