import { Worker } from "bullmq";
import { dataScrapping } from "./data-scrapping";
import { generateFingerprint } from "./fingerprint";
import { connection } from "./queue";
import { loadDatabase, saveDatabase } from "./storage";

new Worker(
  "freelancer-scraper",
  async () => {
    const scraped = await dataScrapping();
    const newData = scraped.filter((item) => item.status === "Disponível");

    const oldData = await loadDatabase();

    const oldFingerprints = new Set(
      oldData.map((item) => generateFingerprint(item))
    );

    const added = [];
    const kept = [];

    for (const item of newData) {
      const fp = generateFingerprint(item);
      if (!oldFingerprints.has(fp)) {
        added.push(item);
      } else {
        kept.push(item);
      }
    }

    const newFingerprints = new Set(
      newData.map((item) => generateFingerprint(item))
    );
    const removed = oldData.filter(
      (item) => !newFingerprints.has(generateFingerprint(item))
    );

    if (added.length > 0) console.log("Novos itens encontrados:", added);
    if (removed.length > 0) console.log("Itens removidos:", removed);
    await saveDatabase(newData);
    
    console.log("Lista atual:", newData);

    return {
      addedCount: added.length,
      removedCount: removed.length,
      updatedList: oldData,
    };
  },
  { connection }
);
