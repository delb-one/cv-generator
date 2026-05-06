"use client";

import { useState, useCallback } from "react";
import type { CVData } from "@/lib/cv-types";

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false);

  // Fix unsupported CSS color functions in cloned document
  const fixUnsupportedColors = useCallback((clonedDoc: Document) => {
    const allElements = clonedDoc.querySelectorAll<HTMLElement>("*");

    allElements.forEach((el) => {
      const style = el.style;
      const computedStyle = window.getComputedStyle(el);

      // Color-related CSS properties to check
      const colorProps = [
        "color",
        "background-color",
        "border-color",
        "border-top-color",
        "border-right-color",
        "border-bottom-color",
        "border-left-color",
        "outline-color",
        "text-decoration-color",
        "column-rule-color",
        "fill",
        "stroke",
        "stop-color",
        "flood-color",
        "lighting-color",
      ];

      colorProps.forEach((prop) => {
        const value = computedStyle.getPropertyValue(prop);
        // Detect unsupported CSS color functions
        if (
          value &&
          (value.includes("oklch(") ||
            value.includes("oklab(") ||
            value.includes("lab(") ||
            value.includes("lch("))
        ) {
          // Use canvas to convert to RGB
          try {
            const canvas = document.createElement("canvas");
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.fillStyle = value;
              ctx.fillRect(0, 0, 1, 1);
              const data = ctx.getImageData(0, 0, 1, 1).data;
              style.setProperty(
                prop,
                `rgb(${data[0]}, ${data[1]}, ${data[2]})`,
              );
            }
          } catch {
            console.warn("[PDF Export] Failed to convert color:", value);
          }
        }
      });
    });
  }, []);

  const exportPdf = useCallback(
    async (data: CVData) => {
      setIsExporting(true);
      try {
        const html2canvas = (await import("html2canvas")).default;
        const { jsPDF } = await import("jspdf");

        const element = document.getElementById("cv-preview");
        if (!element) {
          throw new Error(
            "Elemento CV preview non trovato. Assicurati che l'anteprima sia visibile.",
          );
        }

        // Check if element is visible
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          throw new Error(
            "L'anteprima del CV non è visibile. Per favore, mostra l'anteprima prima di esportare.",
          );
        }

        console.log(
          "[PDF Export] Capturing element with dimensions:",
          rect.width,
          "x",
          rect.height,
        );

        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          onclone: (clonedDoc) => {
            console.log(
              "[PDF Export] Fixing unsupported colors and styles in cloned document...",
            );
            fixUnsupportedColors(clonedDoc);

            // Ensure the element in the clone doesn't have box-shadow or weird margins
            // and has a fixed width to ensure correct capture
            const clonedElement = clonedDoc.getElementById("cv-preview");
            if (clonedElement) {
              clonedElement.style.boxShadow = "none";
              clonedElement.style.margin = "0";
              clonedElement.style.width = "210mm";
            }
          },
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.98);

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Standard conversion: 1mm = 3.7795275591 px (at 96 DPI)
        const PX_TO_MM = 3.7795275591;
        const elementWidthMm = element.offsetWidth / PX_TO_MM;
        const elementHeightMm = element.offsetHeight / PX_TO_MM;

        // For a CV, we ALWAYS scale to fit the width of the A4 (210mm)
        // This ensures the content fills the page horizontally regardless of how long it is
        const scale = pdfWidth / elementWidthMm;

        const scaledW = pdfWidth; // This is elementWidthMm * scale
        const scaledH = elementHeightMm * scale;

        const x = 0; // Always start from the left
        const y = 0;

        // Multi-page support
        if (scaledH <= pdfHeight + 1) { // +1 for small rounding errors
          pdf.addImage(imgData, "JPEG", x, y, scaledW, scaledH);
        } else {
          const pageCount = Math.ceil(scaledH / pdfHeight);
          for (let i = 0; i < pageCount; i++) {
            if (i > 0) pdf.addPage();
            // We use the full scaledH and negative offset to show the correct portion for each page
            pdf.addImage(imgData, "JPEG", x, -i * pdfHeight, scaledW, scaledH);
          }
        }

        const cognome = data.datiPersonali.cognome || "Cognome";
        const nome = data.datiPersonali.nome || "Nome";
        pdf.save(`CV_Europass_${cognome}_${nome}.pdf`);
      } catch (err) {
        console.error("PDF export error:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Errore sconosciuto";
        alert(`Errore durante l'esportazione del PDF: ${errorMessage}`);
      } finally {
        setIsExporting(false);
      }
    },
    [fixUnsupportedColors],
  );

  return { exportPdf, isExporting };
}
