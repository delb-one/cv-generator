'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PlusCircle, Trash2, GraduationCap } from 'lucide-react'
import type { Istruzione } from '@/lib/cv-types'
import { nanoid } from 'nanoid'
import { Separator } from '@/components/ui/separator'

interface Props {
  data: Istruzione[]
  onChange: (data: Istruzione[]) => void
}

export function IstruzioneForm({ data, onChange }: Props) {
  const add = () => {
    onChange([
      ...data,
      {
        id: nanoid(),
        titolo: '',
        istituto: '',
        citta: '',
        annoInizio: '',
        annoFine: '',
        voto: '',
      },
    ])
  }

  const remove = (id: string) => onChange(data.filter((e) => e.id !== id))

  const update = (id: string, field: keyof Istruzione, value: string) => {
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground text-sm gap-2">
          <GraduationCap className="h-8 w-8" />
          <p>Nessun titolo aggiunto. Clicca su &quot;Aggiungi voce&quot; per iniziare.</p>
        </div>
      )}
      {data.map((ist, idx) => (
        <div key={ist.id} className="space-y-4">
          {idx > 0 && <Separator />}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Titolo {idx + 1}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => remove(ist.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Rimuovi
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Titolo di studio</Label>
              <Input
                placeholder="Laurea Magistrale in Informatica"
                value={ist.titolo}
                onChange={(e) => update(ist.id, 'titolo', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Istituto</Label>
              <Input
                placeholder="Università La Sapienza"
                value={ist.istituto}
                onChange={(e) => update(ist.id, 'istituto', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Città</Label>
              <Input
                placeholder="Roma"
                value={ist.citta}
                onChange={(e) => update(ist.id, 'citta', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Anno inizio</Label>
              <Input
                placeholder="2018"
                value={ist.annoInizio}
                onChange={(e) => update(ist.id, 'annoInizio', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Anno fine</Label>
              <Input
                placeholder="2021"
                value={ist.annoFine}
                onChange={(e) => update(ist.id, 'annoFine', e.target.value)}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Voto / Descrizione</Label>
              <Input
                placeholder="110/110 con lode"
                value={ist.voto}
                onChange={(e) => update(ist.id, 'voto', e.target.value)}
              />
            </div>
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
