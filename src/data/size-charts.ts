import type { SizeChart } from './products'

export interface SizeChartTable {
  title: string
  unit: string
  columns: string[]
  rows: string[][]
  howToMeasure: string[]
}

/** Garment measurements in inches. Replace with your production specs. */
export const sizeCharts: Record<SizeChart, SizeChartTable> = {
  'mens-tops': {
    title: 'Tops — Men & Unisex',
    unit: 'inches',
    columns: ['Size', 'Chest', 'Length', 'Shoulder'],
    rows: [
      ['S', '40', '27', '19.5'],
      ['M', '42', '28', '20.5'],
      ['L', '44', '29', '21.5'],
      ['XL', '46', '30', '22.5'],
      ['XXL', '48', '31', '23.5'],
    ],
    howToMeasure: [
      'Chest: measure straight across, armpit to armpit, and double it.',
      'Length: from the highest point of the shoulder to the hem.',
    ],
  },
  'womens-tops': {
    title: 'Tops — Women',
    unit: 'inches',
    columns: ['Size', 'Bust', 'Length', 'Shoulder'],
    rows: [
      ['XS', '32', '19', '14'],
      ['S', '34', '20', '14.5'],
      ['M', '36', '21', '15'],
      ['L', '38', '22', '15.5'],
      ['XL', '40', '23', '16'],
    ],
    howToMeasure: [
      'Bust: measure around the fullest part of your bust.',
      'Length: from the highest point of the shoulder to the hem.',
    ],
  },
  'mens-bottoms': {
    title: 'Bottoms — Men',
    unit: 'inches',
    columns: ['Size', 'Waist', 'Hip', 'Inseam'],
    rows: [
      ['28', '28', '38', '30'],
      ['30', '30', '40', '30.5'],
      ['32', '32', '42', '31'],
      ['34', '34', '44', '31.5'],
      ['36', '36', '46', '32'],
    ],
    howToMeasure: [
      'Waist: measure around your natural waistline.',
      'Inseam: from the crotch seam to the bottom of the leg.',
    ],
  },
  'womens-bottoms': {
    title: 'Bottoms — Women',
    unit: 'inches',
    columns: ['Size', 'Waist', 'Hip', 'Inseam'],
    rows: [
      ['24', '24', '34', '29'],
      ['26', '26', '36', '29.5'],
      ['28', '28', '38', '30'],
      ['30', '30', '40', '30.5'],
      ['32', '32', '42', '31'],
    ],
    howToMeasure: [
      'Waist: measure around your natural waistline.',
      'Hip: measure around the fullest part of your hips.',
    ],
  },
}
