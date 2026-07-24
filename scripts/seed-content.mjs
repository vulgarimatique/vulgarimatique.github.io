import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const notions = [
  ["C6LmQWF9p7Raic", "API", "Une fenêtre de service où une appli dit “voici comment me demander quelque chose”.", "Développement & outils"],
  ["QjRBy0r9wnfvQo", "Apprentissage automatique (Machine Learning)", "Apprendre à l’ordi à reconnaître des modèles, comme toi qui apprends à reconnaître des chiens sur des photos.", "Données & IA"],
  ["JX28SuRUEglAn7", "Bande Passante", "La taille de la route ; plus elle est large, plus de voitures (données) passent.", "Réseau & web"],
  ["qX1Hic7I7J8D3Z", "Base de données", "Une grosse armoire à tiroirs pour ranger et retrouver des infos.", "Données & IA"],
  ["d4aJyAhaRssDWX", "Bibliothèque (lib)", "Un sac d’outils que tu ajoutes à ton projet pour éviter de tout refaire.", "Développement & outils"],
  ["r55p4rRxZ5gLgQ", "Bug", "Une petite erreur qui fait faire n’importe quoi au programme.", "Développement & outils"],
  ["AfG9lpMsUPG9Qh", "Cache", "Une boîte à accès ultra-rapide pour éviter de refaire la même chose 100 fois.", "Données & IA"],
  ["2jcehHVUjGhtG9", "Chiffrement (encryption)", "Parler en secret avec un code que seuls toi et ton ami comprenez.", "Sécurité"],
  ["DuDk4B1NPT4nOL", "Ci/CD", "Des robots qui testent et livrent le code automatiquement, comme une chaîne de montage.", "Développement & outils"],
  ["kYk9E7QSIIyHMQ", "Cloud", "L’ordi de quelqu’un d’autre, loué sur Internet.", "Cloud, applis & architectures"],
  ["71prrAE2Ly25xl", "Conteneur (Docker)", "Une petite boîte qui contient une appli + tout ce qu’il lui faut, et marche pareil partout.", "Cloud, applis & architectures"],
  ["pRJyyBU2LmUZU8", "CPU (processeur)", "Le “cerveau” de l’ordi qui fait les calculs.", "Matériel & systèmes"],
  ["EA9mhto7odGuaL", "CSS", "Les habits de la page (couleurs, tailles, positions).", "Langages & formats"],
  ["LjGpw93bMYWCkB", "Disque/SSD", "Le “cartable” où l’ordi garde ses affaires même quand on l’éteint.", "Matériel & systèmes"],
  ["EFwVYRnyzr3OWe", "DNS", "L’annuaire qui traduit un nom (google.com) en adresse (IP).", "Réseau & web"],
  ["HqV9XMbC6RKl5b", "Framework", "Une boîte à outils déjà prête pour construire plus vite (ex. React, Angular).", "Développement & outils"],
  ["DO2LKLp0Z06pFY", "Git", "Un historique magique pour revenir en arrière si on casse le code.", "Développement & outils"],
  ["ioDmcn6sZ3ldMv", "HTACCESS", "Un petit fichier de règles pour un site web (avec Apache) posé dans un dossier.", "Développement & outils"],
  ["rt4Cx4MJqaokAX", "HTML", "Le squelette d’une page web (titres, paragraphes, images).", "Langages & formats"],
  ["XRrDVcD9C4x8He", "HTTP/HTTPS", "La manière polie dont le navigateur parle aux sites (le S = conversation chiffrée).", "Réseau & web"],
  ["4vrMrhDYuxjpy4", "IP", "L’adresse de ta maison sur Internet pour qu’on te trouve.", "Réseau & web"],
  ["zWAih2B3rQ9h3C", "JavaScript", "Ce qui rend la page vivante (boutons qui bougent, menus qui s’ouvrent).", "Langages & formats"],
  ["McYdHAmiBgzH2u", "JSON", "Une boîte bien rangée (avec étiquettes) pour échanger des infos.", "Langages & formats"],
  ["IDYsJTDKlu9Avv", "Kubernetes", "Le chef d’orchestre qui place et surveille plein de boîtes (conteneurs).", "Cloud, applis & architectures"],
  ["uuQPijKs7U6q4P", "Latence", "Le temps que met la première voiture à démarrer ; petit = plus réactif.", "Réseau & web"],
  ["DnFFm7Orxw032W", "MESH", "Imagine un quartier où chaque maison peut parler à ses voisines. Si une rue est bloquée, le message passe par une autre maison.", "Réseau & web"],
  ["t57tXEayus33et", "MFA/2FA", "Prouver que c’est bien toi avec deux clés (mot de passe + code SMS, par ex.).", "Sécurité"],
  ["y5EyoXxAvgHgYQ", "Microservices", "Plein de petites applis spécialisées qui travaillent ensemble, plutôt qu’un gros bloc.", "Cloud, applis & architectures"],
  ["XIThkEAEXQf5aB", "Pare-feu (firewall)", "Un videur à l’entrée qui laisse passer seulement ce qui est autorisé.", "Sécurité"],
  ["wXul435pM10JPk", "Phishing", "Un faux message qui essaie de te tromper pour voler tes infos.", "Sécurité"],
  ["FpXTBFePUg5Zh0", "Proxy", "Un réceptionniste qui va chercher les infos à ta place.", "Réseau & web"],
  ["RZICJzPznYzEHq", "RAM", "Une table de travail rapide où l’ordi pose ce dont il a besoin tout de suite.", "Matériel & systèmes"],
  ["6Ru42X1RTr0cyZ", "Réseau de neurones", "Beaucoup de petites “briques” reliées, qui apprennent ensemble à décider.", "Données & IA"],
  ["XnuDMjrjgF8Onx", "SQL", "Une langue pour poser des questions à une base de données.", "Langages & formats"],
  ["qzT6pHvD9Nnsof", "Système d’exploitation (OS)", "Les règles de la maison de l’ordi (Windows, macOS, Linux).", "Matériel & systèmes"],
  ["wRv7aqpAuOQyC2", "URL", "L’adresse complète d’une page web, comme “rue + numéro + appartement”.", "Réseau & web"],
  ["TwfT3fArQSCvYk", "VPN", "Un tunnel secret pour voyager sur Internet sans que les autres voient où tu vas.", "Réseau & web"],
  ["J2I6dnId7RJWn2", "Wi-Fi", "Des ondes qui remplacent le câble pour relier tes appareils à Internet.", "Réseau & web"]
];

const audio = {
  DnFFm7Orxw032W: ["mesh.m4a", "1:11"],
  "2jcehHVUjGhtG9": ["chiffrement-encryption.m4a", "1:47"],
  IDYsJTDKlu9Avv: ["kubernetes.m4a", "1:37"],
  "71prrAE2Ly25xl": ["conteneur-docker.m4a", "1:23"],
  r55p4rRxZ5gLgQ: ["bug.m4a", "1:24"],
  d4aJyAhaRssDWX: ["bibliotheque-lib.m4a", "1:29"],
  y5EyoXxAvgHgYQ: ["microservices.m4a", "1:28"],
  DuDk4B1NPT4nOL: ["ci-cd.m4a", "2:03"],
  HqV9XMbC6RKl5b: ["framework.m4a", "1:33"],
  AfG9lpMsUPG9Qh: ["cache.m4a", "1:27"],
  t57tXEayus33et: ["mfa-2fa.m4a", "1:36"],
  wXul435pM10JPk: ["phishing.m4a", "1:32"],
  DO2LKLp0Z06pFY: ["git.m4a", "1:28"],
  McYdHAmiBgzH2u: ["json.m4a", "1:37"],
  zWAih2B3rQ9h3C: ["javascript.m4a", "1:43"],
  EA9mhto7odGuaL: ["css.m4a", "1:39"],
  J2I6dnId7RJWn2: ["wi-fi.m4a", "1:28"],
  TwfT3fArQSCvYk: ["vpn.m4a", "1:26"],
  "4vrMrhDYuxjpy4": ["ip.m4a", "1:15"],
  uuQPijKs7U6q4P: ["latence.m4a", "1:24"],
  XRrDVcD9C4x8He: ["http-https.m4a", "1:43"],
  JX28SuRUEglAn7: ["bande-passante.m4a", "1:32"],
  kYk9E7QSIIyHMQ: ["cloud.m4a", "1:35"],
  XnuDMjrjgF8Onx: ["sql.m4a", "1:34"],
  wRv7aqpAuOQyC2: ["url.m4a", "1:24"],
  rt4Cx4MJqaokAX: ["html.m4a", "1:38"],
  C6LmQWF9p7Raic: ["api.m4a", "1:35"],
  XIThkEAEXQf5aB: ["pare-feu-firewall.m4a", "1:23"],
  EFwVYRnyzr3OWe: ["dns.m4a", "1:23"],
  qzT6pHvD9Nnsof: ["systeme-exploitation-os.m4a", "1:38"],
  LjGpw93bMYWCkB: ["disque-ssd.m4a", "1:45"],
  RZICJzPznYzEHq: ["ram.m4a", "1:18"],
  pRJyyBU2LmUZU8: ["cpu-processeur.m4a", "1:23"]
};

const infographics = {
  DnFFm7Orxw032W: ["infographie-mesh.jpg", "vertical"],
  "2jcehHVUjGhtG9": ["infographie-chiffrement.jpg", "vertical"],
  IDYsJTDKlu9Avv: ["infographie-kubernetes.jpg", "vertical"],
  "4vrMrhDYuxjpy4": ["infographie-ip.jpg", "horizontal"],
  pRJyyBU2LmUZU8: ["infographie-cpu.jpg", "horizontal"]
};

const featured = new Set(["IDYsJTDKlu9Avv", "2jcehHVUjGhtG9", "EFwVYRnyzr3OWe", "DnFFm7Orxw032W"]);

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " et ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const yaml = (value) => JSON.stringify(value);

const genericBody = (title, summary) => `
## En clair

${summary}

Cette notion fait partie du vocabulaire courant de l’informatique. Le plus simple est de la retenir par son rôle : **${title}** décrit un outil, une règle ou un mécanisme qui aide les machines et les logiciels à fonctionner ensemble.

## Pourquoi c’est utile

Comprendre ce terme permet de mieux lire une documentation, suivre une conversation technique ou choisir un outil sans se laisser arrêter par le jargon.

> L’idée importante n’est pas de mémoriser chaque détail, mais de comprendre à quoi la notion sert et avec quoi elle communique.
`;

const kubernetesBody = `
## Imagine un restaurant un soir de grande affluence

Les clients arrivent par vagues. En cuisine, les cuisiniers — nos conteneurs — préparent les plats. Le maître d’hôtel regarde la salle et la cuisine : il place chaque cuisinier au bon poste, vérifie que tout le monde travaille bien et que rien ne manque.

Si un cuisinier tombe malade, il en appelle un autre. Si la salle se remplit, il ouvre un nouveau poste pour aller plus vite. Quand le calme revient, il ferme un poste en trop.

> Kubernetes fait la même chose avec vos applications : il place, surveille et ajuste automatiquement les conteneurs pour que tout reste disponible.

## Concrètement, à quoi ça sert ?

### Déployer

Lancer une application de manière reproductible et mettre à jour ses conteneurs sans interrompre le service.

### Surveiller

Détecter qu’un conteneur ne répond plus et le relancer automatiquement.

### Adapter

Ajouter ou retirer des conteneurs selon le nombre de personnes qui utilisent l’application.

## À retenir

- **Pod** : la plus petite unité que Kubernetes déploie.
- **Cluster** : l’ensemble des machines qui exécutent les applications.
- **Orchestrateur** : le logiciel qui organise le déploiement et la supervision.
`;

const outDir = join(process.cwd(), "src", "content", "notions");
await mkdir(outDir, { recursive: true });

for (const [sourceId, title, summary, category] of notions) {
  const slug = slugify(title);
  const audioData = audio[sourceId];
  const infographicData = infographics[sourceId];
  const frontmatter = [
    "---",
    `title: ${yaml(title)}`,
    `summary: ${yaml(summary)}`,
    `category: ${yaml(category)}`,
    `sourceId: ${yaml(sourceId)}`,
    `featured: ${featured.has(sourceId)}`,
    'publishedAt: "2026-07-24"',
    "aliases: []",
    ...(audioData
      ? [`audio: ${yaml(`/media/audio/${audioData[0]}`)}`, `audioDuration: ${yaml(audioData[1])}`]
      : []),
    ...(infographicData
      ? [
          `infographic: ${yaml(`/media/infographics/${infographicData[0]}`)}`,
          `infographicOrientation: ${yaml(infographicData[1])}`
        ]
      : []),
    "---",
    ""
  ].join("\n");

  const body = title === "Kubernetes" ? kubernetesBody : genericBody(title, summary);
  await writeFile(join(outDir, `${slug}.md`), `${frontmatter}${body.trim()}\n`, "utf8");
}

console.log(`Création de ${notions.length} notions dans ${outDir}`);
