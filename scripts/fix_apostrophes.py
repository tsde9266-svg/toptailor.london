#!/usr/bin/env python3
"""Fix unescaped apostrophes in JSX text content."""
import re

fixes = {
    "src/app/blog/tailor-near-me-belgravia/page.tsx": [
        ("London's most exclusive", "London&apos;s most exclusive"),
    ],
    "src/app/blog/tailor-near-me-clerkenwell/page.tsx": [
        ("London's most design-conscious", "London&apos;s most design-conscious"),
        ("St John's Gate", "St John&apos;s Gate"),
        ("If you're looking for a tailor near you in Clerkenwell", "If you&apos;re looking for a tailor near you in Clerkenwell"),
    ],
    "src/app/blog/tailor-near-me-fitzrovia/page.tsx": [
        ("If you're looking for a tailor near you in Fitzrovia", "If you&apos;re looking for a tailor near you in Fitzrovia"),
    ],
    "src/app/blog/tailor-near-me-marylebone/page.tsx": [
        ("If you're searching for a tailor near you in Marylebone", "If you&apos;re searching for a tailor near you in Marylebone"),
    ],
    "src/app/blog/tailor-near-me-paddington/page.tsx": [
        ("Bishop's Bridge Road", "Bishop&apos;s Bridge Road"),
    ],
    "src/app/blog/tailor-near-me-pimlico/page.tsx": [
        ("St George's Square", "St George&apos;s Square"),
    ],
    "src/app/blog/tailor-near-me-soho/page.tsx": [
        ("If you're searching for a tailor near you in Soho", "If you&apos;re searching for a tailor near you in Soho"),
    ],
    "src/app/blog/tailor-near-me-south-kensington/page.tsx": [
        ("London's most elegant", "London&apos;s most elegant"),
    ],
    "src/app/dress-alterations-chelsea/page.tsx": [
        ("boutiques of the King's Road", "boutiques of the King&apos;s Road"),
        (">King's Road<", ">King&apos;s Road<"),
    ],
    "src/app/suit-alterations-chelsea/page.tsx": [
        ("the King's Road, the boutiques", "the King&apos;s Road, the boutiques"),
        (">King's Road<", ">King&apos;s Road<"),
    ],
}

base = "D:/toptailor"

for rel_path, replacements in fixes.items():
    path = f"{base}/{rel_path}"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content
    for old, new in replacements:
        content = content.replace(old, new)

    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed: {rel_path}")
    else:
        print(f"WARNING — no match found: {rel_path}")

print("Done.")
