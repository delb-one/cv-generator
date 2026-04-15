'use client'

import { useState, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileDown, Eye, PencilLine } from 'lucide-react'
import { DatiPersonaliForm } from '@/components/cv-form/dati-personali-form'
import { EsperienzeForm } from '@/components/cv-form/esperienze-form'
import { IstruzioneForm } from '@/components/cv-form/istruzione-form'
import { LingueForm } from '@/components/cv-form/lingue-form'
import { CompetenzeForm } from '@/components/cv-form/competenze-form'
import { CertificazioniForm } from '@/components/cv-form/certificazioni-form'
import { EuropassPreview } from '@/components/cv-preview/europass-preview'
import { TemaPicker } from '@/components/cv-form/tema-picker'
import { usePdfExport } from '@/hooks/use-pdf-export'
import { defaultCVData, type CVData } from '@/lib/cv-types'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

const TABS = [
  { value: 'personali', label: 'Dati personali' },
  { value: 'esperienze', label: 'Esperienze' },
  { value: 'istruzione', label: 'Istruzione' },
  { value: 'lingue', label: 'Lingue' },
  { value: 'competenze', label: 'Competenze' },
  { value: 'altro', label: 'Altro' },
]

export default function Page() {
  const [cvData, setCvData] = useState<CVData>(defaultCVData)
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form')
  const previewRef = useRef<HTMLDivElement>(null)
  const { exportPdf, isExporting } = usePdfExport()

  const updateData = <K extends keyof CVData>(key: K, value: CVData[K]) => {
    setCvData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f4f6fb]">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-border shadow-sm z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center">
            {['#003399', '#FFD700', '#003399'].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: '#003399' }}>
            Generatore CV Europass
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TemaPicker
            temaId={cvData.temaId}
            onChange={(id) => updateData('temaId', id)}
          />
          <Button
            onClick={() => exportPdf(cvData)}
            disabled={isExporting}
            className="gap-2 text-white"
            style={{ backgroundColor: '#003399' }}
          >
            {isExporting ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            {isExporting ? 'Esportazione...' : 'Esporta PDF'}
          </Button>
        </div>
      </header>

      {/* Mobile toggle */}
      <div className="flex lg:hidden border-b border-border bg-white flex-shrink-0">
        <button
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors',
            mobileTab === 'form'
              ? 'text-[#003399] border-b-2 border-[#003399]'
              : 'text-muted-foreground'
          )}
          onClick={() => setMobileTab('form')}
        >
          <PencilLine className="h-4 w-4" />
          Modifica
        </button>
        <button
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors',
            mobileTab === 'preview'
              ? 'text-[#003399] border-b-2 border-[#003399]'
              : 'text-muted-foreground'
          )}
          onClick={() => setMobileTab('preview')}
        >
          <Eye className="h-4 w-4" />
          Anteprima
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form panel */}
        <div
          className={cn(
            'w-full lg:w-[440px] xl:w-[500px] flex-shrink-0 bg-white border-r border-border flex flex-col overflow-hidden',
            mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
          )}
        >
          <Tabs defaultValue="personali" className="flex flex-col flex-1 overflow-hidden">
            <div className="border-b border-border px-4 py-2 flex-shrink-0">
              <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs px-3 py-1.5 rounded-md data-[state=active]:bg-[#003399] data-[state=active]:text-white"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-5">
                  <TabsContent value="personali" className="mt-0">
                    <SectionHeader
                      title="Dati personali"
                      description="Inserisci le tue informazioni di contatto e anagrafiche."
                    />
                    <DatiPersonaliForm
                      data={cvData.datiPersonali}
                      onChange={(val) => updateData('datiPersonali', val)}
                    />
                  </TabsContent>

                  <TabsContent value="esperienze" className="mt-0">
                    <SectionHeader
                      title="Esperienze lavorative"
                      description="Aggiungi le tue esperienze professionali in ordine cronologico inverso."
                    />
                    <EsperienzeForm
                      data={cvData.esperienze}
                      onChange={(val) => updateData('esperienze', val)}
                    />
                  </TabsContent>

                  <TabsContent value="istruzione" className="mt-0">
                    <SectionHeader
                      title="Istruzione e formazione"
                      description="Titoli di studio e percorsi formativi conseguiti."
                    />
                    <IstruzioneForm
                      data={cvData.istruzione}
                      onChange={(val) => updateData('istruzione', val)}
                    />
                  </TabsContent>

                  <TabsContent value="lingue" className="mt-0">
                    <SectionHeader
                      title="Lingue"
                      description="Indica la tua lingua madre e le lingue straniere con i livelli QCER."
                    />
                    <LingueForm
                      linguaMadre={cvData.linguaMadre}
                      altrelingue={cvData.altrelingue}
                      onLinguaMadreChange={(val) => updateData('linguaMadre', val)}
                      onAltrelingueChange={(val) => updateData('altrelingue', val)}
                    />
                  </TabsContent>

                  <TabsContent value="competenze" className="mt-0">
                    <SectionHeader
                      title="Competenze"
                      description="Competenze informatiche e personali."
                    />
                    <CompetenzeForm
                      competenzeDigitali={cvData.competenzeDigitali}
                      competenzePersonali={cvData.competenzePersonali}
                      onDigitaliChange={(val) => updateData('competenzeDigitali', val)}
                      onPersonaliChange={(val) => updateData('competenzePersonali', val)}
                    />
                  </TabsContent>

                  <TabsContent value="altro" className="mt-0">
                    <SectionHeader
                      title="Altro"
                      description="Profilo professionale, certificazioni, patente di guida e hobby."
                    />
                    <CertificazioniForm
                      certificazioni={cvData.certificazioni}
                      patente={cvData.patente}
                      hobby={cvData.hobby}
                      profiloProfessionale={cvData.profiloProfessionale}
                      firma={cvData.firma}
                      onCertificazioniChange={(val) => updateData('certificazioni', val)}
                      onPatenteChange={(val) => updateData('patente', val)}
                      onHobbyChange={(val) => updateData('hobby', val)}
                      onProfiloChange={(val) => updateData('profiloProfessionale', val)}
                      onFirmaChange={(val) => updateData('firma', val)}
                    />
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </Tabs>
        </div>

        {/* Preview panel */}
        <div
          className={cn(
            'flex-1 overflow-auto p-6',
            mobileTab === 'form' ? 'hidden lg:block' : 'block'
          )}
        >
          <div className="flex justify-center min-h-full">
            <div className="w-full max-w-[210mm]">
              <EuropassPreview ref={previewRef} data={cvData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
    </div>
  )
}
