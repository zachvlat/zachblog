---
title: "Lidl Api Server"
date: "2026-05-27"
slug: "lidl-api-server"
---

```bash
project/
 ├── users.json
 ├── products.json
```

```bash
python -m http.server 5000 --bind 0.0.0.0
```

```bash
http://localhost:5000/users.json
http://localhost:5000/products.json
```
