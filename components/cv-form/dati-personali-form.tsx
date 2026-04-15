'use client'

import { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserCircle, Upload, X } from 'lucide-react'
import type { DatiPersonali } from '@/lib/cv-types'

interface Props {
  data: DatiPersonali
  onChange: (data: DatiPersonali) => void
}

export function DatiPersonaliForm({ data, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const update = (field: keyof DatiPersonali, value: string | null) => {
    onChange({ ...data, [field]: value })
  }

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      update('foto', ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-5">
      {/* Foto profilo */}
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 border-2 border-border">
          {data.foto ? (
            <AvatarImage src={data.foto} alt="Foto profilo" />
          ) : (
            <AvatarFallback className="bg-muted">
              <UserCircle className="h-10 w-10 text-muted-foreground" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Carica foto
          </Button>
          {data.foto && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => update('foto', null)}
            >
              <X className="h-4 w-4 mr-2" />
              Rimuovi
            </Button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFotoUpload}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="nome">Nome *</Label>
          <Input
            id="nome"
            placeholder="Mario"
            value={data.nome}
            onChange={(e) => update('nome', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cognome">Cognome *</Label>
          <Input
            id="cognome"
            placeholder="Rossi"
            value={data.cognome}
            onChange={(e) => update('cognome', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dataNascita">Data di nascita</Label>
          <Input
            id="dataNascita"
            type="date"
            value={data.dataNascita}
            onChange={(e) => update('dataNascita', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="luogoNascita">Luogo di nascita</Label>
          <Input
            id="luogoNascita"
            placeholder="Roma"
            value={data.luogoNascita}
            onChange={(e) => update('luogoNascita', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="nazionalita">Nazionalità</Label>
          <Input
            id="nazionalita"
            placeholder="Italiana"
            value={data.nazionalita}
            onChange={(e) => update('nazionalita', e.target.value)}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="indirizzo">Indirizzo</Label>
          <Input
            id="indirizzo"
            placeholder="Via Roma 1, 00100 Roma"
            value={data.indirizzo}
            onChange={(e) => update('indirizzo', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="telefono">Telefono</Label>
          <Input
            id="telefono"
            placeholder="+39 333 1234567"
            value={data.telefono}
            onChange={(e) => update('telefono', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="mario.rossi@email.it"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/mariorossi"
            value={data.linkedin}
            onChange={(e) => update('linkedin', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sitoWeb">Sito web</Label>
          <Input
            id="sitoWeb"
            placeholder="www.mariorossi.it"
            value={data.sitoWeb}
            onChange={(e) => update('sitoWeb', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
