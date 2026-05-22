import { useState } from 'react';
import { Card } from '@tonyarbor/components';
import { Utensils, Shapes, SunMoon, Bus, ShoppingBag, ClipboardList, Wallet } from 'lucide-react';

const sectionTitle = {
  fontSize: 14,
  fontWeight: 500,
  color: "var(--color-grey-700)",
  marginBottom: 8,
};

export default function BookPayLandingV2({
  mealsBalance = 3.20,
  wraparoundBalance = 24.00,
  lowFundsThreshold = 5.0,
  bookingsNeedsAttentionCount = 0,
  selectedChild,
  setSubPage,
  setBookingsFilter,
  setTxHistoryAccount,
  setBrowseFilter,
  setStandaloneTopUpAccount,
  setTopUpAmount,
  setShowStandaloneTopUp,
  setStandaloneTopUpAddedToBasket,
  setStandaloneTopUpSuccess,
}) {
  const milkBalance = -5.20;
  const childName = selectedChild?.name || "Molly";
  const [upcomingState, setUpcomingState] = useState("has-upcoming");
  const upcomingCount = 3;
  const pastCount = 4;

  const accounts = [
    { id: "meals",      label: "Meals",      balance: mealsBalance,      Icon: Utensils },
    { id: "wraparound", label: "Wraparound", balance: wraparoundBalance, Icon: SunMoon },
    { id: "milk",       label: "Milk",       balance: milkBalance,       Icon: Wallet },
  ];

  const hasAccounts = accounts.length > 0;
  const overdrawnAccounts = accounts.filter((a) => a.balance < 0);
  const lowAccounts = accounts.filter((a) => a.balance > 0 && a.balance <= lowFundsThreshold);

  const openAccountTopUp = (id, amount) => {
    setStandaloneTopUpAccount(id);
    setTopUpAmount(amount);
    setShowStandaloneTopUp(true);
    setStandaloneTopUpAddedToBasket(false);
    setStandaloneTopUpSuccess(false);
  };

  const formatBalance = (value) =>
    value < 0 ? `−£${Math.abs(value).toFixed(2)}` : `£${value.toFixed(2)}`;

  return (
    <div style={{ backgroundColor: "var(--color-grey-050)", minHeight: "100%", padding: "20px 16px 32px", display: "flex", flexDirection: "column", gap: 24, overflowY: "auto" }}>

      {/* Needs attention */}
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {overdrawnAccounts.map((account) => (
            <Card key={`overdrawn-${account.id}`} padding="none" style={{ background: "var(--color-destructive-050)", border: "1px solid var(--color-border-destructive)" }}>
              <div style={{ padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <account.Icon size={16} color="var(--color-destructive-800)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "var(--font-size-4)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-destructive-800)", lineHeight: 1.3 }}>Balance needs topping up</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
                    <span style={{ fontSize: "var(--font-size-3)", fontWeight: "var(--font-weight-regular)", color: "var(--color-destructive-800)" }}>{account.label} · £{Math.abs(account.balance).toFixed(2)} owed for Molly</span>
                    <button onClick={() => openAccountTopUp(account.id, Math.abs(account.balance))} style={{ background: "none", border: "none", padding: 0, fontSize: "var(--font-size-3)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-destructive-800)", textDecoration: "underline", cursor: "pointer", fontFamily: "inherit" }}>Top up</button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {lowAccounts.map((account) => (
            <Card key={`low-${account.id}`} padding="none" style={{ background: "var(--color-warning-050)", border: "1px solid var(--color-border-warning)" }}>
              <div style={{ padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <account.Icon size={16} color="var(--color-warning-800)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "var(--font-size-4)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-warning-800)", lineHeight: 1.3 }}>Balance is running low</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
                    <span style={{ fontSize: "var(--font-size-3)", fontWeight: "var(--font-weight-regular)", color: "var(--color-warning-800)" }}>{account.label} · £{account.balance.toFixed(2)} left for Molly</span>
                    <button onClick={() => openAccountTopUp(account.id, 10)} style={{ background: "none", border: "none", padding: 0, fontSize: "var(--font-size-3)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-warning-800)", textDecoration: "underline", cursor: "pointer", fontFamily: "inherit" }}>Top up</button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          <Card padding="none" style={{ background: "var(--color-warning-050)", border: "1px solid var(--color-border-warning)" }}>
            <div style={{ padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <Shapes size={16} color="var(--color-warning-800)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "var(--font-size-4)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-warning-800)", lineHeight: 1.3 }}>Outstanding payment</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
                  <span style={{ fontSize: "var(--font-size-3)", fontWeight: "var(--font-weight-regular)", color: "var(--color-warning-800)" }}>Drumming · £12.00 due</span>
                  <button onClick={() => { setBookingsFilter("needs-attention"); setSubPage("my-bookings"); }} style={{ background: "none", border: "none", padding: 0, fontSize: "var(--font-size-3)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-warning-800)", textDecoration: "underline", cursor: "pointer", fontFamily: "inherit" }}>Pay now</button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bookings & orders — destination card */}
      <div>
        <Card padding="none">
          <button
            onClick={() => { setBookingsFilter(upcomingState === "has-upcoming" ? "upcoming" : "past"); setSubPage("my-bookings"); }}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
          >
            <ClipboardList size={20} color="var(--color-grey-900)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "var(--font-size-4)", fontWeight: 600, color: "var(--color-text-primary)" }}>Bookings &amp; orders</div>
              <div style={{ fontSize: "var(--font-size-3)", color: "var(--color-text-secondary)", marginTop: 2 }}>
                {upcomingState === "has-upcoming"
                  ? `${upcomingCount} upcoming booking${upcomingCount === 1 ? "" : "s"}`
                  : upcomingState === "no-upcoming-has-past"
                  ? `No upcoming · ${pastCount} past`
                  : "Nothing booked yet"}
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M6 4L10 8L6 12" stroke="var(--color-icon-default)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </Card>
      </div>

      {/* Balances */}
      {hasAccounts && (
      <div>
        {accounts.length > 1 && <div style={sectionTitle}>Balances</div>}
        <Card padding="none" style={{ overflow: "hidden" }}>
          {accounts.map((account, i, arr) => {
            const overdrawn = account.balance < 0;
            return (
            <div key={account.id}>
              <button
                onClick={() => { setTxHistoryAccount(account.id); setSubPage("tx-history"); }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
              >
                <account.Icon size={20} color="var(--color-grey-900)" strokeWidth={1.5} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: "var(--font-size-3)", fontWeight: "var(--font-weight-regular)", color: "var(--color-text-secondary)", lineHeight: "var(--font-line-height-tight)" }}>{account.label}</span>
                  <span style={{ fontSize: "var(--font-size-6)", fontWeight: overdrawn ? "var(--font-weight-semibold)" : "var(--font-weight-medium)", color: overdrawn ? "var(--color-text-destructive)" : "var(--color-text-primary)", fontVariantNumeric: "tabular-nums", lineHeight: "var(--font-line-height-tight)" }}>{formatBalance(account.balance)}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}><path d="M6 4L10 8L6 12" stroke="var(--color-icon-default)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {i < arr.length - 1 && <div style={{ height: 1, background: "var(--color-grey-100)", margin: "0 16px" }} />}
            </div>
            );
          })}
        </Card>
      </div>
      )}

      {/* Browse & book */}
      <div>
        <div style={sectionTitle}>Browse &amp; book</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { id: "clubs",           label: "Clubs",            icon: <Shapes size={20} color="var(--color-brand-600)" strokeWidth={1.5} />,   onClick: () => { setBrowseFilter("clubs"); setSubPage("browse"); } },
            { id: "wraparound",      label: "Wraparound",       icon: <SunMoon size={20} color="var(--color-brand-600)" strokeWidth={1.5} />,   onClick: () => { setBrowseFilter("wraparound"); setSubPage("browse"); } },
            { id: "meals",           label: "Meals",            icon: <Utensils size={20} color="var(--color-brand-600)" strokeWidth={1.5} />,   onClick: null },
            { id: "trips",           label: "Trips",            icon: <Bus size={20} color="var(--color-brand-600)" strokeWidth={1.5} />,        onClick: null },
            { id: "parents-evening", label: "Parents' eve", icon: (
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="5" width="22" height="19" rx="2.5" stroke="var(--color-brand-600)" strokeWidth="1.5" />
                <path d="M3 11H25" stroke="var(--color-brand-600)" strokeWidth="1.5" />
                <path d="M9 3V6" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M19 3V6" stroke="var(--color-brand-600)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="17" r="1.8" fill="var(--color-brand-600)" opacity="0.8" />
                <circle cx="18" cy="17" r="1.8" fill="var(--color-brand-600)" opacity="0.8" />
              </svg>
            ), onClick: null },
            { id: "school-shop",     label: "School shop",      icon: <ShoppingBag size={20} color="var(--color-brand-600)" strokeWidth={1.5} />, onClick: null },
          ].map((item) => (
            <Card key={item.id} padding="none" style={{ cursor: item.onClick ? "pointer" : "default", border: "none", boxShadow: "none", borderRadius: "var(--radius-l)" }}>
              <div
                onClick={item.onClick || undefined}
                style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, padding: "10px 14px" }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--color-brand-050)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0, alignSelf: "stretch", display: "flex", alignItems: "center", fontSize: "var(--font-size-4)", fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.15 }}>{item.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
