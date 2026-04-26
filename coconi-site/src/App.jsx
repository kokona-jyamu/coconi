import { useState } from "react";

// ─── カラー定義 ───────────────────────────────────────────
// --bg:      #FFFFFF  背景
// --bg2:     #F7F7F5  薄グレー背景
// --bg3:     #F0EEE9  セクション背景
// --ink:     #2C3D28  メインテキスト（墨緑）
// --ink-sub: #6B7F66  サブテキスト
// --matcha:  #4A6741  アクセント（抹茶）
// --matcha2: #6B8F5E  抹茶ライト
// --matcha3: #C2D6BA  抹茶ペール
// --border:  rgba(44,61,40,0.12)

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #FFFFFF;
    --bg2: #F7F7F5;
    --bg3: #F0EEE9;
    --ink: #2C3D28;
    --ink-mid: #3D5238;
    --ink-sub: #6B7F66;
    --matcha: #4A6741;
    --matcha2: #6B8F5E;
    --matcha3: #C2D6BA;
    --border: rgba(44,61,40,0.12);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--ink); line-height: 1.7; font-size: 15px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-1 { animation: fadeUp 0.7s ease forwards; }
  .animate-2 { animation: fadeUp 0.7s 0.10s ease forwards; opacity: 0; }
  .animate-3 { animation: fadeUp 0.7s 0.18s ease forwards; opacity: 0; }
  .animate-4 { animation: fadeUp 0.7s 0.24s ease forwards; opacity: 0; }
  .animate-5 { animation: fadeUp 0.7s 0.30s ease forwards; opacity: 0; }
  .animate-6 { animation: fadeUp 0.7s 0.36s ease forwards; opacity: 0; }
  .animate-7 { animation: fadeUp 0.7s 0.20s ease forwards; opacity: 0; }
`;

// ─── DATA ────────────────────────────────────────────────

const services = [
  {
    icon: "Nutrition",
    title: "食育・メニュー開発・発信",
    desc: "栄養学に基づくメニュー監修から食育活動・献立作成・SNS発信まで対応します。",
    tags: ["メニュー開発", "食育", "献立作成", "SNS発信"],
  },
  {
    icon: "Engineering",
    title: "Web制作・システム開発",
    desc: "要件定義・設計からリリースまで一貫対応。HP制作・API連携・イベントサイト制作。",
    tags: ["HP制作", "要件定義", "API連携", "イベントサイト"],
  },
  {
    icon: "Marketing",
    title: "集客・マーケティング支援",
    desc: "MEO・SEO対策からSNS運用代行まで。現場目線で実践的な施策を実行します。",
    tags: ["MEO対策", "SEO対策", "SNS運用代行", "集客施策"],
  },
  {
    icon: "HR & Operations",
    title: "組織・人事サポート",
    desc: "採用・人事・メンタルヘルスケアを含む組織づくりを現場からサポートします。",
    tags: ["人事・採用", "メンタルヘルス", "業務改善"],
  },
];

const works = [
  { cat: "Nutrition", title: "お弁当販売・月一おばんざい出店", desc: "栄養バランスを考えたお弁当の企画・販売、月次イベントでのおばんざい出店を担当。", badge: "管理栄養士" },
  { cat: "Nutrition", title: "子ども食堂での食育活動", desc: "食育プログラムを実施。食への関心・知識を楽しく伝える活動を継続中。", badge: "管理栄養士" },
  { cat: "Nutrition", title: "献立作成・SNS発信", desc: "栄養学に基づく献立の作成および、食に関するSNSコンテンツの企画・発信。", badge: "管理栄養士" },
  { cat: "Engineering", title: "カフェ公式HPの制作", desc: "要件定義からデザイン・実装・リリースまで一貫担当。来店促進につながるUIを設計。", badge: "エンジニア" },
  { cat: "Engineering", title: "HPから遷移するイベントサイト制作", desc: "カフェのHPと連携したイベント専用サイトを制作。告知・集客の動線を設計。", badge: "エンジニア" },
  { cat: "Marketing", title: "MEO・SEO対策で集客実績を創出", desc: "MEO・SEO施策を立案・実行し、検索流入・来店数の向上に貢献。", badge: "マーケティング" },
  { cat: "Marketing", title: "SNS運用代行", desc: "企業・店舗のSNSアカウント運用を代行。コンテンツ企画・投稿・分析を一括対応。", badge: "マーケティング" },
  { cat: "HR", title: "小規模会社の人事・採用担当", desc: "採用業務全般に加え、メンタルヘルスケアを重視した組織づくりをサポート。", badge: "人事・組織" },
];

const pillars = [
  { num: "01", title: "専門知識の掛け算", desc: "食・IT・マーケ・人事の複合視点で、課題の本質を捉えます。" },
  { num: "02", title: "現場に寄り添う姿勢", desc: "小規模チームでも丁寧に。長期的なパートナーとして伴走します。" },
  { num: "03", title: "AI時代の人間力", desc: "感情・文脈・関係性を読む力で、代替されない価値を届けます。" },
];

// ─── CONTACT FORM ────────────────────────────────────────

const jobTypes = ["食育・メニュー開発", "Web制作・システム開発", "MEO・SEO・SNS運用", "人事・組織サポート", "複数・その他"];
const budgets  = ["〜3万円", "3〜10万円", "10〜30万円", "30万円〜", "継続契約", "未定・相談したい"];

function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", jobType: "", budget: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "お名前を入力してください";
    if (!form.company.trim()) e.company = "会社名・屋号を入力してください";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "正しいメールアドレスを入力してください";
    if (!form.jobType)        e.jobType = "お仕事の種類を選択してください";
    if (!form.budget)         e.budget  = "予算感を選択してください";
    if (!form.message.trim()) e.message = "ご相談内容を入力してください";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSent(true);
  };

  const s = {
    label:   { fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, marginBottom: 6, color: "var(--ink)" },
    badge:   { fontSize: 10, background: "var(--matcha)", color: "#fff", padding: "2px 8px", borderRadius: 20 },
    input:   { width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--ink)", background: "var(--bg)", border: "0.5px solid var(--border)", borderRadius: 2, padding: "10px 14px", outline: "none", transition: "border-color 0.2s" },
    errMsg:  { fontSize: 11, color: "#A32D2D", marginTop: 4 },
    row:     { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 },
    group:   { marginBottom: 20 },
    togGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 },
    budGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 },
    togBtn:  (active) => ({ display: "flex", alignItems: "center", gap: 8, fontSize: 12, padding: "9px 14px", border: `0.5px solid ${active ? "var(--matcha)" : "var(--border)"}`, background: active ? "var(--bg2)" : "var(--bg)", color: active ? "var(--ink)" : "var(--ink-sub)", cursor: "pointer", borderRadius: 2, transition: "all 0.18s" }),
    budBtn:  (active) => ({ fontSize: 12, padding: "8px 6px", border: `0.5px solid ${active ? "var(--matcha)" : "var(--border)"}`, background: active ? "var(--matcha)" : "var(--bg)", color: active ? "#fff" : "var(--ink-sub)", cursor: "pointer", textAlign: "center", borderRadius: 2, transition: "all 0.18s" }),
    dot:     (active) => ({ width: 13, height: 13, borderRadius: "50%", border: `1px solid ${active ? "var(--matcha)" : "var(--border)"}`, background: active ? "var(--matcha)" : "transparent", flexShrink: 0 }),
    privacy: { fontSize: 12, color: "var(--ink-sub)", lineHeight: 1.75, padding: "14px 18px", background: "var(--bg2)", borderLeft: "2px solid var(--matcha3)", marginBottom: 24 },
    submit:  { width: "100%", background: "var(--ink)", color: "#fff", border: "none", padding: "14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", cursor: "pointer", borderRadius: 2 },
    success: { textAlign: "center", padding: "48px 24px", background: "#EAF3DE", border: "0.5px solid rgba(59,109,17,0.2)", borderRadius: 2 },
  };

  if (sent) return (
    <div style={s.success}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>✉</div>
      <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "1.3rem", fontWeight: 500, marginBottom: 8, color: "#3B6D11" }}>お問い合わせありがとうございます</h3>
      <p style={{ fontSize: 13, color: "#3B6D11", lineHeight: 1.8 }}>内容を確認のうえ、2営業日以内にご返信いたします。</p>
    </div>
  );

  return (
    <div>
      <div style={s.row}>
        <div>
          <div style={s.label}>お名前 <span style={s.badge}>必須</span></div>
          <input style={{ ...s.input, borderColor: errors.name ? "#A32D2D" : "var(--border)" }} value={form.name} onChange={e => { setForm(p => ({...p, name: e.target.value})); setErrors(p => ({...p, name: ""})); }} placeholder="村上 心菜" />
          {errors.name && <div style={s.errMsg}>{errors.name}</div>}
        </div>
        <div>
          <div style={s.label}>会社名・屋号 <span style={s.badge}>必須</span></div>
          <input style={{ ...s.input, borderColor: errors.company ? "#A32D2D" : "var(--border)" }} value={form.company} onChange={e => { setForm(p => ({...p, company: e.target.value})); setErrors(p => ({...p, company: ""})); }} placeholder="株式会社〇〇 / 個人" />
          {errors.company && <div style={s.errMsg}>{errors.company}</div>}
        </div>
      </div>

      <div style={s.group}>
        <div style={s.label}>メールアドレス <span style={s.badge}>必須</span></div>
        <input style={{ ...s.input, borderColor: errors.email ? "#A32D2D" : "var(--border)" }} type="email" value={form.email} onChange={e => { setForm(p => ({...p, email: e.target.value})); setErrors(p => ({...p, email: ""})); }} placeholder="coconi@example.com" />
        {errors.email && <div style={s.errMsg}>{errors.email}</div>}
      </div>

      <div style={s.group}>
        <div style={s.label}>お仕事の種類 <span style={s.badge}>必須</span></div>
        <div style={s.togGrid}>
          {jobTypes.map(t => (
            <button key={t} style={s.togBtn(form.jobType === t)} onClick={() => { setForm(p => ({...p, jobType: t})); setErrors(p => ({...p, jobType: ""})); }}>
              <span style={s.dot(form.jobType === t)} />
              {t}
            </button>
          ))}
        </div>
        {errors.jobType && <div style={s.errMsg}>{errors.jobType}</div>}
      </div>

      <div style={s.group}>
        <div style={s.label}>ご予算感 <span style={s.badge}>必須</span></div>
        <div style={s.budGrid}>
          {budgets.map(b => (
            <button key={b} style={s.budBtn(form.budget === b)} onClick={() => { setForm(p => ({...p, budget: b})); setErrors(p => ({...p, budget: ""})); }}>{b}</button>
          ))}
        </div>
        {errors.budget && <div style={s.errMsg}>{errors.budget}</div>}
      </div>

      <div style={s.group}>
        <div style={s.label}>ご相談内容 <span style={s.badge}>必須</span></div>
        <textarea style={{ ...s.input, minHeight: 120, resize: "vertical", lineHeight: 1.7, borderColor: errors.message ? "#A32D2D" : "var(--border)" }} value={form.message} onChange={e => { setForm(p => ({...p, message: e.target.value})); setErrors(p => ({...p, message: ""})); }} placeholder="どのようなことでもお気軽にご記入ください。" />
        {errors.message && <div style={s.errMsg}>{errors.message}</div>}
      </div>

      <div style={s.privacy}>ご入力いただいた個人情報は、お問い合わせへの返信および業務上の連絡にのみ使用します。第三者への提供・開示は行いません。</div>
      <button style={s.submit} onClick={handleSubmit}>送信する →</button>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────

export default function App() {
  const [showForm, setShowForm] = useState(false);

  const c = {
    nav:       { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2.5rem", borderBottom: "0.5px solid var(--border)", background: "var(--bg)", position: "sticky", top: 0, zIndex: 100 },
    navLogo:   { fontFamily: "'Shippori Mincho', serif", fontSize: 20, fontWeight: 600, letterSpacing: "0.22em", color: "var(--matcha)" },
    navSub:    { fontSize: 9, color: "var(--ink-sub)", letterSpacing: "0.18em" },
    navLinks:  { display: "flex", gap: "2rem", listStyle: "none" },
    navLink:   { fontSize: 13, color: "var(--ink-sub)", textDecoration: "none", letterSpacing: "0.05em" },
    hero:      { padding: "5rem 2.5rem 4rem", maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem", alignItems: "end" },
    eyebrow:   { fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-sub)", textTransform: "uppercase", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" },
    brand:     { fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 600, letterSpacing: "0.22em", color: "var(--matcha)", lineHeight: 1, marginBottom: "0.3rem" },
    heroName:  { fontSize: 11, color: "var(--ink-sub)", letterSpacing: "0.18em", marginBottom: "1.75rem" },
    catch:     { fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(1.2rem, 2.8vw, 1.75rem)", fontWeight: 400, lineHeight: 1.5, letterSpacing: "0.03em", color: "var(--ink)", marginBottom: "0.3rem" },
    subcatch:  { fontFamily: "'Shippori Mincho', serif", fontSize: "0.95rem", color: "var(--ink-sub)", letterSpacing: "0.1em", marginBottom: "2rem" },
    desc:      { fontSize: 13, color: "var(--ink-sub)", lineHeight: 1.9, maxWidth: 460, marginBottom: "2.5rem", borderLeft: "1.5px solid var(--matcha3)", paddingLeft: "1.1rem" },
    cta:       { display: "flex", gap: "1rem" },
    btnP:      { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.78rem 1.9rem", background: "var(--matcha)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
    btnO:      { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.78rem 1.9rem", background: "transparent", color: "var(--ink-mid)", border: "0.5px solid var(--border)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
    statBox:   { display: "flex", flexDirection: "column", gap: 1, alignSelf: "center" },
    stat:      { background: "var(--bg2)", padding: "1.25rem 1.5rem", borderLeft: "2px solid var(--matcha3)" },
    statNum:   { fontFamily: "'Shippori Mincho', serif", fontSize: "1.8rem", fontWeight: 500, color: "var(--matcha)", lineHeight: 1, marginBottom: "0.2rem" },
    statLbl:   { fontSize: 11, color: "var(--ink-sub)", letterSpacing: "0.08em" },
    divider:   { height: "0.5px", background: "var(--border)" },
    sec:       { padding: "4rem 2.5rem", maxWidth: 900, margin: "0 auto" },
    secHead:   { display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "2.75rem" },
    secLabel:  { fontSize: 10, letterSpacing: "0.25em", color: "var(--ink-sub)", textTransform: "uppercase", whiteSpace: "nowrap" },
    secLine:   { flex: 1, height: "0.5px", background: "var(--border)" },
    skillGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5px", background: "var(--border)", border: "0.5px solid var(--border)" },
    skillCard: { background: "var(--bg)", padding: "2rem" },
    skillIcon: { fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-sub)", textTransform: "uppercase", marginBottom: "1rem" },
    skillTitle:{ fontFamily: "'Shippori Mincho', serif", fontSize: "1.05rem", fontWeight: 500, marginBottom: "0.7rem", color: "var(--ink)" },
    skillDesc: { fontSize: 12.5, color: "var(--ink-sub)", lineHeight: 1.82 },
    tagWrap:   { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 },
    tag:       { fontSize: 10.5, padding: "3px 10px", border: "0.5px solid var(--border)", color: "var(--ink-sub)", letterSpacing: "0.04em" },
    workList:  { borderTop: "0.5px solid var(--border)" },
    workRow:   { display: "grid", gridTemplateColumns: "100px 1fr 1fr 90px", gap: "2rem", padding: "1.6rem 0", borderBottom: "0.5px solid var(--border)", alignItems: "start" },
    wCat:      { fontSize: 9.5, letterSpacing: "0.16em", color: "var(--matcha)", textTransform: "uppercase", paddingTop: 2 },
    wTitle:    { fontSize: 13.5, fontWeight: 500, color: "var(--ink)", lineHeight: 1.5 },
    wDesc:     { fontSize: 12, color: "var(--ink-sub)", lineHeight: 1.8 },
    wBadge:    { fontSize: 9, letterSpacing: "0.08em", color: "var(--ink-sub)", border: "0.5px solid var(--border)", padding: "3px 10px", textAlign: "center", whiteSpace: "nowrap" },
    philWrap:  { background: "var(--bg2)", borderTop: "0.5px solid var(--border)", borderBottom: "0.5px solid var(--border)" },
    philInner: { maxWidth: 900, margin: "0 auto", padding: "4rem 2.5rem", display: "grid", gridTemplateColumns: "1fr 2px 1fr", gap: "4rem", alignItems: "center" },
    philDiv:   { background: "var(--border)", alignSelf: "stretch", margin: "1.5rem 0" },
    philH2:    { fontFamily: "'Shippori Mincho', serif", fontSize: "1.65rem", fontWeight: 400, lineHeight: 1.65, marginBottom: "1.1rem", color: "var(--ink)" },
    philP:     { fontSize: 12.5, color: "var(--ink-sub)", lineHeight: 2.05 },
    philList:  { display: "flex", flexDirection: "column", borderLeft: "1px solid var(--border)" },
    philItem:  { padding: "1.1rem 1.4rem", borderBottom: "0.5px solid var(--border)" },
    philHead:  { display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "0.3rem" },
    philNum:   { fontSize: 9, color: "var(--matcha3)", letterSpacing: "0.15em" },
    philTitle: { fontSize: 13, fontWeight: 500, color: "var(--ink)" },
    philLine:  { flex: 1, height: "0.5px", background: "var(--border)" },
    philDesc:  { fontSize: 11.5, color: "var(--ink-sub)", lineHeight: 1.9, paddingLeft: "1.8rem" },
    conInner:  { maxWidth: 680, margin: "0 auto", textAlign: "center" },
    conH2:     { fontFamily: "'Shippori Mincho', serif", fontSize: "1.65rem", fontWeight: 400, marginBottom: "0.6rem", color: "var(--ink)" },
    conP:      { fontSize: 12.5, color: "var(--ink-sub)", lineHeight: 2, marginBottom: "2.25rem" },
    conCards:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", marginBottom: "2rem", textAlign: "left" },
    cCard:     { background: "var(--bg)", padding: "1.75rem" },
    cLabel:    { fontSize: 9.5, letterSpacing: "0.2em", color: "var(--matcha)", textTransform: "uppercase", marginBottom: "0.6rem" },
    cTitle:    { fontFamily: "'Shippori Mincho', serif", fontSize: "1rem", fontWeight: 500, marginBottom: "0.45rem", color: "var(--ink)" },
    cDesc:     { fontSize: 11.5, color: "var(--ink-sub)", lineHeight: 1.8 },
    footer:    { padding: "2rem 2.5rem", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" },
    fLogo:     { fontFamily: "'Shippori Mincho', serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.25em", color: "var(--matcha)" },
    fSpan:     { fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-sub)" },
    modal:     { position: "fixed", inset: 0, background: "rgba(26,25,23,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" },
    modalBox:  { background: "var(--bg)", maxWidth: 660, width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2.5rem" },
    modalHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" },
    modalTitle:{ fontFamily: "'Shippori Mincho', serif", fontSize: "1.5rem", fontWeight: 500, color: "var(--ink)" },
    closeBtn:  { background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--ink-sub)", lineHeight: 1 },
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav style={c.nav}>
        <div>
          <div style={c.navLogo}>COCONI</div>
          <div style={c.navSub}>代表 村上心菜</div>
        </div>
        <ul style={c.navLinks}>
          {["できること", "実績", "COCONIについて", "お問い合わせ"].map(l => (
            <li key={l}><a href="#" style={c.navLink}>{l}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section style={c.hero}>
        <div>
          <div className="animate-1" style={{ ...c.eyebrow }}>
            <span style={{ display: "inline-block", width: 20, height: "0.5px", background: "var(--matcha2)" }} />
            管理栄養士 ＆ エンジニア
          </div>
          <div className="animate-1" style={c.brand}>COCONI</div>
          <div className="animate-2" style={c.heroName}>代表　村上心菜</div>
          <div className="animate-3" style={c.catch}>食べる・つくる・<span style={{ color: "var(--matcha)" }}>つながる。</span></div>
          <div className="animate-4" style={c.subcatch}>人の力で、あなたのそばに。</div>
          <p className="animate-5" style={c.desc}>管理栄養士とエンジニアの両視点から、食育・メニュー開発・Web制作・マーケティング支援まで一貫して対応。AIが進化する時代だからこそ、人に寄り添うことを軸に、あなたのビジネスを前に進めます。</p>
          <div className="animate-6" style={c.cta}>
            <button style={c.btnP} onClick={() => setShowForm(true)}>お問い合わせ</button>
            <button style={c.btnO}>実績を見る</button>
          </div>
        </div>
        <div className="animate-7" style={c.statBox}>
          {[["4", "ヶ月で積み上げた実績"], ["4", "つの専門領域"], ["BtoB + BtoC", "幅広いクライアント対応"]].map(([num, lbl]) => (
            <div key={lbl} style={c.stat}>
              <div style={c.statNum}>{num}</div>
              <div style={c.statLbl}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={c.divider} />

      {/* SERVICE */}
      <section style={c.sec}>
        <div style={c.secHead}>
          <span style={c.secLabel}>できること</span>
          <div style={c.secLine} />
        </div>
        <div style={c.skillGrid}>
          {services.map(s => (
            <div key={s.title} style={c.skillCard}>
              <div style={c.skillIcon}>{s.icon}</div>
              <div style={c.skillTitle}>{s.title}</div>
              <div style={c.skillDesc}>{s.desc}</div>
              <div style={c.tagWrap}>{s.tags.map(t => <span key={t} style={c.tag}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={c.divider} />

      {/* WORKS */}
      <section style={c.sec}>
        <div style={c.secHead}>
          <span style={c.secLabel}>実績 — 副業開始から4ヶ月</span>
          <div style={c.secLine} />
        </div>
        <div style={c.workList}>
          {works.map(w => (
            <div key={w.title} style={c.workRow}>
              <div style={c.wCat}>{w.cat}</div>
              <div style={c.wTitle}>{w.title}</div>
              <div style={c.wDesc}>{w.desc}</div>
              <div style={c.wBadge}>{w.badge}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <div style={c.philWrap}>
        <div style={c.philInner}>
          <div>
            <h2 style={c.philH2}>人にしかできない<br />仕事を、大切に。</h2>
            <p style={c.philP}>AIが進化していく時代だからこそ、感情・文脈・関係性を読む力が差になります。管理栄養士としての食と身体への眼差しと、エンジニアとしての仕組みを作る力を掛け合わせ、あなたのビジネスに本当に必要なものを一緒に考えます。</p>
          </div>
          <div style={c.philDiv} />
          <div style={c.philList}>
            {pillars.map((p, i) => (
              <div key={p.num} style={{ ...c.philItem, borderBottom: i === pillars.length - 1 ? "none" : "0.5px solid var(--border)" }}>
                <div style={c.philHead}>
                  <span style={c.philNum}>{p.num}</span>
                  <span style={c.philTitle}>{p.title}</span>
                  <div style={c.philLine} />
                </div>
                <div style={c.philDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section style={c.sec}>
        <div style={c.secHead}>
          <span style={c.secLabel}>お問い合わせ</span>
          <div style={c.secLine} />
        </div>
        <div style={c.conInner}>
          <h2 style={c.conH2}>まずは気軽にご相談ください</h2>
          <p style={c.conP}>企業・個人問わずご相談をお受けしています。<br />内容によってプランをご提案します。</p>
          <div style={c.conCards}>
            <div style={c.cCard}>
              <div style={c.cLabel}>For Business</div>
              <div style={c.cTitle}>法人・企業の方へ</div>
              <div style={c.cDesc}>Web制作・MEO/SEO・SNS運用・人事サポートなど、継続的な業務委託も歓迎です。</div>
            </div>
            <div style={c.cCard}>
              <div style={c.cLabel}>For Individual</div>
              <div style={c.cTitle}>個人・小規模店舗の方へ</div>
              <div style={c.cDesc}>食育相談・HP制作・SNS運用など、小さなご依頼からでも丁寧に対応いたします。</div>
            </div>
          </div>
          <button style={c.btnP} onClick={() => setShowForm(true)}>お問い合わせ →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={c.footer}>
        <div style={c.fLogo}>COCONI</div>
        <span style={c.fSpan}>代表 村上心菜　|　管理栄養士 ＆ エンジニア</span>
        <span style={c.fSpan}>© 2026 COCONI</span>
      </footer>

      {/* CONTACT MODAL */}
      {showForm && (
        <div style={c.modal} onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div style={c.modalBox}>
            <div style={c.modalHead}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--matcha)", textTransform: "uppercase", marginBottom: 6 }}>Contact</div>
                <div style={c.modalTitle}>お問い合わせ</div>
              </div>
              <button style={c.closeBtn} onClick={() => setShowForm(false)}>✕</button>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-sub)", lineHeight: 1.8, marginBottom: 24 }}>
              フォームにご入力いただければ、2営業日以内にご返信します。<br />
              お急ぎの方は <span style={{ color: "var(--matcha)" }}>coconi@example.com</span> まで。
            </p>
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
}
