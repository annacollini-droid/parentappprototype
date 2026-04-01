import { useState, useEffect, useRef } from "react";
import womanParent from "./assets/woman-parent.png";
import BottomNavBar from "./BottomNavBar.jsx";
import { Avatar, Button, Card, Checkbox, Toggle, Input, TextArea, Tag, Banner } from '@tonyarbor/components';
import { CircleUserRound, Lock, Bell, Info, User, School, Shapes, Bus, SunMoon, Utensils, ShoppingBag } from 'lucide-react';

const children = [
  { id: 1, name: "Molly", initials: "M", school: "Oakwood Primary" },
  { id: 2, name: "Lucas", initials: "L", school: "Oakwood Primary" },
  { id: 3, name: "Ethan", initials: "E", school: "Riverside Secondary" },
];

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
          background: "none",
          border: "1px solid #ccc",
          borderRadius: 20,
          padding: "4px 12px 4px 4px",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 14,
        }}
      >
        <Avatar initials={selectedChild.initials} size="small" />
        <span style={{ color: "#333", fontWeight: 500 }}>
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
              <Avatar initials={child.initials} size="small" />
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
        padding: "12px 16px",
        boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
        background: "#fff",
        flexShrink: 0,
      }}
    >
      {/* School logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#1a3a6b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            {/* Laurel left */}
            <path d="M22 80C18 72 16 62 18 52C20 58 22 62 24 66" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 52C16 46 16 40 18 34C20 40 21 44 22 48" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 34C18 28 20 22 24 18C24 24 24 28 23 32" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="16" cy="66" rx="3" ry="6" transform="rotate(-20 16 66)" fill="#c8a84b" />
            <ellipse cx="14" cy="54" rx="3" ry="6" transform="rotate(-10 14 54)" fill="#c8a84b" />
            <ellipse cx="14" cy="42" rx="3" ry="5.5" transform="rotate(0 14 42)" fill="#c8a84b" />
            <ellipse cx="16" cy="30" rx="3" ry="5.5" transform="rotate(10 16 30)" fill="#c8a84b" />
            {/* Laurel right */}
            <path d="M78 80C82 72 84 62 82 52C80 58 78 62 76 66" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
            <path d="M82 52C84 46 84 40 82 34C80 40 79 44 78 48" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
            <path d="M82 34C82 28 80 22 76 18C76 24 76 28 77 32" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="84" cy="66" rx="3" ry="6" transform="rotate(20 84 66)" fill="#c8a84b" />
            <ellipse cx="86" cy="54" rx="3" ry="6" transform="rotate(10 86 54)" fill="#c8a84b" />
            <ellipse cx="86" cy="42" rx="3" ry="5.5" transform="rotate(0 86 42)" fill="#c8a84b" />
            <ellipse cx="84" cy="30" rx="3" ry="5.5" transform="rotate(-10 84 30)" fill="#c8a84b" />
            {/* Circle arc */}
            <path d="M32 62C28 52 30 40 38 34C46 28 56 28 64 34C72 40 74 52 70 62" stroke="#c8a84b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Graduation cap */}
            <polygon points="50,16 30,28 50,36 70,28" fill="#7b2042" />
            <rect x="44" y="36" width="12" height="3" fill="#e0c97a" rx="1" />
            <line x1="50" y1="36" x2="50" y2="42" stroke="#e0c97a" strokeWidth="1.5" />
            <path d="M44 42C44 42 47 46 50 46C53 46 56 42 56 42" stroke="#e0c97a" strokeWidth="1.5" fill="none" />
            {/* Lines on shield */}
            <line x1="42" y1="44" x2="58" y2="44" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <line x1="42" y1="48" x2="58" y2="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <line x1="42" y1="52" x2="58" y2="52" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            {/* Banner */}
            <rect x="30" y="72" width="40" height="10" rx="2" fill="#c8a84b" />
            <text x="50" y="80" textAnchor="middle" fontSize="7" fill="#1a3a6b" fontWeight="700" fontFamily="sans-serif">SCHOOL</text>
          </svg>
        </div>
      </div>

      {/* Right side: child switcher + profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ visibility: hideChildSwitcher ? "hidden" : "visible", pointerEvents: hideChildSwitcher ? "none" : "auto" }}>
          <ChildSwitcher
            selectedChild={selectedChild}
            onSwitch={onSwitchChild}
          />
        </div>

        {/* Profile icon */}
        <div
          onClick={onProfileOpen}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 44,
            minHeight: 44,
          }}
        >
          <Avatar src={womanParent} alt="Parent profile" size="medium" style={{ border: "none" }} />
        </div>
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

export default function ParentApp() {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedChild, setSelectedChild] = useState(children[0]);
  const [activeTab, setActiveTab] = useState("home");
  const [subPage, setSubPage] = useState(null);
  const [browseFilter, setBrowseFilter] = useState("all");
  const [clubDayFilter, setClubDayFilter] = useState(null); // null = all days; "mon"–"fri" = day filter
  const [bookingsFilter, setBookingsFilter] = useState("needs-attention");
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [aboutTripOpen, setAboutTripOpen] = useState(false);
  const [detailPage, setDetailPage] = useState(null);
  const [flowStep, setFlowStep] = useState(null); // "consent", "sessions", etc.
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [bookingOption, setBookingOption] = useState(null); // "term" or "individual"
  const [termExpanded, setTermExpanded] = useState(false);
  const [selectedDates, setSelectedDates] = useState({}); // scenario 1: { dateId: true }
  const [selectedDates2, setSelectedDates2] = useState({}); // scenario 2: { dateId: "timeSlot" }
  const [selectedGridDates, setSelectedGridDates] = useState({}); // scenario 3: { dayId: true }
  const [selectedGridDates2, setSelectedGridDates2] = useState({}); // scenario 4: { dayId: "timeSlot" }
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "apple"
  const [showApplePay, setShowApplePay] = useState(false);
  const [reviewDatesExpanded, setReviewDatesExpanded] = useState(false);
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
  const allNotices = [
    { id: "n1", type: "Consent", title: "Swimming lessons – Year 3", child: "Molly", school: "Oakwood Primary", description: "Year 3 swimming lessons will take place every Monday from 14th April to 14th July at Greenfield Leisure Centre.\n\nChildren will travel by coach and be supervised by school staff and qualified instructors at all times.\n\nSwimming caps are required (available from the school office for £2). Children with long hair must tie it back.\n\nPlease give or decline consent below.", date: "25 Feb 2026" },
    { id: "n2", type: "Consent", title: "Science trip – Natural History Museum", child: "Ethan", school: "Riverside Secondary", description: "Year 9 have been offered a trip to the Natural History Museum on Friday 4th April.\n\nThe cost is £18 per student, covering coach travel and a guided workshop. Students will need a packed lunch and should wear school uniform.\n\nDeparture: 8:15am from the bus bay. Expected return: 4:00pm.\n\nPlease give or decline consent below.", date: "26 Feb 2026" },
    { id: "n3", type: "Consent", title: "School photo permissions 2025/26", child: "Lucas", school: "Oakwood Primary", description: "We would like your permission to use photographs of your child in school publications, on the school website, and on our social media channels.\n\nPhotos are used to celebrate achievements and school events. No child's full name is published alongside their image.\n\nYou may withdraw consent at any time by contacting the school office.\n\nPlease give or decline consent below.", date: "20 Feb 2026" },
    { id: "n4", type: "Consent", title: "Sports Day participation 2026", child: "Lucas", school: "Oakwood Primary", description: "Sports Day will take place on Friday 26th June on the school field.\n\nAll children are welcome to participate in running, throwing and jumping events. Please ensure your child comes in their PE kit and brings sunscreen and a water bottle.\n\nPlease give or decline consent below.", date: "27 Feb 2026" },
    { id: "n5", type: "Consent", title: "After-school cookery club – Summer term", child: "Lucas", school: "Oakwood Primary", description: "We are offering a cookery club for Year 2 children on Thursdays from 3:30–4:30pm, starting 24th April.\n\nThe cost is £5 per session, payable termly (£60). Children will cook simple recipes and take their food home each week.\n\nPlease give or decline consent below.", date: "28 Feb 2026" },
    { id: "n6", type: "Consent", title: "School trip – Tate Modern", child: "Lucas", school: "Oakwood Primary", description: "Historical notice.", date: "10 Jan 2026" },
    { id: "n9", type: "Consent", title: "Year 2 class trip – Bekonscot Model Village", child: "Lucas", school: "Oakwood Primary", description: "Historical notice.", date: "24 Sep 2025" },
    { id: "n10", type: "Consent", title: "Year 4 residential – Stubbington Study Centre", child: "Molly", school: "Oakwood Primary", description: "Year 4 are going on a 3-night residential to Stubbington Study Centre from Monday 12th May to Thursday 15th May.\n\nActivities include coastal fieldwork, night walks and team challenges. The cost is £285 per child, covering all meals, accommodation and activities. A deposit of £50 is due by 28th March.\n\nChildren should bring named clothing and a small amount of spending money (no more than £10).\n\nPlease give or decline consent below.", date: "3 Mar 2026" },
    { id: "n11", type: "Consent", title: "PSHE survey – Wellbeing and safety", child: "Molly", school: "Oakwood Primary", description: "As part of our PSHE curriculum, all Year 4 children are invited to take part in an anonymous wellbeing survey.\n\nThe survey covers topics including friendships, feelings and staying safe online. It is conducted by a specialist external provider, and no personally identifiable information is collected.\n\nResults are used to shape our pastoral support programme.\n\nPlease give or decline consent below.", date: "4 Mar 2026" },
    { id: "n12", type: "Consent", title: "After-school drama club – Summer term", child: "Molly", school: "Oakwood Primary", description: "We are offering a drama club for Year 4 children on Tuesdays from 3:30–4:30pm, starting 29th April.\n\nThe club will culminate in a short end-of-term performance for parents on Wednesday 16th July at 5:30pm.\n\nThe cost is £4 per session, payable termly (£48). Places are limited to 20 children.\n\nPlease give or decline consent below.", date: "5 Mar 2026" },
    { id: "n13", type: "Consent", title: "Swimming lessons – Year 4", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "20 Jan 2026" },
    { id: "n7", type: "Consent", title: "Media permission 2024/25", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "5 Sep 2025" },
    { id: "n14", type: "Consent", title: "School trip – Science Museum", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "8 Nov 2025" },
    { id: "n15", type: "Consent", title: "Sports Day participation 2025", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "2 Jun 2025" },
    { id: "n16", type: "Consent", title: "Flu vaccination 2025", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "15 Oct 2025" },
    { id: "n17", type: "Consent", title: "Year 3 residential – Stubbers Adventure", child: "Molly", school: "Oakwood Primary", description: "Historical notice.", date: "3 Mar 2025" },
    { id: "n18", type: "Consent", title: "Duke of Edinburgh – Bronze award", child: "Ethan", school: "Riverside Secondary", description: "Riverside Secondary is pleased to offer Year 10 students the opportunity to complete the Duke of Edinburgh Bronze Award.\n\nThe programme involves 3 months of volunteering, physical activity and skill development, plus a 2-day assessed expedition in the Surrey Hills (dates TBC, approximately June).\n\nThe registration fee is £25. Expedition kit can be borrowed from school at no cost.\n\nPlease give or decline consent below.", date: "4 Mar 2026" },
    { id: "n19", type: "Consent", title: "Work experience placement consent", child: "Ethan", school: "Riverside Secondary", description: "Year 10 work experience will take place from Monday 23rd June to Friday 27th June.\n\nStudents are responsible for arranging their own placement (a list of local employers is available from the careers office). Once a placement is confirmed, parents are asked to sign this consent form and return it by 30th April.\n\nPlease give or decline consent below.", date: "5 Mar 2026" },
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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
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
                onClick={() => { setDetailPage(null); setFlowStep(null); }}
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
                    <span style={{ fontSize: 14, color: "#2f2f2f" }}>April – July 2026</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="6" stroke="var(--color-brand-600)" strokeWidth="1.3" />
                      <path d="M8 4.5V8L10.5 9.5" stroke="var(--color-brand-600)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 14, color: "#2f2f2f" }}>Mondays, 15:30 – 16:15</span>
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
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="6" stroke="var(--color-brand-600)" strokeWidth="1.3" />
                      <text x="8" y="11" textAnchor="middle" fontSize="9" fill="var(--color-brand-600)" fontWeight="600" fontFamily="sans-serif">£</text>
                    </svg>
                    <span style={{ fontSize: 14, color: "#2f2f2f" }}>£10 per session (£110 max)</span>
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
                  <Tag variant="neutral">Deadline: 11th Mar 2026</Tag>
                  <Tag variant="default">7 places remaining</Tag>
                </div>
              </div>
            </div>

            {/* Fixed CTA */}
            <div style={{
              padding: "12px 16px 20px",
              boxShadow: "0 -1px 0 rgba(0,0,0,0.06)",
              flexShrink: 0,
              background: "#f8f8f8",
            }}>
              <div style={{ fontSize: 11, color: "#888", textAlign: "center", marginBottom: 10, lineHeight: 1.4 }}>By booking, you agree to the school's <span style={{ textDecoration: "underline", cursor: "pointer" }}>terms and conditions</span> for this activity</div>
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
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon, 15:30 – 16:15</div>
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
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon, 15:30 – 16:15</div>
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
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>
                Choose your booking option
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Summer term option */}
                <div
                  style={{
                    background: "#fff",
                    border: bookingOption === "term" ? "2px solid #444" : "1px solid #e0e0e0",
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
                      border: bookingOption === "term" ? "2px solid #444" : "2px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      {bookingOption === "term" && (
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Summer term</div>
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
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£110 <span style={{ fontSize: 12, fontWeight: 500, color: "#888" }}>max</span></span>
                  </button>

                  {/* Accordion dates */}
                  {termExpanded && (
                    <div style={{ padding: "0 16px 14px 48px" }}>
                      <div style={{ height: 1, background: "#eee", marginBottom: 10 }} />
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {[
                          { date: "Mon 13th April", active: true },
                          { date: "Mon 20th April", active: true },
                          { date: "Mon 27th April", active: true },
                          { date: "Mon 4th May", active: true },
                          { date: "Mon 11th May", active: true },
                          { date: "Mon 18th May", active: true },
                          { date: "Mon 25th May", active: false, label: "Half term" },
                          { date: "Mon 1st June", active: true },
                          { date: "Mon 8th June", active: true },
                          { date: "Mon 15th June", active: true },
                          { date: "Mon 22nd June", active: true },
                          { date: "Mon 6th July", active: true },
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
                    border: bookingOption === "individual" ? "2px solid #444" : "1px solid #e0e0e0",
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
                    border: bookingOption === "individual" ? "2px solid #444" : "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {bookingOption === "individual" && (
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Individual sessions</div>
                    <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>Choose dates at next step</div>
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
                        background: "#444",
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Pay now
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
                      background: "#444",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Choose dates
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
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon, 15:30 – 16:15</div>
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
                  { id: "s1-apr13", label: "Mon 13th April", active: true },
                  { id: "s1-apr20", label: "Mon 20th April", active: true },
                  { id: "s1-apr27", label: "Mon 27th April", active: true },
                  { id: "s1-may4", label: "Mon 4th May", active: true },
                  { id: "s1-may11", label: "Mon 11th May", active: true },
                  { id: "s1-may18", label: "Mon 18th May", active: true },
                  { id: "s1-may25", label: "Mon 25th May", active: false, note: "Half term" },
                  { id: "s1-jun1", label: "Mon 1st June", active: true },
                  { id: "s1-jun8", label: "Mon 8th June", active: true },
                  { id: "s1-jun15", label: "Mon 15th June", active: true },
                  { id: "s1-jun22", label: "Mon 22nd June", active: true },
                  { id: "s1-jul6", label: "Mon 6th July", active: true },
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
                  style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "0 0 12px", textAlign: "left" }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: allSelected ? "2px solid #444" : "2px solid #ccc", background: allSelected ? "#444" : (count > 0 ? "#444" : "#fff"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", width: "100%", background: "none", border: "none", cursor: d.active ? "pointer" : "default", fontFamily: "inherit", textAlign: "left", borderBottom: "1px solid #f0f0f0" }}
                    >
                      {d.active ? (
                        <div style={{ width: 20, height: 20, borderRadius: 4, border: isSelected ? "2px solid #444" : "2px solid #ccc", background: isSelected ? "#444" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {isSelected && <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                      ) : <div style={{ width: 20, height: 20, flexShrink: 0 }} />}
                      <span style={{ fontSize: 14, color: d.active ? "#333" : "#bbb", textDecoration: d.active ? "none" : "line-through", flex: 1 }}>{d.label}</span>
                      {!d.active && d.note && <span style={{ fontSize: 11, color: "#bbb", fontStyle: "italic" }}>{d.note}</span>}
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
                <button onClick={() => { setFlowStep("payment"); setPaymentMethod("card"); setReviewDatesExpanded(false); setCardFilled(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
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
            { date: "Mon 13th April", active: true },{ date: "Mon 20th April", active: true },{ date: "Mon 27th April", active: true },
            { date: "Mon 4th May", active: true },{ date: "Mon 11th May", active: true },{ date: "Mon 18th May", active: true },
            { date: "Mon 25th May", active: false, label: "Half term" },
            { date: "Mon 1st June", active: true },{ date: "Mon 8th June", active: true },{ date: "Mon 15th June", active: true },
            { date: "Mon 22nd June", active: true },{ date: "Mon 6th July", active: true },
          ];
          const individualDateLabels = {
            "s1-apr13": "Mon 13th April", "s1-apr20": "Mon 20th April", "s1-apr27": "Mon 27th April",
            "s1-may4": "Mon 4th May", "s1-may11": "Mon 11th May", "s1-may18": "Mon 18th May",
            "s1-jun1": "Mon 1st June", "s1-jun8": "Mon 8th June", "s1-jun15": "Mon 15th June",
            "s1-jun22": "Mon 22nd June", "s1-jul6": "Mon 6th July",
          };

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
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon, 15:30 – 16:15</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>Review & pay</h2>

              {/* Order summary card */}
              <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#222", marginBottom: 2 }}>Drumming club</div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>For {selectedChild.name}</div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
                  {isTerm ? "Summer term · " : ""}{sessionCount} session{sessionCount !== 1 ? "s" : ""}
                </div>
                <div style={{ height: 1, background: "#f0f0f0", marginBottom: 12 }} />

                {/* Sessions list */}
                {isTerm ? (
                  <>
                  <button
                    onClick={() => setReviewDatesExpanded(!reviewDatesExpanded)}
                    style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: reviewDatesExpanded ? 10 : 0 }}
                  >
                    <span style={{ fontSize: 13, color: "#666" }}>View all dates</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: reviewDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {reviewDatesExpanded && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 2, marginBottom: 4 }}>
                      {termDates.map((d, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: d.active ? "#aaa" : "#ddd", flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: d.active ? "#666" : "#bbb", textDecoration: d.active ? "none" : "line-through" }}>
                            {d.date}
                          </span>
                          {!d.active && d.label && <span style={{ fontSize: 10, color: "#bbb", fontStyle: "italic" }}>{d.label}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                  </>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 4 }}>
                    {Object.keys(selectedDates).map((id) => (
                      <div key={id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#aaa", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: "#666" }}>{individualDateLabels[id] || id}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ height: 1, background: "#f0f0f0", marginTop: 12, marginBottom: 12 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#222" }}>£{total}.00</span>
                </div>
              </div>

              {/* Payment method */}
              <div style={{ fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 10 }}>Pay with</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Card option */}
                <button
                  onClick={() => setPaymentMethod("card")}
                  className="btn-pill" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "#fff", border: paymentMethod === "card" ? "2px solid #444" : "1px solid #e0e0e0", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: paymentMethod === "card" ? "2px solid #444" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {paymentMethod === "card" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Credit or debit card</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 1 }}>Visa, Mastercard, Amex</div>
                  </div>
                  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="0.5" y="0.5" width="23" height="15" rx="2" stroke="#ddd" />
                    <rect x="3" y="4" width="8" height="2" rx="1" fill="#ccc" />
                    <rect x="3" y="8" width="5" height="1.5" rx="0.75" fill="#ddd" />
                    <rect x="10" y="8" width="5" height="1.5" rx="0.75" fill="#ddd" />
                  </svg>
                </button>

                {/* Apple Pay option */}
                <button
                  onClick={() => setPaymentMethod("apple")}
                  className="btn-pill" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "#fff", border: paymentMethod === "apple" ? "2px solid #444" : "1px solid #e0e0e0", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: paymentMethod === "apple" ? "2px solid #444" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {paymentMethod === "apple" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Apple Pay</div>
                  </div>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M14.5 0.8C13.4 2.1 11.7 3.1 10.3 3C10.1 1.6 10.8 0.1 11.8 -0.6C12.9 -1.4 14.4 -1.8 15 -0.2C14.9 0 14.7 0.4 14.5 0.8Z" fill="#333" transform="translate(0,4)" />
                    <path d="M15 4.5C13.3 4.4 11.8 5.4 11 5.4C10.1 5.4 8.8 4.5 7.4 4.6C5.6 4.6 3.9 5.6 3 7.2C1.1 10.4 2.5 15.2 4.3 17.8C5.2 19.1 6.3 20.5 7.7 20.4C9 20.4 9.5 19.6 11.1 19.6C12.7 19.6 13.2 20.4 14.5 20.4C15.9 20.4 16.9 19.1 17.8 17.8C18.4 16.9 18.9 15.9 19.2 14.8C16.7 13.8 16 10.4 18.4 8.8C17.5 6.3 15.8 4.6 15 4.5Z" fill="#333" transform="translate(-2,2) scale(0.85)" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Fixed footer */}
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <button
                onClick={() => {
                  if (paymentMethod === "apple") {
                    setShowApplePay(true);
                    setTimeout(() => { setShowApplePay(false); setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }, 4500);
                  } else {
                    setFlowStep("card-entry");
                    setCardFilled(false);
                  }
                }}
                style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Pay now · £{total}.00
              </button>
            </div>

            {/* Home indicator */}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>

            {/* Apple Pay overlay */}
            {showApplePay && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 10 }}>
                <div style={{ background: "#1c1c1e", borderRadius: "16px 16px 0 0", padding: "20px 20px 30px", color: "#fff" }}>
                  {/* Apple Pay header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <button onClick={() => setShowApplePay(false)} style={{ background: "none", border: "none", color: "#0a84ff", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                    <svg width="16" height="20" viewBox="0 0 20 24" fill="none">
                      <path d="M14.5 0.8C13.4 2.1 11.7 3.1 10.3 3C10.1 1.6 10.8 0.1 11.8 -0.6C12.9 -1.4 14.4 -1.8 15 -0.2C14.9 0 14.7 0.4 14.5 0.8Z" fill="#fff" transform="translate(0,4)" />
                      <path d="M15 4.5C13.3 4.4 11.8 5.4 11 5.4C10.1 5.4 8.8 4.5 7.4 4.6C5.6 4.6 3.9 5.6 3 7.2C1.1 10.4 2.5 15.2 4.3 17.8C5.2 19.1 6.3 20.5 7.7 20.4C9 20.4 9.5 19.6 11.1 19.6C12.7 19.6 13.2 20.4 14.5 20.4C15.9 20.4 16.9 19.1 17.8 17.8C18.4 16.9 18.9 15.9 19.2 14.8C16.7 13.8 16 10.4 18.4 8.8C17.5 6.3 15.8 4.6 15 4.5Z" fill="#fff" transform="translate(-2,2) scale(0.85)" />
                    </svg>
                  </div>

                  {/* Payment details */}
                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>ARBOR EDUCATION</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>£{total}.00</div>
                  </div>

                  {/* Card preview */}
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

                  {/* Face ID */}
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

        {/* Card entry screen */}
        {detailPage === "drumming" && flowStep === "card-entry" && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? 11 : Object.keys(selectedDates).length;
          const total = isTerm ? 110 : sessionCount * 10;

          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            {/* Status bar */}
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep("payment")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Payment details</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#fff" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Name on card", empty: "e.g. Kate Burns", filled: "Kate Burns" },
                  { label: "Card number", empty: "1234 5678 9012 3456", filled: "4289 3920 1847 5562" },
                  { label: "Expiry date", empty: "MM / YY", filled: "09 / 28" },
                  { label: "CVV", empty: "123", filled: "••••" },
                ].map((field, i) => (
                  <div key={i}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#666", display: "block", marginBottom: 5 }}>{field.label}</label>
                    <button
                      onClick={() => setCardFilled(true)}
                      style={{
                        width: "100%",
                        padding: "14px 14px",
                        background: "#fff",
                        border: cardFilled ? "1.5px solid #444" : "1px solid #ddd",
                        borderRadius: 10,
                        fontSize: 15,
                        color: cardFilled ? "#222" : "#bbb",
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {cardFilled ? field.filled : field.empty}
                    </button>
                  </div>
                ))}
              </div>

              {/* Save card checkbox */}
              {cardFilled && (
                <button
                  onClick={() => setSaveCard(!saveCard)}
                  style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "16px 0 0", textAlign: "left" }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: saveCard ? "2px solid #444" : "2px solid #ccc", background: saveCard ? "#444" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {saveCard && <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <span style={{ fontSize: 13, color: "#555" }}>Save card for future payments</span>
                </button>
              )}

              {/* Card visual */}
              {cardFilled && (
                <div style={{ marginTop: 20, background: "linear-gradient(135deg, #444, #666)", borderRadius: 14, padding: "20px", color: "#fff" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "#bbb", marginBottom: 16 }}>VISA</div>
                  <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "0.12em", marginBottom: 16 }}>4289  3920  1847  5562</div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 9, color: "#999", marginBottom: 2 }}>CARD HOLDER</div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>KATE BURNS</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: "#999", marginBottom: 2 }}>EXPIRES</div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>09/28</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fixed footer */}
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <button
                onClick={() => { if (cardFilled) { setConfirmedDatesExpanded(false); setFlowStep("confirmed"); } }}
                style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: cardFilled ? "#444" : "#bbb", color: "#fff", fontSize: 15, fontWeight: 600, cursor: cardFilled ? "pointer" : "default", fontFamily: "inherit" }}
              >
                Pay now · £{total}.00
              </button>
            </div>

            {/* Home indicator */}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}

        {/* Booking confirmed screen */}
        {detailPage === "drumming" && flowStep === "confirmed" && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? 11 : Object.keys(selectedDates).length;
          const total = isTerm ? 110 : sessionCount * 10;
          const individualDateLabels = {
            "s1-apr13": "Mon 13th April", "s1-apr20": "Mon 20th April", "s1-apr27": "Mon 27th April",
            "s1-may4": "Mon 4th May", "s1-may11": "Mon 11th May", "s1-may18": "Mon 18th May",
            "s1-jun1": "Mon 1st June", "s1-jun8": "Mon 8th June", "s1-jun15": "Mon 15th June",
            "s1-jun22": "Mon 22nd June", "s1-jul6": "Mon 6th July",
          };

          return (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#fff", zIndex: 5 }}>
            {/* Status bar */}
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>

            {/* X button */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 16px 0", flexShrink: 0 }}>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 24px 20px", background: "#fff" }}>
              {/* Success icon */}
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#444", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M10 18L16 24L26 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#222", margin: "0 0 6px", textAlign: "center" }}>Booking confirmed</h1>
              <p style={{ fontSize: 14, color: "#888", margin: "0 0 28px", textAlign: "center" }}>
                {selectedChild.name} is booked in for Drumming club
              </p>

              {/* Summary card */}
              <div style={{ background: "#f8f8f8", borderRadius: 12, padding: "16px", width: "100%", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="8" r="3" stroke="var(--color-brand-600)" strokeWidth="1.5" />
                      <circle cx="6" cy="14" r="2" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                      <circle cx="14" cy="14" r="2" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                      <path d="M8 8L6 14" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                      <path d="M12 8L14 14" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>Drumming club</div>
                    <div style={{ fontSize: 12, color: "#888" }}>Mondays, 15:30 – 16:15</div>
                  </div>
                </div>

                <div style={{ height: 1, background: "#e8e8e8", marginBottom: 10 }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 10 }}>
                  <div style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>Summer term · 11 sessions</div>
                  <button onClick={() => setConfirmedDatesExpanded(!confirmedDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: confirmedDatesExpanded ? 6 : 0 }}>
                    <span style={{ fontSize: 12, color: "#888" }}>{confirmedDatesExpanded ? "Hide dates" : "View all dates"}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: confirmedDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {confirmedDatesExpanded && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {Object.entries(individualDateLabels).map(([id, label]) => (
                        <div key={id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#aaa", flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: "#666" }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ height: 1, background: "#e8e8e8", marginBottom: 10 }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Paid</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#222" }}>£{total}.00</span>
                </div>
              </div>

            </div>

            {/* Booking feedback nudge */}
            <div style={{ padding: "10px 16px 6px", textAlign: "center", borderTop: "1px solid #f0f0f0", flexShrink: 0 }}>
              <div style={{ fontSize: 12, color: "#bbb", marginBottom: 6 }}>Was it easy to book this club?</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                {[["👎", 1], ["👍", 2]].map(([face, val]) => (
                  <button
                    key={val}
                    onClick={() => !bookingNudgeRating && setBookingNudgeRating(val)}
                    className="btn-pill"
                    style={{ background: "none", border: "none", cursor: bookingNudgeRating ? "default" : "pointer", fontSize: 22, minWidth: 36, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center", opacity: bookingNudgeRating && bookingNudgeRating !== val ? 0.2 : 1, transition: "opacity 0.15s", lineHeight: 1 }}
                  >{face}</button>
                ))}
              </div>
              {bookingNudgeRating && <div style={{ fontSize: 12, color: "#bbb", marginTop: 6 }}>Thanks for your feedback</div>}
            </div>

            {/* Fixed footer */}
            <div style={{ padding: "12px 16px 20px", flexShrink: 0, background: "#fff" }}>
              <Button
                variant="primary"
                style={{ width: "100%" }}
                onClick={() => { setFlowStep(null); setBookingNudgeRating(null); setSubPage("my-bookings"); }}
              >
                Go to my bookings
              </Button>
            </div>

            {/* Home indicator */}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}


        {/* ==================== AFTER SCHOOL CLUB FLOW ==================== */}

        {/* After school - Detail page */}
        {detailPage === "after-school" && !flowStep && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0 }}>
              <div style={{ width: 32 }} />
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Club details</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
              <div style={{ padding: "20px 16px" }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>After school club</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke="#888" strokeWidth="1.3" /><path d="M2 6H14" stroke="#888" strokeWidth="1.3" /><path d="M5.5 1V3.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" /><path d="M10.5 1V3.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" /></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>April – July 2026</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><circle cx="8" cy="8" r="6" stroke="#888" strokeWidth="1.3" /><path d="M8 4.5V8L10.5 9.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>Monday – Friday, 15:30 – 17:00</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M8 14.5C8 14.5 13 10.5 13 7C13 4.2 10.8 2 8 2C5.2 2 3 4.2 3 7C3 10.5 8 14.5 8 14.5Z" stroke="#888" strokeWidth="1.3" /><circle cx="8" cy="7" r="1.5" fill="#888" /></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>Main Hall</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#888" strokeWidth="1.3" /><path d="M5 7H11" stroke="#888" strokeWidth="1.2" strokeLinecap="round" /><path d="M5 10H8" stroke="#888" strokeWidth="1.2" strokeLinecap="round" /></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>60 sessions</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><circle cx="8" cy="8" r="6" stroke="#888" strokeWidth="1.3" /><text x="8" y="11" textAnchor="middle" fontSize="9" fill="#888" fontWeight="600" fontFamily="sans-serif">£</text></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>£10 per session (£600 max)</span>
                  </div>
                </div>
                <div style={{ height: 1, background: "#eee", marginBottom: 16 }} />
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#333", margin: "0 0 8px" }}>About this club</h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: "0 0 16px" }}>Our after school club provides a safe and fun environment for children to relax, play and socialise after the school day. Activities include arts and crafts, outdoor games, board games and supervised homework time. A light snack and drink are provided.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                  {["Snack and drink included", "Outdoor and indoor activities", "Supervised homework time available"].map((point, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: "#aaa", fontSize: 13, lineHeight: "1.5" }}>•</span>
                      <span style={{ fontSize: 13, color: "#666", lineHeight: "1.5" }}>{point}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Tag variant="neutral">Deadline: 22nd Mar 2026</Tag>
                  <Tag variant="neutral">40 places remaining</Tag>
                </div>
              </div>
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <button onClick={() => { setFlowStep("booking-options"); setBookingOption("term"); setTermExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Book now
              </button>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
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
              <button onClick={() => setFlowStep(null)} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>After school club</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon–Fri, 15:30 – 17:00</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>Choose your booking option</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Term option */}
                <div style={{ background: "#fff", border: bookingOption === "term" ? "2px solid #444" : "1px solid #e0e0e0", borderRadius: 12, overflow: "hidden" }}>
                  <button onClick={() => setBookingOption("term")} style={{ display: "flex", alignItems: "center", width: "100%", padding: "16px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: bookingOption === "term" ? "2px solid #444" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {bookingOption === "term" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Summer term</div>
                      <button onClick={(e) => { e.stopPropagation(); setTermExpanded(!termExpanded); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                        <span style={{ fontSize: 13, color: "#888" }}>60 sessions</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: termExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£600 <span style={{ fontSize: 12, fontWeight: 500, color: "#888" }}>max</span></span>
                  </button>
                  {termExpanded && (
                    <div style={{ padding: "0 16px 14px 48px" }}>
                      <div style={{ height: 1, background: "#eee", marginBottom: 10 }} />
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {["14–18 Apr","21–25 Apr","28 Apr – 2 May","5–9 May","12–16 May","19–23 May"].map((w,i) => (
                          <span key={i} style={{ fontSize: 11, color: "#888", background: "#f5f5f5", padding: "3px 8px", borderRadius: 4 }}>{w}</span>
                        ))}
                        <span style={{ fontSize: 11, color: "#bbb", background: "#f5f5f5", padding: "3px 8px", borderRadius: 4, textDecoration: "line-through" }}>25–30 May</span>
                        {["1–6 Jun","8–13 Jun","15–19 Jun","22–26 Jun","29 Jun – 3 Jul","6–10 Jul"].map((w,i) => (
                          <span key={i+6} style={{ fontSize: 11, color: "#888", background: "#f5f5f5", padding: "3px 8px", borderRadius: 4 }}>{w}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Individual option */}
                <button onClick={() => { setBookingOption("individual"); setTermExpanded(false); }} style={{ display: "flex", alignItems: "center", width: "100%", padding: "16px", background: "#fff", border: bookingOption === "individual" ? "2px solid #444" : "1px solid #e0e0e0", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: bookingOption === "individual" ? "2px solid #444" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {bookingOption === "individual" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Individual sessions</div>
                    <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>Choose dates at next step</div>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£10<span style={{ fontSize: 12, fontWeight: 500, color: "#888" }}>/session</span></span>
                </button>
              </div>
            </div>
            {bookingOption && (
              <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                {bookingOption === "term" ? (
                  <>
                    <button onClick={() => { setFlowStep("payment"); setReviewDatesExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Pay now</button>
                    <button className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Add to basket</button>
                  </>
                ) : (
                  <button onClick={() => { setFlowStep("choose-dates"); setSelectedGridDates({}); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Choose dates</button>
                )}
              </div>
            )}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* After school - Choose dates (S3 grid) */}
        {detailPage === "after-school" && flowStep === "choose-dates" && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep("booking-options")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>After school club</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon–Fri, 15:30 – 17:00</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#222", margin: "0 0 4px" }}>Choose your sessions</h2>
              <p style={{ fontSize: 13, color: "#888", margin: "0 0 14px" }}>Select the days you'd like to book.</p>
              {(() => {
                const weeks = [
                  { week: "W/c Mon 14 Apr", dates: [14,15,16,17,18], halfTerm: false, days: ["as-apr14","as-apr15","as-apr16","as-apr17","as-apr18"] },
                  { week: "W/c Mon 21 Apr", dates: [21,22,23,24,25], halfTerm: false, days: ["as-apr21","as-apr22","as-apr23","as-apr24","as-apr25"] },
                  { week: "W/c Mon 28 Apr", dates: [28,29,30,1,2], halfTerm: false, days: ["as-apr28","as-apr29","as-apr30","as-may1","as-may2"] },
                  { week: "W/c Mon 5 May", dates: [5,6,7,8,9], halfTerm: false, days: ["as-may5","as-may6","as-may7","as-may8","as-may9"] },
                  { week: "W/c Mon 12 May", dates: [12,13,14,15,16], halfTerm: false, days: ["as-may12","as-may13","as-may14","as-may15","as-may16"] },
                  { week: "W/c Mon 19 May", dates: [19,20,21,22,23], halfTerm: false, days: ["as-may19","as-may20","as-may21","as-may22","as-may23"] },
                  { week: "W/c Mon 25 May", dates: [25,26,27,28,29], halfTerm: true, days: ["as-ht1","as-ht2","as-ht3","as-ht4","as-ht5"] },
                  { week: "W/c Mon 2 Jun", dates: [2,3,4,5,6], halfTerm: false, days: ["as-jun2","as-jun3","as-jun4","as-jun5","as-jun6"] },
                  { week: "W/c Mon 9 Jun", dates: [9,10,11,12,13], halfTerm: false, days: ["as-jun9","as-jun10","as-jun11","as-jun12","as-jun13"] },
                  { week: "W/c Mon 16 Jun", dates: [16,17,18,19,20], halfTerm: false, days: ["as-jun16","as-jun17","as-jun18","as-jun19","as-jun20"] },
                  { week: "W/c Mon 23 Jun", dates: [23,24,25,26,27], halfTerm: false, days: ["as-jun23","as-jun24","as-jun25","as-jun26","as-jun27"] },
                  { week: "W/c Mon 30 Jun", dates: [30,1,2,3,4], halfTerm: false, days: ["as-jun30","as-jul1","as-jul2","as-jul3","as-jul4"] },
                  { week: "W/c Mon 7 Jul", dates: [7,8,9,10,11], halfTerm: false, days: ["as-jul7","as-jul8","as-jul9","as-jul10","as-jul11"] },
                ];
                const dayLabels = ["Mon","Tue","Wed","Thu","Fri"];
                const allActive = [];
                weeks.forEach(w => { if (!w.halfTerm) w.days.forEach(d => allActive.push(d)); });
                const count = Object.keys(selectedGridDates).length;
                const allSelected = count === allActive.length;

                // Pattern detection
                const week1 = weeks[0];
                const week1Selections = [];
                week1.days.forEach((d, i) => { if (selectedGridDates[d]) week1Selections.push(i); });
                const hasWeek1Pattern = week1Selections.length > 0;
                const otherWeekSelections = Object.keys(selectedGridDates).filter(d => !week1.days.includes(d)).length;
                const showPatternPrompt = hasWeek1Pattern && otherWeekSelections === 0;

                const applyPattern = () => {
                  const next = { ...selectedGridDates };
                  weeks.forEach((w) => {
                    if (w.halfTerm || w === week1) return;
                    w.days.forEach((d, i) => {
                      if (week1Selections.includes(i)) next[d] = true;
                      else delete next[d];
                    });
                  });
                  setSelectedGridDates(next);
                };

                return (
                <>
                <button onClick={() => { if (allSelected) setSelectedGridDates({}); else { const a = {}; allActive.forEach(d => { a[d] = true; }); setSelectedGridDates(a); } }} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "0 0 12px", textAlign: "left" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: allSelected ? "2px solid #444" : "2px solid #ccc", background: allSelected ? "#444" : (count > 0 ? "#444" : "#fff"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {allSelected && count > 0 && <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    {count > 0 && !allSelected && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5H8" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Select all</span>
                </button>
                <div style={{ height: 1, background: "#eee", marginBottom: 10 }} />

                {weeks.map((w, wi) => (
                  <div key={wi} {...(wi === 1 ? {"data-as-week2": true} : {})} style={{ marginBottom: 2, borderTop: wi > 0 ? "1px solid #f0f0f0" : "none" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: w.halfTerm ? "#bbb" : "#666", textDecoration: w.halfTerm ? "line-through" : "none", padding: "10px 0 4px" }}>
                      {w.week}
                      {w.halfTerm && <span style={{ fontSize: 10, fontStyle: "italic", textDecoration: "none", marginLeft: 6, color: "#bbb" }}>Half term</span>}
                    </div>
                    {/* Day + date headers per week */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2, marginBottom: 4 }}>
                      {dayLabels.map((dl, i) => (
                        <div key={i} style={{ textAlign: "center", opacity: w.halfTerm ? 0.35 : 1 }}>
                          <div style={{ fontSize: 10, fontWeight: 600, color: "#999" }}>{dl}</div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#666" }}>{w.dates[i]}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2, alignItems: "center", padding: "2px 0", opacity: w.halfTerm ? 0.35 : 1 }}>
                      {w.days.map((d, di) => {
                        const isSel = d in selectedGridDates;
                        return (
                          <div key={di} style={{ display: "flex", justifyContent: "center" }}>
                            {w.halfTerm ? (
                              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5H8" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                              </div>
                            ) : (
                              <button onClick={() => { const next = { ...selectedGridDates }; if (isSel) delete next[d]; else next[d] = true; setSelectedGridDates(next); }} className="btn-pill" style={{ width: 34, height: 34, borderRadius: "50%", border: isSel ? "2px solid #444" : "1.5px solid #ddd", background: isSel ? "#444" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                                {isSel && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Pattern prompt after Week 1 */}
                    {wi === 0 && showPatternPrompt && (
                      <div style={{ background: "#f8f8f8", borderRadius: 10, padding: "12px 14px", marginTop: 8, marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 8 }}>Apply this pattern to all weeks?</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={applyPattern} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: "none", background: "#444", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Apply to all weeks</button>
                          <button onClick={() => { const el = document.querySelector('[data-as-week2]'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Choose other dates</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                </>
                );
              })()}
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              {Object.keys(selectedGridDates).length > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#888" }}>{Object.keys(selectedGridDates).length} session{Object.keys(selectedGridDates).length !== 1 ? "s" : ""} selected</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£{Object.keys(selectedGridDates).length * 10}</span>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={() => { setFlowStep("payment"); setReviewDatesExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Continue to payment</button>
                <button className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Add to basket</button>
              </div>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* After school - Payment (wraparound, not enough) */}
        {detailPage === "after-school" && flowStep === "payment" && !topUpCardScreen && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? 60 : Object.keys(selectedGridDates).length;
          const total = sessionCount * 10;
          const shortfall = total - wraparoundBalance;
          const hasToppedUp = toppedUpAmount > 0;
          const termWeeks = [
            { label: "14–18 Apr", active: true },{ label: "21–25 Apr", active: true },{ label: "28 Apr – 2 May", active: true },
            { label: "5–9 May", active: true },{ label: "12–16 May", active: true },{ label: "19–23 May", active: true },
            { label: "25–30 May", active: false },
            { label: "1–6 Jun", active: true },{ label: "8–13 Jun", active: true },{ label: "15–19 Jun", active: true },
            { label: "22–26 Jun", active: true },{ label: "29 Jun – 3 Jul", active: true },{ label: "6–10 Jul", active: true },
          ];
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
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>After school club</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon–Fri, 15:30 – 17:00</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setToppedUpAmount(0); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>Review & pay</h2>
              {/* Order summary */}
              <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#222", marginBottom: 2 }}>After school club</div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>For {selectedChild.name}</div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>{isTerm ? "Summer term · " : ""}{sessionCount} session{sessionCount !== 1 ? "s" : ""}</div>
                <div style={{ height: 1, background: "#f0f0f0", marginBottom: 12 }} />
                {isTerm ? (
                  <>
                  <button onClick={() => setReviewDatesExpanded(!reviewDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: reviewDatesExpanded ? 10 : 0 }}>
                    <span style={{ fontSize: 13, color: "#666" }}>View all weeks</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: reviewDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {reviewDatesExpanded && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
                      {termWeeks.map((w, i) => (
                        <span key={i} style={{ fontSize: 11, color: w.active ? "#666" : "#bbb", background: "#f5f5f5", padding: "3px 8px", borderRadius: 4, textDecoration: w.active ? "none" : "line-through" }}>{w.label}</span>
                      ))}
                    </div>
                  )}
                  </>
                ) : (
                  (() => {
                    const dayLabels = {
                      "as-apr14":"Mon 14 Apr","as-apr15":"Tue 15 Apr","as-apr16":"Wed 16 Apr","as-apr17":"Thu 17 Apr","as-apr18":"Fri 18 Apr",
                      "as-apr21":"Mon 21 Apr","as-apr22":"Tue 22 Apr","as-apr23":"Wed 23 Apr","as-apr24":"Thu 24 Apr","as-apr25":"Fri 25 Apr",
                      "as-apr28":"Mon 28 Apr","as-apr29":"Tue 29 Apr","as-apr30":"Wed 30 Apr","as-may1":"Thu 1 May","as-may2":"Fri 2 May",
                      "as-may5":"Mon 5 May","as-may6":"Tue 6 May","as-may7":"Wed 7 May","as-may8":"Thu 8 May","as-may9":"Fri 9 May",
                      "as-may12":"Mon 12 May","as-may13":"Tue 13 May","as-may14":"Wed 14 May","as-may15":"Thu 15 May","as-may16":"Fri 16 May",
                      "as-may19":"Mon 19 May","as-may20":"Tue 20 May","as-may21":"Wed 21 May","as-may22":"Thu 22 May","as-may23":"Fri 23 May",
                      "as-jun2":"Mon 2 Jun","as-jun3":"Tue 3 Jun","as-jun4":"Wed 4 Jun","as-jun5":"Thu 5 Jun","as-jun6":"Fri 6 Jun",
                      "as-jun9":"Mon 9 Jun","as-jun10":"Tue 10 Jun","as-jun11":"Wed 11 Jun","as-jun12":"Thu 12 Jun","as-jun13":"Fri 13 Jun",
                      "as-jun16":"Mon 16 Jun","as-jun17":"Tue 17 Jun","as-jun18":"Wed 18 Jun","as-jun19":"Thu 19 Jun","as-jun20":"Fri 20 Jun",
                      "as-jun23":"Mon 23 Jun","as-jun24":"Tue 24 Jun","as-jun25":"Wed 25 Jun","as-jun26":"Thu 26 Jun","as-jun27":"Fri 27 Jun",
                      "as-jun30":"Mon 30 Jun","as-jul1":"Tue 1 Jul","as-jul2":"Wed 2 Jul","as-jul3":"Thu 3 Jul","as-jul4":"Fri 4 Jul",
                      "as-jul7":"Mon 7 Jul","as-jul8":"Tue 8 Jul","as-jul9":"Wed 9 Jul","as-jul10":"Thu 10 Jul","as-jul11":"Fri 11 Jul",
                    };
                    return (
                    <>
                    <button onClick={() => setReviewDatesExpanded(!reviewDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: reviewDatesExpanded ? 10 : 0 }}>
                      <span style={{ fontSize: 13, color: "#666" }}>View selected dates</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: reviewDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    {reviewDatesExpanded && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 2, marginBottom: 4 }}>
                        {Object.keys(selectedGridDates).map((id) => (
                          <div key={id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#aaa", flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: "#666" }}>{dayLabels[id] || id}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    </>
                    );
                  })()
                )}
                <div style={{ height: 1, background: "#f0f0f0", marginTop: 12, marginBottom: 12 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#222" }}>£{total}.00</span>
                </div>
              </div>
              {/* Payment method */}
              <div style={{ fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 10 }}>Pay with</div>
              <div style={{ background: "#fff", border: "2px solid #444", borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Wraparound care account</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 1 }}>Balance: £{wraparoundBalance.toFixed(2)}</div>
                  </div>
                  {hasToppedUp && <Tag variant="success">Topped up</Tag>}
                </div>
              </div>
              {/* Shortfall warning or success */}
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
              {shortfall > 0 ? (
                <button onClick={() => { setShowTopUpSheet(true); setTopUpAmount(minTopUp); setTopUpPaymentMethod("card"); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Top up now
                </button>
              ) : (
                <button onClick={() => { setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
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
                    <button onClick={() => setTopUpPaymentMethod("card")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10, border: topUpPaymentMethod === "card" ? "2px solid #444" : "1px solid #e0e0e0", background: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: topUpPaymentMethod === "card" ? "2px solid #444" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {topUpPaymentMethod === "card" && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#444" }} />}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>Credit or debit card</span>
                      <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                        <div style={{ width: 28, height: 18, borderRadius: 3, background: "#1a1f71", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 8, fontWeight: 700 }}>VISA</span></div>
                        <div style={{ width: 28, height: 18, borderRadius: 3, background: "#eb001b", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 7, fontWeight: 700 }}>MC</span></div>
                      </div>
                    </button>
                    <button onClick={() => setTopUpPaymentMethod("apple")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 10, border: topUpPaymentMethod === "apple" ? "2px solid #444" : "1px solid #e0e0e0", background: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: topUpPaymentMethod === "apple" ? "2px solid #444" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {topUpPaymentMethod === "apple" && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#444" }} />}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>Apple Pay</span>
                      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" style={{ flexShrink: 0, marginLeft: "auto" }}>
                        <path d="M14.5 0.8C13.4 2.1 11.7 3.1 10.3 3C10.1 1.6 10.8 0.1 11.8 -0.6C12.9 -1.4 14.4 -1.8 15 -0.2C14.9 0 14.7 0.4 14.5 0.8Z" fill="#333" transform="translate(0,4)" />
                        <path d="M15 4.5C13.3 4.4 11.8 5.4 11 5.4C10.1 5.4 8.8 4.5 7.4 4.6C5.6 4.6 3.9 5.6 3 7.2C1.1 10.4 2.5 15.2 4.3 17.8C5.2 19.1 6.3 20.5 7.7 20.4C9 20.4 9.5 19.6 11.1 19.6C12.7 19.6 13.2 20.4 14.5 20.4C15.9 20.4 16.9 19.1 17.8 17.8C18.4 16.9 18.9 15.9 19.2 14.8C16.7 13.8 16 10.4 18.4 8.8C17.5 6.3 15.8 4.6 15 4.5Z" fill="#333" transform="translate(-2,2) scale(0.85)" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
                  <button onClick={() => {
                    if (topUpPaymentMethod === "apple") {
                      setShowTopUpApplePay(true);
                      setTimeout(() => { setToppedUpAmount(topUpAmount); setShowTopUpApplePay(false); setShowTopUpSheet(false); }, 4500);
                    } else {
                      setShowTopUpSheet(false);
                      setTopUpCardScreen(true);
                      setTopUpCardFilled(false);
                    }
                  }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
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
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", background: "#fff" }}>
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
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <button onClick={() => { if (topUpCardFilled) { setToppedUpAmount(topUpAmount); setTopUpCardScreen(false); } }} style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: topUpCardFilled ? "#444" : "#ccc", color: "#fff", fontSize: 15, fontWeight: 600, cursor: topUpCardFilled ? "pointer" : "default", fontFamily: "inherit" }}>
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
          const sessionCount = isTerm ? 60 : Object.keys(selectedGridDates).length;
          const total = sessionCount * 10;
          const asDayLabelsConf = {
            "as-apr14":"Mon 14 Apr","as-apr15":"Tue 15 Apr","as-apr16":"Wed 16 Apr","as-apr17":"Thu 17 Apr","as-apr18":"Fri 18 Apr",
            "as-apr21":"Mon 21 Apr","as-apr22":"Tue 22 Apr","as-apr23":"Wed 23 Apr","as-apr24":"Thu 24 Apr","as-apr25":"Fri 25 Apr",
            "as-apr28":"Mon 28 Apr","as-apr29":"Tue 29 Apr","as-apr30":"Wed 30 Apr","as-may1":"Thu 1 May","as-may2":"Fri 2 May",
            "as-may5":"Mon 5 May","as-may6":"Tue 6 May","as-may7":"Wed 7 May","as-may8":"Thu 8 May","as-may9":"Fri 9 May",
            "as-may12":"Mon 12 May","as-may13":"Tue 13 May","as-may14":"Wed 14 May","as-may15":"Thu 15 May","as-may16":"Fri 16 May",
            "as-may19":"Mon 19 May","as-may20":"Tue 20 May","as-may21":"Wed 21 May","as-may22":"Thu 22 May","as-may23":"Fri 23 May",
            "as-jun2":"Mon 2 Jun","as-jun3":"Tue 3 Jun","as-jun4":"Wed 4 Jun","as-jun5":"Thu 5 Jun","as-jun6":"Fri 6 Jun",
            "as-jun9":"Mon 9 Jun","as-jun10":"Tue 10 Jun","as-jun11":"Wed 11 Jun","as-jun12":"Thu 12 Jun","as-jun13":"Fri 13 Jun",
            "as-jun16":"Mon 16 Jun","as-jun17":"Tue 17 Jun","as-jun18":"Wed 18 Jun","as-jun19":"Thu 19 Jun","as-jun20":"Fri 20 Jun",
            "as-jun23":"Mon 23 Jun","as-jun24":"Tue 24 Jun","as-jun25":"Wed 25 Jun","as-jun26":"Thu 26 Jun","as-jun27":"Fri 27 Jun",
            "as-jun30":"Mon 30 Jun","as-jul1":"Tue 1 Jul","as-jul2":"Wed 2 Jul","as-jul3":"Thu 3 Jul","as-jul4":"Fri 4 Jul",
            "as-jul7":"Mon 7 Jul","as-jul8":"Tue 8 Jul","as-jul9":"Wed 9 Jul","as-jul10":"Thu 10 Jul","as-jul11":"Fri 11 Jul",
          };
          return (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#fff", zIndex: 5 }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 16px 0", flexShrink: 0 }}>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); setToppedUpAmount(0); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 24px 20px", background: "#fff" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#444", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M10 18L16 24L26 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#222", margin: "0 0 6px", textAlign: "center" }}>Booking confirmed</h1>
              <p style={{ fontSize: 14, color: "#888", margin: "0 0 28px", textAlign: "center" }}>{selectedChild.name} is booked in for After school club</p>
              <div style={{ background: "#f8f8f8", borderRadius: 12, padding: "16px", width: "100%", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="8" r="3" stroke="var(--color-brand-600)" strokeWidth="1.5" />
                      <circle cx="6" cy="14" r="2" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                      <circle cx="14" cy="14" r="2" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                      <path d="M8 8L6 14" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                      <path d="M12 8L14 14" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>After school club</div>
                    {isTerm && <div style={{ fontSize: 12, color: "#888" }}>Monday – Friday, 15:30 – 17:00</div>}
                  </div>
                </div>
                <div style={{ height: 1, background: "#e8e8e8", marginBottom: 10 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 10 }}>
                  {isTerm ? (
                    <div style={{ fontSize: 13, color: "#666" }}>Summer term · 60 sessions</div>
                  ) : (
                    <>
                    <button onClick={() => setConfirmedDatesExpanded(!confirmedDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: confirmedDatesExpanded ? 6 : 0 }}>
                      <span style={{ fontSize: 13, color: "#666" }}>{Object.keys(selectedGridDates).length} session{Object.keys(selectedGridDates).length !== 1 ? "s" : ""} selected</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: confirmedDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    {confirmedDatesExpanded && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {Object.keys(selectedGridDates).map((id) => (
                          <div key={id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#aaa", flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: "#666" }}>{asDayLabelsConf[id] || id}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    </>
                  )}
                </div>
                <div style={{ height: 1, background: "#e8e8e8", marginBottom: 10 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Paid</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#222" }}>£{total}.00</span>
                </div>
              </div>

            </div>

            {/* Booking feedback nudge */}
            <div style={{ padding: "10px 16px 6px", textAlign: "center", borderTop: "1px solid #f0f0f0", flexShrink: 0 }}>
              <div style={{ fontSize: 12, color: "#bbb", marginBottom: 6 }}>Was it easy to book this club?</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                {[["👎", 1], ["👍", 2]].map(([face, val]) => (
                  <button
                    key={val}
                    onClick={() => !bookingNudgeRating && setBookingNudgeRating(val)}
                    className="btn-pill"
                    style={{ background: "none", border: "none", cursor: bookingNudgeRating ? "default" : "pointer", fontSize: 22, minWidth: 36, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center", opacity: bookingNudgeRating && bookingNudgeRating !== val ? 0.2 : 1, transition: "opacity 0.15s", lineHeight: 1 }}
                  >{face}</button>
                ))}
              </div>
              {bookingNudgeRating && <div style={{ fontSize: 12, color: "#bbb", marginTop: 6 }}>Thanks for your feedback</div>}
            </div>

            <div style={{ padding: "12px 16px 20px", flexShrink: 0, background: "#fff" }}>
              <Button variant="primary" style={{ width: "100%" }} onClick={() => { setFlowStep(null); setBookingNudgeRating(null); setSubPage("my-bookings"); }}>Go to my bookings</Button>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
          );
        })()}


        {/* ==================== BREAKFAST CLUB FLOW ==================== */}

        {/* Breakfast - Detail page */}
        {detailPage === "breakfast" && !flowStep && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fff" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0 }}>
              <div style={{ width: 32 }} />
              <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Club details</span>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
              <div style={{ padding: "20px 16px" }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>Breakfast club</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke="#888" strokeWidth="1.3" /><path d="M2 6H14" stroke="#888" strokeWidth="1.3" /><path d="M5.5 1V3.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" /><path d="M10.5 1V3.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" /></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>April – July 2026</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><circle cx="8" cy="8" r="6" stroke="#888" strokeWidth="1.3" /><path d="M8 4.5V8L10.5 9.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>Monday – Friday, 07:00 or 07:45 – 08:30</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M8 14.5C8 14.5 13 10.5 13 7C13 4.2 10.8 2 8 2C5.2 2 3 4.2 3 7C3 10.5 8 14.5 8 14.5Z" stroke="#888" strokeWidth="1.3" /><circle cx="8" cy="7" r="1.5" fill="#888" /></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>Dining Hall</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#888" strokeWidth="1.3" /><path d="M5 7H11" stroke="#888" strokeWidth="1.2" strokeLinecap="round" /><path d="M5 10H8" stroke="#888" strokeWidth="1.2" strokeLinecap="round" /></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>60 sessions</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><circle cx="8" cy="8" r="6" stroke="#888" strokeWidth="1.3" /><text x="8" y="11" textAnchor="middle" fontSize="9" fill="#888" fontWeight="600" fontFamily="sans-serif">£</text></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>£5 per session (£300 max)</span>
                  </div>
                </div>
                <div style={{ height: 1, background: "#eee", marginBottom: 16 }} />
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#333", margin: "0 0 8px" }}>About this club</h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: "0 0 16px" }}>Start the day right with our breakfast club. Children enjoy a healthy breakfast including toast, cereal, fruit and juice, with time for reading, drawing and quiet activities before the school day begins. Staff supervise children and ensure they're ready for class.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                  {["Healthy breakfast provided", "Quiet activities before school", "Supervised by trained staff"].map((point, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: "#aaa", fontSize: 13, lineHeight: "1.5" }}>•</span>
                      <span style={{ fontSize: 13, color: "#666", lineHeight: "1.5" }}>{point}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Tag variant="neutral">Deadline: 22nd Mar 2026</Tag>
                  <Tag variant="neutral">29 places remaining</Tag>
                </div>
              </div>
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <button onClick={() => { setFlowStep("consent"); setConsentChecked(false); setConsentError(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Book now
              </button>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Breakfast - Consent */}
        {detailPage === "breakfast" && flowStep === "consent" && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep(null)} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Breakfast club</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon–Fri</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#222", margin: "0 0 8px" }}>Consent required</h2>
              <p style={{ fontSize: 13, color: "#888", lineHeight: "1.5", margin: "0 0 24px" }}>Before booking, we need your consent for {selectedChild.name} to attend Breakfast club.</p>
              <Checkbox
                checked={consentChecked}
                onChange={(checked) => { setConsentChecked(checked); if (checked) setConsentError(false); }}
                label={`I give consent for ${selectedChild.name} to take part in Breakfast club`}
              />
              {consentError && <p style={{ fontSize: 12, color: "#c44", margin: "8px 0 0 30px" }}>This club requires your consent to continue</p>}
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <Button variant="primary" style={{ width: "100%" }} onClick={() => { if (consentChecked) { setFlowStep("booking-options"); setBookingOption("term"); setTermExpanded(false); } else { setConsentError(true); } }}>
                View booking options
              </Button>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Breakfast - Booking options */}
        {detailPage === "breakfast" && flowStep === "booking-options" && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep("consent")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Breakfast club</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon–Fri</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>Choose your booking option</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Term option */}
                <div style={{ background: "#fff", border: bookingOption === "term" ? "2px solid #444" : "1px solid #e0e0e0", borderRadius: 12, overflow: "hidden" }}>
                  <button onClick={() => setBookingOption("term")} style={{ display: "flex", alignItems: "center", width: "100%", padding: "16px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: bookingOption === "term" ? "2px solid #444" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {bookingOption === "term" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Summer term</div>
                      <button onClick={(e) => { e.stopPropagation(); setTermExpanded(!termExpanded); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                        <span style={{ fontSize: 13, color: "#888" }}>60 sessions</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: termExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£300 <span style={{ fontSize: 12, fontWeight: 500, color: "#888" }}>max</span></span>
                  </button>
                  {termExpanded && (
                    <div style={{ padding: "0 16px 14px 48px" }}>
                      <div style={{ height: 1, background: "#eee", marginBottom: 10 }} />
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {["14–18 Apr","21–25 Apr","28 Apr – 2 May","5–9 May","12–16 May","19–23 May"].map((w,i) => (
                          <span key={i} style={{ fontSize: 11, color: "#888", background: "#f5f5f5", padding: "3px 8px", borderRadius: 4 }}>{w}</span>
                        ))}
                        <span style={{ fontSize: 11, color: "#bbb", background: "#f5f5f5", padding: "3px 8px", borderRadius: 4, textDecoration: "line-through" }}>25–30 May</span>
                        {["1–6 Jun","8–13 Jun","15–19 Jun","22–26 Jun","29 Jun – 3 Jul","6–10 Jul"].map((w,i) => (
                          <span key={i+6} style={{ fontSize: 11, color: "#888", background: "#f5f5f5", padding: "3px 8px", borderRadius: 4 }}>{w}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Individual option */}
                <button onClick={() => { setBookingOption("individual"); setTermExpanded(false); }} style={{ display: "flex", alignItems: "center", width: "100%", padding: "16px", background: "#fff", border: bookingOption === "individual" ? "2px solid #444" : "1px solid #e0e0e0", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: bookingOption === "individual" ? "2px solid #444" : "2px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {bookingOption === "individual" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Individual sessions</div>
                    <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>Choose dates at next step</div>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£5<span style={{ fontSize: 12, fontWeight: 500, color: "#888" }}>/session</span></span>
                </button>
              </div>
            </div>
            {bookingOption && (
              <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                {bookingOption === "term" ? (
                  <>
                    <button onClick={() => { setFlowStep("payment"); setReviewDatesExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Pay now</button>
                    <button className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Add to basket</button>
                  </>
                ) : (
                  <button onClick={() => { setFlowStep("choose-dates"); setSelectedGridDates2({}); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Choose dates</button>
                )}
              </div>
            )}
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Breakfast - Choose dates (S4 grid) */}
        {detailPage === "breakfast" && flowStep === "choose-dates" && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep("booking-options")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Breakfast club</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon–Fri</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#222", margin: "0 0 4px" }}>Choose your sessions</h2>
              <p style={{ fontSize: 13, color: "#888", margin: "0 0 14px" }}>Select the days and times you'd like to book.</p>
              {(() => {
                const timeSlots = ["07:00", "07:45"];
                const weeks = [
                  { week: "W/c Mon 14 Apr", dates: [14,15,16,17,18], halfTerm: false, days: ["bk-apr14","bk-apr15","bk-apr16","bk-apr17","bk-apr18"] },
                  { week: "W/c Mon 21 Apr", dates: [21,22,23,24,25], halfTerm: false, days: ["bk-apr21","bk-apr22","bk-apr23","bk-apr24","bk-apr25"] },
                  { week: "W/c Mon 28 Apr", dates: [28,29,30,1,2], halfTerm: false, days: ["bk-apr28","bk-apr29","bk-apr30","bk-may1","bk-may2"] },
                  { week: "W/c Mon 5 May", dates: [5,6,7,8,9], halfTerm: false, days: ["bk-may5","bk-may6","bk-may7","bk-may8","bk-may9"] },
                  { week: "W/c Mon 12 May", dates: [12,13,14,15,16], halfTerm: false, days: ["bk-may12","bk-may13","bk-may14","bk-may15","bk-may16"] },
                  { week: "W/c Mon 19 May", dates: [19,20,21,22,23], halfTerm: false, days: ["bk-may19","bk-may20","bk-may21","bk-may22","bk-may23"] },
                  { week: "W/c Mon 25 May", dates: [25,26,27,28,29], halfTerm: true, days: ["bk-ht1","bk-ht2","bk-ht3","bk-ht4","bk-ht5"] },
                  { week: "W/c Mon 2 Jun", dates: [2,3,4,5,6], halfTerm: false, days: ["bk-jun2","bk-jun3","bk-jun4","bk-jun5","bk-jun6"] },
                  { week: "W/c Mon 9 Jun", dates: [9,10,11,12,13], halfTerm: false, days: ["bk-jun9","bk-jun10","bk-jun11","bk-jun12","bk-jun13"] },
                  { week: "W/c Mon 16 Jun", dates: [16,17,18,19,20], halfTerm: false, days: ["bk-jun16","bk-jun17","bk-jun18","bk-jun19","bk-jun20"] },
                  { week: "W/c Mon 23 Jun", dates: [23,24,25,26,27], halfTerm: false, days: ["bk-jun23","bk-jun24","bk-jun25","bk-jun26","bk-jun27"] },
                  { week: "W/c Mon 30 Jun", dates: [30,1,2,3,4], halfTerm: false, days: ["bk-jun30","bk-jul1","bk-jul2","bk-jul3","bk-jul4"] },
                  { week: "W/c Mon 7 Jul", dates: [7,8,9,10,11], halfTerm: false, days: ["bk-jul7","bk-jul8","bk-jul9","bk-jul10","bk-jul11"] },
                ];
                const dayLabels = ["Mon","Tue","Wed","Thu","Fri"];
                const allActive = [];
                weeks.forEach(w => { if (!w.halfTerm) w.days.forEach(d => allActive.push(d)); });
                const count = Object.keys(selectedGridDates2).length;
                const allSelected = count === allActive.length;

                // Pattern detection: check if Week 1 has selections
                const week1 = weeks[0];
                const week1Selections = {};
                week1.days.forEach((d, i) => { if (selectedGridDates2[d]) week1Selections[i] = selectedGridDates2[d]; });
                const hasWeek1Pattern = Object.keys(week1Selections).length > 0;

                // Check if only week 1 has selections (to show the prompt)
                const otherWeekSelections = Object.keys(selectedGridDates2).filter(d => !week1.days.includes(d)).length;
                const showPatternPrompt = hasWeek1Pattern && otherWeekSelections === 0;

                const applyPattern = () => {
                  const next = { ...selectedGridDates2 };
                  weeks.forEach((w) => {
                    if (w.halfTerm || w === week1) return;
                    w.days.forEach((d, i) => {
                      if (week1Selections[i]) next[d] = week1Selections[i];
                      else delete next[d];
                    });
                  });
                  setSelectedGridDates2(next);
                };

                return (
                <>
                <button onClick={() => { if (allSelected) setSelectedGridDates2({}); else { const a = {}; allActive.forEach(d => { a[d] = timeSlots[0]; }); setSelectedGridDates2(a); } }} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "0 0 12px", textAlign: "left" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: allSelected ? "2px solid #444" : "2px solid #ccc", background: allSelected ? "#444" : (count > 0 ? "#444" : "#fff"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {allSelected && count > 0 && <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    {count > 0 && !allSelected && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5H8" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Select all</span>
                </button>
                <div style={{ height: 1, background: "#eee", marginBottom: 10 }} />

                {weeks.map((w, wi) => (
                  <div key={wi} {...(wi === 1 ? {"data-bk-week2": true} : {})} style={{ marginBottom: 2, borderTop: wi > 0 ? "1px solid #f0f0f0" : "none" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: w.halfTerm ? "#bbb" : "#666", textDecoration: w.halfTerm ? "line-through" : "none", padding: "10px 0 4px" }}>
                      {w.week}
                      {w.halfTerm && <span style={{ fontSize: 10, fontStyle: "italic", textDecoration: "none", marginLeft: 6, color: "#bbb" }}>Half term</span>}
                    </div>
                    {/* Day + date headers per week */}
                    <div style={{ display: "grid", gridTemplateColumns: "54px repeat(5, 1fr)", gap: 2, marginBottom: 2 }}>
                      <div />
                      {dayLabels.map((dl, i) => (
                        <div key={i} style={{ textAlign: "center", opacity: w.halfTerm ? 0.35 : 1 }}>
                          <div style={{ fontSize: 10, fontWeight: 600, color: "#999" }}>{dl}</div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#666" }}>{w.dates[i]}</div>
                        </div>
                      ))}
                    </div>
                    {w.halfTerm ? (
                      <div style={{ display: "grid", gridTemplateColumns: "54px repeat(5, 1fr)", gap: 2, alignItems: "center", padding: "2px 0", opacity: 0.35 }}>
                        <div style={{ fontSize: 10, color: "#bbb" }}>—</div>
                        {w.days.map((d,di) => (
                          <div key={di} style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5H8" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      timeSlots.map((t, ti) => (
                        <div key={ti} style={{ display: "grid", gridTemplateColumns: "54px repeat(5, 1fr)", gap: 2, alignItems: "center", padding: "3px 0" }}>
                          <div style={{ fontSize: 10, color: "#999", fontWeight: 500 }}>{t}</div>
                          {w.days.map((d, di) => {
                            const isSel = selectedGridDates2[d] === t;
                            const hasOther = d in selectedGridDates2 && selectedGridDates2[d] !== t;
                            return (
                              <div key={di} style={{ display: "flex", justifyContent: "center" }}>
                                <button onClick={() => { setSelectedGridDates2(prev => { const next = { ...prev }; if (next[d] === t) delete next[d]; else next[d] = t; return next; }); }} style={{ width: 30, height: 30, borderRadius: "50%", border: isSel ? "2px solid #444" : "1.5px solid #ddd", background: isSel ? "#444" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, opacity: hasOther ? 0.4 : 1 }}>
                                  {isSel && <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ))
                    )}

                    {/* Pattern prompt after Week 1 */}
                    {wi === 0 && showPatternPrompt && (
                      <div style={{ background: "#f8f8f8", borderRadius: 10, padding: "12px 14px", marginTop: 8, marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 8 }}>Apply this pattern to all weeks?</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={applyPattern} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: "none", background: "#444", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Apply to all weeks</button>
                          <button onClick={() => { const el = document.querySelector('[data-bk-week2]'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", color: "#444", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Choose other dates</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                </>
                );
              })()}
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              {Object.keys(selectedGridDates2).length > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: "#888" }}>{Object.keys(selectedGridDates2).length} session{Object.keys(selectedGridDates2).length !== 1 ? "s" : ""} selected</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#333" }}>£{Object.keys(selectedGridDates2).length * 5}</span>
                </div>
              )}
              <button onClick={() => { setFlowStep("payment"); setReviewDatesExpanded(false); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Continue to payment</button>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Breakfast - Payment (wraparound, enough balance) */}
        {detailPage === "breakfast" && flowStep === "payment" && (() => {
          const isTerm = bookingOption === "term";
          const sessionCount = isTerm ? 60 : Object.keys(selectedGridDates2).length;
          const total = sessionCount * 5;
          const hasEnough = wraparoundBalance >= total;
          const bkTermWeeks = [
            { label: "14–18 Apr", active: true },{ label: "21–25 Apr", active: true },{ label: "28 Apr – 2 May", active: true },
            { label: "5–9 May", active: true },{ label: "12–16 May", active: true },{ label: "19–23 May", active: true },
            { label: "25–30 May", active: false },
            { label: "1–6 Jun", active: true },{ label: "8–13 Jun", active: true },{ label: "15–19 Jun", active: true },
            { label: "22–26 Jun", active: true },{ label: "29 Jun – 3 Jul", active: true },{ label: "6–10 Jul", active: true },
          ];
          const bkDayLabels = {
            "bk-apr14":"Mon 14 Apr","bk-apr15":"Tue 15 Apr","bk-apr16":"Wed 16 Apr","bk-apr17":"Thu 17 Apr","bk-apr18":"Fri 18 Apr",
            "bk-apr21":"Mon 21 Apr","bk-apr22":"Tue 22 Apr","bk-apr23":"Wed 23 Apr","bk-apr24":"Thu 24 Apr","bk-apr25":"Fri 25 Apr",
            "bk-apr28":"Mon 28 Apr","bk-apr29":"Tue 29 Apr","bk-apr30":"Wed 30 Apr","bk-may1":"Thu 1 May","bk-may2":"Fri 2 May",
            "bk-may5":"Mon 5 May","bk-may6":"Tue 6 May","bk-may7":"Wed 7 May","bk-may8":"Thu 8 May","bk-may9":"Fri 9 May",
            "bk-may12":"Mon 12 May","bk-may13":"Tue 13 May","bk-may14":"Wed 14 May","bk-may15":"Thu 15 May","bk-may16":"Fri 16 May",
            "bk-may19":"Mon 19 May","bk-may20":"Tue 20 May","bk-may21":"Wed 21 May","bk-may22":"Thu 22 May","bk-may23":"Fri 23 May",
            "bk-jun2":"Mon 2 Jun","bk-jun3":"Tue 3 Jun","bk-jun4":"Wed 4 Jun","bk-jun5":"Thu 5 Jun","bk-jun6":"Fri 6 Jun",
            "bk-jun9":"Mon 9 Jun","bk-jun10":"Tue 10 Jun","bk-jun11":"Wed 11 Jun","bk-jun12":"Thu 12 Jun","bk-jun13":"Fri 13 Jun",
            "bk-jun16":"Mon 16 Jun","bk-jun17":"Tue 17 Jun","bk-jun18":"Wed 18 Jun","bk-jun19":"Thu 19 Jun","bk-jun20":"Fri 20 Jun",
            "bk-jun23":"Mon 23 Jun","bk-jun24":"Tue 24 Jun","bk-jun25":"Wed 25 Jun","bk-jun26":"Thu 26 Jun","bk-jun27":"Fri 27 Jun",
            "bk-jun30":"Mon 30 Jun","bk-jul1":"Tue 1 Jul","bk-jul2":"Wed 2 Jul","bk-jul3":"Thu 3 Jul","bk-jul4":"Fri 4 Jul",
            "bk-jul7":"Mon 7 Jul","bk-jul8":"Tue 8 Jul","bk-jul9":"Wed 9 Jul","bk-jul10":"Thu 10 Jul","bk-jul11":"Fri 11 Jul",
          };
          const timeLabels = { "07:00": "07:00 – 08:30", "07:45": "07:45 – 08:30" };
          return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f5" }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 12px", flexShrink: 0, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
              <button onClick={() => setFlowStep(isTerm ? "booking-options" : "choose-dates")} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Breakfast club</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Apr – Jul 2026 · Mon–Fri</div>
              </div>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "#fff" }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: "0 0 16px" }}>Review & pay</h2>
              <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#222", marginBottom: 2 }}>Breakfast club</div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>For {selectedChild.name}</div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>{isTerm ? "Summer term · " : ""}{sessionCount} session{sessionCount !== 1 ? "s" : ""}</div>
                <div style={{ height: 1, background: "#f0f0f0", marginBottom: 12 }} />

                {/* Dates accordion */}
                {isTerm ? (
                  <>
                  <button onClick={() => setReviewDatesExpanded(!reviewDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: reviewDatesExpanded ? 10 : 0 }}>
                    <span style={{ fontSize: 13, color: "#666" }}>View all weeks</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: reviewDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {reviewDatesExpanded && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
                      {bkTermWeeks.map((w, i) => (
                        <span key={i} style={{ fontSize: 11, color: w.active ? "#666" : "#bbb", background: "#f5f5f5", padding: "3px 8px", borderRadius: 4, textDecoration: w.active ? "none" : "line-through" }}>{w.label}</span>
                      ))}
                    </div>
                  )}
                  </>
                ) : (
                  <>
                  <button onClick={() => setReviewDatesExpanded(!reviewDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: reviewDatesExpanded ? 10 : 0 }}>
                    <span style={{ fontSize: 13, color: "#666" }}>View selected dates</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: reviewDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {reviewDatesExpanded && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 2, marginBottom: 4 }}>
                      {Object.keys(selectedGridDates2).map((id) => (
                        <div key={id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#aaa", flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: "#666" }}>{bkDayLabels[id] || id} · {timeLabels[selectedGridDates2[id]] || selectedGridDates2[id]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  </>
                )}

                <div style={{ height: 1, background: "#f0f0f0", marginTop: 12, marginBottom: 12 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#222" }}>£{total}.00</span>
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 10 }}>Pay with</div>
              <div style={{ background: "#fff", border: "2px solid #444", borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#444" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Wraparound care account</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 1 }}>Balance: £{wraparoundBalance.toFixed(2)}</div>
                  </div>
                </div>
              </div>
              {hasEnough && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px", background: "#f6f8ff", border: "1px solid #e0e6f0", borderRadius: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="7" cy="7" r="6" stroke="#7888a8" strokeWidth="1.3" /><path d="M7 4V7.5" stroke="#7888a8" strokeWidth="1.3" strokeLinecap="round" /><circle cx="7" cy="10" r="0.6" fill="#7888a8" /></svg>
                  <span style={{ fontSize: 12, color: "#5a6a85", lineHeight: 1.4 }}>£5.00 deducted from your account each day your child attends</span>
                </div>
              )}
            </div>
            <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0, background: "#fff" }}>
              <button onClick={() => { setConfirmedDatesExpanded(false); setFlowStep("confirmed"); }} className="btn-action" style={{ width: "100%", padding: "14px", borderRadius: 28, border: "none", background: "#444", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
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
          const sessionCount = isTerm ? 60 : Object.keys(selectedGridDates2).length;
          const total = sessionCount * 5;
          const bkDayLabelsConf = {
            "bk-apr14":"Mon 14 Apr","bk-apr15":"Tue 15 Apr","bk-apr16":"Wed 16 Apr","bk-apr17":"Thu 17 Apr","bk-apr18":"Fri 18 Apr",
            "bk-apr21":"Mon 21 Apr","bk-apr22":"Tue 22 Apr","bk-apr23":"Wed 23 Apr","bk-apr24":"Thu 24 Apr","bk-apr25":"Fri 25 Apr",
            "bk-apr28":"Mon 28 Apr","bk-apr29":"Tue 29 Apr","bk-apr30":"Wed 30 Apr","bk-may1":"Thu 1 May","bk-may2":"Fri 2 May",
            "bk-may5":"Mon 5 May","bk-may6":"Tue 6 May","bk-may7":"Wed 7 May","bk-may8":"Thu 8 May","bk-may9":"Fri 9 May",
            "bk-may12":"Mon 12 May","bk-may13":"Tue 13 May","bk-may14":"Wed 14 May","bk-may15":"Thu 15 May","bk-may16":"Fri 16 May",
            "bk-may19":"Mon 19 May","bk-may20":"Tue 20 May","bk-may21":"Wed 21 May","bk-may22":"Thu 22 May","bk-may23":"Fri 23 May",
            "bk-jun2":"Mon 2 Jun","bk-jun3":"Tue 3 Jun","bk-jun4":"Wed 4 Jun","bk-jun5":"Thu 5 Jun","bk-jun6":"Fri 6 Jun",
            "bk-jun9":"Mon 9 Jun","bk-jun10":"Tue 10 Jun","bk-jun11":"Wed 11 Jun","bk-jun12":"Thu 12 Jun","bk-jun13":"Fri 13 Jun",
            "bk-jun16":"Mon 16 Jun","bk-jun17":"Tue 17 Jun","bk-jun18":"Wed 18 Jun","bk-jun19":"Thu 19 Jun","bk-jun20":"Fri 20 Jun",
            "bk-jun23":"Mon 23 Jun","bk-jun24":"Tue 24 Jun","bk-jun25":"Wed 25 Jun","bk-jun26":"Thu 26 Jun","bk-jun27":"Fri 27 Jun",
            "bk-jun30":"Mon 30 Jun","bk-jul1":"Tue 1 Jul","bk-jul2":"Wed 2 Jul","bk-jul3":"Thu 3 Jul","bk-jul4":"Fri 4 Jul",
            "bk-jul7":"Mon 7 Jul","bk-jul8":"Tue 8 Jul","bk-jul9":"Wed 9 Jul","bk-jul10":"Thu 10 Jul","bk-jul11":"Fri 11 Jul",
          };
          const confTimeLabels = { "07:00": "07:00 – 08:30", "07:45": "07:45 – 08:30" };
          return (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#fff", zIndex: 5 }}>
            <div style={{ height: isMobile ? 20 : 50, background: "#fff", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
              <div style={{ width: 120, height: 28, background: "#222", borderRadius: 14, display: isMobile ? "none" : "block" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 16px 0", flexShrink: 0 }}>
              <button onClick={() => { setDetailPage(null); setFlowStep(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 4L4 14" stroke="#333" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 24px 20px", background: "#fff" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#444", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M10 18L16 24L26 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#222", margin: "0 0 6px", textAlign: "center" }}>Booking confirmed</h1>
              <p style={{ fontSize: 14, color: "#888", margin: "0 0 28px", textAlign: "center" }}>{selectedChild.name} is booked in for Breakfast club</p>

              <div style={{ background: "#f8f8f8", borderRadius: 12, padding: "16px", width: "100%", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="8" r="3" stroke="var(--color-brand-600)" strokeWidth="1.5" />
                      <circle cx="6" cy="14" r="2" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                      <circle cx="14" cy="14" r="2" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                      <path d="M8 8L6 14" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                      <path d="M12 8L14 14" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>Breakfast club</div>
                    {isTerm && <div style={{ fontSize: 12, color: "#888" }}>Monday – Friday</div>}
                  </div>
                </div>

                <div style={{ height: 1, background: "#e8e8e8", marginBottom: 10 }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 10 }}>
                  {isTerm ? (
                    <div style={{ fontSize: 13, color: "#666" }}>Summer term · 60 sessions</div>
                  ) : (
                    <>
                    <button onClick={() => setConfirmedDatesExpanded(!confirmedDatesExpanded)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: confirmedDatesExpanded ? 6 : 0 }}>
                      <span style={{ fontSize: 13, color: "#666" }}>{Object.keys(selectedGridDates2).length} session{Object.keys(selectedGridDates2).length !== 1 ? "s" : ""} selected</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: confirmedDatesExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    {confirmedDatesExpanded && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {Object.keys(selectedGridDates2).map((id) => (
                          <div key={id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#aaa", flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: "#666" }}>{bkDayLabelsConf[id] || id} · {confTimeLabels[selectedGridDates2[id]] || selectedGridDates2[id]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    </>
                  )}
                </div>

                <div style={{ height: 1, background: "#e8e8e8", marginBottom: 10 }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Paid</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#222" }}>£{total}.00</span>
                </div>
              </div>

            </div>

            {/* Booking feedback nudge */}
            <div style={{ padding: "10px 16px 6px", textAlign: "center", borderTop: "1px solid #f0f0f0", flexShrink: 0 }}>
              <div style={{ fontSize: 12, color: "#bbb", marginBottom: 6 }}>Was it easy to book this club?</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                {[["👎", 1], ["👍", 2]].map(([face, val]) => (
                  <button
                    key={val}
                    onClick={() => !bookingNudgeRating && setBookingNudgeRating(val)}
                    className="btn-pill"
                    style={{ background: "none", border: "none", cursor: bookingNudgeRating ? "default" : "pointer", fontSize: 22, minWidth: 36, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center", opacity: bookingNudgeRating && bookingNudgeRating !== val ? 0.2 : 1, transition: "opacity 0.15s", lineHeight: 1 }}
                  >{face}</button>
                ))}
              </div>
              {bookingNudgeRating && <div style={{ fontSize: 12, color: "#bbb", marginTop: 6 }}>Thanks for your feedback</div>}
            </div>

            <div style={{ padding: "12px 16px 20px", flexShrink: 0, background: "#fff" }}>
              <Button variant="primary" style={{ width: "100%" }} onClick={() => { setFlowStep(null); setBookingNudgeRating(null); setSubPage("my-bookings"); }}>Go to my bookings</Button>
            </div>
            <div style={{ height: isMobile ? 0 : 20, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: 134, height: 5, background: "#ddd", borderRadius: 3 }} />
            </div>
          </div>
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
            <div style={{ background: "#fff", minHeight: "100%", display: "flex", flexDirection: "column" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                <button onClick={() => setSelectedBookingItem(null)} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>{selectedBookingItem.title}</span>
              </div>

              {/* Scrollable body */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 24px", minHeight: 0 }}>

                {/* Details section */}
                <div style={{ fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 14 }}>Details</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="2" stroke="#888" strokeWidth="1.2"/><path d="M2 7H14" stroke="#888" strokeWidth="1.2"/><path d="M5 1.5V4" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/><path d="M11 1.5V4" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span style={{ fontSize: 14, color: "#555" }}>{selectedBookingItem.dateRange}</span>
                </div>
                {selectedBookingItem.time && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#888" strokeWidth="1.2"/><path d="M8 5V8.5L10.5 10" stroke="#888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize: 14, color: "#555" }}>{selectedBookingItem.time}</span>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.79 1.5 4 3.29 4 5.5C4 8.5 8 14.5 8 14.5C8 14.5 12 8.5 12 5.5C12 3.29 10.21 1.5 8 1.5Z" stroke="#888" strokeWidth="1.2"/><circle cx="8" cy="5.5" r="1.5" stroke="#888" strokeWidth="1.2"/></svg>
                  <span style={{ fontSize: 14, color: "#555" }}>{selectedBookingItem.location}</span>
                </div>

                {/* About this trip accordion */}
                <button
                  onClick={() => setAboutTripOpen(o => !o)}
                  style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: aboutTripOpen ? 10 : 20 }}
                >
                  <span style={{ fontSize: 13, color: "#666" }}>About this trip</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: aboutTripOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {aboutTripOpen && (
                  <div style={{ paddingLeft: 2, marginBottom: 20 }}>
                    <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, margin: 0 }}>{selectedBookingItem.description}</p>
                  </div>
                )}

                <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", margin: "0 0 20px" }} />

                {/* Payment section */}
                <div style={{ fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 14 }}>Payment</div>
                <Card padding="none" style={{ overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: 14, color: "#555" }}>Total cost</span>
                    <span style={{ fontSize: 14, color: "#333" }}>£{selectedBookingItem.totalCost}</span>
                  </div>
                  {selectedBookingItem.installments.map((inst, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: "1px solid #f0f0f0" }}>
                      <span style={{ fontSize: 14, color: "#888" }}>{inst.label} · {inst.date}</span>
                      <span style={{ fontSize: 14, color: "#888" }}>£{inst.amount}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 14px", borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>Remaining</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>£{selectedBookingItem.remaining}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px" }}>
                    <span style={{ fontSize: 14, color: "#888" }}>Due by</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#e67e22" }}>{selectedBookingItem.deadline}</span>
                  </div>
                </Card>
              </div>

              {/* Fixed footer */}
              <div style={{ padding: "12px 16px 20px", background: "#fff", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                <Button variant="primary" style={{ width: "100%" }}>
                  {`Pay £${selectedBookingItem.remaining}`}
                </Button>
              </div>
            </div>
          )}

          {/* Sub-pages with back button */}
          {subPage === "my-bookings" && !selectedBookingItem && (() => {
            const needsAttentionItems = [
              {
                id: "t1",
                title: "Year 4 residential – PGL",
                category: "Trip",
                icon: <Bus size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,
                dateRange: "12th–14th May 2026",
                time: "Departs 08:00 · Returns 17:00",
                location: "Marchants Hill, Surrey",
                description: "A 3-day residential adventure trip for Year 4 pupils at PGL Marchants Hill. Activities include zip wire, climbing, and team challenges. All meals and accommodation included.",
                totalCost: 185,
                amountPaid: 85,
                remaining: 100,
                deadline: "1st Apr 2026",
                installments: [
                  { label: "Deposit paid", amount: 85, date: "14th Jan 2026" },
                ],
              },
            ];
            const upcomingItems = [
              { id: "u1", title: "Drumming",          category: "Club",             icon: <Shapes size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,   sub: "Mon 7th Apr · 15:30–16:15" },
              { id: "u2", title: "Breakfast club",    category: "Wraparound",       icon: <SunMoon size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,  sub: "Mon 7th – Fri 11th Apr · 07:45–08:30" },
              { id: "u3", title: "Football",          category: "Club",             icon: <Shapes size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,   sub: "Tue 8th Apr · 15:30–16:30" },
              { id: "u4", title: "Art club",          category: "Club",             icon: <Shapes size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,   sub: "Wed 9th Apr · 15:30–16:30" },
              { id: "u5", title: "Parents' evening",  category: "Parents' evening", icon: (
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="5" width="22" height="19" rx="2.5" stroke="var(--color-brand-600)" strokeWidth="1.5" />
                  <path d="M3 11H25" stroke="var(--color-brand-600)" strokeWidth="1.5" />
                  <path d="M9 3V6" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M19 3V6" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="10" cy="17" r="1.8" fill="var(--color-brand-600)" opacity="0.8" />
                  <circle cx="18" cy="17" r="1.8" fill="var(--color-brand-600)" opacity="0.8" />
                </svg>
              ), sub: "Thu 10th Apr · 17:40 (10 min slot)" },
              { id: "u6", title: "Meals",             category: "Meals",            icon: <Utensils size={18} color="var(--color-brand-600)" strokeWidth={1.5} />, sub: "w/c 7th Apr · 5 of 5 days selected" },
              { id: "u7", title: "Meals",             category: "Meals",            icon: <Utensils size={18} color="var(--color-brand-600)" strokeWidth={1.5} />, sub: "w/c 14th Apr · 3 of 5 days selected" },
            ];
            const pastItems = [
              { id: "p1", title: "Drumming",       category: "Club",       icon: <Shapes size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,   sub: "Mon 3rd Mar · 15:30–16:15" },
              { id: "p2", title: "Football",       category: "Club",       icon: <Shapes size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,   sub: "Tue 4th Mar · 15:30–16:30" },
              { id: "p3", title: "Breakfast club", category: "Wraparound", icon: <SunMoon size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,  sub: "Mon 3rd – Fri 7th Mar · 07:45–08:30" },
              { id: "p4", title: "Tate Modern",    category: "Trip",       icon: <Bus size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,      sub: "Fri 28th Feb · Fully paid" },
              { id: "p5", title: "Meals",          category: "Meals",      icon: <Utensils size={18} color="var(--color-brand-600)" strokeWidth={1.5} />, sub: "w/c 3rd Mar · 5 of 5 days selected" },
              { id: "p6", title: "Meals",          category: "Meals",      icon: <Utensils size={18} color="var(--color-brand-600)" strokeWidth={1.5} />, sub: "w/c 24th Feb · 4 of 5 days selected" },
              { id: "p7", title: "Art club",       category: "Club",       icon: <Shapes size={18} color="var(--color-brand-600)" strokeWidth={1.5} />,   sub: "Wed 5th Mar · 15:30–16:30" },
              { id: "p8", title: "School shop",    category: "Shop",       icon: <ShoppingBag size={18} color="var(--color-brand-600)" strokeWidth={1.5} />, sub: "Order #1042 · 2 items" },
            ];

            const activeItems = bookingsFilter === "needs-attention" ? needsAttentionItems
              : bookingsFilter === "upcoming" ? upcomingItems
              : pastItems;

            return (
              <div style={{ background: "#fff", minHeight: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                  <button onClick={() => { setSubPage(null); setSelectedBookingItem(null); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>Bookings & orders</span>
                </div>

                {/* Pills */}
                <div style={{ display: "flex", gap: 8, padding: "14px 16px", flexShrink: 0, overflowX: "auto", scrollbarWidth: "none" }}>
                  {needsAttentionItems.length > 0 && (
                    <button
                      onClick={() => setBookingsFilter("needs-attention")}
                      style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: "var(--radius-round)", border: `1.5px solid ${bookingsFilter === "needs-attention" ? "var(--color-brand-600)" : "var(--color-grey-200)"}`, background: bookingsFilter === "needs-attention" ? "var(--color-brand-600)" : "var(--color-white)", cursor: "pointer", fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-2)", fontWeight: "var(--font-weight-semibold)", color: bookingsFilter === "needs-attention" ? "var(--color-white)" : "var(--color-grey-600)" }}
                    >
                      Needs attention
                      <span style={{ minWidth: 18, height: 18, borderRadius: 99, background: "#ef6c00", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{needsAttentionItems.length}</span>
                    </button>
                  )}
                  {[
                    { id: "upcoming", label: "Upcoming", count: upcomingItems.length },
                    { id: "past",     label: "Past",     count: pastItems.length },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setBookingsFilter(f.id)}
                      style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: "var(--radius-round)", border: `1.5px solid ${bookingsFilter === f.id ? "var(--color-brand-600)" : "var(--color-grey-200)"}`, background: bookingsFilter === f.id ? "var(--color-brand-600)" : "var(--color-white)", cursor: "pointer", fontFamily: "var(--font-family-sans)", fontSize: "var(--font-size-2)", fontWeight: "var(--font-weight-semibold)", color: bookingsFilter === f.id ? "var(--color-white)" : "var(--color-grey-600)" }}
                    >
                      {f.label}
                      <span style={{ fontSize: "var(--font-size-2)", fontWeight: "var(--font-weight-regular)", color: bookingsFilter === f.id ? "rgba(255,255,255,0.7)" : "var(--color-grey-300)" }}>{f.count}</span>
                    </button>
                  ))}
                </div>

                {/* List */}
                <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 32px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {activeItems.map((item, i) => (
                      bookingsFilter === "needs-attention" ? (
                        // Structured needs-attention card
                        <Card key={item.id} padding="none" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => { setSelectedBookingItem(item); setAboutTripOpen(false); }}>
                          <div style={{ padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 9, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {item.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              {/* Title + category */}
                              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
                                <span style={{ fontSize: 15, fontWeight: 600, color: "#222" }}>{item.title}</span>
                                <span style={{ fontSize: 12, color: "#aaa", flexShrink: 0 }}>{item.category}</span>
                              </div>
                              {/* Date */}
                              <div style={{ fontSize: 13, color: "#666", marginBottom: 5 }}>{item.dateRange}</div>
                              {/* Payment status line */}
                              <div style={{ fontSize: 13, fontWeight: 500, color: "#888", marginBottom: 5 }}>
                                {`£${item.amountPaid} of £${item.totalCost} paid · Deadline ${item.deadline}`}
                              </div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        </Card>
                      ) : (
                        // Standard row for upcoming/past
                        <button
                          key={item.id}
                          className="btn-pill"
                          style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "none", border: "none", borderBottom: i < activeItems.length - 1 ? "1px solid #f0f0f0" : "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
                        >
                          <div style={{ width: 36, height: 36, borderRadius: 9, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {item.icon}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 2 }}>
                              <span style={{ fontSize: 15, fontWeight: 600, color: "#222" }}>{item.title}</span>
                              <span style={{ fontSize: 12, color: "#aaa", flexShrink: 0 }}>{item.category}</span>
                            </div>
                            <div style={{ fontSize: 12, color: "#888" }}>{item.sub}</div>
                          </div>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                      )
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {subPage === "browse" && (() => {
            const today = new Date(2026, 1, 25);
            const clubIcon = <Shapes size={18} color="var(--color-brand-600)" strokeWidth={1.5} />;
            const wraparoundIcon = <SunMoon size={18} color="var(--color-brand-600)" strokeWidth={1.5} />;
            const tripIcon = <Bus size={18} color="var(--color-brand-600)" strokeWidth={1.5} />;

            const browseItems = [
              { id: 1, type: "clubs", title: "Drumming", icon: clubIcon, days: "Mondays", dayOrder: [1], time: "15:30\u201316:15", priceRange: "\u00a3110.00 (block booking)", termDates: "6th Apr \u2013 17th Jul 2026", deadline: new Date(2026, 2, 11), deadlineLabel: "11th Mar 2026", places: 7 },
              { id: 16, type: "clubs", title: "Chess club", icon: clubIcon, days: "Mondays", dayOrder: [1], time: "15:30\u201316:30", priceRange: "Free", termDates: "6th Apr \u2013 17th Jul 2026", deadline: new Date(2026, 2, 28), deadlineLabel: "28th Mar 2026", places: 24 },
              { id: 5, type: "clubs", title: "Football", icon: clubIcon, days: "Tuesdays", dayOrder: [2], time: "15:30\u201316:30", priceRange: "\u00a38 per session (\u00a388 max)", termDates: "6th Apr \u2013 17th Jul 2026", bookingNote: "Individual or block bookings available", deadline: new Date(2026, 2, 18), deadlineLabel: "18th Mar 2026", places: 15 },
              { id: 17, type: "clubs", title: "Dance", icon: clubIcon, days: "Tuesdays", dayOrder: [2], time: "15:30\u201316:15", priceRange: "\u00a36 per session (\u00a366 max)", termDates: "6th Apr \u2013 17th Jul 2026", bookingNote: "Individual or block bookings available", deadline: new Date(2026, 2, 21), deadlineLabel: "21st Mar 2026", places: 10 },
              { id: 18, type: "clubs", title: "Choir", icon: clubIcon, days: "Tuesdays", dayOrder: [2], time: "08:00\u201308:45", priceRange: "Free", termDates: "6th Apr \u2013 17th Jul 2026", deadline: new Date(2026, 2, 28), deadlineLabel: "28th Mar 2026", places: 30 },
              { id: 6, type: "clubs", title: "Art club", icon: clubIcon, days: "Wednesdays", dayOrder: [3], time: "15:30\u201316:30", priceRange: "\u00a36 per session (\u00a366 max)", termDates: "6th Apr \u2013 17th Jul 2026", bookingNote: "Individual or block bookings available", deadline: new Date(2026, 2, 20), deadlineLabel: "20th Mar 2026", places: 12 },
              { id: 19, type: "clubs", title: "Book club", icon: clubIcon, days: "Wednesdays", dayOrder: [3], time: "12:30\u201313:00", priceRange: "Free", termDates: "6th Apr \u2013 17th Jul 2026", deadline: new Date(2026, 2, 28), deadlineLabel: "28th Mar 2026", places: 16 },
              { id: 7, type: "clubs", title: "Coding club", icon: clubIcon, days: "Thursdays", dayOrder: [4], time: "15:30\u201316:30", priceRange: "\u00a37 per session (\u00a377 max)", termDates: "6th Apr \u2013 17th Jul 2026", bookingNote: "Individual or block bookings available", deadline: new Date(2026, 2, 20), deadlineLabel: "20th Mar 2026", places: 20 },
              { id: 21, type: "clubs", title: "Drama", icon: clubIcon, days: "Mondays & Thursdays", dayOrder: [1, 4], time: "15:30\u201316:30", priceRange: "\u00a38 per session (\u00a388 max)", termDates: "6th Apr \u2013 17th Jul 2026", bookingNote: "Individual or block bookings available", deadline: new Date(2026, 2, 22), deadlineLabel: "22nd Mar 2026", places: 14 },
              { id: 8, type: "clubs", title: "Netball", icon: clubIcon, days: "Fridays", dayOrder: [5], time: "15:30\u201316:30", priceRange: "\u00a35 per session (\u00a355 max)", termDates: "6th Apr \u2013 17th Jul 2026", bookingNote: "Individual or block bookings available", deadline: new Date(2026, 2, 25), deadlineLabel: "25th Mar 2026", places: 18 },
              { id: 20, type: "clubs", title: "Gymnastics", icon: clubIcon, days: "Fridays", dayOrder: [5], time: "15:30\u201316:30", priceRange: "\u00a39 per session (\u00a399 max)", termDates: "6th Apr \u2013 17th Jul 2026", bookingNote: "Individual or block bookings available", deadline: new Date(2026, 2, 25), deadlineLabel: "25th Mar 2026", places: 8 },
              { id: 2, type: "wraparound", title: "After school club", icon: wraparoundIcon, days: "Monday \u2013 Friday", dayOrder: 1, time: "15:30\u201317:00", priceRange: "\u00a310 per session (\u00a3600 max)", termDates: "6th Apr \u2013 17th Jul 2026", bookingNote: "Individual or block bookings available", paymentTiming: "Charged at time of booking", sameDayCutoff: "Book up to 12:30pm on the day", deadline: null, deadlineLabel: null, places: 40 },
              { id: 3, type: "wraparound", title: "Breakfast club", icon: wraparoundIcon, days: "Monday \u2013 Friday", dayOrder: 0, time: "07:45\u201308:30", priceRange: "\u00a35 per session (\u00a3300 max)", termDates: "6th Apr \u2013 17th Jul 2026", bookingNote: "Individual or block bookings available", paymentTiming: "Charged per session when your child attends", sameDayCutoff: "Book up to 12:30pm on the day", deadline: null, deadlineLabel: null, places: 29 },
              { id: 4, type: "trips", title: "The Lion King", icon: tripIcon, days: "Wednesday 1st April", dayOrder: 3, time: "11:00\u201317:00", priceRange: "Free", termDates: null, deadline: new Date(2026, 2, 29), deadlineLabel: "29th Mar 2026", places: 32 },
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

            const activeDayOrder = clubDayFilter ? dayFilters.find(d => d.id === clubDayFilter)?.dayOrder : null;
            const filtered = browseFilter === "clubs"
              ? (activeDayOrder === null || activeDayOrder === undefined ? clubsOnly : clubsOnly.filter(i => i.dayOrder.includes(activeDayOrder)))
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
                  onClick={() => { setSubPage(null); setBrowseFilter("all"); setClubDayFilter(null); }}
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
                    <path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span style={{ fontSize: 17, fontWeight: 600, color: "#333" }}>{browseFilter === "wraparound" ? "Wraparound care" : browseFilter === "clubs" ? "Clubs" : browseFilter === "trips" ? "Trips" : "What's available"}</span>
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
                {browseFilter === "clubs"
                  ? dayFilters.map((f) => {
                      const isActive = f.id === "all" ? clubDayFilter === null : clubDayFilter === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setClubDayFilter(f.id === "all" ? null : f.id)}
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
                          {dayCounts[f.id] > 0 && (
                            <span style={{
                              fontSize: 11,
                              fontWeight: 400,
                              color: isActive ? "#16a33d" : "#aaa",
                            }}>
                              {dayCounts[f.id]}
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
                {/* Wraparound balance card */}
                {browseFilter === "wraparound" && (
                  <>
                    <Card padding="medium">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Account balance</div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: "#222" }}>£{wraparoundBalance.toFixed(2)}</div>
                        </div>
                        <Button variant="secondary" size="small">Top up</Button>
                      </div>
                    </Card>
                    <Banner variant="neutral" message="Wraparound clubs are paid from your account balance" />
                  </>
                )}

                {sorted.map((item) => {
                  const daysUntilDeadline = getDaysUntil(item.deadline);
                  const isClosingSoon = daysUntilDeadline <= closingSoonDays;
                  const isLowPlaces = item.places !== null && item.places <= lowPlacesThreshold;

                  return (
                  <button
                    key={item.id}
                    onClick={() => { if (item.id === 1) setDetailPage("drumming"); if (item.id === 2) { setDetailPage("after-school"); setFlowStep(null); setBookingOption(null); setTermExpanded(false); setSelectedGridDates({}); } if (item.id === 3) { setDetailPage("breakfast"); setFlowStep(null); setConsentChecked(false); setConsentError(false); setBookingOption(null); setTermExpanded(false); setSelectedGridDates2({}); } }}
                    style={{
                      background: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: 12,
                      padding: "14px 16px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 8,
                            background: "#F0FAF3",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 600, color: "#2f2f2f" }}>
                          {item.title}
                        </span>
                      </div>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M7 5L11 9L7 13" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <div style={{ height: 1, background: "#eee", marginBottom: 10 }} />

                    {/* WHEN group */}
                    {item.days && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="7" cy="7" r="5.5" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                          <path d="M7 4V7L9 8.5" stroke="var(--color-brand-600)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 13, fontWeight: 400, color: "#2f2f2f" }}>
                          {item.days} &middot; {item.time}
                        </span>
                      </div>
                    )}
                    {item.termDates && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                          <path d="M2 6H12" stroke="var(--color-brand-600)" strokeWidth="1" />
                          <path d="M5 1.5V3.5" stroke="var(--color-brand-600)" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M9 1.5V3.5" stroke="var(--color-brand-600)" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        <span style={{ fontSize: 13, fontWeight: 400, color: "#2f2f2f" }}>{item.termDates}</span>
                      </div>
                    )}
                    {item.sameDayCutoff && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="7" cy="7" r="5.5" stroke="var(--color-brand-600)" strokeWidth="1.1" />
                          <path d="M7 4V7.5L9 8.5" stroke="var(--color-brand-600)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 12, fontWeight: 400, color: "#2f2f2f" }}>{item.sameDayCutoff}</span>
                      </div>
                    )}

                    {/* COST group */}
                    <div style={{ height: 1, background: "#f0f0f0", margin: "8px 0" }} />
                    {item.priceRange && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="7" cy="7" r="5.5" stroke="var(--color-brand-600)" strokeWidth="1.2" />
                          <text x="7" y="10" textAnchor="middle" fontSize="8" fill="var(--color-brand-600)" fontWeight="600" fontFamily="sans-serif">£</text>
                        </svg>
                        <span style={{ fontSize: 13, fontWeight: 400, color: "#2f2f2f" }}>
                          {item.priceRange}
                        </span>
                      </div>
                    )}
                    {item.bookingNote && (
                      <div style={{ fontSize: 12, fontWeight: 400, color: "#2f2f2f", marginLeft: 20, marginBottom: 4 }}>{item.bookingNote}</div>
                    )}
                    {item.paymentTiming && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <rect x="1.5" y="4" width="11" height="7.5" rx="1.5" stroke="var(--color-brand-600)" strokeWidth="1.1" />
                          <path d="M1.5 7H12.5" stroke="var(--color-brand-600)" strokeWidth="1" />
                          <rect x="3" y="8.5" width="3" height="1.5" rx="0.5" fill="var(--color-brand-600)" />
                        </svg>
                        <span style={{ fontSize: 12, fontWeight: 400, color: "#2f2f2f" }}>{item.paymentTiming}</span>
                      </div>
                    )}

                    {/* AVAILABILITY group */}
                    {((item.deadline) || item.places !== null) && (
                      <>
                        <div style={{ height: 1, background: "#f0f0f0", margin: "8px 0" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          {item.deadline && (
                            <Tag variant={isClosingSoon ? "default" : "neutral"}>
                              {isClosingSoon ? "Closing soon" : "Deadline: " + item.deadlineLabel}
                            </Tag>
                          )}
                          {item.places !== null && (
                            <Tag variant={isLowPlaces ? "default" : "neutral"}>
                              {item.places} places remaining
                            </Tag>
                          )}
                        </div>
                      </>
                    )}
                  </button>
                  );
                })}
                {sorted.length === 0 && (
                  <div style={{ padding: 32, textAlign: "center" }}>
                    <p style={{ color: "#bbb", fontSize: 14 }}>Nothing available right now</p>
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
                <div style={{ fontSize: 15, fontWeight: 700, color: "#222", padding: "0 16px", marginBottom: 10 }}>Accounts</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
                  {[
                    { label: "Meals",           balance: mealsBalance },
                    { label: "Wraparound care", balance: wraparoundBalance },
                  ].map((account) => (
                    <Card key={account.label} padding="medium">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>{account.label}</div>
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

              {/* Browse & Book */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", marginBottom: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>What's available</div>
                  <button onClick={() => setSubPage("my-bookings")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4, padding: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#666" }}>My bookings</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
                  {[
                    { id: "clubs",           label: "Clubs",             sub: "Available this term",   icon: <Shapes size={20} color="var(--color-brand-600)" strokeWidth={1.5} />,      onClick: () => { setBrowseFilter("clubs"); setSubPage("browse"); } },
                    { id: "wraparound",      label: "Wraparound care",   sub: "Before & after school", icon: <SunMoon size={20} color="var(--color-brand-600)" strokeWidth={1.5} />,     onClick: () => { setBrowseFilter("wraparound"); setSubPage("browse"); } },
                    { id: "meals",           label: "Meals",             sub: "View & select meals",   icon: <Utensils size={20} color="var(--color-brand-600)" strokeWidth={1.5} />,    onClick: () => {} },
                    { id: "trips",           label: "Trips",             sub: "Upcoming trips",        icon: <Bus size={20} color="var(--color-brand-600)" strokeWidth={1.5} />,         onClick: () => { setBrowseFilter("trips"); setSubPage("browse"); } },
                    { id: "parents-evening", label: "Parents' evenings", sub: "Book a slot",           icon: (
                      <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                        <rect x="3" y="5" width="22" height="19" rx="2.5" stroke="var(--color-brand-600)" strokeWidth="1.5" />
                        <path d="M3 11H25" stroke="var(--color-brand-600)" strokeWidth="1.5" />
                        <path d="M9 3V6" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M19 3V6" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="10" cy="17" r="1.8" fill="var(--color-brand-600)" opacity="0.8" />
                        <circle cx="18" cy="17" r="1.8" fill="var(--color-brand-600)" opacity="0.8" />
                      </svg>
                    ), onClick: () => { setBrowseFilter("parents-evening"); setSubPage("browse"); } },
                    { id: "school-shop",     label: "School shop",       sub: "Uniform, kit & more",   icon: <ShoppingBag size={20} color="var(--color-brand-600)" strokeWidth={1.5} />, onClick: () => {} },
                  ].map((item) => (
                    <Card key={item.id} padding="none" style={{ cursor: "pointer" }} onClick={item.onClick}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {item.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{item.label}</div>
                          <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{item.sub}</div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--color-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Thursday 6 March · Packed lunch needed</div>
                  </div>
                  <div style={{ padding: "3px 8px", borderRadius: 8, background: "#f0f0f0", fontSize: 11, fontWeight: 600, color: "#888", flexShrink: 0 }}>8 days</div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Shapes size={20} color="var(--color-brand-600)" strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Choir practice</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Every Wednesday · 12:30 – 13:00</div>
                  </div>
                  <div style={{ padding: "3px 8px", borderRadius: 8, background: "#f0f0f0", fontSize: 11, fontWeight: 600, color: "#888", flexShrink: 0 }}>Weekly</div>
                </div>
                <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FAF3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="6" width="12" height="9" rx="1.5" stroke="var(--color-brand-600)" strokeWidth="1.5" /><path d="M4 9H16" stroke="var(--color-brand-600)" strokeWidth="1.3" /><path d="M8 6V4" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 6V4" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>Parents' evening</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Tuesday 18 March · 16:00 – 19:00</div>
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
              { id: 1, subject: "Sports Day – Friday 27 June", sender: "Mrs Patterson", school: "Oakwood Primary", preview: "Please ensure your child comes to school in their PE kit on Friday. They will need sunscreen applied before...", body: "Dear Parents,\n\nPlease ensure your child comes to school in their PE kit on Friday 27th June for Sports Day.\n\nThey will need sunscreen applied before arriving and a water bottle. Please also send in a hat if the weather is warm.\n\nEvents begin at 9:30am. Parents are welcome to attend from 9:15am — please enter via the main gate.\n\nMany thanks,\nMrs Patterson", date: "28 Feb 2026", time: "08:42", hasReply: false },
              { id: 2, subject: "Year 3 swimming lessons", sender: "School Office", school: "Oakwood Primary", preview: "Swimming lessons for Year 3 will begin on Monday 14th April. Please complete the consent form in the app by...", body: "Dear Parents,\n\nSwimming lessons for Year 3 will begin on Monday 14th April and run every Monday until the end of term.\n\nPlease complete the consent form in the app by Friday 7th March.\n\nYour child will need a swimsuit, towel, and swimming cap (caps are available from the school office for £2).\n\nChildren with long hair must tie it back. Goggles are permitted but not required.\n\nIf you have any questions, please don't hesitate to get in touch.\n\nKind regards,\nSchool Office", date: "13 Mar 2026", time: "14:15", hasReply: false },
              { id: 3, subject: "Homework club cancelled this week", sender: "Mr Davies", school: "Oakwood Primary", preview: "Just to let you know that homework club will not be running this Thursday due to staff training. Normal service...", body: "Dear Parents,\n\nJust to let you know that homework club will not be running this Thursday (27th Feb) due to staff training.\n\nNormal service will resume next Thursday.\n\nApologies for any inconvenience.\n\nMr Davies", date: "16 Mar 2026", time: "16:30", hasReply: false },
              { id: 4, subject: "Re: Molly's reading log", sender: "Miss Taylor", school: "Oakwood Primary", preview: "Thank you for letting me know. I'll make sure Molly gets a new reading log book tomorrow morning. She's been...", body: "Dear Mrs Collini,\n\nThank you for letting me know. I'll make sure Molly gets a new reading log book tomorrow morning.\n\nShe's been making brilliant progress with her reading this term — really lovely to see!\n\nBest wishes,\nMiss Taylor", date: "22 Feb 2026", time: "09:10", hasReply: true },
              { id: 5, subject: "School photos – 12 March", sender: "School Office", school: "Oakwood Primary", preview: "Individual and sibling school photos will be taken on Thursday 12th March. If you would like a sibling photo...", body: "Dear Parents,\n\nIndividual and sibling school photos will be taken on Thursday 12th March.\n\nIf you would like a sibling photo taken, please let the office know by Friday 7th March so we can add them to the list.\n\nChildren should wear full school uniform. Proof sheets and ordering details will be sent home the following week.\n\nSchool Office", date: "14 Mar 2026", time: "10:00", hasReply: false },
              { id: 6, subject: "World Book Day costumes", sender: "Mrs Patterson", school: "Oakwood Primary", preview: "A reminder that World Book Day is on Thursday 6th March. Children are invited to come to school dressed as...", body: "Dear Parents,\n\nA reminder that World Book Day is on Thursday 6th March.\n\nChildren are invited to come to school dressed as their favourite book character. There's no need to spend money — homemade costumes and accessories are absolutely fine!\n\nEach class will be sharing their favourite books and there will be a costume parade at 2:30pm in the hall.\n\nWe look forward to seeing everyone's creativity!\n\nMrs Patterson", date: "18 Feb 2026", time: "11:20", hasReply: false },
              { id: 7, subject: "Breakfast club price update from April", sender: "School Office", school: "Oakwood Primary", preview: "We wanted to let you know that from the summer term, the cost of breakfast club will increase slightly from...", body: "Dear Parents,\n\nWe wanted to let you know that from the summer term (April 2026), the cost of breakfast club will increase slightly from £4.50 to £5.00 per session.\n\nThis is the first price change in two years and reflects increased food and staffing costs. We have worked hard to keep the increase as small as possible.\n\nIf you have any questions, please contact the school office.\n\nKind regards,\nSchool Office", date: "14 Feb 2026", time: "09:30", hasReply: false },
              { id: 11, subject: "Parent governor vacancy", sender: "Mrs Patterson", school: "Oakwood Primary", preview: "We have a vacancy for a parent governor on our governing board. This is a great opportunity to help shape...", body: "Dear Parents,\n\nWe have a vacancy for a parent governor on our governing board.\n\nThis is a great opportunity to help shape the future of our school. Governors meet approximately six times a year and also sit on subcommittees.\n\nIf you are interested or would like to find out more, please contact the school office by Friday 20th March.\n\nMany thanks,\nMrs Patterson", date: "10 Feb 2026", time: "11:00", hasReply: false },
              { id: 12, subject: "Year 2 class assembly – 5 March", sender: "Miss Taylor", school: "Oakwood Primary", preview: "You are warmly invited to Year 2's class assembly on Thursday 5th March at 9:15am in the school hall. The...", body: "Dear Parents,\n\nYou are warmly invited to Year 2's class assembly on Thursday 5th March at 9:15am in the school hall.\n\nThe children have been working very hard on their performance and we hope you can join us. Please be seated by 9:10am.\n\nSiblings are welcome to attend.\n\nBest wishes,\nMiss Taylor", date: "7 Feb 2026", time: "14:20", hasReply: false },
              { id: 13, subject: "New lunchtime menu from March", sender: "School Office", school: "Oakwood Primary", preview: "Our new spring and summer lunch menu will be available from Monday 2nd March. Please log in to the app to...", body: "Dear Parents,\n\nOur new spring and summer lunch menu will be available from Monday 2nd March.\n\nPlease log in to the app to view the updated menu and make any changes to your child's meal choices before the end of this week.\n\nChildren who bring a packed lunch are not affected.\n\nKind regards,\nSchool Office", date: "3 Feb 2026", time: "15:45", hasReply: false },
              { id: 14, subject: "Headlice notification", sender: "School Office", school: "Oakwood Primary", preview: "We have been made aware of a case of headlice in school. Please check your child's hair this evening and...", body: "Dear Parents,\n\nWe have been made aware of a case of headlice in school.\n\nPlease check your child's hair this evening and treat promptly if necessary. Treatments are available from pharmacies without a prescription.\n\nChildren with headlice should not attend school until treatment has begun.\n\nThank you for your cooperation.\n\nSchool Office", date: "28 Jan 2026", time: "13:10", hasReply: false },
              { id: 15, subject: "Scholastic book fair – w/c 10 Feb", sender: "Mrs Patterson", school: "Oakwood Primary", preview: "The Scholastic book fair will be in school from Monday 10th to Friday 14th February. Children will have the...", body: "Dear Parents,\n\nThe Scholastic book fair will be in school from Monday 10th to Friday 14th February.\n\nChildren will have the opportunity to browse and buy books during the school day. You can also visit after school from 3:30–4:15pm.\n\nPayment can be made by card or cash. Every purchase earns free books for the school.\n\nMrs Patterson", date: "24 Jan 2026", time: "10:30", hasReply: false },
              { id: 8, subject: "Year 9 options evening – 18 March", sender: "Mr Hughes", school: "Riverside Secondary", preview: "A reminder that Year 9 options evening is on Wednesday 18th March from 5:30pm. Please attend with your child...", body: "Dear Parents/Carers,\n\nA reminder that Year 9 options evening is on Wednesday 18th March from 5:30pm to 7:30pm in the main hall.\n\nPlease attend with your child to discuss GCSE subject choices. Subject teachers will be available at information stands and there will be a short presentation at 5:45pm.\n\nThe options form deadline is Friday 28th March.\n\nPlease contact the school office if you have any questions.\n\nKind regards,\nMr Hughes\nHead of Year 9", date: "19 Mar 2026", time: "10:15", hasReply: false },
              { id: 9, subject: "Science trip to Natural History Museum", sender: "Dr Anand", school: "Riverside Secondary", preview: "Year 9 have been offered a trip to the Natural History Museum on Friday 4th April. The cost is £18 per student...", body: "Dear Parents/Carers,\n\nYear 9 have been offered a trip to the Natural History Museum on Friday 4th April.\n\nThe cost is £18 per student, which covers coach travel and a guided workshop. Students will need a packed lunch.\n\nPlease give consent and make payment via the app by Friday 21st March.\n\nStudents should wear school uniform and meet at the bus bay at 8:15am. We expect to return by 4:00pm.\n\nMany thanks,\nDr Anand\nHead of Science", date: "18 Mar 2026", time: "15:40", hasReply: false },
              { id: 10, subject: "Re: Ethan's homework extension", sender: "Mrs Clarke", school: "Riverside Secondary", preview: "Thanks for getting in touch. I'm happy to give Ethan until Monday to finish the essay given the circumstances...", body: "Dear Mrs Collini,\n\nThanks for getting in touch. I'm happy to give Ethan until Monday to finish the essay given the circumstances.\n\nHe's been doing really well in English this term so no concerns at all.\n\nBest wishes,\nMrs Clarke", date: "19 Feb 2026", time: "12:05", hasReply: true },
            ];
            const allSentMessages = [
              { id: 101, subject: "Molly's reading log", sender: "You", school: "Oakwood Primary", preview: "Hi Miss Taylor, just to let you know that Molly has lost her reading log book. Could she have a new one...", body: "Hi Miss Taylor,\n\nJust to let you know that Molly has lost her reading log book. Could she have a new one please?\n\nShe's been reading every evening so I'd hate for her to lose track.\n\nMany thanks", date: "21 Feb 2026", time: "19:45", hasReply: true },
              { id: 102, subject: "Absence notification – Lucas", sender: "You", school: "Oakwood Primary", preview: "Good morning, Lucas won't be in school today as he has a temperature. I'll keep you updated on when he'll...", body: "Good morning,\n\nLucas won't be in school today as he has a temperature. I'll keep you updated on when he'll be back.\n\nThank you", date: "17 Feb 2026", time: "07:52", hasReply: false },
              { id: 103, subject: "After school collection change – 14 Feb", sender: "You", school: "Oakwood Primary", preview: "Hi, just to let you know that Molly's grandmother will be collecting her today instead of me. Her name is...", body: "Hi,\n\nJust to let you know that Molly's grandmother will be collecting her today instead of me. Her name is Margaret Collini and she is on the approved list.\n\nThank you", date: "14 Feb 2026", time: "08:15", hasReply: false },
              { id: 105, subject: "Re: Homework club cancelled this week", sender: "You", school: "Oakwood Primary", preview: "Thanks for letting us know. Would you be able to confirm next week's session is going ahead as normal?", body: "Hi Mr Davies,\n\nThanks for letting us know.\n\nWould you be able to confirm that next week's session is going ahead as normal?\n\nMany thanks", date: "24 Feb 2026", time: "17:15", hasReply: false, originalMessage: { subject: "Homework club cancelled this week", sender: "Mr Davies", date: "24 Feb 2026", time: "16:30", body: "Dear Parents,\n\nJust to let you know that homework club will not be running this Thursday (27th Feb) due to staff training.\n\nNormal service will resume next Thursday.\n\nApologies for any inconvenience.\n\nMr Davies" } },
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

              const MessageBubble = ({ sender, body, date, time, delivered }) => {
                const isYou = sender === "You";
                const initials = isYou ? "KC" : sender.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <div style={{
                    marginBottom: 12,
                    borderRadius: 12,
                    border: `1px solid ${isYou ? "#c8edd2" : "#efefef"}`,
                    background: isYou ? "#F0FAF3" : "#fff",
                    overflow: "hidden",
                  }}>
                    {/* Message header */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: isYou ? "flex-end" : "flex-start",
                      padding: "8px 14px",
                      background: isYou ? "#e4f5ea" : "#fafafa",
                      borderBottom: `1px solid ${isYou ? "#c8edd2" : "#efefef"}`,
                    }}>
                      <div style={{ fontSize: 11, color: "#999" }}>{date} at {time}</div>
                    </div>
                    {/* Message body */}
                    <div style={{ padding: "14px 16px", fontSize: 14, color: "#555", lineHeight: 1.7, whiteSpace: "pre-line" }}>{body}</div>
                    {isYou && delivered !== undefined && (
                      <div style={{ padding: "0 16px 12px", display: "flex", alignItems: "center", gap: 4 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span style={{ fontSize: 11, color: "#888" }}>Delivered</span>
                      </div>
                    )}
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
                      <div style={{ fontSize: 11, color: "#999" }}>{replies.length > 0 ? (replies.length + 1) + " messages" : ""}</div>
                    </div>
                  </div>
                  {/* Thread content */}
                  <div ref={threadRef} style={{ flex: 1, overflowY: "auto", padding: "20px 16px", minHeight: 0, background: "#fff" }}>
                    {/* Original message */}
                    <MessageBubble sender={selectedMessage.sender} body={selectedMessage.body} date={selectedMessage.date} time={selectedMessage.time} />


                    {/* Replies */}
                    {replies.map((reply) => (
                      <MessageBubble key={reply.id} sender={reply.sender} body={reply.body} date={reply.date} time={reply.time} delivered={reply.delivered} />
                    ))}

                    {/* Collapsed original message (sent replies only) */}
                    {selectedMessage.originalMessage && (
                      <div style={{ marginTop: 8 }}>
                        <button
                          onClick={() => setShowOriginal(v => !v)}
                          style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", background: "none", border: "none", cursor: "pointer", padding: "6px 0", fontFamily: "inherit" }}
                        >
                          <div style={{ flex: 1, height: 1, background: "#efefef" }} />
                          <span style={{ fontSize: 11, color: "#999", flexShrink: 0 }}>
                            {showOriginal ? "Hide" : "Show"} original — {selectedMessage.originalMessage.date}
                          </span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, transform: showOriginal ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                            <path d="M2 4L6 8L10 4" stroke="#999" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div style={{ flex: 1, height: 1, background: "#efefef" }} />
                        </button>
                        {showOriginal && (
                          <div style={{ marginTop: 8 }}>
                            <MessageBubble sender={selectedMessage.originalMessage.sender} body={selectedMessage.originalMessage.body} date={selectedMessage.originalMessage.date} time={selectedMessage.originalMessage.time} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Reply input bar */}
                  {canReply && (
                    <div style={{ boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", background: "#fff", flexShrink: 0 }}>
                      <div style={{ padding: "8px 16px 4px", fontSize: 11, color: "#999" }}>Your reply will be sent to the school's shared inbox</div>
                      <div style={{ padding: "6px 16px 4px" }}>
                        <div style={{ position: "relative", borderRadius: 8, border: "1px solid var(--color-grey-200)", background: "var(--color-white)" }}>
                          <textarea
                            value={replyText}
                            onChange={(e) => { setReplyText(e.target.value); if (replyError) setReplyError(false); }}
                            placeholder="Write a reply..."
                            rows={1}
                            onInput={(e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px"; }}
                            style={{
                              display: "block", width: "100%", boxSizing: "border-box",
                              padding: "10px 52px 10px 14px", border: "none", borderRadius: 8, background: "transparent",
                              fontSize: "var(--font-size-3)", fontFamily: "var(--font-family-sans)", color: "var(--color-black)", resize: "none", outline: "none",
                              lineHeight: 1.4, minHeight: 40, maxHeight: 200, overflow: "auto",
                            }}
                          />
                          <button
                            onClick={handleSendReply}
                            disabled={replySending}
                            style={{
                              position: "absolute", bottom: 8, right: 8,
                              width: 36, height: 36, borderRadius: "var(--radius-round)", border: "none", flexShrink: 0,
                              background: "var(--color-brand-600)",
                              cursor: replySending ? "default" : "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                          >
                            {replySending ? (
                              <div style={{ width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9L15 3L9 15L8 10L3 9Z" fill="#fff" /></svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {replyError && (
                        <div style={{ padding: "0 16px 12px", fontSize: 12, color: "#B22929" }}>Please write a message before sending</div>
                      )}
                    </div>
                  )}
                  {/* No replies notice for Riverside */}
                  {!canReply && messagesFilter === "inbox" && (
                    <div style={{ padding: "12px 16px 16px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", background: "#fff", flexShrink: 0 }}>
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
              const enabledSchools = schools.filter(s => repliesEnabledSchools.includes(s));

              const handleSend = () => {
                if (composeSending) return;
                const errors = {};
                if (composeSubject.trim().length > subjectMax) errors.subject = "Subject is too long";
                if (!composeBody.trim()) errors.body = "Please write a message before sending";
                if (composeBody.trim().length > bodyMax) errors.body = "Message is too long";
                if (Object.keys(errors).length > 0) { setComposeErrors(errors); return; }
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
                    date: "4 Mar 2026",
                    time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
                    hasReply: false,
                    delivered: true,
                  };
                  setExtraSentMessages(prev => [sentMsg, ...prev]);
                  setComposeSending(false);
                  setShowCompose(false);
                  setMessagesFilter("sent");
                }, 1200);
              };

              return (
                <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.06)", flexShrink: 0 }}>
                    <button onClick={() => { setShowCompose(false); setComposeSending(false); }} className="btn-icon" style={{ width: 44, height: 44, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14 4L8 10L14 16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#333", flex: 1 }}>New message</span>
                  </div>
                  {/* Form */}
                  <div style={{ flex: 1, overflowY: "auto", minHeight: 0, background: "#fff" }}>
                    {/* To — fixed, not editable */}
                    <div style={{ padding: "16px 16px 0" }}>
                      <Input label="To" value={composeSchool || ""} disabled readOnly />
                    </div>
                    {/* Subject */}
                    <div style={{ padding: "16px 16px 0" }}>
                      <Input
                        label="Subject"
                        type="text"
                        value={composeSubject}
                        onChange={(e) => { setComposeSubject(e.target.value); setComposeErrors(prev => ({...prev, subject: undefined})); }}
                        placeholder="What is your message about?"
                        maxLength={subjectMax + 10}
                        state={composeErrors.subject ? "error" : "default"}
                        error={composeErrors.subject}
                      />
                    </div>
                    {/* Body */}
                    <div style={{ padding: "16px 16px 0" }}>
                      <TextArea
                        label="Message"
                        value={composeBody}
                        onChange={(e) => { setComposeBody(e.target.value); setComposeErrors(prev => ({...prev, body: undefined})); }}
                        placeholder="Write your message..."
                        rows={8}
                        maxLength={bodyMax + 100}
                        state={composeErrors.body ? "error" : "default"}
                        error={composeErrors.body}
                      />
                    </div>
                  </div>
                  {/* Fixed bottom CTA */}
                  <div style={{ padding: "12px 16px 20px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06)", background: "var(--color-white)", flexShrink: 0 }}>
                    <div style={{ fontSize: 11, color: "#999", marginBottom: 8 }}>Your message will be sent to the school's shared inbox</div>
                    <Button variant="primary" style={{ width: "100%" }} onClick={handleSend} disabled={composeSending}>
                      {composeSending ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 14, height: 14, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                          Sending
                        </div>
                      ) : "Send message"}
                    </Button>
                  </div>
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
                            {isUnread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-brand-600)" }} />}
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
                    onClick={() => { setShowCompose(true); setComposeSchool(activeSchool); setComposeSubject(""); setComposeBody(""); setComposeErrors({}); }}
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

          {!subPage && activeTab !== "book-pay" && activeTab !== "home" && activeTab !== "messages" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                minHeight: 400,
              }}
            >
              <p style={{ color: "#bbb", fontSize: 14, textAlign: "center" }}>
                {activeTab === "my-child" && "My child — placeholder"}
              </p>
            </div>
          )}
        </div>

        {!selectedMessage && !showCompose && (
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
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Details</div>
                        {[
                          { label: "Full name", value: activeChild.name + " Collini" },
                          { label: "Date of birth", value: activeChild.id === 1 ? "15 March 2018" : activeChild.id === 2 ? "22 September 2019" : "8 June 2012" },
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
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Medical & dietary</div>
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
                              <span style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>Past consents ({childNoticesResponded.length})</span>
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
        </>)}
        </>)}
      </div>
    </div>
    </>
  );
}
