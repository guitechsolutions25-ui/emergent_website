import asyncio
from playwright.async_api import async_playwright

BASE = "https://9448eda0-1ccf-4621-85f1-dd2f1fb7a3f8.preview.emergentagent.com"

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        page = await b.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        try:
            await page.goto(BASE, wait_until="commit", timeout=30000)
        except Exception:
            pass
        await page.wait_for_timeout(16000)
        await page.screenshot(path="/app/scripts/shots/m_hero.png")
        # scroll a bit with touch-like wheel to see parallax + marquee/positioning
        for i in range(4):
            await page.mouse.wheel(0, 500)
            await page.wait_for_timeout(150)
        await page.wait_for_timeout(1200)
        await page.screenshot(path="/app/scripts/shots/m_scroll.png")
        print("done")

asyncio.run(main())
