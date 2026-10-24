import { useState } from 'react'
import { Ruler } from 'lucide-react'
import { Modal } from './Modal'
import { sizeCharts } from '@/data/size-charts'
import type { SizeChart } from '@/data/products'

export function SizeGuideButton({ chart }: { chart: SizeChart }) {
  const [open, setOpen] = useState(false)
  const table = sizeCharts[chart]
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 text-xs underline underline-offset-4 hover:text-ash">
        <Ruler className="size-3.5" aria-hidden="true" /> Size guide
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Size guide" className="!w-[min(100vw-1.5rem,36rem)]">
        <div className="px-5 pb-8 pt-4 md:px-8">
          <p className="eyebrow mb-4 text-ash">{table.title}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">{table.title} garment measurements in {table.unit}</caption>
              <thead>
                <tr className="border-b border-ink">
                  {table.columns.map((c) => (
                    <th key={c} scope="col" className="py-3 pr-4 font-semibold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-ink/10">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="py-3 pr-4 font-semibold">{cell}</th>
                      ) : (
                        <td key={i} className="py-3 pr-4 tabular-nums text-charcoal">{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ash">Garment measurements in {table.unit}. Allow ±0.5″ tolerance.</p>
          <div className="mt-6 bg-bone p-4 text-sm">
            <p className="mb-2 font-semibold">How to measure</p>
            <ul className="list-disc space-y-1 pl-5 text-charcoal">
              {table.howToMeasure.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  )
}
