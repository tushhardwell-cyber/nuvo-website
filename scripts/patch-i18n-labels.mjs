// One-off patch: make composite aria-labels / alt texts translatable by building them from translated parts.
import fs from 'node:fs';

process.chdir('d:/nuvo website');
const ed = (p, pairs) => {
  let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) {
    if (!s.includes(a)) console.log('MISSING', p, a.slice(0, 60));
    s = s.split(a).join(b);
  }
  fs.writeFileSync(p, s);
};

ed('src/components/sections/UseCaseGrid.jsx', [
  ["import BrandMark from '../ui/BrandMark';", "import BrandMark from '../ui/BrandMark';\nimport { useLang } from '../../i18n/LangContext';"],
  ['export function UseCaseCard({ uc, i = 0 }) {\n  return (\n    <article className="uc2" tabIndex={0} aria-label={`${uc.title}: ${uc.body}`}>', 'export function UseCaseCard({ uc, i = 0 }) {\n  const { t } = useLang();\n  return (\n    <article className="uc2" tabIndex={0} aria-label={`${t(uc.title)}: ${t(uc.body)}`}>'],
]);
ed('src/components/sections/CardGame.jsx', [
  ["aria-label={flipped ? `${card.tag}: ${card.fix}` : `Problem: ${card.pain}. Flip to see the fix.`}", "aria-label={flipped ? `${t(card.tag)}: ${t(card.fix)}` : `${t('Problem:')} ${t(card.pain)}. ${t('Flip to see the fix.')}`}"],
]);
for (const f of ['ProjectCard', 'WorkCard']) {
  ed(`src/components/sections/${f}.jsx`, [
    ['label={`${item.client} — project video`}', "label={`${t(item.client)} — ${t('project video')}`}"],
    ['alt={`${item.client} — project visual`}', "alt={`${t(item.client)} — ${t('project visual')}`}"],
  ]);
}
ed('src/components/sections/PlanShowcase.jsx', [["aria-label={`${p.name} — plan ${p.number}`}", "aria-label={t(`${p.name} — plan ${p.number}`)}"]]);
