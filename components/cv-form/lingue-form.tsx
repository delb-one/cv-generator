'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusCircle, Trash2, Languages } from 'lucide-react'
import type { Lingua, LivelloCEFR } from '@/lib/cv-types'
import { nanoid } from 'nanoid'
import { Separator } from '@/components/ui/separator'

const LIVELLI_CEFR: LivelloCEFR[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

interface Props {
  linguaMadre: string
  altrelingue: Lingua[]
  onLinguaMadreChange: (val: string) => void
  onAltrelingueChange: (data: Lingua[]) => void
}

export function LingueForm({ linguaMadre, altrelingue, onLinguaMadreChange, onAltrelingueChange }: Props) {
  const add = () => {
    onAltrelingueChange([
      ...altrelingue,
      {
        id: nanoid(),
        lingua: '',
        ascolto: 'A1',
        lettura: 'A1',
        interazione: 'A1',
        produzione: 'A1',
        scrittura: 'A1',
      },
    ])
  }

  const remove = (id: string) => onAltrelingueChange(altrelingue.filter((l) => l.id !== id))

  const update = (id: string, field: keyof Lingua, value: string) => {
    onAltrelingueChange(altrelingue.map((l) => (l.id === id ? { ...l, [field]: value } : l)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="linguaMadre">Lingua madre</Label>
        <Input
          id="linguaMadre"
          placeholder="Italiano"
          value={linguaMadre}
          onChange={(e) => onLinguaMadreChange(e.target.value)}
        />
      </div>

      <Separator />

      <p className="text-sm font-medium">Altre lingue</p>

      {altrelingue.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 text-muted-foreground text-sm gap-2">
          <Languages className="h-8 w-8" />
          <p>Nessuna lingua aggiunta.</p>
        </div>
      )}

      {altrelingue.map((lingua, idx) => (
        <div key={lingua.id} className="space-y-4">
          {idx > 0 && <Separator />}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Lingua {idx + 1}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => remove(lingua.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Rimuovi
            </Button>
          </div>
          <div className="space-y-1.5">
            <Label>Nome lingua</Label>
            <Input
              placeholder="Inglese"
              value={lingua.lingua}
              onChange={(e) => update(lingua.id, 'lingua', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(
              [
                { field: 'ascolto', label: 'Ascolto' },
                { field: 'lettura', label: 'Lettura' },
                { field: 'interazione', label: 'Interazione' },
                { field: 'produzione', label: 'Produzione orale' },
                { field: 'scrittura', label: 'Scrittura' },
              ] as const
            ).map(({ field, label }) => (
              <div key={field} className="space-y-1.5">
                <Label className="text-xs">{label}</Label>
                <Select
                  value={lingua[field]}
                  onValueChange={(val) => update(lingua.id, field, val)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LIVELLI_CEFR.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={add} className="w-full">
        <PlusCircle className="h-4 w-4 mr-2" />
        Aggiungi voce
      </Button>
    </div>
  )
}
