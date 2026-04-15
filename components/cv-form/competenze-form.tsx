'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusCircle, Trash2, Monitor } from 'lucide-react'
import type { CompetenzaDigitale, LivelloSkill } from '@/lib/cv-types'
import { nanoid } from 'nanoid'
import { Separator } from '@/components/ui/separator'

const LIVELLI: LivelloSkill[] = ['Base', 'Intermedio', 'Avanzato']

interface Props {
  competenzeDigitali: CompetenzaDigitale[]
  competenzePersonali: string
  onDigitaliChange: (data: CompetenzaDigitale[]) => void
  onPersonaliChange: (val: string) => void
}

export function CompetenzeForm({
  competenzeDigitali,
  competenzePersonali,
  onDigitaliChange,
  onPersonaliChange,
}: Props) {
  const add = () => {
    onDigitaliChange([...competenzeDigitali, { id: nanoid(), nome: '', livello: 'Base' }])
  }

  const remove = (id: string) => onDigitaliChange(competenzeDigitali.filter((c) => c.id !== id))

  const update = (id: string, field: keyof CompetenzaDigitale, value: string) => {
    onDigitaliChange(competenzeDigitali.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-3">Competenze digitali</p>
        {competenzeDigitali.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground text-sm gap-2">
            <Monitor className="h-8 w-8" />
            <p>Nessuna competenza aggiunta.</p>
          </div>
        )}
        <div className="space-y-3">
          {competenzeDigitali.map((comp, idx) => (
            <div key={comp.id}>
              {idx > 0 && <Separator className="mb-3" />}
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-1.5">
                  <Label className="text-xs">Software / Skill</Label>
                  <Input
                    placeholder="Microsoft Office"
                    value={comp.nome}
                    onChange={(e) => update(comp.id, 'nome', e.target.value)}
                  />
                </div>
                <div className="w-36 space-y-1.5">
                  <Label className="text-xs">Livello</Label>
                  <Select
                    value={comp.livello}
                    onValueChange={(val) => update(comp.id, 'livello', val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LIVELLI.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive mb-0"
                  onClick={() => remove(comp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={add} className="w-full mt-3">
          <PlusCircle className="h-4 w-4 mr-2" />
          Aggiungi voce
        </Button>
      </div>

      <Separator />

      <div className="space-y-1.5">
        <Label htmlFor="competenzePersonali">Competenze personali</Label>
        <Textarea
          id="competenzePersonali"
          placeholder="Es. Leadership, lavoro di squadra, problem solving, comunicazione efficace..."
          value={competenzePersonali}
          rows={4}
          onChange={(e) => onPersonaliChange(e.target.value)}
        />
      </div>
    </div>
  )
}
