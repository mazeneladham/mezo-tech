/**
 * Text normalisation for search and filtering (works for Latin and Arabic).
 *
 *  - Unicode NFKC + lowercase
 *  - strips Latin accents and Arabic diacritics (harakat) and tatweel
 *  - unifies Arabic letter variants: أ إ آ ٱ -> ا, ى -> ي, ة -> ه, ؤ -> و, ئ -> ي
 *  - maps Arabic-Indic digits to ASCII digits
 */
export function normalizeText(input: string): string {
  return input
    .normalize('NFKC')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // Latin combining marks
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '') // Arabic diacritics + tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(input: string): string[] {
  const n = normalizeText(input);
  return n ? n.split(' ') : [];
}
