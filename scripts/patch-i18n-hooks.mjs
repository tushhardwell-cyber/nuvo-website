import fs from 'node:fs';

process.chdir('d:/nuvo website');
const add = (p, importAfter, fnLine, depth = '../../') => {
  let s = fs.readFileSync(p, 'utf8');
  const imp = `import { useLang } from '${depth}i18n/LangContext';`;
  if (!s.includes(imp)) s = s.replace(importAfter, importAfter + '\n' + imp);
  if (!s.includes(fnLine + '\n  const { t } = useLang();')) s = s.replace(fnLine, fnLine + '\n  const { t } = useLang();');
  fs.writeFileSync(p, s);
};

add('src/components/sections/CardGame.jsx', "import { useMedia } from '../../hooks/useMedia';", 'function Card({ card, flipped, onFlip, style, i, mid, fan }) {');
add('src/components/sections/ProjectCard.jsx', "import Button from '../ui/Button';", 'export default function ProjectCard({ item, flip = false }) {');
add('src/components/sections/WorkCard.jsx', "import Video from '../ui/Video';", 'export default function WorkCard({ item, onOpen, large = false }) {');
add('src/components/sections/PlanShowcase.jsx', "import { useReducedMotion } from '../../hooks/useMedia';", "export default function PlanShowcase({ num = '01' }) {");
