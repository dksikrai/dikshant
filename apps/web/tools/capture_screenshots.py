import os
import subprocess
import time
import sys

# List of all 22 live URLs
projects = [
    {"name": "Mehta College", "url": "https://www.mehtacollege.com/", "file": "mehta_college.png"},
    {"name": "Airventory", "url": "https://www.airventory.io/", "file": "airventory.png"},
    {"name": "Kritasya Jewels", "url": "https://kritasyajewels.com/", "file": "kritasyajewels.png"},
    {"name": "Mehandipur Balaji Seva", "url": "https://mehandipurbalajiseva.com/", "file": "mehandipurbalajiseva.png"},
    {"name": "Bright Hygiene Group", "url": "http://brighthygienegroup.in/", "file": "brighthygienegroup.png"},
    {"name": "Aussie Translations", "url": "https://aussietranslations.com.au/", "file": "aussietranslations.png"},
    {"name": "Flow Rental", "url": "https://www.flowrental.dk/", "file": "flowrental.png"},
    {"name": "MapView AI", "url": "https://mapview.ai/", "file": "mapview.png"},
    {"name": "Zircodata", "url": "https://www.zircodata.com/", "file": "zircodata.png"},
    {"name": "CleanGuys Germany", "url": "https://cleanguys.de/", "file": "cleanguys.png"},
    {"name": "MedTrans", "url": "https://medtrans.com.au/", "file": "medtrans.png"},
    {"name": "Legal Translations Australia", "url": "https://legal-translations.com.au/", "file": "legaltranslations.png"},
    {"name": "EasyITRFile", "url": "https://easyitrfile.com", "file": "easyitrfile.png"},
    {"name": "Cake Deco Supplies Australia", "url": "https://cakedecosupplies.com.au/", "file": "cakedecosupplies.png"},
    {"name": "Mehta CI", "url": "https://www.mehtaci.com/", "file": "mehtaci.png"},
    {"name": "SalesPundit Australia", "url": "https://salespundit.com.au/", "file": "salespundit.png"},
    {"name": "Salg.nu", "url": "https://www.salg.nu/", "file": "salg.png"},
    {"name": "Jacksons Retreat NZ", "url": "https://www.jacksonsretreat.co.nz/", "file": "jacksonsretreat.png"},
    {"name": "XFC Gym 247", "url": "https://xfcgym247.com.au/", "file": "xfcgym247.png"},
    {"name": "White Knight Cyber", "url": "https://whiteknightcyber.com/", "file": "whiteknightcyber.png"},
    {"name": "ITechPanel", "url": "http://itechpanel.com/", "file": "itechpanel.png"},
    {"name": "ProfileTag Germany", "url": "https://www.profiletag.de/", "file": "profiletag.png"}
]

chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
output_dir = "apps/web/public/screenshots"

# Create output folder
os.makedirs(output_dir, exist_ok=True)

print(f"Starting capture of {len(projects)} websites...")
success_count = 0

for idx, proj in enumerate(projects, 1):
    name = proj["name"]
    url = proj["url"]
    filename = proj["file"]
    dest_path = os.path.join(output_dir, filename)
    
    print(f"[{idx}/{len(projects)}] Capturing '{name}' from {url}...")
    
    # Run Google Chrome headless to capture screenshot
    # --virtual-time-budget=8000 forces the renderer to wait up to 8s for layouts, fonts, images to render
    cmd = [
        chrome_path,
        "--headless",
        "--disable-gpu",
        "--window-size=1280,800",
        "--hide-scrollbars",
        f"--screenshot={dest_path}",
        url
    ]
    
    try:
        # Give it a max of 20 seconds to load and screenshot
        subprocess.run(cmd, timeout=20, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # Verify if screenshot was actually generated and has positive size
        if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1000:
            print(f"  ✓ Success: Saved to {dest_path} ({os.path.getsize(dest_path)} bytes)")
            success_count += 1
        else:
            print(f"  ✗ Failed: File not created or empty for {name}")
    except subprocess.TimeoutExpired:
        print(f"  ✗ Timeout: Took too long to load {name}")
    except Exception as e:
        print(f"  ✗ Error: {e}")
        
    # Brief cooling pause between requests to prevent aggressive hammering
    time.sleep(0.5)

print(f"\nCapture process complete. Successfully captured {success_count}/{len(projects)} screenshots.")
