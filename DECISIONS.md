# Decision Log

[2026-04-07] Clubs booking flow — CTA behaviour
Decision: Primary CTA is "Pay now" (paid clubs) or "Book now" (free clubs). Secondary CTA is "Add to basket". Both CTAs live at the end of the session selection step, not on Review & Pay.
Rationale: Keeps Review & Pay as a single-purpose express checkout. Basket checkout is a separate screen designed later.

[2026-04-07] Clubs booking flow — Add to basket destination
Decision: After "Add to basket", user lands back on Browse with a toast notification containing a CTA to go to basket.
Rationale: Keeps the user in the browsing context so they can continue adding items.

[2026-04-07] Clubs booking flow — Free clubs
Decision: Free clubs show "Book now" as primary CTA. "Add to basket" still applies — place is reserved, 24hr expiry still counts.
Rationale: Consistent basket behaviour regardless of price. Simplifies checkout logic.

[2026-04-07] Clubs booking flow — No disabled states
Decision: Buttons are never disabled. If tapped without required input (e.g. no session selected), show an inline error message instead.
Rationale: Disabled elements are inaccessible to screen readers.

[2026-04-17] Clubs — Browse card schedule line display
Decision: Single line, two-tier format: days abbreviated (e.g. "Tue, Wed") · time if all sessions share one time, otherwise "Multiple times". Auto-computed from periods data via getClubScheduleLabel(); manual timeDisplay override still supported per item.
Rationale: Consistent card height aids scannability. Progressive disclosure — exact per-day times are visible in the club detail. Scales cleanly to 3+ day clubs without layout breakage.

[2026-04-17] Clubs — Multi-day club data model
Decision: Clubs running on multiple days with different times use a periods override array in clubExtras (instead of deriving from the browse item's single time field). Each period carries dayKey, days, start, end, price, and type. Session dates also carry dayKey so the choose-sessions screen can filter to the selected day.
Rationale: Keeps the booking flow day-specific (parent books Tuesdays OR Wednesdays, individually or as a block) without multiplying browse items. The periodsForClub() function checks for extras.periods and returns early, so single-day clubs are unaffected.

[2026-04-08] Book & Pay — Browse entry points
Decision: Clubs, Trips, and Wraparound each have their own dedicated entry point on the Book & Pay screen. Users never see a mixed-type list.
Rationale: Separate entry points mean each browse list is type-homogeneous — no need to visually distinguish items by type within a list. Per-type visual identity (e.g. accent bars) is unnecessary. Cards only need to differentiate individual items within a single category.

[2026-04-07] Clubs booking flow — Booking type selection
Decision: User chooses booking type (block vs individual) before entering the session picker, not during.
Rationale: Keeps session picker unambiguous; price shown in CTA is always correct for the chosen mode.

[2026-04-08] Book & Pay — Page background for card-based screens
Decision: Screens containing cards (booking options, review & pay, card entry) use a grey (#f5f5f5) full-page background. White cards on grey provide natural visual hierarchy without structural borders — unselected card borders (1px solid #e0e0e0) are removed on these screens; selected-state borders (brand colour) are kept. Detail pages (text only), session pickers (dense list/grid), and confirmed screens remain white.
Rationale: Consistent with established mobile UI patterns. Removes visual noise from structural borders while preserving selection feedback.

[2026-04-13] Breakfast club — Session membership model (Option B)
Decision: The two breakfast drop-off times (07:00 and 07:45) are modelled as separate session memberships in the MIS, not as drop-off windows for the same session. The booking options screen presents them as two sub-options within a single "Block booking" card, each with its own price (07:00 = £300 for the block; 07:45 = £280 for the block). Individual sessions remain a peer option at £5 per session.
Rationale: Reflects the Arbor MIS data model (Option B). Separate memberships have separate prices, so they must be distinguishable choices rather than a single booking with a time preference. Alternatives considered: one block card with a time picker after selection (Option A) — rejected because it misrepresents the underlying membership model and would require fake logic to reconcile prices.

[2026-04-15] Global date format standard
Decision: All dates across the app use the format "Mon 7 Apr" — short weekday (where applicable), numeric day without ordinal suffix, 3-letter month abbreviation. Ranges use "Mon 7 – Fri 11 Apr" (same month) or "7 Apr – 3 May" (cross-month). Term spans omit the weekday: "6 Apr – 17 Jul 2026". Year included on term spans for clarity, omitted on short-range dates where context is clear. Full weekday names and full month names are acceptable in message body prose only.
Rationale: Consistent, compact, and scan-friendly. Ordinal suffixes (1st, 2nd, 3rd etc.) add no information and create inconsistency across different day numbers.

[2026-04-15] My Bookings — Card sub text for multi-session clubs
Decision: For clubs booked across a full term (e.g. Drumming, 11 sessions), the card sub text shows the term date span ("6 Apr – 17 Jul 2026") rather than the day pattern ("Mondays"). Single-session and short-booking items continue to show the specific date or week range.
Rationale: The day pattern answers "how often" but not "when" — a parent scanning their bookings needs temporal context. The full date list is available via the sessions accordion on the detail page, so the card only needs the span. Alternatives considered: showing the first session date ("From 13 Apr") — rejected as it loses the sense of duration.

[2026-04-15] My Bookings — Sessions accordion month headers
Decision: Month section headers in the sessions accordion are only shown when dates span 2 or more distinct months. Single-month date lists render as a flat list with no header. In the flat path, render d.label (the full "Tue 8 Apr" string); in the multi-month path, render d.dayDisplay (month stripped, since the header provides it).
Rationale: Month headers are a navigation aid for scanning a long multi-month list. On a single-session or same-month booking they add visual weight with no benefit — one date under an "Apr 2026" header looks over-engineered.

[2026-04-15] Booking options — Card and price ordering
Decision: Where both individual and block booking are available, individual sessions is always presented first, block booking second. Applies to the booking options page (card order) and the club detail price section (price row order). Individual is also the default pre-selected option on the booking options page.
Rationale: Consistent with "From £X per session" anchor on the browse card. Individual → block is a natural low-to-high commitment escalation. Pre-selecting individual matches the first-visible option.

[2026-04-15] Clubs booking flow — Child attribution treatment
Decision: The child's name is shown as plain muted text ("For Molly", 12px, grey) below the day/time line in the card header, across all steps of the booking flow including the confirmed screen. The colored pill chip previously used in this position has been removed entirely.
Rationale: The colored chip was visually indistinguishable from a booking status indicator — feedback from designers noted it implied the club might already be booked, which could confuse two parents using the app simultaneously. Plain text reads as descriptive context ("you're booking this for Molly") rather than a status badge. Initials-only approach was also considered but rejected as ambiguous when two children share the same initial.

[2026-04-15] Browse cards — Price display by booking option availability
Decision: Price shown on browse cards (Clubs and Wraparound) follows three variants: (1) Individual only (individualOnly: true) → "£X" / "per session"; (2) All sessions only (blockOnly: true) → "£X" / "all sessions"; (3) Both options available (neither flag) → "From £X" / "per session". Free clubs are unaffected.
Rationale: The "From" prefix signals that multiple price points exist without committing to one, and anchors to the lower (individual) price. Showing a flat "per session" price when block booking is also available is misleading.

[2026-04-17] Sessions accordion — Past session display treatment
Decision: Past sessions use the same visual grammar as half term: strikethrough date text + a labelled chip. The chip reads "Past" (not "Attended" or "Completed") to remain neutral about attendance. Past sessions are collapsed behind a "Show N past sessions" toggle by default — they are secondary information in every context where they appear. The sessions header reads "X sessions remaining" (not the original total) when any sessions have passed.
Rationale: Consistent with half term treatment so the pattern is learnable. Collapsed by default keeps the focus on upcoming sessions without hiding the historical record. "Remaining" is more immediately useful than the booked total once the term is underway.

[2026-04-17] Sessions accordion — Past sessions by screen
Decision: Past sessions appear only on Club Details (browse) and My Bookings detail — the two contexts where a parent needs to understand what has already happened. They are silently filtered out on all booking flow screens: Booking Options "View dates", Choose Sessions picker, Review & Pay date list, and Booking Confirmed date list. The session count on Review & Pay and Confirmed reflects remaining sessions only (not the original block total).
Rationale: Showing past unbookable dates inside a booking flow is confusing — the parent cannot select them and they imply the club has already started, which may cause uncertainty about whether they can still book. The session count should match exactly what the parent is paying for. Outside the booking flow (Browse and My Bookings), past sessions provide useful context about where the term stands.

[2026-04-17] Booking options — Differentiating factor hierarchy
Decision: In the booking options card, the primary label on each row is the field that actually varies across options, not the school-defined name. If times vary → time slot (e.g. "07:00–08:30") is the headline, with name + days as secondary. If days vary → day coverage (e.g. "Mon–Wed") is the headline, with name + time as secondary. If both vary → days + time combined as headline, name as secondary. If neither varies (single option, or mixed model scenario where the differentiator is individual vs block) → name is the primary label, days + time below. The school name is always retained as secondary context.
Rationale: School-defined names ("Early Bird", "Standard") are unreliable as differentiators — schools name things inconsistently and the name may mean nothing to a parent. The differentiating factor is machine-readable (we know whether times or days vary) and is therefore a more reliable signal. Flipping the hierarchy means the parent immediately sees what is actually different between options without parsing the meta line.

[2026-04-16] Sessions accordion — Single-session display and "View dates" affordance
Decision: Two related rules govern the Sessions section across booking review, confirmed, club detail, and My bookings screens. (1) Where a booking has more than 1 session, the Sessions section shows the count on the left and a "View dates" link on the right (brand colour, underlined). Tapping expands an inline date list. (2) Where a booking has exactly 1 session — e.g. a single individually-booked Football session — the Sessions section shows the date directly below the "SESSIONS" label with no count, no link, and no accordion. Applies to all screens: club detail page, booking options (block booking sub-label), review & pay, booking confirmed, and My bookings & orders item detail.
Rationale: (1) The original chevron-only trigger on the count was ambiguous — parents in testing queried whether tapping it would let them change their dates. A labelled link ("View dates") with underline makes the action read-only and informational rather than configurable. (2) When only one session exists, an accordion adds no value and the single date is more immediately useful than a session count of "1". Collapsing it to plain text removes a redundant interaction step.

[2026-04-21] Absence Reporting — feature placement
Decision: Absence Reporting lives in My Child tab, not Book & Pay.
Rationale: Reporting an absence is pastoral/child-contextual, not a commerce action. Placing it in Book & Pay created an awkward category mismatch. My Child is the natural home for attendance-related actions. CLAUDE.md updated accordingly.

[2026-04-21] Absence Reporting — multi-day time fields
Decision: Multi-day absence form shows Start date + Start time (day one) and End date + End time (last day), giving four distinct fields.
Rationale: Supports partial-day boundaries (e.g. a 1.5-day absence that starts mid-morning). Avoids the ambiguity of a single time pair applying across a date range.

[2026-04-21] Absence Reporting — "Other" reason handling
Decision: Selecting "Other (please give details)" surfaces a mandatory separate text area ("Please give details *") inside the REASON section. The optional Note to school field remains available for any reason.
Rationale: Keeps the optional note genuinely optional and not overloaded. The "Other" details box is a distinct required field so validation can target it specifically.

[2026-04-21] Absence Reporting — Cancel behaviour
Decision: Tapping Cancel on the absence form always shows a "Discard absence report?" confirmation sheet with Discard / Keep editing options.
Rationale: Prevents accidental loss of partially entered data. Consistent with the defined AC14 design pattern of "discarded with clear feedback".

[2026-04-21] Absence Reporting — success screen primary CTA
Decision: Primary CTA on the success screen is "Back to home" (navigates to Home tab). Secondary link is "Report another absence" (resets and reopens the form).
Rationale: Home is the most likely next destination after reporting — parents want to see their household summary, not the My Child landing page. Returning to My Child would feel like a dead end with only the report card visible.

[2026-04-24] Absence Reporting — session-based time picker not used
Decision: Kept time pickers (not AM/PM/All day session toggles) for the absence form. No per-day time fields for multi-day absences. Day count removed from the success screen confirmation card.
Rationale: Session-based toggles work for primaries but break for secondaries — secondary MIS systems record lesson-level attendance and calculate minutes late, so exact times matter. A session toggle would over-mark periods for a partial-day secondary absence. Per-day time pickers were considered but add significant form complexity for an edge case. The current single start/end time pair covers the majority of absence patterns (full illness, full days). Known gap: a parent cannot express "all of Monday, half of Tuesday" in one report — they would need to submit two separate reports. Day count was removed from the success card because it misleads when times indicate a partial final day.

[2026-04-24] Absence Reporting — custom MobileDatePicker instead of @tonyarbor DatePicker
Decision: Built a custom MobileDatePicker component inline in ParentApp.jsx rather than using @tonyarbor/components DatePicker.
Rationale: The npm DatePicker uses @radix-ui/react-popover with Popover.Portal, which renders the calendar into document.body and escapes the 390px prototype container. The custom component renders the calendar inline (no portal) so it stays scoped to the phone frame. Visual design matches the npm component: month/year dropdowns, week grid, Today shortcut, token colours throughout.
