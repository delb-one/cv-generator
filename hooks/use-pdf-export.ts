'use client'

import { useState, useCallback } from 'react'
import type { CVData } from '@/lib/cv-types'

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false)

  const exportPdf = useCallback(async (data: CVData) => {
    setIsExporting(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      const element = document.getElementById('cv-preview')
      if (!element) throw new Error('CV preview element not found')

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.98)

      // A4 dimensions in mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / (imgWidth / 3.7795), pdfHeight / (imgHeight / 3.7795))

      const scaledW = (imgWidth / 3.7795) * ratio
      const scaledH = (imgHeight / 3.7795) * ratio

      const x = (pdfWidth - scaledW) / 2
      const y = 0

      // If content exceeds one page, add more pages
      if (scaledH <= pdfHeight) {
        pdf.addImage(imgData, 'JPEG', x, y, scaledW, scaledH)
      } else {
        // Multi-page support
        const pageCount = Math.ceil(scaledH / pdfHeight)
        for (let i = 0; i < pageCount; i++) {
          if (i > 0) pdf.addPage()
          pdf.addImage(imgData, 'JPEG', x, -i * pdfHeight, scaledW, scaledH)
        }
      }

      const cognome = data.datiPersonali.cognome || 'Cognome'
      const nome = data.datiPersonali.nome || 'Nome'
      pdf.save(`CV_Europass_${cognome}_${nome}.pdf`)
    } catch (err) {
      console.error('[v0] PDF export error:', err)
      alert('Errore durante l\'esportazione del PDF. Riprova.')
    } finally {
      setIsExporting(false)
    }
  }, [])

  return { exportPdf, isExporting }
}
