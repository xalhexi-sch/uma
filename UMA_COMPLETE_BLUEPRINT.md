# UMA — Complete Business & System Blueprint
## Agricultural B2B Marketplace Platform for Butuan/Caraga

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Part 1: Concept Reconstruction](#part-1-concept-reconstruction)
3. [Part 2: Business Model Canvas](#part-2-business-model-canvas)
4. [Part 3: End-to-End Workflow](#part-3-end-to-end-workflow)
5. [Part 4: Failure Modes & Mitigations](#part-4-failure-modes--mitigations)
6. [Part 5: Professor Defense — Hard Answers](#part-5-professor-defense--hard-answers)
7. [Part 6: MVP Definition](#part-6-mvp-definition)
8. [Part 7: Platform Components & Data Model](#part-7-platform-components--data-model)
9. [Part 8: Business Rules](#part-8-business-rules)
10. [Part 9: Revenue Model](#part-9-revenue-model)
11. [Part 10: Unit Economics](#part-10-unit-economics-illustrative)
12. [Part 11: Trust & Verification System](#part-11-trust--verification-system)
13. [Part 12: Freshness & Quality System](#part-12-freshness--quality-system)
14. [Part 13: UMA Courier as Its Own System](#part-13-uma-courier-as-its-own-system)
15. [Part 15: Geography & Launch Strategy](#part-15-geography--launch-strategy)
16. [Part 16: Risk Register](#part-16-risk-register)
17. [Part 17: The Professor Attack Test](#part-17-the-professor-attack-test)
18. [Part 18: Implementation Roadmap](#part-18-implementation-roadmap)

---

## EXECUTIVE SUMMARY

**UMA** is a B2B agricultural marketplace and logistics platform connecting smallholder farmers and agri-suppliers to institutional business buyers (restaurants, carinderias, canteens, retailers, resorts) for recurring produce procurement. Unlike consumer food-delivery apps (Grab, Foodpanda) or national agri-platforms (Mayani), UMA's structural differentiation is:

- **Many-to-many pooled logistics**: Multiple farmers, multiple buyers, consolidated routes — not one-to-one dispatch
- **Forward-order (harvest-to-order) model**: Farmers harvest to confirmed demand, not speculative inventory
- **Hyperlocal-first execution**: Embedded in one town's farmer/business network with documented relationships
- **Five-layer retention system**: Logistics dependency, trade credit, replacement guarantees, sourcing data, institutional contracts
- **Bootstrap viable with one-to-one delivery**: Pooled routing activates once density exists, not required day one

**Target launch**: Butuan/Caraga, one barangay cluster, 5–10 farmers, 5–10 institutional buyers, MVP scope.

**Timeline**: 3–4 months to MVP (if team has basic full-stack capability).

---

## PART 1: CONCEPT RECONSTRUCTION

### What UMA Is
A B2B marketplace and logistics platform that connects agricultural producers (farmers/suppliers) to business buyers (restaurants, food establishments, retailers, institutional kitchens) for recurring produce procurement, fulfilled through an integrated delivery layer, **UMA Courier**.

### What UMA Is NOT
- Not a consumer meal-delivery app (not Grab/Foodpanda for vegetables as consumer end-use)
- Not a spot-market app where produce sits as ready inventory like retail SKUs
- Not a nationwide superapp on day one
- Not a "100% freshness guaranteed" through sensors UMA doesn't have
- Not claiming to beat Mayani or AgriBOOST; claiming to be differently positioned

### Who UMA Serves

| Actor | Real Need | UMA's Value |
|-------|-----------|-------------|
| **Farmers** | Predictable buyer, less middleman dependence, transport handled | Direct market access, reduced bagsakan margin extraction |
| **Businesses** | Consistent, plannable produce sourcing without supply gaps | One order (not many), backup suppliers, trade terms, fair pricing |
| **Couriers** | Delivery work that's economically viable for small baskets | Pooled orders make small deliveries profitable |

### Core Problem UMA Solves
Fragmented, informal produce sourcing: businesses have zero visibility into which farmers can reliably supply what/when/quantity; farmers have zero visibility into which buyers order predictably. The **bagsakan/middleman system** absorbs the coordination cost (and 20–30%+ margin) in exchange for solving visibility badly.

### Why Farmers Would Use It
**Conditionally true**, not automatically. Only valuable if UMA has real buyer volume. If there are 50 farmers and 5 buyers, this proposition is false in practice. This is the **cold-start problem** — stated plainly, not hidden.

### Why Businesses Would Use It
Plausible for **businesses with unreliable/inconsistent current sourcing**, or new businesses without established supplier relationships. Not plausible for a business with a trusted bagsakan contact — you have nothing unless you're cheaper, more reliable, or genuinely less effort. **Addressable segment: sourcing-pain businesses**, not "all restaurants."

### Why Not Direct Farmer Contact?
**Honest answer: discovery.** Right now there's no easy way to find "who has 40kg eggplant ready by Thursday." Real gap. But once a business finds a good farmer through UMA, what stops them texting directly? 

**This is solved by the five-layer lock** (see Part below).

### Why Not Facebook Marketplace?
FB is free, familiar, reaches many. UMA's advantage: structured recurring orders, logistics handling, track record/rating system. **This is an assumption, not proven** until a farmer confirms the value.

### Why UMA Courier is Necessary
Farmers individually can't justify delivery for small orders → pooling multiple farmers into one route for multiple buyers is what makes small transactions economically viable. **This one holds up solidly.** But it means operating actual logistics (vehicles, drivers, fuel, breakdowns, insurance) — capital- and operations-intensive in ways software is not. **Biggest execution risk.**

### What Makes UMA Different from Grab/Foodpanda/Maxim
Those: single-order, single-pickup, single-drop, real-time, consumer-facing.
**UMA's actual structural difference**: many-to-many pooled logistics on a schedule (multiple farmers → multiple buyers → one/few routes) rather than one-to-one dispatch. **This distinction must be explicit in your pitch.**

### UMA's Actual Competitive Advantage
Not proprietary tech (replicable). Not first-mover (you're not). Not guaranteed freshness (unverifiable). 

**Only sustainable advantage: hyperlocal execution** — being genuinely embedded in one town's farmer/business network in a way national platforms (Mayani) or government programs (AgriBOOST) aren't optimized to be. **This has to be earned through real relationships, not claimed on a slide.**

### The Five-Layer Lock (Disintermediation Mitigation)

1. **Logistics dependency**: Basket aggregation (one order = tomatoes + eggplant + squash from multiple farmers, one delivery). Going direct = four separate pickups/deliveries. Real friction.

2. **Working capital/float**: UMA pays farmers on delivery, collects from businesses on 7–14 day terms. Smallholder farmers can't extend that float alone. **This is actual leverage that scales with volume.**

3. **Quality guarantee/replacement**: Bad harvest from Farmer A → auto-reroute to Farmer B within the day, no negotiation. Going direct = losing that fallback. **Insurance in effect.**

4. **Data the farmer can't give**: Price trends across the whole farmer network, seasonal availability forecasts, farmer reliability scores. A business ordering from one farmer has zero visibility into whether they're overpaying or supply is about to tighten. **UMA gets harder to replicate the longer it runs.**

5. **Institutional contracts**: Resorts/hotels sign supply agreements with volume-based pricing tiers, legally anchoring high-value customers. **Normal enterprise procurement, not a platform trick.**

**Honest framing for your defense**: "UMA reduces disintermediation incentive through logistics, financing, guarantees, and data—not through restricting behavior (which is unenforceable and undesirable)." **This is how Alibaba, Faire, and Instacart actually work.**

---

## PART 2: BUSINESS MODEL CANVAS

| Block | Content |
|-------|---------|
| **Customer segments** | Farmers/agri-suppliers (supply side) · Restaurants, carinderias, canteens, retailers (core buyers) · Resorts/hotels (premium tier) |
| **Value props — farmers** | Recurring buyers, no transport hassle, paid on delivery |
| **Value props — buyers** | One order instead of many, replacement guarantee, 7–14 day trade credit (phase 2), price/availability visibility |
| **Value props — couriers** | Pooled deliveries make small-order routes economically viable |
| **Channels** | Direct sign-up (farmers via barangay/agri-office partnerships) · Direct outreach (buyers via restaurants/canteens) · Word-of-mouth once proof of concept exists |
| **Customer relationships** | Self-serve app/dashboard + assigned account handling for premium (hotel/resort) accounts |
| **Revenue streams** | Transaction commission (8% on produce value) · Delivery fee (tiered: one-to-one vs. pooled) · Financing fee on trade credit (phase 2+) · Premium/contract accounts (phase 2+) |
| **Key resources** | Farmer network · Courier capacity/logistics partners · Working capital (for float, phase 2+) · Platform software · Ops/support staff |
| **Key activities** | Farmer/buyer verification · Order matching · Delivery coordination · Dispute resolution · Float management (phase 2+) |
| **Key partners** | Local LGU/agri offices · Barangay farmer associations · Third-party courier networks/logistics partners · Payment processors |
| **Cost structure** | Courier ops/fuel · Working capital costs (phase 2+) · Payment processing (2–3%) · Platform dev/hosting · Staff (ops + support) · Refund/loss allowance (~3% of GMV) |

---

## PART 3: END-TO-END WORKFLOW

### A. Farmer Onboarding → Payment

```
1. Register
   → Name, location/barangay, contact, valid ID
   
2. Verify
   → Phone/ID check + barangay agri-office or association confirmation
   → No farm visit required at MVP (known limitation, stated upfront)
   
3. List
   → Crop, expected harvest date, estimated quantity, price
   → NOT live stock; a forward listing against a harvest date
   
4. Order confirmed
   → Buyer order matches farmer's listing + quantity reserved
   
5. Harvest & pack
   → Farmer harvests against confirmed orders only (no waste)
   
6. Pickup
   → UMA Courier arrives at farm, scans order code
   → Photos + manual count of quantity
   → Farmer confirms pickup in app
   
7. Delivery
   → Courier transports to buyer(s)
   → Buyer confirms receipt at drop-off
   
8. Payment
   → Farmer paid on buyer's delivery confirmation (not order placement)
   → Commission deducted from farmer payout
```

### B. Business Onboarding → Order

```
1. Register
   → Business name, DTI/BIR registration (or business permit), contact
   
2. Verify
   → Permit verification + delivery address confirmation
   
3. Browse/order
   → Search by crop, harvest date, quantity
   → Place order against cutoff window (e.g., "orders close Thursday 5pm, delivery Sunday")
   
4. Payment
   → Pay on delivery at MVP; trade credit terms (7–14 day) unlock after track record
   
5. Receive
   → Confirm quantity + quality at drop-off
   → Take photo evidence if flagging an issue
   
6. Rate/dispute
   → Rate farmer + courier (1–5 stars, comment)
   → Flag issues within dispute window (e.g., 2 hours of delivery)
```

### C. UMA Courier Flow

```
1. Order confirmed
   → Added to a route (batched, if overlapping locations) 
      OR dispatched one-to-one (if solo or urgent)
   
2. Courier accepts
   → Views assigned pickups, verifies locations
   
3. Pickup execution
   → Scans order QR code at farm
   → Verifies quantity via photo + count
   → Farmer confirms in app (signature/photo)
   
4. Transport
   → GPS-tracked, basic tracking visible to buyer
   
5. Delivery
   → Buyer scans/confirms receipt
   → Photo + signature/confirmation = proof of delivery
   
6. Payment
   → Courier paid per-delivery (one-to-one) or per-stop (pooled)
   → UMA reconciles farmer/buyer/courier after confirmation
```

### When Something Goes Wrong (MVP Default Rules)

| Failure | Default Resolution |
|---------|-------------------|
| Farmer can't fulfill | Auto-reroute to backup farmer if available; else order cancelled + buyer notified before pickup |
| Courier delayed/no-show | Buyer notified in-app; reassign to backup courier if in pooled route |
| Buyer disputes quality | Photo evidence required at drop-off; unresolved disputes escalate to UMA support |
| Buyer refuses delivery | Farmer still paid (already harvested); loss absorbed by UMA's refund allowance, not the farmer |
| Multiple buyers order same stock | First-confirmed-order reserves quantity; later orders auto-notified "sold out," offered next available |

---

## PART 4: FAILURE MODES & MITIGATIONS

| Failure Category | Problem | Why It Happens | Prevention | Resolution |
|-----------------|---------|---------------|-----------|-----------|
| **Fake/nonexistent listings** | Farmer lists produce they don't actually have | No verification of actual stock; self-reported only | Verified farmer track record required before high-volume listings; forward listings, not guaranteed stock | Auto-refund buyer; penalize farmer reliability score; repeat = suspension |
| **Quality mismatch** | Delivered goods ≠ listing (size, freshness, grade) | No inspection layer between listing and delivery | Photo at pickup + delivery; buyer inspection window before acceptance | Partial refund w/ evidence; recurring issue triggers farmer review |
| **Spoilage in transit** | Weather, delay, poor packaging | Agriculture is perishable; logistics isn't instant | Route time limits per crop type; basic packaging standards | Loss absorbed by UMA refund allowance (Part 10), not farmer, if delivery was on-time |
| **Farmer cancels post-order** | Bad harvest, better offer, weather | Farmers aren't contractually bound pre-MVP | Backup-farmer auto-reroute; cancellation penalty after repeated pattern | Buyer notified before pickup window; order refunded if unrecoverable |
| **Buyer false dispute** | Buyer claims poor quality/non-delivery for free goods | No neutral evidence at drop-off | Mandatory photo/signature proof of delivery | Farmer paid if proof exists; buyer's dispute rate tracked; repeat abuse = flag |
| **Courier issues** | No-show, theft, damage, false "delivered" | Independent contractors; low oversight | GPS-tracked route, photo proof both ends, courier rating | Reassign; docked pay/suspension if fraud proven; UMA absorbs buyer loss short-term |
| **Disintermediation/bypass** | Farmer & buyer transact directly to skip fees | Trust already built, fees feel avoidable | Five-layer lock (basket, float, guarantee, data, contracts) | Accepted residual risk; can't be fully policed |
| **Fake accounts/reviews** | Inflate reliability score or sabotage competitor | Low signup barrier | ID + permit verification; ratings only from confirmed paid transactions | Pattern detection; account ban |
| **Payment fraud/chargebacks** | Buyer disputes charge after receiving goods; COD non-payment | Standard payment platform risk | Prefer digital payment over COD at MVP; escrow-style hold until delivery confirmed | Standard dispute process via payment processor; repeat offenders blacklisted |
| **Overselling limited stock** | Multiple buyers order more than farmer listed | No real-time inventory lock | First-confirmed-order reserves quantity; listing closes at cap | Later orders notified "sold out"; offered next available date |
| **Remote suppliers/unprofitable routes** | Route too far/low-volume for profitable delivery | Sparse density outside pilot area | Geographic radius limit at launch (Part 15) | Don't onboard farmers outside serviceable radius yet |
| **Seasonal shortages, weather, breakdowns** | Structural agriculture/logistics reality | Can't be engineered away | Diversify crop/farmer mix; buffer time in delivery windows | Transparent buyer notification; real-time status updates |
| **Food safety/contamination/liability** | No enforced safety standard; unclear liability if someone gets sick | Real legal exposure | Basic hygiene/packaging guidelines for farmers; ToS clarifies UMA as marketplace facilitator, not food safety guarantor | Escalate serious cases to LGU health office; legal risk flagged upfront |
| **Regulatory/legal ambiguity** | Courier contractor vs. employee classification; agri trade regs | Philippine gig-labor classification unresolved | Legal consult before scaling courier fleet; start with partnered logistics (not owned) to defer risk | N/A — flag as open risk; defer courier employment decision to phase 2+ |
| **Competitor copies** | Low barrier to cloning software | Idea itself isn't defensible | Moat is route density + local relationships, not the app | Can't prevent copying; can't replicate local trust quickly |

**Honest summary for your defense**: None of these are fully "solved" — they're managed to acceptable residual risk, same as any real marketplace. Claiming zero fraud, zero spoilage, or zero disintermediation would be the red flag, not the presence of these risks.

---

## PART 5: PROFESSOR DEFENSE — HARD ANSWERS

| Question | Real Answer |
|----------|------------|
| **"Isn't this just Foodpanda for vegetables?"** | No. Foodpanda is one-to-one, real-time, consumer. UMA is B2B, forward-order (harvest against confirmed orders, not live stock), many-to-many pooled routing. Different mechanics, different buyer, different transaction type. |
| **"Why would farmers use UMA instead of selling directly?"** | Only if UMA has real buyer volume — that's the honest condition. The pitch is recurring demand + no transport hassle + paid on delivery, but this only works if you hit critical mass first. |
| **"Why would restaurants use UMA instead of existing suppliers?"** | Only for buyers with unreliable current sourcing or no relationships. Not claiming UMA beats every existing supplier relationship — claiming to serve the buyers who have sourcing pain today. |
| **"Why wouldn't Grab just copy this?"** | They could build the software. They can't instantly replicate hyperlocal farmer trust, route density, or working-capital relationships in Butuan — that's earned through real execution, not coded. |
| **"What happens if a farmer doesn't have enough supply?"** | Forward listings cap order size to available quantity; overselling isn't possible by design. Listing closes when 100% reserved. |
| **"Who's responsible when food arrives spoiled?"** | If delivered within the route time limit for that crop, UMA's refund allowance absorbs it — not the farmer, not the buyer eating the loss alone. |
| **"How do you guarantee freshness?"** | We don't "guarantee" it — we timestamp harvest date, cap delivery windows per crop, require photo evidence at pickup/delivery. That's process control, not a promise we can't back. |
| **"How does UMA make money?"** | Three streams: transaction commission (~8% on produce value), delivery fees (tiered one-to-one vs. pooled), and financing fees on trade credit (phase 2+). Not one fragile stream. |
| **"What prevents users from bypassing the platform?"** | Nothing prevents it outright — the five-layer lock (basket aggregation, trade credit, replacement guarantee, sourcing data, contracts) makes staying more valuable than leaving. Residual leakage is expected, same as Alibaba or Airbnb. |
| **"Why do you need your own courier?"** | Farmers can't individually justify delivery for small volumes — pooling is what makes small transactions viable at all. MVP uses partnered/contracted couriers (not owned fleet) to avoid capital risk early. |
| **"What if delivery costs more than the product?"** | Geographic radius limit at launch excludes unprofitable routes (Part 15) — we don't serve them yet. |
| **"How will you verify farmers/businesses?"** | ID + barangay agri-office confirmation for farmers; business permit + address confirmation for buyers. No farm visits at MVP — known limitation, not hidden. |
| **"What if supply and demand don't match?"** | That's the cold-start risk we haven't fully solved — mitigated by starting in one town with a small matched cohort (5–10 farmers, 5–10 buyers), not claimed as solved. |
| **"What's your competitive advantage?"** | Hyperlocal execution + route density — not tech, not being first. This has to be earned through real relationships. Stated plainly. |
| **"How does this scale?"** | Town by town, replicating the same density-first playbook — not a national launch. Each new town follows the same process as the first. |

**Pattern across every answer**: specific, bounded claims ("within the route time limit," "at MVP," "for this segment") beat absolute claims ("guaranteed," "always," "prevents"). That's what survives scrutiny.

---

## PART 6: MVP DEFINITION

| Tier | Features |
|------|----------|
| **Must have** | Farmer registration + ID/barangay verification · Forward listing (crop, harvest date, quantity, price) · Buyer registration + permit verification · Order placement with cutoff window · Order-size cap vs. available quantity · One-to-one delivery (contracted/partnered couriers) · Photo proof at pickup + delivery · Pay-on-delivery for both sides · Basic rating (farmer, buyer, courier) |
| **Should have** | Pooled/batch delivery for overlapping routes · Backup-farmer auto-reroute on cancellation · Dispute flagging window with photo evidence · Basic reliability score visible to both sides |
| **Could have** | Trade credit/financing fee for repeat buyers · Sourcing data/price trend dashboard · Premium contract accounts (hotels/resorts) · In-app messaging |
| **Not yet** | Owned courier fleet · Real-time live inventory · Cold-chain/temperature tracking · Multi-town expansion · Dynamic/surge pricing |

**Launch scope, plainly**: One town, one crop category (vegetables), 5–10 farmers, 5–10 institutional buyers (canteens/carinderias), one-to-one delivery via a partnered courier or motorcycle contractor — not an owned fleet, not pooled routing yet. Pooling only makes sense once density exists; density doesn't exist on day one.

---

## PART 7: PLATFORM COMPONENTS & DATA MODEL

### Major Components

| Component | Role |
|-----------|------|
| **Farmer dashboard** | Listings, harvest calendar, order confirmations, earnings history |
| **Buyer dashboard** | Search/order, delivery tracking, ratings, disputes |
| **Courier app** | Route assignment, pickup/delivery scanning, proof capture, earnings |
| **Admin dashboard** | Verification queue, dispute resolution, reliability scores, route/capacity overview |
| **Order engine** | Matches orders to listings, enforces cutoffs and quantity caps |
| **Payment layer** | Pay-on-delivery processing, refund allowance, (later) trade credit management |
| **Notification system** | Order status, delivery windows, disputes, payment confirmations |
| **Ratings/reliability engine** | Farmer, buyer, courier scores feeding into matching and suspension rules |

### Core Data Model

```
Farmer (id, name, barangay, verified_status, reliability_score, created_at)
  ├── has many Listings
  └── has many Ratings (from buyers)

Listing (id, farmer_id, crop, harvest_date, quantity, price, status, created_at)
  ├── belongs to Farmer
  └── has many OrderItems

Business (id, name, permit_no, address, verified_status, created_at)
  ├── has many Orders
  └── has many Ratings (from farmers/couriers)

Order (id, business_id, cutoff_window, status, created_at)
  ├── has many OrderItems
  └── has one Delivery

OrderItem (id, order_id, listing_id, qty_requested, price_at_order)
  ├── belongs to Order
  └── belongs to Listing

Courier (id, name, vehicle_type, verified_status, reliability_score, created_at)
  └── has many Deliveries

Delivery (id, order_id, courier_id, route_id, pickup_proof, delivery_proof, status)
  ├── belongs to Order
  ├── belongs to Courier
  └── may belong to Route

Route (id, date, type [one-to-one / pooled], created_at)
  └── has many Deliveries

Rating (id, from_type [farmer/buyer/courier], to_id, order_id, score, comment, created_at)
  └── linked to Order

Dispute (id, order_id, raised_by, description, evidence, status, resolution, created_at)
  └── belongs to Order
```

---

## PART 8: BUSINESS RULES

| Rule Area | Rule |
|-----------|------|
| **Listing** | A farmer can list only against a future harvest date, not current stock; quantity is an estimate, not a guarantee until harvest confirmed |
| **Quantity reservation** | Reserved the moment OrderItem is confirmed against a Listing; listing auto-closes at 100% reserved |
| **Inventory decrease** | Decreases only on order confirmation, not on browsing/cart-adding |
| **Cancellation** | Farmer can cancel up to harvest date minus 1 day without penalty; after that, triggers backup-farmer reroute and counts against reliability score |
| **Delivery payer** | Buyer pays delivery fee; tier (one-to-one vs. pooled) set at order time |
| **Commission payer** | Deducted from farmer payout, not added on buyer price — keeps buyer pricing simple |
| **Unavailable post-order** | Auto-reroute to backup farmer in same crop/area; if none, cancel and refund buyer before pickup |
| **Spoilage risk** | Farmer bears risk before pickup; UMA bears risk after courier pickup confirmation |
| **Payment release** | Farmer paid on buyer's delivery confirmation, not on order placement |
| **Refund eligibility** | Must be raised within dispute window (e.g., 2 hours) with photo evidence |
| **Dispute evidence** | Pickup photo + delivery photo + buyer complaint photo required |
| **Supplier rating** | Only from confirmed, paid orders — no rating without completed transaction |
| **Courier rating** | Based on delivery timeliness + proof-of-delivery completeness |
| **Repeat bad actors** | 3 confirmed violations within rolling period = account suspension pending review |

---

## PART 9: REVENUE MODEL

| Stream | Who Pays | Basis | When | Why They'd Accept | Risk |
|--------|----------|-------|------|-------------------|------|
| **Transaction commission** | Farmer (deducted from payout) | % of order value (8% ASSUMPTION) | On payment release | Still nets more than typical 20–30% middleman markup | Too high % pushes toward bypass |
| **Delivery fee** | Buyer | Flat rate, tiered one-to-one vs. pooled (₱150–250 ASSUMPTION) | At order placement | Cheaper than arranging own pickup; pooled tier cheaper once density exists | Pooled tier needs density to stay cheap |
| **Trade credit fee** | Buyer | Small % on credit-term orders (phase 2+) | When credit terms used | Gets 7–14 day float they can't get elsewhere | Requires UMA to hold real working capital |
| **Premium/contract accounts** | Buyer (hotels/resorts) | Fixed monthly or volume-tiered | Recurring | Predictable sourcing + dedicated service | Small buyer count at MVP — not launch-day revenue |
| **Supplier premium features** | Farmer | Optional fee for priority listing/visibility | Recurring | More visibility to buyers | Risky at MVP — adds friction to hardest side to onboard |

**Recommended for MVP**: Transaction commission + delivery fee only. Both tied to real transactions, no capital requirements, simple model.

**Avoid initially**: Trade-credit financing (requires capital reserves you likely don't have as a student project) and supplier premium features (adds friction). Flag both as Phase 2.

---

## PART 10: UNIT ECONOMICS (ILLUSTRATIVE)

**Example**: A carinderia orders ₱2,000 worth of vegetables, one-to-one delivery.

| Line item | Amount | Basis/Assumption |
|-----------|--------|------------------|
| **Produce order value** | ₱2,000 | Buyer input |
| **Delivery fee (one-to-one)** | ₱150 | **ASSUMPTION** — one-to-one tier rate |
| **Total charged to buyer** | ₱2,150 | |
| | | |
| **Commission (8% of produce)** | ₱160 | **ASSUMPTION** — rate within 5–8% range |
| **Farmer receives** | ₱1,840 | ₱2,000 − ₱160 commission |
| **Courier payout** | ₱100 | **ASSUMPTION** — per single-order delivery cost |
| **UMA logistics margin** | ₱50 | ₱150 − ₱100 |
| **Payment processing cost (~2%)** | ₱43 | **ASSUMPTION** — typical gateway rate on ₱2,150 |
| **Ops/support overhead** | ₱30 | **ASSUMPTION** — rough per-order cost |
| **Refund/loss allowance (~3%)** | ₱60 | **ASSUMPTION** — reserve for spoilage/disputes |
| | | |
| **UMA gross revenue** | ₱210 | Commission (₱160) + logistics margin (₱50) |
| **UMA costs** | ₱133 | Processing + ops + refund allowance |
| **Contribution margin** | ₱77 | ~3.6% of total transaction value |

**What this actually tells you**: 
- Margin is **thin per order** — this is a **volume business**, not high-margin
- Only works if order frequency is high (recurring weekly orders per buyer) and refund/loss rates stay low (~3%)
- If refund allowance creeps from 3% to 8% (bad month), contribution margin nearly disappears — **real fragility to name in defense, not hide**

**None of these percentages are real market data** — they're placeholder assumptions for illustrating mechanics. A real pilot needs actual Butuan courier rate quotes, actual payment gateway fees, actual farmer sourcing costs.

---

## PART 11: TRUST & VERIFICATION SYSTEM

| Actor | Verified How | Feeds Into |
|-------|--------------|-----------|
| **Farmer — identity** | Valid government ID at registration | Baseline account approval |
| **Farmer — legitimacy/location** | Barangay agri-office or farmer association confirmation (no farm visit at MVP) | Verified badge; unverified farmers capped at low order volume |
| **Farmer — product/quality** | No lab testing at MVP — photo evidence at pickup + buyer feedback over time | Reliability score, not a hard gate |
| **Business — identity** | Valid ID of registered contact | Baseline approval |
| **Business — legitimacy** | Business permit or DTI/BIR registration | Verified badge; unverified may be COD-only or volume-capped |
| **Business — payment ability** | Payment method on file, transaction history | Eligibility for trade-credit terms later (not at MVP) |
| **Business — delivery address** | Confirmed via first delivery / pin location | Route planning accuracy |
| **Courier — identity** | Valid ID, driver's license (if motorized) | Baseline approval |
| **Courier — vehicle** | Registration/OR-CR check (if motorized) | Route/capacity assignment |
| **Courier — reliability** | Delivery timeliness + proof-of-delivery completion rate over time | Route priority; repeated failures reduce assignments |

**How this feeds disputes/suspension**: Verification status doesn't guarantee good behavior — it's the entry gate. **Reliability scores** (built from actual completed transactions) drive visibility, priority, and the 3-strike suspension rule from Part 8.

**Honest limitation**: No farm visits, no lab testing, no ID database cross-check at MVP — real gap, not fully closed. Acceptable tradeoff for a pilot, not something to claim as absolute.

---

## PART 12: FRESHNESS & QUALITY SYSTEM

**Being upfront**: This is the hardest part to make credible. **No absolute "freshness guaranteed" claims** — process controls only.

| Element | How It Works |
|---------|-------------|
| **Harvest date** | Farmer declares expected harvest date at listing; locked in once order confirmed |
| **Listing-to-delivery gap** | Delivery must occur within fixed window of harvest (e.g., same day or next day, crop-dependent) — enforced by route scheduling |
| **Expected shelf life** | Reference table per crop (leafy greens: 1–2 days; root crops: 5–7 days) sets delivery deadline, not exact freshness promise |
| **Photos** | Required at pickup (condition leaving farm) + delivery (condition arriving) — actual evidence trail |
| **Quality grades** | Simple self-declared tier at listing (Grade A / Standard) — not independently verified at MVP |
| **Buyer inspection** | Buyer checks at drop-off before signing proof of delivery — actual quality gate |
| **Temperature-sensitive items** | Excluded from MVP — no cold-chain capability yet; only ambient-stable crops |
| **Packaging** | Basic standard (crates/sacks, no loose) required for pickup acceptance |
| **Rejection rules** | Buyer can reject at drop-off before signing; rejected items go through dispute flow |
| **Refund rules** | Refund only if delivery photo shows visible defect matching complaint, or delivery exceeded shelf-life window |

**One sentence for your defense**: "UMA doesn't guarantee freshness — it guarantees a process (harvest-to-delivery time limits, photo evidence, buyer inspection before acceptance) that makes freshness likely and disputes resolvable." **That's defensible.** "We guarantee fresh produce" is not.

---

## PART 13: UMA COURIER AS ITS OWN SYSTEM

### Courier Operations

| Element | How It Works |
|---------|-------------|
| **Onboarding** | ID + license/OR-CR (if motorized); orientation on pickup/delivery proof process |
| **Route assignment** | One-to-one: nearest available. Pooled: pre-planned route once orders overlap |
| **Route optimization** | MVP: manual grouping by barangay proximity + time window (not algorithmic yet) |
| **Pickup verification** | Scans listing ID, photographs quantity + condition at pickup |
| **QR/order codes** | Each order gets code shown to courier and buyer; scanned at pickup and drop-off |
| **Proof of pickup** | Photo + timestamp + farmer confirmation in-app |
| **Proof of delivery** | Photo + buyer signature/confirmation; closes order + triggers farmer payment |
| **Failed delivery** | Buyer unreachable/refuses: courier logs attempt w/ photo, order flagged for admin, farmer still paid |
| **Damage (courier-caused)** | Pickup photo vs. delivery photo comparison; courier reliability docked, buyer refunded from UMA allowance |
| **Courier compensation** | Flat per-delivery (one-to-one); per-stop rate (lower, multiple stops) for pooled |
| **Delivery pricing** | One-to-one priced higher (true cost); pooled priced lower |
| **Batching** | Only activates once 2+ orders overlap in time + geography — not forced early |
| **Geographic limits** | Hard radius cap (Part 15) — no routes UMA can't service profitably |

### Employment Model Comparison

| Model | Pros | Cons |
|-------|------|------|
| **A. Employ couriers** | Full control, consistent quality | High fixed cost, payroll/benefits — unrealistic for MVP |
| **B. Independent contractors** | Low fixed cost, flexible scaling | Philippine gig-labor classification legally unsettled — regulatory exposure |
| **C. Partner with existing logistics** | Zero fleet burden, fastest launch | Less control over quality/branding; margin shared |
| **D. Hybrid** | Start with partner/contractor, bring in-house once volume justifies | More operational complexity, but realistic |

**Recommended for MVP**: **Option C** (partner with existing local logistics/motorcycle couriers), moving toward **Option D** (hybrid) once volume proven. Avoids labor-classification risk and keeps capital near zero.

---

## PART 15: GEOGRAPHY & LAUNCH STRATEGY

### Factors Driving Location Choice

| Factor | How It Should Drive Decision |
|--------|------------------------------|
| **Farm concentration** | Pick a barangay/municipality near Butuan with an active vegetable-farming cluster — density matters more than total count spread thin |
| **Business concentration** | Enough canteens/carinderias/small restaurants within short radius to make pooling eventually feasible |
| **Road accessibility** | Route must be passable year-round by vehicle type (motorcycle vs. multicab) — flood-prone routes during rainy season are real risks |
| **Delivery radius** | Hard cap (e.g., 15–20km) so no route costs more than order is worth |
| **Demand density** | Prioritize institutional buyers already ordering vegetables regularly (existing canteens) |
| **Supply density** | Prefer farmers growing complementary crops (tomatoes + eggplant + squash together) over scattered single crops |
| **Competition** | Avoid areas where AgriBOOST already has strong relationships — pick adjacent, underserved barangays |
| **Logistics cost** | Model one full route cost (fuel + courier pay) against produce value before committing |

### Phased Expansion

- **Phase 1**: One barangay/municipality cluster, 5–10 farmers, 5–10 institutional buyers, one-to-one delivery
- **Phase 2**: Same area, once density allows — activate pooled/batch routing, layer trade-credit terms for repeat buyers
- **Phase 3**: Adjacent barangay/municipality with similar density profile, repeat playbook — not a jump to new city

**Assumption flag**: No real data on which specific Butuan-area barangay has actual farm/restaurant density — needs local field verification, not named as fact.

---

## PART 16: RISK REGISTER

| Risk | Probability | Impact | Early Warning Sign | Mitigation | Contingency |
|------|-------------|--------|-------------------|-----------|------------|
| **Courier no-shows/breakdowns** | Medium | High | Rising missed-pickup rate | Backup courier pool, partnered (not owned) fleet at MVP | Manual reassignment, delayed-delivery notice |
| **Supply/demand mismatch at launch** | High | High | Unmatched listings, no available supply | Small matched cohort launch (pre-committed farmers/buyers) | Pause buyer onboarding until supply catches up |
| **Thin per-order margin** | Medium | High | Refund/loss rate >5% | Cap refund allowance, tighten dispute evidence rules | Raise commission or delivery fee incrementally |
| **Cash flow if trade credit added too early** | Low at MVP | High if attempted | Buyer non-payment on credit terms | Don't launch credit until reserves exist | Suspend credit, revert to pay-on-delivery |
| **Platform downtime during cutoff windows** | Low-Med | Medium | Missed cutoffs, complaints | Basic uptime monitoring, simple stack at MVP scale | Manual order-taking fallback (phone/SMS) |
| **Courier labor classification (legal)** | Medium | High | Regulatory inquiry or courier dispute | Use logistics partner, not direct contractor control, at MVP | Legal consult before shift toward owned fleet |
| **Business registration/tax compliance** | Medium | Medium | N/A pre-launch | Register as required for pilot-to-real-business transition | Consult DTI/BIR before accepting real payments at scale |
| **Food safety/contamination illness claim** | Low probability | Severe | Any buyer health complaint | Basic hygiene guidelines, ToS clarifying UMA as marketplace facilitator | Escalate to LGU health office immediately |
| **Disintermediation/bypass transactions** | Med-High | Medium | Repeat buyer-farmer pairs declining order frequency | Basket aggregation, trade credit (later), replacement guarantee | Accept as residual risk — not solvable to zero |
| **Fake accounts/reviews** | Low-Med | Medium | Rating clusters, duplicate device/IP | ID + permit verification gate | Manual review, account suspension |
| **Reputational — one bad incident public** | Low probability | High | Social media complaint (especially visible to you via Urian) | Fast, transparent dispute resolution | Public acknowledgment + fix, not silence |

**Pattern to name in defense**: Most highest-severity risks (legal, food safety, cash flow) are mitigated by what you **deliberately left out** of MVP (owned fleet, credit terms, cold chain) — not by things you built. **MVP's restraint is itself the risk management.**

---

## PART 17: THE PROFESSOR ATTACK TEST

### 10 Strongest Objections

1. **Once farmer and buyer trust each other, what stops direct transactions?**
   - *Disintermediation risk* — answered by five-layer lock

2. **Both farmer and buyer density must exist simultaneously — how do you get either side to join first?**
   - *Cold-start problem* — MVP mitigates by small matched cohort launch, not solved

3. **Your per-order margin is ~3.6% (Part 10) — how does this survive even mediocre refund rates?**
   - *Thin margin fragility* — answered by volume model, flagged as fragility to manage

4. **Mayani and AgriBOOST already exist — what's actually new?**
   - *Competitor legitimacy* — answered by hyperlocal/institutional-wedge positioning, not claimed as better

5. **Zero farm visits, no lab testing, no ID cross-check — how is anything "verified"?**
   - *Verification gap* — answered by scoping verification honestly as MVP-limited, not hiding it

6. **Running physical logistics (couriers, breakdowns, routes) is a completely different skill from software — do you have operational capability to execute?**
   - *Execution risk* — this is a real challenge; honesty on this is critical

7. **Courier labor model sits in legal gray zone — what's your actual answer?**
   - *Legal ambiguity* — answered by partner-first sequencing (Part 13), flagged as open risk for scaling

8. **"Freshness" is central to your value prop, but you've admitted you can't guarantee it — so what are you selling?**
   - *Promise gap* — answered by reframing as process guarantee, not absolute promise

9. **You have no real market data — no interviews, no pilot numbers, no farmer/buyer commitments. Everything is projection.**
   - *Evidence gap* — this is the weakest section; interviews before defense turn this from weakness to strength

10. **If this fails to reach density in your pilot area, is there any version of UMA that still works, or does the whole model collapse?**
    - *Model fragility* — answered by graceful degradation (becomes one-to-one brokering with thin margins, not total collapse)

### Which Are Genuinely Dangerous
**#2 (cold start), #3 (thin margin), #6 (operational capability), #9 (no real data)** — these aren't design flaws, they're existential risks. A panel pressing hard on any can break the pitch if you don't have rehearsed, honest answers.

### Which Can Be Solved Through Design
**#1 (disintermediation)** — five-layer lock | **#5 (verification)** — scoped honestly | **#8 (freshness)** — reframed as process

### Which Require Changing the Business Model
**#3 (margin)** — if loss rates run high, raise commission or adjust delivery fee structure | **#7 (courier legal status)** — scaling past MVP forces real legal decision

### What You Should NOT Claim in Your Presentation
- ❌ "UMA guarantees freshness"
- ❌ "UMA prevents farmers/buyers from bypassing the platform"
- ❌ Cite ₱2,150/₱77 numbers as real — always say "illustrative, assumption-based"
- ❌ Claim a specific launch barangay as validated — say "candidate area pending field verification"
- ❌ Claim UMA is more efficient than Mayani — say "differently positioned"

### Honest Bottom Line
If density never arrives, UMA degrades to one-to-one delivery-brokering with thin margins — **not a total collapse, but not the platform vision**. Say this plainly if asked; it's more credible than pretending failure isn't possible.

---

## PART 18: IMPLEMENTATION ROADMAP

### Pre-MVP (Weeks 1–2): Validation & Setup
- [ ] Talk to 3–5 actual farmers in candidate barangay (validate supply existence, willingness to list)
- [ ] Talk to 3–5 canteen/carinderia owners (validate sourcing pain, willingness to try platform)
- [ ] Choose launch barangay based on findings
- [ ] Set up basic legal structure (DTI registration, basic ToS draft)
- [ ] Identify logistics partner (local courier or motorcycle riders)

### MVP Build (Weeks 3–8): Core Platform & First Live Orders
- [ ] Build Farmer dashboard (registration → listing → order confirmation → payment tracking)
- [ ] Build Buyer dashboard (browse → order → delivery tracking → rate)
- [ ] Build Courier app (route assignment → pickup/delivery scanning → proof capture)
- [ ] Implement order matching logic (listing ↔ order quantity cap)
- [ ] Implement payment/payout system (pay-on-delivery)
- [ ] Basic rating system (farmer, buyer, courier)
- [ ] Admin dashboard (verification queue, dispute flagging)

### MVP Launch (Week 9): First Live Cohort
- [ ] Onboard 5–10 pre-validated farmers
- [ ] Onboard 5–10 pre-validated buyers (canteens/carinderias)
- [ ] Run 3–5 full transaction cycles (order → pickup → delivery → payment)
- [ ] Document learnings, iterate on bugs/UX friction

### Phase 1 Extension (Weeks 10–12): Stabilize & Expand Slightly
- [ ] Stabilize recurring orders (weekly or bi-weekly ordering pattern)
- [ ] Add backup-farmer auto-reroute logic (Part 4)
- [ ] Implement dispute flagging with photo evidence (Part 4)
- [ ] Measure: order frequency per buyer, repeat rate, refund rate, farmer reliability score trend

### Phase 2 Readiness (Weeks 13+): Plan, Don't Build Yet
- [ ] Analyze MVP data: is density/volume sustainable in this barangay?
- [ ] If yes → plan pooled delivery routing (not yet built, just documented)
- [ ] If no → iterate MVP further or consider expanding to adjacent barangay
- [ ] Plan trade-credit mechanics (Phase 2, after capital reserves exist)

### Future (Months 4+): Expansion & Scaling
- [ ] Replicate playbook to adjacent barangay (same density-first approach)
- [ ] Add pooled routing once density supports it
- [ ] Launch trade-credit terms for repeat buyers
- [ ] Premium account tiers (hotels/resorts with contract terms)

---

## Key Assumptions Summary

| Assumption | Source | Risk Level | Notes |
|-----------|--------|-----------|-------|
| 8% transaction commission is competitive | **Market research needed** | Medium | Needs actual bagsakan markup data |
| ₱150 one-to-one delivery fee is market-viable | **Market research needed** | Medium | Needs actual courier rate quotes |
| ~3% refund/loss rate is achievable | **Operational assumption** | High | Real data will only come from pilot |
| Butuan barangay X has viable farm/restaurant density | **Field verification needed** | High | Must validate on the ground |
| Farmers prefer recurring orders over bagsakan | **Farmer interviews needed** | High | Core value prop, not proven |
| Couriers will accept partner/contractor arrangement at MVP | **Needs logistics partner negotiation** | Medium | Avoids legal risk, but relies on partner availability |
| Cold-start can be solved by pre-committing 5–10 farmers + buyers | **Operational assumption** | High | This has to be true for MVP to launch |

---

## What to Submit to Your Professor

1. **This document** — the full 18-part blueprint
2. **A 2-page executive summary** — for quick skimming (start with this section of the document)
3. **The working prototype/landing page** (see next file — `UMA_LANDING_PAGE.html`)
4. **Database schema + sample data** (see `UMA_SETUP.md`)
5. **Field research notes** (even if just 2–3 farmer/buyer interview transcripts)

---

## Final Note on Defense

**You are not claiming UMA will definitely work.** You're claiming you've thought through why it might work, where it might fail, how you'd know if it's failing, and what you'd do differently if it is. That's the actual work of building something real. A professor who's seen actual businesses succeed and fail will respect that intellectual honesty far more than a polished deck with unsupported claims.

Go build it.

---

*Last updated: September 20, 2026*
*For questions or feedback, reference specific parts by number (e.g., "Part 4, disintermediation risk")*
