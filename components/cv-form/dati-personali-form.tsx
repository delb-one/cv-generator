'use client'

import { useRef, useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserCircle, Upload, X, Move } from 'lucide-react'
import type { DatiPersonali } from '@/lib/cv-types'

interface Props {
  data: DatiPersonali
  onChange: (data: DatiPersonali) => void
}

export function DatiPersonaliForm({ data, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragContainerRef = useRef<HTMLDivElement>(null)

  const update = (field: keyof DatiPersonali, value: string | number | null) => {
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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!data.foto) return
    e.preventDefault()
    setIsDragging(true)

    const startX = e.clientX
    const startY = e.clientY
    const startOffsetX = data.fotoOffsetX
    const startOffsetY = data.fotoOffsetY

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY
      
      // Calculate new offsets (clamped between -50 and 50)
      const newOffsetX = Math.max(-50, Math.min(50, startOffsetX + deltaX * 0.5))
      const newOffsetY = Math.max(-50, Math.min(50, startOffsetY + deltaY * 0.5))
      
      update('fotoOffsetX', newOffsetX)
      update('fotoOffsetY', newOffsetY)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [data.foto, data.fotoOffsetX, data.fotoOffsetY])

  const handleResetPosition = useCallback(() => {
    update('fotoOffsetX', 0)
    update('fotoOffsetY', 0)
  }, [])

  return (
    <div className="space-y-5">
      {/* Foto profilo */}
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-2">
          <div 
            ref={dragContainerRef}
            className="relative h-20 w-20 border-2 border-border rounded-full overflow-hidden cursor-move active:cursor-grabbing hover:ring-2 hover:ring-primary/50 transition-all"
            onMouseDown={handleMouseDown}
            style={{ cursor: data.foto ? 'grab' : 'default' }}
          >
            {data.foto ? (
              <img 
                src={data.foto} 
                alt="Foto profilo"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: `${50 + data.fotoOffsetX}% ${50 + data.fotoOffsetY}%`,
                }}
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <UserCircle className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            {data.foto && isDragging && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <Move className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
          {(data.fotoOffsetX !== 0 || data.fotoOffsetY !== 0) && data.foto && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={handleResetPosition}
            >
              <X className="h-3 w-3 mr-1" />
              Reset pos.
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
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
          {data.foto && (
            <p className="text-xs text-muted-foreground">
              💡 Clicca e trascina sulla foto per centrarla
            </p>
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
          <Label htmlFor="linkedin">Linkedin</Label>
          <Input
            id="linkedin"
            placeholder="https://www.linkedin.com/in/mariorossi"
            value={data.linkedin}
            onChange={(e) => update('linkedin', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="github">Github</Label>
          <Input
            id="github"
            placeholder="https://github.com/mariorossi"
            value={data.github}
            onChange={(e) => update('github', e.target.value)}
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
