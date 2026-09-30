export default function Notch({ color = 'var(--red)', gradId = 'ng', style = {} }) {
  return (
    <div className="notch" style={{ '--c': color, ...style }}>
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" x2="1">
            <stop offset="0" stopColor="#E8D84A" />
            <stop offset="1" stopColor="#8CC63F" />
          </linearGradient>
        </defs>
        <path d="M0 0H1440V14H1000C820 14 725 56 720 62C715 56 620 14 440 14H0Z" fill="#EC1C24" />
        <path d="M0 8H440C620 8 715 50 720 56C725 50 820 8 1000 8H1440" fill="none" stroke={`url(#${gradId})`} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
