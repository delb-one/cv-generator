'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { PlusCircle, Trash2, Award, PenLine, ShieldCheck } from 'lucide-react'
import type { Certificazione, CategoriaPatente, FirmaData } from '@/lib/cv-types'
import { GDPR_DEFAULT_TEXT } from '@/lib/cv-types'
import { nanoid } from 'nanoid'
import { Separator } from '@/components/ui/separator'

const CATEGORIE_PATENTE: CategoriaPatente[] = ['AM', 'A1', 'A2', 'A', 'B1', 'B', 'BE', 'C1', 'C', 'D1', 'D']

interface Props {
  certificazioni: Certificazione[]
  patente: CategoriaPatente[]
  hobby: string
  profiloProfessionale: string
  firma: FirmaData
  onCertificazioniChange: (data: Certificazione[]) => void
  onPatenteChange: (data: CategoriaPatente[]) => void
  onHobbyChange: (val: string) => void
  onProfiloChange: (val: string) => void
  onFirmaChange: (data: FirmaData) => void
}

export function CertificazioniForm({
  certificazioni,
  patente,
  hobby,
  profiloProfessionale,
  firma,
  onCertificazioniChange,
  onPatenteChange,
  onHobbyChange,
  onProfiloChange,
  onFirmaChange,
}: Props) {
  const addCert = () => {
    onCertificazioniChange([
      ...certificazioni,
      { id: nanoid(), nome: '', ente: '', anno: '' },
    ])
  }

  const removeCert = (id: string) => onCertificazioniChange(certificazioni.filter((c) => c.id !== id))

  const updateCert = (id: string, field: keyof Certificazione, value: string) => {
    onCertificazioniChange(certificazioni.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  const togglePatente = (cat: CategoriaPatente) => {
    if (patente.includes(cat)) {
      onPatenteChange(patente.filter((p) => p !== cat))
    } else {
      onPatenteChange([...patente, cat])
    }
  }

  return (
    <div className="space-y-6">
      {/* Profilo professionale */}
      <div className="space-y-1.5">
        <Label htmlFor="profilo">Profilo professionale</Label>
        <Textarea
          id="profilo"
          placeholder="Breve sommario delle tue competenze e obiettivi professionali..."
          value={profiloProfessionale}
          rows={4}
          onChange={(e) => onProfiloChange(e.target.value)}
        />
      </div>

      <Separator />

      {/* Certificazioni */}
      <div>
        <p className="text-sm font-medium mb-3">Certificazioni e corsi</p>
        {certificazioni.length === 0 && (
          <div className="flex flex-col items-center justify-center py-4 text-muted-foreground text-sm gap-2">
            <Award className="h-7 w-7" />
            <p>Nessuna certificazione aggiunta.</p>
          </div>
        )}
        <div className="space-y-4">
          {certificazioni.map((cert, idx) => (
            <div key={cert.id}>
              {idx > 0 && <Separator className="mb-4" />}
              <div className="flex items-end gap-2">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs">Nome certificazione</Label>
                    <Input
                      placeholder="Cisco CCNA"
                      value={cert.nome}
                      onChange={(e) => updateCert(cert.id, 'nome', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Ente rilasciante</Label>
                    <Input
                      placeholder="Cisco"
                      value={cert.ente}
                      onChange={(e) => updateCert(cert.id, 'ente', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Anno</Label>
                    <Input
                      placeholder="2023"
                      value={cert.anno}
                      onChange={(e) => updateCert(cert.id, 'anno', e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removeCert(cert.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addCert} className="w-full mt-3">
          <PlusCircle className="h-4 w-4 mr-2" />
          Aggiungi voce
        </Button>
      </div>

      <Separator />

      {/* Patente */}
      <div className="space-y-3">
        <Label>Patente di guida</Label>
        <div className="flex flex-wrap gap-3">
          {CATEGORIE_PATENTE.map((cat) => (
            <div key={cat} className="flex items-center gap-1.5">
              <Checkbox
                id={`patente-${cat}`}
                checked={patente.includes(cat)}
                onCheckedChange={() => togglePatente(cat)}
              />
              <label htmlFor={`patente-${cat}`} className="text-sm font-medium cursor-pointer">
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Hobby */}
      <div className="space-y-1.5">
        <Label htmlFor="hobby">Hobby e interessi</Label>
        <Textarea
          id="hobby"
          placeholder="Fotografia, trekking, musica, lettura..."
          value={hobby}
          rows={3}
          onChange={(e) => onHobbyChange(e.target.value)}
        />
      </div>

      <Separator />

      {/* Firma e data */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <PenLine className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Firma e data</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firma-luogo">Luogo</Label>
            <Input
              id="firma-luogo"
              placeholder="Roma"
              value={firma.luogo}
              onChange={(e) => onFirmaChange({ ...firma, luogo: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="firma-data">Data</Label>
            <Input
              id="firma-data"
              type="date"
              value={firma.data}
              onChange={(e) => onFirmaChange({ ...firma, data: e.target.value })}
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          La sezione firma apparira in fondo al CV con una riga tratteggiata per la firma autografa.
        </p>
      </div>

      <Separator />

      {/* GDPR */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Trattamento dati personali (GDPR)</p>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="gdpr-switch"
            checked={firma.includiGDPR}
            onCheckedChange={(checked) => onFirmaChange({ ...firma, includiGDPR: checked })}
          />
          <Label htmlFor="gdpr-switch" className="text-sm cursor-pointer">
            Includi clausola di consenso al trattamento dei dati
          </Label>
        </div>
        {firma.includiGDPR && (
          <div className="space-y-1.5">
            <Label htmlFor="gdpr-testo" className="text-xs text-muted-foreground">
              Testo della clausola (modificabile)
            </Label>
            <Textarea
              id="gdpr-testo"
              rows={4}
              value={firma.testoGDPR}
              onChange={(e) => onFirmaChange({ ...firma, testoGDPR: e.target.value })}
            />
            <button
              type="button"
              className="text-xs text-blue-600 hover:underline"
              onClick={() => onFirmaChange({ ...firma, testoGDPR: GDPR_DEFAULT_TEXT })}
            >
              Ripristina testo predefinito
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
