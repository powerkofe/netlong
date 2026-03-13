"use client";
import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #080c10;
    color: #c8d4e0;
    font-family: 'DM Sans', sans-serif;
  }

  .app {
    min-height: 100vh;
    background: #080c10;
    padding: 32px 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    margin-bottom: 40px;
  }

  .header-label {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #4a6080;
    margin-bottom: 12px;
  }

  .header-title {
    font-family: 'Space Mono', monospace;
    font-size: 28px;
    font-weight: 700;
    color: #e8f0f8;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .header-sub {
    font-size: 14px;
    color: #5a7090;
    font-weight: 300;
  }

  .tabs {
    display: flex;
    gap: 0;
    margin-bottom: 32px;
    border: 1px solid #1a2a3a;
    border-radius: 6px;
    overflow: hidden;
    width: fit-content;
  }

  .tab {
    padding: 10px 28px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    background: transparent;
    color: #4a6080;
    transition: all 0.2s;
    border-right: 1px solid #1a2a3a;
  }

  .tab:last-child { border-right: none; }

  .tab.active-cn {
    background: #0d2a1a;
    color: #3ddc84;
  }

  .tab.active-us {
    background: #0d1f35;
    color: #4d9fff;
  }

  .tab:hover:not(.active-cn):not(.active-us) {
    background: #111820;
    color: #8aabcc;
  }

  /* Tree layout */
  .tree {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .regime-block {
    border: 1px solid #1a2a3a;
    border-radius: 8px;
    margin-bottom: 16px;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .regime-block:hover {
    border-color: #2a3f55;
  }

  .regime-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    cursor: pointer;
    background: #0c1520;
    user-select: none;
  }

  .regime-header:hover {
    background: #0f1c2a;
  }

  .regime-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .regime-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .regime-name {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #dce8f4;
    letter-spacing: 0.5px;
  }

  .regime-signal {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    padding: 3px 10px;
    border-radius: 3px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .signal-bull { background: #0d2a1a; color: #3ddc84; border: 1px solid #1a4a2a; }
  .signal-bear { background: #2a0d0d; color: #ff5555; border: 1px solid #4a1a1a; }
  .signal-neutral { background: #1a1a2a; color: #9999cc; border: 1px solid #2a2a4a; }
  .signal-rotate { background: #2a1d0d; color: #ffaa44; border: 1px solid #4a3a1a; }

  .chevron {
    color: #3a5570;
    font-size: 16px;
    transition: transform 0.2s;
    font-family: 'Space Mono', monospace;
  }
  .chevron.open { transform: rotate(90deg); }

  .regime-body {
    padding: 20px 24px 24px;
    background: #080c12;
    border-top: 1px solid #1a2a3a;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 700px) {
    .regime-body { grid-template-columns: 1fr; }
  }

  .section-title {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #3a5570;
    margin-bottom: 12px;
  }

  .signal-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .signal-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    color: #8aabcc;
    font-weight: 300;
    line-height: 1.4;
  }

  .signal-bullet {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #3a5570;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .plays-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .play-card {
    background: #0d1820;
    border: 1px solid #1a2a3a;
    border-radius: 5px;
    padding: 10px 14px;
  }

  .play-sector {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  .play-note {
    font-size: 12px;
    color: #5a7590;
    font-weight: 300;
  }

  .risk-box {
    grid-column: 1 / -1;
    background: #150e0e;
    border: 1px solid #2a1a1a;
    border-radius: 5px;
    padding: 12px 16px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .risk-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #884444;
    letter-spacing: 1px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .risk-text {
    font-size: 12px;
    color: #886666;
    font-weight: 300;
    line-height: 1.5;
  }

  .divider {
    height: 1px;
    background: #1a2a3a;
    margin: 4px 0 20px;
  }

  .legend {
    display: flex;
    gap: 20px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #4a6080;
    font-family: 'Space Mono', monospace;
  }

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .note-bar {
    background: #0c1520;
    border: 1px solid #1a2a3a;
    border-radius: 6px;
    padding: 14px 18px;
    margin-top: 8px;
    font-size: 12px;
    color: #4a6080;
    font-family: 'Space Mono', monospace;
    line-height: 1.6;
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CHINA_REGIMES = [
  {
    id: "reform_accelerate",
    name: "Reform Acceleration",
    dot: "#3ddc84",
    signal: "BULL",
    signalClass: "signal-bull",
    triggers: [
      "NPC / Plenum signals marketization",
      "CSRC relaxes margin / IPO rules",
      "State media: 'markets play decisive role'",
      "Five-Year Plan includes new priority sectors",
      "PBOC RRR cut or LPR cut",
    ],
    sectors: [
      { name: "CONSUMER DISCRETIONARY", note: "Domestic demand unlock — auto, travel, premium retail" },
      { name: "FINANCIALS (non-banks)", note: "Brokerage, fund managers — volumes surge" },
      { name: "POLICY PRIORITY SECTORS", note: "EVs, semis, AI — per current 5-Year Plan" },
      { name: "SOE 'NATIONAL CHAMPIONS'", note: "Get preferential credit + order flow" },
    ],
    risk: "Policy is reversible. CSRC can halt circuit-breakers overnight. Always watch for People's Daily tone shift from 'reform' to 'stability'.",
  },
  {
    id: "stimulus_pump",
    name: "Stimulus / National Team",
    dot: "#88ffcc",
    signal: "BULL",
    signalClass: "signal-bull",
    triggers: [
      "State media hints '国家队' (national team) is buying",
      "Xinhua: market stability is a 'political task'",
      "Shanghai Composite below key psychological level",
      "Politburo economic meeting ahead of holidays",
      "PBOC announces broad-based easing",
    ],
    sectors: [
      { name: "CSI 300 / ETF BASKET", note: "National team buys index-weighted large caps first" },
      { name: "STATE BANKS", note: "ICBC, CCB — net beneficiaries of directed liquidity" },
      { name: "INFRASTRUCTURE", note: "Rail, power grid — fiscal stimulus conduit" },
      { name: "DEFENSE + AEROSPACE", note: "Geopolitical signaling window = budget expansion" },
    ],
    risk: "Reflexive rally — prices go up because state is buying, not fundamentals. Exit when CSRC stops publishing daily buy data or media goes quiet.",
  },
  {
    id: "common_prosperity",
    name: "Common Prosperity / Crackdown",
    dot: "#ff5555",
    signal: "BEAR",
    signalClass: "signal-bear",
    triggers: [
      "Xi speech uses '共同富裕' repeatedly",
      "SAMR fines / antitrust investigations against tech",
      "Education sector regulation rumors",
      "State media targets 'disorderly capital expansion'",
      "Regulatory 'rectification' notices (整改)",
    ],
    sectors: [
      { name: "INTERNET / PLATFORM TECH", note: "Alibaba, Tencent, Meituan — direct regulatory targets" },
      { name: "FOR-PROFIT EDUCATION", note: "Near-zero after 2021 decree — structural short" },
      { name: "PROPERTY DEVELOPERS", note: "Three Red Lines → Evergrande cascade risk" },
      { name: "OFFSHORE LISTINGS (ADRs)", note: "Data security law + VIE structure risk compounds" },
    ],
    risk: "Crackdowns can pause or reverse (Xi tech re-embrace 2023). Never go max short — state controls the tape. Size positions as long puts or reduced longs, not outright shorts.",
  },
  {
    id: "property_stress",
    name: "Property Sector Stress",
    dot: "#ffaa44",
    signal: "ROTATE",
    signalClass: "signal-rotate",
    triggers: [
      "Major developer misses USD bond coupon",
      "'Mortgage boycott' viral social media",
      "New home sales YoY -30% or worse",
      "Land auction premiums collapse",
      "Local gov fiscal revenue falls sharply",
    ],
    sectors: [
      { name: "EXIT: DEVELOPERS + BANKS", note: "H-share property index, city commercial banks" },
      { name: "ROTATE TO: HARD TECH", note: "Semis, industrial automation — policy redirect signal" },
      { name: "ROTATE TO: NEW ENERGY", note: "Solar, batteries — CATL, Longi: state priority stays" },
      { name: "COMMODITIES HEDGE", note: "Steel / cement flat or short; copper ambiguous" },
    ],
    risk: "Property is 25-30% of GDP. Full Minsky moment would hit all Chinese equities. Real risk is contagion to trust products (信托) and shadow banking implosion.",
  },
  {
    id: "geopolitical_escalation",
    name: "Geopolitical Escalation",
    dot: "#cc4444",
    signal: "BEAR",
    signalClass: "signal-bear",
    triggers: [
      "Taiwan Strait military exercises escalate",
      "US entity list expands (chip, AI firms)",
      "Delisting threats for US-listed Chinese ADRs",
      "Export controls on critical minerals (retaliation)",
      "MSCI / FTSE reweights China down",
    ],
    sectors: [
      { name: "OFFSHORE CHINA (H/ADR)", note: "Most exposed to foreign investor exit" },
      { name: "SEMICONDUCTOR SUPPLY CHAIN", note: "SMIC, Hua Hong — AMAT / ASML cut-off risk" },
      { name: "DEFENSE + SELF-SUFFICIENCY", note: "Aviation, nuclear, rare earth — potential longs" },
      { name: "A-SHARE DOMESTIC", note: "Relatively insulated if domestic story intact" },
    ],
    risk: "Escalation risk is non-linear. Regime change in signaling (e.g. PLA live fire near Taiwan) can gap down A-shares 10% overnight. Position size matters more than direction.",
  },
  {
    id: "recovery_post_shock",
    name: "Post-Shock Recovery",
    dot: "#9999cc",
    signal: "NEUTRAL",
    signalClass: "signal-neutral",
    triggers: [
      "Crackdown officially declared 'completed'",
      "CSRC restores IPO channel",
      "Xi meets tech CEOs publicly (legitimizing)",
      "NPC sets GDP target ≥5% with fiscal support",
      "Foreign inflows via Stock Connect resume",
    ],
    sectors: [
      { name: "BATTERED TECH REBOUND", note: "Tencent, Alibaba — mean reversion from extreme discount" },
      { name: "CONSUMER STAPLES", note: "Baijiu, dairy — domestic resilience regardless of cycle" },
      { name: "HEALTHCARE", note: "Aging demographics + policy priority = structural long" },
      { name: "A-SHARE SMALL CAP", note: "Beaten-down names with domestic exposure recover fastest" },
    ],
    risk: "Reflexivity trap: apparent recovery can be head-fake before next crackdown wave. Use Soros boom-bust framework — watch for second-order narrative shift, not just price.",
  },
];

const US_REGIMES = [
  {
    id: "fed_easing",
    name: "Fed Easing Cycle (ZIRP / QE)",
    dot: "#4d9fff",
    signal: "BULL",
    signalClass: "signal-bull",
    triggers: [
      "Fed cuts rates 50bps or signals dovish pivot",
      "Fed balance sheet expansion (QE announcement)",
      "Unemployment rising / FOMC signals 'labor market'",
      "Yield curve steepens (short rates fall faster)",
      "Credit spreads tighten post-cut",
    ],
    sectors: [
      { name: "GROWTH / LONG-DURATION TECH", note: "Duration play — ZIRP = infinite DCF runway; Nasdaq levitates" },
      { name: "REAL ESTATE + HOMEBUILDERS", note: "Mortgage rates fall; housing demand unlocks; Fed Put active" },
      { name: "PRIVATE EQUITY / ALTS", note: "Cheap leverage → buyouts + cap table expansion" },
      { name: "HIGH YIELD CREDIT", note: "Spread compression = equity-like returns in credit" },
    ],
    risk: "Greenspan/Bernanke/Yellen/Powell Put creates moral hazard accumulation. The longer the cycle, the bigger the Minsky moment when the Put expires. Size for eventual volatility.",
  },
  {
    id: "volcker_tightening",
    name: "Volcker-Style Tightening",
    dot: "#ff5555",
    signal: "BEAR",
    signalClass: "signal-bear",
    triggers: [
      "CPI print well above 5% for 3+ months",
      "Fed Chair uses word 'unconditional' re: inflation",
      "50bps+ hike + QT simultaneous",
      "Real rates turn positive (10Y TIPS > 0)",
      "Fed explicitly willing to accept recession",
    ],
    sectors: [
      { name: "EXIT: LONG DURATION TECH", note: "Rate shock hits DCF hardest — 2022 Nasdaq -33% playbook" },
      { name: "EXIT: UNPROFITABLE GROWTH", note: "Zero revenue multiples evaporate; SPACs collapse" },
      { name: "LONG: ENERGY", note: "Inflation hedge; oil/gas cash flows independent of rates" },
      { name: "LONG: FINANCIALS (selective)", note: "Net interest margin expansion for banks with deposit franchise" },
    ],
    risk: "Fed may over-tighten into recession (1981-82 playbook). If FOMC causes unemployment spike, watch for rapid pivot back to easing — the Volcker Put eventually becomes a Volcker Give.",
  },
  {
    id: "goldilocks",
    name: "Goldilocks / Great Moderation",
    dot: "#88ccff",
    signal: "BULL",
    signalClass: "signal-bull",
    triggers: [
      "CPI 2-3%, unemployment 4%, GDP 2-3%",
      "FOMC on hold or gradual cuts",
      "Credit spreads tight, VIX below 15",
      "Earnings season beats broadly",
      "Dollar stable, yield curve normal slope",
    ],
    sectors: [
      { name: "BROAD INDEX LONG", note: "S&P 500 / QQQ — beta to everything working" },
      { name: "QUALITY COMPOUNDERS", note: "Berkshire-style: pricing power + moat + FCF" },
      { name: "SEMICONDUCTORS", note: "Capex cycle + AI demand = secular growth in Goldilocks" },
      { name: "CONSUMER DISCRETIONARY", note: "Employed consumers with positive wealth effect spend" },
    ],
    risk: "Goldilocks is the regime that breeds LTCM-style overconfidence. Stability destabilizes (Minsky). Watch leverage accumulation in shadow banking — it's always invisible until it isn't.",
  },
  {
    id: "credit_crisis",
    name: "Credit / Liquidity Crisis",
    dot: "#ff8844",
    signal: "BEAR",
    signalClass: "signal-bear",
    triggers: [
      "Investment grade spreads blow out >200bps",
      "Commercial paper market seizes (2008 playbook)",
      "Money market fund breaks the buck",
      "Repo market stress (overnight rates spike)",
      "Bank CDS prices surge simultaneously",
    ],
    sectors: [
      { name: "EXIT EVERYTHING LEVERAGED", note: "Correlation goes to 1 in panic — LTCM lesson" },
      { name: "LONG UST / GOLD", note: "Flight to safety + monetary metal; hold until Fed acts" },
      { name: "WATCH: FED ANNOUNCEMENT", note: "Greenspan/Bernanke/Powell put WILL activate — time it" },
      { name: "RELOAD ON QUALITY POST-FED", note: "Best entry of the cycle comes 2-6 weeks after FOMC emergency cut" },
    ],
    risk: "Fire sales create correlation=1 across all assets. Margin calls force selling of good assets alongside bad (LTCM 1998, GFC 2008). Hold cash; opportunity window opens fast and closes faster.",
  },
  {
    id: "stagflation",
    name: "Stagflation / Supply Shock",
    dot: "#dd8844",
    signal: "ROTATE",
    signalClass: "signal-rotate",
    triggers: [
      "Oil +50% YoY + supply chain disruption",
      "CPI elevated while PMI contracting",
      "Fed in impossible position (hike into recession?)",
      "Real wages falling despite nominal wage growth",
      "Unemployment rising AND inflation above 5%",
    ],
    sectors: [
      { name: "COMMODITIES", note: "Hard assets outperform paper in stagflation — 1970s playbook" },
      { name: "ENERGY MAJORS", note: "Integrated oil: cash flows + buybacks; natural hedge" },
      { name: "DEFENSE / INDUSTRIALS", note: "Government spending = real demand regardless of inflation" },
      { name: "SHORT: CONSUMER DISCRETIONARY", note: "Real income squeeze hits cyclical consumer hardest" },
    ],
    risk: "Stagflation destroys traditional 60/40 allocation. Bonds AND equities fall simultaneously. Net long managers need higher cash buffer and commodity overlay — the Volcker Shock eventually breaks it.",
  },
  {
    id: "bubble_mania",
    name: "Narrative Bubble / Reflexivity Phase",
    dot: "#ddaaff",
    signal: "ROTATE",
    signalClass: "signal-rotate",
    triggers: [
      "One sector P/E > 5x historical average",
      "IPO market frenzied (dot-com: 39% of VC in internet)",
      "Retail participation surges (options volume, Reddit)",
      "Traditional metrics dismissed as 'old paradigm'",
      "Parabolic price action + mainstream media FOMO",
    ],
    sectors: [
      { name: "RIDE EARLY (Soros reflexivity)", note: "Buy when narrative starts, trend IS the fundamental" },
      { name: "EXIT BEFORE CONSENSUS PEAK", note: "Sell when CNBC is bullish AND grandma is asking about it" },
      { name: "ROTATE TO VALUE / DEFENSIVES", note: "Dot-com bust: energy +200%, staples +60%, tech -80%" },
      { name: "TAIL HEDGE VIA PUTS", note: "Buy OTM puts on bubble sector — cheap in low VIX environment" },
    ],
    risk: "Timing reflexive bubbles is the hardest trade. Soros: 'markets can remain irrational longer than you can remain solvent.' Small position sizes. Reflexivity can overshoot 3-10x before reverting.",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

function RegimeBlock({ regime, accentColor }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="regime-block" style={open ? { borderColor: accentColor + "44" } : {}}>
      <div className="regime-header" onClick={() => setOpen(!open)}>
        <div className="regime-left">
          <div className="regime-dot" style={{ background: regime.dot, boxShadow: `0 0 8px ${regime.dot}66` }} />
          <span className="regime-name">{regime.name}</span>
          <span className={`regime-signal ${regime.signalClass}`}>{regime.signal}</span>
        </div>
        <span className={`chevron ${open ? "open" : ""}`}>›</span>
      </div>

      {open && (
        <div className="regime-body">
          <div>
            <div className="section-title">// Regime Triggers</div>
            <ul className="signal-list">
              {regime.triggers.map((t, i) => (
                <li key={i} className="signal-item">
                  <span className="signal-bullet">→</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="section-title">// Sector Plays</div>
            <div className="plays-grid">
              {regime.sectors.map((s, i) => (
                <div key={i} className="play-card" style={{ borderColor: accentColor + "22" }}>
                  <div className="play-sector" style={{ color: accentColor }}>{s.name}</div>
                  <div className="play-note">{s.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="risk-box">
            <span className="risk-label">RISK//</span>
            <span className="risk-text">{regime.risk}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [market, setMarket] = useState("cn");
  const isCN = market === "cn";

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="header">
          <div className="header-label">Fund Manager Playbook · Policy Regime Framework</div>
          <div className="header-title">Net Long Decision Tree</div>
          <div className="header-sub">
            Based on Soros reflexivity · Minsky instability · Fed Put / Beijing Put mechanics
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${isCN ? "active-cn" : ""}`}
            onClick={() => setMarket("cn")}
          >
            🇨🇳 China A-Share
          </button>
          <button
            className={`tab ${!isCN ? "active-us" : ""}`}
            onClick={() => setMarket("us")}
          >
            🇺🇸 US Equities
          </button>
        </div>

        <div className="legend">
          <div className="legend-item"><div className="legend-dot" style={{ background: "#3ddc84" }} /> BULL — add exposure</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: "#ff5555" }} /> BEAR — reduce / hedge</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: "#ffaa44" }} /> ROTATE — shift sectors</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: "#9999cc" }} /> NEUTRAL — selective</div>
        </div>

        <div className="divider" />

        <div className="tree">
          {(isCN ? CHINA_REGIMES : US_REGIMES).map(r => (
            <RegimeBlock
              key={r.id}
              regime={r}
              accentColor={isCN ? "#3ddc84" : "#4d9fff"}
            />
          ))}
        </div>

        <div className="note-bar">
          {isCN
            ? "// CHINA NOTE: Policy IS the market. CSRC is the market maker. Always cross-reference NPC readouts, PBOC statements, and People's Daily editorials. Reflexive cycles compress and expand faster than US markets due to retail dominance (~70% of volume) and absence of independent short-selling."
            : "// US NOTE: Fed cycle IS the tide. Every sector play is downstream of real rates. The Greenspan Put created a 35-year assumption of asymmetric central bank support — but 2022 proved the Put only exists in low-inflation regimes. Map your regime before sizing."}
        </div>
      </div>
    </>
  );
}
