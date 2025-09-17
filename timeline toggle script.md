Main Section
├── Two Column Layout (30% | 70%)
│   ├── Left Column
│   │   ├── Button Widget (.step-button-1)
│   │   ├── HTML Widget (.progress-line-1) 
│   │   ├── Button Widget (.step-button-2)
│   │   ├── HTML Widget (.progress-line-2)
│   │   └── Button Widget (.step-button-3)
│   └── Right Column
│       ├── Container (.content-panel-1)
│       ├── Container (.content-panel-2)
│       └── Container (.content-panel-3)


So your layout would be:
Button 1  →  [Content Panel 1: "Step 1 explanation text/image"]
   ↓ (line fills)
Button 2  →  [Content Panel 2: "Step 2 details/features"] 
   ↓ (line fills)
Button 3  →  [Content Panel 3: "Step 3 summary/CTA"]


With Collapse/Expand:

Content slides down smoothly as it reveals
Creates that premium "unfolding" animation effect
Panel grows from height: 0 to height: auto
Content stays properly styled and centered during animation
Feels more organic and connected to the line-filling animation
