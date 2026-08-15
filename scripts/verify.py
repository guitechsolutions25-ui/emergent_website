import asyncio
from playwright.async_api import async_playwright

BASE = "https://9448eda0-1ccf-4621-85f1-dd2f1fb7a3f8.preview.emergentagent.com"
SHOTS = "/app/scripts/shots"

async def goto_section(page, sel):
    await page.evaluate(
        f"window.__lenis ? window.__lenis.scrollTo(document.querySelector('{sel}'), {{immediate:true, offset:-40}}) : document.querySelector('{sel}').scrollIntoView()"
    )
    await page.wait_for_timeout(1000)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        page = await b.new_page(viewport={"width": 1920, "height": 900})
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)[:200]))
        try:
            await page.goto(BASE, wait_until="commit", timeout=30000)
        except Exception as e:
            print("goto:", e)
        await page.wait_for_timeout(6000)
        try:
            await page.wait_for_function("!!window.__lenis", timeout=40000)
            print("lenis ready")
        except Exception as e:
            print("lenis wait failed:", e)
        await page.evaluate("window.__lenis && window.__lenis.destroy(); window.__lenis = null;")
        await page.wait_for_timeout(2000)

        await goto_section(page, "#demo")
        await page.click('[data-testid="showcase-tab-fluxos"]', force=True)
        await page.wait_for_timeout(3000)
        try:
            await page.click('.react-flow__node[data-id="ai"]', force=True, timeout=5000)
            await page.wait_for_timeout(700)
            print("flow node clicked")
        except Exception as e:
            print("flow node click fail:", str(e)[:150])
        try:
            await page.click('[data-testid="flow-add-ia-rag"]', force=True, timeout=3000)
            await page.wait_for_timeout(600)
            print("flow add node ok")
        except Exception as e:
            print("flow add fail:", str(e)[:150])
        await page.screenshot(path=f"{SHOTS}/04_flow.png")

        await page.click('[data-testid="showcase-tab-clientes"]', force=True)
        await page.wait_for_timeout(800)
        await page.click('[data-testid="client-row-cl3"]', force=True)
        await page.click('[data-testid="client-optin-cl3"]', force=True)
        await page.wait_for_timeout(500)
        await page.screenshot(path=f"{SHOTS}/05_clients.png")
        print("05 clients ok")

        await page.click('[data-testid="showcase-tab-integracoes"]', force=True)
        await page.wait_for_timeout(800)
        await page.click('[data-testid="integration-card-site"]', force=True)
        await page.wait_for_timeout(500)
        btn = await page.query_selector('[data-testid="integration-connect-button"]')
        if btn:
            await btn.click(force=True)
        await page.wait_for_timeout(3000)
        await page.screenshot(path=f"{SHOTS}/06_integrations.png")
        print("06 integrations ok")

        await page.click('[data-testid="showcase-tab-analytics"]', force=True)
        await page.wait_for_timeout(2200)
        await page.click('[data-testid="analyze-now-button"]', force=True)
        await page.wait_for_timeout(800)
        await page.screenshot(path=f"{SHOTS}/07_analytics.png")
        print("07 analytics ok")

        await goto_section(page, "#agendamento")
        await page.click('[data-testid="slot-0900"]', force=True)
        await page.wait_for_timeout(1800)
        conf = await page.query_selector('[data-testid="appointment-confirmed"]')
        await page.screenshot(path=f"{SHOTS}/08_scheduling.png")
        print("08 scheduling confirmed:", bool(conf))

        await goto_section(page, '[data-testid="crm-section"]')
        await page.click('[data-testid="timeline-event-2"]', force=True)
        await page.wait_for_timeout(700)
        await page.screenshot(path=f"{SHOTS}/09_crm.png")
        print("09 crm ok")

        await goto_section(page, '[data-testid="rag-section"]')
        await page.screenshot(path=f"{SHOTS}/10_rag.png")
        await goto_section(page, '[data-testid="agent-section"]')
        await page.wait_for_timeout(2600)
        await page.screenshot(path=f"{SHOTS}/11_agent.png")

        await goto_section(page, '[data-testid="handoff-section"]')
        await page.screenshot(path=f"{SHOTS}/12_handoff.png")
        await goto_section(page, '[data-testid="marketing-section"]')
        await page.wait_for_timeout(1600)
        await page.screenshot(path=f"{SHOTS}/13_marketing.png")

        await goto_section(page, '[data-testid="analytics-section"]')
        await page.wait_for_timeout(1800)
        try:
            await page.hover('[data-testid="peak-bar-16"]', force=True, timeout=3000)
            await page.wait_for_timeout(500)
        except Exception as e:
            print("hover fail:", str(e)[:120])
        await page.screenshot(path=f"{SHOTS}/14_analytics_section.png")

        await goto_section(page, '[data-testid="platform-tour"]')
        await page.click('[data-testid="tour-item-flow"]', force=True)
        await page.wait_for_timeout(700)
        await page.screenshot(path=f"{SHOTS}/15_tour.png")
        await goto_section(page, '[data-testid="pricing-section"]')
        await page.wait_for_timeout(1400)
        await page.screenshot(path=f"{SHOTS}/16_pricing.png")
        await goto_section(page, '[data-testid="final-cta"]')
        await page.wait_for_timeout(1000)
        await page.screenshot(path=f"{SHOTS}/17_cta.png")

        await page.set_viewport_size({"width": 390, "height": 844})
        await page.evaluate("window.__lenis.scrollTo(0, {immediate:true})")
        await page.wait_for_timeout(1500)
        await page.screenshot(path=f"{SHOTS}/18_mobile_hero.png")
        await goto_section(page, "#demo")
        await page.wait_for_timeout(1000)
        await page.screenshot(path=f"{SHOTS}/19_mobile_demo.png")

        print("ALL DONE. PAGE ERRORS:", errors if errors else "none")
        await b.close()

asyncio.run(main())
