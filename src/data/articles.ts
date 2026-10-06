import type {ImageSourcePropType} from 'react-native';

import {articleImages} from './assets';

export type Article = {
  id: string;
  title: string;
  summary: string;
  body: string[];
  image: ImageSourcePropType;
};

export const ARTICLES: Article[] = [
  {
    id: 'how-your-chimney-works',
    title: 'How Your Chimney Works',
    summary:
      'Learn how draft, flue design, and airflow move smoke safely out of your home while keeping your fire burning cleanly.',
    body: [
      'A chimney is more than a decorative opening above your fireplace — it is an engineered path that relies on temperature difference to create draft. Warm air from the fire rises through the flue, pulling smoke and combustion gases upward and outdoors.',
      'When the flue is clear, the right size, and warm enough, smoke leaves the room efficiently. Blockages, cold spots, or poor proportions can reverse that flow and push smoke back into your living space. Understanding this basics helps you spot problems early and keep every fire safer.',
    ],
    image: articleImages.howYourChimneyWorks,
  },
  {
    id: 'types-of-chimney-soot',
    title: 'Types Of Chimney Soot',
    summary:
      'Understanding soot types helps identify buildup risk, combustion quality, and when professional cleaning is essential.',
    body: [
      'Chimney soot comes in several distinct forms, each signaling a different condition inside your flue. Light, powdery black soot is the most common variety and typically indicates fairly complete combustion. It brushes away easily during routine cleaning and poses a low immediate risk. However, its presence still calls for regular removal, as accumulation over time can restrict airflow and reduce draft efficiency.',
      'Sticky, tar-like buildup — often called creosote — is a far more serious concern and develops when wood burns at low temperatures or when unseasoned wood is used. Creosote bonds tightly to flue tile and masonry, making it extremely difficult to remove without professional equipment. In its dense, glazed form, creosote is highly combustible and a leading cause of chimney fires. If you observe shiny, dark deposits that resist brushing, stop using the fireplace and arrange a professional inspection immediately.',
    ],
    image: articleImages.typesOfChimneySoot,
  },
  {
    id: 'what-black-smoke-means',
    title: 'What Black Smoke Means',
    summary:
      'Black smoke often signals incomplete combustion, wet wood, or restricted airflow — and it deserves a closer look.',
    body: [
      'Thin wisps of light smoke are common when a fire first starts. Persistent black smoke, however, usually means fuel is not burning cleanly. Wet or unseasoned wood, a closed damper, or a choked flue can all produce heavy, dark exhaust.',
      'If black smoke continues after the fire is established, open the damper fully, check that your wood is properly seasoned, and verify that nothing is blocking the flue. Ongoing black smoke is a cue to pause and inspect before lighting another fire.',
    ],
    image: articleImages.whatBlackSmokeMeans,
  },
  {
    id: 'weak-chimney-draft',
    title: 'Weak Chimney Draft',
    summary:
      'Poor draft can fill a room with smoke. Learn the common causes and simple checks before your next fire.',
    body: [
      'Draft is the upward pull that carries smoke out of the chimney. Cold flues, competing home ventilation, or partial blockages can weaken that pull and leave smoke lingering indoors.',
      'Before lighting, open a nearby window slightly, warm the flue with a rolled newspaper if needed, and confirm the damper is fully open. Persistent weak draft may point to a taller flue issue that needs a professional evaluation.',
    ],
    image: articleImages.weakChimneyDraft,
  },
  {
    id: 'when-to-clean-your-chimney',
    title: 'When To Clean Your Chimney',
    summary:
      'Regular cleaning prevents creosote buildup and keeps draft strong through every burning season.',
    body: [
      'Most chimneys benefit from an annual inspection and cleaning, ideally before the heavy burning season begins. Homes that burn frequently, use softwoods, or show heavy soot may need cleaning more often.',
      'Schedule a cleaning when you notice reduced draft, visible creosote flakes, or a strong smoky odor even when the fireplace is cold. A clear flue is one of the simplest ways to reduce chimney fire risk.',
    ],
    image: articleImages.whenToCleanYourChimney,
  },
  {
    id: 'chimney-cracks-and-damage',
    title: 'Chimney Cracks And Damage',
    summary:
      'Cracks in masonry or flue tiles can leak smoke and heat. Know what to watch for and when to call for repair.',
    body: [
      'Thermal stress, weather, and age can crack chimney crowns, mortar joints, and flue liners. Even small openings can let moisture in and combustion gases escape into wall cavities.',
      'Look for spalling brick, white mineral stains, loose mortar, or rusted dampers. Any crack that reaches the flue liner should be inspected by a qualified chimney professional before the next fire.',
    ],
    image: articleImages.chimneyCracksAndDamage,
  },
  {
    id: 'carbon-monoxide-basics',
    title: 'Carbon Monoxide Basics',
    summary:
      'Carbon monoxide is invisible and odorless. Pair good draft with working detectors for safer fires.',
    body: [
      'Carbon monoxide forms whenever fuel burns incompletely. A blocked or poorly drafting chimney can allow this gas to enter living spaces without warning.',
      'Install CO detectors on every floor, keep them tested, and never ignore headaches, nausea, or unusual furnace or fireplace odors. Fresh air, a clear flue, and working alarms are essential layered defenses.',
    ],
    image: articleImages.carbonMonoxideBasics,
  },
  {
    id: 'when-to-call-a-specialist',
    title: 'When To Call A Specialist',
    summary:
      'Some chimney issues need trained eyes and tools. Know the red flags that mean stop and call a pro.',
    body: [
      'Call a chimney specialist for glazed creosote, damaged liners, persistent smoke spillage, animal nests, or after any chimney fire — even a small one.',
      'DIY sweeping can help with light powdery soot, but structural repairs, camera inspections, and heavy creosote removal belong with certified professionals.',
    ],
    image: articleImages.whenToCallASpecialist,
  },
  {
    id: 'how-to-start-a-fire',
    title: 'How To Start A Fire',
    summary:
      'A clean start sets draft, reduces smoke, and helps your fire burn hotter and cleaner from the first minutes.',
    body: [
      'Open the damper fully, place dry kindling in a loose stack, and light from the top or with a reliable starter. Give the flue a moment to warm so draft strengthens before adding larger logs.',
      'Avoid overloading the grate early. Build heat gradually with seasoned hardwood once a bright coal bed is established.',
    ],
    image: articleImages.howToStartAFire,
  },
  {
    id: 'safe-fireplace-ash-removal',
    title: 'Safe Fireplace Ash Removal',
    summary:
      'Hot ashes can smolder for days. Handle them carefully to protect your home and keep the hearth ready.',
    body: [
      'Leave a thin ash bed for insulation, but remove excess ash once it is fully cold — often 48 hours or more after the last fire. Use a metal shovel and a metal ash container with a tight lid.',
      'Never place ash containers on wood decks or near combustibles. Store them outdoors until disposal, and keep ashes away from trash that can catch fire from hidden embers.',
    ],
    image: articleImages.safeFireplaceAshRemoval,
  },
  {
    id: 'choosing-the-right-firewood',
    title: 'Choosing The Right Firewood',
    summary:
      'Dry, dense hardwood burns hotter and cleaner. Wet wood fuels creosote and weak fires.',
    body: [
      'Seasoned hardwood such as oak, maple, or ash typically needs six to twelve months of drying. Split wood dries faster and lights more readily than whole rounds.',
      'Avoid burning trash, treated lumber, or wood that feels heavy with moisture. Good firewood sounds hollow when two pieces are struck together and shows cracks on the ends.',
    ],
    image: articleImages.choosingTheRightFirewood,
  },
  {
    id: 'preparing-for-winter',
    title: 'Preparing For Winter',
    summary:
      'A fall checklist keeps your chimney ready for cold nights: inspect, clean, stock wood, and test safety gear.',
    body: [
      'Before the first hard freeze, schedule a chimney inspection, clear the hearth of debris, and confirm dampers and screens move freely. Stock seasoned wood under cover and test smoke and CO alarms.',
      'Winter prep also means knowing your draft quirks on cold starts and keeping a metal ash can ready. A short seasonal routine prevents many midwinter surprises.',
    ],
    image: articleImages.preparingForWinter,
  },
];

export function getArticleById(id: string): Article | undefined {
  return ARTICLES.find(article => article.id === id);
}
