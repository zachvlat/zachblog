---
title: "Scrape Electric bills"
date: "2025-06-19"
slug: "scrape-electric-bills"
---

```python
import requests
from bs4 import BeautifulSoup
import json
import schedule
import time

def job():
    print("Running main.py...")

url = "https://www.insurancemarket.gr/energy/times-revmatos"
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, "html.parser")

    table_rows = soup.select('#table_1 > tbody:nth-child(2) > tr')

    extracted_data = []

    header_row = soup.select_one('#table_1 > thead:nth-child(1) > tr:nth-child(1)')
    properties = [th.text.strip() for th in header_row.find_all('th')]

    for row in table_rows:
        row_data = {}

        cells = row.find_all('td')

        for i, cell in enumerate(cells):
            img_tag = cell.find('img')
            if img_tag:
                image_url = img_tag['src']
                row_data[properties[i]] = image_url
            else:
                row_data[properties[i]] = cell.text.strip()

        extracted_data.append(row_data)

    with open('extracted_data.json', 'w', encoding='utf-8') as json_file:
        json.dump(extracted_data, json_file, ensure_ascii=False, indent=2)

    print("Data extracted and saved to 'extracted_data.json'")
else:
    print("Failed to fetch data from the localhost page")

schedule.every().hour.at(":00").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
