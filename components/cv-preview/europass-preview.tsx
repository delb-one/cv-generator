'use client'

import { forwardRef } from 'react'
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react'
import type { CVData, CVTheme, LivelloCEFR, LivelloSkill } from '@/lib/cv-types'
import { CV_THEMES } from '@/lib/cv-types'

interface Props {
  data: CVData
}

function buildCefrColors(theme: CVTheme): Record<string, string> {
  return {
    A1: '#d1e7ff',
    A2: '#a8cfff',
    B1: '#6aabf7',
    B2: '#3380d8',
    C1: theme.cefrDark,
    C2: theme.sidebar,
  }
}

function CefrCell({ level, theme }: { level: LivelloCEFR; theme: CVTheme }) {
  const colors = buildCefrColors(theme)
  return (
    <td
      style={{
        backgroundColor: colors[level] || '#e9ecef',
        color: ['C1', 'C2', 'B2'].includes(level) ? '#fff' : '#1a1a2e',
        textAlign: 'center',
        padding: '3px 6px',
        fontSize: '10px',
        fontWeight: 600,
        border: '1px solid #cdd2e0',
        width: '14%',
      }}
    >
      {level}
    </td>
  )
}

function SkillBadge({ livello, theme }: { livello: LivelloSkill; theme: CVTheme }) {
  const colors: Record<LivelloSkill, { bg: string; text: string }> = {
    Base: { bg: theme.accentLight, text: theme.accent },
    Intermedio: { bg: theme.accentLight, text: theme.accent },
    Avanzato: { bg: theme.accent, text: '#ffffff' },
  }
  const c = colors[livello]
  return (
    <span
      style={{
        display: 'inline-block',
        backgroundColor: c.bg,
        color: c.text,
        padding: '1px 7px',
        borderRadius: '3px',
        fontSize: '9px',
        fontWeight: 600,
      }}
    >
      {livello}
    </span>
  )
}

function SectionTitle({ children, theme }: { children: React.ReactNode; theme: CVTheme }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h2
        style={{
          fontSize: '13px',
          fontWeight: 700,
          color: theme.accent,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderBottom: `2px solid ${theme.accent}`,
          paddingBottom: '3px',
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  )
}

export const EuropassPreview = forwardRef<HTMLDivElement, Props>(function EuropassPreview({ data }, ref) {
  const { datiPersonali: dp } = data
  const theme = CV_THEMES.find((t) => t.id === data.temaId) ?? CV_THEMES[0]

  const fullName = [dp.nome, dp.cognome].filter(Boolean).join(' ')

  return (
    <div
      ref={ref}
      id="cv-preview"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: "'Inter', 'Open Sans', Arial, sans-serif",
        fontSize: '11px',
        lineHeight: 1.5,
        color: '#1a1a2e',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
      }}
    >
      {/* ── LEFT SIDEBAR ── */}
      <div
        style={{
          width: '66mm',
          backgroundColor: theme.sidebar,
          color: '#fff',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          flexShrink: 0,
        }}
      >
        {/* Photo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid rgba(255,255,255,0.5)',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {dp.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dp.foto}
                alt="Foto profilo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            )}
          </div>
          {fullName && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '15px', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{fullName}</p>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, margin: '0 0 4px 0', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '3px' }}>
            Contatti
          </p>
          {dp.indirizzo && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
              <MapPin size={10} style={{ flexShrink: 0, marginTop: '1px', opacity: 0.8 }} />
              <span style={{ fontSize: '9.5px', opacity: 0.9, lineHeight: 1.4 }}>{dp.indirizzo}</span>
            </div>
          )}
          {dp.telefono && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Phone size={10} style={{ flexShrink: 0, opacity: 0.8 }} />
              <span style={{ fontSize: '9.5px', opacity: 0.9 }}>{dp.telefono}</span>
            </div>
          )}
          {dp.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Mail size={10} style={{ flexShrink: 0, opacity: 0.8 }} />
              <span style={{ fontSize: '9.5px', opacity: 0.9, wordBreak: 'break-all' }}>{dp.email}</span>
            </div>
          )}
          {dp.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Linkedin size={10} style={{ flexShrink: 0, opacity: 0.8 }} />
              <span style={{ fontSize: '9.5px', opacity: 0.9, wordBreak: 'break-all' }}>{dp.linkedin}</span>
            </div>
          )}
          {dp.sitoWeb && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Globe size={10} style={{ flexShrink: 0, opacity: 0.8 }} />
              <span style={{ fontSize: '9.5px', opacity: 0.9, wordBreak: 'break-all' }}>{dp.sitoWeb}</span>
            </div>
          )}
        </div>

        {/* Info anagrafiche */}
        {(dp.dataNascita || dp.luogoNascita || dp.nazionalita) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, margin: '0 0 4px 0', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '3px' }}>
              Informazioni
            </p>
            {dp.dataNascita && (
              <div>
                <span style={{ fontSize: '8.5px', opacity: 0.65 }}>Data di nascita</span>
                <p style={{ fontSize: '9.5px', margin: '0', fontWeight: 500 }}>{dp.dataNascita}</p>
              </div>
            )}
            {dp.luogoNascita && (
              <div>
                <span style={{ fontSize: '8.5px', opacity: 0.65 }}>Luogo di nascita</span>
                <p style={{ fontSize: '9.5px', margin: '0', fontWeight: 500 }}>{dp.luogoNascita}</p>
              </div>
            )}
            {dp.nazionalita && (
              <div>
                <span style={{ fontSize: '8.5px', opacity: 0.65 }}>Nazionalità</span>
                <p style={{ fontSize: '9.5px', margin: '0', fontWeight: 500 }}>{dp.nazionalita}</p>
              </div>
            )}
          </div>
        )}

        {/* Lingue */}
        {(data.linguaMadre || data.altrelingue.length > 0) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, margin: '0 0 4px 0', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '3px' }}>
              Lingue
            </p>
            {data.linguaMadre && (
              <div>
                <span style={{ fontSize: '8.5px', opacity: 0.65 }}>Lingua madre</span>
                <p style={{ fontSize: '10px', margin: '0', fontWeight: 600 }}>{data.linguaMadre}</p>
              </div>
            )}
            {data.altrelingue.map((l) => (
              <div key={l.id}>
                <p style={{ fontSize: '9.5px', fontWeight: 600, margin: '0 0 2px 0' }}>{l.lingua}</p>
              </div>
            ))}
          </div>
        )}

        {/* Competenze digitali - sidebar */}
        {data.competenzeDigitali.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, margin: '0 0 4px 0', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '3px' }}>
              Competenze digitali
            </p>
            {data.competenzeDigitali.map((c) => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '9.5px', opacity: 0.9 }}>{c.nome}</span>
                <SkillBadge livello={c.livello} theme={theme} />
              </div>
            ))}
          </div>
        )}

        {/* Patente */}
        {data.patente.length > 0 && (
          <div>
            <p style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, margin: '0 0 6px 0', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '3px' }}>
              Patente
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
              {data.patente.map((p) => (
                <span
                  key={p}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    padding: '1px 6px',
                    borderRadius: '3px',
                    fontSize: '9px',
                    fontWeight: 600,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT MAIN AREA ── */}
      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '18px', minWidth: 0 }}>
        {/* Europass header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '-8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                display: 'flex',
                gap: '2px',
                alignItems: 'center',
              }}
            >
              {[theme.sidebar, '#FFD700', theme.sidebar].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: theme.accent,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Europass
            </span>
            <span style={{ fontSize: '10px', color: '#666', fontStyle: 'italic' }}>Curriculum Vitae</span>
          </div>
        </div>

        {/* Profilo professionale */}
        {data.profiloProfessionale && (
          <div>
            <SectionTitle theme={theme}>Profilo professionale</SectionTitle>
            <p style={{ margin: 0, fontSize: '10.5px', lineHeight: 1.6, color: '#333' }}>
              {data.profiloProfessionale}
            </p>
          </div>
        )}

        {/* Esperienze lavorative */}
        {data.esperienze.length > 0 && (
          <div>
            <SectionTitle theme={theme}>Esperienza professionale</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.esperienze.map((esp) => (
                <div key={esp.id} style={{ display: 'flex', gap: '12px' }}>
                  {/* Date column */}
                  <div
                    style={{
                      width: '70px',
                      flexShrink: 0,
                      fontSize: '9.5px',
                      color: '#555',
                      textAlign: 'right',
                      paddingTop: '1px',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: theme.accent }}>
                      {esp.dataInizio}
                    </span>
                    {(esp.dataFine || esp.inCorso) && (
                      <>
                        <br />
                        <span>→</span>
                        <br />
                        <span style={{ fontWeight: 600, color: theme.accent }}>
                          {esp.inCorso ? 'In corso' : esp.dataFine}
                        </span>
                      </>
                    )}
                  </div>
                  {/* Vertical line */}
                  <div style={{ width: '1px', backgroundColor: theme.timelineLine, flexShrink: 0 }} />
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 1px 0', fontWeight: 700, fontSize: '11px' }}>{esp.ruolo}</p>
                    <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: theme.accent, fontWeight: 600 }}>
                      {[esp.azienda, esp.citta].filter(Boolean).join(' – ')}
                    </p>
                    {esp.descrizione && (
                      <p style={{ margin: 0, fontSize: '10px', color: '#444', lineHeight: 1.5 }}>
                        {esp.descrizione}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Istruzione */}
        {data.istruzione.length > 0 && (
          <div>
            <SectionTitle theme={theme}>Istruzione e formazione</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.istruzione.map((ist) => (
                <div key={ist.id} style={{ display: 'flex', gap: '12px' }}>
                  <div
                    style={{
                      width: '70px',
                      flexShrink: 0,
                      fontSize: '9.5px',
                      color: '#555',
                      textAlign: 'right',
                      paddingTop: '1px',
                    }}
                  >
                    {ist.annoInizio && (
                      <span style={{ fontWeight: 600, color: theme.accent }}>{ist.annoInizio}</span>
                    )}
                    {ist.annoFine && (
                      <>
                        <br /><span>→</span><br />
                        <span style={{ fontWeight: 600, color: theme.accent }}>{ist.annoFine}</span>
                      </>
                    )}
                  </div>
                  <div style={{ width: '1px', backgroundColor: theme.timelineLine, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 1px 0', fontWeight: 700, fontSize: '11px' }}>{ist.titolo}</p>
                    <p style={{ margin: '0 0 2px 0', fontSize: '10px', color: theme.accent, fontWeight: 600 }}>
                      {[ist.istituto, ist.citta].filter(Boolean).join(' – ')}
                    </p>
                    {ist.voto && (
                      <p style={{ margin: 0, fontSize: '10px', color: '#555' }}>Voto: {ist.voto}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lingue - griglia CEFR */}
        {data.altrelingue.length > 0 && (
          <div>
            <SectionTitle theme={theme}>Lingue straniere</SectionTitle>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '4px 6px', fontSize: '9px', color: '#555', fontWeight: 600, backgroundColor: theme.accentLight, border: '1px solid #cdd2e0', width: '20%' }}>
                    Lingua
                  </th>
                  <th colSpan={2} style={{ textAlign: 'center', padding: '4px 6px', fontSize: '9px', color: '#555', fontWeight: 600, backgroundColor: theme.accentLight, border: '1px solid #cdd2e0' }}>
                    Comprensione
                  </th>
                  <th colSpan={2} style={{ textAlign: 'center', padding: '4px 6px', fontSize: '9px', color: '#555', fontWeight: 600, backgroundColor: theme.accentLight, border: '1px solid #cdd2e0' }}>
                    Parlato
                  </th>
                  <th style={{ textAlign: 'center', padding: '4px 6px', fontSize: '9px', color: '#555', fontWeight: 600, backgroundColor: theme.accentLight, border: '1px solid #cdd2e0' }}>
                    Scritto
                  </th>
                </tr>
                <tr>
                  <th style={{ padding: '2px 6px', fontSize: '8px', color: '#777', border: '1px solid #cdd2e0', backgroundColor: '#f8faff' }}></th>
                  <th style={{ padding: '2px 6px', fontSize: '8px', color: '#777', border: '1px solid #cdd2e0', backgroundColor: '#f8faff', textAlign: 'center' }}>Ascolto</th>
                  <th style={{ padding: '2px 6px', fontSize: '8px', color: '#777', border: '1px solid #cdd2e0', backgroundColor: '#f8faff', textAlign: 'center' }}>Lettura</th>
                  <th style={{ padding: '2px 6px', fontSize: '8px', color: '#777', border: '1px solid #cdd2e0', backgroundColor: '#f8faff', textAlign: 'center' }}>Interazione</th>
                  <th style={{ padding: '2px 6px', fontSize: '8px', color: '#777', border: '1px solid #cdd2e0', backgroundColor: '#f8faff', textAlign: 'center' }}>Produzione orale</th>
                  <th style={{ padding: '2px 6px', fontSize: '8px', color: '#777', border: '1px solid #cdd2e0', backgroundColor: '#f8faff', textAlign: 'center' }}>Scrittura</th>
                </tr>
              </thead>
              <tbody>
                {data.altrelingue.map((l) => (
                  <tr key={l.id}>
                    <td style={{ padding: '4px 6px', fontWeight: 600, border: '1px solid #cdd2e0', backgroundColor: '#fafbff', fontSize: '10px' }}>
                      {l.lingua}
                    </td>
                    <CefrCell level={l.ascolto} theme={theme} />
                    <CefrCell level={l.lettura} theme={theme} />
                    <CefrCell level={l.interazione} theme={theme} />
                    <CefrCell level={l.produzione} theme={theme} />
                    <CefrCell level={l.scrittura} theme={theme} />
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: '8px', color: '#888', marginTop: '3px' }}>
              Livelli: A1/A2 – Elementare · B1/B2 – Intermedio · C1/C2 – Avanzato (Quadro comune europeo di riferimento per le lingue)
            </p>
          </div>
        )}

        {/* Competenze personali */}
        {data.competenzePersonali && (
          <div>
            <SectionTitle theme={theme}>Competenze personali</SectionTitle>
            <p style={{ margin: 0, fontSize: '10.5px', lineHeight: 1.6, color: '#333' }}>
              {data.competenzePersonali}
            </p>
          </div>
        )}

        {/* Certificazioni */}
        {data.certificazioni.length > 0 && (
          <div>
            <SectionTitle theme={theme}>Certificazioni e corsi</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {data.certificazioni.map((cert) => (
                <div key={cert.id} style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  {cert.anno && (
                    <span style={{ fontSize: '9.5px', color: EUROPASS_BLUE, fontWeight: 600, flexShrink: 0, width: '35px' }}>
                      {cert.anno}
                    </span>
                  )}
                  <span style={{ fontSize: '10.5px', fontWeight: 600 }}>{cert.nome}</span>
                  {cert.ente && (
                    <span style={{ fontSize: '10px', color: '#555' }}>– {cert.ente}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobby */}
        {data.hobby && (
          <div>
            <SectionTitle theme={theme}>Hobby e interessi</SectionTitle>
            <p style={{ margin: 0, fontSize: '10.5px', lineHeight: 1.6, color: '#333' }}>{data.hobby}</p>
          </div>
        )}

        {/* GDPR */}
        {data.firma.includiGDPR && data.firma.testoGDPR && (
          <div
            style={{
              borderTop: '1px solid #d0d8e8',
              paddingTop: '12px',
              marginTop: '4px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '8.5px',
                color: '#555',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              {data.firma.testoGDPR}
            </p>
          </div>
        )}

        {/* Firma e data */}
        {(data.firma.luogo || data.firma.data) && (
          <div style={{ marginTop: '20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '24px',
              }}
            >
              {/* Luogo e data */}
              <div style={{ minWidth: '140px' }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#777', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Luogo e data
                </p>
                <p style={{ margin: 0, fontSize: '10.5px', fontWeight: 500 }}>
                  {[data.firma.luogo, data.firma.data
                    ? new Date(data.firma.data).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    : ''].filter(Boolean).join(', ')}
                </p>
              </div>

              {/* Firma */}
              <div style={{ flex: 1, maxWidth: '200px' }}>
                <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#777', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Firma
                </p>
                <div
                  style={{
                    borderBottom: '1px dashed #aaa',
                    height: '28px',
                    width: '100%',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
