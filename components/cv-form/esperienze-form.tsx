'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { PlusCircle, Trash2, Briefcase } from 'lucide-react'
import type { EsperienzaLavorativa } from '@/lib/cv-types'
import { nanoid } from 'nanoid'
import { Separator } from '@/components/ui/separator'

interface Props {
  data: EsperienzaLavorativa[]
  onChange: (data: EsperienzaLavorativa[]) => void
}

export function EsperienzeForm({ data, onChange }: Props) {
  const add = () => {
    onChange([
      ...data,
      {
        id: nanoid(),
        ruolo: '',
        azienda: '',
        citta: '',
        dataInizio: '',
        dataFine: '',
        inCorso: false,
        descrizione: '',
      },
    ])
  }

  const remove = (id: string) => {
    onChange(data.filter((e) => e.id !== id))
  }

  const update = (id: string, field: keyof EsperienzaLavorativa, value: string | boolean) => {
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  return (
    <div className="space-y-6">
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground text-sm gap-2">
          <Briefcase className="h-8 w-8" />
          <p>Nessuna esperienza aggiunta. Clicca su &quot;Aggiungi voce&quot; per iniziare.</p>
        </div>
      )}
      {data.map((esp, idx) => (
        <div key={esp.id} className="space-y-4">
          {idx > 0 && <Separator />}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Esperienza {idx + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => remove(esp.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Rimuovi
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Ruolo / Posizione</Label>
              <Input
                placeholder="Sviluppatore Frontend"
                value={esp.ruolo}
                onChange={(e) => update(esp.id, 'ruolo', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Azienda</Label>
              <Input
                placeholder="Acme S.r.l."
                value={esp.azienda}
                onChange={(e) => update(esp.id, 'azienda', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Città</Label>
              <Input
                placeholder="Milano"
                value={esp.citta}
                onChange={(e) => update(esp.id, 'citta', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Data inizio</Label>
              <Input
                placeholder="MM/AAAA"
                value={esp.dataInizio}
                onChange={(e) => update(esp.id, 'dataInizio', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Data fine</Label>
              <Input
                placeholder="MM/AAAA"
                value={esp.dataFine}
                disabled={esp.inCorso}
                onChange={(e) => update(esp.id, 'dataFine', e.target.value)}
              />
              <div className="flex items-center gap-2 mt-1">
                <Checkbox
                  id={`inCorso-${esp.id}`}
                  checked={esp.inCorso}
                  onCheckedChange={(checked) => update(esp.id, 'inCorso', !!checked)}
                />
                <label htmlFor={`inCorso-${esp.id}`} className="text-sm cursor-pointer">
                  In corso
                </label>
              </div>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Descrizione attività</Label>
              <Textarea
                placeholder="Descrivi le principali attività e responsabilità..."
                value={esp.descrizione}
                rows={3}
                onChange={(e) => update(esp.id, 'descrizione', e.target.value)}
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
