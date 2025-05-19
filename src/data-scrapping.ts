import puppeteer from "puppeteer";

export const dataScrapping = async () => {
  const url = "http://localhost:3000/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector("div.text-card-foreground");

  const portfolio = await page.evaluate(async () => {
    const projects = Array.from(
      document.querySelectorAll('[data-slot="card"]')
    );

    const data = projects.map((project) => {
      const statusElement = project.querySelector(
        '[data-slot="card-description"] span'
      );
      const status = statusElement?.textContent?.trim() || "";

      return {
        title:
          project
            .querySelector('[data-slot="card-title"]')
            ?.textContent?.trim() || "",
        status,
        address:
          Array.from(project.querySelectorAll("p"))
            .find((tag) => tag.textContent?.includes("Endereço"))
            ?.textContent?.trim() || "",
        repository:
          Array.from(project.querySelectorAll("p"))
            .find((tag) => tag.textContent?.includes("Horário"))
            ?.textContent?.trim() || "",
      };
    });

    return data;
  });

  await browser.close();
  return portfolio;
};
