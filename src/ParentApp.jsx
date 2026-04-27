import { useState, useEffect, useRef } from "react";
import womanParent from "./assets/woman-parent.png";
import BottomNavBar from "./BottomNavBar.jsx";
import { Avatar, Button, Card, Checkbox, Toggle, Input, TextArea, Tag, Banner, DatePicker, Combobox, Toast } from '@tonyarbor/components';
import { CircleUserRound, Lock, Bell, Info, User, School, Shapes, Bus, SunMoon, Utensils, ShoppingBag, MapPin, Users, ChevronLeft, ChevronRight, X, Calendar, Clock, ClipboardList, MessageCircle } from 'lucide-react';

const children = [
  { id: 1, name: "Molly", initials: "M", school: "Oakwood Primary",    avatarColour: { bg: "#eeebf4", border: "#e2dcef", text: "#472b61" } }, // purple
  { id: 2, name: "Lucas", initials: "L", school: "Oakwood Primary",    avatarColour: { bg: "#e4f4f3", border: "#cbefed", text: "#0a685b" } }, // teal
  { id: 3, name: "Ethan", initials: "E", school: "Riverside Secondary", avatarColour: { bg: "#f7eed8", border: "#efe0bc", text: "#7e3e00" } }, // orange
];

const catColours = {
  "Club":             { bg: "#EAF4F3", iconColor: "#6FA8A6" },
  "Wraparound":       { bg: "#EAF4F3", iconColor: "#6FA8A6" },
  "Trip":             { bg: "#EAF4F3", iconColor: "#6FA8A6" },
  "Meals":            { bg: "#EAF4F3", iconColor: "#6FA8A6" },
  "Parents' evening": { bg: "#EAF4F3", iconColor: "#6FA8A6" },
  "Shop":             { bg: "#EAF4F3", iconColor: "#6FA8A6" },
};

const drummingSessionDates = [
  { id: "s1-apr13", label: "Mon 13 Apr", past: true },
  { id: "s1-apr20", label: "Mon 20 Apr", past: true },
  { id: "s1-apr27", label: "Mon 27 Apr", past: true },
  { id: "s1-may4",  label: "Mon 4 May" },
  { id: "s1-may11", label: "Mon 11 May" },
  { id: "s1-may18", label: "Mon 18 May" },
  { id: "s1-may25", label: "Mon 25 May", active: false, note: "Half term" },
  { id: "s1-jun1",  label: "Mon 1 Jun" },
  { id: "s1-jun8",  label: "Mon 8 Jun" },
  { id: "s1-jun15", label: "Mon 15 Jun" },
];

const breakfastSessionDates = [
  { id: "bk-apr14", label: "Mon 14 Apr", active: true,  weekLabel: "14–18 Apr" },
  { id: "bk-apr15", label: "Tue 15 Apr", active: true  },
  { id: "bk-apr16", label: "Wed 16 Apr", active: true  },
  { id: "bk-apr17", label: "Thu 17 Apr", active: true  },
  { id: "bk-apr18", label: "Fri 18 Apr", active: true  },
  { id: "bk-apr21", label: "Mon 21 Apr", active: true,  weekLabel: "21–25 Apr" },
  { id: "bk-apr22", label: "Tue 22 Apr", active: true  },
  { id: "bk-apr23", label: "Wed 23 Apr", active: true  },
  { id: "bk-apr24", label: "Thu 24 Apr", active: true  },
  { id: "bk-apr25", label: "Fri 25 Apr", active: true  },
  { id: "bk-apr28", label: "Mon 28 Apr", active: true,  weekLabel: "28 Apr – 2 May" },
  { id: "bk-apr29", label: "Tue 29 Apr", active: true  },
  { id: "bk-apr30", label: "Wed 30 Apr", active: true  },
  { id: "bk-may1",  label: "Thu 1 May",  active: true  },
  { id: "bk-may2",  label: "Fri 2 May",  active: true  },
  { id: "bk-may5",  label: "Mon 5 May",  active: true,  weekLabel: "5–9 May" },
  { id: "bk-may6",  label: "Tue 6 May",  active: true  },
  { id: "bk-may7",  label: "Wed 7 May",  active: true  },
  { id: "bk-may8",  label: "Thu 8 May",  active: true  },
  { id: "bk-may9",  label: "Fri 9 May",  active: true  },
  { id: "bk-may12", label: "Mon 12 May", active: true,  weekLabel: "12–16 May" },
  { id: "bk-may13", label: "Tue 13 May", active: true  },
  { id: "bk-may14", label: "Wed 14 May", active: true  },
  { id: "bk-may15", label: "Thu 15 May", active: true  },
  { id: "bk-may16", label: "Fri 16 May", active: true  },
  { id: "bk-may19", label: "Mon 19 May", active: true,  weekLabel: "19–23 May" },
  { id: "bk-may20", label: "Tue 20 May", active: true  },
  { id: "bk-may21", label: "Wed 21 May", active: true  },
  { id: "bk-may22", label: "Thu 22 May", active: true  },
  { id: "bk-may23", label: "Fri 23 May", active: true  },
  { id: "bk-ht1",   label: "Mon 26 May", active: false, note: "Half term", weekLabel: "26–30 May" },
  { id: "bk-ht2",   label: "Tue 27 May", active: false, note: "Half term" },
  { id: "bk-ht3",   label: "Wed 28 May", active: false, note: "Half term" },
  { id: "bk-ht4",   label: "Thu 29 May", active: false, note: "Half term" },
  { id: "bk-ht5",   label: "Fri 30 May", active: false, note: "Half term" },
  { id: "bk-jun2",  label: "Mon 2 Jun",  active: true,  weekLabel: "2–6 Jun" },
  { id: "bk-jun3",  label: "Tue 3 Jun",  active: true  },
  { id: "bk-jun4",  label: "Wed 4 Jun",  active: true  },
  { id: "bk-jun5",  label: "Thu 5 Jun",  active: true  },
  { id: "bk-jun6",  label: "Fri 6 Jun",  active: true  },
  { id: "bk-jun9",  label: "Mon 9 Jun",  active: true,  weekLabel: "9–13 Jun" },
  { id: "bk-jun10", label: "Tue 10 Jun", active: true  },
  { id: "bk-jun11", label: "Wed 11 Jun", active: true  },
  { id: "bk-jun12", label: "Thu 12 Jun", active: true  },
  { id: "bk-jun13", label: "Fri 13 Jun", active: true  },
  { id: "bk-jun16", label: "Mon 16 Jun", active: true,  weekLabel: "16–20 Jun" },
  { id: "bk-jun17", label: "Tue 17 Jun", active: true  },
  { id: "bk-jun18", label: "Wed 18 Jun", active: true  },
  { id: "bk-jun19", label: "Thu 19 Jun", active: true  },
  { id: "bk-jun20", label: "Fri 20 Jun", active: true  },
  { id: "bk-jun23", label: "Mon 23 Jun", active: true,  weekLabel: "23–27 Jun" },
  { id: "bk-jun24", label: "Tue 24 Jun", active: true  },
  { id: "bk-jun25", label: "Wed 25 Jun", active: true  },
  { id: "bk-jun26", label: "Thu 26 Jun", active: true  },
  { id: "bk-jun27", label: "Fri 27 Jun", active: true  },
  { id: "bk-jun30", label: "Mon 30 Jun", active: true,  weekLabel: "30 Jun – 4 Jul" },
  { id: "bk-jul1",  label: "Tue 1 Jul",  active: true  },
  { id: "bk-jul2",  label: "Wed 2 Jul",  active: true  },
  { id: "bk-jul3",  label: "Thu 3 Jul",  active: true  },
  { id: "bk-jul4",  label: "Fri 4 Jul",  active: true  },
  { id: "bk-jul7",  label: "Mon 7 Jul",  active: true,  weekLabel: "7–11 Jul" },
  { id: "bk-jul8",  label: "Tue 8 Jul",  active: true  },
  { id: "bk-jul9",  label: "Wed 9 Jul",  active: true  },
  { id: "bk-jul10", label: "Thu 10 Jul", active: true  },
  { id: "bk-jul11", label: "Fri 11 Jul", active: true  },
];

// Booking model scenarios for the breakfast club prototype.
// S1: single individual, S2: single block, S3: multi individual, S4: multi block, S5: mixed.
const bkPeriodsS1 = [
  { id: "standard-daily",   name: "Standard",  type: "daily",  days: "Mon–Fri", start: "07:30", end: "08:15", price: 5,   sessionsRemaining: null },
];
const bkPeriodsS2 = [
  { id: "standard-termly",  name: "Standard",  type: "termly", days: "Mon–Fri", start: "07:30", end: "08:15", price: 260, sessionsRemaining: 52 },
];
const bkPeriodsS3 = [
  { id: "early-bird-daily",  name: "Early Bird",  type: "daily", days: "Mon–Fri", start: "07:00", end: "08:30", price: 6, sessionsRemaining: null },
  { id: "standard-daily",    name: "Standard",    type: "daily", days: "Mon–Fri", start: "07:30", end: "08:15", price: 5, sessionsRemaining: null },
  { id: "late-start-daily",  name: "Late Start",  type: "daily", days: "Mon–Fri", start: "07:45", end: "08:30", price: 4, sessionsRemaining: null },
];
const bkPeriodsS4 = [
  { id: "mon-wed-termly", name: "Short week", type: "termly", days: "Mon–Wed", start: "07:30", end: "08:15", price: 156, sessionsRemaining: 31 },
  { id: "mon-fri-termly", name: "Full week",  type: "termly", days: "Mon–Fri", start: "07:30", end: "08:15", price: 260, sessionsRemaining: 52 },
];
const bkPeriodsS5 = [
  { id: "standard-daily",   name: "Standard",  type: "daily",  days: "Mon–Fri", start: "07:30", end: "08:15", price: 5,   sessionsRemaining: null },
  { id: "standard-termly",  name: "Standard",  type: "termly", days: "Mon–Fri", start: "07:30", end: "08:15", price: 260, sessionsRemaining: 52 },
];

// Converts a regular club browse item + its clubExtras into the period format
// used by the unified booking options card.
const periodsForClub = (clubItem, extras) => {
  if (!extras) return [];
  if (extras.periods) return extras.periods;
  const [start, end] = clubItem.time.split("–");
  const base = { days: clubItem.days, start, end, name: clubItem.title };
  if (extras.isFree) {
    if (clubItem.individualOnly) {
      return [{ ...base, id: `${clubItem.id}-daily`,  type: "daily",  price: 0, sessionsRemaining: null }];
    }
    return   [{ ...base, id: `${clubItem.id}-termly`, type: "termly", price: 0, sessionsRemaining: extras.blockSessions }];
  }
  if (clubItem.blockOnly) {
    return   [{ ...base, id: `${clubItem.id}-termly`, type: "termly", price: extras.blockPrice,        sessionsRemaining: extras.blockSessions }];
  }
  if (clubItem.individualOnly) {
    return   [{ ...base, id: `${clubItem.id}-daily`,  type: "daily",  price: extras.perSessionPrice,   sessionsRemaining: null }];
  }
  // Both options available → mixed (S5 equivalent)
  return [
    { ...base, id: `${clubItem.id}-daily`,  type: "daily",  price: extras.perSessionPrice, sessionsRemaining: null },
    { ...base, id: `${clubItem.id}-termly`, type: "termly", price: extras.blockPrice,       sessionsRemaining: extras.blockSessions },
  ];
};

// Returns the schedule line for a club card or detail header.
// For multi-day clubs with a periods override, deduplicates days and detects
// whether times vary. Falls back to item.timeDisplay or the raw days/time fields.
const getClubScheduleLabel = (item, extras) => {
  if (extras?.periods) {
    const seenDays = new Set();
    const orderedDays = [];
    extras.periods.forEach(p => {
      if (!seenDays.has(p.days)) { seenDays.add(p.days); orderedDays.push(p.days.slice(0, 3)); }
    });
    const uniqueTimes = new Set(extras.periods.map(p => `${p.start}\u2013${p.end}`));
    return `${orderedDays.join(", ")} \u00b7 ${uniqueTimes.size === 1 ? [...uniqueTimes][0] : "Multiple times"}`;
  }
  return item.timeDisplay || `${item.days} \u00b7 ${item.time}`;
};

// Returns structured schedule parts for the details page.
// When days have different times, returns { multiDay: true, days, times } for two-line rendering.
// When times are uniform, returns { multiDay: false, label } for single-line rendering.
const getClubScheduleDetailParts = (item, extras) => {
  if (extras?.periods) {
    const seen = new Map();
    extras.periods.forEach(p => {
      if (!seen.has(p.days)) seen.set(p.days, { shortDay: p.days.slice(0, 3), time: `${p.start}\u2013${p.end}` });
    });
    const entries = [...seen.values()];
    const uniqueTimes = new Set(entries.map(e => e.time));
    if (uniqueTimes.size === 1) {
      return { multiDay: false, label: `${entries.map(e => e.shortDay).join(", ")} \u00b7 ${[...uniqueTimes][0]}` };
    }
    return { multiDay: true, days: entries.map(e => e.shortDay).join(", "), times: entries.map(e => e.time).join(", ") };
  }
  return { multiDay: false, label: item.timeDisplay || `${item.days} \u00b7 ${item.time}` };
};

const afterSchoolClubConfigs = {
  mon: {
    name: "Monday After School Club", timeDisplay: "Mondays", dayOrder: [1],
    sessionDates: [
      { id: "as-mon-apr14", date: "Mon 14 Apr", active: true },
      { id: "as-mon-apr21", date: "Mon 21 Apr", active: true },
      { id: "as-mon-apr28", date: "Mon 28 Apr", active: true },
      { id: "as-mon-may5",  date: "Mon 5 May",  active: true },
      { id: "as-mon-may12", date: "Mon 12 May", active: true },
      { id: "as-mon-may19", date: "Mon 19 May", active: true },
      { id: "as-mon-may26", date: "Mon 26 May", active: false, note: "Half term" },
      { id: "as-mon-jun2",  date: "Mon 2 Jun",  active: true },
      { id: "as-mon-jun9",  date: "Mon 9 Jun",  active: true },
      { id: "as-mon-jun16", date: "Mon 16 Jun", active: true },
      { id: "as-mon-jun23", date: "Mon 23 Jun", active: true },
      { id: "as-mon-jun30", date: "Mon 30 Jun", active: true },
      { id: "as-mon-jul7",  date: "Mon 7 Jul",  active: true },
    ],
  },
  tue: {
    name: "Tuesday After School Club", timeDisplay: "Tuesdays", dayOrder: [2],
    sessionDates: [
      { id: "as-tue-apr15", date: "Tue 15 Apr", active: true },
      { id: "as-tue-apr22", date: "Tue 22 Apr", active: true },
      { id: "as-tue-apr29", date: "Tue 29 Apr", active: true },
      { id: "as-tue-may6",  date: "Tue 6 May",  active: true },
      { id: "as-tue-may13", date: "Tue 13 May", active: true },
      { id: "as-tue-may20", date: "Tue 20 May", active: true },
      { id: "as-tue-may27", date: "Tue 27 May", active: false, note: "Half term" },
      { id: "as-tue-jun3",  date: "Tue 3 Jun",  active: true },
      { id: "as-tue-jun10", date: "Tue 10 Jun", active: true },
      { id: "as-tue-jun17", date: "Tue 17 Jun", active: true },
      { id: "as-tue-jun24", date: "Tue 24 Jun", active: true },
      { id: "as-tue-jul1",  date: "Tue 1 Jul",  active: true },
      { id: "as-tue-jul8",  date: "Tue 8 Jul",  active: true },
    ],
  },
  wed: {
    name: "Wednesday After School Club", timeDisplay: "Wednesdays", dayOrder: [3],
    sessionDates: [
      { id: "as-wed-apr16", date: "Wed 16 Apr", active: true },
      { id: "as-wed-apr23", date: "Wed 23 Apr", active: true },
      { id: "as-wed-apr30", date: "Wed 30 Apr", active: true },
      { id: "as-wed-may7",  date: "Wed 7 May",  active: true },
      { id: "as-wed-may14", date: "Wed 14 May", active: true },
      { id: "as-wed-may21", date: "Wed 21 May", active: true },
      { id: "as-wed-may28", date: "Wed 28 May", active: false, note: "Half term" },
      { id: "as-wed-jun4",  date: "Wed 4 Jun",  active: true },
      { id: "as-wed-jun11", date: "Wed 11 Jun", active: true },
      { id: "as-wed-jun18", date: "Wed 18 Jun", active: true },
      { id: "as-wed-jun25", date: "Wed 25 Jun", active: true },
      { id: "as-wed-jul2",  date: "Wed 2 Jul",  active: true },
      { id: "as-wed-jul9",  date: "Wed 9 Jul",  active: true },
    ],
  },
  thu: {
    name: "Thursday After School Club", timeDisplay: "Thursdays", dayOrder: [4],
    sessionDates: [
      { id: "as-thu-apr17", date: "Thu 17 Apr", active: true },
      { id: "as-thu-apr24", date: "Thu 24 Apr", active: true },
      { id: "as-thu-may1",  date: "Thu 1 May",  active: true },
      { id: "as-thu-may8",  date: "Thu 8 May",  active: true },
      { id: "as-thu-may15", date: "Thu 15 May", active: true },
      { id: "as-thu-may22", date: "Thu 22 May", active: true },
      { id: "as-thu-may29", date: "Thu 29 May", active: false, note: "Half term" },
      { id: "as-thu-jun5",  date: "Thu 5 Jun",  active: true },
      { id: "as-thu-jun12", date: "Thu 12 Jun", active: true },
      { id: "as-thu-jun19", date: "Thu 19 Jun", active: true },
      { id: "as-thu-jun26", date: "Thu 26 Jun", active: true },
      { id: "as-thu-jul3",  date: "Thu 3 Jul",  active: true },
      { id: "as-thu-jul10", date: "Thu 10 Jul", active: true },
    ],
  },
  fri: {
    name: "Friday After School Club", timeDisplay: "Fridays", dayOrder: [5],
    sessionDates: [
      { id: "as-fri-apr18", date: "Fri 18 Apr", active: true },
      { id: "as-fri-apr25", date: "Fri 25 Apr", active: true },
      { id: "as-fri-may2",  date: "Fri 2 May",  active: true },
      { id: "as-fri-may9",  date: "Fri 9 May",  active: true },
      { id: "as-fri-may16", date: "Fri 16 May", active: true },
      { id: "as-fri-may23", date: "Fri 23 May", active: true },
      { id: "as-fri-may30", date: "Fri 30 May", active: false, note: "Half term" },
      { id: "as-fri-jun6",  date: "Fri 6 Jun",  active: true },
      { id: "as-fri-jun13", date: "Fri 13 Jun", active: true },
      { id: "as-fri-jun20", date: "Fri 20 Jun", active: true },
      { id: "as-fri-jun27", date: "Fri 27 Jun", active: true },
      { id: "as-fri-jul4",  date: "Fri 4 Jul",  active: true },
      { id: "as-fri-jul11", date: "Fri 11 Jul", active: true },
    ],
  },
};
// Derive termWeeks from sessionDates for each config
Object.values(afterSchoolClubConfigs).forEach(cfg => {
  cfg.termWeeks = cfg.sessionDates.map(d => ({ label: d.date, active: d.active }));
});

const bottomNav = [
  { id: "home", label: "Home" },
  { id: "my-child", label: "My child" },
  { id: "book-pay", label: "Book & Pay" },
  { id: "messages", label: "Messages" },
];

function ChildSwitcher({ selectedChild, onSwitch }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const otherChildren = children.filter((c) => c.id !== selectedChild.id);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        className="btn-pill"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 32,
          background: "#fff",
          border: "1px solid #dfdfdf",
          borderRadius: 20,
          padding: "0 10px 0 6px",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 12,
        }}
      >
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: selectedChild.avatarColour.bg, border: `1px solid ${selectedChild.avatarColour.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 400, color: selectedChild.avatarColour.text, lineHeight: 1 }}>{selectedChild.initials}</span>
        </div>
        <span style={{ color: "#2f2f2f", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selectedChild.name}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            marginLeft: 2,
          }}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="#666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
            zIndex: 100,
            minWidth: 150,
          }}
        >
          {otherChildren.map((child) => (
            <button
              key={child.id}
              className="dropdown-item"
              onClick={() => {
                onSwitch(child);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "10px 14px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 14,
                color: "#333",
              }}
            >
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: child.avatarColour.bg, border: `1px solid ${child.avatarColour.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 400, color: child.avatarColour.text, lineHeight: 1 }}>{child.initials}</span>
              </div>
              {child.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TopNav({ selectedChild, onSwitchChild, hideChildSwitcher, onProfileOpen }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.08)",
        background: "#fff",
        flexShrink: 0,
      }}
    >
      {/* School logo placeholder */}
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", border: "1px solid #efefef", flexShrink: 0 }} />

      {/* Right side: child switcher + profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ visibility: hideChildSwitcher ? "hidden" : "visible", pointerEvents: hideChildSwitcher ? "none" : "auto" }}>
          <ChildSwitcher
            selectedChild={selectedChild}
            onSwitch={onSwitchChild}
          />
        </div>

        {/* Parent avatar */}
        <button
          onClick={onProfileOpen}
          className="btn-icon"
          style={{ width: 32, height: 32, borderRadius: "50%", background: "#f8f8f8", border: "1px solid #efefef", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: "#2f2f2f", letterSpacing: "0.01em" }}>KB</span>
        </button>
      </div>
    </div>
  );
}

function BottomNav({ activeTab, onTabChange, unreadCount }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "8px 0 12px",
        boxShadow: "0 -1px 0 rgba(0,0,0,0.06)",
        background: "#fafafa",
        flexShrink: 0,
      }}
    >
      {bottomNav.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
              fontFamily: "inherit",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                background: isActive ? "#999" : "#d9d9d9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {item.id === "messages" && unreadCount > 0 && (
                <div style={{ position: "absolute", top: -4, right: -6, minWidth: 16, height: 16, borderRadius: 8, background: "#d44", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>{unreadCount}</div>
              )}
              {item.id === "home" && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7L7 2L12 7V12H9V9H5V12H2V7Z" stroke={isActive ? "#fff" : "#888"} strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              )}
              {item.id === "messages" && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1.5" y="2.5" width="11" height="8" rx="1" stroke={isActive ? "#fff" : "#888"} strokeWidth="1.2" />
                  <path d="M2 3L7 7L12 3" stroke={isActive ? "#fff" : "#888"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {item.id === "my-child" && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="5" r="2.5" stroke={isActive ? "#fff" : "#888"} strokeWidth="1.2" />
                  <path d="M2.5 13C2.5 10.5 4.5 8.5 7 8.5C9.5 8.5 11.5 10.5 11.5 13" stroke={isActive ? "#fff" : "#888"} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
              {item.id === "book-pay" && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1.5" y="3" width="11" height="8.5" rx="1" stroke={isActive ? "#fff" : "#888"} strokeWidth="1.2" />
                  <path d="M1.5 6H12.5" stroke={isActive ? "#fff" : "#888"} strokeWidth="1.2" />
                </svg>
              )}
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#333" : "#999",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function BookingConfirmedScreen({ isMobile, clubName, childName, days, time, location, clubLead, periodLabel, sessionCount, dates, isFree, total, onClose, onGoToBookings, confirmedDatesExpanded, setConfirmedDatesExpanded, bookingNudgeRating, setBookingNudgeRating }) {
  const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const futureDates = (dates || []).filter(d => d.active !== false);

  const renderDates = () => {
    const groups = {};
    futureDates.forEach(d => {
      const parts = d.label.split(" ");
      const month = parts[parts.length - 1];
      const dayDisplay = parts.slice(0, -1).join(" ");
      if (!groups[month]) groups[month] = [];
      groups[month].push({ ...d, dayDisplay });
    });
    const sortedMonths = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
    return (
      <div style={{ marginTop: 28 }}>
        {sortedMonths.map((month, mi) => (
          <div key={month} style={{ marginBottom: mi < sortedMonths.length - 1 ? 20 : 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{month} 2026</div>
            {groups[month].map(d => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--color-grey-100)" }}>
                <span style={{ fontSize: 14, color: d.active !== false ? "var(--color-text-primary)" : "var(--color-text-disabled)", textDecoration: d.active !== false ? "none" : "line-through" }}>{d.dayDisplay}</span>
                {d.active !== false
                  ? <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{d.time || time || ""}</span>
                  : d.note && <Tag variant="neutral">{d.note}</Tag>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "var(--color-white)", zIndex: 5 }}>
      <div style={{ height: isMobile ? 20 : 50, background: "var(--color-white)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
        <div style={{ width: 120, height: 28, background: "var(--color-text-primary)", borderRadius: 14, display: isMobile ? "none" : "block" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 16px 0", flexShrink: 0 }}>
        <button onClick={onClose} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 20px", background: "var(--color-bg-secondary)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--color-success-050)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, flexShrink: 0 }}>
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none"><path d="M10 18L16 24L26 12" stroke="var(--color-success-700)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 28px", textAlign: "center" }}>Booking confirmed</h1>

        <div style={{ background: "var(--color-white)", borderRadius: 12, padding: 16, width: "100%", marginBottom: 16, border: "1px solid var(--color-grey-100)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px" }}>{clubName}</h2>
          {periodLabel && <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 2px" }}>{periodLabel}</p>}
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>For {childName}</p>

          {(days || time || location || clubLead) && (
            <>
              <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0" }} />
              {(days || time) && <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 8px" }}>{[days, time].filter(Boolean).join(" · ")}</p>}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {location && <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} color="var(--color-text-secondary)" strokeWidth={1.5} /><span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{location}</span></div>}
                {clubLead && <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Users size={14} color="var(--color-text-secondary)" strokeWidth={1.5} /><span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{clubLead}</span></div>}
              </div>
            </>
          )}

          <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0" }} />
          {sessionCount === 1 ? (
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{futureDates[0]?.label}</span>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{sessionCount} sessions</span>
                <button onClick={() => setConfirmedDatesExpanded(!confirmedDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                  <span style={{ fontSize: 14, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: confirmedDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
              {confirmedDatesExpanded && renderDates()}
            </>
          )}

          <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0 0" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", marginTop: 14, background: "var(--color-brand-050)", borderRadius: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-success-700)" }}>{isFree ? "Cost" : "Paid"}</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: "var(--color-success-700)" }}>{isFree ? "Free" : `£${Number.isInteger(total) ? total + ".00" : total.toFixed(2)}`}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "10px 16px 6px", textAlign: "center", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", background: "var(--color-white)", flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: "var(--color-text-disabled)", marginBottom: 6 }}>Was it easy to book this club?</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {[["👎", 1], ["👍", 2]].map(([face, val]) => (
            <button key={val} onClick={() => !bookingNudgeRating && setBookingNudgeRating(val)} className="btn-pill" style={{ background: "none", border: "none", cursor: bookingNudgeRating ? "default" : "pointer", fontSize: 22, minWidth: 36, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center", opacity: bookingNudgeRating && bookingNudgeRating !== val ? 0.2 : 1, transition: "opacity 0.15s", lineHeight: 1 }}>{face}</button>
          ))}
        </div>
        {bookingNudgeRating && <div style={{ fontSize: 11, color: "var(--color-text-disabled)", marginTop: 6 }}>Thanks for your feedback</div>}
      </div>
      <div style={{ padding: "12px 16px 20px", flexShrink: 0, background: "var(--color-white)" }}>
        <button onClick={onGoToBookings} style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "var(--color-white)", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Go to my bookings</button>
      </div>
      <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-white)", flexShrink: 0, overflow: "hidden" }}>
        <div style={{ width: 134, height: 5, background: "var(--color-border-default)", borderRadius: 3 }} />
      </div>
    </div>
  );
}

const MONTHS_LONG = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS_SHORT = ["Mo","Tu","We","Th","Fr","Sa","Su"];

function MobileDatePicker({ value, onChange, label, min, error }) {
  const [open, setOpen] = useState(false);
  const selectedDate = value ? new Date(value + "T12:00:00") : null;
  const [viewDate, setViewDate] = useState(() => selectedDate || new Date());

  useEffect(() => {
    if (selectedDate) setViewDate(selectedDate);
  }, [value]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDow = new Date(year, month, 1).getDay();
  const leadingBlanks = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const minDate = min ? new Date(min + "T00:00:00") : null;
  const isDisabled = (d) => minDate && d < minDate;
  const isSelected = (d) => selectedDate &&
    d.getFullYear() === selectedDate.getFullYear() &&
    d.getMonth() === selectedDate.getMonth() &&
    d.getDate() === selectedDate.getDate();
  const isTodayCell = (d) => {
    const t = new Date();
    return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
  };

  const toStr = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const shiftMonth = (delta) => { const d = new Date(viewDate); d.setDate(1); d.setMonth(d.getMonth() + delta); setViewDate(d); };

  const handleDaySelect = (d) => { if (isDisabled(d)) return; onChange(toStr(d)); setOpen(false); };
  const handleToday = () => { const t = new Date(); onChange(toStr(t)); setViewDate(t); setOpen(false); };

  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "Select date";

  const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 1 + i);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", minHeight: 52, width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
      >
        <span style={{ fontSize: "var(--font-size-4)", fontWeight: 500, color: error ? "var(--color-text-destructive)" : "var(--color-text-primary)" }}>{label}</span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${error ? "var(--color-text-destructive)" : "var(--color-border-default)"}`, borderRadius: 8, height: 36, padding: "0 10px", background: "var(--color-bg-primary)" }}>
          <span style={{ fontSize: "var(--font-size-3)", color: selectedDate ? "var(--color-text-primary)" : "var(--color-text-tertiary)" }}>{displayValue}</span>
          <Calendar size={14} strokeWidth={1.5} color={error ? "var(--color-text-destructive)" : "var(--color-icon-secondary)"} />
        </div>
      </button>

      {open && (
        <div>
          <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />
          <div style={{ padding: "0 16px 16px" }}>
          {/* Month/year nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0 8px" }}>
            <button type="button" onClick={() => shiftMonth(-1)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
              <ChevronLeft size={16} color="var(--color-text-primary)" />
            </button>
            <div style={{ display: "flex", gap: 6 }}>
              <select value={month} onChange={(e) => { const d = new Date(viewDate); d.setDate(1); d.setMonth(+e.target.value); setViewDate(d); }}
                style={{ fontSize: "var(--font-size-3)", border: "1px solid var(--color-border-default)", borderRadius: 6, padding: "4px 6px", background: "var(--color-bg-primary)", color: "var(--color-text-primary)", fontFamily: "inherit" }}>
                {MONTHS_LONG.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <select value={year} onChange={(e) => { const d = new Date(viewDate); d.setDate(1); d.setFullYear(+e.target.value); setViewDate(d); }}
                style={{ fontSize: "var(--font-size-3)", border: "1px solid var(--color-border-default)", borderRadius: 6, padding: "4px 6px", background: "var(--color-bg-primary)", color: "var(--color-text-primary)", fontFamily: "inherit" }}>
                {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <button type="button" onClick={() => shiftMonth(1)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
              <ChevronRight size={16} color="var(--color-text-primary)" />
            </button>
          </div>

          {/* Weekday headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 2 }}>
            {WEEKDAYS_SHORT.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: "var(--font-size-1)", fontWeight: 600, color: "var(--color-text-tertiary)", padding: "4px 0" }}>{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {cells.map((date, i) => {
              if (!date) return <div key={i} />;
              const sel = isSelected(date);
              const dis = isDisabled(date);
              const tod = isTodayCell(date);
              return (
                <button key={i} type="button" onClick={() => handleDaySelect(date)}
                  style={{
                    width: "100%", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center",
                    border: "none", borderRadius: "50%", cursor: dis ? "default" : "pointer", fontFamily: "inherit",
                    fontSize: "var(--font-size-3)",
                    backgroundColor: sel ? "var(--color-brand-600)" : "transparent",
                    color: sel ? "var(--color-white)" : dis ? "var(--color-text-tertiary)" : tod ? "var(--color-brand-600)" : "var(--color-text-primary)",
                    fontWeight: tod && !sel ? 700 : "normal",
                    opacity: dis ? 0.4 : 1,
                  }}>
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Today shortcut */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--color-grey-100)" }}>
            <button type="button" onClick={handleToday}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "var(--font-size-3)", fontWeight: 600, color: "var(--color-brand-600)", fontFamily: "inherit" }}>
              Today
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileTimePicker({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const ITEM_H = 44;
  const VISIBLE = 6;

  const parseTime = (v) => {
    if (!v) return { h: 8, m: 50 };
    const [hStr, mStr] = v.split(":");
    const h = parseInt(hStr, 10);
    const m = Math.round(parseInt(mStr, 10) / 5) * 5 % 60;
    return { h, m };
  };

  const { h: initH, m: initM } = parseTime(value);
  const [selHour, setSelHour] = useState(initH);
  const [selMinute, setSelMinute] = useState(initM);

  const fmt = (n) => String(n).padStart(2, "0");
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  useEffect(() => {
    const { h, m } = parseTime(value);
    setSelHour(h);
    setSelMinute(m);
  }, [value]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        if (hourRef.current) hourRef.current.scrollTop = selHour * ITEM_H;
        if (minuteRef.current) minuteRef.current.scrollTop = (selMinute / 5) * ITEM_H;
      });
    }
  }, [open]);

  const commitHour = (h) => {
    setSelHour(h);
    onChange(`${fmt(h)}:${fmt(selMinute)}`);
    hourRef.current?.scrollTo({ top: h * ITEM_H, behavior: "smooth" });
  };

  const commitMinute = (m) => {
    setSelMinute(m);
    onChange(`${fmt(selHour)}:${fmt(m)}`);
    minuteRef.current?.scrollTo({ top: (m / 5) * ITEM_H, behavior: "smooth" });
  };

  const drumCol = (ref, items, selVal, onSelect) => (
    <div
      ref={ref}
      className="time-drum"
      style={{ width: 88, height: VISIBLE * ITEM_H, overflowY: "auto", scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
    >
      {items.map(n => {
        const sel = n === selVal;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onSelect(n)}
            style={{
              scrollSnapAlign: "start",
              width: "100%",
              height: ITEM_H,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "var(--font-size-4)",
              fontWeight: sel ? 600 : 400,
              background: sel ? "var(--color-brand-600)" : "transparent",
              color: sel ? "var(--color-white)" : "var(--color-text-primary)",
              borderRadius: sel ? 10 : 0,
            }}
          >
            {fmt(n)}
          </button>
        );
      })}
    </div>
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", minHeight: 52, width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
      >
        <span style={{ fontSize: "var(--font-size-4)", fontWeight: 500, color: "var(--color-text-primary)" }}>{label}</span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid var(--color-border-default)", borderRadius: 8, height: 36, padding: "0 10px", background: "var(--color-bg-primary)" }}>
          <span style={{ fontSize: "var(--font-size-3)", color: "var(--color-text-primary)" }}>{fmt(selHour)}:{fmt(selMinute)}</span>
          <Clock size={14} strokeWidth={1.5} color="var(--color-icon-secondary)" />
        </div>
      </button>

      {open && (
        <div>
          <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />
          <div style={{ padding: "0 16px 16px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 8, paddingTop: 12 }}>
              {drumCol(hourRef, hours, selHour, commitHour)}
              <div style={{ fontSize: "var(--font-size-5)", fontWeight: 600, color: "var(--color-text-primary)", height: ITEM_H, display: "flex", alignItems: "center" }}>:</div>
              {drumCol(minuteRef, minutes, selMinute, commitMinute)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ParentApp() {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedChild, setSelectedChild] = useState(children[0]);
  const [activeTab, setActiveTab] = useState("home");
  const [subPage, setSubPage] = useState(null);
  const [browseFilter, setBrowseFilter] = useState("all");
  const [clubDayFilter, setClubDayFilter] = useState(null); // null = all days; "mon"–"fri" = day filter
  const [wraparoundDayFilter, setWraparoundDayFilter] = useState(null);
  const [bookingsFilter, setBookingsFilter] = useState("needs-attention");
  const bookingsNeedsAttentionCount = 2;
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [selectedUpcomingItem, setSelectedUpcomingItem] = useState(null);
  const [bookingDetailDatesExpanded, setBookingDetailDatesExpanded] = useState(false);
  const [pastSessionsCollapsed, setPastSessionsCollapsed] = useState(true);
  const [aboutTripOpen, setAboutTripOpen] = useState(false);
  const [detailPage, setDetailPage] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubDatesError, setClubDatesError] = useState(false);
  const [clubCardError, setClubCardError] = useState(false);
  const [flowStep, setFlowStep] = useState(null); // "consent", "sessions", etc.
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [bookingOption, setBookingOption] = useState(null); // "term" or "individual"
  const [selectedBkPeriod, setSelectedBkPeriod] = useState(null); // selected membership period { id, name, type: "daily"|"termly", start, end, price, sessionsRemaining }
  const [bkScenarioId, setBkScenarioId] = useState("s1"); // "s1"–"s5" — prototype scenario switcher
  const [bkIsFree, setBkIsFree] = useState(false);
  const [bkAboutExpanded, setBkAboutExpanded] = useState(false);
  const [bkPatternApplied, setBkPatternApplied] = useState(false);
  const bkScrollRef = useRef(null);
  const bkWeek2Ref = useRef(null);
  const bkDetailRef = useRef(null);
  const [termExpanded, setTermExpanded] = useState(false);
  const [selectedDates, setSelectedDates] = useState({}); // scenario 1: { dateId: true }
  const [selectedDates2, setSelectedDates2] = useState({}); // scenario 2: { dateId: "timeSlot" }
  const [selectedGridDates, setSelectedGridDates] = useState({}); // scenario 3: { dayId: true }
  const [wraparoundClubConfig, setWraparoundClubConfig] = useState(afterSchoolClubConfigs.mon);
  const [selectedGridDates2, setSelectedGridDates2] = useState({}); // scenario 4: { dayId: "timeSlot" }
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "apple"
  const [showApplePay, setShowApplePay] = useState(false);
  const [showStripeSheet, setShowStripeSheet] = useState(false);
  const [reviewDatesExpanded, setReviewDatesExpanded] = useState(false);
  const [detailDatesExpanded, setDetailDatesExpanded] = useState(false);
  const [cardFilled, setCardFilled] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [showTopUpSheet, setShowTopUpSheet] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(250);
  const [topUpPaymentMethod, setTopUpPaymentMethod] = useState("card");
  const [showTopUpApplePay, setShowTopUpApplePay] = useState(false);
  const [topUpCardScreen, setTopUpCardScreen] = useState(false);
  const [topUpCardFilled, setTopUpCardFilled] = useState(false);
  const [toppedUpAmount, setToppedUpAmount] = useState(0);
  const [confirmedDatesExpanded, setConfirmedDatesExpanded] = useState(false);
  const [messagesFilter, setMessagesFilter] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [readMessages, setReadMessages] = useState(new Set([1, 3, 5]));
  const [messagesSchool, setMessagesSchool] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyError, setReplyError] = useState(false);
  const [replySending, setReplySending] = useState(false);
  const [replyFocused, setReplyFocused] = useState(false);
  const [threadReplies, setThreadReplies] = useState({
    4: [
      { id: "r4-1", sender: "You", body: "Hi Miss Taylor,\n\nJust to let you know that Molly has lost her reading log book. Could she have a new one please?\n\nShe's been reading every evening so I'd hate for her to lose track.\n\nMany thanks", date: "21 Feb 2026", time: "19:45", delivered: true },
    ],
    10: [
      { id: "r10-1", sender: "You", body: "Hi Mrs Clarke,\n\nI wanted to let you know that Ethan has been unwell this week and hasn't been able to finish his English essay that's due tomorrow.\n\nWould it be possible to have an extension until early next week?\n\nMany thanks", date: "18 Feb 2026", time: "20:30", delivered: true },
    ],
  });
  const repliesEnabledSchools = ["Oakwood Primary"];
  const threadRef = useRef(null);
  const msgListRef = useRef(null);
  const [msgListScrolled, setMsgListScrolled] = useState(false);
  const [extraSentMessages, setExtraSentMessages] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [composeSchool, setComposeSchool] = useState(null);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [composeSending, setComposeSending] = useState(false);
  const [composeErrors, setComposeErrors] = useState({});
  const [composeFocused, setComposeFocused] = useState(true);
  const [consentDecisions, setConsentDecisions] = useState({
    n6:  { decision: "given",    note: "",                                    date: "12 Jan 2026" },
    n9:  { decision: "given",    note: "",                                    date: "25 Sep 2025" },
    n7:  { decision: "given",    note: "",                                    date: "6 Sep 2025"  },
    n13: { decision: "given",    note: "",                                    date: "22 Jan 2026" },
    n14: { decision: "given",    note: "",                                    date: "10 Nov 2025" },
    n15: { decision: "given",    note: "",                                    date: "4 Jun 2025"  },
    n16: { decision: "given",    note: "",                                    date: "16 Oct 2025" },
    n17: { decision: "declined", note: "Molly has a prior commitment that week.", date: "5 Mar 2025" },
    n8:  { decision: "declined", note: "Ethan is not able to attend.",        date: "18 Nov 2025" },
    n20: { decision: "given",    note: "",                                    date: "15 Jan 2026" },
    n21: { decision: "given",    note: "",                                    date: "5 Sep 2025"  },
  });
  const [consentPendingAction, setConsentPendingAction] = useState({});
  const [consentNotes, setConsentNotes] = useState({});
  const [consentDetailOpen, setConsentDetailOpen] = useState({});
  const [fadingConsents, setFadingConsents] = useState({});
  const [showAllConsents, setShowAllConsents] = useState({});
  const [pastConsentsExpanded, setPastConsentsExpanded] = useState({});
  const [consentToast, setConsentToast] = useState(null);
  const [consentToastFading, setConsentToastFading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileChild, setProfileChild] = useState(null);
  const [profileScreen, setProfileScreen] = useState(null); // "notifications", "help", "delete-confirm", "delete-done"
  const [notifToggles, setNotifToggles] = useState({ messages: true, payments: true, meals: true, attendance: true });
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState("");
  const [securityView, setSecurityView] = useState("overview");
  const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);
  const [bookingNudgeRating, setBookingNudgeRating] = useState(null);
  const [feedbackCategory, setFeedbackCategory] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);

  // --- Absence reporting ---
  const [myChildPage, setMyChildPage] = useState(null); // null | "absence-form" | "absence-success"
  const [absenceMultiDay, setAbsenceMultiDay] = useState(false);
  const [absenceStartDate, setAbsenceStartDate] = useState("2026-04-22");
  const [absenceEndDate, setAbsenceEndDate] = useState("2026-04-23");
  const [absenceStartTime, setAbsenceStartTime] = useState("08:50");
  const [absenceEndTime, setAbsenceEndTime] = useState("15:15");
  const [absenceReason, setAbsenceReason] = useState("");
  const [absenceOtherText, setAbsenceOtherText] = useState("");
  const [absenceNote, setAbsenceNote] = useState("");
  const [absenceErrors, setAbsenceErrors] = useState({});
  const [absenceErrorSim, setAbsenceErrorSim] = useState("none"); // "none" | "server" | "offline"
  const [absenceSending, setAbsenceSending] = useState(false);
  const [showAbsenceCancelSheet, setShowAbsenceCancelSheet] = useState(false);
  const [absenceOtherExpanded, setAbsenceOtherExpanded] = useState(false);
  const [absenceToast, setAbsenceToast] = useState(null); // null | "server" | "offline"
  useEffect(() => {
    if (!absenceToast) return;
    const t = setTimeout(() => setAbsenceToast(null), 4000);
    return () => clearTimeout(t);
  }, [absenceToast]);

  // Date conversion helpers for DatePicker (works in local time, avoids UTC offset issues)
  const dateFromStr = (s) => { if (!s) return undefined; const [y, m, d] = s.split('-'); return new Date(+y, +m - 1, +d); };
  const strFromDate = (d) => d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` : "";

  const absenceReasonOptions = [
    { value: "Illness or injury", label: "Illness or injury" },
    { value: "Medical appointment", label: "Medical appointment" },
    { value: "Dental appointment", label: "Dental appointment" },
    { value: "Mental health", label: "Mental health" },
    { value: "Bereavement or family loss", label: "Bereavement or family loss" },
    { value: "Religious observance", label: "Religious observance" },
    { value: "Family emergency", label: "Family emergency" },
    { value: "Holiday during term time", label: "Holiday during term time" },
    { value: "Quarantine / infectious disease", label: "Quarantine / infectious disease" },
    { value: "Other", label: "Other" },
  ];

  const getPasswordStrength = (pw) => {
    if (!pw) return { label: "", color: "#ddd", width: "0%" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { label: "Weak", color: "#c44", width: "20%" };
    if (score === 2) return { label: "Fair", color: "#e88", width: "40%" };
    if (score === 3) return { label: "Good", color: "#eb4", width: "60%" };
    if (score === 4) return { label: "Strong", color: "#8b5", width: "80%" };
    return { label: "Very strong", color: "#4a4", width: "100%" };
  };

  const formatAbsenceDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" });
  };

  const formatAbsenceTime = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":").map(Number);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const isAbsenceFormDirty = absenceReason !== "" || absenceNote.trim() !== "" || absenceMultiDay;

  const resetAbsenceForm = () => {
    setAbsenceMultiDay(false);
    setAbsenceStartDate("2026-04-22");
    setAbsenceEndDate("2026-04-23");
    setAbsenceStartTime("08:50");
    setAbsenceEndTime("15:15");
    setAbsenceReason("");
    setAbsenceOtherText("");
    setAbsenceNote("");
    setAbsenceErrors({});
    setAbsenceErrorSim("none");
    setAbsenceSending(false);
    setShowAbsenceCancelSheet(false);
    setAbsenceOtherExpanded(false);
    setAbsenceToast(null);
  };

  const handleAbsenceSubmit = () => {
    const errs = {};
    if (!absenceStartDate) errs.startDate = "Please select a date";
    if (absenceMultiDay && !absenceEndDate) errs.endDate = "Please select an end date";
    if (!absenceReason) errs.reason = "Please select a reason for the absence";
    if (absenceReason === "Other" && !absenceOtherText.trim()) {
      errs.otherText = "Please describe the reason for the absence";
    }
    setAbsenceErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setAbsenceSending(true);
    setTimeout(() => {
      setAbsenceSending(false);
      if (absenceErrorSim === "server") setAbsenceToast("server");
      else if (absenceErrorSim === "offline") setAbsenceToast("offline");
      else setMyChildPage("absence-success");
    }, 900);
  };
  const allNotices = [
    { id: "n1", type: "Consent", title: "Swimming lessons – Year 3", child: "Molly", school: "Oakwood Primary", description: "Year 3 swimming lessons will take place every Monday from 14 Apr to 14 Jul at Greenfield Leisure Centre.\n\nChildren will travel by coach and be supervised by school staff and qualified instructors at all times.\n\nSwimming caps are required (available from the school office for £2). Children with long hair must tie it back.\n\nPlease give or decline consent below.", date: "25 Feb 2026" },
    { id: "n2", type: "Consent", title: "Science trip – Natural History Museum", child: "Ethan", school: "Riverside Secondary", description: "Year 9 have been offered a trip to the Natural History Museum on Friday 4 Apr.\n\nThe cost is £18 per student, covering coach travel and a guided workshop. Students will need a packed lunch and should wear school uniform.\n\nDeparture: 8:15am from the bus bay. Expected return: 4:00pm.\n\nPlease give or decline consent below.", date: "26 Feb 2026" },
    { id: "n3", type: "Consent", title: "School photo permissions 2025/26", child: "Lucas", school: "Oakwood Primary", description: "We would like your permission to use photographs of your child in school publications, on the school website, and on our social media channels.\n\nPhotos are used to celebrate achievements and school events. No child's full name is published alongside their image.\n\nYou may withdraw consent at any time by contacting the school office.\n\nPlease give or decline consent below.", date: "20 Feb 2026" },
    { id: "n4", type: "Consent", title: "Sports Day participation 2026", child: "Lucas", school: "Oakwood Primary", description: "Sports Day will take place on Friday 26 Jun on the school field.\n\nAll children are welcome to participate in running, throwing and jumping events. Please ensure your child comes in their PE kit and brings sunscreen and a water bottle.\n\nPlease give or decline consent below.", date: "27 Feb 2026" },
    { id: "n5", type: "Consent", title: "After-school cookery club – Summer term", child: "Lucas", school: "Oakwood Primary", description: "We are offering a cookery club for Year 2 children on Thursdays from 3:30–4:30pm, starting 24 Apr.\n\nThe cost is £5 per session, payable termly (£60). Children will cook simple recipes and take their food home each week.\n\nPlease give or decline consent below.", date: "28 Feb 2026" },
    { id: "n6", type: "Consent", title: "School trip – Tate Modern", child: "Lucas", school: "Oakwood Primary", description: "Historical notice.", date: "10 Jan 2026" },
    { id: "n9", type: "Consent", title: "Year 2 class trip – Bekonscot Model Village", child: "Lucas", school: "Oakwood Primary", description: "Historical notice.", date: "24 Sep 2025" },
    { id: "n10", type: "Consent", title: "Year 4 residential – Stubbington Study Centre", child: "Molly", school: "Oakwood Primary", description: "Year 4 are going on a 3-night residential to Stubbington Study Centre from Monday 12 May to Thursday 15 May.\n\nActivities include coastal fieldwork, night walks and team challenges. The cost is £285 per child, covering all meals, accommodation and activities. A deposit of £50 is due by 28 Mar.\n\nChildren should bring named clothing and a small amount of spending money (no more than £10).\n\nPlease give or decline consent below.", date: "3 Mar 2026" },
    { id: "n11", type: "Consent", title: "PSHE survey – Wellbeing and safety", child: "Molly", school: "Oakwood Primary", description: "As part of our PSHE curriculum, all Year 4 children are invited to take part in an anonymous wellbeing survey.\n\nThe survey covers topics including friendships, feelings and staying safe online. It is conducted by a specialist external provider, and no personally identifiable information is collected.\n\nResults are used to shape our pastoral support programme.\n\nPlease give or decline consent below.", date: "4 Mar 2026" },
    { id: "n12", type: "Consent", title: "After-school drama club – Summer term", child: "Molly", school: "Oakwood Primary", description: "We are offering a drama club for Year 4 children on Tuesdays from 3:30–4:30pm, starting 29 Apr.\n\nThe club will culminate in a short end-of-term performance for parents on Wednesday 16 Jul at 5:30pm.\n\nThe cost is £4 per session, payable termly (£48). Places are limited to 20 children.\n\nPlease give or decline consent below.", date: "5 Mar 2026" },
    { id: "n13", type: "Consent", title: "Swimming lessons – Year 4", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "20 Jan 2026" },
    { id: "n7", type: "Consent", title: "Media permission 2024/25", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "5 Sep 2025" },
    { id: "n14", type: "Consent", title: "School trip – Science Museum", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "8 Nov 2025" },
    { id: "n15", type: "Consent", title: "Sports Day participation 2025", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "2 Jun 2025" },
    { id: "n16", type: "Consent", title: "Flu vaccination 2025", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "15 Oct 2025" },
    { id: "n17", type: "Consent", title: "Year 3 residential – Stubbers Adventure", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "3 Mar 2025" },
    { id: "n18", type: "Consent", title: "Duke of Edinburgh – Bronze award", child: "Ethan", school: "Riverside Secondary", description: "Riverside Secondary is pleased to offer Year 10 students the opportunity to complete the Duke of Edinburgh Bronze Award.\n\nThe programme involves 3 months of volunteering, physical activity and skill development, plus a 2-day assessed expedition in the Surrey Hills (dates TBC, approximately June).\n\nThe registration fee is £25. Expedition kit can be borrowed from school at no cost.\n\nPlease give or decline consent below.", date: "4 Mar 2026" },
    { id: "n19", type: "Consent", title: "Work experience placement consent", child: "Ethan", school: "Riverside Secondary", description: "Year 10 work experience will take place from Monday 23 Jun to Friday 27 Jun.\n\nStudents are responsible for arranging their own placement (a list of local employers is available from the careers office). Once a placement is confirmed, parents are asked to sign this consent form and return it by 30 Apr.\n\nPlease give or decline consent below.", date: "5 Mar 2026" },
    { id: "n8", type: "Consent", title: "Residential trip – Kingswood", child: "Ethan", school: "Riverside Secondary", description: "Historical notice.", date: "15 Nov 2025" },
    { id: "n20", type: "Consent", title: "Year 9 theatre trip – National Theatre", child: "Ethan", school: "Riverside Secondary", description: "Historical notice.", date: "14 Jan 2026" },
    { id: "n21", type: "Consent", title: "Media permission 2024/25", child: "Ethan", school: "Riverside Secondary", description: "Historical notice.", date: "4 Sep 2025" },
  ];
  const inboxMessageIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const unreadCount = inboxMessageIds.filter(id => !readMessages.has(id)).length;

  const mealsBalance = 15.0;
  const baseWraparoundBalance = 350.0;
  const wraparoundBalance = baseWraparoundBalance + toppedUpAmount;
  const lowFundsThreshold = 5.0;

  // Active breakfast scenario — driven by the prototype scenario switcher
  const activeBkPeriods = bkScenarioId === "s2" ? bkPeriodsS2 : bkScenarioId === "s3" ? bkPeriodsS3 : bkScenarioId === "s4" ? bkPeriodsS4 : bkScenarioId === "s5" ? bkPeriodsS5 : bkPeriodsS1;
  const activeBkTimesVary = new Set(activeBkPeriods.map(p => `${p.start}–${p.end}`)).size > 1;
  const activeBkDaysVary  = new Set(activeBkPeriods.map(p => p.days)).size > 1;
  const activeBkTypesVary = new Set(activeBkPeriods.map(p => p.type)).size > 1;
  const activeBkPeriodMeta = (p) => `${p.days} · ${p.start}–${p.end}`;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const clubExtras = {
    1: {
      about: "Our Drumming Club introduces children to the exciting world of percussion in a fun, supportive group setting. They'll develop rhythm, coordination, and timing skills while learning a variety of drumming styles and techniques — building confidence and working towards a group performance.",
      bullets: [
        "No prior experience required",
        "All equipment provided",
        "Led by experienced music tutors",
      ],
      sessionDates: [
        { id: "mon-apr7",  label: "Mon 7 Apr",   past: true },
        { id: "mon-apr14", label: "Mon 14 Apr",  past: true },
        { id: "mon-apr28", label: "Mon 28 Apr",  active: true },
        { id: "mon-may5",  label: "Mon 5 May",     active: true },
        { id: "mon-may12", label: "Mon 12 May",    active: true },
        { id: "mon-may19", label: "Mon 19 May",    active: true },
        { id: "mon-may26", label: "Mon 26 May",    active: false, note: "Half term" },
        { id: "mon-jun2",  label: "Mon 2 Jun",    active: true },
        { id: "mon-jun9",  label: "Mon 9 Jun",    active: true },
        { id: "mon-jun16", label: "Mon 16 Jun",   active: true },
        { id: "mon-jun23", label: "Mon 23 Jun",   active: true },
      ],
      blockSessions: 10, blockPrice: 110, isFree: false,
    },
    5: {
      about: "Join our Football Club and develop your skills on the pitch in a fun, structured environment. Players work on passing, shooting, and tactical awareness across the term, building teamwork and finishing with a mini tournament.",
      bullets: ["All abilities welcome", "Qualified FA-trained coaches", "Bibs and training equipment provided"],
      periods: [
        { id: "5-tue-daily",  type: "daily",  days: "Tue",   label: "Tuesdays only",   start: "15:30", end: "16:30", price: 8,  sessionsRemaining: null, dayKey: "tue" },
        { id: "5-tue-termly", type: "termly", days: "Tue",   label: "Tuesdays only",   start: "15:30", end: "16:30", price: 80, sessionsRemaining: 10,   dayKey: "tue" },
        { id: "5-wed-daily",  type: "daily",  days: "Wed", label: "Wednesdays only", start: "16:00", end: "17:00", price: 8,  sessionsRemaining: null, dayKey: "wed" },
        { id: "5-wed-termly", type: "termly", days: "Wed", label: "Wednesdays only", start: "16:00", end: "17:00", price: 80, sessionsRemaining: 10,   dayKey: "wed" },
      ],
      sessionDates: [
        { id: "tue-apr14", label: "Tue 14 Apr",  past: true,          time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-apr15", label: "Wed 15 Apr",  past: true,          time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-apr21", label: "Tue 21 Apr",  active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-apr22", label: "Wed 22 Apr",  active: true,        time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-apr28", label: "Tue 28 Apr",  active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-apr29", label: "Wed 29 Apr",  active: true,        time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-may5",  label: "Tue 5 May",   active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-may6",  label: "Wed 6 May",   active: true,        time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-may12", label: "Tue 12 May",  active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-may13", label: "Wed 13 May",  active: true,        time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-may19", label: "Tue 19 May",  active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-may20", label: "Wed 20 May",  active: true,        time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-may26", label: "Tue 26 May",  active: false, note: "Half term", time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-may27", label: "Wed 27 May",  active: false, note: "Half term", time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-jun2",  label: "Tue 2 Jun",   active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-jun3",  label: "Wed 3 Jun",   active: true,        time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-jun9",  label: "Tue 9 Jun",   active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-jun10", label: "Wed 10 Jun",  active: true,        time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-jun16", label: "Tue 16 Jun",  active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-jun17", label: "Wed 17 Jun",  active: true,        time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-jun23", label: "Tue 23 Jun",  active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-jun24", label: "Wed 24 Jun",  active: true,        time: "16:00\u201317:00", dayKey: "wed" },
        { id: "tue-jul7",  label: "Tue 7 Jul",   active: true,        time: "15:30\u201316:30", dayKey: "tue" },
        { id: "wed-jul8",  label: "Wed 8 Jul",   active: true,        time: "16:00\u201317:00", dayKey: "wed" },
      ],
      perSessionPrice: 8, blockSessions: 10, blockPrice: 80, isFree: false,
    },
    6: {
      about: "Art Club gives children the freedom to explore drawing, painting, printmaking, and mixed media in a relaxed creative space. Each session focuses on a different technique or theme, encouraging imagination and self-expression.",
      bullets: ["All materials provided", "A different theme or technique each week", "Work displayed in the school's end-of-year exhibition"],
      sessionDates: [
        { id: "wed-apr15", label: "Wed 15 Apr",  past: true },
        { id: "wed-apr22", label: "Wed 22 Apr",  active: true },
        { id: "wed-apr29", label: "Wed 29 Apr",  active: true },
        { id: "wed-may6",  label: "Wed 6 May",     active: true },
        { id: "wed-may13", label: "Wed 13 May",    active: true },
        { id: "wed-may20", label: "Wed 20 May",    active: true },
        { id: "wed-may27", label: "Wed 27 May",    active: false, note: "Half term" },
        { id: "wed-jun3",  label: "Wed 3 Jun",    active: true },
        { id: "wed-jun10", label: "Wed 10 Jun",   active: true },
        { id: "wed-jun17", label: "Wed 17 Jun",   active: true },
        { id: "wed-jun24", label: "Wed 24 Jun",   active: true },
        { id: "wed-jul8",  label: "Wed 8 Jul",    active: true },
      ],
      perSessionPrice: 6, blockSessions: 11, blockPrice: 66, isFree: false,
    },
    7: {
      about: "Coding Club introduces children to programming through hands-on projects using Scratch, Python, and web basics. Sessions are accessible and engaging, helping children develop logical thinking and problem-solving skills.",
      bullets: ["No prior coding experience required", "Devices and software provided", "Projects become progressively more challenging"],
      sessionDates: [
        { id: "thu-apr16", label: "Thu 16 Apr",  active: true },
        { id: "thu-apr23", label: "Thu 23 Apr",  active: true },
        { id: "thu-apr30", label: "Thu 30 Apr",  active: true },
        { id: "thu-may7",  label: "Thu 7 May",     active: true },
        { id: "thu-may14", label: "Thu 14 May",    active: true },
        { id: "thu-may21", label: "Thu 21 May",    active: true },
        { id: "thu-may28", label: "Thu 28 May",    active: false, note: "Half term" },
        { id: "thu-jun4",  label: "Thu 4 Jun",    active: true },
        { id: "thu-jun11", label: "Thu 11 Jun",   active: true },
        { id: "thu-jun18", label: "Thu 18 Jun",   active: true },
        { id: "thu-jun25", label: "Thu 25 Jun",   active: true },
        { id: "thu-jul9",  label: "Thu 9 Jul",    active: true },
      ],
      perSessionPrice: 7, blockSessions: 11, blockPrice: 77, isFree: false,
    },
    8: {
      about: "Netball Club develops key skills including passing, shooting, and positional play in a supportive team environment. Children learn the rules of the game, improve their fitness, and take part in friendly matches throughout the term.",
      bullets: ["Open to all abilities", "Bibs and equipment provided", "Friendly fixtures against other schools"],
      sessionDates: [
        { id: "fri-apr17", label: "Fri 17 Apr",  active: true },
        { id: "fri-apr24", label: "Fri 24 Apr",  active: true },
        { id: "fri-may1",  label: "Fri 1 May",     active: true },
        { id: "fri-may8",  label: "Fri 8 May",     active: true },
        { id: "fri-may15", label: "Fri 15 May",    active: true },
        { id: "fri-may22", label: "Fri 22 May",    active: true },
        { id: "fri-may29", label: "Fri 29 May",    active: false, note: "Half term" },
        { id: "fri-jun5",  label: "Fri 5 Jun",    active: true },
        { id: "fri-jun12", label: "Fri 12 Jun",   active: true },
        { id: "fri-jun19", label: "Fri 19 Jun",   active: true },
        { id: "fri-jun26", label: "Fri 26 Jun",   active: true },
        { id: "fri-jul10", label: "Fri 10 Jul",   active: true },
      ],
      perSessionPrice: 5, blockSessions: 11, blockPrice: 55, isFree: false,
    },
    16: {
      about: "Chess Club is open to all abilities, from complete beginners to more experienced players. Children learn the rules and strategies of the game in a calm, focused setting — building patience, concentration, and problem-solving skills.",
      bullets: ["No experience needed", "All equipment provided", "Friendly matches and puzzles each session"],
      sessionDates: [
        { id: "mon-apr13", label: "Mon 13 Apr",  active: true },
        { id: "mon-apr20", label: "Mon 20 Apr",  active: true },
        { id: "mon-apr27", label: "Mon 27 Apr",  active: true },
        { id: "mon-may4",  label: "Mon 4 May",     active: true },
        { id: "mon-may11", label: "Mon 11 May",    active: true },
        { id: "mon-may18", label: "Mon 18 May",    active: true },
        { id: "mon-may25", label: "Mon 25 May",    active: false, note: "Half term" },
        { id: "mon-jun1",  label: "Mon 1 Jun",    active: true },
        { id: "mon-jun8",  label: "Mon 8 Jun",    active: true },
        { id: "mon-jun15", label: "Mon 15 Jun",   active: true },
        { id: "mon-jun22", label: "Mon 22 Jun",   active: true },
        { id: "mon-jul6",  label: "Mon 6 Jul",    active: true },
      ],
      perSessionPrice: 0, blockSessions: 11, blockPrice: 0, isFree: true,
    },
    17: {
      about: "Dance Club explores a range of styles — from contemporary to street dance — in a high-energy, supportive environment. Children build confidence, coordination, and performance skills, working towards a routine to share with the school at the end of term.",
      bullets: ["All styles and abilities welcome", "No kit required beyond school PE wear", "Works towards an end-of-term showcase"],
      sessionDates: [
        { id: "tue-apr14", label: "Tue 14 Apr",  active: true },
        { id: "tue-apr21", label: "Tue 21 Apr",  active: true },
        { id: "tue-apr28", label: "Tue 28 Apr",  active: true },
        { id: "tue-may5",  label: "Tue 5 May",     active: true },
        { id: "tue-may12", label: "Tue 12 May",    active: true },
        { id: "tue-may19", label: "Tue 19 May",    active: true },
        { id: "tue-may26", label: "Tue 26 May",    active: false, note: "Half term" },
        { id: "tue-jun2",  label: "Tue 2 Jun",    active: true },
        { id: "tue-jun9",  label: "Tue 9 Jun",    active: true },
        { id: "tue-jun16", label: "Tue 16 Jun",   active: true },
        { id: "tue-jun23", label: "Tue 23 Jun",   active: true },
        { id: "tue-jul7",  label: "Tue 7 Jul",    active: true },
      ],
      perSessionPrice: 6, blockSessions: 11, blockPrice: 66, isFree: false,
    },
    18: {
      about: "School Choir is open to all voices — no audition required. Children learn songs spanning pop, folk, and classical styles, developing vocal skills and musicality in a welcoming, energetic group. The choir performs at school assemblies and end-of-term events.",
      bullets: ["All voices welcome — no audition", "Explores a range of musical styles", "Performs at assemblies and school events"],
      sessionDates: [
        { id: "tue-apr14", label: "Tue 14 Apr",  active: true },
        { id: "tue-apr21", label: "Tue 21 Apr",  active: true },
        { id: "tue-apr28", label: "Tue 28 Apr",  active: true },
        { id: "tue-may5",  label: "Tue 5 May",     active: true },
        { id: "tue-may12", label: "Tue 12 May",    active: true },
        { id: "tue-may19", label: "Tue 19 May",    active: true },
        { id: "tue-may26", label: "Tue 26 May",    active: false, note: "Half term" },
        { id: "tue-jun2",  label: "Tue 2 Jun",    active: true },
        { id: "tue-jun9",  label: "Tue 9 Jun",    active: true },
        { id: "tue-jun16", label: "Tue 16 Jun",   active: true },
        { id: "tue-jun23", label: "Tue 23 Jun",   active: true },
        { id: "tue-jul7",  label: "Tue 7 Jul",    active: true },
      ],
      perSessionPrice: 0, blockSessions: 11, blockPrice: 0, isFree: true,
    },
    20: {
      about: "Gymnastics Club builds strength, flexibility, and coordination through structured sessions led by qualified coaches. Children progress through floor work, vaulting, and balances, developing body awareness and confidence at their own pace.",
      bullets: ["All levels welcome", "Qualified gymnastics coaches", "Safe progression through the British Gymnastics framework"],
      sessionDates: [
        { id: "fri-apr17", label: "Fri 17 Apr",  active: true },
        { id: "fri-apr24", label: "Fri 24 Apr",  active: true },
        { id: "fri-may1",  label: "Fri 1 May",     active: true },
        { id: "fri-may8",  label: "Fri 8 May",     active: true },
        { id: "fri-may15", label: "Fri 15 May",    active: true },
        { id: "fri-may22", label: "Fri 22 May",    active: true },
        { id: "fri-may29", label: "Fri 29 May",    active: false, note: "Half term" },
        { id: "fri-jun5",  label: "Fri 5 Jun",    active: true },
        { id: "fri-jun12", label: "Fri 12 Jun",   active: true },
        { id: "fri-jun19", label: "Fri 19 Jun",   active: true },
        { id: "fri-jun26", label: "Fri 26 Jun",   active: true },
        { id: "fri-jul10", label: "Fri 10 Jul",   active: true },
      ],
      perSessionPrice: 9, blockSessions: 11, blockPrice: 99, isFree: false,
    },
    21: {
      about: "Drama Club is a space for children to build confidence, creativity, and teamwork through performance. Sessions cover improvisation, character work, and scripted scenes — all building towards a short performance at the end of term.",
      bullets: ["No experience needed", "Runs on Mondays and Thursdays", "End-of-term performance for parents"],
      sessionDates: [
        { id: "mon-apr13", label: "Mon 13 Apr",  active: true },
        { id: "thu-apr16", label: "Thu 16 Apr",  active: true },
        { id: "mon-apr20", label: "Mon 20 Apr",  active: true },
        { id: "thu-apr23", label: "Thu 23 Apr",  active: true },
        { id: "mon-apr27", label: "Mon 27 Apr",  active: true },
        { id: "thu-apr30", label: "Thu 30 Apr",  active: true },
        { id: "mon-may4",  label: "Mon 4 May",     active: true },
        { id: "thu-may7",  label: "Thu 7 May",     active: true },
        { id: "mon-may11", label: "Mon 11 May",    active: true },
        { id: "thu-may14", label: "Thu 14 May",    active: true },
        { id: "mon-may18", label: "Mon 18 May",    active: true },
        { id: "thu-may21", label: "Thu 21 May",    active: true },
        { id: "mon-may25", label: "Mon 25 May",    active: false, note: "Half term" },
        { id: "thu-may28", label: "Thu 28 May",    active: false, note: "Half term" },
        { id: "mon-jun1",  label: "Mon 1 Jun",    active: true },
        { id: "thu-jun4",  label: "Thu 4 Jun",    active: true },
        { id: "mon-jun8",  label: "Mon 8 Jun",    active: true },
        { id: "thu-jun11", label: "Thu 11 Jun",   active: true },
        { id: "mon-jun15", label: "Mon 15 Jun",   active: true },
        { id: "thu-jun18", label: "Thu 18 Jun",   active: true },
        { id: "mon-jun22", label: "Mon 22 Jun",   active: true },
        { id: "thu-jun25", label: "Thu 25 Jun",   active: true },
        { id: "mon-jul6",  label: "Mon 6 Jul",    active: true },
        { id: "thu-jul9",  label: "Thu 9 Jul",    active: true },
      ],
      perSessionPrice: 8, blockSessions: 22, blockPrice: 176, isFree: false,
    },
    19: {
      about: "Book Club meets every Wednesday lunchtime in the library. Children read and discuss a shared book together, with a new title chosen each half term. All reading abilities are welcome — the focus is on enjoying stories and sharing opinions.",
      bullets: ["New book chosen each half term", "All reading abilities welcome", "Copies of the book provided by school"],
      sessionDates: [
        { id: "wed-apr15", label: "Wed 15 Apr",  active: true },
        { id: "wed-apr22", label: "Wed 22 Apr",  active: true },
        { id: "wed-apr29", label: "Wed 29 Apr",  active: true },
        { id: "wed-may6",  label: "Wed 6 May",     active: true },
        { id: "wed-may13", label: "Wed 13 May",    active: true },
        { id: "wed-may20", label: "Wed 20 May",    active: true },
        { id: "wed-may27", label: "Wed 27 May",    active: false, note: "Half term" },
        { id: "wed-jun3",  label: "Wed 3 Jun",    active: true },
        { id: "wed-jun10", label: "Wed 10 Jun",   active: true },
        { id: "wed-jun17", label: "Wed 17 Jun",   active: true },
        { id: "wed-jun24", label: "Wed 24 Jun",   active: true },
      ],
      perSessionPrice: 0, blockSessions: 11, blockPrice: 0, isFree: true,
    },
  };

  return (
    <>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: isMobile ? "stretch" : "center",
        height: isMobile ? "100dvh" : undefined,
        minHeight: isMobile ? undefined : "100vh",
        width: "100%",
        background: isMobile ? "#fff" : "#e8e8e8",
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: isMobile ? 0 : 20,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: isMobile ? "100%" : 390,
          height: isMobile ? "100dvh" : 844,
          background: "#F8F8F8",
          borderRadius: isMobile ? 0 : 40,
          boxShadow: isMobile ? "none" : "0 4px 24px rgba(0,0,0,0.12)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: isMobile ? "none" : "6px solid #222",
          position: "relative",
        }}
      >
        {/* Get started splash screen */}
        {!hasStarted && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff", alignItems: "center", justifyContent: "center" }}>
            <Button variant="primary" onClick={() => setHasStarted(true)}>
              Get started
            </Button>
          </div>
        )}

        {hasStarted && (<>
        {/* Full-screen detail pages */}
        {detailPage === "drumming" && !flowStep && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
            {/* Status bar */}
            <div
              style={{
                height: 50,
                background: "#fff",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 4,
                flexShrink: 0,
              }}
            >
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>

            {/* Header bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px 12px",
                flexShrink: 0,
              }}
            >
              <div style={{ width: 32 }} />
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Club details</span>
              <button
                onClick={() => { setDetailPage(null); setFlowStep(null); setDetailDatesExpanded(false); }}
                className="btn-icon"
                style={{
                  width: 32,
                  height: 32,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>

              {/* Details */}
              <div style={{ padding: "20px 16px" }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>
                  Drumming
                </h2>

                {/* Info rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke="var(--color-brand-600)" strokeWidth="1.3" />
                      <path d="M2 6H14" stroke="var(--color-brand-600)" strokeWidth="1.3" />
                      <path d="M5.5 1V3.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" />
                      <path d="M10.5 1V3.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontSize: 14, color: "#2f2f2f" }}>6 Apr – 17 Jul 2026</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="6" stroke="var(--color-brand-600)" strokeWidth="1.3" />
                      <path d="M8 4.5V8L10.5 9.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 14, color: "#2f2f2f" }}>Mondays, 15:30–16:15</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M8 14.5C8 14.5 13 10.5 13 7C13 4.2 10.8 2 8 2C5.2 2 3 4.2 3 7C3 10.5 8 14.5 8 14.5Z" stroke="var(--color-brand-600)" strokeWidth="1.3" />
                      <circle cx="8" cy="7" r="1.5" fill="var(--color-brand-600)" />
                    </svg>
                    <span style={{ fontSize: 14, color: "#2f2f2f" }}>Music Block R1</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="var(--color-brand-600)" strokeWidth="1.3" />
                      <path d="M5 7H11" stroke="var(--color-brand-600)" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M5 10H8" stroke="var(--color-brand-600)" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontSize: 14, color: "#2f2f2f" }}>11 sessions</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 26 }}>
                    <button onClick={() => setDetailDatesExpanded(!detailDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                      <span style={{ fontSize: 13, color: "var(--color-brand-600)" }}>View all dates</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: detailDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    {detailDatesExpanded && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {drummingSessionDates.map((d) => (
                          <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#aaa", flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: "#666" }}>{d.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="6" stroke="var(--color-brand-600)" strokeWidth="1.3" />
                      <text x="8" y="11" textAnchor="middle" fontSize="9" fill="var(--color-brand-600)" fontWeight="600" fontFamily="sans-serif">£</text>
                    </svg>
                    <span style={{ fontSize: 14, color: "#2f2f2f" }}>£110 for the block</span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "#eee", marginBottom: 16 }} />

                {/* About section */}
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#2f2f2f", margin: "0 0 8px" }}>
                  About this club
                </h3>
                <p style={{ fontSize: 14, color: "#2f2f2f", lineHeight: 1.6, margin: "0 0 16px" }}>
                  Our Drumming Club introduces children to the exciting world of percussion in a fun, supportive group setting. They'll develop rhythm, coordination, and timing skills while learning a variety of drumming styles and techniques — building confidence and working towards a group performance.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                  {["No prior experience required", "All equipment provided", "Led by experienced music tutors"].map((point, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: "#2f2f2f", fontSize: 13, lineHeight: "1.5" }}>•</span>
                      <span style={{ fontSize: 13, color: "#2f2f2f", lineHeight: "1.5" }}>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Sign up deadline + places */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Tag variant="neutral">Deadline: 11 Mar 2026</Tag>
                  <Tag variant="default">7 places remaining</Tag>
                </div>
              </div>
            </div>

            {/* Fixed CTA */}
            <div style={{
              padding: "12px 16px 20px",
              boxShadow: "0 -1px 0 rgba(0,0,0,0.06)",
              flexShrink: 0,
              background: "#fff",
            }}>
              <Button
                onClick={() => { setFlowStep("payment"); setBookingOption("term"); }}
                style={{ width: "100%" }}
              >
                Book now
              </Button>
            </div>

            {/* Home indicator */}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f8f8", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Consent screen */}
        {detailPage === "drumming" && flowStep === "consent" && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            {/* Status bar */}
            <div
              style={{
                height: 50,
                background: "#fff",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 4,
                flexShrink: 0,
              }}
            >
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>

            {/* Header bar with context */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px 12px",
                flexShrink: 0,
                background: "#fff",
                boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
              }}
            >
              <button
                onClick={() => setFlowStep(null)}
                style={{
                  width: 32,
                  height: 32,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Drumming</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Mondays · 15:30–16:15</div>
              </div>
              <button
                onClick={() => { setDetailPage(null); setFlowStep(null); }}
                style={{
                  width: 32,
                  height: 32,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: "0 0 8px" }}>
                Consent required
              </h2>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: "0 0 24px" }}>
                The school needs your permission for your child to take part. Without consent, we can't complete the booking.
              </p>

              {/* Checkbox */}
              <Checkbox
                checked={consentChecked}
                onChange={(checked) => { setConsentChecked(checked); setConsentError(false); }}
                label={`I give consent for ${selectedChild.name} to take part in Drumming club.`}
              />

              {/* Error message */}
              {consentError && (
                <div style={{ marginTop: 10, marginLeft: 34, display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="7" cy="7" r="6" stroke="#c06060" strokeWidth="1.3" />
                    <path d="M7 4V7.5" stroke="#c06060" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="7" cy="10" r="0.8" fill="#c06060" />
                  </svg>
                  <span style={{ fontSize: 13, color: "#c06060" }}>
                    This club requires your consent to continue.
                  </span>
                </div>
              )}
            </div>

            {/* Fixed CTA */}
            <div style={{
              padding: "12px 16px 20px",
              boxShadow: "0 -1px 0 rgba(0,0,0,0.06)",
              flexShrink: 0,
              background: "#fff",
            }}>
              <Button
                variant="primary"
                style={{ width: "100%" }}
                onClick={() => {
                  if (!consentChecked) {
                    setConsentError(true);
                  } else {
                    setFlowStep("booking-options");
                    setBookingOption("term");
                    setTermExpanded(false);
                  }
                }}
              >
                View booking options
              </Button>
            </div>

            {/* Home indicator */}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Booking options screen */}
        {detailPage === "drumming" && flowStep === "booking-options" && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            {/* Status bar */}
            <div
              style={{
                height: 50,
                background: "#fff",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 4,
                flexShrink: 0,
              }}
            >
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>

            {/* Header bar with context */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px 12px",
                flexShrink: 0,
                background: "#fff",
                boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
              }}
            >
              <button
                onClick={() => setFlowStep(null)}
                style={{
                  width: 32,
                  height: 32,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Drumming</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Mondays · 15:30–16:15</div>
              </div>
              <button
                onClick={() => { setDetailPage(null); setFlowStep(null); }}
                style={{
                  width: 32,
                  height: 32,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", background: "#f5f5f5" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>
                Choose your booking option
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Summer term option */}
                <div
                  style={{
                    background: "#fff",
                    border: bookingOption === "term" ? "2px solid var(--color-brand-600)" : "none",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setBookingOption("term")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "16px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      gap: 12,
                    }}
                  >
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: bookingOption === "term" ? "2px solid var(--color-brand-600)" : "2px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      {bookingOption === "term" && (
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Block booking</div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setTermExpanded(!termExpanded); }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          marginTop: 2,
                        }}
                      >
                        <span style={{ fontSize: 13, color: "#888" }}>11 sessions</span>
                        <svg
                          width="12" height="12" viewBox="0 0 12 12" fill="none"
                          style={{ transform: termExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                        >
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£110 <span style={{ fontSize: 12, fontWeight: 500, color: "#888" }}>for the block</span></span>
                  </button>

                  {/* Accordion dates */}
                  {termExpanded && (
                    <div style={{ padding: "0 16px 14px 48px" }}>
                      <div style={{ height: 1, background: "#eee", marginBottom: 10 }} />
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {[
                          { date: "Mon 13 Apr", active: true },
                          { date: "Mon 20 Apr", active: true },
                          { date: "Mon 27 Apr", active: true },
                          { date: "Mon 4 May", active: true },
                          { date: "Mon 11 May", active: true },
                          { date: "Mon 18 May", active: true },
                          { date: "Mon 25 May", active: false, label: "Half term" },
                          { date: "Mon 1 Jun", active: true },
                          { date: "Mon 8 Jun", active: true },
                          { date: "Mon 15 Jun", active: true },
                          { date: "Mon 22 Jun", active: true },
                          { date: "Mon 6 Jul", active: true },
                        ].map((d, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {d.active ? (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                                <circle cx="6" cy="6" r="2.5" fill="#aaa" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                                <path d="M3 6H9" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            )}
                            <span style={{
                              fontSize: 13,
                              color: d.active ? "#555" : "#bbb",
                              textDecoration: d.active ? "none" : "line-through",
                            }}>
                              {d.date}
                            </span>
                            {!d.active && d.label && (
                              <span style={{ fontSize: 11, color: "#bbb", fontStyle: "italic" }}>{d.label}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Individual sessions option */}
                <button
                  onClick={() => { setBookingOption("individual"); setTermExpanded(false); }}
                  className="btn-pill"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "16px",
                    background: "#fff",
                    border: bookingOption === "individual" ? "2px solid var(--color-brand-600)" : "none",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    gap: 12,
                  }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: bookingOption === "individual" ? "2px solid var(--color-brand-600)" : "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {bookingOption === "individual" && (
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Individual sessions</div>
                    <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>Flexible booking</div>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£10<span style={{ fontSize: 12, fontWeight: 500, color: "#888" }}>/session</span></span>
                </button>
              </div>
            </div>

            {/* Fixed footer */}
            {bookingOption && (
              <div style={{
                padding: "12px 16px 20px",
                boxShadow: "0 -1px 0 rgba(0,0,0,0.06)",
                flexShrink: 0,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
                {bookingOption === "term" ? (
                  <>
                    <button
                      onClick={() => { setFlowStep("payment"); setPaymentMethod("card"); setReviewDatesExpanded(false); setCardFilled(false); }}
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: 28,
                        border: "none",
                        background: "var(--color-brand-600)",
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Continue to payment
                    </button>
                    <button
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: 28,
                        border: "1px solid #ddd",
                        background: "#fff",
                        color: "#444",
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Add to basket
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setFlowStep("choose-dates"); setSelectedDates({}); setSelectedDates2({}); setSelectedGridDates({}); setSelectedGridDates2({}); }}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: 28,
                      border: "none",
                      background: "var(--color-brand-600)",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Choose sessions
                  </button>
                )}
              </div>
            )}

            {/* Home indicator */}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Choose dates screen - comparison of both layouts */}
        {detailPage === "drumming" && flowStep === "choose-dates" && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            {/* Status bar */}
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep("booking-options")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Drumming</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Mondays · 15:30–16:15</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#222", margin: "0 0 4px" }}>Choose your sessions</h2>
              <p style={{ fontSize: 13, color: "#888", margin: "0 0 14px" }}>Select the dates you'd like to book.</p>

              {(() => {
                const dates = [
                  { id: "s1-apr13", label: "Mon 13 Apr", active: true },
                  { id: "s1-apr20", label: "Mon 20 Apr", active: true },
                  { id: "s1-apr27", label: "Mon 27 Apr", active: true },
                  { id: "s1-may4", label: "Mon 4 May", active: true },
                  { id: "s1-may11", label: "Mon 11 May", active: true },
                  { id: "s1-may18", label: "Mon 18 May", active: true },
                  { id: "s1-may25", label: "Mon 25 May", active: false, note: "Half term" },
                  { id: "s1-jun1", label: "Mon 1 Jun", active: true },
                  { id: "s1-jun8", label: "Mon 8 Jun", active: true },
                  { id: "s1-jun15", label: "Mon 15 Jun", active: true },
                  { id: "s1-jun22", label: "Mon 22 Jun", active: true },
                  { id: "s1-jul6", label: "Mon 6 Jul", active: true },
                ];
                const activeDates = dates.filter(d => d.active);
                const count = Object.keys(selectedDates).length;
                const allSelected = count === activeDates.length;

                return (
                <>
                <button
                  onClick={() => {
                    if (allSelected) { setSelectedDates({}); }
                    else { const a = {}; activeDates.forEach(d => { a[d.id] = true; }); setSelectedDates(a); }
                  }}
                  style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "10px 0 14px", textAlign: "left" }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: allSelected ? "2px solid var(--color-brand-600)" : "2px solid #ccc", background: allSelected ? "#444" : (count > 0 ? "#444" : "#fff"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {allSelected && <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    {count > 0 && !allSelected && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5H8" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Select all</span>
                </button>
                <div style={{ height: 1, background: "#eee", marginBottom: 2 }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {dates.map((d) => {
                    const isSelected = d.id in selectedDates;
                    return (
                    <button
                      key={d.id}
                      onClick={() => {
                        if (!d.active) return;
                        const next = { ...selectedDates };
                        if (isSelected) delete next[d.id]; else next[d.id] = true;
                        setSelectedDates(next);
                      }}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", width: "100%", background: "none", border: "none", cursor: d.active ? "pointer" : "default", fontFamily: "inherit", textAlign: "left", borderBottom: "1px solid #f0f0f0" }}
                    >
                      {d.active ? (
                        <div style={{ width: 20, height: 20, borderRadius: 4, border: isSelected ? "2px solid var(--color-brand-600)" : "2px solid #ccc", background: isSelected ? "#444" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {isSelected && <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                      ) : <div style={{ width: 20, height: 20, flexShrink: 0 }} />}
                      <span style={{ fontSize: 14, color: d.active ? "var(--color-text-primary)" : "var(--color-grey-600)", textDecoration: d.active ? "none" : "line-through", flex: 1 }}>{d.label}</span>
                      {!d.active && d.note && <span style={{ fontSize: 11, color: "var(--color-grey-600)", fontStyle: "italic" }}>{d.note}</span>}
                    </button>
                    );
                  })}
                </div>
                </>
                );
              })()}
            </div>

            {/* Fixed footer with running total */}
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              {Object.keys(selectedDates).length > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#888" }}>
                    {Object.keys(selectedDates).length} session{Object.keys(selectedDates).length !== 1 ? "s" : ""} selected
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>
                    £{Object.keys(selectedDates).length * 10}
                  </span>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => { setFlowStep("payment"); setPaymentMethod("card"); setReviewDatesExpanded(false); setCardFilled(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Continue to payment
                </button>
                <button className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Add to basket
                </button>
              </div>
            </div>

            {/* Home indicator */}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Payment review screen */}
        {detailPage === "drumming" && flowStep === "payment" && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? 11 : Object.keys(selectedDates).length;
          const total = isTerm ? 110 : sessionCount * 10;
          const termDates = [
            { date: "Mon 13 Apr", active: true },{ date: "Mon 20 Apr", active: true },{ date: "Mon 27 Apr", active: true },
            { date: "Mon 4 May", active: true },{ date: "Mon 11 May", active: true },{ date: "Mon 18 May", active: true },
            { date: "Mon 25 May", active: false, label: "Half term" },
            { date: "Mon 1 Jun", active: true },{ date: "Mon 8 Jun", active: true },{ date: "Mon 15 Jun", active: true },
            { date: "Mon 22 Jun", active: true },{ date: "Mon 6 Jul", active: true },
          ];
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5", position: "relative" }}>
            {/* Status bar */}
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep(null)} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Drumming</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Mondays · 15:30–16:15</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#f5f5f5" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>Review your booking</h2>

              {/* Order summary card */}
              <div style={{ background: "#fff", border: "1px solid var(--color-grey-100)", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#222", marginBottom: 2 }}>Drumming</div>
                <div style={{ fontSize: 12, color: "var(--color-grey-500)" }}>For {selectedChild.name}</div>
                <div style={{ height: 1, background: "#eee", margin: "14px 0" }} />
                <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)", margin: 0 }}>Mondays · 15:30–16:15</p>
                <div style={{ height: 1, background: "#eee", margin: "14px 0" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{sessionCount} session{sessionCount !== 1 ? "s" : ""}</span>
                  <button
                    onClick={() => setReviewDatesExpanded(!reviewDatesExpanded)}
                    style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}
                  >
                    <span style={{ fontSize: 13, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: reviewDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {reviewDatesExpanded && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 10 }}>
                    {isTerm ? termDates.map((d, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: d.active ? "#aaa" : "#ddd", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: d.active ? "#666" : "#bbb", textDecoration: d.active ? "none" : "line-through" }}>{d.date}</span>
                        {!d.active && d.label && <span style={{ fontSize: 10, color: "#bbb", fontStyle: "italic" }}>{d.label}</span>}
                      </div>
                    )) : Object.keys(selectedDates).map((id) => {
                      const dateLabel = drummingSessionDates.find(d => d.id === id)?.label || id;
                      return (
                        <div key={id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#aaa", flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: "#666" }}>{dateLabel}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div style={{ height: 1, background: "#eee", margin: "14px 0 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0 0" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#222" }}>£{total}.00</span>
                </div>
              </div>

            </div>

            {/* Fixed footer */}
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#f8f8f8" }}>
              <div style={{ fontSize: 11, color: "#888", textAlign: "center", marginBottom: 10, lineHeight: 1.4 }}>By booking, you agree to the school's <span style={{ textDecoration: "underline", cursor: "pointer" }}>terms and conditions</span> for this activity</div>
              <button
                onClick={() => setShowStripeSheet(true)}
                style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Pay now · £{total}.00
              </button>
            </div>

            {/* Home indicator */}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>

            {/* Stripe Payment Sheet */}
            {showStripeSheet && (
              <div onClick={() => setShowStripeSheet(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 20 }}>
                <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px 20px 0 0", paddingBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
                    <div style={{ width: 36, height: 4, borderRadius: 2, background: "#e0e0e0" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 16px 8px" }}>
                    <button onClick={() => setShowStripeSheet(false)} style={{ width: 28, height: 28, borderRadius: "50%", background: "#f0f0f0", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2L10 10" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 2L2 10" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                  <div style={{ padding: "0 16px 4px" }}>
                    <button onClick={() => { setShowStripeSheet(false); setShowApplePay(true); setTimeout(() => { setShowApplePay(false); setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }, 4500); }} style={{ width: "100%", padding: "13px", borderRadius: 8, border: "none", background: "#000", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16, fontFamily: "inherit" }}>
                      <svg width="16" height="19" viewBox="0 0 20 24" fill="none"><path d="M14.5 0.8C13.4 2.1 11.7 3.1 10.3 3C10.1 1.6 10.8 0.1 11.8 -0.6C12.9 -1.4 14.4 -1.8 15 -0.2C14.9 0 14.7 0.4 14.5 0.8Z" fill="#fff" transform="translate(0,4)"/><path d="M15 4.5C13.3 4.4 11.8 5.4 11 5.4C10.1 5.4 8.8 4.5 7.4 4.6C5.6 4.6 3.9 5.6 3 7.2C1.1 10.4 2.5 15.2 4.3 17.8C5.2 19.1 6.3 20.5 7.7 20.4C9 20.4 9.5 19.6 11.1 19.6C12.7 19.6 13.2 20.4 14.5 20.4C15.9 20.4 16.9 19.1 17.8 17.8C18.4 16.9 18.9 15.9 19.2 14.8C16.7 13.8 16 10.4 18.4 8.8C17.5 6.3 15.8 4.6 15 4.5Z" fill="#fff" transform="translate(-2,2) scale(0.85)"/></svg>
                      <span>Pay</span>
                    </button>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ flex: 1, height: 1, background: "#e8e8e8" }} />
                      <span style={{ fontSize: 12, color: "#999", whiteSpace: "nowrap" }}>Or pay using</span>
                      <div style={{ flex: 1, height: 1, background: "#e8e8e8" }} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 8 }}>Saved</div>
                    <div style={{ border: "2px solid #5469d4", borderRadius: 8, padding: "12px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                        <div style={{ width: 20, height: 13, borderRadius: "50%", background: "#eb001b", marginRight: -7, zIndex: 1 }} />
                        <div style={{ width: 20, height: 13, borderRadius: "50%", background: "#f79e1b" }} />
                      </div>
                      <span style={{ fontSize: 14, color: "#222", flex: 1 }}>···· 7492</span>
                      <span style={{ fontSize: 13, color: "#5469d4" }}>View more ›</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 8 }}>New payment method</div>
                    <div style={{ border: "1px solid #e8e8e8", borderRadius: 8, overflow: "hidden", marginBottom: 20 }}>
                      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 14px" }}>
                        <div style={{ width: 34, height: 24, borderRadius: 4, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="18" height="13" viewBox="0 0 18 13" fill="none"><rect x="0.5" y="0.5" width="17" height="12" rx="1.5" stroke="#888" strokeWidth="1.1"/><path d="M0.5 4H17.5" stroke="#888" strokeWidth="1.1"/></svg>
                        </div>
                        <span style={{ fontSize: 14, color: "#222", flex: 1, textAlign: "left" }}>New card</span>
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none"><path d="M1 1L7 6.5L1 12" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                    <button onClick={() => { setShowStripeSheet(false); setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }} style={{ width: "100%", padding: "14px", borderRadius: 8, border: "none", background: "#5469d4", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}>
                      <span>Pay £{total}.00</span>
                      <svg width="13" height="15" viewBox="0 0 13 15" fill="none"><path d="M2.5 6.5V4.5C2.5 2.57 4.07 1 6 1C7.93 1 9.5 2.57 9.5 4.5V6.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.3" strokeLinecap="round"/><rect x="1" y="6.5" width="11" height="8" rx="1.5" fill="rgba(255,255,255,0.9)"/><circle cx="6.5" cy="10.5" r="1.2" fill="#5469d4"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Apple Pay overlay */}
            {showApplePay && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 30 }}>
                <div style={{ background: "#1c1c1e", borderRadius: "16px 16px 0 0", padding: "20px 20px 30px", color: "#fff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <button onClick={() => setShowApplePay(false)} style={{ background: "none", border: "none", color: "#0a84ff", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                    <svg width="16" height="20" viewBox="0 0 20 24" fill="none">
                      <path d="M14.5 0.8C13.4 2.1 11.7 3.1 10.3 3C10.1 1.6 10.8 0.1 11.8 -0.6C12.9 -1.4 14.4 -1.8 15 -0.2C14.9 0 14.7 0.4 14.5 0.8Z" fill="#fff" transform="translate(0,4)" />
                      <path d="M15 4.5C13.3 4.4 11.8 5.4 11 5.4C10.1 5.4 8.8 4.5 7.4 4.6C5.6 4.6 3.9 5.6 3 7.2C1.1 10.4 2.5 15.2 4.3 17.8C5.2 19.1 6.3 20.5 7.7 20.4C9 20.4 9.5 19.6 11.1 19.6C12.7 19.6 13.2 20.4 14.5 20.4C15.9 20.4 16.9 19.1 17.8 17.8C18.4 16.9 18.9 15.9 19.2 14.8C16.7 13.8 16 10.4 18.4 8.8C17.5 6.3 15.8 4.6 15 4.5Z" fill="#fff" transform="translate(-2,2) scale(0.85)" />
                    </svg>
                  </div>
                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>ARBOR EDUCATION</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>£{total}.00</div>
                  </div>
                  <div style={{ background: "#2c2c2e", borderRadius: 12, padding: "14px 16px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 22, borderRadius: 4, background: "linear-gradient(135deg, #434343, #666)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 8, color: "#fff", fontWeight: 700 }}>VISA</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: "#fff" }}>Visa ···· 4289</div>
                        <div style={{ fontSize: 11, color: "#888" }}>Kate Burns</div>
                      </div>
                    </div>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1L7 7L1 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, border: "2px solid #555", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M8 2V6" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                        <path d="M20 2V6" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                        <path d="M14 2V8" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                        <path d="M9 18C9 18 11 21 14 21C17 21 19 18 19 18" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                        <path d="M2 8H6" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                        <path d="M22 8H26" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#999" }}>Confirm with Face ID</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          );
        })()}

        {/* Booking confirmed screen */}
        {detailPage === "drumming" && flowStep === "confirmed" && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? 11 : Object.keys(selectedDates).length;
          const total = isTerm ? 110 : sessionCount * 10;
          return (
            <BookingConfirmedScreen
              isMobile={isMobile}
              clubName="Drumming club"
              childName={selectedChild.name}
              days="Mon"
              time="15:30–16:15"
              location="Music Block R1"
              clubLead="Beat Academy"
              sessionCount={sessionCount}
              dates={drummingSessionDates}
              isFree={false}
              total={total}
              onClose={() => { setDetailPage(null); setFlowStep(null); }}
              onGoToBookings={() => { setFlowStep(null); setBookingNudgeRating(null); setBookingsFilter("upcoming"); setSubPage("my-bookings"); }}
              confirmedDatesExpanded={confirmedDatesExpanded}
              setConfirmedDatesExpanded={setConfirmedDatesExpanded}
              bookingNudgeRating={bookingNudgeRating}
              setBookingNudgeRating={setBookingNudgeRating}
            />
          );
        })()}


        {/* ==================== SHARED S1 CLUBS FLOW ==================== */}

        {/* Club detail page — unified 3-card layout */}
        {detailPage === "club-detail" && !flowStep && selectedClub && (() => {
          const extras = clubExtras[selectedClub.id];
          const clubPeriods   = periodsForClub(selectedClub, extras);
          const clubTimesVary = new Set(clubPeriods.map(p => `${p.start}–${p.end}`)).size > 1;
          const clubDaysVary  = new Set(clubPeriods.map(p => p.days)).size > 1;
          const fmtPrice  = (n) => extras.isFree ? "Free" : (n % 1 === 0 ? `£${n}` : `£${n.toFixed(2)}`);
          const cDailyPds  = clubPeriods.filter(p => p.type === "daily");
          const cTermlyPds = clubPeriods.filter(p => p.type === "termly");
          const minDaily   = cDailyPds.length  ? Math.min(...cDailyPds.map(p => p.price))  : null;
          const minTermly  = cTermlyPds.length ? Math.min(...cTermlyPds.map(p => p.price)) : null;
          const allDates   = extras.sessionDates || [];
          const pastDatesC = allDates.filter(d => d.past);
          const activeSess = allDates.filter(d => !d.past && d.active !== false);
          const effectiveBlockPrice = pastDatesC.length > 0 && extras.blockSessions > 0
            ? Math.round(extras.blockPrice / extras.blockSessions * activeSess.length)
            : extras.blockPrice;
          const sessionCountLabel = pastDatesC.length > 0 ? activeSess.length : extras.blockSessions;
          const priceHint  = extras.isFree ? "Free" : minDaily !== null
            ? (clubPeriods.length > 1 ? `From ${fmtPrice(minDaily)}` : fmtPrice(minDaily)) + " per session"
            : (clubPeriods.length > 1 ? `From ${fmtPrice(extras.blockPrice)}` : fmtPrice(extras.blockPrice)) + ` for ${extras.blockSessions} sessions`;
          const isMixedC  = cDailyPds.length > 0 && cTermlyPds.length > 0;
          const isSingleC = clubPeriods.length === 1;
          const effectivePeriod = selectedBkPeriod ?? (isSingleC ? clubPeriods[0] : null);
          const getContentC = (period) => {
            if (period.label) return { primary: period.label, secondary: `${period.days} · ${period.start}–${period.end}` };
            if (clubTimesVary && clubDaysVary) return { primary: `${period.days} · ${period.start}–${period.end}`, secondary: period.name };
            if (clubTimesVary) return { primary: `${period.start}–${period.end}`, secondary: `${period.name} · ${period.days}` };
            if (clubDaysVary)  return { primary: period.days, secondary: `${period.name} · ${period.start}–${period.end}` };
            return { primary: period.name, secondary: `${period.days} · ${period.start}–${period.end}` };
          };
          const scrollAfterRenderC = (el) => requestAnimationFrame(() => {
            const container = bkDetailRef.current;
            if (!container || !el) return;
            const cRect = container.getBoundingClientRect();
            const eRect = el.getBoundingClientRect();
            if (eRect.bottom > cRect.bottom - 88) container.scrollTop += (eRect.bottom - cRect.bottom) + 88 + 8;
          });
          const renderRowC = (period, showDivider) => {
            const isSelected = selectedBkPeriod?.id === period.id;
            const isTermly = period.type === "termly";
            const { primary, secondary } = getContentC(period);
            return (
              <button key={period.id} onClick={(e) => { setSelectedBkPeriod(period); setBookingOption(isTermly ? "term" : "individual"); scrollAfterRenderC(e.currentTarget); }}
                style={{ display: "flex", alignItems: "center", width: "100%", padding: "10px 0", background: "none", border: "none", borderTop: showDivider ? "1px solid var(--color-grey-100)" : "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: isSelected ? "2px solid var(--color-brand-600)" : "2px solid var(--color-border-strong)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {isSelected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)" }}>{primary}</div>
                  <div style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 1 }}>{secondary}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "var(--color-text-primary)" }}>{fmtPrice(isTermly && pastDatesC.length > 0 && extras.blockSessions > 0 ? Math.round(period.price / extras.blockSessions * activeSess.length) : period.price)}</div>
                </div>
              </button>
            );
          };
          const monthOrder   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          const ctaLabel     = effectivePeriod?.type === "daily" ? "Choose sessions" : "Book now";
          const onCta        = () => {
            if (!effectivePeriod) return;
            if (!selectedBkPeriod) { setSelectedBkPeriod(effectivePeriod); setBookingOption(effectivePeriod.type === "termly" ? "term" : "individual"); }
            if (effectivePeriod.type === "daily") { setFlowStep("choose-dates"); setSelectedDates({}); setClubDatesError(false); }
            else { setFlowStep("payment"); setReviewDatesExpanded(false); setPaymentMethod("card"); setCardFilled(false); }
          };
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--color-white)" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "var(--color-white)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setSelectedClub(null); setDetailDatesExpanded(false); setSelectedBkPeriod(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)" }}>Club details</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setSelectedClub(null); setDetailDatesExpanded(false); setSelectedBkPeriod(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div ref={bkDetailRef} style={{ flex: 1, overflowY: "auto", background: "var(--color-grey-050)" }}>
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Card 1: Details */}
                <div style={{ background: "var(--color-white)", borderRadius: 12, padding: "20px 16px 0", border: "1px solid var(--color-grey-100)" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px" }}>{selectedClub.title}</h2>
                  <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 12px" }}>For {selectedChild.name}</p>
                  <div style={{ height: 1, background: "var(--color-grey-100)", marginBottom: 14 }} />
                  {(() => {
                    const parts = getClubScheduleDetailParts(selectedClub, extras);
                    if (parts.multiDay) {
                      return (
                        <div style={{ marginBottom: 0 }}>
                          <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{parts.days}</p>
                          <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)", margin: "1px 0 0" }}>{parts.times}</p>
                        </div>
                      );
                    }
                    return <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{parts.label}</p>;
                  })()}
                  <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "3px 0 8px" }}>{priceHint}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
                    {selectedClub.location && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <MapPin size={14} color="var(--color-text-secondary)" strokeWidth={1.5} />
                        <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{selectedClub.location}</span>
                      </div>
                    )}
                    {selectedClub.clubLead && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Users size={14} color="var(--color-text-secondary)" strokeWidth={1.5} />
                        <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{selectedClub.clubLead}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ height: 1, background: "var(--color-grey-100)" }} />
                  <div style={{ padding: "16px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>
                        {pastDatesC.length > 0 ? `${activeSess.length} sessions remaining` : `${extras.blockSessions} sessions`}
                      </span>
                      <button onClick={() => { setDetailDatesExpanded(!detailDatesExpanded); setPastSessionsCollapsed(true); }} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                        <span style={{ fontSize: 14, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: detailDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                    {detailDatesExpanded && (() => {
                      const groups = {};
                      allDates.filter(d => !d.past).forEach(d => {
                        const parts = d.label.split(" ");
                        const month = parts[parts.length - 1];
                        const dayDisplay = parts.slice(0, -1).join(" ");
                        if (!groups[month]) groups[month] = [];
                        groups[month].push({ ...d, dayDisplay });
                      });
                      const sortedMonths = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
                      return (
                        <div style={{ marginTop: 28 }}>
                          {pastDatesC.length > 0 && (
                            <div style={{ marginBottom: 16 }}>
                              <button onClick={() => setPastSessionsCollapsed(!pastSessionsCollapsed)}
                                style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: pastSessionsCollapsed ? 0 : 8 }}>
                                <span style={{ fontSize: 14, color: "var(--color-grey-600)" }}>
                                  {pastSessionsCollapsed ? `Show ${pastDatesC.length} past session${pastDatesC.length !== 1 ? "s" : ""}` : "Hide past sessions"}
                                </span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: pastSessionsCollapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s" }}>
                                  <path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-grey-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              {!pastSessionsCollapsed && pastDatesC.map(d => {
                                const parts = d.label.split(" ");
                                const dayDisplay = parts.slice(0, -1).join(" ");
                                return (
                                  <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--color-grey-100)" }}>
                                    <span style={{ fontSize: 14, color: "var(--color-grey-600)", textDecoration: "line-through" }}>{dayDisplay}</span>
                                    <Tag variant="neutral">Past</Tag>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {sortedMonths.map((month, mi) => (
                            <div key={month} style={{ marginBottom: mi < sortedMonths.length - 1 ? 20 : 0 }}>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{month} 2026</div>
                              {groups[month].map(d => (
                                <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--color-grey-100)" }}>
                                  <span style={{ fontSize: 14, color: d.active !== false ? "var(--color-text-primary)" : "var(--color-grey-600)", textDecoration: d.active !== false ? "none" : "line-through" }}>{d.dayDisplay}</span>
                                  {d.active !== false
                                    ? <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{d.time || `${clubPeriods[0].start}–${clubPeriods[0].end}`}</span>
                                    : d.note && <Tag variant="neutral">{d.note}</Tag>}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
                {/* Card 2: About */}
                <div style={{ background: "var(--color-white)", borderRadius: 12, border: "1px solid var(--color-grey-100)", padding: "16px" }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 8 }}>About this club</div>
                  <p style={{ fontSize: 16, color: "var(--color-text-primary)", lineHeight: 1.6, margin: "0 0 6px",
                    ...(bkAboutExpanded ? {} : { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" })
                  }}>{extras.about}</p>
                  {bkAboutExpanded && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
                      {extras.bullets.map((pt, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                          <span style={{ color: "var(--color-text-primary)", fontSize: 16, lineHeight: "1.5" }}>•</span>
                          <span style={{ fontSize: 16, color: "var(--color-text-primary)", lineHeight: "1.5" }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <button onClick={() => setBkAboutExpanded(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2, fontFamily: "inherit" }}>
                    {bkAboutExpanded ? "Read less" : "Read more"}
                  </button>
                </div>
                {/* Card 3: Booking options */}
                {(() => {
                  const getCardTitle = (period) => {
                    if (clubTimesVary && clubDaysVary) return `${period.days} · ${period.start}–${period.end}`;
                    if (clubTimesVary) return `${period.start}–${period.end}`;
                    if (clubDaysVary)  return period.days;
                    return period.type === "daily" ? "Individual sessions" : "Block booking";
                  };
                  const getCardSubtitle = (period) => {
                    if (clubPeriods.length <= 1 || (!clubTimesVary && !clubDaysVary)) return null;
                    return period.type === "daily" ? "Individual sessions" : "Block booking";
                  };
                  const toMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
                  const dayOrder = { mon: 0, tue: 1, wed: 2, thu: 3, fri: 4, sat: 5, sun: 6 };
                  const sortedPeriods = [...clubPeriods].sort((a, b) => {
                    const dA = dayOrder[a.dayKey] ?? 99;
                    const dB = dayOrder[b.dayKey] ?? 99;
                    if (dA !== dB) return dA - dB;
                    if (a.start !== b.start) return toMin(a.start) - toMin(b.start);
                    return a.type === "daily" ? -1 : 1;
                  });
                  return (
                    <div style={{ background: "var(--color-white)", borderRadius: 12, border: "1px solid var(--color-grey-100)", padding: "14px 16px" }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>Booking options</div>
                      <div style={{ height: 1, background: "var(--color-grey-100)", marginBottom: 10 }} />
                      {sortedPeriods.map((period, i) => {
                        const isSelected = effectivePeriod?.id === period.id;
                        const isTermly = period.type === "termly";
                        const price = fmtPrice(isTermly && pastDatesC.length > 0 && extras.blockSessions > 0
                          ? Math.round(period.price / extras.blockSessions * activeSess.length)
                          : period.price);
                        const subtitle = getCardSubtitle(period);
                        return (
                          <button key={period.id}
                            onClick={(e) => { setSelectedBkPeriod(period); setBookingOption(isTermly ? "term" : "individual"); scrollAfterRenderC(e.currentTarget); }}
                            style={{ display: "flex", alignItems: "center", width: "100%", paddingTop: i > 0 ? 12 : 0, paddingBottom: i < sortedPeriods.length - 1 ? 12 : 0, paddingLeft: 0, paddingRight: 0, background: "none", border: "none", borderTop: i > 0 ? "1px solid var(--color-border-default)" : "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12 }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", border: isSelected ? "2px solid var(--color-brand-600)" : "2px solid var(--color-border-strong)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {isSelected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)" }}>{getCardTitle(period)}</div>
                              {subtitle && <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 2 }}>{subtitle}</div>}
                              {isTermly && <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>{pastDatesC.length > 0 ? activeSess.length : extras.blockSessions} sessions{pastDatesC.length > 0 ? " remaining" : ""}</div>}
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <div style={{ fontSize: 18, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.2 }}>{price}</div>
                              {!extras.isFree && !isTermly && <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 1 }}>per session</div>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
            {effectivePeriod && (
              <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "var(--color-white)" }}>
                <button onClick={onCta} className="btn-action"
                  style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "var(--color-white)", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  {ctaLabel}
                </button>
              </div>
            )}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg-secondary)", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "var(--color-border-default)", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}


        {/* Club choose dates - S1 checklist */}
        {detailPage === "club-detail" && flowStep === "choose-dates" && selectedClub && (() => {
          const extras = clubExtras[selectedClub.id];
          const dayKey = selectedBkPeriod?.dayKey;
          const activeDates = extras.sessionDates.filter(d => d.active !== false && !d.past && (!dayKey || d.dayKey === dayKey));
          const count = Object.keys(selectedDates).length;
          const allSelected = count === activeDates.length;
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--color-bg-secondary)" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "var(--color-white)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "var(--color-white)", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => { setFlowStep(null); setClubDatesError(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)" }}>Choose sessions</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setSelectedClub(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "var(--color-bg-secondary)", display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Context */}
              <div style={{ padding: "4px 0" }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)" }}>{selectedClub.title}</div>
                <div style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 2 }}>For {selectedChild.name}</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)", marginTop: 3 }}>{selectedBkPeriod ? `${selectedBkPeriod.days}, ${selectedBkPeriod.start}–${selectedBkPeriod.end}` : (selectedClub.timeDisplay || `${selectedClub.days}, ${selectedClub.time}`)}</div>
              </div>
              {/* Dates card */}
              <div style={{ background: "var(--color-white)", borderRadius: 12, border: "1px solid var(--color-grey-100)", padding: "0 16px" }}>
                {/* Select all */}
                <button onClick={() => { if (allSelected) setSelectedDates({}); else { const a = {}; activeDates.forEach(d => { a[d.id] = true; }); setSelectedDates(a); } setClubDatesError(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 0", width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: (allSelected || count > 0) ? "1px solid var(--color-brand-600)" : "1px solid var(--color-border-strong)", background: (allSelected || count > 0) ? "var(--color-brand-600)" : "var(--color-white)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {allSelected && <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    {count > 0 && !allSelected && <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5H8" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>Select all</span>
                </button>
                <div style={{ height: 1, background: "var(--color-grey-100)" }} />
                {/* Month groups */}
                {(() => {
                  const mo = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                  const grps = {};
                  extras.sessionDates.filter(d => !d.past && (!dayKey || d.dayKey === dayKey)).forEach(d => {
                    const parts = d.label.split(" ");
                    const month = parts[parts.length - 1];
                    const dayDisplay = parts.slice(0, -1).join(" ");
                    if (!grps[month]) grps[month] = [];
                    grps[month].push({ ...d, dayDisplay });
                  });
                  const months = Object.keys(grps).sort((a, b) => mo.indexOf(a) - mo.indexOf(b));
                  return months.map((month, mi) => (
                    <div key={month} style={{ marginTop: 12, paddingBottom: mi < months.length - 1 ? 0 : 4 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{month} 2026</div>
                      {grps[month].map(d => {
                        const isSelected = d.id in selectedDates;
                        return (
                          <button key={d.id} onClick={() => { if (!d.active) return; const next = { ...selectedDates }; if (isSelected) delete next[d.id]; else next[d.id] = true; setSelectedDates(next); setClubDatesError(false); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", width: "100%", background: "none", borderTop: "1px solid var(--color-grey-100)", borderLeft: "none", borderRight: "none", borderBottom: "none", cursor: d.active ? "pointer" : "default", fontFamily: "inherit", textAlign: "left" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              {d.active ? (
                                <div style={{ width: 16, height: 16, borderRadius: 4, border: isSelected ? "1px solid var(--color-brand-600)" : "1px solid var(--color-border-strong)", background: isSelected ? "var(--color-brand-600)" : "var(--color-white)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  {isSelected && <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="var(--color-white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                </div>
                              ) : <div style={{ width: 16, height: 16, flexShrink: 0 }} />}
                              <span style={{ fontSize: 14, color: d.active ? "var(--color-text-primary)" : "var(--color-grey-600)", textDecoration: d.active ? "none" : "line-through" }}>{d.dayDisplay}</span>
                            </div>
                            {!d.active && d.note && <Tag variant="neutral">{d.note}</Tag>}
                          </button>
                        );
                      })}
                    </div>
                  ));
                })()}
              </div>
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "var(--color-white)" }}>
              {count > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 14, color: "var(--color-text-tertiary)" }}>{count} session{count !== 1 ? "s" : ""} selected</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)" }}>{extras.isFree ? "Free" : `£${(count * extras.perSessionPrice).toFixed(2)}`}</span>
                </div>
              )}
              {clubDatesError && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}><circle cx="7" cy="7" r="6" stroke="var(--color-text-destructive)" strokeWidth="1.3" /><path d="M7 4V7.5" stroke="var(--color-text-destructive)" strokeWidth="1.3" strokeLinecap="round" /><circle cx="7" cy="10" r="0.8" fill="var(--color-text-destructive)" /></svg>
                  <span style={{ fontSize: 14, color: "var(--color-text-destructive)" }}>Please select at least one session to continue.</span>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => { if (count === 0) { setClubDatesError(true); return; } setFlowStep("payment"); setReviewDatesExpanded(false); setPaymentMethod("card"); setCardFilled(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "var(--color-white)", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{"Book now"}</button>
                <button className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "1px solid var(--color-border-default)", background: "var(--color-white)", color: "var(--color-text-primary)", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Add to basket</button>
              </div>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-white)", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "var(--color-border-default)", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}

        {/* Club review & pay */}
        {detailPage === "club-detail" && flowStep === "payment" && selectedClub && (() => {
          const extras = clubExtras[selectedClub.id];
          const isTerm = bookingOption === "term";
          const count = Object.keys(selectedDates).length;
          const payDayKey = selectedBkPeriod?.dayKey;
          const sessionCount = isTerm ? extras.sessionDates.filter(d => !d.past && d.active !== false && (!payDayKey || d.dayKey === payDayKey)).length : count;
          const payPastCount = (extras.sessionDates || []).filter(d => d.past).length;
          const payActiveCount = (extras.sessionDates || []).filter(d => !d.past && d.active !== false).length;
          const effectiveBlockPrice = payPastCount > 0 && extras.blockSessions > 0
            ? Math.round((selectedBkPeriod?.price ?? extras.blockPrice) / extras.blockSessions * payActiveCount)
            : (selectedBkPeriod?.price ?? extras.blockPrice);
          const total = isTerm ? effectiveBlockPrice : count * extras.perSessionPrice;
          const dateLabels = Object.fromEntries(extras.sessionDates.map(d => [d.id, d.label]));
          const hasOptions = !!selectedClub.bookingNote;
          const paymentBackStep = bookingOption === "individual" ? "choose-dates" : null;
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--color-bg-secondary)", position: "relative" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "var(--color-white)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "var(--color-white)", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => { setFlowStep(paymentBackStep); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)" }}>Review your booking</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setSelectedClub(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "var(--color-bg-secondary)" }}>
              <div style={{ background: "var(--color-white)", borderRadius: 12, border: "1px solid var(--color-grey-100)", padding: "16px", marginBottom: 20 }}>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px" }}>{selectedClub.title}</h2>
                <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>For {selectedChild.name}</p>
                <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0" }} />
                <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{selectedClub.days} · {selectedClub.time}</p>
                {(selectedClub.location || selectedClub.clubLead) && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8 }}>
                    {selectedClub.location && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <MapPin size={14} color="var(--color-text-secondary)" strokeWidth={1.5} />
                        <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{selectedClub.location}</span>
                      </div>
                    )}
                    {selectedClub.clubLead && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Users size={14} color="var(--color-text-secondary)" strokeWidth={1.5} />
                        <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{selectedClub.clubLead}</span>
                      </div>
                    )}
                  </div>
                )}
                {/* SESSIONS */}
                <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0" }} />
                {sessionCount === 1 ? (
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{isTerm ? extras.sessionDates[0]?.label : dateLabels[Object.keys(selectedDates)[0]]}</span>
                ) : (<>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{sessionCount} sessions</span>
                    <button onClick={() => setReviewDatesExpanded(!reviewDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                      <span style={{ fontSize: 14, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: reviewDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                  {reviewDatesExpanded && (() => {
                    const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    const dates = isTerm ? extras.sessionDates.filter(d => !d.past) : Object.keys(selectedDates).map(id => ({ id, label: dateLabels[id] || id, active: true }));
                    const groups = {};
                    dates.forEach(d => {
                      const parts = d.label.split(" ");
                      const month = parts[parts.length - 1];
                      const dayDisplay = parts.slice(0, -1).join(" ");
                      if (!groups[month]) groups[month] = [];
                      groups[month].push({ ...d, dayDisplay });
                    });
                    const sortedMonths = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
                    return (
                      <div style={{ marginTop: 28 }}>
                        {sortedMonths.map((month, mi) => (
                          <div key={month} style={{ marginBottom: mi < sortedMonths.length - 1 ? 20 : 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{month} 2026</div>
                            {groups[month].map(d => (
                              <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--color-grey-100)" }}>
                                <span style={{ fontSize: 14, color: d.active !== false ? "var(--color-text-primary)" : "var(--color-grey-600)", textDecoration: d.active !== false ? "none" : "line-through" }}>{d.dayDisplay}</span>
                                {d.active !== false
                                  ? <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{selectedClub.time}</span>
                                  : d.note && <Tag variant="neutral">{d.note}</Tag>
                                }
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                  </>)}
                {/* TOTAL */}
                <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0 0" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 0" }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)" }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)" }}>{extras.isFree ? "Free" : `£${total.toFixed(2)}`}</span>
                </div>
              </div>
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "var(--color-white)" }}>
              <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", textAlign: "center", marginBottom: 10, lineHeight: 1.4 }}>By booking, you agree to the school's <span style={{ textDecoration: "underline", cursor: "pointer" }}>terms and conditions</span> for this activity</div>
              <button onClick={() => {
                if (extras.isFree) { setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }
                else { setShowStripeSheet(true); }
              }} style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "var(--color-white)", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                {extras.isFree ? "Confirm booking" : `Pay now · £${total.toFixed(2)}`}
              </button>
            </div>
            {showStripeSheet && !extras.isFree && (
              <div onClick={() => setShowStripeSheet(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 20 }}>
                <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px 20px 0 0", paddingBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
                    <div style={{ width: 36, height: 4, borderRadius: 2, background: "#e0e0e0" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 16px 8px" }}>
                    <button onClick={() => setShowStripeSheet(false)} style={{ width: 28, height: 28, borderRadius: "50%", background: "#f0f0f0", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2L10 10" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 2L2 10" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                  <div style={{ padding: "0 16px 4px" }}>
                    <button onClick={() => { setShowStripeSheet(false); setShowApplePay(true); setTimeout(() => { setShowApplePay(false); setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }, 4500); }} style={{ width: "100%", padding: "13px", borderRadius: 8, border: "none", background: "#000", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16, fontFamily: "inherit" }}>
                      <svg width="16" height="19" viewBox="0 0 20 24" fill="none"><path d="M14.5 0.8C13.4 2.1 11.7 3.1 10.3 3C10.1 1.6 10.8 0.1 11.8 -0.6C12.9 -1.4 14.4 -1.8 15 -0.2C14.9 0 14.7 0.4 14.5 0.8Z" fill="#fff" transform="translate(0,4)"/><path d="M15 4.5C13.3 4.4 11.8 5.4 11 5.4C10.1 5.4 8.8 4.5 7.4 4.6C5.6 4.6 3.9 5.6 3 7.2C1.1 10.4 2.5 15.2 4.3 17.8C5.2 19.1 6.3 20.5 7.7 20.4C9 20.4 9.5 19.6 11.1 19.6C12.7 19.6 13.2 20.4 14.5 20.4C15.9 20.4 16.9 19.1 17.8 17.8C18.4 16.9 18.9 15.9 19.2 14.8C16.7 13.8 16 10.4 18.4 8.8C17.5 6.3 15.8 4.6 15 4.5Z" fill="#fff" transform="translate(-2,2) scale(0.85)"/></svg>
                      <span>Pay</span>
                    </button>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ flex: 1, height: 1, background: "#e8e8e8" }} />
                      <span style={{ fontSize: 12, color: "#999", whiteSpace: "nowrap" }}>Or pay using</span>
                      <div style={{ flex: 1, height: 1, background: "#e8e8e8" }} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 8 }}>Saved</div>
                    <div style={{ border: "2px solid #5469d4", borderRadius: 8, padding: "12px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                        <div style={{ width: 20, height: 13, borderRadius: "50%", background: "#eb001b", marginRight: -7, zIndex: 1 }} />
                        <div style={{ width: 20, height: 13, borderRadius: "50%", background: "#f79e1b" }} />
                      </div>
                      <span style={{ fontSize: 14, color: "#222", flex: 1 }}>···· 7492</span>
                      <span style={{ fontSize: 13, color: "#5469d4" }}>View more ›</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 8 }}>New payment method</div>
                    <div style={{ border: "1px solid #e8e8e8", borderRadius: 8, overflow: "hidden", marginBottom: 20 }}>
                      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 14px" }}>
                        <div style={{ width: 34, height: 24, borderRadius: 4, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="18" height="13" viewBox="0 0 18 13" fill="none"><rect x="0.5" y="0.5" width="17" height="12" rx="1.5" stroke="#888" strokeWidth="1.1"/><path d="M0.5 4H17.5" stroke="#888" strokeWidth="1.1"/></svg>
                        </div>
                        <span style={{ fontSize: 14, color: "#222", flex: 1, textAlign: "left" }}>New card</span>
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none"><path d="M1 1L7 6.5L1 12" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                    <button onClick={() => { setShowStripeSheet(false); setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }} style={{ width: "100%", padding: "14px", borderRadius: 8, border: "none", background: "#5469d4", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}>
                      <span>Pay £{total.toFixed(2)}</span>
                      <svg width="13" height="15" viewBox="0 0 13 15" fill="none"><path d="M2.5 6.5V4.5C2.5 2.57 4.07 1 6 1C7.93 1 9.5 2.57 9.5 4.5V6.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.3" strokeLinecap="round"/><rect x="1" y="6.5" width="11" height="8" rx="1.5" fill="rgba(255,255,255,0.9)"/><circle cx="6.5" cy="10.5" r="1.2" fill="#5469d4"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showApplePay && !extras.isFree && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 30 }}>
                <div style={{ background: "#1c1c1e", borderRadius: "16px 16px 0 0", padding: "20px 20px 30px", color: "#fff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <button onClick={() => setShowApplePay(false)} style={{ background: "none", border: "none", color: "#0a84ff", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                    <svg width="16" height="20" viewBox="0 0 20 24" fill="none"><path d="M14.5 0.8C13.4 2.1 11.7 3.1 10.3 3C10.1 1.6 10.8 0.1 11.8 -0.6C12.9 -1.4 14.4 -1.8 15 -0.2C14.9 0 14.7 0.4 14.5 0.8Z" fill="#fff" transform="translate(0,4)" /><path d="M15 4.5C13.3 4.4 11.8 5.4 11 5.4C10.1 5.4 8.8 4.5 7.4 4.6C5.6 4.6 3.9 5.6 3 7.2C1.1 10.4 2.5 15.2 4.3 17.8C5.2 19.1 6.3 20.5 7.7 20.4C9 20.4 9.5 19.6 11.1 19.6C12.7 19.6 13.2 20.4 14.5 20.4C15.9 20.4 16.9 19.1 17.8 17.8C18.4 16.9 18.9 15.9 19.2 14.8C16.7 13.8 16 10.4 18.4 8.8C17.5 6.3 15.8 4.6 15 4.5Z" fill="#fff" transform="translate(-2,2) scale(0.85)" /></svg>
                  </div>
                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>ARBOR EDUCATION</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>£{total.toFixed(2)}</div>
                  </div>
                  <div style={{ background: "#2c2c2e", borderRadius: 12, padding: "14px 16px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 22, borderRadius: 4, background: "linear-gradient(135deg, #434343, #666)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 8, color: "#fff", fontWeight: 700 }}>VISA</span></div>
                      <div><div style={{ fontSize: 13, color: "#fff" }}>Visa ···· 4289</div><div style={{ fontSize: 11, color: "#888" }}>Kate Burns</div></div>
                    </div>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1L7 7L1 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, border: "2px solid #555", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8 2V6" stroke="#999" strokeWidth="2" strokeLinecap="round" /><path d="M20 2V6" stroke="#999" strokeWidth="2" strokeLinecap="round" /><path d="M14 2V8" stroke="#999" strokeWidth="2" strokeLinecap="round" /><path d="M9 18C9 18 11 21 14 21C17 21 19 18 19 18" stroke="#999" strokeWidth="2" strokeLinecap="round" /><path d="M2 8H6" stroke="#999" strokeWidth="2" strokeLinecap="round" /><path d="M22 8H26" stroke="#999" strokeWidth="2" strokeLinecap="round" /></svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#999" }}>Confirm with Face ID</span>
                  </div>
                </div>
              </div>
            )}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-white)", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "var(--color-border-default)", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}

        {/* Club booking confirmed */}
        {detailPage === "club-detail" && flowStep === "confirmed" && selectedClub && (() => {
          const extras = clubExtras[selectedClub.id];
          const isTerm = bookingOption === "term";
          const count = Object.keys(selectedDates).length;
          const confDayKey = selectedBkPeriod?.dayKey;
          const sessionCount = isTerm ? extras.sessionDates.filter(d => !d.past && d.active !== false && (!confDayKey || d.dayKey === confDayKey)).length : count;
          const confPastCount = (extras.sessionDates || []).filter(d => d.past).length;
          const confActiveCount = (extras.sessionDates || []).filter(d => !d.past && d.active !== false).length;
          const effectiveBlockPrice = confPastCount > 0 && extras.blockSessions > 0
            ? Math.round((selectedBkPeriod?.price ?? extras.blockPrice) / extras.blockSessions * confActiveCount)
            : (selectedBkPeriod?.price ?? extras.blockPrice);
          const total = isTerm ? effectiveBlockPrice : count * extras.perSessionPrice;
          const dateLabels = Object.fromEntries(extras.sessionDates.map(d => [d.id, d.label]));
          const confDates = isTerm
            ? extras.sessionDates.filter(d => !d.past).map(d => ({ ...d, time: selectedClub.time }))
            : Object.keys(selectedDates).map(id => ({ id, label: dateLabels[id] || id, active: true, time: selectedClub.time }));
          return (
            <BookingConfirmedScreen
              isMobile={isMobile}
              clubName={selectedClub.title}
              childName={selectedChild.name}
              days={selectedClub.days}
              time={selectedClub.time}
              location={selectedClub.location}
              clubLead={selectedClub.clubLead}
              sessionCount={sessionCount}
              dates={confDates}
              isFree={extras.isFree}
              total={total}
              onClose={() => { setDetailPage(null); setFlowStep(null); setSelectedClub(null); }}
              onGoToBookings={() => { setFlowStep(null); setBookingNudgeRating(null); setDetailPage(null); setSelectedClub(null); setActiveTab("book-pay"); setBookingsFilter("upcoming"); setSubPage("my-bookings"); }}
              confirmedDatesExpanded={confirmedDatesExpanded}
              setConfirmedDatesExpanded={setConfirmedDatesExpanded}
              bookingNudgeRating={bookingNudgeRating}
              setBookingNudgeRating={setBookingNudgeRating}
            />
          );
        })()}

        {/* ==================== AFTER SCHOOL CLUB FLOW ==================== */}

        {/* After school - Detail page */}
        {detailPage === "after-school" && !flowStep && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--color-white)" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "var(--color-white)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setDetailDatesExpanded(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Club details</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setDetailDatesExpanded(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", background: "var(--color-grey-050)" }}>
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Card 1: Details */}
                <div style={{ background: "#fff", borderRadius: 12, padding: "20px 16px 0", border: "1px solid var(--color-grey-100)" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--color-grey-900)", margin: "0 0 4px" }}>{wraparoundClubConfig?.name}</h2>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)", margin: 0 }}>{wraparoundClubConfig?.timeDisplay}, 15:30–17:00</p>
                  <p style={{ fontSize: 12, color: "var(--color-grey-500)", margin: "3px 0 0" }}>For {selectedChild.name}</p>
                  {/* Price */}
                  <div style={{ height: 1, background: "#eee", margin: "16px 0 0" }} />
                  <div style={{ padding: "16px 0" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-grey-700)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Price</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 18, fontWeight: 600, color: "var(--color-grey-900)" }}>£10</span>
                        <span style={{ fontSize: 13, color: "var(--color-grey-600)" }}>per session</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 18, fontWeight: 600, color: "var(--color-grey-900)" }}>£120</span>
                        <span style={{ fontSize: 13, color: "var(--color-grey-600)" }}>all sessions</span>
                      </div>
                    </div>
                  </div>
                  {/* Sessions */}
                  <div style={{ height: 1, background: "#eee" }} />
                  <div style={{ padding: "16px 0" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-grey-700)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Sessions</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-grey-900)" }}>{wraparoundClubConfig?.sessionDates?.filter(d => d.active).length}</span>
                      <button onClick={() => setDetailDatesExpanded(!detailDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                        <span style={{ fontSize: 13, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: detailDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                    {detailDatesExpanded && (() => {
                      const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                      const groups = {};
                      wraparoundClubConfig.sessionDates.forEach(d => {
                        const month = d.date.split(" ").pop();
                        if (!groups[month]) groups[month] = [];
                        groups[month].push(d);
                      });
                      const sortedMonths = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
                      return (
                        <div style={{ marginTop: 28 }}>
                          {sortedMonths.map((month, mi) => (
                            <div key={month} style={{ marginBottom: mi < sortedMonths.length - 1 ? 20 : 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-grey-700)", marginBottom: 8 }}>{month} 2026</div>
                              {groups[month].map(d => (
                                <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #eee" }}>
                                  <span style={{ fontSize: 14, color: d.active ? "var(--color-grey-900)" : "var(--color-grey-600)", textDecoration: d.active ? "none" : "line-through" }}>{d.date.split(" ").slice(0, 2).join(" ")}</span>
                                  {d.active
                                    ? <span style={{ fontSize: 14, color: "var(--color-grey-600)" }}>15:30–17:00</span>
                                    : d.note && <Tag variant="neutral">{d.note}</Tag>
                                  }
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                  {/* Location */}
                  <div style={{ height: 1, background: "#eee" }} />
                  <div style={{ padding: "16px 0" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-grey-700)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Location</div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)" }}>Main Hall</div>
                  </div>
                  {/* Club Lead */}
                  <div style={{ height: 1, background: "#eee" }} />
                  <div style={{ padding: "16px 0" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-grey-700)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Club Lead</div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)" }}>School staff</div>
                  </div>
                </div>
                {/* Card 2: About */}
                <div style={{ background: "#fff", borderRadius: 12, padding: "16px", border: "1px solid var(--color-grey-100)" }}>
                  <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--color-grey-700)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>About this club</h3>
                  <p style={{ fontSize: 14, color: "var(--color-grey-900)", lineHeight: 1.6, margin: "0 0 16px" }}>Our {wraparoundClubConfig?.name} provides a safe and fun environment for children to relax, play and socialise after the school day. Activities include arts and crafts, outdoor games, board games and supervised homework time. A light snack and drink are provided.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {["Snack and drink included", "Outdoor and indoor activities", "Supervised homework time available"].map((point, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: "var(--color-grey-900)", fontSize: 13, lineHeight: "1.5" }}>•</span>
                        <span style={{ fontSize: 13, color: "var(--color-grey-900)", lineHeight: "1.5" }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <button onClick={() => { setFlowStep("booking-options"); setBookingOption("individual"); setTermExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>View booking options</button>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f8f8", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* After school - Booking options */}
        {detailPage === "after-school" && flowStep === "booking-options" && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => { setFlowStep(null); setBookingOption(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Booking options</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#f5f5f5", display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Context */}
              <div style={{ padding: "4px 0" }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "var(--color-grey-900)" }}>{wraparoundClubConfig?.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-grey-500)", marginTop: 2 }}>For {selectedChild.name}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-grey-900)", marginTop: 3 }}>{wraparoundClubConfig?.timeDisplay}, 15:30–17:00</div>
              </div>
              {/* Individual sessions card */}
              <button onClick={() => { setBookingOption("individual"); setTermExpanded(false); }} style={{ display: "flex", alignItems: "flex-start", width: "100%", padding: "16px", background: "#fff", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12, border: bookingOption === "individual" ? "2px solid var(--color-brand-600)" : "1px solid var(--color-grey-100)" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: bookingOption === "individual" ? "2px solid var(--color-brand-600)" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  {bookingOption === "individual" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, color: "var(--color-grey-900)" }}>Individual sessions</div>
                  <div style={{ fontSize: 13, color: "var(--color-grey-600)", marginTop: 4 }}>Flexible booking</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 600, color: "var(--color-grey-900)", lineHeight: 1.1 }}>£10</div>
                  <div style={{ fontSize: 13, color: "var(--color-grey-600)", marginTop: 2 }}>per session</div>
                </div>
              </button>
              {/* Block booking card */}
              <div style={{ background: "#fff", borderRadius: 12, border: bookingOption === "term" ? "2px solid var(--color-brand-600)" : "1px solid var(--color-grey-100)" }}>
                <button onClick={() => setBookingOption("term")} style={{ display: "flex", alignItems: "flex-start", width: "100%", padding: "16px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: bookingOption === "term" ? "2px solid var(--color-brand-600)" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    {bookingOption === "term" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "var(--color-grey-900)" }}>Block booking</div>
                    <button onClick={(e) => { e.stopPropagation(); setTermExpanded(!termExpanded); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                      <span style={{ fontSize: 13, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: termExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 600, color: "var(--color-grey-900)", lineHeight: 1.1 }}>£120</div>
                    <div style={{ fontSize: 13, color: "var(--color-grey-600)", marginTop: 2 }}>all sessions</div>
                  </div>
                </button>
                {termExpanded && (() => {
                  const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                  const groups = {};
                  (wraparoundClubConfig?.sessionDates || []).forEach(d => {
                    const month = d.date.split(" ").pop();
                    if (!groups[month]) groups[month] = [];
                    groups[month].push(d);
                  });
                  const months = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
                  return (
                    <div style={{ padding: "0 16px 14px 48px" }}>
                      <div style={{ height: 1, background: "#eee" }} />
                      {months.map((month, mi) => (
                        <div key={month} style={{ marginTop: 12, marginBottom: mi < months.length - 1 ? 4 : 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-grey-700)", marginBottom: 8 }}>{month} 2026</div>
                          {groups[month].map(d => (
                            <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #eee" }}>
                              <span style={{ fontSize: 14, color: d.active ? "var(--color-grey-900)" : "var(--color-grey-600)", textDecoration: d.active ? "none" : "line-through" }}>{d.date.split(" ").slice(0, 2).join(" ")}</span>
                              {d.active
                                ? <span style={{ fontSize: 14, color: "var(--color-grey-600)" }}>15:30–17:00</span>
                                : d.note && <Tag variant="neutral">{d.note}</Tag>
                              }
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
            {bookingOption && (
              <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                {bookingOption === "term" ? (
                  <>
                    <button onClick={() => { setFlowStep("payment"); setReviewDatesExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Continue to payment</button>
                    <button className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Add to basket</button>
                  </>
                ) : (
                  <button onClick={() => { setFlowStep("choose-dates"); setSelectedGridDates({}); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Choose sessions</button>
                )}
              </div>
            )}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* After school - Choose dates (S1 checklist) */}
        {detailPage === "after-school" && flowStep === "choose-dates" && (() => {
          const sessionDates = wraparoundClubConfig?.sessionDates || [];
          const activeDates = sessionDates.filter(d => d.active);
          const count = Object.keys(selectedGridDates).length;
          const allSelected = count === activeDates.length;
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep("booking-options")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Choose sessions</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#f5f5f5", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ padding: "4px 0" }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "var(--color-grey-900)" }}>{wraparoundClubConfig?.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-grey-500)", marginTop: 2 }}>For {selectedChild.name}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-grey-900)", marginTop: 3 }}>{wraparoundClubConfig?.timeDisplay}, 15:30–17:00</div>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--color-grey-100)", padding: "0 16px" }}>
                <button onClick={() => { if (allSelected) setSelectedGridDates({}); else { const a = {}; activeDates.forEach(d => { a[d.id] = true; }); setSelectedGridDates(a); } }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 0", width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: (allSelected || count > 0) ? "1px solid var(--color-brand-600)" : "1px solid #7e7e7e", background: (allSelected || count > 0) ? "var(--color-brand-600)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {allSelected && <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    {count > 0 && !allSelected && <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5H8" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-grey-900)" }}>Select all</span>
                </button>
                <div style={{ height: 1, background: "#eee" }} />
                {(() => {
                  const mo = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                  const moFull = { Jan:"January", Feb:"February", Mar:"March", Apr:"April", May:"May", Jun:"June", Jul:"July", Aug:"August", Sep:"September", Oct:"October", Nov:"November", Dec:"December" };
                  const grps = {};
                  sessionDates.forEach(d => {
                    const parts = d.date.split(" ");
                    const month = parts[parts.length - 1];
                    if (!grps[month]) grps[month] = [];
                    grps[month].push(d);
                  });
                  const months = Object.keys(grps).sort((a, b) => mo.indexOf(a) - mo.indexOf(b));
                  return months.map((month, mi) => (
                    <div key={month} style={{ marginTop: 12, paddingBottom: mi < months.length - 1 ? 0 : 4 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-grey-700)", marginBottom: 8 }}>{moFull[month] || month} 2026</div>
                      {grps[month].map(d => {
                        const parts = d.date.split(" ");
                        const dayDisplay = parts.slice(0, -1).join(" ");
                        const isSelected = d.id in selectedGridDates;
                        return (
                          <button key={d.id} onClick={() => { if (!d.active) return; const next = { ...selectedGridDates }; if (isSelected) delete next[d.id]; else next[d.id] = true; setSelectedGridDates(next); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", width: "100%", background: "none", borderTop: "1px solid #eee", borderLeft: "none", borderRight: "none", borderBottom: "none", cursor: d.active ? "pointer" : "default", fontFamily: "inherit", textAlign: "left" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              {d.active ? (
                                <div style={{ width: 16, height: 16, borderRadius: 4, border: isSelected ? "1px solid var(--color-brand-600)" : "1px solid #7e7e7e", background: isSelected ? "var(--color-brand-600)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  {isSelected && <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                </div>
                              ) : <div style={{ width: 16, height: 16, flexShrink: 0 }} />}
                              <span style={{ fontSize: 14, color: d.active ? "var(--color-grey-900)" : "#bbb", textDecoration: d.active ? "none" : "line-through" }}>{dayDisplay}</span>
                            </div>
                            {d.active
                              ? <span style={{ fontSize: 14, color: "var(--color-grey-600)" }}>15:30–17:00</span>
                              : d.note && <span style={{ fontSize: 12, color: "#888", background: "#f0f0f0", borderRadius: 20, padding: "2px 10px" }}>{d.note}</span>
                            }
                          </button>
                        );
                      })}
                    </div>
                  ));
                })()}
              </div>
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              {count > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#888" }}>{count} session{count !== 1 ? "s" : ""} selected</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£{count * 10}</span>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => { setFlowStep("payment"); setReviewDatesExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Continue to payment</button>
                <button className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Add to basket</button>
              </div>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}

        {/* After school - Payment (wraparound, not enough) */}
        {detailPage === "after-school" && flowStep === "payment" && !topUpCardScreen && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? (wraparoundClubConfig?.sessionDates?.filter(d => d.active).length || 12) : Object.keys(selectedGridDates).length;
          const total = sessionCount * 10;
          const shortfall = total - wraparoundBalance;
          const hasToppedUp = toppedUpAmount > 0;
          const minTopUp = Math.max(0, Math.ceil(shortfall));
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5", position: "relative" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep(isTerm ? "booking-options" : "choose-dates")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Review your booking</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setToppedUpAmount(0); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#f5f5f5" }}>
              {/* Order summary card */}
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--color-grey-100)", padding: "16px", marginBottom: 20 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: "#222", margin: "0 0 2px" }}>{wraparoundClubConfig?.name}</h2>
                <p style={{ fontSize: 12, color: "var(--color-grey-500)", margin: 0 }}>For {selectedChild.name}</p>
                <div style={{ height: 1, background: "#eee", margin: "14px 0" }} />
                <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)", margin: 0 }}>{wraparoundClubConfig?.timeDisplay} · 15:30–17:00</p>
                {/* Sessions */}
                <div style={{ height: 1, background: "#eee", margin: "14px 0" }} />
                {sessionCount === 1 ? (
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{isTerm ? (wraparoundClubConfig?.sessionDates?.filter(d => d.active)[0]?.date) : ((wraparoundClubConfig?.sessionDates || []).find(d => d.id === Object.keys(selectedGridDates)[0])?.date)}</span>
                ) : (<>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{sessionCount} sessions</span>
                    <button onClick={() => setReviewDatesExpanded(!reviewDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                      <span style={{ fontSize: 13, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: reviewDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                  {reviewDatesExpanded && (() => {
                    const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    const allDates = isTerm
                      ? (wraparoundClubConfig?.sessionDates || [])
                      : Object.keys(selectedGridDates).map(id => (wraparoundClubConfig?.sessionDates || []).find(d => d.id === id)).filter(Boolean);
                    const groups = {};
                    allDates.forEach(d => {
                      const month = d.date.split(" ").pop();
                      if (!groups[month]) groups[month] = [];
                      groups[month].push(d);
                    });
                    const sortedMonths = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
                    return (
                      <div style={{ marginTop: 28 }}>
                        {sortedMonths.map((month, mi) => (
                          <div key={month} style={{ marginBottom: mi < sortedMonths.length - 1 ? 20 : 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-grey-700)", marginBottom: 8 }}>{month} 2026</div>
                            {groups[month].map(d => (
                              <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #eee" }}>
                                <span style={{ fontSize: 14, color: d.active ? "var(--color-text-primary)" : "var(--color-grey-600)", textDecoration: d.active ? "none" : "line-through" }}>{d.date.split(" ").slice(0, 2).join(" ")}</span>
                                {d.active
                                  ? <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>15:30–17:00</span>
                                  : d.note && <Tag variant="neutral">{d.note}</Tag>
                                }
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                  </>)}
                {/* Total */}
                <div style={{ height: 1, background: "#eee", margin: "14px 0 0" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 0" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Total</span>
                  <span style={{ fontSize: 20, fontWeight: 600, color: "#222" }}>£{total.toFixed(2)}</span>
                </div>
              </div>
              {shortfall > 0 ? (
                <Banner variant="warning" title="Insufficient balance" message={`You need to top up £${shortfall.toFixed(2)} to complete this booking.`} />
              ) : hasToppedUp && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#6a6" strokeWidth="1.3" /><path d="M4 7L6 9L10 5" stroke="#6a6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span style={{ fontSize: 12, color: "#6a6" }}>Remaining balance after payment: £{(wraparoundBalance - total).toFixed(2)}</span>
                </div>
              )}
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              {shortfall <= 0 && <div style={{ fontSize: 11, color: "#888", textAlign: "center", marginBottom: 10, lineHeight: 1.4 }}>By booking, you agree to the school's <span style={{ textDecoration: "underline", cursor: "pointer" }}>terms and conditions</span> for this activity</div>}
              {shortfall > 0 ? (
                <button onClick={() => { setShowTopUpSheet(true); setTopUpAmount(minTopUp); setTopUpPaymentMethod("card"); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Top up now
                </button>
              ) : (
                <button onClick={() => { setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Complete booking
                </button>
              )}
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>

            {/* ===== Top-up full screen ===== */}
            {showTopUpSheet && (
              <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", background: "#f5f5f5" }}>
                <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
                  <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
                  <button onClick={() => setShowTopUpSheet(false)} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Top up your account</span>
                  <button onClick={() => setShowTopUpSheet(false)} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  </button>
                </div>

                <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", background: "#fff" }}>
                  <p style={{ fontSize: 13, color: "#888", margin: "0 0 24px", textAlign: "center" }}>Minimum top-up: £{minTopUp}.00</p>

                  {/* Editable amount */}
                  <div style={{ textAlign: "center", marginBottom: 6 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
                      <span style={{ fontSize: 40, fontWeight: 700, color: "#222", letterSpacing: -1 }}>£</span>
                      <input
                        type="number"
                        value={topUpAmount}
                        onChange={(e) => { const v = parseInt(e.target.value) || 0; setTopUpAmount(Math.max(minTopUp, v)); }}
                        style={{ fontSize: 40, fontWeight: 700, color: "#222", letterSpacing: -1, border: "none", outline: "none", background: "transparent", width: `${String(topUpAmount).length * 28 + 16}px`, textAlign: "left", fontFamily: "inherit", MozAppearance: "textfield", WebkitAppearance: "none" }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginBottom: 24 }}>Tap to edit amount</div>

                  {/* Preset increment buttons */}
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 8 }}>
                    {[10, 25, 50].map((inc) => (
                      <button key={inc} onClick={() => setTopUpAmount(topUpAmount + inc)} className="btn-pill" style={{ padding: "8px 20px", borderRadius: 20, border: "1px solid #ddd", background: "#fff", fontSize: 14, fontWeight: 600, color: "#444", cursor: "pointer", fontFamily: "inherit" }}>
                        +£{inc}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
                    <button onClick={() => setTopUpAmount(minTopUp)} style={{ background: "none", border: "none", fontSize: 12, color: "#888", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Reset to minimum</button>
                  </div>

                  {/* Payment method */}
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 10 }}>Pay with</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    <button onClick={() => setTopUpPaymentMethod("card")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10, border: topUpPaymentMethod === "card" ? "2px solid var(--color-brand-600)" : "1px solid #e0e0e0", background: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: topUpPaymentMethod === "card" ? "2px solid var(--color-brand-600)" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {topUpPaymentMethod === "card" && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>Credit or debit card</span>
                      <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                        <div style={{ width: 28, height: 18, borderRadius: 3, background: "#1a1f71", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 8, fontWeight: 700 }}>VISA</span></div>
                        <div style={{ width: 28, height: 18, borderRadius: 3, background: "#eb001b", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 7, fontWeight: 700 }}>MC</span></div>
                      </div>
                    </button>
                    <button onClick={() => setTopUpPaymentMethod("apple")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10, border: topUpPaymentMethod === "apple" ? "2px solid var(--color-brand-600)" : "1px solid #e0e0e0", background: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: topUpPaymentMethod === "apple" ? "2px solid var(--color-brand-600)" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {topUpPaymentMethod === "apple" && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>Apple Pay</span>
                      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" style={{ flexShrink: 0, marginLeft: "auto" }}>
                        <path d="M14.5 0.8C13.4 2.1 11.7 3.1 10.3 3C10.1 1.6 10.8 0.1 11.8 -0.6C12.9 -1.4 14.4 -1.8 15 -0.2C14.9 0 14.7 0.4 14.5 0.8Z" fill="#333" transform="translate(0,4)" />
                        <path d="M15 4.5C13.3 4.4 11.8 5.4 11 5.4C10.1 5.4 8.8 4.5 7.4 4.6C5.6 4.6 3.9 5.6 3 7.2C1.1 10.4 2.5 15.2 4.3 17.8C5.2 19.1 6.3 20.5 7.7 20.4C9 20.4 9.5 19.6 11.1 19.6C12.7 19.6 13.2 20.4 14.5 20.4C15.9 20.4 16.9 19.1 17.8 17.8C18.4 16.9 18.9 15.9 19.2 14.8C16.7 13.8 16 10.4 18.4 8.8C17.5 6.3 15.8 4.6 15 4.5Z" fill="#333" transform="translate(-2,2) scale(0.85)" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#f8f8f8" }}>
                  <button onClick={() => {
                    if (topUpPaymentMethod === "apple") {
                      setShowTopUpApplePay(true);
                      setTimeout(() => { setToppedUpAmount(topUpAmount); setShowTopUpApplePay(false); setShowTopUpSheet(false); }, 4500);
                    } else {
                      setShowTopUpSheet(false);
                      setTopUpCardScreen(true);
                      setTopUpCardFilled(false);
                    }
                  }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    Top up · £{topUpAmount}.00
                  </button>
                </div>
                <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
                  <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
                </div>

                {/* Apple Pay overlay */}
                {showTopUpApplePay && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 60, animation: "slideUp 0.3s ease-out" }}>
                    <div style={{ background: "#1c1c1e", borderRadius: "20px 20px 0 0", padding: "16px 20px 28px", color: "#fff" }}>
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                        <div style={{ width: 36, height: 4, borderRadius: 2, background: "#555" }} />
                      </div>
                      <div style={{ textAlign: "center", marginBottom: 20 }}>
                        <div style={{ fontSize: 12, color: "#aaa", marginBottom: 4 }}>ARBOR EDUCATION</div>
                        <div style={{ fontSize: 32, fontWeight: 700 }}>£{topUpAmount}.00</div>
                        <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Account top-up</div>
                      </div>
                      <div style={{ background: "#2c2c2e", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 32, height: 20, borderRadius: 4, background: "#1a1f71", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 8, fontWeight: 700 }}>VISA</span></div>
                            <span style={{ fontSize: 13, color: "#ccc" }}>····4289</span>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3L9 7L5 11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <rect x="4" y="8" width="32" height="24" rx="4" stroke="#fff" strokeWidth="1.5" />
                          <circle cx="20" cy="18" r="5" stroke="#fff" strokeWidth="1.3" />
                          <path d="M17 22C17 22 18.5 25 20 25C21.5 25 23 22 23 22" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        <span style={{ fontSize: 12, color: "#aaa" }}>Confirm with Face ID</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          );
        })()}

        {/* After school - Top-up card entry screen */}
        {detailPage === "after-school" && flowStep === "payment" && topUpCardScreen && (() => {
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => { setTopUpCardScreen(false); setShowTopUpSheet(true); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Payment details</span>
              <button onClick={() => { setTopUpCardScreen(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", background: "#f5f5f5" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 13, color: "#888" }}>Top-up amount</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#222" }}>£{topUpAmount}.00</div>
              </div>
              {["Name on card", "Card number", "Expiry date", "CVV"].map((label, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6 }}>{label}</div>
                  <button onClick={() => setTopUpCardFilled(true)} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #ddd", background: "#fff", fontSize: 14, color: topUpCardFilled ? "#333" : "#ccc", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}>
                    {topUpCardFilled ? (i === 0 ? "Kate Burns" : i === 1 ? "4289 3920 1847 5562" : i === 2 ? "09/28" : "••••") : (i === 0 ? "Full name" : i === 1 ? "0000 0000 0000 0000" : i === 2 ? "MM/YY" : "•••")}
                  </button>
                </div>
              ))}
              {topUpCardFilled && (
                <div style={{ background: "#f0f0f0", borderRadius: 12, padding: "14px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 30, borderRadius: 6, background: "#1a1f71", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>VISA</span></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>····5562</div>
                    <div style={{ fontSize: 11, color: "#888" }}>Expires 09/28</div>
                  </div>
                </div>
              )}
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#f8f8f8" }}>
              <button onClick={() => { if (topUpCardFilled) { setToppedUpAmount(topUpAmount); setTopUpCardScreen(false); } }} style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: topUpCardFilled ? "var(--color-brand-600)" : "#ccc", color: "#fff", fontSize: 15, fontWeight: 600, cursor: topUpCardFilled ? "pointer" : "default", fontFamily: "inherit" }}>
                Top up · £{topUpAmount}.00
              </button>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}

        {/* After school - Confirmed */}
        {detailPage === "after-school" && flowStep === "confirmed" && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? 12 : Object.keys(selectedGridDates).length;
          const total = sessionCount * 10;
          const asDayLabelsConf = Object.fromEntries((wraparoundClubConfig?.sessionDates || []).filter(d => d.active).map(d => [d.id, d.date]));
          const asDates = isTerm
            ? (wraparoundClubConfig?.sessionDates || []).filter(d => d.active).map(d => ({ id: d.id || d.date, label: d.date }))
            : Object.keys(selectedGridDates).map(id => ({ id, label: asDayLabelsConf[id] || id }));
          return (
            <BookingConfirmedScreen
              isMobile={isMobile}
              clubName={wraparoundClubConfig?.name}
              childName={selectedChild.name}
              days="Mon–Fri"
              time="15:30–17:00"
              sessionCount={sessionCount}
              dates={asDates}
              isFree={false}
              total={total}
              onClose={() => { setDetailPage(null); setFlowStep(null); setToppedUpAmount(0); }}
              onGoToBookings={() => { setFlowStep(null); setBookingNudgeRating(null); setBookingsFilter("upcoming"); setSubPage("my-bookings"); }}
              confirmedDatesExpanded={confirmedDatesExpanded}
              setConfirmedDatesExpanded={setConfirmedDatesExpanded}
              bookingNudgeRating={bookingNudgeRating}
              setBookingNudgeRating={setBookingNudgeRating}
            />
          );
        })()}


        {/* ==================== BREAKFAST CLUB FLOW ==================== */}

        {/* Breakfast - Detail page */}
        {detailPage === "breakfast" && !flowStep && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--color-white)" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "var(--color-white)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setDetailDatesExpanded(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Club details</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setDetailDatesExpanded(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div ref={bkDetailRef} style={{ flex: 1, overflowY: "auto", background: "var(--color-grey-050)", paddingBottom: selectedBkPeriod ? 88 : 0 }}>
              {(() => {
                const sectionLabel = { fontSize: 11, fontWeight: 600, color: "var(--color-grey-700)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 };
                const dailyPeriods  = activeBkPeriods.filter(p => p.type === "daily");
                const termlyPeriods = activeBkPeriods.filter(p => p.type === "termly");
                const fmtPrice = (n) => bkIsFree ? "Free" : (n % 1 === 0 ? `£${n}` : `£${n.toFixed(2)}`);
                const minDaily  = dailyPeriods.length  ? Math.min(...dailyPeriods.map(p => p.price))  : null;
                const minTermly = termlyPeriods.length ? Math.min(...termlyPeriods.map(p => p.price)) : null;
                // Score each period's days string by which weekday it extends to —
                // used to surface the broadest day coverage in the header.
                const bkDayEndScore = (s) => ({ Fri: 5, Thu: 4, Wed: 3, Tue: 2, Mon: 1 }[Object.keys({ Fri: 5, Thu: 4, Wed: 3, Tue: 2, Mon: 1 }).find(d => s.includes(d))] ?? 0);
                const broadestDays = [...activeBkPeriods].sort((a, b) => bkDayEndScore(b.days) - bkDayEndScore(a.days))[0].days;
                const earliestStart = activeBkPeriods.map(p => p.start).sort()[0];
                const bkTimeHeader = activeBkTimesVary ? `From ${earliestStart}` : `${activeBkPeriods[0].start}–${activeBkPeriods[0].end}`;
                const bkPriceHint = bkIsFree ? "Free" : minDaily !== null
                  ? (activeBkPeriods.length > 1 ? `From ${fmtPrice(minDaily)}` : fmtPrice(minDaily)) + " per session"
                  : (activeBkPeriods.length > 1 ? `From ${fmtPrice(minTermly)}` : fmtPrice(minTermly)) + " all sessions";
                return (
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Card 1: Details */}
                  <div style={{ background: "#fff", borderRadius: 12, padding: "20px 16px 0", border: "1px solid var(--color-grey-100)" }}>
                    <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--color-grey-900)", margin: "0 0 2px" }}>Breakfast club</h2>
                    <p style={{ fontSize: 12, color: "var(--color-grey-500)", margin: "0 0 12px" }}>For {selectedChild.name}</p>
                    <div style={{ height: 1, background: "#eee", marginBottom: 14 }} />
                    <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)", margin: 0 }}>{broadestDays} · {bkTimeHeader}</p>
                    <p style={{ fontSize: 13, color: "var(--color-grey-700)", margin: "3px 0 8px" }}>{bkPriceHint}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <MapPin size={13} color="var(--color-grey-500)" strokeWidth={1.5} />
                        <span style={{ fontSize: 13, color: "var(--color-grey-500)" }}>Dining Hall</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Users size={13} color="var(--color-grey-500)" strokeWidth={1.5} />
                        <span style={{ fontSize: 13, color: "var(--color-grey-500)" }}>Led by school staff</span>
                      </div>
                    </div>
                    {/* Sessions */}
                    <div style={{ height: 1, background: "#eee" }} />
                    <div style={{ padding: "16px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-grey-900)" }}>{breakfastSessionDates.filter(d => d.active).length} sessions</span>
                        <button onClick={() => setDetailDatesExpanded(!detailDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                          <span style={{ fontSize: 13, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: detailDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                      </div>
                      {detailDatesExpanded && (() => {
                        const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                        const weeks = breakfastSessionDates.filter(d => d.weekLabel);
                        const groups = {};
                        weeks.forEach(d => { const month = d.label.split(" ").pop(); if (!groups[month]) groups[month] = []; groups[month].push(d); });
                        const sortedMonths = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
                        return (
                          <div style={{ marginTop: 28 }}>
                            {sortedMonths.map((month, mi) => (
                              <div key={month} style={{ marginBottom: mi < sortedMonths.length - 1 ? 20 : 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-grey-700)", marginBottom: 8 }}>{month} 2026</div>
                                {groups[month].map(d => (
                                  <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #eee" }}>
                                    <span style={{ fontSize: 14, color: d.active ? "var(--color-grey-900)" : "#bbb", textDecoration: d.active ? "none" : "line-through" }}>{d.weekLabel}</span>
                                    {!d.active && d.note && <span style={{ fontSize: 12, color: "#888", background: "#f0f0f0", borderRadius: 20, padding: "2px 10px" }}>{d.note}</span>}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  {/* Card 2: About — inline read more */}
                  <div style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--color-grey-100)", padding: "16px" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-grey-900)", marginBottom: 8 }}>About this club</div>
                    <p style={{ fontSize: 14, color: "var(--color-grey-900)", lineHeight: 1.6, margin: "0 0 6px", ...(bkAboutExpanded ? {} : { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }) }}>Start the day right with our breakfast club. Children enjoy a healthy breakfast including toast, cereal, fruit and juice, with time for reading, drawing and quiet activities before the school day begins. Staff supervise children and ensure they're ready for class.</p>
                    {bkAboutExpanded && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
                        {["Healthy breakfast provided", "Quiet activities before school", "Supervised by trained staff"].map((point, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <span style={{ color: "var(--color-grey-900)", fontSize: 13, lineHeight: "1.5" }}>•</span>
                            <span style={{ fontSize: 13, color: "var(--color-grey-900)", lineHeight: "1.5" }}>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <button onClick={() => setBkAboutExpanded(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2, fontFamily: "inherit" }}>
                      {bkAboutExpanded ? "Read less" : "Read more"}
                    </button>
                  </div>
                  {/* Card 3: Booking options */}
                  {(() => {
                    const dailyPds  = activeBkPeriods.filter(p => p.type === "daily");
                    const termlyPds = activeBkPeriods.filter(p => p.type === "termly");
                    const isMixed   = dailyPds.length > 0 && termlyPds.length > 0;
                    const isSingle  = activeBkPeriods.length === 1;

                    const getContent = (period) => {
                      if (activeBkTimesVary && activeBkDaysVary) return { primary: `${period.days} · ${period.start}–${period.end}`, secondary: period.name };
                      if (activeBkTimesVary) return { primary: `${period.start}–${period.end}`, secondary: `${period.name} · ${period.days}` };
                      if (activeBkDaysVary)  return { primary: period.days, secondary: `${period.name} · ${period.start}–${period.end}` };
                      return { primary: period.name, secondary: `${period.days} · ${period.start}–${period.end}` };
                    };

                    const scrollAfterRender = (el) => requestAnimationFrame(() => {
                      const container = bkDetailRef.current;
                      if (!container || !el) return;
                      const cRect = container.getBoundingClientRect();
                      const eRect = el.getBoundingClientRect();
                      if (eRect.bottom > cRect.bottom - 88) container.scrollTop += (eRect.bottom - cRect.bottom) + 88 + 8;
                    });

                    const renderRow = (period, showDivider) => {
                      const isSelected = selectedBkPeriod?.id === period.id;
                      const isTermly = period.type === "termly";
                      const { primary, secondary } = getContent(period);
                      return (
                        <button key={period.id} onClick={(e) => { setSelectedBkPeriod(period); setBookingOption(isTermly ? "term" : "individual"); scrollAfterRender(e.currentTarget); }} style={{ display: "flex", alignItems: "center", width: "100%", padding: "10px 0", background: "none", border: "none", borderTop: showDivider ? "1px solid #eee" : "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12 }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", border: isSelected ? "2px solid var(--color-brand-600)" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {isSelected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)" }}>{primary}</div>
                            <div style={{ fontSize: 13, color: "var(--color-grey-500)", marginTop: 1 }}>{secondary}</div>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-grey-900)" }}>{fmtPrice(period.price)}</div>
                          </div>
                        </button>
                      );
                    };

                    // S5: two separate selectable cards
                    if (isMixed) {
                      return (<>
                        {[
                          { pds: dailyPds,  title: "Choose your sessions", bookingType: "individual" },
                          { pds: termlyPds, title: "Block booking",    bookingType: "term" },
                        ].map(({ pds, title, bookingType }) => {
                          const isGroupSelected = pds.some(p => p.id === selectedBkPeriod?.id);
                          return (
                            <button key={bookingType} onClick={(e) => { setSelectedBkPeriod(pds[0]); setBookingOption(bookingType); scrollAfterRender(e.currentTarget); }}
                              style={{ display: "block", width: "100%", background: "#fff", borderRadius: 12, border: isGroupSelected ? "2px solid var(--color-brand-600)" : "1px solid var(--color-grey-100)", padding: isGroupSelected ? "13px 15px" : "14px 16px", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--color-grey-500)", marginBottom: 8 }}>{title}</div>
                              <div style={{ height: 1, background: "#eee", marginBottom: 10 }} />
                              {pds.map((period, i) => {
                                const { primary, secondary } = getContent(period);
                                return (
                                  <div key={period.id} style={{ paddingTop: i > 0 ? 10 : 0, borderTop: i > 0 ? "1px solid #eee" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: isGroupSelected ? "2px solid var(--color-brand-600)" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                      {isGroupSelected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                      <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)" }}>{primary}</div>
                                      <div style={{ fontSize: 13, color: "var(--color-grey-500)", marginTop: 1 }}>{secondary}</div>
                                    </div>
                                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                                      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-grey-900)" }}>{fmtPrice(period.price)}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </button>
                          );
                        })}
                      </>);
                    }

                    // S1/S2/S3/S4: single card
                    const cardTitle = activeBkPeriods.every(p => p.type === "termly") ? "Block booking" : "Choose your sessions";
                    return (
                      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--color-grey-100)", padding: "14px 16px" }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--color-grey-500)", marginBottom: 8 }}>{cardTitle}</div>
                        <div style={{ height: 1, background: "#eee", marginBottom: 10 }} />
                        {isSingle ? (() => {
                          const period = activeBkPeriods[0];
                          const { primary, secondary } = getContent(period);
                          return (
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid var(--color-brand-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)" }}>{primary}</div>
                                <div style={{ fontSize: 13, color: "var(--color-grey-500)", marginTop: 1 }}>{secondary}</div>
                              </div>
                              <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-grey-900)" }}>{fmtPrice(period.price)}</div>
                              </div>
                            </div>
                          );
                        })() : activeBkPeriods.map((p, i) => renderRow(p, i > 0))}
                      </div>
                    );
                  })()}
                </div>
                );
              })()}
            </div>
            {selectedBkPeriod && (
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <button
                onClick={() => {
                  if (selectedBkPeriod.type === "termly") { setFlowStep("payment"); setReviewDatesExpanded(false); }
                  else { setFlowStep("choose-dates"); setSelectedDates2({}); setBkPatternApplied(false); }
                }}
                className="btn-action"
                style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                {selectedBkPeriod.type === "termly" ? "Continue to payment" : "Choose sessions"}
              </button>
            </div>
            )}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f8f8", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Breakfast - Booking options */}
        {detailPage === "breakfast" && flowStep === "booking-options" && (() => {
          const getBkTitle = (period) => {
            if (activeBkTimesVary && activeBkDaysVary) return `${period.days} · ${period.start}–${period.end}`;
            if (activeBkTimesVary) return `${period.start}–${period.end}`;
            if (activeBkDaysVary)  return period.days;
            return period.type === "daily" ? "Individual sessions" : "Block booking";
          };
          const getBkSubtitle = (period) => {
            if (activeBkPeriods.length <= 1 || (!activeBkTimesVary && !activeBkDaysVary)) return null;
            return period.type === "daily" ? "Individual sessions" : "Block booking";
          };
          const bkToMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
          const sortedBkPeriods = [...activeBkPeriods].sort((a, b) => {
            if (a.type !== b.type) return a.type === "daily" ? -1 : 1;
            return bkToMin(a.start) - bkToMin(b.start);
          });
          const effectiveBkPeriod = selectedBkPeriod ?? (activeBkPeriods.length === 1 ? activeBkPeriods[0] : null);
          const effectiveBkOption = bookingOption ?? (effectiveBkPeriod?.type === "termly" ? "term" : "individual");
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => { setFlowStep(null); setBookingOption(null); setSelectedBkPeriod(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Booking options</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setSelectedBkPeriod(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#f5f5f5", display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Context */}
              <div style={{ padding: "4px 0 8px" }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "var(--color-grey-900)" }}>Breakfast club</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-grey-900)", marginTop: 2 }}>Mon–Fri</div>
                <div style={{ fontSize: 12, color: "var(--color-grey-500)", marginTop: 3 }}>For {selectedChild.name}</div>
              </div>
              {/* One card per membership period. Each period is either daily or termly — set by school in Arbor. */}
              {sortedBkPeriods.map((period) => {
                const isSelected = effectiveBkPeriod?.id === period.id;
                const isTermly = period.type === "termly";
                const subtitle = getBkSubtitle(period);
                return (
                  <button key={period.id} onClick={() => { setSelectedBkPeriod(period); setBookingOption(isTermly ? "term" : "individual"); setTermExpanded(false); }}
                    style={{ display: "flex", alignItems: "center", width: "100%", padding: isSelected ? "13px 15px" : "14px 16px", background: "#fff", borderRadius: 12, border: isSelected ? "2px solid var(--color-brand-600)" : "1px solid var(--color-grey-100)", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: isSelected ? "2px solid var(--color-brand-600)" : "2px solid var(--color-border-strong)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {isSelected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)" }}>{getBkTitle(period)}</div>
                      {subtitle && <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 2 }}>{subtitle}</div>}
                      {isTermly && period.sessionsRemaining && <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>{period.sessionsRemaining} sessions remaining</div>}
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.2 }}>£{period.price}</div>
                      <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 1 }}>{isTermly ? "all sessions" : "per session"}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            {effectiveBkPeriod && (
              <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                {effectiveBkOption === "term" ? (
                  <>
                    <button onClick={() => { setFlowStep("payment"); setReviewDatesExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Continue to payment</button>
                    <button className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Add to basket</button>
                  </>
                ) : (
                  <button onClick={() => { setFlowStep("choose-dates"); setSelectedDates2({}); setBkPatternApplied(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Choose sessions</button>
                )}
              </div>
            )}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}

        {/* Breakfast - Choose dates (S3 week grid, 1 row) */}
        {detailPage === "breakfast" && flowStep === "choose-dates" && (() => {
          const activeDates = breakfastSessionDates.filter(d => d.active);
          const count = Object.keys(selectedDates2).length;
          const allSelected = count === activeDates.length;
          const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
          // Build weeks: each Monday entry (has weekLabel) starts a new week
          const weeks = [];
          let currentWeek = null;
          breakfastSessionDates.forEach(d => {
            if (d.weekLabel) { currentWeek = { label: d.weekLabel, days: [d] }; weeks.push(currentWeek); }
            else if (currentWeek) { currentWeek.days.push(d); }
          });
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep(null)} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Choose sessions</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div ref={bkScrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#f5f5f5", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ padding: "4px 0" }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "var(--color-grey-900)" }}>Breakfast club</div>
                <div style={{ fontSize: 12, color: "var(--color-grey-500)", marginTop: 2 }}>For {selectedChild.name}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-grey-900)", marginTop: 3 }}>{selectedBkPeriod ? `${selectedBkPeriod.start}–${selectedBkPeriod.end}` : ""}</div>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--color-grey-100)", overflow: "hidden" }}>
                {/* Column headers + select all */}
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) repeat(5, 44px)", padding: "0 16px", borderBottom: "1px solid #eee", alignItems: "center" }}>
                  <button onClick={() => { if (allSelected) { setSelectedDates2({}); } else { const a = {}; activeDates.forEach(d => { a[d.id] = true; }); setSelectedDates2(a); } }} style={{ padding: "12px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-brand-600)" }}>
                      {allSelected ? "Deselect all" : count > 0 ? `${count} selected` : "Select all"}
                    </span>
                  </button>
                  {dayLabels.map(day => (
                    <div key={day} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-grey-500)" }}>{day}</span>
                    </div>
                  ))}
                </div>
                {/* Week rows */}
                {weeks.map((week, wi) => {
                  const isHalfTerm = week.days.every(d => !d.active);
                  if (isHalfTerm) {
                    return (
                      <div key={week.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderTop: "1px solid #eee", background: "#fafafa" }}>
                        <span style={{ fontSize: 13, color: "#bbb" }}>{week.label}</span>
                        <span style={{ fontSize: 12, color: "#bbb", background: "#f0f0f0", borderRadius: 20, padding: "2px 10px" }}>Half term</span>
                      </div>
                    );
                  }
                  return (
                    <div key={week.label} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) repeat(5, 44px)", padding: "0 16px", borderTop: wi > 0 ? "1px solid #eee" : "none", alignItems: "center", minHeight: 44 }}>
                      <span style={{ fontSize: 13, color: "var(--color-grey-700)" }}>{week.label}</span>
                      {week.days.map(d => {
                        const isSelected = d.id in selectedDates2;
                        return (
                          <button key={d.id} onClick={() => { setSelectedDates2(prev => { const next = { ...prev }; if (isSelected) delete next[d.id]; else next[d.id] = true; return next; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 44, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                            <div style={{ width: 22, height: 22, borderRadius: 6, border: isSelected ? "1px solid var(--color-brand-600)" : "1px solid #ccc", background: isSelected ? "var(--color-brand-600)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {isSelected && <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              {count > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#888" }}>{count} session{count !== 1 ? "s" : ""} selected</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£{count * (selectedBkPeriod?.price ?? 5)}</span>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => { setFlowStep("payment"); setReviewDatesExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Continue to payment</button>
                <button className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Add to basket</button>
              </div>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}

        {/* Breakfast - Payment (wraparound, enough balance) */}
        {detailPage === "breakfast" && flowStep === "payment" && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? breakfastSessionDates.filter(d => d.active).length : Object.keys(selectedDates2).length;
          const total = isTerm ? (selectedBkPeriod?.price ?? 0) : sessionCount * (selectedBkPeriod?.price ?? 5);
          const hasEnough = wraparoundBalance >= total;
          const dayAbbrevs = ["Mon","Tue","Wed","Thu","Fri"];
          const uniqueSelectedDays = isTerm ? dayAbbrevs : [...new Set(Object.keys(selectedDates2).map(id => { const d = breakfastSessionDates.find(s => s.id === id); return d ? d.label.split(" ")[0] : null; }).filter(Boolean))].sort((a,b) => dayAbbrevs.indexOf(a) - dayAbbrevs.indexOf(b));
          const daysLabel = uniqueSelectedDays.length === 5 ? "Mon–Fri" : uniqueSelectedDays.join(", ");
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep(isTerm ? "booking-options" : "choose-dates")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Review your booking</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#f5f5f5" }}>
              {/* Order summary card */}
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid var(--color-grey-100)", padding: "16px", marginBottom: 20 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: "#222", margin: "0 0 2px" }}>Breakfast club</h2>
                <p style={{ fontSize: 12, color: "var(--color-grey-500)", margin: 0 }}>For {selectedChild.name}</p>
                <div style={{ height: 1, background: "#eee", margin: "14px 0" }} />
                <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-grey-900)", margin: 0 }}>{daysLabel}{selectedBkPeriod ? ` · ${selectedBkPeriod.start}–${selectedBkPeriod.end}` : ""}</p>
                {/* Sessions */}
                <div style={{ height: 1, background: "#eee", margin: "14px 0" }} />
                {sessionCount === 1 ? (
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{isTerm ? breakfastSessionDates.filter(d => d.weekLabel && d.active)[0]?.weekLabel : breakfastSessionDates.find(s => s.id === Object.keys(selectedDates2)[0])?.label}</span>
                ) : (<>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{sessionCount} sessions</span>
                    <button onClick={() => setReviewDatesExpanded(!reviewDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                      <span style={{ fontSize: 13, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: reviewDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                  {reviewDatesExpanded && (() => {
                    const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    if (isTerm) {
                      const weeks = breakfastSessionDates.filter(d => d.weekLabel);
                      const groups = {};
                      weeks.forEach(d => { const m = d.label.split(" ").pop(); if (!groups[m]) groups[m] = []; groups[m].push(d); });
                      const months = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
                      return (
                        <div style={{ marginTop: 28 }}>
                          {months.map((month, mi) => (
                            <div key={month} style={{ marginBottom: mi < months.length - 1 ? 20 : 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-grey-700)", marginBottom: 8 }}>{month} 2026</div>
                              {groups[month].map(d => (
                                <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #eee" }}>
                                  <span style={{ fontSize: 14, color: d.active ? "var(--color-text-primary)" : "var(--color-grey-600)", textDecoration: d.active ? "none" : "line-through" }}>{d.weekLabel}</span>
                                  {d.active
                                    ? <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{selectedBkPeriod && activeBkTimesVary ? `${selectedBkPeriod.start}–${selectedBkPeriod.end}` : ""}</span>
                                    : d.note && <Tag variant="neutral">{d.note}</Tag>
                                  }
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      );
                    } else {
                      const selected = Object.keys(selectedDates2).map(id => ({ id, session: breakfastSessionDates.find(s => s.id === id), time: selectedDates2[id] })).filter(x => x.session);
                      const groups = {};
                      selected.forEach(x => { const m = x.session.label.split(" ").pop(); if (!groups[m]) groups[m] = []; groups[m].push(x); });
                      const months = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
                      return (
                        <div style={{ marginTop: 28 }}>
                          {months.map((month, mi) => (
                            <div key={month} style={{ marginBottom: mi < months.length - 1 ? 20 : 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-grey-700)", marginBottom: 8 }}>{month} 2026</div>
                              {groups[month].map(x => (
                                <div key={x.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid #eee" }}>
                                  <span style={{ fontSize: 14, color: "#222" }}>{x.session.label.split(" ").slice(0, 2).join(" ")}</span>
                                  {selectedBkPeriod && activeBkTimesVary && <span style={{ fontSize: 14, color: "#666" }}>{selectedBkPeriod.start}–{selectedBkPeriod.end}</span>}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      );
                    }
                  })()}
                  </>)}
                {/* Total */}
                <div style={{ height: 1, background: "#eee", margin: "14px 0 0" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 0" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Total</span>
                  <span style={{ fontSize: 20, fontWeight: 600, color: "#222" }}>£{total.toFixed(2)}</span>
                </div>
              </div>
              {hasEnough && !isTerm && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px", background: "#f6f8ff", border: "1px solid #e0e6f0", borderRadius: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="7" cy="7" r="6" stroke="#7888a8" strokeWidth="1.3" /><path d="M7 4V7.5" stroke="#7888a8" strokeWidth="1.3" strokeLinecap="round" /><circle cx="7" cy="10" r="0.6" fill="#7888a8" /></svg>
                  <span style={{ fontSize: 12, color: "#5a6a85", lineHeight: 1.4 }}>£{selectedBkPeriod?.price.toFixed(2)} deducted from your account each day your child attends</span>
                </div>
              )}
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <div style={{ fontSize: 11, color: "#888", textAlign: "center", marginBottom: 10, lineHeight: 1.4 }}>By booking, you agree to the school's <span style={{ textDecoration: "underline", cursor: "pointer" }}>terms and conditions</span> for this activity</div>
              <button onClick={() => { setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "var(--color-brand-600)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Complete booking
              </button>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}

        {/* Breakfast - Confirmed */}
        {detailPage === "breakfast" && flowStep === "confirmed" && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? 60 : Object.keys(selectedDates2).length;
          const total = isTerm ? (selectedBkPeriod?.price ?? 0) : sessionCount * (selectedBkPeriod?.price ?? 5);
          const dayAbbrevs = ["Mon","Tue","Wed","Thu","Fri"];
          const uniqueSelectedDays = isTerm ? dayAbbrevs : [...new Set(Object.keys(selectedDates2).map(id => { const d = breakfastSessionDates.find(s => s.id === id); return d ? d.label.split(" ")[0] : null; }).filter(Boolean))].sort((a,b) => dayAbbrevs.indexOf(a) - dayAbbrevs.indexOf(b));
          const daysLabel = uniqueSelectedDays.length === 5 ? "Mon–Fri" : uniqueSelectedDays.join(", ");
          const bkDates = Object.keys(selectedDates2).map(id => ({ id, label: breakfastSessionDates.find(s => s.id === id)?.label || id }));
          const periodLabel = selectedBkPeriod ? `${selectedBkPeriod.name}${activeBkPeriodMeta(selectedBkPeriod) ? ` · ${activeBkPeriodMeta(selectedBkPeriod)}` : ""}` : undefined;
          return (
            <BookingConfirmedScreen
              isMobile={isMobile}
              clubName="Breakfast club"
              childName={selectedChild.name}
              periodLabel={periodLabel}
              days={daysLabel}
              time={selectedBkPeriod ? `${selectedBkPeriod.start}–${selectedBkPeriod.end}` : "07:45–08:30"}
              sessionCount={sessionCount}
              dates={bkDates}
              isFree={false}
              total={total}
              onClose={() => { setDetailPage(null); setFlowStep(null); }}
              onGoToBookings={() => { setFlowStep(null); setBookingNudgeRating(null); setBookingsFilter("upcoming"); setSubPage("my-bookings"); }}
              confirmedDatesExpanded={confirmedDatesExpanded}
              setConfirmedDatesExpanded={setConfirmedDatesExpanded}
              bookingNudgeRating={bookingNudgeRating}
              setBookingNudgeRating={setBookingNudgeRating}
            />
          );
        })()}
        {/* Regular app content */}
        {!detailPage && (<>
        {/* Status bar area */}
        <div
          style={{
            height: isMobile ? 20 : 50,
            background: "#fafafa",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 4,
          }}
        >
          <div
            style={{
              width: 120,
              height: 28,
              background: "#222",
              borderRadius: 14,
              display: isMobile ? "none" : "block",
            }}
          />
        </div>

        <TopNav
          selectedChild={selectedChild}
          onSwitchChild={setSelectedChild}
          hideChildSwitcher={activeTab === "messages"}
          onProfileOpen={() => { setShowProfile(true); setProfileChild(null); setProfileScreen(null); }}
        />

        {/* Content area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          {/* Trip detail page */}
          {subPage === "my-bookings" && selectedBookingItem && (
            <div style={{ background: "#F8F8F8", minHeight: "100%", display: "flex", flexDirection: "column" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                <button onClick={() => setSelectedBookingItem(null)} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>{selectedBookingItem.title}</span>
              </div>

              {/* Scrollable body */}
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 24px", minHeight: 0, display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Details card */}
                <Card padding="none" style={{ overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 16px", borderBottom: "1px solid #f0f0f0" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><rect x="2" y="3" width="12" height="11" rx="2" stroke="#888" strokeWidth="1.2"/><path d="M2 7H14" stroke="#888" strokeWidth="1.2"/><path d="M5 1.5V4" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/><path d="M11 1.5V4" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>{selectedBookingItem.dateRange}</span>
                  </div>
                  {selectedBookingItem.time && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 16px", borderBottom: "1px solid #f0f0f0" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><circle cx="8" cy="8" r="6" stroke="#888" strokeWidth="1.2"/><path d="M8 5V8.5L10.5 10" stroke="#888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize: 14, color: "#555" }}>{selectedBookingItem.time}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 16px", borderBottom: "1px solid #f0f0f0" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M8 1.5C5.79 1.5 4 3.29 4 5.5C4 8.5 8 14.5 8 14.5C8 14.5 12 8.5 12 5.5C12 3.29 10.21 1.5 8 1.5Z" stroke="#888" strokeWidth="1.2"/><circle cx="8" cy="5.5" r="1.5" stroke="#888" strokeWidth="1.2"/></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>{selectedBookingItem.location}</span>
                  </div>
                  {/* About this trip accordion */}
                  <button
                    onClick={() => setAboutTripOpen(o => !o)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "13px 16px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    <span style={{ fontSize: 14, color: "#555" }}>About this trip</span>
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, transform: aboutTripOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {aboutTripOpen && (
                    <div style={{ padding: "0 16px 14px" }}>
                      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, margin: 0 }}>{selectedBookingItem.description}</p>
                    </div>
                  )}
                </Card>

                {/* Payment card */}
                <Card padding="none" style={{ overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: 14, color: "#555" }}>Total cost</span>
                    <span style={{ fontSize: 14, color: "#333" }}>£{selectedBookingItem.totalCost}</span>
                  </div>
                  {selectedBookingItem.installments.map((inst, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{ fontSize: 14, color: "#888" }}>{inst.label} · {inst.date}</span>
                      <span style={{ fontSize: 14, color: "#888" }}>−£{inst.amount}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#F0FAF3" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>Remaining</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>£{selectedBookingItem.remaining}</span>
                  </div>
                </Card>

              </div>

              {/* Fixed footer */}
              <div style={{ padding: "12px 16px 20px", background: "#fff", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                <div style={{ fontSize: 13, color: "#888", textAlign: "center", marginBottom: 10 }}>Due by {selectedBookingItem.deadline}</div>
                <Button variant="primary" style={{ width: "100%" }}>
                  {`Pay £${selectedBookingItem.remaining}`}
                </Button>
              </div>
            </div>
          )}

          {/* Sub-pages with back button */}
          {subPage === "my-bookings" && selectedUpcomingItem && (() => {
            const item = selectedUpcomingItem;
            const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            const bookingNavTitle = { "Club": "Club booking", "Wraparound": "Wraparound booking", "Trip": "Trip booking", "Meals": "Meal order", "Parents' evening": "Parents' evening", "Shop": "Shop order" }[item.category] ?? item.category;
            return (
              <div style={{ background: "#F8F8F8", minHeight: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                  <button onClick={() => { setSelectedUpcomingItem(null); setBookingDetailDatesExpanded(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <span style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-primary)" }}>{bookingNavTitle}</span>
                </div>

                {/* Scrollable body */}
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}>
                  {/* Summary card */}
                  <div style={{ background: "#fff", borderRadius: 12, padding: "16px", border: "1px solid var(--color-grey-100)", marginBottom: 12 }}>
                    {/* Title + child chip */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                      <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px" }}>{item.title}</h2>
                      {item.child && <span style={{ background: item.childColour.bg, border: `1px solid ${item.childColour.border}`, color: item.childColour.text, borderRadius: 20, padding: "3px 10px", fontSize: 13, fontWeight: 500, marginTop: 2, flexShrink: 0, maxWidth: 72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.child}</span>}
                    </div>
                    <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0" }} />
                    <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{getClubScheduleLabel(item, clubExtras[item.id])}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8 }}>
                      {item.location && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <MapPin size={14} color="var(--color-text-secondary)" strokeWidth={1.5} />
                          <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{item.location}</span>
                        </div>
                      )}
                      {item.clubLead && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Users size={14} color="var(--color-text-secondary)" strokeWidth={1.5} />
                          <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{item.clubLead}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Sessions */}
                      {item.sessions && (<>
                        <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0" }} />
                        <div>
                          {item.sessions === 1 ? (
                            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{item.dates?.[0]?.label}</span>
                          ) : (<>
                          {(() => {
                            const hasPast = (item.dates || []).some(d => d.past);
                            return (
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>
                                  {hasPast ? `${item.sessions} sessions remaining` : `${item.sessions} sessions`}
                                </span>
                                {item.dates && (
                                  <button onClick={() => { setBookingDetailDatesExpanded(!bookingDetailDatesExpanded); setPastSessionsCollapsed(true); }} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
                                    <span style={{ fontSize: 14, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2 }}>View dates</span>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: bookingDetailDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  </button>
                                )}
                              </div>
                            );
                          })()}
                          {bookingDetailDatesExpanded && item.dates && (() => {
                            const pastDates = item.dates.filter(d => d.past);
                            const upcomingDates = item.dates.filter(d => !d.past);
                            const groups = {};
                            upcomingDates.forEach(d => {
                              const parts = d.label.split(" ");
                              const month = parts[parts.length - 1];
                              const dayDisplay = parts.slice(0, -1).join(" ");
                              if (!groups[month]) groups[month] = [];
                              groups[month].push({ ...d, dayDisplay });
                            });
                            const sortedMonths = Object.keys(groups).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
                            const multiMonth = sortedMonths.length > 1;
                            return (
                              <div style={{ marginTop: 28 }}>
                                {/* Past sessions — collapsed by default */}
                                {pastDates.length > 0 && (
                                  <div style={{ marginBottom: 16 }}>
                                    <button
                                      onClick={() => setPastSessionsCollapsed(!pastSessionsCollapsed)}
                                      style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: pastSessionsCollapsed ? 0 : 8 }}
                                    >
                                      <span style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>
                                        {pastSessionsCollapsed ? `Show ${pastDates.length} past sessions` : "Hide past sessions"}
                                      </span>
                                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: pastSessionsCollapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s" }}>
                                        <path d="M3 4.5L6 7.5L9 4.5" stroke="var(--color-text-tertiary)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </button>
                                    {!pastSessionsCollapsed && pastDates.map(d => {
                                      const parts = d.label.split(" ");
                                      const dayDisplay = parts.slice(0, -1).join(" ");
                                      return (
                                        <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--color-grey-100)" }}>
                                          <span style={{ fontSize: 14, color: "var(--color-grey-600)", textDecoration: "line-through" }}>{dayDisplay}</span>
                                          <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", background: "var(--color-bg-secondary)", borderRadius: 20, padding: "2px 10px" }}>Past</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                                {/* Upcoming sessions */}
                                {multiMonth ? sortedMonths.map((month, mi) => (
                                  <div key={month} style={{ marginBottom: mi < sortedMonths.length - 1 ? 20 : 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>{month} 2026</div>
                                    {groups[month].map(d => (
                                      <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--color-grey-100)" }}>
                                        <span style={{ fontSize: 14, color: d.active !== false ? "var(--color-text-primary)" : "var(--color-grey-600)", textDecoration: d.active !== false ? "none" : "line-through" }}>{d.dayDisplay}</span>
                                        {d.active !== false
                                          ? <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{item.time}</span>
                                          : d.note && <span style={{ fontSize: 12, color: "var(--color-text-secondary)", background: "var(--color-bg-secondary)", borderRadius: 20, padding: "2px 10px" }}>{d.note}</span>
                                        }
                                      </div>
                                    ))}
                                  </div>
                                )) : upcomingDates.map(d => (
                                  <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--color-grey-100)" }}>
                                    <span style={{ fontSize: 14, color: d.active !== false ? "var(--color-text-primary)" : "var(--color-grey-600)", textDecoration: d.active !== false ? "none" : "line-through" }}>{d.label}</span>
                                    {d.active !== false
                                      ? <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{item.time}</span>
                                      : d.note && <span style={{ fontSize: 12, color: "var(--color-text-secondary)", background: "var(--color-bg-secondary)", borderRadius: 20, padding: "2px 10px" }}>{d.note}</span>
                                    }
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                          </>)}
                        </div>
                      </>)}
                      {/* Paid */}
                      {item.paid !== undefined && (<>
                        <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0 0" }} />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", marginTop: 14, background: "var(--color-brand-050)", borderRadius: 10 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-success-700)" }}>{item.paid > 0 ? "Paid" : "Cost"}</div>
                          <div style={{ fontSize: 22, fontWeight: 600, color: "var(--color-success-700)" }}>{item.paid > 0 ? `£${item.paid.toFixed(2)}` : "Free"}</div>
                        </div>
                      </>)}
                    </div>
                  </div>

                  {/* Status — only shown when something needs communicating */}
                  {item.status === "cancelled" && <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}>Cancelled</span>}

                  {/* About this club */}
                  {item.description && (
                    <div style={{ background: "#fff", borderRadius: 12, padding: "16px", border: "1px solid var(--color-grey-100)" }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--color-grey-900)", marginBottom: 8 }}>About this club</div>
                      <p style={{ fontSize: 16, color: "var(--color-grey-900)", lineHeight: 1.6, margin: "0 0 6px",
                        ...(bkAboutExpanded ? {} : { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" })
                      }}>{item.description}</p>
                      <button onClick={() => setBkAboutExpanded(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 16, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2, fontFamily: "inherit" }}>
                        {bkAboutExpanded ? "Read less" : "Read more"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {subPage === "my-bookings" && !selectedBookingItem && !selectedUpcomingItem && (() => {
            const needsAttentionItems = [
              {
                id: "t1",
                title: "Year 4 residential – PGL",
                category: "Trip",
                icon: <Bus size={18} color={catColours["Trip"].iconColor} strokeWidth={1.5} />,
                dateRange: "12–14 May 2026",
                time: "Departs 08:00 · Returns 17:00",
                location: "Marchants Hill, Surrey",
                description: "A 3-day residential adventure trip for Year 4 pupils at PGL Marchants Hill. Activities include zip wire, climbing, and team challenges. All meals and accommodation included.",
                totalCost: 185,
                amountPaid: 85,
                remaining: 100,
                deadline: "1 Apr 2026",
                installments: [
                  { label: "Deposit paid", amount: 85, date: "14 Jan 2026" },
                ],
              },
              {
                id: "c1",
                title: "Coding club",
                category: "Club",
                status: "pending-payment",
                icon: <Shapes size={18} color={catColours["Club"].iconColor} strokeWidth={1.5} />,
                sub: "Thursdays · 15:30–16:30",
              },
            ];
            const upcomingItems = [
              { id: "u1", title: "Drumming",         category: "Club",             status: "confirmed", icon: <Shapes size={18} color={catColours["Club"].iconColor} strokeWidth={1.5} />,   sub: "6 Apr – 17 Jul 2026",                                     child: "Molly", childColour: children[0].avatarColour, sessions: 6, days: "Mon", time: "15:30–16:15", termDates: "6 Apr – 17 Jul 2026", dates: drummingSessionDates, paid: 110, location: "Music Block R1", clubLead: "Beat Academy", description: "Our Drumming Club introduces children to the exciting world of percussion in a fun, supportive group setting. They'll develop rhythm, coordination, and timing skills while learning a variety of drumming styles and techniques — building confidence and working towards a group performance." },
              { id: "u2", title: "Breakfast club",   category: "Wraparound",       status: "confirmed", icon: <SunMoon size={18} color={catColours["Wraparound"].iconColor} strokeWidth={1.5} />,  sub: "Mon 7 – Fri 11 Apr",                      child: "Molly", childColour: children[0].avatarColour, sessions: 5, days: "Mon – Fri", time: "07:45–08:30", paid: 25, location: "Dining Hall", clubLead: "School staff", description: "Start the day right with our breakfast club. Children enjoy a healthy breakfast including toast, cereal, fruit and juice, with time for reading, drawing and quiet activities before the school day begins. Staff supervise children and ensure they're ready for class.", dates: [{ id: "bk-apr7", label: "Mon 7 Apr", active: true }, { id: "bk-apr8", label: "Tue 8 Apr", active: true }, { id: "bk-apr9", label: "Wed 9 Apr", active: true }, { id: "bk-apr10", label: "Thu 10 Apr", active: true }, { id: "bk-apr11", label: "Fri 11 Apr", active: true }] },
              { id: "u3", title: "Football",         category: "Club",             status: "confirmed", icon: <Shapes size={18} color={catColours["Club"].iconColor} strokeWidth={1.5} />,   sub: "Tue 8 Apr",                                 child: "Molly", childColour: children[0].avatarColour, sessions: 1, days: "Tue", time: "15:30–16:30", paid: 8, location: "Sports Hall", description: "Join our Football Club and develop your skills on the pitch in a fun, structured environment. Players work on passing, shooting, and tactical awareness across the term, building teamwork and finishing with a mini tournament.", dates: [{ id: "fb-apr8", label: "Tue 8 Apr" }] },
              { id: "u4", title: "Art club",         category: "Club",             status: "cancelled", icon: <Shapes size={18} color={catColours["Club"].iconColor} strokeWidth={1.5} />,   sub: "Wed 9 Apr",                                 child: "Molly", childColour: children[0].avatarColour, sessions: 1, days: "Wed", time: "15:30–16:30", paid: 6, location: "Art Room", description: "Art Club gives children the freedom to explore drawing, painting, printmaking, and mixed media in a relaxed creative space. Each session focuses on a different technique or theme, encouraging imagination and self-expression.", dates: [{ id: "art-apr9", label: "Wed 9 Apr" }] },
              { id: "u5", title: "Parents' evening", category: "Parents' evening", status: "confirmed", icon: (
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="5" width="22" height="19" rx="2.5" stroke={catColours["Parents' evening"].iconColor} strokeWidth="1.5" />
                  <path d="M3 11H25" stroke={catColours["Parents' evening"].iconColor} strokeWidth="1.5" />
                  <path d="M9 3V6" stroke={catColours["Parents' evening"].iconColor} strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M19 3V6" stroke={catColours["Parents' evening"].iconColor} strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="10" cy="17" r="1.8" fill={catColours["Parents' evening"].iconColor} opacity="0.8" />
                  <circle cx="18" cy="17" r="1.8" fill={catColours["Parents' evening"].iconColor} opacity="0.8" />
                </svg>
              ), sub: "Thu 10 Apr · 17:40 (10 min slot)",                                              child: "Molly", childColour: children[0].avatarColour },
              { id: "u6", title: "Meals",            category: "Meals",            status: "confirmed", icon: <Utensils size={18} color={catColours["Meals"].iconColor} strokeWidth={1.5} />, sub: "w/c 7 Apr · 5 of 5 days selected",          child: "Molly", childColour: children[0].avatarColour },
              { id: "u7", title: "Meals",            category: "Meals",            status: "confirmed", icon: <Utensils size={18} color={catColours["Meals"].iconColor} strokeWidth={1.5} />, sub: "w/c 14 Apr · 3 of 5 days selected",         child: "Molly", childColour: children[0].avatarColour },
            ];
            const pastItems = [
              { id: "p1", title: "Drumming",       category: "Club",       status: "attended", icon: <Shapes size={18} color="var(--color-grey-600)" strokeWidth={1.5} />,   sub: "5 Jan – 28 Mar 2026", child: "Molly", childColour: children[0].avatarColour, sessions: 11, paid: 110, days: "Mon", time: "15:30–16:15", location: "Music Block R1", clubLead: "Beat Academy", description: "Our Drumming Club introduces children to the exciting world of percussion in a fun, supportive group setting. They'll develop rhythm, coordination, and timing skills while learning a variety of drumming styles and techniques — building confidence and working towards a group performance.", dates: [{ id: "pd-jan5", label: "Mon 5 Jan" }, { id: "pd-jan12", label: "Mon 12 Jan" }, { id: "pd-jan19", label: "Mon 19 Jan" }, { id: "pd-jan26", label: "Mon 26 Jan" }, { id: "pd-feb2", label: "Mon 2 Feb" }, { id: "pd-feb9", label: "Mon 9 Feb" }, { id: "pd-feb23", label: "Mon 23 Feb" }, { id: "pd-mar2", label: "Mon 2 Mar" }, { id: "pd-mar9", label: "Mon 9 Mar" }, { id: "pd-mar16", label: "Mon 16 Mar" }, { id: "pd-mar23", label: "Mon 23 Mar" }] },
              { id: "p2", title: "Football",       category: "Club",       status: "attended", icon: <Shapes size={18} color="var(--color-grey-600)" strokeWidth={1.5} />,   sub: "Tue 4 Mar", child: "Molly", childColour: children[0].avatarColour, sessions: 1, paid: 8, days: "Tue", time: "15:30–16:30", location: "Sports Hall", description: "Join our Football Club and develop your skills on the pitch in a fun, structured environment. Players work on passing, shooting, and tactical awareness across the term, building teamwork and finishing with a mini tournament.", dates: [{ id: "fb-mar4", label: "Tue 4 Mar" }] },
              { id: "p3", title: "Breakfast club", category: "Wraparound", status: "attended", icon: <SunMoon size={18} color="var(--color-grey-600)" strokeWidth={1.5} />,  sub: "Mon 3 – Fri 7 Mar", child: "Molly", childColour: children[0].avatarColour, sessions: 5, days: "Mon – Fri", time: "07:45–08:30", paid: 25, location: "Dining Hall", clubLead: "School staff", description: "Start the day right with our breakfast club. Children enjoy a healthy breakfast including toast, cereal, fruit and juice, with time for reading, drawing and quiet activities before the school day begins. Staff supervise children and ensure they're ready for class.", dates: [{ id: "bk-mar3", label: "Mon 3 Mar", active: true }, { id: "bk-mar4", label: "Tue 4 Mar", active: true }, { id: "bk-mar5", label: "Wed 5 Mar", active: true }, { id: "bk-mar6", label: "Thu 6 Mar", active: true }, { id: "bk-mar7", label: "Fri 7 Mar", active: true }] },
              { id: "p4", title: "Tate Modern",    category: "Trip",       status: "attended", icon: <Bus size={18} color="var(--color-grey-600)" strokeWidth={1.5} />,      sub: "Fri 28 Feb", child: "Molly", childColour: children[0].avatarColour },
              { id: "p5", title: "Meals",          category: "Meals",                          icon: <Utensils size={18} color="var(--color-grey-600)" strokeWidth={1.5} />, sub: "w/c 3 Mar · 5 of 5 days selected", child: "Molly", childColour: children[0].avatarColour },
              { id: "p6", title: "Meals",          category: "Meals",                          icon: <Utensils size={18} color="var(--color-grey-600)" strokeWidth={1.5} />, sub: "w/c 24 Feb · 4 of 5 days selected", child: "Molly", childColour: children[0].avatarColour },
              { id: "p7", title: "Art club",       category: "Club",       status: "attended", icon: <Shapes size={18} color="var(--color-grey-600)" strokeWidth={1.5} />,   sub: "Wed 5 Mar", child: "Molly", childColour: children[0].avatarColour, sessions: 1, paid: 6, days: "Wed", time: "15:30–16:30", location: "Art Room", description: "Art Club gives children the freedom to explore drawing, painting, printmaking, and mixed media in a relaxed creative space. Each session focuses on a different technique or theme, encouraging imagination and self-expression.", dates: [{ id: "art-mar5", label: "Wed 5 Mar" }] },
              { id: "p8", title: "School tie",     category: "Shop",       status: "received", icon: <ShoppingBag size={18} color="var(--color-grey-600)" strokeWidth={1.5} />, sub: "Order #1042", child: "Molly", childColour: children[0].avatarColour },
            ];

            const activeItems = bookingsFilter === "needs-attention" ? needsAttentionItems
              : bookingsFilter === "upcoming" ? upcomingItems
              : pastItems;

            return (
              <div style={{ background: "#F8F8F8", minHeight: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                  <button onClick={() => { setSubPage(null); setSelectedBookingItem(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>My bookings & orders</span>
                </div>

                {/* Pills */}
                <div style={{ display: "flex", gap: 8, padding: "4px 16px 12px", flexShrink: 0, overflowX: "auto", scrollbarWidth: "none", background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
                  {needsAttentionItems.length > 0 && (
                    <button
                      onClick={() => setBookingsFilter("needs-attention")}
                      style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: "var(--radius-round)", border: bookingsFilter === "needs-attention" ? "1px solid #0e8a0e" : "1px solid #ddd", background: bookingsFilter === "needs-attention" ? "#F0FAF3" : "#fff", cursor: "pointer", fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-2)", fontWeight: 600, color: bookingsFilter === "needs-attention" ? "#005700" : "#595959" }}
                    >
                      Needs attention
                      <span style={{ minWidth: 18, height: 18, borderRadius: 99, background: "#0e8a0e", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{bookingsNeedsAttentionCount}</span>
                    </button>
                  )}
                  {[
                    { id: "upcoming", label: "Upcoming", count: upcomingItems.length },
                    { id: "past",     label: "Past",     count: pastItems.length },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setBookingsFilter(f.id)}
                      style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: "var(--radius-round)", border: bookingsFilter === f.id ? "1px solid #0e8a0e" : "1px solid #ddd", background: bookingsFilter === f.id ? "#F0FAF3" : "#fff", cursor: "pointer", fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-2)", fontWeight: 600, color: bookingsFilter === f.id ? "#005700" : "#595959" }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* List */}
                <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 32px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {activeItems.map((item, i) => (
                      bookingsFilter === "needs-attention" ? (
                        // Structured needs-attention card
                        <Card key={item.id} padding="none" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { setSelectedBookingItem(item); setAboutTripOpen(false); }}>
                          <div style={{ padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 9, background: catColours[item.category]?.bg || "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {item.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 15, fontWeight: 600, color: "#222", marginBottom: 3 }}>{item.title}</div>
                              {item.status === "pending-payment" ? (<>
                                <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>{item.sub}</div>
                                <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "#FFFBEB", color: "#B45309", border: "1px solid #FDE68A" }}>Awaiting payment</span>
                              </>) : (<>
                                <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>{item.dateRange}</div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#2f2f2f", marginBottom: 8 }}>{`£${item.remaining} of £${item.totalCost} remaining · Due ${item.deadline}`}</div>
                                <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "#FFFBEB", color: "#B45309", border: "1px solid #FDE68A" }}>Outstanding payment</span>
                              </>)}
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        </Card>
                      ) : bookingsFilter === "upcoming" ? (
                        // Upcoming — confirmed, no action needed
                        <Card key={item.id} padding="none" style={{ overflow: "hidden", cursor: (item.category === "Club" || item.category === "Wraparound") ? "pointer" : "default" }} onClick={() => { if (item.category === "Club" || item.category === "Wraparound") { setBookingDetailDatesExpanded(false); setSelectedUpcomingItem(item); } }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 9, background: catColours[item.category]?.bg || "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {item.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "#222" }}>{item.title}</div>
                                {item.child && <span style={{ background: item.childColour.bg, border: `1px solid ${item.childColour.border}`, color: item.childColour.text, borderRadius: 20, padding: "2px 8px", fontSize: 12, fontWeight: 500, flexShrink: 0, maxWidth: 72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.child}</span>}
                              </div>
                              <div style={{ marginBottom: (item.status === "cancelled" || item.status === "pending-payment" || item.status === "pending-approval") ? 8 : 0 }}>
                                <div style={{ fontSize: 12, color: "#888" }}>{item.sub}</div>
                                {(item.time || item.sessions) && <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{[item.time, item.sessions && `${item.sessions} ${item.sessions === 1 ? "session" : "sessions"}`].filter(Boolean).join(" · ")}</div>}
                              </div>
                              {item.status === "cancelled"  && <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}>Cancelled</span>}
                              {item.status === "pending-payment"  && <Tag variant="warning">Pending · awaiting payment</Tag>}
                              {item.status === "pending-approval" && <Tag variant="warning">Awaiting school confirmation</Tag>}
                            </div>
                            {(item.category === "Club" || item.category === "Wraparound") && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </div>
                        </Card>
                      ) : (
                        // Past — historical record
                        <Card key={item.id} padding="none" style={{ overflow: "hidden", cursor: (item.category === "Club" || item.category === "Wraparound") ? "pointer" : "default" }} onClick={() => { if (item.category === "Club" || item.category === "Wraparound") { setBookingDetailDatesExpanded(false); setSelectedUpcomingItem(item); } }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--color-grey-100)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {item.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "#222" }}>{item.title}</div>
                                {item.child && <span style={{ background: item.childColour.bg, border: `1px solid ${item.childColour.border}`, color: item.childColour.text, borderRadius: 20, padding: "2px 8px", fontSize: 12, fontWeight: 500, flexShrink: 0, maxWidth: 72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.child}</span>}
                              </div>
                              <div style={{ marginBottom: item.status === "received" ? 8 : 0 }}>
                                <div style={{ fontSize: 12, color: "#888" }}>{item.sub}</div>
                                {(item.time || item.sessions) && <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{[item.time, item.sessions && `${item.sessions} ${item.sessions === 1 ? "session" : "sessions"}`].filter(Boolean).join(" · ")}</div>}
                              </div>
                              {item.status === "received" && <Tag variant="neutral">Received</Tag>}
                            </div>
                            {(item.category === "Club" || item.category === "Wraparound") && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </div>
                        </Card>
                      )
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {subPage === "browse" && (() => {
            const today = new Date(2026, 3, 10);
            const clubIcon = <Shapes size={18} color="var(--color-brand-600)" strokeWidth={1.5} />;
            const wraparoundIcon = <SunMoon size={18} color="var(--color-brand-600)" strokeWidth={1.5} />;
            const tripIcon = <Bus size={18} color="var(--color-brand-600)" strokeWidth={1.5} />;

            const browseItems = [
              { id: 1, type: "clubs", title: "Drumming", icon: clubIcon, days: "Mon", dayOrder: [1], time: "15:30\u201316:15", price: "\u00a3110", priceLabel: "all sessions", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 4, 2), deadlineLabel: "2 May", places: 7, blockOnly: true, location: "Music Block R1", clubLead: "Beat Academy" },
              { id: 16, type: "clubs", title: "Chess club", icon: clubIcon, days: "Mon", dayOrder: [1], time: "15:30\u201316:30", price: "Free", priceLabel: "", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 4, 5), deadlineLabel: "5 May", places: 24, individualOnly: true, location: "Library", clubLead: "Mr Harris" },
              { id: 5, type: "clubs", title: "Football", icon: clubIcon, days: "Tue, Wed", dayOrder: [2, 3], time: "15:30\u201316:30", price: "\u00a38", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 4, 9), deadlineLabel: "9 May", places: 15, location: "Sports Hall" },
              { id: 17, type: "clubs", title: "Dance", icon: clubIcon, days: "Tue", dayOrder: [2], time: "15:30\u201316:15", price: "\u00a366", priceLabel: "all sessions", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 4, 1), deadlineLabel: "1 May", places: 10, blockOnly: true, location: "Main Hall" },
              { id: 18, type: "clubs", title: "Choir", icon: clubIcon, days: "Tue", dayOrder: [2], time: "08:00\u201308:45", price: "Free", priceLabel: "", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 3, 17), deadlineLabel: "17 Apr", places: 3, location: "Music Block R2" },
              { id: 6, type: "clubs", title: "Art club", icon: clubIcon, days: "Wed", dayOrder: [3], time: "15:30\u201316:30", price: "\u00a36", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 4, 7), deadlineLabel: "7 May", places: 12, location: "Art Room" },
              { id: 19, type: "clubs", title: "Book club", icon: clubIcon, days: "Wed", dayOrder: [3], time: "12:30\u201313:00", price: "Free", priceLabel: "", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 4, 14), deadlineLabel: "14 May", places: 16, individualOnly: true, location: "Library" },
              { id: 7, type: "clubs", title: "Coding club", icon: clubIcon, days: "Thu", dayOrder: [4], time: "15:30\u201316:30", price: "\u00a37", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 4, 8), deadlineLabel: "8 May", places: 20, location: "ICT Suite" },
              { id: 21, type: "clubs", title: "Drama", icon: clubIcon, days: "Mon, Thu", dayOrder: [1, 4], time: "15:30\u201316:30", price: "\u00a38", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 3, 15), deadlineLabel: "15 Apr", places: 5, location: "Drama Studio" },
              { id: 8, type: "clubs", title: "Netball", icon: clubIcon, days: "Fri", dayOrder: [5], time: "15:30\u201316:30", price: "\u00a35", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 4, 4), deadlineLabel: "4 May", places: 18, location: "Sports Hall" },
              { id: 20, type: "clubs", title: "Gymnastics", icon: clubIcon, days: "Fri", dayOrder: [5], time: "15:30\u201316:30", price: "\u00a39", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", deadline: new Date(2026, 4, 4), deadlineLabel: "4 May", places: 8, location: "Sports Hall" },
              { id: 2,  type: "wraparound", title: "Monday After School Club",    icon: wraparoundIcon, days: "Mon",    dayOrder: [1], time: "15:30\u201317:00", price: "\u00a310", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", paymentTiming: "Charged at time of booking", sameDayCutoff: "Book by 12:30 on the day", deadline: null, deadlineLabel: null, places: 40 },
              { id: 22, type: "wraparound", title: "Tuesday After School Club",   icon: wraparoundIcon, days: "Tue",   dayOrder: [2], time: "15:30\u201317:00", price: "\u00a310", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", paymentTiming: "Charged at time of booking", sameDayCutoff: "Book by 12:30 on the day", deadline: null, deadlineLabel: null, places: 40 },
              { id: 23, type: "wraparound", title: "Wednesday After School Club", icon: wraparoundIcon, days: "Wed", dayOrder: [3], time: "15:30\u201317:00", price: "\u00a310", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", paymentTiming: "Charged at time of booking", sameDayCutoff: "Book by 12:30 on the day", deadline: null, deadlineLabel: null, places: 40 },
              { id: 24, type: "wraparound", title: "Thursday After School Club",  icon: wraparoundIcon, days: "Thu",  dayOrder: [4], time: "15:30\u201317:00", price: "\u00a310", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", paymentTiming: "Charged at time of booking", sameDayCutoff: "Book by 12:30 on the day", deadline: null, deadlineLabel: null, places: 40 },
              { id: 25, type: "wraparound", title: "Friday After School Club",    icon: wraparoundIcon, days: "Fri",    dayOrder: [5], time: "15:30\u201317:00", price: "\u00a310", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", paymentTiming: "Charged at time of booking", sameDayCutoff: "Book by 12:30 on the day", deadline: null, deadlineLabel: null, places: 40 },
              { id: 3, type: "wraparound", title: "Breakfast club", icon: wraparoundIcon, days: "Mon \u2013 Fri", dayOrder: [1,2,3,4,5], time: "Multiple time options", price: "\u00a35", priceLabel: "per session", termDates: "6 Apr \u2013 17 Jul 2026", paymentTiming: "Charged per session when your child attends", sameDayCutoff: "Book by 15:00 the day before", deadline: null, deadlineLabel: null, places: 29 },
              { id: 4, type: "trips", title: "The Lion King", icon: tripIcon, days: "Wed 1 Apr", dayOrder: 3, time: "11:00\u201317:00", price: "Free", priceLabel: "", termDates: null, deadline: new Date(2026, 4, 1), deadlineLabel: "1 May", places: 32 },
            ];

            const lowPlacesThreshold = 15;
            const closingSoonDays = 7;

            const clubsOnly = browseItems.filter(i => i.type === "clubs");

            const dayFilters = [
              { id: "all", label: "All" },
              { id: "mon", label: "Mon", dayOrder: 1 },
              { id: "tue", label: "Tue", dayOrder: 2 },
              { id: "wed", label: "Wed", dayOrder: 3 },
              { id: "thu", label: "Thu", dayOrder: 4 },
              { id: "fri", label: "Fri", dayOrder: 5 },
            ];

            const dayCounts = {
              all: clubsOnly.length,
              ...Object.fromEntries(
                dayFilters.filter(d => d.id !== "all").map(d => [d.id, clubsOnly.filter(i => i.dayOrder.includes(d.dayOrder)).length])
              ),
            };

            const typeFilters = [
              { id: "wraparound", label: "Wraparound care" },
              { id: "trips", label: "Trips" },
              { id: "parents-evening", label: "Parents' evenings" },
            ];

            const wraparoundOnly = browseItems.filter(i => i.type === "wraparound");
            const showWraparoundDayFilters = wraparoundOnly.length > 1;
            const activeWraparoundDayOrder = wraparoundDayFilter ? dayFilters.find(d => d.id === wraparoundDayFilter)?.dayOrder : null;
            const wraparoundDayCounts = {
              all: wraparoundOnly.length,
              ...Object.fromEntries(
                dayFilters.filter(d => d.id !== "all").map(d => [d.id, wraparoundOnly.filter(i => i.dayOrder.includes(d.dayOrder)).length])
              ),
            };

            const activeDayOrder = clubDayFilter ? dayFilters.find(d => d.id === clubDayFilter)?.dayOrder : null;
            const filtered = browseFilter === "clubs"
              ? (activeDayOrder === null || activeDayOrder === undefined ? clubsOnly : clubsOnly.filter(i => i.dayOrder.includes(activeDayOrder)))
              : browseFilter === "wraparound"
              ? (activeWraparoundDayOrder === null || activeWraparoundDayOrder === undefined ? wraparoundOnly : wraparoundOnly.filter(i => i.dayOrder.includes(activeWraparoundDayOrder)))
              : browseItems.filter(i => i.type === browseFilter);
            const sorted = [...filtered].sort((a, b) => {
              // Sort key: the matching day when filtered, otherwise the earliest day
              const aDayKey = activeDayOrder ? (a.dayOrder.includes(activeDayOrder) ? activeDayOrder : Math.min(...a.dayOrder)) : Math.min(...(Array.isArray(a.dayOrder) ? a.dayOrder : [a.dayOrder]));
              const bDayKey = activeDayOrder ? (b.dayOrder.includes(activeDayOrder) ? activeDayOrder : Math.min(...b.dayOrder)) : Math.min(...(Array.isArray(b.dayOrder) ? b.dayOrder : [b.dayOrder]));
              if (aDayKey !== bDayKey) return aDayKey - bDayKey;
              // Same day — sort by start time
              return a.time.localeCompare(b.time);
            });

            const getDaysUntil = (date) => {
              if (!date) return Infinity;
              return Math.ceil((date - today) / (1000 * 60 * 60 * 24));
            };

            return (
            <div style={{ background: "#f5f5f5", minHeight: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  background: "#fff",
                }}
              >
                <button
                  onClick={() => { setSubPage(null); setBrowseFilter("all"); setClubDayFilter(null); setWraparoundDayFilter(null); }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12 4L6 10L12 16" stroke="var(--color-text-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-primary)" }}>{browseFilter === "wraparound" ? "Wraparound care" : browseFilter === "clubs" ? "Clubs" : browseFilter === "trips" ? "Trips" : "What's available"}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "4px 16px 12px",
                  background: "#fff",
                  boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {(browseFilter === "clubs" || (browseFilter === "wraparound" && showWraparoundDayFilters))
                  ? dayFilters.map((f) => {
                      const isClubs = browseFilter === "clubs";
                      const isActive = f.id === "all"
                        ? (isClubs ? clubDayFilter === null : wraparoundDayFilter === null)
                        : (isClubs ? clubDayFilter === f.id : wraparoundDayFilter === f.id);
                      const counts = isClubs ? dayCounts : wraparoundDayCounts;
                      return (
                        <button
                          key={f.id}
                          onClick={() => isClubs
                            ? setClubDayFilter(f.id === "all" ? null : f.id)
                            : setWraparoundDayFilter(f.id === "all" ? null : f.id)
                          }
                          style={{
                            flex: "0 0 auto",
                            padding: "6px 14px",
                            borderRadius: 20,
                            border: isActive ? "1px solid #0e8a0e" : "1px solid #ddd",
                            background: isActive ? "#F0FAF3" : "#fff",
                            color: isActive ? "#005700" : "#595959",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          {f.label}
                          {counts[f.id] > 0 && (
                            <span style={{ fontSize: 11, fontWeight: 400, color: isActive ? "#16a33d" : "#aaa" }}>
                              {counts[f.id]}
                            </span>
                          )}
                        </button>
                      );
                    })
                  : typeFilters.filter(f => f.id === browseFilter).map((f) => (
                      <button
                        key={f.id}
                        style={{
                          flex: "0 0 auto",
                          padding: "6px 14px",
                          borderRadius: 20,
                          border: "1px solid #0e8a0e",
                          background: "#F0FAF3",
                          color: "#005700",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "default",
                          fontFamily: "inherit",
                        }}
                      >
                        {f.label}
                      </button>
                    ))
                }
              </div>

              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>


                {sorted.map((item) => {
                  const daysUntilDeadline = getDaysUntil(item.deadline);
                  const isUrgent = daysUntilDeadline <= closingSoonDays && item.places !== null && item.places <= lowPlacesThreshold;
                  const hasBothOptions = !item.blockOnly && !item.individualOnly && item.price !== "Free";
                  const displayPrice = hasBothOptions ? `From ${item.price}` : item.price;

                  return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if ([1, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21].includes(item.id)) { const ps = periodsForClub(item, clubExtras[item.id]); const autoPeriod = ps.length === 1 ? ps[0] : null; setDetailPage("club-detail"); setSelectedClub(item); setFlowStep(null); setSelectedBkPeriod(autoPeriod); setBookingOption(autoPeriod ? (autoPeriod.type === "termly" ? "term" : "individual") : null); setTermExpanded(false); setSelectedDates({}); setClubDatesError(false); setClubCardError(false); setCardFilled(false); setBkAboutExpanded(false); setDetailDatesExpanded(false); }
                      else if ([2, 22, 23, 24, 25].includes(item.id)) { const keys = ["mon","tue","wed","thu","fri"]; setWraparoundClubConfig(afterSchoolClubConfigs[keys[[2,22,23,24,25].indexOf(item.id)]]); setDetailPage("after-school"); setFlowStep(null); setBookingOption(null); setTermExpanded(false); setSelectedGridDates({}); }
                      else if (item.id === 3) { setDetailPage("breakfast"); setFlowStep(null); setConsentChecked(false); setConsentError(false); setBkScenarioId("s1"); setBkIsFree(false); setSelectedBkPeriod(bkPeriodsS1[0]); setBookingOption("individual"); setBkAboutExpanded(false); setTermExpanded(false); setSelectedGridDates2({}); }
                    }}
                    style={{
                      background: "var(--color-bg-primary)",
                      border: "none",
                      borderRadius: 12,
                      padding: "14px 16px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      width: "100%",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "stretch" }}>
                      {/* Left: title, days/time, tags */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div>
                          <span style={{ fontSize: 17, fontWeight: 600, color: "var(--color-grey-900)" }}>
                            {item.title}
                          </span>
                        </div>
                        {item.days && (
                          <div style={{ marginTop: 3 }}>
                            <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
                              {getClubScheduleLabel(item, clubExtras[item.id])}
                            </span>
                          </div>
                        )}
                        {isUrgent && (
                          <div style={{ marginTop: 8 }}>
                            <Tag variant="default">Closes {item.deadlineLabel} &middot; {item.places} places left</Tag>
                          </div>
                        )}
                        {item.sameDayCutoff && (
                          <div style={{ marginTop: 8 }}>
                            <Tag variant="neutral">{item.sameDayCutoff}</Tag>
                          </div>
                        )}
                      </div>

                      {/* Vertical divider — always present */}
                      <div style={{ width: 1, background: "var(--color-grey-100)", margin: "0 14px", flexShrink: 0 }} />
                      {/* Price column — fixed width, pinned to top */}
                      <div style={{ width: 80, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--color-grey-900)" }}>{displayPrice}</span>
                        {item.priceLabel && (
                          <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>{item.priceLabel}</span>
                        )}
                      </div>

                      {/* Chevron — far right */}
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, alignSelf: "flex-start", marginLeft: 10 }}>
                        <path d="M7 5L11 9L7 13" stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                  );
                })}
                {sorted.length === 0 && (
                  <div style={{ padding: 32, textAlign: "center" }}>
                    <p style={{ color: "var(--color-text-tertiary)", fontSize: 14 }}>Nothing available right now</p>
                  </div>
                )}
              </div>
            </div>
            );
          })()}

          {/* Main tab content */}
          {!subPage && activeTab === "book-pay" && (
            <div style={{ background: "#F8F8F8", minHeight: "100%", padding: "20px 0 32px", display: "flex", flexDirection: "column", gap: 24, overflowY: "auto" }}>

              {/* Accounts */}
              <div>
                <div style={{ fontSize: "var(--font-size-2)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-secondary)", padding: "0 16px", marginBottom: 10 }}>Accounts</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
                  {[
                    { label: "Meals",           balance: mealsBalance },
                    { label: "Wraparound care", balance: wraparoundBalance },
                  ].map((account) => (
                    <Card key={account.label} padding="medium">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontSize: "var(--font-size-2)", color: "var(--color-text-secondary)", marginBottom: 4 }}>{account.label}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 22, fontWeight: 700, color: "#222", fontVariantNumeric: "tabular-nums" }}>£{account.balance.toFixed(2)}</span>
                            {account.balance <= lowFundsThreshold && (
                              <Tag variant="warning">Low</Tag>
                            )}
                          </div>
                        </div>
                        <Button variant="secondary" size="small">Top up</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* My bookings & orders */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", marginBottom: 10 }}>
                  <div style={{ fontSize: "var(--font-size-2)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-secondary)" }}>
                    My bookings & orders
                  </div>
                  <button onClick={() => setSubPage("my-bookings")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}>
                    {bookingsNeedsAttentionCount > 0 && (
                      <span style={{ minWidth: 18, height: 18, borderRadius: 99, background: "var(--color-bg-warning)", color: "var(--color-white)", fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{bookingsNeedsAttentionCount}</span>
                    )}
                    <span style={{ fontSize: "var(--font-size-2)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-brand)" }}>View all</span>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="var(--color-text-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
                <div style={{ padding: "0 16px" }}>
                  <Card padding="none" style={{ cursor: "pointer" }} onClick={() => setSubPage("my-bookings")}>
                    {/* Next upcoming booking */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: catColours["Club"].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Shapes size={20} color={catColours["Club"].iconColor} strokeWidth={1.5} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 2 }}>Drumming</div>
                        <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Mon 27 Apr · 15:30–16:15 · Molly</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#005700", background: "#F0FAF3", borderRadius: 99, padding: "1px 7px", whiteSpace: "nowrap", flexShrink: 0 }}>Next up</span>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Browse */}
              <div>
                <div style={{ padding: "0 16px", marginBottom: 10 }}>
                  <div style={{ fontSize: "var(--font-size-2)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-secondary)" }}>Browse</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "0 16px" }}>
                  {[
                    { id: "clubs",           label: "Clubs",          iconBg: catColours["Club"].bg,             icon: <Shapes size={22} color={catColours["Club"].iconColor} strokeWidth={1.5} />,             onClick: () => { setBrowseFilter("clubs"); setSubPage("browse"); } },
                    { id: "wraparound",      label: "Wraparound",     iconBg: catColours["Wraparound"].bg,       icon: <SunMoon size={22} color={catColours["Wraparound"].iconColor} strokeWidth={1.5} />,       onClick: () => { setBrowseFilter("wraparound"); setSubPage("browse"); } },
                    { id: "meals",           label: "Meals",          iconBg: catColours["Meals"].bg,            icon: <Utensils size={22} color={catColours["Meals"].iconColor} strokeWidth={1.5} />,            onClick: () => {} },
                    { id: "trips",           label: "Trips",          iconBg: catColours["Trip"].bg,             icon: <Bus size={22} color={catColours["Trip"].iconColor} strokeWidth={1.5} />,                  onClick: () => { setBrowseFilter("trips"); setSubPage("browse"); } },
                    { id: "parents-evening", label: "Parents' eve",   iconBg: catColours["Parents' evening"].bg, icon: (
                      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                        <rect x="3" y="5" width="22" height="19" rx="2.5" stroke={catColours["Parents' evening"].iconColor} strokeWidth="1.5" />
                        <path d="M3 11H25" stroke={catColours["Parents' evening"].iconColor} strokeWidth="1.5" />
                        <path d="M9 3V6" stroke={catColours["Parents' evening"].iconColor} strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M19 3V6" stroke={catColours["Parents' evening"].iconColor} strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="10" cy="17" r="1.8" fill={catColours["Parents' evening"].iconColor} opacity="0.8" />
                        <circle cx="18" cy="17" r="1.8" fill={catColours["Parents' evening"].iconColor} opacity="0.8" />
                      </svg>
                    ), onClick: () => { setBrowseFilter("parents-evening"); setSubPage("browse"); } },
                    { id: "school-shop",     label: "School shop",    iconBg: catColours["Shop"].bg,             icon: <ShoppingBag size={22} color={catColours["Shop"].iconColor} strokeWidth={1.5} />,          onClick: () => {} },
                  ].map((item) => (
                    <Card key={item.id} padding="none" style={{ cursor: "pointer" }} onClick={item.onClick}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px 12px" }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {item.icon}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", textAlign: "center", lineHeight: 1.3 }}>{item.label}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>


            </div>
          )}

          {/* Other tab placeholders */}
          {!subPage && activeTab === "home" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#F8F8F8" }}>
              {/* To do */}
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#222", margin: "0 0 12px" }}>To do</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {/* Dynamic notices banner */}
                {(() => {
                  const activeNotices = allNotices.filter(n => !consentDecisions[n.id]);
                  if (activeNotices.length === 0) return null;
                  return (
                    <button onClick={() => { setShowProfile(true); setProfileChild(children[0]); setProfileScreen("children"); }} style={{ width: "100%", background: "#fffdf6", border: "1.5px solid #f0e6cc", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff3e0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10 3L18 16H2L10 3Z" stroke="#ef6c00" strokeWidth="1.5" strokeLinejoin="round" />
                          <path d="M10 8V11" stroke="#ef6c00" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="10" cy="13.5" r="0.8" fill="#ef6c00" />
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{activeNotices.length} notice{activeNotices.length !== 1 ? "s" : ""} requiring action</div>
                        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{activeNotices.map(n => n.title).slice(0, 2).join(", ")}{activeNotices.length > 2 ? "..." : ""}</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  );
                })()}
                <button onClick={() => { setActiveTab("book-pay"); setBrowseFilter("clubs"); setSubPage("browse"); }} style={{ width: "100%", background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Shapes size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>New clubs available for summer term</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Spaces are limited — book early</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10C4 10 7 16 10 16C13 16 16 4 16 4" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>PE kit needed – Tuesday</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Remember {selectedChild.name}'s trainers and shorts</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>

              {/* Coming up */}
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#222", margin: "0 0 12px" }}>Coming up</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Bus size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Science Museum trip</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Thu 6 Mar · Packed lunch needed</div>
                  </div>
                  <div style={{ padding: "3px 8px", borderRadius: 8, background: "#f0f0f0", fontSize: 11, fontWeight: 600, color: "#888", flexShrink: 0 }}>8 days</div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Shapes size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Choir practice</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Every Wednesday · 12:30–13:00</div>
                  </div>
                  <div style={{ padding: "3px 8px", borderRadius: 8, background: "#f0f0f0", fontSize: 11, fontWeight: 600, color: "#888", flexShrink: 0 }}>Weekly</div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="6" width="12" height="9" rx="1.5" stroke="var(--color-brand-600)" strokeWidth="1.5" /><path d="M4 9H16" stroke="var(--color-brand-600)" strokeWidth="1.3" /><path d="M8 6V4" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 6V4" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Parents' evening</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Tue 18 Mar · 16:00–19:00</div>
                  </div>
                  <div style={{ padding: "3px 8px", borderRadius: 8, background: "#f0f0f0", fontSize: 11, fontWeight: 600, color: "#888", flexShrink: 0 }}>20 days</div>
                </div>
              </div>
            </div>
          )}

          {!subPage && activeTab === "messages" && (() => {
            const formatMessageDate = (dateStr, timeStr) => {
              const months = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
              const [d, mon, yr] = dateStr.split(" ");
              const msgDate = new Date(parseInt(yr), months[mon], parseInt(d));
              const today = new Date(); today.setHours(0,0,0,0);
              const diffDays = Math.round((today - msgDate) / 86400000);
              if (diffDays === 0) return timeStr;
              if (diffDays === 1) return "Yesterday";
              if (diffDays < 7) return msgDate.toLocaleDateString("en-GB", { weekday: "long" });
              if (msgDate.getFullYear() === new Date().getFullYear()) return msgDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
              return msgDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
            };

            const allInboxMessages = [
              { id: 1, subject: "Sports Day – Fri 27 Jun", sender: "Mrs Patterson", school: "Oakwood Primary", preview: "Please ensure your child comes to school in their PE kit on Friday. They will need sunscreen applied before...", body: "Dear Parents,\n\nPlease ensure your child comes to school in their PE kit on Friday 27 Jun for Sports Day.\n\nThey will need sunscreen applied before arriving and a water bottle. Please also send in a hat if the weather is warm.\n\nEvents begin at 9:30am. Parents are welcome to attend from 9:15am — please enter via the main gate.\n\nMany thanks,\nMrs Patterson", date: "28 Feb 2026", time: "08:42", hasReply: false },
              { id: 2, subject: "Year 3 swimming lessons", sender: "School Office", school: "Oakwood Primary", preview: "Swimming lessons for Year 3 will begin on Monday 14 Apr. Please complete the consent form in the app by...", body: "Dear Parents,\n\nSwimming lessons for Year 3 will begin on Monday 14 Apr and run every Monday until the end of term.\n\nPlease complete the consent form in the app by Friday 7 Mar.\n\nYour child will need a swimsuit, towel, and swimming cap (caps are available from the school office for £2).\n\nChildren with long hair must tie it back. Goggles are permitted but not required.\n\nIf you have any questions, please don't hesitate to get in touch.\n\nKind regards,\nSchool Office", date: "13 Mar 2026", time: "14:15", hasReply: false },
              { id: 3, subject: "Homework club cancelled this week", sender: "Mr Davies", school: "Oakwood Primary", preview: "Just to let you know that homework club will not be running this Thursday due to staff training. Normal service...", body: "Dear Parents,\n\nJust to let you know that homework club will not be running this Thursday (27 Feb) due to staff training.\n\nNormal service will resume next Thursday.\n\nApologies for any inconvenience.\n\nMr Davies", date: "16 Mar 2026", time: "16:30", hasReply: false },
              { id: 4, subject: "Re: Molly's reading log", sender: "Miss Taylor", school: "Oakwood Primary", preview: "Thank you for letting me know. I'll make sure Molly gets a new reading log book tomorrow morning. She's been...", body: "Dear Mrs Collini,\n\nThank you for letting me know. I'll make sure Molly gets a new reading log book tomorrow morning.\n\nShe's been making brilliant progress with her reading this term — really lovely to see!\n\nBest wishes,\nMiss Taylor", date: "22 Feb 2026", time: "09:10", hasReply: true },
              { id: 5, subject: "School photos – 12 Mar", sender: "School Office", school: "Oakwood Primary", preview: "Individual and sibling school photos will be taken on Thursday 12 Mar. If you would like a sibling photo...", body: "Dear Parents,\n\nIndividual and sibling school photos will be taken on Thursday 12 Mar.\n\nIf you would like a sibling photo taken, please let the office know by Friday 7 Mar so we can add them to the list.\n\nChildren should wear full school uniform. Proof sheets and ordering details will be sent home the following week.\n\nSchool Office", date: "14 Mar 2026", time: "10:00", hasReply: false },
              { id: 6, subject: "World Book Day costumes", sender: "Mrs Patterson", school: "Oakwood Primary", preview: "A reminder that World Book Day is on Thursday 6 Mar. Children are invited to come to school dressed as...", body: "Dear Parents,\n\nA reminder that World Book Day is on Thursday 6 Mar.\n\nChildren are invited to come to school dressed as their favourite book character. There's no need to spend money — homemade costumes and accessories are absolutely fine!\n\nEach class will be sharing their favourite books and there will be a costume parade at 2:30pm in the hall.\n\nWe look forward to seeing everyone's creativity!\n\nMrs Patterson", date: "18 Feb 2026", time: "11:20", hasReply: false },
              { id: 7, subject: "Breakfast club price update from April", sender: "School Office", school: "Oakwood Primary", preview: "We wanted to let you know that from the summer term, the cost of breakfast club will increase slightly from...", body: "Dear Parents,\n\nWe wanted to let you know that from the summer term (April 2026), the cost of breakfast club will increase slightly from £4.50 to £5.00 per session.\n\nThis is the first price change in two years and reflects increased food and staffing costs. We have worked hard to keep the increase as small as possible.\n\nIf you have any questions, please contact the school office.\n\nKind regards,\nSchool Office", date: "14 Feb 2026", time: "09:30", hasReply: false },
              { id: 11, subject: "Parent governor vacancy", sender: "Mrs Patterson", school: "Oakwood Primary", preview: "We have a vacancy for a parent governor on our governing board. This is a great opportunity to help shape...", body: "Dear Parents,\n\nWe have a vacancy for a parent governor on our governing board.\n\nThis is a great opportunity to help shape the future of our school. Governors meet approximately six times a year and also sit on subcommittees.\n\nIf you are interested or would like to find out more, please contact the school office by Friday 20 Mar.\n\nMany thanks,\nMrs Patterson", date: "10 Feb 2026", time: "11:00", hasReply: false },
              { id: 12, subject: "Year 2 class assembly – 5 Mar", sender: "Miss Taylor", school: "Oakwood Primary", preview: "You are warmly invited to Year 2's class assembly on Thursday 5 Mar at 9:15am in the school hall. The...", body: "Dear Parents,\n\nYou are warmly invited to Year 2's class assembly on Thursday 5 Mar at 9:15am in the school hall.\n\nThe children have been working very hard on their performance and we hope you can join us. Please be seated by 9:10am.\n\nSiblings are welcome to attend.\n\nBest wishes,\nMiss Taylor", date: "7 Feb 2026", time: "14:20", hasReply: false },
              { id: 13, subject: "New lunchtime menu from March", sender: "School Office", school: "Oakwood Primary", preview: "Our new spring and summer lunch menu will be available from Monday 2 Mar. Please log in to the app to...", body: "Dear Parents,\n\nOur new spring and summer lunch menu will be available from Monday 2 Mar.\n\nPlease log in to the app to view the updated menu and make any changes to your child's meal choices before the end of this week.\n\nChildren who bring a packed lunch are not affected.\n\nKind regards,\nSchool Office", date: "3 Feb 2026", time: "15:45", hasReply: false },
              { id: 14, subject: "Headlice notification", sender: "School Office", school: "Oakwood Primary", preview: "We have been made aware of a case of headlice in school. Please check your child's hair this evening and...", body: "Dear Parents,\n\nWe have been made aware of a case of headlice in school.\n\nPlease check your child's hair this evening and treat promptly if necessary. Treatments are available from pharmacies without a prescription.\n\nChildren with headlice should not attend school until treatment has begun.\n\nThank you for your cooperation.\n\nSchool Office", date: "28 Jan 2026", time: "13:10", hasReply: false },
              { id: 15, subject: "Scholastic book fair – w/c 10 Feb", sender: "Mrs Patterson", school: "Oakwood Primary", preview: "The Scholastic book fair will be in school from Monday 10 to Friday 14 Feb. Children will have the...", body: "Dear Parents,\n\nThe Scholastic book fair will be in school from Monday 10 to Friday 14 Feb.\n\nChildren will have the opportunity to browse and buy books during the school day. You can also visit after school from 3:30–4:15pm.\n\nPayment can be made by card or cash. Every purchase earns free books for the school.\n\nMrs Patterson", date: "24 Jan 2026", time: "10:30", hasReply: false },
              { id: 8, subject: "Year 9 options evening – 18 Mar", sender: "Mr Hughes", school: "Riverside Secondary", preview: "A reminder that Year 9 options evening is on Wednesday 18 Mar from 5:30pm. Please attend with your child...", body: "Dear Parents/Carers,\n\nA reminder that Year 9 options evening is on Wednesday 18 Mar from 5:30pm to 7:30pm in the main hall.\n\nPlease attend with your child to discuss GCSE subject choices. Subject teachers will be available at information stands and there will be a short presentation at 5:45pm.\n\nThe options form deadline is Friday 28 Mar.\n\nPlease contact the school office if you have any questions.\n\nKind regards,\nMr Hughes\nHead of Year 9", date: "19 Mar 2026", time: "10:15", hasReply: false },
              { id: 9, subject: "Science trip to Natural History Museum", sender: "Dr Anand", school: "Riverside Secondary", preview: "Year 9 have been offered a trip to the Natural History Museum on Friday 4 Apr. The cost is £18 per student...", body: "Dear Parents/Carers,\n\nYear 9 have been offered a trip to the Natural History Museum on Friday 4 Apr.\n\nThe cost is £18 per student, which covers coach travel and a guided workshop. Students will need a packed lunch.\n\nPlease give consent and make payment via the app by Friday 21 Mar.\n\nStudents should wear school uniform and meet at the bus bay at 8:15am. We expect to return by 4:00pm.\n\nMany thanks,\nDr Anand\nHead of Science", date: "18 Mar 2026", time: "15:40", hasReply: false },
              { id: 10, subject: "Re: Ethan's homework extension", sender: "Mrs Clarke", school: "Riverside Secondary", preview: "Thanks for getting in touch. I'm happy to give Ethan until Monday to finish the essay given the circumstances...", body: "Dear Mrs Collini,\n\nThanks for getting in touch. I'm happy to give Ethan until Monday to finish the essay given the circumstances.\n\nHe's been doing really well in English this term so no concerns at all.\n\nBest wishes,\nMrs Clarke", date: "19 Feb 2026", time: "12:05", hasReply: true },
            ];
            const allSentMessages = [
              { id: 101, subject: "Molly's reading log", sender: "You", school: "Oakwood Primary", preview: "Hi Miss Taylor, just to let you know that Molly has lost her reading log book. Could she have a new one...", body: "Hi Miss Taylor,\n\nJust to let you know that Molly has lost her reading log book. Could she have a new one please?\n\nShe's been reading every evening so I'd hate for her to lose track.\n\nMany thanks", date: "21 Feb 2026", time: "19:45", hasReply: true },
              { id: 102, subject: "Absence notification – Lucas", sender: "You", school: "Oakwood Primary", preview: "Good morning, Lucas won't be in school today as he has a temperature. I'll keep you updated on when he'll...", body: "Good morning,\n\nLucas won't be in school today as he has a temperature. I'll keep you updated on when he'll be back.\n\nThank you", date: "17 Feb 2026", time: "07:52", hasReply: false },
              { id: 103, subject: "After school collection change – 14 Feb", sender: "You", school: "Oakwood Primary", preview: "Hi, just to let you know that Molly's grandmother will be collecting her today instead of me. Her name is...", body: "Hi,\n\nJust to let you know that Molly's grandmother will be collecting her today instead of me. Her name is Margaret Collini and she is on the approved list.\n\nThank you", date: "14 Feb 2026", time: "08:15", hasReply: false },
              { id: 105, subject: "Re: Homework club cancelled this week", sender: "You", school: "Oakwood Primary", preview: "Thanks for letting us know. Would you be able to confirm next week's session is going ahead as normal?", body: "Hi Mr Davies,\n\nThanks for letting us know.\n\nWould you be able to confirm that next week's session is going ahead as normal?\n\nMany thanks", date: "24 Feb 2026", time: "17:15", hasReply: false, originalMessage: { subject: "Homework club cancelled this week", sender: "Mr Davies", date: "24 Feb 2026", time: "16:30", body: "Dear Parents,\n\nJust to let you know that homework club will not be running this Thursday (27 Feb) due to staff training.\n\nNormal service will resume next Thursday.\n\nApologies for any inconvenience.\n\nMr Davies" } },
              ...extraSentMessages,
            ];

            // Get unique schools from children
            const schools = [...new Set(children.map(c => c.school))];
            const isSingleSchool = schools.length === 1;
            const activeSchool = isSingleSchool ? schools[0] : messagesSchool;

            // School picker
            if (!activeSchool) {
              return (
                <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
                  <div style={{ padding: "12px 16px 16px", background: "#F8F8F8", flexShrink: 0 }}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: "#222" }}>Messages</span>
                    <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Messages are organised by school, not by child</div>
                  </div>
                  <div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 20px", minHeight: 0, background: "#F8F8F8" }}>
                    {schools.map(school => {
                      const schoolUnread = allInboxMessages.filter(m => m.school === school && !readMessages.has(m.id)).length;
                      const schoolChildren = children.filter(c => c.school === school);
                      return (
                        <Card key={school} padding="none" style={{ marginBottom: 10, cursor: "pointer" }} onClick={() => { setMessagesSchool(school); setMessagesFilter("inbox"); }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px" }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <School size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ marginBottom: 4 }}>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>{school}</div>
                                <div style={{ fontSize: 12, color: "#999" }}>
                                  {schoolChildren.length > 1
                                    ? `${schoolChildren.map(c => c.name).join(" & ")} · shared inbox`
                                    : schoolChildren[0].name}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                              {schoolUnread > 0 && (
                                <div style={{ minWidth: 22, height: 22, borderRadius: 11, background: "var(--color-brand-600)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>{schoolUnread}</div>
                              )}
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Filtered messages for selected school
            const inboxMessages = allInboxMessages.filter(m => m.school === activeSchool);
            const sentMessages = allSentMessages.filter(m => m.school === activeSchool);
            const messages = (messagesFilter === "inbox" ? inboxMessages : sentMessages).sort((a, b) => {
              const da = new Date(a.date + " " + a.time);
              const db = new Date(b.date + " " + b.time);
              return db - da;
            });
            const unreadCount = inboxMessages.filter(m => !readMessages.has(m.id)).length;

            // Thread / message detail view
            if (selectedMessage) {
              const canReply = repliesEnabledSchools.includes(activeSchool) && messagesFilter === "inbox";
              const replies = threadReplies[selectedMessage.id] || [];

              const handleSendReply = () => {
                if (replySending) return;
                if (!replyText.trim()) { setReplyError(true); return; }
                setReplyError(false);
                setReplySending(true);
                setTimeout(() => {
                  const replyBody = replyText.trim();
                  const replyDate = "3 Mar 2026";
                  const replyTime = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
                  const newReply = {
                    id: "r" + selectedMessage.id + "-" + (replies.length + 1),
                    sender: "You",
                    body: replyBody,
                    date: replyDate,
                    time: replyTime,
                    delivered: true,
                  };
                  setThreadReplies(prev => ({
                    ...prev,
                    [selectedMessage.id]: [...(prev[selectedMessage.id] || []), newReply],
                  }));
                  // Add to sent messages
                  const sentMsg = {
                    id: Date.now(),
                    subject: "Re: " + selectedMessage.subject,
                    sender: "You",
                    school: selectedMessage.school,
                    preview: replyBody.length > 80 ? replyBody.substring(0, 80) + "..." : replyBody,
                    body: replyBody,
                    date: replyDate,
                    time: replyTime,
                    hasReply: false,
                    originalMessage: { subject: selectedMessage.subject, sender: selectedMessage.sender, date: selectedMessage.date, time: selectedMessage.time, body: selectedMessage.body },
                  };
                  setExtraSentMessages(prev => [sentMsg, ...prev]);
                  setReplyText("");
                  setReplyError(false);
                  setReplySending(false);
                  setTimeout(() => { if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight; }, 50);
                }, 1200);
              };

              const MessageBubble = ({ sender, body, time, delivered }) => {
                const isYou = sender === "You";
                const isFullWidth = !canReply && !isYou;
                return (
                  <div style={{ display: "flex", justifyContent: isYou ? "flex-end" : "flex-start", marginBottom: 8 }}>
                    <div style={{
                      width: isFullWidth ? "100%" : undefined,
                      maxWidth: isFullWidth ? "none" : (isYou ? 258 : 301),
                      background: isYou ? "#f5fbff" : "#fff",
                      border: `1px solid ${isYou ? "#c7e3f4" : "#efefef"}`,
                      borderRadius: 8,
                      padding: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}>
                      <div style={{ fontSize: 16, color: "#3b3b3b", lineHeight: 1.5, whiteSpace: "pre-line" }}>{body}</div>
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <span style={{ fontSize: 12, color: "#474747" }}>
                          {time}{isYou && delivered ? " · Delivered" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              };

              return (
                <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                    <button onClick={() => { setSelectedMessage(null); setReplyText(""); setReplyError(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 17, fontWeight: 600, color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selectedMessage.subject}</div>
                    </div>
                  </div>
                  {/* Thread content */}
                  <div ref={threadRef} style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px", minHeight: 0, background: "#f8f8f8" }}>
                    {(() => {
                      const formatThreadDate = (dateStr) => {
                        const parts = dateStr.split(" ");
                        if (parts.length !== 3) return dateStr;
                        const monthIndex = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
                        const d = new Date(parseInt(parts[2]), monthIndex[parts[1]], parseInt(parts[0]));
                        const today = new Date(2026, 3, 13);
                        if (d.toDateString() === today.toDateString()) return "Today";
                        const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
                        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        return `${dayNames[d.getDay()]} ${d.getDate()} ${monthNames[d.getMonth()]}`;
                      };
                      const parseThreadDate = (dateStr, timeStr) => {
                        const monthIndex = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
                        const parts = dateStr.split(" ");
                        const d = new Date(parseInt(parts[2]), monthIndex[parts[1]], parseInt(parts[0]));
                        if (timeStr) { const [h, m] = timeStr.split(":"); d.setHours(parseInt(h), parseInt(m)); }
                        return d;
                      };
                      const allItems = [
                        { sender: selectedMessage.sender, body: selectedMessage.body, date: selectedMessage.date, time: selectedMessage.time },
                        ...replies,
                      ].sort((a, b) => parseThreadDate(a.date, a.time) - parseThreadDate(b.date, b.time));
                      let lastDate = null;
                      return allItems.map((item, i) => {
                        const showDatePill = item.date !== lastDate;
                        lastDate = item.date;
                        return (
                          <div key={i}>
                            {showDatePill && (
                              <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
                                <span style={{ background: "#fff", border: "1px solid #efefef", color: "#2f2f2f", fontSize: 13, borderRadius: 99, padding: "4px 12px" }}>
                                  {formatThreadDate(item.date)}
                                </span>
                              </div>
                            )}
                            <MessageBubble sender={item.sender} body={item.body} time={item.time} delivered={item.delivered} />
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {/* Reply composer */}
                  {canReply && (
                    <div style={{ background: "#fff", borderTop: "1px solid #efefef", padding: 16, flexShrink: 0 }}>
                      <div style={{ position: "relative" }}>
                        <textarea
                          value={replyText}
                          onChange={(e) => { setReplyText(e.target.value); if (replyError) setReplyError(false); }}
                          placeholder="Write a reply to the school..."
                          rows={1}
                          onFocus={() => setReplyFocused(true)}
                          onBlur={() => setTimeout(() => setReplyFocused(false), 100)}
                          onInput={(e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
                          style={{
                            display: "block", width: "100%", boxSizing: "border-box",
                            padding: replyText.trim() ? "10px 44px 10px 12px" : "10px 12px",
                            border: "1px solid #dfdfdf", borderRadius: 8, background: "#fff",
                            fontSize: 13, fontFamily: "var(--font-family-sans)", color: "#2f2f2f",
                            resize: "none", outline: "none", lineHeight: 1.5, minHeight: 44, maxHeight: 120, overflow: "auto",
                            transition: "padding 0.1s",
                          }}
                        />
                        {replyText.trim() && (
                          <button
                            onClick={handleSendReply}
                            style={{
                              position: "absolute", right: 8, bottom: 8,
                              width: 28, height: 28, borderRadius: "50%", border: "none",
                              background: "#0e8a0e", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {replySending ? (
                              <div style={{ width: 12, height: 12, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L12 2L7 12L6 8L2 7Z" fill="#fff" /></svg>
                            )}
                          </button>
                        )}
                      </div>
                      {replyError && (
                        <div style={{ marginTop: 4, fontSize: 12, color: "#B22929" }}>Please write a message before sending</div>
                      )}
                      <div style={{ marginTop: 6, fontSize: 12, color: "#474747" }}>Your reply will be sent to the school's shared inbox</div>
                    </div>
                  )}
                  {/* iOS keyboard */}
                  {canReply && replyFocused && (() => {
                    const kbBg = "#CED2D9";
                    const keyWhite = { background: "#fff", borderRadius: 5, boxShadow: "0 1px 0 rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", height: 42, fontSize: 16, color: "#000", userSelect: "none", cursor: "default" };
                    const keyGrey = { ...keyWhite, background: "#AEB3BE", fontSize: 14 };
                    const Row = ({ children, style }) => <div onMouseDown={e => e.preventDefault()} style={{ display: "flex", gap: 5, padding: "0 3px", marginBottom: 11, ...style }}>{children}</div>;
                    const K = ({ label, style = keyWhite, flex = 1 }) => <div style={{ ...style, flex }}>{label}</div>;
                    return (
                      <div key="keyboard" onMouseDown={e => e.preventDefault()} style={{ background: kbBg, paddingTop: 10, paddingBottom: 4, flexShrink: 0 }}>
                        <Row>
                          {["Q","W","E","R","T","Y","U","I","O","P"].map(k => <K key={k} label={k} />)}
                        </Row>
                        <Row style={{ paddingLeft: 18, paddingRight: 18 }}>
                          {["A","S","D","F","G","H","J","K","L"].map(k => <K key={k} label={k} />)}
                        </Row>
                        <Row>
                          <K label="⇧" style={keyGrey} flex={1.4} />
                          {["Z","X","C","V","B","N","M"].map(k => <K key={k} label={k} />)}
                          <K label="⌫" style={{ ...keyGrey, fontSize: 18 }} flex={1.4} />
                        </Row>
                        <Row style={{ marginBottom: 0 }}>
                          <K label="123" style={{ ...keyGrey, fontSize: 15 }} flex={1.5} />
                          <K label="🌐" style={{ ...keyGrey, fontSize: 18 }} flex={1} />
                          <K label="space" style={{ ...keyWhite, fontSize: 15 }} flex={5} />
                          <K label="return" style={{ ...keyGrey, fontSize: 15 }} flex={2} />
                        </Row>
                      </div>
                    );
                  })()}

                  {/* No replies notice for Riverside */}
                  {!canReply && messagesFilter === "inbox" && (
                    <div style={{ padding: "12px 16px 16px", background: "#fff", borderTop: "1px solid #efefef", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, color: "#999", textAlign: "center" }}>Replies are not enabled for this school</div>
                    </div>
                  )}
                </div>
              );
            }

            // Compose new message
            if (showCompose) {
              const subjectMax = 100;
              const bodyMax = 2000;

              return (
                <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, background: "#efefef" }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", padding: "8px 16px 12px", background: "#fff", borderBottom: "1px solid #efefef", flexShrink: 0 }}>
                    <button onClick={() => { setShowCompose(false); setComposeSending(false); setComposeSubject(""); setComposeBody(""); setComposeErrors({}); }} style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#333", flex: 1, textAlign: "center" }}>New message</span>
                    <button
                      onClick={() => {
                        if (composeSending) return;
                        if (!composeBody.trim()) { setComposeErrors({ body: "Please write a message before sending" }); return; }
                        setComposeErrors({});
                        setComposeSending(true);
                        setTimeout(() => {
                          const sentMsg = {
                            id: Date.now(),
                            subject: composeSubject.trim() || "(No subject)",
                            sender: "You",
                            school: composeSchool,
                            preview: composeBody.trim().length > 80 ? composeBody.trim().substring(0, 80) + "..." : composeBody.trim(),
                            body: composeBody.trim(),
                            date: "13 Apr 2026",
                            time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
                            hasReply: false,
                            delivered: true,
                          };
                          setExtraSentMessages(prev => [sentMsg, ...prev]);
                          setComposeSending(false);
                          setShowCompose(false);
                          setComposeSubject("");
                          setComposeBody("");
                          setComposeErrors({});
                          setMessagesFilter("sent");
                        }, 1200);
                      }}
                      style={{ height: 34, padding: "0 16px", border: "none", background: "var(--color-brand-600)", borderRadius: 99, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    >
                      {composeSending ? (
                        <div style={{ width: 14, height: 14, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      ) : (
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Send</span>
                      )}
                    </button>
                  </div>
                  {/* Fields */}
                  <div style={{ background: "#fff", flexShrink: 0 }}>
                    {/* To row */}
                    <div style={{ display: "flex", alignItems: "center", padding: "0 16px", height: 44, borderBottom: "1px solid #efefef" }}>
                      <span style={{ fontSize: 15, color: "#595959", marginRight: 8 }}>To:</span>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "var(--color-grey-050)", border: "1px solid var(--color-grey-200)", borderRadius: 99, padding: "3px 8px" }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-grey-800)" }}>{composeSchool}</span>
                        <span style={{ fontSize: 12, color: "var(--color-grey-500)" }}>· shared inbox</span>
                      </div>
                    </div>
                    {/* Subject row */}
                    <div style={{ display: "flex", alignItems: "center", padding: "0 16px", height: 44, borderBottom: "1px solid #efefef" }}>
                      <span style={{ fontSize: 15, color: "#595959", marginRight: 4, flexShrink: 0 }}>Subject:</span>
                      <input
                        type="text"
                        value={composeSubject}
                        onChange={(e) => { setComposeSubject(e.target.value); setComposeErrors(prev => ({...prev, subject: undefined})); }}
                        placeholder="What is your message about?"
                        maxLength={subjectMax + 10}
                        style={{ flex: 1, border: "none", outline: "none", fontSize: 15, color: "#222", background: "transparent", fontFamily: "inherit" }}
                      />
                    </div>
                  </div>
                  {/* Body */}
                  <div style={{ flex: 1, background: "#fff", padding: "12px 16px", minHeight: 0 }}>
                    <textarea
                      value={composeBody}
                      onChange={(e) => { setComposeBody(e.target.value); setComposeErrors(prev => ({...prev, body: undefined})); }}
                      onFocus={() => setComposeFocused(true)}
                      onBlur={() => setTimeout(() => setComposeFocused(false), 100)}
                      placeholder="Write your message..."
                      maxLength={bodyMax + 100}
                      style={{ width: "100%", height: "100%", border: "none", outline: "none", fontSize: 15, color: "#222", background: "transparent", fontFamily: "inherit", resize: "none", lineHeight: 1.5 }}
                      autoFocus
                    />
                  </div>
                  {/* Body error — sits above keyboard so it's always visible */}
                  {composeErrors.body && (
                    <div style={{ background: "#FFF5F5", borderTop: "1px solid #efefef", padding: "8px 16px", flexShrink: 0 }}>
                      <span style={{ fontSize: 13, color: "#610202" }}>{composeErrors.body}</span>
                    </div>
                  )}
                  {/* iOS keyboard */}
                  {composeFocused && (() => {
                    const kbBg = "#CED2D9";
                    const keyWhite = { background: "#fff", borderRadius: 5, height: 42, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#000", boxShadow: "0 1px 0 rgba(0,0,0,0.35)", cursor: "pointer", userSelect: "none" };
                    const keyGrey = { ...keyWhite, background: "#AEB3BE", fontSize: 14 };
                    const Row = ({ children, style }) => <div onMouseDown={e => e.preventDefault()} style={{ display: "flex", gap: 5, padding: "0 3px", marginBottom: 11, ...style }}>{children}</div>;
                    const K = ({ label, style = keyWhite, flex = 1 }) => <div style={{ ...style, flex }}>{label}</div>;
                    return (
                      <div key="compose-keyboard" onMouseDown={e => e.preventDefault()} style={{ background: kbBg, paddingTop: 10, paddingBottom: 4, flexShrink: 0 }}>
                        <Row>{["Q","W","E","R","T","Y","U","I","O","P"].map(k => <K key={k} label={k} />)}</Row>
                        <Row style={{ paddingLeft: 18, paddingRight: 18 }}>{["A","S","D","F","G","H","J","K","L"].map(k => <K key={k} label={k} />)}</Row>
                        <Row>
                          <K label="⇧" style={keyGrey} flex={1.4} />
                          {["Z","X","C","V","B","N","M"].map(k => <K key={k} label={k} />)}
                          <K label="⌫" style={{ ...keyGrey, fontSize: 18 }} flex={1.4} />
                        </Row>
                        <Row style={{ marginBottom: 0 }}>
                          <K label="123" style={{ ...keyGrey, fontSize: 15 }} flex={1.5} />
                          <K label="🌐" style={{ ...keyGrey, fontSize: 18 }} flex={1} />
                          <K label="space" style={{ ...keyWhite, fontSize: 15 }} flex={5} />
                          <K label="return" style={{ ...keyGrey, fontSize: 15 }} flex={2} />
                        </Row>
                      </div>
                    );
                  })()}
                </div>
              );
            }

            // List view
            return (
              <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, position: "relative" }}>
                {/* Header */}
                <div style={{ padding: "12px 16px 0", background: "#fff", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    {!isSingleSchool && (
                      <button onClick={() => { setMessagesSchool(null); setMessagesFilter("inbox"); setShowCompose(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    )}
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#222", flex: 1 }}>{activeSchool}</span>
                  </div>
                  {/* Inbox/Sent pill filters — only show Sent if there are sent messages */}
                  {(sentMessages.length > 0) && <div style={{ display: "flex", gap: 8, paddingBottom: 12, boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
                    {[
                      { id: "inbox", label: "Inbox" },
                      { id: "sent", label: "Sent" },
                    ].map(f => {
                      const isActive = messagesFilter === f.id;
                      const badgeCount = f.id === "inbox" ? unreadCount : 0;
                      return (
                        <button key={f.id} onClick={() => setMessagesFilter(f.id)} style={{
                          display: "flex", alignItems: "center", gap: 6,
                          padding: "6px 14px", borderRadius: "var(--radius-round)",
                          border: isActive ? "1px solid #0e8a0e" : "1px solid #ddd",
                          background: isActive ? "#F0FAF3" : "#fff",
                          cursor: "pointer", fontFamily: "var(--font-family-sans)",
                          fontSize: "var(--font-size-2)", fontWeight: 600,
                          color: isActive ? "#005700" : "#595959",
                        }}>
                          {f.label}
                          {badgeCount > 0 && (
                            <span style={{
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                              minWidth: 18, height: 18, borderRadius: "50%",
                              background: "#0e8a0e", color: "#fff",
                              fontSize: 10, fontWeight: 700, padding: "0 4px",
                            }}>{badgeCount}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>}
                </div>
                {/* Message list */}
                <div ref={msgListRef} onScroll={e => setMsgListScrolled(e.currentTarget.scrollTop > 10)} style={{ flex: 1, overflowY: "auto", minHeight: 0, background: "#fff" }}>
                  {messages.length === 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center" }}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 12, opacity: 0.3 }}>
                        <rect x="4" y="8" width="32" height="24" rx="3" stroke="#888" strokeWidth="2" />
                        <path d="M4 12L20 24L36 12" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#888", marginBottom: 4 }}>No {messagesFilter === "inbox" ? "inbox" : "sent"} messages</div>
                      <div style={{ fontSize: 13, color: "#bbb" }}>{messagesFilter === "inbox" ? "Messages from this school will appear here" : "Messages you send to this school will appear here"}</div>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isUnread = messagesFilter === "inbox" && !readMessages.has(msg.id);
                      return (
                        <button key={msg.id} onClick={() => { setSelectedMessage(msg); setShowOriginal(false); setReplyText(""); setReplyError(false); if (messagesFilter === "inbox") setReadMessages(prev => new Set([...prev, msg.id])); }} style={{ display: "flex", gap: 12, padding: "14px 16px", width: "100%", background: isUnread ? "#F0FAF3" : "#fff", border: "none", borderBottom: "1px solid #f0f0f0", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                          {/* Unread dot */}
                          <div style={{ width: 8, flexShrink: 0, paddingTop: 6 }}>
                            {isUnread && <div style={{ width: 8, height: 8, borderRadius: 4, background: "var(--color-brand-600)" }} />}
                          </div>
                          {/* Content */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0, marginRight: 8 }}>
                                {(msg.hasReply || (threadReplies[msg.id] && threadReplies[msg.id].length > 0)) && (
                                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}><path d="M4 3L1 6L4 9" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M1 6H8C10 6 11 7 11 9" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                )}
                                <span style={{ fontSize: 14, fontWeight: isUnread ? 700 : 500, color: "#222", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.subject}</span>
                              </div>
                              <span style={{ fontSize: 11, color: "#999", flexShrink: 0 }}>{formatMessageDate(msg.date, msg.time)}</span>
                            </div>
                            <div style={{ fontSize: 13, color: "#999", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.preview}</div>
                          </div>
                          {/* Arrow */}
                          <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* FAB — compose */}
                {repliesEnabledSchools.includes(activeSchool) && (
                  <button
                    onClick={() => { setShowCompose(true); setComposeSchool(activeSchool); setComposeSubject(""); setComposeBody(""); setComposeErrors({}); setComposeFocused(true); }}
                    style={{
                      position: "absolute", bottom: 20, right: 16,
                      height: 48,
                      width: msgListScrolled ? 48 : "auto",
                      paddingLeft: msgListScrolled ? 0 : 20,
                      paddingRight: msgListScrolled ? 0 : 24,
                      borderRadius: 99,
                      background: "var(--color-brand-600)", border: "none",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      gap: msgListScrolled ? 0 : 8,
                      boxShadow: "0 4px 12px rgba(60,173,81,0.4)",
                      overflow: "hidden",
                      transition: "width 0.2s ease, border-radius 0.2s ease, padding 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M11.5 2.5L13.5 4.5L5.5 12.5L2.5 13.5L3.5 10.5L11.5 2.5Z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
                      <path d="M10 4L12 6" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    {!msgListScrolled && (
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Compose</span>
                    )}
                  </button>
                )}
              </div>
            );
          })()}

          {!subPage && activeTab === "my-child" && myChildPage === "absences" && (
            <div style={{ background: "var(--color-bg-secondary)", minHeight: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "var(--color-bg-primary)" }}>
                <button
                  onClick={() => setMyChildPage(null)}
                  style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12 4L6 10L12 16" stroke="var(--color-text-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-primary)" }}>Absences</span>
              </div>
              <div style={{ padding: "16px 16px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                <Card padding="medium">
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: "var(--font-size-4)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", marginBottom: 6 }}>Report an absence</div>
                    <div style={{ fontSize: "var(--font-size-3)", color: "var(--color-text-secondary)", lineHeight: "var(--font-line-height-normal)" }}>
                      Let {selectedChild.school} know {selectedChild.name} won't be in.
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => { resetAbsenceForm(); setMyChildPage("absence-form"); }}
                    style={{ width: "100%" }}
                  >
                    Notify the school
                  </Button>
                </Card>

                <Card padding="none">
                  <div style={{ padding: "14px 16px 10px", fontSize: "var(--font-size-4)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>Previous absences</div>
                  <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />
                  {[
                    { date: "Thu 24 Apr 2026", reason: "Illness",                status: "pending"  },
                    { date: "Mon 14 Apr 2026", reason: "Illness",                status: "approved" },
                    { date: "Thu 27 Mar 2026", reason: "Medical appointment",    status: "approved" },
                    { date: "Mon 10 Mar 2026", reason: "Dentist appointment",    status: "approved" },
                  ].map((item, i, arr) => (
                    <div key={item.date}>
                      {i > 0 && <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", gap: 12 }}>
                        <div>
                          <div style={{ fontSize: "var(--font-size-3)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", marginBottom: 2 }}>{item.date}</div>
                          <div style={{ fontSize: "var(--font-size-2)", color: "var(--color-text-secondary)" }}>{item.reason}</div>
                        </div>
                        {item.status === "pending"
                          ? <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "#FFFBEB", color: "#B45309", border: "1px solid #FDE68A", whiteSpace: "nowrap" }}>Awaiting review</span>
                          : <Tag variant="neutral">Recorded</Tag>
                        }
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          )}

          {!subPage && activeTab === "my-child" && !myChildPage && (
            <div style={{ background: "var(--color-bg-secondary)", minHeight: "100%", padding: "20px 0 32px", display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Absences */}
              <div>
                <div style={{ padding: "0 16px" }}>
                  <Card padding="none" style={{ cursor: "pointer" }} onClick={() => setMyChildPage("absences")}>
                    <div style={{ display: "flex", alignItems: "center", padding: "14px 16px" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "var(--font-size-4)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>Absences</div>
                      </div>
                      <ChevronRight size={16} color="var(--color-grey-900)" strokeWidth={1.5} />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>

        {!selectedMessage && !showCompose && (!myChildPage || myChildPage === "absences") && (
          <BottomNavBar activeTab={subPage ? "book-pay" : activeTab} onTabChange={(tab) => { setSubPage(null); setSelectedBookingItem(null); setSelectedMessage(null); setMessagesSchool(null); setShowCompose(false); setActiveTab(tab); }} badges={{ messages: unreadCount }} />
        )}

        {/* Home indicator */}
        <div
          style={{
            height: isMobile ? 0 : 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fafafa",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 134,
              height: 5,
              background: "#ddd",
              borderRadius: 3,
            }}
          />
        </div>

        {/* Profile full sheet */}
        {showProfile && (
          <div style={{ position: "absolute", inset: 0, zIndex: 100, display: "flex", flexDirection: "column" }}>
            {/* Backdrop */}
            <div onClick={() => { if (!profileScreen) { setShowProfile(false); setProfileChild(null); setProfileScreen(null); } }} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
            {/* Sheet */}
            <div style={{
              position: "absolute", left: 0, right: 0, bottom: 0,
              top: (!profileScreen) ? "auto" : 40,
              maxHeight: (!profileScreen) ? "50%" : undefined,
              zIndex: 1,
              background: "#fff", borderRadius: "20px 20px 0 0",
              display: "flex", flexDirection: "column",
              transition: "max-height 0.25s ease",
            }}>
              {/* Handle bar */}
              <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 2px", flexShrink: 0 }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: "#ddd" }} />
              </div>

              {/* Screen routing */}
              {profileScreen === "security" ? (() => {
                const strength = getPasswordStrength(newPassword);

                const EyeIcon = ({ show, onToggle }) => (
                  <button onClick={onToggle} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", padding: 4, display: "flex" }}>
                    {show ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="#888" strokeWidth="1.3" /><circle cx="9" cy="9" r="2.5" stroke="#888" strokeWidth="1.3" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z" stroke="#bbb" strokeWidth="1.3" /><circle cx="9" cy="9" r="2.5" stroke="#bbb" strokeWidth="1.3" /><path d="M3 15L15 3" stroke="#bbb" strokeWidth="1.3" strokeLinecap="round" /></svg>
                    )}
                  </button>
                );

                const handleChangePassword = () => {
                  if (!currentPassword) { setPwError("Please enter your current password"); return; }
                  if (!newPassword) { setPwError("Please enter a new password"); return; }
                  if (newPassword.length < 8) { setPwError("Password must be at least 8 characters"); return; }
                  if (newPassword !== confirmPassword) { setPwError("Passwords do not match"); return; }
                  setPwError("");
                  setPwSaving(true);
                  setTimeout(() => {
                    setPwSaving(false);
                    setSecurityView("password-done");
                  }, 1200);
                };

                return (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 12px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                      <button onClick={() => {
                        if (securityView === "change-password") { setSecurityView("overview"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); setPwError(""); }
                        else if (securityView === "password-done") { setSecurityView("overview"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }
                        else { setProfileScreen("account-settings"); }
                      }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                      <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>{securityView === "change-password" ? "Change password" : securityView === "password-done" ? "Password changed" : "Login & security"}</span>
                    </div>

                    {/* Password changed confirmation */}
                    {securityView === "password-done" ? (
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 14L12 19L21 9" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#222", marginBottom: 8 }}>Password updated</div>
                        <div style={{ fontSize: 14, color: "#888", lineHeight: 1.5 }}>Your password has been changed successfully. Use your new password next time you log in.</div>
                        <Button variant="primary" onClick={() => { setSecurityView("overview"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }} style={{ marginTop: 24 }}>Done</Button>
                      </div>
                    )

                    /* Change password form */
                    : securityView === "change-password" ? (
                      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", minHeight: 0, background: "#fff" }}>
                        <div style={{ fontSize: 13, color: "#888", marginBottom: 20, lineHeight: 1.4 }}>Enter your current password to verify your identity, then choose a new password.</div>

                        {/* Current password */}
                        <div style={{ marginBottom: 18 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6 }}>Current password</div>
                          <div style={{ position: "relative" }}>
                            <Input type={showCurrentPw ? "text" : "password"} value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value); setPwError(""); }} placeholder="Enter current password" autoComplete="current-password" style={{ width: "100%" }} />
                            <EyeIcon show={showCurrentPw} onToggle={() => setShowCurrentPw(p => !p)} />
                          </div>
                        </div>

                        {/* New password */}
                        <div style={{ marginBottom: 6 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6 }}>New password</div>
                          <div style={{ position: "relative" }}>
                            <Input type={showNewPw ? "text" : "password"} value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setPwError(""); }} placeholder="Enter new password" autoComplete="new-password" style={{ width: "100%" }} />
                            <EyeIcon show={showNewPw} onToggle={() => setShowNewPw(p => !p)} />
                          </div>
                        </div>

                        {/* Strength indicator */}
                        {newPassword && (
                          <div style={{ marginBottom: 18 }}>
                            <div style={{ height: 4, borderRadius: 2, background: "#eee", marginBottom: 4, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: strength.width, background: strength.color, borderRadius: 2, transition: "width 0.3s, background 0.3s" }} />
                            </div>
                            <div style={{ fontSize: 11, color: strength.color, fontWeight: 600 }}>{strength.label}</div>
                          </div>
                        )}
                        {!newPassword && <div style={{ height: 18 }} />}

                        {/* Confirm password */}
                        <div style={{ marginBottom: 20 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6 }}>Confirm new password</div>
                          <div style={{ position: "relative" }}>
                            <Input type={showConfirmPw ? "text" : "password"} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setPwError(""); }} placeholder="Re-enter new password" autoComplete="new-password" state={confirmPassword && confirmPassword !== newPassword ? "error" : "default"} error={confirmPassword && confirmPassword !== newPassword ? "Passwords do not match" : undefined} style={{ width: "100%" }} />
                            <EyeIcon show={showConfirmPw} onToggle={() => setShowConfirmPw(p => !p)} />
                          </div>
                        </div>

                        {/* Error */}
                        {pwError && <div style={{ fontSize: 13, color: "#c44", marginBottom: 16, padding: "10px 14px", background: "#fef2f2", borderRadius: 10 }}>{pwError}</div>}

                        {/* Submit */}
                        <Button variant="primary" onClick={handleChangePassword} disabled={pwSaving} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          {pwSaving ? <><div style={{ width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Saving</> : "Update password"}
                        </Button>

                        <div style={{ fontSize: 12, color: "#bbb", marginTop: 16, lineHeight: 1.4 }}>Your password does not expire. Choose something memorable and unique to this account.</div>
                      </div>
                    )

                    /* Security overview */
                    : (
                      <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 24px", minHeight: 0, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                        <Card padding="none">
                          <div style={{ padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="9" width="12" height="8" rx="2" stroke="#888" strokeWidth="1.3" /><path d="M7 9V6C7 4.3 8.3 3 10 3C11.7 3 13 4.3 13 6V9" stroke="#888" strokeWidth="1.3" strokeLinecap="round" /></svg>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Password</div>
                                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Last changed 3 months ago</div>
                              </div>
                            </div>
                            <Button variant="secondary" onClick={() => { setSecurityView("change-password"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); setPwError(""); setShowCurrentPw(false); setShowNewPw(false); setShowConfirmPw(false); }} style={{ width: "100%" }}>Change password</Button>
                          </div>
                        </Card>

                        <Card padding="none">
                          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M7 3C4.2 4.5 3 7.5 3 11C3 14.5 4.2 17.5 7 19" stroke="#888" strokeWidth="1.3" strokeLinecap="round" /><path d="M15 3C17.8 4.5 19 7.5 19 11C19 14.5 17.8 17.5 15 19" stroke="#888" strokeWidth="1.3" strokeLinecap="round" /><path d="M9 6C7.5 7 7 9 7 11C7 13 7.5 15 9 16" stroke="#888" strokeWidth="1.3" strokeLinecap="round" /><path d="M13 6C14.5 7 15 9 15 11C15 13 14.5 15 13 16" stroke="#888" strokeWidth="1.3" strokeLinecap="round" /><circle cx="11" cy="11" r="1.5" fill="#888" /></svg>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Face ID</div>
                              <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Use Face ID to log in to the app</div>
                            </div>
                            <Toggle checked={biometricsEnabled} onChange={() => { setShowBiometricPrompt(true); setTimeout(() => { setShowBiometricPrompt(false); setBiometricsEnabled(p => !p); }, 1000); }} />
                          </div>
                        </Card>
                        {showBiometricPrompt && (
                          <div style={{ padding: "12px 16px", background: "#f0f4ff", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 16, height: 16, border: "2px solid #666", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: "#555" }}>Verifying with Face ID...</span>
                          </div>
                        )}

                        <Card padding="none">
                          <div style={{ padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="#888" strokeWidth="1.3" /><path d="M7 10L9 12L13 8" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>2FA</div>
                              </div>
                              <Tag variant="neutral">Not set up</Tag>
                            </div>
                            <div style={{ fontSize: 12, color: "#999", lineHeight: 1.4, marginBottom: 12 }}>Add an extra layer of security to your account by requiring a verification code when you log in.</div>
                            <Button variant="secondary" style={{ width: "100%" }}>Set up 2FA</Button>
                          </div>
                        </Card>

                        <div style={{ fontSize: 12, color: "#bbb", lineHeight: 1.4 }}>Security changes apply across all your schools and children on this account.</div>
                      </div>
                    )}
                  </div>
                );
              })()

              /* === ACCOUNT & SETTINGS SCREEN (combined) === */
              : profileScreen === "account-settings" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 12px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                    <button onClick={() => setProfileScreen(null)} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>Account & settings</span>
                  </div>
                  <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 24px", minHeight: 0, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                    <Card padding="none" style={{ cursor: "pointer" }} onClick={() => setProfileScreen("your-details")}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <CircleUserRound size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>Your details</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Name, email, phone & address</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Card>

                    <Card padding="none" style={{ cursor: "pointer" }} onClick={() => { setProfileScreen("security"); setSecurityView("overview"); }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Lock size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>Login & security</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Password, Face ID & 2FA</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Card>

                    <Card padding="none" style={{ cursor: "pointer" }} onClick={() => setProfileScreen("notifications")}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Bell size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>Notifications</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Messages, payments, meals & attendance</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Card>

                    <Card padding="none" style={{ cursor: "pointer" }} onClick={() => setProfileScreen("help")}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Info size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>Help & about</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>FAQs, app version, terms & privacy</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Card>

                  </div>
                </div>
              )

              /* === CHILDREN SCREEN === */
              : profileScreen === "children" ? (() => {
                const activeChild = profileChild || children[0];
                const childNoticesAll = allNotices.filter(n => n.child === activeChild.name);
                const childNoticesPending = childNoticesAll.filter(n => !consentDecisions[n.id]);
                const childNoticesResponded = childNoticesAll.filter(n => consentDecisions[n.id]);
                const isSingleChild = children.length === 1;

                return (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                    {/* Header */}
                    <div style={{ padding: "4px 16px 0", flexShrink: 0, boxShadow: isSingleChild ? "0 1px 0 rgba(0,0,0,0.06)" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                        <button onClick={() => { setProfileScreen(null); setProfileChild(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>{activeChild.name}'s details</span>
                      </div>
                      {/* Child pill filters — multi-child only */}
                      {!isSingleChild && (
                        <div style={{ display: "flex", gap: 8, paddingBottom: 12, boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
                          {children.map(child => {
                            const isActive = activeChild.id === child.id;
                            const noticeCount = allNotices.filter(n => n.child === child.name && !consentDecisions[n.id]).length;
                            return (
                              <button key={child.id} onClick={() => setProfileChild(child)} className="btn-pill" style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "6px 14px", borderRadius: 20,
                                border: isActive ? "1.5px solid var(--color-brand-600)" : "1.5px solid #ddd",
                                background: isActive ? "var(--color-brand-600)" : "#fff",
                                cursor: "pointer", fontFamily: "inherit",
                                fontSize: 13, fontWeight: 600,
                                color: isActive ? "#fff" : "#666",
                              }}>
                                {child.name}
                                {noticeCount > 0 && (
                                  <span style={{
                                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                                    minWidth: 16, borderRadius: 99,
                                    background: isActive ? "#fff" : "#ef6c00",
                                    color: isActive ? "var(--color-brand-600)" : "#fff",
                                    fontSize: 9, fontWeight: 700, lineHeight: 1, padding: "3px 5px",
                                  }}>{noticeCount}</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    {/* Single scrollable content */}
                    <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", minHeight: 0, background: "#fff" }}>

                      {/* === PENDING CONSENTS === */}
                      {(childNoticesPending.length > 0 || consentToast === activeChild.name) && (
                        <div style={{ marginBottom: 28 }}>
                          {/* Toast — shown after last consent resolved */}
                          {consentToast === activeChild.name && (
                            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 12, background: "#F0FAF3", border: "1.5px solid var(--color-brand-600)", opacity: consentToastFading ? 0 : 1, transition: "opacity 0.4s" }}>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><circle cx="10" cy="10" r="8.5" stroke="var(--color-brand-600)" strokeWidth="1.5" fill="none" /><path d="M6.5 10L9 12.5L13.5 7.5" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              <span style={{ fontSize: 14, fontWeight: 600, color: "#1a5c2a" }}>All consents responded to</span>
                            </div>
                          )}

                          {/* Consent cards */}
                          {childNoticesPending.length > 0 && (() => {
                            const visibleConsents = showAllConsents[activeChild.id] ? childNoticesPending : childNoticesPending.slice(0, 3);
                            const hiddenCount = childNoticesPending.length - 3;
                            return (
                              <>
                                {visibleConsents.map(notice => {
                                  const fading = fadingConsents[notice.id];
                                  const pending = consentPendingAction[notice.id];
                                  const detailOpen = consentDetailOpen[notice.id] || false;
                                  const isLast = childNoticesPending.length === 1;
                                  const handleSubmit = () => {
                                    setFadingConsents(prev => ({ ...prev, [notice.id]: true }));
                                    setTimeout(() => {
                                      setConsentDecisions(prev => ({ ...prev, [notice.id]: { decision: pending, note: consentNotes[notice.id] || "", date: "5 Mar 2026" } }));
                                      setConsentPendingAction(prev => { const n = { ...prev }; delete n[notice.id]; return n; });
                                      setConsentNotes(prev => { const n = { ...prev }; delete n[notice.id]; return n; });
                                      setFadingConsents(prev => { const n = { ...prev }; delete n[notice.id]; return n; });
                                      if (isLast) {
                                        setConsentToast(activeChild.name);
                                        setTimeout(() => {
                                          setConsentToastFading(true);
                                          setTimeout(() => { setConsentToast(null); setConsentToastFading(false); }, 400);
                                        }, 3500);
                                      }
                                    }, 520);
                                  };
                                  return (
                                    <div key={notice.id} style={{ marginBottom: 12, opacity: fading ? 0 : 1, maxHeight: fading ? 0 : 600, overflow: "hidden", transition: "opacity 0.22s, max-height 0.3s 0.22s" }}>
                                      <Card padding="none" style={{ borderLeft: "3px solid #e67e22", overflow: "hidden" }}>
                                        <div style={{ padding: "14px 16px 0" }}>
                                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                            <Tag variant="warning">{notice.type}</Tag>
                                            <span style={{ fontSize: 11, color: "#999" }}>Sent {notice.date}</span>
                                          </div>
                                          <div style={{ fontSize: 14, fontWeight: 600, color: "#333", marginBottom: 8 }}>{notice.title}</div>
                                          <button onClick={() => setConsentDetailOpen(prev => ({ ...prev, [notice.id]: !prev[notice.id] }))} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, color: "#888", padding: 0, display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: detailOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><path d="M3 5L6 8L9 5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            {detailOpen ? "Hide details" : "View details"}
                                          </button>
                                          {detailOpen && (
                                            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, whiteSpace: "pre-line", marginBottom: 14, padding: "12px", background: "#fafafa", borderRadius: 8, border: "1px solid #f0f0f0" }}>{notice.description}</div>
                                          )}
                                        </div>
                                        {!pending ? (
                                          <div style={{ display: "flex", borderTop: "1px solid #f0f0f0" }}>
                                            <button onClick={() => setConsentPendingAction(prev => ({ ...prev, [notice.id]: "given" }))} style={{ flex: 1, padding: "12px", border: "none", borderRight: "1px solid #f0f0f0", background: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L7 12L13 4" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-brand-600)" }}>Give consent</span>
                                            </button>
                                            <button onClick={() => setConsentPendingAction(prev => ({ ...prev, [notice.id]: "declined" }))} style={{ flex: 1, padding: "12px", border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="#cc3333" strokeWidth="2" strokeLinecap="round" /></svg>
                                              <span style={{ fontSize: 13, fontWeight: 600, color: "#cc3333" }}>Decline</span>
                                            </button>
                                          </div>
                                        ) : (
                                          <div style={{ padding: "12px 16px 14px", borderTop: "1px solid #f0f0f0" }}>
                                            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 8 }}>Add a note (optional)</div>
                                            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                                              <div style={{ flex: 1 }}>
                                                <Input type="text" value={consentNotes[notice.id] || ""} onChange={(e) => setConsentNotes(prev => ({ ...prev, [notice.id]: e.target.value }))} placeholder="Optional note..." style={{ width: "100%" }} />
                                              </div>
                                              <Button variant={pending === "given" ? "primary" : "destructive"} size="small" onClick={handleSubmit} style={{ flexShrink: 0 }}>Submit</Button>
                                            </div>
                                            <Button variant="ghost" size="small" onClick={() => setConsentPendingAction(prev => { const n = { ...prev }; delete n[notice.id]; return n; })} style={{ padding: "8px 0 0" }}>Back</Button>
                                          </div>
                                        )}
                                      </Card>
                                    </div>
                                  );
                                })}
                                {childNoticesPending.length > 3 && (
                                  <button onClick={() => setShowAllConsents(prev => ({ ...prev, [activeChild.id]: !prev[activeChild.id] }))} style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "10px 0", border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "#888" }}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: showAllConsents[activeChild.id] ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><path d="M3 5L7 9L11 5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    {showAllConsents[activeChild.id] ? "Show fewer" : `View ${hiddenCount} more consent${hiddenCount > 1 ? "s" : ""}`}
                                  </button>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}

                      {/* === DETAILS === */}
                      <div style={{ marginBottom: 28 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-grey-700)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Details</div>
                        {[
                          { label: "Full name", value: activeChild.name + " Collini" },
                          { label: "Date of birth", value: activeChild.id === 1 ? "15 Mar 2018" : activeChild.id === 2 ? "22 Sep 2019" : "8 Jun 2012" },
                          { label: "Year group", value: activeChild.id === 1 ? "Year 3" : activeChild.id === 2 ? "Year 2" : "Year 9" },
                          { label: "Class", value: activeChild.id === 1 ? "3T – Miss Taylor" : activeChild.id === 2 ? "2D – Mr Davies" : "9C – Mrs Clarke" },
                          { label: "School", value: activeChild.school },
                        ].map((field, i) => (
                          <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: "#999", marginBottom: 2 }}>{field.label}</div>
                            <div style={{ fontSize: 14, color: "#333" }}>{field.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* === MEDICAL & DIETARY === */}
                      <div style={{ marginBottom: 28 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-grey-700)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Medical & dietary</div>
                        {[
                          { label: "Allergies", value: activeChild.id === 1 ? "None known" : activeChild.id === 2 ? "Peanuts (EpiPen held in school office)" : "None known" },
                          { label: "Dietary requirements", value: activeChild.id === 2 ? "Nut-free" : "None" },
                          { label: "Medical conditions", value: activeChild.id === 3 ? "Asthma (inhaler held in school office)" : "None known" },
                          { label: "Emergency medication", value: activeChild.id === 2 ? "EpiPen – school office" : activeChild.id === 3 ? "Blue inhaler – school office" : "None" },
                        ].map((field, i) => (
                          <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: "#999", marginBottom: 2 }}>{field.label}</div>
                            <div style={{ fontSize: 14, color: "#333" }}>{field.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* === RESPONDED CONSENTS === */}
                      {childNoticesResponded.length > 0 && (() => {
                        const sortedResponded = [...childNoticesResponded].sort((a, b) => new Date(consentDecisions[b.id].date) - new Date(consentDecisions[a.id].date));
                        const isExpanded = pastConsentsExpanded[activeChild.id];
                        return (
                          <div style={{ marginBottom: 20 }}>
                            <button
                              onClick={() => setPastConsentsExpanded(prev => ({ ...prev, [activeChild.id]: !prev[activeChild.id] }))}
                              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", background: "none", border: "none", cursor: "pointer", marginBottom: isExpanded ? 10 : 0 }}
                            >
                              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-grey-700)", textTransform: "uppercase", letterSpacing: 0.5 }}>Past consents ({childNoticesResponded.length})</span>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                                <path d="M4 6L8 10L12 6" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <div style={{ maxHeight: isExpanded ? 2000 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                              {sortedResponded.map(notice => {
                                const d = consentDecisions[notice.id];
                                const isGiven = d.decision === "given";
                                return (
                                  <Card key={notice.id} padding="none" style={{ marginBottom: 10 }}>
                                    <div style={{ padding: "14px 16px" }}>
                                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#333", flex: 1, marginRight: 8 }}>{notice.title}</div>
                                        <span style={{ padding: "3px 10px", borderRadius: 6, background: isGiven ? "#e8f5e9" : "#fce4ec", color: isGiven ? "#4caf50" : "#c62828", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                                          {isGiven ? "Given" : "Declined"}
                                        </span>
                                      </div>
                                      <div style={{ fontSize: 12, color: "#999" }}>Responded {d.date}</div>
                                      {d.note && <div style={{ fontSize: 12, color: "#888", marginTop: 6, fontStyle: "italic" }}>Note: {d.note}</div>}
                                    </div>
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}

                      <div style={{ fontSize: 12, color: "#bbb", marginTop: 8, lineHeight: 1.4 }}>To update any details, please contact the school office.</div>
                    </div>
                  </div>
                );
              })()

              /* === YOUR DETAILS SCREEN === */
              : profileScreen === "your-details" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 12px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                    <button onClick={() => setProfileScreen("account-settings")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>Your details</span>
                  </div>
                  <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 24px", minHeight: 0, background: "#fff" }}>
                    {[
                      { label: "Full name", value: "Kate Collini" },
                      { label: "Email", value: "kate.collini@email.com" },
                      { label: "Phone", value: "07700 900123" },
                      { label: "Address", value: "14 Oakfield Road\nSurbiton, KT6 4AA" },
                      { label: "Relationship to children", value: "Mother" },
                    ].map((field, i) => (
                      <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid #f0f0f0" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#999", marginBottom: 4 }}>{field.label}</div>
                        <div style={{ fontSize: 14, color: "#333", whiteSpace: "pre-line" }}>{field.value}</div>
                      </div>
                    ))}
                    <div style={{ fontSize: 12, color: "#bbb", marginTop: 16, lineHeight: 1.4 }}>To update your contact details, please contact the school office.</div>
                  </div>
                </div>
              )

              /* === NOTIFICATIONS SCREEN === */
              : profileScreen === "notifications" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 12px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                    <button onClick={() => setProfileScreen("account-settings")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>Push notifications</span>
                  </div>
                  <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 24px", minHeight: 0, background: "#fff" }}>
                    <div style={{ fontSize: 13, color: "#888", marginBottom: 16, lineHeight: 1.4 }}>Choose which notifications you receive on this device. These settings apply across all your children and schools.</div>
                    {[
                      { id: "messages", label: "Messages", desc: "New messages and replies from school" },
                      { id: "payments", label: "Payments", desc: "Payment confirmations and balance alerts" },
                      { id: "meals", label: "Meals", desc: "Menu updates and meal order reminders" },
                      { id: "attendance", label: "Attendance", desc: "Absence notifications and attendance alerts" },
                    ].map(item => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #f0f0f0" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{item.label}</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{item.desc}</div>
                        </div>
                        <Toggle
                          checked={notifToggles[item.id]}
                          onChange={(checked) => setNotifToggles(prev => ({ ...prev, [item.id]: checked }))}
                        />
                      </div>
                    ))}
                    <div style={{ fontSize: 12, color: "#bbb", marginTop: 16, lineHeight: 1.4 }}>If notifications are disabled at the system level, you may need to enable them in your device settings.</div>
                  </div>
                </div>
              )

              /* === HELP & ABOUT SCREEN === */
              : profileScreen === "help" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 12px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                    <button onClick={() => setProfileScreen("account-settings")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>Help & about</span>
                  </div>
                  <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 24px", minHeight: 0, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                    <Card padding="none" style={{ cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>Help centre</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>FAQs, guides and support articles</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Card>

                    <Card padding="none" style={{ cursor: "pointer" }} onClick={() => setProfileScreen("legal")}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>Legal</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Terms & conditions and privacy policy</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Card>

                    <Card padding="none">
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>Share usage data</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2, lineHeight: 1.4 }}>Help us improve the app by sharing anonymous usage data</div>
                        </div>
                        <Toggle checked={analyticsEnabled} onChange={() => setAnalyticsEnabled(prev => !prev)} />
                      </div>
                    </Card>

                    <div style={{ textAlign: "center", marginTop: 12 }}>
                      <div style={{ fontSize: 12, color: "#bbb" }}>Version 1.0.0 (build 42)</div>
                    </div>

                    <div style={{ marginTop: 8 }}>
                      <Button variant="destructive-secondary" onClick={() => setProfileScreen("delete-confirm")} style={{ width: "100%" }}>Delete my account</Button>
                    </div>
                  </div>
                </div>
              )

              /* === LEGAL SCREEN === */
              : profileScreen === "legal" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 12px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                    <button onClick={() => setProfileScreen("help")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>Legal</span>
                  </div>
                  <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 24px", minHeight: 0, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                    <Card padding="none" style={{ cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", padding: "14px 16px" }}>
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#222" }}>Terms and conditions</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Card>
                    <Card padding="none" style={{ cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", padding: "14px 16px" }}>
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#222" }}>Privacy policy</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Card>
                  </div>
                </div>
              )

              /* === DELETE CONFIRM === */
              : profileScreen === "delete-confirm" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 12px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                    <button onClick={() => setProfileScreen("help")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>Delete account</span>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px 16px" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#fce4ec", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M8 6V4C8 3.4 8.4 3 9 3H15C15.6 3 16 3.4 16 4V6M19 6V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V6" stroke="#c44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#222", marginBottom: 8 }}>Are you sure?</div>
                    <div style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 24 }}>This will send a request to delete your account and all associated data. This action cannot be undone. You will be logged out once the request is submitted.</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
                      <button onClick={() => setProfileScreen("delete-done")} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "#c44", color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>Delete my account</button>
                      <button onClick={() => setProfileScreen("account-settings")} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1.5px solid #ddd", background: "#fff", color: "#666", fontSize: 15, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )

              /* === DELETE DONE === */
              : profileScreen === "delete-done" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 14L12 19L21 9" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#222", marginBottom: 8 }}>Request submitted</div>
                  <div style={{ fontSize: 14, color: "#888", lineHeight: 1.5 }}>Your account deletion request has been sent. You will receive a confirmation email shortly.</div>
                  <button onClick={() => { setShowProfile(false); setProfileScreen(null); }} style={{ marginTop: 24, padding: "12px 32px", borderRadius: 12, border: "none", background: "#444", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>Close</button>
                </div>
              )

              /* === FEEDBACK SCREEN === */
              : profileScreen === "feedback" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 16px 12px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                    <button onClick={() => { setProfileScreen(null); setFeedbackCategory(null); setFeedbackText(""); setFeedbackSent(false); setFeedbackError(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>Share feedback</span>
                  </div>
                  {feedbackSent ? (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 14L12 19L21 9" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#222", marginBottom: 8 }}>Thanks for your feedback!</div>
                      <div style={{ fontSize: 14, color: "#888", lineHeight: 1.5 }}>It helps us improve the app for every parent.</div>
                      <Button variant="primary" onClick={() => { setShowProfile(false); setProfileScreen(null); setFeedbackCategory(null); setFeedbackText(""); setFeedbackSent(false); setActiveTab("home"); }} style={{ marginTop: 24 }}>Back to home</Button>
                    </div>
                  ) : (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", minHeight: 0, background: "#fff" }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 6 }}>How's your experience with the app so far?</div>
                        <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Your feedback helps us improve.</div>
                        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 4 }}>
                          {[["👎", 1, "Not great"], ["👍", 2, "Great"]].map(([face, val, label]) => (
                            <button
                              key={val}
                              onClick={() => { setFeedbackCategory(val); setFeedbackError(false); }}
                              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: feedbackCategory && feedbackCategory !== val ? 0.2 : 1, transition: "opacity 0.15s" }}
                            >
                              <span style={{ fontSize: 32, lineHeight: 1 }}>{face}</span>
                              <span style={{ fontSize: 12, color: "#666", fontFamily: "var(--font-family-sans)" }}>{label}</span>
                            </button>
                          ))}
                        </div>
                        {feedbackError && (
                          <div style={{ textAlign: "center", fontSize: 12, color: "#B22929", marginBottom: 16, marginTop: 8 }}>Please tap a thumb to share your experience</div>
                        )}
                        {!feedbackError && <div style={{ marginBottom: 16 }} />}
                        <TextArea placeholder="Tell us what's working well or what could be improved… (optional)" rows={4} value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} style={{ width: "100%" }} />
                      </div>
                      <div style={{ padding: "12px 16px 20px", background: "#fff", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                        <Button variant="primary" style={{ width: "100%" }} onClick={() => { if (!feedbackCategory) { setFeedbackError(true); } else { setFeedbackSent(true); } }}>Send feedback</Button>
                      </div>
                    </div>
                  )}
                </div>
              )

              /* === PROFILE OVERVIEW — 2 CARDS === */
              : (
                <div style={{ flex: 1, overflowY: "auto", minHeight: 0, background: "#fff" }}>
                  {/* Header */}
                  <div style={{ padding: "4px 16px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#222", marginBottom: 2 }}>Kate Collini</div>
                      <div style={{ fontSize: 13, color: "#999" }}>kate.collini@email.com</div>
                      </div>
                      <button onClick={() => { setShowProfile(false); setProfileScreen(null); setProfileChild(null); }} className="btn-icon" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--color-grey-200)", background: "var(--color-white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
                      </button>
                    </div>
                  </div>

                  {/* 2 cards */}
                  <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* Account & settings */}
                    <Card padding="none" style={{ cursor: "pointer" }} onClick={() => setProfileScreen("account-settings")}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "16px" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <CircleUserRound size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Account & settings</div>
                        <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Your details, security, notifications</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    </Card>

                    {/* Children */}
                    {(() => {
                      const totalNotices = allNotices.filter(n => !consentDecisions[n.id]).length;
                      const isSingleChild = children.length === 1;
                      const singleChildIcon = (
                        <User size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                      );
                      const multiChildIcon = (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="2.5" stroke="var(--color-brand-600)" strokeWidth="1.2" /><circle cx="13" cy="7" r="2.5" stroke="var(--color-brand-600)" strokeWidth="1.2" /><path d="M1 16C1 13.5 3.5 11.5 7 11.5C7.8 11.5 8.5 11.6 9.2 11.8" stroke="var(--color-brand-600)" strokeWidth="1.2" strokeLinecap="round" /><path d="M9 16C9 13.5 10.8 11.5 13 11.5C15.2 11.5 17 13.5 17 16" stroke="var(--color-brand-600)" strokeWidth="1.2" strokeLinecap="round" /></svg>
                      );
                      return (
                        <Card padding="none" style={{ cursor: "pointer" }} onClick={() => { setProfileScreen("children"); setProfileChild(children[0]); }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "16px" }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {isSingleChild ? singleChildIcon : multiChildIcon}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>{isSingleChild ? children[0].name + "'s details" : "Children's details"}</div>
                              <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{isSingleChild ? children[0].school : "Details, medical info & consents"}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                              {totalNotices > 0 && <div style={{ minWidth: 20, height: 20, borderRadius: 10, background: "#ef6c00", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{totalNotices}</div>}
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                          </div>
                        </Card>
                      );
                    })()}

                    {/* Feedback */}
                    <Card padding="none" style={{ cursor: "pointer" }} onClick={() => setProfileScreen("feedback")}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "16px" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4C3 3.4 3.4 3 4 3H16C16.6 3 17 3.4 17 4V13C17 13.6 16.6 14 16 14H11L7 17V14H4C3.4 14 3 13.6 3 13V4Z" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinejoin="round"/><path d="M7 8H13M7 11H10" stroke="var(--color-brand-600)" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Share feedback</div>
                          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Help us improve the app</div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Card>
                  </div>

                  {/* Log out */}
                  <div style={{ padding: "20px 16px 24px" }}>
                    <Button variant="destructive-secondary" style={{ width: "100%" }}>Log out</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Absence reporting overlay ───────────────────────────────────── */}
        {myChildPage && myChildPage !== "absences" && activeTab === "my-child" && (
          <div style={{ position: "absolute", inset: 0, zIndex: 90, background: "var(--color-bg-secondary)", display: "flex", flexDirection: "column" }}>

            {/* ── FORM ── */}
            {myChildPage === "absence-form" && (<>
              {/* Safe area / phone notch */}
              <div style={{ height: isMobile ? 20 : 50, background: "var(--color-bg-primary)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
                <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
              </div>
              {/* Nav bar */}
              <div style={{ background: "var(--color-bg-primary)", borderBottom: "1px solid var(--color-border-default)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0 }}>
                <button
                  onClick={() => isAbsenceFormDirty ? setShowAbsenceCancelSheet(true) : (resetAbsenceForm(), setMyChildPage("absences"))}
                  style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}
                >
                  <ChevronLeft size={20} color="var(--color-icon-default)" strokeWidth={1.5} />
                </button>
                <span style={{ fontSize: "var(--font-size-4)", fontWeight: 600, color: "var(--color-text-primary)" }}>Report an absence</span>
                <button
                  onClick={() => isAbsenceFormDirty ? setShowAbsenceCancelSheet(true) : (resetAbsenceForm(), setMyChildPage("absences"))}
                  style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                >
                  <X size={20} color="var(--color-icon-default)" strokeWidth={1.5} />
                </button>
              </div>

              {/* Scrollable body */}
              <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>

                {/* When card */}
                <div style={{ margin: "16px 16px 0" }}>
                  <Card padding="none">
                    {!absenceMultiDay && (<>
                      <MobileDatePicker
                        label="Date"
                        value={absenceStartDate}
                        min="2026-04-21"
                        error={absenceErrors.startDate}
                        onChange={(v) => { setAbsenceStartDate(v); setAbsenceErrors(prev => ({ ...prev, startDate: undefined })); }}
                      />
                      {absenceErrors.startDate && <div style={{ padding: "0 16px 10px", fontSize: "var(--font-size-1)", color: "var(--color-text-destructive)" }}>{absenceErrors.startDate}</div>}
                    </>)}

                    {absenceMultiDay && (<>
                      <MobileDatePicker
                        label="Start date"
                        value={absenceStartDate}
                        min="2026-04-21"
                        error={absenceErrors.startDate}
                        onChange={(v) => { setAbsenceStartDate(v); setAbsenceErrors(prev => ({ ...prev, startDate: undefined })); }}
                      />
                      {absenceErrors.startDate && <div style={{ padding: "0 16px 10px", fontSize: "var(--font-size-1)", color: "var(--color-text-destructive)" }}>{absenceErrors.startDate}</div>}
                      <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />
                      <MobileDatePicker
                        label="End date"
                        value={absenceEndDate}
                        min={absenceStartDate || "2026-04-21"}
                        error={absenceErrors.endDate}
                        onChange={(v) => { setAbsenceEndDate(v); setAbsenceErrors(prev => ({ ...prev, endDate: undefined })); }}
                      />
                      {absenceErrors.endDate && <div style={{ padding: "0 16px 10px", fontSize: "var(--font-size-1)", color: "var(--color-text-destructive)" }}>{absenceErrors.endDate}</div>}
                    </>)}

                    <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", minHeight: 52 }}>
                      <span style={{ fontSize: "var(--font-size-4)", fontWeight: 500, color: "var(--color-text-primary)" }}>Multiple days</span>
                      <Toggle
                        checked={absenceMultiDay}
                        onChange={(val) => { setAbsenceMultiDay(val); setAbsenceErrors(prev => ({ ...prev, startDate: undefined, endDate: undefined })); }}
                      />
                    </div>

                    <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />

                    <MobileTimePicker
                      label="Start time"
                      value={absenceStartTime}
                      onChange={setAbsenceStartTime}
                    />

                    <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />

                    <MobileTimePicker
                      label="End time"
                      value={absenceEndTime}
                      onChange={setAbsenceEndTime}
                    />
                  </Card>
                </div>

                {/* Absence details card */}
                <div style={{ margin: "12px 16px 0" }}>
                  <Card padding="none">
                    <div style={{ padding: "14px 16px 10px" }}>
                      <div style={{ fontSize: "var(--font-size-4)", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 8 }}>Reason for absence</div>
                      <Combobox
                        options={absenceReasonOptions}
                        value={absenceReason || undefined}
                        placeholder="Select a reason"
                        state={absenceErrors.reason ? "error" : "default"}
                        error={absenceErrors.reason}
                        onChange={(val) => { setAbsenceReason(val || ""); setAbsenceOtherText(""); setAbsenceErrors(prev => ({ ...prev, reason: undefined, otherText: undefined })); }}
                      />
                    </div>

                    {absenceReason === "Other" && (<>
                      <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />
                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: "var(--font-size-4)", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 8 }}>Please give details</div>
                        <TextArea
                          value={absenceOtherText}
                          onChange={(e) => { setAbsenceOtherText(e.target.value); setAbsenceErrors(prev => ({ ...prev, otherText: undefined })); }}
                          placeholder="Tell the school what's happened..."
                          state={absenceErrors.otherText ? "error" : "default"}
                          error={absenceErrors.otherText}
                          rows={3}
                          style={{ width: "100%", fontSize: "16px" }}
                        />
                      </div>
                    </>)}

                    {absenceReason !== "Other" && (
                      <div style={{ padding: "14px 16px 14px" }}>
                        <div style={{ fontSize: "var(--font-size-4)", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 8 }}>
                          Note to school <span style={{ fontWeight: 400, color: "var(--color-text-tertiary)" }}>(optional)</span>
                        </div>
                        <TextArea
                          value={absenceNote}
                          onChange={(e) => setAbsenceNote(e.target.value)}
                          placeholder="Add any additional details for the school..."
                          rows={3}
                          style={{ width: "100%", fontSize: "16px" }}
                        />
                      </div>
                    )}
                  </Card>
                </div>

                {/* Debug: error simulation */}
                <div style={{ margin: "24px 16px 8px", padding: "12px 14px", background: "var(--color-bg-secondary)", borderRadius: 10, border: "1px solid var(--color-border-default)" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: 8, letterSpacing: "0.05em" }}>PROTOTYPE — SIMULATE SUBMISSION</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[{ val: "none", label: "Success" }, { val: "server", label: "Server error" }, { val: "offline", label: "No connection" }].map(({ val, label }) => (
                      <button key={val} onClick={() => setAbsenceErrorSim(val)}
                        style={{ padding: "6px 12px", borderRadius: 99, border: `1.5px solid ${absenceErrorSim === val ? "var(--color-brand-600)" : "var(--color-border-default)"}`, background: absenceErrorSim === val ? "var(--color-brand-600)" : "var(--color-bg-primary)", color: absenceErrorSim === val ? "var(--color-white)" : "var(--color-text-secondary)", fontSize: 12, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ height: 32 }} />
              </div>

              {/* Footer CTA */}
              <div style={{ padding: "12px 16px 20px", background: "var(--color-bg-primary)", borderTop: "1px solid var(--color-border-default)", flexShrink: 0 }}>
                <Button
                  variant="primary"
                  style={{ width: "100%" }}
                  onClick={handleAbsenceSubmit}
                >
                  {absenceSending ? (
                    <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "var(--color-white)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  ) : `Send ${selectedChild.name}'s report`}
                </Button>
              </div>

              {/* Cancel confirmation sheet */}
              {showAbsenceCancelSheet && (
                <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
                  <div onClick={() => setShowAbsenceCancelSheet(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "var(--color-bg-primary)", borderRadius: "20px 20px 0 0", padding: "24px 16px 36px", zIndex: 1 }}>
                    <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--color-border-default)", margin: "0 auto 20px" }} />
                    <div style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8, textAlign: "center" }}>Leave without reporting?</div>
                    <div style={{ fontSize: 14, color: "var(--color-text-secondary)", textAlign: "center", marginBottom: 24 }}>Your absence report won't be sent.</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <Button
                        variant="destructive-secondary"
                        onClick={() => { resetAbsenceForm(); setMyChildPage("absences"); }}
                        style={{ width: "100%" }}
                      >
                        Leave
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setShowAbsenceCancelSheet(false)}
                        style={{ width: "100%" }}
                      >
                        Keep editing
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ERROR TOAST ── */}
              {absenceToast && (
                <div style={{ position: "absolute", bottom: 84, left: 16, right: 16, zIndex: 200 }}>
                  <Toast
                    variant={absenceToast === "offline" ? "warning" : "danger"}
                    message={absenceToast === "offline" ? "No connection. Check your signal and try again." : "Something went wrong. Please try again."}
                    onClose={() => setAbsenceToast(null)}
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </>)}

            {/* ── SUCCESS ── */}
            {myChildPage === "absence-success" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* White top block with notch + close button */}
                <div style={{ background: "var(--color-white)", flexShrink: 0 }}>
                  <div style={{ height: isMobile ? 20 : 50, background: "var(--color-white)", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
                    <div style={{ width: 120, height: 28, background: "var(--color-text-primary)", borderRadius: 14, display: isMobile ? "none" : "block" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 16px 0" }}>
                    <button onClick={() => { resetAbsenceForm(); setMyChildPage(null); setActiveTab("home"); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="var(--color-icon-default)" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </button>
                  </div>
                </div>

                {/* Scrollable content */}
                <div style={{ flex: 1, minHeight: 0, overflowY: "auto", background: "var(--color-bg-secondary)", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 20px" }}>
                  {/* Success circle */}
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--color-success-050)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, flexShrink: 0 }}>
                    <svg width="28" height="28" viewBox="0 0 36 36" fill="none"><path d="M10 18L16 24L26 12" stroke="var(--color-success-700)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 28px", textAlign: "center" }}>Absence reported</h1>

                  {/* Summary card */}
                  <div style={{ background: "var(--color-white)", borderRadius: 12, padding: 16, width: "100%", marginBottom: 16, border: "1px solid var(--color-grey-100)" }}>
                    {/* Child + school */}
                    <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px" }}>{selectedChild.name} Brown</h2>
                    <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>{selectedChild.school}</p>

                    <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0" }} />

                    {/* Date + time */}
                    <p style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 4px" }}>
                      {absenceMultiDay
                        ? `${formatAbsenceDate(absenceStartDate)} – ${formatAbsenceDate(absenceEndDate)}`
                        : formatAbsenceDate(absenceStartDate)
                      }
                    </p>
                    <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>
                      {formatAbsenceTime(absenceStartTime)} – {formatAbsenceTime(absenceEndTime)}
                    </p>

                    <div style={{ height: 1, background: "var(--color-grey-100)", margin: "14px 0" }} />

                    {/* Reason */}
                    <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>Reason</p>
                    {absenceReason === "Other" ? (
                      <>
                        <p style={{ fontSize: 14, color: "var(--color-text-primary)", margin: "0 0 4px", lineHeight: 1.5, ...(absenceOtherExpanded ? {} : { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }) }}>
                          {`Other — ${absenceOtherText}`}
                        </p>
                        <button onClick={() => setAbsenceOtherExpanded(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14, color: "var(--color-brand-600)", textDecoration: "underline", textUnderlineOffset: 2, fontFamily: "inherit" }}>
                          {absenceOtherExpanded ? "Read less" : "Read more"}
                        </button>
                      </>
                    ) : (
                      <p style={{ fontSize: 14, color: "var(--color-text-primary)", margin: 0, lineHeight: 1.5 }}>
                        {absenceReason}
                      </p>
                    )}
                  </div>

                  {/* What happens next */}
                  <div style={{ background: "var(--color-white)", borderRadius: 12, padding: 16, width: "100%", border: "1px solid var(--color-grey-100)" }}>
                    <p style={{ fontSize: "var(--font-size-3)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", margin: "0 0 12px" }}>What happens next</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <ClipboardList size={16} color="var(--color-text-secondary)" style={{ flexShrink: 0, marginTop: 3 }} />
                        <p style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.5, margin: 0 }}>The school will review your report shortly</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <MessageCircle size={16} color="var(--color-text-secondary)" style={{ flexShrink: 0, marginTop: 3 }} />
                        <p style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.5, margin: 0 }}>They may follow up if they need any more information</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ padding: "12px 16px 20px", flexShrink: 0, background: "var(--color-white)", borderTop: "1px solid var(--color-border-default)" }}>
                  <Button variant="primary" style={{ width: "100%", marginBottom: 10 }} onClick={() => { resetAbsenceForm(); setMyChildPage(null); setActiveTab("home"); }}>
                    Back to home
                  </Button>
                  <Button variant="secondary" style={{ width: "100%" }} onClick={() => { resetAbsenceForm(); setMyChildPage("absence-form"); }}>
                    Report another absence
                  </Button>
                </div>
              </div>
            )}


          </div>
        )}
        </>)}
        </>)}
      </div>
    </div>
    </>
  );
}
