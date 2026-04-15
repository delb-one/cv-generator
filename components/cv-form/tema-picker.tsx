'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Palette, Check } from 'lucide-react'
import { CV_THEMES, type CVTheme } from '@/lib/cv-types'
import { cn } from '@/lib/utils'

interface Props {
  temaId: string
  onChange: (id: string) => void
}

export function TemaPicker({ temaId, onChange }: Props) {
  const current = CV_THEMES.find((t) => t.id === temaId) ?? CV_THEMES[0]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-9"
          aria-label="Scegli tema colori"
        >
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/30 flex-shrink-0"
            style={{ backgroundColor: current.sidebar }}
          />
          <Palette className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="hidden sm:inline text-xs">{current.nome}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
          Tema colori
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {CV_THEMES.map((theme: CVTheme) => {
            const isActive = theme.id === temaId
            return (
              <button
                key={theme.id}
                onClick={() => onChange(theme.id)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs transition-colors',
                  'hover:bg-muted border',
                  isActive
                    ? 'border-foreground/30 bg-muted font-medium'
                    : 'border-transparent'
                )}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0 border border-black/10"
                  style={{ backgroundColor: theme.sidebar }}
                />
                <span className="flex-1 leading-tight">{theme.nome}</span>
                {isActive && <Check className="h-3 w-3 flex-shrink-0 text-foreground" />}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
